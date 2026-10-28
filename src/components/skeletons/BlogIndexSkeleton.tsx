import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardGridSkeleton from "./CardGridSkeleton";
import Shimmer from "./Shimmer";

/** /exams and /exams/<category>: lead story + top stories, then a card grid beside the sidebar. */
export default function BlogIndexSkeleton() {
  return (
    <Container aria-busy aria-label="Loading" sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.55fr) minmax(0, 1fr)" }, gap: { xs: 2, md: 3 } }}>
        <Shimmer height={380} sx={{ borderRadius: "18px" }} />
        <Shimmer height={380} sx={{ borderRadius: "18px" }} />
      </Box>
      <Box sx={{ mt: { xs: 4, md: 5 }, display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 340px" }, gap: 4 }}>
        <CardGridSkeleton count={6} cardHeight={280} />
        <Shimmer height={520} sx={{ display: { xs: "none", lg: "block" }, borderRadius: "18px" }} />
      </Box>
    </Container>
  );
}
