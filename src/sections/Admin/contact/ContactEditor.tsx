"use client";

import Box from "@mui/material/Box";
import { adminRequest } from "@/lib/adminClient";
import { AdminContact } from "@/types";
import { Field, FieldGrid, SectionCard, TextInput } from "../allExams/formKit";
import { usePart } from "../common/PartAccordion";
import SaveBar from "../common/SaveBar";
import ViewOnlyNotice from "../common/ViewOnlyNotice";
import { useSectionAccess } from "../AdminAccessContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const contactProblems = ({ phone, email, website }: AdminContact) => [
  ...(/^\d{10}$/.test(phone.replace(/\D/g, "")) ? [] : ["Phone must be a 10-digit mobile number."]),
  ...(EMAIL_PATTERN.test(email.trim()) ? [] : ["Enter a valid email address."]),
  ...(/^https?:\/\/\S+$/i.test(website.trim()) ? [] : ["Website must start with https://"]),
];

/** Web → Contact Info: the phone (calls and WhatsApp), email and website shown across the site. */
export default function ContactEditor({ contact }: { contact: AdminContact }) {
  const { canEdit } = useSectionAccess("contact");
  const form = usePart(contact, {
    validate: contactProblems,
    submit: (input) => adminRequest<AdminContact>("contact", { method: "PUT", body: input }),
    fromSaved: (saved) => saved,
  });
  const { input, update } = form;

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {!canEdit && <ViewOnlyNotice what="the contact details" />}
      <SectionCard id="contact" title="Contact details" description="Used by the help tab, callback forms, course pages (Contact Information), the Contact Us page, policy pages and Google's business details.">
        <FieldGrid>
          <Field label="Mobile number" required hint="10 digits — used for calls and WhatsApp (+91 is added).">
            <TextInput type="tel" value={input.phone} onChange={(phone) => update({ ...input, phone })} placeholder="8544078245" />
          </Field>
          <Field label="Email" required>
            <TextInput type="email" value={input.email} onChange={(email) => update({ ...input, email })} placeholder="support@groupvini.in" />
          </Field>
          <Field label="Website" required hint="Shown without https://, e.g. www.viniias.com.">
            <TextInput value={input.website} onChange={(website) => update({ ...input, website })} placeholder="https://www.viniias.com" />
          </Field>
          <Field label="WhatsApp first message" hint="Typed in for the student when they open WhatsApp (optional).">
            <TextInput value={input.whatsappMessage} onChange={(whatsappMessage) => update({ ...input, whatsappMessage })} placeholder="Hi Vini IAS, I need guidance…" />
          </Field>
        </FieldGrid>
        <SaveBar problems={form.problems} isDirty={form.isDirty} isSaved={form.status === "saved"} isSaving={form.status === "saving"} isDisabled={!canEdit} savedText=" — live on the website" label="Save contact details" onSave={form.save} />
      </SectionCard>
    </Box>
  );
}
