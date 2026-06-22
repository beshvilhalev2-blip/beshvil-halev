# Media backlog cleanup report

Generated: 2026-06-22 (post-cleanup)

## Summary

| Metric | Before (approx.) | After |
|--------|------------------|-------|
| Placeholder / missing heroes | 23 | **21** |
| No gallery | 27 | **25** |
| Real heroes connected | 76/100 | **78/100** (+ ein-moda published trip migrated) |
| Broken image paths | 0 | **0** |

**Trips fixed this pass:** 5 investigated; 3 heroes connected, 1 region-only fix with hero already present, 1 region fix with no images on disk.

---

## Fixed mismatches

### 1. נחל שופט vs נחל השופט (`nchl-shvpt`)

| | |
|---|---|
| **Root cause** | Folder `north/נחל שופט` aliases to title **נחל השופט** (`nahal-hashofet`). Sync matched only the published trip; visited trip `nchl-shvpt` (title **נחל שופט**) was skipped. |
| **Fix** | Added `SLUG_FOLDER_OVERRIDES` in `scripts/audit-sync-all-place-photos.py` mapping `nchl-shvpt` → `north/נחל שופט`. |
| **Result** | Hero: `/images/places/north/נחל שופט/hero.jpeg` · Gallery: 7 images |

### 2. נחל נקרות יקנעם vs פארק נחל קרת (`nchl-nkrvt-yknm`)

| | |
|---|---|
| **Root cause** | Folder `north/נחל נקרות יקנעם` aliases to excelName **פארק נחל קרת**, but trip title was **נחל נקרות יקנעם** - weak title match. |
| **Fix** | Renamed trip title to **פארק נחל קרת** (matches filter/excel). Sync connected folder via existing alias. |
| **Result** | Hero: `/images/places/north/נחל נקרות יקנעם/hero.JPG` · Gallery: 1 image (folder has only hero + 1 extra) |

### 3. עין מודע legacy path (`ein-moda`)

| | |
|---|---|
| **Root cause** | Published trip used legacy `/images/trips/ein-moda/` paths. Empty `places/north/עין מודע/` folder; sync could not auto-update `heroImage: einModaImages[0]` pattern. |
| **Fix** | Copied 4 images from legacy folder into `public/images/places/north/עין מודע/`. Updated `data/trips.ts` hero + gallery to places paths. |
| **Result** | Hero: `/images/places/north/עין מודע/hero.jpeg` · Gallery: 3 images |

### 4. פארק רעננה region mismatch (`prk-rnnh`)

| | |
|---|---|
| **Root cause** | Region was **מרכז** in visited data; filter/excel and expected folder path use **השרון** / `hasharon`. |
| **Fix** | Region corrected to **השרון** in `data/visited-place-trips.ts`. |
| **Result** | Region aligned. **No hero** - `hasharon/פארק רעננה/` folder does not exist on disk (no images to connect). |

### 5. רבדים region mismatch (`rbdym`)

| | |
|---|---|
| **Root cause** | Region was **דרום**; images live in `center/רבדים`; filter says **מרכז**. |
| **Fix** | Region corrected to **מרכז**. Hero was already connected via folder name match. |
| **Result** | Hero: `/images/places/center/רבדים/hero.jpeg` · **No gallery** - folder contains hero only. |

---

## Remaining trips with no hero (21)

Placeholder gradient only - no real photo connected.

| Slug | Title | Region | Visibility |
|------|-------|--------|------------|
| `kvvryvm-yshrl` | אקווריום ישראל | ירושלים | site-visible |
| `chvrsht-gdvnh` | חורשת גדעונה | צפון | site-visible |
| `ben-shemen-forest` | יער בן שמן | מרכז | site-visible |
| `lvnd` | לונדע | דרום | site-visible |
| `myyn-hsvsym` | מעיין הסוסים | צפון | site-visible |
| `mtzph-rbl` | מצפה ארבל | צפון | site-visible |
| `nvf-yylvn` | נוף איילון | מרכז | site-visible |
| `ntzrt` | נצרת | צפון | hidden |
| `kv` | עכו | צפון | hidden |
| `prk-brytnyh` | פארק בריטניה | מרכז | site-visible |
| `prk-ytbth` | פארק יטבתה | דרום | site-visible |
| `prk-mym-shpyym` | פארק מים שפיים | מרכז | site-visible |
| `prk-kndh` | פארק קנדה | מרכז | site-visible |
| `prk-rnnh` | פארק רעננה | השרון | site-visible |
| `pvst-kybvtz-pykym` | פוסט קיבוץ אפיקים | צפון | hidden |
| `klb-hvtl` | קלאב הוטל | צפון | hidden |
| `rmt-gn-spry` | רמת גן - ספארי | מרכז | site-visible |
| `shmvrt-tb-bnys` | שמורת טבע בניאס | צפון | site-visible |
| `nahal-sorek-estuary` | שפך נחל שורק | מרכז | site-visible |
| `tchnt-bv-rbch` | תחנת אבו רבאח | מרכז | site-visible |
| `tl-gzr` | תל גזר | מרכז | site-visible |

