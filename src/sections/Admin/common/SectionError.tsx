"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminErrorState from "../AdminErrorState";

type SectionErrorProps = { error: Error & { digest?: string }; reset: () => void; title: string; what: string; backHref?: string; backLabel?: string };

/** Error screen for one admin section: "Try again" reloads it, the back link (Homepage by default) leaves. */
export default function SectionError({ error, reset, title, what, backHref = "/admin/web/homepage", backLabel = "Back to Homepage" }: SectionErrorProps) {
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
      title={`${title} couldn't load`}
      message={`We couldn't get the ${what} from the server. It may be busy or temporarily down — please try again. Nothing you saved earlier is lost.`}
      digest={error.digest}
      onRetry={retry}
      backHref={backHref}
      backLabel={backLabel}
    />
  );
}
