import type { ReactNode } from "react";
import {
  ACTIVITY_OPTIONS,
  BUDGET_OPTIONS,
  COMPANION_OPTIONS,
  TRAVEL_TIME_OPTIONS,
  WEATHER_OPTIONS,
} from "@/lib/find-my-trip/constants";
import {
  getActivityOptionIcon,
  getBudgetOptionIcon,
  getCompanionOptionIcon,
  getTravelOptionIcon,
  getWeatherOptionIcon,
} from "@/app/find-my-trip/components/wizard-icons";

export type WizardOptionWithIcon = {
  id: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
};

export const COMPANION_OPTIONS_WITH_ICONS: WizardOptionWithIcon[] =
  COMPANION_OPTIONS.map((option) => ({
    ...option,
    icon: getCompanionOptionIcon(option.id),
  }));

export const ACTIVITY_OPTIONS_WITH_ICONS: WizardOptionWithIcon[] =
  ACTIVITY_OPTIONS.map((option) => ({
    ...option,
    icon: getActivityOptionIcon(option.id),
  }));

export const TRAVEL_TIME_OPTIONS_WITH_ICONS: WizardOptionWithIcon[] =
  TRAVEL_TIME_OPTIONS.map((option) => ({
    ...option,
    icon: getTravelOptionIcon(option.id),
  }));

export const BUDGET_OPTIONS_WITH_ICONS: WizardOptionWithIcon[] =
  BUDGET_OPTIONS.map((option) => ({
    ...option,
    icon: getBudgetOptionIcon(option.id),
  }));

export const WEATHER_OPTIONS_WITH_ICONS: WizardOptionWithIcon[] =
  WEATHER_OPTIONS.map((option) => ({
    ...option,
    icon: getWeatherOptionIcon(option.id),
  }));
