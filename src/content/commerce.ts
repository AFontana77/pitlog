/**
 * Amazon Associates identity for pitlog.app.
 *
 * Enrolled 2026-09-03. `pitlog.app` is on the Associates website list and
 * `pitlog-20` is its own tracking ID, so earnings attribute to this property
 * rather than pooling into another site's reporting.
 *
 * The tag is NOT a secret. It travels in the query string of every affiliate
 * link, so it belongs in the repo rather than in an env var, where it would be
 * one deploy-config mistake away from silently attributing nothing.
 *
 * BEING ENROLLED IS NOT THE SAME AS BEING READY TO LINK. Every gear category in
 * the spine is still `category_defined_no_products`, and this lane's standing
 * rule is that an ASIN must be verified as the right product before it ships:
 * a 200 response proves an ASIN exists, not that it is the thing the page says
 * it is. Elsewhere in this portfolio three canner links resolved to masonry
 * drill bits, all returning 200. So:
 *
 *   - no link is built from an ASIN that has not been identity-checked
 *     (brand AND product type AND model AND pack size, each separately);
 *   - prices are not printed from memory, because they go stale silently;
 *   - /gear stays noindex until a verified manifest exists.
 *
 * Amazon links are website-only. They must never appear in the app, in the KDP
 * interior, or in any printable, which is an Associates Operating Agreement
 * requirement and not a style preference.
 */
export const AMAZON_ASSOCIATES_TAG = 'pitlog-20';

/** Cleared: the Operating Agreement requires an accessible privacy policy on any site carrying Amazon links. */
export const COMPLIANCE = {
  privacyPolicy: '/privacy',
  terms: '/terms',
  enrolledOn: '2026-09-03',
} as const;
