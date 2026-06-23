import type { Metadata } from "next";
import OffroadCookingVariantA from "@/app/components/offroad/cooking/cooking-variant-a";
import OffroadCookingVariantB from "@/app/components/offroad/cooking/cooking-variant-b";
import OffroadCookingVariantC from "@/app/components/offroad/cooking/cooking-variant-c";

export const metadata: Metadata = {
  title: "Cooking Tips Preview | בשביל הלב",
  robots: { index: false, follow: false },
};

export default function OffroadCookingPreviewPage() {
  return (
    <div className="min-h-screen bg-stone-100/80 dark:bg-stone-950">
      <div className="border-b border-stone-200 bg-white px-4 py-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-lg font-bold text-stone-900 dark:text-stone-50">
            Cooking Tips - 3 Visual Approaches
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Compare variants below. Recommended: Approach A (Campfire Journey).
          </p>
        </div>
      </div>

      <OffroadCookingVariantA showLabel />
      <OffroadCookingVariantB showLabel />
      <OffroadCookingVariantC showLabel />
    </div>
  );
}
