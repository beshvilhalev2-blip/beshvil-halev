"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Trip } from "@/data/trips";
import {
  AUTO_SAVE_NOTE,
  buildChecklistSummary,
  buildTripGearChecklist,
  buildWhatsAppShareUrl,
  calculateReadiness,
  clearGearState,
  cycleGearItemStatus,
  formatChecklistSummaryForWhatsApp,
  GEAR_DISPLAY_GROUPS,
  GEAR_STORAGE_VERSION,
  getReadinessMotivation,
  groupItemsByDisplayGroup,
  loadGearState,
  mergeChecklistWithCooking,
  stripCookingStatuses,
  updateCookingPlans,
  updateGearItemStatus,
  type GearDisplayGroupId,
  type GearItemStatus,
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
      {children}
    </h2>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 text-stone-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function StatusIndicator({ status }: { status: GearItemStatus }) {
  if (status === "have") {
    return (
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
        aria-hidden="true"
      >
        ✓
      </span>
    );
  }

  if (status === "missing") {
    return (
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300"
        aria-hidden="true"
      >
        ✕
      </span>
    );
  }

  return (
    <span
      className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-stone-300 text-sm text-stone-400 dark:border-stone-600 dark:text-stone-500"
      aria-hidden="true"
    >
      ○
    </span>
  );
}

function GearItemRow({
  item,
  status,
  onCycle,
}: {
  item: ResolvedGearItem;
  status: GearItemStatus;
  onCycle: () => void;
}) {
  const rowClass =
    status === "have"
      ? "bg-emerald-50/70 dark:bg-emerald-950/25"
      : status === "missing"
        ? "bg-rose-50/70 dark:bg-rose-950/25"
        : "bg-transparent hover:bg-stone-50 dark:hover:bg-stone-800/50";

  const statusLabel =
    status === "have" ? "יש לי" : status === "missing" ? "חסר לי" : "לא סומן";

  return (
    <li>
      <button
        type="button"
        onClick={onCycle}
        aria-label={`${item.label} — ${statusLabel}`}
        aria-pressed={status !== "unset"}
        className={`flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-start transition-colors ${rowClass}`}
      >
        <StatusIndicator status={status} />
        <span
          className={`min-w-0 flex-1 text-sm font-medium leading-snug ${
            status === "have"
              ? "text-emerald-900 dark:text-emerald-100"
              : status === "missing"
                ? "text-rose-900 dark:text-rose-100"
                : "text-stone-700 dark:text-stone-300"
          }`}
        >
          {item.label}
        </span>
      </button>
    </li>
  );
}

function GearGroupAccordion({
  groupId,
  emoji,
  label,
  items,
  isOpen,
  onToggle,
  statuses,
  onCycleItem,
}: {
  groupId: GearDisplayGroupId;
  emoji: string;
  label: string;
  items: ResolvedGearItem[];
  isOpen: boolean;
  onToggle: () => void;
  statuses: Record<string, GearItemStatus>;
  onCycleItem: (itemId: string) => void;
}) {
  const missingCount = items.filter(
    (item) => (statuses[item.id] ?? "unset") === "missing",
  ).length;

  return (
    <div className="border-b border-stone-100 last:border-b-0 dark:border-stone-800">
      <button
        type="button"
        id={`gear-group-${groupId}`}
        aria-expanded={isOpen}
        aria-controls={`gear-group-panel-${groupId}`}
        onClick={onToggle}
        className="flex w-full items-center gap-3 py-3.5 text-start transition-colors"
      >
        <span className="text-lg" aria-hidden="true">
          {emoji}
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold text-stone-800 dark:text-stone-100">
          {label}
        </span>
        <span className="shrink-0 text-xs text-stone-400 dark:text-stone-500">
          {items.length} פריטים
          {missingCount > 0 ? ` · ${missingCount} חסר` : ""}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <div
        id={`gear-group-panel-${groupId}`}
        role="region"
        aria-labelledby={`gear-group-${groupId}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-0.5 pb-3">
            {items.map((item) => (
              <GearItemRow
                key={item.id}
                item={item}
                status={statuses[item.id] ?? "unset"}
                onCycle={() => onCycleItem(item.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function getDefaultOpenGroups(
  groupedItems: Map<GearDisplayGroupId, ResolvedGearItem[]>,
  statuses: Record<string, GearItemStatus>,
): Set<GearDisplayGroupId> {
  const open = new Set<GearDisplayGroupId>();

  for (const [groupId, items] of groupedItems) {
    const hasMissing = items.some(
      (item) => (statuses[item.id] ?? "unset") === "missing",
    );
    if (hasMissing) {
      open.add(groupId);
    }
  }

  return open;
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
  const [openGroups, setOpenGroups] = useState<Set<GearDisplayGroupId>>(
    () => new Set(),
  );

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
    () => groupItemsByDisplayGroup(checklist.items),
    [checklist.items],
  );

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setOpenGroups(getDefaultOpenGroups(groupedItems, displayState.items));
  }, [hydrated, trip.slug]);

  const motivation = useMemo(
    () => getReadinessMotivation(readiness, hydrated),
    [readiness, hydrated],
  );

  const checklistSummary = useMemo(() => {
    if (!hydrated) {
      return null;
    }

    return buildChecklistSummary(
      checklist.items,
      displayState.items,
      readiness,
    );
  }, [hydrated, checklist.items, displayState.items, readiness]);

  const canShareWhatsApp =
    checklistSummary !== null &&
    checklistSummary.have.length + checklistSummary.missing.length > 0;

  const whatsAppShareUrl = useMemo(() => {
    if (!canShareWhatsApp || !checklistSummary) {
      return null;
    }

    return buildWhatsAppShareUrl(
      formatChecklistSummaryForWhatsApp(checklistSummary),
    );
  }, [canShareWhatsApp, checklistSummary]);

  const handleCycleItem = useCallback(
    (itemId: string) => {
      setStorageState((current) => {
        const currentStatus = current.items[itemId] ?? "unset";
        const next = cycleGearItemStatus(currentStatus);
        return updateGearItemStatus(trip.slug, current, itemId, next);
      });
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

  const toggleGroup = useCallback((groupId: GearDisplayGroupId) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
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
      <p className="mb-1 text-base text-stone-600 dark:text-stone-400">
        רשימת ציוד מומלצת לפי סוג הטיול
      </p>
      <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">
        {AUTO_SAVE_NOTE}
      </p>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
        <div
          className="mb-5 rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-teal-50/50 p-4 dark:border-emerald-900/60 dark:from-emerald-950/40 dark:to-teal-950/20"
          role="status"
        >
          <p className="mb-1 text-sm font-semibold text-stone-700 dark:text-stone-200">
            🎒 מוכנות לטיול
          </p>
          <p className="mb-2 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            {displayPercent}%
          </p>
          <div
            className="mb-3 h-2 overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-700"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={displayPercent}
            aria-label="אחוז מוכנות לטיול"
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${displayPercent}%` }}
            />
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {motivation}
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-amber-200/70 bg-amber-50/40 px-3 py-3 dark:border-amber-900/40 dark:bg-amber-950/15">
          <p className="text-sm font-medium text-stone-800 dark:text-stone-100">
            🍳 בישול בשטח?
          </p>
          <div
            className="flex shrink-0 gap-1.5"
            role="group"
            aria-label="מתכננים לבשל בשטח"
          >
            {(["כן", "לא"] as const).map((label, index) => {
              const value = index === 0;
              const active = displayState.cookingPlans === value;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleCookingChange(value)}
                  aria-pressed={active}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                      : "bg-white/80 text-stone-600 hover:bg-white dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          {GEAR_DISPLAY_GROUPS.map((group) => {
            const items = groupedItems.get(group.id);
            if (!items?.length) {
              return null;
            }

            return (
              <GearGroupAccordion
                key={group.id}
                groupId={group.id}
                emoji={group.emoji}
                label={group.label}
                items={items}
                isOpen={openGroups.has(group.id)}
                onToggle={() => toggleGroup(group.id)}
                statuses={displayState.items}
                onCycleItem={handleCycleItem}
              />
            );
          })}
        </div>

        {hydrated && readiness.missingItems.length > 0 && (
          <div
            className="mb-4 rounded-xl border border-rose-200/70 bg-rose-50/40 px-3 py-3 dark:border-rose-900/40 dark:bg-rose-950/15"
            aria-live="polite"
          >
            <h3 className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-100">
              🛒 חסר לכם:
            </h3>
            <ul className="space-y-1.5">
              {readiness.missingItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300"
                >
                  <span className="text-rose-500 dark:text-rose-400">•</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          {canShareWhatsApp && whatsAppShareUrl ? (
            <a
              href={whatsAppShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#20BD5A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            >
              📲 שלחו לי את הרשימה לוואטסאפ
            </a>
          ) : (
            <div>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-xl bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-400 dark:bg-stone-800 dark:text-stone-500"
              >
                📲 שלחו לי את הרשימה לוואטסאפ
              </button>
              <p className="mt-2 text-center text-sm text-stone-500 dark:text-stone-400">
                סמנו לפחות פריט אחד כדי לשתף
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-medium text-stone-500 underline-offset-2 transition-colors hover:text-stone-700 hover:underline dark:text-stone-400 dark:hover:text-stone-200"
        >
          איפוס הרשימה
        </button>
      </div>
    </section>
  );
}
