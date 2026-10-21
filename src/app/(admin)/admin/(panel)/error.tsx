"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminErrorState from "@/sections/Admin/AdminErrorState";

/** Error screen for any admin page. Shown inside the sidebar layout, so navigation keeps working. */
export default function AdminPageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  // Re-fetch the server data and re-render the page
  const retry = () =>
    startTransition(() => {
      router.refresh();
      reset();
    });

  return (
    <AdminErrorState
      title="This page couldn't load"
      message="Something went wrong while loading this page — the server may be busy or temporarily down. Your saved content is safe."
      digest={error.digest}
      onRetry={retry}
    />
  );
}
