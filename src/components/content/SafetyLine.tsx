import type { SafetyMinimum } from '@/content';
import { getSource } from '@/content';
import { C } from './ui';

/**
 * The USDA line. Required on every page that prints a temperature.
 *
 * It names the agency, prints the minimum and the rest, and links the exact
 * FSIS page the figure came from with the date we read it. It never softens
 * the number and it is never rendered inside a collapsed element.
 */
export function SafetyLine({
  safety,
  compact = false,
  contrast = false,
}: {
  safety: SafetyMinimum;
  compact?: boolean;
  // A second floor shown next to the first, for contrast. It must not claim to
  // govern. Two cards that both say "this one governs" cancel out. On the
  // ground beef page, a reader who takes the 145 F rule home is the exact
  // person this card exists to protect.
  contrast?: boolean;
}) {
  const src = getSource(safety.source_refs[0]);
  return (
    <div
      role="note"
      aria-label="USDA food safety minimum"
      className={compact ? 'p-4' : 'p-5 sm:p-6'}
      style={{ background: 'oklch(0.20 0.06 30)', border: `1px solid ${C.burgundy}`, borderLeft: `4px solid ${C.burgundy}`, borderRadius: '0.25rem' }}
    >
      <div className="font-display uppercase mb-2" style={{ color: 'oklch(0.85 0.10 30)', letterSpacing: '0.14em', fontSize: '0.7rem' }}>
        USDA FSIS safe minimum
      </div>
      <p className="font-display text-xl sm:text-2xl mb-1" style={{ color: C.text, lineHeight: 1.15 }}>
        {safety.temp_f} F ({safety.temp_c} C){safety.rest ? `, then rest ${safety.rest}` : ''}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: C.textSoft }}>
        {safety.scope.charAt(0).toUpperCase() + safety.scope.slice(1)}. {safety.measurement.charAt(0).toUpperCase() + safety.measurement.slice(1)}.
        {' '}This is a food safety floor, not a preference.{' '}
        {contrast
          ? 'It is printed here for the comparison, and it does not apply to the cuts this page is about.'
          : 'Where any other number on this page is lower, this one governs.'}
      </p>
      {src && !compact && (
        <p className="text-xs mt-2" style={{ color: C.textMuted }}>
          Source:{' '}
          <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: C.textSoft, textDecoration: 'underline' }}>
            {src.org}, {src.title}
          </a>
          {src.page_last_updated ? `, page updated ${src.page_last_updated}` : ''}, read {src.accessed}.
        </p>
      )}
    </div>
  );
}
