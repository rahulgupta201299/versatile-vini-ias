import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppLayout } from "@/components";
import { COLORS } from "@/theme/colors";

/** Global 404 — rendered outside the route groups, so it wraps itself in the main-site chrome. */
export default function NotFound() {
  return (
    <AppLayout>
      <Box sx={{ py: { xs: 10, md: 14 }, px: 2, textAlign: "center" }}>
        <Typography sx={{ fontWeight: 900, fontSize: { xs: "3.5rem", md: "5rem" }, color: COLORS.red, lineHeight: 1 }}>404</Typography>
        <Typography component="h1" sx={{ mt: 1.5, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.4rem", md: "1.8rem" } }}>Page not found</Typography>
        <Typography sx={{ mt: 1, color: COLORS.textSecondary }}>The page you&apos;re looking for doesn&apos;t exist or has moved.</Typography>
        <Box component={Link} href="/" sx={{ display: "inline-flex", mt: 3, px: 3, py: 1.25, borderRadius: 999, bgcolor: COLORS.red, color: "#FFFFFF", fontWeight: 700, textDecoration: "none", "&:hover": { bgcolor: COLORS.redDark } }}>
          Return Home
        </Box>
      </Box>
    </AppLayout>
  );
}
