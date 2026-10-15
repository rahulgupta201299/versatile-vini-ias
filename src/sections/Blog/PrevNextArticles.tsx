import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BlogPost } from "@/types";
import { blogPath } from "@/utils/slug";
import { COLORS } from "@/theme/colors";

type Item = Pick<BlogPost, "category" | "slug" | "title"> | undefined;

/** Previous (older) / Next (newer) article links. */
export default function PrevNextArticles({ prev, next }: { prev: Item; next: Item }) {
  if (!prev && !next) return null;
  const cell = (label: string, post: Item, align: "left" | "right") =>
    post ? (
      <Box component={Link} href={blogPath(post)} sx={{ display: "block", textAlign: align, textDecoration: "none", "&:hover .t": { textDecoration: "underline" } }}>
        <Typography sx={{ fontFamily: "inherit", fontSize: { xs: "0.85rem", md: "0.95rem" }, color: COLORS.muted }}>{label}</Typography>
        <Typography className="t" sx={{ mt: 0.5, fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.45, color: COLORS.red }}>{post.title}</Typography>
      </Box>
    ) : (
      <Box />
    );
  return (
    <Box component="nav" aria-label="More articles" sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: { xs: 2, md: 4 }, py: 2.5, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
      {cell("Previous Article", prev, "left")}
      {cell("Next Article", next, "right")}
    </Box>
  );
}
