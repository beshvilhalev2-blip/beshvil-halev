import Link from "next/link";
import type { Trip } from "@/data/trips";
import { getRegionForTrip } from "@/app/components/trip-card";
import MatchReasonsList from "@/app/find-my-trip/components/match-reasons-list";
import TripCardImage from "@/app/components/trip-card-image";
import { PRIMARY_RECOMMENDATION_TITLE } from "@/lib/find-my-trip/constants";
import { TRIP_CARD_IMAGE_SIZES } from "@/lib/trip-image-sizes";
import type { MatchReason } from "@/lib/find-my-trip/types";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export default function PrimaryRecommendationCard({
  trip,
  reasons,
}: {
  trip: Trip;
  reasons: MatchReason[];
}) {
  const region = getRegionForTrip(trip);
  const borderHover =
    region?.borderHover ??
    "hover:border-stone-300 dark:hover:border-stone-600";
  const accent = region?.accent ?? "from-stone-500/20 to-stone-600/10";

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 ${borderHover}`}
    >
      <Link href={`/trips/${trip.slug}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-200 sm:aspect-[21/9]">
          <TripCardImage trip={trip} sizes={TRIP_CARD_IMAGE_SIZES} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <span className="absolute right-4 top-4 rounded-full border border-amber-200/40 bg-amber-500/90 px-4 py-1.5 text-xs font-bold text-white shadow-sm sm:text-sm">
            {PRIMARY_RECOMMENDATION_TITLE}
          </span>
          <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {trip.category}
          </span>
        </div>

        <div className="relative p-6 sm:p-8">
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent}`}
          />

          <div className="relative">
            <h3 className="mb-2 text-2xl font-bold text-stone-900 dark:text-stone-50 sm:text-3xl">
              {trip.title}
            </h3>
            <p className="mb-6 text-base leading-relaxed text-stone-500 dark:text-stone-400 sm:text-lg">
              {trip.subtitle}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition-colors group-hover:text-stone-900 dark:text-stone-300 dark:group-hover:text-white sm:text-base">
              לכתבה המלאה
              <ArrowIcon />
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
