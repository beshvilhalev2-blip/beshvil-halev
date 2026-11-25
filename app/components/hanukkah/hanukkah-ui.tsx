import Link from "next/link";
import type { ReactNode } from "react";
import {
  HANUKKAH_LINK_LABELS,
  type HanukkahLink,
} from "@/lib/hanukkah-2026/content";

export const hanukkahSectionShell =
  "relative scroll-mt-24 px-4 py-9 sm:px-6 sm:py-12 lg:py-14";

export const hanukkahSectionInner = "relative mx-auto max-w-6xl";

export const hanukkahCard =
  "rounded-2xl border border-[#e7dcc6] bg-[#fffaf1]/90 shadow-[0_12px_40px_-26px_rgba(31,59,45,0.35)] backdrop-blur-sm dark:border-stone-700/60 dark:bg-stone-900/70";

export const hanukkahPrimaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1f3b2d] px-7 py-3.5 text-base font-semibold text-[#fdf6e7] shadow-lg shadow-[#1f3b2d]/20 transition-all hover:-translate-y-0.5 hover:bg-[#2a4d3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-emerald-200 dark:text-stone-900 dark:hover:bg-emerald-100";

export const hanukkahSecondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#1f3b2d]/25 bg-white/60 px-7 py-3.5 text-base font-semibold text-[#1f3b2d] transition-all hover:-translate-y-0.5 hover:border-[#1f3b2d]/45 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:border-stone-600 dark:bg-stone-800/50 dark:text-stone-100 dark:hover:bg-stone-800";

export function HanukkahSectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8 max-w-3xl sm:mb-10">
      {eyebrow ? (
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
          <span
            className="size-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_3px_rgba(245,158,11,0.45)]"
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={`${id}-title`}
        className="text-[1.75rem] font-bold leading-tight tracking-tight text-[#1f3b2d] dark:text-stone-50 sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-lg font-medium leading-relaxed text-stone-700 dark:text-stone-300">
          {subtitle}
        </p>
      ) : null}
      {children ? (
        <div className="mt-3 space-y-2 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-[1.05rem]">
          {children}
        </div>
      ) : null}
    </header>
  );
}

type ThemeVariant = "cream" | "stone" | "forest";

/** רקע שנמשך על כל האזור, מהכותרת ועד סוף התוכן. הטבלאות והכרטיסים מעליו נשארים בהירים. */
export const HANUKKAH_SECTION_THEMES: Record<ThemeVariant, string> = {
  cream:
    "bg-[linear-gradient(180deg,#fdf6e4_0%,#f8ebcb_55%,#f5e3b8_100%)] border-y border-amber-200/70 dark:bg-none dark:bg-amber-950/20",
  stone:
    "bg-[linear-gradient(180deg,#f1eadc_0%,#e6dac3_55%,#dccbab_100%)] border-y border-[#cdbfa3]/70 dark:bg-none dark:bg-stone-900",
  forest:
    "relative isolate overflow-hidden border-t-[6px] border-[#8c2234] bg-[linear-gradient(160deg,#10241a_0%,#183526_45%,#1f3b2d_80%,#3a1f26_100%)]",
};

const THEME_TEXT: Record<
  ThemeVariant,
  { eyebrow: string; dot: string; title: string; subtitle: string; body: string }
> = {
  cream: {
    eyebrow: "text-amber-800 dark:text-amber-300",
    dot: "bg-amber-500 shadow-[0_0_10px_3px_rgba(245,158,11,0.45)]",
    title: "text-[#1f3b2d] dark:text-stone-50",
    subtitle: "text-stone-700 dark:text-stone-300",
    body: "text-stone-700 dark:text-stone-300",
  },
  stone: {
    eyebrow: "text-[#7a5a2e] dark:text-amber-300",
    dot: "bg-[#a67c3d]",
    title: "text-[#3b2f1e] dark:text-stone-50",
    subtitle: "text-[#4a3d29] dark:text-stone-300",
    body: "text-[#4a3d29] dark:text-stone-300",
  },
  forest: {
    eyebrow: "text-amber-200",
    dot: "bg-[#d24a60] shadow-[0_0_10px_3px_rgba(210,74,96,0.55)]",
    title: "text-[#fdf6e7]",
    subtitle: "text-emerald-50/90",
    body: "text-emerald-50/85",
  },
};

