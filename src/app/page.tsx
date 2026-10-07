import {
  HeroSlider,
  FreeResourcesSection,
  MarketAdBanner,
  ExamGoalSection,
  SmallPromoBanner,
  MentorshipCallbackSection,
  TopRankersSection,
  ImpactStatsSection,
  EnquirySection,
  AppDownloadSection,
} from "@/sections";
import { getResultBanners } from "@/services/resultBanners";
import { getHeroBanners } from "@/services/heroBanners";

export default async function HomePage() {
  const [heroBanners, resultBannerTabs] = await Promise.all([getHeroBanners(), getResultBanners()]);

  return (
    <>
      <HeroSlider banners={heroBanners} />
      <FreeResourcesSection />
      <MarketAdBanner />
      <ExamGoalSection />
      <SmallPromoBanner />
      <MentorshipCallbackSection />
      <TopRankersSection tabs={resultBannerTabs} />
      <ImpactStatsSection />
      <EnquirySection />
      <AppDownloadSection />
    </>
  );
}
