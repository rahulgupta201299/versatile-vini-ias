"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowUpDown, EyeOff, ExternalLink, FolderPlus, Pencil, Plus, Search } from "lucide-react";
import { COLORS } from "@/theme/colors";
import IconRenderer from "@/components/IconRenderer";
import { AdminExamCategoryWithSubCategories, AdminSubCategorySummary } from "@/types";
import { Chip, PageHeader } from "../ui";
import { adminRequest } from "@/lib/adminClient";
import CategoryNameForm from "./CategoryNameForm";
import CategoryOrder from "./CategoryOrder";
import { buttonSx, inputSx, primaryButtonSx, StatusToggle } from "./formKit";

const BASE_PATH = "/admin/web/homepage/all-exams";
const API_PATH = "homepage/all-exams";

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");

const smallButtonSx = { ...buttonSx, height: 34, px: 1.5 };

function SectionTitle({ title, count, hint }: { title: string; count: number; hint: string }) {
  return (
    <Box sx={{ mt: 1, mb: 1.5 }}>
      <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1.15rem" }}>
        {title}{" "}
        <Box component="span" sx={{ color: COLORS.muted, fontWeight: 600 }}>({count})</Box>
      </Typography>
      <Typography sx={{ color: COLORS.muted, fontSize: "0.83rem" }}>{hint}</Typography>
    </Box>
  );
}

type RowProps = { subCategory: AdminSubCategorySummary; busy: boolean; onToggle: (isActive: boolean) => void; isLive: boolean };

function SubCategoryRow({ subCategory, busy, onToggle, isLive }: RowProps) {
  const { _id, name, slug, menuIcon = { name: "BookOpen", color: "", background: "" }, isActive, updatedAt } = subCategory;

  return (
    <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.25, display: "flex", alignItems: "center", gap: 1.5, borderTop: `1px solid ${COLORS.borderLight}`, opacity: isActive ? 1 : 0.75, "&:hover": { bgcolor: COLORS.redTintSoft } }}>
      <Box sx={{ width: 34, height: 34, flexShrink: 0, borderRadius: "10px", bgcolor: menuIcon.background || COLORS.redTint, display: "flex", alignItems: "center", justifyContent: "center", filter: isActive ? "none" : "grayscale(1)" }}>
        <IconRenderer name={menuIcon.name} size={17} color={menuIcon.color || COLORS.red} />
      </Box>
      <Box component={Link} href={`${BASE_PATH}/${_id}`} sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: 700, color: COLORS.ink, fontSize: "0.9rem" }}>{name}</Typography>
        <Typography noWrap sx={{ color: COLORS.muted, fontSize: "0.75rem" }}>
          /goal/{slug}
          {updatedAt && ` · updated ${formatDate(updatedAt)}`}
        </Typography>
      </Box>
      <StatusToggle isActive={isActive} disabled={busy} onChange={onToggle} label={`${name} status`} />
      {isLive && (
        <Box component="a" href={`/goal/${slug}`} target="_blank" rel="noopener" aria-label={`View ${name}`} sx={{ ...smallButtonSx, display: { xs: "none", sm: "inline-flex" } }}>
          <ExternalLink size={14} />
        </Box>
      )}
      <Box component={Link} href={`${BASE_PATH}/${_id}`} sx={smallButtonSx}>
        <Pencil size={14} /> Edit
      </Box>
    </Box>
  );
}

