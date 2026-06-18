#!/usr/bin/env python3
"""
Import real photos from public/images/places/jerusalem into Jerusalem-region trip data.

- hero.* (jpg/jpeg/png/webp/heic) → heroImage
- Additional web-safe image files in the same folder → gallery (src only, no labels)
- Jerusalem region only; does not touch north/center/south trips
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import quote

PROJECT_ROOT = Path(__file__).resolve().parent.parent
JERUSALEM_ROOT = PROJECT_ROOT / "public" / "images" / "places" / "jerusalem"
VISITED_TRIPS_FILE = PROJECT_ROOT / "data" / "visited-place-trips.ts"
TRIPS_FILE = PROJECT_ROOT / "data" / "trips.ts"
REPORT_FILE = PROJECT_ROOT / "data" / "jerusalem-place-photos-report.json"

HERO_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic"}
WEB_GALLERY_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

FOLDER_TITLE_ALIASES: dict[str, str] = {}


@dataclass
class FolderPhotos:
    folder_name: str
    hero_file: str | None = None
    gallery_files: list[str] = field(default_factory=list)
    skipped_files: list[str] = field(default_factory=list)
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
    return f"/images/places/jerusalem/{folder_name}/{file_part}"


def is_hero_file(name: str) -> bool:
    return Path(name).stem.lower() == "hero" and Path(name).suffix.lower() in HERO_EXTENSIONS


def is_gallery_file(name: str) -> bool:
    if name.startswith("."):
        return False
    suffix = Path(name).suffix.lower()
    if suffix not in WEB_GALLERY_EXTENSIONS:
        return False
    return not is_hero_file(name)


def scan_jerusalem_folders() -> dict[str, FolderPhotos]:
    results: dict[str, FolderPhotos] = {}

    if not JERUSALEM_ROOT.is_dir():
        raise FileNotFoundError(f"Jerusalem places folder not found: {JERUSALEM_ROOT}")

    for folder in sorted(JERUSALEM_ROOT.iterdir()):
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
            elif Path(filename).suffix.lower() in HERO_EXTENSIONS:
                photos.skipped_files.append(filename)

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
        if region != "ירושלים":
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
    jerusalem_trips: list[dict[str, str]],
) -> tuple[list[PlaceMatch], list[str], list[str], list[str]]:
    title_to_trip: dict[str, dict[str, str]] = {}
    for trip in jerusalem_trips:
        existing = title_to_trip.get(trip["title"])
        if existing is None or trip["source"] == "published":
            title_to_trip[trip["title"]] = trip

    matches: list[PlaceMatch] = []
    unmatched_folders: list[str] = []
    missing_hero: list[str] = []
    unmatched_trips: list[str] = []

    matched_slugs: set[str] = set()
    matched_titles: set[str] = set()

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
        matched_titles.add(title)

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

    for trip in jerusalem_trips:
        if trip["title"] not in matched_titles:
            unmatched_trips.append(f"{trip['title']} ({trip['slug']})")

    return matches, unmatched_folders, missing_hero, unmatched_trips


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


def verify_paths(matches: list[PlaceMatch]) -> tuple[list[str], list[str]]:
    missing_files: list[str] = []
    hero_urls: dict[str, str] = {}
    duplicates: list[str] = []

    for match in matches:
        if match.hero_url:
            disk_path = PROJECT_ROOT / "public" / match.hero_url.lstrip("/")
            if not disk_path.is_file():
                missing_files.append(match.hero_url)
            if match.hero_url in hero_urls.values():
                duplicates.append(f"Duplicate hero: {match.hero_url} ({match.slug})")
            hero_urls[match.slug] = match.hero_url

        for url in match.gallery_urls:
            disk_path = PROJECT_ROOT / "public" / url.lstrip("/")
            if not disk_path.is_file():
                missing_files.append(url)

    return missing_files, duplicates


def count_photos(folders: dict[str, FolderPhotos]) -> int:
    total = 0
    for photos in folders.values():
        if photos.hero_file:
            total += 1
        total += len(photos.gallery_files)
    return total


def build_report(
    matches: list[PlaceMatch],
    unmatched_folders: list[str],
    missing_hero: list[str],
    unmatched_trips: list[str],
    folders: dict[str, FolderPhotos],
    missing_files: list[str],
    duplicates: list[str],
    visited_updated: int,
    published_updated: int,
) -> dict:
    still_placeholder = unmatched_trips + [
        item.split(" → ")[0] for item in missing_hero
    ]
    return {
        "jerusalem_locations_in_data": len(load_trips_from_file(VISITED_TRIPS_FILE, "visited"))
        + len(load_trips_from_file(TRIPS_FILE, "published")),
        "folders_scanned": len(folders),
        "photos_imported": count_photos(folders),
        "places_matched": len(matches),
        "hero_images_connected": sum(1 for m in matches if m.hero_url),
        "gallery_counts": {
            m.slug: {"title": m.title, "folder": m.folder_name, "count": len(m.gallery_urls)}
            for m in matches
        },
        "skipped_non_web_files": {
            name: photos.skipped_files for name, photos in folders.items() if photos.skipped_files
        },
        "missing_hero": missing_hero,
        "unmatched_folders": unmatched_folders,
        "unmatched_trips_still_placeholder": unmatched_trips,
        "still_using_placeholders": still_placeholder,
        "missing_files_on_disk": missing_files,
        "duplicate_assignments": duplicates,
        "visited_trips_updated": visited_updated,
        "published_trips_updated": published_updated,
    }


def main() -> int:
    folders = scan_jerusalem_folders()
    visited_trips = load_trips_from_file(VISITED_TRIPS_FILE, "visited")
    published_trips = load_trips_from_file(TRIPS_FILE, "published")
    all_jerusalem_trips = visited_trips + published_trips

    matches, unmatched_folders, missing_hero, unmatched_trips = match_folders_to_trips(
        folders, all_jerusalem_trips
    )

    visited_updated = patch_trips_file(VISITED_TRIPS_FILE, matches, "visited")
    published_updated = patch_trips_file(TRIPS_FILE, matches, "published")

    missing_files, duplicates = verify_paths(matches)

    report = build_report(
        matches,
        unmatched_folders,
        missing_hero,
        unmatched_trips,
        folders,
        missing_files,
        duplicates,
        visited_updated,
        published_updated,
    )
    REPORT_FILE.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print("Jerusalem place photos import")
    print(f"Jerusalem locations in data: {report['jerusalem_locations_in_data']}")
    print(f"Folders scanned: {report['folders_scanned']}")
    print(f"Photos imported: {report['photos_imported']}")
    print(f"Places matched: {report['places_matched']}")
    print(f"Hero images connected: {report['hero_images_connected']}")
    print(f"Visited trips updated: {visited_updated}")
    print(f"Published trips updated: {published_updated}")
    print("\nGallery counts per place:")
    for slug, info in sorted(report["gallery_counts"].items(), key=lambda x: x[1]["title"]):
        print(f"  {info['title']} ({slug}): {info['count']}")
    if report["skipped_non_web_files"]:
        print("\nSkipped non-web gallery files (HEIC etc.):")
        for folder, files in report["skipped_non_web_files"].items():
            print(f"  {folder}: {', '.join(files)}")
    print(f"\nStill using placeholders ({len(report['still_using_placeholders'])}):")
    for item in report["still_using_placeholders"]:
        print(f"  - {item}")
    if missing_hero:
        print(f"\nMissing hero ({len(missing_hero)}):")
        for item in missing_hero:
            print(f"  - {item}")
    if unmatched_folders:
        print(f"\nUnmatched folders ({len(unmatched_folders)}):")
        for item in unmatched_folders:
            print(f"  - {item}")
    if missing_files:
        print(f"\nMissing files on disk ({len(missing_files)}):")
        for item in missing_files:
            print(f"  - {item}")
    if duplicates:
        print(f"\nDuplicate assignments ({len(duplicates)}):")
        for item in duplicates:
            print(f"  - {item}")
    print(f"\nReport: {REPORT_FILE}")
    return 1 if missing_files or duplicates else 0


if __name__ == "__main__":
    raise SystemExit(main())
