"use client";

import { usePathname } from "next/navigation";
import SiteAtmosphereBackground from "@/app/components/site-atmosphere-background";

/** Renders the global atmosphere layer on all routes except the homepage. */
export default function SiteAtmosphereGate() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <SiteAtmosphereBackground />;
}
