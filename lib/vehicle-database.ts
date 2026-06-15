/**
 * Vehicle catalog for the off-road trip matcher.
 * To add a brand: append a new entry to `vehicleBrands`.
 */
import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";

export type VehicleBodyType =
  | "sedan"
  | "crossover"
  | "suv"
  | "pickup"
  | "jeep";

export type VehicleModel = {
  id: string;
  name: string;
  category: VehicleCategoryId;
  bodyType: VehicleBodyType;
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
  year: number;
};

export type ResolvedVehicle = {
  brand: VehicleBrand;
  model: VehicleModel;
  year: number;
  label: string;
  labelHe: string;
  category: VehicleCategoryId;
};

export const YEAR_OPTIONS = Array.from({ length: 21 }, (_, index) => 2005 + index);

function yearsForModel(): number[] {
  return YEAR_OPTIONS;
}

export const vehicleBrands: VehicleBrand[] = [
  {
    id: "toyota",
    name: "Toyota",
    nameHe: "טויוטה",
    models: [
      {
        id: "rav4",
        name: "RAV4",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
      {
        id: "land-cruiser",
        name: "Land Cruiser",
        category: "serious_jeep",
        bodyType: "suv",
        years: yearsForModel(),
      },
      {
        id: "hilux",
        name: "Hilux",
        category: "real_4x4",
        bodyType: "pickup",
        years: yearsForModel(),
      },
    ],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    nameHe: "יונדאי",
    models: [
      {
        id: "tucson",
        name: "Tucson",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
    ],
  },
  {
    id: "subaru",
    name: "Subaru",
    nameHe: "סובארו",
    models: [
      {
        id: "forester",
        name: "Forester",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
      {
        id: "xv",
        name: "XV",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
    ],
  },
  {
    id: "suzuki",
    name: "Suzuki",
    nameHe: "סוזוקי",
    models: [
      {
        id: "jimny",
        name: "Jimny",
        category: "real_4x4",
        bodyType: "jeep",
        years: yearsForModel(),
      },
      {
        id: "vitara",
        name: "Vitara",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
    ],
  },
  {
    id: "jeep",
    name: "Jeep",
    nameHe: "ג'יפ",
    models: [
      {
        id: "wrangler",
        name: "Wrangler",
        category: "serious_jeep",
        bodyType: "jeep",
        years: yearsForModel(),
      },
      {
        id: "grand-cherokee",
        name: "Grand Cherokee",
        category: "real_4x4",
        bodyType: "suv",
        years: yearsForModel(),
      },
    ],
  },
  {
    id: "kia",
    name: "Kia",
    nameHe: "קיה",
    models: [
      {
        id: "picanto",
        name: "Picanto",
        category: "private_car",
        bodyType: "sedan",
        years: yearsForModel(),
      },
      {
        id: "sportage",
        name: "Sportage",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
    ],
  },
  {
    id: "mazda",
    name: "Mazda",
    nameHe: "מאזדה",
    models: [
      {
        id: "mazda-2",
        name: "2",
        category: "private_car",
        bodyType: "sedan",
        years: yearsForModel(),
      },
      {
        id: "mazda-3",
        name: "3",
        category: "private_car",
        bodyType: "sedan",
        years: yearsForModel(),
      },
      {
        id: "cx-5",
        name: "CX-5",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
    ],
  },
  {
    id: "nissan",
    name: "Nissan",
    nameHe: "ניסאן",
    models: [
      {
        id: "qashqai",
        name: "Qashqai",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
      {
        id: "x-trail",
        name: "X-Trail",
        category: "soft_suv",
        bodyType: "crossover",
        years: yearsForModel(),
      },
      {
        id: "patrol",
        name: "Patrol",
        category: "serious_jeep",
        bodyType: "suv",
        years: yearsForModel(),
      },
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
  return getModelsForBrand(brandId).find((model) => model.id === modelId);
}

export function getYearsForModel(brandId: string, modelId: string): number[] {
  const model = getModelById(brandId, modelId);
  return model?.years ?? [];
}

export function resolveVehicleSelection(
  selection: VehicleSelection,
): ResolvedVehicle | null {
  const brand = getBrandById(selection.brandId);
  const model = getModelById(selection.brandId, selection.modelId);

  if (!brand || !model || !model.years.includes(selection.year)) {
    return null;
  }

  return {
    brand,
    model,
    year: selection.year,
    label: `${brand.name} ${model.name} · ${selection.year}`,
    labelHe: `${brand.nameHe} ${model.name} · ${selection.year}`,
    category: model.category,
  };
}
