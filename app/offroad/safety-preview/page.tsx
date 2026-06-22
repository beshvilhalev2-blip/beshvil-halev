import type { Metadata } from "next";
import OffroadSafetyVariantA from "@/app/components/offroad/safety/safety-variant-a";
import OffroadSafetyVariantB from "@/app/components/offroad/safety/safety-variant-b";
import OffroadSafetyVariantC from "@/app/components/offroad/safety/safety-variant-c";

export const metadata: Metadata = {
  title: "Safety Section Preview | בשביל הלב",
  robots: { index: false, follow: false },
};

export default function OffroadSafetyPreviewPage() {
  return (
    <div className="min-h-screen bg-stone-100/80 dark:bg-stone-950">
      <div className="border-b border-stone-200 bg-white px-4 py-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-lg font-bold text-stone-900 dark:text-stone-50">
            Safety Rules — 3 Visual Approaches
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Compare variants below. Hover tiles on desktop to preview interaction.
          </p>
        </div>
      </div>

      <OffroadSafetyVariantA showLabel />
      <OffroadSafetyVariantB showLabel />
      <OffroadSafetyVariantC showLabel />
    </div>
  );
}
