import Link from "next/link";
import { getRegionBySlug, regions, type Region, type Trip } from "@/data/trips";
import VisitedStamp from "@/app/components/visited-stamp";
import TripCardImage from "@/app/components/trip-card-image";
import { TRIP_CARD_IMAGE_SIZES } from "@/lib/trip-image-sizes";

const HIDDEN_CATEGORY = "מקום שביקרנו";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function getRegionTheme(trip: Trip, region?: Region) {
  if (region) {
    return {
      borderHover: region.borderHover,
      accent: region.accent,
    };
  }

  const matched = regions.find((item) => item.title === trip.region);
  return {
    borderHover: matched?.borderHover ?? "hover:border-stone-300 dark:hover:border-stone-600",
    accent: matched?.accent ?? "from-stone-500/20 to-stone-600/10",
  };
}

export default function TripCard({
  trip,
  region,
}: {
  trip: Trip;
  region?: Region;
}) {
  const theme = getRegionTheme(trip, region);
  const isComingSoon = trip.status === "needs-content";
  const ctaLabel = isComingSoon ? "לעמוד המקום" : "לכתבה המלאה";
  const showCategory = trip.category !== HIDDEN_CATEGORY;

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 ${theme.borderHover}`}
    >
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
          <TripCardImage trip={trip} sizes={TRIP_CARD_IMAGE_SIZES} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {showCategory ? (
            <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {trip.category}
            </span>
          ) : null}
        </div>

        {trip.visitedByMilana ? <VisitedStamp placement="card" /> : null}
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${theme.accent}`}
        />

        <div className="relative flex flex-1 flex-col">
          <h3 className="mb-2 pe-[5.25rem] text-xl font-bold text-stone-900 dark:text-stone-50 sm:mb-2 sm:pe-16 sm:text-2xl">
            {trip.title}
          </h3>

          <p className="mb-6 flex-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400 sm:text-base">
            {trip.subtitle}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition-colors group-hover:text-stone-900 dark:text-stone-300 dark:group-hover:text-white">
            {ctaLabel}
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function getRegionForTrip(trip: Trip): Region | undefined {
  const slugByTitle: Record<string, string> = {
    צפון: "north",
    השרון: "hasharon",
    מרכז: "center",
    ירושלים: "jerusalem",
    דרום: "south",
  };
  const slug = slugByTitle[trip.region] ?? trip.region;
  return getRegionBySlug(slug);
}
