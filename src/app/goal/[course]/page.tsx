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
import { COURSE_CHANNEL_URL, COURSE_PAGE_HAS_OWN_BANNERS, getCoursePageData, PRERENDERED_COURSE_SLUGS } from "@/data/coursePages";
import { getResultBanners } from "@/services/resultBanners";
import { getHeroBanners } from "@/services/heroBanners";

type Params = Promise<{ course: string }>;

/** Menu courses are built ahead of time; every other exam page renders on first visit. */
export const dynamicParams = true;
export function generateStaticParams() {
  return PRERENDERED_COURSE_SLUGS.map((course) => ({ course }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { course: slug } = await params;
  const page = getCoursePageData(slug);
  if (!page) return {};
  const title = `${page.name} — Live Classes, Free Lectures & Test Series | Vini IAS`;
  return {
    title,
    description: page.tagline,
    alternates: { canonical: `/goal/${page.slug}` },
    openGraph: { title, description: page.tagline, url: `/goal/${page.slug}`, images: ["/images/logo.png"] },
  };
}

export default async function CoursePage({ params }: { params: Params }) {
  const { course: slug } = await params;
  const page = getCoursePageData(slug);
  if (!page) notFound();

  // Banners and results come from the server (with local fallbacks)
  const [heroBanners, resultTabs] = await Promise.all([getHeroBanners(slug), getResultBanners()]);
  const toppers = (resultTabs.find((t) => t.id === page.resultTabId) ?? resultTabs[0])?.banners ?? [];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CourseHero name={page.name} tagline={page.tagline} banners={COURSE_PAGE_HAS_OWN_BANNERS(slug) ? page.banners : heroBanners} />
      <QuickLinks />
      <ScholarshipTest name={page.name} />
      <FreeClasses videos={page.videos} channelUrl={COURSE_CHANNEL_URL} />
      <BatchesSection batches={page.batches} />
      <CourseToppers banners={toppers} />
      <AboutExam name={page.name} about={page.about} highlights={page.highlights} faqs={page.faqs} />
      <CounsellingForm name={page.name} examOptions={page.examOptions} />
      <AppDownloadSection title="Join 100K+ students on the app today!" />
    </>
  );
}
