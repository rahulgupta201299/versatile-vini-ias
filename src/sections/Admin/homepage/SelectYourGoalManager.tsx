"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowUpDown, EyeOff, FolderPlus, GraduationCap, Pencil } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { adminRequest } from "@/lib/adminClient";
import { goalPath } from "@/utils/slug";
import { AdminGoalCategory, AdminGoalExam, GoalExamInput } from "@/types";
import { Chip } from "../ui";
import CategoryNameForm from "../allExams/CategoryNameForm";
import ImageField from "../allExams/ImageField";
import { buttonSx, Field, FieldGrid, inputSx, StatusToggle, TextInput } from "../allExams/formKit";
import ItemManager from "../common/ItemManager";
import ReorderPanel from "../common/ReorderPanel";

const API_PATH = "homepage/select-your-goal";

const smallButtonSx = { ...buttonSx, height: 34, px: 1.5 };

const errorBoxSx = { px: 2, py: 1.5, borderRadius: "12px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.88rem", fontWeight: 600 } as const;

const examCount = ({ exams }: AdminGoalCategory) => {
  const active = exams.filter(({ isActive }) => isActive).length;

  return `${active} of ${exams.length} exams`;
};

/** One category in the left list. */
function CategoryButton({ category, isSelected, onSelect }: { category: AdminGoalCategory; isSelected: boolean; onSelect: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      aria-current={isSelected}
      onClick={onSelect}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        px: 1.5,
        py: 1.1,
        border: "none",
        borderRadius: "10px",
        bgcolor: isSelected ? COLORS.redTint : "transparent",
        color: isSelected ? COLORS.redDark : COLORS.ink,
        fontFamily: "inherit",
        textAlign: "left",
        cursor: "pointer",
        opacity: category.isActive ? 1 : 0.7,
        "&:hover": { bgcolor: isSelected ? COLORS.redTint : COLORS.surface },
      }}
    >
      <Typography noWrap sx={{ fontWeight: 700, fontSize: "0.9rem", color: "inherit" }}>{category.name}</Typography>
      <Typography sx={{ flexShrink: 0, color: COLORS.muted, fontSize: "0.74rem", fontWeight: 600 }}>{examCount(category)}</Typography>
    </Box>
  );
}

