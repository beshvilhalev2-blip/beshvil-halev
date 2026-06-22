#!/usr/bin/env python3
"""
Import real photos from public/images/places/{region}/ into trip data.

Partial sync: only folders with hero.* are applied; others keep placeholders.
Matches trips by folder name → title across all trip data (any region).
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import quote, unquote

PROJECT_ROOT = Path(__file__).resolve().parent.parent
PLACES_ROOT = PROJECT_ROOT / "public" / "images" / "places"
VISITED_TRIPS_FILE = PROJECT_ROOT / "data" / "visited-place-trips.ts"
TRIPS_FILE = PROJECT_ROOT / "data" / "trips.ts"
REPORT_FILE = PROJECT_ROOT / "data" / "partial-region-photos-report.json"

SYNC_REGIONS = {
    "north": "צפון",
    "hasharon": "השרון",
    "center": "מרכז",
}

HERO_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic"}
WEB_GALLERY_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

FOLDER_TITLE_ALIASES: dict[str, str] = {
    "פארק נחל לכיש": "פארק לכיש",
    "משק בגבעה": "משק בגבעה גדרה",
    "תל דן": "נחל דן",
    "שמורת תל דן": "נחל דן",
    "מצפה אלון": "מצפה נתן",
}


@dataclass
class FolderPhotos:
    region_key: str
    folder_name: str
    hero_file: str | None = None
    gallery_files: list[str] = field(default_factory=list)
    skipped_files: list[str] = field(default_factory=list)
    missing_hero: bool = False


@dataclass
class PlaceMatch:
    region_key: str
    folder_name: str
    slug: str
    title: str
    trip_region: str
    source: str
    hero_url: str | None = None
    gallery_urls: list[str] = field(default_factory=list)


def escape_ts(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def image_url(region_key: str, folder_name: str, filename: str) -> str:
    file_part = quote(filename, safe="")
    return f"/images/places/{region_key}/{folder_name}/{file_part}"


def is_hero_file(name: str) -> bool:
    return Path(name).stem.lower() == "hero" and Path(name).suffix.lower() in HERO_EXTENSIONS


def is_gallery_file(name: str) -> bool:
    if name.startswith("."):
        return False
    suffix = Path(name).suffix.lower()
    if suffix not in WEB_GALLERY_EXTENSIONS:
        return False
    return not is_hero_file(name)


def scan_region_folders(region_key: str) -> dict[str, FolderPhotos]:
    region_root = PLACES_ROOT / region_key
    results: dict[str, FolderPhotos] = {}

    if not region_root.is_dir():
        return results

    for folder in sorted(region_root.iterdir()):
        if not folder.is_dir() or folder.name.startswith("."):
            continue

        photos = FolderPhotos(region_key=region_key, folder_name=folder.name)
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


def load_all_trips() -> list[dict[str, str]]:
    trips: list[dict[str, str]] = []

    for path, source in [(VISITED_TRIPS_FILE, "visited"), (TRIPS_FILE, "published")]:
        text = path.read_text(encoding="utf-8")
        if source == "published":
            text = text[text.index("const rawTrips") : text.index("export const trips")]
        pattern = re.compile(
            r'slug:\s*"([^"]+)"\s*,\s*\n\s*title:\s*"([^"]+)"\s*,[\s\S]*?\n\s*region:\s*"([^"]+)"'
        )
        for match in pattern.finditer(text):
            trips.append(
                {
                    "slug": match.group(1),
                    "title": match.group(2),
                    "region": match.group(3),
                    "source": source,
                }
            )
    return trips


def trip_title_for_folder(folder_name: str) -> str:
    return FOLDER_TITLE_ALIASES.get(folder_name, folder_name)


def match_folders_to_trips(
    region_key: str,
    folders: dict[str, FolderPhotos],
    all_trips: list[dict[str, str]],
) -> tuple[list[PlaceMatch], list[str], list[str]]:
    title_to_trip: dict[str, dict[str, str]] = {}
    for trip in all_trips:
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
            missing_hero.append(folder_name)
            continue

        if trip["slug"] in matched_slugs:
            continue
        matched_slugs.add(trip["slug"])

        hero_url = (
            image_url(region_key, folder_name, photos.hero_file)
            if photos.hero_file
            else None
        )
        gallery_urls = [
            image_url(region_key, folder_name, f) for f in photos.gallery_files
        ]

        matches.append(
            PlaceMatch(
                region_key=region_key,
                folder_name=folder_name,
                slug=trip["slug"],
                title=title,
                trip_region=trip["region"],
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
        block = block.replace(
            "    gallerySubtitle:", f"{gallery_block}\n    gallerySubtitle:", 1
        )

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


def disk_path_from_url(url: str) -> Path:
    return PROJECT_ROOT / "public" / unquote(url.lstrip("/"))


def verify_paths(matches: list[PlaceMatch]) -> tuple[list[str], list[str]]:
    missing_files: list[str] = []
    hero_urls_seen: dict[str, str] = {}
    duplicates: list[str] = []

    for match in matches:
        if match.hero_url:
            disk_path = disk_path_from_url(match.hero_url)
            if not disk_path.is_file():
                missing_files.append(match.hero_url)
            if match.hero_url in hero_urls_seen.values():
                duplicates.append(
                    f"Duplicate hero URL {match.hero_url}: "
                    f"{hero_urls_seen.get(match.hero_url)} and {match.slug}"
                )
            hero_urls_seen[match.slug] = match.hero_url

        for url in match.gallery_urls:
            disk_path = disk_path_from_url(url)
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


def trips_in_data_region(all_trips: list[dict[str, str]], hebrew_region: str) -> list[dict]:
    return [t for t in all_trips if t["region"] == hebrew_region]


def count_trips_with_hero_in_file(slugs: set[str]) -> int:
    text = VISITED_TRIPS_FILE.read_text(encoding="utf-8") + TRIPS_FILE.read_text(
        encoding="utf-8"
    )
    count = 0
    for slug in slugs:
        block_pattern = re.compile(
            rf'slug: "{re.escape(slug)}"[\s\S]*?(?=slug: "|$)'
        )
        block = block_pattern.search(text)
        if block and "heroImage:" in block.group(0):
            count += 1
    return count


def build_region_report(
    region_key: str,
    hebrew_region: str,
    folders: dict[str, FolderPhotos],
    matches: list[PlaceMatch],
    unmatched_folders: list[str],
    missing_hero: list[str],
    all_trips: list[dict[str, str]],
) -> dict:
    region_trips = trips_in_data_region(all_trips, hebrew_region)
    matched_slugs = {m.slug for m in matches if m.trip_region == hebrew_region}
    matched_titles = {m.title for m in matches if m.trip_region == hebrew_region}

    still_placeholder_data = [
        t["title"]
        for t in region_trips
        if t["title"] not in matched_titles
    ]

    return {
        "locations_found": len(folders),
        "photos_found": count_photos(folders),
        "locations_matched": len(matches),
        "locations_matched_in_region": len(matched_slugs),
        "matched": [
            {
                "title": m.title,
                "slug": m.slug,
                "folder": m.folder_name,
                "trip_region": m.trip_region,
                "gallery_count": len(m.gallery_urls),
            }
            for m in matches
        ],
        "still_using_placeholders": still_placeholder_data
        + unmatched_folders
        + missing_hero,
        "unmatched_folders": unmatched_folders,
        "folders_missing_hero": missing_hero,
        "empty_folders": [
            name
            for name, photos in folders.items()
            if not photos.hero_file and not photos.gallery_files
        ],
    }


def main() -> int:
    all_trips = load_all_trips()
    all_matches: list[PlaceMatch] = []
    report_regions: dict[str, dict] = {}

    for region_key, hebrew_region in SYNC_REGIONS.items():
        folders = scan_region_folders(region_key)
        matches, unmatched_folders, missing_hero = match_folders_to_trips(
            region_key, folders, all_trips
        )
        all_matches.extend(matches)
        report_regions[region_key.upper()] = build_region_report(
            region_key,
            hebrew_region,
            folders,
            matches,
            unmatched_folders,
            missing_hero,
            all_trips,
        )

    visited_updated = patch_trips_file(VISITED_TRIPS_FILE, all_matches, "visited")
    published_updated = patch_trips_file(TRIPS_FILE, all_matches, "published")

    missing_files, duplicates = verify_paths(all_matches)

    report = {
        "regions": report_regions,
        "summary": {
            "total_folders_scanned": sum(
                r["locations_found"] for r in report_regions.values()
            ),
            "total_photos_found": sum(
                r["photos_found"] for r in report_regions.values()
            ),
            "total_locations_matched": len(all_matches),
            "visited_trips_updated": visited_updated,
            "published_trips_updated": published_updated,
            "missing_files_on_disk": missing_files,
            "duplicate_assignments": duplicates,
        },
    }
    REPORT_FILE.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print("Partial region photo sync")
    for key, data in report_regions.items():
        print(f"\n{key}")
        print(f"  locations found: {data['locations_found']}")
        print(f"  photos found: {data['photos_found']}")
        print(f"  locations matched: {data['locations_matched']}")
        print(f"  still using placeholders: {len(data['still_using_placeholders'])}")
        for item in data["matched"]:
            print(
                f"    ✓ {item['title']} ({item['slug']}) "
                f"[trip region: {item['trip_region']}] gallery: {item['gallery_count']}"
            )

    print(f"\nVisited trips updated: {visited_updated}")
    print(f"Published trips updated: {published_updated}")

    if missing_files:
        print(f"\nMissing files ({len(missing_files)}):")
        for item in missing_files:
            print(f"  - {item}")
    if duplicates:
        print(f"\nDuplicates ({len(duplicates)}):")
        for item in duplicates:
            print(f"  - {item}")

    print(f"\nReport: {REPORT_FILE}")
    return 1 if missing_files or duplicates else 0


if __name__ == "__main__":
    raise SystemExit(main())
