import type { CityId, TravelTime, TripRef } from "@/lib/find-my-trip/types";
import { getTripMatcherProfile } from "@/lib/find-my-trip/trip-profile";

/** Hebrew region titles as used in trip.region */
export type RegionTitle = "צפון" | "מרכז" | "ירושלים" | "דרום";

const CITY_REGION_PROXIMITY: Record<
  CityId,
  [RegionTitle, RegionTitle, RegionTitle, RegionTitle]
> = {
  rishon: ["מרכז", "דרום", "ירושלים", "צפון"],
  "tel-aviv": ["מרכז", "צפון", "ירושלים", "דרום"],
  jerusalem: ["ירושלים", "מרכז", "דרום", "צפון"],
  "beer-sheva": ["דרום", "מרכז", "ירושלים", "צפון"],
  haifa: ["צפון", "מרכז", "ירושלים", "דרום"],
  modiin: ["מרכז", "ירושלים", "דרום", "צפון"],
  netanya: ["מרכז", "צפון", "ירושלים", "דרום"],
  ashdod: ["דרום", "מרכז", "ירושלים", "צפון"],
};

const TRAVEL_TIME_REGION_COUNT: Record<TravelTime, number> = {
  "30m": 1,
  "1h": 2,
  "1h30": 3,
  "2h": 4,
  any: 4,
};

const TRAVEL_TIME_ORDER: TravelTime[] = ["30m", "1h", "1h30", "2h", "any"];

export function getAllowedRegions(
  city: CityId,
  travelTime: TravelTime,
): RegionTitle[] {
  if (travelTime === "any") {
    return ["צפון", "מרכז", "ירושלים", "דרום"];
  }

  const count = TRAVEL_TIME_REGION_COUNT[travelTime];
  return CITY_REGION_PROXIMITY[city].slice(0, count);
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
    return TRAVEL_TIME_ORDER.indexOf(perCityLimit) <= TRAVEL_TIME_ORDER.indexOf(travelTime);
  }

  const allowed = getAllowedRegions(city, travelTime);
  return allowed.includes(trip.region as RegionTitle);
}

export function isPrimaryRegionMatch(
  trip: TripRef,
  city: CityId,
): boolean {
  const primary = CITY_REGION_PROXIMITY[city][0];
  return trip.region === primary;
}

export function getCityLabel(city: CityId): string {
  const labels: Record<CityId, string> = {
    rishon: "ראשון לציון",
    "tel-aviv": "תל אביב",
    jerusalem: "ירושלים",
    "beer-sheva": "באר שבע",
    haifa: "חיפה",
    modiin: "מודיעין",
    netanya: "נתניה",
    ashdod: "אשדוד",
  };

  return labels[city];
}
