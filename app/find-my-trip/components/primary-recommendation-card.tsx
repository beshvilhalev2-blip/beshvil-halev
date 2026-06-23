import Link from "next/link";
import type { Trip } from "@/data/trips";
import { getRegionForTrip } from "@/app/components/trip-card";
import MatchReasonsList from "@/app/find-my-trip/components/match-reasons-list";
import TripCardImage from "@/app/components/trip-card-image";
import { TripCardTagOverlay } from "@/app/components/trip-card-shared";
import { PRIMARY_RECOMMENDATION_TITLE } from "@/lib/find-my-trip/constants";
import { getTripCardTags } from "@/lib/trip-card-tags";
import { TRIP_CARD_IMAGE_SIZES } from "@/lib/trip-image-sizes";
import type { MatchReason } from "@/lib/find-my-trip/types";
import {
  getRegionTheme,
  getTripCardContentClasses,
  TripCardArrowIcon,
} from "@/app/components/trip-card-shared";

export default function PrimaryRecommendationCard({
  trip,
  reasons,
}: {
  trip: Trip;
  reasons: MatchReason[];
}) {
  const region = getRegionForTrip(trip);
  const theme = getRegionTheme(trip, region);
  const content = getTripCardContentClasses("default");
  const tags = getTripCardTags(trip);

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 ${theme.borderHover}`}
    >
      <Link href={`/trips/${trip.slug}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-200 sm:aspect-[21/9] dark:bg-stone-800">
          <TripCardImage trip={trip} sizes={TRIP_CARD_IMAGE_SIZES} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <span className="absolute start-4 top-4 rounded-full border border-amber-200/40 bg-amber-500/90 px-4 py-1.5 text-xs font-bold text-white shadow-sm sm:text-sm">
            {PRIMARY_RECOMMENDATION_TITLE}
          </span>
          <TripCardTagOverlay tags={tags} />
        </div>

        <div className={`relative ${content.body}`}>
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${theme.accent}`}
          />

          <div className="relative">
            <h3 className={content.title}>{trip.title}</h3>
            <p className={content.subtitle}>{trip.subtitle}</p>
            <span className={content.cta}>
              לכתבה המלאה
              <TripCardArrowIcon className={content.arrow} />
            </span>
          </div>
        </div>
      </Link>

      <div className="border-t border-stone-200/80 p-6 dark:border-stone-800 sm:p-8">
        <MatchReasonsList reasons={reasons} />
      </div>
    </article>
  );
}
