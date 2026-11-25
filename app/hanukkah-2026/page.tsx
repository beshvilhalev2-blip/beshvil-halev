import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import HanukkahHero, { HANUKKAH_HERO_IMAGE } from "@/app/components/hanukkah/hanukkah-hero";
import {
  AfterDarkSection,
  ClosingSection,
  DecemberLightsSection,
  GoOutSection,
  MaccabeesSection,
  NatureActivitiesSection,
  OffroadSection,
  RecommendationsSection,
  VolunteerAndGearSection,
} from "@/app/components/hanukkah/hanukkah-sections";

const description =
  "המדריך של בשביל הלב לחנוכה 2026: פעילויות חג בטבע, טיול בעקבות המכבים, סיורי עששיות, אורות דצמבר, מסלולי 4×4 קלילים והמלצות לטיולים לפי אזור.";

export const metadata: Metadata = {
  title: "חנוכה 2026 בשביל הלב | מדריך טיולים לחג",
  description,
  openGraph: {
    title: "חנוכה 2026 בשביל הלב",
    description,
    images: [{ url: HANUKKAH_HERO_IMAGE, width: 1536, height: 1024 }],
    locale: "he_IL",
    type: "article",
  },
};

export default function Hanukkah2026Page() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1">
        <HanukkahHero />
        <NatureActivitiesSection />
        <AfterDarkSection />
        <MaccabeesSection />
        <DecemberLightsSection />
        <OffroadSection />
        <RecommendationsSection />
        <GoOutSection />
        <VolunteerAndGearSection />
        <ClosingSection />
      </main>
      <SiteFooter />
    </div>
  );
}
