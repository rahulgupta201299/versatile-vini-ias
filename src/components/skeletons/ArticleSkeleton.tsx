import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HeroSkeleton from "./HeroSkeleton";
import Shimmer from "./Shimmer";
import TextLinesSkeleton from "./TextLinesSkeleton";

/** Blog article: promo banner, then an 880px column with title, author strip, cover and body. */
export default function ArticleSkeleton() {
  return (
    <Box aria-busy aria-label="Loading">
      <HeroSkeleton />
      <Container sx={{ py: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 880, mx: "auto" }}>
          <Shimmer variant="text" width={220} height={18} />
          <Shimmer width={120} height={28} sx={{ mt: 1.5, borderRadius: 999 }} />
          <Shimmer height={72} sx={{ mt: 1.25 }} />
          <Box sx={{ mt: 1.25 }}>
            <TextLinesSkeleton lines={2} />
          </Box>
          <Shimmer height={56} sx={{ mt: 2 }} />
          <Shimmer height="auto" sx={{ mt: 2.5, aspectRatio: "16 / 10", borderRadius: "18px" }} />
          <Box sx={{ mt: 3 }}>
            <TextLinesSkeleton lines={8} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
