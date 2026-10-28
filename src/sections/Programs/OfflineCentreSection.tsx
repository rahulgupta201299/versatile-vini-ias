import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { OFFLINE_CENTRE } from "@/data/popularPrograms";
import { COLORS } from "@/theme/colors";

const buttonSx = { flex: { xs: 1, sm: "0 0 auto" }, minWidth: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", height: 50, px: { xs: 1.5, sm: 4 }, borderRadius: 999, fontWeight: 700, fontSize: { xs: "0.92rem", sm: "1rem" }, textDecoration: "none", whiteSpace: "nowrap" } as const;

/** Homepage "Find us in your neighborhood": offline centre photo, three points, Explore Centres + Request a callback. */
export default function OfflineCentreSection() {
  const { eyebrow, title, highlight, image, points, exploreHref, callbackHref } = OFFLINE_CENTRE;

  return (
    <Box component="section" id="offline-centre" aria-labelledby="offline-centre-title" sx={{ py: { xs: 4, md: 6 }, bgcolor: "#FFFFFF" }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) minmax(0, 1.1fr)" }, columnGap: 6, rowGap: { xs: 2.5, md: 3 }, alignItems: "center" }}>
        <Box sx={{ order: 1, alignSelf: { md: "end" } }}>
          <Box component="span" sx={{ display: "inline-block", px: 2, py: 0.75, borderRadius: 999, bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.heading, fontSize: "0.88rem", fontWeight: 600 }}>{eyebrow}</Box>
          <Typography id="offline-centre-title" component="h2" sx={{ mt: 1.75, fontWeight: 800, fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2.1rem" }, lineHeight: 1.25, color: COLORS.ink, letterSpacing: "-0.02em" }}>
            {title} <Box component="span" sx={{ color: COLORS.red }}>{highlight}</Box>
          </Typography>
        </Box>
        <Box sx={{ order: { xs: 2, md: 3 }, gridColumn: { md: 2 }, gridRow: { md: "1 / span 2" }, position: "relative", aspectRatio: "16 / 10", borderRadius: "20px", overflow: "hidden", boxShadow: "0 18px 40px rgba(15,23,42,.12)" }}>
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 900px) 600px, 100vw" style={{ objectFit: "cover" }} />
        </Box>
        <Box sx={{ order: { xs: 3, md: 2 }, alignSelf: { md: "start" } }}>
          <Box component="ul" sx={{ m: 0, pl: 2.5, display: "grid", gap: 1.25, color: COLORS.body, fontSize: { xs: "0.98rem", md: "1.05rem" }, lineHeight: 1.6 }}>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </Box>
          <Box sx={{ mt: { xs: 2.5, md: 3.5 }, display: "flex", gap: 1.5 }}>
            <Box component={Link} href={exploreHref} sx={{ ...buttonSx, border: `1.5px solid ${COLORS.border}`, color: COLORS.ink, "&:hover": { borderColor: COLORS.ink } }}>Explore Centres</Box>
            <Box component={Link} href={callbackHref} sx={{ ...buttonSx, bgcolor: COLORS.red, color: "#FFFFFF", "&:hover": { bgcolor: COLORS.redDark } }}>Request a callback</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
