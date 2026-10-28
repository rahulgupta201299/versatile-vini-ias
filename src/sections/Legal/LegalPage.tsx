import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowRight, CalendarDays, ChevronRight, FileText, Info, Mail, RotateCcw, Scale, ShieldCheck } from "lucide-react";
import { LegalBlock, LegalDoc } from "@/types";
import { COLORS } from "@/theme/colors";
import LegalToc from "./LegalToc";

const DOC_ICON = { "terms-and-conditions": Scale, "privacy-policy": ShieldCheck, "refund-policy": RotateCcw } as const;
/** Compact tab labels on phones so all three fit in one row. */
const SHORT_LABEL = { "terms-and-conditions": "Terms", "privacy-policy": "Privacy", "refund-policy": "Refunds" } as const;

const HIGHLIGHT_TONES = [
  { bg: COLORS.redTint, fg: COLORS.red },
  { bg: "#FFF7CC", fg: "#8A6D00" },
  { bg: "#E8EEF8", fg: COLORS.navy },
];

const fmtDate = (iso: string) => new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

/** Turns emails and URLs inside plain text into links. */
/** An email or web address in legal text → its link. */
const toContactHref = (part: string, isEmail: boolean) => {
  if (isEmail) return `mailto:${part}`;

  return part.startsWith("http") ? part : `https://${part}`;
};

function Linkify({ text }: { text: string }) {
  const parts = text.split(/(\b[\w.+-]+@[\w-]+\.[\w.]+\b|https?:\/\/[^\s,)]+|www\.[^\s,)]+)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        const isEmail = /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part);
        const isUrl = /^(https?:\/\/|www\.)/.test(part);

        if (!isEmail && !isUrl) return <React.Fragment key={i}>{part}</React.Fragment>;

        const href = toContactHref(part, isEmail);

        return (
          <Box key={i} component="a" href={href} {...(isUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} sx={{ color: COLORS.red, fontWeight: 600, textDecoration: "none", wordBreak: "break-word", "&:hover": { textDecoration: "underline" } }}>
            {part}
          </Box>
        );
      })}
    </>
  );
}

/** "Label: rest" list items get a bold label. */
function ListItemText({ text }: { text: string }) {
  const m = text.match(/^([^:]{3,60}):\s(.+)$/);

  if (!m) return <Linkify text={text} />;

  return (
    <>
      <Box component="strong" sx={{ color: COLORS.navy }}>{m[1]}:</Box> <Linkify text={m[2]} />
    </>
  );
}

