import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import WantToTravelView from "@/app/components/want-to-travel-view";
import { WANT_TO_TRAVEL_PAGE_METADATA_TITLE } from "@/lib/want-to-travel/labels";

export const metadata: Metadata = {
  title: WANT_TO_TRAVEL_PAGE_METADATA_TITLE,
  description:
    "הטיולים ששמרת לרגע שבו תרצו לצאת לדרך - הרשימה האישית שלך בבשביל הלב",
};

export default function WantToTravelPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <WantToTravelView />
      <SiteFooter />
    </div>
  );
}
