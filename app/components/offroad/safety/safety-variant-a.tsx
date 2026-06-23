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

/** A - Glass Glow: frosted tiles, amber hover glow, topographic backdrop */
export default function OffroadSafetyVariantA({
  id = "safety-rules-a",
  showLabel = false,
  label = "Approach A - Glass Glow",
}: SafetyVariantProps) {
  return (
    <section
      id={id}
      className="relative scroll-mt-24 overflow-hidden border-b border-stone-200/50 bg-gradient-to-b from-stone-100/80 via-white to-stone-50/90 px-4 py-8 dark:border-stone-800/80 dark:from-stone-900/60 dark:via-stone-950 dark:to-stone-950/90 sm:px-6 sm:py-9"
    >
      <SafetyTopographicBackdrop />

      <div className={`${offroadSectionInner} relative`}>
        {showLabel ? <SafetyPreviewLabel label={label} /> : null}
        <SafetySectionHeading subtitle="לפני שיוצאים להרפתקה" />

        <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
          {OFFROAD_SAFETY_RULES.map((rule, index) => (
            <li key={rule.id}>
              <div
                className="group relative flex min-h-[5.25rem] flex-col justify-between rounded-2xl border border-white/60 bg-white/55 p-3 shadow-[0_1px_2px_rgba(28,25,23,0.04)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-200/70 hover:bg-white/90 hover:shadow-[0_10px_28px_-14px_rgba(180,83,9,0.18),0_4px_12px_-6px_rgba(28,25,23,0.08)] dark:border-stone-700/50 dark:bg-stone-900/45 dark:hover:border-amber-800/50 dark:hover:bg-stone-900/75 sm:min-h-[5.5rem] sm:p-3.5"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-100/0 via-transparent to-stone-100/0 opacity-0 transition-opacity duration-300 group-hover:from-amber-100/30 group-hover:to-stone-50/20 group-hover:opacity-100 dark:group-hover:from-amber-950/20 dark:group-hover:to-stone-900/10"
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-2">
                  <SafetyTileIcon
                    rule={rule}
                    iconClassName="size-[1.125rem] text-stone-500 transition-all duration-300 group-hover:scale-110 group-hover:text-amber-700 dark:text-stone-400 dark:group-hover:text-amber-400 sm:size-5"
                  />
                  <span className="text-[10px] font-semibold tabular-nums text-stone-300 transition-colors duration-300 group-hover:text-amber-600/80 dark:text-stone-600 dark:group-hover:text-amber-500/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-2">
                  <SafetyRuleCopy rule={rule} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
