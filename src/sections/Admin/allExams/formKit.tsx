"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from "lucide-react";
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

/** Moves one item of a list to a new position. */
const moveItem = <T,>(list: T[], from: number, to: number) => {
  const next = [...list];
  const [item] = next.splice(from, 1);

  next.splice(to, 0, item);

  return next;
};

const smallButtonSx = { ...buttonSx, height: 30, px: 1.25, fontSize: "0.78rem", gap: 0.5 } as const;

/**
 * A list of cards that can be added, removed and reordered — drag a card by its handle,
 * or use "Move up" / "Move down". Removing asks for a quick confirmation on the card.
 */
export function ListEditor<T>({ items, onChange, createItem, renderItem, itemLabel, addLabel, emptyText = "Nothing added yet." }: ListEditorProps<T>) {
  // The dragged card's index is kept in a ref too, so a drop works even before React re-renders
  const dragFromRef = useRef<number | null>(null);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dropAt, setDropAt] = useState<number | null>(null);
  const [confirmingRemove, setConfirmingRemove] = useState<number | null>(null);

  const updateItem = (index: number, next: T) => onChange(items.map((item, i) => (i === index ? next : item)));

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    setConfirmingRemove(null);
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to > items.length - 1 || from === to) return;

    onChange(moveItem(items, from, to));
    setConfirmingRemove(null);
  };

  const endDrag = () => {
    dragFromRef.current = null;
    setDragFrom(null);
    setDropAt(null);
  };

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {!items.length && <Typography sx={{ color: COLORS.muted, fontSize: "0.86rem", py: 1 }}>{emptyText}</Typography>}

      {items.map((item, index) => (
        <Box
          key={index}
          data-list-card
          onDragOver={(e: React.DragEvent) => { if (dragFromRef.current === null) return; e.preventDefault(); setDropAt(index); }}
          onDrop={(e: React.DragEvent) => { e.preventDefault(); if (dragFromRef.current !== null) move(dragFromRef.current, index); endDrag(); }}
          sx={{
            p: 2,
            borderRadius: "14px",
            border: `1px solid ${dropAt === index && dragFrom !== index ? COLORS.yellowDark : COLORS.borderLight}`,
            boxShadow: dropAt === index && dragFrom !== index ? `0 0 0 2px ${COLORS.yellow}` : "none",
            bgcolor: COLORS.surface,
            opacity: dragFrom === index ? 0.45 : 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 1.75, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
              <Box
                draggable
                title="Drag to reorder"
                aria-hidden
                onDragStart={(e: React.DragEvent) => {
                  dragFromRef.current = index;
                  setDragFrom(index);
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", String(index));
                  const card = (e.currentTarget as HTMLElement).closest<HTMLElement>("[data-list-card]");
                  if (card) e.dataTransfer.setDragImage(card, 20, 20);
                }}
                onDragEnd={endDrag}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 30, borderRadius: "8px", color: COLORS.muted, cursor: "grab", "&:hover": { bgcolor: "#FFFFFF", color: COLORS.ink } }}
              >
                <GripVertical size={17} />
              </Box>
              <Typography noWrap sx={{ fontWeight: 700, color: COLORS.heading, fontSize: "0.88rem", minWidth: 0 }}>{itemLabel(item, index)}</Typography>
            </Box>

            {confirmingRemove === index ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.25, py: 0.5, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}` }}>
                <Typography sx={{ color: COLORS.redDark, fontSize: "0.78rem", fontWeight: 700 }}>Remove?</Typography>
                <Box component="button" type="button" onClick={() => removeItem(index)} sx={{ ...primaryButtonSx, height: 28, px: 1.25, fontSize: "0.78rem" }}>Remove</Box>
                <Box component="button" type="button" onClick={() => setConfirmingRemove(null)} sx={{ ...buttonSx, height: 28, px: 1.25, fontSize: "0.78rem" }}>Keep</Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 0.75, flexShrink: 0 }}>
                <Box component="button" type="button" disabled={index === 0} onClick={() => move(index, index - 1)} sx={smallButtonSx}>
                  <ArrowUp size={14} /> Move up
                </Box>
                <Box component="button" type="button" disabled={index === items.length - 1} onClick={() => move(index, index + 1)} sx={smallButtonSx}>
                  <ArrowDown size={14} /> Move down
                </Box>
                <Box component="button" type="button" onClick={() => setConfirmingRemove(index)} sx={{ ...smallButtonSx, "&:hover": { color: COLORS.red, borderColor: COLORS.red } }}>
                  <Trash2 size={14} /> Remove
                </Box>
              </Box>
            )}
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
