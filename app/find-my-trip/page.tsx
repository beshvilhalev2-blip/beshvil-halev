import type { Metadata } from "next";
import SiteFooter from "@/app/components/site-footer";
import SiteHeader from "@/app/components/site-header";
import FindMyTripWizard from "@/app/find-my-trip/find-my-trip-wizard";

export const metadata: Metadata = {
  title: "מצאי לי טיול | בשביל הלב",
  description:
    "עני על כמה שאלות קצרות ונמצא עבורך את הטיול המושלם — לפי מ mood, מרחק, תקציב, מזג ורכב.",
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
