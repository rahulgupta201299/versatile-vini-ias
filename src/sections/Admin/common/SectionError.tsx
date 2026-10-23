"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminErrorState from "../AdminErrorState";

type SectionErrorProps = { error: Error & { digest?: string }; reset: () => void; title: string; what: string };

/** Error screen for one Homepage section: "Try again" reloads it, "Back to Homepage" leaves. */
export default function SectionError({ error, reset, title, what }: SectionErrorProps) {
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
      backHref="/admin/web/homepage"
      backLabel="Back to Homepage"
    />
  );
}
