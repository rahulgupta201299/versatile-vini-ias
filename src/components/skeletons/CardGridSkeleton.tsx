import Box from "@mui/material/Box";
import Shimmer from "./Shimmer";

type CardGridSkeletonProps = {
  count?: number;
  cardHeight?: number;
  withTitle?: boolean;
};

/** A section heading plus a responsive grid of cards (1 → 2 → 3 columns). */
export default function CardGridSkeleton({ count = 3, cardHeight = 260, withTitle = true }: CardGridSkeletonProps) {
  return (
    <Box>
      {withTitle && <Shimmer width={220} height={28} sx={{ mb: 2.5 }} />}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }, gap: 2.5 }}>
        {Array.from({ length: count }, (_, index) => (
          <Shimmer key={index} height={cardHeight} />
        ))}
      </Box>
    </Box>
  );
}
