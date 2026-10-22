import {
  HeroSlider,
  CelebrationBanner,
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
import { getCelebrationBanner, getHeroBanners, getImpactData, getLearningResources, getPromoBanners, getRankerStats, getResultBanners } from "@/services";

export default async function HomePage() {
  // All homepage data in parallel (each call is cached + revalidated, with local fallbacks)
  const [heroBanners, celebration, resources, promoBanners, resultTabs, rankerStats, impact] = await Promise.all([
    getHeroBanners(),
    getCelebrationBanner(),
    getLearningResources(),
    getPromoBanners(),
    getResultBanners(),
    getRankerStats(),
    getImpactData(),
  ]);

  return (
    <>
      <HeroSlider banners={heroBanners} />
      {celebration && <CelebrationBanner banner={celebration} />}
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
