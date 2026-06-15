"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Trip } from "@/data/trips";
import {
  AUTO_SAVE_NOTE,
  buildTripGearChecklist,
  calculateReadiness,
  clearGearState,
  GEAR_PACK_ORDER,
  GEAR_STORAGE_VERSION,
  loadGearState,
  mergeChecklistWithCooking,
  stripCookingStatuses,
  updateCookingPlans,
  updateGearItemStatus,
  type GearItemStatus,
  type GearPackId,
  type GearPriority,
  type ResolvedGearItem,
  type TripGearStorageState,
} from "@/lib/gear-checklist";

function createInitialStorageState(): TripGearStorageState {
  return {
    version: GEAR_STORAGE_VERSION,
    items: {},
    cookingPlans: null,
    updatedAt: "",
  };
}

type TripGearChecklistProps = {
  trip: Trip;
};

const PRIORITY_BADGE_CLASS: Record<GearPriority, string> = {
  required:
    "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200",
  recommended:
    "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-200",
  bonus:
    "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
      {children}
    </h2>
  );
}

function StatusToggle({
  label,
  active,
  onClick,
  variant,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant: "have" | "missing";
}) {
  const activeClass =
    variant === "have"
      ? "bg-emerald-100 text-emerald-900 ring-2 ring-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-100 dark:ring-emerald-700"
      : "bg-amber-100 text-amber-900 ring-2 ring-amber-300 dark:bg-amber-950/60 dark:text-amber-100 dark:ring-amber-700";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-11 flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? activeClass
          : "bg-stone-50 text-stone-600 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
      }`}
    >
      {label}
    </button>
  );
}

function GearItemRow({
  item,
  status,
  onStatusChange,
}: {
  item: ResolvedGearItem;
  status: GearItemStatus;
  onStatusChange: (next: GearItemStatus) => void;
}) {
  const rowClass =
    status === "have"
      ? "border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-900/60 dark:bg-emerald-950/30"
      : status === "missing"
        ? "border-amber-200/80 bg-amber-50/50 dark:border-amber-900/60 dark:bg-amber-950/30"
        : "border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900";

  return (
    <li
      className={`rounded-xl border px-4 py-4 shadow-sm transition-colors ${rowClass}`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-base font-medium text-stone-800 dark:text-stone-100">
          {item.label}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_BADGE_CLASS[item.priority]}`}
        >
          {item.priorityLabel}
        </span>
      </div>
      <div className="flex gap-2">
        <StatusToggle
          label="יש לי"
          variant="have"
          active={status === "have"}
          onClick={() =>
            onStatusChange(status === "have" ? "unset" : "have")
          }
        />
        <StatusToggle
          label="חסר לי"
          variant="missing"
          active={status === "missing"}
          onClick={() =>
            onStatusChange(status === "missing" ? "unset" : "missing")
          }
        />
      </div>
    </li>
  );
}

function groupItemsByPack(items: ResolvedGearItem[]): Map<GearPackId, ResolvedGearItem[]> {
  const groups = new Map<GearPackId, ResolvedGearItem[]>();

  for (const pack of GEAR_PACK_ORDER) {
    const packItems = items.filter((item) => item.pack === pack);
    if (packItems.length > 0) {
      groups.set(pack, packItems);
    }
  }

  return groups;
}

