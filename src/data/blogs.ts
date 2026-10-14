/**
 * Blogs — /exams, /exams/<category>, /exams/<category>/<post>
 *
 * FALLBACK / SAMPLE content — used until GET /blogs is configured. Every post here is a placeholder
 * (dates, numbers and notifications are illustrative). Category tabs follow the "Select Your Goal" order.
 */
import { BlogBlock, BlogCategory, BlogPost } from "@/types";
import { EXAM_CATEGORIES } from "./exams";
import { slugify } from "@/utils/slug";

const DESCRIPTIONS: Record<string, string> = {
  UPSC: "UPSC CSE strategy, syllabus, current affairs analysis and answer-writing guidance.",
  "State PSC": "BPSC, UPPSC, MPPSC and other state civil services — notifications and strategy.",
  SSC: "SSC CGL, CHSL, MTS and GD — exam patterns, cut-offs and preparation plans.",
  Railways: "RRB NTPC, Group D and ALP — vacancies, syllabus and study plans.",
  Teaching: "CTET, state TETs and teacher recruitment — pedagogy and preparation tips.",
  Nursing: "AIIMS NORCET and state nursing exams — syllabus and preparation.",
  Board: "Class 10 & 12 board exams — study plans and revision strategy.",
  "Study Abroad": "IELTS, GRE and admissions — planning your study-abroad journey.",
  Defence: "NDA, CDS, AFCAT and CAPF — written exam and SSB preparation.",
  Banking: "IBPS, SBI and RBI exams — PO, clerk and officer-grade strategy.",
  Engineering: "GATE, ESE and state AE/JE exams — technical preparation.",
  Medical: "NEET and medical entrance — preparation and counselling updates.",
};

/** Top exam categories, in the "Select Your Goal" order. */
export const BLOG_CATEGORIES: BlogCategory[] = EXAM_CATEGORIES.slice(0, 12).map((c) => ({
  slug: slugify(c.category),
  name: c.category,
  description: DESCRIPTIONS[c.category] ?? `${c.category} exams — news, strategy and preparation tips.`,
}));

/* ---------- helpers to keep the sample articles short ---------- */
const p = (text: string): BlogBlock => ({ type: "p", text });
const h2 = (text: string): BlogBlock => ({ type: "h2", text });
const ul = (...items: string[]): BlogBlock => ({ type: "ul", items });
const quote = (text: string): BlogBlock => ({ type: "quote", text });

type Draft = Omit<BlogPost, "slug" | "content"> & { content?: BlogBlock[] };
const post = (d: Draft): BlogPost => ({
  ...d,
  slug: slugify(d.title),
  content: d.content ?? [
    p(d.excerpt),
    h2("Key highlights"),
    ul("Understand the latest pattern and syllabus before you begin.", "Build a weekly timetable and track it honestly.", "Revise with short notes and practise previous year questions."),
    h2("How to prepare"),
    p("Start with the basics, then move to practice and mock tests. Keep current affairs running in parallel and revise every week so that nothing slips through."),
    quote("Consistency beats intensity — a steady daily routine is the most reliable way to clear any competitive exam."),
    p("Stay tuned to Vini IAS for official updates, free classes and test series for this exam."),
  ],
});

