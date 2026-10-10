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
export interface ImpactMapItem {
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
  /** Results tab shown in the Toppers section (see data/resultBanners.ts). */
  resultTabId: string;
  /** Options for the "Exam" dropdown in the counselling form. */
  examOptions: string[];
}

/* ======================================================================
 * Server data contracts — the shapes the backend API returns.
 * (See src/lib/api.ts for the endpoint list.)
 * ==================================================================== */

export interface LinkItem {
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
  | "Eye";

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
  planPicker?: { title: string; defaultId?: string; plans: { id: string; name: string; course: string; description: string; fee: string }[] };
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
  features: { title: string; items: { title: string; text?: string; points?: string[] }[] };
  /** Show the homepage "Top Rankers" section (in place of educators). */
  showToppers?: boolean;
}

export interface FreeResourcePage {
  /** When present the page uses the mentorship layout. */
  mentorship?: MentorshipContent;
  /** When present the page uses the designed landing layout instead of the standard course layout. */
  landing?: CourseLandingContent;
  /** When present the page uses the live-batch layout (hero, toppers, stages, plans, FAQs). */
  batch?: BatchCourseContent;
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
