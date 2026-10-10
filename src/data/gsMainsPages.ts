/**
 * GS Mains pages — route: /courses/gs-mains/[gsMains]
 *   /courses/gs-mains/gs-mains-mentorship
 *   /courses/gs-mains/gs-mains-foundation
 *   /courses/gs-mains/gs-answer-writing
 *   /courses/gs-mains/free-mains-mentorship
 *
 * FALLBACK content — used when GET /courses/gs-mains/:slug is not configured or fails.
 * Prices / dates are placeholders.
 */
import { FreeResourcePage } from "@/types";

const BANNER = { image: "/images/banners/banner-mains360.png", alt: "Vini IAS UPSC Mains programme" };
const EMPTY = { guide: { heading: "", text: "" }, whatIs: [], learn: [], whyJoin: [], bestFor: [], syllabusUrl: "/#resources" };
const SYLLABUS = { title: "UPSC Mains Topic-Wise Syllabus", url: "/#resources" };
const ALL = ["foundation", "foundation-plus"];

export const GS_MAINS_PAGES: FreeResourcePage[] = [
  /* ---------------- GS Mains Mentorship ---------------- */
  {
    ...EMPTY,
    slug: "gs-mains-mentorship",
    label: "GS Mains Mentorship",
    title: "MAINS MENTORSHIP PROGRAM 2027",
    summary:
      "Crack UPSC CSE Mains 2027 with a comprehensive Mains Mentorship Program covering GS 1, GS 2, GS 3, Ethics, and Essay through Live & Recorded Lectures, PYQ Answer Writing Sessions, Live Answer Writing Sessions, Tests, and Consistent Mentorship. The program is designed to strengthen answer structuring, content quality, and writing practice to help you excel in UPSC Mains.",
    priceLabel: "₹11,299 + Taxes",
    isFree: false,
    startInfo: "Starting from 1st February 2027",
    mentorship: {
      hideHeroPrice: true,
      primaryCta: { label: "Explore Courses", targetId: "choose-course" },
      media: { ...BANNER, caption: "Mains Mentorship Program" },
      offer: { text: "Fill the form to get Special Offer", ctaLabel: "Fill the Form" },
      showToppers: true,
      problem: {
        steps: [
          { title: "KNOWING", points: ["Coverage of complete syllabus", "Read multiple sources", "Comfortable with content"] },
          { title: "WRITING", points: ["Struggle to start answers", "Lack of structure", "Takes too much time"] },
          { title: "SCORING", points: ["Marks not improving", "Feedback unclear", "Effort not converting"] },
        ],
        quote: "“Most aspirants move from Knowing → Writing but struggle to reach Scoring.”",
      },
      solution: {
        heading: "THE SOLUTION",
        title: "The Mains Execution System",
        steps: [
          { label: "CLARITY", from: "Focused, comprehensive GS modules coverage", to: "Relevant, exam-oriented & quality content" },
          { label: "STRUCTURE", from: "PYQ answer writing approaches", to: "Learn how to structure answers quickly" },
          { label: "PRACTICE", from: "Live Answer Writing Sessions", to: "Real-time writing exposure" },
          { label: "REFINEMENT", from: "Mentorship sessions", to: "Continuous feedback & improvement" },
        ],
        note: "In the next few months, clarity and practice will make the difference.",
      },
      syllabus: SYLLABUS,
      features: {
        title: "FEATURES OF THE PROGRAM",
        items: [
          { title: "Complete GS Coverage (Recorded Lectures)", text: "Comprehensive coverage of all GS papers through structured recorded lectures." },
          { title: "Live PYQ Answer Writing (2013–2026)", text: "Live sessions covering PYQs from 2013 to 2026 to help you structure answers and reduce thinking time." },
          { title: "Live Answer Writing Sessions", text: "30+ live sessions covering all GS papers and Essay with structured practice." },
          { title: "Ethics Preparation", text: "12 recorded classes focusing on conceptual clarity and answer approaches for Ethics." },
          { title: "Essay Preparation", text: "6 live sessions to develop structure, clarity, and depth in essays." },
          { title: "Practice Tests", text: "10 Practice Tests & 10 Full Length Tests to simulate exam conditions and assess performance." },
          { title: "Group Mentorship", text: "Regular guidance to track progress and stay aligned with preparation. Focused inputs to refine answer quality and improve performance." },
          { title: "Current Affairs", text: "Focused coverage of relevant issues to help you enrich your answers with examples and analysis, aligned with Mains requirements." },
          { title: "Value Addition Material & Notes", text: "Concise notes, frameworks, and examples to enrich your answers." },
        ],
      },
      comparison: {
        plansTitle: { before: "Choose What Is", highlight: "Best", after: "For You", subtitle: "Compare the two Mains Mentorship plans." },
        plans: [
          { id: "foundation", name: "FOUNDATION", price: 11299, color: "#13294B", tint: "#F1F5FB", priceNote: "+ TAXES" },
          { id: "foundation-plus", name: "FOUNDATION PLUS", price: 14999, color: "#FE0034", tint: "#FFF5F7", priceNote: "+ TAXES" },
        ],
        features: [
          { label: "Complete GS Coverage", icon: "Video", plans: ALL },
          { label: "PYQ Answer Writing", icon: "PenLine", plans: ALL },
          { label: "Live Answer Writing Sessions", icon: "MessagesSquare", plans: ALL },
          { label: "Practice Tests", icon: "ClipboardCheck", plans: ALL },
          { label: "Current Affairs", icon: "Newspaper", plans: ALL },
          { label: "Group Mentorship", icon: "Users", plans: ALL },
          { label: "Value Addition Material & Notes", icon: "FileText", plans: ALL },
          { label: "Answer Writing Evaluations", icon: "FileCheck2", plans: ["foundation-plus"] },
          { label: "Mains Test Series with Evaluations", icon: "ListChecks", plans: ["foundation-plus"] },
        ],
      },
      planPicker: {
        title: "CHOOSE COURSE",
        defaultId: "foundation",
        plans: [
          {
            id: "foundation",
            name: "FOUNDATION",
            course: "Mains Mentorship Program - FOUNDATION",
            description: "The Foundation plan includes the complete Mains Mentorship Program with recorded GS coverage, PYQ answer writing sessions, live answer writing sessions, Ethics, Essay, practice tests, group mentorship, current affairs, and value addition material.",
            fee: "₹11,299 + Taxes",
          },
          {
            id: "foundation-plus",
            name: "FOUNDATION PLUS",
            course: "Mains Mentorship Program - FOUNDATION PLUS",
            description: "The Foundation Plus plan includes everything in Foundation, plus evaluation of your answers with detailed feedback and the complete Mains Test Series with evaluations for full exam-level practice and performance tracking.",
            fee: "₹14,999 + Taxes",
          },
        ],
      },
      discount: {
        title: "VETERAN DISCOUNT",
        offers: [
          { label: "Interview Appeared", value: "25%" },
          { label: "Rank Holder", value: "50%" },
        ],
        note: "For Veteran Discount kindly send your credentials via mail",
      },
    },
    faqs: [
      { q: "Is this course specifically designed for UPSC Mains?", a: "Yes. The course is completely focused on UPSC Mains preparation with answer writing practice, PYQ discussions, Ethics, Essay, Current Affairs, mentorship, and test series." },
      { q: "Are the GS lectures live or recorded?", a: "The complete GS coverage is provided through structured recorded lectures for flexible and systematic preparation." },
      { q: "What is included in the PYQ answer writing sessions?", a: "Live PYQ discussions from 2013–2026, focusing on answer structuring, approach building, and reducing thinking time in the exam." },
      { q: "How many answer writing sessions are included?", a: "The course includes 30+ Live Answer Writing Sessions covering all GS papers and Essay." },
      { q: "Is Ethics covered separately in the course?", a: "Yes. The course includes 12 dedicated recorded classes for Ethics with focus on conceptual clarity, case studies, and answer approaches." },
      { q: "Does the course include Essay preparation?", a: "Yes. There are 6 live Essay sessions designed to improve structure, flow, clarity, and depth in essay writing." },
      { q: "Will mentorship be provided during the course?", a: "Yes. Regular group mentorship sessions help students track progress, improve answer quality, and stay consistent with preparation." },
      { q: "Is Current Affairs integrated with Mains preparation?", a: "Yes. Current Affairs coverage is aligned specifically with Mains requirements and focuses on analytical understanding, examples, and value addition." },
    ],
  },

  /* ---------------- GS Mains Foundation ---------------- */
  {
    ...EMPTY,
    slug: "gs-mains-foundation",
    label: "GS Mains Foundation",
    title: "Live GS Mains Foundation Module for UPSC CSE 2027",
    summary:
      "This course offers complete GS Mains syllabus coverage for UPSC CSE Mains 2027 with a strong focus on answer writing, current affairs integration, and exam-oriented preparation under the guidance of our experienced faculty.",
    priceLabel: "₹9,999",
    isFree: false,
    startInfo: "Starting from 4th January 2027",
    mentorship: {
      lead: "Preparing for GS Mains 2027?",
      priceNote: "+taxes",
      media: { ...BANNER, caption: "GS Mains Foundation" },
      syllabus: SYLLABUS,
      features: {
        title: "Features",
        items: [
          { title: "Comprehensive GS Mains Coverage", text: "Complete syllabus covered with clarity across GS 1, GS 2, GS 3 and GS 4 through structured live lectures." },
          { title: "Concept to Application Approach", text: "Move beyond theory and learn how to apply concepts effectively in answers." },
          { title: "Static + Current Affairs Integration", text: "Learn to interlink static concepts with relevant and up-to-date current affairs examples." },
          { title: "Value Addition for Answers", text: "Enrich answers with data, diagrams, keywords, and analytical frameworks." },
          { title: "One Pager / Structured Notes", text: "Concise and revision-friendly notes designed for quick retention and effective recall." },
          { title: "GS Mains Strategy Building", text: "Understand what to study, how to write, and how to maximize scores in every GS paper." },
        ],
      },
    },
    faqs: [
      { q: "Are the GS Mains Foundation sessions live or recorded?", a: "The course includes structured live lectures along with sessions focused on answer writing, strategy building, and doubt resolution." },
      { q: "Does this course cover the entire GS Mains syllabus?", a: "Yes, the module provides complete GS Mains syllabus coverage for UPSC CSE Mains 2027 across all major topics with an exam-oriented approach." },
      { q: "Will I receive notes along with the lectures?", a: "Yes, students receive structured notes, one-pagers, and value-added content for quick revision and answer enrichment." },
      { q: "Is this course beginner-friendly?", a: "Absolutely. The course starts from conceptual clarity and gradually moves towards advanced answer application and strategy building." },
      { q: "How does this course help in answer writing?", a: "The module focuses on concept-to-application learning, integration of current affairs, and value addition using data, diagrams, keywords, and frameworks to improve answer quality." },
      { q: "Will current affairs be integrated with GS topics?", a: "Yes, static concepts are regularly connected with relevant and up-to-date current affairs examples for better understanding and answer writing." },
    ],
  },

  /* ---------------- GS Answer Writing ---------------- */
  {
    ...EMPTY,
    slug: "gs-answer-writing",
    label: "GS Answer Writing",
    title: "Live Answer Writing through PYQs for Mains 2027",
    summary:
      "Learn template-based answer writing through live PYQ sessions. Covering GS 1, GS 2, GS 3, Ethics, and Essay, these sessions help students develop a structured and practical approach to answer writing by analysing Previous Year Questions in depth. Multiple frameworks and writing techniques are discussed to help aspirants improve answer quality, clarity, and presentation in the actual examination.",
    priceLabel: "₹2,839",
    isFree: false,
    startInfo: "Starting from 1st December 2026",
    mentorship: {
      batchLabel: "2027",
      priceNote: "+taxes",
      media: { ...BANNER, caption: "Answer Writing through PYQs" },
      syllabus: SYLLABUS,
      features: {
        title: "Features",
        items: [
          { title: "Live Interactive Lectures", text: "30+ live sessions ensuring real-time understanding, discussion, and clarity of answer writing approaches." },
          { title: "PYQ-Based Answer Writing Templates", text: "The course is centred around Previous Year Questions (2013–2026) to help you understand the exact demand and pattern of UPSC Mains." },
          { title: "Structured Answer Writing Framework", text: "Learn standardised formats for introduction, body, and conclusion to improve clarity and presentation in answers." },
          { title: "Template-Based Learning", text: "Pre-designed answer templates to help reduce thinking time and enable faster, more effective writing in the exam." },
          { title: "Diagram & Flowchart Integration", text: "Includes ready-to-use diagram and flowchart formats to enhance answer presentation and scoring potential." },
          { title: "Ethics Answer Writing Techniques", text: "Focused approach for GS 4 with keyword usage, value enrichment, and structured case study handling." },
          { title: "Improved Speed & Time Management", text: "Designed to help you complete answers within the time limit through consistent practice and structured techniques." },
          { title: "Bilingual Content Support", text: "Classes conducted in Hindi & English with notes provided in both English and Hindi for better accessibility." },
        ],
      },
    },
    faqs: [
      { q: "Which papers are covered in the course?", a: "The course covers GS 1, GS 2, GS 3, Ethics (GS 4), and Essay." },
      { q: "Are the classes live or recorded?", a: "The course primarily includes live interactive sessions focused on answer writing practice and discussion." },
      { q: "What is the role of PYQs in this course?", a: "The entire course is built around Previous Year Questions (2013–2026) to help students understand UPSC’s demand and pattern." },
      { q: "Will answer writing templates be provided?", a: "Yes, students get structured and pre-designed answer writing templates for different types of questions." },
      { q: "Does the course help in improving answer presentation?", a: "Yes, dedicated emphasis is given to introductions, conclusions, diagrams, flowcharts, keywords, and structured presentation techniques." },
      { q: "In which language will the classes be conducted?", a: "Classes are conducted in Hindi & English, and notes are provided in both English and Hindi." },
      { q: "Who should join this course?", a: "This course is suitable for UPSC aspirants preparing for Mains 2027 or anyone looking to improve answer writing quality, structure, and efficiency." },
    ],
  },

  /* ---------------- Free Mains Mentorship ---------------- */
  {
    ...EMPTY,
    slug: "free-mains-mentorship",
    label: "Free Mains Mentorship",
    title: "Free Advanced Kit for UPSC CSE Mains 2027",
    summary:
      "Advanced Kit is a FREE 10-day UPSC Mains series designed to help you master the art of answer writing. Learn proven frameworks, template-based writing, effective PYQ utilization, time management, and demand-based answering directly from successful UPSC candidates who have cleared the exam themselves. By the end of the series, you’ll have the clarity, structure, and confidence needed to become truly Mains Ready.",
    priceLabel: "FREE Course",
    isFree: true,
    startInfo: "Starting from 15th December 2026",
    mentorship: {
      batchLabel: "2027",
      media: { ...BANNER, caption: "Free Advanced Kit for Mains" },
      syllabus: SYLLABUS,
      features: {
        title: "Features",
        items: [
          { title: "Mains Strategy & Planning", points: ["How to Approach UPSC Mains", "Strategy to Clear Mains in the First Attempt", "The Best Way to Utilize the Months Before Mains", "The Exact Strategy Followed by UPSC Toppers"] },
          { title: "Answer Writing Mastery", points: ["Generate Answers for Bouncer Questions", "What Constitutes a Value-Enriched UPSC Answer", "How to Add X-Factors in Mains Answers", "Practical Techniques to Improve Answer Quality"] },
          { title: "Micro Notes & Revision Framework", points: ["How to Make Effective Micro Notes", "Revision Strategy for Mains", "How to Master Mains Notes by Year-End", "Smart Note-Making Techniques from Toppers"] },
          { title: "Current Affairs for Mains", points: ["Current Affairs Consolidation Strategy", "Linking Current Affairs with Static Subjects", "Effective Revision of Current Affairs"] },
          { title: "Test Analysis & Performance Improvement", points: ["How to Analyze Your Mains Test Paper", "Identify and Correct Mistakes", "Build a Continuous Improvement Framework"] },
          { title: "Program Details", points: ["9 Live Sessions by UPSC Rankers", "Live Interaction & Learning", "Recording Access Available", "Absolutely Free for UPSC Aspirants"] },
        ],
      },
    },
    faqs: [
      { q: "Who should join this program?", a: "This program is designed for UPSC CSE 2027 aspirants who want to start their Mains preparation early and learn answer writing, note-making, and Mains strategy directly from top rankers." },
      { q: "Is this program suitable for beginners?", a: "Yes. Even if you have not started Mains preparation yet, the sessions are structured to help you understand the fundamentals of Mains strategy, answer writing, current affairs consolidation, and micro-note making." },
      { q: "Will the sessions be live or recorded?", a: "The sessions are conducted live. Recordings are also provided so that students can revisit the concepts and revise at their convenience." },
      { q: "What topics will be covered in the program?", a: "The program covers Mains strategy, answer writing techniques, value addition, current affairs consolidation, micro-note making, test analysis, and practical insights from UPSC rankers on clearing Mains in the first attempt." },
      { q: "Can I join if I am preparing for UPSC 2026 or a State PCS examination?", a: "Yes. The strategies and techniques taught in this program are useful for UPSC as well as State PCS aspirants who want to improve answer writing, note-making, and overall Mains preparation." },
      { q: "Do I need to complete the syllabus before joining?", a: "No. The program is designed to run alongside your ongoing preparation and helps you build the right Mains-oriented approach from the beginning of your journey." },
    ],
  },
];
