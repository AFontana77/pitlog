import Link from 'next/link';

const linkStyle = {
  color: 'oklch(0.82 0.018 50)',
  fontFamily: 'var(--font-display), Georgia, serif',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  fontSize: '0.75rem',
};

export function SiteFooter() {
  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8 mt-auto"
      role="contentinfo"
      style={{
        background: 'oklch(0.10 0.020 50)',
        borderTop: '1px solid oklch(0.28 0.025 50)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        <div
          className="font-display text-lg"
          style={{ color: 'oklch(0.93 0.020 50)' }}
        >
          Pit Master Log
        </div>
        <div className="flex gap-6">
          <Link href="/library" style={linkStyle}>Library</Link>
          <Link href="/free-download" style={linkStyle}>Free Download</Link>
          <Link href="/about" style={linkStyle}>About</Link>
          <Link href="/privacy" style={linkStyle}>Privacy</Link>
          <Link href="/terms" style={linkStyle}>Terms</Link>
        </div>
        <div style={{ color: 'oklch(0.62 0.018 50)', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} Anvil Road LLC
        </div>
      </div>
    </footer>
  );
}
