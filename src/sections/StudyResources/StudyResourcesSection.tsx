import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { STUDY_RESOURCES } from "@/data/studyResources";
import { getSiteData } from "@/services/site";
import { COLORS } from "@/theme/colors";
import StudyResourcesSlider from "./StudyResourcesSlider";

/** Homepage "Study Resources" (layout after pw.live): centred heading, then the cards as one slider with arrows (1 / 2 / 3 in view on phones / tablets / computers). */
export default async function StudyResourcesSection() {
  const { storeHref } = (await getSiteData()).navigation;

  return (
    <Box component="section" id="study-resources" aria-labelledby="study-resources-title" sx={{ py: { xs: 4, md: 6 }, bgcolor: "#FFFFFF" }}>
      <Container>
        <Box sx={{ textAlign: "center", maxWidth: 760, mx: "auto" }}>
          <Typography id="study-resources-title" component="h2" sx={{ fontWeight: 700, fontSize: { xs: "1.45rem", md: "2rem" }, color: COLORS.ink, letterSpacing: "-0.01em" }}>
            Study Resources
          </Typography>
          <Typography sx={{ mt: 1.25, color: COLORS.body, fontSize: { xs: "1rem", md: "1.2rem" }, lineHeight: 1.55 }}>
            A diverse array of learning materials to enhance your educational journey.
          </Typography>
        </Box>

        <StudyResourcesSlider cards={STUDY_RESOURCES.map(({ href, ...card }) => ({ ...card, link: href === "store" ? storeHref : href }))} />
      </Container>
    </Box>
  );
}
