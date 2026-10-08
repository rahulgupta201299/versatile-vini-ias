import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CheckCircle2 } from "lucide-react";
import { getSiteConfig } from "@/services/site";
import StoreBadges from "@/components/StoreBadges";

import { COLORS } from "@/theme/colors";
/*
 * Layout reference: pw.live "Join 15 Million students on the app today!" banner
 *  - card 1120 × 320, soft vertical gradient, content padding 40 / 48
 *  - title 32px bold, 16px points with 20px icons, store buttons 162 × 48 (gap 24)
 *  - artwork anchored bottom-right (ours pops slightly out of the top of the card)
 */
const TEXT = "#1B2124";
const ACCENT = COLORS.red;

/** Server component — reads the app points from the site config (cached). */
export default async function AppDownloadSection({ title = "Study smarter with the Vini IAS app today!" }: { title?: string }) {
  const APP_POINTS = (await getSiteConfig()).app.points;
  return (
    <Box component="section" id="download" sx={{ pt: { xs: 4, md: 9 }, pb: { xs: 4, md: 5 }, backgroundColor: "#FFFFFF" }}>
      <Container>
        <Box
          sx={{
            position: "relative",
            maxWidth: 1120,
            mx: "auto",
            minHeight: { md: 320 },
            borderRadius: { xs: "12px", md: "8px" },
            background: "linear-gradient(180deg, #FFF3F5 0%, #FFDDE3 100%)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
          }}
        >
          {/* Left content */}
          <Box sx={{ position: "relative", zIndex: 1, px: { xs: 3, md: 6 }, pt: { xs: 3.5, md: 5 }, pb: { xs: 2, md: 5 }, maxWidth: { md: "62%" } }}>
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.08em", mb: 1 }}>
              Learn From Anywhere
            </Typography>
            <Typography component="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 700, lineHeight: 1.3, color: TEXT, mb: 2.5 }}>
              {title}
            </Typography>

            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mb: { xs: 3, md: 4 }, display: "grid", gap: 1.25 }}>
              {APP_POINTS.map((point) => (
                <Box component="li" key={point} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircle2 size={20} color="#FFFFFF" fill={ACCENT} style={{ flexShrink: 0 }} />
                  <Typography sx={{ fontSize: { xs: "0.92rem", md: "1rem" }, color: TEXT }}>{point}</Typography>
                </Box>
              ))}
            </Box>

            <StoreBadges size="md" />
          </Box>

          {/* Right artwork — bottom-anchored, pops out of the card on desktop */}
          <Box
            sx={{
              position: { xs: "relative", md: "absolute" },
              right: { md: 40 },
              bottom: 0,
              alignSelf: { xs: "center", md: "auto" },
              width: { xs: 260, sm: 300, md: 340 },
              aspectRatio: "1204 / 1306",
            }}
          >
            <Image
              src="/images/app/vini-ias-app-mockup-student-v2.png"
              alt="Vini IAS learning app home screen on a phone, next to a student"
              fill
              sizes="(max-width: 600px) 260px, (max-width: 900px) 300px, 340px"
              style={{ objectFit: "contain", objectPosition: "bottom" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
