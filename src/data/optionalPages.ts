/**
 * Optional subject pages — ONE template, content per subject.
 * Route: /courses/optional/[optional]   e.g. /courses/optional/history, /courses/optional/psir
 *
 * FALLBACK content — used when GET /courses/optional/:slug is not configured or fails.
 * Add a subject by adding an entry to SUBJECTS (and the menu in data/navigation.ts).
 * Prices / dates are placeholders.
 */
import { FreeResourcePage } from "@/types";
import { slugify } from "@/utils/slug";

interface OptionalSubject {
  name: string; // menu label, e.g. "History"
  /** Name used in sentences, e.g. "History Optional", "PSIR (Political Science & International Relations)". */
  fullName: string;
  summary: string;
  /** What "conceptual clarity" covers for this subject. */
  clarity: string;
  /** Subject-specific extra feature. */
  special: { title: string; text: string };
  startInfo: string;
  hindiMedium?: boolean;
}

const SUBJECTS: OptionalSubject[] = [
  {
    name: "Hindi Literature",
    fullName: "Hindi Literature Optional",
    summary:
      "Comprehensive Hindi Literature Optional Program that covers the entire syllabus from basic to advanced levels — history of Hindi language and literature, prescribed texts, critical appreciation and criticism — with detailed class notes, thorough PYQ discussions, and answer-writing sessions required to excel in the UPSC examination.",
    clarity: "Develop a strong understanding of the history of Hindi language & literature, literary movements, and the prescribed prose and poetry texts.",
    special: { title: "Text-Based Critical Appreciation", text: "Line-by-line discussion of prescribed texts with सप्रसंग व्याख्या and critical appreciation practice." },
    startInfo: "Starting from 2nd November 2026",
    hindiMedium: true,
  },
  {
    name: "History",
    fullName: "History Optional",
    summary:
      "Comprehensive History Optional Program that covers the entire syllabus from basic to advanced levels. With a strong focus on conceptual clarity, historians' perspectives, detailed class notes, thorough PYQ discussions, and effective answer-writing sessions required to excel in the UPSC examination.",
    clarity: "Develop a strong understanding of Ancient, Medieval, Modern, and World History to build analytical and answer-writing skills.",
    special: { title: "Historians' Perspectives & Map Work", text: "Historiography, key historians' views and map-based questions integrated into every unit." },
    startInfo: "Starting from 16th November 2026",
  },
  {
    name: "Geography",
    fullName: "Geography Optional",
    summary:
      "Geography Optional Course is a structured 5-month program designed to provide in-depth conceptual clarity, strong answer writing skills, and focused mentorship for UPSC Mains. The course covers the entire syllabus in a systematic manner, with special emphasis on case studies and Previous Year Questions to ensure exam-oriented preparation.",
    clarity: "Develop a strong understanding of Physical, Human, and Indian Geography with models, theories and real-world examples.",
    special: { title: "Maps, Diagrams & Case Studies", text: "Diagram practice, mapping and contemporary case studies to make answers stand out." },
    startInfo: "Starting from 16th November 2026",
  },
  {
    name: "PSIR",
    fullName: "PSIR (Political Science & International Relations) Optional",
    summary:
      "Comprehensive PSIR Optional Program that covers the entire syllabus from basic to advanced levels. With 250–300 hours of live lectures, comprehensive class notes, current affairs integration, answer writing through PYQs, and regular doubt-clearing & mentorship sessions required to excel in the UPSC examination.",
    clarity: "Develop a strong understanding of Political Theory, Indian Government & Politics, Comparative Politics, and International Relations.",
    special: { title: "Current Affairs Integration", text: "International relations and Indian polity linked with current developments for value-added answers." },
    startInfo: "Starting from 23rd November 2026",
  },
  {
    name: "Sociology",
    fullName: "Sociology Optional",
    summary:
      "Our comprehensive Sociology Foundation Course for UPSC 2027 offers deep-dive syllabus coverage, PYQ discussions, live answer writing practice, and expert mentorship to help you master Sociology Optional.",
    clarity: "Develop a strong understanding of sociological thinkers, theories, and Indian society to build analytical answers.",
    special: { title: "Thinkers & Indian Society Linkage", text: "Classical and modern thinkers applied to Indian social issues with examples and studies." },
    startInfo: "Starting from 16th November 2026",
  },
  {
    name: "Anthropology",
    fullName: "Anthropology Optional",
    summary:
      "The Anthropology Foundation Course for UPSC 2027 is a comprehensive program that covers the entire syllabus from basic to advanced levels. Featuring detailed class notes, in-depth discussions on previous years' questions, and live answer writing sessions, this course provides a complete solution for mastering Anthropology Optional.",
    clarity: "Develop a strong understanding of Physical, Socio-Cultural, and Indian Anthropology with ethnographic examples.",
    special: { title: "Diagrams & Ethnographic Examples", text: "Ready-to-use diagrams and tribal / ethnographic case examples for high-scoring answers." },
    startInfo: "Starting from 23rd November 2026",
  },
  {
    name: "Public Administration",
    fullName: "Public Administration Optional",
    summary:
      "This 5-month foundation course is designed to cover the entire Public Administration Optional syllabus in a structured and systematic manner. The program includes integrated value addition for General Studies (GS) papers, ensuring a holistic approach to UPSC preparation, with a strong focus on conceptual clarity, key thinkers, and practical application.",
    clarity: "Develop a strong understanding of administrative theory, key thinkers, and Indian administration with practical examples.",
    special: { title: "GS Value Addition", text: "Integrated coverage that strengthens GS 2 and Ethics alongside the optional." },
    startInfo: "Starting from 16th November 2026",
  },
  {
    name: "Philosophy",
    fullName: "Philosophy Optional",
    summary:
      "The Live Philosophy Optional Foundation Course 2027 is a comprehensive 5-month program specially curated for UPSC aspirants. It includes complete syllabus coverage, answer writing practice, PYQ discussions, full-length tests, conceptual clarity sessions, and personalized doubt resolution for a strong command over Philosophy Optional.",
    clarity: "Develop a strong understanding of Western and Indian Philosophy, Socio-Political Philosophy, and Philosophy of Religion.",
    special: { title: "Concept Maps & Argument Building", text: "Structured arguments, counter-arguments and concept maps for precise philosophical answers." },
    startInfo: "Starting from 23rd November 2026",
  },
];

