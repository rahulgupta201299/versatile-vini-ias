export interface NavLink {
  label: string;
  href: string;
  /** Opens in a new tab (defaults to true for http/https links). */
  external?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  isMegaMenu?: boolean;
  /** Dropdown items (desktop dropdown + mobile menu accordion). */
  children?: NavLink[];
}

/** One tile in the mobile menu's 2-column sections. */
export interface MenuTile {
  label: string;
  href: string;
  icon: string; // IconRenderer name
  /** NAV_ITEMS id whose children open inline under this tile. */
  dropdownId?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuTile[];
}

export interface MegaMenuCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName?: string;
  courses: {
    id: string;
    title: string;
    description?: string;
    badge?: string;
    href: string;
    icon: string;
    iconColor?: string;
    iconBg?: string;
  }[];
}

export interface HeroBanner {
  id: string;
  title: string;
  imageUrl: string;
  mobileImageUrl?: string;
  href: string;
  alt?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  iconColor: string;
  borderColor: string;
  badge?: string;
  href: string;
}

export interface SubCategory {
  name: string;
  logo: string | null;
  href?: string;
}

export interface ExamGoalCategory {
  category: string;
  subcategories: SubCategory[];
}

export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface FooterResourceColumn {
  title: string;
  links: {
    name: string;
    href: string;
    badge?: string;
  }[];
}

/**
 * A results banner as delivered by the server (separate art for web & mobile).
 * Leave out webImageUrl for a mobile-only banner, or mobileImageUrl for a web-only one.
 */
export interface ResultBanner {
  id: string;
  title: string;
  /** Desktop/tablet art (> 768px). Reference size 3821 × 1324 (≈ 2.886 : 1), shown at 1120 × 388. */
  webImageUrl?: string;
  /** Mobile art (≤ 768px). Reference size 1203 × 1650 (≈ 0.729 : 1). */
  mobileImageUrl?: string;
  href?: string;
  alt?: string;
}

/** One tab of the "Our Top Rankers" results section. */
export interface ResultBannerTab {
  id: string;
  label: string;
  banners: ResultBanner[];
}

/** "Impact. At scale" stat, e.g. { value: "10+", unit: "lakh", label: "hours of LIVE learning" } */
export interface ImpactStat {
  value: string;
  unit?: string;
  label: string;
}

/** Floating element on the impact map; x / y are % positions of the element's centre. */
interface ImpactMapItem {
  x: number;
  y: number;
}
export interface ImpactFeatureChip extends ImpactMapItem {
  text: string;
  highlight: string; // bold word inside `text`
  icon: "live" | "doubt" | "writing";
}
export interface ImpactAvatar extends ImpactMapItem {
  src: string;
  size: number; // px at desktop size (scaled down on small screens)
  alt: string;
}

/* ---------------- Course / exam landing pages ---------------- */
export interface CourseVideo {
  title: string;
  educator: string;
  duration: string;
  /** YouTube video id — when set, the card plays the video inline. */
  youtubeId?: string;
  /** Fallback link when there is no youtubeId (opens YouTube). */
  href: string;
}

export interface CourseBatch {
  id: string;
  title: string;
  thumbnail: string;
  language: string;
  mode: string;
  startDate: string;
  price: number;
  mrp: number;
  tag?: string;
  /** "Explore" link (default: counselling form). External links open in a new tab. */
  href?: string;
}

export interface CourseFaq {
  q: string;
  a: string;
}

export interface CoursePageData {
  slug: string;
  name: string;
  /** Parent group shown in the breadcrumb, e.g. "UPSC", "State PSC". */
  category: string;
  tagline: string;
  banners: HeroBanner[];
  videos: CourseVideo[];
  batches: CourseBatch[];
  highlights: { label: string; value: string }[];
  about: string[];
  faqs: CourseFaq[];
  /** Toppers banners for this exam (All Exams pages). When empty, the `resultTabId` tab is used. */
  topRankers?: ResultBanner[];
  /** Heading of the "All About" section; empty → "All About <name> Exam". */
  aboutTitle?: string;
  /** Results tab shown in the Toppers section when the page has no own toppers (see data/resultBanners.ts). */
  resultTabId: string;
  /** Options for the "Exam" dropdown in the counselling form. */
  examOptions: string[];
}

