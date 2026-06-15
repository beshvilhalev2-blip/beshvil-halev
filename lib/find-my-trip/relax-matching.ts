import type {
  BudgetTier,
  RelaxLevel,
  TravelTime,
  TripRef,
  WizardAnswers,
} from "@/lib/find-my-trip/types";
import { tripMatchesActivity } from "@/lib/find-my-trip/activity-matching";
import { tripMatchesBudget } from "@/lib/find-my-trip/budget-matching";
import { tripMatchesCompanion } from "@/lib/find-my-trip/companion-matching";
import { tripMatchesRegion, widenTravelTime } from "@/lib/find-my-trip/city-regions";
import { MIN_RESULTS_BEFORE_RELAX } from "@/lib/find-my-trip/constants";
import { relaxBudgetTier } from "@/lib/find-my-trip/trip-profile";
import {
  tripMatchesWeather,
  type WeatherMatchMode,
} from "@/lib/find-my-trip/weather-matching";
import { tripMatchesVehicle } from "@/lib/find-my-trip/vehicle-matching";

export type FilterOptions = {
  relaxLevel: RelaxLevel;
  requireActivity: boolean;
  weatherMode: WeatherMatchMode;
  travelTime: TravelTime;
  budget: BudgetTier;
};

export function getFilterOptions(
  relaxLevel: RelaxLevel,
  answers: WizardAnswers,
): FilterOptions {
  let travelTime = answers.travelTime;
  let budget = answers.budget;
  let requireActivity = true;
  let weatherMode: WeatherMatchMode = "strict";

  if (relaxLevel >= 1) {
    travelTime = widenTravelTime(travelTime);
  }
  if (relaxLevel >= 2) {
    budget = relaxBudgetTier(budget);
  }
  if (relaxLevel >= 3) {
    weatherMode = "soft";
  }
  if (relaxLevel >= 4) {
    requireActivity = false;
  }

  return {
    relaxLevel,
    requireActivity,
    weatherMode,
    travelTime,
    budget,
  };
}

export function filterTrips(
  trips: TripRef[],
  answers: WizardAnswers,
  options: FilterOptions,
): TripRef[] {
  return trips.filter((trip) => {
    if (!tripMatchesRegion(trip, answers.city, options.travelTime)) {
      return false;
    }

    if (!tripMatchesBudget(trip, options.budget)) {
      return false;
    }

    if (!tripMatchesCompanion(trip, answers.companion)) {
      return false;
    }

    if (
      options.requireActivity &&
      !tripMatchesActivity(trip, answers.activity)
    ) {
      return false;
    }

    if (
      !tripMatchesWeather(
        trip,
        answers.weather,
        answers.companion,
        answers.activity,
        options.weatherMode,
      )
    ) {
      return false;
    }

    if (!tripMatchesVehicle(trip, answers.vehicle)) {
      return false;
    }

    return true;
  });
}

export function resolveFilterWithRelaxation(
  trips: TripRef[],
  answers: WizardAnswers,
): { filtered: TripRef[]; relaxLevel: RelaxLevel } {
  for (let level = 0 as RelaxLevel; level <= 4; level = (level + 1) as RelaxLevel) {
    const options = getFilterOptions(level, answers);
    const filtered = filterTrips(trips, answers, options);

    if (filtered.length >= MIN_RESULTS_BEFORE_RELAX || level === 4) {
      return { filtered, relaxLevel: level };
    }
  }

  return { filtered: trips, relaxLevel: 4 };
}
