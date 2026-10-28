import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ExamUpdates } from "@/types";
import { COLORS } from "@/theme/colors";

/** "IMPORTANT EXAMS" link grid above the footer — same pink background as the app section. */
export default function ImportantExams({ columns }: { columns: ExamUpdates["importantExams"] }) {
  if (!columns.length) return null;

  return (
    <Box component="section" aria-label="Important exams" sx={{ py: { xs: 4, md: 6 }, background: "linear-gradient(180deg, #FFF3F5 0%, #FFDDE3 100%)" }}>
      <Container>
        <Typography component="h2" sx={{ fontFamily: "inherit", fontWeight: 800, letterSpacing: ".02em", textAlign: "center", fontSize: { xs: "1.3rem", md: "1.6rem" }, color: COLORS.navy }}>
          IMPORTANT EXAMS
        </Typography>
        <Box sx={{ width: 64, height: 4, borderRadius: 2, mx: "auto", mt: 1, mb: { xs: 2.5, md: 3.5 }, background: `linear-gradient(90deg, ${COLORS.yellowDark}, ${COLORS.red})` }} />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))", md: `repeat(${columns.length}, minmax(0, 1fr))` }, columnGap: 3, rowGap: 1.25 }}>
          {columns.map((col, i) => (
            <Box component="ul" key={i} sx={{ listStyle: "none", m: 0, p: 0, display: { xs: "contents", md: "grid" }, gap: 1.25, alignContent: "start" }}>
              {col.map((e) => (
                <Box component="li" key={e.title}>
                  <Box component={Link} href={e.href} sx={{ color: "#3F3F46", textDecoration: "none", fontSize: { xs: "0.88rem", md: "0.95rem" }, "&:hover": { color: COLORS.red, textDecoration: "underline" } }}>
                    {e.title}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