/* ======================================================================
 * Server data contracts — the shapes the backend API returns.
 * (See src/lib/api.ts for the endpoint list.)
 * ==================================================================== */

interface LinkItem {
  name: string;
  href: string;
}

/** GET /navigation */
export interface NavigationData {
  navItems: NavItem[];
  megaMenu: MegaMenuCategory[];
  mobileMenu: MenuSection[];
  searchTrending: string[];
  storeHref: string;
}

export interface ContactInfo {
  phoneDisplay: string;
  tel: string;
  whatsappUrl: string;
  email: string;
  website: { label: string; href: string };
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  x: string;
  telegram: string;
}

export interface FooterData {
  companyLinks: LinkItem[];
  upcomingCentres: LinkItem[];
  quickLinks: LinkItem[];
  products: LinkItem[];
  brands: LinkItem[];
  learningResources: FooterResourceColumn[];
}

/** GET /site-config */
export interface SiteConfig {
  contact: ContactInfo;
  social: SocialLinks;
  app: { googlePlay: string; appStore: string; points: string[] };
  footer: FooterData;
}

/** Everything the layout (header, menus, search, footer) needs — loaded once per request. */
export interface SiteData {
  navigation: NavigationData;
  examCategories: ExamGoalCategory[];
  config: SiteConfig;
  /** Display name for every known route segment, e.g. { "gate": "GATE", "gs-foundation": "GS Foundation" } (breadcrumbs). */
  routeLabels: Record<string, string>;
}

/** GET /home/impact */
export interface ImpactData {
  stats: ImpactStat[];
  features: ImpactFeatureChip[];
  avatars: ImpactAvatar[];
  logoPosition: { x: number; y: number };
}

/* ---------- GS Foundation resource pages (GET /courses/gs-foundation/:slug) ---------- */
export type FreeResourceIcon =
  | "Compass"
  | "Clock"
  | "Library"
  | "Layers"
  | "RotateCcw"
  | "ShieldAlert"
  | "BookOpen"
  | "PenLine"
  | "ClipboardCheck"
  | "BarChart3"
  | "Video"
  | "Target";

export interface FreeResourceLearnItem {
  title: string;
  icon: FreeResourceIcon;
}

/* ---------- Designed landing layout (e.g. NCERT Foundation Batch) ---------- */
/** lucide-react icon names the landing sections can render (see sections/CourseLanding/icons.ts). */
export type LandingIcon =
  | "BookOpen"
  | "FileImage"
  | "NotebookPen"
  | "ClipboardList"
  | "Landmark"
  | "Globe2"
  | "Building2"
  | "TrendingUp"
  | "Leaf"
  | "Atom"
  | "Shield"
  | "Lightbulb"
  | "GraduationCap"
  | "Clock"
  | "UserRound"
  | "FileCheck2"
  | "PenLine"
  | "RotateCcw"
  | "ListChecks"
  | "Trophy"
  | "Smartphone"
  | "MessageCircleQuestion"
  | "Users"
  | "Video"
  | "FileText"
  | "Newspaper"
  | "Monitor"
  | "ClipboardCheck"
  | "MessagesSquare"
  | "Map"
  | "Eye"
  | "Brain"
  | "Target"
  | "BarChart3"
  | "PlayCircle"
  | "Sparkles"
  | "BookMarked"
  | "Repeat"
  | "Calculator"
  | "Puzzle"
  | "IndianRupee"
  | "Briefcase"
  | "Scale";

export interface LandingIconItem {
  title: string;
  text?: string;
  icon: LandingIcon;
}

export interface CourseLandingContent {
  hero: {
    badge: string; // "UPSC"
    heading: string; // "NCERT"
    subheading: string; // "FOUNDATION COURSE"
    tagline: string;
    description: string;
    /** Handwritten note beside the artwork, one line per entry. */
    note: string[];
    /** Book spines in the artwork, top to bottom. */
    books: string[];
    ctaLabel: string;
  };
  features: LandingIconItem[];
  highlights: {
    badge: string;
    title: string;
    subtitle: string;
    subjects: LandingIconItem[];
    footnotes: string[];
    levels: { title: string; text: string }[];
    /** Handwritten progression next to the levels, e.g. ["Concepts", "Clarity", "Confidence"]. */
    progression: string[];
  };
  infographic: { badge: string; title: string; text: string; tags: string[] };
  studyMaterial: { badge: string; title: string; subtitle: string; items: { title: string; text: string; art: "notes" | "books" | "tests" }[] };
  enquiry: { badge: string; title: string; text: string; ctaLabel: string };
}

