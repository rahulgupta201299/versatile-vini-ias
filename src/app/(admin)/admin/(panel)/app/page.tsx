import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Smartphone } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { PageHeader } from "@/sections/Admin/ui";

export const metadata: Metadata = { title: "App Dashboard" };

export default function AppDashboardPage() {
  return (
    <>
      <PageHeader eyebrow="App / Dashboard" title="App workspace" subtitle="Content and settings for the VINI mobile app." />
      <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px dashed ${COLORS.border}`, textAlign: "center" }}>
        <Box sx={{ width: 60, height: 60, mx: "auto", borderRadius: "16px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Smartphone size={28} />
        </Box>
        <Typography sx={{ mt: 2, fontWeight: 800, color: COLORS.ink, fontSize: "1.15rem" }}>Coming soon</Typography>
        <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.92rem", maxWidth: 420, mx: "auto" }}>The App workspace will be built after the Web workspace. Use the switcher in the sidebar to go back to Web.</Typography>
      </Box>
    </>
  );
}
