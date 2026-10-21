import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowRight, ArrowUpRight, Clock, LayoutGrid } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { Chip, Notice, PageHeader } from "../ui";
import { HOMEPAGE_SECTIONS } from "./homepageSections";

/** Web → Homepage: every sub-section of the live homepage, in page order. Editors are added one section at a time. */
export default function HomepageManager() {
  return (
    <>
      <PageHeader
        eyebrow="Web / Homepage"
        title="Homepage"
        subtitle={`The ${HOMEPAGE_SECTIONS.length} sections of the viniias.com homepage, top to bottom.`}
        actions={
          <Box component="a" href="/" target="_blank" rel="noopener" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 44, px: 2.25, borderRadius: "12px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", color: COLORS.ink, fontWeight: 700, fontSize: "0.92rem", "&:hover": { borderColor: COLORS.redBorder, color: COLORS.red } }}>
            Preview homepage <ArrowUpRight size={16} />
          </Box>
        }
      />

      {/* Editable now */}
      <Box component={Link} href="/admin/web/homepage/all-exams" sx={{ display: "flex", alignItems: "center", gap: 2, p: { xs: 2.25, md: 3 }, mb: 3, borderRadius: "18px", bgcolor: COLORS.navy, color: "#FFFFFF", transition: "transform .2s", "&:hover": { transform: "translateY(-2px)" } }}>
        <Box sx={{ width: 52, height: 52, flexShrink: 0, borderRadius: "14px", bgcolor: COLORS.yellow, color: COLORS.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LayoutGrid size={24} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>All Exams</Typography>
          <Typography sx={{ color: "rgba(255,255,255,.75)", fontSize: "0.88rem" }}>Categories and exams in the header menu, and each exam&apos;s page — banners, free classes, batches, top rankers, about & FAQs.</Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "inline-flex" }, alignItems: "center", gap: 0.75, px: 2, height: 40, borderRadius: "10px", bgcolor: COLORS.red, fontWeight: 700, fontSize: "0.88rem", flexShrink: 0 }}>
          Manage <ArrowRight size={16} />
        </Box>
      </Box>

      <Notice>
        The homepage sections below will get their own editors next. Until then the website keeps showing their current content.
      </Notice>

      <Box component="ol" sx={{ listStyle: "none", display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 2 }}>
        {HOMEPAGE_SECTIONS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Box component="li" key={s.slug} id={s.slug} sx={{ position: "relative", p: 2.5, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: "12px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={21} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: COLORS.muted, fontSize: "0.72rem", fontWeight: 800, letterSpacing: ".08em" }}>SECTION {String(i + 1).padStart(2, "0")}</Typography>
                  <Typography noWrap sx={{ color: COLORS.ink, fontWeight: 800, fontSize: "1rem" }}>{s.title}</Typography>
                </Box>
              </Box>
              <Typography sx={{ mt: 1.5, color: COLORS.textSecondary, fontSize: "0.88rem", lineHeight: 1.5, flex: 1 }}>{s.description}</Typography>
              <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${COLORS.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                <Chip tone="success">Live on site</Chip>
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, color: COLORS.muted, fontSize: "0.8rem", fontWeight: 600 }}>
                  <Clock size={14} /> Editor coming soon
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
