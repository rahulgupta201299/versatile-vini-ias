import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Check } from "lucide-react";
import { EthicsLandingContent } from "@/types";
import { COLORS } from "@/theme/colors";

/** "WHY ETHICS FOUNDATION PROGRAM ?" — red title bar, italic intro and pill-shaped points. */
export default function EthicsWhy({ data }: { data: EthicsLandingContent["why"] }) {
  return (
    <Box component="section" id="why-program" sx={{ py: { xs: 4, md: 7 } }}>
      <Container>
        <Box sx={{ maxWidth: 980, mx: "auto" }}>
          <Typography component="h2" sx={{ px: 3, py: { xs: 1.5, md: 2 }, borderRadius: "14px", background: `linear-gradient(90deg, ${COLORS.redDark} 0%, ${COLORS.red} 50%, ${COLORS.redDark} 100%)`, color: "#FFFFFF", textAlign: "center", fontWeight: 900, letterSpacing: ".03em", fontSize: { xs: "1.25rem", md: "1.9rem" }, boxShadow: "0 12px 26px rgba(254,0,52,.25)" }}>
            {data.title}
          </Typography>
          <Typography sx={{ mt: 2.5, textAlign: "center", fontStyle: "italic", fontWeight: 700, color: COLORS.navy, fontSize: { xs: "1rem", md: "1.2rem" } }}>{data.intro}</Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt: { xs: 3, md: 4 }, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: { xs: 1.5, md: 2.5 }, "& > li": { flex: { xs: "0 0 100%", md: "0 0 calc((100% - 20px) / 2)" } } }}>
            {data.points.map((pt) => (
              <Box component="li" key={pt} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", backgroundColor: COLORS.navy, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(19,41,75,.3)" }}>
                  <Check size={18} strokeWidth={3} />
                </Box>
                <Box sx={{ flex: 1, px: { xs: 2, md: 2.5 }, py: { xs: 1.25, md: 1.5 }, borderRadius: "9999px", background: `linear-gradient(90deg, ${COLORS.navy} 0%, ${COLORS.redDark} 100%)`, color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "0.92rem", md: "1rem" }, lineHeight: 1.35 }}>
                  {pt}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
