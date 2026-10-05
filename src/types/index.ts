export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  isMegaMenu?: boolean;
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

/** A results banner as delivered by the server (separate art for web & mobile). */
export interface ResultBanner {
  id: string;
  title: string;
  /** Desktop/tablet art (> 768px). Reference size 3821 × 1324 (≈ 2.886 : 1), shown at 1120 × 388. */
  webImageUrl: string;
  /** Mobile art (≤ 768px). Reference size 1203 × 1650 (≈ 0.729 : 1). */
  mobileImageUrl: string;
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
