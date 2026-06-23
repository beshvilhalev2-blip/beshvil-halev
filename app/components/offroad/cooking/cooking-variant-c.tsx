import {
  CookingPreviewLabel,
  CookingSectionHeading,
  cookingSectionShell,
  OFFROAD_COOKING_TIPS,
  offroadSectionInner,
  type CookingVariantProps,
} from "./cooking-section-shared";

/** C - Field Guide: editorial list with accent rhythm */
export default function OffroadCookingVariantC({
  id = "cooking-tips-c",
  showLabel = false,
  label = "Approach C - Field Guide",
}: CookingVariantProps) {
  return (
    <section id={id} className={`${cookingSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        {showLabel ? <CookingPreviewLabel label={label} /> : null}
        <CookingSectionHeading />

        <ul className="mx-auto max-w-2xl divide-y divide-amber-100/80 overflow-hidden rounded-2xl border border-amber-200/40 bg-white/55 dark:divide-amber-900/30 dark:border-amber-900/35 dark:bg-stone-900/35">
          {OFFROAD_COOKING_TIPS.map((tip, index) => (
            <li key={tip.id}>
              <article className="group flex items-start gap-3 px-4 py-3 transition-colors duration-200 hover:bg-amber-50/70 dark:hover:bg-amber-950/20 sm:px-5 sm:py-3.5">
                <span
                  className="mt-0.5 w-6 shrink-0 text-[11px] font-medium tabular-nums text-amber-400/90 transition-colors duration-200 group-hover:text-amber-600 dark:text-amber-600/70 dark:group-hover:text-amber-400"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="mt-1.5 w-0.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-amber-300/80 to-orange-200/40 transition-all duration-300 group-hover:from-amber-500 group-hover:to-orange-400 dark:from-amber-700/60 dark:to-orange-900/30"
                  aria-hidden="true"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-amber-700/75 dark:text-amber-400/80">
                    {tip.category}
                  </p>
                  <p className="mt-0.5 text-sm leading-snug text-stone-700 dark:text-stone-200">
                    {tip.text}
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
