"use client";

import { useRef } from "react";
import type { Trip } from "@/data/trips";
import MatchedTripCard from "@/app/find-my-trip/components/matched-trip-card";
import PrimaryRecommendationCard from "@/app/find-my-trip/components/primary-recommendation-card";
import { RESULTS_SLOT_IDS } from "@/lib/find-my-trip/constants";
import type { MatchResult } from "@/lib/find-my-trip/types";

export default function FindMyTripResults({
  result,
  resolveTrip,
  onRestart,
}: {
  result: MatchResult;
  resolveTrip: (slug: string) => Trip | undefined;
  onRestart: () => void;
}) {
  const resultsRef = useRef<HTMLElement>(null);

  const primaryTrip = result.primary
    ? resolveTrip(result.primary.trip.slug)
    : undefined;

  const additionalMatches = result.additional
    .map((match) => {
      const trip = resolveTrip(match.trip.slug);
      if (!trip) {
        return null;
      }

      return { trip, reasons: match.reasons, slug: match.trip.slug };
    })
    .filter(Boolean) as {
    trip: Trip;
    reasons: MatchResult["additional"][number]["reasons"];
    slug: string;
  }[];

  return (
    <section
      ref={resultsRef}
      aria-live="polite"
      className="mx-auto w-full max-w-6xl scroll-mt-28"
    >
      <div className="mb-8 text-center">
        <p className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
          התוצאות שלכם
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          {result.totalCount > 0
            ? `מצאנו לכם ${result.totalCount} טיולים שמתאימים`
            : "לא מצאנו התאמה מדויקת הפעם"}
        </h2>

        {result.summaryChips.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {result.summaryChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {result.usedFallback ? (
        <div
          role="note"
          className="mb-8 rounded-2xl border border-amber-200/80 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
        >
          לא מצאנו התאמה מושלמת - הנה הצעות קרובות למה שחיפשתם.
        </div>
      ) : null}

      {primaryTrip && result.primary ? (
        <div className="mb-12">
          <PrimaryRecommendationCard
            trip={primaryTrip}
            reasons={result.primary.reasons}
          />
        </div>
      ) : null}

      {additionalMatches.length > 0 ? (
        <div className="mb-12">
          <h3 className="mb-6 text-2xl font-bold text-stone-900 dark:text-stone-50 sm:text-3xl">
            עוד טיולים שמתאימים
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {additionalMatches.map(({ trip, reasons, slug }) => (
              <MatchedTripCard key={slug} trip={trip} reasons={reasons} />
            ))}
          </div>
        </div>
      ) : null}

      <section
        id={RESULTS_SLOT_IDS.gear}
        data-slot="gear-recommendations"
        aria-hidden="true"
        className="hidden"
      />
      <section
        id={RESULTS_SLOT_IDS.checklist}
        data-slot="travel-checklist"
        aria-hidden="true"
        className="hidden"
      />
      <section
        id={RESULTS_SLOT_IDS.affiliate}
        data-slot="affiliate-bundles"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
        >
          התחילו מחדש
        </button>
      </div>
    </section>
  );
}

export function scrollToResults(element: HTMLElement | null) {
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}
