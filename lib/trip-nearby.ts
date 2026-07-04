import type { Trip, TripNearbyPlace } from "@/data/trips";
import {
  getTripRegionSlug,
  isPublishedTrip,
  isSiteVisibleTrip,
} from "@/data/trips";
import {
  inferTripCompanions,
  toTripRef,
} from "@/lib/find-my-trip/trip-profile";
import { getDistanceKm } from "@/lib/geo";
import { getTripPlaceName } from "@/lib/trip-display-title";

const MAX_NEARBY_TRIPS = 3;
/** Straight-line cap - avoids broad regional matches (e.g. upper Galilee vs Jezreel). */
const MAX_NEARBY_DISTANCE_KM = 30;

function tripToNearbyPlace(trip: Trip): TripNearbyPlace {
  return {
    title: getTripPlaceName(trip),
    description: trip.subtitle.trim() || trip.metaDescription.trim(),
    href: `/trips/${trip.slug}`,
  };
}

function isNearbyCandidate(trip: Trip, source: Trip): boolean {
  if (trip.slug === source.slug) {
    return false;
  }

  if (!isSiteVisibleTrip(trip) || !isPublishedTrip(trip)) {
    return false;
  }

  return Boolean(trip.location);
}

function isFamilyFriendlyTrip(trip: Trip): boolean {
  const companions = inferTripCompanions(toTripRef(trip));
  return companions.includes("family") || companions.includes("kids");
}

function findByCoordinates(source: Trip, allTrips: Trip[]): TripNearbyPlace[] {
  if (!source.location) {
    return [];
  }

  const sourceRegion = getTripRegionSlug(source);
  const origin = source.location;

  return allTrips
    .filter((trip) => isNearbyCandidate(trip, source))
    .map((trip) => ({
      trip,
      distanceKm: getDistanceKm(origin, trip.location!),
    }))
    .filter(({ distanceKm }) => distanceKm <= MAX_NEARBY_DISTANCE_KM)
    .sort((a, b) => {
      const aSameRegion =
        getTripRegionSlug(a.trip) === sourceRegion ? 0 : 1;
      const bSameRegion =
        getTripRegionSlug(b.trip) === sourceRegion ? 0 : 1;
      if (aSameRegion !== bSameRegion) {
        return aSameRegion - bSameRegion;
      }

      const aFamily = isFamilyFriendlyTrip(a.trip) ? 0 : 1;
      const bFamily = isFamilyFriendlyTrip(b.trip) ? 0 : 1;
      if (aFamily !== bFamily) {
        return aFamily - bFamily;
      }

      return a.distanceKm - b.distanceKm;
    })
    .slice(0, MAX_NEARBY_TRIPS)
    .map(({ trip }) => tripToNearbyPlace(trip));
}

export function resolveNearbyPlaces(
  source: Trip,
  allTrips: Trip[],
): TripNearbyPlace[] {
  return findByCoordinates(source, allTrips);
}

export function resolveNearbySubtitle(
  source: Trip,
  places: TripNearbyPlace[],
): string | undefined {
  if (places.length === 0) {
    return undefined;
  }

  const custom = source.nearbySubtitle?.trim();
  if (custom) {
    return custom;
  }

  return "המשיכו לגלות באזור";
}
