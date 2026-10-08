import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BarChart3, BookOpen, CheckCircle2, ClipboardCheck, Clock, Compass, Layers, Library, PenLine, RotateCcw, ShieldAlert, Target, Video } from "lucide-react";
import { FreeResourceLearnItem, FreeResourcePage } from "@/types";
import { COLORS } from "@/theme/colors";

const ICONS: Record<FreeResourceLearnItem["icon"], React.ElementType> = { BarChart3, BookOpen, ClipboardCheck, Clock, Compass, Layers, Library, PenLine, RotateCcw, ShieldAlert, Target, Video };
const TINTS = [
  { color: COLORS.red, bg: COLORS.redTint },
  { color: "#2563EB", bg: "#EFF6FF" },
  { color: "#CA8A04", bg: "#FEFCE8" },
  { color: COLORS.success, bg: "#F0FDF4" },
  { color: "#7C3AED", bg: "#F5F3FF" },
  { color: "#EA580C", bg: "#FFF7ED" },
];

export const h2Sx = { fontWeight: 800, fontSize: { xs: "1.25rem", md: "1.6rem" }, lineHeight: 1.3, color: COLORS.ink, letterSpacing: "-0.01em" };

export function CheckList({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "grid", gap: 1.25 }}>
      {items.map((t) => (
        <Box component="li" key={t} sx={{ display: "flex", gap: 1.25, alignItems: "flex-start", color: COLORS.body, fontSize: { xs: "0.92rem", md: "1rem" }, lineHeight: 1.6 }}>
          <CheckCircle2 size={19} color={COLORS.red} style={{ flexShrink: 0, marginTop: 3 }} />
          {t}
        </Box>
      ))}
    </Box>
  );
}

/** Guide text, "What is …" and "What will you learn" cards. */
export default function CourseOverview({ page }: { page: FreeResourcePage }) {
  return (
    <Box component="section" id="course-details" sx={{ py: { xs: 4, md: 6 } }}>
      <Container sx={{ display: "grid", gap: { xs: 4, md: 5 } }}>
        <Box>
          <Typography component="h2" sx={h2Sx}>{page.guide.heading}</Typography>
          <Typography sx={{ mt: 1.25, color: COLORS.body, fontSize: { xs: "0.95rem", md: "1.02rem" }, lineHeight: 1.8 }}>{page.guide.text}</Typography>
        </Box>

        <Box sx={{ p: { xs: 2.25, md: 3.5 }, borderRadius: "18px", backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <Typography component="h2" sx={{ ...h2Sx, mb: 2 }}>What is The {page.title}?</Typography>
          <CheckList items={page.whatIs} />
        </Box>

        <Box>
          <Typography component="h2" sx={{ ...h2Sx, mb: { xs: 2, md: 2.5 } }}>What will you learn from The {page.title}?</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 1.25, md: 2 } }}>
            {page.learn.map((item, i) => {
              const Icon = ICONS[item.icon];
              const tint = TINTS[i % TINTS.length];
              return (
                <Box
                  key={item.title}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 1.25, sm: 1.75 },
                    p: { xs: 1.75, md: 2.25 },
                    borderRadius: "14px",
                    border: `1.5px solid ${tint.bg}`,
                    borderTop: `3px solid ${tint.color}`,
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 6px 18px rgba(15,23,42,.05)",
                  }}
                >
                  <Box sx={{ width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 }, borderRadius: "12px", backgroundColor: tint.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, "& svg": { width: { xs: 20, md: 24 }, height: { xs: 20, md: 24 } } }}>
                    <Icon color={tint.color} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: { xs: "0.88rem", md: "1rem" }, lineHeight: 1.35 }}>{item.title}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
