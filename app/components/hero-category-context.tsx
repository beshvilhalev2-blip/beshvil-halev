"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AdventureCategoryId } from "@/lib/hero-adventure-selector";

type HeroCategoryContextValue = {
  setActiveCategory: (category: AdventureCategoryId | null) => void;
};

const HeroCategoryContext = createContext<HeroCategoryContextValue | null>(null);

export function HeroCategoryProvider({
  children,
  setActiveCategory,
}: {
  children: ReactNode;
  setActiveCategory: (category: AdventureCategoryId | null) => void;
}) {
  return (
    <HeroCategoryContext.Provider value={{ setActiveCategory }}>
      {children}
    </HeroCategoryContext.Provider>
  );
}

export function useHeroCategory() {
  const context = useContext(HeroCategoryContext);
  if (!context) {
    throw new Error("useHeroCategory must be used within HeroCategoryProvider");
  }
  return context;
}
