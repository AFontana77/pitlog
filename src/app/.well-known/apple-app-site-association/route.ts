import { NextResponse } from 'next/server';

// apple-app-site-association — served at /.well-known/apple-app-site-association
// iOS Universal Links: lets the OS open pitlog.app links directly in the app.
//
// Team ID 488J263YB8 is Anvil Road LLC (developer.apple.com > Membership),
// read 2026-09-02. It is not a secret: this file is public by design, and
// Apple requires it to be.
//
// `paths` deliberately lists the four sections the app has screens for rather
// than '*'. It used to be '*', which claimed all 85 URLs on the site while the
// app rendered 71 of them, so a tap on /privacy, /terms, /support, /about,
// /sources or any recipe-hub page was pulled into the app and had to be handed
// back to the browser. These four prefixes are exactly what the Android intent
// filter in pitlog-app/app.json claims, so a link now behaves the same on both
// platforms. Change one and change the other.
//
// A URL inside these prefixes that a shipped app is too old to render is
// expected: the site adds pages between app releases. The app absorbs that in
// app/+not-found.tsx, which offers the page on the web.
//
// STILL OPEN: public/.well-known/assetlinks.json holds a placeholder SHA-256.
// Android verification needs the release keystore fingerprint from
// `eas credentials`, which does not exist until the first EAS Android build.
export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: '488J263YB8.com.anvilroad.pitlog',
          paths: ['/cuts', '/cuts/*', '/recipes', '/recipes/*', '/temperatures', '/temperatures/*', '/woods'],
        },
      ],
    },
  });
}
