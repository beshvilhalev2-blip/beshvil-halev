import type {
  MatchContext,
  MatchResult,
  MatchedTrip,
  ScoredTripCandidate,
  WizardAnswers,
  TripRef,
} from "@/lib/find-my-trip/types";
import { getActivityMatchScore } from "@/lib/find-my-trip/activity-matching";
import { getCompanionMatchScore } from "@/lib/find-my-trip/companion-matching";
import { getBudgetMatchScore } from "@/lib/find-my-trip/budget-matching";
import { isPrimaryRegionMatch } from "@/lib/find-my-trip/city-regions";
import {
  ACTIVITY_LABELS,
  BUDGET_LABELS,
  COMPANION_LABELS,
  RESULTS_LIMIT,
  WEATHER_LABELS,
  VEHICLE_LABELS,
} from "@/lib/find-my-trip/constants";
import { buildMatchReasons } from "@/lib/find-my-trip/match-reasons";
import { resolveFilterWithRelaxation } from "@/lib/find-my-trip/relax-matching";
import { isTripFullyAuthored } from "@/lib/find-my-trip/trip-profile";
import { getTravelDistanceScoreBonus } from "@/lib/find-my-trip/travel-distance";
import { getWeatherMatchScore } from "@/lib/find-my-trip/weather-matching";
import { getVehicleMatchScore } from "@/lib/find-my-trip/vehicle-matching";
import { getCityLabel } from "@/lib/find-my-trip/city-regions";

function scoreTrip(
  trip: TripRef,
  answers: WizardAnswers,
  usedFallback: boolean,
): number {
  let score = 0;

  score += getActivityMatchScore(trip, answers.activity);
  score += isPrimaryRegionMatch(trip, answers.city) ? 20 : 10;
  score += getWeatherMatchScore(
    trip,
    answers.weather,
    answers.companion,
    answers.activity,
  );
  score += getCompanionMatchScore(trip, answers.companion);
  score += getBudgetMatchScore(trip, answers.budget);
  score += getVehicleMatchScore(trip, answers.vehicle);
  score += getTravelDistanceScoreBonus(trip, answers.city);
  score += trip.featured ? 5 : 0;
  score += isTripFullyAuthored(trip) ? 10 : 0;

  if (usedFallback) {
    score -= 5;
  }

  return score;
}

function buildSummaryChips(answers: WizardAnswers): string[] {
  const chips = [
    getCityLabel(answers.city),
    ACTIVITY_LABELS[answers.activity],
    BUDGET_LABELS[answers.budget],
    WEATHER_LABELS[answers.weather],
    COMPANION_LABELS[answers.companion],
  ];

  if (answers.vehicle) {
    chips.push(VEHICLE_LABELS[answers.vehicle]);
  }

  return chips;
}

function toMatchedTrip(
  candidate: ScoredTripCandidate,
  answers: WizardAnswers,
  isPrimary: boolean,
): MatchedTrip {
  return {
    trip: candidate.trip,
    score: candidate.score,
    reasons: buildMatchReasons(candidate.trip, answers, candidate.usedFallback),
    isPrimary,
    usedFallback: candidate.usedFallback,
  };
}

export function matchTrips(context: MatchContext): MatchResult {
  const { answers, trips } = context;
  const { filtered, relaxLevel } = resolveFilterWithRelaxation(trips, answers);
  const usedFallback = relaxLevel > 0;

  const scored: ScoredTripCandidate[] = filtered
    .map((trip) => ({
      trip,
      score: scoreTrip(trip, answers, usedFallback),
      usedFallback,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, RESULTS_LIMIT);

  if (scored.length === 0) {
    return {
      primary: null,
      additional: [],
      totalCount: 0,
      usedFallback,
      summaryChips: buildSummaryChips(answers),
    };
  }

  const [top, ...rest] = scored;
  const primary = toMatchedTrip(top, answers, true);
  const additional = rest.map((candidate) =>
    toMatchedTrip(candidate, answers, false),
  );

  return {
    primary,
    additional,
    totalCount: scored.length,
    usedFallback,
    summaryChips: buildSummaryChips(answers),
  };
}

export function matchTripsFromAnswers(
  answers: WizardAnswers,
  trips: TripRef[],
): MatchResult {
  return matchTrips({ answers, trips });
}
