import type { ReactNode } from "react";
import type {
  ActivityType,
  BudgetTier,
  CompanionType,
  TravelTime,
  WeatherPreference,
} from "@/lib/find-my-trip/types";

type IconProps = { className?: string };

function IconShell({
  children,
  className = "size-7 sm:size-8",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${className}`}>
      {children}
    </span>
  );
}

export function SoloIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function FriendsIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-2.8 2.7-5 6-5" strokeLinecap="round" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M13 20c0-2.2 2-4 4.5-4" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function KidsIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="7" r="3" />
        <path d="M8 20v-4l4-2 4 2v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

export function FamilyIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="9" cy="8" r="2.5" />
        <circle cx="16" cy="9" r="2" />
        <path d="M4 20c0-2.5 2.2-4.5 5-4.5M15 20c0-1.8 1.6-3.2 3.5-3.2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    </IconShell>
  );
}

export function WaterIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 3c3 4.5 6 7.5 6 11a6 6 0 1 1-12 0c0-3.5 3-6.5 6-11Z" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

export function NatureIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 21V10" strokeLinecap="round" />
        <path d="M8 21c2-6 8-6 8 0" strokeLinecap="round" />
        <path d="M6 12c2-4 4-6 6-8 2 2 4 4 6 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

export function ViewpointIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M4 18 12 6l8 12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 18h8" strokeLinecap="round" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    </IconShell>
  );
}

export function PicnicIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M4 10h16" strokeLinecap="round" />
        <path d="M7 10V6M17 10V6" strokeLinecap="round" />
        <path d="M6 14h12v2H6z" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

export function TrailIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M4 18c2-4 4-6 8-8 4 2 6 4 8 8" strokeLinecap="round" />
        <circle cx="7" cy="7" r="2" />
      </svg>
    </IconShell>
  );
}

export function CampingIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M4 18 12 6l8 12H4Z" strokeLinejoin="round" />
        <path d="M12 11v7" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function ClockShortIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 12V8" strokeLinecap="round" />
        <path d="M12 12l3 2" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function ClockHourIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

export function ClockLongIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l4 2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 5l2-1" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function AnyIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M6 12h12" strokeLinecap="round" />
        <path d="M4 12a8 8 0 1 0 16 0" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function FreeIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 0 1 0 2.828l-7 7a2 2 0 0 1-2.828 0l-7-7A2 2 0 0 1 3 12V7a4 4 0 0 1 4-4Z" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

export function CoinIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M9 12h6" strokeLinecap="round" />
        <path d="M12 9v6" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function Above50Icon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="9" cy="12" r="6" />
        <circle cx="16" cy="12" r="5" />
        <path d="M9 10v4M16 10v4" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function HotIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function PleasantIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M7 14a5 5 0 0 1 10 0" strokeLinecap="round" />
        <path d="M8 10h.01M16 10h.01" strokeLinecap="round" />
        <path d="M7 18h10" strokeLinecap="round" />
        <path d="M16 6c1 1 2 1 3 0" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function ColdIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 3v18" strokeLinecap="round" />
        <path d="M8 7l4-4 4 4M8 17l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 12h14" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

export function RainyIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M7 14a5 5 0 0 1 9.9-1" strokeLinecap="round" />
        <path d="M8 18l-1 2M12 18v2M16 18l1 2" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

const COMPANION_ICONS: Record<CompanionType, (props: IconProps) => ReactNode> = {
  solo: SoloIcon,
  friends: FriendsIcon,
  kids: KidsIcon,
  family: FamilyIcon,
};

const ACTIVITY_ICONS: Record<ActivityType, (props: IconProps) => ReactNode> = {
  water: WaterIcon,
  "nature-shade": NatureIcon,
  viewpoint: ViewpointIcon,
  picnic: PicnicIcon,
  "easy-trails": TrailIcon,
  camping: CampingIcon,
};

const TRAVEL_ICONS: Record<TravelTime, (props: IconProps) => ReactNode> = {
  "30m": ClockShortIcon,
  "1h": ClockHourIcon,
  "1h-plus": ClockLongIcon,
  any: AnyIcon,
};

const BUDGET_ICONS: Record<BudgetTier, (props: IconProps) => ReactNode> = {
  free: FreeIcon,
  "up-to-50": CoinIcon,
  "above-50": Above50Icon,
  any: AnyIcon,
};

const WEATHER_ICONS: Record<WeatherPreference, (props: IconProps) => ReactNode> = {
  hot: HotIcon,
  pleasant: PleasantIcon,
  cold: ColdIcon,
  rainy: RainyIcon,
};

export function getCompanionOptionIcon(id: CompanionType): ReactNode {
  const Icon = COMPANION_ICONS[id];
  return <Icon />;
}

export function getActivityOptionIcon(id: ActivityType): ReactNode {
  const Icon = ACTIVITY_ICONS[id];
  return <Icon />;
}

export function getTravelOptionIcon(id: TravelTime): ReactNode {
  const Icon = TRAVEL_ICONS[id];
  return <Icon />;
}

export function getBudgetOptionIcon(id: BudgetTier): ReactNode {
  const Icon = BUDGET_ICONS[id];
  return <Icon />;
}

export function getWeatherOptionIcon(id: WeatherPreference): ReactNode {
  const Icon = WEATHER_ICONS[id];
  return <Icon />;
}
