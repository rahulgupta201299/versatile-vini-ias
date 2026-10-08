"use client";

import React, { createContext, useContext } from "react";
import { SiteData } from "@/types";

const SiteDataContext = createContext<SiteData | null>(null);

/** Makes the site-wide server data (navigation, exams, contact, footer…) available to client components. */
export function SiteDataProvider({ value, children }: { value: SiteData; children: React.ReactNode }) {
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteData {
  const data = useContext(SiteDataContext);
  if (!data) throw new Error("useSiteData must be used inside <SiteDataProvider> (see app/layout.tsx)");
  return data;
}
