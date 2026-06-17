import Link from "next/link";
import type { Region, Trip } from "@/data/trips";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import TripCard from "@/app/components/trip-card";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export default function RegionPage({
  region,
  trips,
}: {
  region: Region;
  trips: Trip[];
}) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: region.heroBackgroundImage }}
          role="img"
          aria-label={`תמונת רקע — ${region.title}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/30 to-stone-900/10" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            אזורי טיול
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
            {region.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
            {region.description}
          </p>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 dark:bg-stone-950 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
                מסלולים ב{region.title}
              </h2>
              <p className="text-stone-500 dark:text-stone-400">
                {trips.length > 0
                  ? `${trips.length} מקומות ומסלולים באזור`
                  : "בקרוב יתווספו מסלולים חדשים"}
              </p>
            </div>
          </div>

          {trips.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} region={region} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-8 py-16 text-center dark:border-stone-700 dark:bg-stone-900">
              <div
                className={`mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-2xl ${region.iconBg}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8" aria-hidden="true">
                  <path d="M12 2 4 20h16L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 14h8" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mb-2 text-lg font-semibold text-stone-800 dark:text-stone-100">
                עדיין אין מסלולים באזור זה
              </p>
              <p className="mb-8 text-stone-500 dark:text-stone-400">
                מסלולים חדשים יתווספו בקרוב — שווה לחזור!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                חזרה לדף הבית
                <ArrowIcon />
              </Link>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
