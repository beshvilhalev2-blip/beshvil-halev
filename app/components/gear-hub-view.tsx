"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GearHubCard from "@/app/components/gear-hub-card";
import GearChecklistPanel, {
  type GearChecklistSection,
} from "@/app/components/gear-checklist-panel";
import {
  buildPresetChecklist,
  calculateReadiness,
  GEAR_PRIORITY_GROUPS,
  groupItemsByPriority,
  isGearPresetId,
  loadGearState,
  type GearPresetId,
} from "@/lib/gear-checklist";

const GEAR_CENTER = {
  eyebrow: "מרכז הציוד",
  title: "מרכז הציוד של בשביל הלב",
  subtitle:
    "רשימות ציוד חכמות לטיולים, קמפינג, שטח ובישול בטבע",
} as const;

const PRESET_CARDS: {
  id: GearPresetId;
  title: string;
  description: string;
  icon: "camping" | "day-trip" | "offroad" | "cooking";
  iconBg: string;
  accent: string;
  borderActive: string;
}[] = [
  {
    id: "camping",
    title: "קמפינג",
    description: "אוהל, שק שינה, תאורה וכל מה שצריך ללילה בשטח.",
    icon: "camping",
    iconBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    accent: "from-emerald-500/10 to-teal-600/5",
    borderActive:
      "border-emerald-300 dark:border-emerald-700 ring-1 ring-emerald-200/80 dark:ring-emerald-900/60",
  },
  {
    id: "day-trip",
    title: "יום טיול",
    description: "מים, כובע, נעליים נוחות וציוד בסיסי ליציאה קצרה.",
    icon: "day-trip",
    iconBg: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    accent: "from-sky-500/10 to-blue-600/5",
    borderActive:
      "border-sky-300 dark:border-sky-700 ring-1 ring-sky-200/80 dark:ring-sky-900/60",
  },
  {
    id: "offroad",
    title: "שטח 4x4",
    description: "בטיחות, ניווט, קומפרסור וכלים בסיסיים לרכב.",
    icon: "offroad",
    iconBg: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
    accent: "from-zinc-500/10 to-amber-700/5",
    borderActive:
      "border-zinc-400 dark:border-zinc-600 ring-1 ring-zinc-200/80 dark:ring-zinc-800/60",
  },
  {
    id: "cooking",
    title: "בישול בשטח",
    description: "גזייה, כלי אוכל, סיר, מחבת וקרש חיתוך.",
    icon: "cooking",
    iconBg:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    accent: "from-amber-500/10 to-orange-600/5",
    borderActive:
      "border-amber-300 dark:border-amber-700 ring-1 ring-amber-200/80 dark:ring-amber-900/60",
  },
];

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

function buildPresetSections(
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

function getPresetReadinessMap(): Record<GearPresetId, number> {
  const map = {} as Record<GearPresetId, number>;

  for (const card of PRESET_CARDS) {
    const checklist = buildPresetChecklist(card.id);
    const state = loadGearState(checklist.storageKey);
    map[card.id] = calculateReadiness(checklist.items, state.items).percent;
  }

  return map;
}

export default function GearHubView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetParam = searchParams.get("preset");

  const [activePreset, setActivePreset] = useState<GearPresetId | null>(() =>
    isGearPresetId(presetParam) ? presetParam : null,
  );
  const [readinessMap, setReadinessMap] = useState<
    Record<GearPresetId, number> | null
  >(null);

  const presetMeta = useMemo(() => {
    return PRESET_CARDS.map((card) => {
      const checklist = buildPresetChecklist(card.id);
      return {
        ...card,
        itemCount: checklist.items.length,
        storageKey: checklist.storageKey,
        items: checklist.items,
        sections: buildPresetSections(checklist.items),
      };
    });
  }, []);

  useEffect(() => {
    setReadinessMap(getPresetReadinessMap());
  }, [activePreset]);

  useEffect(() => {
    if (isGearPresetId(presetParam)) {
      setActivePreset(presetParam);
    } else if (presetParam === null) {
      setActivePreset(null);
    }
  }, [presetParam]);

  const handleTogglePreset = useCallback(
    (presetId: GearPresetId) => {
      setActivePreset((current) => {
        const next = current === presetId ? null : presetId;

        if (next) {
          router.replace(`/gear?preset=${next}`, { scroll: false });
        } else {
          router.replace("/gear", { scroll: false });
        }

        return next;
      });
    },
    [router],
  );

  return (
    <section className="bg-stone-50 px-4 pb-16 pt-28 dark:bg-stone-950 sm:px-6 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center sm:mb-10">
          <div className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 sm:size-16">
            <BackpackIcon />
          </div>

          <p className="mb-3 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
            {GEAR_CENTER.eyebrow}
          </p>

          <h1 className="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            {GEAR_CENTER.title}
          </h1>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
            {GEAR_CENTER.subtitle}
          </p>
        </header>

        <div className="space-y-3">
          {presetMeta.map((card) => (
            <div
              key={card.id}
              className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 dark:bg-stone-900 ${
                activePreset === card.id
                  ? card.borderActive
                  : "border-stone-200/80 dark:border-stone-800"
              }`}
            >
              <GearHubCard
                variant="preset"
                presetId={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                iconBg={card.iconBg}
                accent={card.accent}
                itemCount={card.itemCount}
                readinessPercent={
                  readinessMap ? readinessMap[card.id] : undefined
                }
                readinessHydrated={readinessMap !== null}
                isOpen={activePreset === card.id}
                cta="פתחי רשימה"
                onToggle={() => handleTogglePreset(card.id)}
              />

              {activePreset === card.id && (
                <div
                  id={`gear-checklist-${card.id}`}
                  className="border-t border-stone-100 px-1 pb-3 pt-1 dark:border-stone-800 sm:px-2 sm:pb-4 [&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent [&>div]:p-3 [&>div]:shadow-none sm:[&>div]:p-4"
                >
                  <GearChecklistPanel
                    storageKey={card.storageKey}
                    items={card.items}
                    sections={card.sections}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-center text-sm font-medium text-stone-500 dark:text-stone-400">
            רוצים רשימה מותאמת לטיול ספציפי?
          </p>
          <GearHubCard
            variant="link"
            title="בנה לי רשימת ציוד לפי טיול"
            description="בחרו טיול מתוך האתר וניצור לכם רשימה חכמה לפי סוג הטיול."
            icon="by-trip"
            iconBg="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            accent="from-emerald-500/15 to-emerald-600/10"
            borderHover="border-emerald-200/80 hover:border-emerald-300 dark:border-emerald-900/60 dark:hover:border-emerald-700"
            href="/recommendations"
            cta="בחרי טיול"
          />
        </div>
      </div>
    </section>
  );
}
