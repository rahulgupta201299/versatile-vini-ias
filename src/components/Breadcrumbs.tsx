"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import { ChevronRight } from "lucide-react";
import { getCourseName } from "@/data/coursePages";

import { COLORS } from "@/theme/colors";
/** Readable label for one route segment: known course / exam name, else "some-page" → "Some Page". */
function labelFor(segment: string) {
  const slug = decodeURIComponent(segment);
  return getCourseName(slug) ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Breadcrumbs built from the current URL — one crumb per nested route level.
 *   /goal/gate                      → Home › Goal › GATE
 *   /gs-foundation/foundation-batch → Home › GS Foundation › Foundation Batch
 */
export default function Breadcrumbs() {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return null;

  const crumbs = [
    { label: "Home", href: "/" },
    ...segments.map((seg, i) => ({ label: labelFor(seg), href: "/" + segments.slice(0, i + 1).join("/") })),
  ];

  return (
    <Box component="nav" aria-label="Breadcrumb">
      <Box component="ol" sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.5, listStyle: "none", m: 0, p: 0, fontSize: "0.78rem", color: COLORS.muted }}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <Box component="li" key={c.href} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {i > 0 && <ChevronRight size={13} aria-hidden />}
              {last ? (
                <Box component="span" aria-current="page" sx={{ color: COLORS.ink, fontWeight: 600 }}>
                  {c.label}
                </Box>
              ) : (
                <Box component={Link} href={c.href} sx={{ color: COLORS.muted, textDecoration: "none", "&:hover": { color: COLORS.red } }}>
                  {c.label}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
