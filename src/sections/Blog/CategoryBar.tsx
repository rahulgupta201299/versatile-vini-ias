"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { LayoutGrid } from "lucide-react";
import { BlogCategory } from "@/types";
import { COLORS } from "@/theme/colors";
import { categoryIcon } from "./blogUtils";

/** Exam categories under the header — sticky, scrolls sideways on small screens, active tab highlighted. */
export default function CategoryBar({ categories }: { categories: BlogCategory[] }) {
  const pathname = usePathname();
  const active = pathname.split("/")[2] ?? "";
  const rowRef = useRef<HTMLDivElement>(null);

  // keep the active tab in view on phones
  useEffect(() => {
    rowRef.current?.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active]);

  const items = [{ slug: "", name: "All Exams" }, ...categories];
  return (
    <Box component="nav" aria-label="Exam categories" sx={{ position: "sticky", top: { xs: 64, lg: 72 }, zIndex: 1100, backgroundColor: "#FFFFFF", borderBottom: `1px solid ${COLORS.border}`, boxShadow: "0 4px 12px rgba(15,23,42,.04)" }}>
      <Container>
        <Box
          ref={rowRef}
          sx={{ display: "flex", gap: { xs: 0.25, md: 0.5 }, py: 0.75, overflowX: "auto", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" }, maskImage: { xs: "linear-gradient(90deg, #000 90%, transparent)", lg: "none" } }}
        >
          {items.map((c) => {
            const isActive = c.slug === active;
            const Icon = c.slug ? categoryIcon(c.slug) : LayoutGrid;
            return (
              <Box
                key={c.slug || "all"}
                component={Link}
                href={c.slug ? `/exams/${c.slug}` : "/exams"}
                aria-current={isActive ? "page" : undefined}
                sx={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.6,
                  height: 30,
                  px: 1.25,
                  borderRadius: "9999px",
                  border: `1px solid ${isActive ? COLORS.redBorder : "transparent"}`,
                  backgroundColor: isActive ? COLORS.redTint : "transparent",
                  color: isActive ? COLORS.red : COLORS.navy,
                  fontWeight: 600,
                  fontSize: { xs: "0.82rem", md: "0.875rem" },
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background-color .15s, color .15s",
                  "&:hover": isActive ? {} : { backgroundColor: COLORS.redTint, color: COLORS.red },
                }}
              >
                <Icon size={14} />
                {c.name}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
