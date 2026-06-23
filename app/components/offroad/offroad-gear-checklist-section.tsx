"use client";

import { useCallback, useMemo, useState } from "react";
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

export default function OffroadGearChecklistSection() {
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
    const canShare = summary.have.length + summary.missing.length > 0;

    return {
      canShareWhatsApp: canShare,
      whatsAppShareUrl: canShare
        ? buildWhatsAppShareUrl(formatChecklistSummaryForWhatsApp(summary))
        : null,
    };
  }, [checklist.items, checklist.storageKey, shareRevision]);

  return (
    <section
      id="offroad-gear-checklist"
      className={`${offroadSectionShell} scroll-mt-24`}
    >
      <div className={offroadSectionInner}>
        <div className="mx-auto max-w-3xl">
          <OffroadSectionHeader
            title="צריכים עזרה עם רשימת ציוד?"
            subtitle="סמנו מה יש לכם ומה חסר - הרשימה נשמרת אוטומטית."
          />

          <div className={`${offroadCard} overflow-hidden p-3 sm:p-4`}>
            <div className="mb-3 border-b border-stone-100 pb-3 dark:border-stone-800">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50 sm:text-base">
                {checklist.title}
              </h3>
              <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                {checklist.items.length} פריטים · לחצו על פריט לסימון ✓ או ✕
              </p>
            </div>

            <GearChecklistPanel
              storageKey={checklist.storageKey}
              items={checklist.items}
              sections={sections}
              compact
              embedded
              defaultExpandMode="first-only"
              showCountInLabel
              hideShareButton
              onStateChange={handleStateChange}
            />

            <div className="mt-4 border-t border-stone-100 pt-4 dark:border-stone-800">
              <p className="mb-2 text-center text-xs text-stone-500 dark:text-stone-400">
                סיימתם? שלחו את הרשימה לוואטסאפ
              </p>
              <GearChecklistWhatsAppShare
                canShareWhatsApp={canShareWhatsApp}
                whatsAppShareUrl={whatsAppShareUrl}
                prominent
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
