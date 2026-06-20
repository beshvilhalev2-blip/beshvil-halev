import Link from "next/link";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import HeartTrailMap from "./components/heart-trail-map";
import ParksFieldUpdatesWidget from "./components/parks-field-updates-widget";
import HomeHeroSection from "./components/home-hero-section";
import HeroAdventureSelector from "./components/hero-adventure-selector";
import HomePersonalIntro from "./components/home-personal-intro";
import HomeGoldTips from "./components/home-gold-tips";
import HomeCommunitySection from "./components/home-community-section";
import HomePageAtmosphere from "./components/home-page-atmosphere";
import { getSiteVisibleTrips } from "@/data/trips";
import { buildAdventureCategoryData } from "@/lib/hero-adventure-selector";
import { fetchParksFieldUpdates } from "@/lib/field-updates";
import { getHomeFieldMomentPool } from "@/lib/home-field-moments";

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
  const siteVisibleTrips = getSiteVisibleTrips();
  const adventureCategories = buildAdventureCategoryData(siteVisibleTrips);
  const fieldUpdates = await fetchParksFieldUpdates();
  const fieldMomentPool = getHomeFieldMomentPool(siteVisibleTrips);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <HomeHeroSection>
        <HeroMainContent adventureCategories={adventureCategories} />
      </HomeHeroSection>

      <HomePageAtmosphere>
        <HomePersonalIntro
          placeCount={siteVisibleTrips.length}
          fieldMomentPool={fieldMomentPool}
        />

        <HeartTrailMap />

        <HomeGoldTips />

        <section
          className="relative px-4 pb-6 pt-2 sm:px-6 sm:pb-8"
          aria-label="עדכוני שטח מרשות הטבע והגנים"
        >
          <div className="relative mx-auto max-w-6xl">
            <ParksFieldUpdatesWidget data={fieldUpdates} />
          </div>
        </section>

        <HomeCommunitySection />

        <SiteFooter variant="home" />
      </HomePageAtmosphere>
    </div>
  );
}
