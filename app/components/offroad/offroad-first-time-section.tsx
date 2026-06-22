import { OFFROAD_FIRST_TIME_CARDS } from "@/lib/offroad/content";
import {
  OffroadIcon,
  OffroadSectionHeader,
  offroadGlassCard,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

export default function OffroadFirstTimeSection() {
  return (
    <section
      id="first-time"
      className={`${offroadSectionShell} scroll-mt-24 border-b border-stone-200/60 bg-stone-50/70 dark:border-stone-800 dark:bg-stone-950/40`}
    >
      <div className={offroadSectionInner}>
        <OffroadSectionHeader
          id="first-time-heading"
          title="פעם ראשונה בשטח?"
          description="שלושה דברים שיעזרו לכם לצאת בביטחון — בלי להעמיס מידע."
        />

        <ul className="grid gap-5 md:grid-cols-3">
          {OFFROAD_FIRST_TIME_CARDS.map((card, index) => (
            <li
              key={card.id}
              className={`${offroadGlassCard} group relative overflow-hidden p-6 transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-7`}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-amber-400/80 via-stone-400/40 to-emerald-400/70"
                aria-hidden="true"
              />
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  <OffroadIcon id={card.icon} className="size-7" />
                </span>
                <span className="text-sm font-semibold text-stone-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-stone-900 dark:text-stone-50">
                {card.title}
              </h3>
              <ul className="space-y-3">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-stone-700 dark:text-stone-300 sm:text-base"
                  >
                    <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
