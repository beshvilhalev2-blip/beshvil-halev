import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import TripCard from "@/app/components/trip-card";
import { trips } from "@/data/trips";
import { searchTrips } from "@/lib/search-trips";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "חיפוש מסלולים | בשביל הלב",
  description: "חפשו מסלולים, אזורים וחוויות טבע בכל רחבי הארץ",
};

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0 text-stone-400"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function getSearchQuery(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) {
    return raw[0]?.trim() ?? "";
  }

  return raw?.trim() ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getSearchQuery(params.q);
  const results = searchTrips(query, trips);

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

            <form
              action="/search"
              method="get"
              className="mx-auto flex max-w-2xl items-center gap-3 rounded-2xl border border-stone-200 bg-white p-2 shadow-sm dark:border-stone-700 dark:bg-stone-900 sm:rounded-full sm:p-2.5"
            >
              <div className="flex flex-1 items-center gap-3 px-4">
                <SearchIcon />
                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder="חפשו מסלול, אזור או חוויה..."
                  className="w-full bg-transparent py-3 text-base text-stone-800 placeholder:text-stone-400 focus:outline-none dark:text-stone-100 sm:text-lg"
                  aria-label="חיפוש מסלולים"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 sm:rounded-full sm:px-8 sm:text-base"
              >
                חיפוש
              </button>
            </form>
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

      <footer className="border-t border-stone-200 bg-white px-6 py-10 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/"
            className="text-lg font-semibold text-stone-800 transition-colors hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300"
          >
            בשביל הלב
          </Link>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            © {new Date().getFullYear()} · כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </div>
  );
}
