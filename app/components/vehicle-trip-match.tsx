"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import TripCard, { getRegionForTrip } from "@/app/components/trip-card";
import { getPublishedTrips } from "@/data/trips";
import { getTripsForVehicleCategory } from "@/lib/trip-vehicle-access";
import {
  getModelsForBrand,
  getVehicleBrands,
  getYearsForModel,
  resolveVehicleSelection,
  type ResolvedVehicle,
} from "@/lib/vehicle-database";
import {
  getCategoryById,
  getRoutesForCategory,
  getWarningsForCategory,
} from "@/lib/vehicle-trip-match";

const PERSONAL_RAV4_IMAGE = "/images/vehicles/my-rav4-2011-black-v2.png";

const offroadTheme = {
  accent: "from-zinc-500/20 to-amber-900/10",
} as const;

const selectClassName =
  "w-full min-h-11 rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-base text-stone-800 transition-shadow focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:disabled:bg-stone-900 dark:focus:border-stone-500 dark:focus:ring-stone-100/10";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function PersonalRav4Card() {
  const [imageError, setImageError] = useState(false);

  const personalBadges = [
    { text: "מתאים לשבילים", suitable: true },
    { text: "מתאים למשפחות", suitable: true },
    { text: "מתאים לטיולי מים", suitable: true },
    { text: "לא מיועד לעבירות קשה", suitable: false },
  ] as const;

  return (
    <article className="mt-12 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="relative aspect-[16/10] w-full min-h-[220px] bg-stone-100 dark:bg-stone-950 sm:min-h-[280px] md:aspect-[21/9]">
        {!imageError ? (
          <Image
            src={PERSONAL_RAV4_IMAGE}
            alt="Toyota RAV4 2011 שחורה — הרכב המשפחתי שלנו בטיול"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center px-6 text-center sm:min-h-[280px]">
            <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              תמונה של הרכב תעלה בקרוב
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
      </div>

      <div className="px-6 py-8 sm:px-8 sm:py-10">
        <p className="mb-3 text-sm font-medium text-stone-500 dark:text-stone-400">
          מהשביל שלנו
        </p>
        <h3 className="mb-5 text-2xl font-bold leading-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
          הרכב שלי – Toyota RAV4 2011
        </h3>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
          זה הרכב שמלווה אותי ואת הילדים בכל הטיולים בארץ. הוא לא ג&apos;יפ
          קיצוני, אבל הוא מאפשר לנו להגיע למקומות מדהימים, מעיינות, תצפיות,
          שבילי קק״ל ומסלולי טבע משפחתיים.
        </p>

        <ul className="flex flex-wrap gap-2">
          {personalBadges.map((badge) => (
            <li
              key={badge.text}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                badge.suitable
                  ? "border border-emerald-200/80 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
                  : "border border-stone-200/80 bg-stone-50 text-stone-600 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-400"
              }`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                  badge.suitable
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                    : "bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                }`}
                aria-hidden="true"
              >
                {badge.suitable ? <CheckIcon /> : <XIcon />}
              </span>
              {badge.text}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

type WarningIconId =
  | "weather"
  | "mud"
  | "sand"
  | "rocks"
  | "steep"
  | "tires"
  | "experience";

function WarningIcon({ id }: { id: WarningIconId }) {
  const iconClass = "size-5";

  switch (id) {
    case "weather":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
          <path d="M7 16a4 4 0 0 1 .5-7.98 5 5 0 0 1 9.34-1.15 3.5 3.5 0 0 1 1.16 6.83" />
          <path d="M8 19v3M12 18v4M16 19v3" />
        </svg>
      );
    case "mud":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
          <path d="M3 17c3-2 6-3 9-3s6 1 9 3" />
          <path d="M5 14c2-1 4-1.5 7-1.5s5 .5 7 1.5" />
          <path d="M8 20c1-1 2.5-1.5 4-1.5s3 .5 4 1.5" />
          <circle cx="7" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="14" cy="9" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sand":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
          <circle cx="17" cy="6" r="3" />
          <path d="M3 18c4-3 8-4 12-4s8 1 12 4" />
          <path d="M6 15c2-1 4-1.5 6-1.5s4 .5 6 1.5" />
        </svg>
      );
    case "rocks":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
          <path d="M8 18 11 8l5 4 4-6 3 12H8z" />
          <path d="M5 18h14" />
        </svg>
      );
    case "steep":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
          <path d="M4 18 12 6l8 12H4z" />
          <path d="M12 10v4M12 14h.01" />
        </svg>
      );
    case "tires":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
        </svg>
      );
    case "experience":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
          <path d="M8 8l2 2M16 16l-2-2" />
        </svg>
      );
    default:
      return null;
  }
}

