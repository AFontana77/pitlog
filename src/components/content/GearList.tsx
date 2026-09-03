import { GEAR_CATEGORIES } from '@/content';
import { amazonUrl, productsFor, shortLabel, anyProducts } from '@/content/products';
import { AffiliateDisclosure } from './AffiliateDisclosure';
import { C, Label } from './ui';

// The toolkit for a cut or a recipe. Categories always render; "what you need"
// is useful with or without a product. Verified picks render under the
// category, two at most, per the spine's placement rule.
//
// A category with no verified pick shows no link. That is the honest state and
// it is common: two are never sourced at all, because a smoker is not a
// top-of-SERP pick.
export function GearList({ refs, heading = 'What you need' }: { refs: string[]; heading?: string }) {
  const items = refs.map((r) => GEAR_CATEGORIES.find((g) => g.slug === r)).filter((g): g is NonNullable<typeof g> => !!g);
  if (!items.length) return null;
  const paid = anyProducts(items.map((g) => g.slug));
  return (
    <div>
      <Label>{heading}</Label>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((g) => {
          const products = productsFor(g.slug).slice(0, 2);
          return (
            <li key={g.slug} className="flex gap-3 py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
              <span className="font-display" style={{ color: C.ember }} aria-hidden="true">
                +
              </span>
              <div>
                <div style={{ color: C.text }}>{g.name}</div>
                <div className="text-xs" style={{ color: C.textMuted }}>
                  {g.why}
                </div>
                {products.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {products.map((p) => (
                      <li key={p.asin} className="text-xs">
                        <a
                          href={amazonUrl(p.asin)}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          style={{ color: C.emberLight, textDecoration: 'underline' }}
                        >
                          {shortLabel(p)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {paid && (
        <div className="mt-3">
          <AffiliateDisclosure compact />
        </div>
      )}
    </div>
  );
}
