import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BookOpen, Code2, Rocket, Sigma } from "lucide-react";
import { KIDS_COURSES } from "@/data/kidsCourses";
import { COLORS } from "@/theme/colors";
import KidsCourseArt from "./KidsCourseArt";

/** Card tints and the colour of the "Class …" line, in card order. */
const TONES = [
  { bg: "#FCEFEA", accent: "#5B5BD6" },
  { bg: "#FCF1D2", accent: "#2E7D9A" },
  { bg: "#EEF2FC", accent: "#E8613C" },
  { bg: "#F2F3F8", accent: "#6366F1" },
];

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

/** Homepage "Courses for kids": four course cards with an illustration on the right (computers). */
export default function KidsCoursesSection() {
  return (
    <Box component="section" id="kids-courses" aria-labelledby="kids-courses-title" sx={{ py: { xs: 4, md: 6 }, bgcolor: "#FFFFFF" }}>
      <Container>
        <Typography id="kids-courses-title" component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem" }, color: COLORS.ink, letterSpacing: "-0.02em", mb: { xs: 2.5, md: 4 } }}>
          Courses for{" "}
          <Box component="span" sx={{ position: "relative", color: COLORS.red, "&::after": { content: '""', position: "absolute", left: "-4%", right: "-4%", bottom: -6, height: 6, borderRadius: 3, bgcolor: COLORS.yellow, transform: "rotate(-3deg)" } }}>
            kids
          </Box>
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 2fr) minmax(0, 1fr)" }, gap: { xs: 3, md: 4 }, alignItems: "center" }}>
          <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: { xs: 1.5, md: 2.5 } }}>
            {KIDS_COURSES.map(({ classes, title, text, href, art }, index) => {
              const { bg, accent } = TONES[index % TONES.length];

              return (
                <Box component="li" key={title} sx={{ display: "flex", gap: { xs: 1.75, md: 2.25 }, p: { xs: 2, md: 3 }, borderRadius: "20px", bgcolor: bg }}>
                  <Box sx={{ width: { xs: 56, md: 72 }, height: { xs: 56, md: 72 }, flexShrink: 0, "& svg": { width: "100%", height: "100%" } }}>
                    <KidsCourseArt name={art} />
                  </Box>
                  <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", md: "0.95rem" }, color: accent }}>{classes}</Typography>
                    <Typography component="h3" sx={{ mt: 0.5, fontWeight: 800, fontSize: { xs: "1.05rem", md: "1.2rem" }, color: COLORS.ink, lineHeight: 1.3 }}>{title}</Typography>
                    <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: { xs: "0.88rem", md: "0.95rem" }, lineHeight: 1.55 }}>{text}</Typography>
                    <Box component={Link} href={href} aria-label={`Explore ${title}`} sx={{ mt: { xs: 1.5, md: 2 }, display: "inline-flex", alignItems: "center", height: { xs: 40, md: 46 }, px: { xs: 2.5, md: 3.5 }, borderRadius: "10px", bgcolor: COLORS.navyDark, color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "0.88rem", md: "0.95rem" }, textDecoration: "none", transition: "transform .15s, background-color .15s", "&:hover": { bgcolor: COLORS.navy, transform: "translateY(-1px)" } }}>
                      Explore
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <KidsIllustration />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
