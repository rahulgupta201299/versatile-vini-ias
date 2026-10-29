"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PhoneCall } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandLogos";
import { useSiteData } from "@/context/SiteDataContext";
import { CounsellingCard } from "@/sections/CoursePage/CounsellingForm";
import { COLORS } from "@/theme/colors";

const COURSE_OPTIONS = [
  "Sankalp UPSC CSE 2026/27 GS Foundation",
  "Aarambh 71st BPSC Prelims + Mains",
  "Mains Answer Writing & Enrichment Program (MAWEP)",
  "Ethics (GS-4) & Essay 250+ Marks Mastery",
  "Hindi Literature Optional Batch",
  "UPSC Plan B Comprehensive Package",
  "All India Prelims Test Series 2026",
];

/** "VINI IAS Learner Support" (hours, Indian Nationals → call, Foreign Nationals → WhatsApp) beside the "Get Free Counselling Today" form. */
export default function EnquirySection() {
  const { contact } = useSiteData().config;

  return (
    <Box
      component="section"
      id="enquiry"
      aria-labelledby="learner-support-title"
      sx={{ pt: { xs: 4, md: 6, lg: 10 }, pb: { xs: 4, md: 6 }, backgroundColor: "#FFFFFF", borderTop: `1px solid ${COLORS.border}` }}
    >
      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "1fr 1fr" }, gap: { xs: 9, lg: 7 }, alignItems: "center" }}>
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
            <Typography id="learner-support-title" component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" }, color: COLORS.ink, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              VINI IAS <Box component="span" sx={{ color: COLORS.red }}>Learner Support</Box>
            </Typography>
            <Typography sx={{ mt: 1.25, mb: { xs: 2.5, md: 3.5 }, color: COLORS.muted, fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 1.55 }}>
              Talk to our experts. We are available Monday to Saturday, 9 AM to 8 PM.
            </Typography>

            {/* Indian Nationals → call, Foreign Nationals → WhatsApp chat; the number sits in a plain outlined box */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: { xs: 1.5, sm: 2.5 }, maxWidth: 560, mx: { xs: "auto", lg: 0 } }}>
              {[
                { key: "call", label: "Indian Nationals", action: "Call Us", href: contact.tel, icon: <PhoneCall size={18} color={COLORS.red} strokeWidth={2.2} />, tint: COLORS.redTint, isExternal: false },
                { key: "whatsapp", label: "Foreign Nationals", action: "Chat Now", href: contact.whatsappUrl, icon: <WhatsAppLogo size={20} color="#25D366" />, tint: "#EAFBF1", isExternal: true },
              ].map(({ key, label, action, href, icon, tint, isExternal }) => (
                <Box key={key} sx={{ minWidth: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", lg: "flex-start" }, gap: 1, mb: 1.25 }}>
                    <Box sx={{ width: 34, height: 34, flexShrink: 0, borderRadius: "50%", bgcolor: tint, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</Box>
                    <Typography sx={{ fontSize: { xs: "0.85rem", sm: "1rem" }, color: COLORS.ink, lineHeight: 1.3, textAlign: "left" }}>
                      {label}: <Box component="span" sx={{ fontWeight: 700 }}>{action}</Box>
                    </Typography>
                  </Box>
                  <Box
                    component="a"
                    href={href}
                    {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={`${action}: ${contact.phoneDisplay}`}
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: { xs: 48, sm: 54 }, px: 1, borderRadius: "10px", border: `1.5px solid ${COLORS.red}`, color: COLORS.ink, fontWeight: 600, fontSize: { xs: "0.98rem", sm: "1.2rem" }, textDecoration: "none", whiteSpace: "nowrap", transition: "background-color .15s", "&:hover": { bgcolor: COLORS.redTintSoft } }}
                  >
                    {contact.phoneDisplay}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CounsellingCard examOptions={COURSE_OPTIONS} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
