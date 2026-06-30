"use client";

import { useMemo, useState } from "react";
import type { Trip } from "@/data/trips";
import TripGearChecklist from "@/app/components/trip-gear-checklist";
import { buildTripGearChecklist } from "@/lib/gear-checklist";
import {
  tripSectionHeadingClass,
  tripSurfaceClass,
  tripSurfacePaddingClass,
} from "@/lib/trip-page-ui";

type TripGearCollapsibleProps = {
  trip: Trip;
};

export default function TripGearCollapsible({ trip }: TripGearCollapsibleProps) {
  const [expanded, setExpanded] = useState(false);
  const hasGear = useMemo(
    () => buildTripGearChecklist(trip).items.length > 0,
    [trip],
  );

  if (!hasGear) {
    return null;
  }

  return (
    <section aria-labelledby="trip-gear-heading">
      <h2 id="trip-gear-heading" className={tripSectionHeadingClass}>
        מה כדאי להביא? 🎒
      </h2>

      <div className={tripSurfaceClass}>
        <div className={`${tripSurfacePaddingClass} text-center`}>
          <p className="text-center text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            הכנתי רשימת ציוד מומלצת לטיול הזה - מותאמת לסוג הביקור ולמשפחה.
          </p>

          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls="trip-gear-checklist-panel"
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl border border-stone-200/70 bg-white/80 px-5 py-2 text-sm font-medium text-stone-800 transition-colors hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-100"
          >
            {expanded ? "הסתירי את הרשימה" : "פתחי את רשימת הציוד"}
          </button>
        </div>

        {expanded ? (
          <div
            id="trip-gear-checklist-panel"
            className="border-t border-stone-200/60 px-5 py-5 dark:border-stone-800/60 sm:px-6"
          >
            <TripGearChecklist trip={trip} variant="embedded" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
