import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MentorshipContent } from "@/types";
import { COLORS } from "@/theme/colors";

type Facts = NonNullable<MentorshipContent["facts"]>;

/** "Course Details" — language, validity, fee, PDF access … as fact tiles. */
export default function CourseFacts({ data }: { data: Facts }) {
  return (
    <Box component="section" sx={{ py: { xs: 3, md: 4 } }}>
      <Container>
        <Box sx={{ maxWidth: 1040, mx: "auto", borderRadius: "20px", overflow: "hidden", border: `1px solid ${COLORS.border}`, boxShadow: "0 12px 30px rgba(15,23,42,.06)", backgroundColor: "#FFFFFF" }}>
          <Typography component="h2" sx={{ px: { xs: 2, md: 3 }, py: 1.5, backgroundColor: COLORS.navy, color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "1.05rem", md: "1.2rem" } }}>
            {data.title}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: `repeat(${data.items.length}, minmax(0, 1fr))` } }}>
            {data.items.map((f, i) => (
              <Box key={f.label} sx={{ p: { xs: 2, md: 2.5 }, textAlign: "center", borderRight: { md: i < data.items.length - 1 ? `1px solid ${COLORS.border}` : "none" }, borderBottom: { xs: `1px solid ${COLORS.border}`, md: "none" } }}>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: COLORS.muted }}>{f.label}</Typography>
                <Typography sx={{ mt: 0.5, fontWeight: 900, fontSize: { xs: "1.15rem", md: "1.35rem" }, color: COLORS.red, lineHeight: 1.2 }}>{f.value}</Typography>
                {f.note && <Typography sx={{ mt: 0.25, fontSize: "0.8rem", color: COLORS.body }}>{f.note}</Typography>}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
