import type { TripNearbyPlace } from "@/data/trips";

/** Placeholder copy used while editorial content is pending. */
export function isPlaceholderContent(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) {
    return true;
  }

  return (
    trimmed.startsWith("[") ||
    trimmed.includes("יוחלף בתוכן") ||
    trimmed.includes("[placeholder]")
  );
}

/** Placeholder or unknown values in structured fields (cost, quick facts, etc.). */
export function isPlaceholderValue(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || isPlaceholderContent(trimmed)) {
    return true;
  }

  return /^₪\s*-+$/.test(trimmed);
}

export function getRealNearbyPlaces(
  places: readonly TripNearbyPlace[],
): TripNearbyPlace[] {
  return places.filter(
    (place) =>
      place.title.trim() &&
      place.description.trim() &&
      !isPlaceholderContent(place.title) &&
      !isPlaceholderContent(place.description),
  );
}

export function getRealContentParagraphs(paragraphs: readonly string[]): string[] {
  return paragraphs.filter((paragraph) => !isPlaceholderContent(paragraph));
}

export function hasRealContentParagraphs(paragraphs: readonly string[]): boolean {
  return getRealContentParagraphs(paragraphs).length > 0;
}

export function getRealTips(tips: readonly string[], max = 5): string[] {
  return getRealContentParagraphs(tips).slice(0, max);
}

export function getExpectationParagraphs(
  paragraphs: readonly string[],
  max = 3,
): string[] {
  return getRealContentParagraphs(paragraphs).slice(0, max);
}
