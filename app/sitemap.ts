import type { MetadataRoute } from "next";
import {
  getAllRegionSlugs,
  getPublishedTrips,
  getPublishedTripsByRegionSlug,
} from "@/data/trips";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages = [
    "/",
    "/about",
    "/contact",
    "/find-my-trip",
    "/gear",
    "/offroad",
    "/recommendations",
    "/regions",
  ];
  const regionPages = getAllRegionSlugs()
    .filter((slug) => getPublishedTripsByRegionSlug(slug).length > 0)
    .map((slug) => `/regions/${slug}`);
  const tripPages = getPublishedTrips().map(({ slug }) => `/trips/${slug}`);

  return [...mainPages, ...regionPages, ...tripPages].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
