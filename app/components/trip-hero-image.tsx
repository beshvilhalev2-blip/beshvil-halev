import Image from "next/image";
import type { Trip } from "@/data/trips";
import { getTripHeroLayerStyle } from "@/lib/trip-media";
import { resolveHeroImageLabel } from "@/lib/trip-image-labels";
import { TRIP_HERO_IMAGE_SIZES } from "@/lib/trip-image-sizes";

type TripHeroImageProps = {
  trip: Trip;
  sizes?: string;
  priority?: boolean;
};

export default function TripHeroImage({
  trip,
  sizes = TRIP_HERO_IMAGE_SIZES,
  priority = true,
}: TripHeroImageProps) {
  const heroAlt = resolveHeroImageLabel(trip);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="trip-hero-ken-burns absolute inset-[-3%] size-[106%] will-change-transform">
        {trip.heroImage ? (
          <Image
            src={trip.heroImage}
            alt={heroAlt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={
              trip.heroImagePosition
                ? { objectPosition: trip.heroImagePosition }
                : undefined
            }
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={getTripHeroLayerStyle(trip)}
            role="img"
            aria-label={heroAlt}
          />
        )}
      </div>
    </div>
  );
}
