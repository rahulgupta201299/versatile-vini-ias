"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowUpRight, BarChart3, Briefcase, CalendarDays, Megaphone, MessageCircle, Mic, Monitor, Presentation, type LucideIcon } from "lucide-react";
import { PopularProgram, ProgramIcon, PROGRAM_TRACKS } from "@/data/popularPrograms";
import { COLORS } from "@/theme/colors";

const ICONS: Record<ProgramIcon, LucideIcon> = { MessageCircle, Mic, Briefcase, BarChart3, Megaphone, Monitor };

const buttonSx = { flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 0.75, height: 44, borderRadius: 999, fontWeight: 700, fontSize: "0.92rem", textDecoration: "none", whiteSpace: "nowrap" } as const;

function ProgramCard({ program }: { program: PopularProgram }) {
  const { provider, title, location, mode, dates, icon, colors, viewHref, applyHref } = program;
  const Icon = ICONS[icon];

  return (
    <Box component="li" sx={{ flex: { xs: "0 0 86%", sm: "0 0 340px" }, scrollSnapAlign: "start", display: "flex", flexDirection: "column", borderRadius: "24px", bgcolor: "#FFFFFF", boxShadow: "0 10px 30px rgba(15,23,42,.08)", overflow: "hidden" }}>
      {/* Cover: track gradient with the program icon, VINI badge on the edge */}
      <Box sx={{ position: "relative", height: 150, background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.92)" }}>
        <Icon size={64} strokeWidth={1.5} />
        <Box sx={{ position: "absolute", right: 20, bottom: -26, width: 64, height: 64, borderRadius: "50%", bgcolor: "#FFFFFF", boxShadow: "0 6px 16px rgba(15,23,42,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image src="/images/logo.png" alt="" width={46} height={19} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2.5, pt: 2.25 }}>
        <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem" }}>{provider}</Typography>
        <Typography component="h3" sx={{ mt: 0.75, fontWeight: 700, color: COLORS.ink, fontSize: "1.05rem", lineHeight: 1.4, minHeight: "2.8em" }}>{title}</Typography>
        <Box component="span" sx={{ alignSelf: "flex-start", mt: 1.5, px: 1.5, py: 0.5, borderRadius: 999, bgcolor: "#E7F5F3", color: "#0F766E", fontWeight: 600, fontSize: "0.82rem" }}>{location}</Box>
        <Box sx={{ mt: 2, display: "grid", gap: 1, color: COLORS.body, fontSize: "0.9rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Presentation size={18} color={COLORS.muted} /> {mode}</Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><CalendarDays size={18} color={COLORS.muted} /> {dates}</Box>
        </Box>
        <Box sx={{ mt: "auto", pt: 2.5, display: "flex", gap: 1.25 }}>
          <Box component={Link} href={viewHref} sx={{ ...buttonSx, border: `1.5px solid ${COLORS.border}`, color: COLORS.ink, "&:hover": { borderColor: COLORS.ink } }}>View Program</Box>
          <Box component={Link} href={applyHref} sx={{ ...buttonSx, bgcolor: COLORS.red, color: "#FFFFFF", "&:hover": { bgcolor: COLORS.redDark } }}>
            Apply Now <ArrowUpRight size={17} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/** Homepage "Explore our most popular programs": track tabs (Spoken English · Skills) and a swipeable row of program cards. */
export default function PopularProgramsSection() {
  const [trackId, setTrackId] = useState(PROGRAM_TRACKS[0].id);
  const track = PROGRAM_TRACKS.find(({ id }) => id === trackId) || PROGRAM_TRACKS[0];

  return (
    <Box component="section" id="popular-programs" aria-labelledby="popular-programs-title" sx={{ py: { xs: 4, md: 6 }, bgcolor: COLORS.surface }}>
      <Container>
        <Typography id="popular-programs-title" component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem" }, color: COLORS.ink, letterSpacing: "-0.02em" }}>
          Explore our <Box component="span" sx={{ color: COLORS.red }}>most popular programs</Box>
        </Typography>

        {/* Track tabs */}
        <Box sx={{ mt: { xs: 2, md: 2.5 }, display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2.5 }, flexWrap: "wrap" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: ".06em", color: COLORS.heading, lineHeight: 1.3 }}>
            VIEW
            <br />
            PROGRAMS
          </Typography>
          <Box role="tablist" aria-label="Program tracks" sx={{ display: "flex", gap: 1 }}>
            {PROGRAM_TRACKS.map(({ id, label }) => {
              const isActive = id === track.id;

              return (
                <Box
                  key={id}
                  component="button"
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="popular-programs-list"
                  onClick={() => setTrackId(id)}
                  sx={{ height: 46, px: 2.75, borderRadius: "14px", border: `1.5px solid ${isActive ? COLORS.red : COLORS.border}`, bgcolor: isActive ? COLORS.redTint : "#FFFFFF", color: isActive ? COLORS.red : COLORS.ink, fontFamily: "inherit", fontWeight: 600, fontSize: "0.98rem", cursor: "pointer", transition: "all .15s" }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          component="ul"
          id="popular-programs-list"
          role="tabpanel"
          aria-label={track.label}
          sx={{ listStyle: "none", m: 0, mt: { xs: 2.5, md: 3.5 }, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 }, pb: 2, display: "flex", gap: { xs: 2, md: 3 }, overflowX: "auto", scrollSnapType: "x mandatory", scrollPaddingInline: { xs: 16, sm: 0 }, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
        >
          {track.programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
