"use client";

import {
  CookingPreviewLabel,
  CookingSectionHeading,
  CookingTipIcon,
  cookingSectionShell,
  OFFROAD_COOKING_TIPS,
  offroadSectionInner,
  type CookingVariantProps,
} from "./cooking-section-shared";

/** B - Ember Tiles: compact icon-first grid */
export default function OffroadCookingVariantB({
  id = "cooking-tips-b",
  showLabel = false,
  label = "Approach B - Ember Tiles",
}: CookingVariantProps) {
  return (
    <section id={id} className={`${cookingSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        {showLabel ? <CookingPreviewLabel label={label} /> : null}
        <CookingSectionHeading />

        <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
          {OFFROAD_COOKING_TIPS.map((tip) => (
            <li key={tip.id}>
              <article className="group flex h-full flex-col items-center rounded-2xl border border-amber-200/45 bg-gradient-to-b from-amber-50/50 to-white/60 px-3 py-3.5 text-center transition-all duration-300 hover:border-amber-300/70 hover:from-amber-50/80 hover:to-white hover:shadow-[0_10px_28px_-18px_rgba(234,88,12,0.25)] dark:border-amber-900/35 dark:from-amber-950/20 dark:to-stone-900/40 dark:hover:border-amber-800/50">
                <span className="mb-2.5 flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/90 to-orange-500/85 text-white shadow-[0_6px_16px_-8px_rgba(234,88,12,0.5)] transition-transform duration-300 group-hover:scale-105">
                  <CookingTipIcon tip={tip} className="size-5" />
                </span>

                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-amber-700/80 dark:text-amber-400/85">
                  {tip.category}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-stone-600 dark:text-stone-300 sm:text-[13px]">
                  {tip.text}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
