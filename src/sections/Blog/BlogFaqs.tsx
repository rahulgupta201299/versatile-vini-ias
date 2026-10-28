import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CourseFaq } from "@/types";
import { COLORS } from "@/theme/colors";
import FaqList from "@/components/FaqList";

/** Article FAQs — accordion, first one open. */
export default function BlogFaqs({ faqs }: { faqs: CourseFaq[] }) {
  if (!faqs.length) return null;

  return (
    <Box component="section" aria-label="Frequently asked questions">
      <Typography component="h2" sx={{ fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "1.25rem", md: "1.5rem" }, color: "#27272A", mb: 1.5, pl: 1.5, borderLeft: `4px solid ${COLORS.red}` }}>
        Frequently Asked Questions
      </Typography>
      <FaqList faqs={faqs} />
    </Box>
  );
}