/** Homepage → "Select Your Goal": categories (tabs) on the left, the chosen category's exam cards on the right. */
export default function SelectYourGoalManager({ categories }: { categories: AdminGoalCategory[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(categories[0]?._id || "");
  const [isCreating, setIsCreating] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");

  const selected = categories.find(({ _id }) => _id === selectedId) || categories[0];
  const activeCategories = categories.filter(({ isActive }) => isActive);
  const inactiveCategories = categories.filter(({ isActive }) => !isActive);

  const select = (id: string) => {
    setSelectedId(id);
    setIsRenaming(false);
  };

  /* ---------- categories ---------- */

  const createCategory = async (name: string) => {
    const created = await adminRequest<AdminGoalCategory>(`${API_PATH}/categories`, { method: "POST", body: { name } });

    setIsCreating(false);
    setSelectedId(created._id);
    router.refresh();
  };

  const renameCategory = async (name: string) => {
    await adminRequest(`${API_PATH}/categories/${selected._id}`, { method: "PATCH", body: { name } });
    setIsRenaming(false);
    router.refresh();
  };

  const setCategoryStatus = async (isActive: boolean) => {
    setBusy(true);
    setActionError("");

    try {
      await adminRequest(`${API_PATH}/categories/${selected._id}`, { method: "PATCH", body: { isActive } });
      router.refresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Couldn't change the status.");
    } finally {
      setBusy(false);
    }
  };

  const saveCategoryOrder = async (ids: string[]) => {
    await adminRequest(`${API_PATH}/categories/order`, { method: "PUT", body: { ids } });
    setIsReordering(false);
    router.refresh();
  };

  /* ---------- exams (in the selected category) ---------- */

  const newExam = (): GoalExamInput => ({ category: selected._id, name: "", logo: "", link: "", isActive: true });

  const toInput = ({ name, logo, link, isActive }: AdminGoalExam): GoalExamInput => ({ category: selected._id, name, logo, link, isActive });

  const validate = ({ name }: GoalExamInput) => (name.trim() ? [] : ["Add the exam name, e.g. “UPSC CSE”."]);

  const renderPreview = ({ name, logo, link }: AdminGoalExam) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
      <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: "10px", border: `1px solid ${COLORS.borderLight}`, bgcolor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.red, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of an uploaded logo */}
        {logo ? <img src={logo} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} /> : <GraduationCap size={20} />}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.9rem" }}>{name}</Typography>
        <Typography noWrap sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>{link || goalPath(name)}</Typography>
      </Box>
    </Box>
  );

  const renderForm = (input: GoalExamInput, update: (changes: Partial<GoalExamInput>) => void) => (
    <>
      <FieldGrid columns={3}>
        <Field label="Exam name" required>
          <TextInput value={input.name} onChange={(name) => update({ name })} placeholder="UPSC CSE" />
        </Field>
        <Field label="Link (optional)" hint={`Empty → ${goalPath(input.name || "exam-name")}`}>
          <TextInput value={input.link} onChange={(link) => update({ link })} placeholder="/goal/upsc-cse" />
        </Field>
        <Field label="Category" hint="Move the exam to another tab.">
          <Box component="select" value={input.category} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update({ category: e.target.value })} sx={inputSx}>
            {categories.map(({ _id, name }) => (
              <option key={_id} value={_id}>{name}</option>
            ))}
          </Box>
        </Field>
      </FieldGrid>
      <Box sx={{ maxWidth: 220 }}>
        <ImageField label="Logo" hint="Square, transparent PNG / SVG works best" aspectRatio="1 / 1" maxHeight={140} value={input.logo} onChange={(logo) => update({ logo })} />
      </Box>
    </>
  );

  if (!selected) {
    return (
      <Box sx={{ p: 3, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
        <Typography sx={{ mb: 2, color: COLORS.muted }}>No categories yet.</Typography>
        <CategoryNameForm submitLabel="Create" placeholder="e.g. UPSC" onSubmit={createCategory} onCancel={() => {}} />
      </Box>
    );
  }

  const orderItems = categories.map((category) => ({ _id: category._id, name: category.name, isActive: category.isActive, detail: examCount(category) }));

  return (
    <Box sx={{ display: "grid", gap: 2.5 }}>
      {actionError && <Box role="alert" sx={errorBoxSx}>{actionError}</Box>}

      {isReordering && <ReorderPanel items={orderItems} title="Reorder categories" description="The homepage shows the category tabs in this order." onSave={saveCategoryOrder} onCancel={() => setIsReordering(false)} />}

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "280px minmax(0, 1fr)" }, gap: 2.5, alignItems: "start" }}>
        {/* Categories */}
        <Box component="aside" aria-label="Categories" sx={{ position: { lg: "sticky" }, top: { lg: 88 }, maxHeight: { lg: "calc(100vh - 110px)" }, overflowY: { lg: "auto" }, p: 1.5, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
            <Box component="button" type="button" disabled={isCreating} onClick={() => setIsCreating(true)} sx={{ ...smallButtonSx, flex: 1 }}>
              <FolderPlus size={15} /> New
            </Box>
            <Box component="button" type="button" disabled={isReordering || categories.length < 2} onClick={() => setIsReordering(true)} sx={{ ...smallButtonSx, flex: 1 }}>
              <ArrowUpDown size={15} /> Reorder
            </Box>
          </Box>

          {isCreating && (
            <Box sx={{ mb: 1.5, p: 1.25, borderRadius: "12px", bgcolor: COLORS.surface }}>
              <CategoryNameForm submitLabel="Create" placeholder="e.g. Defence" onSubmit={createCategory} onCancel={() => setIsCreating(false)} />
            </Box>
          )}

          <Typography sx={{ px: 1.5, pb: 0.5, color: COLORS.success, fontSize: "0.7rem", fontWeight: 800, letterSpacing: ".08em" }}>ACTIVE ({activeCategories.length})</Typography>
          {activeCategories.map((category) => (
            <CategoryButton key={category._id} category={category} isSelected={category._id === selected._id} onSelect={() => select(category._id)} />
          ))}

          <Typography sx={{ px: 1.5, pt: 1.5, pb: 0.5, color: COLORS.muted, fontSize: "0.7rem", fontWeight: 800, letterSpacing: ".08em", borderTop: `1px dashed ${COLORS.border}`, mt: 1 }}>INACTIVE ({inactiveCategories.length})</Typography>
          {inactiveCategories.map((category) => (
            <CategoryButton key={category._id} category={category} isSelected={category._id === selected._id} onSelect={() => select(category._id)} />
          ))}
          {!inactiveCategories.length && <Typography sx={{ px: 1.5, color: COLORS.muted, fontSize: "0.82rem" }}>None.</Typography>}
        </Box>

        {/* The selected category's exams */}
        <Box sx={{ display: "grid", gap: 2, minWidth: 0 }}>
          <Box sx={{ p: { xs: 2, md: 2.5 }, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap" }}>
            {isRenaming ? (
              <CategoryNameForm initialName={selected.name} submitLabel="Save" onSubmit={renameCategory} onCancel={() => setIsRenaming(false)} />
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
                <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1.2rem" }}>{selected.name}</Typography>
                <Chip tone="neutral">{examCount(selected)}</Chip>
                {!selected.isActive && (
                  <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.muted, fontSize: "0.8rem" }}>
                    <EyeOff size={14} /> Hidden on the website, with all its exams
                  </Typography>
                )}
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StatusToggle isActive={selected.isActive} disabled={busy} onChange={setCategoryStatus} label={`${selected.name} category status`} />
              {!isRenaming && (
                <Box component="button" type="button" onClick={() => setIsRenaming(true)} sx={smallButtonSx}>
                  <Pencil size={14} /> Rename
                </Box>
              )}
            </Box>
          </Box>

          <ItemManager
            key={selected._id}
            items={selected.exams}
            itemName="exam"
            itemsName="exams"
            orderDescription={`The “${selected.name}” tab shows its exams in this order (the first 8 show before “View more”).`}
            getName={({ name }) => name}
            newInput={newExam}
            toInput={toInput}
            validate={validate}
            renderPreview={renderPreview}
            renderForm={renderForm}
            onCreate={(input) => adminRequest(`${API_PATH}/exams`, { method: "POST", body: input })}
            onUpdate={(id, input) => adminRequest(`${API_PATH}/exams/${id}`, { method: "PUT", body: input })}
            onStatus={(id, isActive) => adminRequest(`${API_PATH}/exams/${id}`, { method: "PATCH", body: { isActive } })}
            onReorder={(ids) => adminRequest(`${API_PATH}/exams/order`, { method: "PUT", body: { category: selected._id, ids } })}
            activeHint="Shown in this tab on the homepage, in this order."
            inactiveHint="Hidden on the homepage. Switch one on to show it again."
          />
        </Box>
      </Box>
    </Box>
  );
}
