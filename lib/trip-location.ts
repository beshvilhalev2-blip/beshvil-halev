import type { Trip } from "@/data/trips";
import { buildGoogleMapsUrl, buildWazeUrl } from "@/lib/geo";

export function getTripLocationLabel(trip: Trip): string | undefined {
  return trip.location?.label;
}

export function getTripWazeUrl(trip: Trip): string | undefined {
  if (trip.location?.wazeUrl) {
    return trip.location.wazeUrl;
  }

  if (trip.wazeUrl) {
    return trip.wazeUrl;
  }

  if (trip.location) {
    return buildWazeUrl(trip.location.lat, trip.location.lng);
  }

  return undefined;
}

export function getTripGoogleMapsUrl(trip: Trip): string | undefined {
  if (trip.location?.googleMapsUrl) {
    return trip.location.googleMapsUrl;
  }

  if (trip.googleMapsUrl) {
    return trip.googleMapsUrl;
  }

  if (trip.location) {
    return buildGoogleMapsUrl(
      trip.location.lat,
      trip.location.lng,
      trip.location.label,
    );
  }

  return undefined;
}
