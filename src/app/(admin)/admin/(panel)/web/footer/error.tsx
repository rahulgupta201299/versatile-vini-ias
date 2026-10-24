"use client";

import SectionError from "@/sections/Admin/common/SectionError";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <SectionError error={error} reset={reset} title="Footer" what="footer sections" backHref="/admin/web/footer" backLabel="Back to Footer" />;
}
