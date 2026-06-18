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
  path: string;
  labelX: number;
  labelY: number;
  countY: number;
  fill: string;
  fillActive: string;
  /** Judea & Samaria uses a permanent dashed outline in the reference design */
  dashedBorder?: boolean;
};

export const MAP_VIEWBOX = "0 0 280 620";

export const MEDITERRANEAN_WIDTH = 54;

/** Simplified Israel border from GeoJSON (world.geo.json / ISR) */
export const ISRAEL_OUTLINE =
  "M 252.8 118 L 229.7 164.2 L 181.7 143.9 L 154 241.6 L 187.3 258 L 153.5 278.2 L 147.8 316.8 L 210.1 296.9 L 213.2 354 L 147.1 588.5 L 60 336.5 L 98.6 288.2 L 89.5 279.9 L 124.6 211.3 L 151.5 100.7 L 170.4 63.5 L 174.1 62 L 218.4 62.3 L 230.6 36.6 L 266.2 34.6 L 268.2 94.7 L 250.3 117 L 252.8 118 Z";

export const SEA_OF_GALILEE =
  "M 230.3 97.3 L 243.5 90 L 247.5 101.7 L 239.5 112 L 230.3 107.6 Z";

export const DEAD_SEA =
  "M 230.3 222 L 239.5 222 L 234.2 442 L 226.3 442 Z";

export const ISRAEL_REGIONS_SVG = "/svg/israel-regions.svg";

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
    path: "M 150.7 68 L 270 34.3 L 270 145.7 L 230.3 160.4 L 177.3 145.7 L 150.7 136.9 L 150.7 68 Z",
    labelX: 173.3,
    labelY: 101.7,
    countY: 115.7,
    fill: "#8DA889",
    fillActive: "#9DB899",
  },
  {
    slug: "hasharon",
    href: "/regions/hasharon",
    title: "השרון",
    cardTitle: "השרון",
    path: "M 107 163.3 L 150.7 157.5 L 150.7 210.3 L 115 214.7 L 107 189.7 L 107 163.3 Z",
    labelX: 125.6,
    labelY: 183.9,
    countY: 197.9,
    fill: "#7A9E9A",
    fillActive: "#8AAEA9",
  },
  {
    slug: "center",
    href: "/regions/center",
    title: "מרכז",
    cardTitle: "מרכז",
    path: "M 150.7 157.5 L 168 160.4 L 168 248.4 L 150.7 210.3 L 150.7 157.5 Z",
    labelX: 157.4,
    labelY: 204.4,
    countY: 218.4,
    fill: "#C4A574",
    fillActive: "#D4B584",
  },
  {
    slug: "jerusalem",
    href: "/regions/jerusalem",
    title: "ירושלים",
    cardTitle: "ירושלים",
    path: "M 160 219.1 L 168 219.1 L 168 266 L 160 266 L 160 219.1 Z",
    labelX: 164,
    labelY: 242.5,
    countY: 256.5,
    fill: "#A8957C",
    fillActive: "#B8A58C",
  },
  {
    slug: "judea-samaria",
    href: "/regions/judea-samaria",
    title: "יהודה ושומרון",
    cardTitle: "יהודה ושומרון",
    path: "M 168 160.4 L 234.2 156 L 234.2 254.3 L 168 254.3 L 168 160.4 Z",
    labelX: 199.8,
    labelY: 200,
    countY: 214,
    fill: "#B5C4A8",
    fillActive: "#C5D4B8",
    dashedBorder: true,
  },
  {
    slug: "south",
    href: "/regions/south",
    title: "דרום",
    cardTitle: "דרום",
    path: "M 107 248.4 L 168 248.4 L 168 254.3 L 234.2 254.3 L 234.2 591.6 L 107 591.6 L 107 248.4 Z",
    labelX: 150.7,
    labelY: 405.3,
    countY: 419.3,
    fill: "#D4A574",
    fillActive: "#E4B584",
  },
];

export function getDiscoveryRegion(slug: DiscoveryRegionSlug): DiscoveryMapRegion | undefined {
  return DISCOVERY_MAP_REGIONS.find((region) => region.slug === slug);
}
