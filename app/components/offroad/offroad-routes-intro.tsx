import {
  OFFROAD_ROUTES_INTRO,
  OFFROAD_ROUTES_INTRO_DETAIL,
  OFFROAD_ROUTES_INTRO_HIGHLIGHT,
} from "@/lib/offroad/content";
import { OffroadIcon, offroadCard } from "./offroad-shared";

export default function OffroadRoutesIntro() {
  return (
    <aside
      className={`${offroadCard} border-emerald-300/55 bg-gradient-to-br from-white/92 via-emerald-50/45 to-white/88 px-4 py-3.5 shadow-[0_12px_40px_-24px_rgba(16,120,80,0.28)] ring-1 ring-emerald-500/10 dark:border-emerald-800/45 dark:from-stone-900/88 dark:via-emerald-950/25 dark:to-stone-900/82 dark:ring-emerald-400/10 sm:px-5 sm:py-4`}
      aria-label="מידע על המסלולים בעמוד"
    >
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 sm:gap-3.5">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200/70 bg-emerald-100/80 text-emerald-800 shadow-sm dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-300 sm:size-10"
          aria-hidden="true"
        >
          <OffroadIcon id="shield" className="size-[18px] sm:size-5" />
        </div>

        <div className="min-w-0 text-center">
          <p className="text-sm font-bold leading-snug text-stone-900 dark:text-stone-50 sm:text-[15px]">
            {OFFROAD_ROUTES_INTRO_HIGHLIGHT}
          </p>
          <p className="mt-0.5 text-xs font-semibold tracking-wide text-stone-600 dark:text-stone-300 sm:text-[13px]">
            {OFFROAD_ROUTES_INTRO_DETAIL}
          </p>
          <span className="sr-only">{OFFROAD_ROUTES_INTRO}</span>
        </div>
      </div>
    </aside>
  );
}
