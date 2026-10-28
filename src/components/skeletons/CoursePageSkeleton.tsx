import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HeroSkeleton from "./HeroSkeleton";
import CardGridSkeleton from "./CardGridSkeleton";
import TitleBandSkeleton from "./TitleBandSkeleton";
import Shimmer from "./Shimmer";

/** Goal and course pages: title band, banner, tab strip, then batches and videos. */
export default function CoursePageSkeleton() {
  return (
    <Box aria-busy aria-label="Loading">
      <TitleBandSkeleton />
      <HeroSkeleton />
      <Container sx={{ py: { xs: 2, md: 3 } }}>
        <Box sx={{ display: "flex", gap: 1.5, overflow: "hidden" }}>
          {Array.from({ length: 5 }, (_, index) => (
            <Shimmer key={index} width={110} height={38} sx={{ flexShrink: 0, borderRadius: 999 }} />
          ))}
        </Box>
      </Container>
      <Container sx={{ py: { xs: 3, md: 5 }, display: "grid", gap: { xs: 5, md: 7 } }}>
        <CardGridSkeleton cardHeight={320} />
        <CardGridSkeleton cardHeight={200} />
      </Container>
    </Box>
  );
}
