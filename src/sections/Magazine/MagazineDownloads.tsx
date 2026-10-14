import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Download } from "lucide-react";
import { MagazineContent } from "@/types";
import { externalLinkProps } from "@/utils/links";
import { COLORS } from "@/theme/colors";

/** "Download The Magazines" — issue cards (cover, month, download button), grouped by language. */
export default function MagazineDownloads({ data, theme }: { data: MagazineContent["downloads"]; theme: MagazineContent["theme"] }) {
  const dark = theme === "prism";
  const [before, after] = data.title.split(data.highlight);
  return (
    <Box component="section" id="course-details" sx={{ py: { xs: 4.5, md: 7 }, backgroundColor: "#FFFFFF" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 1.25 }}>
          <Box component="span" sx={{ display: "inline-block", px: 1.5, py: 0.5, borderRadius: "9999px", backgroundColor: "#FCEBCB", color: "#7C4A03", fontWeight: 800, letterSpacing: ".08em", fontSize: "0.7rem" }}>FREE DOWNLOAD</Box>
        </Box>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.8rem", md: "2.5rem" }, color: COLORS.navy }}>
          {before}
          <Box component="span" sx={{ color: COLORS.red }}>{data.highlight}</Box>
          {after}
        </Typography>
        <Box sx={{ width: 120, height: 4, borderRadius: 2, mx: "auto", mt: 1, mb: { xs: 3, md: 4 }, backgroundColor: COLORS.red }} />

        {data.groups.map((g, gi) => (
          <Box key={g.title ?? gi} sx={{ mt: gi ? { xs: 4, md: 5 } : 0 }}>
            {g.title && <Typography component="h3" sx={{ mb: 2.5, textAlign: "center", fontWeight: 900, fontSize: { xs: "1.25rem", md: "1.5rem" }, color: COLORS.navy }}>{g.title}</Typography>}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: `repeat(${Math.min(g.issues.length, 2)}, minmax(0, 300px))`, md: `repeat(${Math.min(g.issues.length, 3)}, minmax(0, 340px))` }, justifyContent: "center", gap: { xs: 2.5, md: 4 } }}>
              {g.issues.map((issue) => (
                <Box key={issue.label} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: "20px", border: `1px solid ${COLORS.border}`, backgroundColor: "#FFFFFF", boxShadow: "0 14px 30px rgba(15,23,42,.12)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", transition: "transform .2s", "&:hover": { transform: "translateY(-4px)" } }}>
                  {/* same frame for every issue so cards line up; the whole cover stays visible */}
                  <Box sx={{ position: "relative", width: "100%", aspectRatio: dark ? "7 / 8" : "4 / 3", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
                    <Image src={issue.image} alt={`${issue.label} — cover`} fill quality={90} sizes="(max-width: 600px) 92vw, 340px" style={{ objectFit: "contain" }} />
                  </Box>
                  <Typography sx={{ mt: 1.75, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1rem", md: "1.08rem" } }}>{issue.label}</Typography>
                  <Box sx={{ minHeight: 14 }} />
                  <Box
                    component="a"
                    href={issue.href}
                    {...externalLinkProps(issue)}
                    sx={{ mt: "auto", width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 0.75, height: 46, borderRadius: "10px", backgroundColor: COLORS.red, color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "0.8rem", md: "0.9rem" }, textDecoration: "none", boxShadow: "0 8px 18px rgba(254,0,52,.25)", "&:hover": { backgroundColor: COLORS.redDark } }}
                  >
                    <Download size={16} /> {data.ctaLabel}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
