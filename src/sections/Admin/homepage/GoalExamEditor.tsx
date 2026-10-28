"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowLeft, Check, Download, ExternalLink, Link2, PencilLine, Sparkles } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { adminRequest } from "@/lib/adminClient";
import { goalPath } from "@/utils/slug";
import { AdminExamCategoryWithSubCategories, AdminGoalExamWithDetails, AdminSubCategory, ExamDetails } from "@/types";
import { PageHeader } from "../ui";
import SaveBar from "../common/SaveBar";
import { buttonSx, Field, FieldGrid, inputSx, primaryButtonSx } from "../allExams/formKit";
import ExamDetailsSections, { DETAIL_SECTIONS } from "../allExams/ExamDetailsSections";
import { cleanDetails, validateDetails } from "../allExams/examForm";
import { useSectionAccess } from "../AdminAccessContext";
import ViewOnlyNotice from "../common/ViewOnlyNotice";

const LIST_PATH = "/admin/web/homepage/select-your-goal";
const ALL_EXAMS_PATH = "/admin/web/homepage/all-exams";
const API_PATH = "homepage/select-your-goal";

type Mode = "linked" | "manual";
type Status = "idle" | "working" | "saved";

const MODES: { id: Mode; title: string; description: string; Icon: typeof Link2 }[] = [
  { id: "linked", title: "Link to an All Exams page", description: "Show the same page as an All Exams exam. Edits made there show here too.", Icon: Link2 },
  { id: "manual", title: "Fill manually", description: "This exam gets its own page. You can start from an All Exams page and change it.", Icon: PencilLine },
];

const errorText = (error: unknown, fallback: string) => (error instanceof Error ? error.message : fallback);

type PickerProps = {
  categories: AdminExamCategoryWithSubCategories[];
  subCategoryId: string;
  onChange: (subCategoryId: string) => void;
};

/** All Exams category → sub category, as two selects. Only sub categories are picked; the category narrows the list. */
function AllExamsPicker({ categories, subCategoryId, onChange }: PickerProps) {
  const owner = categories.find(({ subCategories }) => subCategories.some(({ _id }) => _id === subCategoryId));
  const [pickedCategoryId, setCategoryId] = useState("");
  // The category picked here, else the one holding the chosen sub category
  const categoryId = pickedCategoryId || owner?._id || "";
  const subCategories = categories.find(({ _id }) => _id === categoryId)?.subCategories || [];

  const chooseCategory = (id: string) => {
    setCategoryId(id);
    onChange("");
  };

  return (
    <FieldGrid>
      <Field label="All Exams category">
        <Box component="select" value={categoryId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => chooseCategory(e.target.value)} sx={inputSx}>
          <option value="">Choose a category…</option>
          {categories.map(({ _id, name, isActive }) => (
            <option key={_id} value={_id}>{isActive ? name : `${name} (inactive)`}</option>
          ))}
        </Box>
      </Field>
      <Field label="Sub category">
        <Box component="select" value={subCategoryId} disabled={!categoryId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)} sx={inputSx}>
          <option value="">{categoryId ? "Choose a sub category…" : "Choose a category first"}</option>
          {subCategories.map(({ _id, name, isActive }) => (
            <option key={_id} value={_id}>{isActive ? name : `${name} (inactive)`}</option>
          ))}
        </Box>
      </Field>
    </FieldGrid>
  );
}

const cardSx = { p: { xs: 2.25, md: 3 }, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, display: "grid", gap: 2 } as const;

/**
 * The page of one Select Your Goal exam (/goal/<slug>). Either linked to an All Exams sub category's page (its
 * `details` points at that page, so it stays in sync) or filled manually with the same sections as an All Exams
 * page — optionally imported from one first. Until then the website shows a generated page.
 */
