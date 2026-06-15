import type { TripVehicleAccess } from "@/data/trips";

export type GearPriority = "required" | "recommended" | "bonus";

export type GearPackId =
  | "essentials"
  | "water"
  | "family"
  | "offroad"
  | "picnic"
  | "camping"
  | "hot-day"
  | "winter-rain"
  | "cooking";

export type GearItemStatus = "unset" | "have" | "missing";

export type GearVendorId = string;

export type GearAffiliateOffer = {
  vendor: GearVendorId;
  vendorLabel: string;
  productName: string;
  productUrl: string;
  priceRange?: string;
  priority?: number;
  recommendedFor?: GearPackId[];
  locale?: "he" | "en";
};

export type GearItem = {
  id: string;
  label: string;
  pack: GearPackId;
  priority: GearPriority;
  sortOrder: number;
  minVehicleAccess?: TripVehicleAccess;
  affiliate?: GearAffiliateOffer[];
};

export type ResolvedGearItem = GearItem & {
  packLabel: string;
  priorityLabel: string;
};

export type TripGearChecklist = {
  tripSlug: string;
  items: ResolvedGearItem[];
  packs: GearPackId[];
};

export type TripGearStorageState = {
  version: 1;
  items: Record<string, GearItemStatus>;
  cookingPlans: boolean | null;
  updatedAt: string;
};

export type ReadinessResult = {
  percent: number;
  total: number;
  haveCount: number;
  missingCount: number;
  unsetCount: number;
  missingItems: ResolvedGearItem[];
};

export type GearChecklistExportSnapshot = {
  tripSlug: string;
  tripTitle: string;
  generatedAt: string;
  readinessPercent: number;
  cookingPlans: boolean;
  have: { label: string; priority: GearPriority }[];
  missing: { label: string; priority: GearPriority }[];
  packs: GearPackId[];
};

export type GearShareChannel = "whatsapp";
