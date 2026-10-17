import type { Metadata } from "next";
import LegalPage from "@/sections/Legal/LegalPage";
import { LEGAL_DOCS, TERMS_AND_CONDITIONS } from "@/data/legal";

export const metadata: Metadata = {
  title: `${TERMS_AND_CONDITIONS.title} | Vini IAS`,
  description: TERMS_AND_CONDITIONS.description,
  alternates: { canonical: "/terms-and-conditions" },
};

export default function Page() {
  return <LegalPage doc={TERMS_AND_CONDITIONS} docs={LEGAL_DOCS} />;
}
