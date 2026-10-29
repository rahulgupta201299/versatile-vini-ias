"use client";

import SectionError from "@/sections/Admin/common/SectionError";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <SectionError error={error} reset={reset} title="Mentorship" what="Mentorship pages" backHref="/admin/web/courses/mentorship" backLabel="Back to Mentorship" />;
}
