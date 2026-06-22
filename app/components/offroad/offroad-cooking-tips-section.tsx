import { OFFROAD_COOKING_TIPS } from "@/lib/offroad/content";
import {
  OffroadIcon,
  OffroadSectionHeader,
  offroadCard,
  offroadCardHover,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

const COOKING_TIP_LABELS = [
  "תכנון",
  "ציוד",
  "מים",
  "בטיחות",
  "ניקיון",
  "הכנה",
];

export default function OffroadCookingTipsSection() {
  return (
    <section id="cooking-tips" className={`${offroadSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        <OffroadSectionHeader
          title="טיפים לבישול בשטח"
          subtitle="רגעים טובים ליד האש — פשוט, נקי ומוכן מראש"
        />

        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-4">
          {OFFROAD_COOKING_TIPS.map((tip, index) => (
            <li key={tip.id}>
              <article
                className={`${offroadCard} ${offroadCardHover} relative overflow-hidden p-4 sm:p-5`}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-amber-200/25 via-orange-100/10 to-transparent dark:from-amber-900/20 dark:via-orange-950/10"
                  aria-hidden="true"
                />

                <div className="relative flex items-start gap-3.5">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/90 to-orange-600/85 text-white shadow-[0_8px_20px_-10px_rgba(234,88,12,0.55)]"
                    aria-hidden="true"
                  >
                    <OffroadIcon id="coffee" className="size-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-800/70 dark:text-amber-300/80">
                      {COOKING_TIP_LABELS[index] ?? "טיפ"} ·{" "}
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-stone-800 dark:text-stone-100 sm:text-[15px]">
                      {tip.text}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
