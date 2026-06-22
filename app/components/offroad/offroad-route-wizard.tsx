"use client";

import { useMemo, useState } from "react";
import TripCard, { getRegionForTrip } from "@/app/components/trip-card";
import type { Trip } from "@/data/trips";
import {
  OFFROAD_WIZARD_DURATIONS,
  OFFROAD_WIZARD_REGIONS,
} from "@/lib/offroad/content";
import {
  getOffroadRegionLabel,
  matchOffroadWizardTrips,
  type OffroadWizardAnswers,
} from "@/lib/offroad/trip-selection";
import {
  OffroadSectionHeader,
  offroadGlassCard,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

type OffroadRouteWizardProps = {
  trips: Trip[];
};

type WizardStep = keyof OffroadWizardAnswers;

const STEPS: { key: WizardStep; label: string }[] = [
  { key: "regionSlug", label: "אזור בארץ" },
  { key: "withKids", label: "מטיילים עם ילדים?" },
  { key: "wantsWater", label: "רוצים מים?" },
  { key: "wantsCamping", label: "רוצים קמפינג?" },
  { key: "wantsViewpoint", label: "רוצים תצפית?" },
  { key: "duration", label: "כמה שעות יש לכם?" },
];

const initialAnswers: OffroadWizardAnswers = {
  regionSlug: "any",
  withKids: null,
  wantsWater: null,
  wantsCamping: null,
  wantsViewpoint: null,
  duration: null,
};

function YesNoButtons({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "כן", choice: true },
        { label: "לא", choice: false },
      ].map((option) => (
        <button
          key={option.label}
          type="button"
          onClick={() => onChange(option.choice)}
          className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
            value === option.choice
              ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
              : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function OffroadRouteWizard({ trips }: OffroadRouteWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<OffroadWizardAnswers>(initialAnswers);
  const [showResults, setShowResults] = useState(false);

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  const matchedTrips = useMemo(() => {
    if (!showResults) return [];
    return matchOffroadWizardTrips(trips, answers);
  }, [answers, showResults, trips]);

  function updateAnswer<K extends WizardStep>(
    key: K,
    value: OffroadWizardAnswers[K],
  ) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function handleNext() {
    if (isLastStep) {
      setShowResults(true);
      return;
    }
    setStepIndex((current) => current + 1);
  }

  function handleBack() {
    if (showResults) {
      setShowResults(false);
      return;
    }
    setStepIndex((current) => Math.max(0, current - 1));
  }

  function handleRestart() {
    setAnswers(initialAnswers);
    setStepIndex(0);
    setShowResults(false);
  }

  const canContinue =
    currentStep.key === "regionSlug"
      ? Boolean(answers.regionSlug)
      : currentStep.key === "duration"
        ? answers.duration !== null
        : answers[currentStep.key] !== null;

  return (
    <section
      id="find-route"
      className={`${offroadSectionShell} scroll-mt-24 pb-20`}
    >
      <div className={offroadSectionInner}>
        <OffroadSectionHeader
          title="לא יודעים לאן לנסוע?"
          description="ענו על כמה שאלות קצרות — ונציע מסלולים שמתאימים לכם."
        />

        <div className={`${offroadGlassCard} mx-auto max-w-3xl p-5 sm:p-8`}>
          {!showResults ? (
            <>
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                  שאלה {stepIndex + 1} מתוך {STEPS.length}
                </p>
                <div className="flex gap-1.5">
                  {STEPS.map((step, index) => (
                    <span
                      key={step.key}
                      className={`h-1.5 rounded-full transition-all ${
                        index <= stepIndex
                          ? "w-8 bg-stone-900 dark:bg-stone-100"
                          : "w-3 bg-stone-200 dark:bg-stone-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="mb-5 text-xl font-bold text-stone-900 dark:text-stone-50 sm:text-2xl">
                {currentStep.label}
              </h3>

              {currentStep.key === "regionSlug" ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {OFFROAD_WIZARD_REGIONS.map((region) => (
                    <button
                      key={region.slug}
                      type="button"
                      onClick={() => updateAnswer("regionSlug", region.slug)}
                      className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                        answers.regionSlug === region.slug
                          ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                          : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
                      }`}
                    >
                      {region.label}
                    </button>
                  ))}
                </div>
              ) : null}

              {currentStep.key === "withKids" ? (
                <YesNoButtons
                  value={answers.withKids}
                  onChange={(value) => updateAnswer("withKids", value)}
                />
              ) : null}

              {currentStep.key === "wantsWater" ? (
                <YesNoButtons
                  value={answers.wantsWater}
                  onChange={(value) => updateAnswer("wantsWater", value)}
                />
              ) : null}

              {currentStep.key === "wantsCamping" ? (
                <YesNoButtons
                  value={answers.wantsCamping}
                  onChange={(value) => updateAnswer("wantsCamping", value)}
                />
              ) : null}

              {currentStep.key === "wantsViewpoint" ? (
                <YesNoButtons
                  value={answers.wantsViewpoint}
                  onChange={(value) => updateAnswer("wantsViewpoint", value)}
                />
              ) : null}

              {currentStep.key === "duration" ? (
                <div className="grid gap-3">
                  {OFFROAD_WIZARD_DURATIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => updateAnswer("duration", option.id)}
                      className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                        answers.duration === option.id
                          ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                          : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className="min-h-11 rounded-xl border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-200"
                >
                  חזרה
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canContinue}
                  className="min-h-11 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
                >
                  {isLastStep ? "הציגו מסלולים" : "המשך"}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm font-medium text-stone-500 dark:text-stone-400">
                  המסלולים שהכי מתאימים לכם
                </p>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 sm:text-2xl">
                  {getOffroadRegionLabel(answers.regionSlug)}
                  {answers.withKids ? " · עם ילדים" : ""}
                </h3>
              </div>

              {matchedTrips.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {matchedTrips.map((trip) => (
                    <TripCard
                      key={trip.slug}
                      trip={trip}
                      region={getRegionForTrip(trip)}
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-stone-300 px-6 py-10 text-center text-stone-500 dark:border-stone-700">
                  לא מצאנו התאמה מושלמת — נסו לשנות תשובה או לעיין בכל המסלולים.
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleBack}
                  className="min-h-11 rounded-xl border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 dark:border-stone-700 dark:text-stone-200"
                >
                  שינוי תשובות
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="min-h-11 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white dark:bg-stone-100 dark:text-stone-900"
                >
                  התחילו מחדש
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
