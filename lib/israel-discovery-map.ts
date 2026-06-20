export type DiscoveryRegionSlug =
  | "north"
  | "hasharon"
  | "center"
  | "jerusalem"
  | "judea-samaria"
  | "south";

/** Regions shown in the pill filter bar */
export type FilterableRegionSlug = Exclude<DiscoveryRegionSlug, "judea-samaria">;

export type DiscoveryMapRegion = {
  slug: DiscoveryRegionSlug;
  href: string;
  title: string;
  cardTitle: string;
  fill: string;
  fillActive: string;
  /** Subtle hover background tint */
  hoverFill: string;
  /** Compact label for tight map areas (defaults to title) */
  shortTitle?: string;
};

export type RegionSelectorMarker = {
  slug: DiscoveryRegionSlug;
  /** Percent position inside the map canvas */
  top: number;
  left: number;
  scale?: number;
};

/** Original stylized silhouette — decorative background only */
export const ISRAEL_SILHOUETTE =
  "M 108 24 C 138 18 168 28 186 48 C 198 64 204 82 200 102 C 196 118 184 132 172 142 C 164 152 160 168 156 188 C 150 214 144 242 134 278 C 124 318 112 362 98 408 C 88 448 78 488 68 518 C 62 532 56 528 50 508 C 44 482 40 448 38 408 C 36 362 38 318 44 272 C 52 228 64 188 78 152 C 88 124 98 98 104 72 C 106 56 108 38 108 24 Z";

export const REGION_SELECTOR_MARKERS: RegionSelectorMarker[] = [
  { slug: "north", top: 11, left: 56, scale: 1.04 },
  { slug: "hasharon", top: 26, left: 24 },
  { slug: "judea-samaria", top: 32, left: 68, scale: 0.95 },
  { slug: "center", top: 40, left: 36 },
  { slug: "jerusalem", top: 48, left: 52, scale: 0.92 },
  { slug: "south", top: 64, left: 44, scale: 1.06 },
];

export const FILTERABLE_REGION_SLUGS: FilterableRegionSlug[] = [
  "north",
  "hasharon",
  "center",
  "jerusalem",
  "south",
];

export const DISCOVERY_MAP_REGIONS: DiscoveryMapRegion[] = [
  {
    slug: "north",
    href: "/regions/north",
    title: "צפון",
    cardTitle: "גליל עליון",
    fill: "#7A8B5C",
    fillActive: "#8C9D6A",
    hoverFill: "rgba(122, 139, 92, 0.14)",
  },
  {
    slug: "hasharon",
    href: "/regions/hasharon",
    title: "השרון",
    cardTitle: "השרון",
    fill: "#9BA896",
    fillActive: "#ABBAA6",
    hoverFill: "rgba(155, 168, 150, 0.14)",
  },
  {
    slug: "center",
    href: "/regions/center",
    title: "מרכז",
    cardTitle: "מרכז",
    fill: "#D4C4A0",
    fillActive: "#E4D4B0",
    hoverFill: "rgba(212, 196, 160, 0.16)",
  },
  {
    slug: "jerusalem",
    href: "/regions/jerusalem",
    title: "ירושלים",
    cardTitle: "ירושלים",
    fill: "#B8A898",
    fillActive: "#C8B8A8",
    hoverFill: "rgba(184, 168, 152, 0.14)",
  },
  {
    slug: "judea-samaria",
    href: "/regions/judea-samaria",
    title: "יהודה ושומרון",
    cardTitle: "יהודה ושומרון",
    shortTitle: "יהודה ושומרון",
    fill: "#A8B898",
    fillActive: "#B8C8A8",
    hoverFill: "rgba(168, 184, 152, 0.14)",
  },
  {
    slug: "south",
    href: "/regions/south",
    title: "דרום",
    cardTitle: "דרום",
    fill: "#C9A86C",
    fillActive: "#D9B87C",
    hoverFill: "rgba(201, 168, 108, 0.16)",
  },
];

export function getDiscoveryRegion(slug: DiscoveryRegionSlug): DiscoveryMapRegion | undefined {
  return DISCOVERY_MAP_REGIONS.find((region) => region.slug === slug);
}
