import type { Trip } from "@/data/trips";
import { getTripPlaceName } from "@/lib/trip-display-title";

function basenameFromSrc(src: string): string {
  const decoded = decodeURIComponent(src.split("/").pop() ?? "תמונה");
  return decoded.replace(/\.[^.]+$/i, "");
}

export function resolveHeroImageLabel(trip: Trip): string {
  const existing = trip.heroImageLabel?.trim();
  if (existing) {
    return existing;
  }

  return `תמונת רקע - ${getTripPlaceName(trip)}`;
}

export function resolveGalleryImageLabel(
  trip: Trip,
  src: string,
  existing?: string,
): string {
  if (existing?.trim()) {
    return existing.trim();
  }

  const placeName = getTripPlaceName(trip);
  const base = basenameFromSrc(src);

  if (/^hero$/i.test(base)) {
    return `${placeName} - תמונת רקע`;
  }

  return `${placeName} - צילום מהמקום`;
}
