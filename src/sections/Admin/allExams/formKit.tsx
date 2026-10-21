"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Small form building blocks for admin editors (inputs, section cards, repeatable lists). */

export const inputSx = {
  width: "100%",
  minHeight: 42,
  px: 1.5,
  py: 1,
  borderRadius: "10px",
  border: `1.5px solid ${COLORS.border}`,
  bgcolor: "#FFFFFF",
  fontFamily: "inherit",
  fontSize: "0.92rem",
  color: COLORS.ink,
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
  "&:focus": { borderColor: COLORS.red, boxShadow: `0 0 0 3px ${COLORS.redTint}` },
  "&::placeholder": { color: COLORS.disabled },
} as const;

export const buttonSx = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.75,
  height: 40,
  px: 2,
  borderRadius: "10px",
  border: `1px solid ${COLORS.border}`,
  bgcolor: "#FFFFFF",
  color: COLORS.ink,
  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "0.86rem",
  cursor: "pointer",
  whiteSpace: "nowrap",
  textDecoration: "none",
  transition: "all .15s",
  "&:hover:not(:disabled)": { borderColor: COLORS.redBorder, color: COLORS.red },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
} as const;

export const primaryButtonSx = {
  ...buttonSx,
  border: "none",
  bgcolor: COLORS.red,
  color: "#FFFFFF",
  "&:hover:not(:disabled)": { bgcolor: COLORS.redDark },
} as const;

export const iconButtonSx = {
  width: 32,
  height: 32,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  border: `1px solid ${COLORS.border}`,
  bgcolor: "#FFFFFF",
  color: COLORS.textSecondary,
  cursor: "pointer",
  "&:hover:not(:disabled)": { color: COLORS.red, borderColor: COLORS.redBorder },
  "&:disabled": { opacity: 0.35, cursor: "not-allowed" },
} as const;

/** Label + input. `hint` explains the field, `required` adds a red star. */
export function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <Box component="label" sx={{ display: "block", minWidth: 0 }}>
      <Typography component="span" sx={{ display: "block", mb: 0.6, color: COLORS.heading, fontWeight: 700, fontSize: "0.82rem" }}>
        {label}
        {required && <Box component="span" sx={{ color: COLORS.red }}> *</Box>}
      </Typography>
      {children}
      {hint && <Typography component="span" sx={{ display: "block", mt: 0.5, color: COLORS.muted, fontSize: "0.75rem" }}>{hint}</Typography>}
    </Box>
  );
}

type TextInputProps = { value: string; onChange: (value: string) => void; placeholder?: string; type?: string };

export function TextInput({ value, onChange, placeholder, type = "text" }: TextInputProps) {
  return <Box component="input" type={type} value={value} placeholder={placeholder} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} sx={inputSx} />;
}

export function TextArea({ value, onChange, placeholder, rows = 3 }: Omit<TextInputProps, "type"> & { rows?: number }) {
  return <Box component="textarea" rows={rows} value={value} placeholder={placeholder} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)} sx={{ ...inputSx, resize: "vertical", lineHeight: 1.5 }} />;
}

export function NumberInput({ value, onChange, placeholder }: { value: number; onChange: (value: number) => void; placeholder?: string }) {
  return (
    <Box
      component="input"
      type="number"
      min={0}
      value={Number.isFinite(value) ? value : 0}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value) || 0)}
      sx={inputSx}
    />
  );
}

/** Responsive grid of fields: 1 column on phones, `columns` on wider screens. */
export function FieldGrid({ columns = 2, children }: { columns?: number; children: React.ReactNode }) {
  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: `repeat(${columns}, minmax(0, 1fr))` }, gap: 2 }}>{children}</Box>;
}

