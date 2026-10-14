import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@/components/Breadcrumbs";
import { MagazineContent } from "@/types";
import { LANDING_ICONS, CHIP_TONES } from "@/sections/CourseLanding/icons";
import HighlightText from "@/sections/EthicsFoundation/HighlightText";
import { COLORS } from "@/theme/colors";

/** Magazine hero — light "Shortlist" style or dark blue "PRISM" style, with the stacked-books artwork. */
export default function MagazineHero({ data }: { data: MagazineContent }) {
  const { hero } = data;
  const dark = data.theme === "prism";
  return (
    <Box
      component="section"
      id="course-top"
      sx={{
        pt: { xs: 1.5, md: 2 },
        pb: { xs: 5, md: 8 },
        background: hero.background
          ? `center / cover no-repeat url("${hero.background}")`
          : dark
            ? `radial-gradient(circle at 85% 30%, #3B82F6 0%, #1E3A8A 35%, ${COLORS.navyDark} 75%)`
            : `linear-gradient(120deg, #ECFDF5 0%, #F8FAFC 50%, ${COLORS.redTintSoft} 100%)`,
        color: dark ? "#FFFFFF" : COLORS.ink,
        "& nav a, & nav span, & nav p, & nav li": dark
          ? { color: "rgba(255,255,255,.8) !important" }
          : {},
      }}
    >
      <Container>
        <Breadcrumbs />
        <Box
          sx={{
            mt: { xs: 2, md: 4 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 1.2fr) minmax(0, 1fr)",
            },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          <Box>
            {dark ? (
              <Typography
                sx={{
                  fontWeight: 800,
                  letterSpacing: ".14em",
                  fontSize: { xs: "0.72rem", md: "0.8rem" },
                  color: "rgba(255,255,255,.85)",
                }}
              >
                {hero.eyebrow}
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.4rem", md: "1.8rem" },
                  color: COLORS.navy,
                }}
              >
                {hero.eyebrow.replace(/IAS$/, "")}
                <Box component="span" sx={{ color: COLORS.red }}>
                  IAS
                </Box>
              </Typography>
            )}
            {hero.kicker && (
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", md: "1.45rem" },
                  color: COLORS.navy,
                }}
              >
                {hero.kicker}
              </Typography>
            )}
            <Typography
              component="h1"
              sx={{
                mt: dark ? 2 : 0.5,
                fontWeight: 900,
                lineHeight: 1,
                fontSize: dark
                  ? { xs: "3rem", md: "4.2rem" }
                  : { xs: "2.6rem", md: "3.6rem" },
                color: dark ? "#FFFFFF" : COLORS.red,
              }}
            >
              {hero.title}
              {hero.highlight && (
                <Box
                  component="span"
                  sx={{ display: "block", color: COLORS.yellow }}
                >
                  {hero.highlight}
                </Box>
              )}
            </Typography>
            {hero.tagline && (
              <Typography
                sx={{
                  mt: 1.5,
                  fontWeight: 800,
                  fontSize: { xs: "1.2rem", md: "1.6rem" },
                }}
              >
                <HighlightText text={hero.tagline} color={COLORS.yellow} />
              </Typography>
            )}

            <Box
              sx={{
                mt: { xs: 2.5, md: 3.5 },
                display: "grid",
                gridTemplateColumns: dark
                  ? { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }
                  : "1fr",
                gap: 1.5,
                maxWidth: dark ? 640 : 460,
              }}
            >
              {hero.points.map((pt, i) => {
                const Icon = LANDING_ICONS[pt.icon];
                const tone = CHIP_TONES[i % CHIP_TONES.length];
                return (
                  <Box
                    key={pt.title}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: "14px",
                      backgroundColor: "#FFFFFF",
                      color: COLORS.ink,
                      boxShadow: "0 10px 24px rgba(15,23,42,.12)",
                    }}
                  >
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        backgroundColor: dark ? tone.bg : COLORS.navy,
                        color: dark ? tone.color : COLORS.yellow,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "0.9rem", md: "0.95rem" },
                          color: COLORS.navy,
                          lineHeight: 1.3,
                        }}
                      >
                        {pt.title}
                      </Typography>
                      {pt.text && (
                        <Typography
                          sx={{ fontSize: "0.78rem", color: COLORS.muted }}
                        >
                          {pt.text}
                        </Typography>
                      )}
                      {dark && (
                        <Box
                          sx={{
                            mt: 0.5,
                            width: 32,
                            height: 3,
                            borderRadius: 2,
                            backgroundColor: tone.color,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ position: "relative", width: "100%", maxWidth: 520, mx: "auto" }}>
            <Image src={hero.image.src} alt={hero.image.alt} width={hero.image.width} height={hero.image.height} priority sizes="(max-width: 900px) 90vw, 520px" style={{ width: "100%", height: "auto" }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
