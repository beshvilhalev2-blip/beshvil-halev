import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import OffroadHeroSection from "@/app/components/offroad/offroad-hero-section";
import OffroadFirstTimeSection from "@/app/components/offroad/offroad-first-time-section";
import OffroadDifficultySection from "@/app/components/offroad/offroad-difficulty-section";
import OffroadRecommendedRoutes from "@/app/components/offroad/offroad-recommended-routes";
import OffroadBeginnerMistakesSection from "@/app/components/offroad/offroad-beginner-mistakes-section";
import OffroadGearSection from "@/app/components/offroad/offroad-gear-section";
import OffroadRouteWizard from "@/app/components/offroad/offroad-route-wizard";
import { getSiteVisibleTrips } from "@/data/trips";
import { getOffroadRouteGroups } from "@/lib/offroad/trip-selection";

export const metadata: Metadata = {
  title: "טיולי שטח למשפחות | בשביל הלב",
  description:
    "מדריך משפחות לטיולי שטח בישראל — מסלולים, טיפים למתחילים, ציוד מומלץ ובחירת מסלול לפי העדפות",
};

export default function OffroadPage() {
  const trips = getSiteVisibleTrips();
  const routeGroups = getOffroadRouteGroups(trips);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <OffroadHeroSection />
      <OffroadFirstTimeSection />
      <OffroadDifficultySection />
      <OffroadRecommendedRoutes groups={routeGroups} />
      <OffroadBeginnerMistakesSection />
      <OffroadGearSection />
      <OffroadRouteWizard trips={trips} />

      <SiteFooter />
    </div>
  );
}
