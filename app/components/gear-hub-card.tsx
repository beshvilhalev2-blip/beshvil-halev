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
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
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
      className="size-7"
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
      className="size-7"
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
      className="size-7"
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
      className="size-7"
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
      className="size-7"
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

type GearHubCardProps = {
  title: string;
  description: string;
  icon: GearHubOptionIcon;
  iconBg: string;
  accent: string;
  borderHover: string;
  status: "coming-soon" | "active";
  cta?: string;
  href?: string;
  onSelect?: () => void;
};

function HubIcon({ icon }: { icon: GearHubOptionIcon }) {
  const Icon = hubIcons[icon];
  return <Icon />;
}

function CardContent({
  title,
  description,
  icon,
  iconBg,
  status,
  cta,
}: Pick<
  GearHubCardProps,
  "title" | "description" | "icon" | "iconBg" | "status" | "cta"
>) {
  return (
    <>
      <div
        className={`relative mb-5 inline-flex size-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${iconBg}`}
      >
        <HubIcon icon={icon} />
      </div>

      <h2 className="relative mb-2 text-xl font-bold text-stone-900 dark:text-stone-50">
        {title}
      </h2>

      <p className="relative mb-6 flex-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
        {description}
      </p>

      {status === "coming-soon" ? (
        <span className="relative inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-stone-100 px-4 py-2.5 text-sm font-semibold text-stone-500 dark:bg-stone-800 dark:text-stone-400">
          בקרוב
        </span>
      ) : (
        <span className="relative inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:group-hover:bg-stone-200">
          {cta}
          <ArrowIcon />
        </span>
      )}
    </>
  );
}

export default function GearHubCard({
  title,
  description,
  icon,
  iconBg,
  accent,
  borderHover,
  status,
  cta,
  href,
  onSelect,
}: GearHubCardProps) {
  const cardClassName = `group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 dark:bg-stone-900 ${
    status === "active"
      ? `${borderHover} hover:-translate-y-1 hover:shadow-xl`
      : "border-stone-200/80 opacity-95 dark:border-stone-800"
  }`;

  const gradientClassName = `pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent}`;

  if (status === "active" && onSelect) {
    return (
      <button type="button" onClick={onSelect} className={`${cardClassName} group text-start`}>
        <div className={gradientClassName} />
        <CardContent
          title={title}
          description={description}
          icon={icon}
          iconBg={iconBg}
          status={status}
          cta={cta}
        />
      </button>
    );
  }

  if (status === "active" && href) {
    return (
      <Link href={href} className={`${cardClassName} group`}>
        <div className={gradientClassName} />
        <CardContent
          title={title}
          description={description}
          icon={icon}
          iconBg={iconBg}
          status={status}
          cta={cta}
        />
      </Link>
    );
  }

  return (
    <article className={cardClassName} aria-disabled="true">
      <div className={`${gradientClassName} opacity-0`} />
      <CardContent
        title={title}
        description={description}
        icon={icon}
        iconBg={iconBg}
        status={status}
        cta={cta}
      />
    </article>
  );
}
