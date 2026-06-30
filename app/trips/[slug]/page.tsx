import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripArticle from "@/app/components/trip-article";
import TripComingSoon from "@/app/components/trip-coming-soon";
import { getAllTripSlugs, getPublicTripBySlug } from "@/data/trips";
import { buildTripPageMetadata } from "@/lib/trip-page-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTripSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getPublicTripBySlug(slug);

  if (!trip) {
    return { title: "מסלול לא נמצא | בשביל הלב" };
  }

  return buildTripPageMetadata(trip);
}

export default async function TripPage({ params }: PageProps) {
  const { slug } = await params;
  const trip = getPublicTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  if (trip.status === "needs-content") {
    return <TripComingSoon trip={trip} />;
  }

  return <TripArticle trip={trip} />;
}
