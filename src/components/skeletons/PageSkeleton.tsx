import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HeroSkeleton from "./HeroSkeleton";
import CardGridSkeleton from "./CardGridSkeleton";

/** Default main-site loading state: hero banner and two card sections. */
export default function PageSkeleton() {
  return (
    <Box aria-busy aria-label="Loading">
      <HeroSkeleton />
      <Container sx={{ py: { xs: 4, md: 6 }, display: "grid", gap: { xs: 5, md: 7 } }}>
        <CardGridSkeleton />
        <CardGridSkeleton cardHeight={180} />
      </Container>
    </Box>
  );
}
