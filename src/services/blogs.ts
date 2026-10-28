import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { BlogCategory, BlogPost, ExamUpdates } from "@/types";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/data/blogs";
import { EXAM_UPDATES } from "@/data/examUpdates";

const byDate = (a: BlogPost, b: BlogPost) => b.publishedAt.localeCompare(a.publishedAt);

/** Exam category tabs: GET /blogs/categories (falls back to the "Select Your Goal" order). */
export const getBlogCategories = cache(() =>
  fetchApi<BlogCategory[]>("blogs/categories", { fallback: BLOG_CATEGORIES, tags: [CACHE_TAGS.blogs], revalidate: REVALIDATE.slow })
);

/** All posts, newest first: GET /blogs. */
export const getBlogPosts = cache(async () => {
  const posts = await fetchApi<BlogPost[]>("blogs", { fallback: BLOG_POSTS, tags: [CACHE_TAGS.blogs], revalidate: REVALIDATE.fast });

  return [...posts].sort(byDate);
});

export const getBlogCategory = cache(async (slug: string) => (await getBlogCategories()).find((c) => c.slug === slug) || null);

export const getCategoryPosts = cache(async (category: string) => (await getBlogPosts()).filter((p) => p.category === category));

/** One post: GET /blogs/<category>/<slug> (falls back to the local sample). */
export const getBlogPost = cache((category: string, slug: string) =>
  fetchApi<BlogPost | null>(`blogs/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`, {
    fallback: BLOG_POSTS.find((p) => p.category === category && p.slug === slug) || null,
    tags: [CACHE_TAGS.blogs],
  })
);

/** Everything the /exams pages share: categories, posts (newest first), name lookup and post counts. */
export const getBlogIndex = cache(async () => {
  const [categories, posts] = await Promise.all([getBlogCategories(), getBlogPosts()]);
  const names: Record<string, string> = Object.fromEntries(categories.map((c) => [c.slug, c.name]));
  const counts: Record<string, number> = {};

  posts.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));

  return { categories, posts, names, counts };
});

/** Notification / admit card / result boards + important exam links: GET /blogs/updates. */
export const getExamUpdates = cache(() =>
  fetchApi<ExamUpdates>("blogs/updates", { fallback: EXAM_UPDATES, tags: [CACHE_TAGS.blogs], revalidate: REVALIDATE.fast })
);
