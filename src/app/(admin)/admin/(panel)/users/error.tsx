"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminErrorState from "@/sections/Admin/AdminErrorState";

/** Errors on the Admin users screen. */
export default function AdminUsersError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = () =>
    startTransition(() => {
      router.refresh();
      reset();
    });

  return <AdminErrorState title="Admin users couldn't load" message="We couldn't get the list of admins from the server. It may be busy or temporarily down — please try again." digest={error.digest} onRetry={retry} />;
}
