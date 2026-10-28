"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowUpRight, CalendarDays, Clock, FileText, Mail, MapPin, Search, SearchX, Star, X } from "lucide-react";
import { CareerJob } from "@/types";
import { COLORS } from "@/theme/colors";
import ShareBlog from "@/sections/Blog/ShareBlog";
import SectionHeading from "./SectionHeading";
import { byNewest, formatPosted, isNewJob, jobPath, jobUrl, shareText } from "./careerUtils";
import { fieldSx, lightPill, solidPill } from "./careerStyles";

const mailto = (email: string, subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;
const ALL_TEAMS = "All departments";
const ALL_TYPES = "All employment types";

function JobCard({ job, now }: { job: CareerJob; now: number | null }) {
  const fresh = now !== null && isNewJob(job.postedAt, now);

  return (
    <Box component="article" sx={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", p: { xs: 2.25, md: 2.5 }, borderRadius: "16px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", transition: "border-color .2s, box-shadow .2s, transform .2s", "&:hover": { borderColor: COLORS.redBorder, boxShadow: "0 14px 30px rgba(254,0,52,.08)", transform: "translateY(-2px)" } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, pr: 6 }}>
        <Typography sx={{ color: COLORS.red, fontWeight: 800, fontSize: "0.72rem", letterSpacing: ".08em", textTransform: "uppercase" }}>{job.team}</Typography>
        {fresh && <Box component="span" sx={{ px: 0.9, py: 0.15, borderRadius: 999, bgcolor: COLORS.yellow, color: COLORS.navy, fontSize: "0.65rem", fontWeight: 800 }}>NEW</Box>}
      </Box>
      <Box sx={{ position: "absolute", top: 14, right: 14 }}>
        <ShareBlog variant="icon" title={job.title} message={shareText(job)} url={jobUrl(job.id)} id={job.id} campaign={`job_${job.id}`} dialogTitle="Share this job" />
      </Box>

      <Typography component="h3" sx={{ mt: 0.75, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.08rem", md: "1.15rem" }, lineHeight: 1.3 }}>
        <Box component={Link} href={jobPath(job.id)} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: COLORS.red } }}>{job.title}</Box>
      </Typography>
      <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.9rem", lineHeight: 1.5 }}>{job.summary}</Typography>

      <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {[
          { icon: <MapPin size={14} />, text: job.location },
          { icon: <Clock size={14} />, text: job.type },
          ...(job.experience ? [{ icon: <Star size={14} />, text: job.experience }] : []),
        ].map((m) => (
          <Box key={m.text} sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1, py: 0.4, borderRadius: "8px", bgcolor: COLORS.surface, color: COLORS.body, fontSize: "0.8rem", fontWeight: 500 }}>{m.icon} {m.text}</Box>
        ))}
      </Box>

      <Box sx={{ mt: "auto", pt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: COLORS.muted, fontSize: "0.82rem", mb: 1.5, pt: 1.5, borderTop: `1px dashed ${COLORS.border}` }}>
          <CalendarDays size={15} /> Posted {formatPosted(job.postedAt)}
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          <Box component={Link} href={jobPath(job.id)} sx={{ ...lightPill, px: 1.5 }}>
            <FileText size={16} /> View JD Details
          </Box>
          <Box component={Link} href={`${jobPath(job.id)}#apply`} sx={{ ...solidPill, px: 1.5 }}>
            Apply Now <ArrowUpRight size={16} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/** Open positions: search + department / employment-type filters, role cards with posted date (eduteria-style). */
export default function JobOpenings({ jobs, email }: { jobs: CareerJob[]; email: string }) {
  const router = useRouter();
  const sorted = useMemo(() => [...jobs].sort(byNewest), [jobs]);
  const teams = useMemo(() => [ALL_TEAMS, ...Array.from(new Set(jobs.map((j) => j.team)))], [jobs]);
  const types = useMemo(() => [ALL_TYPES, ...Array.from(new Set(jobs.map((j) => j.type)))], [jobs]);
  const [q, setQ] = useState("");
  const [team, setTeam] = useState(ALL_TEAMS);
  const [type, setType] = useState(ALL_TYPES);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => setNow(Date.now()), []);

  // Old share links (/careers?job=<id>) → the role page.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("job");

    if (id && jobs.some((j) => j.id === id)) router.replace(jobPath(id));
  }, [jobs, router]);

  const query = q.trim().toLowerCase();
  const shown = sorted.filter(
    (j) =>
      (team === ALL_TEAMS || j.team === team) &&
      (type === ALL_TYPES || j.type === type) &&
      (!query || [j.title, j.team, j.location, j.summary, j.type].some((f) => f.toLowerCase().includes(query)))
  );
  const filtered = q || team !== ALL_TEAMS || type !== ALL_TYPES;
  const reset = () => {
    setQ("");
    setTeam(ALL_TEAMS);
    setType(ALL_TYPES);
  };

  const selectSx = { ...fieldSx, appearance: "none", pr: 4.5, cursor: "pointer", background: `#FFFFFF url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%2364748B' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center` } as const;

  return (
    <Box component="section" id="openings" sx={{ scrollMarginTop: 80, py: { xs: 7, md: 10 }, bgcolor: COLORS.surface }}>
      <Container sx={{ maxWidth: "1120px !important" }}>
        <SectionHeading align="center" title="Open positions" subtitle="Find a role that fits you — search, filter and apply in minutes." />

        {/* toolbar */}
        <Box sx={{ p: { xs: 1.5, md: 1.75 }, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 8px 22px rgba(15,23,42,.04)", display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1.6fr 1fr 1fr" }, gap: 1.25 }}>
          <Box sx={{ position: "relative", gridColumn: { sm: "1 / -1", md: "auto" } }}>
            <Box sx={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: COLORS.muted, display: "flex" }}><Search size={18} /></Box>
            <Box component="input" type="search" value={q} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)} placeholder="Search by role, team or city" aria-label="Search roles" sx={{ ...fieldSx, pl: 5.25, pr: q ? 5 : 1.75, "&::-webkit-search-cancel-button": { display: "none" } }} />
            {q && (
              <Box component="button" type="button" aria-label="Clear search" onClick={() => setQ("")} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 30, height: 30, border: "none", borderRadius: "50%", bgcolor: COLORS.surface, color: COLORS.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></Box>
            )}
          </Box>
          <Box component="select" value={team} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTeam(e.target.value)} aria-label="Department" sx={selectSx}>
            {teams.map((t) => <option key={t} value={t}>{t}</option>)}
          </Box>
          <Box component="select" value={type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)} aria-label="Employment type" sx={selectSx}>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </Box>
        </Box>

        <Box sx={{ mt: 2.5, mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography aria-live="polite" sx={{ color: COLORS.body, fontWeight: 700 }}>
            {shown.length} open {shown.length === 1 ? "role" : "roles"}
          </Typography>
          {filtered && (
            <Box component="button" type="button" onClick={reset} sx={{ border: "none", bgcolor: "transparent", color: COLORS.red, fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              Clear filters
            </Box>
          )}
        </Box>

        {shown.length ? (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: { xs: 1.75, md: 2.25 } }}>
            {shown.map((j) => <JobCard key={j.id} job={j} now={now} />)}
          </Box>
        ) : (
          <Box sx={{ py: 6, textAlign: "center", borderRadius: "16px", border: `1px dashed ${COLORS.border}`, bgcolor: "#FFFFFF" }}>
            <SearchX size={36} color={COLORS.muted} />
            <Typography sx={{ mt: 1, fontWeight: 800, color: COLORS.navy }}>No roles match your search</Typography>
            <Typography sx={{ color: COLORS.textSecondary, fontSize: "0.92rem" }}>Try another keyword or clear the filters.</Typography>
            <Box component="button" type="button" onClick={reset} sx={{ ...lightPill, mt: 2 }}>Clear filters</Box>
          </Box>
        )}

        <Box sx={{ mt: 4, p: { xs: 2.5, md: 3 }, borderRadius: "16px", bgcolor: "#FFFBEA", border: "1px dashed #F2D500", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: 2, justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontWeight: 800, color: COLORS.navy }}>Didn&apos;t find the right role?</Typography>
            <Typography sx={{ color: COLORS.textSecondary, fontSize: "0.92rem" }}>Send your CV and tell us how you&apos;d like to contribute.</Typography>
          </Box>
          <Box component="a" href={mailto(email, "General application")} sx={lightPill}>
            <Mail size={16} /> {email}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
