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

export interface HeroSlide {
  id: string;
  title: string;
  highlightText: string;
  subtitle: string;
  features: string[];
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  badge: string;
  gradient: string;
  accentColor: string;
  targetExam: string;
  imageUrl: string;
  imageAlt?: string;
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

export type ExamCategory = ExamGoalCategory;

export interface Ranker {
  id: string;
  name: string;
  hindiName: string;
  rank: number;
  exam: string;
  category: "UPSC" | "BPSC" | "JPSC" | "OTHER";
  designation: string;
  location: string;
  quoteHindi: string;
  quoteEnglish: string;
  optionalSubject: string;
  attempts: number;
  photoUrl: string;
  readStory: {
    background: string;
    strategy: string;
    timetable: string;
    recommendedBooks: string[];
    adviceToAspirants: string;
  };
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
