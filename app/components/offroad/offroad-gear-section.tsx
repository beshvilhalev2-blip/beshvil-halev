import { OFFROAD_GEAR_ITEMS } from "@/lib/offroad/content";
import {
  OffroadIcon,
  OffroadSectionHeader,
  offroadGlassCard,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

export default function OffroadGearSection() {
  return (
    <section
      id="recommended-gear"
      className={`${offroadSectionShell} scroll-mt-24 border-y border-stone-200/60 bg-stone-50/70 dark:border-stone-800 dark:bg-stone-950/40`}
    >
      <div className={offroadSectionInner}>
        <OffroadSectionHeader title="ציוד שמומלץ שיהיה ברכב" />

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {OFFROAD_GEAR_ITEMS.map((item) => {
            const cardClass = `${offroadGlassCard} flex flex-col items-center p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md`;

            const content = (
              <>
                <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  <OffroadIcon id={item.icon} className="size-5" />
                </span>
                <span className="text-sm font-bold text-stone-900 dark:text-stone-50">
                  {item.label}
                </span>
              </>
            );

            return (
              <li key={item.id}>
                {item.affiliateHref ? (
                  <a
                    href={item.affiliateHref}
                    className={cardClass}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                ) : (
                  <div className={cardClass}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
