import Link from "next/link";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import TripCard from "./components/trip-card";
import HeartTrailMap from "./components/heart-trail-map";
import FindMyTripCta from "./components/find-my-trip-cta";
import TripGearCta from "./components/trip-gear-cta";
import ParksFieldUpdatesWidget from "./components/parks-field-updates-widget";
import { getHomepageTrips } from "@/data/trips";
import { fetchParksFieldUpdates } from "@/lib/field-updates";
import { HOMEPAGE_QUICK_FILTERS } from "@/lib/homepage-quick-filters";

const howItWorksSteps = [
  {
    emoji: "🌿",
    title: "גלו",
    description: "מצאו טיול שמתאים לכם",
  },
  {
    emoji: "🎒",
    title: "התארגנו",
    description: "רשימות ציוד חכמות",
  },
  {
    emoji: "🚙",
    title: "צאו",
    description: "ניווט, טיפים וכל מה שצריך",
  },
] as const;

const categories = [
  {
    title: "צפון",
    description: "גליל, גולן, חופים ויערות ירוקים",
    href: "/regions/north",
    iconBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    accent: "from-emerald-500/20 to-teal-600/10",
    borderHover: "hover:border-emerald-200 dark:hover:border-emerald-800",
  },
  {
    title: "מרכז",
    description: "שפלה, מישור החוף ושבילי הטבע",
    href: "/regions/center",
    iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    accent: "from-amber-500/20 to-orange-600/10",
    borderHover: "hover:border-amber-200 dark:hover:border-amber-800",
  },
  {
    title: "ירושלים",
    description: "עיר הקודש, הרים ונקודות תצפית",
    href: "/regions/jerusalem",
    iconBg: "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-200",
    accent: "from-stone-500/20 to-amber-700/10",
    borderHover: "hover:border-stone-300 dark:hover:border-stone-600",
  },
  {
    title: "דרום",
    description: "מדבר, מכתשים ושקיעות אינסופיות",
    href: "/regions/south",
    iconBg: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    accent: "from-orange-500/20 to-rose-600/10",
    borderHover: "hover:border-orange-200 dark:hover:border-orange-800",
  },
  {
    title: "שטח 4x4",
    description: "מסלולים אתגריים לרכב שטח",
    href: "/offroad",
    iconBg: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
    accent: "from-zinc-500/20 to-amber-900/10",
    borderHover: "hover:border-zinc-300 dark:hover:border-zinc-600",
  },
] as const;

function NorthIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <path d="M4 20 12 4l8 16" />
      <path d="M7.5 14h9" />
      <path d="M9 17h6" />
    </svg>
  );
}

function CenterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <circle cx="12" cy="6" r="3" />
      <path d="M12 9v2" />
      <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
      <path d="M2 20h20" />
    </svg>
  );
}

function JerusalemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <path d="M12 3 5 10h14L12 3Z" />
      <path d="M8 10v8h8v-8" />
      <path d="M6 18h12" />
      <path d="M10 14h4" />
    </svg>
  );
}

function SouthIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <circle cx="17" cy="5" r="2.5" />
      <path d="M2 18c3-2 7-3 10-3s7 1 10 3" />
      <path d="M5 18c1.5-1 3.5-1.5 7-1.5s5.5.5 7 1.5" />
      <path d="M2 21h20" />
    </svg>
  );
}

function OffRoadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <path d="M3 17h2l1.5-5.5a2 2 0 0 1 1.9-1.5H15a2 2 0 0 1 1.9 1.3L18.5 17H21" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 10.5V9a2 2 0 0 1 2-2h2" />
      <path d="M14 7h3l1 3.5" />
    </svg>
  );
}

const regionIcons = [NorthIcon, CenterIcon, JerusalemIcon, SouthIcon, OffRoadIcon] as const;

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0 text-stone-400"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function HeroQuickFilters() {
  return (
    <nav
      aria-label="חיפוש מהיר לפי סוג חוויה"
      className="mx-auto mt-3 w-full max-w-xl sm:mt-4 sm:max-w-2xl"
    >
      <ul className="flex flex-nowrap justify-start gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {HOMEPAGE_QUICK_FILTERS.map((filter) => (
          <li key={filter.href} className="shrink-0">
            <Link
              href={filter.href}
              aria-label={filter.ariaLabel}
              className="inline-flex min-h-11 items-center rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-white/95 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {filter.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function HeroMainContent() {
  return (
    <>
      <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
        לצאת לטבע • בקצב שלכם
      </p>

      <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl">
        בשביל הלב
      </h1>

      <div className="mx-auto mb-6 max-w-2xl space-y-1 sm:mb-7">
        <p className="text-lg font-semibold leading-relaxed text-white sm:text-xl md:text-2xl">
          להיות בתנועה זאת התרופה.
        </p>
        <p className="text-base font-normal leading-relaxed text-white/80 sm:text-lg md:text-xl">
          מקומות, ציוד ותכנון שיעזרו לכם פשוט לצאת לדרך.
        </p>
      </div>

      <div className="mb-6 flex flex-col items-center justify-center sm:mb-7">
        <Link
          href="/find-my-trip"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-stone-900 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
        >
          מצאו לי טיול
        </Link>
      </div>

      <form
        action="/search"
        method="get"
        className="mx-auto flex max-w-xl flex-col gap-2 rounded-2xl border border-white/15 bg-white/90 p-2 shadow-lg shadow-black/10 backdrop-blur-md transition-shadow focus-within:shadow-xl sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:p-2"
      >
        <div className="flex flex-1 items-center gap-3 px-4">
          <SearchIcon />
          <input
            type="search"
            name="q"
            placeholder="חפשו מסלול, אזור או חוויה..."
            className="w-full bg-transparent py-3 text-base text-stone-800 placeholder:text-stone-400 focus:outline-none sm:text-lg"
            aria-label="חיפוש מסלולים"
          />
        </div>
        <button
          type="submit"
          className="min-h-11 w-full shrink-0 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 sm:w-auto sm:rounded-full sm:px-8 sm:text-base"
        >
          חיפוש
        </button>
      </form>

      <HeroQuickFilters />

      <Link
        href="/recommendations"
        className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 py-2 text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:mt-4 sm:text-base"
      >
        גלו את כל הטיולים
        <ArrowIcon />
      </Link>
    </>
  );
}

