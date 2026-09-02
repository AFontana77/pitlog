import { C, Label } from './ui';

function pretty(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * SHOP THIS RECIPE, v1. A printable checklist. No Amazon links yet:
 * pitlog.app is not enrolled. When it is, each row becomes a Special Link
 * with the disclosure above the list. Fresh meat is never listed as in stock.
 */
export function ShopThisRecipe({ categories }: { categories: string[] }) {
  if (!categories.length) return null;
  return (
    <div>
      <Label>Shop this recipe</Label>
      <p className="text-sm mb-3" style={{ color: C.textMuted }}>
        Pantry items to check before you start. Print the page and tick them off.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {categories.map((c) => (
          <li key={c} className="flex items-center gap-3 py-1.5 text-sm" style={{ color: C.textSoft }}>
            <span aria-hidden="true" className="inline-block w-4 h-4" style={{ border: `1px solid ${C.textMuted}`, borderRadius: 2 }} />
            {pretty(c)}
          </li>
        ))}
      </ul>
    </div>
  );
}
