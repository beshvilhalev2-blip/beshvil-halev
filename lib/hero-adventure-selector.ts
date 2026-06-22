import type { Trip } from "@/data/trips";
import {
  isFilterTagTrue,
  isStrollerAccessibleFilterMatch,
  type TripFilterTags,
} from "@/lib/trip-filter-tags";

export type AdventureCategoryId =
  | "water"
  | "camping"
  | "offroad"
  | "stroller"
  | "viewpoints"
  | "free";

export type AdventureDestination = {
  slug: string;
  title: string;
  image?: string;
};

export type AdventureCategoryData = {
  id: AdventureCategoryId;
  emoji: string;
  label: string;
  tagline: string;
  matchCount: number;
  /** Stable SSR default - first matches in ranked order */
  destinations: AdventureDestination[];
  /** Full synced match pool for client-side rotation */
  allDestinations: AdventureDestination[];
  featured: AdventureDestination | null;
};

type CategoryDefinition = {
  id: AdventureCategoryId;
  emoji: string;
  label: string;
  tagline: string;
  filterTag: keyof TripFilterTags;
  match: (trip: Trip) => boolean;
};

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: "water",
    emoji: "🌊",
    label: "מים",
    tagline: "מעיינות, נחלים ובריכות טבעיות לכל המשפחה",
    filterTag: "water",
    match: (trip) => isFilterTagTrue(trip.filterTags?.water),
  },
  {
    id: "camping",
    emoji: "🏕️",
    label: "קמפינג",
    tagline: "לילה בטבע, מדורות ושמיים פתוחים",
    filterTag: "camping",
    match: (trip) => isFilterTagTrue(trip.filterTags?.camping),
  },
  {
    id: "offroad",
    emoji: "🚙",
    label: "4x4",
    tagline: "שבילים, תצפיות והרפתקאות מחוץ לאספלט",
    filterTag: "offroad",
    match: (trip) => isFilterTagTrue(trip.filterTags?.offroad),
  },
  {
    id: "stroller",
    emoji: "👶",
    label: "נגיש לעגלות",
    tagline: "שבילים נוחים, צל וגישה קלה עם ילדים קטנים",
    filterTag: "strollerAccessible",
    match: (trip) => isStrollerAccessibleFilterMatch(trip.filterTags?.strollerAccessible),
  },
  {
    id: "viewpoints",
    emoji: "🌄",
    label: "תצפיות",
    tagline: "נקודות תצפית, שקיעות ונופים ששווה לעצור בהם",
    filterTag: "viewpoint",
    match: (trip) => isFilterTagTrue(trip.filterTags?.viewpoint),
  },
  {
    id: "free",
    emoji: "🆓",
    label: "חינם",
    tagline: "טיולים וחוויות ללא עלות כניסה",
    filterTag: "free",
    match: (trip) => isFilterTagTrue(trip.filterTags?.free),
  },
];

function tripRank(trip: Trip): number {
  const publishedRank = trip.status === "needs-content" ? 1 : 0;
  const featuredRank = trip.featured ? 0 : 1;
  return publishedRank * 100 + featuredRank;
}

function tripThumbnail(trip: Trip): string | undefined {
  if (trip.heroImage) return trip.heroImage;
  return trip.gallery.find((item) => item.src)?.src;
}

function toDestination(trip: Trip): AdventureDestination {
  return {
    slug: trip.slug,
    title: trip.title,
    image: tripThumbnail(trip),
  };
}

function getAllMatchingDestinations(definition: CategoryDefinition, trips: Trip[]): AdventureDestination[] {
  return trips
    .filter(definition.match)
    .sort((a, b) => {
      const rankDiff = tripRank(a) - tripRank(b);
      if (rankDiff !== 0) return rankDiff;
      return a.title.localeCompare(b.title, "he");
    })
    .map(toDestination);
}

function pickDefaultDestinations(allDestinations: AdventureDestination[]): AdventureDestination[] {
  return allDestinations.slice(0, 3);
}

function pickFeatured(destinations: AdventureDestination[]): AdventureDestination | null {
  return destinations.find((destination) => destination.image) ?? destinations[0] ?? null;
}

export function getHeroCategoryMatchCounts(trips: Trip[]): Record<AdventureCategoryId, number> {
  return Object.fromEntries(
    CATEGORY_DEFINITIONS.map((definition) => [
      definition.id,
      trips.filter(definition.match).length,
    ]),
  ) as Record<AdventureCategoryId, number>;
}

export function buildAdventureCategoryData(trips: Trip[]): AdventureCategoryData[] {
  return CATEGORY_DEFINITIONS.map((definition) => {
    const allDestinations = getAllMatchingDestinations(definition, trips);
    const destinations = pickDefaultDestinations(allDestinations);
    return {
      id: definition.id,
      emoji: definition.emoji,
      label: definition.label,
      tagline: definition.tagline,
      matchCount: allDestinations.length,
      destinations,
      allDestinations,
      featured: pickFeatured(destinations),
    };
  });
}

export function matchesHeroCategory(trip: Trip, id: AdventureCategoryId): boolean {
  const definition = CATEGORY_DEFINITIONS.find((entry) => entry.id === id);
  return definition ? definition.match(trip) : false;
}

export function getHeroCategoryDefinitions(): ReadonlyArray<{
  id: AdventureCategoryId;
  emoji: string;
  label: string;
}> {
  return CATEGORY_DEFINITIONS.map(({ id, emoji, label }) => ({ id, emoji, label }));
}
