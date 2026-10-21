"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminErrorState from "@/sections/Admin/AdminErrorState";

/** Errors in All Exams screens (list, new, edit) — offers a way back to the All Exams list. */
export default function AllExamsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = () =>
    startTransition(() => {
      router.refresh();
      reset();
    });

  return (
    <AdminErrorState
      title="All Exams couldn't load"
      message="We couldn't get the exams from the server. It may be busy or temporarily down — please try again. Nothing you saved earlier is lost."
      digest={error.digest}
      onRetry={retry}
      backHref="/admin/web/homepage"
      backLabel="Back to Homepage"
    />
  );
}
