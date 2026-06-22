import { OFFROAD_ROUTES_INTRO } from "@/lib/offroad/content";
import { offroadCard, offroadCardHover } from "./offroad-shared";

export default function OffroadRoutesIntro() {
  return (
    <aside
      className={`${offroadCard} ${offroadCardHover} border-emerald-200/40 bg-gradient-to-br from-emerald-50/75 via-white/72 to-white/65 px-5 py-4 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:via-stone-900/60 dark:to-stone-900/55 sm:px-6 sm:py-5`}
      aria-label="מידע על המסלולים בעמוד"
    >
      <p className="text-center text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-[15px]">
        {OFFROAD_ROUTES_INTRO}
      </p>
    </aside>
  );
}
