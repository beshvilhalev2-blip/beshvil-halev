import { WIZARD_STEP_COUNT } from "@/lib/find-my-trip/constants";

export default function WizardProgress({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-center text-sm font-medium text-stone-500 dark:text-stone-400">
        שאלה {step} מתוך {WIZARD_STEP_COUNT}
      </p>
      <div
        className="flex items-center justify-center gap-2"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={WIZARD_STEP_COUNT}
        aria-label={`שאלה ${step} מתוך ${WIZARD_STEP_COUNT}`}
      >
        {Array.from({ length: WIZARD_STEP_COUNT }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === step;
          const isComplete = stepNumber < step;

          return (
            <span
              key={stepNumber}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-8 bg-stone-900 dark:bg-stone-100"
                  : isComplete
                    ? "w-2 bg-stone-400 dark:bg-stone-500"
                    : "w-2 bg-stone-200 dark:bg-stone-700"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
