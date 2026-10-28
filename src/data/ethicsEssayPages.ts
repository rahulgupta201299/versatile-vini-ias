/**
 * Ethics & Essay pages — route: /courses/ethics-essay/[ethicsEssay]
 *   /courses/ethics-essay/ethics-foundation-batch  (Ethics Foundation landing)
 *   /courses/ethics-essay/essay-foundation-batch
 *   /courses/ethics-essay/ethics-answer-writing
 *
 * FALLBACK content — used when GET /courses/ethics-essay/:slug is not configured or fails.
 * Prices / dates are placeholders. No educators are shown.
 */
import { FreeResourcePage } from "@/types";

const BANNER = { image: "/images/banners/banner-mains360.png", alt: "Vini IAS Ethics & Essay programme" };
const EMPTY = { guide: { heading: "", text: "" }, whatIs: [], learn: [], whyJoin: [], bestFor: [] };

export const ETHICS_ESSAY_PAGES: FreeResourcePage[] = [
  /* ---------------- Ethics Foundation Batch ---------------- */
  {
    ...EMPTY,
    slug: "ethics-foundation-batch",
    label: "Ethics Foundation Batch",
    title: "Online Ethics Foundation Course for UPSC CSE 2027",
    summary: "The most trusted & result-oriented Ethics (GS Paper IV) program for UPSC CSE 2027 — theory classes, Section A and case-study answer writing, mini tests and full length tests with evaluation.",
    priceLabel: "₹8,474",
    isFree: false,
    startInfo: "Starts: 5th January 2027",
    ethics: {
      hero: {
        badge: "ONLINE",
        title: "ETHICS",
        subtitle: "FOUNDATION COURSE",
        forLabel: "For",
        exam: "UPSC CSE 2027",
        tagline: "The *most trusted* & result-oriented Ethics program for *UPSC CSE.*",
        meta: [
          { label: "Starts", value: "5th January 2027" },
          { label: "Theory Classes", value: "Hinglish" },
          { label: "Mini Test Discussions", value: "English" },
        ],
        rating: { value: "4.9", label: "Rating" },
        stories: { value: "500+", label: "Success stories" },
      },
      why: {
        title: "WHY ETHICS FOUNDATION PROGRAM ?",
        intro: "Ace GS Paper IV with the best result oriented Ethics Foundation course in the country.",
        points: [
          "Build conceptual clarity + strong syllabus interlinkages",
          "Add depth using structured templates & dimensions",
          "Crisp notes with keywords, examples & micro-diagrams",
          "Use proven decision-making frameworks",
          "Guided practice with mini tests + FLTs + mentorship",
        ],
      },
      details: {
        title: "PROGRAM DETAILS",
        startLabel: "Starting From",
        startDate: "5th January 2027",
        items: [
          { title: "Complete Ethics syllabus", note: "18 Theory Classes (Hinglish)" },
          { title: "Section A Mastery", note: "(8 Answer Writing Sessions)" },
          { title: "Case Study Mastery", note: "(9 Answer Writing Sessions)" },
          { title: "15 Mini Test", note: "Discussion Based (English)" },
          { title: "2 Full Length Tests", note: "(With Evaluation)" },
        ],
        priceNote: "+Taxes",
      },
      callback: { title: "Need to Talk About The Course ??", highlight: "About The Course ??", subtitle: "Get an Instant Callback by our Mentor!", ctaLabel: "Talk to Mentor" },
    },
    faqs: [],
  },

  /* ---------------- Essay Foundation Batch ---------------- */
  {
    ...EMPTY,
    slug: "essay-foundation-batch",
    label: "Essay Foundation Batch",
    title: "Live Essay Mains Module for 2027",
    summary:
      "This course is designed to strengthen answer-writing and essay skills through interactive live classes, practical exercises, brainstorming sessions, and personalized feedback. With a focus on clarity, structure, and multidimensional thinking, the program helps aspirants improve their overall writing approach for descriptive examinations.",
    priceLabel: "₹5,931",
    isFree: false,
    startInfo: "Starting from 17th January 2027",
    mentorship: {
      batchLabel: "Online",
      priceNote: "+taxes",
      media: { ...BANNER, caption: "Essay Foundation Batch" },
      features: {
        title: "Features",
        items: [
          { title: "6 Interactive Live Classes", text: "Concept-focused sessions with real-time discussion, brainstorming, and personalized guidance." },
          { title: "Full Length Tests (FLTs)", text: "Includes 4 evaluated tests with detailed feedback + 2 self-evaluation tests for independent practice." },
          { title: "Dedicated Essay Skill Workshops", text: "Workshops on philosophical essays, structuring arguments, maintaining continuity, introductions, conclusions, and thematic flow." },
          { title: "Learning by Doing Approach", text: "Practice-driven pedagogy through impromptu brainstorming, ad hoc writing exercises, and live answer-building in class." },
          { title: "Targeted Writing Improvement", text: "Focus on identifying and improving individual writing lacunas such as coherence, articulation, examples, and multidimensional thinking." },
        ],
      },
    },
    faqs: [
      { q: "Who is this course designed for?", a: "This course is ideal for aspirants looking to improve their answer-writing skills, essay structuring, critical thinking, and overall performance in descriptive examinations." },
      { q: "How will the live classes be conducted?", a: "All classes will be conducted interactively in a live online format with real-time discussions, brainstorming, and doubt-solving sessions." },
      { q: "What is covered in the essay workshops?", a: "The workshops focus on philosophical essays, argument structuring, continuity, introductions, conclusions, thematic flow, and multidimensional analysis." },
      { q: "Are the tests evaluated?", a: "Yes. Out of the 6 Full Length Tests (FLTs), 4 will be evaluated with detailed feedback, while 2 are designed for self-evaluation and practice." },
      { q: "Can beginners join this course?", a: "Absolutely. Both beginners and experienced aspirants can benefit, as the course focuses on building clarity, coherence, articulation, and structured thinking from the ground up." },
      { q: "How will this course improve my writing?", a: "The program specifically targets writing lacunas such as weak coherence, poor articulation, lack of examples, and limited multidimensional thinking." },
    ],
  },

  /* ---------------- Ethics Answer Writing ---------------- */
  {
    ...EMPTY,
    slug: "ethics-answer-writing",
    label: "Ethics Answer Writing",
    title: "Ethics Mains Module for 2027 (Content Only)",
    summary:
      "Master Ethics Paper (GS4) with a structured and practical approach designed specifically for UPSC aspirants. This course provides complete syllabus coverage through simplified concepts, recorded lectures and case study frameworks to help you build strong conceptual clarity and write high-scoring answers with confidence.",
    priceLabel: "₹2,839",
    isFree: false,
    startInfo: "Starting from 7th January 2027",
    mentorship: {
      batchLabel: "Content Only",
      priceNote: "+taxes",
      media: { ...BANNER, caption: "Ethics Answer Writing" },
      features: {
        title: "Features",
        items: [
          { title: "Complete GS 4 Coverage", text: "Comprehensive coverage of the entire Ethics syllabus, including theory and case studies." },
          { title: "Structured Recorded Lectures", text: "Well-organized classes designed for step-by-step conceptual clarity." },
          { title: "Learn at Your Own Pace", text: "Pause, revisit, and revise lectures anytime for better retention." },
          { title: "Concise Notes & Handouts", text: "Ready-to-revise notes designed for quick revision before Mains." },
        ],
      },
    },
    faqs: [
      { q: "Is this course suitable for beginners?", a: "Yes, the course is designed in a simple and structured manner, making it suitable for both beginners and experienced aspirants." },
      { q: "Does the course cover the complete GS Paper 4 syllabus?", a: "Yes, the course provides complete GS4 Ethics coverage, including theory, thinkers, examples, and case studies." },
      { q: "Are the lectures live or recorded?", a: "The course consists of structured recorded lectures that you can watch anytime at your convenience." },
      { q: "Can I access the course at my own pace?", a: "Absolutely. You can pause, replay, and revise the lectures anytime for better understanding and retention." },
      { q: "Are case studies covered in detail?", a: "Yes, dedicated case study frameworks and answer-writing approaches are included for effective preparation." },
      { q: "Will notes and handouts be provided?", a: "Yes, concise notes and revision handouts are provided for quick and effective revision before Mains." },
      { q: "Does the course include previous year question (PYQ) analysis?", a: "Yes, PYQ-based preparation is included to help you understand UPSC trends and answer expectations." },
    ],
  },
];
