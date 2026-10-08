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
    landing: {
      hero: {
        badge: "UPSC",
        heading: "NCERT",
        subheading: "FOUNDATION COURSE",
        tagline: "Build Strong Basics. Crack UPSC.",
        description: "NCERTs are not just books, they are your first step towards IAS. Let's build your foundation the right way.",
        note: ["NCERT", "= Strong", "Foundation"],
        books: ["History", "Geography", "Polity", "Economy", "Environment", "Science & Technology"],
        ctaLabel: "Enroll Now",
      },
      features: [
        { title: "Complete Syllabus", text: "Covers all NCERTs from Class 6 to 12", icon: "BookOpen" },
        { title: "Infographics", text: "Quick Revision Made Easy", icon: "FileImage" },
        { title: "Notes", text: "Concise & Exam Oriented", icon: "NotebookPen" },
        { title: "Books & Test Series", text: "Practice for Better Results", icon: "ClipboardList" },
      ],
      highlights: {
        badge: "COURSE HIGHLIGHTS",
        title: "Complete Syllabus",
        subtitle: "Subject-wise NCERT Coverage",
        subjects: [
          { title: "History", icon: "Landmark" },
          { title: "Geography", icon: "Globe2" },
          { title: "Polity", icon: "Building2" },
          { title: "Economy", icon: "TrendingUp" },
          { title: "Environment", icon: "Leaf" },
          { title: "Science & Tech", icon: "Atom" },
        ],
        footnotes: ["Class 6 to 12", "NCERT Textbooks", "Simplified for UPSC"],
        levels: [
          { title: "Class 6-8", text: "Foundation Building" },
          { title: "Class 9-10", text: "Concept Clarity" },
          { title: "Class 11-12", text: "Advanced Understanding" },
        ],
        progression: ["Concepts", "Clarity", "Confidence"],
      },
      infographic: {
        badge: "INFOGRAPHIC DESIGN",
        title: "Study Smarter, Not Harder",
        text: "Our easy-to-understand infographics help you visualize concepts, remember key facts and revise faster.",
        tags: ["Maps & Diagrams", "Key Facts", "Timeline", "Quick Revision"],
      },
      studyMaterial: {
        badge: "STUDY MATERIAL",
        title: "Notes, Books & Test Series",
        subtitle: "Everything you need, in one place.",
        items: [
          { title: "Short & Crisp Notes", text: "Exam focused • Easy to revise", art: "notes" },
          { title: "Recommended Books", text: "NCERT + Value Addition", art: "books" },
          { title: "Chapter-wise Test Series", text: "Practice • Evaluate • Improve", art: "tests" },
        ],
      },
      enquiry: {
        badge: "GET STARTED TODAY",
        title: "Have Any Questions?",
        text: "Fill the form below and our team will get back to you with all the details about the UPSC NCERT Foundation Course.",
        ctaLabel: "Enquire Now",
      },
    },
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
    title: "Live GS Foundation Course for UPSC 2027/29",
    summary: "A complete foundation program to build your concepts, answer writing, and exam temperament from the ground up.",
    priceLabel: "₹24,999",
    isFree: false,
    startInfo: "Starting from 16th November 2026",
    syllabusUrl: SYLLABUS_URL,
    guide: { heading: "", text: "" },
    whatIs: [],
    learn: [],
    whyJoin: [],
    bestFor: [],
    batch: {
      hero: {
        liveLabel: "LIVE BATCH",
        batchLabel: "Batch 1",
        title: "Live GS Foundation Course for UPSC 2027/29 – Batch 1",
        highlight: "UPSC 2027/29 –",
        description: "A complete foundation program to build your concepts, answer writing, and exam temperament from the ground up.",
        highlights: [
          { title: "700+", text: "Hours of Live Classes", icon: "Clock" },
          { title: "1:1", text: "Mentorship", icon: "UserRound" },
          { title: "PYQ coverage", text: "Learning", icon: "FileCheck2" },
          { title: "Answer Writing", text: "& Evaluation", icon: "PenLine" },
          { title: "Revision", text: "Modules", icon: "RotateCcw" },
          { title: "MCQ practice", text: "Learning", icon: "ListChecks" },
        ],
        startDate: "16th November 2026",
        image: { src: "/images/banners/banner-upsc-foundation-2027-28.webp", alt: "UPSC Foundation Batch — Hindi & English medium" },
      },
      stats: [
        { value: "1000+", label: "Final Selections", icon: "Trophy" },
        { value: "1L+", label: "App Downloads", icon: "Smartphone" },
        { value: "10,000+", label: "Doubts Solved", icon: "MessageCircleQuestion" },
        { value: "10L+", label: "Students Guided", icon: "Users" },
      ],
      stagesTitle: { text: "4 Stages Of", highlight: "Preparation" },
      journey: { title: "UPSC JOURNEY", subtitle: "A 4-STAGE GUIDED PATH TO SUCCESS" },
      stages: [
        {
          title: "FOUNDATION SUBJECTS",
          timeline: "November 2026 - June 2027",
          groups: [
            { title: "CORE SUBJECTS", items: ["Modern History", "Geography", "Polity", "Economy"] },
            { title: "MAISE", items: ["Mapping", "AMAC", "International Relations", "Science & Tech", "Environment"] },
          ],
          goal: "Build strong foundational knowledge across all core subjects and develop analytical understanding.",
        },
        {
          title: "MAINS PREPARATION",
          timeline: "July 2027 - December 2027",
          groups: [
            { title: "CONTENT & PDF", items: ["GS 1", "GS 2", "GS 3", "GS 4 - Ethics", "Essay"] },
            { title: "ANSWER WRITING", items: ["Write Smart", "LAWS", "Mains Test Series", "Evaluation"] },
          ],
          goal: "Transform foundational knowledge into structured answer writing and develop the analytical depth required to excel in the Mains examination.",
        },
        {
          title: "PRELIMS PREPARATION",
          timeline: "January 2028 - April 2028",
          groups: [
            {
              items: [
                "Live MCQ Solving Sessions (LMS)",
                "PYQ MCQs Covered",
                "MCQ Solving Methodologies",
                "CSAT Practice",
                "500+ MCQs Coverage",
                "Complete Syllabus Coverage",
                "As Per UPSC Standard",
                "Current Affairs",
              ],
            },
          ],
          goal: "Sharpen exam temperament through intensive MCQ practice, PYQ analysis, and targeted Prelims-focused revision.",
        },
        {
          title: "UPDATION FOR MAINS",
          timeline: "May 2028 - June 2028",
          groups: [{ items: ["Updated Current Affairs", "Recordings Available", "Value Added Materials", "Preparation Support"] }],
          goal: "Receive continuous academic support through updated study material, current affairs, value-added notes, and evolving exam-focused content.",
        },
      ],
      plansTitle: {
        before: "Choose the",
        highlight: "Plan That Fits",
        after: "Your Preparation",
        subtitle: "Compare features, mentorship, and benefits to find the perfect fit for your UPSC journey.",
      },
      // Prices are placeholders — update them here or serve them from the API.
      plans: [
        { id: "foundation", name: "FOUNDATION", price: 24999, color: "#13294B", tint: "#F1F5FB" },
        { id: "foundation-plus", name: "FOUNDATION PLUS", price: 39999, color: "#FE0034", tint: "#FFF5F7" },
      ],
      features: [
        { label: "Live GS Foundation Lecture", icon: "Video", plans: ["foundation", "foundation-plus"] },
        { label: "PDF Notes", icon: "FileText", plans: ["foundation", "foundation-plus"] },
        { label: "GS Mains Modules (GS 1, 2, 3, 4)", icon: "BookOpen", plans: ["foundation", "foundation-plus"] },
        { label: "Essay Coverage", icon: "PenLine", plans: ["foundation", "foundation-plus"] },
        { label: "Live Write Smart PYQs 2013-2027", icon: "BookOpen", plans: ["foundation", "foundation-plus"] },
        { label: "Live Answer Writing Sessions (LAWS)", icon: "MessagesSquare", plans: ["foundation", "foundation-plus"] },
        { label: "Current Affairs Coverage", icon: "Newspaper", plans: ["foundation", "foundation-plus"] },
        { label: "CSAT Live Lecture", icon: "Monitor", plans: ["foundation", "foundation-plus"] },
        { label: "Prelims Test Series", icon: "ClipboardCheck", plans: ["foundation", "foundation-plus"] },
        { label: "Mains Test Series with Evaluations", icon: "FileCheck2", plans: ["foundation-plus"] },
        { label: "Group Mentorship", icon: "Users", plans: ["foundation", "foundation-plus"] },
        { label: "1:1 Mentorship", icon: "UserRound", plans: ["foundation-plus"] },
      ],
      expert: {
        title: "Still Confused? Talk to our",
        highlight: "UPSC Experts",
        text: "Get free counselling and guidance for your UPSC preparation.",
        ctaLabel: "Get Free Mentorship",
      },
    },
    faqs: [
      {
        q: "Who should join this GS Foundation Course?",
        a: "This course is designed for UPSC aspirants preparing for CSE 2027, 2028 or 2029, whether they are beginners, college students, working professionals, or repeat aspirants looking for a structured preparation strategy.",
      },
      {
        q: "Does the course cover both Prelims and Mains?",
        a: "Yes. The program provides integrated preparation for both Prelims and Mains, including GS Foundation, Mains Preparation, Current Affairs, PYQ Analysis, Answer Writing, CSAT, Tests, and Interview Guidance.",
      },
      {
        q: "How long will I have access to the course?",
        a: "The course validity is available till December 2029, allowing students sufficient time for preparation, revision, and multiple attempts if required.",
      },
      { q: "What is the medium of instruction?", a: "Classes are conducted in Hindi & English. Class notes and study material are provided in both English and Hindi." },
      { q: "Will the Foundation Program cover all subjects from the basics?", a: "Yes, the Foundation Program covers all subjects comprehensively from basic to advanced level in a structured manner." },
    ],
  },
];

/* Labels come from the GS Foundation menu, keyed by the slug at the end of each menu link. */
const MENU_LABELS = new Map(
  (NAV_ITEMS.find((n) => n.id === "gs-foundation")?.children ?? []).map((c) => [c.href.split("/").pop() ?? "", c.label])
);

export const FREE_RESOURCES: FreeResourcePage[] = PAGES.map((p) => ({ ...p, label: MENU_LABELS.get(p.slug) ?? p.title }));
