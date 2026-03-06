/** Production site URL for canonical, og:url, etc. */
export const SITE_URL = 'https://luckyroo.win';

const DEFAULT_DESCRIPTION =
  "Lucky Roo – Australia's trusted source for online casino reviews, pokies guides & exclusive bonuses. For Aussie players. 18+.";

/**
 * Set page title and optional meta description (for SPA; good for crawlers that run JS).
 * Call in useEffect on each page.
 */
export function setPageMeta(title: string, description?: string): void {
  document.title = title;
  const desc = description ?? DEFAULT_DESCRIPTION;
  let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!el) {
    el = document.createElement('meta');
    el.name = 'description';
    document.head.appendChild(el);
  }
  el.content = desc;
}

/**
 * Build canonical URL for a path (no trailing slash except for root).
 */
export function canonicalUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p === '/' ? SITE_URL + '/' : `${SITE_URL}${p}`;
}
