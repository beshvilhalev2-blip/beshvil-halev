import {
  getFeaturedTrips,
  getHomepageTrips,
  getSiteVisibleTrips,
  getTripRegionSlug,
  type Trip,
} from "@/data/trips";
import { isFamilyFriendlyTrip } from "@/lib/find-my-trip/trip-profile";
import { matchesHeroCategory } from "@/lib/hero-adventure-selector";
import { getAiAssistantDisplayTags } from "@/lib/ai-assistant/display-tags";
import {
  hasActiveAssistantFilters,
  mergeAssistantSearchFilters,
  parseAssistantSearchQuery,
} from "@/lib/ai-assistant/parse-query";
import { AI_ASSISTANT_SUGGESTIONS } from "@/lib/ai-assistant/constants";
import type {
  AiAssistantSearchFilter,
  AiAssistantSearchResult,
  AiAssistantTripRecommendation,
} from "@/lib/ai-assistant/types";

const MIN_RESULTS = 3;
const MAX_RESULTS = 5;

function tripMatchesFilter(trip: Trip, filters: AiAssistantSearchFilter): boolean {
  if (filters.regionSlug && getTripRegionSlug(trip) !== filters.regionSlug) {
    return false;
  }

  if (filters.water && !matchesHeroCategory(trip, "water")) {
    return false;
  }

  if (filters.viewpoint && !matchesHeroCategory(trip, "viewpoints")) {
    return false;
  }

  if (filters.camping && !matchesHeroCategory(trip, "camping")) {
    return false;
  }

  if (filters.offroad && !matchesHeroCategory(trip, "offroad")) {
    return false;
  }

  if (filters.stroller && !matchesHeroCategory(trip, "stroller")) {
    return false;
  }

  if (filters.free && !matchesHeroCategory(trip, "free")) {
    return false;
  }

  if (filters.kids && !isFamilyFriendlyTrip(trip)) {
    return false;
  }

  return true;
}

function tripRank(trip: Trip): number {
  const publishedRank = trip.status === "needs-content" ? 1 : 0;
  const featuredRank = trip.featured ? 0 : 1;
  return publishedRank * 100 + featuredRank;
}

function sortTrips(trips: Trip[]): Trip[] {
  return [...trips].sort((a, b) => {
    const rankDiff = tripRank(a) - tripRank(b);
    if (rankDiff !== 0) {
      return rankDiff;
    }
    return a.title.localeCompare(b.title, "he");
  });
}

function filterTrips(filters: AiAssistantSearchFilter): Trip[] {
  return sortTrips(getSiteVisibleTrips().filter((trip) => tripMatchesFilter(trip, filters)));
}

function dropRegion(filters: AiAssistantSearchFilter): AiAssistantSearchFilter {
  return { ...filters, regionSlug: undefined };
}

function keepPrimaryFilter(filters: AiAssistantSearchFilter): AiAssistantSearchFilter {
  const next: AiAssistantSearchFilter = {};

  if (filters.water) next.water = true;
  else if (filters.offroad) next.offroad = true;
  else if (filters.stroller) next.stroller = true;
  else if (filters.camping) next.camping = true;
  else if (filters.viewpoint) next.viewpoint = true;
  else if (filters.free) next.free = true;
  else if (filters.kids) next.kids = true;
  else if (filters.regionSlug) next.regionSlug = filters.regionSlug;

  return next;
}

function getFallbackTrips(): Trip[] {
  const featured = getFeaturedTrips();
  if (featured.length >= MIN_RESULTS) {
    return sortTrips(featured);
  }

  return sortTrips(getHomepageTrips(MAX_RESULTS));
}

function toRecommendation(
  trip: Trip,
  filters: AiAssistantSearchFilter,
): AiAssistantTripRecommendation {
  return {
    slug: trip.slug,
    title: trip.title,
    region: trip.region,
    tags: getAiAssistantDisplayTags(trip, filters),
    href: `/trips/${trip.slug}`,
  };
}

function getSuggestionFilters(suggestionId?: string): AiAssistantSearchFilter | undefined {
  if (!suggestionId) {
    return undefined;
  }

  const suggestion = AI_ASSISTANT_SUGGESTIONS.find((entry) => entry.id === suggestionId);
  return suggestion?.filters;
}

export function searchAssistantTrips(
  query: string,
  suggestionId?: string,
): AiAssistantSearchResult {
  const parsedFilters = mergeAssistantSearchFilters(
    parseAssistantSearchQuery(query),
    getSuggestionFilters(suggestionId),
  );

  let isFallback = false;
  let matches = hasActiveAssistantFilters(parsedFilters)
    ? filterTrips(parsedFilters)
    : [];

  if (matches.length === 0 && hasActiveAssistantFilters(parsedFilters)) {
    const withoutRegion = dropRegion(parsedFilters);
    if (hasActiveAssistantFilters(withoutRegion)) {
      matches = filterTrips(withoutRegion);
    }

    if (matches.length === 0) {
      const primaryOnly = keepPrimaryFilter(parsedFilters);
      if (hasActiveAssistantFilters(primaryOnly)) {
        matches = filterTrips(primaryOnly);
      }
    }

    isFallback = true;
  }

  if (matches.length === 0) {
    matches = getFallbackTrips();
    isFallback = true;
  }

  const recommendations = matches
    .slice(0, MAX_RESULTS)
    .map((trip) => toRecommendation(trip, parsedFilters));

  return {
    intro: isFallback
      ? "לא מצאתי משהו שמתאים בדיוק, אבל הנה כמה רעיונות דומים 🌿"
      : "מצאתי כמה מקומות שיכולים להתאים 🌿",
    recommendations,
    isFallback,
    parsedFilters,
  };
}
