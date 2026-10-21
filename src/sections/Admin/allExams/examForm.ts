import { AdminSubCategory, AdminSubCategoryInput, ExamBanner, ExamBatch, ExamFreeClass } from "@/types";
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
  menuIcon: { name: "BookOpen", color: "", background: "" },
  details: {
    subTitle: "",
    banners: [],
    freeClasses: [],
    batches: [],
    topRankers: [],
    aboutExam: { title: "", highlights: [], paragraphs: [] },
    faqs: [],
  },
});

/** Form values from a saved sub category. */
export const toInput = ({ category, name, isActive, menuIcon, details }: AdminSubCategory): AdminSubCategoryInput => ({
  category: category._id,
  name,
  isActive,
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

/** Checks the form before saving. Returns a list of problems (empty = OK). */
export function validateSubCategory({ name, details }: AdminSubCategoryInput, { hasCategory }: { hasCategory: boolean }): string[] {
  const problems: string[] = [];

  if (!hasCategory) problems.push("Choose a category, or type a new category name.");
  if (!slugify(name)) problems.push("Type a sub category name (it needs letters or numbers).");

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

/** Trims the name and removes empty paragraphs before saving. */
export const cleanInput = (input: AdminSubCategoryInput): AdminSubCategoryInput => ({
  ...input,
  name: input.name.trim(),
  details: {
    ...input.details,
    aboutExam: { ...input.details.aboutExam, paragraphs: input.details.aboutExam.paragraphs.map((p) => p.trim()).filter(Boolean) },
  },
});
