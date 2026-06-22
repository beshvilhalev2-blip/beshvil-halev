import RegionTripMiniCard from "@/app/components/region-trip-mini-card";
import type { Trip } from "@/data/trips";
import { OFFROAD_ROUTE_GROUPS } from "@/lib/offroad/content";
import type { OffroadRouteGroupId } from "@/lib/offroad/trip-selection";
import OffroadRoutesIntro from "@/app/components/offroad/offroad-routes-intro";
import {
  OffroadSectionHeader,
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
    <section id="recommended-routes" className={`${offroadSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        <OffroadSectionHeader title="מסלולי שטח מומלצים" />

        <div className="mb-10 sm:mb-12">
          <OffroadRoutesIntro />
        </div>

        <div className="space-y-14 sm:space-y-16">
          {OFFROAD_ROUTE_GROUPS.map((group) => {
            const trips = groups[group.id];
            return (
              <div key={group.id}>
                <h3 className="mb-5 text-center text-lg font-bold text-stone-900 dark:text-stone-50 sm:mb-6 sm:text-xl">
                  {group.title}
                </h3>

                {trips.length > 0 ? (
                  <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
                    {trips.map((trip) => (
                      <div
                        key={trip.slug}
                        className="w-[11.75rem] shrink-0 snap-start sm:w-auto sm:shrink"
                      >
                        <RegionTripMiniCard trip={trip} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-2xl border border-dashed border-stone-300/80 bg-white/40 px-4 py-8 text-center text-sm text-stone-500 backdrop-blur-sm dark:border-stone-700 dark:bg-stone-900/30">
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
