import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Download, ListChecks, FileText } from "lucide-react";
import { DownloadBannerContent } from "@/types";
import { externalLinkProps } from "@/utils/links";
import { COLORS } from "@/theme/colors";

/** Syllabus book artwork: navy cover with a "COMPLETE" ribbon + an open contents page. */
function BookArt({ data }: { data: DownloadBannerContent }) {
  return (
    <Box sx={{ position: "relative", width: { xs: 190, md: 250 }, height: { xs: 150, md: 190 }, flexShrink: 0 }}>
      <Box aria-hidden sx={{ position: "absolute", inset: "-6% 6% -6% -4%", borderRadius: "50%", background: "radial-gradient(circle, rgba(19,41,75,.14) 0%, rgba(19,41,75,0) 70%)" }} />
      {/* contents page */}
      <Box sx={{ position: "absolute", right: 0, top: "8%", width: "46%", height: "84%", borderRadius: "4px 10px 10px 4px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 10px 22px rgba(15,23,42,.14)", p: { xs: 1, md: 1.25 }, pl: { xs: 2, md: 2.5 } }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.55rem", md: "0.66rem" }, color: COLORS.red, mb: 0.5 }}>SYLLABUS</Typography>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: { xs: 0.45, md: 0.6 } }}>
            <Box sx={{ height: 3, flex: 1, borderRadius: 2, backgroundColor: "#E2E8F0" }} />
            <Box sx={{ width: 8, height: 3, borderRadius: 2, backgroundColor: "#CBD5E1" }} />
          </Box>
        ))}
      </Box>
      {/* cover */}
      <Box sx={{ position: "absolute", left: "4%", top: 0, width: "58%", height: "100%", borderRadius: "6px 12px 12px 6px", overflow: "hidden", background: `linear-gradient(160deg, #1F3B66 0%, ${COLORS.navy} 60%, ${COLORS.navyDark} 100%)`, boxShadow: "0 16px 30px rgba(19,41,75,.35)", color: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", px: 1 }}>
        <Box sx={{ position: "absolute", top: 12, left: -26, transform: "rotate(-45deg)", width: 110, py: 0.25, backgroundColor: COLORS.red, fontSize: "0.5rem", fontWeight: 800, letterSpacing: ".08em" }}>COMPLETE</Box>
        {data.artTitle.map((l) => (
          <Typography key={l} sx={{ fontWeight: 900, fontSize: { xs: "1.05rem", md: "1.4rem" }, lineHeight: 1.05 }}>{l}</Typography>
        ))}
        <Typography sx={{ mt: 0.75, fontWeight: 800, fontSize: { xs: "0.5rem", md: "0.62rem" }, color: COLORS.yellow, letterSpacing: ".04em" }}>{data.artCaption}</Typography>
        <Box sx={{ mt: 1.25, width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 }, borderRadius: "50%", border: `2px solid ${COLORS.yellow}`, opacity: 0.8 }} />
      </Box>
    </Box>
  );
}

/** PDF artwork: a page with a red "PDF" tag. */
function PdfArt({ data }: { data: DownloadBannerContent }) {
  return (
    <Box sx={{ position: "relative", width: { xs: 170, md: 220 }, height: { xs: 150, md: 190 }, flexShrink: 0, display: "flex", justifyContent: "center" }}>
      <Box aria-hidden sx={{ position: "absolute", inset: "-4%", borderRadius: "50%", border: `10px solid ${COLORS.redTint}`, background: `radial-gradient(circle, ${COLORS.redTintSoft} 0%, #FFFFFF 70%)` }} />
      <Box sx={{ position: "relative", mt: "6%", width: "62%", height: "94%", borderRadius: "8px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 16px 30px rgba(15,23,42,.16)", clipPath: "polygon(0 0, 78% 0, 100% 16%, 100% 100%, 0 100%)", textAlign: "center", pt: { xs: 4, md: 5 } }}>
        <Box sx={{ position: "absolute", top: 10, left: -1, px: 1.25, py: 0.25, backgroundColor: COLORS.red, color: "#FFFFFF", fontWeight: 900, fontSize: { xs: "0.75rem", md: "0.9rem" }, borderRadius: "0 4px 4px 0" }}>PDF</Box>
        {data.artTitle.map((l) => (
          <Typography key={l} sx={{ fontWeight: 900, fontSize: { xs: "0.95rem", md: "1.2rem" }, color: COLORS.navy, lineHeight: 1.05 }}>{l}</Typography>
        ))}
        <Typography sx={{ fontWeight: 900, fontSize: { xs: "0.95rem", md: "1.2rem" }, color: COLORS.red, lineHeight: 1.1 }}>{data.artCaption}</Typography>
        {[70, 55].map((w) => (
          <Box key={w} sx={{ mx: "auto", mt: 1, height: 3, width: `${w}%`, borderRadius: 2, backgroundColor: "#E2E8F0" }} />
        ))}
      </Box>
    </Box>
  );
}

