import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Sparkles, UserCheck } from "lucide-react";
import { FreeResourcePage } from "@/types";
import { COLORS } from "@/theme/colors";
import { CheckList, h2Sx } from "./CourseOverview";

/** "Why should you join" and "Who is it best for" side by side. */
export default function CourseFit({ page }: { page: FreeResourcePage }) {
  const cards = [
    { title: `Why should you join The ${page.title}?`, items: page.whyJoin, icon: Sparkles },
    { title: `Who is The ${page.title} best for?`, items: page.bestFor, icon: UserCheck },
  ];
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 } }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: { xs: 2, md: 3 } }}>
        {cards.map(({ title, items, icon: Icon }) => (
          <Box key={title} sx={{ p: { xs: 2.25, md: 3.5 }, borderRadius: "18px", border: `1px solid ${COLORS.border}`, backgroundColor: "#FFFFFF", boxShadow: "0 10px 28px rgba(15,23,42,.05)" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: "12px", backgroundColor: COLORS.redTint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={20} color={COLORS.red} />
              </Box>
              <Typography component="h2" sx={{ ...h2Sx, fontSize: { xs: "1.08rem", md: "1.3rem" } }}>{title}</Typography>
            </Box>
            <CheckList items={items} />
          </Box>
        ))}
      </Container>
    </Box>
  );
}
