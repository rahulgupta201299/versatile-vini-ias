"use client";

import { useRef, useState, type FormEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { CheckCircle2 } from "lucide-react";
import { useFormValidation, validateMobile, sanitizeMobile } from "@/utils/validation";
import { COLORS } from "@/theme/colors";

type MobileCallbackFormProps = {
  ctaLabel: string;
  /** "row": field and button side by side from tablet up. "stack": button under the field. */
  layout?: "row" | "stack";
  /** Who calls back, used in the thank-you line ("Our mentor will call you…"). */
  caller?: string;
};

const BUTTON_SX = { height: 48, px: 3, border: "none", borderRadius: "10px", bgcolor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", whiteSpace: "nowrap", "&:hover": { bgcolor: COLORS.redDark } } as const;

/** One-field "get a callback" form (Indian mobile number) with its thank-you state. */
export default function MobileCallbackForm({ ctaLabel, layout = "row", caller = "mentor" }: MobileCallbackFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSent, setIsSent] = useState(false);
  const form = useFormValidation({ mobile: "" }, { mobile: (value) => validateMobile(value) }, { mobile: sanitizeMobile });
  const isRow = layout === "row";

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (form.validateAll(formRef.current)) setIsSent(true);
  };

  if (isSent) {
    return (
      <Box sx={{ display: "flex", gap: 1.25, alignItems: "center", p: 1.5, borderRadius: "12px", bgcolor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
        <CheckCircle2 size={22} color={COLORS.success} />
        <Typography sx={{ fontSize: "0.92rem", color: COLORS.body }}>
          Thanks! Our {caller} will call you at <b>+91 {form.values.mobile}</b> shortly.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" ref={formRef} noValidate onSubmit={handleSubmit} sx={isRow ? { display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.25, alignItems: { sm: "flex-start" } } : { display: "grid", gap: 1.25, maxWidth: 440 }}>
      <TextField
        placeholder="Enter your mobile number"
        {...form.fieldProps("mobile")}
        helperText={form.visibleError("mobile") || undefined}
        required
        type="tel"
        autoComplete="tel-national"
        inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box component="span" sx={{ fontWeight: 700, color: COLORS.navy }}>+91</Box>
            </InputAdornment>
          ),
          sx: { height: 48, borderRadius: "10px", bgcolor: "#FFFFFF" },
        }}
        sx={{ flex: 1 }}
      />
      <Box component="button" type="submit" sx={isRow ? BUTTON_SX : { ...BUTTON_SX, justifySelf: "start" }}>
        {ctaLabel}
      </Box>
    </Box>
  );
}