/** "DOWNLOAD COMPLETE SYLLABUS" / "DOWNLOAD … PYQs PDF" banner with artwork, badge and button. */
export default function DownloadBanner({ data }: { data: DownloadBannerContent }) {
  const pdf = data.art === "pdf";
  const BadgeIcon = pdf ? FileText : ListChecks;
  return (
    <Box component="section" sx={{ py: { xs: 2, md: 3 } }}>
      <Container>
        <Box
          component="a"
          href={data.href}
          {...externalLinkProps(data)}
          aria-label={`${data.title} ${data.highlight}`}
          sx={{
            maxWidth: 1100,
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 2, md: 4 },
            px: { xs: 2.5, md: 4 },
            py: { xs: 3, md: 3 },
            borderRadius: "24px",
            textDecoration: "none",
            border: `1.5px solid ${pdf ? COLORS.redBorder : "#C7D2FE"}`,
            background: pdf ? `linear-gradient(90deg, #FFF7ED 0%, ${COLORS.redTintSoft} 100%)` : "linear-gradient(90deg, #F5F8FF 0%, #FFFFFF 100%)",
            boxShadow: "0 12px 28px rgba(15,23,42,.06)",
            transition: "transform .2s, box-shadow .2s",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 18px 36px rgba(15,23,42,.1)" },
            "&:hover .dl-btn": { filter: "brightness(.95)" },
          }}
        >
          {pdf ? <PdfArt data={data} /> : <BookArt data={data} />}
          <Box sx={{ flex: 1, minWidth: 0, textAlign: { xs: "center", md: "left" } }}>
            <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.75, py: 0.6, borderRadius: "10px", backgroundColor: pdf ? COLORS.red : COLORS.navy, color: "#FFFFFF", fontWeight: 800, letterSpacing: ".04em", fontSize: { xs: "0.72rem", md: "0.85rem" } }}>
              <BadgeIcon size={16} /> {data.badge}
            </Box>
            <Typography component="h2" sx={{ mt: 1.25, lineHeight: 1.05 }}>
              <Box component="span" sx={{ display: "block", fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" }, color: COLORS.navy }}>{data.title}</Box>
              <Box component="span" sx={{ display: "block", fontWeight: 900, fontSize: { xs: "1.35rem", md: "2.3rem" }, color: COLORS.red }}>{data.highlight}</Box>
            </Typography>
          </Box>
          <Box className="dl-btn" sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 1.5, px: { xs: 2.5, md: 3 }, py: { xs: 1.25, md: 1.75 }, borderRadius: "16px", backgroundColor: pdf ? COLORS.navy : COLORS.red, color: "#FFFFFF", fontWeight: 900, fontSize: { xs: "0.95rem", md: "1.1rem" }, lineHeight: 1.15, boxShadow: pdf ? "0 10px 22px rgba(19,41,75,.3)" : "0 10px 22px rgba(254,0,52,.28)" }}>
            <Download size={30} strokeWidth={2.5} />
            <Box component="span" sx={{ whiteSpace: "pre-line" }}>{data.ctaLabel}</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
