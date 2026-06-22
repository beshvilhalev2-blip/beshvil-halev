#!/usr/bin/env python3
"""
Safe image compression workflow for public/images.

- Reads originals from public/images/ (never deletes or modifies them).
- Writes path-compatible optimized files to public/images-optimized/ (same relative paths
  and extensions - safe drop-in replacement after approval).
- Writes WebP previews to public/images/_optimized-report/webp-preview/ (different
  extensions - requires data/code path updates before production use).
- Writes JSON + Markdown report to public/images/_optimized-report/.

Preferred runner (uses sharp via Node):
  node scripts/compress-public-images.mjs

Python fallback (requires Pillow with JPEG support):
  pip install -r scripts/requirements-image-compression.txt
  python3 scripts/compress-public-images.py
"""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    print(
        "Pillow is required. Install with:\n"
        "  pip install -r scripts/requirements-image-compression.txt",
        file=sys.stderr,
    )
    raise SystemExit(1)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SOURCE_ROOT = PROJECT_ROOT / "public" / "images"
OPTIMIZED_ROOT = PROJECT_ROOT / "public" / "images-optimized"
REPORT_ROOT = PROJECT_ROOT / "public" / "images" / "_optimized-report"
WEBP_PREVIEW_ROOT = REPORT_ROOT / "webp-preview"

SKIP_DIR_NAMES = {
    "images-optimized",
    "_optimized-report",
    "webp-preview",
}

RASTER_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
SKIP_EXTENSIONS = {".svg", ".gif", ".ico", ".heic", ".heif"}
COPY_AS_IS_EXTENSIONS = {".svg", ".gif", ".ico"}

HERO_MAX_WIDTH = 1800
HERO_TARGET_BYTES = 500_000
HERO_SOFT_TARGET_BYTES = 300_000

GALLERY_MAX_WIDTH = 1400
GALLERY_TARGET_BYTES = 300_000
GALLERY_SOFT_TARGET_BYTES = 150_000

OTHER_MAX_WIDTH = 1800
OTHER_TARGET_BYTES = 500_000

DEFAULT_QUALITY = 80
MIN_QUALITY = 65
QUALITY_STEP = 5

WEBP_QUALITY = 78


@dataclass
class ImageResult:
    relative_path: str
    category: str
    original_bytes: int
    optimized_bytes: int | None = None
    webp_bytes: int | None = None
    original_width: int | None = None
    original_height: int | None = None
    output_width: int | None = None
    output_height: int | None = None
    quality_used: int | None = None
    action: str = "pending"
    note: str | None = None


@dataclass
class CompressionReport:
    generated_at: str
    source_root: str
    optimized_root: str
    webp_preview_root: str
    dry_run: bool
    totals: dict = field(default_factory=dict)
    webp_path_change_required: bool = True
    webp_migration_note: str = (
        "WebP previews use .webp extensions under _optimized-report/webp-preview/. "
        "Trip data and components reference .jpeg/.jpg paths - switching to WebP "
        "requires updating data/ trip heroImage/gallery paths OR a build step that "
        "maps paths. Path-compatible JPEG/PNG outputs in public/images-optimized/ "
        "can replace originals without code changes."
    )
    images: list[dict] = field(default_factory=list)
    largest_remaining_optimized: list[dict] = field(default_factory=list)
    skipped: list[dict] = field(default_factory=list)
    over_target: list[dict] = field(default_factory=list)


def is_hero_file(path: Path) -> bool:
    return path.stem.lower() == "hero" and path.suffix.lower() in RASTER_EXTENSIONS


def is_place_image(relative: Path) -> bool:
    parts = relative.parts
    return len(parts) >= 3 and parts[0] == "places"


def classify_image(relative: Path) -> str:
    if is_place_image(relative):
        if is_hero_file(relative):
            return "hero"
        if relative.suffix.lower() in RASTER_EXTENSIONS:
            return "gallery"
    return "other"


def should_skip_path(path: Path) -> bool:
    return any(part in SKIP_DIR_NAMES for part in path.parts)


