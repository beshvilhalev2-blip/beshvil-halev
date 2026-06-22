/**
 * Local vehicle catalog for off-road compatibility checks.
 * To add a vehicle: append make → model with category + optional tripCategory override.
 */
import type { VehicleCompatibilityCategory } from "@/lib/vehicle-compatibility";
import {
  getCompatibilityCategoryInfo,
  getTripCategoryForCompatibility,
} from "@/lib/vehicle-compatibility";
import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";

export type VehicleModel = {
  id: string;
  name: string;
  label: string;
  category: VehicleCompatibilityCategory;
  /** Overrides default trip-access mapping when finer control is needed. */
  tripCategory?: VehicleCategoryId;
  years: number[];
};

export type VehicleBrand = {
  id: string;
  name: string;
  nameHe: string;
  models: VehicleModel[];
};

export type VehicleSelection = {
  brandId: string;
  modelId: string;
  year?: number;
};

export type ResolvedVehicle = {
  brand: VehicleBrand;
  model: VehicleModel;
  year?: number;
  label: string;
  labelHe: string;
  category: VehicleCompatibilityCategory;
  categoryLabel: string;
  tripCategory: VehicleCategoryId;
};

export const YEAR_OPTIONS = Array.from({ length: 21 }, (_, index) => 2005 + index);

function yearsForModel(): number[] {
  return YEAR_OPTIONS;
}

function model(
  id: string,
  name: string,
  category: VehicleCompatibilityCategory,
  tripCategory?: VehicleCategoryId,
): VehicleModel {
  return {
    id,
    name,
    label: name,
    category,
    tripCategory,
    years: yearsForModel(),
  };
}

export const vehicleBrands: VehicleBrand[] = [
  {
    id: "toyota",
    name: "Toyota",
    nameHe: "טויוטה",
    models: [
      model("rav4", "RAV4", "softroad"),
      model("land-cruiser", "Land Cruiser", "offroad", "serious_jeep"),
      model("hilux", "Hilux", "offroad"),
      model("corolla", "Corolla", "privateCar"),
      model("yaris", "Yaris", "privateCar"),
      model("c-hr", "C-HR", "privateCar"),
    ],
  },
  {
    id: "subaru",
    name: "Subaru",
    nameHe: "סובארו",
    models: [
      model("forester", "Forester", "offroad"),
      model("xv-crosstrek", "XV / Crosstrek", "softroad"),
      model("outback", "Outback", "softroad"),
      model("impreza", "Impreza", "privateCar"),
    ],
  },
  {
    id: "suzuki",
    name: "Suzuki",
    nameHe: "סוזוקי",
    models: [
      model("jimny", "Jimny", "offroad"),
      model("grand-vitara", "Grand Vitara", "offroad"),
      model("vitara", "Vitara", "softroad"),
      model("swift", "Swift", "privateCar"),
    ],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    nameHe: "יונדאי",
    models: [
      model("tucson", "Tucson", "softroad"),
      model("santa-fe", "Santa Fe", "softroad"),
      model("kona", "Kona", "privateCar"),
      model("i10", "i10", "privateCar"),
      model("i20", "i20", "privateCar"),
      model("i30", "i30", "privateCar"),
      model("elantra", "Elantra", "privateCar"),
    ],
  },
  {
    id: "kia",
    name: "Kia",
    nameHe: "קיה",
    models: [
      model("sportage", "Sportage", "softroad"),
      model("sorento", "Sorento", "softroad"),
      model("niro", "Niro", "privateCar"),
      model("picanto", "Picanto", "privateCar"),
      model("ceed", "Ceed", "privateCar"),
    ],
  },
  {
    id: "nissan",
    name: "Nissan",
    nameHe: "ניסאן",
    models: [
      model("x-trail", "X-Trail", "softroad"),
      model("qashqai", "Qashqai", "softroad"),
      model("juke", "Juke", "privateCar"),
      model("micra", "Micra", "privateCar"),
      model("patrol", "Patrol", "offroad", "serious_jeep"),
    ],
  },
  {
    id: "mitsubishi",
    name: "Mitsubishi",
    nameHe: "מיצובישי",
    models: [
      model("pajero", "Pajero", "offroad"),
      model("outlander", "Outlander", "softroad"),
      model("asx", "ASX", "softroad"),
      model("attrage", "Attrage", "privateCar"),
    ],
  },
  {
    id: "dacia",
    name: "Dacia",
    nameHe: "דאצ'יה",
    models: [model("duster", "Duster", "softroad")],
  },
  {
    id: "jeep",
    name: "Jeep",
    nameHe: "ג'יפ",
    models: [
      model("wrangler", "Wrangler", "offroad", "serious_jeep"),
      model("grand-cherokee", "Grand Cherokee", "offroad"),
      model("compass", "Compass", "softroad"),
      model("renegade", "Renegade", "softroad"),
    ],
  },
  {
    id: "mazda",
    name: "Mazda",
    nameHe: "מאזדה",
    models: [
      model("cx-5", "CX-5", "softroad"),
      model("cx-30", "CX-30", "privateCar"),
      model("mazda-3", "3", "privateCar"),
      model("mazda-2", "2", "privateCar"),
    ],
  },
  {
    id: "skoda",
    name: "Skoda",
    nameHe: "סקודה",
    models: [
      model("kodiaq", "Kodiaq", "softroad"),
      model("karog", "Karoq", "softroad"),
      model("octavia", "Octavia", "privateCar"),
      model("fabia", "Fabia", "privateCar"),
    ],
  },
];

export function getVehicleBrands(): VehicleBrand[] {
  return vehicleBrands;
}

export function getBrandById(brandId: string): VehicleBrand | undefined {
  return vehicleBrands.find((brand) => brand.id === brandId);
}

export function getModelsForBrand(brandId: string): VehicleModel[] {
  return getBrandById(brandId)?.models ?? [];
}

export function getModelById(
  brandId: string,
  modelId: string,
): VehicleModel | undefined {
  return getModelsForBrand(brandId).find((item) => item.id === modelId);
}

export function getYearsForModel(brandId: string, modelId: string): number[] {
  const item = getModelById(brandId, modelId);
  return item?.years ?? [];
}

export function resolveVehicleSelection(
  selection: VehicleSelection,
): ResolvedVehicle | null {
  const brand = getBrandById(selection.brandId);
  const item = getModelById(selection.brandId, selection.modelId);

  if (!brand || !item) {
    return null;
  }

  if (
    selection.year !== undefined &&
    !item.years.includes(selection.year)
  ) {
    return null;
  }

  const yearSuffix =
    selection.year !== undefined ? ` · ${selection.year}` : "";
  const tripCategory = getTripCategoryForCompatibility(
    item.category,
    item.tripCategory,
  );

  return {
    brand,
    model: item,
    year: selection.year,
    label: `${brand.name} ${item.name}${yearSuffix}`,
    labelHe: `${brand.nameHe} ${item.name}${yearSuffix}`,
    category: item.category,
    categoryLabel: getCompatibilityCategoryInfo(item.category).label,
    tripCategory,
  };
}
