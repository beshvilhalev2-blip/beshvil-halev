import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import RegionsOverview from "@/app/components/regions-overview";

export const metadata: Metadata = {
  title: "אזורים בארץ | בשביל הלב",
  description:
    "בחרו אזור בארץ וגלו את הטיולים, המעיינות, התצפיות והמסלולים המומלצים - צפון, השרון, מרכז, ירושלים והסביבה ודרום.",
};

export default function RegionsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <RegionsOverview />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
