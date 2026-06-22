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
        <OffroadSectionHeader
          title="ציוד שמומלץ שיהיה ברכב"
          description="לא חייבים הכל — אבל כמה דברים בסיסיים נותנים שקט נפשי."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFROAD_GEAR_ITEMS.map((item) => {
            const content = (
              <>
                <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  <OffroadIcon id={item.icon} className="size-6" />
                </span>
                <span className="text-lg font-bold text-stone-900 dark:text-stone-50">
                  {item.label}
                </span>
                <span className="mt-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                  {item.affiliateHref ? "לרכישה" : "מומלץ לשמור ברכב"}
                </span>
              </>
            );

            return (
              <li key={item.id}>
                {item.affiliateHref ? (
                  <a
                    href={item.affiliateHref}
                    className={`${offroadGlassCard} flex h-full min-h-[9.5rem] flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-md`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    className={`${offroadGlassCard} flex h-full min-h-[9.5rem] flex-col p-5`}
                  >
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
