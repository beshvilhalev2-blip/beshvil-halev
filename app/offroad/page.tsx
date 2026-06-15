import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import { getTripsByCategory, type Trip } from "@/data/trips";

export const metadata: Metadata = {
  title: "שטח 4x4 | בשביל הלב",
  description:
    "מסלולי שטח קלים, המלצות וטיפים לנהיגת שטח למשפחות — כל מה שצריך לטיול שטח בטוח ומהנה",
};

const OFFROAD_CATEGORY = "שטח 4x4";

const offroadTheme = {
  iconBg: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
  accent: "from-zinc-500/20 to-amber-900/10",
  borderHover: "hover:border-zinc-300 dark:hover:border-zinc-600",
} as const;

const heroBackground = `
  linear-gradient(
    160deg,
    rgba(39, 39, 42, 0.85) 0%,
    rgba(120, 53, 15, 0.55) 45%,
    rgba(28, 25, 23, 0.75) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2371717a'/%3E%3Cstop offset='50%25' stop-color='%23a16207'/%3E%3Cstop offset='100%25' stop-color='%2327272a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3Cpath fill='%2352525b' opacity='0.35' d='M0 320 Q480 260 960 300 T1920 280 L1920 480 L0 480 Z'/%3E%3C/svg%3E")
`;

const easyTrails = [
  "מסלולי שטח קלים מתאימים למשפחות עם ילדים ולמי שרק מתחיל לגלות את עולם ה-4x4.",
  "המסלולים כוללים דרכי עפר יציבות, עליות מתונות ונקודות עצירה עם נוף מרהיב.",
  "[רשימת מסלולים — תתווסף בקרוב]",
] as const;

const recommendations = [
  "בדקו מראש את מצב הדרך ותחזית מזג האוויר — גשם כבד עלול להפוך מסלול קל למאתגר.",
  "הביאו ציוד בסיסי: רפטיה, מדחס, מים, חטיפים ומטען לטלפון.",
  "ספרו למישהו לאן אתם נוסעים ומתי צפוי שתחזרו.",
  "[המלצות נוספות — יתווספו בקרוב]",
] as const;

const beginnerTips = [
  "התחילו במסלול קל וקצר — אל תקפצו ישר למסלולים מאתגרים.",
  "נעצו ב-4x4 רק כשצריך — בדרכי עפר יציבות אפשר לנסוע גם ב-2x4.",
  "שמרו על מהירות נמוכה ומרחק בטיחותי מרכבים אחרים.",
  "אל תנסו לחצות מכשולים שאתם לא בטוחים בהם — עדיף לעקוף.",
  "[טיפים נוספים למתחילים — יתווספו בקרוב]",
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function OffRoadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-8" aria-hidden="true">
      <path d="M3 17h2l1.5-5.5a2 2 0 0 1 1.9-1.5H15a2 2 0 0 1 1.9 1.3L18.5 17H21" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 10.5V9a2 2 0 0 1 2-2h2" />
      <path d="M14 7h3l1 3.5" />
    </svg>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
      {children}
    </h2>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900 ${offroadTheme.borderHover}`}
    >
      <div
        className="relative aspect-[16/10] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: trip.heroBackgroundImage }}
        role="img"
        aria-label={trip.heroImageLabel}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {trip.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${offroadTheme.accent}`}
        />

        <div className="relative flex flex-1 flex-col">
          <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-50 sm:text-2xl">
            {trip.title}
          </h3>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400 sm:text-base">
            {trip.subtitle}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition-colors group-hover:text-stone-900 dark:text-stone-300 dark:group-hover:text-white">
            לכתבה המלאה
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function OffroadPage() {
  const offroadTrips = getTripsByCategory(OFFROAD_CATEGORY);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: heroBackground }}
          role="img"
          aria-label="תמונת רקע — שטח 4x4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/30 to-stone-900/10" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            הרפתקאות בשטח
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            שטח 4x4
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            מסלולי שטח קלים, המלצות וטיפים לנהיגת שטח למשפחות
          </p>
        </div>
      </section>

      {/* Content sections */}
      <section className="bg-stone-50 px-6 py-16 dark:bg-stone-950 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-16">
          <div>
            <SectionHeading>מסלולי שטח קלים</SectionHeading>
            <div className="space-y-4 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              {easyTrails.map((paragraph) => (
                <p
                  key={paragraph}
                  className={
                    paragraph.startsWith("[")
                      ? "text-stone-500 dark:text-stone-500"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading>המלצות לטיולי שטח</SectionHeading>
            <ul className="space-y-3">
              {recommendations.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl border border-stone-200/80 bg-white px-5 py-4 shadow-sm dark:border-stone-800 dark:bg-stone-900"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                    ✓
                  </span>
                  <span
                    className={`text-base leading-relaxed ${
                      item.startsWith("[")
                        ? "text-stone-500 dark:text-stone-500"
                        : "text-stone-600 dark:text-stone-400"
                    }`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading>נהיגת שטח למתחילים</SectionHeading>
            <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className={`mb-4 inline-flex size-12 items-center justify-center rounded-2xl ${offroadTheme.iconBg}`}>
                <OffRoadIcon />
              </div>
              <div className="space-y-4 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
                {beginnerTips.map((tip) => (
                  <p
                    key={tip}
                    className={
                      tip.startsWith("[")
                        ? "text-stone-500 italic dark:text-stone-500"
                        : undefined
                    }
                  >
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trips grid */}
      <section className="border-t border-stone-200/80 bg-white px-6 py-16 dark:border-stone-800 dark:bg-stone-900 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
              מסלולי שטח
            </h2>
            <p className="text-stone-500 dark:text-stone-400">
              {offroadTrips.length > 0
                ? `${offroadTrips.length} מסלולים בשטח`
                : "בקרוב יעלו כאן מסלולי שטח חדשים"}
            </p>
          </div>

          {offroadTrips.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offroadTrips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-8 py-20 text-center dark:border-stone-700 dark:bg-stone-950">
              <div className={`mx-auto mb-6 inline-flex size-20 items-center justify-center rounded-2xl ${offroadTheme.iconBg}`}>
                <OffRoadIcon />
              </div>
              <p className="mb-3 text-xl font-bold text-stone-800 dark:text-stone-100">
                בקרוב יעלו כאן מסלולי שטח חדשים
              </p>
              <p className="mx-auto mb-8 max-w-md text-stone-500 dark:text-stone-400">
                אנחנו עובדים על מסלולים, המלצות וסיפורים מהשטח — חזרו לבקר בקרוב
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                חזרה לדף הבית
                <ArrowIcon />
              </Link>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
