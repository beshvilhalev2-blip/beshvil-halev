import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripArticle from "@/app/components/trip-article";
import { getAllTripSlugs, getTripBySlug } from "@/data/trips";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTripSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    return { title: "מסלול לא נמצא | בשביל הלב" };
  }

  return {
    title: trip.seoTitle ?? `${trip.title} | בשביל הלב`,
    description: trip.metaDescription,
  };
}

export default async function TripPage({ params }: PageProps) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  return <TripArticle trip={trip} />;
}
