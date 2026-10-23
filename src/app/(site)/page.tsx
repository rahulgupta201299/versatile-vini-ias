import {
  HeroSlider,
  CelebrationArea,
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
import { getCelebrationBanner, getFreeResources, getHeroBanners, getImpactData, getMarketingBanners, getRankerStats, getResultBanners } from "@/services";

export default async function HomePage() {
  // All homepage data in parallel (each call is cached + revalidated, with local fallbacks)
  const [heroBanners, celebration, resources, marketingBanners, resultTabs, rankerStats, impact] = await Promise.all([
    getHeroBanners(),
    getCelebrationBanner(),
    getFreeResources(),
    getMarketingBanners(),
    getResultBanners(),
    getRankerStats(),
    getImpactData(),
  ]);

  return (
    <>
      {celebration ? (
        <CelebrationArea banner={celebration}>
          <HeroSlider banners={heroBanners} />
        </CelebrationArea>
      ) : (
        <HeroSlider banners={heroBanners} />
      )}
      <FreeResourcesSection resources={resources} />
      <MarketAdBanner banners={marketingBanners.first} />
      <ExamGoalSection />
      <SmallPromoBanner banners={marketingBanners.second} />
      <MentorshipCallbackSection />
      <TopRankersSection tabs={resultTabs} stats={rankerStats} />
      <ImpactStatsSection data={impact} />
      <EnquirySection />
      <AppDownloadSection />
    </>
  );
}
