import type { AnimalSlug } from '@/content';

/**
 * Share cards. Built by scripts/build_og_images.py from the approved primal
 * diagrams; re-run it when a diagram changes.
 *
 * These are NOT the same file as the on-page diagram. The diagrams are 1.25 to
 * 2.25 aspect and a share card is 1.91, so every platform centre-crops them,
 * and what lives at the edge of a cut chart is the cut names. Serving the
 * diagram directly cost the chicken card about a third of its width. Each card
 * here is the whole diagram scaled to fit inside 1200x630 on its own paper
 * colour, so nothing is lost.
 */
export const OG_CARD_PX: [number, number] = [1200, 630];

/** The site-wide card, for pages with no animal of their own. */
export const OG_DEFAULT = '/og-image.jpg';

export function ogCard(animal: AnimalSlug | null | undefined): string {
  return animal ? `/images/og/${animal}.jpg` : OG_DEFAULT;
}

/** Ready-made `openGraph.images` / `twitter.images` pair for a page's metadata. */
export function ogImageMeta(animal: AnimalSlug | null | undefined, alt: string) {
  const url = ogCard(animal);
  return {
    openGraph: { images: [{ url, width: OG_CARD_PX[0], height: OG_CARD_PX[1], alt }] },
    twitter: { images: [url] },
  };
}
