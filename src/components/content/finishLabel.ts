import { getPitmasterTarget, getSafetyMinimum, renderableDoneness } from '@/content';

/**
 * One-line label for a retail cut's `finish` ref, whichever of the three
 * temperature kinds it points at. The kind is named in the label so the
 * three never read as the same thing.
 */
export function finishLabel(finish: string): string {
  const t = getPitmasterTarget(finish);
  if (t) return `${t.finish_test?.replace(/_/g, ' ')}, ${t.window_f?.min} to ${t.window_f?.max} F (craft)`;
  const s = getSafetyMinimum(finish);
  if (s) return `${s.temp_f} F${s.rest ? ' + rest' : ''} (USDA)`;
  const d = renderableDoneness(finish);
  if (d) return `Your doneness, ${d.safety.temp_f} F${d.safety.rest ? ' + rest' : ''} USDA floor`;
  return finish;
}