---

## Remaining trips with no gallery (25)

| Slug | Title | Notes |
|------|-------|-------|
| `gmvn-hchvlh` | אגמון החולה | Has hero |
| `kvvryvm-yshrl` | אקווריום ישראל | No hero |
| `chvrsht-gdvnh` | חורשת גדעונה | No hero |
| `ben-shemen-forest` | יער בן שמן | No hero |
| `yr-hmlkym` | יער המלאכים | Has hero |
| `lvnd` | לונדע | No hero |
| `myyn-hsvsym` | מעיין הסוסים | No hero |
| `mtzph-rbl` | מצפה ארבל | No hero |
| `nvf-yylvn` | נוף איילון | No hero |
| `ntzrt` | נצרת | No hero |
| `kv` | עכו | No hero |
| `mk-hlh` | עמק האלה | Has hero |
| `prk-brytnyh` | פארק בריטניה | No hero |
| `prk-ytbth` | פארק יטבתה | No hero |
| `prk-mym-shpyym` | פארק מים שפיים | No hero |
| `prk-kndh` | פארק קנדה | No hero |
| `prk-rnnh` | פארק רעננה | No hero; no image folder |
| `pvst-kybvtz-pykym` | פוסט קיבוץ אפיקים | No hero |
| `klb-hvtl` | קלאב הוטל | No hero |
| `rbdym` | רבדים | Has hero; folder has hero only |
| `rmt-gn-spry` | רמת גן - ספארי | No hero |
| `shmvrt-tb-bnys` | שמורת טבע בניאס | No hero |
| `nahal-sorek-estuary` | שפך נחל שורק | No hero |
| `tchnt-bv-rbch` | תחנת אבו רבאח | No hero |
| `tl-gzr` | תל גזר | No hero |

---

## Unresolved items

### Needs photo import (no folder or empty folder)

- **`prk-rnnh` פארק רעננה** - Region fixed to השרון; no `hasharon/פארק רעננה/` folder. Import photos before hero can connect.
- **`rbdym` רבדים** - Hero connected; only one file in folder. Import additional gallery photos.

### Thin galleries (connected but incomplete)

- **`nchl-nkrvt-yknm` פארק נחל קרת** - 1 gallery image on disk (hero + 1). Folder name differs from trip title; alias works.

### Folders without trip entries (intentionally not merged)

| Folder | Reason |
|--------|--------|
| `center/גבעת החרובים` | Separate from existing trip; not requested |
| `south/חוף בוקק` | Kept separate from עין בוקק |
| `hasharon/חוף מעגן מיכאל` | No trip entry |
| `north/חוף נהריה` | No trip entry (not created per instructions) |

### Duplicate hero sharing (informational)

- `north/נחל שופט/hero.jpeg` is shared by **`nchl-shvpt`** (visited) and **`nahal-hashofet`** (published). Both trips legitimately reference the same place photos.

### Script follow-up (optional)

- Sync regex does not update `heroImage: variableRef` patterns (hit on ein-moda before manual fix). Consider extending if more legacy trips exist in `data/trips.ts`.

---

## Files changed

- `scripts/audit-sync-all-place-photos.py` - `SLUG_FOLDER_OVERRIDES` for `nchl-shvpt`
- `data/visited-place-trips.ts` - heroes/galleries for `nchl-shvpt`, `nchl-nkrvt-yknm`; title fix for `nchl-nkrvt-yknm`; region fixes for `prk-rnnh`, `rbdym`
- `data/trips.ts` - `ein-moda` hero + gallery migrated to places paths
- `data/places-filter-sync.ts` - `prk-rnnh` region (if not already from prior pass)
- `public/images/places/north/עין מודע/` - 4 images copied from legacy trips path

Full backlog snapshot: `data/media-backlog-report.md`
