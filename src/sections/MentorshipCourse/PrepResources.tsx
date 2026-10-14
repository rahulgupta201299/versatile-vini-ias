import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Download, FileText } from "lucide-react";
import { MentorshipContent } from "@/types";
import { externalLinkProps } from "@/utils/links";
import { COLORS } from "@/theme/colors";

type Resources = NonNullable<MentorshipContent["resources"]>;

/** "Essential Preparation Resources" — syllabus / PYQ download cards. */
export default function PrepResources({ data }: { data: Resources }) {
  return (
    <Box component="section" sx={{ py: { xs: 3, md: 5 } }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.45rem", md: "2rem" }, color: COLORS.navy, mb: { xs: 2.5, md: 3.5 } }}>
          {data.title}
        </Typography>
        <Box sx={{ maxWidth: 1040, mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: { xs: 2, md: 3 } }}>
          {data.items.map((r) => (
            <Box key={r.title} sx={{ display: "flex", gap: 2, p: { xs: 2.25, md: 3 }, borderRadius: "18px", border: `1px solid ${COLORS.redBorder}`, background: `linear-gradient(135deg, ${COLORS.redTintSoft} 0%, #FFFFFF 70%)` }}>
              <Box sx={{ flexShrink: 0, width: 52, height: 52, borderRadius: "14px", backgroundColor: COLORS.red, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileText size={26} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.1rem", color: COLORS.navy }}>{r.title}</Typography>
                <Typography sx={{ mt: 0.5, color: COLORS.body, fontSize: "0.92rem", lineHeight: 1.6 }}>{r.text}</Typography>
                <Box
                  component="a"
                  href={r.href}
                  {...externalLinkProps(r)}
                  sx={{ mt: 1.5, display: "inline-flex", alignItems: "center", gap: 0.75, height: 40, px: 2, borderRadius: "10px", backgroundColor: COLORS.navy, color: "#FFFFFF", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", "&:hover": { backgroundColor: COLORS.navyDark } }}
                >
                  <Download size={16} /> {r.ctaLabel}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
