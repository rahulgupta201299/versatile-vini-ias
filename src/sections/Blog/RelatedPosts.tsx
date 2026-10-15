import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BlogPost } from "@/types";
import { blogPath } from "@/utils/slug";
import { COLORS } from "@/theme/colors";
import BlogCover from "./BlogCover";
import { formatLongDate } from "./blogUtils";

/** Link blue for related titles. */
const TITLE_BLUE = "#1A73E8";

/** "Related Posts" — tab heading on a red rule, then thumbnail + title + "Author | Date" rows. */
export default function RelatedPosts({ posts, names }: { posts: BlogPost[]; names: Record<string, string> }) {
  if (!posts.length) return null;
  return (
    <Box component="section" aria-label="Related posts">
      <Box sx={{ borderBottom: `3px solid ${COLORS.red}`, mb: 1 }}>
        <Typography component="h2" sx={{ display: "inline-block", px: 2, py: 0.75, borderRadius: "8px 8px 0 0", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 600, fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
          Related Posts
        </Typography>
      </Box>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
        {posts.map((p) => (
          <Box component="li" key={`${p.category}/${p.slug}`} sx={{ "& + li": { borderTop: `1px solid ${COLORS.border}` } }}>
            <Box component={Link} href={blogPath(p)} sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2.5 }, py: { xs: 1.75, md: 2 }, textDecoration: "none", "&:hover .t": { color: "#1557B0", textDecoration: "underline" } }}>
              <Box sx={{ position: "relative", flexShrink: 0, width: { xs: 128, md: 200 }, aspectRatio: "16 / 10", borderRadius: "8px", overflow: "hidden" }}>
                <BlogCover post={p} categoryName={names[p.category] ?? p.category} size="sm" />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography className="t" sx={{ fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.98rem", md: "1.15rem" }, lineHeight: 1.35, color: TITLE_BLUE, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {p.title}
                </Typography>
                <Typography sx={{ mt: 0.75, fontFamily: "inherit", fontSize: { xs: "0.82rem", md: "0.92rem" }, color: COLORS.muted }}>
                  {p.author} | {formatLongDate(p.publishedAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
