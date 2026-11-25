import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicTripBySlug } from "@/data/trips";
import { getTripWazeUrl } from "@/lib/trip-location";
import {
  AFTER_DARK,
  DECEMBER_LIGHTS,
  GO_OUT_REGIONS,
  MACCABEES_SOURCE,
  MACCABEES_STOPS,
  NATURE_ACTIVITIES,
  OFFROAD_INTRO,
  OFFROAD_ROUTES,
  RECOMMENDATION_GROUPS,
  VOLUNTEER,
  type HanukkahEventRow,
  type RecommendationCard,
} from "@/lib/hanukkah-2026/content";
import HanukkahRegionTabs, {
  type ResolvedGoOutRegion,
} from "./hanukkah-region-tabs";
import HanukkahMaccabeesMap from "./hanukkah-maccabees-map";

import {
  ActivityLinkButton,
  DirectionalText,
  WazeIconLink,
  ArrowLeftIcon,
  ExternalIcon,
  ForestLights,
  HANUKKAH_SECTION_THEMES,
  HanukkahSectionBand,
  HanukkahSectionHeader,
  HanukkahTextLink,
  ResponsiveTable,
  buildWazeQueryUrl,
  hanukkahCard,
  hanukkahPrimaryButton,
  hanukkahSecondaryButton,
  hanukkahSectionInner,
  hanukkahSectionShell,
} from "./hanukkah-ui";

function EventDescription({ row }: { row: HanukkahEventRow }) {
  return (
    <div className="space-y-1">
      {row.title ? (
        <p className="font-semibold text-[#1f3b2d] dark:text-stone-100">{row.title}</p>
      ) : null}
      <p>{row.description}</p>
      {row.note ? (
        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">{row.note}</p>
      ) : null}
    </div>
  );
}

function eventRows(
  rows: HanukkahEventRow[],
  extra?: (row: HanukkahEventRow) => string | undefined,
  highlightDates = false,
) {
  return rows.map((row, index) => {
    const tag = extra?.(row);
    const date = (
      <span className="font-semibold text-stone-800 dark:text-stone-200">
        {highlightDates ? (
          <span className="inline-block rounded-lg border border-amber-200 bg-amber-50 px-2 py-0.5 text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-200">
            <DirectionalText text={row.date} />
          </span>
        ) : (
          <DirectionalText text={row.date} />
        )}
        {row.times ? (
          <span className="mt-1 flex flex-wrap gap-1.5">
            {row.times.map((time) => (
              <span
                key={time}
                className="rounded-md bg-[#1f3b2d]/[0.07] px-2 py-0.5 text-sm font-semibold text-[#1f3b2d] dark:bg-emerald-900/40 dark:text-emerald-200"
              >
                <DirectionalText text={time} />
              </span>
            ))}
          </span>
        ) : null}
        {tag ? (
          <span className="mt-1 block w-fit rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            {tag}
          </span>
        ) : null}
      </span>
    );
    const place = (
      <span className="font-semibold text-[#1f3b2d] dark:text-stone-100">{row.place}</span>
    );
    const link = row.link ? <ActivityLinkButton link={row.link} /> : null;
    return {
      key: `${row.date}-${row.place}-${index}`,
      cells: [date, place, <EventDescription key="d" row={row} />, link],
      mobileEyebrow: date,
      mobileTitle: row.place,
      mobileSkip: [0, 1],
      mobileActionIndex: 3,
    };
  });
}

const eventColumns = (descriptionHeader: string) => [
  { header: "תאריך", className: "w-[17%]" },
  { header: "איפה", className: "w-[17%]" },
  { header: descriptionHeader },
  { header: "קישור", className: "w-[19%]" },
];

