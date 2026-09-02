/**
 * Printful adapter, design and types only. NO network call is made anywhere in
 * this file and no product exists in Printful yet: the account, payouts and
 * API token are owner-only (owner queue item 2). When PRINTFUL_API_TOKEN is
 * set, the functions below become the single place the site talks to
 * Printful. Until then they throw a clear error rather than pretend.
 *
 * Contract (Printful API v1, read 2026-09-02 from developers.printful.com):
 *   auth        Authorization: Bearer <private token>
 *   catalog     GET /products/{id}  -> variants[] with size, color, price (USD, before plan discount)
 *   shipping    POST /shipping/rates { recipient, items[{variant_id, quantity}] }
 *   orders      POST /orders { recipient, items[{variant_id, files[{url}], quantity}] } (confirm: false = draft)
 *   mockups     POST /mockup-generator/create-task/{product_id} -> task_key; GET /mockup-generator/task?task_key=
 *   webhooks    POST /webhooks { url, types: ['package_shipped','order_failed','order_canceled', ...] }
 *   limits      120 req/min authenticated; 30/min unauthenticated catalog
 *
 * Product ids captured 2026-09-02 (public catalog, no auth):
 *   1   Enhanced Matte Paper Poster (in)        189 gsm  18x24 $13.15  24x36 $18.25  12x18 $11.62
 *   2   Enhanced Matte Paper Framed Poster (in) black/white/red oak  18x24 $46.30  24x36 $75.90
 *   171 Premium Luster Photo Paper Poster (in)  18x24 $16.65  24x36 $22.89
 *   172 Premium Luster Photo Paper Framed Poster (in)  18x24 $56.18  24x36 $92.60
 */

export type PosterSize = '12x18' | '18x24' | '24x36';
export type FrameColor = 'none' | 'black' | 'white' | 'red-oak';

export interface PosterVariant {
  size: PosterSize;
  frame: FrameColor;
  /** Printful catalog variant id, from the public catalog on the capture date. */
  printful_variant_id: number;
  /** Base cost in USD as read on capture date. Never shown to customers; re-read before pricing. */
  base_cost_usd: number;
  captured: string;
}

/** Enhanced Matte 189 gsm poster + framed poster variants (ids and costs read 2026-09-02). */
export const MATTE_VARIANTS: PosterVariant[] = [
  { size: '12x18', frame: 'none', printful_variant_id: 3876, base_cost_usd: 11.62, captured: '2026-09-02' },
  { size: '18x24', frame: 'none', printful_variant_id: 1, base_cost_usd: 13.15, captured: '2026-09-02' },
  { size: '24x36', frame: 'none', printful_variant_id: 2, base_cost_usd: 18.25, captured: '2026-09-02' },
  { size: '12x18', frame: 'black', printful_variant_id: 4398, base_cost_usd: 32.77, captured: '2026-09-02' },
  { size: '18x24', frame: 'black', printful_variant_id: 3, base_cost_usd: 46.3, captured: '2026-09-02' },
  { size: '24x36', frame: 'black', printful_variant_id: 4, base_cost_usd: 75.9, captured: '2026-09-02' },
  { size: '12x18', frame: 'white', printful_variant_id: 10752, base_cost_usd: 32.77, captured: '2026-09-02' },
  { size: '18x24', frame: 'white', printful_variant_id: 10749, base_cost_usd: 46.3, captured: '2026-09-02' },
  { size: '24x36', frame: 'white', printful_variant_id: 10750, base_cost_usd: 75.9, captured: '2026-09-02' },
  { size: '12x18', frame: 'red-oak', printful_variant_id: 15026, base_cost_usd: 32.77, captured: '2026-09-02' },
  { size: '18x24', frame: 'red-oak', printful_variant_id: 15031, base_cost_usd: 46.3, captured: '2026-09-02' },
  { size: '24x36', frame: 'red-oak', printful_variant_id: 15032, base_cost_usd: 75.9, captured: '2026-09-02' },
];

