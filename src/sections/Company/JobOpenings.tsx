"use client";

import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowUpRight, Briefcase, Clock, Mail, MapPin } from "lucide-react";
import { CareerJob } from "@/types";
import { COLORS } from "@/theme/colors";
import SectionHeading from "./SectionHeading";

const mailto = (email: string, subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

/** Open positions with a team filter; "Apply" opens an email with the role in the subject. */
export default function JobOpenings({ jobs, email }: { jobs: CareerJob[]; email: string }) {
  const teams = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.team)))], [jobs]);
  const [team, setTeam] = useState("All");
  const shown = team === "All" ? jobs : jobs.filter((j) => j.team === team);

  return (
    <Box component="section" id="openings" sx={{ scrollMarginTop: 80, py: { xs: 7, md: 10 }, bgcolor: "#FFFFFF" }}>
      <Container sx={{ maxWidth: "1000px !important" }}>
        <SectionHeading align="center" title="Open positions" subtitle={`${jobs.length} openings across ${teams.length - 1} teams. Don't see your role? Write to us anyway.`} />

        <Box role="tablist" aria-label="Filter by team" sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center", mb: 3.5 }}>
          {teams.map((t) => {
            const active = t === team;
            const count = t === "All" ? jobs.length : jobs.filter((j) => j.team === t).length;
            return (
              <Box key={t} component="button" type="button" role="tab" aria-selected={active} onClick={() => setTeam(t)} sx={{ px: 2, py: 0.9, borderRadius: 999, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: "0.9rem", border: `1px solid ${active ? COLORS.red : COLORS.border}`, bgcolor: active ? COLORS.redTint : "#FFFFFF", color: active ? COLORS.red : COLORS.body, transition: "all .2s", "&:hover": { borderColor: COLORS.red } }}>
                {t} <Box component="span" sx={{ opacity: 0.6 }}>({count})</Box>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: "grid", gap: 1.75 }}>
          {shown.map((j) => (
            <Box key={j.id} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: 2, p: { xs: 2.25, md: 2.75 }, borderRadius: "16px", border: `1px solid ${COLORS.border}`, transition: "border-color .2s, box-shadow .2s", "&:hover": { borderColor: COLORS.redBorder, boxShadow: "0 12px 28px rgba(254,0,52,.08)" } }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.05rem", md: "1.15rem" } }}>{j.title}</Typography>
                <Typography sx={{ color: COLORS.textSecondary, fontSize: "0.92rem", mt: 0.5 }}>{j.summary}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 1.25, sm: 2 }, mt: 1.25, color: COLORS.muted, fontSize: "0.85rem" }}>
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}><Briefcase size={15} /> {j.team}</Box>
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}><MapPin size={15} /> {j.location}</Box>
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}><Clock size={15} /> {j.type}</Box>
                </Box>
              </Box>
              <Box component="a" href={mailto(email, `Application: ${j.title}`)} sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 0.75, px: 2.5, py: 1.1, borderRadius: "10px", bgcolor: COLORS.red, color: "#FFFFFF", fontWeight: 700, fontSize: "0.92rem", textDecoration: "none", "&:hover": { bgcolor: COLORS.redDark } }}>
                Apply <ArrowUpRight size={17} />
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4, p: { xs: 2.5, md: 3 }, borderRadius: "16px", bgcolor: "#FFFBEA", border: "1px dashed #F2D500", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: 2, justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontWeight: 800, color: COLORS.navy }}>Didn&apos;t find the right role?</Typography>
            <Typography sx={{ color: COLORS.textSecondary, fontSize: "0.92rem" }}>Send your CV and tell us how you&apos;d like to contribute.</Typography>
          </Box>
          <Box component="a" href={mailto(email, "General application")} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 2.25, py: 1, borderRadius: "10px", border: `1.5px solid ${COLORS.navy}`, color: COLORS.navy, fontWeight: 700, fontSize: "0.92rem", textDecoration: "none", "&:hover": { bgcolor: COLORS.navy, color: "#FFFFFF" } }}>
            <Mail size={16} /> {email}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
