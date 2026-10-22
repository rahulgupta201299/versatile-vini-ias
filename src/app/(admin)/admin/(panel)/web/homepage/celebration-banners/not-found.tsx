import AdminErrorState from "@/sections/Admin/AdminErrorState";

/** A banner that doesn't exist (wrong or old link). */
export default function CelebrationBannerNotFound() {
  return (
    <AdminErrorState
      variant="not-found"
      title="Banner not found"
      message="This celebration banner doesn't exist — the link may be wrong or out of date. Nothing is ever deleted, so look for it in the banner list (inactive banners are listed separately)."
      backHref="/admin/web/homepage/celebration-banners"
      backLabel="Back to Celebration banner"
    />
  );
}