/* 2 */
export function NatureActivitiesSection() {
  return (
    <section
      id="activities"
      aria-labelledby="activities-title"
      className={`${hanukkahSectionShell} ${HANUKKAH_SECTION_THEMES.cream}`}
    >
      <div className={hanukkahSectionInner}>
        <HanukkahSectionBand
          id="activities"
          variant="cream"
          eyebrow="לוח פעילויות"
          title="פעילויות חנוכה בטבע"
        >
          <p>סיורים, משחקי ניווט ופעילויות משפחתיות לאורך החג, לפי סדר התאריכים.</p>
        </HanukkahSectionBand>
        <ResponsiveTable
          caption="פעילויות חנוכה בטבע"
          columns={eventColumns("הפעילות")}
          rows={eventRows(NATURE_ACTIVITIES, undefined, true)}
        />
      </div>
    </section>
  );
}

/* 3 */
export function MaccabeesSection() {
  return (
    <section
      id="maccabees"
      aria-labelledby="maccabees-title"
      className={`${hanukkahSectionShell} ${HANUKKAH_SECTION_THEMES.stone}`}
    >
      <div className={hanukkahSectionInner}>
        <HanukkahSectionBand
          id="maccabees"
          variant="stone"
          eyebrow="מסלול לחג"
          title="טיול בעקבות המכבים"
          subtitle="תצאו להרגיש את הסיפור של חנוכה במקום שהוא קרה!"
        >
          <p>
            טיול עם כמה עצירות ברכב והליכות קצרות באזור מודיעין. להתחלה קלה
            בחרו בקברות המכבים ובחורבת אום אל־עומדאן. אם יש לכם זמן, הוסיפו את
            הכפר החשמונאי בשילת או את בקעת הנזירים.
          </p>
        </HanukkahSectionBand>

        <ResponsiveTable
          caption="עצירות בטיול בעקבות המכבים"
          columns={[
            { header: "איפה", className: "w-[27%]" },
            { header: "מה לרשום ב־Waze", className: "w-[24%]" },
            { header: "פרטים בקצרה" },
          ]}
          rows={MACCABEES_STOPS.map((stop, index) => {
            const number = (
              <span
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#3b2f1e] text-sm font-bold text-[#f6efe2] ring-2 ring-[#e3d6bd]"
                aria-label={`תחנה ${index + 1}`}
              >
                {index + 1}
              </span>
            );
            const tag = (
              <span className="w-fit rounded-full bg-[#1f3b2d]/[0.07] px-2 py-0.5 text-xs font-semibold text-[#1f3b2d] dark:bg-emerald-900/40 dark:text-emerald-200">
                {stop.kindLabel}
              </span>
            );
            const place = (
              <span className="flex items-start gap-2.5">
                {number}
                <span className="flex flex-col items-start gap-2">
                  <span className="font-semibold text-[#1f3b2d] dark:text-stone-100">
                    {stop.place}
                  </span>
                  {tag}
                </span>
              </span>
            );
            return {
              key: stop.place,
              cells: [
                place,
                <span key="q" className="flex items-center gap-2.5">
                  <WazeIconLink url={buildWazeQueryUrl(stop.wazeQuery)} placeName={stop.place} />
                  <span className="text-sm text-stone-600 dark:text-stone-400">{stop.wazeQuery}</span>
                </span>,
                stop.details,
              ],
              mobileTitle: (
                <span className="flex flex-wrap items-center gap-2">
                  {number}
                  {stop.place}
                  {tag}
                </span>
              ),
              mobileSkip: [0],
            };
          })}
        />

        <div className="mt-6">
          <HanukkahMaccabeesMap
            stops={MACCABEES_STOPS.flatMap((stop, index) =>
              stop.position
                ? [
                    {
                      number: index + 1,
                      name: stop.place,
                      kindLabel: stop.kindLabel,
                      lat: stop.position.lat,
                      lng: stop.position.lng,
                      wazeUrl: buildWazeQueryUrl(stop.wazeQuery),
                    },
                  ]
                : [],
            )}
          />
        </div>

        <p className="mt-5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          כדאי לזכור: חלק מהמקומות קשורים למכבים לפי המסורת, חלקם זיהוי
          ארכאולוגי מוצע וחלקם שחזור מודרני. התגית ליד כל עצירה מסמנת מה הוא מה.{" "}
          <HanukkahTextLink href={MACCABEES_SOURCE.href}>{MACCABEES_SOURCE.label}</HanukkahTextLink>
        </p>
      </div>
    </section>
  );
}

