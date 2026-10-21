"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChevronLeft, ChevronRight, GripVertical, ImageOff, Monitor, Plus, Smartphone, Trash2 } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { ExamBanner } from "@/types";
import { buttonSx, Field, FieldGrid, primaryButtonSx, TextInput } from "./formKit";
import ImageField from "./ImageField";
import { newBanner } from "./examForm";

type BannerGalleryProps = {
  banners: ExamBanner[];
  onChange: (banners: ExamBanner[]) => void;
  /** e.g. "Banner" or "Rankers banner" — used in labels. */
  itemName: string;
  webHint: string;
  mobileHint: string;
};

/** Moves one item of a list to a new position. */
const moveItem = <T,>(list: T[], from: number, to: number) => {
  const next = [...list];
  const [item] = next.splice(from, 1);

  next.splice(to, 0, item);

  return next;
};

/**
 * All banners as a strip of thumbnails (drag to reorder) + one big editor for the selected banner:
 * web and mobile images side by side, title and link.
 */
export default function BannerGallery({ banners, onChange, itemName, webHint, mobileHint }: BannerGalleryProps) {
  const [selected, setSelected] = useState(0);
  // The dragged thumbnail's index is kept in a ref too, so a drop works even before React re-renders
  const dragFromRef = useRef<number | null>(null);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dropAt, setDropAt] = useState<number | null>(null);
  const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);

  // Keep the selection valid when banners are added or removed
  useEffect(() => {
    if (selected > banners.length - 1) setSelected(Math.max(banners.length - 1, 0));
  }, [banners.length, selected]);

  useEffect(() => setIsConfirmingRemove(false), [selected]);

  const current = banners[selected];
  const label = itemName.toLowerCase();

  const updateCurrent = (changes: Partial<ExamBanner>) => onChange(banners.map((banner, index) => (index === selected ? { ...banner, ...changes } : banner)));

  const addBanner = () => {
    onChange([...banners, newBanner()]);
    setSelected(banners.length);
  };

  const removeCurrent = () => {
    onChange(banners.filter((_, index) => index !== selected));
    setSelected(Math.max(selected - 1, 0));
    setIsConfirmingRemove(false);
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to > banners.length - 1 || from === to) return;

    onChange(moveItem(banners, from, to));
    setSelected(to);
  };

  const endDrag = () => {
    dragFromRef.current = null;
    setDragFrom(null);
    setDropAt(null);
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {/* Thumbnails */}
      <Box>
        <Typography sx={{ mb: 1, color: COLORS.muted, fontSize: "0.8rem" }}>
          {banners.length ? `${banners.length} ${banners.length === 1 ? label : `${label}s`} — click one to edit it, drag to change the order (first is shown first).` : `No ${label}s yet.`}
        </Typography>
        <Box sx={{ display: "flex", gap: 1.25, overflowX: "auto", pb: 1 }}>
          {banners.map((banner, index) => {
            const image = banner.webImageUrl || banner.mobileImageUrl;
            const isSelected = index === selected;

            return (
              <Box
                key={index}
                role="button"
                tabIndex={0}
                draggable
                aria-label={`${itemName} ${index + 1}${banner.title ? `: ${banner.title}` : ""}`}
                aria-pressed={isSelected}
                onClick={() => setSelected(index)}
                onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(index); } }}
                onDragStart={(e: React.DragEvent) => {
                  dragFromRef.current = index;
                  setDragFrom(index);
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", String(index));
                }}
                onDragOver={(e: React.DragEvent) => { e.preventDefault(); setDropAt(index); }}
                onDrop={(e: React.DragEvent) => { e.preventDefault(); if (dragFromRef.current !== null) move(dragFromRef.current, index); endDrag(); }}
                onDragEnd={endDrag}
                sx={{
                  position: "relative",
                  flexShrink: 0,
                  width: 172,
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "grab",
                  bgcolor: "#FFFFFF",
                  border: `2px solid ${isSelected ? COLORS.red : dropAt === index && dragFrom !== index ? COLORS.yellowDark : COLORS.border}`,
                  boxShadow: isSelected ? "0 6px 16px rgba(254,0,52,.18)" : "none",
                  opacity: dragFrom === index ? 0.4 : 1,
                  transition: "border-color .15s, box-shadow .15s",
                  outline: "none",
                  "&:focus-visible": { borderColor: COLORS.red },
                }}
              >
                <Box sx={{ aspectRatio: "2.9 / 1", bgcolor: COLORS.surface, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.disabled }}>
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- thumbnail of a possibly unsaved upload
                    <img src={image} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <ImageOff size={18} />
                  )}
                </Box>
                <Box sx={{ px: 1, py: 0.6, display: "flex", alignItems: "center", gap: 0.5 }}>
                  <GripVertical size={14} color={COLORS.disabled} style={{ flexShrink: 0 }} />
                  <Typography noWrap sx={{ fontSize: "0.75rem", fontWeight: 700, color: isSelected ? COLORS.red : COLORS.body }}>
                    {index + 1}. {banner.title || "Untitled"}
                  </Typography>
                </Box>
                <Box sx={{ position: "absolute", top: 6, right: 6, display: "flex", gap: 0.5 }}>
                  <Box title={banner.webImageUrl ? "Has web image" : "No web image"} sx={{ width: 20, height: 20, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: banner.webImageUrl ? "#FFFFFF" : COLORS.redTint, color: banner.webImageUrl ? COLORS.success : COLORS.red, boxShadow: "0 1px 3px rgba(0,0,0,.2)" }}>
                    <Monitor size={12} />
                  </Box>
                  <Box title={banner.mobileImageUrl ? "Has mobile image" : "No mobile image"} sx={{ width: 20, height: 20, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: banner.mobileImageUrl ? "#FFFFFF" : COLORS.redTint, color: banner.mobileImageUrl ? COLORS.success : COLORS.red, boxShadow: "0 1px 3px rgba(0,0,0,.2)" }}>
                    <Smartphone size={12} />
                  </Box>
                </Box>
              </Box>
            );
          })}

          <Box
            component="button"
            type="button"
            onClick={addBanner}
            sx={{ flexShrink: 0, width: 172, minHeight: 90, borderRadius: "12px", border: `2px dashed ${COLORS.border}`, bgcolor: "#FFFFFF", color: COLORS.red, fontFamily: "inherit", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.5, "&:hover": { borderColor: COLORS.red, bgcolor: COLORS.redTintSoft } }}
          >
            <Plus size={20} /> Add {label}
          </Box>
        </Box>
      </Box>

      {/* Selected banner */}
      {current && (
        <Box sx={{ p: { xs: 2, md: 2.5 }, borderRadius: "16px", border: `1px solid ${COLORS.border}`, bgcolor: COLORS.surface, display: "grid", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, flexWrap: "wrap" }}>
            <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.95rem" }}>
              {itemName} {selected + 1} of {banners.length}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Box component="button" type="button" disabled={selected === 0} onClick={() => move(selected, selected - 1)} sx={{ ...buttonSx, height: 34 }}>
                <ChevronLeft size={15} /> Move earlier
              </Box>
              <Box component="button" type="button" disabled={selected === banners.length - 1} onClick={() => move(selected, selected + 1)} sx={{ ...buttonSx, height: 34 }}>
                Move later <ChevronRight size={15} />
              </Box>
              {isConfirmingRemove ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}` }}>
                  <Typography sx={{ color: COLORS.redDark, fontSize: "0.8rem", fontWeight: 700 }}>Remove this {label}?</Typography>
                  <Box component="button" type="button" onClick={removeCurrent} sx={{ ...primaryButtonSx, height: 28, px: 1.25, fontSize: "0.78rem" }}>Remove</Box>
                  <Box component="button" type="button" onClick={() => setIsConfirmingRemove(false)} sx={{ ...buttonSx, height: 28, px: 1.25, fontSize: "0.78rem" }}>Keep</Box>
                </Box>
              ) : (
                <Box component="button" type="button" onClick={() => setIsConfirmingRemove(true)} sx={{ ...buttonSx, height: 34, "&:hover": { color: COLORS.red, borderColor: COLORS.red } }}>
                  <Trash2 size={15} /> Remove {label}
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 3fr) minmax(0, 1fr)" }, gap: 2, alignItems: "start" }}>
            <ImageField label="Web image" hint={webHint} aspectRatio="2.9 / 1" maxHeight={340} value={current.webImageUrl} onChange={(webImageUrl) => updateCurrent({ webImageUrl })} />
            <ImageField label="Mobile image" hint={mobileHint} aspectRatio="3 / 4" maxHeight={340} value={current.mobileImageUrl} onChange={(mobileImageUrl) => updateCurrent({ mobileImageUrl })} />
          </Box>

          <FieldGrid>
            <Field label="Title" hint="Also used to describe the image for search engines">
              <TextInput value={current.title} onChange={(title) => updateCurrent({ title })} placeholder="e.g. UPSC Foundation Batch 2027/28" />
            </Field>
            <Field label="Link (on click)" hint="Page or URL, e.g. /#courses">
              <TextInput value={current.link} onChange={(link) => updateCurrent({ link })} placeholder="/#courses" />
            </Field>
          </FieldGrid>
        </Box>
      )}
    </Box>
  );
}
