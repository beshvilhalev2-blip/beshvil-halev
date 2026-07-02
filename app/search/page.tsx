import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import TripCard from "@/app/components/trip-card";
import { getSiteVisibleTrips } from "@/data/trips";
import { searchTrips } from "@/lib/search-trips";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "חיפוש מסלולים | בשביל הלב",
  description: "חפשו מסלולים, אזורים וחוויות טבע בכל רחבי הארץ",
};

import SearchPageForm from "@/app/components/search-page-form";

function getSearchQuery(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) {
    return raw[0]?.trim() ?? "";
  }

  return raw?.trim() ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getSearchQuery(params.q);
  const results = searchTrips(query, getSiteVisibleTrips());

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="bg-stone-50 px-6 pb-16 pt-32 dark:bg-stone-950 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-4 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
              חיפוש
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
              חיפוש מסלולים
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-stone-600 dark:text-stone-400">
              מצאו מסלולים, אזורים וחוויות לפי שם, תיאור או אזור
            </p>

            <SearchPageForm initialQuery={query} />
          </div>

          {query ? (
            <p className="mb-8 text-center text-base text-stone-600 dark:text-stone-400">
              {results.length > 0
                ? `נמצאו ${results.length} תוצאות`
                : "לא נמצאו תוצאות לחיפוש"}
            </p>
          ) : (
            <p className="mb-8 text-center text-base text-stone-500 dark:text-stone-400">
              הקלידו מילת חיפוש כדי להתחיל
            </p>
          )}

          {results.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((trip) => (
                <TripCard key={trip.slug} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
