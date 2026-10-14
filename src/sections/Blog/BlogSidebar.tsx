import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Smartphone } from "lucide-react";
import { BlogCategory, BlogPost } from "@/types";
import { COLORS } from "@/theme/colors";
import { PLAY_STORE_URL } from "@/data/app";
import SectionTitle from "./SectionTitle";
import { PostRow } from "./PostCards";
import { categoryIcon } from "./blogUtils";

type Props = { latest: BlogPost[]; categories: BlogCategory[]; counts: Record<string, number>; names: Record<string, string> };

/** Sidebar: latest posts (numbered), app download card, categories with counts. */
export default function BlogSidebar({ latest, categories, counts, names }: Props) {
  return (
    <Box component="aside" sx={{ display: "grid", gap: 3, alignContent: "start", position: { lg: "sticky" }, top: { lg: 128 } }}>
      <Box sx={{ p: 2.25, borderRadius: "16px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
        <SectionTitle title="Latest News" as="h3" />
        <Box sx={{ "& > article + article": { borderTop: `1px dashed ${COLORS.border}` } }}>
          {latest.map((p, i) => <PostRow key={p.slug} post={p} categoryName={names[p.category] ?? p.category} index={i} />)}
        </Box>
      </Box>

      <Box sx={{ p: 2.5, borderRadius: "16px", background: `linear-gradient(120deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, color: "#FFFFFF", position: "relative", overflow: "hidden" }}>
        <Box aria-hidden sx={{ position: "absolute", right: -30, top: -30, width: 130, height: 130, borderRadius: "50%", backgroundColor: "rgba(255,229,31,.12)" }} />
        <Box sx={{ width: 44, height: 44, borderRadius: "12px", backgroundColor: COLORS.yellow, color: COLORS.navyDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Smartphone size={22} />
        </Box>
        <Typography sx={{ mt: 1.5, fontWeight: 900, fontSize: "1.15rem" }}>
          Get daily updates on the <Box component="span" sx={{ color: COLORS.yellow }}>Vini IAS app</Box>
        </Typography>
        <Typography sx={{ mt: 0.75, fontSize: "0.85rem", color: "rgba(255,255,255,.8)", lineHeight: 1.6 }}>Free classes, current affairs, quizzes and exam alerts — all in one place.</Typography>
        <Box component="a" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" sx={{ mt: 2, display: "inline-flex", alignItems: "center", height: 42, px: 2.5, borderRadius: "10px", backgroundColor: COLORS.red, color: "#FFFFFF", fontWeight: 800, fontSize: "0.88rem", textDecoration: "none", "&:hover": { backgroundColor: COLORS.redDark } }}>
          Download the App
        </Box>
      </Box>

      <Box sx={{ p: 2.25, borderRadius: "16px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
        <SectionTitle title="Exam Categories" as="h3" />
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 0.5 }}>
          {categories.map((c) => {
            const Icon = categoryIcon(c.slug);
            return (
              <Box component="li" key={c.slug}>
                <Box component={Link} href={`/exams/${c.slug}`} sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 1, py: 0.9, borderRadius: "10px", color: COLORS.navy, textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", "&:hover": { backgroundColor: COLORS.redTint, color: COLORS.red } }}>
                  <Box sx={{ width: 30, height: 30, borderRadius: "8px", backgroundColor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} />
                  </Box>
                  <Box component="span" sx={{ flex: 1 }}>{c.name}</Box>
                  <Box component="span" sx={{ minWidth: 26, height: 22, px: 0.75, borderRadius: "9999px", backgroundColor: COLORS.surface, color: COLORS.muted, fontSize: "0.72rem", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{counts[c.slug] ?? 0}</Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
