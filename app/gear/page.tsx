import type { Metadata } from "next";
import { Suspense } from "react";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import GearHubView from "@/app/components/gear-hub-view";

export const metadata: Metadata = {
  title: "רשימת ציוד | בשביל הלב",
  description:
    "בדקו מה חסר לכם לפני שיוצאים לדרך — רשימת ציוד חכמה לפי סוג הטיול",
};

export default function GearPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <Suspense>
        <GearHubView />
      </Suspense>

      <SiteFooter />
    </div>
  );
}
