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

/** A - Campfire Journey: horizontal flow with warm orange rhythm */
export default function OffroadCookingVariantA({
  id = "cooking-tips-a",
  showLabel = false,
  label = "Approach A - Campfire Journey",
}: CookingVariantProps) {
  return (
    <section id={id} className={`${cookingSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        {showLabel ? <CookingPreviewLabel label={label} /> : null}
        <CookingSectionHeading />

        <div className="mx-auto max-w-4xl">
          <div
            className="pointer-events-none mb-3 hidden h-px bg-gradient-to-l from-transparent via-amber-300/70 to-transparent sm:block dark:via-amber-600/40"
            aria-hidden="true"
          />

          <ol className="-mx-1 flex snap-x snap-mandatory gap-1 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:items-start sm:justify-center sm:gap-x-0 sm:gap-y-4 sm:overflow-visible sm:px-0">
            {OFFROAD_COOKING_TIPS.map((tip, index) => (
              <li
                key={tip.id}
                className="flex shrink-0 snap-start items-start sm:shrink"
              >
                <div className="group w-[7.25rem] text-center sm:w-[7.75rem]">
                  <span className="mx-auto mb-2 flex size-9 items-center justify-center rounded-full border border-amber-200/80 bg-amber-50/90 text-amber-700 transition-all duration-300 group-hover:border-amber-400/80 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-[0_8px_20px_-10px_rgba(234,88,12,0.45)] dark:border-amber-800/50 dark:bg-amber-950/35 dark:text-amber-300 dark:group-hover:bg-amber-600">
                    <CookingTipIcon tip={tip} className="size-4" />
                  </span>

                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-amber-700/75 dark:text-amber-400/80">
                    {tip.category}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-stone-600 transition-colors duration-300 group-hover:text-stone-800 dark:text-stone-300 dark:group-hover:text-stone-100">
                    {tip.text}
                  </p>
                </div>

                {index < OFFROAD_COOKING_TIPS.length - 1 ? (
                  <span
                    className="mx-1 mt-4 hidden shrink-0 text-sm text-amber-300/90 sm:inline dark:text-amber-700/70"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