export default function GoalExamEditor({ exam: initialExam }: { exam: AdminGoalExamWithDetails }) {
  const router = useRouter();
  const { canEdit } = useSectionAccess("homepage");
  const [exam, setExam] = useState(initialExam);
  const { _id, name, category, isActive, hasDetails, linkedTo } = exam;
  const [mode, setMode] = useState<Mode>(linkedTo ? "linked" : "manual");
  const [details, setDetails] = useState<ExamDetails>(exam.details);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(exam.details));
  const [categories, setCategories] = useState<AdminExamCategoryWithSubCategories[]>([]);
  const [linkChoice, setLinkChoice] = useState(linkedTo?._id || "");
  const [importChoice, setImportChoice] = useState("");
  const [notice, setNotice] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const isDirty = mode === "manual" && JSON.stringify(details) !== savedSnapshot;
  const pagePath = goalPath(name);
  const isLive = isActive && category.isActive;
  const isWorking = status === "working";

  // The All Exams categories and sub categories, for linking and importing
  useEffect(() => {
    adminRequest<AdminExamCategoryWithSubCategories[]>("homepage/all-exams")
      .then(setCategories)
      .catch((error) => setProblems([errorText(error, "Couldn't load the All Exams list.")]));
  }, []);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!isDirty) return;

    const warn = (event: BeforeUnloadEvent) => event.preventDefault();

    window.addEventListener("beforeunload", warn);

    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  /** After a save or a link: the server's copy becomes the editor's. */
  const applySaved = (saved: AdminGoalExamWithDetails) => {
    setExam(saved);
    setDetails(saved.details);
    setSavedSnapshot(JSON.stringify(saved.details));
    setStatus("saved");
    router.refresh();
  };

  const updateDetails = (changes: Partial<ExamDetails>) => {
    setDetails((current) => ({ ...current, ...changes }));
    setProblems([]);
  };

  const chooseMode = (next: Mode) => {
    setMode(next);
    setProblems([]);
    setNotice("");
    setStatus("idle");
  };

  const linkPage = async () => {
    setProblems([]);
    setStatus("working");

    try {
      applySaved(await adminRequest<AdminGoalExamWithDetails>(`${API_PATH}/exams/${_id}/link`, { method: "PUT", body: { subCategory: linkChoice } }));
    } catch (error) {
      setProblems([errorText(error, "Linking failed.")]);
      setStatus("idle");
    }
  };

  const importPage = async () => {
    setProblems([]);
    setStatus("working");

    try {
      const { name: sourceName, details: imported } = await adminRequest<AdminSubCategory>(`homepage/all-exams/sub-categories/${importChoice}`);

      setDetails(imported);
      setNotice(`Imported from ${sourceName} — change anything below, then save. Nothing is saved yet.`);
      setStatus("idle");
    } catch (error) {
      setProblems([errorText(error, "Import failed.")]);
      setStatus("idle");
    }
  };

  const save = async () => {
    const found = validateDetails(details);

    setProblems(found);

    if (found.length) return;

    setStatus("working");

    try {
      applySaved(await adminRequest<AdminGoalExamWithDetails>(`${API_PATH}/exams/${_id}/details`, { method: "PUT", body: { details: cleanDetails(details) } }));
      setNotice("");
    } catch (error) {
      setProblems([errorText(error, "Save failed.")]);
      setStatus("idle");
    }
  };

  const savedText = isLive ? " — live on the site" : " (hidden on the site — the exam or its category is switched off)";
  const isLinkedNow = Boolean(linkedTo);
  const canSave = canEdit && !isWorking && (isDirty || !hasDetails || isLinkedNow);

  return (
    <Box sx={{ pb: mode === "manual" ? 12 : 4 }}>
      <PageHeader
        eyebrow="Web / Homepage / Select Your Goal"
        title={name}
        subtitle={`${category.name} · ${pagePath}`}
        actions={
          <>
            <Box component={Link} href={LIST_PATH} sx={buttonSx}>
              <ArrowLeft size={16} /> Select Your Goal
            </Box>
            {isLive && (
              <Box component="a" href={pagePath} target="_blank" rel="noopener" sx={buttonSx}>
                View page <ExternalLink size={15} />
              </Box>
            )}
          </>
        }
      />

      {!hasDetails && (
        <Box sx={{ mb: 2, p: 2, borderRadius: "14px", bgcolor: "#FFFBEA", border: "1px solid #FDE68A", display: "flex", gap: 1.25, alignItems: "flex-start" }}>
          <Sparkles size={18} color="#B45309" style={{ flexShrink: 0, marginTop: 2 }} />
          <Typography sx={{ color: "#92400E", fontSize: "0.86rem", lineHeight: 1.5 }}>
            This exam&apos;s page is generated automatically for now. Link it to an All Exams page, or fill in the sections and save — from then on the page shows that content.
          </Typography>
        </Box>
      )}

      {!canEdit && (
        <Box sx={{ mb: 2 }}>
          <ViewOnlyNotice what="this exam's page" />
        </Box>
      )}

      {/* Where the page content comes from */}
      <Box component="section" id="content" sx={{ ...cardSx, mb: 2 }}>
        <Box>
          <Typography component="h2" sx={{ color: COLORS.ink, fontWeight: 800, fontSize: "1.05rem" }}>Page content</Typography>
          <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.83rem" }}>Choose where this exam&apos;s page gets its banners, classes, batches, about and FAQs from.</Typography>
        </Box>

        <Box role="radiogroup" aria-label="Page content" sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          {MODES.map(({ id, title, description, Icon }) => {
            const isChosen = mode === id;

            return (
              <Box
                key={id}
                component="button"
                type="button"
                role="radio"
                aria-checked={isChosen}
                onClick={() => chooseMode(id)}
                sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", p: 2, borderRadius: "14px", textAlign: "left", cursor: "pointer", fontFamily: "inherit", bgcolor: isChosen ? COLORS.redTint : "#FFFFFF", border: `1.5px solid ${isChosen ? COLORS.red : COLORS.border}`, "&:hover": { borderColor: COLORS.red } }}
              >
                <Box sx={{ width: 34, height: 34, flexShrink: 0, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: isChosen ? COLORS.red : "#F1F3F7", color: isChosen ? "#FFFFFF" : COLORS.muted }}>
                  <Icon size={17} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.92rem" }}>{title}</Typography>
                  <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.8rem", lineHeight: 1.45 }}>{description}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {mode === "linked" && (
          <Box sx={{ display: "grid", gap: 2 }}>
            {linkedTo && (
              <Box sx={{ p: 1.75, borderRadius: "12px", bgcolor: "#E9F8EF", border: "1px solid #BBE7CB", display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                <Link2 size={18} color={COLORS.success} />
                <Typography sx={{ flex: 1, minWidth: 220, color: COLORS.ink, fontSize: "0.88rem" }}>
                  Linked to <b>{linkedTo.category.name} → {linkedTo.name}</b>
                  {!linkedTo.isActive && <Box component="span" sx={{ color: COLORS.muted }}> (inactive in All Exams — its page still shows here)</Box>}
                </Typography>
                <Box component={Link} href={`${ALL_EXAMS_PATH}/${linkedTo._id}`} sx={{ ...buttonSx, height: 36, fontSize: "0.82rem" }}>
                  Edit in All Exams <ExternalLink size={14} />
                </Box>
              </Box>
            )}
            <AllExamsPicker categories={categories} subCategoryId={linkChoice} onChange={setLinkChoice} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
              <Box component="button" type="button" disabled={!canEdit || isWorking || !linkChoice || linkChoice === linkedTo?._id} onClick={linkPage} sx={primaryButtonSx}>
                {isWorking ? <CircularProgress size={16} sx={{ color: "#FFFFFF" }} /> : <Link2 size={16} />} {linkedTo ? "Change link" : "Link page"}
              </Box>
              {status === "saved" && linkedTo && (
                <Typography sx={{ color: COLORS.success, fontSize: "0.84rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Check size={15} /> Linked{savedText}
                </Typography>
              )}
            </Box>
            {!linkedTo && hasDetails && (
              <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem" }}>This exam&apos;s own content is kept — switch back to “Fill manually” and save to use it again.</Typography>
            )}
          </Box>
        )}

        {mode === "manual" && (
          <Box sx={{ display: "grid", gap: 2, p: 2, borderRadius: "14px", border: `1px dashed ${COLORS.border}`, bgcolor: "#FAFBFC" }}>
            <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 0.75 }}>
              <Download size={16} /> Import from All Exams <Box component="span" sx={{ color: COLORS.muted, fontWeight: 500 }}>(optional — copies its content into the form below)</Box>
            </Typography>
            <AllExamsPicker categories={categories} subCategoryId={importChoice} onChange={setImportChoice} />
            <Box>
              <Box component="button" type="button" disabled={isWorking || !importChoice} onClick={importPage} sx={buttonSx}>
                {isWorking ? <CircularProgress size={16} /> : <Download size={16} />} Import content
              </Box>
            </Box>
            {isLinkedNow && (
              <Typography sx={{ color: COLORS.redDark, fontSize: "0.82rem", fontWeight: 600 }}>
                Currently linked to {linkedTo?.name}. Saving gives this exam its own page and unlinks it — the All Exams page isn&apos;t changed.
              </Typography>
            )}
            {notice && <Typography sx={{ color: COLORS.success, fontSize: "0.84rem", fontWeight: 600 }}>{notice}</Typography>}
          </Box>
        )}

        {!!problems.length && mode === "linked" && (
          <Box role="alert" sx={{ p: 1.5, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.84rem", fontWeight: 600 }}>
            {problems.map((problem) => (
              <div key={problem}>• {problem}</div>
            ))}
          </Box>
        )}
      </Box>

      {mode === "manual" && (
        <>
          {/* Jump links */}
          <Box sx={{ position: "sticky", top: 68, zIndex: 5, mx: { xs: -2, md: -4 }, px: { xs: 2, md: 4 }, py: 1.25, mb: 2, bgcolor: "rgba(248,250,252,.95)", backdropFilter: "blur(8px)", display: "flex", gap: 1, overflowX: "auto" }}>
            {DETAIL_SECTIONS.map(({ id, label }) => (
              <Box key={id} component="a" href={`#${id}`} sx={{ flexShrink: 0, px: 1.5, py: 0.6, borderRadius: 999, border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", color: COLORS.body, fontSize: "0.8rem", fontWeight: 600, "&:hover": { color: COLORS.red, borderColor: COLORS.redBorder } }}>
                {label}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "grid", gap: 2 }}>
            <ExamDetailsSections details={details} examName={name} onChange={updateDetails} />
          </Box>

          {/* Save bar */}
          <SaveBar
            problems={problems}
            isDirty={isDirty}
            isSaved={status === "saved"}
            isSaving={isWorking}
            isDisabled={!canSave}
            savedText={savedText}
            label={isLinkedNow ? "Save as own page" : "Save page"}
            onSave={save}
          />
        </>
      )}
    </Box>
  );
}
