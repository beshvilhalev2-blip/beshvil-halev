"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import TripCard from "@/app/components/trip-card";
import { getPublicTripBySlug, type Trip } from "@/data/trips";
import {
  buildWantToTravelWhatsAppUrl,
  clearAllWantToTravelTrips,
  removeTripFromWantToTravel,
  useSavedTripSlugs,
} from "@/lib/want-to-travel";

function SavedTripListItem({
  trip,
  onRemove,
}: {
  trip: Trip;
  onRemove: (slug: string) => void;
}) {
  return (
    <article className="space-y-2">
      <div className="flex items-center justify-end px-1">
        <button
          type="button"
          onClick={() => onRemove(trip.slug)}
          className="inline-flex min-h-9 items-center rounded-lg px-3 py-2 text-xs font-semibold text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
        >
          הסר
        </button>
      </div>

      <TripCard trip={trip} />
    </article>
  );
}

export default function WantToTravelView() {
  const savedSlugs = useSavedTripSlugs();

  const savedTrips = useMemo(() => {
    return savedSlugs
      .map((slug) => getPublicTripBySlug(slug))
      .filter((trip): trip is Trip => trip !== undefined);
  }, [savedSlugs]);

  const handleRemove = useCallback((slug: string) => {
    removeTripFromWantToTravel(slug);
  }, []);

  const handleClearAll = useCallback(() => {
    const confirmed = window.confirm("לנקות את כל רשימת הטיולים השמורים?");
    if (!confirmed) {
      return;
    }
    clearAllWantToTravelTrips();
  }, []);

  const handleShareWhatsApp = useCallback(() => {
    if (savedTrips.length === 0) {
      return;
    }
    window.open(buildWantToTravelWhatsAppUrl(savedTrips), "_blank", "noopener,noreferrer");
  }, [savedTrips]);

  const isEmpty = savedTrips.length === 0;

  return (
    <section className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-3 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
            הרשימה שלך
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            בא לי לטייל
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
            המקומות ששמרתם לרגע שבו תרצו פשוט לצאת לדרך
          </p>
          {!isEmpty ? (
            <p
              className="mt-4 text-sm font-semibold text-stone-700 dark:text-stone-300 sm:text-base"
              aria-live="polite"
            >
              נשמרו {savedTrips.length} טיולים
            </p>
          ) : null}
        </header>

        {!isEmpty ? (
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#25D366]/35 bg-[#25D366]/10 px-5 py-2.5 text-sm font-semibold text-[#1f9d50] transition-colors hover:bg-[#25D366]/16"
            >
              שתפו את הרשימה בוואטסאפ
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-stone-300/80 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              נקה רשימה
            </button>
          </div>
        ) : null}

        {isEmpty ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center dark:border-stone-700 dark:bg-stone-900">
            <h2 className="mb-2 text-lg font-bold text-stone-900 dark:text-stone-50">
              עוד לא שמרתם טיולים
            </h2>
            <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              שמרו מקומות שאהבתם וחזרו אליהם כשתרצו לצאת לטבע.
            </p>
            <Link
              href="/recommendations"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              לכל ההמלצות
            </Link>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedTrips.map((trip) => (
              <li key={trip.slug}>
                <SavedTripListItem trip={trip} onRemove={handleRemove} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
