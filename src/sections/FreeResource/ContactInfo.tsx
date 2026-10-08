import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Globe, Mail, Phone } from "lucide-react";
import { getSiteConfig } from "@/services/site";
import { COLORS } from "@/theme/colors";
import { h2Sx } from "./CourseOverview";

/** Contact Information block at the end of the course details (server component). */
export default async function ContactInfo() {
  const { contact: CONTACT } = await getSiteConfig();
  const SITE = CONTACT.website;
  const rows = [
    { label: "Phone", value: CONTACT.phoneDisplay, href: CONTACT.tel, icon: <Phone size={18} color={COLORS.red} /> },
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: <Mail size={18} color={COLORS.red} /> },
    { label: "Website", value: SITE.label, href: SITE.href, icon: <Globe size={18} color={COLORS.red} /> },
  ];
  return (
    <Box component="section" id="contact-information" sx={{ pt: { xs: 1, md: 2 }, pb: { xs: 4, md: 6 } }}>
      <Container>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: "center", mb: { xs: 2, md: 3 } }}>
          Contact Information
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 1.25, md: 2 } }}>
          {rows.map((r) => (
            <Box
              key={r.label}
              component="a"
              href={r.href}
              sx={{ display: "flex", alignItems: "center", gap: 1.5, p: { xs: 1.75, md: 2.25 }, borderRadius: "14px", border: `1px solid ${COLORS.border}`, backgroundColor: "#FFFFFF", textDecoration: "none", transition: "all .2s", "&:hover": { borderColor: COLORS.redBorder, boxShadow: "0 8px 20px rgba(15,23,42,.06)" } }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: "12px", backgroundColor: COLORS.redTint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{r.icon}</Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.label}</Typography>
                <Typography noWrap sx={{ fontWeight: 700, color: COLORS.ink, fontSize: { xs: "0.95rem", md: "1rem" } }}>{r.value}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