/** Print master requirements per size at 300 dpi with 0.125 in bleed each edge. */
export const PRINT_SPEC: Record<PosterSize, { px: [number, number]; bleed_px: [number, number] }> = {
  '12x18': { px: [3600, 5400], bleed_px: [3675, 5475] },
  '18x24': { px: [5400, 7200], bleed_px: [5475, 7275] },
  '24x36': { px: [7200, 10800], bleed_px: [7275, 10875] },
};

/**
 * Retail pricing model, v1. Target a 2.2x multiple on unframed and 1.7x on framed
 * base cost, rounded to .99, with shipping charged at Printful's quoted rate.
 * Re-check against the live catalog before any product goes live; base costs
 * here are a capture, not a feed.
 */
export function suggestRetail(v: PosterVariant): number {
  const mult = v.frame === 'none' ? 2.2 : 1.7;
  return Math.floor(v.base_cost_usd * mult) + 0.99;
}

export type OrderState = 'DRAFT' | 'PAID' | 'SUBMITTED' | 'IN_PRODUCTION' | 'SHIPPED' | 'DELIVERED' | 'FAILED' | 'CANCELED' | 'REFUNDED';

/**
 * Order state machine. Payment happens on our side (Stripe, existing Anvil
 * Road account) BEFORE a Printful order is confirmed; a Printful order is
 * created as a draft at PAID and confirmed at SUBMITTED. Webhook events move
 * it forward; nothing moves it backward except REFUNDED and CANCELED.
 */
export const ORDER_TRANSITIONS: Record<OrderState, OrderState[]> = {
  DRAFT: ['PAID', 'CANCELED'],
  PAID: ['SUBMITTED', 'REFUNDED'],
  SUBMITTED: ['IN_PRODUCTION', 'FAILED', 'CANCELED'],
  IN_PRODUCTION: ['SHIPPED', 'FAILED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: ['REFUNDED'],
  FAILED: ['SUBMITTED', 'REFUNDED'],
  CANCELED: [],
  REFUNDED: [],
};

/** Printful webhook types we would subscribe to, mapped onto order states. */
export const WEBHOOK_MAP: Record<string, OrderState> = {
  order_created: 'SUBMITTED',
  order_updated: 'IN_PRODUCTION',
  package_shipped: 'SHIPPED',
  order_failed: 'FAILED',
  order_canceled: 'CANCELED',
};

export function podEnabled(): boolean {
  return process.env.POD_ENABLED === 'true' && !!process.env.PRINTFUL_API_TOKEN;
}

function token(): string {
  const t = process.env.PRINTFUL_API_TOKEN;
  if (!t) throw new Error('PRINTFUL_API_TOKEN is not set. POD is not live; see the owner queue.');
  return t;
}

const API = 'https://api.printful.com';

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`Printful ${path} ${res.status}: ${await res.text().catch(() => '')}`);
  return (await res.json()) as T;
}

/** Shipping quote for one poster to a US address. Server-side only. */
export function quoteShipping(recipient: { country_code: string; state_code?: string; zip?: string }, variantId: number, quantity = 1) {
  return call<{ result: { id: string; name: string; rate: string; currency: string; minDeliveryDays?: number; maxDeliveryDays?: number }[] }>(
    '/shipping/rates',
    { method: 'POST', body: JSON.stringify({ recipient, items: [{ variant_id: variantId, quantity }] }) },
  );
}

/** Create a DRAFT order (confirm: false). Confirmation is a separate, deliberate call. */
export function createDraftOrder(input: { recipient: Record<string, string>; variantId: number; fileUrl: string; quantity?: number; externalId: string }) {
  return call<{ result: { id: number; status: string } }>('/orders', {
    method: 'POST',
    body: JSON.stringify({
      external_id: input.externalId,
      recipient: input.recipient,
      items: [{ variant_id: input.variantId, quantity: input.quantity ?? 1, files: [{ url: input.fileUrl }] }],
      confirm: false,
    }),
  });
}

export function confirmOrder(printfulOrderId: number) {
  return call<{ result: { id: number; status: string } }>(`/orders/${printfulOrderId}/confirm`, { method: 'POST' });
}
