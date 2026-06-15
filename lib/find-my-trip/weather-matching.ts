import type {
  ActivityType,
  CompanionType,
  TripRef,
  WeatherPreference,
} from "@/lib/find-my-trip/types";
import { isFamilyCompanion } from "@/lib/find-my-trip/companion-matching";
import {
  getTripMatcherProfile,
  inferTripWeatherTraits,
} from "@/lib/find-my-trip/trip-profile";
import type { WeatherTrait } from "@/lib/find-my-trip/trip-profile";

export type WeatherMatchMode = "strict" | "soft";

export function tripMatchesWeather(
  trip: TripRef,
  weather: WeatherPreference,
  companion: CompanionType,
  activity: ActivityType,
  mode: WeatherMatchMode = "strict",
): boolean {
  const profile = getTripMatcherProfile(trip);
  if (profile.weatherAvoid?.includes(weather)) {
    return mode === "soft";
  }

  const traits = inferTripWeatherTraits(trip);

  if (weather === "hot-day") {
    if (traits.includes("heat-sensitive") && isFamilyCompanion(companion)) {
      return mode === "soft";
    }
    return true;
  }

  if (weather === "pleasant") {
    return true;
  }

  if (weather === "winter-after-rain") {
    if (
      traits.includes("rain-sensitive") &&
      isFamilyCompanion(companion) &&
      activity === "easy-trails"
    ) {
      return mode === "soft";
    }
    return true;
  }

  return true;
}

export function getWeatherMatchScore(
  trip: TripRef,
  weather: WeatherPreference,
  companion: CompanionType,
  activity: ActivityType,
): number {
  const traits = inferTripWeatherTraits(trip);
  let score = 0;

  if (weather === "hot-day") {
    if (traits.includes("water-friendly")) {
      score += 15;
    }
    if (traits.includes("heat-tolerant")) {
      score += 10;
    }
    if (traits.includes("heat-sensitive")) {
      score += isFamilyCompanion(companion) ? -25 : -10;
    }
    if (activity === "water" && traits.includes("water-friendly")) {
      score += 5;
    }
  }

  if (weather === "pleasant") {
    if (traits.includes("shade-rich")) {
      score += 15;
    }
    if (traits.includes("heat-sensitive")) {
      score -= 5;
    }
  }

  if (weather === "winter-after-rain") {
    if (traits.includes("winter-ideal")) {
      score += 15;
    }
    if (traits.includes("shade-rich")) {
      score += 8;
    }
    if (traits.includes("rain-sensitive")) {
      score += activity === "easy-trails" ? -20 : -10;
    }
    if (activity === "water") {
      score -= 5;
    }
  }

  if (traits.includes("indoor-fallback")) {
    score += 5;
  }

  return score;
}

export function getWeatherReasonLabel(weather: WeatherPreference): string {
  const labels: Record<WeatherPreference, string> = {
    "hot-day": "מושלם ליום חם",
    pleasant: "נעים במזג אוויר מתון",
    "winter-after-rain": "מתאים לחורף ואחרי גשם",
  };

  return labels[weather];
}

export function hasWeatherTrait(
  trip: TripRef,
  trait: WeatherTrait,
): boolean {
  return inferTripWeatherTraits(trip).includes(trait);
}
