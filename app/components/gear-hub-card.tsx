import Link from "next/link";
import type { ReactNode } from "react";
import type { GearHubOptionIcon } from "@/lib/gear-checklist/constants";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 text-stone-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CampingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="M4 20 12 4l8 16" />
      <path d="M8 20h8" />
      <path d="M12 4v16" />
    </svg>
  );
}

function DayTripIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function OffroadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="M3 17h2l1.5-5.5a2 2 0 0 1 1.9-1.5H15a2 2 0 0 1 1.9 1.3L18.5 17H21" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 10.5V9a2 2 0 0 1 2-2h2" />
      <path d="M14 7h3l1 3.5" />
    </svg>
  );
}

function CookingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="M6 10V4a2 2 0 0 1 4 0v6" />
      <path d="M8 10V5a2 2 0 0 1 4 0v5" />
      <path d="M10 10V6a2 2 0 0 1 4 0v4" />
      <path d="M4 10h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2Z" />
    </svg>
  );
}

function ByTripIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" />
      <path d="M12 22V12" />
      <path d="m4 7 8 5 8-5" />
      <path d="M12 12 4 7" />
      <path d="m12 12 8-5" />
    </svg>
  );
}

const hubIcons: Record<GearHubOptionIcon, () => ReactNode> = {
  camping: CampingIcon,
  "day-trip": DayTripIcon,
  offroad: OffroadIcon,
  cooking: CookingIcon,
  "by-trip": ByTripIcon,
};

type GearHubCardBaseProps = {
  title: string;
  description: string;
  icon: GearHubOptionIcon;
  iconBg: string;
  accent?: string;
  cta?: string;
};

type GearHubPresetCardProps = GearHubCardBaseProps & {
  variant: "preset";
  presetId: string;
  itemCount: number;
  readinessPercent?: number;
  readinessHydrated?: boolean;
  isOpen?: boolean;
  onToggle: () => void;
};

type GearHubLinkCardProps = GearHubCardBaseProps & {
  variant: "link";
  href: string;
  borderHover?: string;
};

type GearHubCardProps = GearHubPresetCardProps | GearHubLinkCardProps;

function HubIcon({ icon }: { icon: GearHubOptionIcon }) {
  const Icon = hubIcons[icon];
  return <Icon />;
}

function PresetCardContent({
  title,
  description,
  icon,
  iconBg,
  itemCount,
  readinessPercent,
  readinessHydrated,
  isOpen,
  cta,
}: Omit<GearHubPresetCardProps, "variant" | "onToggle" | "accent" | "presetId">) {
  const showReadiness =
    readinessHydrated &&
    readinessPercent !== undefined &&
    readinessPercent > 0;

  return (
    <>
      <div className="flex items-start gap-3">
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <HubIcon icon={icon} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-50 sm:text-lg">
              {title}
            </h2>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {itemCount} פריטים
            </span>
            {showReadiness && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {readinessPercent}% מוכנות
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {description}
          </p>
        </div>

        <ChevronIcon open={Boolean(isOpen)} />
      </div>

      <span
        className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
          isOpen
            ? "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200"
            : "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
        }`}
      >
        {cta}
      </span>
    </>
  );
}

function LinkCardContent({
  title,
  description,
  icon,
  iconBg,
  cta,
}: Pick<GearHubLinkCardProps, "title" | "description" | "icon" | "iconBg" | "cta">) {
  return (
    <>
      <div className="flex items-start gap-3">
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <HubIcon icon={icon} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="mb-1 text-base font-bold text-stone-900 dark:text-stone-50 sm:text-lg">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {description}
          </p>
        </div>
      </div>

      <span className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:group-hover:bg-stone-200">
        {cta}
        <ArrowIcon />
      </span>
    </>
  );
}

export default function GearHubCard(props: GearHubCardProps) {
  if (props.variant === "preset") {
    const {
      title,
      description,
      icon,
      iconBg,
      accent,
      presetId,
      itemCount,
      readinessPercent,
      readinessHydrated,
      isOpen,
      cta,
      onToggle,
    } = props;

    return (
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`gear-checklist-${presetId}`}
        className={`group relative w-full p-4 text-start transition-colors sm:p-5 ${
          isOpen
            ? "bg-stone-50/80 dark:bg-stone-800/30"
            : "hover:bg-stone-50/50 dark:hover:bg-stone-800/20"
        }`}
      >
        {accent && (
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-60"} ${accent}`}
          />
        )}
        <div className="relative">
          <PresetCardContent
            title={title}
            description={description}
            icon={icon}
            iconBg={iconBg}
            itemCount={itemCount}
            readinessPercent={readinessPercent}
            readinessHydrated={readinessHydrated}
            isOpen={isOpen}
            cta={cta}
          />
        </div>
      </button>
    );
  }

  const { title, description, icon, iconBg, accent, borderHover, href, cta } =
    props;

  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl border bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-stone-900 sm:p-5 ${
        borderHover ?? "border-stone-200/80 dark:border-stone-800"
      }`}
    >
      {accent && (
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accent}`}
        />
      )}
      <div className="relative">
        <LinkCardContent
          title={title}
          description={description}
          icon={icon}
          iconBg={iconBg}
          cta={cta}
        />
      </div>
    </Link>
  );
}
