import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import RecommendationsDiscovery from "@/app/components/recommendations-discovery";
import { getSiteVisibleTrips } from "@/data/trips";

export const metadata = {
  title: "המלצות לטיולים | בשביל הלב",
  description:
    "כל המסלולים, המעיינים והטיולים המומלצים שלנו - סננו לפי סוג חוויה ואזור, עם מדריכים מלאים וטיפים מהשטח",
};

export default function RecommendationsPage() {
  const publishedTrips = getSiteVisibleTrips();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <RecommendationsDiscovery trips={publishedTrips} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
