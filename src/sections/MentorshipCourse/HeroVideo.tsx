"use client";

import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Play } from "lucide-react";
import { MentorshipContent } from "@/types";
import { youtubeVideoId } from "@/utils/links";
import { COLORS } from "@/theme/colors";

type HeroVideoProps = {
  media: MentorshipContent["media"];
  /** Where the poster goes when there is no YouTube video (e.g. the YouTube channel). */
  fallbackHref: string;
};

const posterSx = {
  position: "relative",
  display: "block",
  width: "100%",
  p: 0,
  border: 0,
  borderRadius: "16px",
  overflow: "hidden",
  aspectRatio: "2.9 / 1",
  cursor: "pointer",
  bgcolor: COLORS.navy,
  boxShadow: "0 20px 44px rgba(15,23,42,.18)",
  "&:hover .play, &:focus-visible .play": { transform: "translate(-50%, -50%) scale(1.08)" },
} as const;

/**
 * Hero media: the poster with a play button. A YouTube video plays right here (embedded, starts on click — the
 * player only loads then); any other link opens in a new tab.
 */
export default function HeroVideo({ media, fallbackHref }: HeroVideoProps) {
  const { image, alt, caption, videoUrl = "" } = media;
  const videoId = youtubeVideoId(videoUrl);
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <Box sx={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "16 / 9", bgcolor: "#000", boxShadow: "0 20px 44px rgba(15,23,42,.18)" }}>
        <Box
          component="iframe"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={caption || alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </Box>
    );
  }

  const poster = (
    <>
      <Image src={image} alt={alt} fill sizes="(max-width: 900px) 100vw, 540px" style={{ objectFit: "cover" }} priority />
      <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,.05) 40%, rgba(15,23,42,.6) 100%)" }} />
      <Box className="play" sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: { xs: 56, md: 68 }, height: { xs: 56, md: 68 }, borderRadius: "50%", backgroundColor: COLORS.red, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(254,0,52,.25)", transition: "transform .2s" }}>
        <Play size={26} fill="currentColor" style={{ marginLeft: 3 }} />
      </Box>
      {caption && <Typography sx={{ position: "absolute", left: 16, bottom: 12, color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "0.9rem", md: "1rem" }, textAlign: "left" }}>{caption}</Typography>}
    </>
  );

  if (videoId) {
    return (
      <Box component="button" type="button" onClick={() => setIsPlaying(true)} aria-label={`Play video: ${caption || alt}`} sx={posterSx}>
        {poster}
      </Box>
    );
  }

  return (
    <Box component="a" href={videoUrl || fallbackHref} target="_blank" rel="noopener noreferrer" aria-label={`${caption || "Watch video"} (opens YouTube)`} sx={posterSx}>
      {poster}
    </Box>
  );
}
