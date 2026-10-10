/**
 * CSAT pages — route: /courses/csat/[csat]
 *   /courses/csat/foundation-batch
 *   /courses/csat/csat-pyqs-with-solution
 *
 * FALLBACK content — used when GET /courses/csat/:slug is not configured or fails.
 * Prices / dates are placeholders.
 */
import { FreeResourcePage } from "@/types";

const BANNER = { image: "/images/banners/banner-upsc-foundation-2027-28.webp", alt: "Vini IAS CSAT course" };
const EMPTY = { guide: { heading: "", text: "" }, whatIs: [], learn: [], whyJoin: [], bestFor: [], syllabusUrl: "/#resources" };

export const CSAT_PAGES: FreeResourcePage[] = [
  /* ---------------- CSAT Foundation Batch ---------------- */
  {
    ...EMPTY,
    slug: "foundation-batch",
    label: "Foundation Batch",
    title: "Online CSAT Foundation Course for UPSC Prelims 2027 – Batch 1",
    summary:
      "CSAT (Paper II) is often underestimated, but recent trends show it can be the real game-changer in clearing Prelims. Our 100-Day Foundation Program builds strong basics, sharpens logical understanding (beyond formulas), and ensures consistent practice—giving you the clarity, confidence, and courage to ace the exam.",
    priceLabel: "₹4,999",
    isFree: false,
    startInfo: "Starting from 16th November 2026",
    mentorship: {
      batchLabel: "Online",
      hideHeroPrice: true,
      priceNote: "(Inclusive of all taxes)",
      primaryCta: { label: "Explore Courses", targetId: "choose-course" },
      secondaryLink: { label: "Explore Offline Batch", href: "/#enquiry" },
      media: { ...BANNER, caption: "CSAT Foundation Course" },
      features: {
        title: "Features",
        items: [
          { title: "Complete CSAT Syllabus Coverage", text: "Covers Quantitative Aptitude, Logical Reasoning & Reading Comprehension in a compact format." },
          { title: "Concept-to-Question Approach", text: "Every topic is immediately linked to exam-level MCQs for better retention." },
          { title: "Reading Comprehension Mastery", text: "Special sessions to improve accuracy and speed in long RC passages." },
          { title: "Daily Practice Questions", text: "Topic-wise questions provided after every class for consistent practice." },
          { title: "Doubt-Solving Sessions", text: "Dedicated sessions to clear all individual doubts in real time." },
          { title: "PYQ-Based Teaching", text: "All concepts taught strictly through Previous Year UPSC CSAT questions." },
        ],
      },
      comparison: {
        plansTitle: { before: "Compare", highlight: "CSAT", after: "Plans", subtitle: "Pick Foundation or Foundation Plus based on how much practice you need." },
        plans: [
          { id: "foundation", name: "FOUNDATION", price: 4999, color: "#13294B", tint: "#F1F5FB", priceNote: "(INCLUSIVE OF ALL TAXES)" },
          { id: "foundation-plus", name: "FOUNDATION PLUS", price: 6999, color: "#FE0034", tint: "#FFF5F7", priceNote: "(INCLUSIVE OF ALL TAXES)" },
        ],
        features: [
          { label: "Live Lectures", icon: "Video", plans: ["foundation", "foundation-plus"] },
          { label: "Concept Quick Revision Notes", icon: "FileText", plans: ["foundation", "foundation-plus"] },
          { label: "Doubt Resolution", icon: "MessageCircleQuestion", plans: ["foundation", "foundation-plus"] },
          { label: "PYQ Solutions", icon: "FileCheck2", plans: ["foundation", "foundation-plus"] },
          { label: "Dedicated Live Question Practice Session", icon: "PenLine", plans: ["foundation-plus"] },
          { label: "Printed Book", icon: "BookOpen", plans: ["foundation-plus"] },
          { label: "Year Long Test Series", icon: "ClipboardCheck", plans: ["foundation-plus"] },
        ],
      },
      planPicker: {
        title: "CHOOSE COURSE",
        defaultId: "foundation",
        plans: [
          {
            id: "foundation",
            name: "FOUNDATION",
            course: "Online CSAT Foundation Course 2027 - FOUNDATION",
            description: "The Foundation plan includes Live Lectures, Concept Quick Revision Notes, Doubt Resolution, and PYQ Solutions — ideal for structured CSAT preparation with complete syllabus coverage.",
            fee: "₹4,999 (Inclusive of all taxes)",
            price: "₹4,999",
            priceNote: "(Inclusive of all taxes)",
          },
          {
            id: "foundation-plus",
            name: "FOUNDATION PLUS",
            course: "Online CSAT Foundation Course 2027 - FOUNDATION PLUS",
            description: "The Foundation Plus plan includes everything in the Foundation plan, along with Dedicated Live Question Practice Sessions, a Printed Book for offline revision and deeper practice, and a Year Long Test Series to keep your preparation exam-ready till Prelims 2027.",
            fee: "₹6,999 (Inclusive of all taxes)",
            price: "₹6,999",
            priceNote: "(Inclusive of all taxes)",
          },
        ],
      },
    },
    faqs: [
      { q: "What is the total duration of the batch?", a: "The total duration of the batch is 3.5 months, with 100+ hours of content." },
      { q: "How many classes will be conducted every week?", a: "Classes are held 4 days a week, with each class of 2 hours duration." },
      { q: "How many hours of study will this program provide weekly?", a: "The program provides 8 hours of structured learning every week." },
      { q: "Will the entire CSAT syllabus be covered?", a: "Yes, the course ensures complete coverage of the CSAT syllabus." },
      { q: "Will previous year questions be discussed?", a: "Yes, PYQs from the last 15 years are discussed in detail." },
      { q: "Are doubt sessions included in the course?", a: "Yes, regular doubt sessions are conducted on every topic." },
      { q: "Will online students be able to ask doubts?", a: "Yes, the classes are live and interactive." },
      { q: "Till when is the online access valid?", a: "Online access is valid till Prelims 2027." },
      { q: "How will I get the study material?", a: "The study material is available on your portal in PDF format." },
      { q: "What will be the medium of communication — English or Hindi?", a: "Classes are conducted in Hindi & English, and notes are available in both Hindi and English." },
      { q: "Is the Test Series included in this program?", a: "The Year Long Test Series is included in the Foundation Plus plan. The Foundation plan does not include it." },
      { q: "How will this program help aspirants clear CSAT?", a: "The program builds confidence, clarity, problem-solving ability, and exam-oriented preparation to help aspirants clear CSAT successfully." },
    ],
  },

  /* ---------------- CSAT PYQs with Solution ---------------- */
  {
    ...EMPTY,
    slug: "csat-pyqs-with-solution",
    label: "CSAT PYQs with Solution",
    title: "UPSC CSAT PYQs (2022–2026) with Solutions",
    summary:
      "Master the UPSC CSAT with 5 years of Previous Year Questions (2022–2026) explained in detail. Get clear, step-by-step solutions and video lectures that not only give you the right answers but also teach you the smart approach to solve similar questions in the exam.",
    priceLabel: "₹499",
    isFree: false,
    startInfo: "Start anytime — instant access",
    mentorship: {
      priceNote: "+taxes",
      media: { ...BANNER, caption: "CSAT PYQs with Solutions" },
      features: {
        title: "Features",
        items: [
          { title: "5 Years Coverage (2022–2026)", text: "All PYQs from the last five years compiled in one place for complete practice." },
          { title: "Detailed Solutions", text: "Step-by-step explanations to help you understand the logic behind every answer." },
          { title: "Video Lectures", text: "Clear, engaging video sessions breaking down each question and concept." },
        ],
      },
    },
    faqs: [
      { q: "What does this course cover?", a: "This course includes the last 5 years of UPSC CSAT (Paper 2) Previous Year Questions with detailed video explanations and downloadable PDF solutions." },
      { q: "Who should join this course?", a: "Any UPSC aspirant who wants to strengthen their CSAT skills—whether you’re confident in aptitude or find it challenging—will benefit from this systematic PYQ practice." },
      { q: "How will this course help me in the exam?", a: "By solving real exam questions from the last 5 years, you’ll learn the exact difficulty level, the types of tricks UPSC uses, and the best time-saving techniques." },
      { q: "Are all topics of CSAT covered?", a: "Yes. The PYQs cover Quantitative Aptitude, Logical Reasoning, Data Interpretation, and Reading Comprehension, giving you well-rounded preparation." },
      { q: "How long will I have access to the course?", a: "You’ll have access to all videos and PDFs until the UPSC Prelims 2027 exam date." },
    ],
  },
];
