#!/usr/bin/env python3
"""Generate media/content backlog report from trip data and place image folders."""

from __future__ import annotations

import importlib.util
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote

PROJECT_ROOT = Path(__file__).resolve().parent.parent
AUDIT_SCRIPT = PROJECT_ROOT / "scripts" / "audit-sync-all-place-photos.py"
REPORT_JSON = PROJECT_ROOT / "data" / "media-backlog-report.json"
REPORT_MD = PROJECT_ROOT / "data" / "media-backlog-report.md"


def load_audit_module():
    spec = importlib.util.spec_from_file_location("audit_sync", AUDIT_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    sys.modules["audit_sync"] = module
    spec.loader.exec_module(module)
    return module


audit = load_audit_module()

FOLDER_TITLE_ALIASES = audit.FOLDER_TITLE_ALIASES
SYNC_REGIONS = audit.SYNC_REGIONS
disk_path_from_url = audit.disk_path_from_url
extract_trip_media_states = audit.extract_trip_media_states
load_all_trips = audit.load_all_trips
load_site_visible_slugs = audit.load_site_visible_slugs
scan_region_folders = audit.scan_region_folders
trip_title_for_folder = audit.trip_title_for_folder


def validate_trip_paths() -> tuple[list[dict], list[dict]]:
    broken: list[dict] = []
    duplicates: list[dict] = []
    hero_seen: dict[str, str] = {}

    for slug, state in extract_trip_media_states().items():
        urls = ([state.hero_image] if state.hero_image else []) + state.gallery_urls
        for url in urls:
            if not url or not url.startswith("/images/"):
                continue
            if not disk_path_from_url(url).is_file():
                broken.append({"slug": slug, "title": state.title, "url": url})
            if url.startswith("/images/places/"):
                stem = Path(unquote(url)).stem.lower()
                if stem == "hero" or "hero" in Path(unquote(url)).name.lower():
                    if url in hero_seen and hero_seen[url] != slug:
                        duplicates.append(
                            {"url": url, "slugA": hero_seen[url], "slugB": slug}
                        )
                    hero_seen[url] = slug

    return broken, duplicates


def folder_index() -> dict[str, list[str]]:
    index: dict[str, list[str]] = {}
    for region_key in SYNC_REGIONS:
        for folder_name, photos in scan_region_folders(region_key).items():
            if photos.hero_file or photos.gallery_files:
                title = trip_title_for_folder(folder_name)
                index.setdefault(title, []).append(f"{region_key}/{folder_name}")
    return index


def trips_with_folders_no_entry(
    all_trips: list[dict[str, str]],
    folders_by_title: dict[str, list[str]],
) -> list[dict]:
    trip_titles = {trip["title"] for trip in all_trips}
    return [
        {"folderTitle": title, "folders": paths}
        for title, paths in sorted(folders_by_title.items())
        if title not in trip_titles
    ]


def unmatched_folders(all_trips: list[dict[str, str]]) -> list[str]:
    unmatched: list[str] = []
    title_to_trip = {trip["title"]: trip for trip in all_trips}

    for region_key in SYNC_REGIONS:
        for folder_name, photos in scan_region_folders(region_key).items():
            if not photos.hero_file and not photos.gallery_files:
                continue
            title = trip_title_for_folder(folder_name)
            if title not in title_to_trip:
                unmatched.append(f"{region_key}/{folder_name} → (no trip for '{title}')")
    return unmatched


def build_report() -> dict:
    states = extract_trip_media_states()
    site_slugs = load_site_visible_slugs()
    all_trips = load_all_trips()
    folders_by_title = folder_index()
    broken, duplicates = validate_trip_paths()
    unmatched = unmatched_folders(all_trips)
    folders_no_trip = trips_with_folders_no_entry(all_trips, folders_by_title)

    placeholder_heroes = [
        {
            "slug": slug,
            "title": state.title,
            "region": state.region,
            "siteVisible": slug in site_slugs,
        }
        for slug, state in sorted(states.items(), key=lambda item: item[1].title)
        if state.uses_placeholder_hero
    ]

    no_gallery = [
        {
            "slug": slug,
            "title": state.title,
            "region": state.region,
            "hasRealHero": state.has_real_hero,
            "siteVisible": slug in site_slugs,
        }
        for slug, state in sorted(states.items(), key=lambda item: item[1].title)
        if state.gallery_count == 0
    ]

    incomplete_media = []
    for slug, state in sorted(states.items(), key=lambda item: item[1].title):
        issues = []
        if state.uses_placeholder_hero:
            issues.append("placeholder_or_missing_hero")
        if state.gallery_count == 0:
            issues.append("empty_gallery")
        elif state.gallery_count < 3:
            issues.append("incomplete_gallery")
        if issues:
            incomplete_media.append(
                {
                    "slug": slug,
                    "title": state.title,
                    "region": state.region,
                    "issues": issues,
                    "heroImage": state.hero_image,
                    "galleryCount": state.gallery_count,
                    "siteVisible": slug in site_slugs,
                }
            )

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "folderAliasesInUse": FOLDER_TITLE_ALIASES,
        "A_placeholderHeroTrips": placeholder_heroes,
        "B_tripsWithNoGallery": no_gallery,
        "C_tripsWithIncompleteMedia": incomplete_media,
        "D_foldersWithoutTripEntries": folders_no_trip,
        "E_unmatchedImageFolders": unmatched,
        "validation": {
            "brokenImagePaths": broken,
            "duplicateHeroAssignments": duplicates,
            "brokenPathCount": len(broken),
            "duplicateCount": len(duplicates),
        },
        "summary": {
            "totalTrips": len(states),
            "placeholderHeroCount": len(placeholder_heroes),
            "noGalleryCount": len(no_gallery),
            "incompleteMediaCount": len(incomplete_media),
            "foldersWithoutTripCount": len(folders_no_trip),
            "unmatchedFolderCount": len(unmatched),
            "siteVisibleTrips": len(site_slugs),
        },
    }


