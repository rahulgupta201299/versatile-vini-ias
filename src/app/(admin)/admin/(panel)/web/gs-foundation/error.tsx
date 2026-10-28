"use client";

import SectionError from "@/sections/Admin/common/SectionError";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <SectionError error={error} reset={reset} title="GS Foundation" what="GS Foundation pages" backHref="/admin/web/gs-foundation" backLabel="Back to GS Foundation" />;
}
