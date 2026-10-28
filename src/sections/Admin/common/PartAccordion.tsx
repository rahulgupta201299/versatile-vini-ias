"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import { Check, ChevronDown, ChevronsDownUp, ChevronsUpDown, Save } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { buttonSx, primaryButtonSx } from "../allExams/formKit";

/*
 * Editors made of parts that are saved one at a time (Header & Menu, GS Foundation pages, Contact Info):
 * `usePart` keeps a part's input and save state, `PartCard` shows it as an accordion, `useOpenParts` +
 * `ExpandAllButton` open and close them.
 */

type Status = "idle" | "saving" | "saved";

type PartOptions<T, Saved> = {
  /** Problems to fix before saving (empty → save). */
  validate: (input: T) => string[];
  /** Sends the part to the backend and returns what was saved. */
  submit: (input: T) => Promise<Saved>;
  /** The part's input from the saved response. */
  fromSaved: (saved: Saved) => T;
};

export type Part = { save: () => void; problems: string[]; status: Status; isDirty: boolean };

/** One part: its input, the saved copy (to know about unsaved changes), problems and save status. */
export function usePart<T, Saved>(initial: T, { validate, submit, fromSaved }: PartOptions<T, Saved>) {
  const router = useRouter();
  const [input, setInput] = useState<T>(initial);
  const [snapshot, setSnapshot] = useState(() => JSON.stringify(initial));
  const [problems, setProblems] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const update = (next: T) => {
    setInput(next);
    setProblems([]);
  };

  const save = async () => {
    const found = validate(input);

    setProblems(found);

    if (found.length) return;

    setStatus("saving");

    try {
      const saved = fromSaved(await submit(input));

      setInput(saved);
      setSnapshot(JSON.stringify(saved));
      setStatus("saved");
      router.refresh();
    } catch (error) {
      setProblems([error instanceof Error ? error.message : "Save failed."]);
      setStatus("idle");
    }
  };

  return { input, update, save, problems, status, isDirty: JSON.stringify(input) !== snapshot };
}

/** Which parts are open, with toggles for one part and for all of them. */
export function useOpenParts<Key extends string>(keys: Key[]) {
  const [openKeys, setOpenKeys] = useState<Key[]>([]);
  const isAllOpen = openKeys.length === keys.length;

  const toggle = (key: Key) =>
    setOpenKeys((current) => {
      if (current.includes(key)) return current.filter((openKey) => openKey !== key);

      return [...current, key];
    });

  const toggleAll = () => {
    if (isAllOpen) return setOpenKeys([]);

    setOpenKeys(keys);
  };

  return { isOpen: (key: Key) => openKeys.includes(key), toggle, toggleAll, isAllOpen };
}

export function ExpandAllButton({ isAllOpen, onClick }: { isAllOpen: boolean; onClick: () => void }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Box component="button" type="button" onClick={onClick} sx={{ ...buttonSx, height: 36, fontSize: "0.82rem", gap: 0.75 }}>
        {isAllOpen ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />} {isAllOpen ? "Collapse all" : "Expand all"}
      </Box>
    </Box>
  );
}

/** The line next to the Save button. */
const saveMessage = (isDirty: boolean, status: Status, savedText: string) => {
  if (isDirty) return "Unsaved changes";

  if (status === "saved") return (<><Check size={15} /> {savedText}</>);

  return "";
};

type PartCardProps = {
  id: string;
  step: number | string;
  title: string;
  description: string;
  summary?: string;
  isOpen: boolean;
  onToggle: () => void;
  part: Part;
  canEdit: boolean;
  /** Shown after a save, e.g. "Saved — live on the website". */
  savedText?: string;
  children: React.ReactNode;
};

/** One part as an accordion: the header (title, summary, unsaved badge) opens it; inside are its fields and Save. */
export function PartCard({ id, step, title, description, summary, isOpen, onToggle, part, canEdit, savedText = "Saved — live on the website", children }: PartCardProps) {
  const { save, problems, status, isDirty } = part;

  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: 90, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${isOpen ? COLORS.redBorder : COLORS.border}`, overflow: "hidden" }}>
      <Box component="button" type="button" onClick={onToggle} aria-expanded={isOpen} aria-controls={`${id}-panel`} sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1.5, p: { xs: 2, md: 2.5 }, border: 0, bgcolor: "transparent", textAlign: "left", cursor: "pointer", fontFamily: "inherit", "&:hover": { bgcolor: "#FAFBFC" } }}>
        <Box sx={{ minWidth: 30, height: 30, px: 0.75, flexShrink: 0, borderRadius: "9px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>{step}</Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography component="h2" sx={{ color: COLORS.ink, fontWeight: 800, fontSize: "1.05rem" }}>{title}</Typography>
            {summary && <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: "999px", bgcolor: "#F1F3F7", color: COLORS.muted, fontSize: "0.74rem", fontWeight: 700 }}>{summary}</Box>}
            {isDirty && <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: "999px", bgcolor: COLORS.redTint, color: COLORS.redDark, fontSize: "0.74rem", fontWeight: 700 }}>Unsaved changes</Box>}
          </Box>
          <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.83rem" }}>{description}</Typography>
        </Box>
        <Box sx={{ flexShrink: 0, color: COLORS.muted, display: "flex", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>
          <ChevronDown size={20} />
        </Box>
      </Box>

      <Collapse in={isOpen} id={`${id}-panel`}>
        <Box sx={{ display: "grid", gap: 2, px: { xs: 2.25, md: 3 }, pb: { xs: 2.25, md: 3 }, pt: { xs: 2, md: 2.5 }, borderTop: `1px solid ${COLORS.border}` }}>
          {children}

          {!!problems.length && (
            <Box role="alert" sx={{ p: 1.5, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.84rem", fontWeight: 600 }}>
              {problems.map((problem) => (
                <div key={problem}>• {problem}</div>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
            <Box component="button" type="button" disabled={!canEdit || status === "saving" || !isDirty} onClick={save} sx={primaryButtonSx}>
              {status === "saving" ? <CircularProgress size={16} sx={{ color: "#FFFFFF" }} /> : <Save size={16} />} Save {title.toLowerCase()}
            </Box>
            <Typography sx={{ color: isDirty ? COLORS.redDark : COLORS.success, fontSize: "0.84rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>{saveMessage(isDirty, status, savedText)}</Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
