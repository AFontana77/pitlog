# Pit Log POD architecture (Printful), prepared 2026-09-02

Status: **designed, not live.** No Printful account exists (owner queue item 2). Nothing here creates a product, takes a
payment or exposes a public page. `/posters` renders only with `POD_PREVIEW=true` and is `noindex`.

## Product taxonomy

| Family | What | Source art | First product |
|---|---|---|---|
| A. Full infographic field guides | The approved Pit Log guide posters as-is | `brand-assets/cut-guides/*.png` after defect fixes and a 5400 px master | **Smoke Wood Pairing Guide** (no recipe promise, no safety defect) |
| B. Diagram-only animal prints | Line-art animal with numbered primals, no tables | New ChatGPT masters per animal at print resolution; pork-B's pig drawing is the natural base | Beef Cuts: Know Your Cuts |
| C. Reference and decorative | Temperature guide, brisket timeline, rib guide, steak doneness, sauce families, rub wheel, "Smoke. Log. Master." | Rendered from records (A/C) or ChatGPT brand art | BBQ Temperature Guide (records-driven; Claude may typeset) |

Slugs, titles, sizes and blockers per product: `content/pod/catalog.json`.

## Sizes and paper

12x18, 18x24, 24x36 in. Enhanced Matte 189 gsm (Printful product 1) unframed; framed in black, white or red oak
(product 2, ayous wood, acrylite front, hardware included). Luster (171/172) held back: reflective paper fights a kitchen
wall. Variant ids and base costs captured 2026-09-02 in `src/lib/pod/printful.ts`.

## Print master spec

300 dpi at trim plus 0.125 in bleed each edge: 12x18 = 3675x5475 px, 18x24 = 5475x7275, 24x36 = 7275x10875. sRGB PNG or
PDF/X-1a. Safe zone 0.25 in from trim for any text. No master today passes; all are 1024 to 1149 px wide. Upscaling an
approved master is allowed production work; each upscale is reviewed at 100% before an order and its md5 recorded in
`graphics/masters.json` `derived_assets`.

## Mockups

Printful mockup generator (`POST /mockup-generator/create-task/{product_id}`) once a print file exists; framed and
unframed, on a kitchen-wall scene. Stored under `public/images/posters/`, never hotlinked.

## Pricing model v1

Retail = floor(base x 2.2) + .99 unframed; floor(base x 1.7) + .99 framed. Shipping quoted live (`POST /shipping/rates`)
and charged at cost. Examples at captured base: 18x24 matte $13.15 -> $29.99; 24x36 matte $18.25 -> $40.99; 18x24
framed $46.30 -> $79.99; 24x36 framed $75.90 -> $129.99. Re-read the catalog before launch; costs move.

## Order flow

1. Customer picks size and frame on `/posters/{slug}`; Stripe Checkout (existing Anvil Road account) collects payment and
   address. Order row `DRAFT` -> `PAID`.
2. Server creates a Printful order with `confirm: false` (draft), stores the Printful id, then confirms. `PAID` ->
   `SUBMITTED`.
3. Printful webhooks (`order_updated`, `package_shipped`, `order_failed`, `order_canceled`) move the row forward:
   `IN_PRODUCTION` -> `SHIPPED` -> `DELIVERED`, or `FAILED` / `CANCELED`. Nothing moves backward except `REFUNDED`.
4. Customer email on `SHIPPED` with tracking, via the existing Resend setup.

State table and transitions: `ORDER_TRANSITIONS` in `src/lib/pod/printful.ts`. Order rows would live in a small
Supabase table on the puzzle-apps project only if a second product line needs it; v1 can keep them in Stripe metadata
plus Printful, which both persist.

## Webhooks

One endpoint `/api/pod/printful-webhook`, verifying Printful's signature, idempotent on `(printful_order_id, type)`.
Not created yet: no account, no secret.

## What unblocks launch, in order

1. Owner: Printful account, payouts, private token, `POD_ENABLED=true` in Vercel.
2. Print master for the Smoke Wood Pairing Guide at 5475x7275 px (ChatGPT regeneration or authorised upscale).
3. Create product 1 and 2 variants in Printful with that file; generate mockups.
4. Stripe products for the variants; retail from the model above after re-reading base cost.
5. `/posters/{slug}` page with `Product` schema, live shipping quote, and the guide link.
6. One test order to Anthony's address; verify webhook path; then remove `noindex`.