/* 4 */
/** שמי לילה: שכבות כוכבים קטנים, כמה כוכבים בוהקים וזוהר ירח חמים. סטטי, בלי אנימציה. */
const BRIGHT_STARS = [
  { top: "8%", left: "12%", size: 3 },
  { top: "14%", left: "38%", size: 2 },
  { top: "6%", left: "63%", size: 3 },
  { top: "22%", left: "84%", size: 2 },
  { top: "30%", left: "24%", size: 2 },
  { top: "11%", left: "91%", size: 3 },
  { top: "38%", left: "52%", size: 2 },
  { top: "26%", left: "6%", size: 2 },
] as const;

function NightSky() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {/* כוכבים קטנים בשלוש שכבות בגדלים שונים, כדי שלא ייראו כתבנית חוזרת */}
      <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle,rgba(255,255,255,0.85)_0_1px,transparent_1.6px),radial-gradient(circle,rgba(226,232,255,0.6)_0_0.8px,transparent_1.4px),radial-gradient(circle,rgba(253,230,138,0.7)_0_1px,transparent_1.8px)] [background-position:0_0,47px_71px,113px_29px] [background-size:131px_127px,89px_97px,197px_173px] [mask-image:linear-gradient(to_bottom,black_0%,rgba(0,0,0,0.75)_45%,rgba(0,0,0,0.35)_100%)]" />
      {BRIGHT_STARS.map((star) => (
        <span
          key={`${star.top}-${star.left}`}
          className="absolute rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.55)]"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
        />
      ))}
      {/* זוהר ירח חמים בפינה */}
      <div className="absolute -top-20 end-[-3rem] size-64 rounded-full bg-amber-200/15 blur-3xl" />
      <div className="absolute top-8 end-10 size-10 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff7dc,#f5d98a_60%,#d9b45a)] opacity-80 shadow-[0_0_30px_8px_rgba(253,230,138,0.35)] sm:end-16 sm:top-10 sm:size-12" />
    </div>
  );
}

export function AfterDarkSection() {
  return (
    <section
      id="after-dark"
      aria-labelledby="after-dark-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#0b1430_0%,#121d3f_45%,#1a2350_80%,#221f4a_100%)] px-4 py-9 text-stone-100 sm:px-6 sm:py-12 lg:py-14"
    >
      <NightSky />
      <div className={hanukkahSectionInner}>
        <header className="mb-8 max-w-3xl sm:mb-10">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
            <span className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_3px_rgba(252,211,77,0.6)]" aria-hidden="true" />
            עששיות ונרות
          </p>
          <h2 id="after-dark-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-[#fdf6e7] sm:text-4xl">
            חנוכה אחרי החשכה
          </h2>
          <p className="mt-3 text-base leading-relaxed text-indigo-100/85 sm:text-[1.05rem]">
            סיורי עששיות, חנוכיות בחלונות ומופעי אור, כשהיום מתקצר והנרות נדלקים.
          </p>
        </header>
        <ResponsiveTable
          caption="חנוכה אחרי החשכה"
          columns={eventColumns("הסבר קצר")}
          rows={eventRows(AFTER_DARK)}
        />
      </div>
    </section>
  );
}

/* 5 */
export function DecemberLightsSection() {
  return (
    <section
      id="december-lights"
      aria-labelledby="december-lights-title"
      className={`${hanukkahSectionShell} ${HANUKKAH_SECTION_THEMES.forest}`}
    >
      <ForestLights />
      <div className={hanukkahSectionInner}>
        <HanukkahSectionBand id="december-lights" variant="forest" eyebrow="עוד אורות" title="כריסמס ואורות בדצמבר">
          <p>
            בדצמבר, סביב חנוכה ובהמשך החודש, נדלקים בארץ גם אורות הכריסמס. זאת
            הזדמנות מצוינת לחוות אווירת חג צבעונית ומשמחת, לחקור ולגלות עוד
            תרבויות ולשמח את הלב והעיניים.
          </p>
        </HanukkahSectionBand>
        <ResponsiveTable
          caption="כריסמס ואורות בדצמבר"
          columns={eventColumns("תיאור")}
          rows={eventRows(DECEMBER_LIGHTS, (row) =>
            "overlapsHanukkah" in row && row.overlapsHanukkah ? "חופף לחנוכה" : undefined,
          )}
        />
      </div>
    </section>
  );
}

