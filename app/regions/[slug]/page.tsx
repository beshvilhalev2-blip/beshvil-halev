import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegionPage from "@/app/components/region-page";
import { getVisitedPlacesByRegion } from "@/data/places";
import {
  getAllRegionSlugs,
  getRegionBySlug,
  getTripsByRegionSlug,
} from "@/data/trips";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllRegionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    return { title: "אזור לא נמצא | בשביל הלב" };
  }

  return {
    title: `${region.title} | בשביל הלב`,
    description: `${region.description} — מסלולים, טיולים והמלצות מאזור ${region.title}`,
  };
}

export default async function RegionRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const regionTrips = getTripsByRegionSlug(slug);
  const visitedPlaces = getVisitedPlacesByRegion(region.title);

  return (
    <RegionPage
      region={region}
      trips={regionTrips}
      visitedPlaces={visitedPlaces}
    />
  );
}
