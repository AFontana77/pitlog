import { GEAR_CATEGORIES } from '@/content';
import { C, Label } from './ui';

/**
 * The toolkit for a cut or a recipe. Categories only.
 *
 * No product, no price, no link until a verified product manifest exists and
 * pitlog.app is enrolled in a program. Rendering categories is still useful:
 * it is the "what you need" list every guide carries. When products arrive
 * this component gains a card per category; the call sites do not change.
 */
export function GearList({ refs, heading = 'What you need' }: { refs: string[]; heading?: string }) {
  const items = refs.map((r) => GEAR_CATEGORIES.find((g) => g.slug === r)).filter((g): g is NonNullable<typeof g> => !!g);
  if (!items.length) return null;
  return (
    <div>
      <Label>{heading}</Label>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((g) => (
          <li key={g.slug} className="flex gap-3 py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
            <span className="font-display" style={{ color: C.ember }} aria-hidden="true">
              +
            </span>
            <div>
              <div style={{ color: C.text }}>{g.name}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>
                {g.why}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
