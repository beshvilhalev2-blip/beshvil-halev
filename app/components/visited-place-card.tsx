import Link from "next/link";
import type { Trip } from "@/data/trips";
import type { VisitedPlace } from "@/data/places";
import VisitedStamp from "@/app/components/visited-stamp";

export default function VisitedPlaceCard({
  place,
  publishedTrip,
}: {
  place: VisitedPlace;
  publishedTrip?: Trip;
}) {
  return (
    <article className="flex h-full flex-col gap-4 overflow-visible rounded-2xl border border-emerald-200/80 bg-white p-4 shadow-sm dark:border-emerald-900/50 dark:bg-stone-900 sm:p-5">
      <div className="flex items-start gap-3">
        {place.visitedByMilana ? <VisitedStamp className="shrink-0" /> : null}

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="mb-2 text-base font-bold leading-snug text-stone-900 dark:text-stone-50 sm:text-lg">
            {place.title}
          </h3>
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            מילאנה והילדים טיילו כאן
          </p>
        </div>
      </div>

      {publishedTrip ? (
        <Link
          href={`/trips/${publishedTrip.slug}`}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          לכתבה המלאה
        </Link>
      ) : (
        <span
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-stone-500 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-400"
          aria-disabled="true"
        >
          בקרוב כתבה מלאה
        </span>
      )}
    </article>
  );
}
