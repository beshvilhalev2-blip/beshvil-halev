import { placesFilterSyncBySlug } from "@/data/places-filter-sync";

export function getTripPlaceName(trip: { slug: string; title: string }): string {
  const excelName = placesFilterSyncBySlug[trip.slug]?.excelName?.trim();
  if (excelName) {
    return excelName;
  }

  const dashIndex = trip.title.indexOf(" - ");
  if (dashIndex > 0) {
    return trip.title.slice(0, dashIndex).trim();
  }

  return trip.title.trim();
}
