import Link from "next/link";
import {
  DISCOVERY_MAP_REGIONS,
  FILTERABLE_REGION_SLUGS,
} from "@/lib/israel-discovery-map";
import { communityWhatsAppGroupHref, socialLinks } from "@/lib/social-links";

const regionLinks = FILTERABLE_REGION_SLUGS.map((slug) => {
  const region = DISCOVERY_MAP_REGIONS.find((entry) => entry.slug === slug)!;
  return { label: region.title, href: region.href };
});

const tripIdeaLinks = [
  { label: "טיולי מים", href: "/search?q=מים" },
  { label: "תצפיות", href: "/search?q=תצפית" },
  { label: "קמפינג", href: "/search?q=קמפינג" },
  { label: "4x4", href: "/offroad" },
  { label: "חינם", href: "/search?q=חינם" },
  { label: "נגיש לעגלות", href: "/search?q=עגלות" },
] as const;

const travelerToolLinks = [
  { label: "רשימות ציוד", href: "/gear" },
  { label: "טיפים של זהב בשביל הלב", href: "/#gold-tips" },
  { label: "שטח 4x4 למתחילים", href: "/offroad" },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href + link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter({ variant = "default" }: { variant?: "default" | "home" }) {
  const communityLinks = [
    { label: "וואטסאפ", href: communityWhatsAppGroupHref },
    { label: "אינסטגרם", href: socialLinks.find((l) => l.id === "instagram")!.href, external: true },
    { label: "פייסבוק", href: socialLinks.find((l) => l.id === "facebook")!.href, external: true },
  ];

  const footerSurfaceClass =
    variant === "home"
      ? "relative border-t border-stone-200/40 bg-transparent px-4 py-12 sm:px-6 sm:py-14"
      : "relative border-t border-stone-200/45 bg-[#FAF8F5]/35 px-4 py-12 backdrop-blur-[2px] dark:border-stone-800/60 dark:bg-stone-950/40 sm:px-6 sm:py-14";

  return (
    <footer className={footerSurfaceClass}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 text-right sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="טיולים לפי אזור" links={regionLinks} />
          <FooterColumn title="רעיונות לטיול" links={tripIdeaLinks} />
          <FooterColumn title="כלים למטיילים" links={travelerToolLinks} />
          <FooterColumn title="קהילה" links={communityLinks} />
        </div>

        <div className="mt-12 border-t border-stone-200/80 pt-10 text-center dark:border-stone-800">
          <Link
            href="/"
            className="text-xl font-bold text-stone-900 transition-colors hover:text-stone-700 dark:text-stone-50 dark:hover:text-stone-200"
          >
            בשביל הלב
          </Link>
          <p className="mt-2 text-sm font-medium text-stone-600 dark:text-stone-400">
            להיות בתנועה זאת התרופה 💚
          </p>
        </div>

        <div className="mt-8 border-t border-stone-200/80 pt-6 text-center dark:border-stone-800">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            © 2026 בשביל הלב
          </p>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            נבנה באהבה לטבע, למשפחות ולדרך.
          </p>
        </div>
      </div>
    </footer>
  );
}
