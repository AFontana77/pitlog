import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Shared presentational pieces for the content pages, matching the smoky
 * design system already on the site (globals.css, home, library). Kept as
 * tiny primitives so the pages read as data + prose, not as style soup.
 */
export const C = {
  bgDeep: 'oklch(0.10 0.020 50)',
  bg: 'oklch(0.13 0.025 50)',
  surface: 'oklch(0.18 0.030 50)',
  surfaceRaised: 'oklch(0.22 0.032 50)',
  text: 'oklch(0.93 0.020 50)',
  textSoft: 'oklch(0.82 0.018 50)',
  textMuted: 'oklch(0.62 0.018 50)',
  ember: 'oklch(0.62 0.16 55)',
  emberLight: 'oklch(0.72 0.14 55)',
  burgundy: 'oklch(0.55 0.18 30)',
  border: 'oklch(0.28 0.025 50)',
  paper: 'oklch(0.96 0.012 80)',
} as const;

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      className="font-display uppercase font-semibold mb-6 flex items-center gap-3"
      style={{ color: C.ember, letterSpacing: '0.18em', fontSize: '0.7rem' }}
    >
      <span style={{ display: 'inline-block', width: 24, height: 1, background: C.ember }} aria-hidden="true" />
      {children}
    </div>
  );
}

export function Section({
  children,
  tone = 'bg',
  width = 'max-w-5xl',
  className = '',
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: 'bgDeep' | 'bg' | 'surface';
  width?: string;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`px-4 sm:px-6 lg:px-8 py-16 lg:py-20 ${className}`}
      style={{ backgroundColor: C[tone], borderTop: `1px solid ${C.border}` }}
    >
      <div className={`${width} mx-auto`}>{children}</div>
    </section>
  );
}

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ color: C.text, lineHeight: 1.05 }}>
      {children}
    </h1>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-display text-3xl sm:text-4xl mb-5" style={{ color: C.text, lineHeight: 1.05 }}>
      {children}
    </h2>
  );
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="font-display text-xl sm:text-2xl mb-3" style={{ color: C.text, lineHeight: 1.15 }}>
      {children}
    </h3>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: C.textSoft }}>
      {children}
    </p>
  );
}

export function P({ children, muted = false, className = '' }: { children: ReactNode; muted?: boolean; className?: string }) {
  return (
    <p className={`leading-relaxed max-w-2xl ${className}`} style={{ color: muted ? C.textMuted : C.textSoft }}>
      {children}
    </p>
  );
}

export function Card({ children, className = '', raised = false }: { children: ReactNode; className?: string; raised?: boolean }) {
  return (
    <div
      className={`p-6 sm:p-8 ${className}`}
      style={{ background: raised ? C.surfaceRaised : C.surface, border: `1px solid ${C.border}`, borderRadius: '0.25rem' }}
    >
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-display uppercase block mb-3" style={{ color: C.ember, letterSpacing: '0.18em', fontSize: '0.7rem' }}>
      {children}
    </span>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="text-left py-3 px-3 font-display uppercase" style={{ color: C.ember, letterSpacing: '0.12em', fontSize: '0.7rem' }}>
      {children}
    </th>
  );
}

export function Td({ children, strong = false, num = false, className = '' }: { children: ReactNode; strong?: boolean; num?: boolean; className?: string }) {
  return (
    <td
      className={`py-3 px-3 align-top ${num ? 'tabular-nums whitespace-nowrap' : ''} ${className}`}
      style={{ color: strong ? C.text : C.textSoft, fontSize: '0.9rem' }}
    >
      {children}
    </td>
  );
}

export function Tr({ children, i }: { children: ReactNode; i: number }) {
  return (
    <tr style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 ? C.surface : 'transparent' }}>
      {children}
    </tr>
  );
}

/** Breadcrumb trail plus its JSON-LD. */
export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `https://pitlog.app${it.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm" style={{ color: C.textMuted }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ol className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={it.href} className="flex gap-2">
            {i < items.length - 1 ? (
              <Link href={it.href} style={{ color: C.textSoft }}>
                {it.name}
              </Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The four-way footer every content page ends with: app, PDF, poster, book. */
export function CtaRow({ appHref = '/free-download', pdfHref = '/free-download', posterNote, bookNote }: { appHref?: string; pdfHref?: string; posterNote?: string; bookNote?: string }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3">
      <Link href={appHref} className="btn-primary press-feedback" data-placement="content_cta" data-cta="app">
        Log this cook in Pit Master Log
      </Link>
      <Link href={pdfHref} className="btn-ghost" data-placement="content_cta" data-cta="pdf">
        Get the free field guide
      </Link>
      {posterNote && (
        <span className="self-center text-xs" style={{ color: C.textMuted }}>
          {posterNote}
        </span>
      )}
      {bookNote && (
        <span className="self-center text-xs" style={{ color: C.textMuted }}>
          {bookNote}
        </span>
      )}
    </div>
  );
}
