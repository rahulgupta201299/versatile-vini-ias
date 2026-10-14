import React from "react";
import Box from "@mui/material/Box";
import { CalendarDays, Clock } from "lucide-react";
import { BlogPost } from "@/types";
import { COLORS } from "@/theme/colors";
import { formatDate } from "./blogUtils";

/** Date · read time (· author). */
export default function PostMeta({ post, withAuthor, onDark }: { post: BlogPost; withAuthor?: boolean; onDark?: boolean }) {
  const color = onDark ? "rgba(255,255,255,.85)" : COLORS.muted;
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 1.25, rowGap: 0.25, fontSize: "0.76rem", color }}>
      {withAuthor && <Box component="span" sx={{ fontWeight: 700, color: onDark ? "#FFFFFF" : COLORS.navy }}>{post.author}</Box>}
      <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
        <CalendarDays size={13} /> <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </Box>
      <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
        <Clock size={13} /> {post.readMinutes} min read
      </Box>
    </Box>
  );
}
