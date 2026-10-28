"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { Chip } from "../ui";
import { buttonSx, primaryButtonSx } from "../allExams/formKit";

/** One row in the order list. */
export type OrderItem = { _id: string; name: string; isActive: boolean; detail?: string };

type ReorderPanelProps = {
  items: OrderItem[];
  /** e.g. "Reorder categories" */
  title: string;
  /** What follows this order on the website. */
  description: string;
  /** Saves the ids in their new order. Throw to show the message here. */
  onSave: (ids: string[]) => Promise<void>;
  onCancel: () => void;
};

const moveItem = <T,>(list: T[], from: number, to: number) => {
  const next = [...list];
  const [item] = next.splice(from, 1);

  next.splice(to, 0, item);

  return next;
};

const smallButtonSx = { ...buttonSx, width: 32, height: 32, px: 0, justifyContent: "center" } as const;

/** Reorder any list (categories, banners, tiles…): drag a row by its handle or use the arrows, then save. */
export default function ReorderPanel({ items: initialItems, title, description, onSave, onCancel }: ReorderPanelProps) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  // Kept in a ref too, so a drop works even before React re-renders
  const dragFromRef = useRef<number | null>(null);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dropAt, setDropAt] = useState<number | null>(null);

  const isChanged = items.some(({ _id }, index) => _id !== initialItems[index]?._id);

  const move = (from: number, to: number) => {
    if (to < 0 || to > items.length - 1 || from === to) return;

    setItems((current) => moveItem(current, from, to));
    setError("");
  };

  const endDrag = () => {
    dragFromRef.current = null;
    setDragFrom(null);
    setDropAt(null);
  };

  const save = async () => {
    setBusy(true);
    setError("");

    try {
      await onSave(items.map(({ _id }) => _id));
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Couldn't save the order.");
      setBusy(false);
    }
  };

  return (
    <Box sx={{ mb: 2.5, p: { xs: 2, md: 2.5 }, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.redBorder}` }}>
      <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1rem" }}>{title}</Typography>
      <Typography sx={{ mt: 0.25, mb: 2, color: COLORS.muted, fontSize: "0.82rem" }}>{description} Drag a row by its handle or use the arrows, then save.</Typography>

      <Box component="ol" aria-label="Category order" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 0.75 }}>
        {items.map(({ _id, name, isActive, detail }, index) => (
          <Box
            component="li"
            key={_id}
            data-order-row
            onDragOver={(e: React.DragEvent) => { if (dragFromRef.current === null) return;

 e.preventDefault(); setDropAt(index); }}
            onDrop={(e: React.DragEvent) => { e.preventDefault();

 if (dragFromRef.current !== null) move(dragFromRef.current, index);

 endDrag(); }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 0.75,
              borderRadius: "12px",
              border: `1px solid ${dropAt === index && dragFrom !== index ? COLORS.yellowDark : COLORS.borderLight}`,
              boxShadow: dropAt === index && dragFrom !== index ? `0 0 0 2px ${COLORS.yellow}` : "none",
              bgcolor: COLORS.surface,
              opacity: dragFrom === index ? 0.45 : 1,
            }}
          >
            <Box
              draggable
              title="Drag to reorder"
              aria-hidden
              onDragStart={(e: React.DragEvent) => {
                dragFromRef.current = index;
                setDragFrom(index);
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", String(index));
                const row = (e.currentTarget as HTMLElement).closest<HTMLElement>("[data-order-row]");

                if (row) e.dataTransfer.setDragImage(row, 20, 20);
              }}
              onDragEnd={endDrag}
              sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 32, borderRadius: "8px", color: COLORS.muted, cursor: "grab", "&:hover": { bgcolor: "#FFFFFF", color: COLORS.ink } }}
            >
              <GripVertical size={17} />
            </Box>
            <Box sx={{ width: 26, height: 26, flexShrink: 0, borderRadius: "8px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.78rem", color: COLORS.ink }}>{index + 1}</Box>
            <Box sx={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography noWrap sx={{ fontWeight: 700, color: COLORS.ink, fontSize: "0.9rem" }}>{name}</Typography>
              {detail && <Typography sx={{ color: COLORS.muted, fontSize: "0.76rem" }}>{detail}</Typography>}
              {!isActive && <Chip tone="neutral">Inactive</Chip>}
            </Box>
            <Box component="button" type="button" aria-label={`Move ${name} up`} disabled={busy || index === 0} onClick={() => move(index, index - 1)} sx={smallButtonSx}>
              <ArrowUp size={15} />
            </Box>
            <Box component="button" type="button" aria-label={`Move ${name} down`} disabled={busy || index === items.length - 1} onClick={() => move(index, index + 1)} sx={smallButtonSx}>
              <ArrowDown size={15} />
            </Box>
          </Box>
        ))}
      </Box>

      {error && <Box role="alert" sx={{ mt: 1.5, px: 1.5, py: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.85rem", fontWeight: 600 }}>{error}</Box>}

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Box component="button" type="button" disabled={busy || !isChanged} onClick={save} sx={primaryButtonSx}>
          {busy && <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />} Save order
        </Box>
        <Box component="button" type="button" disabled={busy} onClick={onCancel} sx={buttonSx}>Cancel</Box>
      </Box>
    </Box>
  );
}
