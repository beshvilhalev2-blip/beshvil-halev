"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { getTripBySlug, trips } from "@/data/trips";
import FindMyTripResults from "@/app/find-my-trip/components/find-my-trip-results";
import WizardOptionGrid from "@/app/find-my-trip/components/wizard-option-grid";
import WizardProgress from "@/app/find-my-trip/components/wizard-progress";
import WizardStepShell from "@/app/find-my-trip/components/wizard-step-shell";
import { WIZARD_STEP_COPY } from "@/app/find-my-trip/wizard-config";
import {
  ACTIVITY_OPTIONS,
  BUDGET_OPTIONS,
  CITY_OPTIONS,
  COMPANION_OPTIONS,
  TRAVEL_TIME_OPTIONS,
  WEATHER_OPTIONS,
} from "@/lib/find-my-trip/constants";
import {
  matchTripsFromAnswers,
  toTripRef,
} from "@/lib/find-my-trip";
import type {
  ActivityType,
  BudgetTier,
  CityId,
  CompanionType,
  MatchResult,
  TravelTime,
  WeatherPreference,
  WizardAnswers,
} from "@/lib/find-my-trip/types";
import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";
import { vehicleCategories } from "@/lib/vehicle-trip-match";

type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type WizardPhase = "wizard" | "results";

const tripRefs = trips.map(toTripRef);

const vehicleOptions = vehicleCategories.map((category) => ({
  id: category.id,
  label: category.shortLabel,
  sublabel: category.summary,
}));

