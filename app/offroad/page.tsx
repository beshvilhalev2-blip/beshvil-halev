import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import OffroadHeroSection from "@/app/components/offroad/offroad-hero-section";
import OffroadJourneyBackground from "@/app/components/offroad/offroad-journey-background";
import OffroadSafetySection from "@/app/components/offroad/offroad-safety-section";
import OffroadFirstTimeSection from "@/app/components/offroad/offroad-first-time-section";
import OffroadRecommendedRoutes from "@/app/components/offroad/offroad-recommended-routes";
import OffroadBeginnerMistakesSection from "@/app/components/offroad/offroad-beginner-mistakes-section";
import OffroadCookingTipsSection from "@/app/components/offroad/offroad-cooking-tips-section";
import OffroadGearChecklistSection from "@/app/components/offroad/offroad-gear-checklist-section";
import OffroadFinalCta from "@/app/components/offroad/offroad-final-cta";
import { getSiteVisibleTrips } from "@/data/trips";
import { getOffroadRouteGroups } from "@/lib/offroad/trip-selection";

export const metadata: Metadata = {
  title: "שטח 4x4 למתחילים | בשביל הלב",
  description:
    "מסלולי שטח קלים למשפחות ו-SUV, שבילי נוף, טיפים למתחילים, בישול בשטח ורשימת ציוד לטיול השטח הראשון.",
};

export default function OffroadPage() {
  const trips = getSiteVisibleTrips();
  const routeGroups = getOffroadRouteGroups(trips);

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <SiteHeader />

      <OffroadHeroSection />

      <div className="relative">
        <OffroadJourneyBackground />
        <div className="relative z-10">
          <OffroadSafetySection />
          <OffroadFirstTimeSection />
          <OffroadRecommendedRoutes groups={routeGroups} />
          <OffroadBeginnerMistakesSection />
          <OffroadCookingTipsSection />
          <OffroadGearChecklistSection />
          <OffroadFinalCta />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
