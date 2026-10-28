/** True for links that leave the site (http/https to another host, or `external: true`). */
export const isExternalLink = ({ href, external }: { href: string; external?: boolean }) => {
  // `external: false` is a real choice, so only fall back to the URL check when it isn't set
  if (typeof external === "boolean") return external;

  return /^https?:\/\//i.test(href);
};

/** Extra props so external menu links open in a new tab safely. Spread after `href`. */
export const externalLinkProps = (link: { href: string; external?: boolean }) =>
  isExternalLink(link) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {};
