#!/usr/bin/env python3
"""
Full image sync audit across all public/images/places/{region} folders.

Scans every region, matches folders to trips by title (with aliases),
updates heroImage + gallery from disk, and writes a structured audit report.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional
from urllib.parse import quote, unquote

PROJECT_ROOT = Path(__file__).resolve().parent.parent
PLACES_ROOT = PROJECT_ROOT / "public" / "images" / "places"
VISITED_TRIPS_FILE = PROJECT_ROOT / "data" / "visited-place-trips.ts"
TRIPS_FILE = PROJECT_ROOT / "data" / "trips.ts"
REPORT_FILE = PROJECT_ROOT / "data" / "image-sync-audit-report.json"
PREVIOUS_REPORT_FILE = PROJECT_ROOT / "data" / "image-sync-audit-report.json"

SYNC_REGIONS = ["north", "hasharon", "center", "jerusalem", "south"]

HERO_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic"}
WEB_GALLERY_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

# Direct slug → (region_key, folder_name) for title/alias mismatches (e.g. coming-soon duplicates).
SLUG_FOLDER_OVERRIDES: dict[str, tuple[str, str]] = {
    "nchl-dn": ("north", "שמורת תל דן"),
    "nchl-shvpt": ("north", "נחל שופט"),
    "brykt-rm-msdh": ("north", "בריכת רם - מסעדה"),
}

FOLDER_TITLE_ALIASES: dict[str, str] = {
    "פארק נחל לכיש": "פארק לכיש",
    "נחל נקרות יקנעם": "פארק נחל קרת",
    "נחל שופט": "נחל השופט",
    "תל דן": "שמורת תל דן",
    "המפל הנסתר פתח תקווה": "המפל הנסתר",
    "שמורת טבע נחל שורק": "שפך נחל שורק",
    "עין חרוד": "מעיין חרוד",
    "משק בגבעה": "משק בגבעה גדרה",
    "מצפה אלון": "מצפה נתן",
}


@dataclass
class FolderPhotos:
    region_key: str
    folder_name: str
    hero_file: Optional[str] = None
    gallery_files: list[str] = field(default_factory=list)
    skipped_files: list[str] = field(default_factory=list)
    missing_hero: bool = False
    auto_selected_hero: bool = False
    newest_mtime: Optional[float] = None


@dataclass
class PlaceMatch:
    region_key: str
    folder_name: str
    slug: str
    title: str
    trip_region: str
    source: str
    hero_url: Optional[str] = None
    gallery_urls: list[str] = field(default_factory=list)


@dataclass
class TripMediaState:
    slug: str
    title: str
    region: str
    source: str
    hero_image: Optional[str] = None
    gallery_urls: list[str] = field(default_factory=list)

    @property
    def has_real_hero(self) -> bool:
        return bool(self.hero_image and self.hero_image.startswith("/images/places/"))

    @property
    def uses_placeholder_hero(self) -> bool:
        return not self.has_real_hero

    @property
    def gallery_count(self) -> int:
        return len(self.gallery_urls)


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


def is_raster_file(name: str) -> bool:
    return Path(name).suffix.lower() in WEB_GALLERY_EXTENSIONS


def get_image_dimensions(path: Path) -> tuple[int, int]:
    try:
        result = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
            capture_output=True,
            text=True,
            check=False,
        )
        width = height = 0
        for line in result.stdout.splitlines():
            if "pixelWidth:" in line:
                width = int(line.split(":")[-1].strip())
            if "pixelHeight:" in line:
                height = int(line.split(":")[-1].strip())
        if width > 0 and height > 0:
            return width, height
    except (OSError, ValueError, subprocess.SubprocessError):
        pass
    return 0, 0


def score_hero_candidate(path: Path) -> tuple[float, int, int]:
    width, height = get_image_dimensions(path)
    if width <= 0 or height <= 0:
        size = path.stat().st_size
        return float(size), 0, 0

    landscape_bonus = 1.35 if width >= height else 1.0
    megapixels = (width * height) / 1_000_000
    size_mb = path.stat().st_size / (1024 * 1024)
    score = megapixels * landscape_bonus + min(size_mb, 8.0) * 0.15
    return score, width, height


def pick_best_hero_file(folder_path: Path, filenames: list[str]) -> Optional[str]:
    candidates = [
        name
        for name in filenames
        if is_raster_file(name) and not is_hero_file(name)
    ]
    if not candidates:
        return None

    ranked = sorted(
        candidates,
        key=lambda name: score_hero_candidate(folder_path / name),
        reverse=True,
    )
    return ranked[0]


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
            f for f in folder.iterdir() if f.is_file() and not f.name.startswith(".")
        )
        filenames = [f.name for f in files]

        for file in files:
            filename = file.name
            mtime = file.stat().st_mtime
            photos.newest_mtime = max(photos.newest_mtime or 0, mtime)

            if is_hero_file(filename):
                photos.hero_file = filename
            elif is_gallery_file(filename):
                photos.gallery_files.append(filename)
            elif Path(filename).suffix.lower() in HERO_EXTENSIONS:
                photos.skipped_files.append(filename)

        if photos.hero_file is None:
            auto_hero = pick_best_hero_file(folder, filenames)
            if auto_hero:
                photos.hero_file = auto_hero
                photos.auto_selected_hero = True
                if auto_hero in photos.gallery_files:
                    photos.gallery_files.remove(auto_hero)

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


def extract_trip_media_states() -> dict[str, TripMediaState]:
    states: dict[str, TripMediaState] = {}

    for path, source in [(VISITED_TRIPS_FILE, "visited"), (TRIPS_FILE, "published")]:
        text = path.read_text(encoding="utf-8")
        if source == "published":
            text = text[text.index("const rawTrips") : text.index("export const trips")]

        block_pattern = re.compile(
            r'  \{\n    slug: "([^"]+)",[\s\S]*?\n  \},'
        )
        for block_match in block_pattern.finditer(text):
            block = block_match.group(0)
            slug_match = re.search(r'slug: "([^"]+)"', block)
            title_match = re.search(r'title: "([^"]+)"', block)
            region_match = re.search(r'region: "([^"]+)"', block)
            if not slug_match or not title_match or not region_match:
                continue

            slug = slug_match.group(1)
            hero_match = re.search(r'heroImage: "([^"]+)"', block)
            gallery_urls = re.findall(r'src: "([^"]+)"', block)

            existing = states.get(slug)
            if existing and existing.source == "published" and source == "visited":
                continue

            states[slug] = TripMediaState(
                slug=slug,
                title=title_match.group(1),
                region=region_match.group(1),
                source=source,
                hero_image=hero_match.group(1) if hero_match else None,
                gallery_urls=gallery_urls,
            )

    return states


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

    candidates: list[PlaceMatch] = []
    unmatched_folders: list[str] = []
    missing_hero: list[str] = []

    for folder_name, photos in folders.items():
        title = trip_title_for_folder(folder_name)
        trip = title_to_trip.get(title)

        if trip is None:
            unmatched_folders.append(f"{region_key}/{folder_name}")
            continue

        if photos.missing_hero:
            missing_hero.append(f"{region_key}/{folder_name} → {trip['slug']} ({title})")
            continue

        if photos.auto_selected_hero and photos.hero_file:
            missing_hero.append(
                f"AUTO_HERO {region_key}/{folder_name} → {trip['slug']} ({photos.hero_file})"
            )

        hero_url = (
            image_url(region_key, folder_name, photos.hero_file)
            if photos.hero_file
            else None
        )
        gallery_urls = [
            image_url(region_key, folder_name, f) for f in photos.gallery_files
        ]

        candidates.append(
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

    by_slug: dict[str, list[PlaceMatch]] = {}
    for candidate in candidates:
        by_slug.setdefault(candidate.slug, []).append(candidate)

    matches: list[PlaceMatch] = []
    for slug, options in by_slug.items():
        best = max(
            options,
            key=lambda option: (
                option.folder_name == option.title,
                len(option.gallery_urls),
                option.folder_name,
            ),
        )
        matches.append(best)

    return matches, unmatched_folders, missing_hero


def build_slug_override_matches(
    all_folders: dict[str, dict[str, FolderPhotos]],
    all_trips: list[dict[str, str]],
) -> list[PlaceMatch]:
    slug_to_trip = {trip["slug"]: trip for trip in all_trips}
    matches: list[PlaceMatch] = []

    for slug, (region_key, folder_name) in SLUG_FOLDER_OVERRIDES.items():
        trip = slug_to_trip.get(slug)
        photos = all_folders.get(region_key, {}).get(folder_name)
        if trip is None or photos is None or photos.missing_hero:
            continue

        hero_url = (
            image_url(region_key, folder_name, photos.hero_file)
            if photos.hero_file
            else None
        )
        gallery_urls = [
            image_url(region_key, folder_name, filename)
            for filename in photos.gallery_files
        ]
        matches.append(
            PlaceMatch(
                region_key=region_key,
                folder_name=folder_name,
                slug=slug,
                title=trip["title"],
                trip_region=trip["region"],
                source=trip["source"],
                hero_url=hero_url,
                gallery_urls=gallery_urls,
            )
        )

    return matches


def render_gallery(urls: list[str], indent: str = "    ") -> str:
    if not urls:
        return f"{indent}gallery: [],"
    lines = [f"{indent}gallery: ["]
    for url in urls:
        lines.append(f'{indent}  {{ src: "{escape_ts(url)}" }},')
    lines.append(f"{indent}],")
    return "\n".join(lines)


def patch_slug_block(block: str, match: PlaceMatch, before: Optional[TripMediaState]) -> str:
    is_exact_folder = match.folder_name == match.title
    should_update_hero = bool(match.hero_url)
    if before and before.has_real_hero:
        if match.hero_url == before.hero_image:
            should_update_hero = False
        elif not is_exact_folder:
            should_update_hero = False

    if should_update_hero and match.hero_url:
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

    should_update_gallery = True
    if before and before.gallery_urls == match.gallery_urls:
        should_update_gallery = False
    elif before and before.gallery_count > len(match.gallery_urls) and not is_exact_folder:
        should_update_gallery = False
    elif before and is_exact_folder and before.gallery_count > 0 and len(match.gallery_urls) >= before.gallery_count:
        should_update_gallery = len(match.gallery_urls) != before.gallery_count

    if should_update_gallery:
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


def patch_trips_file(
    path: Path,
    matches: list[PlaceMatch],
    source: str,
    before_states: dict[str, TripMediaState],
) -> list[str]:
    updated_slugs: list[str] = []
    slugs = {match.slug for match in matches if match.source == source}
    if not slugs:
        return updated_slugs

    text = path.read_text(encoding="utf-8")

    for match in matches:
        if match.source != source:
            continue

        before = before_states.get(match.slug)
        slug_pattern = re.compile(
            rf'(  \{{\n    slug: "{re.escape(match.slug)}",[\s\S]*?\n  \}},)'
        )
        found = slug_pattern.search(text)
        if not found:
            print(f"Warning: slug not found in {path.name}: {match.slug}", file=sys.stderr)
            continue

        original_block = found.group(1)
        new_block = patch_slug_block(original_block, match, before)
        if new_block != original_block:
            text = text[: found.start(1)] + new_block + text[found.end(1) :]
            updated_slugs.append(match.slug)

    path.write_text(text, encoding="utf-8")
    return updated_slugs


def disk_path_from_url(url: str) -> Path:
    return PROJECT_ROOT / "public" / unquote(url.lstrip("/"))


def url_from_disk_path(path: Path) -> str:
    rel = path.relative_to(PROJECT_ROOT / "public")
    parts = rel.parts
    if len(parts) < 4 or parts[0] != "images" or parts[1] != "places":
        return "/" + rel.as_posix()
    region_key, folder_name = parts[2], parts[3]
    filename = "/".join(parts[4:])
    return image_url(region_key, folder_name, filename)


def resolve_broken_image_url(url: str) -> tuple[str, bool]:
    path = disk_path_from_url(url)
    if path.is_file():
        return url, False

    parent = path.parent
    if not parent.is_dir():
        return url, False

    target_name = path.name
    target_stem = path.stem.lower()
    target_suffix = path.suffix.lower()

    for candidate in parent.iterdir():
        if not candidate.is_file() or candidate.name.startswith("."):
            continue
        if candidate.name == target_name:
            return url_from_disk_path(candidate), True
        if (
            candidate.stem.lower() == target_stem
            and candidate.suffix.lower() == target_suffix
        ):
            return url_from_disk_path(candidate), True

    return url, False


def validate_and_fix_trip_file_paths(path: Path) -> tuple[list[dict], list[dict]]:
    text = path.read_text(encoding="utf-8")
    fixed: list[dict] = []
    broken: list[dict] = []

    def replace_url(match: re.Match[str]) -> str:
        key = match.group(1)
        url = match.group(2)
        if not url.startswith("/images/places/"):
            return match.group(0)
        resolved, changed = resolve_broken_image_url(url)
        if not disk_path_from_url(resolved).is_file():
            broken.append({"file": path.name, "field": key, "url": url})
            return match.group(0)
        if changed:
            fixed.append({"file": path.name, "field": key, "from": url, "to": resolved})
            return f'{key}: "{escape_ts(resolved)}"'
        return match.group(0)

    patterns = [
        re.compile(r'(heroImage): "([^"]+)"'),
        re.compile(r'(src): "([^"]+)"'),
    ]

    updated = text
    for pattern in patterns:
        updated = pattern.sub(replace_url, updated)

    if updated != text:
        path.write_text(updated, encoding="utf-8")

    return fixed, broken


def load_site_visible_slugs() -> dict[str, str]:
    sync_file = PROJECT_ROOT / "data" / "places-filter-sync.ts"
    text = sync_file.read_text(encoding="utf-8")
    slugs: dict[str, str] = {}
    pattern = re.compile(
        r'"([^"]+)": \{ region: "[^"]+", regionSlug: "[^"]+", excelName: "([^"]+)"'
    )
    for match in pattern.finditer(text):
        slugs[match.group(1)] = match.group(2)
    return slugs


def find_trips_without_folders(
    site_slugs: dict[str, str],
    all_trips: list[dict[str, str]],
    all_folders: dict[str, dict[str, FolderPhotos]],
) -> list[dict]:
    folder_titles = {
        trip_title_for_folder(name)
        for folders in all_folders.values()
        for name, photos in folders.items()
        if photos.hero_file or photos.gallery_files
    }
    slug_to_title = {trip["slug"]: trip["title"] for trip in all_trips}

    missing: list[dict] = []
    for slug, excel_name in sorted(site_slugs.items(), key=lambda item: item[1]):
        title = slug_to_title.get(slug, excel_name)
        names_to_check = {title, excel_name, trip_title_for_folder(excel_name)}
        if not any(name in folder_titles for name in names_to_check):
            has_any_folder = any(
                folder_name == title
                or folder_name == excel_name
                or trip_title_for_folder(folder_name) == title
                for folders in all_folders.values()
                for folder_name in folders
            )
            missing.append(
                {
                    "slug": slug,
                    "title": title,
                    "excelName": excel_name,
                    "hasImageFolderOnDisk": has_any_folder,
                }
            )
    return missing


def verify_paths(matches: list[PlaceMatch]) -> tuple[list[str], list[str]]:
    missing_files: list[str] = []
    hero_urls_seen: dict[str, str] = {}
    duplicates: list[str] = []

    for match in matches:
        if match.hero_url:
            if not disk_path_from_url(match.hero_url).is_file():
                missing_files.append(match.hero_url)
            if match.hero_url in hero_urls_seen.values():
                duplicates.append(
                    f"Duplicate hero URL {match.hero_url}: "
                    f"{hero_urls_seen.get(match.hero_url)} and {match.slug}"
                )
            hero_urls_seen[match.slug] = match.hero_url

        for url in match.gallery_urls:
            if not disk_path_from_url(url).is_file():
                missing_files.append(url)

    return missing_files, duplicates


def load_previous_report() -> dict:
    if PREVIOUS_REPORT_FILE.is_file():
        try:
            return json.loads(PREVIOUS_REPORT_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return {}
    return {}


def detect_new_disk_images(
    all_folders: dict[str, dict[str, FolderPhotos]],
    since_hours: int = 48,
) -> list[dict]:
    cutoff = datetime.now().timestamp() - since_hours * 3600
    recent: list[dict] = []

    for region_key, folders in all_folders.items():
        for folder_name, photos in folders.items():
            region_root = PLACES_ROOT / region_key / folder_name
            for file in region_root.iterdir():
                if not file.is_file():
                    continue
                if file.suffix.lower() not in HERO_EXTENSIONS:
                    continue
                mtime = file.stat().st_mtime
                if mtime >= cutoff:
                    recent.append(
                        {
                            "path": str(file.relative_to(PROJECT_ROOT / "public")),
                            "modifiedAt": datetime.fromtimestamp(mtime, tz=timezone.utc).isoformat(),
                            "region": region_key,
                            "folder": folder_name,
                            "file": file.name,
                        }
                    )
    return sorted(recent, key=lambda item: item["path"])


def build_sync_changes(
    before: dict[str, TripMediaState],
    after: dict[str, TripMediaState],
) -> tuple[list[dict], list[dict]]:
    new_heroes: list[dict] = []
    new_galleries: list[dict] = []

    for slug, after_state in after.items():
        before_state = before.get(slug)
        if not before_state:
            continue

        if after_state.has_real_hero and (
            not before_state.has_real_hero or before_state.hero_image != after_state.hero_image
        ):
            new_heroes.append(
                {
                    "slug": slug,
                    "title": after_state.title,
                    "heroImage": after_state.hero_image,
                    "previousHero": before_state.hero_image,
                }
            )

        if after_state.gallery_count > before_state.gallery_count or (
            after_state.gallery_urls != before_state.gallery_urls
            and after_state.gallery_count > 0
        ):
            added = [
                url
                for url in after_state.gallery_urls
                if url not in before_state.gallery_urls
            ]
            if added or (before_state.gallery_count == 0 and after_state.gallery_count > 0):
                new_galleries.append(
                    {
                        "slug": slug,
                        "title": after_state.title,
                        "galleryCount": after_state.gallery_count,
                        "previousGalleryCount": before_state.gallery_count,
                        "addedImages": added,
                    }
                )

    return new_heroes, new_galleries


def main() -> int:
    previous_report = load_previous_report()
    before_states = extract_trip_media_states()
    all_trips = load_all_trips()

    path_fixes: list[dict] = []
    remaining_broken: list[dict] = []
    for trip_file in (VISITED_TRIPS_FILE, TRIPS_FILE):
        fixed, broken = validate_and_fix_trip_file_paths(trip_file)
        path_fixes.extend(fixed)
        remaining_broken.extend(broken)

    if path_fixes:
        before_states = extract_trip_media_states()

    all_folders: dict[str, dict[str, FolderPhotos]] = {}
    all_matches: list[PlaceMatch] = []
    all_unmatched: list[str] = []
    all_missing_hero: list[str] = []

    for region_key in SYNC_REGIONS:
        folders = scan_region_folders(region_key)
        all_folders[region_key] = folders
        matches, unmatched, missing_hero = match_folders_to_trips(
            region_key, folders, all_trips
        )
        all_matches.extend(matches)
        all_unmatched.extend(unmatched)
        all_missing_hero.extend(missing_hero)

    override_matches = build_slug_override_matches(all_folders, all_trips)
    existing_slug_matches = {m.slug for m in all_matches}
    for match in override_matches:
        if match.slug not in existing_slug_matches:
            all_matches.append(match)
            existing_slug_matches.add(match.slug)

    visited_updated = patch_trips_file(
        VISITED_TRIPS_FILE, all_matches, "visited", before_states
    )
    published_updated = patch_trips_file(
        TRIPS_FILE, all_matches, "published", before_states
    )

    after_states = extract_trip_media_states()
    new_heroes, new_galleries = build_sync_changes(before_states, after_states)
    missing_files, duplicates = verify_paths(all_matches)
    recent_images = detect_new_disk_images(all_folders)
    site_slugs = load_site_visible_slugs()
    trips_without_folders = find_trips_without_folders(
        site_slugs, all_trips, all_folders
    )
    auto_selected_heroes = [
        entry
        for entry in all_missing_hero
        if entry.startswith("AUTO_HERO ")
    ]
    folders_still_missing_hero = [
        entry for entry in all_missing_hero if not entry.startswith("AUTO_HERO ")
    ]

    matched_slugs = {m.slug for m in all_matches}
    folders_with_hero = sum(
        1
        for folders in all_folders.values()
        for photos in folders.values()
        if photos.hero_file
    )
    total_folders = sum(len(folders) for folders in all_folders.values())

    missing_media: list[dict] = []
    for slug, state in sorted(after_states.items(), key=lambda item: item[1].title):
        issues: list[str] = []
        if state.uses_placeholder_hero:
            issues.append("placeholder_or_missing_hero")
        if state.gallery_count == 0:
            issues.append("empty_gallery")
        elif state.gallery_count < 3:
            issues.append("incomplete_gallery")

        if issues:
            missing_media.append(
                {
                    "slug": slug,
                    "title": state.title,
                    "region": state.region,
                    "issues": issues,
                    "heroImage": state.hero_image,
                    "galleryCount": state.gallery_count,
                    "hasFolderWithHero": state.title in {
                        trip_title_for_folder(name)
                        for folders in all_folders.values()
                        for name, photos in folders.items()
                        if photos.hero_file
                    },
                }
            )

    real_hero_count = sum(1 for state in after_states.values() if state.has_real_hero)
    placeholder_count = sum(1 for state in after_states.values() if state.uses_placeholder_hero)
    with_gallery = sum(1 for state in after_states.values() if state.gallery_count > 0)

    report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "A_successfully_synced": {
            "newHeroImages": new_heroes,
            "newOrUpdatedGalleries": new_galleries,
            "visitedTripsUpdated": visited_updated,
            "publishedTripsUpdated": published_updated,
            "totalTripsUpdated": len(set(visited_updated + published_updated)),
        },
        "autoSelectedHeroes": auto_selected_heroes,
        "brokenPathsFixed": path_fixes,
        "brokenPathsRemaining": remaining_broken,
        "tripsWithoutImageFolders": trips_without_folders,
        "B_unmatched_folders": all_unmatched,
        "C_missing_media": missing_media,
        "D_coverage_summary": {
            "totalTrips": len(after_states),
            "tripsWithRealHeroImages": real_hero_count,
            "tripsUsingPlaceholders": placeholder_count,
            "tripsWithGalleries": with_gallery,
            "tripsMissingMedia": len(missing_media),
            "totalPlaceFolders": total_folders,
            "foldersWithHeroFile": folders_with_hero,
            "foldersMatchedToTrips": len(all_matches),
            "autoHeroSelections": len(auto_selected_heroes),
        },
        "recentDiskImages": recent_images,
        "foldersMissingHero": folders_still_missing_hero,
        "missingFilesOnDisk": missing_files,
        "duplicateAssignments": duplicates,
        "previousAuditGeneratedAt": previous_report.get("generatedAt"),
    }

    REPORT_FILE.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print("Image sync audit")
    print(f"Folders scanned: {total_folders} ({folders_with_hero} with hero.*)")
    print(f"Matched to trips: {len(all_matches)}")
    print(f"Auto-selected heroes: {len(auto_selected_heroes)}")
    print(f"New hero images: {len(new_heroes)}")
    print(f"Gallery updates: {len(new_galleries)}")
    print(f"Visited updated: {len(visited_updated)}")
    print(f"Published updated: {len(published_updated)}")
    print(f"Total trips updated: {len(set(visited_updated + published_updated))}")
    print(f"Broken paths fixed: {len(path_fixes)}")
    print(f"Broken paths remaining: {len(remaining_broken)}")
    print(f"Unmatched folders: {len(all_unmatched)}")
    print(f"Trips without image folders: {len(trips_without_folders)}")
    print(f"Trips with real hero: {real_hero_count}/{len(after_states)}")
    print(f"\nReport: {REPORT_FILE}")

    if auto_selected_heroes:
        print("\nAuto-selected hero images:")
        for item in auto_selected_heroes:
            print(f"  ✓ {item.replace('AUTO_HERO ', '')}")

    if new_heroes:
        print("\nNew hero images:")
        for item in new_heroes:
            print(f"  ✓ {item['title']} ({item['slug']})")

    if new_galleries:
        print("\nGallery updates:")
        for item in new_galleries:
            print(
                f"  ✓ {item['title']} ({item['slug']}): "
                f"{item['previousGalleryCount']} → {item['galleryCount']}"
            )

    if path_fixes:
        print("\nBroken paths fixed:")
        for item in path_fixes[:20]:
            print(f"  ✓ {item['file']} {item['field']}: {item['from']} → {item['to']}")
        if len(path_fixes) > 20:
            print(f"  ... and {len(path_fixes) - 20} more")

    if remaining_broken:
        print("\nBroken paths remaining:")
        for item in remaining_broken[:20]:
            print(f"  - {item['file']} {item['field']}: {item['url']}")

    if all_unmatched:
        print("\nUnmatched folders:")
        for item in all_unmatched:
            print(f"  - {item}")

    return 1 if missing_files or duplicates else 0


if __name__ == "__main__":
    raise SystemExit(main())