/* ---------- Live batch layout (e.g. GS Foundation Batch 2027/29) ---------- */
export interface CoursePlan {
  id: string;
  name: string;
  price: number;
  /** Header / button colour for this plan's column. */
  color: string;
  tint: string;
  /** Shown under the price, default "(TAXES INCLUDED)". */
  priceNote?: string;
}

export interface CourseStage {
  title: string; // "FOUNDATION SUBJECTS"
  timeline: string; // "November 2026 - June 2027"
  /** Item groups shown in columns; a group without a title is a plain list. */
  groups: { title?: string; items: string[] }[];
  goal: string;
}

export interface BatchCourseContent {
  hero: {
    liveLabel: string; // "LIVE BATCH"
    batchLabel: string; // "Batch 1"
    title: string;
    /** Part of the title shown in the accent colour. */
    highlight: string;
    description: string;
    highlights: { title: string; text: string; icon: LandingIcon }[];
    startDate: string;
    image: { src: string; alt: string };
  };
  stats: { value: string; label: string; icon: LandingIcon }[];
  stagesTitle: { text: string; highlight: string };
  journey: { title: string; subtitle: string };
  stages: CourseStage[];
  plansTitle: { before: string; highlight: string; after: string; subtitle: string };
  plans: CoursePlan[];
  /** Comparison rows; `plans` lists the plan ids that include the feature. */
  features: { label: string; icon: LandingIcon; plans: string[] }[];
  expert: { title: string; highlight: string; text: string; ctaLabel: string };
}

/* ---------- Mentorship layout (1:1 Mentorship, Free Mentorship Program) ---------- */
export interface MentorshipContent {
  /** Bold line above the description, e.g. "Preparing for GS 3 for Mains 2027?" */
  lead?: string;
  /** Hero button next to "Course Details" (default: Enroll Now → login). */
  primaryCta?: { label: string; targetId: string };
  /** Extra outlined link in the hero, e.g. "Explore Offline Batch". */
  secondaryLink?: { label: string; href: string };
  /** Hide the price in the hero (e.g. when plans are chosen further down). */
  hideHeroPrice?: boolean;
  /** "UPSC Mains Topic-Wise Syllabus — DOWNLOAD HERE" strip. */
  syllabus?: { title: string; url: string };
  /** Problem → solution story (Knowing → Writing → Scoring, then the execution system). */
  problem?: { steps: { title: string; points: string[] }[]; quote: string };
  solution?: { heading: string; title: string; steps: { label: string; from: string; to: string }[]; note: string };
  /** Feature comparison table (same component as the Foundation batch plans). */
  comparison?: { plansTitle: { before: string; highlight: string; after: string; subtitle: string }; plans: CoursePlan[]; features: { label: string; icon: LandingIcon; plans: string[] }[] };
  /** "Choose course" tabs with a description, Enroll button and fee per plan. */
  /**
   * "Choose course" tabs with a description, Enroll button and fee per plan.
   * When plans carry `price`, an "Enroll Now" band with the same plan tabs is shown further down.
   */
  planPicker?: { title: string; defaultId?: string; plans: { id: string; name: string; course: string; description: string; fee: string; price?: string; priceNote?: string }[] };
  discount?: { title: string; offers: { label: string; value: string }[]; note: string };
  /** e.g. "Batch 1" — small tag beside the hero media. */
  batchLabel?: string;
  /** "(Inclusive of all taxes)" under a paid price. */
  priceNote?: string;
  media: { image: string; alt: string; videoUrl?: string; caption?: string };
  /** "Fill the form to get Special Offer" bar under the media. */
  offer?: { text: string; ctaLabel: string };
  timeline?: { title: string; subtitle: string; phases: { phase: string; period: string; title: string }[] };
  howItWorks?: { title: string; steps: string[] };
  features: { title: string; eyebrow?: string; subtitle?: string; items: { title: string; tagline?: string; text?: string; points?: string[] }[] };
  /** Show the homepage "Top Rankers" section (in place of educators). */
  showToppers?: boolean;
  /** Feature card style: "numbered" → 01, 02 … cards with a tagline and ticks (Plan B courses). */
  featureStyle?: "tabs" | "numbered";
  /** Custom wording for the callback card (default: "Crack UPSC with our Expert Guidance"). */
  callback?: CallbackContent;
  /** Thin notice strip above the hero, e.g. notification dates. */
  notice?: string;
  /** Tick list under the hero description. */
  heroPoints?: string[];
  /** "Course Details" fact tiles (language, validity, fee …). */
  facts?: { title: string; items: { label: string; value: string; note?: string }[] };
  /** "Essential Preparation Resources" download cards. */
  resources?: { title: string; items: { title: string; text: string; ctaLabel: string; href: string }[] };
  /** UPSC CSE vs exam syllabus overlap table. */
  overlap?: SyllabusOverlap;
  /** "Download Complete Syllabus" banner (shown right after the hero). */
  syllabusBanner?: DownloadBannerContent;
  /** "Why <exam>? Plan B for UPSC CSE" ✓ / ✗ comparison. */
  examCompare?: ExamCompareContent;
  /** "Download PYQs PDF" banner (shown after the comparison). */
  pyqBanner?: DownloadBannerContent;
}

