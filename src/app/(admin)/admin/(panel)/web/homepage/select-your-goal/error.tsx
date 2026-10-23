"use client";

import SectionError from "@/sections/Admin/common/SectionError";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <SectionError error={error} reset={reset} title="Select Your Goal" what="categories and exams" />;
}
