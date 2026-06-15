import type { ActivityType, TripRef } from "@/lib/find-my-trip/types";
import { inferTripActivities } from "@/lib/find-my-trip/trip-profile";

export function tripMatchesActivity(
  trip: TripRef,
  activity: ActivityType,
): boolean {
  const activities = inferTripActivities(trip);
  return activities.includes(activity);
}

export function getActivityMatchScore(
  trip: TripRef,
  activity: ActivityType,
): number {
  return tripMatchesActivity(trip, activity) ? 30 : 0;
}

export function getActivityReasonLabel(activity: ActivityType): string {
  const labels: Record<ActivityType, string> = {
    water: "מתאים למים ולהתרעננות",
    "nature-shade": "שילוב של טבע וצל נעים",
    viewpoint: "נקודת תצפית עם נוף יפה",
    picnic: "מקום נוח לפיקניק ולשהייה",
    "easy-trails": "שבילים קלים ונגישים",
    camping: "מתאים ליום בשטח ולקמפינג",
  };

  return labels[activity];
}
