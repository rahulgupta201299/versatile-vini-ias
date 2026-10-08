/**
 * GS Foundation resource pages — route: /courses/gs-foundation/[freeResources]
 *   e.g. /courses/gs-foundation/beginners-kit-for-upsc
 *
 * FALLBACK content — used when the API (GET /courses/gs-foundation/:slug) is not configured or fails.
 * One entry per item in the "GS Foundation" menu (data/navigation.ts).
 */
import { FreeResourcePage } from "@/types";
import { NAV_ITEMS } from "./navigation";

const SYLLABUS_URL = "/#resources";

const PAGES: Omit<FreeResourcePage, "label">[] = [
  {
    slug: "beginners-kit-for-upsc",
    title: "Beginners' Kit for UPSC CSE 2027/28",
    summary:
      "This program is designed to give you clarity and direction for your UPSC preparation, from the very beginning to a complete strategy — practical, proven approaches that actually work.",
    priceLabel: "FREE Course",
    isFree: true,
    startInfo: "Starting from 29th May 2026",
    syllabusUrl: SYLLABUS_URL,
    guide: {
      heading: "Beginner's Guide for UPSC Preparation",
      text: "The Beginners' Kit for UPSC CSE 2027/28 is a starter strategy course designed for first-time aspirants. It helps you build a clear preparation roadmap by understanding the UPSC syllabus, planning your time effectively, choosing the right resources, and avoiding common mistakes. This course gives you clarity, confidence, and direction to begin your UPSC journey the right way.",
    },
    whatIs: [
      "A strategy-based starter course for UPSC beginners.",
      "Designed especially for first-time aspirants targeting CSE 2027/28.",
      "Helps you build a clear and structured preparation roadmap.",
      "Focuses on planning, not rote learning.",
      "Ideal for college students, working professionals, and fresh aspirants.",
    ],
    learn: [
      { title: "Complete UPSC CSE 2027 Strategy", icon: "Compass" },
      { title: "Time Management Techniques", icon: "Clock" },
      { title: "Resource Planning", icon: "Library" },
      { title: "Subject Wise Strategy", icon: "Layers" },
      { title: "Revision Strategy", icon: "RotateCcw" },
      { title: "Mistakes to Avoid During Preparation", icon: "ShieldAlert" },
    ],
    whyJoin: [
      "Removes confusion and saves months of trial and error.",
      "Gives you a realistic and practical study plan.",
      "Helps you prepare with clarity, confidence, and direction.",
      "Ensures you don't waste time on unnecessary books or courses.",
    ],
    bestFor: [
      "Beginners to UPSC.",
      "Aspirants planning for UPSC CSE 2027/28 seriously.",
      "Students who feel overwhelmed and don't know where to start.",
      "Aspirants who want to prepare smart, not blindly.",
    ],
    faqs: [
      {
        q: "Who is this course for?",
        a: "This course is specially designed for beginners and first-time UPSC aspirants who are targeting UPSC CSE 2027/28 and want a clear roadmap before diving into preparation.",
      },
      {
        q: "I am completely new to UPSC. Can I join this?",
        a: "Yes, absolutely. In fact, this course is made for absolute beginners who are confused about where to start, what to study, and how to plan.",
      },
      {
        q: "Will this course cover the full syllabus?",
        a: "This is a strategy and planning course, not a subject-teaching course. It will help you understand: the complete UPSC syllabus, how to approach each subject, and what resources to use and what to avoid.",
      },
      { q: "Will I get recordings of the live sessions?", a: "Yes. All live sessions will be recorded and shared with enrolled students for revision and future reference." },
      { q: "Do I need to buy books before joining this course?", a: "No. This course will first help you understand which books are actually required and which ones you can safely ignore." },
      {
        q: "Will this help me make a daily study plan?",
        a: "Yes. You will learn how to create a realistic daily and weekly schedule, and balance GS, CSAT, current affairs, and revision.",
      },
    ],
  },
  {
    slug: "ncert-foundation-batch",
    title: "NCERT Foundation Batch for UPSC",
    summary:
      "Build a rock-solid base with the NCERTs. Structured classes cover Class 6–12 NCERTs subject by subject, with notes, practice questions and regular tests to lock in the fundamentals for Prelims and Mains.",
    priceLabel: "FREE Course",
    isFree: true,
    startInfo: "Starting from 10th November 2026",
    syllabusUrl: SYLLABUS_URL,
    guide: {
      heading: "Why NCERTs Matter for UPSC",
      text: "A large share of UPSC questions is rooted in NCERT concepts. This batch takes you through the important NCERTs in a planned sequence so that later standard books and current affairs make sense quickly.",
    },
    whatIs: [
      "A structured NCERT reading and teaching programme for UPSC.",
      "Covers History, Geography, Polity, Economy and Science NCERTs.",
      "Comes with concise notes and chapter-wise practice questions.",
      "Ideal before starting the full GS Foundation course.",
    ],
    learn: [
      { title: "Class 6–12 NCERT Coverage", icon: "BookOpen" },
      { title: "Concept-wise Notes", icon: "PenLine" },
      { title: "Chapter-wise MCQs", icon: "ClipboardCheck" },
      { title: "Map & Diagram Practice", icon: "Compass" },
      { title: "Weekly Revision", icon: "RotateCcw" },
      { title: "Progress Tracking", icon: "BarChart3" },
    ],
    whyJoin: [
      "Strong fundamentals make every later book easier.",
      "Saves time by focusing only on UPSC-relevant chapters.",
      "Regular practice builds Prelims accuracy early.",
    ],
    bestFor: ["Absolute beginners.", "Students in college planning UPSC.", "Aspirants who skipped NCERTs earlier."],
    faqs: [
      { q: "Which NCERTs are covered?", a: "The UPSC-relevant NCERTs of Class 6–12 for History, Geography, Polity, Economy and Science." },
      { q: "Do I need to read NCERTs before joining?", a: "No — the batch takes you through them step by step." },
      { q: "Are notes provided?", a: "Yes, concise notes and practice questions are shared for every chapter." },
    ],
  },
  {
    slug: "foundation-batch-2027-29",
    title: "GS Foundation Batch 2027/29",
    summary:
      "Complete Prelims + Mains preparation in one programme — live classes covering the full GS syllabus, answer writing, tests, current affairs and mentorship to take you from beginner to exam-ready.",
    priceLabel: "FREE Demo Classes",
    isFree: true,
    startInfo: "New batch starting soon",
    syllabusUrl: SYLLABUS_URL,
    guide: {
      heading: "Complete GS Foundation for UPSC",
      text: "The GS Foundation Batch covers the entire General Studies syllabus for Prelims and Mains, integrated with current affairs, regular tests and answer-writing practice, so that you are ready for every stage of the exam.",
    },
    whatIs: [
      "End-to-end GS coverage for Prelims and Mains.",
      "Integrated current affairs and answer writing.",
      "Regular tests with detailed evaluation.",
      "Personal mentorship throughout the programme.",
    ],
    learn: [
      { title: "Complete GS Syllabus", icon: "Layers" },
      { title: "Live & Recorded Classes", icon: "Video" },
      { title: "Answer Writing", icon: "PenLine" },
      { title: "Prelims & Mains Tests", icon: "ClipboardCheck" },
      { title: "Current Affairs", icon: "BookOpen" },
      { title: "Mentorship", icon: "Target" },
    ],
    whyJoin: [
      "One programme for every stage of the exam.",
      "Structured schedule keeps you consistent.",
      "Regular evaluation shows exactly where to improve.",
    ],
    bestFor: ["Aspirants targeting CSE 2027, 2028 or 2029.", "Beginners who want complete guidance.", "Working professionals who need a structured plan."],
    faqs: [
      { q: "Does the batch cover both Prelims and Mains?", a: "Yes, the complete GS syllabus for both stages is covered." },
      { q: "Are classes live or recorded?", a: "Classes are live, and recordings are available in the app." },
      { q: "Is there a demo class?", a: "Yes, you can attend free demo classes before enrolling." },
    ],
  },
  {
    slug: "test-series-flt",
    title: "UPSC Prelims Test Series (FLT)",
    summary:
      "Full-length tests in the real UPSC pattern with all-India ranking, detailed solutions and performance analytics — so you walk into the exam hall already used to the pressure.",
    priceLabel: "FREE Mock Test",
    isFree: true,
    startInfo: "Tests every Sunday",
    syllabusUrl: SYLLABUS_URL,
    guide: {
      heading: "Practise in the Real Exam Format",
      text: "Full Length Tests (FLT) recreate the actual UPSC Prelims paper — the same pattern, difficulty and timing — followed by detailed explanations and analytics to steadily raise your score.",
    },
    whatIs: [
      "Full-length GS and CSAT tests in UPSC pattern.",
      "All-India ranking to benchmark your preparation.",
      "Detailed solutions with source references.",
    ],
    learn: [
      { title: "Full Length Tests", icon: "ClipboardCheck" },
      { title: "All-India Ranking", icon: "BarChart3" },
      { title: "Detailed Solutions", icon: "BookOpen" },
      { title: "Time Management", icon: "Clock" },
      { title: "Elimination Techniques", icon: "Target" },
      { title: "Revision Through Tests", icon: "RotateCcw" },
    ],
    whyJoin: ["Builds exam temperament.", "Shows weak areas topic by topic.", "Improves accuracy and speed."],
    bestFor: ["Aspirants appearing for the next Prelims.", "Students who have finished one round of the syllabus."],
    faqs: [
      { q: "How many tests are there?", a: "Tests are released weekly; the full schedule is shared in the app." },
      { q: "Is CSAT included?", a: "Yes, CSAT full-length tests are included." },
    ],
  },
  {
    slug: "recorded-batch",
    title: "GS Foundation Recorded Batch",
    summary:
      "Study the complete GS Foundation course at your own pace — recorded lectures, notes and tests you can access anytime on the Vini IAS app.",
    priceLabel: "₹4,999",
    isFree: false,
    startInfo: "Start anytime — instant access",
    syllabusUrl: SYLLABUS_URL,
    guide: {
      heading: "Learn at Your Own Pace",
      text: "The Recorded Batch gives you the full GS Foundation course in recorded form, so you can plan your preparation around college or work without missing anything.",
    },
    whatIs: ["Complete GS Foundation lectures in recorded form.", "Notes and practice tests included.", "Access on mobile and desktop."],
    learn: [
      { title: "Recorded Lectures", icon: "Video" },
      { title: "Class Notes", icon: "PenLine" },
      { title: "Practice Tests", icon: "ClipboardCheck" },
      { title: "Flexible Schedule", icon: "Clock" },
      { title: "Complete GS Syllabus", icon: "Layers" },
      { title: "Revision Support", icon: "RotateCcw" },
    ],
    whyJoin: ["Affordable complete coverage.", "Study whenever it suits you.", "Re-watch any lecture as often as you need."],
    bestFor: ["Working professionals.", "College students.", "Aspirants who prefer self-paced study."],
    faqs: [
      { q: "How long is the access valid?", a: "Access details are shared at enrolment — contact us for the current validity." },
      { q: "Can I watch on my phone?", a: "Yes, all lectures are available in the Vini IAS app." },
    ],
  },
];

/* Labels come from the GS Foundation menu, keyed by the slug at the end of each menu link. */
const MENU_LABELS = new Map(
  (NAV_ITEMS.find((n) => n.id === "gs-foundation")?.children ?? []).map((c) => [c.href.split("/").pop() ?? "", c.label])
);

export const FREE_RESOURCES: FreeResourcePage[] = PAGES.map((p) => ({ ...p, label: MENU_LABELS.get(p.slug) ?? p.title }));
