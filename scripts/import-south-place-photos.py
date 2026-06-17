#!/usr/bin/env python3
"""
Import real photos from content/places/south into south-region trip data.

- hero.* (jpg/jpeg/png/webp/heic) → heroImage
- Additional image files in the same folder → gallery (src only, no labels)
- South region only; does not touch north/center/jerusalem trips
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import quote

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SOUTH_ROOT = PROJECT_ROOT / "content" / "places" / "south"
VISITED_TRIPS_FILE = PROJECT_ROOT / "data" / "visited-place-trips.ts"
TRIPS_FILE = PROJECT_ROOT / "data" / "trips.ts"
REPORT_FILE = PROJECT_ROOT / "data" / "south-place-photos-report.json"

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic"}

# Folder name on disk → trip title in data files
FOLDER_TITLE_ALIASES: dict[str, str] = {
    "פארק נחל לכיש": "פארק לכיש",
}


@dataclass
class FolderPhotos:
    folder_name: str
    hero_file: str | None = None
    gallery_files: list[str] = field(default_factory=list)
    missing_hero: bool = False


@dataclass
class PlaceMatch:
    folder_name: str
    slug: str
    title: str
    source: str  # "visited" | "published"
    hero_url: str | None = None
    gallery_urls: list[str] = field(default_factory=list)


def escape_ts(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def image_url(folder_name: str, filename: str) -> str:
    file_part = quote(filename, safe="")
    return f"/content/places/south/{folder_name}/{file_part}"


def is_hero_file(name: str) -> bool:
    return Path(name).stem.lower() == "hero" and Path(name).suffix.lower() in IMAGE_EXTENSIONS


def is_gallery_file(name: str) -> bool:
    if name.startswith("."):
        return False
    suffix = Path(name).suffix.lower()
    if suffix not in IMAGE_EXTENSIONS:
        return False
    return not is_hero_file(name)


def scan_south_folders() -> dict[str, FolderPhotos]:
    results: dict[str, FolderPhotos] = {}

    if not SOUTH_ROOT.is_dir():
        raise FileNotFoundError(f"South places folder not found: {SOUTH_ROOT}")

    for folder in sorted(SOUTH_ROOT.iterdir()):
        if not folder.is_dir() or folder.name.startswith("."):
            continue

        photos = FolderPhotos(folder_name=folder.name)
        files = sorted(
            f.name for f in folder.iterdir() if f.is_file() and not f.name.startswith(".")
        )

        for filename in files:
            if is_hero_file(filename):
                photos.hero_file = filename
            elif is_gallery_file(filename):
                photos.gallery_files.append(filename)

        photos.missing_hero = photos.hero_file is None
        results[folder.name] = photos

    return results


def load_trips_from_file(path: Path, source: str) -> list[dict[str, str]]:
    text = path.read_text(encoding="utf-8")
    if source == "published":
        start = text.index("const rawTrips")
        end = text.index("export const trips")
        chunk = text[start:end]
    else:
        chunk = text

    trips: list[dict[str, str]] = []
    pattern = re.compile(
        r'slug:\s*"([^"]+)"\s*,\s*\n\s*title:\s*"([^"]+)"\s*,[\s\S]*?\n\s*region:\s*"([^"]+)"'
    )
    for match in pattern.finditer(chunk):
        region = match.group(3)
        if region != "דרום":
            continue
        trips.append(
            {
                "slug": match.group(1),
                "title": match.group(2),
                "region": region,
                "source": source,
            }
        )
    return trips


def trip_title_for_folder(folder_name: str) -> str:
    return FOLDER_TITLE_ALIASES.get(folder_name, folder_name)


def match_folders_to_trips(
    folders: dict[str, FolderPhotos],
    south_trips: list[dict[str, str]],
) -> tuple[list[PlaceMatch], list[str], list[str]]:
    by_title = {(trip["title"], trip["source"]): trip for trip in south_trips}
    # Prefer published trip when title matches both
    title_to_trip: dict[str, dict[str, str]] = {}
    for trip in south_trips:
        existing = title_to_trip.get(trip["title"])
        if existing is None or trip["source"] == "published":
            title_to_trip[trip["title"]] = trip

    matches: list[PlaceMatch] = []
    unmatched_folders: list[str] = []
    missing_hero: list[str] = []

    matched_slugs: set[str] = set()

    for folder_name, photos in folders.items():
        title = trip_title_for_folder(folder_name)
        trip = title_to_trip.get(title)

        if trip is None:
            unmatched_folders.append(folder_name)
            continue

        if photos.missing_hero:
            missing_hero.append(f"{folder_name} → {trip['slug']} ({title})")
            continue

        if trip["slug"] in matched_slugs:
            continue
        matched_slugs.add(trip["slug"])

        hero_url = image_url(folder_name, photos.hero_file) if photos.hero_file else None
        gallery_urls = [image_url(folder_name, f) for f in photos.gallery_files]

        matches.append(
            PlaceMatch(
                folder_name=folder_name,
                slug=trip["slug"],
                title=title,
                source=trip["source"],
                hero_url=hero_url,
                gallery_urls=gallery_urls,
            )
        )

    return matches, unmatched_folders, missing_hero


def render_gallery(urls: list[str], indent: str = "    ") -> str:
    if not urls:
        return f"{indent}gallery: [],"
    lines = [f"{indent}gallery: ["]
    for url in urls:
        lines.append(f'{indent}  {{ src: "{escape_ts(url)}" }},')
    lines.append(f"{indent}],")
    return "\n".join(lines)


def patch_slug_block(block: str, match: PlaceMatch) -> str:
    if match.hero_url:
        hero_line = f'    heroImage: "{escape_ts(match.hero_url)}",'
        if "heroImage:" in block:
            block = re.sub(
                r'    heroImage: "[^"]*",\n',
                f"{hero_line}\n",
                block,
                count=1,
            )
        else:
            block = block.replace(
                "    heroImageLabel:",
                f"{hero_line}\n    heroImageLabel:",
                1,
            )

    gallery_block = render_gallery(match.gallery_urls)
    if re.search(r"    gallery: \[[\s\S]*?\],", block):
        block = re.sub(r"    gallery: \[[\s\S]*?\],", gallery_block, block, count=1)
    else:
        block = block.replace("    gallerySubtitle:", f"{gallery_block}\n    gallerySubtitle:", 1)

    block = re.sub(
        r'    gallerySubtitle: "[^"]*",',
        '    gallerySubtitle: "",',
        block,
        count=1,
    )

    return block


def patch_trips_file(path: Path, matches: list[PlaceMatch], source: str) -> int:
    slugs = {match.slug for match in matches if match.source == source}
    if not slugs:
        return 0

    text = path.read_text(encoding="utf-8")
    updated = 0

    for match in matches:
        if match.source != source:
            continue

        slug_pattern = re.compile(
            rf'(  \{{\n    slug: "{re.escape(match.slug)}",[\s\S]*?\n  \}},)'
        )
        found = slug_pattern.search(text)
        if not found:
            print(f"Warning: slug not found in {path.name}: {match.slug}", file=sys.stderr)
            continue

        new_block = patch_slug_block(found.group(1), match)
        text = text[: found.start(1)] + new_block + text[found.end(1) :]
        updated += 1

    path.write_text(text, encoding="utf-8")
    return updated


def build_report(
    matches: list[PlaceMatch],
    unmatched_folders: list[str],
    missing_hero: list[str],
    folders: dict[str, FolderPhotos],
) -> dict:
    hero_only = [
        m.slug for m in matches if m.hero_url and len(m.gallery_urls) == 0
    ]
    return {
        "places_matched": len(matches),
        "hero_images_connected": sum(1 for m in matches if m.hero_url),
        "gallery_counts": {
            m.slug: {"title": m.title, "folder": m.folder_name, "count": len(m.gallery_urls)}
            for m in matches
        },
        "hero_only": hero_only,
        "missing_hero": missing_hero,
        "unmatched_folders": unmatched_folders,
        "empty_folders": [
            name for name, photos in folders.items() if not photos.hero_file and not photos.gallery_files
        ],
    }


def main() -> int:
    folders = scan_south_folders()
    visited_trips = load_trips_from_file(VISITED_TRIPS_FILE, "visited")
    published_trips = load_trips_from_file(TRIPS_FILE, "published")
    all_south_trips = visited_trips + published_trips

    matches, unmatched_folders, missing_hero = match_folders_to_trips(folders, all_south_trips)

    visited_updated = patch_trips_file(VISITED_TRIPS_FILE, matches, "visited")
    published_updated = patch_trips_file(TRIPS_FILE, matches, "published")

    report = build_report(matches, unmatched_folders, missing_hero, folders)
    report["visited_trips_updated"] = visited_updated
    report["published_trips_updated"] = published_updated
    REPORT_FILE.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print("South place photos import")
    print(f"Folders scanned: {len(folders)}")
    print(f"Places matched: {report['places_matched']}")
    print(f"Hero images connected: {report['hero_images_connected']}")
    print(f"Visited trips updated: {visited_updated}")
    print(f"Published trips updated: {published_updated}")
    print("\nGallery counts per place:")
    for slug, info in sorted(report["gallery_counts"].items(), key=lambda x: x[1]["title"]):
        print(f"  {info['title']} ({slug}): {info['count']}")
    print(f"\nHero only ({len(report['hero_only'])}): {', '.join(report['hero_only']) or '—'}")
    print(f"\nMissing hero ({len(missing_hero)}):")
    for item in missing_hero:
        print(f"  - {item}")
    if unmatched_folders:
        print(f"\nUnmatched folders ({len(unmatched_folders)}):")
        for item in unmatched_folders:
            print(f"  - {item}")
    print(f"\nReport: {REPORT_FILE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
