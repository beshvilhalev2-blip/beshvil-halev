import { getCityDefinition } from "@/lib/find-my-trip/cities";
import type { CityId, TravelTime, TripRef } from "@/lib/find-my-trip/types";
import { getDistanceKm } from "@/lib/geo";

const TRAVEL_TIME_ORDER: TravelTime[] = ["30m", "1h", "1h-plus", "any"];

/** Conservative straight-line caps — not driving time. */
const STRAIGHT_LINE_KM_LIMIT: Record<TravelTime, number> = {
  "30m": 20,
  "1h": 45,
  "1h-plus": 90,
  any: Number.POSITIVE_INFINITY,
};

export function getStraightLineDistanceFromCity(
  trip: TripRef,
  cityId: CityId,
): number | null {
  if (!trip.location) {
    return null;
  }

  const city = getCityDefinition(cityId);
  return getDistanceKm(
    { lat: city.lat, lng: city.lng },
    { lat: trip.location.lat, lng: trip.location.lng },
  );
}

export function getRequiredTravelTimeForDistance(distanceKm: number): TravelTime {
  if (distanceKm <= STRAIGHT_LINE_KM_LIMIT["30m"]) {
    return "30m";
  }

  if (distanceKm <= STRAIGHT_LINE_KM_LIMIT["1h"]) {
    return "1h";
  }

  if (distanceKm <= STRAIGHT_LINE_KM_LIMIT["1h-plus"]) {
    return "1h-plus";
  }

  return "any";
}

export function tripMatchesTravelDistance(
  trip: TripRef,
  cityId: CityId,
  travelTime: TravelTime,
): boolean | null {
  const distanceKm = getStraightLineDistanceFromCity(trip, cityId);
  if (distanceKm === null) {
    return null;
  }

  const required = getRequiredTravelTimeForDistance(distanceKm);
  return (
    TRAVEL_TIME_ORDER.indexOf(required) <=
    TRAVEL_TIME_ORDER.indexOf(travelTime)
  );
}

export function getTravelDistanceScoreBonus(
  trip: TripRef,
  cityId: CityId,
): number {
  const distanceKm = getStraightLineDistanceFromCity(trip, cityId);
  if (distanceKm === null) {
    return 0;
  }

  if (distanceKm <= STRAIGHT_LINE_KM_LIMIT["30m"]) {
    return 8;
  }

  if (distanceKm <= STRAIGHT_LINE_KM_LIMIT["1h"]) {
    return 5;
  }

  if (distanceKm <= STRAIGHT_LINE_KM_LIMIT["1h-plus"]) {
    return 2;
  }

  return 0;
}
