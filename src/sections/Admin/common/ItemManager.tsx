"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowUpDown, Pencil, Plus } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { buttonSx, primaryButtonSx, StatusToggle } from "../allExams/formKit";
import ListGroup from "./ListGroup";
import ReorderPanel from "./ReorderPanel";

type ManagedItem = { _id: string; isActive: boolean };

export type ItemManagerProps<T extends ManagedItem, Input> = {
  items: T[];
  /** e.g. "banner" → "Add banner", "Active banners" */
  itemName: string;
  /** Plural for headings, e.g. "banners" */
  itemsName: string;
  /** Where this order shows on the website, for the reorder panel. */
  orderDescription: string;
  getName: (item: T) => string;
  newInput: () => Input;
  toInput: (item: T) => Input;
  /** Problems that stop saving, as readable sentences. */
  validate: (input: Input) => string[];
  /** The row's left side: thumbnail / icon and text. */
  renderPreview: (item: T) => React.ReactNode;
  /** The edit form's fields. */
  renderForm: (input: Input, update: (changes: Partial<Input>) => void) => React.ReactNode;
  onCreate: (input: Input) => Promise<unknown>;
  onUpdate: (id: string, input: Input) => Promise<unknown>;
  onStatus: (id: string, isActive: boolean) => Promise<unknown>;
  onReorder: (ids: string[]) => Promise<unknown>;
  activeHint: string;
  inactiveHint: string;
};

const errorBoxSx = { px: 1.5, py: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.85rem", fontWeight: 600 } as const;

const NEW = "new";

/** Add / edit form (inline, no pop-ups). Throws from onSave show their message here. */
function ItemForm<Input>({ initial, isNew, itemName, validate, renderForm, onSave, onCancel }: {
  initial: Input;
  isNew: boolean;
  itemName: string;
  validate: (input: Input) => string[];
  renderForm: ItemManagerProps<ManagedItem, Input>["renderForm"];
  onSave: (input: Input) => Promise<void>;
  onCancel: () => void;
}) {
  const [input, setInput] = useState(initial);
  const [problems, setProblems] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const update = (changes: Partial<Input>) => {
    setInput((current) => ({ ...current, ...changes }));
    setProblems([]);
  };

  const save = async () => {
    const found = validate(input);

    setProblems(found);

    if (found.length) return;

    setBusy(true);

    try {
      await onSave(input);
    } catch (error) {
      setProblems([error instanceof Error ? error.message : "Couldn't save."]);
      setBusy(false);
    }
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {renderForm(input, update)}
      {!!problems.length && (
        <Box role="alert" sx={errorBoxSx}>
          {problems.map((problem) => (
            <div key={problem}>• {problem}</div>
          ))}
        </Box>
      )}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box component="button" type="button" disabled={busy} onClick={save} sx={primaryButtonSx}>
          {busy && <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />} {isNew ? `Add ${itemName}` : "Save changes"}
        </Box>
        <Box component="button" type="button" disabled={busy} onClick={onCancel} sx={buttonSx}>Cancel</Box>
      </Box>
    </Box>
  );
}

/**
 * A list the admin manages: active and inactive items shown separately, switch on / off,
 * edit inline, add, and reorder. Nothing is deleted. Used by hero slides, marketing banners,
 * free resources and Select Your Goal exams.
 */
export default function ItemManager<T extends ManagedItem, Input>(props: ItemManagerProps<T, Input>) {
  const { items, itemName, itemsName, orderDescription, getName, newInput, toInput, validate, renderPreview, renderForm, onCreate, onUpdate, onStatus, onReorder, activeHint, inactiveHint } = props;
  const router = useRouter();
  const [editingId, setEditingId] = useState("");
  const [isReordering, setIsReordering] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [actionError, setActionError] = useState("");

  const activeItems = items.filter(({ isActive }) => isActive);
  const inactiveItems = items.filter(({ isActive }) => !isActive);

  const afterSave = () => {
    setEditingId("");
    router.refresh();
  };

  const create = async (input: Input) => {
    await onCreate(input);
    afterSave();
  };

  const save = (id: string) => async (input: Input) => {
    await onUpdate(id, input);
    afterSave();
  };

  const setStatus = async (id: string, isActive: boolean) => {
    setBusyId(id);
    setActionError("");

    try {
      await onStatus(id, isActive);
      router.refresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Couldn't change the status.");
    } finally {
      setBusyId("");
    }
  };

  const saveOrder = async (ids: string[]) => {
    await onReorder(ids);
    setIsReordering(false);
    router.refresh();
  };

  const renderItem = (item: T, index: number) => {
    const { _id, isActive } = item;
    const isEditing = editingId === _id;

    return (
      <Box key={_id} sx={{ borderTop: index ? `1px solid ${COLORS.borderLight}` : "none" }}>
        <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.5, display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", opacity: isActive ? 1 : 0.75 }}>
          <Box sx={{ flex: 1, minWidth: 220 }}>{renderPreview(item)}</Box>
          <StatusToggle isActive={isActive} disabled={busyId === _id} onChange={(next) => setStatus(_id, next)} label={`${getName(item)} status`} />
          {!isEditing && (
            <Box component="button" type="button" onClick={() => setEditingId(_id)} sx={{ ...buttonSx, height: 34, px: 1.5 }}>
              <Pencil size={14} /> Edit
            </Box>
          )}
        </Box>
        {isEditing && (
          <Box sx={{ mx: { xs: 2, md: 2.5 }, mb: 2, p: 2, borderRadius: "14px", bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <ItemForm initial={toInput(item)} isNew={false} itemName={itemName} validate={validate} renderForm={renderForm} onSave={save(_id)} onCancel={() => setEditingId("")} />
          </Box>
        )}
      </Box>
    );
  };

  const orderItems = items.map((item) => ({ _id: item._id, name: getName(item), isActive: item.isActive }));

  return (
    <Box sx={{ display: "grid", gap: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap" }}>
        <Typography sx={{ color: COLORS.muted, fontSize: "0.86rem", fontWeight: 600 }}>
          {activeItems.length} active · {inactiveItems.length} inactive
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box component="button" type="button" disabled={isReordering || items.length < 2} onClick={() => setIsReordering(true)} sx={buttonSx}>
            <ArrowUpDown size={16} /> Reorder
          </Box>
          <Box component="button" type="button" disabled={editingId === NEW} onClick={() => setEditingId(NEW)} sx={primaryButtonSx}>
            <Plus size={16} /> Add {itemName}
          </Box>
        </Box>
      </Box>

      {actionError && <Box role="alert" sx={errorBoxSx}>{actionError}</Box>}

      {isReordering && <ReorderPanel items={orderItems} title={`Reorder ${itemsName}`} description={orderDescription} onSave={saveOrder} onCancel={() => setIsReordering(false)} />}

      {editingId === NEW && (
        <Box sx={{ p: { xs: 2, md: 2.5 }, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.redBorder}` }}>
          <Typography component="h2" sx={{ mb: 2, fontWeight: 800, color: COLORS.ink, fontSize: "1rem" }}>New {itemName}</Typography>
          <ItemForm initial={newInput()} isNew itemName={itemName} validate={validate} renderForm={renderForm} onSave={create} onCancel={() => setEditingId("")} />
        </Box>
      )}

      <ListGroup title={`Active ${itemsName}`} hint={activeHint} count={activeItems.length}>
        {activeItems.map(renderItem)}
      </ListGroup>
      <ListGroup title={`Inactive ${itemsName}`} hint={inactiveHint} count={inactiveItems.length}>
        {inactiveItems.map(renderItem)}
      </ListGroup>
    </Box>
  );
}
