import Link from "next/link";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import TripCard from "./components/trip-card";
import HeartTrailMap from "./components/heart-trail-map";
import FindMyTripCta from "./components/find-my-trip-cta";
import TripGearCta from "./components/trip-gear-cta";
import ParksFieldUpdatesWidget from "./components/parks-field-updates-widget";
import HomeHeroSection from "./components/home-hero-section";
import HeroAdventureSelector from "./components/hero-adventure-selector";
import { getHomepageTrips, trips } from "@/data/trips";
import { buildAdventureCategoryData } from "@/lib/hero-adventure-selector";
import { fetchParksFieldUpdates } from "@/lib/field-updates";

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

function HeroMainContent({
  adventureCategories,
}: {
  adventureCategories: ReturnType<typeof buildAdventureCategoryData>;
}) {
  return (
    <>
      <p className="mb-2.5 inline-block rounded-full border border-white/30 bg-white/15 px-5 py-1.5 text-sm font-medium tracking-wide text-white shadow-[0_2px_16px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:mb-3">
        לצאת לטבע • בקצב שלכם
      </p>

      <h1 className="mb-2.5 text-[2.75rem] font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.38)] sm:mb-3 sm:text-6xl lg:text-[4.25rem]">
        בשביל הלב
      </h1>

      <p className="mx-auto mb-4 max-w-2xl text-base leading-snug text-white drop-shadow-[0_1px_14px_rgba(0,0,0,0.32)] sm:mb-5 sm:text-lg lg:mb-4 lg:text-xl lg:leading-relaxed">
        להיות בתנועה זאת התרופה.
        <br />
        מקומות, ציוד ותכנון שיעזרו לכם פשוט לצאת לדרך.
      </p>

      <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:mb-5 sm:flex-row sm:gap-4 lg:mb-5">
        <Link
          href="/find-my-trip"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-stone-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-xl hover:shadow-black/20 active:translate-y-0 sm:w-auto"
        >
          מצאו לי טיול
        </Link>
        <Link
          href="/recommendations"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/35 bg-white/14 px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/24 hover:shadow-[0_8px_28px_rgba(0,0,0,0.16)] active:translate-y-0 sm:w-auto"
        >
          גלו טיולים
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-[min(85vw,82rem)] flex-col items-stretch">
        <HeroAdventureSelector categories={adventureCategories} />

        <form
          action="/search"
          method="get"
          className="mt-5 flex w-full flex-col gap-2 rounded-2xl border border-white/25 bg-white/88 p-2 shadow-[0_8px_28px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/95 focus-within:shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:mx-auto sm:mt-8 sm:max-w-xl sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-2 lg:mt-10 lg:max-w-[40rem]"
        >
          <div className="flex flex-1 items-center gap-3 px-3 sm:px-4">
            <SearchIcon />
            <input
              type="search"
              name="q"
              placeholder="חפשו מסלול, אזור או חוויה..."
              className="w-full bg-transparent py-2.5 text-base text-stone-700 placeholder:text-stone-400 focus:outline-none"
              aria-label="חיפוש מסלולים"
            />
          </div>
          <button
            type="submit"
            className="min-h-10 w-full shrink-0 rounded-xl bg-stone-800/95 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 sm:w-auto sm:rounded-full sm:px-7"
          >
            חיפוש
          </button>
        </form>
      </div>
    </>
  );
}

export default async function Home() {
  const homepageTrips = getHomepageTrips(6);
  const adventureCategories = buildAdventureCategoryData(trips);
  const fieldUpdates = await fetchParksFieldUpdates();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      {/* Hero */}
      <HomeHeroSection>
        <HeroMainContent adventureCategories={adventureCategories} />
      </HomeHeroSection>

      {/* How it works */}
      <section className="border-t border-stone-200/80 bg-white px-4 py-14 dark:border-stone-800 dark:bg-stone-900 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {howItWorksSteps.map((step) => (
              <div key={step.title} className="text-center">
                <p className="mb-3 text-3xl" aria-hidden="true">
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
      <section className="border-t border-stone-200/80 bg-stone-50 px-4 py-14 dark:border-stone-800 dark:bg-stone-950 sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <FindMyTripCta />
          <TripGearCta />
        </div>
      </section>

      <section
        className="border-t border-stone-200/80 bg-stone-50 px-4 pb-14 pt-2 dark:border-stone-800 dark:bg-stone-950 sm:px-6 sm:pb-20"
        aria-label="עדכוני שטח מרשות הטבע והגנים"
      >
        <div className="mx-auto max-w-6xl">
          <ParksFieldUpdatesWidget data={fieldUpdates} />
        </div>
      </section>

      {/* Featured trips */}
      {homepageTrips.length > 0 && (
        <section className="border-t border-stone-200/80 bg-white px-4 py-20 dark:border-stone-800 dark:bg-stone-900 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
                מסלולים מומלצים
              </h2>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                טיולים שנבחרו ונבדקו באהבה — עם טיפים, עלויות וסיפורים מהשטח
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {homepageTrips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} />
              ))}
            </div>

            <div className="mt-10 text-center">
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
        className="bg-stone-50 px-4 py-20 dark:bg-stone-950 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
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
