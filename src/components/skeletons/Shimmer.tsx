import Skeleton, { type SkeletonProps } from "@mui/material/Skeleton";
import { COLORS } from "@/theme/colors";

/** One shimmering block. Always give it the size of what it stands in for, so nothing moves when the content arrives. */
export default function Shimmer({ sx, variant = "rounded", ...props }: SkeletonProps) {
  return <Skeleton animation="wave" variant={variant} sx={[{ bgcolor: COLORS.border, borderRadius: variant === "rounded" ? "14px" : undefined }, ...(Array.isArray(sx) ? sx : [sx])]} {...props} />;
}
