import type { Trip } from "@/data/trips";
import { placesFilterSyncBySlug } from "@/data/places-filter-sync";
import { getTripPlaceName } from "@/lib/trip-display-title";

const FILTER_TAG_LABELS: Record<string, string> = {
  water: "מים",
  viewpoint: "תצפית",
  camping: "קמפינג",
  offroad: "4x4",
  strollerAccessible: "נגיש לעגלות",
  free: "חינם",
};

export type TripSearchEntry = {
  slug: string;
  placeName: string;
  title: string;
  subtitle: string;
  region: string;
  category: string;
  aliases: string[];
  tags: string[];
  searchText: string;
};

export type TripSearchSuggestion = {
  slug: string;
  placeName: string;
  subtitle: string;
  region: string;
  category: string;
  matchedField: "placeName" | "title" | "alias" | "region" | "category" | "tag";
  matchedText: string;
  score: number;
};

function normalizeSearchText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[^\w\s\u0590-\u05FF-]/g, " ")
    .replace(/\s+/g, " ");
}

function getFilterTagLabels(trip: Trip): string[] {
  const syncTags = placesFilterSyncBySlug[trip.slug]?.tags;
  const tags = syncTags ?? trip.filterTags;
  if (!tags) {
    return [];
  }

  return Object.entries(tags)
    .filter(([, value]) => value === true || value === "partial")
    .map(([key]) => FILTER_TAG_LABELS[key] ?? key)
    .filter(Boolean);
}

export function buildTripSearchEntries(allTrips: Trip[]): TripSearchEntry[] {
  return allTrips.map((trip) => {
    const placeName = getTripPlaceName(trip);
    const excelName = placesFilterSyncBySlug[trip.slug]?.excelName?.trim() ?? "";
    const locationLabel = trip.location?.label?.trim() ?? "";
    const aliases = [excelName, locationLabel, trip.title]
      .filter((value, index, array) => value && array.indexOf(value) === index)
      .filter((value) => value !== placeName);
    const tags = [
      ...(trip.tags ?? []),
      ...getFilterTagLabels(trip),
      trip.category,
      trip.region,
    ].filter(Boolean);

    const searchText = normalizeSearchText(
      [placeName, trip.title, trip.subtitle, trip.region, trip.category, ...aliases, ...tags].join(
        " ",
      ),
    );

    return {
      slug: trip.slug,
      placeName,
      title: trip.title,
      subtitle: trip.subtitle,
      region: trip.region,
      category: trip.category,
      aliases,
      tags,
      searchText,
    };
  });
}

function matchesPartial(text: string, query: string): boolean {
  const normalizedText = normalizeSearchText(text);
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return true;
  }

  if (normalizedText.includes(normalizedQuery)) {
    return true;
  }

  let queryIndex = 0;
  for (
    let textIndex = 0;
    textIndex < normalizedText.length && queryIndex < normalizedQuery.length;
    textIndex += 1
  ) {
    if (normalizedText[textIndex] === normalizedQuery[queryIndex]) {
      queryIndex += 1;
    }
  }

  return queryIndex === normalizedQuery.length;
}

function scoreFieldMatch(
  field: TripSearchSuggestion["matchedField"],
  text: string,
  query: string,
): number {
  const normalizedText = normalizeSearchText(text);
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery || !normalizedText) {
    return 0;
  }

  if (normalizedText === normalizedQuery) {
    return field === "placeName" ? 120 : 100;
  }

  if (normalizedText.startsWith(normalizedQuery)) {
    return field === "placeName" ? 95 : 80;
  }

  if (normalizedText.includes(normalizedQuery)) {
    return field === "placeName" ? 85 : 65;
  }

  if (matchesPartial(text, query)) {
    return field === "placeName" ? 70 : 50;
  }

  return 0;
}

function getBestMatch(
  entry: TripSearchEntry,
  query: string,
): Pick<TripSearchSuggestion, "matchedField" | "matchedText" | "score"> | null {
  const candidates: Array<{
    matchedField: TripSearchSuggestion["matchedField"];
    matchedText: string;
    score: number;
  }> = [
    {
      matchedField: "placeName",
      matchedText: entry.placeName,
      score: scoreFieldMatch("placeName", entry.placeName, query),
    },
    {
      matchedField: "title",
      matchedText: entry.title,
      score: scoreFieldMatch("title", entry.title, query),
    },
    ...entry.aliases.map((alias) => ({
      matchedField: "alias" as const,
      matchedText: alias,
      score: scoreFieldMatch("alias", alias, query),
    })),
    {
      matchedField: "region",
      matchedText: entry.region,
      score: scoreFieldMatch("region", entry.region, query),
    },
    {
      matchedField: "category",
      matchedText: entry.category,
      score: scoreFieldMatch("category", entry.category, query),
    },
    ...entry.tags.map((tag) => ({
      matchedField: "tag" as const,
      matchedText: tag,
      score: scoreFieldMatch("tag", tag, query),
    })),
  ];

  const best = candidates.sort((a, b) => b.score - a.score)[0];
  return best && best.score > 0 ? best : null;
}

function entryMatchesQuery(entry: TripSearchEntry, query: string): boolean {
  const terms = normalizeSearchText(query).split(" ").filter(Boolean);
  if (terms.length === 0) {
    return false;
  }

  return terms.every((term) => matchesPartial(entry.searchText, term));
}

