import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FreeResourceHero, EnrollBand, CourseOverview, CourseFit, ContactInfo, CourseFaqs, StickyEnrollBar } from "@/sections/FreeResource";
import { TopRankersSection, EnquirySection } from "@/sections";
import { BatchHero, BatchStats, BatchStages, BatchPlans, BatchFaq } from "@/sections/BatchCourse";
import { LandingHero, LandingFeatures, LandingHighlights, LandingInfographic, LandingStudyMaterial, LandingEnquiry } from "@/sections/CourseLanding";
import { getFreeResourcePage, getFreeResourceSlugs, getRankerStats, getResultBanners } from "@/services";
import { FREE_RESOURCE_BASE } from "@/utils/slug";

type Params = Promise<{ freeResources: string }>;

/** GS Foundation menu items are built ahead of time; new ones from the server render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getFreeResourceSlugs()).map((freeResources) => ({ freeResources }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { freeResources } = await params;
  const page = await getFreeResourcePage(freeResources);
  if (!page) return {};
  const title = `${page.title} | Vini IAS`;
  const url = `${FREE_RESOURCE_BASE}/${page.slug}`;
  return {
    title,
    description: page.summary,
    alternates: { canonical: url },
    openGraph: { title, description: page.summary, url, images: ["/images/logo.png"] },
  };
}

export default async function FreeResourcePage({ params }: { params: Params }) {
  const { freeResources } = await params;
  const page = await getFreeResourcePage(freeResources);
  if (!page) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  // Live batch layout (e.g. GS Foundation Batch 2027/29) — toppers come from the homepage results
  if (page.batch) {
    const { batch } = page;
    const [resultTabs, rankerStats] = await Promise.all([getResultBanners(), getRankerStats()]);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <BatchHero hero={batch.hero} plans={batch.plans} />
        <BatchStats stats={batch.stats} />
        <TopRankersSection tabs={resultTabs} stats={rankerStats} />
        <BatchStages data={batch} />
        <BatchPlans data={batch} />
        <BatchFaq faqs={page.faqs} expert={batch.expert} />
      </>
    );
  }

  // Pages with a designed landing layout (e.g. NCERT Foundation Batch)
  if (page.landing) {
    const { landing } = page;
    return (
      <>
        <LandingHero hero={landing.hero} />
        <LandingFeatures items={landing.features} />
        <LandingHighlights data={landing.highlights} />
        <LandingInfographic data={landing.infographic} />
        <LandingStudyMaterial data={landing.studyMaterial} />
        <LandingEnquiry data={landing.enquiry} course={page.title} />
      </>
    );
  }

  const [resultTabs, rankerStats] = await Promise.all([getResultBanners(), getRankerStats()]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* Same order as the reference page (educators and live schedule left out) */}
      <FreeResourceHero page={page} />
      <EnrollBand priceLabel={page.priceLabel} isFree={page.isFree} />
      <EnquirySection />
      <CourseFaqs faqs={page.faqs} />
      <CourseOverview page={page} />
      <TopRankersSection tabs={resultTabs} stats={rankerStats} />
      <CourseFit page={page} />
      <ContactInfo />
      <StickyEnrollBar title={page.title} priceLabel={page.priceLabel} isFree={page.isFree} />
    </>
  );
}
