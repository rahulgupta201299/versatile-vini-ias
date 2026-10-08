/** True for links that leave the site (http/https to another host, or `external: true`). */
export const isExternalLink = (link: { href: string; external?: boolean }) => link.external ?? /^https?:\/\//i.test(link.href);

/** Extra props so external menu links open in a new tab safely. Spread after `href`. */
export const externalLinkProps = (link: { href: string; external?: boolean }) =>
  isExternalLink(link) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {};
