import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import TripCard from "@/app/components/trip-card";
import { trips } from "@/data/trips";

export const metadata = {
  title: "המלצות לטיולים | בשביל הלב",
  description: "כל המסלולים, המעיינים והטיולים המומלצים שלנו — מדריכים מלאים עם טיפים, עלויות וסיפורים מהשטח",
};

export default function RecommendationsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="bg-stone-50 px-6 pb-16 pt-32 dark:bg-stone-950 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-4 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
              כל המסלולים
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
              המלצות לטיולים
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-stone-600 dark:text-stone-400">
              מסלולים, מעיינים וחוויות שבדקנו בעצמנו — עם טיפים, עלויות וסיפורים אישיים מהשטח
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-6 py-10 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/"
            className="text-lg font-semibold text-stone-800 transition-colors hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300"
          >
            בשביל הלב
          </Link>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            © {new Date().getFullYear()} · כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </div>
  );
}
