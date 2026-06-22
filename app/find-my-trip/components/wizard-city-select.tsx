"use client";

import { useMemo, useState } from "react";
import {
  CITY_GEOLOCATION_FEATURE,
  CITY_OPTIONS,
} from "@/lib/find-my-trip/constants";
import {
  filterCitiesByQuery,
  getNearestCityFromCoordinates,
  normalizeCitySearchQuery,
} from "@/lib/find-my-trip/city-selection";
import {
  getCitiesGroupedByRegion,
  getCityLabel,
} from "@/lib/find-my-trip/cities";
import type { CityId } from "@/lib/find-my-trip/types";

type GeolocationStatus = "idle" | "loading" | "success" | "denied" | "error";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0 text-stone-400"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-5 shrink-0 animate-spin"
      aria-hidden="true"
    >
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" strokeLinecap="round" />
    </svg>
  );
}

function CityOptionButton({
  cityId,
  label,
  isSelected,
  onSelect,
}: {
  cityId: CityId;
  label: string;
  isSelected: boolean;
  onSelect: (id: CityId) => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(cityId)}
      className={`flex w-full min-h-11 items-center rounded-xl px-4 py-3 text-start text-base font-medium transition-colors ${
        isSelected
          ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
          : "bg-white text-stone-800 hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
      }`}
    >
      {label}
    </button>
  );
}

export default function WizardCitySelect({
  selectedId,
  onSelect,
}: {
  selectedId: CityId | null;
  onSelect: (id: CityId) => void;
}) {
  const [query, setQuery] = useState("");
  const [geoStatus, setGeoStatus] = useState<GeolocationStatus>("idle");
  const [geoMessage, setGeoMessage] = useState<string | null>(null);

  const normalizedQuery = normalizeCitySearchQuery(query);
  const isSearching = normalizedQuery.length > 0;

  const groupedCities = useMemo(() => {
    if (isSearching) {
      return filterCitiesByQuery(normalizedQuery) ?? [];
    }
    return getCitiesGroupedByRegion();
  }, [isSearching, normalizedQuery]);

  const flatFilteredCities = useMemo(() => {
    if (!isSearching) {
      return null;
    }
    return groupedCities.flatMap((section) => section.cities);
  }, [groupedCities, isSearching]);

  const selectedLabel = selectedId ? getCityLabel(selectedId) : null;

  const handleUseLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGeoStatus("error");
      setGeoMessage(
        "לא הצלחנו לזהות מיקום - נסו שוב או בחרו עיר ידנית",
      );
      return;
    }

    setGeoStatus("loading");
    setGeoMessage("מאתרים את המיקום...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = getNearestCityFromCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        onSelect(nearest.cityId);
        setGeoStatus("success");
        setGeoMessage(`זיהינו: ${nearest.label}`);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setGeoStatus("denied");
          setGeoMessage(
            "לא קיבלנו הרשאה למיקום - אפשר לבחור עיר מהרשימה",
          );
          return;
        }

        setGeoStatus("error");
        setGeoMessage(
          "לא הצלחנו לזהות מיקום - נסו שוב או בחרו עיר ידנית",
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3.5 dark:border-stone-700 dark:bg-stone-950">
        <SearchIcon />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="חפשו עיר..."
          className="w-full bg-transparent text-base text-stone-800 placeholder:text-stone-400 focus:outline-none dark:text-stone-100"
          aria-label="חיפוש עיר"
        />
      </div>

      <button
        type="button"
        onClick={handleUseLocation}
        disabled={geoStatus === "loading"}
        data-feature={CITY_GEOLOCATION_FEATURE}
        className="flex w-full min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50 disabled:cursor-wait disabled:opacity-70 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
      >
        {geoStatus === "loading" ? <SpinnerIcon /> : <LocationIcon />}
        <span>השתמשו במיקום שלי</span>
      </button>

      {geoMessage ? (
        <p
          aria-live="polite"
          className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
            geoStatus === "success"
              ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
              : geoStatus === "denied" || geoStatus === "error"
                ? "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
                : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
          }`}
        >
          {geoMessage}
        </p>
      ) : null}

      {selectedLabel ? (
        <p className="text-sm text-stone-600 dark:text-stone-400">
          נבחר:{" "}
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {selectedLabel}
          </span>
        </p>
      ) : null}

      <div
        className="max-h-72 space-y-4 overflow-y-auto rounded-2xl border border-stone-200/80 bg-stone-50 p-2 dark:border-stone-700 dark:bg-stone-950/60"
        role="listbox"
        aria-label="בחירת עיר"
      >
        {isSearching ? (
          flatFilteredCities && flatFilteredCities.length > 0 ? (
            <ul className="space-y-2">
              {flatFilteredCities.map((city) => (
                <li key={city.id}>
                  <CityOptionButton
                    cityId={city.id}
                    label={city.label}
                    isSelected={selectedId === city.id}
                    onSelect={onSelect}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-stone-500 dark:text-stone-400">
              לא נמצאה עיר - נסו חיפוש אחר
            </p>
          )
        ) : (
          groupedCities.map((section) => (
            <section key={section.group}>
              <h3 className="sticky top-0 z-10 bg-stone-50 px-3 py-2 text-xs font-bold tracking-wide text-stone-500 dark:bg-stone-950/95 dark:text-stone-400">
                {section.group}
              </h3>
              <ul className="space-y-2">
                {section.cities.map((city) => (
                  <li key={city.id}>
                    <CityOptionButton
                      cityId={city.id}
                      label={city.label}
                      isSelected={selectedId === city.id}
                      onSelect={onSelect}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      <p className="text-xs text-stone-500 dark:text-stone-400">
        {CITY_OPTIONS.length} ערים וישובים ברשימה
      </p>
    </div>
  );
}
