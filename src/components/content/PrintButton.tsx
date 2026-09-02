'use client';

import { track } from '@/lib/track';

export function PrintButton({ recipe }: { recipe: string }) {
  return (
    <button
      type="button"
      className="btn-ghost"
      onClick={() => {
        track('recipe_print', { recipe });
        window.print();
      }}
    >
      Print the recipe card
    </button>
  );
}
