/**
 * Hotspot polygons for the interactive primal diagrams, one file per animal,
 * drawn over a crop of the approved master. Coordinates are master pixels;
 * the SVG viewBox equals the crop box, so no scaling happens in code.
 *
 * An animal with no entry here renders the text-first cut list only.
 */
import beef from '../../content/graphics/hotspots/beef.json';
import pork from '../../content/graphics/hotspots/pork.json';
import chicken from '../../content/graphics/hotspots/chicken.json';
import lamb from '../../content/graphics/hotspots/lamb.json';
import goat from '../../content/graphics/hotspots/goat.json';
import salmon from '../../content/graphics/hotspots/salmon.json';
import type { AnimalSlug } from './index';

export interface HotspotFile {
  _meta: { master: string; master_md5: string; web_image: string; web_image_px: [number, number]; crop_box_xyxy: number[]; review_status: string };
  viewBox: string;
  regions: { slug: string; polygon: [number, number][]; label: [number, number] }[];
}

const FILES: Partial<Record<AnimalSlug, HotspotFile>> = {
  beef: beef as unknown as HotspotFile,
  pork: pork as unknown as HotspotFile,
  chicken: chicken as unknown as HotspotFile,
  lamb: lamb as unknown as HotspotFile,
  goat: goat as unknown as HotspotFile,
  salmon: salmon as unknown as HotspotFile,
};

export function getHotspots(animal: AnimalSlug): HotspotFile | undefined {
  const f = FILES[animal];
  return f && f._meta.review_status === 'REVIEWED' ? f : undefined;
}

/** Alt text for the diagram image, built from the region list. */
export function diagramAlt(animalName: string, regions: { number: number; name: string }[]): string {
  return `${animalName} primal cuts diagram: ${regions.map((r) => `${r.number} ${r.name.toLowerCase()}`).join(', ')}`;
}
