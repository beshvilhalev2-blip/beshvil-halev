import type { Metadata } from "next";
import AboutHeroSection from "@/app/components/about/about-hero-section";
import AboutJourneyTimeline from "@/app/components/about/about-journey-timeline";
import AboutStorySection from "@/app/components/about/about-story-section";
import AboutClosingContactSection from "@/app/components/about/about-closing-contact-section";
import AboutAtmosphereBackground from "@/app/components/about/about-atmosphere-background";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";

export const metadata: Metadata = {
  title: "אודות | בשביל הלב",
  description:
    "הסיפור מאחורי בשביל הלב - מדריך טיולים למשפחות על אהבה לטבע, ילדים ומסלולים בישראל",
};

export default function AboutPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <AboutAtmosphereBackground />
      <SiteHeader />

      <AboutHeroSection />

      <AboutJourneyTimeline />

      <article className="relative z-10">
        <AboutStorySection />
        <AboutClosingContactSection />
      </article>

      <SiteFooter />
    </div>
  );
}
