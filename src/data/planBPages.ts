/**
 * UPSC Plan B pages — route: /courses/upsc-plan-b/[planB]
 *   /courses/upsc-plan-b/rbi-grade-b-course
 *   /courses/upsc-plan-b/nabard-grade-a
 *   /courses/upsc-plan-b/epfo-apfc
 *   /courses/upsc-plan-b/epfo-eo-ao
 *
 * FALLBACK content — used when GET /courses/upsc-plan-b/:slug is not configured or fails.
 * Prices / dates are placeholders. No educators are shown.
 */
import { CallbackContent, FreeResourcePage, SyllabusOverlap } from "@/types";

const BANNER = { image: "/images/banners/banner-aarambh.jpg", alt: "Vini IAS UPSC Plan B courses" };
const EMPTY = { guide: { heading: "", text: "" }, whatIs: [], learn: [], whyJoin: [], bestFor: [], syllabusUrl: "/#resources" };

const callback = (exam: string, ctaLabel = "Get Free Mentorship"): CallbackContent => ({
  eyebrow: "PERSONALIZED GUIDANCE, BETTER RESULTS",
  title: `Crack ${exam} Exam`,
  highlight: exam,
  subtitle: `Get a callback by our ${exam} expert!`,
  points: ["Personalized Mentorship", "Strategy That Works", "Proven Results"],
  ctaLabel,
});

/* ---------------- EPFO (APFC and EO/AO share one template) ---------------- */
const overlap = (exam: string): SyllabusOverlap => ({
  title: `UPSC Civil Services & EPFO ${exam} Syllabus Overlap Explorer`,
  columns: { subject: "Subject", upsc: "UPSC Civil Services Preparation", exam: `UPSC EPFO ${exam} Requirement`, overlap: "Overlap" },
  levels: { strong: "Strong Overlap", good: "Good Overlap", specific: `${exam}-Specific` },
  rows: [
    { subject: "Indian Polity and Constitution", upsc: "Covered in Prelims and GS Paper II", exam: "Governance and Constitution of India", level: "strong" },
    { subject: "Governance and Public Administration", upsc: "Covered in GS Paper II", exam: "Governance, public institutions and administration", level: "strong" },
    { subject: "Indian Economy", upsc: "Covered in Prelims and GS Paper III", exam: "Developmental issues and present trends in Indian Economy", level: "strong" },
    { subject: "Poverty, Inclusion and Social Sector", upsc: "Covered in Prelims, GS II and GS III", exam: "Development, welfare, employment and social security", level: "strong" },
    { subject: "Indian History and Freedom Movement", upsc: "Covered in Prelims and GS Paper I", exam: "Indian Culture, Heritage and Freedom Movements", level: "strong" },
    { subject: "Indian Culture and Heritage", upsc: "Covered in Prelims and GS Paper I", exam: `Dedicated ${exam} syllabus area`, level: "strong" },
    { subject: "Current Affairs", upsc: "Central to Prelims, Mains and Interview", exam: "National and international current events", level: "strong" },
    { subject: "General Science", upsc: "Covered in Prelims; Science and Technology in GS III", exam: "Basic General Science", level: "good" },
    { subject: "Comprehension and Mental Ability", upsc: "Covered in CSAT", exam: "General English and General Mental Ability", level: "good" },
    { subject: "Basic Mathematics and Data Interpretation", upsc: "Covered in CSAT", exam: "Elementary Mathematics, Statistics and Mental Ability", level: "good" },
    { subject: "English Language", upsc: "CSAT comprehension and qualifying English paper", exam: "Grammar, vocabulary, comprehension and workman-like usage", level: "good" },
    { subject: "Government Schemes and Welfare", upsc: "Covered in Prelims, GS II and Current Affairs", exam: "Social security, labour welfare and current events", level: "good" },
    { subject: "Computer Applications", upsc: "Limited coverage through Science and Technology", exam: "Dedicated basic computer-awareness component", level: "specific" },
    { subject: "Industrial Relations", upsc: "Limited indirect coverage", exam: `Core ${exam} subject`, level: "specific" },
    { subject: "Labour Laws", upsc: "Limited coverage through social-justice issues", exam: `Core ${exam} subject`, level: "specific" },
    { subject: "Social Security and EPFO", upsc: "General welfare concepts may be covered", exam: "Detailed EPF, pension, insurance and social-security framework", level: "specific" },
    { subject: "Accountancy and Auditing", upsc: "Not part of common GS syllabus", exam: `Dedicated ${exam} component`, level: "specific" },
    { subject: "Insurance", upsc: "Limited economy-related awareness", exam: "Principles and terminology of insurance", level: "specific" },
    { subject: "Interview Preparation", upsc: "Personality, judgement and current affairs preparation", exam: "Profile, EPFO role, labour issues and administrative suitability", level: "specific" },
  ],
});

