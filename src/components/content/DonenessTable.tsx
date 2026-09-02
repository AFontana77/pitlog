import { renderableDoneness } from '@/content';
import { C, Th, Td, Tr } from './ui';

/**
 * A culinary doneness table. Accepts only a record id and resolves it through
 * renderableDoneness(), which hands back the safety minimum and the disclosure
 * together, so the table cannot be printed without them.
 */
export function DonenessTable({ id, title }: { id: string; title?: string }) {
  const r = renderableDoneness(id);
  if (!r) return null;
  const { record, safety, mustDisclose, disclosure } = r;
  return (
    <div>
      {title && (
        <h3 className="font-display text-xl mb-1" style={{ color: C.text }}>
          {title}
        </h3>
      )}
      <p className="text-sm mb-3" style={{ color: C.textMuted }}>
        {record.scope.charAt(0).toUpperCase() + record.scope.slice(1)}. Culinary preference, {record.review_status === 'SOURCED' ? 'as published by the industry body cited below' : 'barbecue convention'}.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label={title ?? 'Doneness guide'}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              <Th>Doneness</Th>
              {record.tiers.some((t) => t.pull_f) && <Th>Pull at</Th>}
              <Th>Internal temp</Th>
              <Th>Vs. USDA {safety.temp_f} F</Th>
            </tr>
          </thead>
          <tbody>
            {record.tiers.map((t, i) => (
              <Tr key={t.label} i={i}>
                <Td strong>{t.label}</Td>
                {record.tiers.some((x) => x.pull_f) && <Td num>{t.pull_f ? `${t.pull_f} F` : ''}</Td>}
                <Td num>
                  {t.temp_f_min}
                  {t.temp_f_max && t.temp_f_max !== t.temp_f_min ? ` to ${t.temp_f_max}` : t.temp_f_max === null ? '+' : ''} F
                  {t.rest ? `, rest ${t.rest}` : ''}
                </Td>
                <Td>
                  {t.below_safety_minimum ? (
                    <span style={{ color: 'oklch(0.80 0.12 30)' }}>Below the minimum. Preference, not safety.</span>
                  ) : (
                    <span style={{ color: C.textMuted }}>At or above the minimum.</span>
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>
      {record.carryover && (
        <p className="text-xs mt-3" style={{ color: C.textMuted }}>
          Carryover: {record.carryover}
        </p>
      )}
      {mustDisclose && disclosure && (
        <p className="text-sm mt-3 p-3" style={{ color: C.text, background: 'oklch(0.20 0.06 30)', borderLeft: `3px solid ${C.burgundy}` }}>
          {disclosure}
        </p>
      )}
    </div>
  );
}
