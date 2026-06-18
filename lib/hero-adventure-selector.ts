import type { Trip } from "@/data/trips";

export type AdventureCategoryId =
  | "water"
  | "camping"
  | "offroad"
  | "stroller"
  | "viewpoints"
  | "coffee";

export type AdventureDestination = {
  slug: string;
  title: string;
  image?: string;
};

export type AdventureCategoryData = {
  id: AdventureCategoryId;
  emoji: string;
  label: string;
  tagline: string;
  featured: AdventureDestination | null;
  destinations: AdventureDestination[];
};

type CategoryDefinition = {
  id: AdventureCategoryId;
  emoji: string;
  label: string;
  tagline: string;
  match: (trip: Trip) => boolean;
  preferredSlugs?: string[];
  preferredTitleIncludes?: string[];
};

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: "water",
    emoji: "🌊",
    label: "מים",
    tagline: "מעיינות, נחלים ובריכות טבעיות לכל המשפחה",
    preferredSlugs: ["ein-moda", "nahal-hashofet", "ein-bokek", "sataf", "nitzanim-lake"],
    preferredTitleIncludes: ["עין מודע", "עין שוקק", "עין ירקעם", "מעיין"],
    match: (trip) =>
      trip.matcher?.activities?.includes("water") === true ||
      /מים|מעיין|חוף|נחל|בריכ|אגם/.test(`${trip.category} ${trip.title} ${trip.subtitle}`),
  },
  {
    id: "camping",
    emoji: "🏕️",
    label: "קמפינג",
    tagline: "לילה בטבע, מדורות ושמיים פתוחים",
    preferredSlugs: ["ben-shemen-forest", "ein-bokek", "nitzanim-lake"],
    preferredTitleIncludes: ["חניון", "קמפינג", "לינה"],
    match: (trip) =>
      trip.matcher?.activities?.includes("camping") === true ||
      /קמפינג|חניון|לינה|אוהל/.test(`${trip.title} ${trip.subtitle} ${trip.about.join(" ")}`),
  },
  {
    id: "offroad",
    emoji: "🚙",
    label: "4x4",
    tagline: "שבילים, תצפיות והרפתקאות מחוץ לאספלט",
    preferredSlugs: ["ben-shemen-forest", "ein-bokek"],
    preferredTitleIncludes: ["נחל צין", "מכתש רמון", "הר כרכום", "עין גדי", "חרמון", "מדבר"],
    match: (trip) =>
      trip.category === "שטח 4x4" ||
      trip.vehicleAccess === "soft-suv" ||
      trip.vehicleAccess === "real-4x4" ||
      trip.vehicleAccess === "hard-4x4" ||
      /4x4|שטח|עפר/.test(`${trip.category} ${trip.title} ${trip.subtitle}`),
  },
  {
    id: "stroller",
    emoji: "👶",
    label: "נגיש לעגלות",
    tagline: "שבילים נוחים, צל וגישה קלה עם ילדים קטנים",
    preferredSlugs: ["ein-moda", "nitzanim-lake", "sataf"],
    preferredTitleIncludes: ["נחל דן", "נגיש", "משפחתי"],
    match: (trip) =>
      trip.highlights?.some((item) => /עגל|נגיש|משפח/.test(item)) === true ||
      (trip.matcher?.activities?.includes("easy-trails") === true &&
        trip.matcher?.companions?.includes("kids") === true &&
        trip.matcher?.activities?.includes("water") !== true) ||
      (trip.matcher?.activities?.includes("easy-trails") === true &&
        trip.matcher?.activities?.includes("water") === true &&
        trip.matcher?.companions?.includes("family") === true),
  },
  {
    id: "viewpoints",
    emoji: "🌄",
    label: "תצפיות",
    tagline: "נקודות תצפית, שקיעות ונופים ששווה לעצור בהם",
    preferredSlugs: ["nahal-sorek-estuary", "ben-shemen-forest", "mtzph-rbl"],
    preferredTitleIncludes: ["מצפה", "נוף", "תצפ"],
    match: (trip) =>
      trip.matcher?.activities?.includes("viewpoint") === true ||
      /תצפ|מצפה|נוף|שקיע/.test(`${trip.category} ${trip.title} ${trip.subtitle}`),
  },
  {
    id: "coffee",
    emoji: "☕",
    label: "עגלות קפה",
    tagline: "קפה טוב, נוף יפה ורגע של שקט בטבע",
    preferredSlugs: ["sataf", "ein-moda", "nitzanim-lake", "brykt-rm-msdh"],
    preferredTitleIncludes: ["קפה", "מסעד", "בריכת רם"],
    match: (trip) =>
      /קפה|מסעד|בית קפה|עגלת/.test(
        `${trip.title} ${trip.subtitle} ${trip.about.join(" ")} ${trip.personalStory.join(" ")}`,
      ) || trip.matcher?.activities?.includes("picnic") === true,
  },
];

function tripRank(trip: Trip, preferredSlugs: string[] | undefined): number {
  const publishedRank = trip.status === "needs-content" ? 1 : 0;
  const preferredRank = preferredSlugs?.includes(trip.slug) ? 0 : 1;
  const featuredRank = trip.featured ? 0 : 1;
  return publishedRank * 100 + preferredRank * 10 + featuredRank;
}

function tripThumbnail(trip: Trip): string | undefined {
  if (trip.heroImage) return trip.heroImage;
  return trip.gallery.find((item) => item.src)?.src;
}

function toDestination(trip: Trip): AdventureDestination {
  return {
    slug: trip.slug,
    title: trip.title,
    image: tripThumbnail(trip),
  };
}

function pickDestinations(definition: CategoryDefinition, trips: Trip[]): AdventureDestination[] {
  const preferredTrips: Trip[] = [];

  if (definition.preferredTitleIncludes) {
    for (const fragment of definition.preferredTitleIncludes) {
      const trip = trips.find(
        (item) =>
          item.title.includes(fragment) &&
          !preferredTrips.some((existing) => existing.slug === item.slug),
      );
      if (trip) preferredTrips.push(trip);
    }
  }

  const matched = trips
    .filter(definition.match)
    .sort((a, b) => {
      const rankDiff = tripRank(a, definition.preferredSlugs) - tripRank(b, definition.preferredSlugs);
      if (rankDiff !== 0) return rankDiff;
      return a.title.localeCompare(b.title, "he");
    });

  const destinations = [...preferredTrips.map(toDestination), ...matched.map(toDestination)];
  const seen = new Set(destinations.map((item) => item.slug));

  if (definition.preferredSlugs) {
    for (const slug of definition.preferredSlugs) {
      if (seen.has(slug)) continue;
      const trip = trips.find((item) => item.slug === slug);
      if (trip) {
        destinations.unshift(toDestination(trip));
        seen.add(slug);
      }
    }
  }

  const unique: AdventureDestination[] = [];
  const used = new Set<string>();
  for (const destination of destinations) {
    if (used.has(destination.slug)) continue;
    used.add(destination.slug);
    unique.push(destination);
    if (unique.length >= 3) break;
  }

  return unique;
}

function pickFeatured(destinations: AdventureDestination[]): AdventureDestination | null {
  return destinations.find((destination) => destination.image) ?? destinations[0] ?? null;
}

export function buildAdventureCategoryData(trips: Trip[]): AdventureCategoryData[] {
  return CATEGORY_DEFINITIONS.map((definition) => {
    const destinations = pickDestinations(definition, trips);
    return {
      id: definition.id,
      emoji: definition.emoji,
      label: definition.label,
      tagline: definition.tagline,
      featured: pickFeatured(destinations),
      destinations,
    };
  });
}