/* 6 */
export function OffroadSection() {
  return (
    <section
      id="offroad"
      aria-labelledby="offroad-title"
      className={`${hanukkahSectionShell} bg-[#1f3b2d]/[0.04] dark:bg-emerald-950/20`}
    >
      <div className={hanukkahSectionInner}>
        <HanukkahSectionHeader
          id="offroad"
          eyebrow="מסלולי 4×4 קלילים למשפחות"
          title="לטייל בטבע על גלגלים"
        >
          <p>{OFFROAD_INTRO}</p>
        </HanukkahSectionHeader>
        <ResponsiveTable
          caption="מסלולי 4×4 קלילים למשפחות"
          columns={[
            { header: "איפה", className: "w-[22%]" },
            { header: "פרטים קלילים על המסלול" },
            { header: "קישור", className: "w-[24%]" },
          ]}
          rows={OFFROAD_ROUTES.map((route) => ({
            key: route.place,
            cells: [
              <span key="p" className="font-semibold text-[#1f3b2d] dark:text-stone-100">
                {route.place}
              </span>,
              route.details,
              <HanukkahTextLink key="l" href={route.link.href}>
                {route.link.label}
              </HanukkahTextLink>,
            ],
            mobileTitle: route.place,
            mobileSkip: [0],
            mobileActionIndex: 2,
          }))}
        />
        <div className="mt-8 flex justify-center">
          <Link
            href="/offroad"
            className={`${hanukkahPrimaryButton} min-h-14 w-full max-w-md px-10 text-lg sm:w-auto`}
          >
            4×4 למתחילים בשביל הלב
            <ArrowLeftIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 7 */
function resolveCard(card: RecommendationCard) {
  const trip = card.tripSlug ? getPublicTripBySlug(card.tripSlug) : undefined;
  const href = card.href ?? (trip ? `/trips/${trip.slug}` : undefined);
  return {
    ...card,
    image: trip?.heroImage ?? card.image,
    imagePosition: trip?.heroImagePosition,
    href,
    external: href ? /^https?:\/\//.test(href) : false,
  };
}

function RecommendationCardView({
  card,
  className = "",
  compact = false,
}: {
  card: ReturnType<typeof resolveCard>;
  className?: string;
  /** נייד: כרטיס אופקי קטן (תמונה בצד, טקסט לידה). מ־sm ומעלה חוזר לכרטיס הרגיל. */
  compact?: boolean;
}) {
  const body = (
    <>
      {card.image ? (
        <div
          className={`relative overflow-hidden bg-stone-200 dark:bg-stone-800 ${
            compact ? "w-[36%] shrink-0 self-stretch min-h-28 sm:w-auto sm:min-h-0 sm:aspect-[4/3]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={card.image}
            alt={card.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 34vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
          />
        </div>
      ) : null}
      <div className={`flex min-w-0 flex-1 flex-col sm:p-4 ${compact ? "p-3" : "p-3.5"}`}>
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">{card.area}</p>
        <h4
          className={`mt-0.5 font-bold leading-snug text-[#1f3b2d] dark:text-stone-50 sm:text-lg ${
            compact ? "text-lg" : "text-base"
          }`}
        >
          {card.name}
        </h4>
        <p
          className={`mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:mt-1.5 ${
            compact ? "line-clamp-3 sm:line-clamp-none" : ""
          }`}
        >
          {card.why}
        </p>
        {card.note ? (
          <p className="mt-2 text-xs font-semibold leading-relaxed text-amber-800 dark:text-amber-300">
            {card.note}
          </p>
        ) : null}
        {card.href ? (
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold sm:pt-3 text-[#1f5a3f] dark:text-emerald-300">
            {card.external ? "לאתר הרשמי" : "לכתבה בשביל הלב"}
            {card.external ? <ExternalIcon /> : <ArrowLeftIcon className="size-3.5" />}
          </span>
        ) : null}
      </div>
    </>
  );

  const shell = `${hanukkahCard} group flex h-full overflow-hidden ${
    compact ? "flex-row sm:flex-col" : "flex-col"
  }`;

  return (
    <li className={`flex flex-col ${className}`}>
      {card.href ? (
        card.external ? (
          <a
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${shell} transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_18px_44px_-24px_rgba(31,59,45,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500`}
          >
            {body}
            <span className="sr-only">(נפתח בחלון חדש)</span>
          </a>
        ) : (
          <Link
            href={card.href}
            className={`${shell} transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_18px_44px_-24px_rgba(31,59,45,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500`}
          >
            {body}
          </Link>
        )
      ) : (
        <div className={`${shell} border-dashed`}>{body}</div>
      )}
      {card.extraLink ? (
        <HanukkahTextLink href={card.extraLink.href} className="mt-2 px-1 text-xs">
          {card.extraLink.label}
        </HanukkahTextLink>
      ) : null}
    </li>
  );
}

export function RecommendationsSection() {
  return (
    <section
      id="recommendations"
      aria-labelledby="recommendations-title"
      className={`${hanukkahSectionShell} border-y border-[#a9c79a]/80 bg-[linear-gradient(180deg,#e6f0dd_0%,#d9e8cc_55%,#cde0bd_100%)] dark:border-stone-800 dark:bg-none dark:bg-stone-900`}
    >
      <div className={hanukkahSectionInner}>
        <HanukkahSectionHeader id="recommendations" eyebrow="ההמלצות שלי" title="המלצות לפי קטגוריות" />
        <div className="space-y-10">
          {RECOMMENDATION_GROUPS.map((group) => (
            <div key={group.id} aria-labelledby={`rec-${group.id}`}>
              <div className="mb-4 flex items-baseline gap-3">
                <h3 id={`rec-${group.id}`} className="text-xl font-bold text-[#1f3b2d] dark:text-stone-50 sm:text-2xl">
                  {group.title}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-l from-amber-300/70 to-transparent" aria-hidden="true" />
              </div>
              {group.intro ? (
                <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">{group.intro}</p>
              ) : null}
              {/* נייד: מספר אי־זוגי של כרטיסים - אחד בשורה, זוגי - שניים בשורה. בלי גלילה הצידה. */}
              {group.layout === "row" ? (
                <ul
                  className={`grid gap-3 sm:grid-cols-3 sm:gap-4 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] ${
                    group.cards.length % 2 === 1 ? "grid-cols-1" : "grid-cols-2"
                  }`}
                  style={{ "--cols": group.cards.length } as CSSProperties}
                >
                  {group.cards.map((card) => (
                    <RecommendationCardView
                      key={card.name}
                      card={resolveCard(card)}
                      compact={group.cards.length % 2 === 1}
                    />
                  ))}
                </ul>
              ) : (
                <ul
                  className={`grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 ${
                    group.cards.length % 2 === 1 ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {group.cards.map((card) => (
                    <RecommendationCardView
                      key={card.name}
                      card={resolveCard(card)}
                      compact={group.cards.length % 2 === 1}
                    />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8 */
function resolveGoOutRegions(): ResolvedGoOutRegion[] {
  return GO_OUT_REGIONS.map((region) => ({
    id: region.id,
    label: region.label,
    places: region.places.map((place) => {
      const trip = place.tripSlug ? getPublicTripBySlug(place.tripSlug) : undefined;
      const wazeUrl = trip
        ? getTripWazeUrl(trip)
        : place.wazeQuery
          ? buildWazeQueryUrl(place.wazeQuery)
          : undefined;
      return {
        place: place.place,
        description: place.description,
        image: trip?.heroImage ?? place.image,
        imagePosition: trip?.heroImagePosition,
        tripHref: trip ? `/trips/${trip.slug}` : undefined,
        wazeUrl,
        wazeLabel: place.wazeLabel,
      };
    }),
  }));
}

export function GoOutSection() {
  return (
    <section
      id="go-out"
      aria-labelledby="go-out-title"
      className={`${hanukkahSectionShell} bg-[#1f3b2d]/[0.04] dark:bg-emerald-950/20`}
    >
      <div className={hanukkahSectionInner}>
        <HanukkahSectionHeader id="go-out" eyebrow="לפי אזור" title="המלצות בטבע">
          <p>ריכזתי עבורכם רשימה של המקומות הכי שווים שכיף בהם תמיד!</p>
        </HanukkahSectionHeader>
        <HanukkahRegionTabs regions={resolveGoOutRegions()} />
      </div>
    </section>
  );
}

/* 9 + 10 */
export function VolunteerAndGearSection() {
  return (
    <section aria-label="התנדבות וציוד" className={hanukkahSectionShell}>
      <div className={`${hanukkahSectionInner} grid gap-5 lg:grid-cols-2`}>
        <div id="volunteer" className={`${hanukkahCard} scroll-mt-24 p-6 sm:p-8`}>
          <p className="mb-2 text-sm font-semibold text-amber-700 dark:text-amber-400">פינת התנדבות</p>
          <h2 className="text-2xl font-bold text-[#1f3b2d] dark:text-stone-50 sm:text-3xl">{VOLUNTEER.title}</h2>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-stone-600 dark:text-stone-400">
            {VOLUNTEER.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={VOLUNTEER.button.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${hanukkahSecondaryButton} mt-6`}
          >
            {VOLUNTEER.button.label}
            <ExternalIcon />
            <span className="sr-only">(נפתח בחלון חדש)</span>
          </a>
        </div>

        <div id="gear" className={`${hanukkahCard} scroll-mt-24 p-6 sm:p-8`}>
          <p className="mb-2 text-sm font-semibold text-amber-700 dark:text-amber-400">לפני היציאה</p>
          <h2 className="text-2xl font-bold text-[#1f3b2d] dark:text-stone-50 sm:text-3xl">
            רוצים לעשות סדר בציוד?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-400">
            לפני שיוצאים, שווה לבדוק מה באמת צריך לקחת.
          </p>
          <Link href="/gear" className={`${hanukkahSecondaryButton} mt-6`}>
            לרשימת הציוד בשביל הלב
            <ArrowLeftIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 11 */
export function ClosingSection() {
  return (
    <section aria-labelledby="closing-title" className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#1f3b2d] px-6 py-10 text-center shadow-[0_30px_70px_-35px_rgba(31,59,45,0.7)] sm:px-12 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(245,158,11,0.22),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 id="closing-title" className="text-3xl font-extrabold tracking-tight text-[#fdf6e7] sm:text-4xl">
            יאללה, תצאו לטייל בשביל הלב
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-emerald-50/85 sm:text-lg">
            בחרו אזור וספרו לנו עם מי אתם יוצאים. נמצא לכם רעיונות לטיול שמתאים לכם.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/find-my-trip"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-8 py-3.5 text-base font-bold text-[#1f3b2d] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f3b2d]"
            >
              מצאו לי טיול
              <ArrowLeftIcon />
            </Link>
            <Link
              href="/regions"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#fdf6e7]/35 bg-white/10 px-8 py-3.5 text-base font-semibold text-[#fdf6e7] transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              לעוד מקומות בשביל הלב
            </Link>
          </div>
          <p className="mt-6 text-sm text-emerald-50/80">
            יש לכם שאלה או המלצה?{" "}
            <Link
              href="/contact"
              className="font-semibold text-amber-200 underline decoration-amber-300/60 underline-offset-4 hover:text-amber-100"
            >
              יצירת קשר
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
