import type { MatchReason, TripRef, WizardAnswers } from "@/lib/find-my-trip/types";
import { getActivityReasonLabel } from "@/lib/find-my-trip/activity-matching";
import { getBudgetReasonLabel } from "@/lib/find-my-trip/budget-matching";
import { getCompanionReasonLabel } from "@/lib/find-my-trip/companion-matching";
import { getCityLabel, isPrimaryRegionMatch } from "@/lib/find-my-trip/city-regions";
import { REASON_IDS } from "@/lib/find-my-trip/constants";
import {
  getTripMatcherProfile,
  inferTripActivities,
  isTripFullyAuthored,
} from "@/lib/find-my-trip/trip-profile";
import {
  getWeatherReasonLabel,
  hasWeatherTrait,
} from "@/lib/find-my-trip/weather-matching";
import { getVehicleReasonLabel } from "@/lib/find-my-trip/vehicle-matching";

const MIN_REASONS = 3;
const MAX_REASONS = 4;

type ReasonCandidate = MatchReason & { priority: number };

function pushReason(
  list: ReasonCandidate[],
  reason: MatchReason,
  priority: number,
): void {
  if (list.some((item) => item.id === reason.id)) {
    return;
  }

  list.push({ ...reason, priority });
}

export function buildMatchReasons(
  trip: TripRef,
  answers: WizardAnswers,
  usedFallback: boolean,
): MatchReason[] {
  const candidates: ReasonCandidate[] = [];

  if (inferTripActivities(trip).includes(answers.activity)) {
    pushReason(
      candidates,
      {
        id: REASON_IDS.activity(answers.activity),
        label: getActivityReasonLabel(answers.activity),
        category: "activity",
      },
      1,
    );
  }

  const cityLabel = getCityLabel(answers.city);
  pushReason(
    candidates,
    {
      id: REASON_IDS.location(answers.city),
      label: isPrimaryRegionMatch(trip, answers.city)
        ? `קרוב ל${cityLabel}`
        : `במרחק נסיעה מ${cityLabel}`,
      category: "location",
    },
    2,
  );

  pushReason(
    candidates,
    {
      id: REASON_IDS.weather(answers.weather),
      label: getWeatherReasonLabel(answers.weather),
      category: "weather",
    },
    3,
  );

  if (answers.weather === "hot-day" && hasWeatherTrait(trip, "water-friendly")) {
    pushReason(
      candidates,
      {
        id: "weather-water-friendly",
        label: "מקום עם מים — מציל בחום",
        category: "weather",
      },
      3,
    );
  }

  if (
    answers.weather === "winter-after-rain" &&
    hasWeatherTrait(trip, "winter-ideal")
  ) {
    pushReason(
      candidates,
      {
        id: "weather-winter-ideal",
        label: "יפה במיוחד בימים קרירים",
        category: "weather",
      },
      3,
    );
  }

  pushReason(
    candidates,
    {
      id: REASON_IDS.companion(answers.companion),
      label: getCompanionReasonLabel(answers.companion),
      category: "companion",
    },
    4,
  );

  const budgetLabel = getBudgetReasonLabel(trip, answers.budget);
  if (budgetLabel) {
    pushReason(
      candidates,
      {
        id: REASON_IDS.budget(answers.budget),
        label: budgetLabel,
        category: "budget",
      },
      5,
    );
  }

  if (answers.vehicle) {
    pushReason(
      candidates,
      {
        id: REASON_IDS.vehicle(answers.vehicle),
        label: getVehicleReasonLabel(answers.vehicle),
        category: "vehicle",
      },
      6,
    );
  }

  if (isTripFullyAuthored(trip)) {
    pushReason(
      candidates,
      {
        id: REASON_IDS.qualityAuthored,
        label: "כתבה מלאה באתר",
        category: "quality",
      },
      7,
    );
  }

  if (trip.featured) {
    pushReason(
      candidates,
      {
        id: REASON_IDS.qualityFeatured,
        label: "אחד המסלולים המומלצים שלנו",
        category: "quality",
      },
      8,
    );
  }

  if (usedFallback) {
    pushReason(
      candidates,
      {
        id: REASON_IDS.fallbackNearMatch,
        label: "קרוב למה שחיפשת",
        category: "fallback",
      },
      9,
    );
  }

  const profile = getTripMatcherProfile(trip);
  if (profile.weatherTraits?.length) {
    pushReason(
      candidates,
      {
        id: "quality-curated",
        label: "נבחר במיוחד לפי ההעדפות שלך",
        category: "quality",
      },
      10,
    );
  }

  const sorted = candidates.sort((a, b) => a.priority - b.priority);
  const selected = sorted.slice(0, MAX_REASONS);

  while (selected.length < MIN_REASONS) {
    const filler = getFallbackReason(selected.length, answers, trip);
    if (selected.some((item) => item.id === filler.id)) {
      break;
    }
    selected.push({ ...filler, priority: 99 });
  }

  return selected.map(({ id, label, category }) => ({ id, label, category }));
}

function getFallbackReason(
  index: number,
  answers: WizardAnswers,
  trip: TripRef,
): MatchReason {
  const fillers: MatchReason[] = [
    {
      id: `fallback-region-${trip.region}`,
      label: `מסלול באזור ${trip.region}`,
      category: "location",
    },
    {
      id: `fallback-category-${trip.category}`,
      label: `מתאים ל${trip.category.toLowerCase()}`,
      category: "activity",
    },
    {
      id: REASON_IDS.companion(answers.companion),
      label: getCompanionReasonLabel(answers.companion),
      category: "companion",
    },
    {
      id: REASON_IDS.weather(answers.weather),
      label: getWeatherReasonLabel(answers.weather),
      category: "weather",
    },
  ];

  return fillers[index % fillers.length];
}
