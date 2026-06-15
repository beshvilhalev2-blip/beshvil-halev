import type { ReactNode } from "react";

export type WizardOption = {
  id: string;
  label: string;
  sublabel?: string;
  icon?: ReactNode;
};

export default function WizardOptionGrid({
  options,
  selectedId,
  onSelect,
  name,
}: {
  options: WizardOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  name: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            name={name}
            onClick={() => onSelect(option.id)}
            aria-pressed={isSelected}
            className={`flex min-h-[96px] flex-col items-center gap-2 overflow-visible rounded-2xl border px-3 py-4 text-center transition-all duration-200 sm:min-h-[112px] sm:px-4 ${
              option.sublabel
                ? "justify-start pt-3 sm:justify-center sm:pt-4"
                : "justify-center"
            } ${
              isSelected
                ? "border-stone-900 bg-stone-900 text-white shadow-md ring-2 ring-stone-900/20 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:ring-stone-100/20"
                : "border-stone-200/80 bg-white text-stone-800 hover:border-stone-300 hover:shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-600"
            }`}
          >
            {option.icon ? (
              <span
                className={`flex shrink-0 items-center justify-center [&_svg]:size-6 sm:[&_svg]:size-7 ${
                  isSelected
                    ? "text-white dark:text-stone-900"
                    : "text-stone-700 dark:text-stone-200"
                }`}
              >
                {option.icon}
              </span>
            ) : null}
            <span className="min-w-0 text-base font-semibold leading-snug sm:text-lg">
              {option.label}
            </span>
            {option.sublabel ? (
              <span
                className={`min-w-0 text-xs leading-snug sm:text-sm ${
                  isSelected
                    ? "text-white/80 dark:text-stone-700"
                    : "text-stone-500 dark:text-stone-400"
                }`}
              >
                {option.sublabel}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
