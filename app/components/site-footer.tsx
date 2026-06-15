import Link from "next/link";
import { SocialLinksRow } from "@/app/components/social-links";

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white px-6 py-10 dark:border-stone-800 dark:bg-stone-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link
          href="/"
          className="text-lg font-semibold text-stone-800 transition-colors hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300"
        >
          בשביל הלב
        </Link>

        <SocialLinksRow
          linkClassName="inline-flex items-center justify-center rounded-xl p-2.5 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
        />

        <p className="text-sm text-stone-500 dark:text-stone-400">
          © {new Date().getFullYear()} · כל הזכויות שמורות
        </p>
      </div>
    </footer>
  );
}