function Block({ b }: { b: LegalBlock }) {
  const body = { color: COLORS.body, fontSize: { xs: "0.97rem", md: "1.02rem" }, lineHeight: 1.75 };

  switch (b.kind) {
    case "p":
      return <Typography sx={{ ...body, mb: 1.75 }}><Linkify text={b.text} /></Typography>;
    case "h":
      return <Typography component="h3" sx={{ mt: 3, mb: 1, color: COLORS.navy, fontWeight: 800, fontSize: { xs: "1.02rem", md: "1.08rem" } }}>{b.text}</Typography>;
    case "note":
      return (
        <Box sx={{ display: "flex", gap: 1.5, my: 2.25, p: { xs: 1.75, md: 2 }, borderRadius: "12px", bgcolor: "#FFFBEA", border: "1px solid #F5E08A", borderLeft: `4px solid ${COLORS.yellowDark}` }}>
          <Info size={20} color="#B38F00" style={{ flexShrink: 0, marginTop: 2 }} />
          <Typography sx={{ ...body, fontSize: { xs: "0.95rem", md: "0.98rem" }, color: COLORS.ink }}><Linkify text={b.text} /></Typography>
        </Box>
      );
    case "list":
      return (
        <Box component={b.ordered ? "ol" : "ul"} sx={{ listStyle: "none", m: 0, mb: 2, p: 0, display: "grid", gap: 1.1 }}>
          {b.items.map((it, i) => (
            <Box component="li" key={it} sx={{ display: "flex", gap: 1.5, ...body }}>
              {b.ordered ? (
                <Box component="span" sx={{ flexShrink: 0, mt: "3px", width: 24, height: 24, borderRadius: "50%", bgcolor: COLORS.redTint, color: COLORS.red, fontSize: "0.78rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</Box>
              ) : (
                <Box component="span" sx={{ flexShrink: 0, mt: "11px", width: 7, height: 7, borderRadius: "50%", bgcolor: COLORS.red }} />
              )}
              <Box component="span"><ListItemText text={it} /></Box>
            </Box>
          ))}
        </Box>
      );
    case "contact":
      return (
        <Box sx={{ my: 2, borderRadius: "14px", border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
          {b.rows.map((r, i) => (
            <Box key={r.label} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" }, gap: { xs: 0.25, sm: 2 }, px: 2, py: 1.25, bgcolor: i % 2 ? "#FFFFFF" : COLORS.surface }}>
              <Typography sx={{ color: COLORS.muted, fontSize: "0.85rem", fontWeight: 600 }}>{r.label}</Typography>
              {r.href ? (
                <Box component="a" href={r.href} {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} sx={{ color: COLORS.red, fontWeight: 700, textDecoration: "none", wordBreak: "break-word", "&:hover": { textDecoration: "underline" } }}>{r.value}</Box>
              ) : (
                <Typography sx={{ color: COLORS.navy, fontWeight: 700 }}>{r.value}</Typography>
              )}
            </Box>
          ))}
        </Box>
      );
  }
}

/** Shared layout for Terms, Privacy and Refund pages. */
export default function LegalPage({ doc, docs }: { doc: LegalDoc; docs: LegalDoc[] }) {
  const Icon = DOC_ICON[doc.slug];
  const others = docs.filter((d) => d.slug !== doc.slug);

  return (
    <>
      {/* hero */}
      <Box component="section" sx={{ position: "relative", overflow: "hidden", color: "#FFFFFF", pt: { xs: 4, md: 6 }, pb: { xs: 9, md: 11 }, background: `radial-gradient(circle at 85% 20%, rgba(254,0,52,.35), transparent 45%), linear-gradient(160deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, "&::before": { content: '""', position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" } }}>
        <Container sx={{ position: "relative", maxWidth: "1120px !important" }}>
          <Box component="nav" aria-label="Breadcrumb" sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.85rem", color: "rgba(255,255,255,.7)", flexWrap: "wrap" }}>
            <Box component={Link} href="/" sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: COLORS.yellow } }}>Home</Box>
            <ChevronRight size={14} /> <span>Legal</span> <ChevronRight size={14} />
            <Box component="span" sx={{ color: "#FFFFFF", fontWeight: 600 }}>{doc.label}</Box>
          </Box>
          <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ flexShrink: 0, width: { xs: 48, md: 60 }, height: { xs: 48, md: 60 }, borderRadius: "16px", bgcolor: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.yellow }}>
              <Icon size={28} />
            </Box>
            <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: "1.85rem", md: "2.75rem" }, lineHeight: 1.15 }}>{doc.title}</Typography>
          </Box>
          <Typography sx={{ mt: 2, maxWidth: 720, color: "rgba(255,255,255,.82)", fontSize: { xs: "0.98rem", md: "1.08rem" }, lineHeight: 1.6 }}>{doc.description}</Typography>
          <Box sx={{ mt: 2, display: "flex", width: "fit-content", mx: { xs: "auto", md: 0 }, alignItems: "center", gap: 0.6, px: 1.25, py: 0.35, borderRadius: 999, bgcolor: "rgba(255,229,31,.12)", border: "1px solid rgba(255,229,31,.3)", color: COLORS.yellow, fontSize: { xs: "0.74rem", md: "0.78rem" }, fontWeight: 700 }}>
            <CalendarDays size={13} /> Last updated: {fmtDate(doc.updated)}
          </Box>
          {/* switch between policies */}
          <Box component="nav" aria-label="Legal documents" sx={{ mt: { xs: 2.25, md: 2.5 }, display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: 0.75, overflowX: "auto", pb: 0.5, "&::-webkit-scrollbar": { display: "none" } }}>
            {docs.map((d) => {
              const on = d.slug === doc.slug;

              return (
                <Box key={d.slug} component={Link} href={`/${d.slug}`} aria-current={on ? "page" : undefined} aria-label={d.title} sx={{ flexShrink: 0, px: { xs: 1.25, md: 1.5 }, py: 0.45, borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: { xs: "0.74rem", md: "0.78rem" }, whiteSpace: "nowrap", color: on ? COLORS.navy : "#FFFFFF", bgcolor: on ? COLORS.yellow : "rgba(255,255,255,.08)", border: `1px solid ${on ? COLORS.yellow : "rgba(255,255,255,.22)"}`, transition: "all .2s", "&:hover": { bgcolor: on ? COLORS.yellow : "rgba(255,255,255,.16)" } }}>
                  <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>{d.label}</Box>
                  <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>{SHORT_LABEL[d.slug]}</Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* key points */}
      <Container sx={{ maxWidth: "1120px !important", mt: { xs: -6, md: -7 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: { xs: 1.25, md: 2 } }}>
          {doc.highlights.map((hl, i) => {
            const t = HIGHLIGHT_TONES[i % HIGHLIGHT_TONES.length];

            return (
              <Box key={hl.title} sx={{ display: "flex", gap: 1.5, p: { xs: 1.75, md: 2.25 }, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 14px 34px rgba(15,23,42,.1)" }}>
                <Box sx={{ flexShrink: 0, width: 38, height: 38, borderRadius: "10px", bgcolor: t.bg, color: t.fg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{i + 1}</Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, color: COLORS.navy, fontSize: "0.98rem", lineHeight: 1.3 }}>{hl.title}</Typography>
                  <Typography sx={{ mt: 0.4, color: COLORS.textSecondary, fontSize: "0.86rem", lineHeight: 1.5 }}>{hl.text}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* body */}
      <Container sx={{ maxWidth: "1120px !important", py: { xs: 4, md: 6 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "260px 1fr" }, gap: { xs: 0, md: 6 }, alignItems: "start" }}>
        <LegalToc items={doc.sections.map((s) => ({ id: s.id, title: s.title }))} />

        <Box component="article" sx={{ minWidth: 0, maxWidth: 780 }}>
          {doc.intro.length > 0 && (
            <Box sx={{ mb: 4, pb: 2, borderBottom: `1px solid ${COLORS.border}` }}>
              {doc.intro.map((b, i) => <Block key={i} b={b} />)}
            </Box>
          )}
          {doc.sections.map((s, i) => (
            <Box component="section" key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} sx={{ scrollMarginTop: 96, mb: { xs: 3.5, md: 4.5 } }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.75 }}>
                <Box component="span" sx={{ flexShrink: 0, mt: { xs: "1px", md: "3px" }, px: 1, py: 0.25, borderRadius: "8px", bgcolor: COLORS.navy, color: COLORS.yellow, fontWeight: 800, fontSize: "0.8rem", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</Box>
                <Typography id={`${s.id}-title`} component="h2" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.18rem", md: "1.4rem" }, lineHeight: 1.3 }}>{s.title}</Typography>
              </Box>
              {s.blocks.map((b, k) => <Block key={k} b={b} />)}
            </Box>
          ))}

          {/* help */}
          <Box sx={{ mt: 5, p: { xs: 2.5, md: 3.5 }, borderRadius: "20px", background: `linear-gradient(120deg, ${COLORS.red} 0%, ${COLORS.redDarker} 100%)`, color: "#FFFFFF", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2 }}>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.15rem", md: "1.3rem" }, color: COLORS.yellow }}>Questions about this policy?</Typography>
              <Typography sx={{ mt: 0.5, color: "rgba(255,255,255,.88)", fontSize: "0.95rem" }}>Write to us with your registered mobile number and we&apos;ll get back to you.</Typography>
            </Box>
            <Box component="a" href="mailto:support@groupvini.in" sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 1, px: 2.5, py: 1.25, borderRadius: 999, bgcolor: COLORS.yellow, color: COLORS.navy, fontWeight: 800, textDecoration: "none", "&:hover": { transform: "translateY(-1px)" }, transition: "transform .2s" }}>
              <Mail size={18} /> support@groupvini.in
            </Box>
          </Box>

          {/* related */}
          <Typography sx={{ mt: 5, mb: 1.5, fontWeight: 800, color: COLORS.navy, fontSize: "1.05rem" }}>Related policies</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
            {others.map((o) => {
              const OIcon = DOC_ICON[o.slug] || FileText;

              return (
                <Box key={o.slug} component={Link} href={`/${o.slug}`} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, borderRadius: "14px", border: `1px solid ${COLORS.border}`, textDecoration: "none", transition: "border-color .2s, transform .2s", "&:hover": { borderColor: COLORS.redBorder, transform: "translateY(-2px)" } }}>
                  <Box sx={{ flexShrink: 0, width: 42, height: 42, borderRadius: "12px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}><OIcon size={20} /></Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, color: COLORS.navy }}>{o.title}</Typography>
                    <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem" }}>Updated {fmtDate(o.updated)}</Typography>
                  </Box>
                  <ArrowRight size={18} color={COLORS.red} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </>
  );
}
