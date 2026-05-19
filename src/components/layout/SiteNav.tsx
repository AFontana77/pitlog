'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/library', label: 'Library' },
  { href: '/free-download', label: 'Free Download' },
  { href: '/about', label: 'About' },
];

const linkStyle = {
  color: 'oklch(0.82 0.018 50)',
  fontFamily: 'var(--font-display), Georgia, serif',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  fontSize: '0.75rem',
};

const ctaStyle = {
  background: 'oklch(0.62 0.16 55)',
  color: 'oklch(0.13 0.025 50)',
  fontFamily: 'var(--font-display), Georgia, serif',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  fontSize: '0.75rem',
  borderRadius: '0.25rem',
};

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm"
        style={{
          background: 'oklch(0.62 0.16 55)',
          color: 'oklch(0.13 0.025 50)',
          borderRadius: '0.25rem',
          fontFamily: 'var(--font-display), Georgia, serif',
        }}
      >
        Skip to main content
      </a>
      <nav
        className="fixed top-0 w-full z-50 backdrop-blur-md"
        role="navigation"
        aria-label="Main navigation"
        style={{
          background: 'oklch(0.10 0.020 50 / 0.92)',
          borderBottom: '1px solid oklch(0.28 0.025 50)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl tracking-tight"
            style={{ color: 'oklch(0.93 0.020 50)' }}
            aria-label="Pit Master Log home"
          >
            Pit Master Log
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
            <Link
              href="/free-download"
              className="px-4 py-2 min-h-[44px] flex items-center press-feedback"
              style={ctaStyle}
            >
              Free Download
            </Link>
          </div>
          <button
            className="sm:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{ color: 'oklch(0.82 0.018 50)' }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div
            className="sm:hidden px-4 py-4 flex flex-col gap-3"
            style={{
              background: 'oklch(0.10 0.020 50)',
              borderTop: '1px solid oklch(0.28 0.025 50)',
            }}
          >
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2"
                style={{ ...linkStyle, fontSize: '0.875rem' }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/free-download"
              className="mt-2 px-4 py-3 text-center"
              style={ctaStyle}
              onClick={() => setOpen(false)}
            >
              Free Download
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
