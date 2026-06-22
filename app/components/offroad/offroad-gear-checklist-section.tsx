"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import GearChecklistPanel, {
  GearChecklistWhatsAppShare,
  type GearChecklistSection,
} from "@/app/components/gear-checklist-panel";
import {
  buildChecklistSummary,
  buildPresetChecklist,
  buildWhatsAppShareUrl,
  calculateReadiness,
  formatChecklistSummaryForWhatsApp,
  GEAR_PRIORITY_GROUPS,
  groupItemsByPriority,
  loadGearState,
} from "@/lib/gear-checklist";
import {
  OffroadSectionHeader,
  offroadCard,
  offroadCardHover,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

function buildOffroadSections(
  items: ReturnType<typeof buildPresetChecklist>["items"],
): GearChecklistSection[] {
  const groupedItems = groupItemsByPriority(items);

  return GEAR_PRIORITY_GROUPS.flatMap((group) => {
    const groupItems = groupedItems.get(group.id);
    if (!groupItems?.length) {
      return [];
    }

    return [
      {
        id: group.id,
        emoji: group.emoji,
        label: group.label,
        items: groupItems,
      },
    ];
  });
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
      className={`size-5 shrink-0 text-stone-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function OffroadGearChecklistSection() {
  const [open, setOpen] = useState(true);
  const [shareRevision, setShareRevision] = useState(0);

  const checklist = useMemo(() => buildPresetChecklist("offroad"), []);
  const sections = useMemo(
    () => buildOffroadSections(checklist.items),
    [checklist.items],
  );

  const handleStateChange = useCallback(() => {
    setShareRevision((current) => current + 1);
  }, []);

  const { canShareWhatsApp, whatsAppShareUrl } = useMemo(() => {
    const state = loadGearState(checklist.storageKey);
    const readiness = calculateReadiness(checklist.items, state.items);
    const summary = buildChecklistSummary(
      checklist.items,
      state.items,
      readiness,
    );
    const canShare =
      summary.have.length + summary.missing.length > 0;

    return {
      canShareWhatsApp: canShare,
      whatsAppShareUrl: canShare
        ? buildWhatsAppShareUrl(formatChecklistSummaryForWhatsApp(summary))
        : null,
    };
  }, [checklist.items, checklist.storageKey, shareRevision]);

  useEffect(() => {
    if (!open) {
      return;
    }

    handleStateChange();
  }, [handleStateChange, open]);

  return (
    <section
      id="offroad-gear-checklist"
      className={`${offroadSectionShell} scroll-mt-24`}
    >
      <div className={offroadSectionInner}>
        <div className="mx-auto max-w-3xl">
          <OffroadSectionHeader
            title="צריכים עזרה עם רשימת ציוד?"
            subtitle="הכינו את כל מה שצריך לטיול שטח משפחתי בלחיצה אחת."
          />

          <div className="mb-4">
            <GearChecklistWhatsAppShare
              canShareWhatsApp={canShareWhatsApp}
              whatsAppShareUrl={whatsAppShareUrl}
            />
          </div>

          <div className={`${offroadCard} ${offroadCardHover} overflow-hidden`}>
            <button
              type="button"
              id="offroad-gear-checklist-trigger"
              aria-expanded={open}
              aria-controls="offroad-gear-checklist-panel"
              onClick={() => setOpen((current) => !current)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-right transition-colors hover:bg-stone-50/60 dark:hover:bg-stone-800/30 sm:px-5 sm:py-5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-stone-900 dark:text-stone-50">
                  {checklist.title}
                </p>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {checklist.items.length} פריטים · סמנו ✓ יש לי או ○ צריך להביא
                </p>
              </div>
              <ChevronIcon open={open} />
            </button>

            {open ? (
              <div
                id="offroad-gear-checklist-panel"
                role="region"
                aria-labelledby="offroad-gear-checklist-trigger"
                className="border-t border-stone-200/60 px-1 pb-3 pt-1 dark:border-stone-700/60 sm:px-2 sm:pb-4 [&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent [&>div]:p-3 [&>div]:shadow-none sm:[&>div]:p-4"
              >
                <GearChecklistPanel
                  storageKey={checklist.storageKey}
                  items={checklist.items}
                  sections={sections}
                  hideShareButton
                  onStateChange={handleStateChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
