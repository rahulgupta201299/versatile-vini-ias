import React from "react";
import { HeroBanner } from "@/types";
import SmallPromoBanner from "./SmallPromoBanner";

/**
 * 1st marketing banner, under "Browse Our Free Resources" (Web → Homepage → Marketing banner in the admin).
 * Same slider as the 2nd marketing banner; its id is the target of the header's Store button (/#market-ad).
 */
export default function MarketAdBanner({ banners }: { banners: HeroBanner[] }) {
  return <SmallPromoBanner id="market-ad" banners={banners} />;
}
