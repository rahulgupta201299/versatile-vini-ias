"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { FileText, Link2, Trash2, Upload } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { uploadImageOrPdf } from "@/lib/uploadImage";
import { buttonSx, Field } from "../allExams/formKit";

type FileFieldProps = {
  label: string;
  /** Data URL of an uploaded file, a link, or "" */
  value: string;
  fileName: string;
  onChange: (value: { file: string; fileName: string }) => void;
  hint?: string;
};

const isPdf = (value: string) => value.startsWith("data:application/pdf") || /\.pdf($|\?)/i.test(value);

const isImage = (value: string) => value.startsWith("data:image/") || /\.(png|jpe?g|webp|gif|svg)($|\?)/i.test(value);

/** What the field holds now: an image preview, a PDF chip or the link. */
function CurrentFile({ value, fileName }: { value: string; fileName: string }) {
  if (isImage(value)) {
    return (
      <Box sx={{ position: "relative", width: 160, height: 110, flexShrink: 0, borderRadius: "10px", overflow: "hidden", border: `1px solid ${COLORS.border}`, bgcolor: COLORS.surface }}>
        <Image src={value} alt={fileName || "Syllabus"} fill sizes="160px" style={{ objectFit: "contain" }} />
      </Box>
    );
  }

  const Icon = isPdf(value) ? FileText : Link2;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0, p: 1.25, borderRadius: "10px", bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
      <Icon size={20} color={COLORS.red} style={{ flexShrink: 0 }} />
      <Typography noWrap sx={{ fontWeight: 700, color: COLORS.ink, fontSize: "0.88rem" }}>{fileName || value}</Typography>
    </Box>
  );
}

/** Upload an image or a PDF (replacing the current one), or remove it. */
export default function FileField({ label, value, fileName, onChange, hint }: FileFieldProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];

    if (!file) return;

    setIsBusy(true);
    setError("");

    try {
      onChange({ file: await uploadImageOrPdf(file), fileName: file.name });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setIsBusy(false);
      event.target.value = "";
    }
  };

  return (
    <Field label={label} hint={hint} group>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
        {value && <CurrentFile value={value} fileName={fileName} />}
        <Box component="button" type="button" disabled={isBusy} onClick={() => fileInput.current?.click()} sx={buttonSx}>
          {isBusy ? <CircularProgress size={16} /> : <Upload size={16} />} {value ? "Replace file" : "Upload image or PDF"}
        </Box>
        {value && (
          <Box component="button" type="button" onClick={() => onChange({ file: "", fileName: "" })} sx={{ ...buttonSx, color: COLORS.redDark }}>
            <Trash2 size={16} /> Remove
          </Box>
        )}
        <input ref={fileInput} type="file" accept="image/*,application/pdf" hidden onChange={handleFile} />
      </Box>
      {error && <Typography role="alert" sx={{ mt: 1, color: COLORS.redDark, fontSize: "0.82rem", fontWeight: 600 }}>{error}</Typography>}
    </Field>
  );
}
