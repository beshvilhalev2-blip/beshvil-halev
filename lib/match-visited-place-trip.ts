import { trips, type Trip } from "@/data/trips";
import type { VisitedPlace } from "@/data/places";

/** Match a visited place to a published trip article in the same region. */
export function getPublishedTripForVisitedPlace(
  place: VisitedPlace,
): Trip | undefined {
  return trips.find(
    (trip) =>
      trip.region === place.region &&
      (trip.slug === place.slug || trip.title === place.title),
  );
}

export function enrichVisitedPlacesWithTrips(
  places: VisitedPlace[],
): { place: VisitedPlace; publishedTrip?: Trip }[] {
  return places.map((place) => ({
    place,
    publishedTrip: getPublishedTripForVisitedPlace(place),
  }));
}
