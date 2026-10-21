"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { COLORS } from "@/theme/colors";
import AdminErrorState from "@/sections/Admin/AdminErrorState";

/**
 * Admin-wide error screen, used when the panel itself can't load (e.g. the server is down while checking
 * the session). Errors inside a page are caught lower down, inside the sidebar layout.
 */
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
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
    <Box sx={{ minHeight: "100dvh", display: "flex", alignItems: "center", px: 2, bgcolor: COLORS.surface }}>
      <AdminErrorState
        title="The admin panel couldn't load"
        message="We couldn't reach the server to check your session. It may be down or restarting — please try again in a moment."
        digest={error.digest}
        onRetry={retry}
        backHref="/admin/login"
        backLabel="Go to sign in"
      />
    </Box>
  );
}