export interface DownloadBannerContent {
  /** Book / file artwork: "book" (syllabus) or "pdf" (PYQs). */
  art: "book" | "pdf";
  /** Lines printed on the artwork, e.g. ["RBI", "GRADE B"] and the coloured caption "COMPLETE SYLLABUS". */
  artTitle: string[];
  artCaption: string;
  badge: string;
  title: string;
  highlight: string;
  ctaLabel: string;
  href: string;
}

/** ✓ = true, ✗ = false, or a short note shown as a pill. */
export type CompareCell = boolean | string;
export interface ExamCompareContent {
  title: string;
  highlight: string;
  columns: { topic: string; exam: string; other: string };
  rows: { topic: string; icon: LandingIcon; exam: CompareCell; other: CompareCell }[];
}

export interface CallbackContent {
  eyebrow?: string;
  title: string;
  /** Part of the title shown in the brand red. */
  highlight?: string;
  subtitle: string;
  points?: string[];
  ctaLabel: string;
}

export type OverlapLevel = "strong" | "good" | "specific";
export interface SyllabusOverlap {
  title: string;
  columns: { subject: string; upsc: string; exam: string; overlap: string };
  /** Legend labels per level, e.g. { strong: "Strong Overlap", good: "Good Overlap", specific: "APFC-Specific" } */
  levels: Record<OverlapLevel, string>;
  rows: { subject: string; upsc: string; exam: string; level: OverlapLevel }[];
}

/** Ethics Foundation landing (hero, "why" points, program-details card, callback). */
export interface EthicsLandingContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    forLabel: string;
    exam: string;
    /** Tagline; words wrapped in *asterisks* are highlighted in red. */
    tagline: string;
    meta: { label: string; value: string }[];
    rating: { value: string; label: string };
    stories: { value: string; label: string };
  };
  why: { title: string; intro: string; points: string[] };
  details: {
    title: string;
    startLabel: string;
    startDate: string;
    items: { title: string; note: string }[];
    priceNote: string;
  };
  callback: CallbackContent;
}

export interface MagazineIssue {
  label: string;
  href: string;
  /** Cover image of the issue. */
  image: string;
}

export interface MagazineContent {
  theme: "shortlist" | "prism";
  hero: {
    eyebrow: string;
    kicker?: string;
    title: string;
    highlight?: string;
    tagline?: string;
    points: { title: string; text?: string; icon: LandingIcon }[];
    /** Stacked-books artwork. */
    image: { src: string; alt: string; width: number; height: number };
  };
  why?: {
    eyebrow: string;
    title: string;
    highlight: string;
    quote: string;
    source: { title: string; text: string };
    stat: { eyebrow: string; value: string; label: string; text: string };
  };
  downloads: {
    title: string;
    highlight: string;
    ctaLabel: string;
    groups: { title?: string; issues: MagazineIssue[] }[];
  };
  help: { title: string; highlight: string; text: string; ctaLabel: string };
}

