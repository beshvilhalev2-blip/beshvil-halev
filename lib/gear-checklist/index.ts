export { buildTripGearChecklist } from "@/lib/gear-checklist/match-gear";
export {
  appendCookingItems,
  COOKING_GEAR_ITEM_IDS,
  getCookingGearItems,
  mergeChecklistWithCooking,
  stripCookingStatuses,
} from "@/lib/gear-checklist/cooking";
export {
  AUTO_SAVE_NOTE,
  GEAR_HOMEPAGE_CTA,
  GEAR_SHARE,
  GEAR_STORAGE_KEY_PREFIX,
  GEAR_STORAGE_VERSION,
  PRIORITY_LABELS,
  PRIORITY_ORDER,
  PRIORITY_WEIGHT,
} from "@/lib/gear-checklist/constants";
export {
  buildGearChecklistSnapshot,
  buildWhatsAppShareUrl,
  formatChecklistSummaryForWhatsApp,
  formatGearChecklistForWhatsApp,
} from "@/lib/gear-checklist/export";
export {
  compareGearPackOrder,
  GEAR_PACK_LABELS,
  GEAR_PACK_ORDER,
  getGearPackLabel,
} from "@/lib/gear-checklist/packs";
export { calculateReadiness } from "@/lib/gear-checklist/readiness";
export {
  buildChecklistSummary,
  cycleGearItemStatus,
  getReadinessMotivation,
  type ChecklistSummary,
} from "@/lib/gear-checklist/readiness";
export {
  GEAR_DISPLAY_GROUPS,
  groupItemsByDisplayGroup,
  type GearDisplayGroup,
  type GearDisplayGroupId,
} from "@/lib/gear-checklist/display-groups";
export {
  clearGearState,
  loadGearState,
  saveGearState,
  updateCookingPlans,
  updateGearItemStatus,
} from "@/lib/gear-checklist/storage";
export type {
  GearAffiliateOffer,
  GearChecklistExportSnapshot,
  GearItem,
  GearItemStatus,
  GearPackId,
  GearPriority,
  GearShareChannel,
  GearVendorId,
  ReadinessResult,
  ResolvedGearItem,
  TripGearChecklist,
  TripGearStorageState,
} from "@/lib/gear-checklist/types";
