import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowDown, Megaphone, Check } from "lucide-react";
import { CareersContent } from "@/types";
import { COLORS } from "@/theme/colors";
import { COMPANY_ICONS } from "./companyIcons";
import SectionHeading from "./SectionHeading";
import CareersIllustration from "./CareersIllustration";

export function CareersHero({ hero }: { hero: CareersContent["hero"] }) {
  return (
    <Box component="section" sx={{ py: { xs: 5, md: 9 }, bgcolor: "#FFFFFF" }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>
        <Box>
          <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 1.5, py: 0.75, borderRadius: "8px", bgcolor: COLORS.redTint, color: COLORS.redDark, fontSize: "0.82rem", fontWeight: 700 }}>
            <Megaphone size={15} /> {hero.notice}
          </Box>
          <Typography component="h1" sx={{ mt: 2.25, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, lineHeight: 1.15 }}>
            {hero.title}
          </Typography>
          <Typography sx={{ mt: 2, color: COLORS.textSecondary, fontSize: { xs: "1.02rem", md: "1.15rem" }, lineHeight: 1.6, maxWidth: 520 }}>{hero.subtitle}</Typography>
          <Box component="a" href="#openings" sx={{ mt: 3.5, display: "flex", width: "fit-content", mx: { xs: "auto", md: 0 }, alignItems: "center", gap: 1, px: 3, py: 1.5, borderRadius: "12px", bgcolor: COLORS.red, color: "#FFFFFF", fontWeight: 700, textDecoration: "none", boxShadow: "0 10px 24px rgba(254,0,52,.25)", transition: "background-color .2s, transform .2s", "&:hover": { bgcolor: COLORS.redDark, transform: "translateY(-2px)" } }}>
            View all job openings <ArrowDown size={18} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CareersIllustration />
        </Box>
      </Container>
    </Box>
  );
}

export function CareersStats({ stats }: { stats: CareersContent["stats"] }) {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: COLORS.redTintSoft }}>
      <Container>
        <SectionHeading align="center" title="We're only getting started" subtitle="Vini IAS is on a mission to make quality civil services preparation reachable for every aspirant — and we're growing fast." />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: { xs: 2.5, md: 4 }, maxWidth: 900, mx: "auto" }}>
          {stats.map((s, i) => {
            const Icon = COMPANY_ICONS[s.icon];
            const tone = [COLORS.red, COLORS.navy, "#C99A00"][i % 3];
            return (
              <Box key={s.label} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 1.25, sm: 2 } }}>
                <Box sx={{ flexShrink: 0, width: { xs: 48, md: 60 }, height: { xs: 48, md: 60 }, borderRadius: "50%", bgcolor: "#FFFFFF", color: tone, boxShadow: "0 6px 18px rgba(15,23,42,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={26} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.5rem", md: "2rem" }, lineHeight: 1.1 }}>{s.value}</Typography>
                  <Typography sx={{ color: COLORS.textSecondary, fontSize: { xs: "0.88rem", md: "0.98rem" } }}>{s.label}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

const POSTER_TONES = {
  red: { bg: COLORS.red, fg: "#FFFFFF", accent: COLORS.yellow },
  navy: { bg: COLORS.navy, fg: "#FFFFFF", accent: COLORS.red },
  yellow: { bg: COLORS.yellow, fg: COLORS.navy, accent: COLORS.red },
  cream: { bg: "#FFF7E0", fg: COLORS.navy, accent: COLORS.red },
} as const;

/** Framed "posters" — one per leadership principle. */
export function CareersPillars({ pillars }: { pillars: CareersContent["pillars"] }) {
  return (
    <Box component="section" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 7, md: 10 }, bgcolor: "#FFFFFF" }}>
      <Container>
        <SectionHeading align="center" title="Pillars of our culture" subtitle="The principles that guide every decision we make — for our students and for each other." />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: { xs: 2, sm: 3, md: 4 }, maxWidth: 820, mx: "auto" }}>
          {pillars.map((p, i) => {
            const t = POSTER_TONES[p.tone];
            return (
              <Box key={p.text} sx={{ p: { xs: 0.9, md: 1.25 }, bgcolor: COLORS.navyDark, borderRadius: "4px", boxShadow: "0 14px 30px rgba(15,23,42,.18)", transition: "transform .25s", "&:hover": { transform: "translateY(-4px) rotate(-.6deg)" } }}>
                <Box sx={{ p: { xs: 0.9, md: 1.5 }, bgcolor: "#FFFFFF" }}>
                  <Box sx={{ position: "relative", overflow: "hidden", aspectRatio: "3 / 4", bgcolor: t.bg, color: t.fg, p: { xs: 1.5, md: 2.25 }, display: "flex", flexDirection: "column", justifyContent: i % 2 ? "flex-start" : "flex-end" }}>
                    {/* decorative shapes */}
                    <Box aria-hidden sx={{ position: "absolute", width: "70%", aspectRatio: "1", borderRadius: "50%", border: `10px solid ${t.accent}`, opacity: 0.35, ...(i % 2 ? { bottom: "-25%", right: "-20%" } : { top: "-25%", left: "-20%" }) }} />
                    <Box aria-hidden sx={{ position: "absolute", width: 14, height: 14, bgcolor: t.accent, ...(i % 2 ? { bottom: 18, left: 18 } : { top: 18, right: 18 }) }} />
                    <Typography sx={{ position: "relative", fontWeight: 900, textTransform: "uppercase", fontSize: { xs: "0.95rem", sm: "1.15rem", md: "1.3rem" }, lineHeight: 1.1, letterSpacing: ".01em" }}>{p.text}</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export function CareersBenefits({ benefits }: { benefits: CareersContent["benefits"] }) {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, background: `linear-gradient(180deg, ${COLORS.redTintSoft} 0%, #FFFBEA 100%)` }}>
      <Container>
        <SectionHeading align="center" title="Why Vini IAS?" subtitle="We believe in a holistic workplace where you can create, innovate and thrive." />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: { xs: 2, md: 3 }, maxWidth: 980, mx: "auto" }}>
          {benefits.map((b, i) => {
            const Icon = COMPANY_ICONS[b.icon];
            return (
              <Box key={b.title} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, borderTop: `4px solid ${i % 2 ? COLORS.yellowDark : COLORS.red}`, boxShadow: "0 10px 26px rgba(15,23,42,.05)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: i % 2 ? "#FFF7CC" : COLORS.redTint, color: i % 2 ? "#8A6D00" : COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} />
                  </Box>
                  <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: "1.15rem" }}>{b.title}</Typography>
                </Box>
                <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1 }}>
                  {b.points.map((pt) => (
                    <Box component="li" key={pt} sx={{ display: "flex", gap: 1, color: COLORS.body, fontSize: "0.95rem" }}>
                      <Check size={18} color={COLORS.success} style={{ flexShrink: 0, marginTop: 2 }} /> {pt}
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
