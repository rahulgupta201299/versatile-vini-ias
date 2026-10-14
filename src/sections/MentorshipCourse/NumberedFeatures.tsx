import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Check } from "lucide-react";
import { MentorshipContent } from "@/types";
import { COLORS } from "@/theme/colors";

/** "— COURSE FEATURES — Why This Course Stands Apart": numbered cards (01, 02 …) with tick lists. */
export default function NumberedFeatures({ data, id }: { data: MentorshipContent["features"]; id?: string }) {
  return (
    <Box component="section" id={id} sx={{ py: { xs: 4, md: 7 }, backgroundColor: COLORS.surface }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}>
          {data.eyebrow && (
            <Typography sx={{ fontWeight: 800, letterSpacing: ".14em", fontSize: { xs: "0.72rem", md: "0.8rem" }, color: COLORS.red }}>— {data.eyebrow} —</Typography>
          )}
          <Typography component="h2" sx={{ mt: 0.75, fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.3rem" }, color: COLORS.navy, lineHeight: 1.2 }}>
            {data.title}
          </Typography>
          {data.subtitle && <Typography sx={{ mt: 1, color: COLORS.muted, fontSize: { xs: "0.92rem", md: "1rem" } }}>{data.subtitle}</Typography>}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 2, md: 3 },
            "& > *": { flex: { xs: "0 0 100%", sm: "0 0 calc((100% - 16px) / 2)", md: "0 0 calc((100% - 48px) / 3)" } },
          }}
        >
          {data.items.map((item, i) => (
            <Box
              key={item.title}
              sx={{
                position: "relative",
                overflow: "hidden",
                p: { xs: 2.5, md: 3 },
                borderRadius: "18px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 12px 28px rgba(15,23,42,.06)",
                transition: "transform .2s, box-shadow .2s, border-color .2s",
                "&::before": { content: '""', position: "absolute", left: 0, top: 0, bottom: 0, width: 5, backgroundColor: i % 2 ? COLORS.navy : COLORS.red },
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 18px 36px rgba(15,23,42,.12)", borderColor: COLORS.redBorder },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Typography component="span" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.4rem" }, lineHeight: 1, color: "transparent", WebkitTextStroke: `1.5px ${i % 2 ? COLORS.navy : COLORS.red}` }}>
                  {String(i + 1).padStart(2, "0")}
                </Typography>
                <Box>
                  <Typography component="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.02rem", md: "1.1rem" }, color: COLORS.navy, lineHeight: 1.3 }}>{item.title}</Typography>
                  {item.tagline && <Typography sx={{ mt: 0.4, fontSize: "0.85rem", fontStyle: "italic", color: COLORS.redDark, fontWeight: 600 }}>{item.tagline}</Typography>}
                </Box>
              </Box>
              {item.text && <Typography sx={{ mt: 1.5, color: COLORS.body, fontSize: "0.92rem", lineHeight: 1.6 }}>{item.text}</Typography>}
              {item.points && (
                <Box component="ul" sx={{ listStyle: "none", m: 0, mt: 1.75, p: 0, display: "grid", gap: 1 }}>
                  {item.points.map((pt) => (
                    <Box component="li" key={pt} sx={{ display: "flex", gap: 1, alignItems: "flex-start", fontSize: { xs: "0.88rem", md: "0.92rem" }, color: COLORS.body, lineHeight: 1.5 }}>
                      <Box component="span" sx={{ flexShrink: 0, mt: "2px", width: 18, height: 18, borderRadius: "50%", backgroundColor: COLORS.redTint, color: COLORS.red, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={12} strokeWidth={3} />
                      </Box>
                      {pt}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
