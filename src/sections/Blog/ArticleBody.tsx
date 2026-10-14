import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Quote } from "lucide-react";
import { BlogBlock } from "@/types";
import { COLORS } from "@/theme/colors";
import { slugify } from "@/utils/slug";

/** H2 headings → table-of-contents entries (ids match the rendered headings). */
export const headingsOf = (blocks: BlogBlock[]) => blocks.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2").map((b) => ({ id: slugify(b.text), text: b.text }));

/** Renders article blocks (paragraphs, headings, lists, quotes). */
export default function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <Box sx={{ display: "grid", gap: 2, color: "#27272A", fontSize: "1rem", lineHeight: 1.75 }}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <Typography key={i} id={slugify(b.text)} component="h2" sx={{ mt: 1.5, scrollMarginTop: { xs: 200, lg: 210 }, fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "1.25rem", md: "1.5rem" }, color: "#27272A", lineHeight: 1.5, pl: 1.5, borderLeft: `4px solid ${COLORS.red}` }}>
                {b.text}
              </Typography>
            );
          case "ul":
            return (
              <Box key={i} component="ul" sx={{ m: 0, pl: 0, listStyle: "none", display: "grid", gap: 1 }}>
                {b.items.map((it) => (
                  <Box component="li" key={it} sx={{ display: "flex", gap: 1.25 }}>
                    <Box component="span" sx={{ flexShrink: 0, mt: "0.7em", width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.red }} />
                    {it}
                  </Box>
                ))}
              </Box>
            );
          case "quote":
            return (
              <Box key={i} component="blockquote" sx={{ m: 0, p: { xs: 2, md: 2.5 }, borderRadius: "14px", backgroundColor: COLORS.redTintSoft, border: `1px solid ${COLORS.redBorder}`, display: "flex", gap: 1.5, color: "#27272A", fontWeight: 600, fontStyle: "italic" }}>
                <Quote size={26} color={COLORS.red} style={{ flexShrink: 0 }} />
                {b.text}
              </Box>
            );
          default:
            return <Typography key={i} sx={{ fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit", color: "inherit" }}>{b.text}</Typography>;
        }
      })}
    </Box>
  );
}
