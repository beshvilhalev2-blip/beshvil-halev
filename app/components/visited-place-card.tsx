import type { VisitedPlace } from "@/data/places";
import VisitedStamp from "@/app/components/visited-stamp";

export default function VisitedPlaceCard({ place }: { place: VisitedPlace }) {
  return (
    <article className="relative flex min-h-[5.5rem] items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-4 py-3.5 pe-16 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:px-5 sm:py-4 sm:pe-20">
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-base font-semibold leading-snug text-stone-900 dark:text-stone-50 sm:text-lg">
          {place.title}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {place.region}
          <span className="mx-1.5 text-stone-300 dark:text-stone-600">·</span>
          <span className="text-emerald-700 dark:text-emerald-400">ביקרנו</span>
        </p>
      </div>

      {place.visitedByMilana ? (
        <VisitedStamp className="pointer-events-none absolute -top-2 end-3 sm:end-4" />
      ) : null}
    </article>
  );
}