def write_markdown(report: dict) -> None:
    s = report["summary"]
    lines = [
        "# Media / content backlog",
        "",
        f"Generated: {report['generatedAt']}",
        "",
        "## Summary",
        "",
        f"- Placeholder heroes: **{s['placeholderHeroCount']}**",
        f"- No gallery: **{s['noGalleryCount']}**",
        f"- Incomplete media: **{s['incompleteMediaCount']}**",
        f"- Folders without trip entries: **{s['foldersWithoutTripCount']}**",
        f"- Unmatched image folders: **{s['unmatchedFolderCount']}**",
        f"- Broken image paths: **{report['validation']['brokenPathCount']}**",
        "",
        "## A. Placeholder hero trips",
        "",
    ]
    for item in report["A_placeholderHeroTrips"]:
        vis = "site-visible" if item["siteVisible"] else "hidden"
        lines.append(f"- `{item['slug']}` - {item['title']} ({item['region']}, {vis})")

    lines.extend(["", "## B. Trips with no gallery", ""])
    for item in report["B_tripsWithNoGallery"]:
        lines.append(f"- `{item['slug']}` - {item['title']}")

    lines.extend(["", "## C. Incomplete media", ""])
    for item in report["C_tripsWithIncompleteMedia"][:50]:
        lines.append(
            f"- `{item['slug']}` - {item['title']} ({', '.join(item['issues'])})"
        )

    lines.extend(["", "## D. Image folders without trip entries", ""])
    for item in report["D_foldersWithoutTripEntries"]:
        lines.append(f"- {item['folderTitle']}: {', '.join(item['folders'])}")

    lines.extend(["", "## E. Unmatched image folders", ""])
    for item in report["E_unmatchedImageFolders"]:
        lines.append(f"- `{item}`")

    lines.extend(["", "## Folder aliases (image matching)", ""])
    for folder, title in sorted(report["folderAliasesInUse"].items()):
        lines.append(f"- `{folder}` → `{title}`")

    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    report = build_report()
    REPORT_JSON.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    write_markdown(report)

    print("Media backlog report")
    print(f"  Placeholder heroes: {report['summary']['placeholderHeroCount']}")
    print(f"  No gallery: {report['summary']['noGalleryCount']}")
    print(f"  Unmatched folders: {report['summary']['unmatchedFolderCount']}")
    print(f"  Broken paths: {report['validation']['brokenPathCount']}")
    print(f"  Report: {REPORT_MD.relative_to(PROJECT_ROOT)}")
    return 1 if report["validation"]["brokenPathCount"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