def iter_source_files() -> list[Path]:
    files: list[Path] = []
    for path in sorted(SOURCE_ROOT.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(SOURCE_ROOT)
        if should_skip_path(rel):
            continue
        files.append(path)
    return files


def prepare_rgb_image(image: Image.Image) -> Image.Image:
    if image.mode in ("RGBA", "LA") or (
        image.mode == "P" and "transparency" in image.info
    ):
        background = Image.new("RGBA", image.size, (255, 255, 255, 255))
        converted = image.convert("RGBA")
        background.alpha_composite(converted)
        return background.convert("RGB")
    if image.mode != "RGB":
        return image.convert("RGB")
    return image


def resize_image(image: Image.Image, max_width: int) -> Image.Image:
    if image.width <= max_width:
        return image
    ratio = max_width / image.width
    new_height = max(1, round(image.height * ratio))
    return image.resize((max_width, new_height), Image.Resampling.LANCZOS)


def save_jpeg(image: Image.Image, dest: Path, quality: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(
        dest,
        format="JPEG",
        quality=quality,
        optimize=True,
        progressive=True,
    )


def save_png(image: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if image.mode == "RGBA":
        image.save(dest, format="PNG", optimize=True, compress_level=9)
    else:
        image.save(dest, format="PNG", optimize=True, compress_level=9)


def save_webp(image: Image.Image, dest: Path, quality: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, format="WEBP", quality=quality, method=6)


def compress_to_target(
    image: Image.Image,
    dest: Path,
    suffix: str,
    target_bytes: int,
) -> tuple[int, int]:
    quality = DEFAULT_QUALITY
    suffix_lower = suffix.lower()

    if suffix_lower in {".jpg", ".jpeg"}:
        while quality >= MIN_QUALITY:
            save_jpeg(image, dest, quality)
            size = dest.stat().st_size
            if size <= target_bytes:
                return quality, size
            quality -= QUALITY_STEP
        return quality + QUALITY_STEP, dest.stat().st_size

    if suffix_lower == ".png":
        save_png(image, dest)
        size = dest.stat().st_size
        if size <= target_bytes:
            return 100, size

        current = image
        scale = 0.92
        while scale >= 0.6:
            scaled = current.resize(
                (max(1, round(current.width * scale)), max(1, round(current.height * scale))),
                Image.Resampling.LANCZOS,
            )
            save_png(scaled, dest)
            size = dest.stat().st_size
            if size <= target_bytes:
                return 100, size
            scale -= 0.08
        return 100, dest.stat().st_size

    if suffix_lower == ".webp":
        while quality >= MIN_QUALITY:
            save_webp(image, dest, quality)
            size = dest.stat().st_size
            if size <= target_bytes:
                return quality, size
            quality -= QUALITY_STEP
        return quality + QUALITY_STEP, dest.stat().st_size

    raise ValueError(f"Unsupported output extension: {suffix}")


def process_raster(
    source: Path,
    relative: Path,
    category: str,
    dry_run: bool,
) -> ImageResult:
    original_bytes = source.stat().st_size
    result = ImageResult(
        relative_path=relative.as_posix(),
        category=category,
        original_bytes=original_bytes,
    )

    if category == "hero":
        max_width = HERO_MAX_WIDTH
        target_bytes = HERO_TARGET_BYTES
        soft_target = HERO_SOFT_TARGET_BYTES
    elif category == "gallery":
        max_width = GALLERY_MAX_WIDTH
        target_bytes = GALLERY_TARGET_BYTES
        soft_target = GALLERY_SOFT_TARGET_BYTES
    else:
        max_width = OTHER_MAX_WIDTH
        target_bytes = OTHER_TARGET_BYTES
        soft_target = OTHER_TARGET_BYTES // 2

    suffix = relative.suffix
    optimized_dest = OPTIMIZED_ROOT / relative
    webp_dest = WEBP_PREVIEW_ROOT / relative.with_suffix(".webp")

    try:
        with Image.open(source) as opened:
            opened = ImageOps.exif_transpose(opened)
            result.original_width = opened.width
            result.original_height = opened.height

            if dry_run:
                resized = resize_image(prepare_rgb_image(opened), max_width)
                result.output_width = resized.width
                result.output_height = resized.height
                result.action = "dry-run"
                result.note = f"Would optimize to max width {max_width}px"
                return result

            working = resize_image(prepare_rgb_image(opened), max_width)
            result.output_width = working.width
            result.output_height = working.height

            quality_used, optimized_size = compress_to_target(
                working,
                optimized_dest,
                suffix,
                target_bytes,
            )
            result.optimized_bytes = optimized_size
            result.quality_used = quality_used
            result.action = "optimized"

            save_webp(working, webp_dest, WEBP_QUALITY)
            result.webp_bytes = webp_dest.stat().st_size

            if optimized_size > target_bytes:
                result.note = f"Still above hard target ({target_bytes // 1024}KB)"
            elif optimized_size > soft_target:
                result.note = f"Above soft target ({soft_target // 1024}KB) but within hard cap"

    except Exception as exc:  # noqa: BLE001 - collect per-file failures in report
        result.action = "error"
        result.note = str(exc)

    return result


def copy_non_raster(source: Path, relative: Path, dry_run: bool) -> ImageResult:
    dest = OPTIMIZED_ROOT / relative
    original_bytes = source.stat().st_size
    result = ImageResult(
        relative_path=relative.as_posix(),
        category="asset",
        original_bytes=original_bytes,
        action="copied-as-is",
    )

    if dry_run:
        result.note = "Non-raster asset - would copy unchanged"
        return result

    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, dest)
    result.optimized_bytes = original_bytes
    return result


def format_bytes(num: int | None) -> str:
    if num is None:
        return "-"
    if num < 1024:
        return f"{num} B"
    if num < 1024 * 1024:
        return f"{num / 1024:.1f} KB"
    return f"{num / (1024 * 1024):.2f} MB"


def build_report(results: list[ImageResult], dry_run: bool) -> CompressionReport:
    optimized_results = [
        r for r in results if r.action in {"optimized", "copied-as-is", "dry-run"}
    ]
    skipped = [r for r in results if r.action in {"skipped", "error"}]

    original_total = sum(r.original_bytes for r in results)
    optimized_total = sum(r.optimized_bytes or 0 for r in results if r.optimized_bytes)
    webp_total = sum(r.webp_bytes or 0 for r in results if r.webp_bytes)

    processed = [r for r in results if r.action == "optimized"]
    over_target = [
        r
        for r in processed
        if r.note and "Still above hard target" in r.note
    ]

    largest = sorted(
        [r for r in processed if r.optimized_bytes],
        key=lambda item: item.optimized_bytes or 0,
        reverse=True,
    )[:25]

    savings = original_total - optimized_total if optimized_total else 0
    savings_pct = (savings / original_total * 100) if original_total else 0

    return CompressionReport(
        generated_at=datetime.now(timezone.utc).isoformat(),
        source_root=str(SOURCE_ROOT.relative_to(PROJECT_ROOT)),
        optimized_root=str(OPTIMIZED_ROOT.relative_to(PROJECT_ROOT)),
        webp_preview_root=str(WEBP_PREVIEW_ROOT.relative_to(PROJECT_ROOT)),
        dry_run=dry_run,
        totals={
            "files_scanned": len(results),
            "images_optimized": len(processed),
            "assets_copied_as_is": len(
                [r for r in results if r.action == "copied-as-is"]
            ),
            "skipped_or_errors": len(skipped),
            "original_bytes": original_total,
            "optimized_bytes": optimized_total,
            "webp_preview_bytes": webp_total,
            "estimated_savings_bytes": savings,
            "estimated_savings_percent": round(savings_pct, 1),
            "hero_count": len([r for r in results if r.category == "hero"]),
            "gallery_count": len([r for r in results if r.category == "gallery"]),
            "other_count": len([r for r in results if r.category == "other"]),
            "over_hard_target_count": len(over_target),
        },
        images=[asdict(r) for r in results],
        largest_remaining_optimized=[
            {
                "path": r.relative_path,
                "category": r.category,
                "optimized_bytes": r.optimized_bytes,
                "optimized_human": format_bytes(r.optimized_bytes),
                "original_bytes": r.original_bytes,
                "original_human": format_bytes(r.original_bytes),
            }
            for r in largest
        ],
        skipped=[asdict(r) for r in skipped],
        over_target=[asdict(r) for r in over_target],
    )


def write_markdown_report(report: CompressionReport, path: Path) -> None:
    totals = report.totals
    lines = [
        "# Image compression report",
        "",
        f"Generated: {report.generated_at}",
        f"Dry run: **{report.dry_run}**",
        "",
        "## Summary",
        "",
        f"- Files scanned: **{totals['files_scanned']}**",
        f"- Images optimized: **{totals['images_optimized']}**",
        f"- Assets copied as-is (SVG/ICO/etc.): **{totals['assets_copied_as_is']}**",
        f"- Skipped / errors: **{totals['skipped_or_errors']}**",
        f"- Hero images: **{totals['hero_count']}**",
        f"- Gallery images: **{totals['gallery_count']}**",
        f"- Other images: **{totals['other_count']}**",
        "",
        "## Size",
        "",
        f"- Original total: **{format_bytes(totals['original_bytes'])}**",
        f"- Optimized total (path-compatible): **{format_bytes(totals['optimized_bytes'])}**",
        f"- WebP preview total (not production-ready): **{format_bytes(totals['webp_preview_bytes'])}**",
        f"- Estimated savings: **{format_bytes(totals['estimated_savings_bytes'])}** "
        f"({totals['estimated_savings_percent']}%)",
        "",
        "## Output locations",
        "",
        f"- Safe swap candidates: `{report.optimized_root}/` (same paths & extensions as originals)",
        f"- WebP previews only: `{report.webp_preview_root}/`",
        f"- Originals untouched: `{report.source_root}/`",
        "",
        "## WebP migration",
        "",
        report.webp_migration_note,
        "",
        f"- Files still above hard target after optimization: **{totals['over_hard_target_count']}**",
        "",
        "## Largest optimized files (top 25)",
        "",
        "| Optimized | Original | Category | Path |",
        "| --- | --- | --- | --- |",
    ]

    for item in report.largest_remaining_optimized:
        lines.append(
            f"| {item['optimized_human']} | {item['original_human']} | "
            f"{item['category']} | `{item['path']}` |"
        )

    if report.skipped:
        lines.extend(["", "## Skipped / errors", ""])
        for item in report.skipped[:40]:
            lines.append(
                f"- `{item['relative_path']}` - {item.get('note') or item.get('action')}"
            )

    if report.over_target:
        lines.extend(["", "## Still above hard target", ""])
        for item in report.over_target[:40]:
            lines.append(
                f"- `{item['relative_path']}` ({item['category']}): "
                f"{format_bytes(item.get('optimized_bytes'))} - {item.get('note')}"
            )

    lines.extend(
        [
            "",
            "## Next steps (manual approval required)",
            "",
            "1. Review optimized samples visually in `public/images-optimized/`.",
            "2. Compare a few heroes/galleries side-by-side with originals.",
            "3. If approved, replace originals by copying optimized files over them "
            "(keep a backup tarball of `public/images/` first).",
            "4. Do **not** deploy WebP previews until trip data paths are updated.",
            "",
        ]
    )

    path.write_text("\n".join(lines), encoding="utf-8")


def prepare_output_dirs(reset: bool) -> None:
    if reset and not argparse.Namespace(dry_run=False).dry_run:
        if OPTIMIZED_ROOT.exists():
            shutil.rmtree(OPTIMIZED_ROOT)
        if WEBP_PREVIEW_ROOT.exists():
            shutil.rmtree(WEBP_PREVIEW_ROOT)


def main() -> int:
    parser = argparse.ArgumentParser(description="Compress public/images safely.")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Scan and report without writing optimized files.",
    )
    parser.add_argument(
        "--keep-output",
        action="store_true",
        help="Do not delete existing images-optimized/ before run.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Process only the first N raster files (for testing).",
    )
    args = parser.parse_args()

    if not SOURCE_ROOT.is_dir():
        print(f"Missing source directory: {SOURCE_ROOT}", file=sys.stderr)
        return 1

    if not args.dry_run and not args.keep_output:
        if OPTIMIZED_ROOT.exists():
            shutil.rmtree(OPTIMIZED_ROOT)
        if WEBP_PREVIEW_ROOT.exists():
            shutil.rmtree(WEBP_PREVIEW_ROOT)

    REPORT_ROOT.mkdir(parents=True, exist_ok=True)

    results: list[ImageResult] = []
    raster_processed = 0

    for source in iter_source_files():
        relative = source.relative_to(SOURCE_ROOT)
        suffix = source.suffix.lower()

        if suffix in SKIP_EXTENSIONS:
            results.append(
                ImageResult(
                    relative_path=relative.as_posix(),
                    category=classify_image(relative),
                    original_bytes=source.stat().st_size,
                    action="skipped",
                    note=f"Unsupported extension {suffix} (not processed)",
                )
            )
            continue

        if suffix in COPY_AS_IS_EXTENSIONS or suffix not in RASTER_EXTENSIONS:
            results.append(copy_non_raster(source, relative, args.dry_run))
            continue

        if args.limit and raster_processed >= args.limit:
            continue

        category = classify_image(relative)
        results.append(process_raster(source, relative, category, args.dry_run))
        raster_processed += 1

    report = build_report(results, args.dry_run)

    json_path = REPORT_ROOT / "compression-report.json"
    md_path = REPORT_ROOT / "compression-report.md"
    json_path.write_text(
        json.dumps(asdict(report), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    write_markdown_report(report, md_path)

    totals = report.totals
    print("")
    print("Image compression complete")
    print(f"  Scanned:    {totals['files_scanned']} files")
    print(f"  Optimized:  {totals['images_optimized']} images")
    print(f"  Original:   {format_bytes(totals['original_bytes'])}")
    print(f"  Optimized:  {format_bytes(totals['optimized_bytes'])}")
    print(
        f"  Savings:    {format_bytes(totals['estimated_savings_bytes'])} "
        f"({totals['estimated_savings_percent']}%)"
    )
    print(f"  Report:     {md_path.relative_to(PROJECT_ROOT)}")
    if args.dry_run:
        print("  (dry run - no files written except report)")
    else:
        print(f"  Output:     {OPTIMIZED_ROOT.relative_to(PROJECT_ROOT)}/")
    print("")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
