"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CheckCheck, Eraser, Lock, Sparkles, Trash2 } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { isLevelWithin, SUPER_ADMIN, type AccessViewer, type Level, type Permissions, type RoleKey, type SectionKey } from "@/lib/adminAccess";
import { AdminAccessOptions } from "@/types";

export type AccessValue = { role: RoleKey; permissions: Permissions };

type AccessPickerProps = {
  options: AdminAccessOptions;
  value: AccessValue;
  onChange: (value: AccessValue) => void;
  /** The signed-in admin (Super Admin, or an Admin who can only give Members up to its own access, never Delete). */
  viewer: AccessViewer;
  viewerRole: RoleKey;
  /** The person's access before this edit — an Admin can't change sections where it has less access than they do. */
  current: Permissions;
};

const LEVEL_LABELS: Record<Level, string> = { none: "No access", view: "View", edit: "Edit" };

const pillSx = (isOn: boolean, isDisabled: boolean) =>
  ({
    height: 32,
    px: 1.25,
    border: `1px solid ${isOn ? COLORS.red : COLORS.border}`,
    bgcolor: isOn ? COLORS.red : "#FFFFFF",
    color: isOn ? "#FFFFFF" : COLORS.ink,
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: "0.78rem",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled && !isOn ? 0.45 : 1,
    "&:first-of-type": { borderRadius: "8px 0 0 8px" },
    "&:last-of-type": { borderRadius: "0 8px 8px 0" },
    "& + &": { borderLeft: 0 },
  }) as const;

/**
 * Role (Super Admin / Admin / Member) and, unless Super Admin, the access per section: No access / View / Edit,
 * and Delete (needs Edit — only Super Admins can give it). Presets fill the grid with the old fixed roles.
 */
