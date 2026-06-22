import { OFFROAD_BEGINNER_MISTAKES } from "@/lib/offroad/content";
import {
  OffroadIcon,
  OffroadSectionHeader,
  offroadCard,
  offroadCardHover,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

export default function OffroadBeginnerMistakesSection() {
  return (
    <section id="beginner-mistakes" className={`${offroadSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        <OffroadSectionHeader
          title="טעויות של מתחילים"
          subtitle="עשרה דברים שכדאי להימנע מהם לפני שיוצאים לשטח"
        />

        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-4">
          {OFFROAD_BEGINNER_MISTAKES.map((mistake, index) => (
            <li key={mistake.id}>
              <article
                className={`${offroadCard} ${offroadCardHover} relative flex gap-3.5 p-4 sm:p-4`}
              >
                <span
                  className="absolute inset-y-3 end-0 w-1 rounded-full bg-gradient-to-b from-amber-400/80 to-orange-500/50"
                  aria-hidden="true"
                />

                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 text-amber-800 shadow-sm dark:from-amber-950/60 dark:to-orange-950/40 dark:text-amber-200"
                  aria-hidden="true"
                >
                  <OffroadIcon id={mistake.icon} className="size-5" />
                </span>

                <div className="min-w-0 flex-1 pe-2">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-700/80 dark:text-amber-300/70">
                    הימנעו · {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm font-semibold leading-snug text-stone-800 dark:text-stone-100 sm:text-[15px]">
                    {mistake.text}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
