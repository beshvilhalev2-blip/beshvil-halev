import type { VisitedPlace } from "@/data/places";
import VisitedStamp from "@/app/components/visited-stamp";

export default function VisitedPlaceCard({ place }: { place: VisitedPlace }) {
  return (
    <article className="relative flex min-h-[6rem] items-center gap-3 overflow-visible rounded-2xl border border-stone-200/80 bg-white px-4 py-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:gap-4 sm:px-5 sm:py-4">
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-base font-semibold leading-snug text-stone-900 dark:text-stone-50 sm:text-lg">
          {place.title}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {place.region}
          <span className="mx-1.5 text-stone-300 dark:text-stone-600">·</span>
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            ביקרנו
          </span>
        </p>
      </div>

      {place.visitedByMilana ? (
        <VisitedStamp className="shrink-0" />
      ) : null}
    </article>
  );
}
