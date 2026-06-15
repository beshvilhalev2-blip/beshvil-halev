import type { BudgetTier, TripRef } from "@/lib/find-my-trip/types";
import {
  inferTripCostNis,
  tripMatchesBudget,
} from "@/lib/find-my-trip/trip-profile";

export function getBudgetMatchScore(
  trip: TripRef,
  budget: BudgetTier,
): number {
  if (budget === "any") {
    return 0;
  }

  return tripMatchesBudget(trip, budget) ? 10 : 0;
}

export function getBudgetReasonLabel(
  trip: TripRef,
  budget: BudgetTier,
): string | null {
  if (budget === "any") {
    return null;
  }

  const cost = inferTripCostNis(trip);

  if (budget === "free") {
    return cost === "free" || cost === 0 ? "כניסה חינם" : null;
  }

  if (budget === "up-to-50") {
    if (cost === "free" || cost === 0) {
      return "כניסה חינם — בתקציב שלך";
    }
    if (typeof cost === "number" && cost <= 50) {
      return "בתקציב של עד 50₪";
    }
    return null;
  }

  if (budget === "up-to-100") {
    if (cost === "free" || cost === 0) {
      return "כניסה חינם — בתקציב שלך";
    }
    if (typeof cost === "number" && cost <= 100) {
      return "בתקציב של עד 100₪";
    }
    return null;
  }

  return null;
}

export { tripMatchesBudget };
