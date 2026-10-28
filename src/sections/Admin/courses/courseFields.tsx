"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CourseCta, CourseCtas, CourseFaq } from "@/types";
import { COLORS } from "@/theme/colors";
import { Field, FieldGrid, ListEditor, TextArea, TextInput } from "../allExams/formKit";

/* Fields shared by the course page editors (GS Foundation). */

export const LINK_HINT = "Page, #section or https:// link. Leave empty for the default action.";

const LINK_PATTERN = /^(\/|#|https?:\/\/)/i;

/** "Link must start with /, # or https://" when a link is set but malformed. */
export const linkProblem = (link: string, where: string) => {
  if (!link.trim() || LINK_PATTERN.test(link.trim())) return [];

  return [`${where}: the link must start with /, # or https://`];
};

export const textProblem = (value: string, message: string) => (value.trim() ? [] : [message]);

export const ctaProblems = ({ details, enroll }: CourseCtas) => [
  ...textProblem(details.label, "Add the Course Details button text."),
  ...linkProblem(details.link, "Course Details"),
  ...textProblem(enroll.label, "Add the Enroll button text."),
  ...linkProblem(enroll.link, "Enroll"),
];

export const faqProblems = (faqs: CourseFaq[]) =>
  faqs.flatMap(({ q, a }, index) => (q.trim() && a.trim() ? [] : [`FAQ ${index + 1}: add both the question and the answer.`]));

export const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.85rem" }}>{children}</Typography>
);

function CtaRow({ name, value, onChange, defaultAction }: { name: string; value: CourseCta; onChange: (value: CourseCta) => void; defaultAction: string }) {
  return (
    <FieldGrid>
      <Field label={`${name} button text`} required>
        <TextInput value={value.label} onChange={(label) => onChange({ ...value, label })} placeholder={name} />
      </Field>
      <Field label={`${name} link`} hint={`${LINK_HINT} (${defaultAction})`}>
        <TextInput value={value.link} onChange={(link) => onChange({ ...value, link })} placeholder="https://store.viniias.com/…" />
      </Field>
    </FieldGrid>
  );
}

/** "Course Details" and "Enroll" buttons: text and link each. */
export function CtaFields({ value, onChange }: { value: CourseCtas; onChange: (value: CourseCtas) => void }) {
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <CtaRow name="Course Details" value={value.details} onChange={(details) => onChange({ ...value, details })} defaultAction="scrolls to the course details" />
      <CtaRow name="Enroll" value={value.enroll} onChange={(enroll) => onChange({ ...value, enroll })} defaultAction="opens the sign-up popup" />
    </Box>
  );
}

export function FaqsEditor({ faqs, onChange }: { faqs: CourseFaq[]; onChange: (faqs: CourseFaq[]) => void }) {
  return (
    <ListEditor
      items={faqs}
      onChange={onChange}
      createItem={() => ({ q: "", a: "" })}
      addLabel="Add FAQ"
      emptyText="No FAQs yet."
      itemLabel={({ q }, index) => q || `FAQ ${index + 1}`}
      renderItem={(faq, updateFaq) => (
        <Box sx={{ display: "grid", gap: 1.5 }}>
          <Field label="Question" required>
            <TextInput value={faq.q} onChange={(q) => updateFaq({ ...faq, q })} placeholder="Who is this course for?" />
          </Field>
          <Field label="Answer" required>
            <TextArea value={faq.a} onChange={(a) => updateFaq({ ...faq, a })} rows={3} />
          </Field>
        </Box>
      )}
    />
  );
}

/** A list of short lines (check-list points). Empty lines are dropped when saving. */
export function TextListEditor({ items, onChange, addLabel, placeholder }: { items: string[]; onChange: (items: string[]) => void; addLabel: string; placeholder: string }) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      createItem={() => ""}
      addLabel={addLabel}
      emptyText="Nothing added yet."
      itemLabel={(item, index) => item || `Point ${index + 1}`}
      renderItem={(item, updateItem) => (
        <Field label="Text">
          <TextInput value={item} onChange={updateItem} placeholder={placeholder} />
        </Field>
      )}
    />
  );
}
