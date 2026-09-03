import { amazonUrl, anyProducts, productsFor, shortLabel } from '@/content/products';
import { AffiliateDisclosure } from './AffiliateDisclosure';
import { C, Label } from './ui';

// SHOP THIS RECIPE. A printable checklist first, a shopping list second.
//
// The checkbox stays whatever happens, because the reason this block earns its
// place is that a recipe is a repeat shopping list. Where a pantry item has a
// verified pick it becomes a link; where it does not, the row is still a row.
// Fresh meat is never listed.

function pretty(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ShopThisRecipe({ categories }: { categories: string[] }) {
  if (!categories.length) return null;
  const paid = anyProducts(categories);
  return (
    <div>
      <Label>Shop this recipe</Label>
      <p className="text-sm mb-3" style={{ color: C.textMuted }}>
        Pantry items to check before you start. Print the page and tick them off.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {categories.map((c) => {
          const pick = productsFor(c)[0];
          return (
            <li key={c} className="flex items-baseline gap-3 py-1.5 text-sm" style={{ color: C.textSoft }}>
              <span
                aria-hidden="true"
                className="inline-block w-4 h-4 shrink-0"
                style={{ border: `1px solid ${C.textMuted}`, borderRadius: 2 }}
              />
              <span>
                {pretty(c)}
                {pick && (
                  <>
                    {' '}
                    <a
                      href={amazonUrl(pick.asin)}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="text-xs"
                      style={{ color: C.emberLight, textDecoration: 'underline' }}
                    >
                      {shortLabel(pick)}
                    </a>
                  </>
                )}
              </span>
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
