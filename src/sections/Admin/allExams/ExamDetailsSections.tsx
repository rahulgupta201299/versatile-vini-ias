"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/theme/colors";
import { ExamDetails } from "@/types";
import BannerGallery from "./BannerGallery";
import ImageField from "./ImageField";
import RichTextEditor from "./RichTextEditor";
import { Field, FieldGrid, ListEditor, NumberInput, SectionCard, TextArea, TextInput } from "./formKit";
import { discountPercent, newBatch, newFreeClass, toYoutubeId } from "./examForm";

/** Jump links for the page sections below (ids match each SectionCard). */
export const DETAIL_SECTIONS = [
  { id: "sub-title", label: "1 · Sub title" },
  { id: "banners", label: "2 · Banners" },
  { id: "free-classes", label: "3 · Free classes" },
  { id: "batches", label: "4 · Batches" },
  { id: "top-rankers", label: "5 · Top rankers" },
  { id: "about-exam", label: "6 · About exam" },
  { id: "faqs", label: "7 · FAQs" },
];

type ExamDetailsSectionsProps = {
  details: ExamDetails;
  /** Used in placeholders, e.g. "All About <name> Exam". */
  examName: string;
  onChange: (changes: Partial<ExamDetails>) => void;
};

/**
 * The 7 sections of an exam page (/goal/<slug>): sub title, banners, free classes, batches, top rankers,
 * about and FAQs. Shared by All Exams sub categories and Select Your Goal exams (saved in adminExamDetails).
 */
export default function ExamDetailsSections({ details, examName, onChange }: ExamDetailsSectionsProps) {
  return (
    <>
      {/* 1 · Sub title */}
      <SectionCard id="sub-title" step={1} title="Sub title" description="The line under the exam name at the top of the page.">
        <TextArea value={details.subTitle} onChange={(subTitle) => onChange({ subTitle })} rows={2} placeholder="Live classes, free lectures, test series & mentorship for … — in Hindi & English medium." />
      </SectionCard>

      {/* 2 · Banners */}
      <SectionCard id="banners" step={2} title="Banners" description="Slider at the top of the page. Upload separate art for web and mobile — the mobile image is used on phones (web image if empty).">
        <BannerGallery banners={details.banners} onChange={(banners) => onChange({ banners })} itemName="Banner" webHint="Wide art, about 2.9 : 1 (e.g. 2400 × 828 px)" mobileHint="Tall art for phones (e.g. 1080 × 1440 px)" />
      </SectionCard>

      {/* 3 · Free classes */}
      <SectionCard id="free-classes" step={3} title="Watch Free Online Classes" description="Video cards. With a YouTube video the card plays on the page; otherwise the link opens.">
        <ListEditor
          items={details.freeClasses}
          onChange={(freeClasses) => onChange({ freeClasses })}
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
          onChange={(batches) => onChange({ batches })}
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
        <BannerGallery banners={details.topRankers} onChange={(topRankers) => onChange({ topRankers })} itemName="Rankers banner" webHint="Wide art, about 2.9 : 1 (e.g. 3821 × 1324 px)" mobileHint="Tall art (e.g. 1203 × 1650 px)" />
      </SectionCard>

      {/* 6 · About exam */}
      <SectionCard id="about-exam" step={6} title={`All About ${examName || "…"} Exam`} description="Highlight cards and the guide text (the first paragraph shows, the rest open with “Read more”).">
        <Field label="Section heading" hint="Leave empty to use the heading above">
          <TextInput value={details.aboutExam.title} onChange={(title) => onChange({ aboutExam: { ...details.aboutExam, title } })} placeholder={`All About ${examName || "…"} Exam`} />
        </Field>

        <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.9rem", mt: 1 }}>Highlights</Typography>
        <ListEditor
          items={details.aboutExam.highlights}
          onChange={(highlights) => onChange({ aboutExam: { ...details.aboutExam, highlights } })}
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

        <Field label="Description" group hint="Write it like a blog post — headings, bold, lists, tables and links all show on the exam page.">
          <RichTextEditor value={details.aboutExam.content} onChange={(content) => onChange({ aboutExam: { ...details.aboutExam, content } })} placeholder="Everything a student should know about this exam…" />
        </Field>
      </SectionCard>

      {/* 7 · FAQs */}
      <SectionCard id="faqs" step={7} title="Frequently Asked Questions" description="Also added to the page for Google (FAQ rich results).">
        <ListEditor
          items={details.faqs}
          onChange={(faqs) => onChange({ faqs })}
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
    </>
  );
}
