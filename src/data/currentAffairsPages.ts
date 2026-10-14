/**
 * Free Resources pages — route: /courses/free-resources/[resource]
 *   /courses/free-resources/current-affairs   (The Shortlist Course)
 *   /courses/free-resources/monthly-magazine  (The Shortlist — free monthly magazine)
 *   /courses/free-resources/prism-simplified  (PRISM Simplified — PIB monthly magazine)
 *
 * FALLBACK content — used when GET /courses/free-resources/:slug is not configured or fails.
 * Prices / validity dates are placeholders. No faculty photos are shown.
 */
import { FreeResourcePage } from "@/types";
import { COURSE_SECTIONS, coursePagePath } from "@/utils/slug";

const MONTHLY_MAGAZINE_PATH = coursePagePath(COURSE_SECTIONS.freeResources, "Monthly Magazine");
const PRISM_PATH = coursePagePath(COURSE_SECTIONS.freeResources, "PRISM Simplified");

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
      quickLinks: [
        { label: "Monthly Magazine", href: MONTHLY_MAGAZINE_PATH, icon: "Newspaper", badge: "FREE" },
        { label: "PRISM SIMPLIFIED", href: PRISM_PATH, icon: "Sparkles", badge: "FREE" },
      ],
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

  /* ---------------- Monthly Magazine (The Shortlist) ---------------- */
  {
    ...EMPTY,
    slug: "monthly-magazine",
    label: "Monthly Magazine",
    title: "The Shortlist — Monthly Current Affairs Magazine",
    summary: "Free monthly current affairs magazine for UPSC — standard sources (PIB, The Hindu, Indian Express & more), Prelims & Mains value-added content and PYQ linkage. Download in English and Hindi.",
    priceLabel: "FREE",
    isFree: true,
    startInfo: "",
    magazine: {
      theme: "shortlist",
      hero: {
        eyebrow: "VINI IAS",
        kicker: "Monthly Current Affairs Magazine",
        title: "The Shortlist",
        points: [
          { title: "Coverage of Standard sources", text: "PIB, The Hindu, Indian Express & more", icon: "Newspaper" },
          { title: "Prelims & Mains Value Added Content", icon: "Sparkles" },
          { title: "PYQ linkage with Current Affairs", icon: "Repeat" },
        ],
        image: { src: "/images/magazines/shortlist-hero-books.webp", alt: "The Shortlist — Monthly Current Affairs Magazine", width: 1400, height: 1225 },
      },
      downloads: {
        title: "Download The Magazines",
        highlight: "Download",
        ctaLabel: "Download Now",
        groups: [
          {
            title: "English Magazine",
            issues: [
              { label: "August Month (English)", href: "/#resources", image: "/images/magazines/shortlist-en-aug-2026.webp" },
              { label: "July Month (English)", href: "/#resources", image: "/images/magazines/shortlist-en-jul-2026.webp" },
            ],
          },
          {
            title: "Hindi Magazine",
            issues: [
              { label: "August Month (Hindi)", href: "/#resources", image: "/images/magazines/shortlist-hi-aug-2026.webp" },
              { label: "July Month (Hindi)", href: "/#resources", image: "/images/magazines/shortlist-hi-jul-2026.webp" },
            ],
          },
        ],
      },
      help: { title: "Doubt Regarding Current Affairs Preparation?", highlight: "Current Affairs", text: "Let us understand your concern and guide you in the right direction.", ctaLabel: "Get Free Mentorship" },
    },
    faqs: [
      { q: "What is “The Shortlist”?", a: "The Shortlist is a curated current affairs magazine by Vini IAS, designed specifically for UPSC Civil Services preparation. It filters important developments from the vast amount of daily news and presents them in a concise, exam-oriented format." },
      { q: "How is The Shortlist different from reading daily newspapers?", a: "Instead of spending hours going through multiple newspapers and sources, The Shortlist brings information from multiple sources to one place, helping you save time." },
      { q: "Is The Shortlist useful for students who are already following another current affairs source?", a: "Yes. The Shortlist can work as a focused revision and consolidation resource even if you follow newspapers, daily current affairs classes or another source. It helps you quickly revisit the issues that are most relevant from the UPSC perspective and build a more structured current affairs repository." },
      { q: "Which sources are covered in The Shortlist Current Affairs Magazine?", a: "The Shortlist covers important news and insights from major newspapers, current affairs magazines, and other credible sources relevant to UPSC CSE preparation. This includes sources such as The Hindu, Indian Express, Yojana, Down To Earth, and other important publications." },
    ],
  },

  /* ---------------- PRISM Simplified (PIB magazine) ---------------- */
  {
    ...EMPTY,
    slug: "prism-simplified",
    label: "PRISM Simplified",
    title: "PRISM Simplified — PIB Monthly Magazine",
    summary: "PRISM Simplified: the PIB magazine clarified for UPSC — summarised content (680 pages → 60 pages), mind maps, schemes & initiatives, data, trends, examples and case studies. Free monthly download.",
    priceLabel: "FREE",
    isFree: true,
    startInfo: "",
    magazine: {
      theme: "prism",
      hero: {
        eyebrow: "VINI IAS MONTHLY MAGAZINE",
        title: "PRISM",
        highlight: "SIMPLIFIED",
        tagline: "PIB Magazine, clarified for *UPSC*",
        points: [
          { title: "Summarised Content", text: "(680 pages → 60 pages)", icon: "FileText" },
          { title: "Summarised Mindmaps", text: "(Easy to revise & remember)", icon: "Lightbulb" },
          { title: "Schemes & Initiatives", text: "(Covers all exam relevant information)", icon: "Landmark" },
          { title: "Data, Trends, Examples, Case Studies", text: "(Enhances the content of answer writing)", icon: "BarChart3" },
        ],
        image: { src: "/images/magazines/prism-hero-books.webp", alt: "PRISM Simplified — PIB Monthly Magazine Summary", width: 1365, height: 1400 },
      },
      why: {
        eyebrow: "EXAMINATION STRATEGY & PEDAGOGY",
        title: "Why PRISM Simplified ?",
        highlight: "PRISM",
        quote: "The UPSC Chairman has highlighted PIB as one of the important sources for the recent prelims examination. This makes regular coverage of PIB increasingly important for CSE preparation.",
        source: { title: "THE PRIMARY GOVERNMENT SOURCE", text: "PIB is an important primary and authentic source for understanding what the government is doing, why it is doing it, and how it implements its policies." },
        stat: {
          eyebrow: "UPSC CSE PRELIMS 2026",
          value: "20–25",
          label: "QUESTIONS TRACED DIRECTLY TO PIB",
          text: "The UPSC CSE Prelims 2026 was particularly current affairs-heavy. Around 20–25 questions drew on information that was not adequately covered elsewhere and could only be traced to PIB releases.",
        },
      },
      downloads: {
        title: "Download The Magazines",
        highlight: "Download",
        ctaLabel: "Download Magazine",
        groups: [
          {
            issues: [
              { label: "August 2026", href: "/#resources", image: "/images/magazines/prism-cover-aug-2026.webp" },
            ],
          },
        ],
      },
      help: { title: "Doubt Regarding PIB Magazine Preparation?", highlight: "PIB Magazine", text: "Let us understand your concern and guide you in the right direction.", ctaLabel: "Get Free Mentorship" },
    },
    faqs: [
      { q: "Why is the PIB Magazine important for UPSC preparation?", a: "PIB is one of the most authentic government sources for UPSC Current Affairs. It helps aspirants understand government schemes, flagship programmes, policy implementation, reports, institutional bodies, and important factual developments that are useful for both Prelims and Mains." },
      { q: "What does the PRISM Simplified PIB Magazine cover?", a: "The magazine converts official PIB releases into concise one-page mind maps and flowcharts. It covers government schemes, important data and statistics, ready-to-use case studies, best practices, success stories, and key developments without adding unnecessary information." },
      { q: "How is this PIB Magazine useful for UPSC Prelims and Mains?", a: "For Prelims, it provides factual coverage of schemes, initiatives, reports, indices, agreements, and institutional developments. For Mains, it offers official data, examples, case studies, and government initiatives that strengthen answers across Governance, Economy, Health, Education, Infrastructure, Environment, and other GS topics." },
      { q: "Why did Vini IAS create a dedicated PIB Magazine Summary?", a: "Recent UPSC examinations have become increasingly current-affairs driven. PRISM Simplified helps aspirants save time by transforming lengthy PIB articles into structured, exam-oriented summaries while preserving the original information and official facts." },
      { q: "Does the PIB Magazine add extra information or modify official content?", a: "No. PRISM Simplified is designed to remain faithful to official PIB releases. The content is condensed into easy-to-revise mind maps and flowcharts without adding extra information, making revision faster while maintaining authenticity." },
    ],
  },
];
