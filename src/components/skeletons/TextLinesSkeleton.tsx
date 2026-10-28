import Box from "@mui/material/Box";
import Shimmer from "./Shimmer";

/** Paragraph placeholder — the last line is shorter, like real text. */
export default function TextLinesSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      {Array.from({ length: lines }, (_, index) => (
        <Shimmer key={index} variant="text" height={22} width={index === lines - 1 ? "60%" : "100%"} />
      ))}
    </Box>
  );
}
