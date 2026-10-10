"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CalendarDays, ExternalLink, Play, Zap } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FreeResourcePage, MentorshipContent } from "@/types";
import { openAuth } from "@/utils/events";
import { useSiteData } from "@/context/SiteDataContext";
import { COLORS } from "@/theme/colors";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/** Title + swoosh, description / price / date / buttons, and a media card (no educator photos). */
export default function MentorshipHero({ page, data }: { page: FreeResourcePage; data: MentorshipContent }) {
  const youtube = useSiteData().config.social.youtube;
  const videoHref = data.media.videoUrl ?? youtube;

  return (
    <Box component="section" id="course-top" sx={{ pt: { xs: 1.5, md: 2 }, pb: { xs: 3.5, md: 5 }, background: `linear-gradient(180deg, ${COLORS.redTintSoft} 0%, #FFFFFF 100%)` }}>
      <Container>
        <Breadcrumbs />

        <Box sx={{ textAlign: "center", mt: { xs: 2, md: 3 }, mb: { xs: 3, md: 4.5 } }}>
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", sm: "1.95rem", md: "2.45rem" }, lineHeight: 1.25, color: COLORS.navy, maxWidth: 980, mx: "auto" }}>
            {page.title}
          </Typography>
          <Box component="svg" viewBox="0 0 300 14" aria-hidden sx={{ display: "block", mx: "auto", mt: 1, width: { xs: 180, md: 300 }, height: "auto" }}>
            <path d="M4 10 C 80 2, 200 2, 296 8" stroke={COLORS.red} strokeWidth="5" strokeLinecap="round" fill="none" />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" }, gap: { xs: 3, md: 6 }, alignItems: "center" }}>
          <Box>
            {data.lead && <Typography sx={{ mb: 1, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.05rem", md: "1.2rem" } }}>{data.lead}</Typography>}
            <Typography sx={{ color: COLORS.body, fontSize: { xs: "0.95rem", md: "1.02rem" }, lineHeight: 1.75 }}>{page.summary}</Typography>

            {!data.hideHeroPrice && (
              <Box sx={{ mt: { xs: 2, md: 2.5 } }}>
                <Typography component="span" sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.85rem" }, color: page.isFree ? COLORS.success : COLORS.ink, lineHeight: 1.1 }}>{page.priceLabel}</Typography>
                {data.priceNote?.startsWith("+") ? (
                  <Typography component="span" sx={{ ml: 0.75, fontSize: "0.85rem", color: COLORS.muted }}>{data.priceNote}</Typography>
                ) : (
                  data.priceNote && <Typography sx={{ mt: 0.25, fontSize: "0.78rem", color: COLORS.muted }}>{data.priceNote}</Typography>
                )}
              </Box>
            )}

            <Box sx={{ mt: 1.5, display: "inline-flex", alignItems: "center", gap: 1, color: COLORS.redDark, fontWeight: 700, fontSize: { xs: "0.9rem", md: "0.98rem" } }}>
              <CalendarDays size={18} /> {page.startInfo}
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: { xs: 2.5, md: 3 }, "& > button": { flex: { xs: 1, sm: "0 0 auto" }, justifyContent: "center" } }}>
              <Box
                component="button"
                type="button"
                onClick={() => scrollTo("course-details")}
                sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: 48, px: { xs: 1.5, sm: 3 }, borderRadius: "12px", border: `1.5px solid ${COLORS.ink}`, backgroundColor: "#FFFFFF", color: COLORS.ink, fontFamily: "inherit", fontWeight: 700, fontSize: "0.98rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.surface } }}
              >
                Course Details <ExternalLink size={16} />
              </Box>
              <Box
                component="button"
                type="button"
                onClick={data.primaryCta ? () => scrollTo(data.primaryCta!.targetId) : openAuth}
                sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: 48, px: { xs: 1.5, sm: 3.5 }, borderRadius: "12px", border: "none", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.98rem", cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", "&:hover": { backgroundColor: COLORS.redDark } }}
              >
                {data.primaryCta?.label ?? "Enroll Now"} <Zap size={16} fill="currentColor" />
              </Box>
              {data.secondaryLink && (
                <Box
                  component={Link}
                  href={data.secondaryLink.href}
                  sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, height: 48, px: 3, flex: { xs: "1 1 100%", sm: "0 0 auto" }, borderRadius: "12px", border: `1.5px solid ${COLORS.red}`, backgroundColor: COLORS.redTint, color: COLORS.red, fontWeight: 700, fontSize: "0.98rem", textDecoration: "none", "&:hover": { backgroundColor: COLORS.redTintHover } }}
                >
                  {data.secondaryLink.label}
                </Box>
              )}
            </Box>
          </Box>

          {/* media */}
          <Box sx={{ position: "relative" }}>
            {data.batchLabel && (
              <Box sx={{ position: "absolute", top: -14, right: 16, zIndex: 2, px: 1.5, py: 0.5, borderRadius: "8px", backgroundColor: COLORS.navy, color: "#FFFFFF", fontSize: "0.78rem", fontWeight: 800 }}>{data.batchLabel}</Box>
            )}
            <Box
              component="a"
              href={videoHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.media.caption ?? "Watch video"} (opens YouTube)`}
              sx={{ position: "relative", display: "block", borderRadius: "16px", overflow: "hidden", aspectRatio: "2.9 / 1", boxShadow: "0 20px 44px rgba(15,23,42,.18)", "&:hover .play": { transform: "translate(-50%, -50%) scale(1.08)" } }}
            >
              <Image src={data.media.image} alt={data.media.alt} fill sizes="(max-width: 900px) 100vw, 540px" style={{ objectFit: "cover" }} priority />
              <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,.05) 40%, rgba(15,23,42,.6) 100%)" }} />
              <Box className="play" sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: { xs: 56, md: 68 }, height: { xs: 56, md: 68 }, borderRadius: "50%", backgroundColor: COLORS.red, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(254,0,52,.25)", transition: "transform .2s" }}>
                <Play size={26} fill="currentColor" style={{ marginLeft: 3 }} />
              </Box>
              {data.media.caption && (
                <Typography sx={{ position: "absolute", left: 16, bottom: 12, color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "0.9rem", md: "1rem" } }}>{data.media.caption}</Typography>
              )}
            </Box>

            {data.offer && (
              <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, px: { xs: 1.5, md: 2 }, py: 1.25, borderRadius: "12px", backgroundColor: "#FFF8E1", border: `1.5px solid ${COLORS.yellowDark}`, boxShadow: "0 0 18px rgba(255,229,31,.45)" }}>
                <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>{data.offer.text}</Typography>
                <Box
                  component="button"
                  type="button"
                  onClick={() => scrollTo("callback")}
                  sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 38, px: 2, border: "none", borderRadius: "8px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {data.offer.ctaLabel} <ExternalLink size={14} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
