import type { Trip } from "@/data/trips";

const HERO_OVERLAY =
  "linear-gradient(160deg, rgba(28, 25, 23, 0.55) 0%, rgba(28, 25, 23, 0.25) 50%, rgba(28, 25, 23, 0.45) 100%)";

export type TripBackgroundStyle = {
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
};

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

export function getTripHeroLayerStyle(trip: Trip): TripBackgroundStyle {
  if (trip.heroImage) {
    const imagePosition = trip.heroImagePosition ?? "center";
    return {
      backgroundImage: getTripHeroBackground(trip),
      backgroundPosition: `center, ${imagePosition}`,
      backgroundSize: "cover",
    };
  }

  return {
    backgroundImage: trip.heroBackgroundImage,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
}

export function getTripCardLayerStyle(trip: Trip): TripBackgroundStyle {
  return {
    backgroundImage: getTripCardBackground(trip),
    backgroundPosition: trip.heroImagePosition ?? "center",
    backgroundSize: "cover",
  };
}
