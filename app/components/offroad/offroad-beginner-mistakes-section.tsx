import { OFFROAD_BEGINNER_MISTAKES } from "@/lib/offroad/content";
import {
  OffroadIcon,
  OffroadSectionHeader,
  offroadGlassCard,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

export default function OffroadBeginnerMistakesSection() {
  return (
    <section
      id="beginner-mistakes"
      className={`${offroadSectionShell} scroll-mt-24`}
    >
      <div className={offroadSectionInner}>
        <OffroadSectionHeader
          title="טעויות של מתחילים"
          description="כמה דברים קטנים שיכולים לחסוך לכם כאב ראש — ולהפוך את היציאה לכיפית יותר."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFROAD_BEGINNER_MISTAKES.map((mistake) => (
            <li
              key={mistake.id}
              className={`${offroadGlassCard} flex items-start gap-4 border-amber-200/70 bg-amber-50/70 p-5 dark:border-amber-900/40 dark:bg-amber-950/20`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                <OffroadIcon id="warning" className="size-5" />
              </span>
              <p className="pt-1 text-base font-semibold leading-snug text-amber-950 dark:text-amber-100">
                {mistake.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
