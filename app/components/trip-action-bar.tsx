"use client";

import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { Trip } from "@/data/trips";
import { buildWhatsAppShareUrl } from "@/lib/trip-share";
import { getTripGoogleMapsUrl, getTripWazeUrl } from "@/lib/trip-location";

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function WazeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <img
      src="/icons/waze.svg"
      alt=""
      className={className}
      aria-hidden={true}
    />
  );
}

function MapsIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.75a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z" />
    </svg>
  );
}

type TripActionBarProps = {
  trip: Trip;
  variant?: "hero" | "article";
  className?: string;
};

const variantStyles = {
  hero: {
    container:
      "border-white/25 bg-white/90 shadow-lg shadow-stone-950/20 backdrop-blur-md",
    divider: "bg-white/20",
    label: "text-stone-800",
    soon: "text-stone-400",
    shareHover: "hover:bg-emerald-50/90",
    wazeHover: "hover:bg-cyan-50/90",
    mapsHover: "hover:bg-stone-50/90",
    disabled: "bg-white/40 text-stone-400",
  },
  article: {
    container:
      "border-stone-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-stone-700 dark:bg-stone-900/95",
    divider: "bg-stone-200/70 dark:bg-stone-700/70",
    label: "text-stone-800 dark:text-stone-100",
    soon: "text-stone-400 dark:text-stone-500",
    shareHover: "hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40",
    wazeHover: "hover:bg-cyan-50/80 dark:hover:bg-cyan-950/30",
    mapsHover: "hover:bg-stone-50/80 dark:hover:bg-stone-800/60",
    disabled: "bg-stone-50/50 text-stone-400 dark:bg-stone-900/50 dark:text-stone-500",
  },
} as const;

function ActionDivider({ className }: { className: string }) {
  return <div className={`w-px shrink-0 self-stretch ${className}`} aria-hidden="true" />;
}

function ActionCell({
  href,
  label,
  soonLabel,
  icon,
  ariaLabel,
  hoverClassName,
  disabledClassName,
  labelClassName,
  soonClassName,
  onClick,
}: {
  href?: string;
  label: string;
  soonLabel?: string;
  icon: ReactNode;
  ariaLabel: string;
  hoverClassName: string;
  disabledClassName: string;
  labelClassName: string;
  soonClassName: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const cellClassName = `flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:ring-inset ${
    href
      ? `${hoverClassName} ${labelClassName}`
      : `${disabledClassName} cursor-not-allowed opacity-70`
  }`;

  const content = (
    <>
      {icon}
      <span className="max-w-full truncate text-[11px] font-semibold leading-tight sm:text-xs">
        {label}
      </span>
      {soonLabel ? (
        <span className={`text-[10px] font-medium leading-none ${soonClassName}`}>
          {soonLabel}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={onClick}
        className={cellClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-label={`${ariaLabel} — בקרוב`}
      className={cellClassName}
    >
      {content}
    </button>
  );
}

export default function TripActionBar({
  trip,
  variant = "hero",
  className = "",
}: TripActionBarProps) {
  const styles = variantStyles[variant];
  const wazeUrl = getTripWazeUrl(trip);
  const googleMapsUrl = getTripGoogleMapsUrl(trip);
  const [shareHref, setShareHref] = useState<string | null>(null);

  useEffect(() => {
    setShareHref(buildWhatsAppShareUrl(trip.title, window.location.href));
  }, [trip.title]);

  const handleShareClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (shareHref) {
        return;
      }

      event.preventDefault();
      const url = buildWhatsAppShareUrl(trip.title, window.location.href);
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [shareHref, trip.title],
  );

  return (
    <div
      className={`flex w-full max-w-lg overflow-hidden rounded-2xl border ${styles.container} ${className}`}
      role="group"
      aria-label="פעולות טיול"
    >
      <ActionCell
        href={shareHref ?? "#"}
        label="שתפו"
        icon={<WhatsAppIcon className="size-5 shrink-0 text-[#25D366]" />}
        ariaLabel={`שתפו את ${trip.title} עם חברים ב-WhatsApp`}
        hoverClassName={styles.shareHover}
        disabledClassName={styles.disabled}
        labelClassName={styles.label}
        soonClassName={styles.soon}
        onClick={handleShareClick}
      />
      <ActionDivider className={styles.divider} />
      <ActionCell
        href={wazeUrl}
        label="Waze"
        soonLabel={wazeUrl ? undefined : "בקרוב"}
        icon={<WazeIcon className="size-5 shrink-0" />}
        ariaLabel={`נווט עם Waze ל${trip.title}`}
        hoverClassName={styles.wazeHover}
        disabledClassName={styles.disabled}
        labelClassName={styles.label}
        soonClassName={styles.soon}
      />
      <ActionDivider className={styles.divider} />
      <ActionCell
        href={googleMapsUrl}
        label="מפות"
        soonLabel={googleMapsUrl ? undefined : "בקרוב"}
        icon={<MapsIcon className="size-5 shrink-0 text-[#ea4335]" />}
        ariaLabel={`נווט עם Google Maps ל${trip.title}`}
        hoverClassName={styles.mapsHover}
        disabledClassName={styles.disabled}
        labelClassName={styles.label}
        soonClassName={styles.soon}
      />
    </div>
  );
}
