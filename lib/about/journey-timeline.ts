export const ABOUT_JOURNEY_STEPS = [
  { id: "mother", label: "אמא לשניים" },
  { id: "travel", label: "טיולים" },
  { id: "nature", label: "טבע" },
  { id: "community", label: "קהילה" },
  { id: "brand", label: "בשביל הלב" },
] as const;

export type AboutJourneyStepId = (typeof ABOUT_JOURNEY_STEPS)[number]["id"];
