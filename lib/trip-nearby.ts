import type { Trip, TripNearbyPlace } from "@/data/trips";
import { isPublishedTrip, isSiteVisibleTrip } from "@/data/trips";
import { getDistanceKm } from "@/lib/geo";

const MAX_NEARBY_TRIPS = 3;
/** Straight-line cap - avoids broad regional matches (e.g. upper Galilee vs Jezreel). */
const MAX_NEARBY_DISTANCE_KM = 30;

function tripToNearbyPlace(trip: Trip): TripNearbyPlace {
  return {
    title: trip.title,
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

function findByCoordinates(source: Trip, allTrips: Trip[]): TripNearbyPlace[] {
  if (!source.location) {
    return [];
  }

  const origin = source.location;

  return allTrips
    .filter((trip) => isNearbyCandidate(trip, source))
    .map((trip) => ({
      trip,
      distanceKm: getDistanceKm(origin, trip.location!),
    }))
    .filter(({ distanceKm }) => distanceKm <= MAX_NEARBY_DISTANCE_KM)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, MAX_NEARBY_TRIPS)
    .map(({ trip }) => tripToNearbyPlace(trip));
}

function findByManualSlugs(source: Trip, allTrips: Trip[]): TripNearbyPlace[] {
  const slugs = source.nearbyTripSlugs;
  if (!slugs) {
    return [];
  }

  const bySlug = new Map(allTrips.map((trip) => [trip.slug, trip]));

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((trip): trip is Trip => {
      if (!trip || trip.slug === source.slug) {
        return false;
      }
      return isSiteVisibleTrip(trip) && isPublishedTrip(trip);
    })
    .slice(0, MAX_NEARBY_TRIPS)
    .map(tripToNearbyPlace);
}

export function resolveNearbyPlaces(
  source: Trip,
  allTrips: Trip[],
): TripNearbyPlace[] {
  if (source.nearbyTripSlugs !== undefined) {
    return findByManualSlugs(source, allTrips);
  }

  const byCoordinates = findByCoordinates(source, allTrips);
  if (byCoordinates.length > 0) {
    return byCoordinates;
  }

  return [];
}

export function resolveNearbySubtitle(source: Trip, places: TripNearbyPlace[]): string | undefined {
  if (places.length === 0) {
    return undefined;
  }

  const custom = source.nearbySubtitle?.trim();
  if (custom) {
    return custom;
  }

  return "המשיכו לגלות באזור";
}
