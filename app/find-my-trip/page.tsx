import type { Metadata } from "next";
import SiteFooter from "@/app/components/site-footer";
import SiteHeader from "@/app/components/site-header";
import FindMyTripWizard from "@/app/find-my-trip/find-my-trip-wizard";

export const metadata: Metadata = {
  title: "מצאו לי טיול | בשביל הלב",
  description:
    "ענו על כמה שאלות קצרות ונמצא עבורכם את הטיול המושלם - לפי חוויה, מרחק, תקציב, מזג ורכב.",
};

export default function FindMyTripPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <FindMyTripWizard />
      <SiteFooter />
    </div>
  );
}
