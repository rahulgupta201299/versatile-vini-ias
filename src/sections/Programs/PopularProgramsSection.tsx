import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BookOpen, CalendarDays, ChevronRight } from "lucide-react";
import { OTHER_COURSE_LINKS, PopularProgram, POPULAR_PROGRAMS } from "@/data/popularPrograms";
import { COLORS } from "@/theme/colors";

/**
 * Card widths that fill the row edge to edge (matching the links above): 3 per row on computers, 2 on tablets,
 * one wide card on phones — more cards scroll sideways. The gaps here match the list's `gap`.
 */
const CARD_FLEX = { xs: "0 0 88%", sm: "0 0 calc((100% - 16px) / 2)", md: "0 0 calc((100% - 48px) / 3)" };

const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

const percentOff = ({ price, originalPrice }: Pick<PopularProgram, "price" | "originalPrice">) => Math.round((1 - price / originalPrice) * 100);

/** "VIEW OTHER COURSES" with small link pills. */
function OtherCourseLinks() {
  return (
    <Box component="nav" aria-label="Other courses" sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
      <Typography sx={{ fontWeight: 800, fontSize: "0.72rem", letterSpacing: ".06em", color: COLORS.heading, lineHeight: 1.3 }}>
        VIEW OTHER
        <br />
        COURSES
      </Typography>
      {OTHER_COURSE_LINKS.map(({ label, href }) => (
        <Box key={label} component={Link} href={href} sx={{ display: "inline-flex", alignItems: "center", height: 38, px: 2, borderRadius: "12px", border: `1.5px solid ${COLORS.border}`, bgcolor: "#FFFFFF", color: COLORS.ink, fontWeight: 600, fontSize: "0.88rem", textDecoration: "none", whiteSpace: "nowrap", "&:hover": { borderColor: COLORS.red, color: COLORS.red } }}>
          {label}
        </Box>
      ))}
    </Box>
  );
}

function ProgramCard({ program }: { program: PopularProgram }) {
  const { title, category, language, exam, startDate, price, originalPrice, offer, banner, buyHref, detailsHref } = program;

  return (
    <Box component="li" sx={{ flex: CARD_FLEX, scrollSnapAlign: "start", display: "flex", flexDirection: "column", borderRadius: "22px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", boxShadow: "0 10px 28px rgba(15,23,42,.06)", overflow: "hidden" }}>
      <Box sx={{ position: "relative", aspectRatio: "1376 / 768", bgcolor: COLORS.surface }}>
        <Image src={banner.src} alt={banner.alt} fill sizes="(min-width: 900px) 400px, (min-width: 600px) 50vw, 88vw" style={{ objectFit: "cover" }} />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2.25 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Typography sx={{ color: "#E07B39", fontWeight: 700, fontSize: "0.98rem" }}>{category}</Typography>
          <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: "6px", border: `1.5px solid ${COLORS.border}`, color: COLORS.heading, fontWeight: 600, fontSize: "0.72rem", letterSpacing: ".04em" }}>{language}</Box>
        </Box>
        <Typography component="h3" sx={{ mt: 1, fontWeight: 600, color: COLORS.ink, fontSize: "1.05rem", lineHeight: 1.45, minHeight: "2.9em" }}>{title}</Typography>
        <Box sx={{ mt: 1.25, display: "grid", gap: 0.75, color: COLORS.body, fontSize: "0.9rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><BookOpen size={17} color={COLORS.muted} /> {exam}</Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><CalendarDays size={17} color={COLORS.muted} /> {startDate}</Box>
        </Box>

        <Box sx={{ mt: "auto", pt: 2, display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box sx={{ mr: "auto" }}>
            <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1.2rem", lineHeight: 1.2 }}>
              {formatINR(price)}{" "}
              <Box component="s" sx={{ color: COLORS.disabled, fontWeight: 500, fontSize: "0.85rem" }}>{formatINR(originalPrice)}</Box>
            </Typography>
            <Typography sx={{ color: COLORS.success, fontWeight: 700, fontSize: "0.9rem" }}>{percentOff(program)}% OFF</Typography>
          </Box>
          <Box component={Link} href={buyHref} sx={{ display: "inline-flex", alignItems: "center", height: 44, px: 3, borderRadius: "10px", bgcolor: COLORS.ink, color: "#FFFFFF", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", whiteSpace: "nowrap", "&:hover": { bgcolor: COLORS.navy } }}>
            Buy Now
          </Box>
          <Box component={Link} href={detailsHref} aria-label={`View ${title}`} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, flexShrink: 0, borderRadius: "10px", border: `1.5px solid ${COLORS.border}`, color: COLORS.ink, "&:hover": { borderColor: COLORS.ink } }}>
            <ChevronRight size={20} />
          </Box>
        </Box>

        {/* Offer strip with a small pointer up to the price */}
        <Box sx={{ position: "relative", mt: 1.75, display: "flex", alignItems: "center", gap: 1, p: 0.75, borderRadius: "10px", bgcolor: "#FCEBDD", "&::before": { content: '""', position: "absolute", top: -7, left: 22, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderBottom: "7px solid #FCEBDD" } }}>
          <Box component="span" sx={{ px: 1, py: 0.4, borderRadius: "6px", bgcolor: "#E8743B", color: "#FFFFFF", fontWeight: 700, fontSize: "0.8rem" }}>{offer.tag}</Box>
          <Typography sx={{ color: COLORS.ink, fontSize: "0.85rem" }}>{offer.text}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

/** Homepage "Explore our most popular programs": other-course links on top (right), the heading, then a swipeable row of batch cards. */
export default function PopularProgramsSection() {
  return (
    <Box component="section" id="popular-programs" aria-labelledby="popular-programs-title" sx={{ py: { xs: 4, md: 6 }, bgcolor: COLORS.surface }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, mb: { xs: 2, md: 2.5 } }}>
          <OtherCourseLinks />
        </Box>
        <Typography id="popular-programs-title" component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem" }, color: COLORS.ink, letterSpacing: "-0.02em" }}>
          Explore our <Box component="span" sx={{ color: COLORS.red }}>most popular programs</Box>
        </Typography>

        <Box
          component="ul"
          sx={{ listStyle: "none", m: 0, mt: { xs: 2.5, md: 3.5 }, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 }, pb: 2, display: "flex", gap: { xs: 2, md: 3 }, overflowX: "auto", scrollSnapType: "x mandatory", scrollPaddingInline: { xs: 16, sm: 0 }, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
        >
          {POPULAR_PROGRAMS.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