/** נקודות אור חמימות ברקע הירוק של אזור דצמבר */
export function ForestLights() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle,rgba(253,224,71,0.9)_0_1.5px,transparent_2.5px),radial-gradient(circle,rgba(251,191,36,0.55)_0_1px,transparent_2px)] [background-position:0_0,18px_22px] [background-size:46px_46px,38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 end-[-4rem] -z-10 size-72 rounded-full bg-amber-300/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 start-[-4rem] -z-10 size-72 rounded-full bg-[#8c2234]/30 blur-3xl"
        aria-hidden="true"
      />
    </>
  );
}

/** כותרת ופתיח שיושבים ישירות על רקע האזור, בלי מסגרת. */
export function HanukkahSectionBand({
  id,
  variant,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  variant: ThemeVariant;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  const style = THEME_TEXT[variant];
  return (
    <header className="mb-7 max-w-3xl sm:mb-9">
      {eyebrow ? (
        <p className={`mb-2 inline-flex items-center gap-2 text-sm font-semibold ${style.eyebrow}`}>
          <span className={`size-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={`${id}-title`}
        className={`text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl ${style.title}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-2 text-lg font-medium leading-relaxed ${style.subtitle}`}>{subtitle}</p>
      ) : null}
      {children ? (
        <div className={`mt-2 space-y-2 text-base leading-relaxed sm:text-[1.05rem] ${style.body}`}>
          {children}
        </div>
      ) : null}
    </header>
  );
}

export function ExternalIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** קישור טקסט קטן - פנימי או חיצוני */
export function HanukkahTextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const base = `inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f5a3f] underline decoration-amber-400/70 decoration-2 underline-offset-4 transition-colors hover:text-amber-800 hover:decoration-amber-500 dark:text-emerald-300 dark:hover:text-amber-300 ${className}`;

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
        <ExternalIcon />
        <span className="sr-only">(נפתח בחלון חדש)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}

/** כפתור קישור לפעילות חיצונית, עם תווית לפי סוג היעד */
export function ActivityLinkButton({ link }: { link: HanukkahLink }) {
  const label = link.label ?? HANUKKAH_LINK_LABELS[link.kind];
  const tone =
    link.kind === "register"
      ? "border-[#1f3b2d] bg-[#1f3b2d] text-[#fdf6e7] hover:bg-[#2a4d3b] dark:border-emerald-200 dark:bg-emerald-200 dark:text-stone-900"
      : "border-[#1f3b2d]/25 bg-white/70 text-[#1f3b2d] hover:border-[#1f3b2d]/50 hover:bg-white dark:border-stone-600 dark:bg-stone-800/60 dark:text-stone-100";

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${tone}`}
    >
      {label}
      <ExternalIcon />
      <span className="sr-only">(נפתח בחלון חדש)</span>
    </a>
  );
}

function WazeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5c-4.7 0-8.5 3.3-8.5 7.6 0 1.6.5 2.8 1.3 3.8-.3 1.2-.9 2-1.8 2.5 1.7.4 3.3.1 4.5-.7 1.3.7 2.8 1 4.5 1 4.7 0 8.5-3.3 8.5-7.6S16.7 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9.3" cy="10.2" r="1" fill="currentColor" />
      <circle cx="14.7" cy="10.2" r="1" fill="currentColor" />
      <path d="M9.5 13.2c1.4 1.1 3.6 1.1 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** טווחי שעות ותאריכים (10:00–12:00, 6–8.12) מוצגים משמאל לימין כדי שהסדר יישמר בעברית */
export function DirectionalText({ text }: { text: string }) {
  const parts = text.split(/(\d[\d.:]*\s*–\s*\d[\d.:]*)/);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <bdi key={index} dir="ltr" className="whitespace-nowrap">
            {part}
          </bdi>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** אייקון Waze לחיץ בלבד, עם תווית נגישה שכוללת את שם המקום */
export function WazeIconLink({ url, placeName }: { url: string; placeName: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`ניווט ב־Waze אל ${placeName}`}
      title={`ניווט ב־Waze אל ${placeName}`}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#33ccff]/15 text-[#0b5a78] ring-1 ring-[#33ccff]/40 transition-colors hover:bg-[#33ccff]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33ccff] dark:bg-sky-400/15 dark:text-sky-200"
    >
      <WazeIcon className="size-5" />
    </a>
  );
}

export function buildWazeQueryUrl(query: string) {
  return `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;
}

/** כפתור Waze. בלי url מוצג רק שם המקום, ללא כפתור פעיל. */
export function WazeButton({
  url,
  placeName,
  label,
}: {
  url?: string;
  placeName: string;
  label?: string;
}) {
  if (!url) {
    return label ? (
      <span className="text-sm text-stone-500 dark:text-stone-400">{label}</span>
    ) : null;
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`ניווט ב־Waze אל ${placeName}${label ? ` - ${label}` : ""}`}
        className="inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#33ccff]/15 px-3 py-2 text-sm font-semibold text-[#0b5a78] ring-1 ring-[#33ccff]/40 transition-colors hover:bg-[#33ccff]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33ccff] dark:bg-sky-400/15 dark:text-sky-200"
      >
        <WazeIcon />
        Waze
      </a>
      {label ? (
        <span className="text-xs text-stone-500 dark:text-stone-400">{label}</span>
      ) : null}
    </span>
  );
}

/* ---------- טבלה רספונסיבית: טבלה במחשב, כרטיסי שורה בנייד ---------- */

export type ResponsiveColumn = {
  header: string;
  /** רוחב העמודה בטבלת המחשב */
  className?: string;
};

export type ResponsiveRow = {
  key: string;
  cells: ReactNode[];
  /** כותרת כרטיס השורה בנייד (בדרך כלל שם המקום) */
  mobileTitle: ReactNode;
  /** שורת־על בכרטיס הנייד (בדרך כלל התאריך) */
  mobileEyebrow?: ReactNode;
  /** אינדקסים של תאים שכבר מוצגים בכותרת או בשורת־העל בנייד */
  mobileSkip?: number[];
  /** אינדקס התא שמוצג בתחתית כרטיס הנייד (כפתור) */
  mobileActionIndex?: number;
  /** תוכן שמוצמד מתחת לכותרת כרטיס הנייד (למשל כפתור Waze) */
  mobileAfterTitle?: ReactNode;
  /** תמונה ממוזערת ליד כותרת כרטיס הנייד */
  mobileThumb?: ReactNode;
};

export function ResponsiveTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: ResponsiveColumn[];
  rows: ResponsiveRow[];
}) {
  return (
    <div>
      <div className={`${hanukkahCard} hidden overflow-hidden md:block`}>
        <table className="w-full table-fixed border-collapse text-right">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-[#e7dcc6] bg-[#1f3b2d] text-[#fdf6e7] dark:border-stone-700">
              {columns.map((column) => (
                <th
                  key={column.header}
                  scope="col"
                  className={`px-5 py-3.5 text-sm font-semibold ${column.className ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.key}
                className="border-b border-[#efe6d3] align-top last:border-b-0 even:bg-[#f7f0e1]/60 dark:border-stone-800 dark:even:bg-stone-800/30"
              >
                {row.cells.map((cell, index) => (
                  <td
                    key={index}
                    className="px-5 py-4 text-[0.95rem] leading-relaxed text-stone-700 dark:text-stone-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden" aria-label={caption}>
        {rows.map((row) => {
          const skip = new Set(row.mobileSkip ?? []);
          const actionIndex = row.mobileActionIndex;
          return (
            <li key={row.key} className={`${hanukkahCard} p-4`}>
              {row.mobileEyebrow ? (
                <p className="mb-1 text-sm font-semibold text-amber-700 dark:text-amber-400">
                  {row.mobileEyebrow}
                </p>
              ) : null}
              <div className="flex items-center gap-3">
                {row.mobileThumb}
                <h3 className="text-lg font-bold leading-snug text-[#1f3b2d] dark:text-stone-50">
                  {row.mobileTitle}
                </h3>
              </div>
              {row.mobileAfterTitle ? <div className="mt-2">{row.mobileAfterTitle}</div> : null}
              <dl className="mt-2 space-y-2">
                {row.cells.map((cell, index) => {
                  if (skip.has(index) || index === actionIndex || cell == null) {
                    return null;
                  }
                  return (
                    <div key={index}>
                      <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                        {columns[index]?.header}
                      </dt>
                      <dd className="text-[0.95rem] leading-relaxed text-stone-700 dark:text-stone-300">
                        {cell}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              {actionIndex != null && row.cells[actionIndex] ? (
                <div className="mt-3">{row.cells[actionIndex]}</div>
              ) : null}

            </li>
          );
        })}
      </ul>
    </div>
  );
}
