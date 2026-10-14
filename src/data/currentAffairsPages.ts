/**
 * Free Resources pages — route: /courses/free-resources/[resource]
 *   /courses/free-resources/current-affairs  (The Shortlist Course)
 *
 * FALLBACK content — used when GET /courses/free-resources/:slug is not configured or fails.
 * Prices / validity dates are placeholders. No faculty photos are shown.
 */
import { FreeResourcePage } from "@/types";

const EMPTY = { guide: { heading: "", text: "" }, whatIs: [], learn: [], whyJoin: [], bestFor: [], syllabusUrl: "/#resources" };

export const FREE_RESOURCE_SECTION_PAGES: FreeResourcePage[] = [
  {
    ...EMPTY,
    slug: "current-affairs",
    label: "Current Affairs",
    title: "The Shortlist Course — Current Affairs",
    summary:
      "A structured Current Affairs learning ecosystem that helps you filter what matters, organise it subject-wise and month-wise, and retain it through continuous practice.",
    priceLabel: "₹4,711",
    isFree: false,
    startInfo: "Enrolments open",
    shortlist: {
      hero: {
        eyebrow: "CURRENT AFFAIRS",
        badge: "THE SHORTLIST COURSE",
        title: "Stop Reading More. Start Managing Current Affairs Better",
        highlight: "Managing Current Affairs",
        text: "A structured Current Affairs learning ecosystem that helps you filter what matters, organise it subject-wise and month-wise, and retain it through continuous practice.",
        pillars: ["Filter", "Organise", "Retain"],
      },
      problem: {
        problem: {
          image: "/images/current-affairs/comparison-problem.jpg",
          alt: "The Current Affairs Problem — too much info to read, nothing is organised, nothing gets retained",
        },
        solution: {
          image: "/images/current-affairs/comparison-solution.jpg",
          alt: "The Shortlist Course, a single Current Affairs system — filter, organise, retain",
        },
      },
      features: {
        title: "Features",
        items: [
          { title: "Video lectures of all subjects", text: "Detailed video lectures on subject-wise current affairs.", icon: "PlayCircle" },
          { title: "A quiz with every video lecture", text: "Practise the content right after you watch it.", icon: "ListChecks" },
          { title: "Topic-wise Quiz", text: "Revise a whole subject or topic in one go with focused quizzes.", icon: "Target" },
          { title: "Smart Quiz", text: "Build your own quiz by subject, month and difficulty for regular practice.", icon: "Sparkles" },
          { title: "Mistake Notebook", text: "Every wrong answer is saved so you can revisit and re-attempt it.", icon: "BookMarked" },
        ],
      },
      ecosystem: {
        title: "Learning & Practice Ecosystem",
        highlight: "Learning",
        steps: [
          { title: "Watch", text: "Video-based learning", icon: "Video" },
          { title: "Test", text: "Quiz attached to every video", icon: "ClipboardCheck" },
          { title: "Revise", text: "Topic-wise quizzes", icon: "RotateCcw" },
          { title: "Practise", text: "Smart quiz", icon: "Brain" },
          { title: "Track", text: "Mistake notebook", icon: "BarChart3" },
          { title: "Re-attempt", text: "Turn mistakes into learning", icon: "Repeat" },
        ],
      },
      plans: {
        title: "Choose Your Plan",
        highlight: "Plan",
        intro: "The course is available in three plans. The content and features are the same in every plan; only the validity differs.",
        notes: [
          "Choose the course duration that fits your preparation timeline.",
          "Start building your current-affairs learning cycle.",
          "Use the quizzes as part of your regular practice.",
          "Return to your mistakes and re-attempt them.",
        ],
        items: [
          { id: "8m", option: "Option 1", name: "8 Months Plan", validity: "Valid till Jun 2027", months: 8, basePrice: "₹3,999 + GST", launchPrice: "₹4,711" },
          { id: "11m", option: "Option 2", name: "11 Months Plan", validity: "Valid till Sep 2027", months: 11, basePrice: "₹4,999 + GST", originalPrice: "₹6,477", launchPrice: "₹5,899", popular: true },
          { id: "20m", option: "Option 3", name: "20 Months Plan", validity: "Valid till Jun 2028", months: 20, basePrice: "₹7,999 + GST", originalPrice: "₹11,776", launchPrice: "₹9,439" },
        ],
      },
      callback: { title: "Need to Talk About The Course ??", highlight: "About The Course ??", subtitle: "Get an Instant Callback by our Mentor!", ctaLabel: "Talk to Mentor" },
    },
    faqs: [],
  },
];
