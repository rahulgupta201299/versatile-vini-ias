"use client";

import SectionError from "@/sections/Admin/common/SectionError";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <SectionError error={error} reset={reset} title="Header & Menu" what="header menus" backHref="/admin/web/header" backLabel="Back to Header & Menu" />;
}
