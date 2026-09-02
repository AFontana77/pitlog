'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/track';
import { C } from './ui';

export interface DiagramRegion {
  slug: string;
  name: string;
  number: number;
  polygon: [number, number][];
  label: [number, number];
  short: string;
  tenderness: number;
  richness: number;
  methods: string[];
  woods: string[];
  recipeCount: number;
  learnHref: string;
  cookHref: string;
}

/**
 * The interactive primal diagram (brief section 9).
 *
 * The approved master is the picture. The SVG on top holds one <button> per
 * region as a polygon, so it is keyboard reachable, has a focus ring, and
 * reports pressed state. Nothing here is the only way to reach a region: the
 * page renders a plain list of region links under the diagram on the server.
 */
export function CutDiagram({
  animal,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  viewBox,
  regions,
  initial,
}: {
  animal: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  viewBox: string;
  regions: DiagramRegion[];
  initial?: string;
}) {
  const [selected, setSelected] = useState<string | null>(initial ?? null);
  const panelId = useId();
  const current = regions.find((r) => r.slug === selected) ?? null;

  function pick(slug: string) {
    setSelected(slug);
    track('cut_select', { animal, cut: slug, placement: 'diagram' });
  }

  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: '0.25rem', border: `1px solid ${C.border}`, background: C.paper }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} className="block w-full h-auto" />
        <svg
          viewBox={viewBox}
          className="absolute inset-0 w-full h-full"
          role="group"
          aria-label={`${animal} primal regions. Pick one to see its guide.`}
          aria-controls={panelId}
        >
          <style>{`
            .pl-region { fill: oklch(0.62 0.16 55 / 0); stroke: oklch(0.55 0.18 30 / 0); stroke-width: 2; cursor: pointer; transition: fill 160ms, stroke 160ms; }
            .pl-region:hover, .pl-region:focus-visible { fill: oklch(0.62 0.16 55 / 0.28); stroke: oklch(0.55 0.18 30 / 0.9); outline: none; }
            .pl-region[aria-pressed="true"] { fill: oklch(0.55 0.18 30 / 0.32); stroke: oklch(0.55 0.18 30); stroke-width: 3; }
            .pl-region:focus-visible { stroke: oklch(0.72 0.14 55); stroke-width: 4; }
          `}</style>
          {regions.map((r) => (
            <g key={r.slug}>
              <polygon
                className="pl-region"
                points={r.polygon.map((p) => p.join(',')).join(' ')}
                role="button"
                tabIndex={0}
                aria-pressed={selected === r.slug}
                aria-label={`${r.number}. ${r.name}`}
                onClick={() => pick(r.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    pick(r.slug);
                  }
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      <div id={panelId} aria-live="polite" className="mt-4">
        {current ? (
          <div className="p-5 sm:p-6" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '0.25rem' }}>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display text-2xl" style={{ color: C.ember }}>
                {String(current.number).padStart(2, '0')}
              </span>
              <h3 className="font-display text-2xl" style={{ color: C.text }}>
                {current.name}
              </h3>
            </div>
            <p className="leading-relaxed mb-4" style={{ color: C.textSoft }}>
              {current.short}
            </p>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-5">
              <div>
                <dt className="font-display uppercase" style={{ color: C.ember, fontSize: '0.65rem', letterSpacing: '0.14em' }}>Tenderness</dt>
                <dd style={{ color: C.text }}>{current.tenderness} / 5</dd>
              </div>
              <div>
                <dt className="font-display uppercase" style={{ color: C.ember, fontSize: '0.65rem', letterSpacing: '0.14em' }}>Richness</dt>
                <dd style={{ color: C.text }}>{current.richness} / 5</dd>
              </div>
              <div>
                <dt className="font-display uppercase" style={{ color: C.ember, fontSize: '0.65rem', letterSpacing: '0.14em' }}>Best methods</dt>
                <dd style={{ color: C.text }}>{current.methods.slice(0, 2).join(', ')}</dd>
              </div>
              <div>
                <dt className="font-display uppercase" style={{ color: C.ember, fontSize: '0.65rem', letterSpacing: '0.14em' }}>Woods</dt>
                <dd style={{ color: C.text }}>{current.woods.slice(0, 3).join(', ')}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-3">
              <Link href={current.learnHref} className="btn-primary press-feedback" data-placement="diagram">
                Learn
              </Link>
              {current.recipeCount > 0 && (
                <Link href={current.cookHref} className="btn-ghost" data-placement="diagram">
                  Cook
                </Link>
              )}
              <Link href="/free-download" className="btn-ghost" data-placement="diagram" onClick={() => track('app_cta', { animal, cut: current.slug, placement: 'diagram' })}>
                Log
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-sm" style={{ color: C.textMuted }}>
            Tap a region on the diagram, or use the list below.
          </p>
        )}
      </div>
    </div>
  );
}
