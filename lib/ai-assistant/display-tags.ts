import type { Trip } from "@/data/trips";
import { isFilterTagTrue, isStrollerAccessibleFilterMatch } from "@/lib/trip-filter-tags";
import { isFamilyFriendlyTrip } from "@/lib/find-my-trip/trip-profile";
import type { AiAssistantSearchFilter } from "@/lib/ai-assistant/types";

const TAG_LABELS = {
  water: "מים",
  viewpoint: "תצפית",
  camping: "קמפינג",
  offroad: "שטח 4x4",
  stroller: "נגיש לעגלות",
  free: "חינם",
  kids: "משפחות",
} as const;

export function getAiAssistantDisplayTags(
  trip: Trip,
  activeFilters?: AiAssistantSearchFilter,
): string[] {
  const tags = trip.filterTags;
  const results: string[] = [];

  const addTag = (label: string) => {
    if (!results.includes(label)) {
      results.push(label);
    }
  };

  if (isFilterTagTrue(tags?.water)) addTag(TAG_LABELS.water);
  if (isFilterTagTrue(tags?.viewpoint)) addTag(TAG_LABELS.viewpoint);
  if (isFilterTagTrue(tags?.camping)) addTag(TAG_LABELS.camping);
  if (isFilterTagTrue(tags?.offroad)) addTag(TAG_LABELS.offroad);
  if (isStrollerAccessibleFilterMatch(tags?.strollerAccessible)) {
    addTag(TAG_LABELS.stroller);
  }
  if (isFilterTagTrue(tags?.free)) addTag(TAG_LABELS.free);
  if (isFamilyFriendlyTrip(trip)) addTag(TAG_LABELS.kids);

  if (activeFilters) {
    const prioritized: string[] = [];
    const rest: string[] = [];

    for (const tag of results) {
      const matchesActive =
        (activeFilters.water && tag === TAG_LABELS.water) ||
        (activeFilters.viewpoint && tag === TAG_LABELS.viewpoint) ||
        (activeFilters.camping && tag === TAG_LABELS.camping) ||
        (activeFilters.offroad && tag === TAG_LABELS.offroad) ||
        (activeFilters.stroller && tag === TAG_LABELS.stroller) ||
        (activeFilters.free && tag === TAG_LABELS.free) ||
        (activeFilters.kids && tag === TAG_LABELS.kids);

      if (matchesActive) {
        prioritized.push(tag);
      } else {
        rest.push(tag);
      }
    }

    return [...prioritized, ...rest].slice(0, 4);
  }

  return results.slice(0, 4);
}
