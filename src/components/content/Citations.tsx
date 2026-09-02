import { citationsFor } from '@/content';
import { C } from './ui';

const TIER: Record<number, string> = {
  1: 'Federal agency',
  2: 'University',
  3: 'Industry body',
  4: 'Provider documentation',
  5: 'Practitioner report',
};

/** Sources for a page, tier-1 first, each with the date we read it. */
export function Citations({ refs, updatedAt }: { refs: string[]; updatedAt?: string }) {
  const list = citationsFor(refs);
  if (!list.length) return null;
  return (
    <aside aria-labelledby="sources-heading" className="mt-10 pt-6" style={{ borderTop: `1px solid ${C.border}` }}>
      <h2 id="sources-heading" className="font-display text-lg mb-3" style={{ color: C.text }}>
        Sources
      </h2>
      <ol className="text-sm space-y-2" style={{ color: C.textSoft }}>
        {list.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
              {s.org}: {s.title}
            </a>
            <span style={{ color: C.textMuted }}>
              {' '}({TIER[s.tier]}{s.page_last_updated ? `, page updated ${s.page_last_updated}` : ''}, read {s.accessed})
            </span>
          </li>
        ))}
      </ol>
      <p className="text-xs mt-4" style={{ color: C.textMuted }}>
        Safety figures on this page are from the federal sources above. Tenderness windows, doneness preferences and wood pairings are barbecue craft and are labelled as such. {updatedAt ? `Records last reviewed ${updatedAt}.` : ''} Published by Anvil Road LLC.
      </p>
    </aside>
  );
}
