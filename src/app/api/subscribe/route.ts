import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, addToAudience, resendConfigured } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Marketing signup for pitlog.app.
 *
 * Before this existed the form on this site called preventDefault and threw the
 * address away.
 *
 * What is stored: the email address, that consent was given and when, the page
 * it came from, and which offer it responded to. Nothing else. No customer
 * data, no product data, no identifiers from any app.
 */

const SITE = 'pitlog.app';

/**
 * RESOURCE_DELIVERY_WIRED
 *
 * What this site promised on the page, and now actually sends. Until 2026-08-31
 * the form asked for an address in exchange for a file that did not exist, and
 * the subscriber received nothing at all.
 */
const RESOURCE = {
  title: 'Your Pit Log Meat Cuts, Temps & Smoke Field Guide',
  blurb: 'The USDA safe minimum temperatures, kept apart from the tenderness temperatures barbecue actually cooks to. One page per animal, the smoke wood chart, and two cook log pages.',
  url: 'https://pitlog.app/pitlog-bbq-cook-times-reference-card.pdf',
};

const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || 'anthony@anvilroad.com';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  // Honeypot. Bots fill it, people never see it. Answer OK so it does not retry.
  if (typeof data._hp === 'string' && data._hp.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const email = String(data.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please check that email address.' }, { status: 400 });
  }
  if (data.consent !== true) {
    return NextResponse.json({ error: 'Please tick the box so we know it is okay to email you.' }, { status: 400 });
  }

  const source = String(data.source || 'unknown').slice(0, 120);
  const campaign = String(data.campaign || 'signup').slice(0, 80);
  const consentAt = new Date().toISOString();

  // An unconfigured backend says so. It never reports success over an address
  // it did not keep.
  if (!resendConfigured()) {
    console.error('[subscribe] RESEND_API_KEY missing; signup not stored', { site: SITE, source, campaign });
    return NextResponse.json(
      { error: 'Email signup is temporarily unavailable. Please try again later.' },
      { status: 503 },
    );
  }

  const audience = await addToAudience(email);
  if (audience === 'failed') {
    console.error('[subscribe] audience add failed', { site: SITE, source });
  }

  // Deliver what the page promised. If this send fails the address is still on
  // the list so it is recoverable, but it is logged loudly, because from the
  // subscriber's side this email IS the product.
  let delivered = false;
  try {
    await sendEmail({
      to: email,
      replyTo: NOTIFY_TO,
      subject: RESOURCE.title,
      text: `${RESOURCE.title}\n\n${RESOURCE.blurb}\n\nDownload it here:\n${RESOURCE.url}\n\nIt is a printable PDF. Print it, or keep it on your phone.\n\n${SITE}\n\nYou are getting this because you asked for it at ${SITE}. Reply to this email if you want off the list.`,
      html: `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:15px;line-height:1.55;color:#1d1d20;max-width:520px"><h1 style="font-size:19px;margin:0 0 12px">${esc(RESOURCE.title)}</h1><p style="margin:0 0 18px;color:#44444a">${esc(RESOURCE.blurb)}</p><p style="margin:0 0 22px"><a href="${RESOURCE.url}" style="display:inline-block;background:#1d1d20;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:6px;font-weight:600">Download the PDF</a></p><p style="margin:0 0 18px;color:#6a6a72;font-size:13px">Or paste this into your browser:<br><a href="${RESOURCE.url}" style="color:#6a6a72">${esc(RESOURCE.url)}</a></p><p style="margin:0;color:#8a8a92;font-size:12px">You are getting this because you asked for it at ${esc(SITE)}. Reply to this email if you want off the list.</p></div>`,
    });
    delivered = true;
  } catch (err) {
    console.error('[subscribe] RESOURCE DELIVERY FAILED', { site: SITE, source, err });
  }

  // The notification is the record of provenance, because a Resend audience
  // contact cannot carry a source or a campaign of its own. It is also the
  // thing that would have to change first if volume ever made it noisy.
  try {
    await sendEmail({
      to: NOTIFY_TO,
      replyTo: email,
      subject: `${SITE} signup: ${email}`,
      text: `site: ${SITE}\nemail: ${email}\nconsent: yes\nconsent_at: ${consentAt}\nsource: ${source}\ncampaign: ${campaign}\naudience: ${audience}\ndelivered: ${delivered}`,
      html: `<div style="font-family:system-ui,sans-serif;font-size:14px"><h2 style="font-size:16px">New signup on ${esc(SITE)}</h2><table style="border-collapse:collapse"><tr><td style="padding:3px 12px 3px 0;color:#666">email</td><td>${esc(email)}</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">consent</td><td>yes</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">consent at</td><td>${esc(consentAt)}</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">source</td><td>${esc(source)}</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">campaign</td><td>${esc(campaign)}</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">audience</td><td>${esc(audience)}</td></tr></table></div>`,
    });
  } catch (err) {
    console.error('[subscribe] notification failed:', err);
    // The address is already on the list, so this is not a user-facing failure
    // unless the audience add also failed. In that case nothing kept it.
    if (audience !== 'added') {
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
