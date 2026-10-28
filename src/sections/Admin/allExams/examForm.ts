import { AdminSubCategory, AdminSubCategoryInput, ExamBanner, ExamBatch, ExamDetails, ExamFreeClass } from "@/types";
import { slugify } from "@/utils/slug";

/** Blank values for a new exam and for each list item. */

export const newBanner = (): ExamBanner => ({ title: "", alt: "", webImageUrl: "", mobileImageUrl: "", link: "" });

export const newFreeClass = (): ExamFreeClass => ({ title: "", educator: "Vini IAS Faculty", duration: "", youtubeId: "", link: "" });

export const newBatch = (): ExamBatch => ({ title: "", thumbnail: "", language: "Hindi & English", mode: "Live + Recorded", startDate: "", price: 0, mrp: 0, tag: "", link: "" });

/** Form values for a new sub category (optionally in a given category). */
export const newSubCategory = (categoryId = ""): AdminSubCategoryInput => ({
  category: categoryId,
  name: "",
  isActive: true,
  link: "",
  menuIcon: { name: "BookOpen", color: "", background: "" },
  details: {
    subTitle: "",
    banners: [],
    freeClasses: [],
    batches: [],
    topRankers: [],
    aboutExam: { title: "", highlights: [], content: "" },
    faqs: [],
  },
});

/** Form values from a saved sub category. */
export const toInput = ({ category, name, isActive, link = "", menuIcon, details }: AdminSubCategory): AdminSubCategoryInput => ({
  category: category._id,
  name,
  isActive,
  link,
  menuIcon,
  details,
});

/** Accepts a YouTube link or a plain video id and returns the id ("" when it isn't one). */
export function toYoutubeId(input: string): string {
  const value = input.trim();
  const match = value.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);

  if (match) return match[1];

  return /^[\w-]{11}$/.test(value) ? value : "";
}

export const discountPercent = ({ price, mrp }: Pick<ExamBatch, "price" | "mrp">) => (mrp > price && mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0);

/** Checks an exam page's details before saving. Returns a list of problems (empty = OK). */
export function validateDetails(details: ExamDetails): string[] {
  const problems: string[] = [];

  details.freeClasses.forEach(({ title, youtubeId }, index) => {
    if (!title.trim()) problems.push(`Free class ${index + 1}: title is required.`);

    if (youtubeId && !toYoutubeId(youtubeId)) problems.push(`Free class ${index + 1}: the YouTube link or video ID isn't valid.`);
  });

  details.batches.forEach(({ title }, index) => {
    if (!title.trim()) problems.push(`Batch ${index + 1}: title is required.`);
  });

  details.aboutExam.highlights.forEach(({ label, value }, index) => {
    if (!label.trim() || !value.trim()) problems.push(`Highlight ${index + 1}: label and value are required.`);
  });

  details.faqs.forEach(({ question, answer }, index) => {
    if (!question.trim() || !answer.trim()) problems.push(`FAQ ${index + 1}: question and answer are required.`);
  });

  return problems;
}

/** Checks the form before saving. Returns a list of problems (empty = OK). */
export function validateSubCategory({ name, details }: AdminSubCategoryInput, { hasCategory }: { hasCategory: boolean }): string[] {
  const problems: string[] = [];

  if (!hasCategory) problems.push("Choose a category, or type a new category name.");

  if (!slugify(name)) problems.push("Type a sub category name (it needs letters or numbers).");

  return [...problems, ...validateDetails(details)];
}

/** True when rich text has no words, e.g. "<p></p>". */
const isEmptyHtml = (html = "") => !html.replace(/<[^>]*>|&nbsp;/g, "").trim() && !/<(table|hr)\b/i.test(html);

/** Drops an empty description (e.g. "<p></p>") before saving. */
export const cleanDetails = (details: ExamDetails): ExamDetails => {
  const { content } = details.aboutExam;

  if (!isEmptyHtml(content)) return details;

  return { ...details, aboutExam: { ...details.aboutExam, content: "" } };
};

/** Trims the name and drops an empty description before saving. */
export const cleanInput = (input: AdminSubCategoryInput): AdminSubCategoryInput => ({
  ...input,
  name: input.name.trim(),
  link: input.link.trim(),
  details: cleanDetails(input.details),
});
