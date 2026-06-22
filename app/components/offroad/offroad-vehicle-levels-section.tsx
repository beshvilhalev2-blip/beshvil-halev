import { OFFROAD_VEHICLE_LEVELS } from "@/lib/offroad/content";
import {
  OffroadSectionHeader,
  offroadGlassCard,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

const toneStyles = {
  stone: {
    stripe: "from-stone-300 to-stone-500",
    badge: "bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200",
    dot: "bg-stone-400",
  },
  green: {
    stripe: "from-emerald-300 to-emerald-600",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
    dot: "bg-emerald-500",
  },
  amber: {
    stripe: "from-amber-300 to-amber-600",
    badge: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
    dot: "bg-amber-500",
  },
  rose: {
    stripe: "from-rose-300 to-rose-600",
    badge: "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200",
    dot: "bg-rose-500",
  },
} as const;

export default function OffroadVehicleLevelsSection() {
  return (
    <section
      id="vehicle-levels"
      className={`${offroadSectionShell} scroll-mt-24 border-b border-stone-200/60 bg-stone-50/70 dark:border-stone-800 dark:bg-stone-950/40`}
    >
      <div className={offroadSectionInner}>
        <OffroadSectionHeader title="הרכב שלכם מתאים?" />

        <div className="mb-6 hidden overflow-hidden rounded-2xl border border-stone-200/70 bg-white/70 p-1 dark:border-stone-700 dark:bg-stone-900/70 sm:block">
          <div className="grid grid-cols-4 gap-1">
            {OFFROAD_VEHICLE_LEVELS.map((level, index) => {
              const tone = toneStyles[level.tone];
              return (
                <div
                  key={level.id}
                  className="relative flex flex-col items-center px-2 py-3 text-center"
                >
                  {index > 0 ? (
                    <span
                      className={`absolute right-full top-1/2 hidden h-0.5 w-2 -translate-y-1/2 bg-gradient-to-l ${tone.stripe} sm:block`}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={`mb-2 size-2.5 rounded-full ${tone.dot}`}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-100 sm:text-sm">
                    {level.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {OFFROAD_VEHICLE_LEVELS.map((level) => {
            const tone = toneStyles[level.tone];
            return (
              <li
                key={level.id}
                className={`${offroadGlassCard} relative flex h-full flex-col overflow-hidden p-5 sm:p-6`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${tone.stripe}`}
                  aria-hidden="true"
                />
                <span
                  className={`mb-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-bold ${tone.badge}`}
                >
                  {level.title}
                </span>
                <p className="mb-3 flex-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {level.explanation}
                </p>
                <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  {level.examples}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
