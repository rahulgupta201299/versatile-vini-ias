import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CourseFaq } from "@/types";
import { COLORS } from "@/theme/colors";
import FaqList from "@/components/FaqList";

export default function CourseFaqs({ faqs }: { faqs: CourseFaq[] }) {
  return (
    <Box component="section" id="faqs" sx={{ py: { xs: 4, md: 6 }, backgroundColor: COLORS.surface }}>
      <Container sx={{ maxWidth: "880px !important" }}>
        <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.75rem" }, color: COLORS.ink, textAlign: "center", mb: { xs: 2, md: 3 } }}>
          FAQs
        </Typography>
        <FaqList faqs={faqs} />
      </Container>
    </Box>
  );
}
