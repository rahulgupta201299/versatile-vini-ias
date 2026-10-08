export interface NavLink {
  label: string;
  href: string;
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

export interface FreeResourcePage {
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
