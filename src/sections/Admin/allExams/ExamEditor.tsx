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
import BannerGallery from "./BannerGallery";
import ImageField from "./ImageField";
import { buttonSx, Field, FieldGrid, inputSx, ListEditor, NumberInput, primaryButtonSx, SectionCard, StatusToggle, TextArea, TextInput } from "./formKit";
import { cleanInput, discountPercent, newBatch, newFreeClass, newSubCategory, toInput, toYoutubeId, validateSubCategory } from "./examForm";

const LIST_PATH = "/admin/web/homepage/all-exams";
const API_PATH = "homepage/all-exams";
const NEW_CATEGORY = "__new__";

const SECTIONS = [
  { id: "category", label: "Category & status" },
  { id: "sub-title", label: "1 · Sub title" },
  { id: "banners", label: "2 · Banners" },
  { id: "free-classes", label: "3 · Free classes" },
  { id: "batches", label: "4 · Batches" },
  { id: "top-rankers", label: "5 · Top rankers" },
  { id: "about-exam", label: "6 · About exam" },
  { id: "faqs", label: "7 · FAQs" },
];

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
          </>
        }
      />

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

        {/* 1 · Sub title */}
        <SectionCard id="sub-title" step={1} title="Sub title" description="The line under the exam name at the top of the page.">
          <TextArea value={details.subTitle} onChange={(subTitle) => updateDetails({ subTitle })} rows={2} placeholder="Live classes, free lectures, test series & mentorship for … — in Hindi & English medium." />
        </SectionCard>

        {/* 2 · Banners */}
        <SectionCard id="banners" step={2} title="Banners" description="Slider at the top of the page. Upload separate art for web and mobile — the mobile image is used on phones (web image if empty).">
          <BannerGallery banners={details.banners} onChange={(banners) => updateDetails({ banners })} itemName="Banner" webHint="Wide art, about 2.9 : 1 (e.g. 2400 × 828 px)" mobileHint="Tall art for phones (e.g. 1080 × 1440 px)" />
        </SectionCard>

        {/* 3 · Free classes */}
        <SectionCard id="free-classes" step={3} title="Watch Free Online Classes" description="Video cards. With a YouTube video the card plays on the page; otherwise the link opens.">
          <ListEditor
            items={details.freeClasses}
            onChange={(freeClasses) => updateDetails({ freeClasses })}
            createItem={newFreeClass}
            addLabel="Add free class"
            emptyText="No free classes yet."
            itemLabel={(video, index) => `Class ${index + 1}${video.title ? ` — ${video.title}` : ""}`}
            renderItem={(video, update) => {
              const youtubeIsValid = !video.youtubeId || Boolean(toYoutubeId(video.youtubeId));

              return (
                <FieldGrid>
                  <Field label="Title" required>
                    <TextInput value={video.title} onChange={(title) => update({ ...video, title })} placeholder="e.g. Complete Strategy & Syllabus Breakdown" />
                  </Field>
                  <Field label="Educator">
                    <TextInput value={video.educator} onChange={(educator) => update({ ...video, educator })} placeholder="Vini IAS Faculty" />
                  </Field>
                  <Field label="YouTube link or video ID" hint={youtubeIsValid ? (video.youtubeId ? `Video ID: ${video.youtubeId}` : "Paste a YouTube link — the video plays on the page") : "Not a valid YouTube link or ID"}>
                    <TextInput value={video.youtubeId} onChange={(value) => update({ ...video, youtubeId: toYoutubeId(value) || value.trim() })} placeholder="https://www.youtube.com/watch?v=…" />
                  </Field>
                  <Field label="Duration">
                    <TextInput value={video.duration} onChange={(duration) => update({ ...video, duration })} placeholder="1:12:40" />
                  </Field>
                  <Box sx={{ gridColumn: { md: "1 / -1" } }}>
                    <Field label="Link (when there is no YouTube video)">
                      <TextInput value={video.link} onChange={(link) => update({ ...video, link })} placeholder="https://www.youtube.com/@viniias" />
                    </Field>
                  </Box>
                </FieldGrid>
              );
            }}
          />
        </SectionCard>

        {/* 4 · Batches */}
        <SectionCard id="batches" step={4} title="Recommended Batches For You" description="Batch cards with price, MRP and an Explore button.">
          <ListEditor
            items={details.batches}
            onChange={(batches) => updateDetails({ batches })}
            createItem={newBatch}
            addLabel="Add batch"
            emptyText="No batches yet."
            itemLabel={(batch, index) => `Batch ${index + 1}${batch.title ? ` — ${batch.title}` : ""}`}
            renderItem={(batch, update) => {
              const discount = discountPercent(batch);

              return (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 2fr)" }, gap: 2, alignItems: "start" }}>
                  <ImageField label="Thumbnail" aspectRatio="16 / 9" value={batch.thumbnail} onChange={(thumbnail) => update({ ...batch, thumbnail })} hint="About 16 : 9" />
                  <Box sx={{ display: "grid", gap: 2 }}>
                    <Field label="Title" required>
                      <TextInput value={batch.title} onChange={(title) => update({ ...batch, title })} placeholder="e.g. UPSC CSE Foundation Batch 2027/28" />
                    </Field>
                    <FieldGrid columns={3}>
                      <Field label="Language">
                        <TextInput value={batch.language} onChange={(language) => update({ ...batch, language })} placeholder="Hindi & English" />
                      </Field>
                      <Field label="Mode">
                        <TextInput value={batch.mode} onChange={(mode) => update({ ...batch, mode })} placeholder="Live + Recorded" />
                      </Field>
                      <Field label="Start date">
                        <TextInput value={batch.startDate} onChange={(startDate) => update({ ...batch, startDate })} placeholder="Starts 15 Nov" />
                      </Field>
                      <Field label="Price (₹)" hint={discount ? `${discount}% off` : undefined}>
                        <NumberInput value={batch.price} onChange={(price) => update({ ...batch, price })} />
                      </Field>
                      <Field label="MRP (₹)" hint="Shown struck through">
                        <NumberInput value={batch.mrp} onChange={(mrp) => update({ ...batch, mrp })} />
                      </Field>
                      <Field label="Tag" hint="e.g. Bestseller, New">
                        <TextInput value={batch.tag} onChange={(tag) => update({ ...batch, tag })} />
                      </Field>
                    </FieldGrid>
                    <Field label="Explore link" hint="Empty → opens the counselling form">
                      <TextInput value={batch.link} onChange={(link) => update({ ...batch, link })} placeholder="https://…" />
                    </Field>
                  </Box>
                </Box>
              );
            }}
          />
        </SectionCard>

        {/* 5 · Top rankers */}
        <SectionCard id="top-rankers" step={5} title="Top Rankers" description="Results banners in the “Our Top Rankers” slider. Separate web and mobile art.">
          <BannerGallery banners={details.topRankers} onChange={(topRankers) => updateDetails({ topRankers })} itemName="Rankers banner" webHint="Wide art, about 2.9 : 1 (e.g. 3821 × 1324 px)" mobileHint="Tall art (e.g. 1203 × 1650 px)" />
        </SectionCard>

        {/* 6 · About exam */}
        <SectionCard id="about-exam" step={6} title={`All About ${form.name || "…"} Exam`} description="Highlight cards and the guide text (the first paragraph shows, the rest open with “Read more”).">
          <Field label="Section heading" hint="Leave empty to use the heading above">
            <TextInput value={details.aboutExam.title} onChange={(title) => updateDetails({ aboutExam: { ...details.aboutExam, title } })} placeholder={`All About ${form.name || "…"} Exam`} />
          </Field>

          <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.9rem", mt: 1 }}>Highlights</Typography>
          <ListEditor
            items={details.aboutExam.highlights}
            onChange={(highlights) => updateDetails({ aboutExam: { ...details.aboutExam, highlights } })}
            createItem={() => ({ label: "", value: "" })}
            addLabel="Add highlight"
            emptyText="No highlights yet."
            itemLabel={(highlight, index) => highlight.label || `Highlight ${index + 1}`}
            renderItem={(highlight, update) => (
              <FieldGrid>
                <Field label="Label" required>
                  <TextInput value={highlight.label} onChange={(label) => update({ ...highlight, label })} placeholder="Medium" />
                </Field>
                <Field label="Value" required>
                  <TextInput value={highlight.value} onChange={(value) => update({ ...highlight, value })} placeholder="Hindi & English" />
                </Field>
              </FieldGrid>
            )}
          />

          <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.9rem", mt: 1 }}>Paragraphs</Typography>
          <ListEditor
            items={details.aboutExam.paragraphs}
            onChange={(paragraphs) => updateDetails({ aboutExam: { ...details.aboutExam, paragraphs } })}
            createItem={() => ""}
            addLabel="Add paragraph"
            emptyText="No text yet."
            itemLabel={(_paragraph, index) => `Paragraph ${index + 1}`}
            renderItem={(paragraph, update) => <TextArea value={paragraph} onChange={update} rows={4} />}
          />
        </SectionCard>

        {/* 7 · FAQs */}
        <SectionCard id="faqs" step={7} title="Frequently Asked Questions" description="Also added to the page for Google (FAQ rich results).">
          <ListEditor
            items={details.faqs}
            onChange={(faqs) => updateDetails({ faqs })}
            createItem={() => ({ question: "", answer: "" })}
            addLabel="Add FAQ"
            emptyText="No FAQs yet."
            itemLabel={(faq, index) => faq.question || `FAQ ${index + 1}`}
            renderItem={(faq, update) => (
              <Box sx={{ display: "grid", gap: 2 }}>
                <Field label="Question" required>
                  <TextInput value={faq.question} onChange={(question) => update({ ...faq, question })} />
                </Field>
                <Field label="Answer" required>
                  <TextArea value={faq.answer} onChange={(answer) => update({ ...faq, answer })} rows={3} />
                </Field>
              </Box>
            )}
          />
        </SectionCard>
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
          <Box component="button" type="button" disabled={status === "saving" || (!isDirty && !isNew)} onClick={save} sx={primaryButtonSx}>
            {status === "saving" ? <CircularProgress size={18} sx={{ color: "#FFFFFF" }} /> : <Save size={16} />}
            {isNew ? "Create sub category" : "Save changes"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
