import type { Trip } from "@/data/trips";

const HERO_OVERLAY =
  "linear-gradient(160deg, rgba(28, 25, 23, 0.55) 0%, rgba(28, 25, 23, 0.25) 50%, rgba(28, 25, 23, 0.45) 100%)";

export function getTripHeroBackground(trip: Trip): string {
  if (trip.heroImage) {
    return `${HERO_OVERLAY}, url("${trip.heroImage}")`;
  }
  return trip.heroBackgroundImage;
}

export function getTripCardBackground(trip: Trip): string {
  if (trip.heroImage) {
    return `url("${trip.heroImage}")`;
  }
  return trip.heroBackgroundImage;
}
