import type { Metadata } from "next";
import OffroadMistakesVariantA from "@/app/components/offroad/mistakes/mistakes-variant-a";
import OffroadMistakesVariantB from "@/app/components/offroad/mistakes/mistakes-variant-b";
import OffroadMistakesVariantC from "@/app/components/offroad/mistakes/mistakes-variant-c";

export const metadata: Metadata = {
  title: "Beginner Mistakes Preview | בשביל הלב",
  robots: { index: false, follow: false },
};

export default function OffroadMistakesPreviewPage() {
  return (
    <div className="min-h-screen bg-stone-100/80 dark:bg-stone-950">
      <div className="border-b border-stone-200 bg-white px-4 py-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-lg font-bold text-stone-900 dark:text-stone-50">
            Beginner Mistakes - 3 Visual Approaches
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Compare variants below. Hover or tap items on desktop and mobile to
            preview interaction. Recommended: Approach A.
          </p>
        </div>
      </div>

      <OffroadMistakesVariantA showLabel />
      <OffroadMistakesVariantB showLabel />
      <OffroadMistakesVariantC showLabel />
    </div>
  );
}