function epfoPage(slug: string, label: string, exam: string, post: string): FreeResourcePage {
  return {
    ...EMPTY,
    slug,
    label,
    title: `UPSC EPFO ${exam} 2027 Crash Course`,
    summary: "A structured course covering the complete syllabus, current affairs, practice questions, mock tests and interview-oriented guidance.",
    priceLabel: "₹5,500",
    isFree: false,
    startInfo: "Classes have started",
    mentorship: {
      batchLabel: "2027",
      priceNote: "+taxes",
      heroPoints: [
        "Detailed video lectures by expert faculty",
        "Complete subject-wise notes and study material",
        "Current Affairs and Static GK coverage",
        "Mentorship and preparation guidance",
        "Interview-oriented support",
      ],
      media: { ...BANNER, caption: `EPFO ${exam} Course` },
      facts: {
        title: "Course Details",
        items: [
          { label: "Language", value: "Bilingual", note: "Hindi + English" },
          { label: "Validity", value: "Till the", note: `${exam} Interview` },
          { label: "Course Fee", value: "₹5,500", note: "+ taxes" },
          { label: "PDF Access", value: "60%", note: "downloadable PDFs" },
          { label: "Online Material", value: "40%", note: "online reading only" },
        ],
      },
      resources: {
        title: "Essential Preparation Resources",
        items: [
          { title: `${exam} Syllabus`, text: `Detailed breakdown of all subjects, including ${exam}-specific topics like Labour Laws, Accounting, and Auditing.`, ctaLabel: "Download Syllabus PDF", href: "/#resources" },
          { title: "Previous Year Questions", text: `Analyze past trends and understand the depth of questions asked by UPSC in previous ${post} examinations.`, ctaLabel: "Download PYQs", href: "/#resources" },
        ],
      },
      overlap: overlap(exam),
      callback: callback(`EPFO ${exam}`, "Get Free Counselling"),
      featureStyle: "numbered",
      features: {
        title: "Why This Course Stands Apart",
        eyebrow: "COURSE FEATURES",
        items: [
          { title: `Complete Coverage of the ${exam} Syllabus`, points: ["Coverage of every subject", "Recruitment Test & interview preparation", "Structured video lectures", "Balanced static/current coverage"] },
          { title: `Dedicated UPSC CSE-to-${exam} Bridge Strategy`, points: ["Common UPSC topics clearly identified", `Separate focus on ${exam}-specific portions`, "Labour Laws and Social Security covered in depth", "Accountancy, Auditing and Insurance explained from the basics"] },
          { title: "Comprehensive Study Material", points: ["Current Affairs and Static GK resources", "Budget, Economic Survey and government-scheme coverage", "Labour Ministry and EPFO-related updates", "60% content available as downloadable PDFs", "Remaining 40% accessible for online reading"] },
          { title: "Testing and Practice Framework", points: ["Topic-wise practice questions", "Exam-oriented MCQ practice", "Full-length mock tests", "Focus on speed, accuracy and time management"] },
          { title: "Mentorship and Interview-Oriented Guidance", points: ["Preparation planning and subject prioritisation", `Guidance for balancing common and ${exam}-specific subjects`, "Revision and mock-test strategy", "Support till the interview stage"] },
        ],
      },
    },
    faqs: [
      { q: `What is the UPSC EPFO ${exam} examination?`, a: `It is a UPSC recruitment examination for the post of ${post} in the Employees’ Provident Fund Organisation under the Ministry of Labour and Employment.` },
      { q: `Is ${exam} a good Plan B for UPSC CSE aspirants?`, a: `Yes. Several ${exam} subjects overlap with UPSC CSE, including Polity, Governance, Economy, History, Culture, General Science, Current Affairs and CSAT-related aptitude.` },
      { q: `Is UPSC CSE preparation sufficient for ${exam}?`, a: `No. UPSC preparation provides a strong foundation, but students must separately prepare Labour Laws, Industrial Relations, Social Security, Accountancy, Auditing, Insurance, Computer Applications and ${exam}-oriented objective English.` },
      { q: `Does ${exam} have separate Prelims and Mains examinations?`, a: "Under the latest available pattern, there is one objective Recruitment Test followed by document scrutiny and interview. The final 2027 pattern will be confirmed after the official notification." },
      { q: "Is this course suitable for beginners?", a: "Yes. The course starts from basic concepts and gradually moves towards exam-oriented preparation, practice questions and mock tests." },
      { q: `Does the course cover the complete ${exam} syllabus?`, a: "Yes. It covers all the syllabus areas listed for General English, History and Culture, Economy, Constitution and Governance, Science, Computer Applications, Mathematics and Reasoning, Labour Laws and Social Security, Accountancy, Auditing, Insurance and Current Affairs." },
    ],
  };
}