export default function AccessPicker({ options, value, onChange, viewer, viewerRole, current }: AccessPickerProps) {
  const { role, permissions } = value;
  const isSuperViewer = viewerRole === SUPER_ADMIN;
  const viewerLevel = (section: SectionKey): Level => {
    if (isSuperViewer) return "edit";

    return viewer?.permissions?.[section]?.level || "none";
  };
  // An Admin can't change a section where the person already has more access than the Admin itself
  const isLocked = (section: SectionKey) => !isSuperViewer && !isLevelWithin(current[section].level, viewerLevel(section));

  const setSection = (section: SectionKey, changes: Partial<Permissions[SectionKey]>) => {
    const next = { ...permissions[section], ...changes };
    const canDelete = next.level === "edit" && next.canDelete;

    onChange({ role, permissions: { ...permissions, [section]: { ...next, canDelete } } });
  };

  const applyPreset = (sections: SectionKey[]) => {
    const next = Object.fromEntries(
      options.sections.map(({ key }) => {
        if (isLocked(key)) return [key, permissions[key]];

        const wanted: Level = sections.includes(key) ? "edit" : "none";
        const level = isLevelWithin(wanted, viewerLevel(key)) ? wanted : viewerLevel(key);

        return [key, { level, canDelete: false }];
      }),
    ) as Permissions;

    onChange({ role, permissions: next });
  };

  /**
   * Select all: Edit everywhere (up to the signer's own access), and Delete where a Super Admin may give it.
   * Clear all: no access anywhere. Locked sections keep their value.
   */
  const setAll = (isFull: boolean) => {
    const next = Object.fromEntries(
      options.sections.map(({ key, deletable }) => {
        if (isLocked(key)) return [key, permissions[key]];

        const level: Level = isFull ? viewerLevel(key) : "none";
        const canDelete = isFull && isSuperViewer && deletable && level === "edit";

        return [key, { level, canDelete }];
      }),
    ) as Permissions;

    onChange({ role, permissions: next });
  };

  const workspaces = [...new Set(options.sections.map(({ workspace }) => workspace))];

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {/* Role */}
      <Box role="radiogroup" aria-label="Role" sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" } }}>
        {options.roles.map(({ key, label, description }) => {
          const isChosen = role === key;
          const isAllowed = isSuperViewer || key === "member";

          return (
            <Box
              key={key}
              component="button"
              type="button"
              role="radio"
              aria-checked={isChosen}
              disabled={!isAllowed}
              onClick={() => onChange({ role: key, permissions })}
              sx={{ p: 1.5, borderRadius: "12px", textAlign: "left", fontFamily: "inherit", cursor: isAllowed ? "pointer" : "not-allowed", opacity: isAllowed ? 1 : 0.5, bgcolor: isChosen ? COLORS.redTint : "#FFFFFF", border: `1.5px solid ${isChosen ? COLORS.red : COLORS.border}` }}
            >
              <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 0.75 }}>
                {label} {!isAllowed && <Lock size={13} />}
              </Typography>
              <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.78rem" }}>{description}</Typography>
            </Box>
          );
        })}
      </Box>

      {role === SUPER_ADMIN && (
        <Typography sx={{ p: 1.5, borderRadius: "12px", bgcolor: COLORS.surface, color: COLORS.textSecondary, fontSize: "0.85rem" }}>
          Super Admins can view, edit and delete everything, and manage every user — no per-section access to set.
        </Typography>
      )}

      {role !== SUPER_ADMIN && (
        <>
          {/* Select all / clear all */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Box component="button" type="button" onClick={() => setAll(true)} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 36, px: 1.75, borderRadius: "10px", border: `1px solid ${COLORS.red}`, bgcolor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", "&:hover": { bgcolor: COLORS.redDark } }}>
              <CheckCheck size={16} /> Select all access
            </Box>
            <Box component="button" type="button" onClick={() => setAll(false)} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 36, px: 1.75, borderRadius: "10px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", color: COLORS.ink, fontFamily: "inherit", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", "&:hover": { borderColor: COLORS.red, color: COLORS.red } }}>
              <Eraser size={16} /> Clear all
            </Box>
            <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>
              {isSuperViewer ? "Select all gives View, Edit and Delete in every section." : "Select all gives everything you have yourself (without Delete)."}
            </Typography>
          </Box>

          {/* Presets */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.muted, fontSize: "0.8rem", fontWeight: 700, mr: 0.5 }}>
              <Sparkles size={14} /> Quick fill:
            </Typography>
            {options.presets.map(({ key, label, sections }) => (
              <Box key={key} component="button" type="button" onClick={() => applyPreset(sections)} sx={{ height: 30, px: 1.25, borderRadius: "999px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", color: COLORS.ink, fontFamily: "inherit", fontWeight: 600, fontSize: "0.78rem", cursor: "pointer", "&:hover": { borderColor: COLORS.red, color: COLORS.red } }}>
                {label}
              </Box>
            ))}
          </Box>

          {/* Section grid */}
          <Box sx={{ borderRadius: "14px", border: `1px solid ${COLORS.border}`, overflow: "hidden", bgcolor: "#FFFFFF" }}>
            {workspaces.map((workspace) => (
              <Box key={workspace}>
                <Typography sx={{ px: 1.75, py: 0.75, bgcolor: COLORS.surface, color: COLORS.muted, fontSize: "0.7rem", fontWeight: 800, letterSpacing: ".08em" }}>{workspace.toUpperCase()}</Typography>
                {options.sections
                  .filter((section) => section.workspace === workspace)
                  .map(({ key, label, description, deletable }) => {
                    const { level, canDelete } = permissions[key];
                    const locked = isLocked(key);
                    const canGiveDelete = isSuperViewer && deletable && level === "edit" && !locked;

                    return (
                      <Box key={key} sx={{ px: 1.75, py: 1.25, display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", borderTop: `1px solid ${COLORS.borderLight}` }}>
                        <Box sx={{ flex: 1, minWidth: 180 }}>
                          <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 0.5 }}>
                            {label} {locked && <Lock size={13} color={COLORS.muted} />}
                          </Typography>
                          <Typography sx={{ color: COLORS.muted, fontSize: "0.76rem" }}>{locked ? "Set by a Super Admin" : description || ""}</Typography>
                        </Box>
                        <Box role="radiogroup" aria-label={`${label} access`} sx={{ display: "flex" }}>
                          {options.levels.map((option) => {
                            const isDisabled = locked || !isLevelWithin(option, viewerLevel(key));

                            return (
                              <Box key={option} component="button" type="button" role="radio" aria-checked={level === option} disabled={isDisabled} onClick={() => setSection(key, { level: option })} sx={pillSx(level === option, isDisabled)}>
                                {LEVEL_LABELS[option]}
                              </Box>
                            );
                          })}
                        </Box>
                        <Box component="label" title={deletable ? "Delete items for good (needs Edit; only Super Admins give it)" : "Nothing in this section can be deleted"} sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 92, color: canDelete ? COLORS.redDark : COLORS.muted, fontSize: "0.8rem", fontWeight: 700, cursor: canGiveDelete ? "pointer" : "not-allowed", opacity: deletable ? 1 : 0.4 }}>
                          <input type="checkbox" checked={canDelete} disabled={!canGiveDelete} onChange={(e) => setSection(key, { canDelete: e.target.checked })} aria-label={`${label} delete`} />
                          <Trash2 size={13} /> Delete
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            ))}
          </Box>
          {!isSuperViewer && <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>You can give up to your own access. Only a Super Admin can give Delete access.</Typography>}
        </>
      )}
    </Box>
  );
}
