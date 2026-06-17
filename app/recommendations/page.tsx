import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import TripCard from "@/app/components/trip-card";
import { getPublishedTrips } from "@/data/trips";

export const metadata = {
  title: "המלצות לטיולים | בשביל הלב",
  description: "כל המסלולים, המעיינים והטיולים המומלצים שלנו — מדריכים מלאים עם טיפים, עלויות וסיפורים מהשטח",
};

export default function RecommendationsPage() {
  const publishedTrips = getPublishedTrips();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="bg-stone-50 px-4 pb-16 pt-28 dark:bg-stone-950 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-4 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
              גלו מקומות · בקצב שלכם
            </p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl md:text-5xl">
              המלצות לטיולים
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              מסלולים, מעיינים וחוויות שבדקנו בעצמנו — עם טיפים, עלויות וסיפורים מהשטח
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-stone-500 dark:text-stone-500">
              עוזרים לכם לצאת לטבע בביטחון
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedTrips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
