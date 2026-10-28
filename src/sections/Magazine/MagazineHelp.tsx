import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CounsellorIllustration from "@/components/illustrations/CounsellorIllustration";
import { CourseFaq, MagazineContent } from "@/types";
import { COLORS } from "@/theme/colors";
import FaqList from "@/components/FaqList";
import HighlightTitle from "@/components/HighlightTitle";
import MobileCallbackForm from "@/components/MobileCallbackForm";

/** "Frequently Asked Questions" accordion beside a "Doubt Regarding …?" callback card. */
export default function MagazineHelp({ faqs, help }: { faqs: CourseFaq[]; help: MagazineContent["help"] }) {
  const [before, after] = help.title.split(help.highlight);

  return (
    <Box component="section" id="faqs" sx={{ py: { xs: 4.5, md: 7 }, backgroundColor: COLORS.surface }}>
      <Container>
        <HighlightTitle before="Frequently " highlight="Asked" after=" Questions" align="center" />
        <Box sx={{ width: 120, height: 4, borderRadius: 2, mx: "auto", mt: 1, mb: { xs: 3, md: 4.5 }, backgroundColor: COLORS.red }} />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" }, gap: { xs: 3, md: 4 }, alignItems: "start" }}>
          <FaqList faqs={faqs} variant="card" defaultOpen={false} />

          <Box id="callback" sx={{ position: { md: "sticky" }, top: { md: 96 }, p: { xs: 2.5, md: 3.5 }, borderRadius: "22px", background: `linear-gradient(120deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, color: "#FFFFFF", boxShadow: "0 18px 40px rgba(12,28,54,.25)" }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box>
                <Typography component="h3" sx={{ fontWeight: 900, fontSize: { xs: "1.35rem", md: "1.7rem" }, color: "#FFFFFF", lineHeight: 1.25 }}>
                  {before}
                  <Box component="span" sx={{ color: COLORS.yellow }}>{help.highlight}</Box>
                  {after}
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(255,255,255,.8)", fontSize: "0.92rem" }}>{help.text}</Typography>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" }, flexShrink: 0, p: 1, borderRadius: "16px", backgroundColor: "#FFFFFF" }}>
                <CounsellorIllustration width={140} />
              </Box>
            </Box>
            <Box sx={{ mt: 2.5 }}>
              <MobileCallbackForm ctaLabel={help.ctaLabel} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
