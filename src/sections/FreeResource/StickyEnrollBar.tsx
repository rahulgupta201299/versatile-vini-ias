"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { openAuth } from "@/utils/events";
import { COLORS } from "@/theme/colors";
import { scrollToDetails } from "./FreeResourceHero";
import { externalLinkProps } from "@/utils/links";

type Props = {
  /** Title and price on the left — leave out for a buttons-only bar. */
  title?: string;
  priceLabel?: string;
  isFree?: boolean;
  /** Replace "Course Details · Enroll" with these yellow link buttons (e.g. Monthly Magazine, PRISM Simplified). */
  links?: { label: string; href: string }[];
};

/** Bottom bar (price · Course Details · Enroll, or custom link buttons) that appears once the hero scrolls out of view. */
export default function StickyEnrollBar({
  title,
  priceLabel,
  isFree,
  links,
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("course-top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );
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
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            py: { xs: 1, md: 1.25 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {title && (
              <Typography
                noWrap
                sx={{
                  display: { xs: "none", md: "block" },
                  fontWeight: 700,
                  color: COLORS.ink,
                  fontSize: "0.95rem",
                }}
              >
                {title}
              </Typography>
            )}
            {priceLabel && (
              <Typography
                sx={{
                  fontWeight: 800,
                  color: isFree ? COLORS.success : COLORS.ink,
                  fontSize: { xs: "0.98rem", md: "1.05rem" },
                }}
              >
                {priceLabel}
              </Typography>
            )}
          </Box>
          {links ? (
            links.map((l) => (
              <Box
                key={l.href}
                component={Link}
                href={l.href}
                {...externalLinkProps(l)}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 42,
                  px: { xs: 1.25, md: 2.75 },
                  borderRadius: "10px",
                  backgroundColor: COLORS.yellow,
                  color: COLORS.navy,
                  fontWeight: 800,
                  fontSize: { xs: "0.78rem", md: "0.92rem" },
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "0 6px 14px rgba(242,213,0,.35)",
                  "&:hover": { backgroundColor: COLORS.yellowDark },
                }}
              >
                {l.label}
              </Box>
            ))
          ) : (
            <>
              <Box
                component="button"
                type="button"
                onClick={scrollToDetails}
                sx={{
                  height: 42,
                  px: { xs: 1.75, md: 2.75 },
                  borderRadius: "10px",
                  border: `1.5px solid ${COLORS.ink}`,
                  backgroundColor: "#FFFFFF",
                  color: COLORS.ink,
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: { xs: "0.85rem", md: "0.92rem" },
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Course Details
              </Box>
              <Box
                component="button"
                type="button"
                onClick={openAuth}
                sx={{
                  height: 42,
                  px: { xs: 2.25, md: 3.5 },
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: COLORS.red,
                  color: "#FFFFFF",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: { xs: "0.85rem", md: "0.92rem" },
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  "&:hover": { backgroundColor: COLORS.redDark },
                }}
              >
                Enroll
              </Box>
            </>
          )}
        </Container>
      </Box>
      {/* keeps the footer clear of the bar */}
      <Box aria-hidden sx={{ height: { xs: 64, md: 72 } }} />
    </>
  );
}
