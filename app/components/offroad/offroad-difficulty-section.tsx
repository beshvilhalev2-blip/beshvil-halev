import { OFFROAD_DIFFICULTY_CARDS } from "@/lib/offroad/content";
import {
  OffroadSectionHeader,
  offroadGlassCard,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

const toneStyles = {
  green: {
    stripe: "from-emerald-400 to-emerald-600",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
    glow: "shadow-[0_12px_40px_rgba(16,185,129,0.12)]",
  },
  yellow: {
    stripe: "from-amber-300 to-amber-500",
    badge: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
    glow: "shadow-[0_12px_40px_rgba(245,158,11,0.12)]",
  },
  red: {
    stripe: "from-rose-400 to-rose-600",
    badge: "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200",
    glow: "shadow-[0_12px_40px_rgba(244,63,94,0.12)]",
  },
} as const;

export default function OffroadDifficultySection() {
  return (
    <section
      id="difficulty"
      className={`${offroadSectionShell} scroll-mt-24`}
    >
      <div className={offroadSectionInner}>
        <OffroadSectionHeader
          title="בחרו את רמת ההרפתקה שלכם"
          description="לא צריך להיות גיבורי שטח — רק לדעת מה מתאים לכם היום."
        />

        <ul className="grid gap-5 lg:grid-cols-3">
          {OFFROAD_DIFFICULTY_CARDS.map((card) => {
            const tone = toneStyles[card.tone];
            return (
              <li
                key={card.id}
                className={`${offroadGlassCard} ${tone.glow} relative overflow-hidden p-6 sm:p-7`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l ${tone.stripe}`}
                  aria-hidden="true"
                />
                <span
                  className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${tone.badge}`}
                >
                  {card.tone === "green"
                    ? "מתחילים"
                    : card.tone === "yellow"
                      ? "בינוני"
                      : "מתקדם"}
                </span>
                <h3 className="mb-4 text-2xl font-bold text-stone-900 dark:text-stone-50">
                  {card.title}
                </h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base"
                    >
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-current opacity-60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