function WarningTipCard({
  id,
  label,
  text,
}: {
  id: WarningIconId;
  label: string;
  text: string;
}) {
  return (
    <li className="flex items-start gap-4 rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-4 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/30 sm:px-5 sm:py-4">
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
        aria-hidden="true"
      >
        <WarningIcon id={id} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-sm font-semibold text-amber-900 dark:text-amber-100">
          {label}
        </p>
        <p className="text-sm leading-relaxed text-amber-900/85 dark:text-amber-100/85">
          {text}
        </p>
      </div>
    </li>
  );
}

function VehicleResultCard({
  vehicle,
  onFindTrips,
  showTrips,
}: {
  vehicle: ResolvedVehicle;
  onFindTrips: () => void;
  showTrips: boolean;
}) {
  const category = getCategoryById(vehicle.category);
  const routes = getRoutesForCategory(vehicle.category);
  const warnings = getWarningsForCategory(vehicle.category);

  return (
    <div
      className="space-y-6"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`rounded-2xl border border-stone-200/80 bg-gradient-to-br p-6 shadow-sm dark:border-stone-800 dark:from-stone-900 dark:to-stone-950 ${offroadTheme.accent}`}
      >
        <p className="mb-1 text-sm font-medium text-stone-500 dark:text-stone-400">
          הרכב שלכם
        </p>
        <p className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-50 sm:text-2xl">
          {vehicle.label}
        </p>
        <p className="mb-1 text-base font-semibold text-stone-800 dark:text-stone-200">
          {category.label}
        </p>
        <p className="text-base leading-relaxed text-stone-600 dark:text-stone-400">
          {category.summary}
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold text-stone-900 dark:text-stone-50">
          סוגי מסלולים — מה מתאים?
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {routes.map((route) => (
            <li
              key={route.label}
              className="flex items-start gap-3 rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            >
              <span
                className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${
                  route.suitable
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                }`}
                aria-hidden="true"
              >
                {route.suitable ? <CheckIcon /> : <XIcon />}
              </span>
              <span className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
                {route.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {warnings.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-bold text-stone-900 dark:text-stone-50">
            שימו לב לפני שיוצאים
          </h3>
          <ul className="space-y-3">
            {warnings.map((warning) => (
              <WarningTipCard
                key={warning.id}
                id={warning.id as WarningIconId}
                label={warning.label}
                text={warning.text}
              />
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={onFindTrips}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 sm:w-auto"
      >
        {showTrips ? "הסתירו מסלולים" : "מצא טיולים שמתאימים לרכב שלי"}
      </button>
    </div>
  );
}

export default function VehicleTripMatch() {
  const brands = getVehicleBrands();
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [year, setYear] = useState("");
  const [showTrips, setShowTrips] = useState(false);
  const tripsRef = useRef<HTMLDivElement>(null);

  const models = useMemo(
    () => (brandId ? getModelsForBrand(brandId) : []),
    [brandId],
  );

  const years = useMemo(
    () => (brandId && modelId ? getYearsForModel(brandId, modelId) : []),
    [brandId, modelId],
  );

  const resolvedVehicle = useMemo(() => {
    if (!brandId || !modelId || !year) return null;
    return resolveVehicleSelection({
      brandId,
      modelId,
      year: Number(year),
    });
  }, [brandId, modelId, year]);

  const matchedTrips = useMemo(() => {
    if (!resolvedVehicle) return [];
    return getTripsForVehicleCategory(getPublishedTrips(), resolvedVehicle.category);
  }, [resolvedVehicle]);

  function resetResults() {
    setShowTrips(false);
  }

  function handleBrandChange(value: string) {
    setBrandId(value);
    setModelId("");
    setYear("");
    resetResults();
  }

  function handleModelChange(value: string) {
    setModelId(value);
    setYear("");
    resetResults();
  }

  function handleYearChange(value: string) {
    setYear(value);
    resetResults();
  }

  function handleFindTrips() {
    setShowTrips((current) => {
      const next = !current;
      if (next) {
        requestAnimationFrame(() => {
          tripsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
      return next;
    });
  }

  const yearSelected = Boolean(year);
  const selectionComplete = Boolean(resolvedVehicle);

  return (
    <section
      id="vehicle-match"
      className="border-b border-stone-200/80 bg-white px-6 py-16 dark:border-stone-800 dark:bg-stone-900 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
          איזה רכב יש לך?
        </h2>
        <p className="mb-6 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
          בחרו יצרן, דגם ושנה — ונראה לכם איזה סוגי מסלולים עשויים להתאים לרכב
          שלכם.
        </p>

        <div
          className="mb-8 rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3.5 text-sm leading-relaxed text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100"
          role="note"
        >
          <strong className="font-semibold">שימו לב:</strong> זהו מדריך ראשוני
          וידידותי בלבד — לא תעודת כשירות, לא ייעוץ מקצועי ולא המלצה לנסוע
          בשטח. תמיד בדקו מצב דרך, רכב וניסיון לפני יציאה.
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="vehicle-brand"
              className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200"
            >
              יצרן רכב
            </label>
            <select
              id="vehicle-brand"
              value={brandId}
              onChange={(event) => handleBrandChange(event.target.value)}
              className={selectClassName}
            >
              <option value="">בחרו יצרן</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.nameHe} ({brand.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="vehicle-model"
              className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200"
            >
              דגם
            </label>
            <select
              id="vehicle-model"
              value={modelId}
              onChange={(event) => handleModelChange(event.target.value)}
              disabled={!brandId}
              className={selectClassName}
            >
              <option value="">בחרו דגם</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="vehicle-year"
              className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200"
            >
              שנה
            </label>
            <select
              id="vehicle-year"
              value={year}
              onChange={(event) => handleYearChange(event.target.value)}
              disabled={!modelId}
              className={selectClassName}
            >
              <option value="">בחרו שנה</option>
              {[...years].reverse().map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!yearSelected && (
          <p className="mb-8 text-sm text-stone-500 dark:text-stone-500">
            בחרו יצרן, דגם ושנה כדי לראות התאמה והמלצות.
          </p>
        )}

        {selectionComplete && resolvedVehicle && (
          <VehicleResultCard
            vehicle={resolvedVehicle}
            onFindTrips={handleFindTrips}
            showTrips={showTrips}
          />
        )}

        {showTrips && resolvedVehicle && (
          <div ref={tripsRef} className="mt-10 scroll-mt-24">
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-50 sm:text-2xl">
                מסלולים שמתאימים לרכב שלך
              </h3>
              <p className="text-stone-500 dark:text-stone-400">
                {matchedTrips.length > 0
                  ? `${matchedTrips.length} מסלולים מתאימים ל${getCategoryById(resolvedVehicle.category).shortLabel}`
                  : "לא נמצאו מסלולים מתאימים כרגע — נוסיף עוד בקרוב"}
              </p>
            </div>

            {matchedTrips.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {matchedTrips.map((trip) => (
                  <TripCard
                    key={trip.slug}
                    trip={trip}
                    region={getRegionForTrip(trip)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center dark:border-stone-700 dark:bg-stone-950">
                <p className="mb-4 text-stone-600 dark:text-stone-400">
                  בינתיים אין מסלולים מתויגים ברמת הגישה המתאימה — עיינו בכל
                  ההמלצות שלנו.
                </p>
                <Link
                  href="/recommendations"
                  className="group inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
                >
                  לכל המסלולים
                  <ArrowIcon />
                </Link>
              </div>
            )}
          </div>
        )}

        <PersonalRav4Card />
      </div>
    </section>
  );
}
