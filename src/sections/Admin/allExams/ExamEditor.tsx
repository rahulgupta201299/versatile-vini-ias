"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowLeft, Check, ExternalLink, Save } from "lucide-react";
import { COLORS } from "@/theme/colors";
import IconRenderer, { ICON_NAMES } from "@/components/IconRenderer";
import { AdminExamCategory, AdminSubCategory, AdminSubCategoryInput, ExamDetails } from "@/types";
import { slugify } from "@/utils/slug";
import { adminRequest } from "@/lib/adminClient";
import { PageHeader } from "../ui";
import ExamDetailsSections, { DETAIL_SECTIONS } from "./ExamDetailsSections";
import { buttonSx, Field, FieldGrid, inputSx, primaryButtonSx, SectionCard, StatusToggle, TextInput } from "./formKit";
import { cleanInput, newSubCategory, toInput, validateSubCategory } from "./examForm";
import { useSectionAccess } from "../AdminAccessContext";
import DeleteButton from "../common/DeleteButton";
import ViewOnlyNotice from "../common/ViewOnlyNotice";

const LIST_PATH = "/admin/web/homepage/all-exams";
const API_PATH = "homepage/all-exams";
const NEW_CATEGORY = "__new__";

const SECTIONS = [{ id: "category", label: "Category & status" }, ...DETAIL_SECTIONS];

type ExamEditorProps = {
  /** The sub category to edit; leave out to create a new one. */
  subCategory?: AdminSubCategory;
  categories: AdminExamCategory[];
  /** Pre-selected category for a new sub category (?category=<id>). */
  defaultCategoryId?: string;
};