export default function TripGearChecklist({ trip }: TripGearChecklistProps) {
  const baseChecklist = useMemo(
    () => buildTripGearChecklist(trip),
    [trip],
  );

  const [storageState, setStorageState] = useState<TripGearStorageState>(
    createInitialStorageState,
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStorageState(loadGearState(trip.slug));
    setHydrated(true);
  }, [trip.slug]);

  const displayState = hydrated ? storageState : createInitialStorageState();

  const checklist = useMemo(
    () => mergeChecklistWithCooking(baseChecklist, displayState.cookingPlans),
    [baseChecklist, displayState.cookingPlans],
  );

  const readiness = useMemo(
    () => calculateReadiness(checklist.items, displayState.items),
    [checklist.items, displayState.items],
  );

  const displayPercent = hydrated ? readiness.percent : 0;

  const groupedItems = useMemo(
    () => groupItemsByPack(checklist.items),
    [checklist.items],
  );

  const handleStatusChange = useCallback(
    (itemId: string, next: GearItemStatus) => {
      setStorageState((current) =>
        updateGearItemStatus(trip.slug, current, itemId, next),
      );
    },
    [trip.slug],
  );

  const handleCookingChange = useCallback(
    (cookingPlans: boolean) => {
      setStorageState((current) => {
        if (current.cookingPlans === cookingPlans) {
          return current;
        }

        if (!cookingPlans) {
          const items = stripCookingStatuses(current.items);
          return updateCookingPlans(trip.slug, current, false, items);
        }

        return updateCookingPlans(trip.slug, current, true);
      });
    },
    [trip.slug],
  );

  const handleReset = useCallback(() => {
    setStorageState(clearGearState(trip.slug));
  }, [trip.slug]);

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
      <p className="mb-1 text-base text-stone-600 dark:text-stone-400">
        רשימת ציוד מומלצת לפי סוג הטיול
      </p>
      <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">
        {AUTO_SAVE_NOTE}
      </p>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
        <div
          className="mb-6 rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30"
          role="status"
        >
          <p className="mb-3 text-base font-semibold text-stone-800 dark:text-stone-100">
            {hydrated && readiness.percent >= 100
              ? "אתם מוכנים לטיול!"
              : `אתם מוכנים ב־${displayPercent}% לטיול`}
          </p>
          {hydrated && readiness.unsetCount > 0 && readiness.percent < 100 && (
            <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
              סמנו מה יש לכם כדי לראות כמה אתם מוכנים
            </p>
          )}
          <div
            className="h-2.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={displayPercent}
            aria-label="אחוז מוכנות לטיול"
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${displayPercent}%` }}
            />
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-amber-200/80 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <p className="mb-3 text-base font-semibold text-stone-800 dark:text-stone-100">
            🍳 מתכננים לבשל בשטח?
          </p>
          <div className="flex gap-2" role="group" aria-label="מתכננים לבשל בשטח">
            <StatusToggle
              label="כן"
              variant="have"
              active={displayState.cookingPlans === true}
              onClick={() => handleCookingChange(true)}
            />
            <StatusToggle
              label="לא"
              variant="missing"
              active={displayState.cookingPlans === false}
              onClick={() => handleCookingChange(false)}
            />
          </div>
        </div>

        <div className="space-y-8">
          {[...groupedItems.entries()].map(([packId, packItems]) => (
            <div key={packId}>
              <h3 className="mb-3 text-sm font-semibold text-stone-500 dark:text-stone-400">
                {packItems[0]?.packLabel}
              </h3>
              <ul className="space-y-3">
                {packItems.map((item) => (
                  <GearItemRow
                    key={item.id}
                    item={item}
                    status={displayState.items[item.id] ?? "unset"}
                    onStatusChange={(next) => handleStatusChange(item.id, next)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {hydrated && readiness.missingItems.length > 0 && (
          <div
            className="mt-8 rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 dark:border-amber-900/50 dark:bg-amber-950/20"
            aria-live="polite"
          >
            <h3 className="mb-3 text-base font-semibold text-stone-800 dark:text-stone-100">
              חסר לכם לטיול:
            </h3>
            <ul className="space-y-2">
              {readiness.missingItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300"
                >
                  <span className="text-amber-600 dark:text-amber-400">•</span>
                  <span>{item.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_BADGE_CLASS[item.priority]}`}
                  >
                    {item.priorityLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="min-h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 sm:w-auto"
          >
            איפוס הרשימה
          </button>
        </div>
      </div>
    </section>
  );
}
