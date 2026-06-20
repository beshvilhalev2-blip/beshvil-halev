import type { Trip } from "@/data/trips";
import { placesFilterSyncBySlug } from "@/data/places-filter-sync";

export function applyPlacesFilterSync(trip: Trip): Trip {
  const sync = placesFilterSyncBySlug[trip.slug];
  if (!sync) {
    return { ...trip, excludedFromSite: true };
  }

  const matcherActivities = new Set(trip.matcher?.activities ?? []);
  if (sync.tags.water === true || sync.tags.water === "partial") {
    matcherActivities.add("water");
  }
  if (sync.tags.viewpoint === true || sync.tags.viewpoint === "partial") {
    matcherActivities.add("viewpoint");
  }
  if (sync.tags.camping === true || sync.tags.camping === "partial") {
    matcherActivities.add("camping");
  }

  const estimatedCostNis =
    sync.tags.free === true ? "free" : trip.matcher?.estimatedCostNis;

  return {
    ...trip,
    region: sync.region,
    filterTags: sync.tags,
    excludedFromSite: false,
    matcher: {
      ...trip.matcher,
      activities: matcherActivities.size > 0 ? Array.from(matcherActivities) : trip.matcher?.activities,
      estimatedCostNis,
    },
  };
}