/** Web → Homepage → All Exams: categories and their sub categories, active and inactive shown separately. */
export default function AllExamsList({ categories }: { categories: AdminExamCategoryWithSubCategories[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState("");
  const [actionError, setActionError] = useState("");
  const [renamingId, setRenamingId] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();

    if (!text) return categories;

    return categories
      .map((category) => ({
        ...category,
        subCategories: category.name.toLowerCase().includes(text) ? category.subCategories : category.subCategories.filter(({ name }) => name.toLowerCase().includes(text)),
      }))
      .filter(({ subCategories }) => subCategories.length);
  }, [categories, query]);

  const activeCategories = visible.filter(({ isActive }) => isActive);
  const inactiveCategories = visible.filter(({ isActive }) => !isActive);
  const subCategoryCount = categories.reduce((total, { subCategories }) => total + subCategories.length, 0);

  /** Runs a change, then reloads the list from the server. */
  const run = async (id: string, action: () => Promise<unknown>) => {
    setBusyId(id);
    setActionError("");

    try {
      await action();
      router.refresh();
    } catch (actionFailure) {
      setActionError(actionFailure instanceof Error ? actionFailure.message : "Something went wrong.");
    } finally {
      setBusyId("");
    }
  };

  const toggleCategory = (id: string, isActive: boolean) => run(id, () => adminRequest(`${API_PATH}/categories/${id}`, { method: "PATCH", body: { isActive } }));
  const toggleSubCategory = (id: string, isActive: boolean) => run(id, () => adminRequest(`${API_PATH}/sub-categories/${id}`, { method: "PATCH", body: { isActive } }));

  /** Inline forms throw on failure so the message shows next to the field. */
  const renameCategory = async (id: string, name: string) => {
    await adminRequest(`${API_PATH}/categories/${id}`, { method: "PATCH", body: { name } });
    setRenamingId("");
    router.refresh();
  };

  const createCategory = async (name: string) => {
    await adminRequest(`${API_PATH}/categories`, { method: "POST", body: { name } });
    setIsCreatingCategory(false);
    router.refresh();
  };

  const saveCategoryOrder = async (ids: string[]) => {
    await adminRequest(`${API_PATH}/categories/order`, { method: "PUT", body: { ids } });
    setIsReordering(false);
    router.refresh();
  };

  const renderCategory = (category: AdminExamCategoryWithSubCategories) => {
    const { _id, name, isActive, subCategories } = category;
    const activeSubCategories = subCategories.filter((subCategory) => subCategory.isActive);
    const inactiveSubCategories = subCategories.filter((subCategory) => !subCategory.isActive);

    return (
      <Box key={_id} component="section" sx={{ borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
        <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.75, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap", bgcolor: isActive ? COLORS.surface : "#F1F5F9" }}>
          {renamingId === _id ? (
            <CategoryNameForm initialName={name} submitLabel="Save" onSubmit={(newName) => renameCategory(_id, newName)} onCancel={() => setRenamingId("")} />
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0, flexWrap: "wrap" }}>
              <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1rem" }}>{name}</Typography>
              <Chip tone="neutral">{activeSubCategories.length} active · {inactiveSubCategories.length} inactive</Chip>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <StatusToggle isActive={isActive} disabled={busyId === _id} onChange={(next) => toggleCategory(_id, next)} label={`${name} category status`} />
            {renamingId !== _id && (
              <Box component="button" type="button" onClick={() => setRenamingId(_id)} sx={smallButtonSx}>
                <Pencil size={14} /> Rename
              </Box>
            )}
            <Box component={Link} href={`${BASE_PATH}/new?category=${_id}`} sx={smallButtonSx}>
              <Plus size={14} /> Add sub category
            </Box>
          </Box>
        </Box>

        {!isActive && (
          <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1, display: "flex", alignItems: "center", gap: 1, color: COLORS.muted, fontSize: "0.8rem", borderTop: `1px solid ${COLORS.borderLight}` }}>
            <EyeOff size={14} /> This category is hidden on the website, with all its sub categories.
          </Box>
        )}

        <Typography sx={{ px: { xs: 2, md: 2.5 }, pt: 1.5, pb: 0.75, color: COLORS.success, fontSize: "0.72rem", fontWeight: 800, letterSpacing: ".08em" }}>ACTIVE SUB CATEGORIES ({activeSubCategories.length})</Typography>
        {activeSubCategories.map((subCategory) => (
          <SubCategoryRow key={subCategory._id} subCategory={subCategory} busy={busyId === subCategory._id} onToggle={(next) => toggleSubCategory(subCategory._id, next)} isLive={isActive} />
        ))}
        {!activeSubCategories.length && <Typography sx={{ px: { xs: 2, md: 2.5 }, pb: 1.5, color: COLORS.muted, fontSize: "0.84rem" }}>None.</Typography>}

        <Typography sx={{ px: { xs: 2, md: 2.5 }, pt: 1.5, pb: 0.75, color: COLORS.muted, fontSize: "0.72rem", fontWeight: 800, letterSpacing: ".08em", borderTop: `1px dashed ${COLORS.border}` }}>INACTIVE SUB CATEGORIES ({inactiveSubCategories.length})</Typography>
        {inactiveSubCategories.map((subCategory) => (
          <SubCategoryRow key={subCategory._id} subCategory={subCategory} busy={busyId === subCategory._id} onToggle={(next) => toggleSubCategory(subCategory._id, next)} isLive={false} />
        ))}
        {!inactiveSubCategories.length && <Typography sx={{ px: { xs: 2, md: 2.5 }, pb: 1.5, color: COLORS.muted, fontSize: "0.84rem" }}>None.</Typography>}
      </Box>
    );
  };

  return (
    <>
      <PageHeader
        eyebrow="Web / Homepage / All Exams"
        title="All Exams"
        subtitle={`${categories.length} categories · ${subCategoryCount} sub categories. Switch anything off instead of deleting it — inactive items are hidden on the website.`}
        actions={
          <>
            <Box component="button" type="button" disabled={isReordering || categories.length < 2} onClick={() => setIsReordering(true)} sx={buttonSx}>
              <ArrowUpDown size={16} /> Reorder categories
            </Box>
            <Box component="button" type="button" disabled={isCreatingCategory} onClick={() => setIsCreatingCategory(true)} sx={buttonSx}>
              <FolderPlus size={16} /> New category
            </Box>
            <Box component={Link} href={`${BASE_PATH}/new`} sx={primaryButtonSx}>
              <Plus size={16} /> New sub category
            </Box>
          </>
        }
      />

      {actionError && (
        <Box role="alert" data-testid="action-error" sx={{ mb: 2.5, px: 2, py: 1.5, borderRadius: "12px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.88rem", fontWeight: 600 }}>
          {actionError}
        </Box>
      )}

      {isReordering && <CategoryOrder categories={categories} onSave={saveCategoryOrder} onCancel={() => setIsReordering(false)} />}

      {isCreatingCategory && (
        <Box sx={{ mb: 2.5, p: 2, borderRadius: "14px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.redBorder}` }}>
          <Typography sx={{ mb: 1, fontWeight: 800, color: COLORS.ink, fontSize: "0.92rem" }}>New category</Typography>
          <CategoryNameForm submitLabel="Create" placeholder="e.g. Only IAS" onSubmit={createCategory} onCancel={() => setIsCreatingCategory(false)} />
          <Typography sx={{ mt: 1, color: COLORS.muted, fontSize: "0.78rem" }}>The category appears on the website once it has at least one active sub category.</Typography>
        </Box>
      )}

      <Box sx={{ position: "relative", mb: 2.5, maxWidth: 420 }}>
        <Search size={17} color={COLORS.muted} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
        <Box component="input" value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} placeholder="Search category or sub category…" sx={{ ...inputSx, pl: 4.5 }} />
      </Box>

      <SectionTitle title="Active categories" count={activeCategories.length} hint="Shown in the header “All Exams” menu (with their active sub categories)." />
      <Box sx={{ display: "grid", gap: 2 }}>
        {activeCategories.map(renderCategory)}
        {!activeCategories.length && <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem" }}>{query ? "No matches." : "No active categories."}</Typography>}
      </Box>

      <Box sx={{ mt: 4 }}>
        <SectionTitle title="Inactive categories" count={inactiveCategories.length} hint="Hidden on the website. Switch a category on to show it again." />
        <Box sx={{ display: "grid", gap: 2 }}>
          {inactiveCategories.map(renderCategory)}
          {!inactiveCategories.length && <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem" }}>{query ? "No matches." : "No inactive categories."}</Typography>}
        </Box>
      </Box>
    </>
  );
}