export function searchTripSuggestions(
  query: string,
  entries: TripSearchEntry[],
  limit = 8,
): TripSearchSuggestion[] {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [];
  }

  return entries
    .filter((entry) => entryMatchesQuery(entry, trimmedQuery))
    .map((entry) => {
      const match = getBestMatch(entry, trimmedQuery);
      if (!match) {
        return null;
      }

      return {
        slug: entry.slug,
        placeName: entry.placeName,
        subtitle: entry.subtitle,
        region: entry.region,
        category: entry.category,
        matchedField: match.matchedField,
        matchedText: match.matchedText,
        score: match.score,
      };
    })
    .filter((entry): entry is TripSearchSuggestion => entry !== null)
    .sort((a, b) => b.score - a.score || a.placeName.localeCompare(b.placeName, "he"))
    .slice(0, limit);
}

type WeightedSearchField = {
  text: string;
  weight: number;
};

/** Field weights: names count most, descriptions least. */
const NAME_WEIGHT = 10;
const SUMMARY_WEIGHT = 4;
const BODY_WEIGHT = 1;

/** The place's own name and page title. */
function getTripPrimaryNames(trip: Trip): string[] {
  return [getTripPlaceName(trip), trip.title].map(normalizeSearchText).filter(Boolean);
}

/** Primary names plus alternate names (Excel name, location label). */
function getTripNameFields(trip: Trip): string[] {
  return [
    ...getTripPrimaryNames(trip),
    ...[placesFilterSyncBySlug[trip.slug]?.excelName ?? "", trip.location?.label ?? ""].map(
      normalizeSearchText,
    ),
  ].filter(Boolean);
}

function getTripWeightedSearchFields(trip: Trip): WeightedSearchField[] {
  const nameFields = getTripNameFields(trip).map((text) => ({ text, weight: NAME_WEIGHT }));
  const summaryFields = [
    trip.subtitle,
    trip.region,
    trip.category,
    ...(trip.tags ?? []),
    ...getFilterTagLabels(trip),
    ...(trip.highlights ?? []),
  ].map((text) => ({ text: normalizeSearchText(text), weight: SUMMARY_WEIGHT }));
  const bodyFields = [trip.metaDescription, trip.about[0] ?? ""].map((text) => ({
    text: normalizeSearchText(text),
    weight: BODY_WEIGHT,
  }));

  return [...nameFields, ...summaryFields, ...bodyFields].filter((field) => field.text);
}

/**
 * Every word must appear as written (not as scattered letters) in some field.
 * Returns 0 when the trip does not match.
 */
function scoreTripForQuery(trip: Trip, normalizedQuery: string, terms: string[]): number {
  const fields = getTripWeightedSearchFields(trip);
  let score = 0;

  for (const term of terms) {
    const best = fields.reduce(
      (max, field) => (field.text.includes(term) ? Math.max(max, field.weight) : max),
      0,
    );
    if (best === 0) {
      return 0;
    }
    score += best;
  }

  const primaryNames = getTripPrimaryNames(trip);
  const nameFields = getTripNameFields(trip);
  if (primaryNames.some((name) => name === normalizedQuery)) {
    score += 120;
  } else if (nameFields.some((name) => name === normalizedQuery)) {
    score += 100;
  } else if (primaryNames.some((name) => name.startsWith(normalizedQuery))) {
    score += 70;
  } else if (primaryNames.some((name) => name.includes(normalizedQuery))) {
    score += 50;
  } else if (nameFields.some((name) => name.includes(normalizedQuery))) {
    score += 30;
  } else if (fields.some((field) => field.text.includes(normalizedQuery))) {
    score += 10;
  }

  return score;
}

function compareByTitle(a: Trip, b: Trip): number {
  return getTripPlaceName(a).localeCompare(getTripPlaceName(b), "he");
}

export function searchTrips(query: string, allTrips: Trip[]): Trip[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(" ").filter(Boolean);

  const ranked = allTrips
    .map((trip) => ({ trip, score: scoreTripForQuery(trip, normalizedQuery, terms) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || compareByTitle(a.trip, b.trip))
    .map((result) => result.trip);

  if (ranked.length > 0) {
    return ranked;
  }

  // Typo tolerance: loose letter matching, but only against the place's own name.
  return allTrips
    .filter((trip) =>
      getTripPrimaryNames(trip).some((name) => matchesPartial(name, normalizedQuery)),
    )
    .sort(compareByTitle);
}

export function findHighlightRange(
  text: string,
  query: string,
): { start: number; end: number } | null {
  const normalizedText = normalizeSearchText(text);
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return null;
  }

  const directIndex = normalizedText.indexOf(normalizedQuery);
  if (directIndex >= 0) {
    return mapNormalizedRangeToOriginal(text, directIndex, normalizedQuery.length);
  }

  let queryIndex = 0;
  let start = -1;
  let lastMatchedOriginalIndex = -1;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index] ?? "";
    const normalizedChar = normalizeSearchText(char);
    if (!normalizedChar) {
      continue;
    }

    if (queryIndex < normalizedQuery.length && normalizedChar === normalizedQuery[queryIndex]) {
      if (start === -1) {
        start = index;
      }
      lastMatchedOriginalIndex = index;
      queryIndex += 1;
    }
  }

  if (queryIndex === normalizedQuery.length && start >= 0) {
    return { start, end: lastMatchedOriginalIndex + 1 };
  }

  return null;
}

function mapNormalizedRangeToOriginal(
  text: string,
  normalizedStart: number,
  normalizedLength: number,
): { start: number; end: number } | null {
  let normalizedIndex = 0;
  let start = -1;
  let end = -1;

  for (let index = 0; index < text.length; index += 1) {
    const normalizedChar = normalizeSearchText(text[index] ?? "");
    if (!normalizedChar) {
      continue;
    }

    if (normalizedIndex === normalizedStart) {
      start = index;
    }

    if (
      normalizedIndex >= normalizedStart &&
      normalizedIndex < normalizedStart + normalizedLength
    ) {
      end = index + 1;
    }

    normalizedIndex += normalizedChar.length;
  }

  if (start >= 0 && end > start) {
    return { start, end };
  }

  return null;
}
