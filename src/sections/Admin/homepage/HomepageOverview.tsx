import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ArrowUpRight,
  ChevronRight,
  GalleryHorizontal,
  LayoutGrid,
  Library,
  type LucideIcon,
  Megaphone,
  PartyPopper,
  Target,
  Trophy,
} from "lucide-react";
import { COLORS } from "@/theme/colors";
import { HomepageSummary } from "@/types";
import { Chip, PageHeader } from "../ui";

const BASE = "/admin/web/homepage";

type Count = { active: number; total: number };

type Section = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** The section's editor. */
  href: string;
  status?: string;
  isLive?: boolean;
};

/** "1 slide", "4 slides", "2 categories" */
const plural = (count: number, singular: string, pluralForm = `${singular}s`) => {
  if (count === 1) return `${count} ${singular}`;

  return `${count} ${pluralForm}`;
};

const countText = ({ active, total }: Count, noun: string) => {
  const inactive = total - active;

  if (!inactive) return plural(active, noun);

  return `${plural(active, noun)} · ${inactive} off`;
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

/** The homepage sections edited in the admin, top to bottom, with what is live in each. (The rest of the homepage is fixed content in the frontend.) */
const buildSections = ({ heroBanners, celebration, freeResources, firstMarketing, secondMarketing, selectYourGoal, topRankers }: HomepageSummary): Section[] => [
  { title: "Hero slider", description: "Top banner carousel — web and phone images, links and order.", icon: GalleryHorizontal, href: `${BASE}/hero-banners`, status: countText(heroBanners, "slide"), isLive: heroBanners.active > 0 },
  {
    title: "Celebration banner",
    description: "Festival sale banner under the hero, with offer cards and start / end dates.",
    icon: PartyPopper,
    href: `${BASE}/celebration-banners`,
    status: celebration ? `Live: ${celebration.title} · until ${formatDate(celebration.endsAt)}` : "Nothing live",
    isLive: Boolean(celebration),
  },
  { title: "Free resources", description: "“Browse Our Free Resources” tiles — icon, colour, title and link.", icon: Library, href: `${BASE}/free-resources`, status: countText(freeResources, "tile"), isLive: freeResources.active > 0 },
  { title: "Marketing banner", description: "Wide promo banner under Free resources (several become a slider).", icon: Megaphone, href: `${BASE}/marketing-banner`, status: countText(firstMarketing, "banner"), isLive: firstMarketing.active > 0 },
  {
    title: "Select Your Goal",
    description: "Exam category tabs and their exam cards — order, logos and links.",
    icon: Target,
    href: `${BASE}/select-your-goal`,
    status: `${plural(selectYourGoal.categories.active, "category", "categories")} · ${plural(selectYourGoal.exams.active, "exam")}`,
    isLive: selectYourGoal.categories.active > 0,
  },
  { title: "2nd marketing banner", description: "Promo slider under Select Your Goal.", icon: Megaphone, href: `${BASE}/second-marketing-banner`, status: countText(secondMarketing, "banner"), isLive: secondMarketing.active > 0 },
  {
    title: "Top rankers",
    description: "Headline boxes and result banners for each tab (UPSC, State PCS, Other Exams) — web and phone images.",
    icon: Trophy,
    href: `${BASE}/top-rankers`,
    status: `${plural(topRankers.stats.active, "box", "boxes")} · ${plural(topRankers.banners.active, "banner")}`,
    isLive: topRankers.stats.active + topRankers.banners.active > 0,
  },
];

function SectionRow({ section, number }: { section: Section; number: number }) {
  const { title, description, icon: Icon, href, status, isLive } = section;
  return (
    <Box
      component="li"
      sx={{ borderTop: number > 1 ? `1px solid ${COLORS.borderLight}` : "none" }}
    >
      <Box
        component={Link}
        href={href}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, md: 2 },
          px: { xs: 2, md: 2.5 },
          py: 1.75,
          color: "inherit",
          textDecoration: "none",
          transition: "background-color .15s",
          "&:hover": { bgcolor: COLORS.redTintSoft },
          "&:hover .row-arrow": { color: COLORS.red, transform: "translateX(2px)" },
        }}
      >
        <Typography sx={{ width: 22, flexShrink: 0, color: COLORS.disabled, fontSize: "0.78rem", fontWeight: 800, textAlign: "right" }}>{String(number).padStart(2, "0")}</Typography>
        <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: "11px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={19} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.95rem" }}>{title}</Typography>
          <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem", lineHeight: 1.45 }}>{description}</Typography>
          {status && (
            <Box sx={{ display: { xs: "block", md: "none" }, mt: 0.75 }}>
              <Chip tone={isLive ? "success" : "neutral"}>{status}</Chip>
            </Box>
          )}
        </Box>
        {status && (
          <Box sx={{ display: { xs: "none", md: "block" }, flexShrink: 0, maxWidth: 300, textAlign: "right" }}>
            <Chip tone={isLive ? "success" : "neutral"}>{status}</Chip>
          </Box>
        )}
        <Box className="row-arrow" sx={{ display: "flex", color: COLORS.disabled, transition: "color .15s, transform .15s" }}>
          <ChevronRight size={20} />
        </Box>
      </Box>
    </Box>
  );
}

const panelSx = { listStyle: "none", m: 0, p: 0, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, overflow: "hidden" } as const;

/** Web → Homepage: the menus and homepage sections managed in the admin, with what is live and a link to each editor. */
/** `summary` is null for admins without Homepage access (they only see All Exams); `showAllExams` for All Exams access. */
export default function HomepageOverview({ summary, showAllExams }: { summary: HomepageSummary | null; showAllExams: boolean }) {
  const sections = summary ? buildSections(summary) : [];

  return (
    <>
      <PageHeader
        eyebrow="Web / Homepage"
        title="Homepage"
        subtitle="The parts of the homepage managed here, top to bottom. Changes show on the website straight away."
        actions={
          <Box component="a" href="/" target="_blank" rel="noopener" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 40, px: 2, borderRadius: "10px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", color: COLORS.ink, fontWeight: 700, fontSize: "0.88rem", "&:hover": { borderColor: COLORS.redBorder, color: COLORS.red } }}>
            Preview homepage <ArrowUpRight size={16} />
          </Box>
        }
      />

      {showAllExams && (
        <>
      <Typography component="h2" sx={{ mb: 1, color: COLORS.muted, fontSize: "0.72rem", fontWeight: 800, letterSpacing: ".08em" }}>MENUS & EXAM PAGES</Typography>
      <Box component="ul" sx={panelSx}>
        <SectionRow number={1} section={{ title: "All Exams", description: "Header “All Exams” menu and each exam's page — banners, classes, batches, about & FAQs.", icon: LayoutGrid, href: `${BASE}/all-exams` }} />
      </Box>
        </>
      )}
      {!!sections.length && (
        <>
      <Typography component="h2" sx={{ mt: 3.5, mb: 1, color: COLORS.muted, fontSize: "0.72rem", fontWeight: 800, letterSpacing: ".08em" }}>PAGE SECTIONS</Typography>
      <Box component="ol" sx={panelSx}>
        {sections.map((section, index) => (
          <SectionRow key={section.title} section={section} number={index + 1} />
        ))}
      </Box>
        </>
      )}

    </>
  );
}