export default async function Home() {
  const homepageTrips = getHomepageTrips(6);
  const fieldUpdates = await fetchParksFieldUpdates();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[58vh] items-center justify-center overflow-hidden sm:min-h-[68vh] lg:min-h-[75vh]">
        {/* Background placeholder — replace with real hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(
                135deg,
                rgba(28, 25, 23, 0.55) 0%,
                rgba(68, 64, 60, 0.45) 35%,
                rgba(120, 53, 15, 0.5) 70%,
                rgba(28, 25, 23, 0.65) 100%
              ),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2387CEEB'/%3E%3Cstop offset='60%25' stop-color='%23DEB887'/%3E%3Cstop offset='100%25' stop-color='%23556B2F'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1920' height='1080'/%3E%3Cellipse cx='960' cy='820' fill='%232F4F2F' opacity='0.6' rx='1200' ry='280'/%3E%3Cpath fill='%233D2914' opacity='0.5' d='M0 720 Q480 580 960 680 T1920 640 L1920 1080 L0 1080 Z'/%3E%3Cpath fill='%235D4037' opacity='0.4' d='M0 780 Q640 660 1280 740 T1920 700 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
            `,
          }}
          role="img"
          aria-label="תמונת רקע — נוף שבילי טיול"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20">
          <HeroMainContent />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent sm:h-32 dark:from-stone-950" />
      </section>

      {/* How it works */}
      <section className="border-t border-stone-200/80 bg-white px-4 py-10 dark:border-stone-800 dark:bg-stone-900 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-5">
            {howItWorksSteps.map((step) => (
              <div key={step.title} className="text-center">
                <p className="mb-2 text-3xl" aria-hidden="true">
                  {step.emoji}
                </p>
                <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-50">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find my trip CTA */}
      <section className="border-t border-stone-200/80 bg-stone-50 px-4 py-10 dark:border-stone-800 dark:bg-stone-950 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <FindMyTripCta />
          <TripGearCta />
        </div>
      </section>

      <section
        className="border-t border-stone-200/80 bg-stone-50 px-4 pb-10 pt-2 dark:border-stone-800 dark:bg-stone-950 sm:px-6 sm:pb-14"
        aria-label="עדכוני שטח מרשות הטבע והגנים"
      >
        <div className="mx-auto max-w-6xl">
          <ParksFieldUpdatesWidget data={fieldUpdates} />
        </div>
      </section>

      {/* Featured trips */}
      {homepageTrips.length > 0 && (
        <section className="border-t border-stone-200/80 bg-white px-4 py-14 dark:border-stone-800 dark:bg-stone-900 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center sm:mb-10">
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
                מסלולים מומלצים
              </h2>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                טיולים שנבחרו ונבדקו באהבה — עם טיפים, עלויות וסיפורים מהשטח
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {homepageTrips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} />
              ))}
            </div>

            <div className="mt-8 text-center sm:mt-9">
              <Link
                href="/recommendations"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                גלו טיולים
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      )}

      <HeartTrailMap />

      {/* Regions */}
      <section
        id="regions"
        className="bg-stone-50 px-4 py-14 dark:bg-stone-950 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
              בחרו אזור לטיול
            </h2>
            <p className="mx-auto max-w-xl text-lg text-stone-600 dark:text-stone-400">
              כל אזור מחזיק עולם שלם — מסלולים, נקודות עצירה וסיפורים מהשטח
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category, index) => {
              const Icon = regionIcons[index];
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 sm:min-h-[260px] sm:p-7 ${category.borderHover}`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${category.accent}`}
                  />

                  <div className="relative flex flex-1 flex-col">
                    <div
                      className={`mb-6 inline-flex size-14 items-center justify-center rounded-2xl ${category.iconBg}`}
                    >
                      <Icon />
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-50 sm:text-2xl">
                      {category.title}
                    </h3>

                    <p className="mb-8 flex-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                      {category.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition-colors group-hover:text-stone-900 dark:text-stone-300 dark:group-hover:text-white">
                      גלו מסלולים
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
