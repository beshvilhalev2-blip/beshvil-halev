"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AUTO_SAVE_NOTE,
  buildChecklistSummary,
  buildWhatsAppShareUrl,
  calculateReadiness,
  clearGearState,
  cycleGearItemStatus,
  formatChecklistSummaryForWhatsApp,
  GEAR_STORAGE_VERSION,
  getReadinessMotivation,
  loadGearState,
  updateGearItemStatus,
  type GearItemStatus,
  type ResolvedGearItem,
  type TripGearStorageState,
} from "@/lib/gear-checklist";

export type GearChecklistSection = {
  id: string;
  emoji: string;
  label: string;
  items: ResolvedGearItem[];
};

function createInitialStorageState(): TripGearStorageState {
  return {
    version: GEAR_STORAGE_VERSION,
    items: {},
    cookingPlans: null,
    updatedAt: "",
  };
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

function StatusIndicator({
  status,
  compact = false,
}: {
  status: GearItemStatus;
  compact?: boolean;
}) {
  const sizeClass = compact ? "size-5 text-xs" : "size-6 text-sm";

  if (status === "have") {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 ${sizeClass}`}
        aria-hidden="true"
      >
        ✓
      </span>
    );
  }

  if (status === "missing") {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300 ${sizeClass}`}
        aria-hidden="true"
      >
        ✕
      </span>
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-stone-300 text-stone-400 dark:border-stone-600 dark:text-stone-500 ${sizeClass}`}
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
  compact = false,
}: {
  item: ResolvedGearItem;
  status: GearItemStatus;
  onCycle: () => void;
  compact?: boolean;
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
        aria-label={`${item.label} - ${statusLabel}`}
        aria-pressed={status !== "unset"}
        className={`flex w-full items-center gap-2.5 text-start transition-colors ${
          compact ? "min-h-9 rounded-md px-2 py-1.5" : "min-h-11 rounded-lg px-3 py-3"
        } ${rowClass}`}
      >
        <StatusIndicator status={status} compact={compact} />
        <span
          className={`min-w-0 flex-1 font-medium leading-snug ${
            compact ? "text-[13px]" : "text-sm"
          } ${
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
  compact = false,
  showCountInLabel = false,
}: {
  groupId: string;
  emoji: string;
  label: string;
  items: ResolvedGearItem[];
  isOpen: boolean;
  onToggle: () => void;
  statuses: Record<string, GearItemStatus>;
  onCycleItem: (itemId: string) => void;
  compact?: boolean;
  showCountInLabel?: boolean;
}) {
  const missingCount = items.filter(
    (item) => (statuses[item.id] ?? "unset") === "missing",
  ).length;

  const displayLabel = showCountInLabel
    ? `${label} (${items.length})`
    : label;

  return (
    <div className="border-b border-stone-100 last:border-b-0 dark:border-stone-800">
      <button
        type="button"
        id={`gear-group-${groupId}`}
        aria-expanded={isOpen}
        aria-controls={`gear-group-panel-${groupId}`}
        onClick={onToggle}
        className={`flex w-full items-center gap-2.5 text-start transition-colors ${
          compact ? "min-h-10 py-2" : "min-h-12 gap-3 py-3.5"
        }`}
      >
        <span className={compact ? "text-base" : "text-lg"} aria-hidden="true">
          {emoji}
        </span>
        <span
          className={`min-w-0 flex-1 font-semibold text-stone-800 dark:text-stone-100 ${
            compact ? "text-[13px]" : "text-sm"
          }`}
        >
          {displayLabel}
        </span>
        {!showCountInLabel ? (
          <span className="shrink-0 text-xs text-stone-400 dark:text-stone-500">
            {items.length} פריטים
            {missingCount > 0 ? ` · ${missingCount} חסר` : ""}
          </span>
        ) : missingCount > 0 ? (
          <span className="shrink-0 text-[11px] text-rose-500 dark:text-rose-400">
            {missingCount} חסר
          </span>
        ) : null}
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
          <ul className={compact ? "pb-2" : "space-y-0.5 pb-3"}>
            {items.map((item) => (
              <GearItemRow
                key={item.id}
                item={item}
                status={statuses[item.id] ?? "unset"}
                onCycle={() => onCycleItem(item.id)}
                compact={compact}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export type GearDefaultExpandMode = "first-only" | "missing";

function getDefaultOpenGroups(
  sections: GearChecklistSection[],
  statuses: Record<string, GearItemStatus>,
  mode: GearDefaultExpandMode = "missing",
): Set<string> {
  if (mode === "first-only") {
    const first = sections[0];
    return first ? new Set([first.id]) : new Set();
  }

  const open = new Set<string>();

  for (const section of sections) {
    const hasMissing = section.items.some(
      (item) => (statuses[item.id] ?? "unset") === "missing",
    );
    if (hasMissing) {
      open.add(section.id);
    }
  }

  return open;
}

type GearChecklistPanelProps = {
  storageKey: string;
  items: ResolvedGearItem[];
  sections: GearChecklistSection[];
  cookingToggle?: {
    plans: boolean | null;
    onChange: (cookingPlans: boolean) => void;
  };
  onReset?: () => void;
  onStateChange?: () => void;
  hideShareButton?: boolean;
  compact?: boolean;
  embedded?: boolean;
  defaultExpandMode?: GearDefaultExpandMode;
  showCountInLabel?: boolean;
};

export function GearChecklistWhatsAppShare({
  whatsAppShareUrl,
  canShareWhatsApp,
  prominent = false,
}: {
  whatsAppShareUrl: string | null;
  canShareWhatsApp: boolean;
  prominent?: boolean;
}) {
  const buttonClass = prominent
    ? "flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] transition-all hover:bg-[#20BD5A] hover:shadow-[0_10px_28px_-8px_rgba(37,211,102,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    : "flex min-h-11 w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#20BD5A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]";

  const disabledClass = prominent
    ? "flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-stone-200 px-5 py-3 text-base font-semibold text-stone-400 dark:bg-stone-800 dark:text-stone-500"
    : "flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-xl bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-400 dark:bg-stone-800 dark:text-stone-500";

  return (
    <div>
      {canShareWhatsApp && whatsAppShareUrl ? (
        <a
          href={whatsAppShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          📲 שלחו לי את הרשימה לוואטסאפ
        </a>
      ) : (
        <div>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className={disabledClass}
          >
            📲 שלחו לי את הרשימה לוואטסאפ
          </button>
          <p
            className={`text-center text-stone-500 dark:text-stone-400 ${
              prominent ? "mt-2 text-sm" : "mt-2 text-sm"
            }`}
          >
            סמנו לפחות פריט אחד כדי לשתף
          </p>
        </div>
      )}
    </div>
  );
}

export default function GearChecklistPanel({
  storageKey,
  items,
  sections,
  cookingToggle,
  onReset,
  onStateChange,
  hideShareButton = false,
  compact = false,
  embedded = false,
  defaultExpandMode = "missing",
  showCountInLabel = false,
}: GearChecklistPanelProps) {
  const [storageState, setStorageState] = useState<TripGearStorageState>(
    createInitialStorageState,
  );
  const [hydrated, setHydrated] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setStorageState(loadGearState(storageKey));
    setHydrated(true);
  }, [storageKey]);

  const displayState = hydrated ? storageState : createInitialStorageState();

  const readiness = useMemo(
    () => calculateReadiness(items, displayState.items),
    [items, displayState.items],
  );

  const displayPercent = hydrated ? readiness.percent : 0;

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setOpenGroups(
      getDefaultOpenGroups(sections, displayState.items, defaultExpandMode),
    );
  }, [hydrated, storageKey, defaultExpandMode, sections]);

  const motivation = useMemo(
    () => getReadinessMotivation(readiness, hydrated),
    [readiness, hydrated],
  );

  const checklistSummary = useMemo(() => {
    if (!hydrated) {
      return null;
    }

    return buildChecklistSummary(items, displayState.items, readiness);
  }, [hydrated, items, displayState.items, readiness]);

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
        const updated = updateGearItemStatus(storageKey, current, itemId, next);
        onStateChange?.();
        return updated;
      });
    },
    [onStateChange, storageKey],
  );

  const handleReset = useCallback(() => {
    setStorageState(clearGearState(storageKey));
    onStateChange?.();
    onReset?.();
  }, [onReset, onStateChange, storageKey]);

  const toggleGroup = useCallback((groupId: string) => {
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

  if (items.length === 0) {
    return null;
  }

  const shellClass = embedded
    ? ""
    : compact
      ? "rounded-xl border border-stone-200/70 bg-white p-3 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-4"
      : "rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6";

  return (
    <div className={shellClass}>
      <p
        className={`text-stone-500 dark:text-stone-400 ${
          compact ? "mb-2 text-xs" : "mb-4 text-sm"
        }`}
      >
        {AUTO_SAVE_NOTE}
      </p>

      {compact ? (
        <div
          className="mb-3 rounded-lg border border-emerald-200/70 bg-emerald-50/60 px-3 py-2 dark:border-emerald-900/50 dark:bg-emerald-950/25"
          role="status"
        >
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
              🎒 מוכנות
            </p>
            <p className="text-xl font-bold tabular-nums text-stone-900 dark:text-stone-50">
              {displayPercent}%
            </p>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-700"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={displayPercent}
            aria-label="אחוז מוכנות"
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${displayPercent}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400">
            {motivation}
          </p>
        </div>
      ) : (
        <div
          className="mb-5 rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-teal-50/50 p-4 dark:border-emerald-900/60 dark:from-emerald-950/40 dark:to-teal-950/20"
          role="status"
        >
          <p className="mb-1 text-sm font-semibold text-stone-700 dark:text-stone-200">
            🎒 מוכנות
          </p>
          <p className="mb-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            {displayPercent}%
          </p>
          <div
            className="mb-3 h-2 overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-700"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={displayPercent}
            aria-label="אחוז מוכנות"
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
      )}

      {cookingToggle && (
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
              const active = cookingToggle.plans === value;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => cookingToggle.onChange(value)}
                  aria-pressed={active}
                  className={`min-h-11 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
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
      )}

      <div className={compact ? "mb-3" : "mb-4"}>
        {sections.map((section) => (
          <GearGroupAccordion
            key={section.id}
            groupId={section.id}
            emoji={section.emoji}
            label={section.label}
            items={section.items}
            isOpen={openGroups.has(section.id)}
            onToggle={() => toggleGroup(section.id)}
            statuses={displayState.items}
            onCycleItem={handleCycleItem}
            compact={compact}
            showCountInLabel={showCountInLabel}
          />
        ))}
      </div>

      {hydrated && readiness.missingItems.length > 0 && (
        <div
          className={`rounded-lg border border-rose-200/70 bg-rose-50/40 dark:border-rose-900/40 dark:bg-rose-950/15 ${
            compact ? "mb-3 px-2.5 py-2" : "mb-4 rounded-xl px-3 py-3"
          }`}
          aria-live="polite"
        >
          <h3
            className={`font-semibold text-stone-800 dark:text-stone-100 ${
              compact ? "mb-1 text-xs" : "mb-2 text-sm"
            }`}
          >
            🛒 חסר לכם:
          </h3>
          <ul className={compact ? "space-y-0.5" : "space-y-1.5"}>
            {readiness.missingItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-center gap-2 text-stone-700 dark:text-stone-300 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                <span className="text-rose-500 dark:text-rose-400">•</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hideShareButton ? (
        <div className="mb-4">
          <GearChecklistWhatsAppShare
            canShareWhatsApp={canShareWhatsApp}
            whatsAppShareUrl={whatsAppShareUrl}
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleReset}
        className={`inline-flex items-center font-medium text-stone-500 underline-offset-2 transition-colors hover:text-stone-700 hover:underline dark:text-stone-400 dark:hover:text-stone-200 ${
          compact ? "min-h-9 text-xs" : "min-h-11 text-sm"
        }`}
      >
        איפוס הרשימה
      </button>
    </div>
  );
}