export const PLAN_B_PAGES: FreeResourcePage[] = [
  /* ---------------- RBI Grade B ---------------- */
  {
    ...EMPTY,
    slug: "rbi-grade-b-course",
    label: "RBI Grade B Course",
    title: "RBI Grade B Course - Phase I + II + Interview",
    summary:
      "The RBI Grade B 2027 Complete Course offers structured preparation for Phase I, Phase II, and Interview, combining live classes, updated study material, current affairs, and focused testing to build exam readiness and confidence.",
    priceLabel: "₹5,500",
    isFree: false,
    startInfo: "Starting from 1st December 2026",
    mentorship: {
      batchLabel: "2027",
      priceNote: "+taxes",
      media: { ...BANNER, caption: "RBI Grade B 2027" },
      syllabusBanner: {
        art: "book",
        artTitle: ["RBI", "GRADE B"],
        artCaption: "COMPLETE SYLLABUS",
        badge: "ALL-IN-ONE GUIDE",
        title: "DOWNLOAD",
        highlight: "COMPLETE SYLLABUS",
        ctaLabel: "DOWNLOAD\nSYLLABUS",
        href: "/#resources",
      },
      examCompare: {
        title: "Why RBI Grade B? Plan B for UPSC CSE",
        highlight: "Plan B for UPSC CSE",
        columns: { topic: "Subject / Topic", exam: "RBI Grade B", other: "Civil Services Exam" },
        rows: [
          { topic: "Quantitative Aptitude", icon: "Calculator", exam: true, other: true },
          { topic: "Reasoning", icon: "Puzzle", exam: true, other: true },
          { topic: "English", icon: "BookOpen", exam: true, other: true },
          { topic: "General Awareness", icon: "Globe2", exam: "More Focused on Economy and Finance", other: "Balanced" },
          { topic: "Economic and Social Issues", icon: "TrendingUp", exam: true, other: true },
          { topic: "Finance", icon: "IndianRupee", exam: true, other: true },
          { topic: "Management", icon: "Briefcase", exam: true, other: false },
          { topic: "Ethics", icon: "Scale", exam: true, other: true },
        ],
      },
      pyqBanner: {
        art: "pdf",
        artTitle: ["RBI", "GRADE B"],
        artCaption: "PYQs",
        badge: "PAST YEAR QUESTIONS",
        title: "DOWNLOAD",
        highlight: "RBI GRADE B PYQs PDF",
        ctaLabel: "DOWNLOAD\nPYQs PDF",
        href: "/#resources",
      },
      callback: callback("RBI Grade B"),
      featureStyle: "numbered",
      features: {
        title: "Why This Course Stands Apart",
        eyebrow: "COURSE FEATURES",
        subtitle: "Everything you need to crack RBI Grade B under one ecosystem.",
        items: [
          {
            title: "Complete Coverage of RBI Grade B Syllabus",
            points: [
              "This will be covered through LIVE Lectures",
              "Lectures will also be available in Recorded Format & can be watched any number of times",
              "Also includes Quantitative Aptitude + Reasoning + English (Phase 1 LIVE Lectures)",
            ],
          },
          {
            title: "Comprehensive Study Material",
            points: [
              "Phase 1 + ESI & FM Detailed Notes (50% downloadable)",
              "Mind Maps of Detailed Notes (100% downloadable)",
              "Current Affairs Coverage - CA + PIB + RBI Circulars (100% downloadable)",
              "Descriptive Answer Writing Fodder for ESI, FM & English",
              "Government Schemes relevant to the RBI Grade B exam (50% downloadable)",
            ],
          },
          {
            title: "Testing & Practice Framework",
            points: [
              "Topic wise Quizzes (ESI + FM + Quant + Reasoning + English + Current Affairs)",
              "10 Phase-1 Mocks*",
              "10 Objective Mocks of ESI* + 10 Objective Mocks of FM*",
              "2 Descriptive Mocks each of ESI*, FM* & English with evaluation from experts*",
              "*Mocks will be introduced closer to the exam to incorporate the latest current affairs.",
            ],
          },
          {
            title: "Interview Preparation",
            points: ["1 Mock Interview conducted by a Retired Member of a Regulatory Institution", "Guidance on interview approach, current issues, and personality development"],
          },
          {
            title: "Clear Segregation of UPSC & RBI Grade B Topics",
            text: "Clear guidance on what to study exclusively for RBI Grade B and what can be covered through existing UPSC sources, ensuring focused preparation and avoiding unnecessary overlap. However, the course will cover everything and nothing will be left out.",
          },
        ],
      },
    },
    faqs: [
      { q: "Which stages of the RBI Grade B exam does this course cover?", a: "This course covers Phase I, Phase II, and the Interview stage of the RBI Grade B 2027 examination." },
      { q: "Are the classes live or recorded?", a: "Classes are conducted live, and all sessions are later uploaded as recorded lectures for revision and flexible access." },
      { q: "What subjects are included in the course?", a: "The course includes ESI, FM, Quantitative Aptitude, Reasoning, English, and Current Affairs, along with descriptive preparation and interview guidance." },
      { q: "Is study material provided with the course?", a: "Yes. The course provides comprehensive study material, including detailed notes, mind maps, current affairs, descriptive answer-writing fodder, and government schemes relevant to the RBI Grade B exam." },
      { q: "How much of the study material is downloadable?", a: "Mind Maps & Current Affairs: 100% downloadable. ESI & FM Notes and Government Schemes: 50% downloadable." },
      { q: "Does the course include mock tests?", a: "Yes. The course includes Phase I full-length mocks, objective mocks for ESI & FM, descriptive mocks for ESI, FM, and English, along with expert evaluation. (Mocks will be introduced closer to the exam to incorporate the latest current affairs.)" },
      { q: "Is interview preparation included?", a: "Yes. The course includes one mock interview conducted by a retired member of a regulatory institution, along with interview guidance." },
      { q: "Is this course suitable for beginners?", a: "Yes. The course is designed for both beginners and repeat aspirants, starting from conceptual basics and progressing to exam-level preparation." },
      { q: "What is the validity of the course?", a: "The validity of this course is until December 2027." },
      { q: "Can working professionals enroll in this course?", a: "Yes. With recorded lectures, flexible access, and structured study material, the course is well-suited for working professionals." },
    ],
  },

  /* ---------------- NABARD Grade A ---------------- */
  {
    ...EMPTY,
    slug: "nabard-grade-a",
    label: "NABARD Grade A",
    title: "NABARD Grade A 2027 Course Phase I + Phase II + Interview",
    summary:
      "Prepare for NABARD Grade A 2027 with a complete course covering Phase I, Phase II and Interview. Get access to live classes, recorded lectures, updated notes, current affairs, mocks, descriptive evaluation and interview guidance in one structured programme.",
    priceLabel: "₹5,500",
    isFree: false,
    startInfo: "Classes have started",
    mentorship: {
      notice: "NABARD Grade A 2027 notification is expected around August/September 2027 and Prelims thereafter.",
      batchLabel: "2027",
      priceNote: "+taxes",
      media: { ...BANNER, caption: "NABARD Grade A 2027" },
      callback: callback("NABARD Grade A"),
      featureStyle: "numbered",
      features: {
        title: "Why This Course Stands Apart",
        eyebrow: "COURSE FEATURES",
        subtitle: "Everything you need to crack NABARD Grade A under one ecosystem.",
        items: [
          { title: "Complete Coverage of NABARD Grade A Syllabus", tagline: "Covers everything you need for Phase I, Phase II & Interview", points: ["ESI, ARD, General Awareness & English", "Objective + Descriptive Preparation", "Structured topic-wise classes", "Phase-wise preparation roadmap", "Essay and precise writing guidance videos"] },
          { title: "Comprehensive Study Material", tagline: "Everything organized in one place", points: ["Complete PDF Notes", "Live and recorded lectures", "Budget & Economic Survey", "PIB, Reports & Government Schemes", "Current Affairs & Printable Resources"] },
          { title: "Testing & Practice Framework", tagline: "Practice exactly like the real exam", points: ["Phase I Mocks — 10 ESI + ARD + GA objective mocks for Phase I", "Phase II Mocks — 10 ESI + ARD objective mocks for Phase II", "Descriptive Evaluation — 4 ESI + ARD descriptive mocks with evaluation from experts", "English Evaluation — 2 English descriptive mocks with evaluation from experts"] },
          { title: "Interview Preparation", tagline: "End-to-end guidance till final selection", points: ["Interview Guidance Sessions", "Mock Interviews", "Personality Development", "One-to-One Expert Feedback"] },
          { title: "Clear Segregation of GA, ESI, ARD & Finance Topics", tagline: "Study smart without wasting time", points: ["Common UPSC Topics Clearly Identified", "Separate NABARD-Specific Coverage", "Focus on High-Overlap Subjects", "Faster Preparation with Better Strategy"] },
        ],
      },
    },
    faqs: [
      { q: "Is this course useful for UPSC aspirants?", a: "Yes. NABARD Grade A is a strong Plan B for UPSC aspirants because aptitude, English, ESI, agriculture, rural development, current affairs and descriptive writing have strong overlap with UPSC preparation." },
      { q: "Have the NABARD Grade A 2027 course classes started?", a: "Yes. Classes have started. Students joining now will get access to both recorded and live classes." },
      { q: "Are the classes live or recorded?", a: "The course includes both live and recorded lectures." },
      { q: "What is the language of the classes?", a: "The classes will be bilingual. Class notes will be provided in English." },
      { q: "What is the course completion target?", a: "The course completion target is 31.07.2027." },
      { q: "Till when will the course remain valid?", a: "The course will remain valid till the NABARD Grade A 2027 Main Exams." },
      { q: "When is the NABARD Grade A 2027 notification expected?", a: "The notification is expected around August/September 2027." },
      { q: "Does the course cover current affairs?", a: "Yes. It covers PIB current affairs, newspaper current affairs, government schemes, reports, Budget, Economic Survey, RBI circulars and NABARD circulars." },
      { q: "Are the PDFs downloadable and printable?", a: "Complete current affairs, reports, Budget and Economic Survey are downloadable and printable. 60% of static ESI and ARD PDFs are printable." },
      { q: "Does the course include Phase I mocks?", a: "Yes. It includes 10 ESI + ARD + GA objective mocks for Phase I." },
      { q: "Does the course include Phase II mocks?", a: "Yes. It includes 10 ESI + ARD objective mocks for Phase II, 4 ESI + ARD descriptive mocks with expert evaluation and 2 English descriptive mocks with expert evaluation." },
      { q: "Is interview guidance included?", a: "Yes. Interview guidance and mock interview support are included." },
    ],
  },

  /* ---------------- EPFO ---------------- */
  epfoPage("epfo-apfc", "EPFO APFC", "APFC", "Assistant Provident Fund Commissioner"),
  epfoPage("epfo-eo-ao", "EPFO EO/AO", "EO/AO", "Enforcement Officer / Accounts Officer"),
];
