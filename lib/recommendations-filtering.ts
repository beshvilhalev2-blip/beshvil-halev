import type { Trip } from "@/data/trips";
import { getTripRegionSlug } from "@/data/trips";
import { placesFilterSyncBySlug } from "@/data/places-filter-sync";
import { isFamilyFriendlyTrip } from "@/lib/find-my-trip/trip-profile";
import {
  matchesHeroCategory,
  type AdventureCategoryId,
} from "@/lib/hero-adventure-selector";
import {
  DISCOVERY_MAP_REGIONS,
  FILTERABLE_REGION_SLUGS,
  type FilterableRegionSlug,
} from "@/lib/israel-discovery-map";

export type RecommendationsQuickFilterId = AdventureCategoryId | "coffee" | "families";

export type RecommendationsRegionSlug = FilterableRegionSlug;

export type RecommendationsQuickFilterOption = {
  id: RecommendationsQuickFilterId;
  emoji: string;
  label: string;
  heroCategory?: AdventureCategoryId;
};

export type RecommendationsRegionFilterOption = {
  slug: RecommendationsRegionSlug;
  label: string;
};

/** Display order for the recommendations quick-filter bar. */
export const RECOMMENDATIONS_QUICK_FILTERS: RecommendationsQuickFilterOption[] = [
  { id: "water", emoji: "🌊", label: "מים", heroCategory: "water" },
  { id: "viewpoints", emoji: "🌄", label: "תצפיות", heroCategory: "viewpoints" },
  { id: "offroad", emoji: "🚙", label: "4x4", heroCategory: "offroad" },
  { id: "camping", emoji: "🏕️", label: "קמפינג", heroCategory: "camping" },
  { id: "coffee", emoji: "☕", label: "עגלות קפה" },
  { id: "stroller", emoji: "👶", label: "נגיש לעגלות", heroCategory: "stroller" },
  { id: "free", emoji: "🆓", label: "חינם", heroCategory: "free" },
  { id: "families", emoji: "👨‍👩‍👧‍👦", label: "משפחות" },
];

const JERUSALEM_AREA_LABEL = "ירושלים והסביבה";

export const RECOMMENDATIONS_REGION_FILTERS: RecommendationsRegionFilterOption[] =
  FILTERABLE_REGION_SLUGS.map((slug) => {
    const region = DISCOVERY_MAP_REGIONS.find((entry) => entry.slug === slug)!;
    return {
      slug,
      label: slug === "jerusalem" ? JERUSALEM_AREA_LABEL : region.title,
    };
  });

const COFFEE_KEYWORD = /קפה|עגל(?:ת|ות)\s*קפה|מסעד/i;

/**
 * No dedicated Excel column yet — matches places with coffee / food-stop signals
 * in synced Excel names or trip copy.
 */
export function matchesCoffeeCartFilter(trip: Trip): boolean {
  const excelName = placesFilterSyncBySlug[trip.slug]?.excelName ?? "";
  const haystack = [trip.title, trip.subtitle ?? "", trip.category, excelName].join(" ");
  return COFFEE_KEYWORD.test(haystack);
}

export function matchesQuickFilter(
  trip: Trip,
  filterId: RecommendationsQuickFilterId,
): boolean {
  const option = RECOMMENDATIONS_QUICK_FILTERS.find((entry) => entry.id === filterId);
  if (!option) return false;

  if (option.heroCategory) {
    return matchesHeroCategory(trip, option.heroCategory);
  }

  if (filterId === "families") {
    return isFamilyFriendlyTrip(trip);
  }

  if (filterId === "coffee") {
    return matchesCoffeeCartFilter(trip);
  }

  return false;
}

export function matchesRegionFilter(
  trip: Trip,
  regionSlug: RecommendationsRegionSlug,
): boolean {
  return getTripRegionSlug(trip) === regionSlug;
}

export function filterRecommendationsTrips(
  trips: Trip[],
  quickFilters: ReadonlySet<RecommendationsQuickFilterId>,
  regionFilters: ReadonlySet<RecommendationsRegionSlug>,
): Trip[] {
  return trips.filter((trip) => {
    if (quickFilters.size > 0) {
      for (const filterId of quickFilters) {
        if (!matchesQuickFilter(trip, filterId)) {
          return false;
        }
      }
    }

    if (regionFilters.size > 0) {
      const regionSlug = getTripRegionSlug(trip);
      if (!regionSlug || !regionFilters.has(regionSlug as RecommendationsRegionSlug)) {
        return false;
      }
    }

    return true;
  });
}

export function countActiveFilters(
  quickFilters: ReadonlySet<RecommendationsQuickFilterId>,
  regionFilters: ReadonlySet<RecommendationsRegionSlug>,
): number {
  return quickFilters.size + regionFilters.size;
}
