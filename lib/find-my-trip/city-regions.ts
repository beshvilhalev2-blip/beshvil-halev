import type { CityId, TravelTime, TripRef } from "@/lib/find-my-trip/types";
import {
  getCityLabel,
  getCityRegionProximity,
  type RegionTitle,
} from "@/lib/find-my-trip/cities";
import { getTripMatcherProfile } from "@/lib/find-my-trip/trip-profile";
import { tripMatchesTravelDistance } from "@/lib/find-my-trip/travel-distance";

export type { RegionTitle };

const TRAVEL_TIME_REGION_COUNT: Record<TravelTime, number> = {
  "30m": 1,
  "1h": 2,
  "1h-plus": 4,
  any: 4,
};

const TRAVEL_TIME_ORDER: TravelTime[] = ["30m", "1h", "1h-plus", "any"];

export function getAllowedRegions(
  city: CityId,
  travelTime: TravelTime,
): RegionTitle[] {
  if (travelTime === "any") {
    return ["צפון", "מרכז", "ירושלים", "דרום"];
  }

  const count = TRAVEL_TIME_REGION_COUNT[travelTime];
  return getCityRegionProximity(city).slice(0, count);
}

export function widenTravelTime(travelTime: TravelTime): TravelTime {
  const index = TRAVEL_TIME_ORDER.indexOf(travelTime);
  if (index === -1 || index >= TRAVEL_TIME_ORDER.length - 1) {
    return "any";
  }

  return TRAVEL_TIME_ORDER[index + 1];
}

export function tripMatchesRegion(
  trip: TripRef,
  city: CityId,
  travelTime: TravelTime,
): boolean {
  if (travelTime === "any") {
    return true;
  }

  const profile = getTripMatcherProfile(trip);
  const perCityLimit = profile.travelTimeFrom?.[city];
  if (perCityLimit) {
    return (
      TRAVEL_TIME_ORDER.indexOf(perCityLimit) <=
      TRAVEL_TIME_ORDER.indexOf(travelTime)
    );
  }

  const distanceMatch = tripMatchesTravelDistance(trip, city, travelTime);
  if (distanceMatch !== null) {
    return distanceMatch;
  }

  const allowed = getAllowedRegions(city, travelTime);
  return allowed.includes(trip.region as RegionTitle);
}

export function isPrimaryRegionMatch(trip: TripRef, city: CityId): boolean {
  const primary = getCityRegionProximity(city)[0];
  return trip.region === primary;
}

export { getCityLabel };
