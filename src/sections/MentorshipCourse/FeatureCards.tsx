import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BadgeCheck } from "lucide-react";
import { MentorshipContent } from "@/types";
import { COLORS } from "@/theme/colors";

const RIBBONS = ["#E11D48", "#4F46E5", "#2563EB", "#38BDF8", "#22C55E", "#0F766E", "#F97316", "#3B82F6"];

/**
 * Features:
 *  - items with text → cards with a title tab on the top border (2 per row)
 *  - title-only items → compact ribbon cards (4 per row on desktop)
 */
export default function FeatureCards({ data, id }: { data: MentorshipContent["features"]; id?: string }) {
  const detailed = data.items.some((i) => i.text);

  return (
    <Box component="section" id={id} sx={{ py: { xs: 4, md: 6 } }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.3rem" }, color: COLORS.ink, mb: { xs: 3, md: 4.5 } }}>
          {data.title}
        </Typography>

        {detailed ? (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, columnGap: { xs: 2, md: 6 }, rowGap: { xs: 4, md: 5 }, maxWidth: 820, mx: "auto" }}>
            {data.items.map((item) => (
              <Box key={item.title} sx={{ position: "relative", pt: 4, pb: 3.5, px: { xs: 2.5, md: 4 }, borderRadius: "14px", border: `2px solid ${COLORS.navy}`, backgroundColor: "#FFFFFF", textAlign: "center", boxShadow: "0 10px 24px rgba(15,23,42,.08)" }}>
                <Box sx={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)", px: 2.25, py: 0.85, borderRadius: "9999px", backgroundColor: COLORS.navy, color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "0.85rem", md: "0.95rem" }, whiteSpace: "nowrap" }}>
                  {item.title}
                </Box>
                <Typography sx={{ fontWeight: 600, color: COLORS.ink, fontSize: { xs: "0.9rem", md: "0.95rem" }, lineHeight: 1.6 }}>{item.text}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: { xs: 1.5, md: 2.5 }, maxWidth: 1000, mx: "auto", "& > *": { flex: { xs: "0 0 calc((100% - 12px) / 2)", sm: "0 0 calc((100% - 24px) / 3)", md: "0 0 calc((100% - 60px) / 4)" } } }}>
            {data.items.map((item, i) => {
              const color = RIBBONS[i % RIBBONS.length];
              return (
                <Box key={item.title} sx={{ position: "relative", pt: 4.5, pb: 3, px: 1.5, borderRadius: "12px", border: `1.5px solid ${color}55`, backgroundColor: "#FFFFFF", textAlign: "center", boxShadow: "0 8px 18px rgba(15,23,42,.06)", transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 14px 28px rgba(15,23,42,.10)" } }}>
                  {/* ribbon */}
                  <Box sx={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", width: 54, height: 30, backgroundColor: color, clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)", display: "flex", alignItems: "flex-start", justifyContent: "center", pt: 0.5, color: "#FFFFFF" }}>
                    <BadgeCheck size={15} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: { xs: "0.8rem", md: "0.88rem" }, lineHeight: 1.4 }}>{item.title}</Typography>
                  <Box aria-hidden sx={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 26, height: 4, borderRadius: 2, backgroundColor: color, opacity: 0.6 }} />
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