export default function FindMyTripWizard() {
  const resultsAnchorRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<WizardPhase>("wizard");
  const [step, setStep] = useState<WizardStep>(1);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const [companion, setCompanion] = useState<CompanionType | null>(null);
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [city, setCity] = useState<CityId | null>(null);
  const [travelTime, setTravelTime] = useState<TravelTime | null>(null);
  const [budget, setBudget] = useState<BudgetTier | null>(null);
  const [weather, setWeather] = useState<WeatherPreference | null>(null);
  const [vehicle, setVehicle] = useState<VehicleCategoryId | null>(null);
  const [vehicleSkipped, setVehicleSkipped] = useState(false);

  const stepCopy = WIZARD_STEP_COPY[step - 1];

  const resolveTrip = useCallback((slug: string) => getTripBySlug(slug), []);

  const canContinue = useMemo(() => {
    switch (step) {
      case 1:
        return companion !== null;
      case 2:
        return activity !== null;
      case 3:
        return city !== null;
      case 4:
        return travelTime !== null;
      case 5:
        return budget !== null;
      case 6:
        return weather !== null;
      case 7:
        return vehicleSkipped || vehicle !== null;
      default:
        return false;
    }
  }, [
    step,
    companion,
    activity,
    city,
    travelTime,
    budget,
    weather,
    vehicle,
    vehicleSkipped,
  ]);

  const buildAnswers = useCallback(
    (vehicleOverride?: WizardAnswers["vehicle"]): WizardAnswers | null => {
      if (
        !companion ||
        !activity ||
        !city ||
        !travelTime ||
        !budget ||
        !weather
      ) {
        return null;
      }

      const resolvedVehicle =
        vehicleOverride !== undefined
          ? vehicleOverride
          : vehicleSkipped
            ? null
            : vehicle;

      return {
        companion,
        activity,
        city,
        travelTime,
        budget,
        weather,
        vehicle: resolvedVehicle,
        completedAt: new Date().toISOString(),
      };
    },
    [
      companion,
      activity,
      city,
      travelTime,
      budget,
      weather,
      vehicle,
      vehicleSkipped,
    ],
  );

  const runMatching = useCallback(
    (vehicleOverride?: WizardAnswers["vehicle"]) => {
      const answers = buildAnswers(vehicleOverride);
      if (!answers) {
        return;
      }

      const result = matchTripsFromAnswers(answers, tripRefs);
      setMatchResult(result);
      setPhase("results");

      requestAnimationFrame(() => {
        resultsAnchorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
    [buildAnswers],
  );

  const handleNext = () => {
    if (!canContinue) {
      return;
    }

    if (step < 7) {
      setStep((current) => (current + 1) as WizardStep);
      return;
    }

    runMatching();
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((current) => (current - 1) as WizardStep);
    }
  };

  const handleRestart = () => {
    setPhase("wizard");
    setStep(1);
    setMatchResult(null);
    setCompanion(null);
    setActivity(null);
    setCity(null);
    setTravelTime(null);
    setBudget(null);
    setWeather(null);
    setVehicle(null);
    setVehicleSkipped(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSkipVehicle = () => {
    setVehicleSkipped(true);
    setVehicle(null);
    runMatching(null);
  };

  const nextLabel = step === 7 ? "מצאי לי טיולים" : "המשך";

  return (
    <div className="bg-stone-50 px-6 pb-16 pt-28 dark:bg-stone-950 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-4 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
            מצאי לי טיול
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
            בואי נמצא את הטיול שלך
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-stone-600 dark:text-stone-400">
            עני על {WIZARD_STEP_COPY.length} שאלות קצרות — ונציע לך מסלולים
            שמתאימים לך
          </p>
        </div>

        {phase === "wizard" ? (
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
            <WizardProgress step={step} />

            <WizardStepShell
              title={stepCopy.title}
              subtitle={stepCopy.subtitle}
              onBack={step > 1 ? handleBack : undefined}
              onNext={step === 7 && vehicleSkipped ? undefined : handleNext}
              nextLabel={nextLabel}
              nextDisabled={!canContinue}
              showBack={step > 1}
            >
              {step === 1 ? (
                <WizardOptionGrid
                  name="companion"
                  options={COMPANION_OPTIONS}
                  selectedId={companion}
                  onSelect={(id) => setCompanion(id as CompanionType)}
                />
              ) : null}

              {step === 2 ? (
                <WizardOptionGrid
                  name="activity"
                  options={ACTIVITY_OPTIONS}
                  selectedId={activity}
                  onSelect={(id) => setActivity(id as ActivityType)}
                />
              ) : null}

              {step === 3 ? (
                <WizardOptionGrid
                  name="city"
                  options={CITY_OPTIONS}
                  selectedId={city}
                  onSelect={(id) => setCity(id as CityId)}
                />
              ) : null}

              {step === 4 ? (
                <WizardOptionGrid
                  name="travel-time"
                  options={TRAVEL_TIME_OPTIONS}
                  selectedId={travelTime}
                  onSelect={(id) => setTravelTime(id as TravelTime)}
                />
              ) : null}

              {step === 5 ? (
                <WizardOptionGrid
                  name="budget"
                  options={BUDGET_OPTIONS}
                  selectedId={budget}
                  onSelect={(id) => setBudget(id as BudgetTier)}
                />
              ) : null}

              {step === 6 ? (
                <WizardOptionGrid
                  name="weather"
                  options={WEATHER_OPTIONS}
                  selectedId={weather}
                  onSelect={(id) => setWeather(id as WeatherPreference)}
                />
              ) : null}

              {step === 7 ? (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={handleSkipVehicle}
                    className="flex w-full min-h-12 items-center justify-center rounded-2xl bg-stone-900 px-5 py-4 text-base font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
                  >
                    דלגי — לא רלוונטי
                  </button>

                  <div>
                    <p className="mb-4 text-center text-sm font-medium text-stone-500 dark:text-stone-400">
                      או בחרי סוג רכב
                    </p>
                    <WizardOptionGrid
                      name="vehicle"
                      options={vehicleOptions}
                      selectedId={vehicleSkipped ? null : vehicle}
                      onSelect={(id) => {
                        setVehicleSkipped(false);
                        setVehicle(id as VehicleCategoryId);
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </WizardStepShell>
          </div>
        ) : null}

        <div ref={resultsAnchorRef} className="scroll-mt-28">
          {phase === "results" && matchResult ? (
            <FindMyTripResults
              result={matchResult}
              resolveTrip={resolveTrip}
              onRestart={handleRestart}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