/** Current Affairs "Shortlist" landing. */
export interface ShortlistContent {
  /** Buttons in the bottom bar that appears after the hero (e.g. Monthly Magazine, PRISM Simplified). */
  quickLinks?: { label: string; href: string; icon?: LandingIcon; badge?: string }[];
  hero: { eyebrow: string; badge: string; title: string; highlight: string; text: string; pillars: string[] };
  /** "The Current Affairs Problem" vs "The Shortlist Course" artwork — side by side on desktop, stacked on mobile. */
  problem: { problem: { image: string; alt: string }; solution: { image: string; alt: string } };
  features: { title: string; items: { title: string; text: string; icon: LandingIcon }[] };
  ecosystem: { title: string; highlight: string; steps: { title: string; text: string; icon: LandingIcon }[] };
  plans: {
    title: string;
    highlight: string;
    intro: string;
    notes: string[];
    items: { id: string; option: string; name: string; validity: string; months: number; basePrice: string; originalPrice?: string; launchPrice: string; popular?: boolean }[];
  };
  callback: CallbackContent;
}

export interface FreeResourcePage {
  /** When present the page uses the mentorship layout. */
  mentorship?: MentorshipContent;
  /** When present the page uses the designed landing layout instead of the standard course layout. */
  landing?: CourseLandingContent;
  /** When present the page uses the live-batch layout (hero, toppers, stages, plans, FAQs). */
  batch?: BatchCourseContent;
  /** Ethics Foundation landing layout. */
  ethics?: EthicsLandingContent;
  /** Current Affairs "Shortlist" landing layout. */
  shortlist?: ShortlistContent;
  /** Free magazine page (Monthly Magazine, PRISM Simplified). */
  magazine?: MagazineContent;
  slug: string;
  /** Page heading, e.g. "Beginners' Kit for UPSC CSE 2027/28". */
  title: string;
  /** Short label as shown in the menu / breadcrumbs. */
  label: string;
  summary: string;
  /** "FREE Course" or a price such as "₹4,999". */
  priceLabel: string;
  isFree: boolean;
  /** e.g. "Starting from 1st Nov 2026" */
  startInfo: string;
  syllabusUrl: string;
  guide: { heading: string; text: string };
  whatIs: string[];
  learn: FreeResourceLearnItem[];
  whyJoin: string[];
  bestFor: string[];
  faqs: CourseFaq[];
}

/* ---------------- Blogs (/exams) ---------------- */

/** Article body block — the server can send these as JSON. */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

/** Exam category tab on /exams (order follows "Select Your Goal"). */
export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  /** BlogCategory.slug */
  category: string;
  title: string;
  excerpt: string;
  /** Cover / thumbnail image, 1280 × 800 px (16:10); a designed cover is drawn when missing. */
  cover?: string;
  author: string;
  /** Author photo; initials are shown when missing. */
  authorImage?: string;
  /** ISO date or date-time, e.g. "2026-10-12" or "2026-10-12T18:52:00+05:30" */
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  featured?: boolean;
  /** Published PDF of the article (else one is generated at /exams/<category>/<post>/pdf). */
  pdf?: string;
  content: BlogBlock[];
  /** 5–7 questions shown under the article (with FAQ structured data). */
  faqs: CourseFaq[];
}

/** "Latest Notification & Updates" boards + "Important Exams" link grid on /exams. */
export interface ExamUpdates {
  boards: { id: string; title: string; items: { title: string; href: string }[] }[];
  importantExams: { title: string; href: string }[][];
}

/* ---------- Company pages (/about-us, /careers) ---------- */

/** Icon keys rendered by the company sections (mapped to lucide icons). */
export type CompanyIcon =
  | "equity" | "reach" | "growth" | "trophy" | "live" | "centre" | "views" | "doubt" | "exams"
  | "mission" | "rocket" | "heart" | "learn" | "pin" | "flag" | "phone" | "sparkles" | "laptop" | "network";

export interface AboutContent {
  hero: { badge: string; kicker: string; highlight: string; title: string; intro: string };
  mission: { icon: CompanyIcon; text: string; highlight: string }[];
  vision: { points: string[]; tiles: { value: string; label: string }[] };
  founders: { name: string; role: string; image: string; linkedin?: string; quote: string; bio: string[] }[];
  presence: { intro: string; stats: { value: string; label: string }[]; centres: { name: string; city: string; status: "Open" | "Opening soon" }[] };
  journey: { subtitle: string; quote: string; steps: { year: string; title: string; text: string; icon: CompanyIcon }[] };
  culture: { title: string; text: string; cta: { label: string; href: string } };
  contacts: { kind: "press" | "support"; title: string; text: string; email: string }[];
}

