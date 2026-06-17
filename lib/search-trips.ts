import type { Trip } from "@/data/trips";

function normalizeSearchText(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function getTripSearchFields(trip: Trip): string[] {
  const costFields = trip.cost.flatMap((item) => [item.label, item.value, item.note ?? ""]);

  return [
    trip.title,
    trip.subtitle,
    trip.metaDescription,
    trip.region,
    trip.category,
    trip.about[0] ?? "",
    ...(trip.tags ?? []),
    ...(trip.highlights ?? []),
    ...costFields,
  ];
}

export function searchTrips(query: string, allTrips: Trip[]): Trip[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(" ").filter(Boolean);

  return allTrips.filter((trip) => {
    const haystack = normalizeSearchText(getTripSearchFields(trip).join(" "));
    return terms.every((term) => haystack.includes(term));
  });
}
