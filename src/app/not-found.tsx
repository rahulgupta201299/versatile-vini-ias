import { AppLayout } from "@/components";
import { ErrorScreen } from "@/components/ErrorScreen";

/** Global 404 — rendered outside the route groups, so it wraps itself in the main-site chrome. */
export default function NotFound() {
  return (
    <AppLayout>
      <ErrorScreen variant="notFound" />
    </AppLayout>
  );
}
