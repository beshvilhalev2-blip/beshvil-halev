"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Trip } from "@/data/trips";
import GearChecklistPanel, {
  type GearChecklistSection,
} from "@/app/components/gear-checklist-panel";
import {
  buildTripGearChecklist,
  GEAR_DISPLAY_GROUPS,
  groupItemsByDisplayGroup,
  loadGearState,
  mergeChecklistWithCooking,
  stripCookingStatuses,
  updateCookingPlans,
} from "@/lib/gear-checklist";

type TripGearChecklistProps = {
  trip: Trip;
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
      {children}
    </h2>
  );
}

export default function TripGearChecklist({ trip }: TripGearChecklistProps) {
  const baseChecklist = useMemo(
    () => buildTripGearChecklist(trip),
    [trip],
  );

  const [cookingPlans, setCookingPlans] = useState<boolean | null>(null);
  const [cookingHydrated, setCookingHydrated] = useState(false);

  useEffect(() => {
    const state = loadGearState(trip.slug);
    setCookingPlans(state.cookingPlans);
    setCookingHydrated(true);
  }, [trip.slug]);

  const checklist = useMemo(
    () => mergeChecklistWithCooking(baseChecklist, cookingPlans),
    [baseChecklist, cookingPlans],
  );

  const sections = useMemo((): GearChecklistSection[] => {
    const groupedItems = groupItemsByDisplayGroup(checklist.items);

    return GEAR_DISPLAY_GROUPS.flatMap((group) => {
      const items = groupedItems.get(group.id);
      if (!items?.length) {
        return [];
      }

      return [
        {
          id: group.id,
          emoji: group.emoji,
          label: group.label,
          items,
        },
      ];
    });
  }, [checklist.items]);

  const handleCookingChange = useCallback(
    (nextCookingPlans: boolean) => {
      setCookingPlans((current) => {
        if (current === nextCookingPlans) {
          return current;
        }

        const state = loadGearState(trip.slug);

        if (!nextCookingPlans) {
          const items = stripCookingStatuses(state.items);
          updateCookingPlans(trip.slug, state, false, items);
        } else {
          updateCookingPlans(trip.slug, state, true);
        }

        return nextCookingPlans;
      });
    },
    [trip.slug],
  );

  const handleReset = useCallback(() => {
    setCookingPlans(null);
  }, []);

  if (checklist.items.length === 0) {
    return null;
  }

  return (
    <section
      id="trip-gear-checklist"
      className="mb-16 scroll-mt-28"
      aria-labelledby="trip-gear-checklist-heading"
    >
      <SectionHeading>
        <span id="trip-gear-checklist-heading">מוכנים לטיול?</span>
      </SectionHeading>
      <p className="mb-6 text-base text-stone-600 dark:text-stone-400">
        רשימת ציוד מומלצת לפי סוג הטיול
      </p>

      <GearChecklistPanel
        storageKey={trip.slug}
        items={checklist.items}
        sections={sections}
        onReset={handleReset}
        cookingToggle={
          cookingHydrated
            ? {
                plans: cookingPlans,
                onChange: handleCookingChange,
              }
            : undefined
        }
      />
    </section>
  );
}
