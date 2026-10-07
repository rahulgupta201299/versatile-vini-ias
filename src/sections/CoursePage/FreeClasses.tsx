"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CheckCircle2, Play, ArrowRight, Clock } from "lucide-react";
import { CourseVideo } from "@/types";
import { IMPACT_AVATARS } from "@/data/impact";
import { openAuth } from "@/utils/events";
import { anchorSx, INK, MUTED, RED, RED_DARK, sectionSx, titleSx } from "./theme";

import { COLORS } from "@/theme/colors";
const POINTS = ["Chat live with educators", "Attempt interactive polls", "Get your doubts cleared"];

function VideoCard({ video }: { video: CourseVideo }) {
  const [playing, setPlaying] = useState(false);
  const thumb = video.youtubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : null;

  const media = playing && video.youtubeId ? (
    <Box
      component="iframe"
      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
      title={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  ) : (
    <>
      {thumb ? (
        <Box component="img" src={thumb} alt="" loading="lazy" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        // Branded placeholder until a YouTube id is set for this video
        <Box sx={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #8B1A2B 0%, ${COLORS.red} 60%, #FF6B6B 100%)`, p: 2, display: "flex", alignItems: "flex-end" }}>
          <Typography sx={{ color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.25, maxWidth: "75%", textShadow: "0 2px 8px rgba(0,0,0,.25)" }}>
            {video.title}
          </Typography>
        </Box>
      )}
      <Box
        className="play"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,.25)",
          transition: "transform .2s ease",
        }}
      >
        <Play size={24} color={RED} fill={RED} style={{ marginLeft: 3 }} />
      </Box>
      <Box sx={{ position: "absolute", right: 10, bottom: 10, px: 0.75, py: 0.25, borderRadius: "6px", backgroundColor: "rgba(0,0,0,.7)", color: "#FFFFFF", fontSize: "0.72rem", fontWeight: 600 }}>
        {video.duration}
      </Box>
    </>
  );

  const mediaBox = {
    position: "relative" as const,
    aspectRatio: "16 / 9",
    borderRadius: "14px",
    overflow: "hidden",
    backgroundColor: "#111827",
    display: "block",
    width: "100%",
    border: "none",
    p: 0,
    cursor: "pointer",
    "&:hover .play": { transform: "translate(-50%, -50%) scale(1.08)" },
  };

  return (
    <Box sx={{ minWidth: 0, scrollSnapAlign: "start" }}>
      {video.youtubeId ? (
        <Box component="button" type="button" aria-label={`Play ${video.title}`} onClick={() => setPlaying(true)} sx={mediaBox}>
          {media}
        </Box>
      ) : (
        <Box component="a" href={video.href} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.title} on YouTube`} sx={mediaBox}>
          {media}
        </Box>
      )}
      <Typography sx={{ mt: 1.25, fontWeight: 700, fontSize: "0.95rem", color: INK, lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {video.title}
      </Typography>
      <Typography sx={{ mt: 0.4, fontSize: "0.8rem", color: MUTED, display: "flex", alignItems: "center", gap: 0.5 }}>
        {video.educator} · <Clock size={13} /> {video.duration}
      </Typography>
    </Box>
  );
}

export default function FreeClasses({ videos, channelUrl }: { videos: CourseVideo[]; channelUrl: string }) {
  return (
    <Box component="section" id="free-classes" sx={{ ...anchorSx, ...sectionSx }}>
      <Container>
        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2, mb: { xs: 2, md: 3 } }}>
          <Box>
            <Typography component="h2" sx={titleSx}>
              Watch Free Online Classes
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt: 1.25, display: "flex", flexWrap: "wrap", columnGap: 2.5, rowGap: 0.75 }}>
              {POINTS.map((p) => (
                <Box component="li" key={p} sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: { xs: "0.85rem", md: "0.92rem" }, color: "#374151" }}>
                  <CheckCircle2 size={17} color={COLORS.success} /> {p}
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="a" href={channelUrl} target="_blank" rel="noopener noreferrer" sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 0.5, color: RED, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
            See all <ArrowRight size={16} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridAutoFlow: { xs: "column", md: "row" },
            gridAutoColumns: { xs: "78%", sm: "46%" },
            gridTemplateColumns: { md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 1.5, md: 3 },
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: "x mandatory",
            pb: { xs: 1, md: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {videos.map((v) => (
            <VideoCard key={v.title} video={v} />
          ))}
        </Box>

        {/* Social proof strip */}
        <Box
          sx={{
            mt: { xs: 3, md: 4 },
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, md: 2 },
            p: { xs: 1.5, md: 2 },
            pl: { md: 3 },
            borderRadius: "14px",
            backgroundColor: COLORS.surface,
            border: "1px solid #EEF0F3",
          }}
        >
          <Box sx={{ display: "flex", flexShrink: 0 }}>
            {IMPACT_AVATARS.slice(0, 3).map((a, i) => (
              <Box key={a.src} component="img" src={a.src} alt="" sx={{ width: { xs: 30, md: 36 }, height: { xs: 30, md: 36 }, borderRadius: "50%", border: "2px solid #FFFFFF", ml: i ? -1.25 : 0 }} />
            ))}
          </Box>
          <Typography sx={{ flex: 1, minWidth: 0, fontSize: { xs: "0.82rem", md: "0.95rem" }, color: INK, lineHeight: 1.35 }}>
            <b>4.5K learners</b> watched a class today
          </Typography>
          <Box
            component="button"
            type="button"
            onClick={openAuth}
            sx={{ flexShrink: 0, px: { xs: 2, md: 3 }, height: { xs: 38, md: 42 }, border: "none", borderRadius: "10px", backgroundColor: RED, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.85rem", md: "0.95rem" }, cursor: "pointer", "&:hover": { backgroundColor: RED_DARK } }}
          >
            Join Now
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
