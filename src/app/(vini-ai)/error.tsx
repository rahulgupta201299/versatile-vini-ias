"use client";

import { useEffect } from "react";
import { ErrorScreen } from "@/components/ErrorScreen";

/** Catches a failing VINI AI page inside its own layout. */
export default function ViniAiError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorScreen digest={error.digest} onRetry={reset} />;
}
