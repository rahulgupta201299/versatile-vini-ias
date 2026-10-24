import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { AllExam, AllExamsMenuCategory, CoursePageData, GoalExamPage, MegaMenuCategory } from "@/types";
import { slugify } from "@/utils/slug";

/*
 * Homepage → All Exams, managed in the admin panel (Web → Homepage → All Exams).
 *   GET /exams         → categories + sub categories (header "All Exams" menu)
 *   GET /exams/<slug>  → one exam page (/goal/<slug>)
 * Every admin save refreshes the "all-exams" cache tag, so changes show up straight away.
 */

/** GET /exams — the header "All Exams" menu. */
export const getExamMenu = cache(() =>
  fetchApi<AllExamsMenuCategory[]>("exams", { fallback: [], revalidate: REVALIDATE.slow, tags: [CACHE_TAGS.allExams] })
);

/** GET /exams/<slug> — one exam, or null when there is no such exam. */
export const getExam = cache((slug: string) =>
  fetchApi<AllExam | null>(`exams/${encodeURIComponent(slug)}`, { fallback: null, revalidate: REVALIDATE.slow, tags: [CACHE_TAGS.allExams] })
);

/**
 * GET /select-your-goal/<slug> — a Select Your Goal exam's page saved in the admin (`details` null until saved),
 * or null when there is no such exam. Refreshed with "Select Your Goal" saves.
 */
// Also tagged allExams: a goal exam linked to an All Exams page refreshes when that page is edited
export const getGoalExam = cache((slug: string) =>
  fetchApi<GoalExamPage | null>(`select-your-goal/${encodeURIComponent(slug)}`, { fallback: null, revalidate: REVALIDATE.slow, tags: [CACHE_TAGS.exams, CACHE_TAGS.allExams] })
);

/** "UPSC CSE 2026/27, 71st BPSC Foundation, UPPSC PCS Special & more" */
const describeCategory = (names: string[]) => (names.length > 3 ? `${names.slice(0, 3).join(", ")} & more` : names.join(", "));

/** The exam menu in the shape the header and search use. */
export const toMegaMenu = (menu: AllExamsMenuCategory[]): MegaMenuCategory[] =>
  menu.map(({ category, subCategories }) => ({
    id: slugify(category),
    title: category,
    subtitle: describeCategory(subCategories.map(({ subCategory }) => subCategory)),
    courses: subCategories.map(({ subCategory, slug, menuIcon }) => ({
      id: slug,
      title: subCategory,
      href: `/goal/${slug}`,
      icon: menuIcon.name,
      iconColor: menuIcon.color || undefined,
      iconBg: menuIcon.background || undefined,
    })),
  }));

const hasImage = ({ webImageUrl, mobileImageUrl }: { webImageUrl: string; mobileImageUrl: string }) => Boolean(webImageUrl || mobileImageUrl);

/** An exam from the database in the shape the goal page sections use. */
export function toCoursePage(exam: AllExam, examOptions: string[]): CoursePageData {
  const { slug, subCategory, category, details } = exam;
  const { subTitle, banners, freeClasses, batches, topRankers, aboutExam, faqs } = details;

  return {
    slug,
    name: subCategory,
    category,
    tagline: subTitle,
    banners: banners.filter(hasImage).map((banner, index) => ({
      id: `${slug}-banner-${index}`,
      title: banner.title,
      imageUrl: banner.webImageUrl || banner.mobileImageUrl,
      mobileImageUrl: banner.mobileImageUrl || undefined,
      href: banner.link || "#counselling",
      alt: banner.alt || banner.title,
    })),
    videos: freeClasses.map(({ title, educator, duration, youtubeId, link }) => ({
      title,
      educator,
      duration,
      youtubeId: youtubeId || undefined,
      href: link,
    })),
    batches: batches.map((batch, index) => ({
      ...batch,
      id: `${slug}-batch-${index}`,
      tag: batch.tag || undefined,
      href: batch.link || undefined,
    })),
    topRankers: topRankers.filter(hasImage).map((banner, index) => ({
      id: `${slug}-rankers-${index}`,
      title: banner.title,
      webImageUrl: banner.webImageUrl || undefined,
      mobileImageUrl: banner.mobileImageUrl || undefined,
      href: banner.link || undefined,
      alt: banner.alt || banner.title,
    })),
    aboutTitle: aboutExam.title,
    highlights: aboutExam.highlights,
    about: [],
    aboutHtml: aboutExam.content,
    faqs: faqs.map(({ question, answer }) => ({ q: question, a: answer })),
    resultTabId: "upsc",
    examOptions,
  };
}
