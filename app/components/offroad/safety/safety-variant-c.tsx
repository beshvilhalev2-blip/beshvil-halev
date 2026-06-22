import {
  OFFROAD_SAFETY_RULES,
  SafetyPreviewLabel,
  SafetyRuleCopy,
  SafetySectionHeading,
  SafetyTileIcon,
  SafetyTopographicBackdrop,
  offroadSectionInner,
  type SafetyVariantProps,
} from "./safety-section-shared";

/** C — Contour Accent: minimal frame, left accent bar, refined typography */
export default function OffroadSafetyVariantC({
  id = "safety-rules-c",
  showLabel = false,
  label = "Approach C — Contour Accent",
}: SafetyVariantProps) {
  return (
    <section
      id={id}
      className="relative scroll-mt-24 overflow-hidden border-b border-stone-200/50 bg-white px-4 py-8 dark:border-stone-800/80 dark:bg-stone-950 sm:px-6 sm:py-9"
    >
      <SafetyTopographicBackdrop className="opacity-60" />

      <div className={`${offroadSectionInner} relative`}>
        {showLabel ? <SafetyPreviewLabel label={label} /> : null}
        <SafetySectionHeading subtitle="לפני שיוצאים להרפתקה" />

        <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
          {OFFROAD_SAFETY_RULES.map((rule, index) => (
            <li key={rule.id}>
              <div className="group relative flex min-h-[5.25rem] overflow-hidden rounded-xl border border-stone-200/45 bg-stone-50/50 p-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-stone-300/70 hover:bg-white hover:shadow-[0_8px_24px_-18px_rgba(28,25,23,0.2)] dark:border-stone-800 dark:bg-stone-900/30 dark:hover:border-stone-600 dark:hover:bg-stone-900/70 sm:min-h-[5.5rem] sm:p-3.5">
                <span
                  className="absolute inset-y-2 right-0 w-0.5 rounded-full bg-stone-200 transition-all duration-300 group-hover:inset-y-1.5 group-hover:w-1 group-hover:bg-gradient-to-b group-hover:from-amber-400 group-hover:to-stone-400 dark:bg-stone-700"
                  aria-hidden="true"
                />

                <div className="flex min-w-0 flex-1 flex-col pe-2">
                  <div className="flex items-center justify-between gap-2">
                    <SafetyTileIcon
                      rule={rule}
                      iconClassName="size-4 text-stone-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-stone-700 dark:text-stone-500 dark:group-hover:text-stone-200"
                    />
                    <span className="rounded-full bg-stone-200/60 px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-stone-500 transition-colors duration-300 group-hover:bg-amber-100 group-hover:text-amber-800 dark:bg-stone-800 dark:text-stone-400 dark:group-hover:bg-amber-950/60 dark:group-hover:text-amber-300">
                      {index + 1}
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <SafetyRuleCopy rule={rule} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
