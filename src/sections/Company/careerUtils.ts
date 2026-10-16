import { CareerJob } from "@/types";

export const SITE_URL = "https://viniias.com";
export const jobPath = (id: string) => `/careers/${id}`;
export const jobUrl = (id: string) => `${SITE_URL}${jobPath(id)}`;

/** "Posted 10 Oct 2026" */
export const formatPosted = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

/** Posted within the last 7 days (relative to `now`). */
export const isNewJob = (iso: string, now = Date.now()) => now - new Date(`${iso}T00:00:00+05:30`).getTime() < 7 * 864e5;

export const shareText = (j: CareerJob) =>
  `We're hiring: ${j.title} at Vini IAS — ${j.team} | ${j.location} | ${j.type}${j.experience ? ` | ${j.experience}` : ""}. ${j.summary}`;

export const byNewest = (a: CareerJob, b: CareerJob) => b.postedAt.localeCompare(a.postedAt);
