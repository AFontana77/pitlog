/**
 * Funnel events for the content pages (brief section 19), delivered on the
 * same dual path as affiliate-click-tracker.tsx: a dataLayer push for the GTM
 * contract, and a gtag command addressed to the GA4 property GTM already
 * loads. Client components only.
 *
 * Names: animal_select, cut_select, wood_select, recipe_open, recipe_print,
 * shop_ingredients_click, pdf_cta, app_cta, book_cta.
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    google_tag_manager?: Record<string, unknown>;
  }
}

function measurementId(): string | undefined {
  const g = typeof window !== 'undefined' ? window.google_tag_manager : undefined;
  if (!g) return undefined;
  return Object.keys(g).find((k) => /^G-[A-Z0-9]{6,}$/.test(k));
}

export function track(name: string, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const base: Params = {
    site_domain: window.location.hostname.replace(/^www\./, ''),
    source_path: window.location.pathname,
    ...params,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...base });
  const id = measurementId();
  if (id) {
    // gtag.js consumes real `arguments` objects, not arrays.
    const push = function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    push('event', name, { send_to: id, ...base });
  }
}