/** A numbered section of the editor, e.g. "3 · Watch Free Online Classes". */
export function SectionCard({ id, step, title, description, children }: { id: string; step?: number; title: string; description?: string; children: React.ReactNode }) {
  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: 90, p: { xs: 2.25, md: 3 }, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2.5 }}>
        {step && (
          <Box sx={{ width: 30, height: 30, flexShrink: 0, borderRadius: "9px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>{step}</Box>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h2" sx={{ color: COLORS.ink, fontWeight: 800, fontSize: "1.05rem" }}>{title}</Typography>
          {description && <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.83rem" }}>{description}</Typography>}
        </Box>
      </Box>
      <Box sx={{ display: "grid", gap: 2 }}>{children}</Box>
    </Box>
  );
}

type ListEditorProps<T> = {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  renderItem: (item: T, onItemChange: (item: T) => void, index: number) => React.ReactNode;
  itemLabel: (item: T, index: number) => string;
  addLabel: string;
  emptyText?: string;
};

/** A list of items that can be added, removed and moved up / down. */
export function ListEditor<T>({ items, onChange, createItem, renderItem, itemLabel, addLabel, emptyText = "Nothing added yet." }: ListEditorProps<T>) {
  const updateItem = (index: number, next: T) => onChange(items.map((item, i) => (i === index ? next : item)));
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));
  const moveItem = (index: number, direction: -1 | 1) => {
    const next = [...items];
    const target = index + direction;

    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {!items.length && <Typography sx={{ color: COLORS.muted, fontSize: "0.86rem", py: 1 }}>{emptyText}</Typography>}

      {items.map((item, index) => (
        <Box key={index} sx={{ p: 2, borderRadius: "14px", border: `1px solid ${COLORS.borderLight}`, bgcolor: COLORS.surface }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 1.75 }}>
            <Typography noWrap sx={{ fontWeight: 700, color: COLORS.heading, fontSize: "0.88rem", minWidth: 0 }}>{itemLabel(item, index)}</Typography>
            <Box sx={{ display: "flex", gap: 0.75, flexShrink: 0 }}>
              <Box component="button" type="button" aria-label="Move up" disabled={index === 0} onClick={() => moveItem(index, -1)} sx={iconButtonSx}>
                <ArrowUp size={15} />
              </Box>
              <Box component="button" type="button" aria-label="Move down" disabled={index === items.length - 1} onClick={() => moveItem(index, 1)} sx={iconButtonSx}>
                <ArrowDown size={15} />
              </Box>
              <Box component="button" type="button" aria-label="Remove" onClick={() => removeItem(index)} sx={{ ...iconButtonSx, "&:hover": { color: "#FFFFFF", bgcolor: COLORS.red, borderColor: COLORS.red } }}>
                <Trash2 size={15} />
              </Box>
            </Box>
          </Box>
          {renderItem(item, (next) => updateItem(index, next), index)}
        </Box>
      ))}

      <Box component="button" type="button" onClick={() => onChange([...items, createItem()])} sx={{ ...buttonSx, justifySelf: "start", borderStyle: "dashed" }}>
        <Plus size={16} /> {addLabel}
      </Box>
    </Box>
  );
}

/** Active / inactive switch. Inactive content stays saved but is hidden on the website. */
export function StatusToggle({ isActive, onChange, disabled, label = "Status" }: { isActive: boolean; onChange: (isActive: boolean) => void; disabled?: boolean; label?: string }) {
  return (
    <Box
      component="button"
      type="button"
      role="switch"
      aria-checked={isActive}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!isActive)}
      sx={{ display: "inline-flex", alignItems: "center", gap: 1, p: 0, border: "none", bgcolor: "transparent", fontFamily: "inherit", cursor: "pointer", "&:disabled": { opacity: 0.5, cursor: "wait" } }}
    >
      <Box sx={{ position: "relative", width: 40, height: 22, flexShrink: 0, borderRadius: 999, bgcolor: isActive ? COLORS.success : COLORS.disabled, transition: "background-color .2s" }}>
        <Box sx={{ position: "absolute", top: 3, left: isActive ? 21 : 3, width: 16, height: 16, borderRadius: "50%", bgcolor: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,.25)", transition: "left .2s" }} />
      </Box>
      <Box component="span" sx={{ fontSize: "0.82rem", fontWeight: 700, color: isActive ? COLORS.success : COLORS.muted }}>{isActive ? "Active" : "Inactive"}</Box>
    </Box>
  );
}
