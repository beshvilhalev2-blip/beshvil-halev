# Checkpoint: Homepage Polish

**Date:** 2026-06-18  
**Branch:** `master`  
**Commit:** `88be0dc` - `feat: homepage polish checkpoint`  
**Production:** https://beshvil-halev.vercel.app  
**GitHub:** https://github.com/beshvilhalev2-blip/beshvil-halev  

---

## What Changed Today

Today’s work was a full homepage polish pass focused on the hero experience, intro animation, header navigation, category selector, and recommendation panel. The goal was premium interactivity and readability without changing layout structure, spacing, or typography.

### Summary of the day

1. **Built a new interactive hero system** - canvas landscape background, category-driven mood overlays, adventure selector, and recommendation panel wired into trip data.
2. **Added a cinematic intro overlay** - path-draw animation, morph transition, session skip, and handoff into the live hero.
3. **Polished header navigation** - glass hover/active states, improved contrast against the bright hero, and fixed stuck active-state bug for hash links.
4. **Refined recommendation panel** - three-column layout, graphite center card, featured image, and destination thumbs.
5. **Deployed to production** - build verified, pushed to GitHub, Vercel production deployment succeeded.

### Prior context on `master`

Before the checkpoint commit, four revert commits were also pushed (undoing an earlier sprint’s quick-filter, trip-card chips, and map copy changes). The checkpoint commit re-introduces the new hero system as a clean, self-contained feature set rather than layering on the reverted work.

---

## Files Modified

### New files (15)

| File | Purpose |
|------|---------|
| `app/components/home-hero-section.tsx` | Hero orchestration: intro, background, category context, content reveal |
| `app/components/hero-intro-overlay.tsx` | Full-screen intro canvas + skip control |
| `app/components/hero-animated-background.tsx` | Live canvas landscape with parallax and category mood |
| `app/components/hero-background-static.tsx` | Static SVG fallback for reduced motion / SSR |
| `app/components/hero-category-context.tsx` | React context for active category → background sync |
| `app/components/hero-adventure-selector.tsx` | Category cards + recommendation panel UI |
| `lib/hero-adventure-selector.ts` | Category definitions, trip matching, destination data |
| `lib/hero-intro/constants.ts` | Intro timing, session key, handoff signals |
| `lib/hero-intro/scene.ts` | Intro canvas drawing and transition logic |
| `lib/hero-landscape/scene.ts` | Main hero landscape palette, hills, journey path |
| `lib/hero-landscape/category-mood.ts` | Category mood overlays and journey path palette |
| `lib/hero-landscape/category-mood-config.ts` | Card accent colors and panel styling tokens |
| `lib/hero-landscape/scene-utils.ts` | Shared canvas helpers |
| `public/images/hero/living-landscape-desktop-light.svg` | Static hero fallback (desktop) |
| `public/images/hero/living-landscape-mobile-light.svg` | Static hero fallback (mobile) |

### Modified files (3)

| File | Changes |
|------|---------|
| `app/page.tsx` | Homepage restructured around `HomeHeroSection`, hero copy, CTAs, discovery block, search bar |
| `app/components/site-header.tsx` | Nav hover/active/focus polish, hash-aware active state, hero contrast bar |
| `app/globals.css` | `@keyframes hero-panel-enter` + reduced-motion handling |

### Not committed (local only)

| Path | Notes |
|------|-------|
| `design/` | ~4.4 MB design mockups |
| `data/south-place-photos-report.json` | South photos import report |

---

## Hero Improvements

### Interactive discovery hero

The homepage hero is now a full discovery experience with a locked layout order:

**Badge → headline → subtitle → CTAs → category selector → recommendation panel → search**

### Animated background

- **Bright Israeli daylight palette** - soft sky, sand, olive hills (replacing earlier gray/sunset look)
- **Canvas-rendered landscape** with parallax hill layers and mist bands
- **Journey path** drawn in the canvas, reacting to the active category via `journeyPathPaletteForMood`
- **Category mood overlays** - background atmosphere shifts when hovering/selecting categories
- **Legibility overlay** - subtle stone vignette tuned for bright sky (not heavy darkening)
- **Static SVG fallbacks** for reduced motion and initial paint

### Copy and readability

- Badge, headline, subtitle, and section title use stronger **text shadows** for contrast on bright background
- Primary CTAs: lift + shadow on hover
- Hero search bar: `bg-white/88`, stronger border/shadow, focus-within enhancement

### Layout (preserved, not redesigned)

- Discovery block: `max-w-[min(85vw,82rem)]` - cards, panel, and search share one width axis
- Search: centered, `max-w-xl` tablet / `max-w-[40rem]` desktop
- Panel grid: `lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)_minmax(0,1.75fr)]`

### Category data

Six adventure categories driven by trip metadata:

- מים (water) - default active category
- קמפינג (camping)
- שטח 4x4 (offroad)
- עגלות (stroller)
- תצפיות (viewpoints)
- קפה בטבע (coffee)

Recommendations are built dynamically from the trips database via `buildAdventureCategoryData()`.

---

## Intro Improvements

### Cinematic first visit

- **Headline phrase:** "להיות בתנועה זאת התרופה" (shown at horizon pause)
- **Total duration:** ~5.6s (`INTRO_DRAW_MS=2600` + `INTRO_REVEAL_MS=960` + `INTRO_MORPH_MS=2050`)
- **Sequence:** path draws → breath pause → path splits open → light emerges → hero reveals behind
- **Skip button** restyled for the light palette; respects `prefers-reduced-motion`
- **Session memory:** `sessionStorage` key `bhl-home-intro-seen` - intro plays once per session
- **Handoff signals** coordinate overlay fade, hero reveal, and content entrance (`HANDOFF_HERO_ENTRANCE=0.32`)
- **Pointer-events fix** - intro overlay no longer blocks interaction after skip/session restore