export interface CareerJob {
  id: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  summary: string;
  /** ISO date the role was posted (shown as "Posted 10 Oct 2026"). */
  postedAt: string;
  experience?: string;
  /** JD details (shown in the "View JD Details" dialog). */
  responsibilities: string[];
  requirements: string[];
}

export interface CareersContent {
  hero: { notice: string; title: string; subtitle: string };
  life: { title: string; subtitle: string; photos: { src: string; caption: string }[] };
  stats: { icon: CompanyIcon; value: string; label: string }[];
  pillars: { text: string; tone: "red" | "navy" | "yellow" | "cream" }[];
  benefits: { icon: CompanyIcon; title: string; points: string[] }[];
  jobs: CareerJob[];
  email: string;
}

/* ---------- Legal pages (/privacy-policy, /terms-and-conditions, /refund-policy) ---------- */

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "note"; text: string }
  | { kind: "contact"; rows: { label: string; value: string; href?: string }[] };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  slug: "privacy-policy" | "terms-and-conditions" | "refund-policy";
  title: string;
  /** Short label for nav / related links. */
  label: string;
  description: string;
  updated: string;
  /** 3 key points shown as cards under the title. */
  highlights: { title: string; text: string }[];
  intro: LegalBlock[];
  sections: LegalSection[];
}

/* ======================================================================
 * Homepage → All Exams (GET /exams, GET /exams/:slug, admin /admin/homepage/all-exams)
 * One record per sub category; drives the header "All Exams" menu and /goal/<slug> pages.
 * ==================================================================== */

/** A banner with separate web (wide) and mobile (tall) art. Used for hero banners and top rankers. */
export interface ExamBanner {
  title: string;
  alt: string;
  webImageUrl: string;
  mobileImageUrl: string;
  link: string;
}

export interface ExamFreeClass {
  title: string;
  educator: string;
  duration: string;
  youtubeId: string;
  link: string;
}

export interface ExamBatch {
  title: string;
  thumbnail: string;
  language: string;
  mode: string;
  startDate: string;
  price: number;
  mrp: number;
  tag: string;
  link: string;
}

export interface ExamDetails {
  subTitle: string;
  banners: ExamBanner[];
  freeClasses: ExamFreeClass[];
  batches: ExamBatch[];
  topRankers: ExamBanner[];
  aboutExam: { title: string; highlights: { label: string; value: string }[]; paragraphs: string[] };
  faqs: { question: string; answer: string }[];
}

export interface ExamMenuIcon {
  name: string;
  color: string;
  background: string;
}

/** One exam (sub category) with everything shown on its page. */
export interface AllExam {
  _id?: string;
  category: string;
  subCategory: string;
  slug: string;
  order?: number;
  menuIcon: ExamMenuIcon;
  details: ExamDetails;
  updatedAt?: string;
}

/** GET /exams — the header "All Exams" menu. */
export interface AllExamsMenuCategory {
  category: string;
  subCategories: Pick<AllExam, "subCategory" | "slug" | "menuIcon">[];
}

/* ---------- All Exams in the admin panel (categories and sub categories are separate, joined by category id) ---------- */

export interface AdminExamCategory {
  _id: string;
  name: string;
  isActive: boolean;
  order: number;
}

export interface AdminSubCategorySummary {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  menuIcon: ExamMenuIcon;
  updatedAt?: string;
}

/** GET /admin/homepage/all-exams — every category with its sub categories (active and inactive). */
export interface AdminExamCategoryWithSubCategories extends AdminExamCategory {
  subCategories: AdminSubCategorySummary[];
}

/** GET /admin/homepage/all-exams/sub-categories/:id — one sub category with its category joined in. */
export interface AdminSubCategory {
  _id: string;
  category: AdminExamCategory;
  name: string;
  slug: string;
  isActive: boolean;
  menuIcon: ExamMenuIcon;
  details: ExamDetails;
  updatedAt?: string;
}

/** What the admin editor sends when saving a sub category. */
export interface AdminSubCategoryInput {
  category: string; // category id
  name: string;
  isActive: boolean;
  menuIcon: ExamMenuIcon;
  details: ExamDetails;
}

