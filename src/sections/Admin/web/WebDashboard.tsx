import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowUpRight, Eye, GraduationCap, Home, MessageSquare, PhoneCall, Users } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { Card, Chip, Notice, PageHeader, StatCard } from "../ui";
import { CONTENT_STATUS, LEAD_SOURCES, RECENT_ENQUIRIES, STATS, TOP_PAGES, WEEKLY_TRAFFIC } from "./dashboardData";

const STAT_ICONS = {
  visitors: { icon: <Users size={20} />, tone: "red" },
  leads: { icon: <MessageSquare size={20} />, tone: "yellow" },
  enrolments: { icon: <GraduationCap size={20} />, tone: "navy" },
  callbacks: { icon: <PhoneCall size={20} />, tone: "ink" },
} as const;

const DONUT_COLORS = [COLORS.red, COLORS.yellow, COLORS.navy, "#CBD5E1"];
const fmt = (n: number) => n.toLocaleString("en-IN");

function TrafficChart() {
  const max = Math.max(...WEEKLY_TRAFFIC.map((d) => d.visitors));
  const top = Math.ceil(max / 500) * 500;
  const ticks = [top, (top * 3) / 4, top / 2, top / 4, 0];
  const best = WEEKLY_TRAFFIC.reduce((a, b) => (b.visitors > a.visitors ? b : a));

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 1.5, height: 260 }}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", pb: 3.5, textAlign: "right" }}>
        {ticks.map((t) => (
          <Typography key={t} sx={{ color: COLORS.muted, fontSize: "0.72rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{fmt(t)}</Typography>
        ))}
      </Box>
      <Box sx={{ position: "relative", display: "flex", flexDirection: "column" }}>
        <Box aria-hidden sx={{ position: "absolute", inset: "0 0 28px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {ticks.map((t) => <Box key={t} sx={{ borderTop: `1px dashed ${COLORS.border}` }} />)}
        </Box>
        <Box role="img" aria-label="Visitors per day this week" sx={{ position: "relative", flex: 1, display: "grid", gridTemplateColumns: `repeat(${WEEKLY_TRAFFIC.length}, 1fr)`, alignItems: "end", gap: { xs: 1, sm: 2 } }}>
          {WEEKLY_TRAFFIC.map((d) => {
            const isBest = d === best;

            return (
              <Box key={d.day} title={`${d.day}: ${fmt(d.visitors)} visitors`} sx={{ height: `${(d.visitors / top) * 100}%`, mx: "auto", width: "100%", maxWidth: 46, borderRadius: "10px 10px 4px 4px", bgcolor: isBest ? COLORS.red : "#FFB3C2", transition: "background-color .2s", "&:hover": { bgcolor: COLORS.red } }} />
            );
          })}
        </Box>
        <Box sx={{ height: 28, display: "grid", gridTemplateColumns: `repeat(${WEEKLY_TRAFFIC.length}, 1fr)`, gap: { xs: 1, sm: 2 }, alignItems: "end" }}>
          {WEEKLY_TRAFFIC.map((d) => (
            <Typography key={d.day} sx={{ textAlign: "center", color: COLORS.textSecondary, fontSize: "0.78rem", fontWeight: 600 }}>{d.day}</Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function LeadDonut() {
  const total = LEAD_SOURCES.reduce((s, x) => s + x.value, 0);
  const r = 54;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <Box>
      <Box sx={{ position: "relative", width: 180, height: 180, mx: "auto" }}>
        <svg viewBox="0 0 140 140" width="180" height="180" role="img" aria-label="Leads by source">
          <g transform="rotate(-90 70 70)">
            {LEAD_SOURCES.map((s, i) => {
              const len = (s.value / total) * c;
              const el = <circle key={s.label} cx="70" cy="70" r={r} fill="none" stroke={DONUT_COLORS[i]} strokeWidth="18" strokeDasharray={`${Math.max(len - 2, 0)} ${c}`} strokeDashoffset={-offset} />;

              offset += len;

              return el;
            })}
          </g>
        </svg>
        <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.6rem", color: COLORS.ink, lineHeight: 1 }}>{fmt(total)}</Typography>
          <Typography sx={{ mt: 0.5, color: COLORS.muted, fontSize: "0.75rem" }}>total leads</Typography>
        </Box>
      </Box>
      <Box component="ul" sx={{ listStyle: "none", mt: 2.5, display: "grid", gap: 1.25 }}>
        {LEAD_SOURCES.map((s, i) => (
          <Box component="li" key={s.label} sx={{ display: "flex", alignItems: "center", gap: 1.25, fontSize: "0.86rem" }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "3px", bgcolor: DONUT_COLORS[i], flexShrink: 0 }} />
            <Box sx={{ flex: 1, color: COLORS.body }}>{s.label}</Box>
            <Box sx={{ fontWeight: 700, color: COLORS.ink, fontVariantNumeric: "tabular-nums" }}>{fmt(s.value)}</Box>
            <Box sx={{ width: 40, textAlign: "right", color: COLORS.muted, fontVariantNumeric: "tabular-nums" }}>{Math.round((s.value / total) * 100)}%</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const statusTone = { New: "red", Contacted: "yellow", Enrolled: "success" } as const;

export default function WebDashboard({ adminName }: { adminName?: string }) {
  return (
    <>
      <PageHeader
        eyebrow="Web / Dashboard"
        title={`Welcome back${adminName ? `, ${adminName}` : ""}`}
        subtitle="How viniias.com is doing — traffic, leads and content at a glance."
        actions={
          <Box component={Link} href="/admin/web/homepage" sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: 44, px: 2.25, borderRadius: "12px", bgcolor: COLORS.red, color: "#FFFFFF", fontWeight: 700, fontSize: "0.92rem", boxShadow: "0 8px 20px rgba(254,0,52,.25)", "&:hover": { bgcolor: COLORS.redDark } }}>
            <Home size={18} /> Manage Homepage
          </Box>
        }
      />

      <Notice>
        <b>Sample data:</b> the numbers on this dashboard are placeholders. They&apos;ll switch to live figures once analytics and leads are connected to the backend.
      </Notice>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }, gap: 2 }}>
        {STATS.map((s) => (
          <StatCard key={s.key} label={s.label} value={s.value} change={s.change} icon={STAT_ICONS[s.key].icon} tone={STAT_ICONS[s.key].tone} />
        ))}
      </Box>

      <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 1fr)" }, gap: 2 }}>
        <Card title="Website traffic" subtitle="Visitors per day, this week" action={<Chip tone="red">Best day: Sat</Chip>}>
          <TrafficChart />
        </Card>
        <Card title="Leads by source" subtitle="Last 30 days">
          <LeadDonut />
        </Card>
      </Box>

      <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 3fr) minmax(0, 2fr)" }, gap: 2 }}>
        <Card title="Recent enquiries" subtitle="Latest leads from the website forms">
          <Box sx={{ overflowX: "auto", mx: { xs: -2.25, md: -3 }, px: { xs: 2.25, md: 3 } }}>
            <Box component="table" sx={{ width: "100%", minWidth: 520, borderCollapse: "collapse", fontSize: "0.86rem", "& th": { textAlign: "left", color: COLORS.muted, fontWeight: 700, fontSize: "0.72rem", letterSpacing: ".06em", textTransform: "uppercase", pb: 1.25, borderBottom: `1px solid ${COLORS.border}` }, "& td": { py: 1.5, borderBottom: `1px solid ${COLORS.borderLight}`, color: COLORS.body }, "& tr:last-of-type td": { borderBottom: "none" } }}>
              <thead>
                <tr><th>Name</th><th>Course</th><th>Source</th><th>When</th><th>Status</th></tr>
              </thead>
              <tbody>
                {RECENT_ENQUIRIES.map((e) => (
                  <tr key={e.name}>
                    <Box component="td" sx={{ fontWeight: 700, color: `${COLORS.ink} !important` }}>{e.name}</Box>
                    <td>{e.course}</td>
                    <td>{e.source}</td>
                    <Box component="td" sx={{ whiteSpace: "nowrap", color: `${COLORS.muted} !important` }}>{e.time}</Box>
                    <td><Chip tone={statusTone[e.status]}>{e.status}</Chip></td>
                  </tr>
                ))}
              </tbody>
            </Box>
          </Box>
        </Card>

        <Card title="Top pages" subtitle="Most viewed, last 30 days">
          <Box component="ol" sx={{ listStyle: "none", display: "grid", gap: 1.75 }}>
            {TOP_PAGES.map((p, i) => (
              <Box component="li" key={p.path} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ width: 28, height: 28, flexShrink: 0, borderRadius: "8px", bgcolor: i === 0 ? COLORS.yellow : COLORS.surface, color: COLORS.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem" }}>{i + 1}</Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography noWrap sx={{ fontWeight: 700, color: COLORS.ink, fontSize: "0.88rem" }}>{p.title}</Typography>
                  <Typography noWrap sx={{ color: COLORS.muted, fontSize: "0.76rem" }}>{p.path}</Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end", fontWeight: 700, color: COLORS.ink, fontSize: "0.86rem", fontVariantNumeric: "tabular-nums" }}><Eye size={14} color={COLORS.muted} />{fmt(p.views)}</Typography>
                  <Typography sx={{ color: p.change >= 0 ? COLORS.success : COLORS.red, fontSize: "0.75rem", fontWeight: 700 }}>{p.change >= 0 ? "+" : ""}{p.change}%</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>

      <Box sx={{ mt: 2, p: { xs: 2.25, md: 3 }, borderRadius: "18px", bgcolor: COLORS.navy, color: "#FFFFFF", display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr) auto" }, gap: { xs: 2.5, md: 3 }, alignItems: "center" }}>
        {CONTENT_STATUS.map((c) => (
          <Box key={c.label}>
            <Typography sx={{ fontWeight: 800, fontSize: "1.6rem", color: COLORS.yellow, lineHeight: 1.1 }}>{c.value}</Typography>
            <Typography sx={{ mt: 0.5, fontWeight: 700, fontSize: "0.88rem" }}>{c.label}</Typography>
            <Typography sx={{ color: "rgba(255,255,255,.6)", fontSize: "0.76rem" }}>{c.note}</Typography>
          </Box>
        ))}
        <Box component="a" href="/" target="_blank" rel="noopener" sx={{ gridColumn: { xs: "1 / -1", md: "auto" }, justifySelf: { md: "end" }, display: "inline-flex", alignItems: "center", gap: 0.75, height: 42, px: 2, borderRadius: "12px", bgcolor: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", color: "#FFFFFF", fontWeight: 700, fontSize: "0.88rem", width: "fit-content", "&:hover": { bgcolor: COLORS.red, borderColor: COLORS.red } }}>
          View live site <ArrowUpRight size={16} />
        </Box>
      </Box>
    </>
  );
}
