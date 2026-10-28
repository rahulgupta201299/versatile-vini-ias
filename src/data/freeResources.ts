/**
 * GS Foundation pages that are not in the admin yet — route: /courses/gs-foundation/<slug>.
 * Beginner's Kit and Foundation Batch 2027/29 come from the backend (admin → Web → GS Foundation).
 */
import { FreeResourcePage } from "@/types";

export const FREE_RESOURCES: FreeResourcePage[] = [
  {
    slug: "ncert-foundation-batch",
    label: "NCERT Foundation Batch",
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
];