### Visual alignment

- Intro canvas uses the same daylight palette as the hero landscape
- Removed particles, path dots, and traveling light head from earlier iterations
- Intro files live in `lib/hero-intro/` - isolated from hero runtime logic

---

## Header Improvements

### Navigation UX polish

- **Hover:** glass pill background, `backdrop-blur-md`, subtle shadow, `-translate-y-0.5` (~2px lift), 300ms ease-out
- **Active page:** persistent glass pill with border, inset highlight, shadow, and depth
- **Focus:** `focus-visible:ring-*` for keyboard users - separate from hover styling
- **Default state:** explicit `bg-transparent` / `border-transparent` so items only highlight on hover or when active

### Contrast against bright hero

- Header bar on hero: **soft charcoal glass** - `bg-stone-900/[0.10]`, `border-stone-900/12`, stronger shadow
- Nav text: full white with stronger drop shadow (light aesthetic preserved, no dark text)
- Logo: stronger drop shadow on hero mode

### Active state bug fix

**Problem:** On the homepage, both "ראשי" and "אזורים בארץ" appeared active simultaneously.

**Cause:** `isNavItemActive` treated all hash links (`/#regions`) as active whenever `pathname === "/"`.

**Fix:** Hash-aware active detection via `window.location.hash`:

| URL | Active item |
|-----|-------------|
| `/` (no hash) | ראשי |
| `/#regions` | אזורים בארץ |
| `/want-to-travel` | בא לי לטייל |
| Other routes | Exact path match |

Desktop nav previously had no active state at all - now uses `aria-current="page"`.

---

## Recommendation Panel Improvements

### Three-column panel layout

When a category is selected or hovered, a glass recommendation panel appears below the category cards:

| Column | Content |
|--------|---------|
| Left (~40%) | Featured destination image with hover scale |
| Center (~25%) | Category info card (graphite glass focal point) |
| Right (~35%) | "המלצות בשבילך" - circular destination thumbs linking to trip pages |

### Center card (focal point)

After several contrast iterations, the center card uses **charcoal/graphite glass**:

- `bg-[rgba(34,36,40,0.58)]` with `backdrop-blur-xl`
- White title, `white/78` tagline
- Subtle gradient top edge and side accent line
- No bright category accent colors on the card surface (reads clearly against the panel)

### Category cards

- Glass cards with per-category accent borders/shadows on active/hover
- Arrow indicator pointing to the panel for the active category
- Hover previews category; click locks selection; mouse leave restores to last clicked or default
- Lift + scale on highlight (`-translate-y-1 scale-[1.02]`)

### Motion

- Panel entrance: fade + slide via `hero-panel-enter` keyframe (420ms)
- Category switch: panel content re-animates via `key={activeId}`
- Destination thumbs: hover lift + image scale

---

## Deployment Status

| Check | Status |
|-------|--------|
| `npm run build` | ✅ Passed (115 pages) |
| GitHub push | ✅ `origin/master` at `88be0dc` |
| Vercel deployment | ✅ Production succeeded (2026-06-18T13:18:05Z) |
| Production live | ✅ https://beshvil-halev.vercel.app |

**Build warning (local only):** `npm warn Unknown env config "devdir"` - machine npm config, not a project issue.

---

## Remaining Open Tasks

### Visual QA

- [ ] Manual pass: header hover/active on hero vs scrolled vs solid-header pages
- [ ] Manual pass: intro on first visit, skip, and session restore
- [ ] Manual pass: category hover/click and panel transitions on mobile
- [ ] Verify `/#regions` scroll target and active nav swap on homepage

### Local-only assets

- [ ] Decide whether to commit or gitignore `design/mockups/`
- [ ] Decide whether `data/south-place-photos-report.json` belongs in repo or stays local

### Previously reverted features (not in this checkpoint)

These were reverted on `master` before the hero checkpoint and are **not** re-included:

- Homepage quick filter config + extended search haystack
- Region/signal metadata chips on trip cards
- Sprint A spacing/copy polish (separate from new hero system)
- Inclusive copy fix on map region card links

Re-integrating any of these would need a deliberate follow-up pass to avoid conflicting with the new hero layout.

### Other in-flight branches (not merged)

| Branch | Topic |
|--------|-------|
| `cursor/south-photos-import` | South place photos import |
| `cursor/south-photos-public-assets` | Public asset pipeline |
| `cursor/visited-places-system` | Visited places as lightweight trips |
| `cursor/parks-field-updates-widget` | Mobile touch/readability polish |
| `cursor/project-vision-doc` | Want-to-travel MVP |

### Potential follow-ups

- [ ] Custom production domain (if planned beyond `*.vercel.app`)
- [ ] Performance audit: canvas hero on low-end mobile devices
- [ ] Analytics/events for category selector interactions (`data-hero-experiment="adventure-selector"` is in place)
- [ ] E2E or visual regression tests for hero intro + nav active states

---

## Architecture Notes

```
app/page.tsx
  └── HomeHeroSection
        ├── HeroIntroOverlay          (first visit only)
        ├── HeroAnimatedBackground    (canvas, category-reactive)
        ├── HeroCategoryProvider      (context)
        └── HeroMainContent
              ├── HeroAdventureSelector (categories + panel)
              └── Search form

lib/hero-adventure-selector.ts  → trip matching + destination data
lib/hero-landscape/*            → canvas scene + mood system
lib/hero-intro/*                → intro animation (isolated)
app/components/site-header.tsx  → global nav (hero + solid modes)
```

**Constraint honored throughout:** polish and interaction only - no layout redesign, no spacing changes, no typography changes.
