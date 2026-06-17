import Link from "next/link";
import type { Trip } from "@/data/trips";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import { getRegionForTrip } from "@/app/components/trip-card";
import VisitedStamp from "@/app/components/visited-stamp";
import TripPhotoGallery from "@/app/components/trip-photo-gallery";
import { getTripHeroLayerStyle } from "@/lib/trip-media";

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

export default function TripComingSoon({ trip }: { trip: Trip }) {
  const region = getRegionForTrip(trip);
  const regionHref = region ? `/regions/${region.slug}` : "/";

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="relative flex min-h-[45vh] items-end overflow-hidden pt-20 sm:min-h-[50vh] sm:pt-24">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={getTripHeroLayerStyle(trip)}
          role="img"
          aria-label={trip.heroImageLabel}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/35 to-stone-900/10" />

        {trip.visitedByMilana ? (
          <VisitedStamp
            className="absolute right-4 top-24 z-20 sm:right-6 sm:top-28"
            size="hero"
          />
        ) : null}

        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            {trip.region}
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            {trip.title}
          </h1>
        </div>
      </section>

      <TripPhotoGallery trip={trip} />

      <section className="bg-stone-50 px-4 py-12 dark:bg-stone-950 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-300 sm:text-xl">
            מילאנה והילדים טיילו כאן. כתבה מלאה, תמונות וטיפים יעלו בהמשך.
          </p>

          <div className="mt-10">
            <Link
              href={regionHref}
              className="group inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              חזרה לאזור {trip.region}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
