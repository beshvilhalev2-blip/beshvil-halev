# Image compression report

Generated: 2026-06-22T08:52:15.885Z
Dry run: **false**

## Summary

- Files scanned: **330**
- Images optimized: **323**
- Assets copied as-is (SVG/ICO/etc.): **0**
- Skipped / errors: **7**
- Hero images: **47**
- Gallery images: **266**
- Other images: **17**

## Size

- Original total: **1183.92 MB**
- Optimized total (path-compatible): **92.15 MB**
- WebP preview total (not production-ready): **141.70 MB**
- Estimated savings: **1091.76 MB** (92.2%)

## Output locations

- Safe swap candidates: `public/images-optimized/` (same paths & extensions as originals)
- WebP previews only: `public/images/_optimized-report/webp-preview/`
- Originals untouched: `public/images/`

## WebP migration

WebP previews use .webp extensions under _optimized-report/webp-preview/. Trip data and components reference .jpeg/.jpg paths — switching to WebP requires updating data/ trip heroImage/gallery paths OR a build step that maps paths. Path-compatible JPEG/PNG outputs in public/images-optimized/ can replace originals without code changes.

- Files still above hard target after optimization: **13**

## Largest optimized files (top 25)

| Optimized | Original | Category | Path |
| --- | --- | --- | --- |
| 1.14 MB | 1.99 MB | other | `about/mommy-4x4-correct.png` |
| 898.6 KB | 1.88 MB | other | `vehicles/my-rav4-2011-black-v2.png` |
| 830.4 KB | 1.84 MB | other | `ai-assistant/milana-ai-avatar/milana-ai-avatar.png` |
| 483.5 KB | 4.96 MB | hero | `places/center/מעיינות גיבתון/hero.jpeg` |
| 482.1 KB | 3.04 MB | hero | `places/center/גן לאומי מגדל צדק/hero.jpeg` |
| 480.5 KB | 3.41 MB | hero | `places/south/עין בוקק/hero.jpeg` |
| 480.3 KB | 5.75 MB | hero | `places/center/בית לאה/hero.jpeg` |
| 474.2 KB | 3.28 MB | hero | `places/south/יער המלאכים/hero.jpeg` |
| 471.7 KB | 3.83 MB | hero | `places/south/פארק נחל לכיש/hero.jpeg` |
| 470.7 KB | 4.80 MB | hero | `places/south/בתרונות רוחמה/hero.jpeg` |
| 469.9 KB | 4.50 MB | hero | `places/center/תל אפק/hero.jpeg` |
| 469.6 KB | 2.85 MB | hero | `places/south/חאן עין גדי/hero.jpeg` |
| 468.0 KB | 5.44 MB | hero | `places/center/שמורת פלמחים/hero.jpeg` |
| 467.3 KB | 5.22 MB | hero | `places/south/אמציה/hero.jpeg` |
| 458.3 KB | 3.26 MB | hero | `places/center/גבעת החרובים/hero.jpeg` |
| 458.2 KB | 4.33 MB | hero | `places/jerusalem/גן החיות התנכי/hero.JPG` |
| 455.6 KB | 4.04 MB | hero | `places/south/נחל דוד/hero.jpeg` |
| 454.9 KB | 3.17 MB | hero | `places/jerusalem/יער צרעה/hero.jpeg` |
| 446.6 KB | 3.12 MB | hero | `places/jerusalem/עין לבן/hero.jpeg` |
| 444.8 KB | 6.22 MB | hero | `places/north/מפל תנור גבול לבנון/hero.JPG` |
| 441.8 KB | 3.06 MB | hero | `places/north/החוף של מוש אכזיב/hero.jpeg` |
| 439.9 KB | 4.80 MB | hero | `places/north/עין חרדלית/hero.jpeg` |
| 438.4 KB | 1.96 MB | other | `trips/ein-moda/03.jpeg` |
| 437.3 KB | 6.77 MB | hero | `places/center/לגעת בחיות/hero.JPG` |
| 435.2 KB | 3.85 MB | hero | `places/center/משק בגבעה/hero.jpeg` |

## Skipped / errors

- `hero/living-landscape-desktop-light.svg` — Unsupported extension .svg (not processed)
- `hero/living-landscape-mobile-light.svg` — Unsupported extension .svg (not processed)
- `places/center/לגעת בחיות/IMG_5747.HEIC` — Unsupported extension .heic (not processed)
- `places/center/לגעת בחיות/IMG_5769.HEIC` — Unsupported extension .heic (not processed)
- `places/jerusalem/עמק האלה/IMG_0358.HEIC` — Unsupported extension .heic (not processed)
- `places/jerusalem/עמק האלה/IMG_0368.HEIC` — Unsupported extension .heic (not processed)
- `places/jerusalem/עמק האלה/IMG_0372.HEIC` — Unsupported extension .heic (not processed)

## Still above hard target

- `about/mommy-4x4-correct.png` (other): 1.14 MB — Still above hard target (488KB)
- `ai-assistant/milana-ai-avatar/milana-ai-avatar.png` (other): 830.4 KB — Still above hard target (488KB)
- `places/center/בית לאה/IMG_1414.jpeg` (gallery): 315.7 KB — Still above hard target (293KB)
- `places/center/ברבטבע/IMG_6972.JPG` (gallery): 313.6 KB — Still above hard target (293KB)
- `places/center/ברבטבע/IMG_8720.jpeg` (gallery): 293.0 KB — Still above hard target (293KB)
- `places/center/מעיינות גיבתון/IMG_9481.jpeg` (gallery): 321.5 KB — Still above hard target (293KB)
- `places/center/מעיינות גיבתון/IMG_9490.jpeg` (gallery): 310.8 KB — Still above hard target (293KB)
- `places/center/שמורת פלמחים/IMG_2020.jpeg` (gallery): 302.6 KB — Still above hard target (293KB)
- `places/jerusalem/עין חמד/IMG_7562.jpeg` (gallery): 311.3 KB — Still above hard target (293KB)
- `places/jerusalem/עין חמד/IMG_7605.jpeg` (gallery): 296.6 KB — Still above hard target (293KB)
- `places/south/בתרונות רוחמה/IMG_8298.jpeg` (gallery): 320.8 KB — Still above hard target (293KB)
- `places/south/פארק נחל לכיש/IMG_1551.jpeg` (gallery): 308.5 KB — Still above hard target (293KB)
- `vehicles/my-rav4-2011-black-v2.png` (other): 898.6 KB — Still above hard target (488KB)

## Next steps (manual approval required)

1. Review optimized samples visually in `public/images-optimized/`.
2. Compare a few heroes/galleries side-by-side with originals.
3. If approved, replace originals by copying optimized files over them (keep a backup tarball of `public/images/` first).
4. Do **not** deploy WebP previews until trip data paths are updated.
