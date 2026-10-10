import type { Metadata } from "next";
import { FreeResourceHero, EnrollBand, CourseOverview, CourseFit, ContactInfo, CourseFaqs, StickyEnrollBar } from "@/sections/FreeResource";
import { TopRankersSection, EnquirySection } from "@/sections";
import { BatchHero, BatchStats, BatchStages, BatchPlans, BatchFaq } from "@/sections/BatchCourse";
import { LandingHero, LandingFeatures, LandingHighlights, LandingInfographic, LandingStudyMaterial, LandingEnquiry } from "@/sections/CourseLanding";
import { MentorshipHero, CallbackBanner, ProgramTimeline, HowItWorks, FeatureCards, SyllabusStrip, ProblemSolution, PlanPicker, VeteranDiscount, EnrollPlanBand } from "@/sections/MentorshipCourse";
import { getRankerStats, getResultBanners } from "@/services";
import { FreeResourcePage } from "@/types";

/**
 * Shared renderer for /courses/<section>/<page>.
 * The layout is chosen by the content block the page carries:
 *   batch → live batch layout · landing → designed landing · mentorship → mentorship layout · else → standard course layout
 */

export function courseMetadata(page: FreeResourcePage | null, section: string): Metadata {
  if (!page) return {};
  const title = `${page.title} | Vini IAS`;
  const url = `/courses/${section}/${page.slug}`;
  return { title, description: page.summary, alternates: { canonical: url }, openGraph: { title, description: page.summary, url, images: ["/images/logo.png"] } };
}

function FaqJsonLd({ page }: { page: FreeResourcePage }) {
  if (!page.faqs.length) return null;
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export async function CoursePageView({ page }: { page: FreeResourcePage }) {
  // Live batch layout (e.g. GS Foundation Batch 2027/29) — toppers come from the homepage results
  if (page.batch) {
    const { batch } = page;
    const [resultTabs, rankerStats] = await Promise.all([getResultBanners(), getRankerStats()]);
    return (
      <>
        <FaqJsonLd page={page} />
        <BatchHero hero={batch.hero} plans={batch.plans} />
        <BatchStats stats={batch.stats} />
        <TopRankersSection tabs={resultTabs} stats={rankerStats} />
        <BatchStages data={batch} />
        <BatchPlans data={batch} />
        <BatchFaq faqs={page.faqs} expert={batch.expert} />
      </>
    );
  }

  // Designed landing layout (e.g. NCERT Foundation Batch)
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

  // Mentorship layout (Mentorship + GS Mains pages) — no educators; toppers when enabled
  if (page.mentorship) {
    const m = page.mentorship;
    const [resultTabs, rankerStats] = m.showToppers ? await Promise.all([getResultBanners(), getRankerStats()]) : [null, null];
    const toppers = resultTabs && rankerStats ? <TopRankersSection tabs={resultTabs} stats={rankerStats} /> : null;
    const story = Boolean(m.problem || m.solution); // Mains Mentorship style
    const syllabus = m.syllabus ? <SyllabusStrip title={m.syllabus.title} url={m.syllabus.url} /> : null;
    return (
      <>
        <FaqJsonLd page={page} />
        <MentorshipHero page={page} data={m} />
        {!story && syllabus}
        <CallbackBanner />
        {story && toppers}
        {story && <ProblemSolution problem={m.problem} solution={m.solution} />}
        {story && syllabus}
        {m.timeline && <ProgramTimeline data={m.timeline} />}
        {m.howItWorks && <HowItWorks data={m.howItWorks} />}
        <FeatureCards data={m.features} id={m.timeline || story ? undefined : "course-details"} />
        {!story && toppers}
        {m.comparison && <BatchPlans data={m.comparison} />}
        {m.planPicker && <PlanPicker data={m.planPicker} />}
        {m.discount && <VeteranDiscount data={m.discount} />}
        {!m.planPicker && <EnrollBand priceLabel={page.priceLabel} isFree={page.isFree} priceNote={m.priceNote} />}
        {m.planPicker?.plans.some((p) => p.price) && <EnrollPlanBand data={m.planPicker} />}
        <EnquirySection />
        <CourseFaqs faqs={page.faqs} />
        <StickyEnrollBar title={page.title} priceLabel={page.priceLabel} isFree={page.isFree} />
      </>
    );
  }

  // Standard course layout (e.g. Beginner's Kit) — same order as the reference, educators left out
  const [resultTabs, rankerStats] = await Promise.all([getResultBanners(), getRankerStats()]);
  return (
    <>
      <FaqJsonLd page={page} />
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
