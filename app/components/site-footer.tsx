import Link from "next/link";
import { SocialLinksRow } from "@/app/components/social-links";

const footerLinks = [
  { label: "טיולים", href: "/recommendations" },
  { label: "מצאו לי טיול", href: "/find-my-trip" },
  { label: "מרכז הציוד", href: "/gear" },
  { label: "בא לי לטייל", href: "/want-to-travel" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 px-4 py-12 dark:border-stone-800 dark:bg-stone-950 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 text-center sm:items-start sm:text-start">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold text-stone-800 transition-colors hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300"
            >
              בשביל הלב
            </Link>
            <p className="mt-2 text-sm font-medium text-stone-600 dark:text-stone-400">
              להיות בתנועה זאת התרופה
            </p>
          </div>

          <nav aria-label="ניווט תחתון">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-start sm:gap-x-6 sm:gap-y-3">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center px-1 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex w-full flex-col items-center gap-4 border-t border-stone-200/80 pt-8 dark:border-stone-800 sm:flex-row sm:justify-between">
            <SocialLinksRow
              linkClassName="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            />
            <p className="text-sm text-stone-500 dark:text-stone-400">
              © {new Date().getFullYear()} · כל הזכויות שמורות
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
