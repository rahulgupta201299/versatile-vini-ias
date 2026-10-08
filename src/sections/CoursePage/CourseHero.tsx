"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HeroSlider from "@/sections/Hero/HeroSlider";
import Breadcrumbs from "@/components/Breadcrumbs";
import { HeroBanner } from "@/types";
import { useSiteData } from "@/context/SiteDataContext";
import { INK, MUTED, RED } from "./theme";

import { COLORS } from "@/theme/colors";
const TABS = [
  { id: "get-started", label: "Get Started" },
  { id: "about-exam", label: "About Exam" },
  { id: "batches", label: "Batches" },
  { id: "store", label: "Store", href: "store" }, // resolved to the server store link below
  { id: "toppers", label: "Toppers" },
];

interface CourseHeroProps {
  name: string;
  tagline: string;
  banners: HeroBanner[];
}

export default function CourseHero({ name, tagline, banners }: CourseHeroProps) {
  const storeHref = useSiteData().navigation.storeHref;
  const [active, setActive] = useState("get-started");

  // Highlight the tab of the section currently in view
  useEffect(() => {
    const sections = TABS.filter((t) => !t.href)
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Breadcrumb + title */}
      <Box sx={{ background: `linear-gradient(180deg, ${COLORS.redTintSoft} 0%, #FFFFFF 100%)`, pt: { xs: 2, md: 3 }, pb: { xs: 1.5, md: 2 } }}>
        <Container>
          <Box sx={{ mb: 1 }}>
            <Breadcrumbs />
          </Box>
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "2.2rem" }, color: INK, lineHeight: 1.2, letterSpacing: "-0.015em" }}>
            {name}
          </Typography>
          <Typography sx={{ color: MUTED, fontSize: { xs: "0.88rem", md: "1rem" }, mt: 0.75, maxWidth: 760 }}>{tagline}</Typography>
        </Container>
      </Box>

      {/* Sticky section tabs */}
      <Box
        sx={{
          position: "sticky",
          top: { xs: 64, lg: 72 },
          zIndex: 1100,
          backgroundColor: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #EEF0F3",
        }}
      >
        <Container>
          <Box
            component="nav"
            aria-label="Page sections"
            sx={{ display: "flex", gap: { xs: 2.5, md: 4 }, overflowX: "auto", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
          >
            {TABS.map((tab) => {
              const selected = active === tab.id;
              return (
                <Box
                  key={tab.id}
                  component={tab.href ? Link : "a"}
                  href={tab.href === "store" ? storeHref : tab.href ?? `#${tab.id}`}
                  onClick={() => !tab.href && setActive(tab.id)}
                  sx={{
                    flexShrink: 0,
                    py: 1.5,
                    fontSize: { xs: "0.88rem", md: "0.95rem" },
                    fontWeight: selected ? 700 : 500,
                    color: selected ? RED : "#374151",
                    textDecoration: "none",
                    borderBottom: `2.5px solid ${selected ? RED : "transparent"}`,
                    transition: "color .15s ease, border-color .15s ease",
                    "&:hover": { color: RED },
                  }}
                >
                  {tab.label}
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      <HeroSlider banners={banners} />
    </>
  );
}
