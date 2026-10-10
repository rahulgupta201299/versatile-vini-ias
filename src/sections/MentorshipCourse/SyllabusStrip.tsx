import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Download } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** "UPSC Mains Topic-Wise Syllabus — DOWNLOAD HERE" strip. */
export default function SyllabusStrip({ title, url }: { title: string; url: string }) {
  return (
    <Box component="section" sx={{ py: { xs: 2, md: 3 } }}>
      <Container>
        <Box sx={{ mx: "auto", maxWidth: 620, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", gap: 1.5, p: { xs: 2, md: 2.25 }, pl: { sm: 3 }, borderRadius: "14px", border: `1.5px solid ${COLORS.navy}`, backgroundColor: "#F5F8FF", textAlign: { xs: "center", sm: "left" } }}>
          <Typography sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "0.98rem", md: "1.05rem" } }}>{title}</Typography>
          <Box component="a" href={url} sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: 46, px: 3, borderRadius: "10px", backgroundColor: COLORS.navy, color: "#FFFFFF", fontWeight: 800, fontSize: "0.9rem", textDecoration: "none", whiteSpace: "nowrap", "&:hover": { backgroundColor: COLORS.navyDark } }}>
            <Download size={17} /> DOWNLOAD HERE
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
