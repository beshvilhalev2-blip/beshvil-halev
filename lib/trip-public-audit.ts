import {
  getMapRegionTripCounts,
  getPublishedTrips,
  getSiteVisibleTrips,
  getTripsByRegionSlug,
  isSiteVisibleTrip,
  regions,
  trips,
} from "@/data/trips";
import { placesFilterAudit } from "@/data/places-filter-sync";
import { getHeroCategoryMatchCounts } from "@/lib/hero-adventure-selector";

const PUBLIC_REGION_SLUGS = ["north", "hasharon", "center", "jerusalem", "south"] as const;

export function getHeroSyncFilterCounts(tripPool = getSiteVisibleTrips()) {
  return getHeroCategoryMatchCounts(tripPool);
}

export function getHiddenTripsExcludedFromPublic() {
  return trips
    .filter((trip) => !isSiteVisibleTrip(trip))
    .map((trip) => ({ slug: trip.slug, title: trip.title }))
    .sort((a, b) => a.title.localeCompare(b.title, "he"));
}

export function getPublicTripDataAudit() {
  const regionDiscoveryCounts = getMapRegionTripCounts();
  const regionPageCounts = Object.fromEntries(
    regions.map((region) => [region.slug, getTripsByRegionSlug(region.slug).length]),
  );
  const heroFilterCounts = getHeroSyncFilterCounts();
  const hiddenTripsExcluded = getHiddenTripsExcludedFromPublic();

  const regionCountsMatchExcel = PUBLIC_REGION_SLUGS.every(
    (slug) => regionDiscoveryCounts[slug] === placesFilterAudit.regionCounts[slug],
  );
  const filterCountsMatchExcel = Object.entries(heroFilterCounts).every(([categoryId, count]) => {
    const tagKey =
      categoryId === "stroller"
        ? "strollerAccessible"
        : categoryId === "viewpoints"
          ? "viewpoint"
          : categoryId;
    const expected = placesFilterAudit.filterCounts[tagKey as keyof typeof placesFilterAudit.filterCounts];
    if (tagKey === "strollerAccessible") {
      return count === expected;
    }
    return count <= expected;
  });

  return {
    generatedAt: new Date().toISOString(),
    siteVisibleTotal: getSiteVisibleTrips().length,
    publishedTotal: getPublishedTrips().length,
    regionDiscoveryCounts,
    regionPageCounts,
    heroFilterCounts,
    hiddenTripsExcluded,
    expectedFromExcel: {
      activeTrips: placesFilterAudit.activeTrips,
      regionCounts: placesFilterAudit.regionCounts,
      filterCounts: placesFilterAudit.filterCounts,
    },
    qa: {
      regionDiscoveryMatchesRegionPages: regions.every(
        (region) => regionDiscoveryCounts[region.slug] === regionPageCounts[region.slug],
      ),
      regionCountsMatchExcel,
      filterCountsMatchExcel,
      hiddenTripCount: hiddenTripsExcluded.length,
      expectedHiddenTripCount: placesFilterAudit.hiddenUnmatchedSiteTrips,
    },
  };
}
