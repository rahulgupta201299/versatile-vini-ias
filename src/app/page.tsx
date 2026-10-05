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

export default async function HomePage() {
  const resultBannerTabs = await getResultBanners();

  return (
    <>
      <HeroSlider />
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
