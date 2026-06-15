"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GearHubCard from "@/app/components/gear-hub-card";
import GearChecklistPanel, {
  type GearChecklistSection,
} from "@/app/components/gear-checklist-panel";
import {
  buildPresetChecklist,
  GEAR_HUB_OPTIONS,
  GEAR_LANDING_PAGE,
  GEAR_PRIORITY_GROUPS,
  groupItemsByPriority,
  isGearPresetId,
  type GearPresetId,
} from "@/lib/gear-checklist";

function BackpackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8"
      aria-hidden="true"
    >
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      <path d="M6 7h12l1 14H5L6 7Z" />
      <path d="M9 11h6" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function buildPresetSections(items: ReturnType<typeof buildPresetChecklist>["items"]): GearChecklistSection[] {
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

export default function GearHubView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetParam = searchParams.get("preset");
  const activePreset = isGearPresetId(presetParam) ? presetParam : null;

  const presetChecklist = useMemo(() => {
    if (!activePreset) {
      return null;
    }

    return buildPresetChecklist(activePreset);
  }, [activePreset]);

  const presetSections = useMemo(() => {
    if (!presetChecklist) {
      return [];
    }

    return buildPresetSections(presetChecklist.items);
  }, [presetChecklist]);

  const handleSelectPreset = useCallback(
    (presetId: GearPresetId) => {
      router.push(`/gear?preset=${presetId}`, { scroll: false });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router],
  );

  const handleBackToHub = useCallback(() => {
    router.push("/gear", { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  if (activePreset && presetChecklist) {
    return (
      <section className="bg-stone-50 px-6 pb-16 pt-32 dark:bg-stone-950 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={handleBackToHub}
            className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            <BackIcon />
            חזרה לרשימות ציוד
          </button>

          <div className="mb-8">
            <p className="mb-3 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
              {GEAR_LANDING_PAGE.eyebrow}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
              {presetChecklist.title}
            </h1>
          </div>

          <GearChecklistPanel
            storageKey={presetChecklist.storageKey}
            items={presetChecklist.items}
            sections={presetSections}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-stone-50 px-6 pb-16 pt-32 dark:bg-stone-950 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <BackpackIcon />
          </div>

          <p className="mb-4 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
            {GEAR_LANDING_PAGE.eyebrow}
          </p>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
            {GEAR_LANDING_PAGE.title}
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            {GEAR_LANDING_PAGE.subtitle}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GEAR_HUB_OPTIONS.map((option) => (
            <GearHubCard
              key={option.id}
              title={option.title}
              description={option.description}
              icon={option.icon}
              iconBg={option.iconBg}
              accent={option.accent}
              borderHover={option.borderHover}
              status={option.status}
              cta={option.cta}
              href={option.href}
              onSelect={
                option.id !== "by-trip" && option.status === "active"
                  ? () => handleSelectPreset(option.id as GearPresetId)
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
