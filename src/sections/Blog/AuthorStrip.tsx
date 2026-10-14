import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BadgeCheck, CalendarDays } from "lucide-react";
import ShareBlog from "./ShareBlog";
import { BlogPost } from "@/types";
import { COLORS } from "@/theme/colors";
import { formatLongDate } from "./blogUtils";

const initials = (name: string) =>
  name
    .replace(/^(Dr|Col|Prof)\.?\s+(\(Retd\.\)\s+)?/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

/** Article details on a soft background: author photo, "By <name>" with a verified tick, publish date/time and a share button. */
export default function AuthorStrip({ post, url }: { post: BlogPost; url: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2 }, p: { xs: 1.5, md: 2 }, borderRadius: "16px", backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
      <Box className="notranslate" translate="no" sx={{ position: "relative", flexShrink: 0, width: { xs: 48, md: 56 }, height: { xs: 48, md: 56 }, borderRadius: "50%", overflow: "hidden", backgroundColor: COLORS.navy, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: { xs: "1rem", md: "1.15rem" }, boxShadow: `0 0 0 3px #FFFFFF, 0 0 0 4px ${COLORS.redBorder}` }}>
        {post.authorImage ? <Image src={post.authorImage} alt={post.author} fill sizes="56px" style={{ objectFit: "cover" }} /> : initials(post.author)}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 0.75, fontFamily: "inherit", fontWeight: 600, fontSize: "1rem", color: "#27272A", lineHeight: 1.4 }}>
          <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>By {post.author}</Box>
          <BadgeCheck size={18} color="#FFFFFF" fill="#1D9BF0" aria-label="Verified author" style={{ flexShrink: 0 }} />
        </Typography>
        <Box sx={{ mt: 0.5, display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 1.5, rowGap: 0.25, fontSize: { xs: "0.8rem", sm: "0.875rem" }, color: "#52525B" }}>
          <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.6 }}>
            <CalendarDays size={15} style={{ flexShrink: 0 }} /> <time dateTime={post.publishedAt} style={{ whiteSpace: "nowrap" }}>{formatLongDate(post.publishedAt)}</time>
          </Box>
        </Box>
      </Box>
      <ShareBlog title={post.title} url={url} id={post.slug} />
    </Box>
  );
}
