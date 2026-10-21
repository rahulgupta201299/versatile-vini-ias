import { BadgePercent, BarChart3, Download, GalleryHorizontal, Library, MessageSquareText, PhoneCall, Target, Trophy, type LucideIcon } from "lucide-react";

/**
 * Homepage sub-sections, in the order they appear on viniias.com (src/app/(site)/page.tsx).
 * Each one gets its own editor at /admin/web/homepage/<slug> once its fields are defined.
 */
export type HomepageSection = { slug: string; title: string; description: string; component: string; icon: LucideIcon };

export const HOMEPAGE_SECTIONS: HomepageSection[] = [
  { slug: "hero-slider", title: "Hero slider", description: "Top banner carousel — images, links and order.", component: "HeroSlider", icon: GalleryHorizontal },
  { slug: "free-resources", title: "Free resources", description: "Learning resource cards shown under the hero.", component: "FreeResourcesSection", icon: Library },
  { slug: "market-ad-banner", title: "Market ad banner", description: "Wide promotional banner.", component: "MarketAdBanner", icon: BadgePercent },
  { slug: "exam-goals", title: "Exam goals", description: "Exam categories and goals students can pick.", component: "ExamGoalSection", icon: Target },
  { slug: "promo-banners", title: "Promo banners", description: "Small promotional banner strip.", component: "SmallPromoBanner", icon: BadgePercent },
  { slug: "mentorship-callback", title: "Mentorship call-back", description: "Mentorship pitch with a call-back request.", component: "MentorshipCallbackSection", icon: PhoneCall },
  { slug: "top-rankers", title: "Top rankers", description: "Result tabs, toppers and ranker stats.", component: "TopRankersSection", icon: Trophy },
  { slug: "impact-stats", title: "Impact stats", description: "Headline numbers about VINI's impact.", component: "ImpactStatsSection", icon: BarChart3 },
  { slug: "enquiry", title: "Enquiry", description: "Enquiry form section.", component: "EnquirySection", icon: MessageSquareText },
  { slug: "app-download", title: "App download", description: "Promotes the VINI app with store links.", component: "AppDownloadSection", icon: Download },
];

