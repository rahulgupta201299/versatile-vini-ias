import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ChevronDown, Zap } from "lucide-react";
import { CourseCtas } from "@/types";
import { COLORS } from "@/theme/colors";
import CourseCtaButton from "./CourseCtaButton";

/** "Enroll Now · FREE Course · [Course Details] [Enroll]" call-to-action band. */
type EnrollBandProps = {
  priceLabel: string;
  isFree: boolean;
  priceNote?: string;
  ctas?: CourseCtas;
};

export default function EnrollBand({ priceLabel, isFree, priceNote, ctas }: EnrollBandProps) {
  return (
    <Box component="section" sx={{ py: { xs: 4.5, md: 7 }, backgroundColor: COLORS.redTintSoft, textAlign: "center" }}>
      <Container>
        <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, lineHeight: 1.15, color: COLORS.ink, letterSpacing: "-0.02em" }}>
          Enroll Now
        </Typography>
        <Typography sx={{ mt: { xs: 1, md: 1.5 }, fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.7rem" }, lineHeight: 1.15, color: isFree ? COLORS.success : COLORS.heading }}>
          {isFree ? priceLabel : `Price: ${priceLabel}`}
        </Typography>
        {priceNote && <Typography sx={{ mt: 0.5, color: COLORS.muted, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>{priceNote}</Typography>}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mt: { xs: 3, md: 4 } }}>
          <CourseCtaButton
            cta={ctas?.details}
            action="details"
            label="Course Details"
            icon={<ChevronDown size={17} />}
            sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: { xs: 46, md: 52 }, px: { xs: 2.25, md: 3.5 }, borderRadius: "12px", border: `2px solid ${COLORS.ink}`, backgroundColor: "#FFFFFF", color: COLORS.ink, fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.92rem", md: "1.02rem" }, cursor: "pointer", "&:hover": { backgroundColor: COLORS.surface } }}
          />
          <CourseCtaButton
            cta={ctas?.enroll}
            action="enroll"
            label="Enroll"
            icon={<Zap size={16} fill="currentColor" />}
            sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: { xs: 46, md: 52 }, px: { xs: 2.75, md: 3.75 }, borderRadius: "12px", border: "none", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.92rem", md: "1.02rem" }, cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", "&:hover": { backgroundColor: COLORS.redDark } }}
          />
        </Box>
      </Container>
    </Box>
  );
}
