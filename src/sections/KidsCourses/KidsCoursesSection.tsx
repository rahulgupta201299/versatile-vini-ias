import { Poppins } from "next/font/google";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BookOpen, Code2, Rocket, Sigma } from "lucide-react";
import { KIDS_CLASS_RANGE } from "@/data/kidsCourses";
import { COLORS } from "@/theme/colors";
import KidsCoursesList from "./KidsCoursesList";

/** Rounded, friendly type for this section (the kids-course look). */
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

/** Floating subject badges around the illustration. */
const BADGES = [
  { label: "EN", top: "4%", left: "58%", bg: "#C850C0", rotate: -12 },
  { icon: Rocket, top: "26%", left: "84%", bg: COLORS.red, rotate: 18 },
  { icon: Code2, top: "54%", left: "88%", bg: "#5B6CF0", rotate: -10 },
  { icon: Sigma, top: "80%", left: "70%", bg: "#F97316", rotate: 8 },
];

/** The right-hand artwork: a soft sun-coloured circle with an open book and floating subject badges. */
function KidsIllustration() {
  return (
    <Box aria-hidden sx={{ position: "relative", width: "100%", maxWidth: 420, aspectRatio: "1", mx: "auto" }}>
      <Box sx={{ position: "absolute", inset: "8%", borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #FFF6D6 0%, #FDEBC0 55%, #FBDDD3 100%)" }} />
      <Box sx={{ position: "absolute", inset: "24%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "36%", bgcolor: "#FFFFFF", boxShadow: "0 24px 48px rgba(15,23,42,.10)", transform: "rotate(-6deg)" }}>
        <BookOpen size={96} strokeWidth={1.6} color={COLORS.red} />
      </Box>
      {[0, 1, 2].map((ray) => (
        <Box key={ray} sx={{ position: "absolute", top: "13%", left: `${38 + ray * 9}%`, width: 6, height: 26, borderRadius: 3, bgcolor: COLORS.yellowDark, transform: `rotate(${(ray - 1) * 28}deg)` }} />
      ))}
      {BADGES.map(({ label, icon: Icon, top, left, bg, rotate }) => (
        <Box key={top} sx={{ position: "absolute", top, left, width: { md: 54, lg: 64 }, height: { md: 54, lg: 64 }, borderRadius: "16px", bgcolor: bg, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.3rem", boxShadow: "0 10px 20px rgba(15,23,42,.18)", transform: `rotate(${rotate}deg)` }}>
          {Icon ? <Icon size={28} strokeWidth={2.4} /> : label}
        </Box>
      ))}
    </Box>
  );
}

/** Homepage "Courses for kids": a compact slider on phones; four detailed cards with an illustration on computers. */
export default function KidsCoursesSection() {
  return (
    <Box component="section" id="kids-courses" aria-labelledby="kids-courses-title" className={poppins.className} sx={{ py: { xs: 3, md: 6 }, bgcolor: "#FFFFFF", "& .MuiTypography-root": { fontFamily: "inherit" } }}>
      <Container>
        <Typography id="kids-courses-title" component="h2" sx={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", columnGap: 1, fontWeight: { xs: 600, md: 700 }, fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" }, color: COLORS.ink, letterSpacing: "-0.01em", mb: { xs: 2, md: 4 } }}>
          <span>
            Courses for{" "}
            <Box component="span" sx={{ position: "relative", color: COLORS.red, "&::after": { content: '""', position: "absolute", left: "-4%", right: "-4%", bottom: -6, height: 6, borderRadius: 3, bgcolor: COLORS.yellow, transform: "rotate(-3deg)" } }}>
              kids
            </Box>
          </span>
          <Box component="span" sx={{ fontWeight: 400, fontSize: { xs: "0.95rem", md: "1.1rem" }, color: COLORS.muted, letterSpacing: 0 }}>({KIDS_CLASS_RANGE})</Box>
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 2fr) minmax(0, 1fr)" }, gap: { xs: 3, md: 4 }, alignItems: "center" }}>
          <KidsCoursesList />

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <KidsIllustration />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
