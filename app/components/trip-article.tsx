import Link from "next/link";
import type { Trip } from "@/data/trips";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import TripHeroActions from "@/app/components/trip-hero-actions";
import TripGearCollapsible from "@/app/components/trip-gear-collapsible";
import WantToTravelSaveButton from "@/app/components/want-to-travel-save-button";
import TripPhotoGallery from "@/app/components/trip-photo-gallery";
import TripHeroImage from "@/app/components/trip-hero-image";
import TripQuickFacts from "@/app/components/trip-quick-facts";
import TripAboutPlace from "@/app/components/trip-about-place";
import TripOurExperience from "@/app/components/trip-our-experience";
import TripGettingThereSection from "@/app/components/trip-getting-there";
import TripMilanaTips from "@/app/components/trip-milana-tips";
import TripStayNearby from "@/app/components/trip-stay-nearby";
import TripBeforeYouGo from "@/app/components/trip-before-you-go";
import {
  getExpectationParagraphs,
  getRealContentParagraphs,
  getRealNearbyPlaces,
  getRealTips,
} from "@/lib/trip-content-utils";
import { resolveTripQuickFacts } from "@/lib/trip-quick-facts";
import { getTripHeroPills } from "@/lib/trip-hero-tags";
import { resolveTripGettingThere } from "@/lib/trip-getting-there";
import {
  tripSectionHeadingClass,
  tripSectionStackClass,
  tripSurfaceClass,
} from "@/lib/trip-page-ui";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export default function TripArticle({ trip }: { trip: Trip }) {
  const quickFacts = resolveTripQuickFacts(trip);
  const heroPills = getTripHeroPills(trip);
  const aboutParagraphs = getExpectationParagraphs(trip.about, 3);
  const personalStoryParagraphs = getRealContentParagraphs(trip.personalStory);
  const tips = getRealTips(trip.tips, 5);
  const gettingThere = resolveTripGettingThere(trip);
  const wazeDestination = trip.location?.label?.trim() || trip.title;
  const nearbyPlaces = getRealNearbyPlaces(trip.nearbyPlaces);
  const nearbySubtitle = trip.nearbySubtitle?.trim();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-0 items-end overflow-hidden pt-20 sm:min-h-[55vh] sm:pt-24 lg:min-h-[65vh]">
        <TripHeroImage trip={trip} />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />

        <div className="trip-hero-content-enter relative z-10 mx-auto w-full max-w-4xl px-4 pb-9 pt-6 text-center sm:px-6 sm:pb-11 sm:pt-8">
          <div className="-translate-y-1 mb-2 flex flex-wrap items-center justify-center gap-1.5 sm:-translate-y-2 sm:mb-2.5 sm:gap-2">
            <span className="rounded-full border border-white/15 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-100/90 backdrop-blur-sm sm:text-[0.8125rem]">
              {heroPills.region}
            </span>
            {heroPills.category ? (
              <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm sm:text-[0.8125rem]">
                {heroPills.category}
              </span>
            ) : null}
            {heroPills.attribute ? (
              <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm sm:text-[0.8125rem]">
                {heroPills.attribute}
              </span>
            ) : null}
          </div>

          <h1 className="mx-auto mb-1.5 max-w-3xl text-[2.025rem] font-bold leading-tight tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5),0_4px_32px_rgba(0,0,0,0.35)] sm:mb-2 sm:text-[2.43rem] md:text-[3.24rem] lg:text-[4.05rem]">
            {trip.title}
          </h1>

          <p className="mx-auto mb-3 w-fit max-w-2xl rounded-lg border border-white/20 bg-white/12 px-3.5 py-2 text-sm font-semibold leading-snug text-white backdrop-blur-md [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] sm:mb-3.5 sm:px-4 sm:py-2.5 sm:text-base md:text-lg md:leading-relaxed">
            {trip.subtitle}
          </p>

          <div className="mb-2">
            <TripHeroActions trip={trip} />
          </div>

          <WantToTravelSaveButton tripSlug={trip.slug} variant="hero" />
        </div>
      </section>

      <TripQuickFacts facts={quickFacts} />

      <article className="relative">
        <div className={`mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 ${tripSectionStackClass}`}>
          <TripAboutPlace paragraphs={aboutParagraphs} />
          <TripOurExperience paragraphs={personalStoryParagraphs} />
          <TripPhotoGallery trip={trip} />

          {gettingThere ? (
            <TripGettingThereSection
              gettingThere={gettingThere}
              wazeDestination={wazeDestination}
            />
          ) : null}

          <TripGearCollapsible trip={trip} />
          <TripMilanaTips tips={tips} />
          <TripStayNearby />
          <TripBeforeYouGo note={trip.closingNote} />
        </div>

        {nearbyPlaces.length > 0 ? (
          <section className="px-4 pb-8 sm:px-6 sm:pb-10">
            <div className="mx-auto max-w-6xl">
              <h2 className={`${tripSectionHeadingClass} sm:mb-6`}>
                עוד מקומות שלא כדאי לפספס באזור 🧭
              </h2>
              {nearbySubtitle ? (
                <p className="-mt-2 mb-6 text-center text-sm text-stone-500 dark:text-stone-400 sm:mb-8 sm:text-base">
                  {nearbySubtitle}
                </p>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {nearbyPlaces.map((place) => (
                  <Link
                    key={place.title}
                    href={place.href}
                    className={`group flex flex-col p-5 transition-colors hover:border-stone-300 dark:hover:border-stone-700 ${tripSurfaceClass}`}
                  >
                    <h3 className="mb-2 text-lg font-bold text-stone-900 dark:text-stone-50">
                      {place.title}
                    </h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                      {place.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors group-hover:text-emerald-900 dark:text-emerald-400 dark:group-hover:text-emerald-300">
                      קראו עוד
                      <ArrowIcon />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <SiteFooter />
    </div>
  );
}
