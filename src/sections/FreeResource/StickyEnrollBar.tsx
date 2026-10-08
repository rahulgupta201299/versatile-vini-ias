"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { openAuth } from "@/utils/events";
import { COLORS } from "@/theme/colors";
import { scrollToDetails } from "./FreeResourceHero";

/** Bottom bar (price · Course Details · Enroll) that appears once the hero scrolls out of view. */
export default function StickyEnrollBar({ title, priceLabel, isFree }: { title: string; priceLabel: string; isFree: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("course-top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Box
        role="region"
        aria-label="Enroll"
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1100,
          backgroundColor: "#FFFFFF",
          borderTop: `1px solid ${COLORS.border}`,
          boxShadow: "0 -8px 24px rgba(15,23,42,.08)",
          transform: show ? "translateY(0)" : "translateY(110%)",
          transition: "transform .25s ease",
          pb: "env(safe-area-inset-bottom)",
        }}
      >
        <Container sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 }, py: { xs: 1, md: 1.25 } }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography noWrap sx={{ display: { xs: "none", md: "block" }, fontWeight: 700, color: COLORS.ink, fontSize: "0.95rem" }}>{title}</Typography>
            <Typography sx={{ fontWeight: 800, color: isFree ? COLORS.success : COLORS.ink, fontSize: { xs: "0.98rem", md: "1.05rem" } }}>{priceLabel}</Typography>
          </Box>
          <Box
            component="button"
            type="button"
            onClick={scrollToDetails}
            sx={{ height: 42, px: { xs: 1.75, md: 2.75 }, borderRadius: "10px", border: `1.5px solid ${COLORS.ink}`, backgroundColor: "#FFFFFF", color: COLORS.ink, fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.85rem", md: "0.92rem" }, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            Course Details
          </Box>
          <Box
            component="button"
            type="button"
            onClick={openAuth}
            sx={{ height: 42, px: { xs: 2.25, md: 3.5 }, borderRadius: "10px", border: "none", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.85rem", md: "0.92rem" }, cursor: "pointer", whiteSpace: "nowrap", "&:hover": { backgroundColor: COLORS.redDark } }}
          >
            Enroll
          </Box>
        </Container>
      </Box>
      {/* keeps the footer clear of the bar */}
      <Box aria-hidden sx={{ height: { xs: 64, md: 72 } }} />
    </>
  );
}
