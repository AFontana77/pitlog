import { C } from './ui';
import { MANIFEST_VERIFIED_ON } from '@/content/products';

/**
 * Amazon requires this on any page with a paid link, near the links. Render it
 * where a product module renders and nowhere else. A notice on a page with no
 * paid links teaches readers to skip it where it counts.
 */
export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={compact ? 'text-xs' : 'text-xs mb-4'}
      style={{ color: C.textMuted, lineHeight: 1.6 }}
      data-affiliate-disclosure=""
    >
      As an Amazon Associate, Pit Log earns from qualifying purchases. We pick these by name and type,
      checked against Amazon&rsquo;s own records. Not by what pays best. We show no prices. A price on a
      page goes stale fast. Checked {MANIFEST_VERIFIED_ON}.
    </p>
  );
}
