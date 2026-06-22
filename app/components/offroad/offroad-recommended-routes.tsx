import TripCard, { getRegionForTrip } from "@/app/components/trip-card";
import type { Trip } from "@/data/trips";
import { OFFROAD_ROUTE_GROUPS } from "@/lib/offroad/content";
import type { OffroadRouteGroupId } from "@/lib/offroad/trip-selection";
import {
  OffroadSectionHeader,
  offroadGlassCard,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

type OffroadRecommendedRoutesProps = {
  groups: Record<OffroadRouteGroupId, Trip[]>;
};

export default function OffroadRecommendedRoutes({
  groups,
}: OffroadRecommendedRoutesProps) {
  return (
    <section
      id="recommended-routes"
      className={`${offroadSectionShell} scroll-mt-24 border-y border-stone-200/60 bg-white/70 dark:border-stone-800 dark:bg-stone-900/40`}
    >
      <div className={offroadSectionInner}>
        <OffroadSectionHeader
          title="מסלולי שטח מומלצים"
          description="מסלולים אמיתיים מהמאגר שלנו — מסודרים לפי סוג חוויה."
        />

        <div className="space-y-12">
          {OFFROAD_ROUTE_GROUPS.map((group) => {
            const trips = groups[group.id];
            return (
              <div key={group.id}>
                <div className={`${offroadGlassCard} mb-6 px-5 py-4 sm:px-6`}>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 sm:text-2xl">
                    {group.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 sm:text-base">
                    {group.description}
                  </p>
                </div>

                {trips.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {trips.map((trip) => (
                      <TripCard
                        key={trip.slug}
                        trip={trip}
                        region={getRegionForTrip(trip)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-2xl border border-dashed border-stone-300 px-6 py-10 text-center text-stone-500 dark:border-stone-700">
                    בקרוב יתווספו עוד מסלולים בקבוצה הזו.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