const BANNER = { image: "/images/banners/banner-upsc-foundation-2027-28.webp", alt: "Vini IAS Optional Foundation Course" };
const EMPTY = { guide: { heading: "", text: "" }, whatIs: [], learn: [], whyJoin: [], bestFor: [], syllabusUrl: "/#resources" };
const BOTH = ["foundation", "foundation-plus"];

function buildOptionalPage(s: OptionalSubject): FreeResourcePage {
  const title = `Live ${s.name} Optional Foundation Course 2027 – Batch 1`;
  return {
    ...EMPTY,
    slug: slugify(s.name),
    label: s.name,
    title,
    summary: s.summary,
    priceLabel: "₹24,999 + Taxes",
    isFree: false,
    startInfo: s.startInfo,
    mentorship: {
      hideHeroPrice: true,
      primaryCta: { label: "Explore Courses", targetId: "choose-course" },
      media: { ...BANNER, caption: `${s.name} Optional Foundation` },
      offer: { text: "Fill the form to get Special Offer", ctaLabel: "Fill the Form" },
      features: {
        title: `${s.name} Foundation Features`,
        items: [
          { title: "Live Lectures", text: "Live interactive sessions covering the complete syllabus (Paper I & Paper II) with comprehensive conceptual coverage." },
          { title: "High-Quality Study Material", text: "Comprehensive, regularly updated notes designed to cover the entire syllabus in line with the latest UPSC trends and requirements." },
          { title: "Emphasis on Conceptual Clarity", text: s.clarity },
          { title: "PYQs Analysis and Discussion", text: "Detailed analysis of Previous Year Questions to identify recurring themes, UPSC trends, and examiner expectations." },
          { title: "Doubt Clearing", text: "Regular interactive sessions to resolve conceptual doubts and ensure uninterrupted learning." },
          s.special,
          { title: "Live Answer Writing", text: "Guided answer writing sessions on structure, introductions, conclusions and value addition. (Foundation Plus)" },
          { title: "Test Series with Evaluation", text: "Sectional and full-length tests with detailed evaluation and feedback. (Foundation Plus)" },
          { title: "One-on-One Mentorship", text: "Personal mentorship with faculty to plan, track and improve your preparation. (Foundation Plus)" },
        ],
      },
      comparison: {
        plansTitle: { before: "Choose the", highlight: "Plan That Fits", after: "You", subtitle: `Compare the two ${s.fullName} plans.` },
        plans: [
          { id: "foundation", name: "FOUNDATION", price: 24999, color: "#13294B", tint: "#F1F5FB", priceNote: "+ TAXES" },
          { id: "foundation-plus", name: "FOUNDATION PLUS", price: 33499, color: "#FE0034", tint: "#FFF5F7", priceNote: "+ TAXES" },
        ],
        features: [
          { label: "Live Lectures", icon: "Video", plans: BOTH },
          { label: "PDF Study Material", icon: "FileText", plans: BOTH },
          { label: "Doubt Resolution", icon: "MessageCircleQuestion", plans: BOTH },
          { label: "PYQ Discussion", icon: "FileCheck2", plans: BOTH },
          { label: "Live Answer Writing Sessions", icon: "PenLine", plans: ["foundation-plus"] },
          { label: "Test Series with Evaluation", icon: "ClipboardCheck", plans: ["foundation-plus"] },
          { label: "One-on-One Mentorship with Faculty", icon: "UserRound", plans: ["foundation-plus"] },
        ],
      },
      planPicker: {
        title: "CHOOSE COURSE",
        defaultId: "foundation",
        plans: [
          {
            id: "foundation",
            name: "FOUNDATION",
            course: `${title} - FOUNDATION`,
            description: `The Foundation plan includes Live Lectures, PDF Material, Doubt Resolution, and PYQ Discussion — ideal for a structured ${s.fullName} foundation with complete syllabus coverage.`,
            fee: "₹24,999 + Taxes",
            price: "₹24,999",
            priceNote: "+ Taxes",
          },
          {
            id: "foundation-plus",
            name: "FOUNDATION PLUS",
            course: `${title} - FOUNDATION PLUS`,
            description: "The Foundation Plus plan includes everything in the Foundation plan, along with Live Answer Writing Sessions, Test Series with Evaluation, and One-on-One Mentorship with Faculty.",
            fee: "₹33,499 + Taxes",
            price: "₹33,499",
            priceNote: "+ Taxes",
          },
        ],
      },
    },
    faqs: [
      { q: `Who should enroll in the ${s.name} Foundation Course?`, a: `This course is ideal for beginners as well as for students who have already started ${s.fullName} preparation and want a strong, structured foundation for UPSC CSE 2027.` },
      { q: "What is the duration of the course?", a: `The complete syllabus is covered in about 5 months as per a disciplined and pre-planned schedule (${s.startInfo.replace("Starting from", "starting")}).` },
      { q: `Will the entire ${s.name} Optional syllabus be covered?`, a: "Yes, the course ensures complete and comprehensive coverage of Paper I and Paper II from basic to advanced levels." },
      { q: "Will study material be provided?", a: "Yes, students receive PDFs of standard reference material along with exam-focused class notes." },
      { q: "How many tests will be conducted during the course?", a: "Regular class tests are conducted every month with detailed answer discussions. Full test series with evaluation is part of the Foundation Plus plan." },
      { q: "Will there be doubt-clearing sessions?", a: "Yes, weekly doubt-clearing and strategy sessions are conducted for continuous academic and strategic support." },
      { q: "Will the classes be live or recorded?", a: `Classes are conducted in live mode, and recordings are provided for revision.${s.hindiMedium ? " Classes and notes are in Hindi." : " Classes are in Hindi & English with bilingual notes."}` },
    ],
  };
}

export const OPTIONAL_SUBJECTS = SUBJECTS.map((s) => s.name);
export const OPTIONAL_PAGES: FreeResourcePage[] = SUBJECTS.map(buildOptionalPage);
