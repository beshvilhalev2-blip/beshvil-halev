import { getDistanceKm } from "@/lib/geo";
import type { CityId } from "@/lib/find-my-trip/cities";
import {
  getCitiesGroupedByRegion,
  getCityLabel,
} from "@/lib/find-my-trip/cities";

export function resolveCityFromGeolocation(
  coords: GeolocationCoordinates,
): CityId {
  return getNearestCityFromCoordinates({
    latitude: coords.latitude,
    longitude: coords.longitude,
  }).cityId;
}

export function getNearestCityFromCoordinates(coords: {
  latitude: number;
  longitude: number;
}): { cityId: CityId; label: string; distanceKm: number } {
  const grouped = getCitiesGroupedByRegion();
  let nearestId: CityId | null = null;
  let nearestLabel = "";
  let nearestDistance = Infinity;

  for (const section of grouped) {
    for (const city of section.cities) {
      const distance = getDistanceKm(
        { lat: coords.latitude, lng: coords.longitude },
        { lat: city.lat, lng: city.lng },
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestId = city.id;
        nearestLabel = city.label;
      }
    }
  }

  const cityId = nearestId ?? "tel-aviv";

  return {
    cityId,
    label: nearestLabel || getCityLabel(cityId),
    distanceKm: nearestDistance,
  };
}

export function normalizeCitySearchQuery(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

export function filterCitiesByQuery(query: string) {
  const normalizedQuery = normalizeCitySearchQuery(query);
  if (!normalizedQuery) {
    return null;
  }

  const grouped = getCitiesGroupedByRegion();
  return grouped
    .map((section) => ({
      ...section,
      cities: section.cities.filter((city) =>
        city.label.includes(normalizedQuery),
      ),
    }))
    .filter((section) => section.cities.length > 0);
}
