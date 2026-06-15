import type { Trip } from "@/data/trips";
import { GEAR_SHARE } from "@/lib/gear-checklist/constants";
import type { ChecklistSummary } from "@/lib/gear-checklist/readiness";
import type {
  GearChecklistExportSnapshot,
  GearItemStatus,
  ReadinessResult,
  ResolvedGearItem,
  TripGearChecklist,
  TripGearStorageState,
} from "@/lib/gear-checklist/types";

const PRIORITY_RANK = {
  required: 0,
  recommended: 1,
  bonus: 2,
} as const;

function sortExportItems(
  items: ResolvedGearItem[],
  statuses: Record<string, GearItemStatus>,
  target: "have" | "missing",
): { label: string; priority: ResolvedGearItem["priority"] }[] {
  return items
    .filter((item) => (statuses[item.id] ?? "unset") === target)
    .sort(
      (a, b) =>
        PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] ||
        a.sortOrder - b.sortOrder,
    )
    .map((item) => ({ label: item.label, priority: item.priority }));
}

export function buildGearChecklistSnapshot(
  trip: Trip,
  checklist: TripGearChecklist,
  state: TripGearStorageState,
  readiness: ReadinessResult,
): GearChecklistExportSnapshot {
  return {
    tripSlug: trip.slug,
    tripTitle: trip.title,
    generatedAt: new Date().toISOString(),
    readinessPercent: readiness.percent,
    cookingPlans: state.cookingPlans === true,
    have: sortExportItems(checklist.items, state.items, "have"),
    missing: sortExportItems(checklist.items, state.items, "missing"),
    packs: checklist.packs,
  };
}

export function formatChecklistSummaryForWhatsApp(
  summary: ChecklistSummary,
): string {
  const lines: string[] = ["🎒 רשימת ציוד לטיול", ""];

  if (summary.have.length > 0) {
    lines.push("✅ יש לי:");
    for (const item of summary.have) {
      lines.push(`• ${item}`);
    }
    lines.push("");
  }

  if (summary.missing.length > 0) {
    lines.push("🛒 חסר לי:");
    for (const item of summary.missing) {
      lines.push(`• ${item}`);
    }
    lines.push("");
  }

  lines.push(`📍 נוצר באמצעות ${GEAR_SHARE.siteName}`);

  return lines.join("\n");
}

export function formatGearChecklistForWhatsApp(
  snapshot: GearChecklistExportSnapshot,
  tripUrl?: string,
): string {
  const lines: string[] = [
    `🎒 מוכנים לטיול? — ${snapshot.tripTitle}`,
    "",
    `אתם מוכנים ב־${snapshot.readinessPercent}% לטיול`,
    "",
  ];

  if (snapshot.missing.length > 0) {
    lines.push("חסר לכם:");
    for (const item of snapshot.missing) {
      lines.push(`• ${item.label}`);
    }
    lines.push("");
  }

  if (snapshot.have.length > 0) {
    lines.push("✅ יש לכם:");
    for (const item of snapshot.have) {
      lines.push(`• ${item.label}`);
    }
    lines.push("");
  }

  lines.push(`— ${GEAR_SHARE.siteName}`);

  if (tripUrl) {
    lines.push(tripUrl);
  }

  return lines.join("\n");
}

export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
