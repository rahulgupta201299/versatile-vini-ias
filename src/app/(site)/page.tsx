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
import { getHeroBanners, getImpactData, getLearningResources, getPromoBanners, getRankerStats, getResultBanners } from "@/services";

export default async function HomePage() {
  // All homepage data in parallel (each call is cached + revalidated, with local fallbacks)
  const [heroBanners, resources, promoBanners, resultTabs, rankerStats, impact] = await Promise.all([
    getHeroBanners(),
    getLearningResources(),
    getPromoBanners(),
    getResultBanners(),
    getRankerStats(),
    getImpactData(),
  ]);

  return (
    <>
      <HeroSlider banners={heroBanners} />
      <FreeResourcesSection resources={resources} />
      <MarketAdBanner />
      <ExamGoalSection />
      <SmallPromoBanner banners={promoBanners} />
      <MentorshipCallbackSection />
      <TopRankersSection tabs={resultTabs} stats={rankerStats} />
      <ImpactStatsSection data={impact} />
      <EnquirySection />
      <AppDownloadSection />
    </>
  );
}