/** Create / edit one sub category (exam) of Homepage → All Exams. */
export default function ExamEditor({ subCategory, categories: initialCategories, defaultCategoryId = "" }: ExamEditorProps) {
  const router = useRouter();
  const { canEdit, canDelete } = useSectionAccess("allExams");
  const isNew = !subCategory;

  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState<AdminSubCategoryInput>(() => (subCategory ? toInput(subCategory) : newSubCategory(defaultCategoryId)));
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(form));
  const [savedSlug, setSavedSlug] = useState(subCategory?.slug ?? "");
  const [isNewCategory, setIsNewCategory] = useState(!initialCategories.length);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const isDirty = JSON.stringify(form) !== savedSnapshot || (isNewCategory && Boolean(newCategoryName.trim()));
  const slug = useMemo(() => slugify(form.name), [form.name]);
  const category = categories.find(({ _id }) => _id === form.category);
  const isLive = !isNew && form.isActive && category?.isActive;
  const { details } = form;

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!isDirty) return;

    const warn = (event: BeforeUnloadEvent) => event.preventDefault();

    window.addEventListener("beforeunload", warn);

    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  const updateDetails = (changes: Partial<ExamDetails>) => setForm((current) => ({ ...current, details: { ...current.details, ...changes } }));

  /** Creates the typed-in category first (when "+ New category" was chosen) and returns its id. */
  const resolveCategoryId = async () => {
    if (!isNewCategory) return form.category;

    const created = await adminRequest<AdminExamCategory>(`${API_PATH}/categories`, { method: "POST", body: { name: newCategoryName.trim() } });

    setCategories((current) => [...current, created]);
    setIsNewCategory(false);
    setNewCategoryName("");

    return created._id;
  };

  const save = async () => {
    const found = validateSubCategory(form, { hasCategory: isNewCategory ? Boolean(newCategoryName.trim()) : Boolean(form.category) });

    setProblems(found);

    if (found.length) return;

    setStatus("saving");

    try {
      const input = cleanInput({ ...form, category: await resolveCategoryId() });
      const saved = isNew
        ? await adminRequest<AdminSubCategory>(`${API_PATH}/sub-categories`, { method: "POST", body: input })
        : await adminRequest<AdminSubCategory>(`${API_PATH}/sub-categories/${subCategory._id}`, { method: "PUT", body: input });
      const savedInput = toInput(saved);

      setForm(savedInput);
      setSavedSnapshot(JSON.stringify(savedInput));
      setSavedSlug(saved.slug);
      setStatus("saved");

      if (isNew) router.replace(`${LIST_PATH}/${saved._id}`);
      else router.refresh();
    } catch (error) {
      setProblems([error instanceof Error ? error.message : "Save failed."]);
      setStatus("idle");
    }
  };

  return (
    <Box sx={{ pb: 12 }}>
      <PageHeader
        eyebrow="Web / Homepage / All Exams"
        title={isNew ? "New sub category" : form.name || "Edit sub category"}
        subtitle={isNew ? "Fill in the sections below and save — active sub categories appear in the header menu and get their own page." : `${category?.name ?? ""} · /goal/${savedSlug}`}
        actions={
          <>
            <Box component={Link} href={LIST_PATH} sx={buttonSx}>
              <ArrowLeft size={16} /> All exams
            </Box>
            {isLive && (
              <Box component="a" href={`/goal/${savedSlug}`} target="_blank" rel="noopener" sx={buttonSx}>
                View page <ExternalLink size={15} />
              </Box>
            )}
            {subCategory && canDelete && (
              <DeleteButton
                size="normal"
                name={subCategory.name}
                onDelete={() => adminRequest(`${API_PATH}/sub-categories/${subCategory._id}`, { method: "DELETE" })}
                onDeleted={() => {
                  router.push(LIST_PATH);
                  router.refresh();
                }}
              />
            )}
          </>
        }
      />

      {!canEdit && (
        <Box sx={{ mb: 2 }}>
          <ViewOnlyNotice what="this exam" />
        </Box>
      )}

      {/* Jump links */}
      <Box sx={{ position: "sticky", top: 68, zIndex: 5, mx: { xs: -2, md: -4 }, px: { xs: 2, md: 4 }, py: 1.25, mb: 2, bgcolor: "rgba(248,250,252,.95)", backdropFilter: "blur(8px)", display: "flex", gap: 1, overflowX: "auto" }}>
        {SECTIONS.map(({ id, label }) => (
          <Box key={id} component="a" href={`#${id}`} sx={{ flexShrink: 0, px: 1.5, py: 0.6, borderRadius: 999, border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", color: COLORS.body, fontSize: "0.8rem", fontWeight: 600, "&:hover": { color: COLORS.red, borderColor: COLORS.redBorder } }}>
            {label}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        {/* Category, sub category, status and menu icon */}
        <SectionCard id="category" title="Category, sub category & status" description="Where this exam appears in the header “All Exams” menu, and whether it is shown on the website.">
          <FieldGrid>
            <Field label="Category" required hint={isNewCategory ? "The category is created when you save." : "Pick a category, or choose “+ New category”."}>
              {isNewCategory ? (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextInput value={newCategoryName} onChange={setNewCategoryName} placeholder="e.g. Only IAS" />
                  {!!categories.length && (
                    <Box component="button" type="button" onClick={() => { setIsNewCategory(false); setNewCategoryName(""); }} sx={buttonSx}>
                      Pick existing
                    </Box>
                  )}
                </Box>
              ) : (
                <Box
                  component="select"
                  value={form.category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const { value } = e.target;

                    if (value === NEW_CATEGORY) setIsNewCategory(true);
                    else setForm({ ...form, category: value });
                  }}
                  sx={inputSx}
                >
                  {!form.category && <option value="">Choose a category…</option>}
                  {categories.map(({ _id, name, isActive }) => (
                    <option key={_id} value={_id}>
                      {name}
                      {isActive ? "" : " (inactive)"}
                    </option>
                  ))}
                  <option value={NEW_CATEGORY}>+ New category</option>
                </Box>
              )}
            </Field>

            <Field label="Sub category (exam name)" required hint={slug ? `Page address: /goal/${slug}` : "Shown in the menu and as the page title."}>
              <TextInput value={form.name} onChange={(name) => setForm({ ...form, name })} placeholder="e.g. UPSC CSE 2026/27" />
            </Field>
          </FieldGrid>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", p: 1.5, borderRadius: "12px", bgcolor: form.isActive ? "#ECFDF3" : COLORS.surface, border: `1px solid ${form.isActive ? "#BBF7D0" : COLORS.border}` }}>
            <StatusToggle isActive={form.isActive} onChange={(isActive) => setForm({ ...form, isActive })} label="Sub category status" />
            <Typography sx={{ color: COLORS.textSecondary, fontSize: "0.84rem" }}>
              {form.isActive ? "Shown in the header menu and its page is live." : "Hidden from the website — the content stays saved and can be switched back on any time."}
              {form.isActive && category && !category.isActive && " (Its category is inactive, so it stays hidden until the category is switched on.)"}
            </Typography>
          </Box>

          <Field label="Link (optional)" hint={`Where the header menu item goes — a page or a full URL. Leave empty to open this exam's page${slug ? ` (/goal/${slug})` : ""}.`}>
            <TextInput value={form.link} onChange={(link) => setForm({ ...form, link })} placeholder={slug ? `/goal/${slug}` : "/goal/upsc-cse"} />
          </Field>

          <FieldGrid columns={3}>
            <Field label="Menu icon">
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: "10px", bgcolor: form.menuIcon.background || COLORS.redTint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconRenderer name={form.menuIcon.name} size={21} color={form.menuIcon.color || COLORS.red} />
                </Box>
                <Box component="select" value={form.menuIcon.name} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, menuIcon: { ...form.menuIcon, name: e.target.value } })} sx={inputSx}>
                  {!ICON_NAMES.includes(form.menuIcon.name) && <option value={form.menuIcon.name}>{form.menuIcon.name}</option>}
                  {ICON_NAMES.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </Box>
              </Box>
            </Field>
            <Field label="Icon colour" hint="Leave empty for brand red">
              <TextInput value={form.menuIcon.color} onChange={(color) => setForm({ ...form, menuIcon: { ...form.menuIcon, color } })} placeholder="#FE0034" />
            </Field>
            <Field label="Icon background" hint="Leave empty for light red">
              <TextInput value={form.menuIcon.background} onChange={(background) => setForm({ ...form, menuIcon: { ...form.menuIcon, background } })} placeholder="#FFF0F3" />
            </Field>
          </FieldGrid>
        </SectionCard>

        <ExamDetailsSections details={details} examName={form.name} onChange={updateDetails} />
      </Box>

      {/* Save bar */}
      <Box sx={{ position: "fixed", left: { xs: 0, lg: 264 }, right: 0, bottom: 0, zIndex: 20, borderTop: `1px solid ${COLORS.border}`, bgcolor: "rgba(255,255,255,.96)", backdropFilter: "blur(8px)" }}>
        {!!problems.length && (
          <Box role="alert" sx={{ maxWidth: 1360, mx: "auto", px: { xs: 2, md: 4 }, pt: 1.5 }}>
            <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.84rem", fontWeight: 600, maxHeight: 120, overflowY: "auto" }}>
              {problems.map((problem) => (
                <div key={problem}>• {problem}</div>
              ))}
            </Box>
          </Box>
        )}
        <Box sx={{ maxWidth: 1360, mx: "auto", px: { xs: 2, md: 4 }, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
          <Typography sx={{ color: isDirty ? COLORS.redDark : COLORS.success, fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
            {isDirty ? "Unsaved changes" : status === "saved" ? (<><Check size={16} /> Saved{isLive ? " — live on the site" : " (inactive — hidden on the site)"}</>) : "No changes"}
          </Typography>
          <Box component="button" type="button" disabled={!canEdit || status === "saving" || (!isDirty && !isNew)} onClick={save} sx={primaryButtonSx}>
            {status === "saving" ? <CircularProgress size={18} sx={{ color: "#FFFFFF" }} /> : <Save size={16} />}
            {isNew ? "Create sub category" : "Save changes"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
