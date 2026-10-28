import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Shimmer from "./Shimmer";

/** Same box as HeroSlider: container padding, rounded card and the banner aspect ratio. */
export default function HeroSkeleton() {
  return (
    <Box sx={{ pt: { xs: 1.5, md: 2 }, pb: { xs: 1, md: 1.5 } }}>
      <Container sx={{ px: { xs: 2, sm: 3 } }}>
        <Shimmer height="auto" sx={{ aspectRatio: { xs: "16 / 9", sm: "2.9 / 1" }, borderRadius: { xs: "12px", sm: "16px", md: "22px" } }} />
      </Container>
    </Box>
  );
}
