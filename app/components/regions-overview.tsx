import Link from "next/link";
import RegionTripMiniCard from "@/app/components/region-trip-mini-card";
import { getRegionBySlug, getTripsByRegionSlug } from "@/data/trips";
import type { FilterableRegionSlug } from "@/lib/israel-discovery-map";

const MAX_TRIPS_PER_REGION = 6;

const REGION_SECTIONS: { slug: FilterableRegionSlug; title: string }[] = [
  { slug: "north", title: "צפון" },
  { slug: "hasharon", title: "השרון" },
  { slug: "center", title: "מרכז" },
  { slug: "jerusalem", title: "ירושלים והסביבה" },
  { slug: "south", title: "דרום" },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export default function RegionsOverview() {
  const sections = REGION_SECTIONS.map(({ slug, title }) => {
    const region = getRegionBySlug(slug)!;
    const allTrips = getTripsByRegionSlug(slug);
    return {
      region,
      title,
      trips: allTrips.slice(0, MAX_TRIPS_PER_REGION),
    };
  });

  return (
    <>
      <header className="relative overflow-hidden rounded-[1.75rem] border border-stone-200/60 bg-[#FAF8F5] px-5 py-9 text-center sm:rounded-[2rem] sm:px-8 sm:py-11">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(220,238,248,0.4),transparent_68%)]"
          aria-hidden="true"
        />

        <div className="relative">
          <p className="mb-3 inline-block rounded-full border border-stone-200/80 bg-white/80 px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-300">
            גלו את הארץ
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            אזורים בארץ
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
            בחרו אזור בארץ וגלו את הטיולים, המעיינות, התצפיות והמסלולים המומלצים.
          </p>
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-7 sm:mt-10 sm:gap-8">
        {sections.map(({ region, title, trips }, index) => (
          <section
            key={region.slug}
            id={region.slug}
            aria-labelledby={`regions-heading-${region.slug}`}
            className={[
              "scroll-mt-28 rounded-[1.25rem] border px-4 py-6 sm:px-5 sm:py-7",
              index % 2 === 0
                ? "border-stone-200/50 bg-white/85 dark:border-stone-800 dark:bg-stone-900/60"
                : "border-stone-200/40 bg-[#FAF8F5]/80 dark:border-stone-800/70 dark:bg-stone-900/40",
            ].join(" ")}
          >
            <div className="mb-4 text-right sm:mb-5">
              <h2
                id={`regions-heading-${region.slug}`}
                className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-2xl"
              >
                {title}
              </h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {region.description}
              </p>
            </div>

            {trips.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3.5 lg:grid-cols-6 lg:gap-3">
                {trips.map((trip) => (
                  <li key={trip.slug} className="min-w-0">
                    <RegionTripMiniCard trip={trip} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl border border-dashed border-stone-300/70 bg-white/60 px-4 py-6 text-center text-sm text-stone-500 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-400">
                בקרוב יתווספו מסלולים חדשים ב{title}.
              </p>
            )}

            <div className="mt-5 flex justify-center sm:mt-6">
              <Link
                href={`/regions/${region.slug}`}
                className="group inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-stone-300/90 bg-white px-5 py-2 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
              >
                לכל הטיולים באזור
                <ArrowIcon />
              </Link>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
