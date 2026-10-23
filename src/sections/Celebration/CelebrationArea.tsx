import React from "react";
import Box from "@mui/material/Box";
import { CelebrationBanner as CelebrationBannerData } from "@/types";
import CelebrationBanner from "./CelebrationBanner";
import { festiveBackground } from "./festiveBackground";

const HEX_COLOR = /^#[\da-f]{6}$/i;

/**
 * Homepage top while a celebration banner is live: the festive colour starts at the very top
 * (behind the fixed header), runs behind the hero slider and fades to white under the offers.
 * The header picks the colour up from the CSS variables below; they go away with this component,
 * so other pages keep a white header.
 */
export default function CelebrationArea({ banner, children }: { banner: CelebrationBannerData; children: React.ReactNode }) {
  const { theme } = banner;
  const headerColor = HEX_COLOR.test(theme.background) ? theme.background : "#FFFFFF";

  return (
    <Box sx={{ background: festiveBackground(theme, "100%") }}>
      <style>{`:root { --site-header-bg: ${headerColor}; --site-header-border: transparent; }`}</style>
      {children}
      <CelebrationBanner banner={banner} />
    </Box>
  );
}
