import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import GearHubCard from "@/app/components/gear-hub-card";
import {
  GEAR_HUB_OPTIONS,
  GEAR_LANDING_PAGE,
} from "@/lib/gear-checklist/constants";

export const metadata: Metadata = {
  title: "רשימת ציוד | בשביל הלב",
  description:
    "בדקו מה חסר לכם לפני שיוצאים לדרך — רשימת ציוד חכמה לפי סוג הטיול",
};

function BackpackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8"
      aria-hidden="true"
    >
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      <path d="M6 7h12l1 14H5L6 7Z" />
      <path d="M9 11h6" />
    </svg>
  );
}

export default function GearPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="bg-stone-50 px-6 pb-16 pt-32 dark:bg-stone-950 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
              <BackpackIcon />
            </div>

            <p className="mb-4 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
              {GEAR_LANDING_PAGE.eyebrow}
            </p>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
              {GEAR_LANDING_PAGE.title}
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              {GEAR_LANDING_PAGE.subtitle}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GEAR_HUB_OPTIONS.map((option) => (
              <GearHubCard
                key={option.id}
                title={option.title}
                description={option.description}
                icon={option.icon}
                iconBg={option.iconBg}
                accent={option.accent}
                borderHover={option.borderHover}
                status={option.status}
                cta={option.cta}
                href={option.href}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
