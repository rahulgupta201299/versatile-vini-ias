"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ImageOff, Trash2, Upload } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { isInlineImage, uploadImage } from "@/lib/uploadImage";
import { buttonSx, Field, inputSx } from "./formKit";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Preview shape, e.g. "2.9 / 1" for web banners, "3 / 4" for mobile. */
  aspectRatio?: string;
  hint?: string;
};

/** Shows the current image and lets the admin upload a new one, paste a URL, or remove it. */
export default function ImageField({ label, value, onChange, aspectRatio = "16 / 9", hint }: ImageFieldProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;

    setBusy(true);
    setError("");

    try {
      onChange(await uploadImage(file));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <Field label={label} hint={hint}>
      <Box sx={{ position: "relative", width: "100%", aspectRatio, maxHeight: 220, borderRadius: "12px", overflow: "hidden", border: `1px dashed ${COLORS.border}`, bgcolor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- previews any URL, including not-yet-saved uploads
          <img src={value} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, color: COLORS.disabled, fontSize: "0.8rem" }}>
            <ImageOff size={22} /> No image
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Box component="button" type="button" disabled={busy} onClick={() => fileInput.current?.click()} sx={buttonSx}>
          <Upload size={15} /> {value ? "Replace" : "Upload"}
        </Box>
        {value && (
          <Box component="button" type="button" onClick={() => onChange("")} sx={buttonSx}>
            <Trash2 size={15} /> Remove
          </Box>
        )}
        <input ref={fileInput} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
      </Box>

      <Box
        component="input"
        value={isInlineImage(value) ? "" : value}
        placeholder={isInlineImage(value) ? "Uploaded image (saved with this exam until S3 is connected)" : "…or paste an image URL / path, e.g. /images/banners/x.webp"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value.trim())}
        sx={{ ...inputSx, mt: 1, fontSize: "0.82rem" }}
      />

      {error && <Typography sx={{ mt: 0.75, color: COLORS.redDark, fontSize: "0.8rem", fontWeight: 600 }}>{error}</Typography>}
    </Field>
  );
}
