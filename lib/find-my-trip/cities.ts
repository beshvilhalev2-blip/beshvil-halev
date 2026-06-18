/** Hebrew region titles as used in trip.region and travel-time matching. */
export type RegionTitle = "צפון" | "השרון" | "מרכז" | "ירושלים" | "דרום";

export const ISRAEL_CITIES = [
  {
    id: "tel-aviv",
    label: "תל אביב",
    lat: 32.0853,
    lng: 34.7818,
    group: "מרכז",
    regions: ["מרכז", "צפון", "ירושלים", "דרום"],
  },
  {
    id: "rishon",
    label: "ראשון לציון",
    lat: 31.973,
    lng: 34.7925,
    group: "מרכז",
    regions: ["מרכז", "דרום", "ירושלים", "צפון"],
  },
  {
    id: "holon",
    label: "חולון",
    lat: 32.0103,
    lng: 34.7795,
    group: "מרכז",
    regions: ["מרכז", "דרום", "ירושלים", "צפון"],
  },
  {
    id: "bat-yam",
    label: "בת ים",
    lat: 32.0178,
    lng: 34.7516,
    group: "מרכז",
    regions: ["מרכז", "דרום", "ירושלים", "צפון"],
  },
  {
    id: "ramat-gan",
    label: "רמת גן",
    lat: 32.0684,
    lng: 34.8248,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "צפון", "דרום"],
  },
  {
    id: "givatayim",
    label: "גבעתיים",
    lat: 32.0702,
    lng: 34.8124,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "צפון", "דרום"],
  },
  {
    id: "bnei-brak",
    label: "בני ברק",
    lat: 32.0807,
    lng: 34.8338,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "צפון", "דרום"],
  },
  {
    id: "petah-tikva",
    label: "פתח תקווה",
    lat: 32.0889,
    lng: 34.8878,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "צפון", "דרום"],
  },
  {
    id: "rosh-haayin",
    label: "ראש העין",
    lat: 32.0956,
    lng: 34.9568,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "צפון", "דרום"],
  },
  {
    id: "or-yehuda",
    label: "אור יהודה",
    lat: 32.0297,
    lng: 34.8562,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "דרום", "צפון"],
  },
  {
    id: "rehovot",
    label: "רחובות",
    lat: 31.8947,
    lng: 34.8096,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "דרום", "צפון"],
  },
  {
    id: "ramla",
    label: "רמלה",
    lat: 31.9321,
    lng: 34.8733,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "דרום", "צפון"],
  },
  {
    id: "lod",
    label: "לוד",
    lat: 31.9514,
    lng: 34.8952,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "דרום", "צפון"],
  },
  {
    id: "yavne",
    label: "יבנה",
    lat: 31.8781,
    lng: 34.7397,
    group: "מרכז",
    regions: ["מרכז", "דרום", "ירושלים", "צפון"],
  },
  {
    id: "modiin",
    label: "מודיעין",
    lat: 31.8938,
    lng: 35.015,
    group: "מרכז",
    regions: ["מרכז", "ירושלים", "דרום", "צפון"],
  },
  {
    id: "raanana",
    label: "רעננה",
    lat: 32.1848,
    lng: 34.8714,
    group: "מרכז",
    regions: ["השרון", "מרכז", "צפון", "ירושלים", "דרום"],
  },
  {
    id: "hod-hasharon",
    label: "הוד השרון",
    lat: 32.1596,
    lng: 34.9198,
    group: "מרכז",
    regions: ["השרון", "מרכז", "צפון", "ירושלים", "דרום"],
  },
  {
    id: "kfar-saba",
    label: "כפר סבא",
    lat: 32.175,
    lng: 34.9069,
    group: "מרכז",
    regions: ["השרון", "מרכז", "צפון", "ירושלים", "דרום"],
  },
  {
    id: "herzliya",
    label: "הרצליה",
    lat: 32.1624,
    lng: 34.8447,
    group: "מרכז",
    regions: ["השרון", "מרכז", "צפון", "ירושלים", "דרום"],
  },
  {
    id: "netanya",
    label: "נתניה",
    lat: 32.3215,
    lng: 34.8532,
    group: "מרכז",
    regions: ["השרון", "מרכז", "צפון", "ירושלים", "דרום"],
  },
  {
    id: "hadera",
    label: "חדרה",
    lat: 32.434,
    lng: 34.9195,
    group: "מרכז",
    regions: ["השרון", "מרכז", "צפון", "ירושלים", "דרום"],
  },
  {
    id: "haifa",
    label: "חיפה",
    lat: 32.794,
    lng: 34.9896,
    group: "צפון",
    regions: ["צפון", "מרכז", "ירושלים", "דרום"],
  },
  {
    id: "akko",
    label: "עכו",
    lat: 32.926,
    lng: 35.0837,
    group: "צפון",
    regions: ["צפון", "מרכז", "ירושלים", "דרום"],
  },
  {
    id: "nahariya",
    label: "נהריה",
    lat: 33.0089,
    lng: 35.0981,
    group: "צפון",
    regions: ["צפון", "מרכז", "ירושלים", "דרום"],
  },
  {
    id: "kiryat-shmona",
    label: "קרית שמונה",
    lat: 33.2079,
    lng: 35.5702,
    group: "צפון",
    regions: ["צפון", "מרכז", "ירושלים", "דרום"],
  },
  {
    id: "safed",
    label: "צפת",
    lat: 32.9646,
    lng: 35.496,
    group: "צפון",
    regions: ["צפון", "מרכז", "ירושלים", "דרום"],
  },
  {
    id: "tiberias",
    label: "טבריה",
    lat: 32.7956,
    lng: 35.5308,
    group: "צפון",
    regions: ["צפון", "מרכז", "ירושלים", "דרום"],
  },
  {
    id: "afula",
    label: "עפולה",
    lat: 32.6091,
    lng: 35.2896,
    group: "צפון",
    regions: ["צפון", "מרכז", "ירושלים", "דרום"],
  },
  {
    id: "carmiel",
    label: "כרמיאל",
    lat: 32.9193,
    lng: 35.303,
    group: "צפון",
    regions: ["צפון", "מרכז", "ירושלים", "דרום"],
  },
  {
    id: "jerusalem",
    label: "ירושלים",
    lat: 31.7683,
    lng: 35.2137,
    group: "ירושלים",
    regions: ["ירושלים", "מרכז", "דרום", "צפון"],
  },
  {
    id: "beit-shemesh",
    label: "בית שמש",
    lat: 31.747,
    lng: 34.9885,
    group: "ירושלים",
    regions: ["ירושלים", "מרכז", "דרום", "צפון"],
  },
  {
    id: "maale-adumim",
    label: "מעלה אדומים",
    lat: 31.7774,
    lng: 35.2985,
    group: "ירושלים",
    regions: ["ירושלים", "מרכז", "דרום", "צפון"],
  },
  {
    id: "beer-sheva",
    label: "באר שבע",
    lat: 31.2518,
    lng: 34.7913,
    group: "דרום",
    regions: ["דרום", "מרכז", "ירושלים", "צפון"],
  },
  {
    id: "ashdod",
    label: "אשדוד",
    lat: 31.8044,
    lng: 34.6553,
    group: "דרום",
    regions: ["דרום", "מרכז", "ירושלים", "צפון"],
  },
  {
    id: "ashkelon",
    label: "אשקלון",
    lat: 31.6688,
    lng: 34.5743,
    group: "דרום",
    regions: ["דרום", "מרכז", "ירושלים", "צפון"],
  },
  {
    id: "kiryat-gat",
    label: "קרית גת",
    lat: 31.61,
    lng: 34.7642,
    group: "דרום",
    regions: ["דרום", "מרכז", "ירושלים", "צפון"],
  },
  {
    id: "ofakim",
    label: "אופקים",
    lat: 31.3147,
    lng: 34.6203,
    group: "דרום",
    regions: ["דרום", "מרכז", "ירושלים", "צפון"],
  },
  {
    id: "dimona",
    label: "דימונה",
    lat: 31.0686,
    lng: 35.0336,
    group: "דרום",
    regions: ["דרום", "מרכז", "ירושלים", "צפון"],
  },
  {
    id: "arad",
    label: "ערד",
    lat: 31.2589,
    lng: 35.2144,
    group: "דרום",
    regions: ["דרום", "מרכז", "ירושלים", "צפון"],
  },
  {
    id: "eilat",
    label: "אילת",
    lat: 29.5577,
    lng: 34.9519,
    group: "דרום",
    regions: ["דרום", "מרכז", "ירושלים", "צפון"],
  },
] as const;

export type CityId = (typeof ISRAEL_CITIES)[number]["id"];
export type CityDefinition = (typeof ISRAEL_CITIES)[number];

const cityById = new Map<string, CityDefinition>(
  ISRAEL_CITIES.map((city) => [city.id, city]),
);

export const CITY_GROUP_ORDER: RegionTitle[] = [
  "מרכז",
  "השרון",
  "צפון",
  "ירושלים",
  "דרום",
];

export function getCityDefinition(cityId: CityId): CityDefinition {
  const city = cityById.get(cityId);
  if (!city) {
    throw new Error(`Unknown city id: ${cityId}`);
  }
  return city;
}

export function getCityLabel(cityId: CityId): string {
  return getCityDefinition(cityId).label;
}

export function getCityRegionProximity(cityId: CityId): RegionTitle[] {
  return [...getCityDefinition(cityId).regions];
}

export function getCitiesGroupedByRegion(): {
  group: RegionTitle;
  cities: CityDefinition[];
}[] {
  return CITY_GROUP_ORDER.map((group) => ({
    group,
    cities: ISRAEL_CITIES.filter((city) => city.group === group),
  })).filter((section) => section.cities.length > 0);
}
