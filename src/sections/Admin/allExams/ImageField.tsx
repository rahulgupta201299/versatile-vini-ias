"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { uploadImage } from "@/lib/uploadImage";
import { buttonSx, Field } from "./formKit";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Preview shape, e.g. "2.9 / 1" for web banners, "3 / 4" for mobile. */
  aspectRatio?: string;
  hint?: string;
  /** Max height of the preview box (the image keeps its shape inside). */
  maxHeight?: number;
};

/** Shows the current image. Upload by clicking the box, the Upload button, or dropping a file on it. */
export default function ImageField({ label, value, onChange, aspectRatio = "16 / 9", hint, maxHeight = 260 }: ImageFieldProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

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

  const openPicker = () => fileInput.current?.click();

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <Field label={label} hint={hint}>
      <Box
        role="button"
        tabIndex={0}
        aria-label={value ? `Replace ${label.toLowerCase()}` : `Upload ${label.toLowerCase()}`}
        onClick={openPicker}
        onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } }}
        onDragOver={(e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio,
          maxHeight,
          borderRadius: "12px",
          overflow: "hidden",
          border: `2px dashed ${isDragOver ? COLORS.red : value ? "transparent" : COLORS.border}`,
          bgcolor: isDragOver ? COLORS.redTintSoft : value ? "#0F172A0A" : "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          outline: "none",
          transition: "border-color .15s, background-color .15s",
          "&:hover, &:focus-visible": { borderColor: COLORS.red },
        }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- previews uploads that aren't saved yet
          <img src={value} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75, px: 2, textAlign: "center", color: COLORS.muted, fontSize: "0.82rem" }}>
            <ImagePlus size={26} color={COLORS.red} />
            <b style={{ color: COLORS.ink }}>Click or drop an image</b>
            <span>PNG, JPG or WebP · under 1 MB</span>
          </Box>
        )}
        {busy && (
          <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(255,255,255,.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress size={26} />
          </Box>
        )}
      </Box>

      {value && (
        <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Box component="button" type="button" disabled={busy} onClick={openPicker} sx={{ ...buttonSx, height: 34 }}>
            <Upload size={15} /> Replace
          </Box>
          <Box component="button" type="button" onClick={() => onChange("")} sx={{ ...buttonSx, height: 34 }}>
            <Trash2 size={15} /> Remove image
          </Box>
        </Box>
      )}

      <input ref={fileInput} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />

      {error && <Typography role="alert" sx={{ mt: 0.75, color: COLORS.redDark, fontSize: "0.8rem", fontWeight: 600 }}>{error}</Typography>}
    </Field>
  );
}
