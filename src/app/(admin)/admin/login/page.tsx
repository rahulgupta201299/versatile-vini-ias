import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/theme/colors";
import { ADMIN_MODE, getAdminSession } from "@/lib/adminAuth";
import AdminLoginForm from "@/sections/Admin/AdminLoginForm";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await getAdminSession()) redirect("/admin");
  const { next } = await searchParams;

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", px: 2, py: 4, background: `radial-gradient(circle at 15% 15%, rgba(254,0,52,.28), transparent 40%), linear-gradient(160deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)` }}>
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.25, mb: 3 }}>
          <Box sx={{ position: "relative", width: 112, height: 40, borderRadius: "10px", bgcolor: "#FFFFFF", p: 0.75 }}>
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Image src="/images/logo.png" alt="VINI IAS" fill sizes="112px" style={{ objectFit: "contain" }} priority />
            </Box>
          </Box>
          <Box component="span" sx={{ px: 1.25, py: 0.4, borderRadius: 999, bgcolor: "rgba(255,229,31,.15)", border: "1px solid rgba(255,229,31,.4)", color: COLORS.yellow, fontSize: "0.75rem", fontWeight: 800, letterSpacing: ".1em" }}>ADMIN</Box>
        </Box>
        <Box sx={{ p: { xs: 3, sm: 4 }, borderRadius: "22px", bgcolor: "#FFFFFF", boxShadow: "0 30px 70px rgba(0,0,0,.35)" }}>
          <AdminLoginForm next={next ?? null} demo={ADMIN_MODE === "demo"} />
        </Box>
        <Typography sx={{ mt: 2.5, textAlign: "center", color: "rgba(255,255,255,.55)", fontSize: "0.78rem" }}>
          © Vini Eduventure Pvt. Ltd. · Access is monitored
        </Typography>
      </Box>
    </Box>
  );
}
