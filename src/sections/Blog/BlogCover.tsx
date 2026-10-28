import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BlogPost } from "@/types";
import { COLORS } from "@/theme/colors";
import { categoryIcon, coverTone } from "./blogUtils";

type CoverSize = "lg" | "md" | "sm";

type Props = { post: BlogPost; categoryName: string; size?: CoverSize; priority?: boolean };

/** Image `sizes` and the fallback icon size for each cover size. */
const COVER_SIZES: Record<CoverSize, { sizes: string; iconSize: number }> = {
  lg: { sizes: "(max-width: 900px) 100vw, 760px", iconSize: 120 },
  md: { sizes: "(max-width: 600px) 100vw, 400px", iconSize: 72 },
  sm: { sizes: "120px", iconSize: 30 },
};

/** Post image — the real cover when set, otherwise a branded cover (gradient, exam icon, category). */
export default function BlogCover({ post, categoryName, size = "md", priority }: Props) {
  if (post.cover) {
    return <Image src={post.cover} alt={post.title} fill priority={priority} sizes={COVER_SIZES[size].sizes} style={{ objectFit: "cover" }} />;
  }

  const Icon = categoryIcon(post.category);
  const { iconSize } = COVER_SIZES[size];

  return (
    <Box role="img" aria-label={post.title} sx={{ position: "absolute", inset: 0, background: coverTone(post.slug), overflow: "hidden" }}>
      {/* dotted texture + glow */}
      <Box aria-hidden sx={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "radial-gradient(rgba(255,255,255,.7) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
      <Box aria-hidden sx={{ position: "absolute", right: "-12%", top: "-30%", width: "70%", aspectRatio: "1", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.yellow}55 0%, transparent 65%)` }} />
      {/* lead covers carry text at the bottom, so their icon sits top-right */}
      <Box aria-hidden sx={{ position: "absolute", right: size === "sm" ? 6 : "8%", ...(size === "lg" ? { top: "10%" } : { bottom: size === "sm" ? 6 : "10%" }), color: "rgba(255,255,255,.9)", transform: "rotate(-8deg)", "& svg": { width: size === "lg" ? { xs: 64, md: iconSize } : iconSize, height: "auto" } }}>
        <Icon size={iconSize} strokeWidth={1.4} />
      </Box>
      {size !== "sm" && (
        <Typography aria-hidden sx={{ position: "absolute", left: "6%", top: "10%", fontWeight: 900, letterSpacing: ".04em", color: "rgba(255,255,255,.14)", fontSize: size === "lg" ? { xs: "3rem", md: "5rem" } : "2.6rem", lineHeight: 1, textTransform: "uppercase" }}>
          {categoryName}
        </Typography>
      )}
    </Box>
  );
}
