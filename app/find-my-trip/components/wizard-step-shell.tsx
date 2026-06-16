import type { ReactNode } from "react";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export default function WizardStepShell({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "המשך",
  nextDisabled = false,
  showBack = true,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mx-auto max-w-lg text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mb-8">{children}</div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {showBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800 sm:w-auto"
          >
            <ArrowIcon />
            חזרה
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}

        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 sm:ms-auto sm:w-auto"
          >
            {nextLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
