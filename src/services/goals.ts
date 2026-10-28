import { cache } from "react";
import { CoursePageData } from "@/types";
import { buildCoursePage, buildGoalEntries } from "@/data/coursePages";
import { getExam, getExamMenu, getGoalExam, hasPageDetails, toCoursePage } from "./exams";
import { getSiteData } from "./site";

/**
 * Goal (exam) pages — /goal/<slug>:
 *   - "All Exams" exams come from the database (Homepage → All Exams in the admin panel).
 *   - "Select Your Goal" exams that are not in All Exams use the page saved in the admin
 *     (Select Your Goal → exam → Page), or a generated page until one is saved (src/data/coursePages.ts).
 */

/** Select Your Goal exams have no menu icon of their own. */
const GOAL_MENU_ICON = { name: "GraduationCap", color: "", background: "" };

/** Every exam with a goal page. */
export const getGoalEntries = cache(async () => {
  const [menu, { examCategories }] = await Promise.all([getExamMenu(), getSiteData()]);

  const allExams = menu.flatMap(({ category, subCategories }) =>
    subCategories.map(({ subCategory, slug }) => ({ slug, name: subCategory, category }))
  );
  const allExamSlugs = new Set(allExams.map(({ slug }) => slug));
  const selectYourGoal = buildGoalEntries(examCategories).filter(({ slug }) => !allExamSlugs.has(slug));

  return [...allExams, ...selectYourGoal];
});

/** Slugs built at deploy time (All Exams); every other goal page renders on first visit. */
export const getPrerenderedGoalSlugs = cache(async () => {
  const menu = await getExamMenu();

  return menu.flatMap(({ subCategories }) => subCategories.map(({ slug }) => slug));
});

/** One goal page, or null when the exam is unknown (→ 404). */
export const getGoalPage = cache(async (slug: string): Promise<CoursePageData | null> => {
  const exam = await getExam(slug);

  if (exam) {
    const menu = await getExamMenu();
    const sameCategory = menu.find(({ category }) => category === exam.category)?.subCategories || [];
    const examOptions = [exam.subCategory, ...sameCategory.map(({ subCategory }) => subCategory).filter((name) => name !== exam.subCategory)];

    return toCoursePage(exam, examOptions.slice(0, 12));
  }

  const entries = await getGoalEntries();
  const entry = entries.find((e) => e.slug === slug);

  if (!entry) return null;

  const goalExam = await getGoalExam(slug);

  if (!goalExam || !hasPageDetails(goalExam.details)) return buildCoursePage(entry, entries);

  // A page saved in the admin: same layout as All Exams pages
  const sameCategory = entries.filter(({ category }) => category === entry.category).map(({ name }) => name);
  const examOptions = [entry.name, ...sameCategory.filter((name) => name !== entry.name)].slice(0, 12);
  const { category, name, details } = goalExam;

  return toCoursePage({ category, subCategory: name, slug, menuIcon: GOAL_MENU_ICON, details }, examOptions);
});
