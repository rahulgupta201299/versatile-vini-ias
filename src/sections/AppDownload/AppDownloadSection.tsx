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
 *  - card 1120 × 320, soft vertical gradient, content padding 48
 *  - title 32px bold, 17px points (34px apart) with 24px icons, store buttons 162 × 48 (gap 24) 48px below the points
 *  - artwork inside the card, anchored bottom-right
 */
const TEXT = "#1B2124";
const ACCENT = COLORS.red;

/** Server component — reads the app points from the site config (cached). */
export default async function AppDownloadSection({ title = "Study smarter with the Vini IAS app today!" }: { title?: string }) {
  const { points } = (await getSiteConfig()).app;

  return (
    <Box component="section" id="download" sx={{ py: { xs: 4, md: 5 }, backgroundColor: "#FFFFFF" }}>
      <Container>
        <Box
          sx={{
            position: "relative",
            maxWidth: 1120,
            mx: "auto",
            minHeight: { md: 320 },
            overflow: "hidden",
            borderRadius: { xs: "12px", md: "8px" },
            background: "linear-gradient(180deg, #FFF3F5 0%, #FFDDE3 100%)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
          }}
        >
          {/* Left content */}
          <Box sx={{ position: "relative", zIndex: 1, px: { xs: 3, md: 6 }, pt: { xs: 3.5, md: 6 }, pb: { xs: 2, md: 6 }, maxWidth: { md: "calc(100% - 330px)" }, textAlign: { xs: "center", md: "left" } }}>
            <Typography component="h2" sx={{ fontSize: { xs: "1.45rem", md: "2rem" }, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em", color: TEXT, mb: { xs: 2, md: 2.5 } }}>
              {title}
            </Typography>

            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mb: { xs: 3, md: 6 }, display: { xs: "inline-grid", md: "grid" }, gap: { xs: 1, md: 1.25 }, textAlign: "left" }}>
              {points.map((point) => (
                <Box component="li" key={point} sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  <CheckCircle2 size={24} color="#FFFFFF" fill={ACCENT} style={{ flexShrink: 0 }} />
                  <Typography sx={{ fontSize: { xs: "0.92rem", md: "1.06rem" }, lineHeight: 1.45, color: TEXT }}>{point}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
              <StoreBadges size="md" />
            </Box>
          </Box>

          {/* Right artwork — bottom-anchored inside the card */}
          <Box
            sx={{
              position: { xs: "relative", md: "absolute" },
              right: { md: 64 },
              bottom: 0,
              alignSelf: { xs: "center", md: "auto" },
              width: { xs: 260, sm: 300, md: 262 },
              aspectRatio: "1204 / 1306",
            }}
          >
            <Image
              src="/images/app/vini-ias-app-mockup-student-v2.png"
              alt="Vini IAS learning app home screen on a phone, next to a student"
              fill
              sizes="(max-width: 600px) 260px, 300px"
              style={{ objectFit: "contain", objectPosition: "bottom" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
