import type { Metadata } from "next";
import AboutAtmosphereBackground from "@/app/components/about/about-atmosphere-background";
import ContactPageSections from "@/app/components/contact/contact-page-sections";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";

export const metadata: Metadata = {
  title: "צור קשר | בשביל הלב",
  description:
    "צרו קשר עם מילאנה — שאלות, המלצות על מקומות, שיתופי פעולה וחוויות מהשטח. בואו נדבר.",
};

export default function ContactPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <AboutAtmosphereBackground />
      <SiteHeader />
      <ContactPageSections />
      <SiteFooter />
    </div>
  );
}
