import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { OTHER_COURSE_LINKS } from "@/data/popularPrograms";
import { COLORS } from "@/theme/colors";
import ProgramsGrid from "./ProgramsGrid";

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

/** Homepage "Popular Courses": other-course links on top (right), the heading, then the batch cards with View More / View Less. */
export default function PopularProgramsSection() {
  return (
    <Box component="section" id="popular-programs" aria-labelledby="popular-programs-title" sx={{ py: { xs: 4, md: 6 }, bgcolor: COLORS.surface }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, mb: { xs: 2, md: 2.5 } }}>
          <OtherCourseLinks />
        </Box>
        <Typography id="popular-programs-title" component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem" }, color: COLORS.ink, letterSpacing: "-0.02em" }}>
          Popular Courses
        </Typography>

        <ProgramsGrid />
      </Container>
    </Box>
  );
}
