import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { COLORS } from "@/theme/colors";

type HighlightTitleProps = {
  /** Text around the highlight is rendered as-is, so include its spaces ("Frequently "). */
  before?: ReactNode;
  /** The word(s) shown in brand red. */
  highlight: ReactNode;
  after?: ReactNode;
  /** Leave unset to inherit the parent's alignment. */
  align?: "left" | "center";
  sx?: SxProps<Theme>;
};

/** Navy section heading with one red highlighted phrase, e.g. "Frequently **Asked** Questions". */
export default function HighlightTitle({ before, highlight, after, align = "left", sx }: HighlightTitleProps) {
  return (
    <Typography component="h2" sx={[{ textAlign: align, fontWeight: 900, fontSize: { xs: "1.65rem", md: "2.4rem" }, lineHeight: 1.2, color: COLORS.navy }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {before}
      <Box component="span" sx={{ color: COLORS.red }}>{highlight}</Box>
      {after}
    </Typography>
  );
}
