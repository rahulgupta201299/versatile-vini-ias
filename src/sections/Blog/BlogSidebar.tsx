import React from "react";
import Box from "@mui/material/Box";
import { BlogPost } from "@/types";
import { COLORS } from "@/theme/colors";
import SectionTitle from "./SectionTitle";
import { PostRow } from "./PostCards";

type Props = { latest: BlogPost[]; names: Record<string, string> };

/** Sidebar: latest posts (numbered). */
export default function BlogSidebar({ latest, names }: Props) {
  return (
    <Box component="aside" sx={{ display: "grid", gap: 3, alignContent: "start", position: { lg: "sticky" }, top: { lg: 128 } }}>
      <Box sx={{ p: 2.25, borderRadius: "16px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
        <SectionTitle title="Latest News" as="h3" />
        <Box sx={{ "& > article + article": { borderTop: `1px dashed ${COLORS.border}` } }}>
          {latest.map((p, i) => <PostRow key={p.slug} post={p} categoryName={names[p.category] || p.category} index={i} />)}
        </Box>
      </Box>
    </Box>
  );
}
