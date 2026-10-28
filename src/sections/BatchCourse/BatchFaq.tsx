import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CounsellorIllustration from "@/components/illustrations/CounsellorIllustration";
import { BatchCourseContent, CourseFaq } from "@/types";
import { COLORS } from "@/theme/colors";
import FaqList from "@/components/FaqList";
import HighlightTitle from "@/components/HighlightTitle";
import MobileCallbackForm from "@/components/MobileCallbackForm";

/** "Still confused?" card with a one-field callback form. */
function ExpertCard({ expert }: { expert: BatchCourseContent["expert"] }) {

  return (
    <Box sx={{ p: { xs: 2.25, md: 3.5 }, borderRadius: "20px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 18px 44px rgba(15,23,42,.08)" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography component="h3" sx={{ fontWeight: 900, fontSize: { xs: "1.3rem", md: "1.65rem" }, color: COLORS.navy, lineHeight: 1.2 }}>
            {expert.title} <Box component="span" sx={{ color: COLORS.red }}>{expert.highlight}</Box>
          </Typography>
          <Typography sx={{ mt: 1, color: COLORS.textSecondary, fontSize: { xs: "0.88rem", md: "0.95rem" } }}>{expert.text}</Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" }, flexShrink: 0 }}>
          <CounsellorIllustration width={{ sm: 150, md: 180 }} />
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <MobileCallbackForm ctaLabel={expert.ctaLabel} caller="UPSC expert" />
      </Box>
    </Box>
  );
}

/** FAQs (left) + talk-to-an-expert card (right). */
export default function BatchFaq({ faqs, expert }: { faqs: CourseFaq[]; expert: BatchCourseContent["expert"] }) {
  return (
    <Box component="section" id="faqs" sx={{ py: { xs: 5, md: 7 }, background: "linear-gradient(180deg, #FFFFFF 0%, #FFF6F0 100%)" }}>
      <Container>
        <HighlightTitle before="Frequently " highlight="Asked" after=" Questions" align="center" sx={{ mb: { xs: 3, md: 4 } }} />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.05fr)" }, gap: { xs: 3, md: 4 }, alignItems: "start" }}>
          <FaqList faqs={faqs} variant="card" defaultOpen={false} />

          <ExpertCard expert={expert} />
        </Box>
      </Container>
    </Box>
  );
}
