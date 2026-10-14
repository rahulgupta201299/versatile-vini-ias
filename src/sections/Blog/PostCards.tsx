import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BlogPost } from "@/types";
import { blogPath } from "@/utils/slug";
import { COLORS } from "@/theme/colors";
import BlogCover from "./BlogCover";
import CategoryTag from "./CategoryTag";
import PostMeta from "./PostMeta";

type CardProps = { post: BlogPost; categoryName: string };

/** Title link that makes the whole card clickable (the category tag stays its own link). */
const stretched = { color: "inherit", textDecoration: "none", "&::after": { content: '""', position: "absolute", inset: 0, zIndex: 1 } } as const;

/** Big lead story — image with the title on a dark gradient. */
export function FeaturedPost({ post, categoryName }: CardProps) {
  return (
    <Box component="article" sx={{ position: "relative", borderRadius: "18px", overflow: "hidden", aspectRatio: { xs: "4 / 3", sm: "16 / 10", md: "auto" }, height: { md: "100%" }, minHeight: { md: 400 }, boxShadow: "0 18px 40px rgba(15,23,42,.14)", "&:hover .zoom": { transform: "scale(1.04)" } }}>
      <Box className="zoom" sx={{ position: "absolute", inset: 0, transition: "transform .5s ease" }}>
        <BlogCover post={post} categoryName={categoryName} size="lg" priority />
      </Box>
      <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,28,54,0) 30%, rgba(12,28,54,.92) 100%)" }} />
      <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, p: { xs: 2, md: 3 } }}>
        <CategoryTag slug={post.category} name={categoryName} onDark />
        <Typography component="h2" sx={{ mt: 1, fontWeight: 900, color: "#FFFFFF", fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.9rem" }, lineHeight: 1.25 }}>
          <Box component={Link} href={blogPath(post)} sx={stretched}>{post.title}</Box>
        </Typography>
        <Typography sx={{ mt: 1, display: { xs: "none", sm: "-webkit-box" }, WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", color: "rgba(255,255,255,.85)", fontSize: "0.92rem", lineHeight: 1.6 }}>{post.excerpt}</Typography>
        <Box sx={{ mt: 1.25 }}>
          <PostMeta post={post} withAuthor onDark />
        </Box>
      </Box>
    </Box>
  );
}

/** Compact row — thumbnail + title + date. */
export function PostRow({ post, categoryName, index }: CardProps & { index?: number }) {
  return (
    <Box component="article" sx={{ position: "relative", display: "flex", gap: 1.5, alignItems: "center", py: 1.25, "&:hover h3": { color: COLORS.red } }}>
      {index !== undefined && (
        <Typography aria-hidden sx={{ flexShrink: 0, width: 22, fontWeight: 900, fontSize: "1.4rem", lineHeight: 1, color: index < 3 ? COLORS.red : COLORS.disabled }}>{index + 1}</Typography>
      )}
      <Box sx={{ position: "relative", flexShrink: 0, width: index !== undefined ? 76 : { xs: 96, md: 108 }, aspectRatio: "4 / 3", borderRadius: "10px", overflow: "hidden" }}>
        <BlogCover post={post} categoryName={categoryName} size="sm" />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", color: COLORS.red }}>{categoryName}</Typography>
        <Typography component="h3" sx={{ mt: 0.25, fontWeight: 800, fontSize: "0.92rem", lineHeight: 1.35, color: COLORS.navy, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", transition: "color .15s" }}>
          <Box component={Link} href={blogPath(post)} sx={stretched}>{post.title}</Box>
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <PostMeta post={post} />
        </Box>
      </Box>
    </Box>
  );
}

/** Grid card — cover on top, category, title, excerpt, meta. */
export function PostCard({ post, categoryName }: CardProps) {
  return (
    <Box component="article" sx={{ position: "relative", display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 8px 22px rgba(15,23,42,.05)", transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 16px 32px rgba(15,23,42,.1)" }, "&:hover h3": { color: COLORS.red } }}>
      <Box sx={{ position: "relative", aspectRatio: "16 / 9" }}>
        <BlogCover post={post} categoryName={categoryName} />
        <Box sx={{ position: "absolute", left: 12, top: 12, zIndex: 2 }}>
          <CategoryTag slug={post.category} name={categoryName} onDark />
        </Box>
      </Box>
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 0.75, flex: 1 }}>
        <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.02rem", lineHeight: 1.35, color: COLORS.navy, transition: "color .15s" }}>
          <Box component={Link} href={blogPath(post)} sx={stretched}>{post.title}</Box>
        </Typography>
        <Typography sx={{ fontSize: "0.86rem", lineHeight: 1.6, color: COLORS.body, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</Typography>
        <Box sx={{ mt: "auto", pt: 0.5 }}>
          <PostMeta post={post} />
        </Box>
      </Box>
    </Box>
  );
}
