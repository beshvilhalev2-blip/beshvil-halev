import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import WantToTravelView from "@/app/components/want-to-travel-view";

export const metadata: Metadata = {
  title: "בא לי לטייל | בשביל הלב",
  description:
    "המקומות ששמרת לרגע שבו תרצי פשוט לצאת לדרך - רשימת טיולים אישית",
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
