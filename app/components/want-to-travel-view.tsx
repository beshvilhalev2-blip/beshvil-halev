"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getPublicTripBySlug, type Trip } from "@/data/trips";
import {
  getSavedWantToTravelTrips,
  getWantToTravelDisplayTags,
  removeTripFromWantToTravel,
} from "@/lib/want-to-travel";

function SavedTripCard({
  trip,
  onRemove,
}: {
  trip: Trip;
  onRemove: (slug: string) => void;
}) {
  const tags = getWantToTravelDisplayTags(trip);
  const gearHref = `/trips/${trip.slug}#trip-gear-checklist`;

  return (
    <article className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-medium text-stone-500 dark:text-stone-400">
            {trip.region}
          </p>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50 sm:text-xl">
            {trip.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onRemove(trip.slug)}
          className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700 min-h-11 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
        >
          הסירי מהרשימה
        </button>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
        {trip.subtitle}
      </p>

      {tags.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/trips/${trip.slug}`}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          פתחי טיול
        </Link>
        <Link
          href={gearHref}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
        >
          רשימת ציוד
        </Link>
      </div>
    </article>
  );
}

export default function WantToTravelView() {
  const [hydrated, setHydrated] = useState(false);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSavedSlugs(getSavedWantToTravelTrips());
    setHydrated(true);
  }, []);

  const savedTrips = useMemo(() => {
    return savedSlugs
      .map((slug) => getPublicTripBySlug(slug))
      .filter((trip): trip is Trip => trip !== undefined);
  }, [savedSlugs]);

  const handleRemove = useCallback((slug: string) => {
    removeTripFromWantToTravel(slug);
    setSavedSlugs(getSavedWantToTravelTrips());
  }, []);

  const isEmpty = hydrated && savedTrips.length === 0;

  return (
    <section className="bg-stone-50 px-4 pb-16 pt-28 dark:bg-stone-950 sm:px-6 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-3 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
            הרשימה שלך
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            בא לי לטייל
          </h1>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
            המקומות ששמרת לרגע שבו תרצי פשוט לצאת לדרך
          </p>
        </header>

        {!hydrated && (
          <p className="text-center text-sm text-stone-500 dark:text-stone-400">
            טוענים את הרשימה...
          </p>
        )}

        {isEmpty && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center dark:border-stone-700 dark:bg-stone-900">
            <p className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-50">
              עדיין לא שמרת טיולים
            </p>
            <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              כשמשהו יעשה לך חשק לצאת — לחצי על בא לי לטייל פה והוא יופיע כאן.
            </p>
            <Link
              href="/recommendations"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              גלה טיולים
            </Link>
          </div>
        )}

        {hydrated && savedTrips.length > 0 && (
          <ul className="space-y-4">
            {savedTrips.map((trip) => (
              <li key={trip.slug}>
                <SavedTripCard trip={trip} onRemove={handleRemove} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
