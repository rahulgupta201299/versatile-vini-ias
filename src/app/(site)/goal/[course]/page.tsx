import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CourseHero,
  QuickLinks,
  ScholarshipTest,
  FreeClasses,
  BatchesSection,
  CourseToppers,
  AboutExam,
  CounsellingForm,
} from "@/sections/CoursePage";
import AppDownloadSection from "@/sections/AppDownload/AppDownloadSection";
import { COURSE_PAGE_HAS_OWN_BANNERS } from "@/data/coursePages";
import { getGoalPage, getHeroBanners, getImpactData, getPrerenderedGoalSlugs, getResultBanners, getSiteConfig } from "@/services";

type Params = Promise<{ course: string }>;

/** "All Exams" courses are built ahead of time; every other goal page renders on first visit (then cached). */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getPrerenderedGoalSlugs()).map((course) => ({ course }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { course } = await params;
  const page = await getGoalPage(course);
  if (!page) return {};
  const title = `${page.name} — Live Classes, Free Lectures & Test Series | Vini IAS`;
  return {
    title,
    description: page.tagline,
    alternates: { canonical: `/goal/${page.slug}` },
    openGraph: { title, description: page.tagline, url: `/goal/${page.slug}`, images: ["/images/logo.png"] },
  };
}

export default async function GoalPage({ params }: { params: Params }) {
  const { course } = await params;
  const page = await getGoalPage(course);
  if (!page) notFound();

  const [heroBanners, resultTabs, impact, config] = await Promise.all([
    COURSE_PAGE_HAS_OWN_BANNERS(course) ? Promise.resolve(page.banners) : getHeroBanners(course),
    getResultBanners(),
    getImpactData(),
    getSiteConfig(),
  ]);
  const toppers = (resultTabs.find((t) => t.id === page.resultTabId) ?? resultTabs[0])?.banners ?? [];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CourseHero name={page.name} tagline={page.tagline} banners={heroBanners} />
      <QuickLinks />
      <ScholarshipTest name={page.name} />
      <FreeClasses videos={page.videos} channelUrl={config.social.youtube} avatars={impact.avatars} />
      <BatchesSection batches={page.batches} />
      <CourseToppers banners={toppers} />
      <AboutExam name={page.name} about={page.about} highlights={page.highlights} faqs={page.faqs} />
      <CounsellingForm name={page.name} examOptions={page.examOptions} />
      <AppDownloadSection title="Join 100K+ students on the app today!" />
    </>
  );
}