export const BLOG_POSTS: BlogPost[] = [
  /* ---------------- UPSC ---------------- */
  post({
    category: "upsc",
    title: "UPSC CSE 2027 Notification: Expected Dates, Vacancies and Key Changes",
    excerpt: "Everything aspirants should track for UPSC CSE 2027 — the expected notification window, likely vacancies, eligibility reminders and what could change in the exam pattern.",
    author: "Vini IAS Editorial",
    publishedAt: "2026-10-12T18:52:00+05:30",
    readMinutes: 6,
    tags: ["UPSC CSE", "Notification", "2027"],
    featured: true,
    content: [
      p("The UPSC Civil Services Examination 2027 notification is expected early in the year, as per the commission's annual calendar. Here is what aspirants should keep an eye on and how to plan the months ahead."),
      h2("Expected timeline"),
      ul("Notification and online application: early 2027 (tentative)", "Preliminary examination: around May–June 2027", "Mains examination: around September 2027", "Interview / Personality Test: early 2028"),
      h2("Eligibility reminders"),
      p("Candidates must hold a graduate degree from a recognised university. Age limits and the number of attempts depend on the category — check the official notification once it is released."),
      quote("Use the months before the notification to finish one complete revision of the static syllabus."),
      h2("What to do now"),
      ul("Complete NCERTs and one standard book per subject", "Start daily answer writing for Mains", "Attempt sectional tests for Prelims every week"),
    ],
  }),
  post({
    category: "upsc",
    title: "How to Read The Hindu for UPSC: A Practical 60-Minute Routine",
    excerpt: "A simple, time-boxed way to read the newspaper for UPSC — what to read, what to skip and how to make notes that you will actually revise.",
    author: "Ritika Sharma",
    publishedAt: "2026-10-10",
    readMinutes: 5,
    tags: ["Current Affairs", "Newspaper"],
  }),
  post({
    category: "upsc",
    title: "UPSC Prelims 2027: 6-Month Strategy for First-Time Aspirants",
    excerpt: "A month-by-month plan covering NCERTs, standard books, current affairs and test practice for aspirants appearing for Prelims for the first time.",
    author: "Vini IAS Mentors",
    publishedAt: "2026-10-08",
    readMinutes: 7,
    tags: ["Prelims", "Strategy"],
  }),
  post({
    category: "upsc",
    title: "Ethics Case Studies: A 5-Step Framework That Scores Well",
    excerpt: "Break down any GS Paper IV case study with a repeatable framework — stakeholders, dilemmas, options, decision and justification.",
    author: "Aman Verma",
    publishedAt: "2026-10-05",
    readMinutes: 6,
    tags: ["Mains", "Ethics", "GS IV"],
  }),
  post({
    category: "upsc",
    title: "Optional Subject Selection: 7 Questions to Ask Before You Decide",
    excerpt: "Interest, overlap with GS, availability of guidance and past performance — a checklist to pick the optional that suits you.",
    author: "Vini IAS Mentors",
    publishedAt: "2026-09-29",
    readMinutes: 5,
    tags: ["Optional", "Mains"],
  }),

  /* ---------------- State PSC ---------------- */
  post({
    category: "state-psc",
    title: "BPSC 71st Mains: Answer-Writing Tips from Recent Toppers",
    excerpt: "Structure, word limits, Bihar-specific examples and diagrams — practical answer-writing tips for the BPSC Mains examination.",
    author: "Vini IAS Editorial",
    publishedAt: "2026-10-11",
    readMinutes: 6,
    tags: ["BPSC", "Mains"],
    featured: true,
  }),
  post({
    category: "state-psc",
    title: "UPPSC PCS 2027: Syllabus Breakdown and Preparation Plan",
    excerpt: "Paper-wise syllabus for UPPSC PCS with a preparation plan that overlaps smartly with UPSC CSE.",
    author: "Neha Gupta",
    publishedAt: "2026-10-03",
    readMinutes: 6,
    tags: ["UPPSC", "Syllabus"],
  }),
  post({
    category: "state-psc",
    title: "MPPSC Prelims: Most Important Topics from the Last 5 Years",
    excerpt: "A topic-wise analysis of recent MPPSC Prelims papers to help you prioritise high-yield areas.",
    author: "Vini IAS Editorial",
    publishedAt: "2026-09-26",
    readMinutes: 4,
    tags: ["MPPSC", "PYQ"],
  }),

  /* ---------------- SSC ---------------- */
  post({
    category: "ssc",
    title: "SSC CGL 2026 Tier 1: Section-Wise Strategy to Score 150+",
    excerpt: "Quant, reasoning, English and general awareness — a section-wise approach with time-management tips for Tier 1.",
    author: "Rohit Singh",
    publishedAt: "2026-10-09",
    readMinutes: 6,
    tags: ["SSC CGL", "Strategy"],
    featured: true,
  }),
  post({
    category: "ssc",
    title: "SSC CHSL vs CGL: Which Exam Should You Target First?",
    excerpt: "Eligibility, posts, pay scale and difficulty compared — decide which SSC exam fits your profile and timeline.",
    author: "Vini IAS Editorial",
    publishedAt: "2026-09-30",
    readMinutes: 5,
    tags: ["SSC CHSL", "SSC CGL"],
  }),

  /* ---------------- Railways ---------------- */
  post({
    category: "railways",
    title: "RRB NTPC 2026: Exam Pattern, Syllabus and 90-Day Plan",
    excerpt: "Understand the CBT stages and follow a 90-day plan for mathematics, reasoning and general awareness.",
    author: "Vini IAS Editorial",
    publishedAt: "2026-10-07",
    readMinutes: 6,
    tags: ["RRB NTPC", "Syllabus"],
  }),
  post({
    category: "railways",
    title: "RRB Group D: Most Asked General Science Topics",
    excerpt: "Physics, chemistry and biology topics that appear most often in Group D — with a quick revision list.",
    author: "Sanjay Kumar",
    publishedAt: "2026-09-27",
    readMinutes: 4,
    tags: ["RRB Group D", "Science"],
  }),

  /* ---------------- Teaching ---------------- */
  post({
    category: "teaching",
    title: "CTET 2026: Child Development & Pedagogy Made Simple",
    excerpt: "Key theories, thinkers and question types in CDP with a simple revision plan for CTET Paper I and II.",
    author: "Pooja Mishra",
    publishedAt: "2026-10-06",
    readMinutes: 5,
    tags: ["CTET", "Pedagogy"],
  }),
  post({
    category: "teaching",
    title: "BPSC TRE 4.0: Preparation Strategy for Teacher Recruitment",
    excerpt: "Subject-wise approach, language paper tips and practice plan for the Bihar teacher recruitment exam.",
    author: "Vini IAS Editorial",
    publishedAt: "2026-09-24",
    readMinutes: 5,
    tags: ["BPSC TRE", "Teaching"],
  }),

  /* ---------------- Nursing ---------------- */
  post({
    category: "nursing",
    title: "AIIMS NORCET: Subject-Wise Weightage and Smart Revision",
    excerpt: "Plan your NORCET preparation around high-weightage nursing subjects with a focused revision cycle.",
    author: "Dr. Kavya Nair",
    publishedAt: "2026-10-01",
    readMinutes: 5,
    tags: ["NORCET", "Nursing"],
  }),

  /* ---------------- Defence ---------------- */
  post({
    category: "defence",
    title: "NDA 2027: Written Exam + SSB Preparation in One Plan",
    excerpt: "Balance mathematics, the GAT paper and SSB preparation with a single integrated timetable.",
    author: "Col. (Retd.) A. Rathore",
    publishedAt: "2026-09-28",
    readMinutes: 6,
    tags: ["NDA", "SSB"],
  }),

  /* ---------------- Banking ---------------- */
  post({
    category: "banking",
    title: "IBPS PO 2026 Mains: How to Tackle the Reasoning Section",
    excerpt: "Puzzles, seating arrangements and data sufficiency — selection strategy for the Mains reasoning section.",
    author: "Ankit Jain",
    publishedAt: "2026-10-04",
    readMinutes: 5,
    tags: ["IBPS PO", "Reasoning"],
  }),
  post({
    category: "banking",
    title: "RBI Grade B: Why It Is the Smartest Plan B for UPSC Aspirants",
    excerpt: "ESI and Finance overlap strongly with UPSC GS — here is how to prepare for RBI Grade B alongside CSE.",
    author: "Vini IAS Editorial",
    publishedAt: "2026-09-25",
    readMinutes: 6,
    tags: ["RBI Grade B", "Plan B"],
  }),
];
