import Image from "next/image";
import type { Trip } from "@/data/trips";
import { getTripCardLayerStyle } from "@/lib/trip-media";

type TripCardImageProps = {
  trip: Trip;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function TripCardImage({
  trip,
  sizes,
  priority = false,
  className = "object-cover transition-transform duration-300 group-hover:scale-[1.03]",
}: TripCardImageProps) {
  if (trip.heroImage) {
    return (
      <Image
        src={trip.heroImage}
        alt={trip.heroImageLabel ?? trip.title}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={
          trip.heroImagePosition
            ? { objectPosition: trip.heroImagePosition }
            : undefined
        }
      />
    );
  }

  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={getTripCardLayerStyle(trip)}
      role="img"
      aria-label={trip.heroImageLabel ?? trip.title}
    />
  );
}
