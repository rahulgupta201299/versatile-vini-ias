import { ErrorScreen } from "@/components/ErrorScreen";

/** 404 for a main-site page that calls notFound() — the site layout already adds the header and footer. */
export default function SiteNotFound() {
  return <ErrorScreen variant="notFound" />;
}
