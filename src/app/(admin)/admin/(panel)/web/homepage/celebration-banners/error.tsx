"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminErrorState from "@/sections/Admin/AdminErrorState";

/** Errors in Celebration banner screens (list, new, edit). */
export default function CelebrationBannersError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
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
      title="Celebration banners couldn't load"
      message="We couldn't get the banners from the server. It may be busy or temporarily down — please try again. Nothing you saved earlier is lost."
      digest={error.digest}
      onRetry={retry}
      backHref="/admin/web/homepage"
      backLabel="Back to Homepage"
    />
  );
}
