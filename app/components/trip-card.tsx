import Link from "next/link";
import type { Region, Trip } from "@/data/trips";
import VisitedStamp from "@/app/components/visited-stamp";
import TripCardImage from "@/app/components/trip-card-image";
import { getTripCardTags } from "@/lib/trip-card-tags";
import {
  TRIP_CARD_IMAGE_SIZES,
  TRIP_MINI_CARD_IMAGE_SIZES,
} from "@/lib/trip-image-sizes";
import {
  getRegionTheme,
  getTripCardContentClasses,
  TRIP_CARD_IMAGE_ASPECT,
  TRIP_CARD_SHELL,
  TripCardArrowIcon,
  TripCardTagOverlay,
  type TripCardDensity,
} from "@/app/components/trip-card-shared";

export { getRegionForTrip } from "@/app/components/trip-card-shared";

type TripCardProps = {
  trip: Trip;
  region?: Region;
  density?: TripCardDensity;
  imageSizes?: string;
  priority?: boolean;
};

export default function TripCard({
  trip,
  region,
  density = "default",
  imageSizes,
  priority = false,
}: TripCardProps) {
  const theme = getRegionTheme(trip, region);
  const content = getTripCardContentClasses(density);
  const tags = getTripCardTags(trip);
  const isComingSoon = trip.status === "needs-content";
  const ctaLabel = isComingSoon ? "לעמוד המקום" : "לכתבה המלאה";
  const resolvedImageSizes =
    imageSizes ??
    (density === "compact" ? TRIP_MINI_CARD_IMAGE_SIZES : TRIP_CARD_IMAGE_SIZES);

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className={`${TRIP_CARD_SHELL} ${theme.borderHover}`}
    >
      <div className="relative">
        <div
          className={`relative ${TRIP_CARD_IMAGE_ASPECT} overflow-hidden bg-stone-200 dark:bg-stone-800`}
        >
          <TripCardImage
            trip={trip}
            sizes={resolvedImageSizes}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          <TripCardTagOverlay tags={tags} density={density} />
        </div>

        {trip.visitedByMilana ? <VisitedStamp placement="card" /> : null}
      </div>

      <div className={content.body}>
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${theme.accent}`}
        />

        <div className="relative flex flex-1 flex-col">
          <h3 className={content.title}>{trip.title}</h3>

          {trip.subtitle ? (
            <p className={content.subtitle}>{trip.subtitle}</p>
          ) : null}

          <span className={content.cta}>
            {ctaLabel}
            <TripCardArrowIcon className={content.arrow} />
          </span>
        </div>
      </div>
    </Link>
  );
}
