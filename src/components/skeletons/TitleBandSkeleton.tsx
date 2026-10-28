import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Shimmer from "./Shimmer";
import TextLinesSkeleton from "./TextLinesSkeleton";

/** Breadcrumb + page title + tagline band used at the top of course, goal and company pages. */
export default function TitleBandSkeleton() {
  return (
    <Container sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 1.5, md: 2 } }}>
      <Shimmer variant="text" width={180} height={18} />
      <Shimmer width="min(520px, 85%)" height={40} sx={{ mt: 1.25 }} />
      <Box sx={{ mt: 1.5, maxWidth: 640 }}>
        <TextLinesSkeleton lines={2} />
      </Box>
    </Container>
  );
}
