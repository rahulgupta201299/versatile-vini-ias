import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BookOpen, Briefcase, FileText, Image as ImageIcon, MessageSquare, Users } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { getAdminSession } from "@/lib/adminAuth";
import AdminSignOut from "@/sections/Admin/AdminSignOut";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

/** Admin modules — placeholders until each one is connected to the backend. */
const MODULES = [
  { title: "Blogs & Articles", text: "Create, edit and publish posts under /exams.", icon: FileText },
  { title: "Courses & Batches", text: "Manage course pages, plans and pricing.", icon: BookOpen },
  { title: "Banners & Results", text: "Hero banners, toppers and result sliders.", icon: ImageIcon },
  { title: "Careers", text: "Job openings and received applications.", icon: Briefcase },
  { title: "Enquiries & Leads", text: "Contact, counselling and call-back requests.", icon: MessageSquare },
  { title: "Admins", text: "Team members who can access this panel.", icon: Users },
];

export default async function AdminDashboard() {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: COLORS.surface }}>
      <Box component="header" sx={{ bgcolor: COLORS.navy, color: "#FFFFFF" }}>
        <Container sx={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
            VINI IAS <Box component="span" sx={{ color: COLORS.yellow }}>Admin</Box>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
            <Typography noWrap sx={{ display: { xs: "none", sm: "block" }, color: "rgba(255,255,255,.75)", fontSize: "0.88rem" }}>{admin.email}</Typography>
            <AdminSignOut />
          </Box>
        </Container>
      </Box>
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Typography component="h1" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.6rem", md: "2rem" } }}>Welcome{admin.name ? `, ${admin.name}` : ""}</Typography>
        <Typography sx={{ mt: 0.75, color: COLORS.textSecondary }}>Signed in as {admin.email}. Your session expires 2 days after sign-in.</Typography>
        <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 2 }}>
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Box key={m.title} sx={{ p: 2.5, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
                <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={22} /></Box>
                <Typography sx={{ mt: 1.5, fontWeight: 800, color: COLORS.navy }}>{m.title}</Typography>
                <Typography sx={{ mt: 0.5, color: COLORS.textSecondary, fontSize: "0.9rem" }}>{m.text}</Typography>
                <Box component="span" sx={{ display: "inline-block", mt: 1.5, px: 1, py: 0.25, borderRadius: 999, bgcolor: COLORS.surface, color: COLORS.muted, fontSize: "0.72rem", fontWeight: 700 }}>Coming soon</Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
