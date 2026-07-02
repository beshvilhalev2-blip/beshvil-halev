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

import HomeHeroSearch from "./components/home-hero-search";

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

        <HomeHeroSearch />
      </div>
    </>
  );
}

export default async function Home() {
  const siteVisibleTrips = getSiteVisibleTrips();
  const adventureCategories = buildAdventureCategoryData(siteVisibleTrips);
  const fieldUpdates = await fetchParksFieldUpdates();
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <HomeHeroSection>
        <HeroMainContent adventureCategories={adventureCategories} />
      </HomeHeroSection>

      <HomePageAtmosphere>
        <HomePersonalIntro />

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
