import React from "react";
import Box from "@mui/material/Box";
import { COLORS } from "@/theme/colors";

/** Renders "plain *highlighted* plain" with the starred words in brand red. */
export default function HighlightText({ text, color = COLORS.red }: { text: string; color?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <Box component="span" key={i} sx={{ color, fontWeight: 800 }}>{part.slice(1, -1)}</Box>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
