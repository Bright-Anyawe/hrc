'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CONSENT_EVENT, hasMarketingConsent } from '@/lib/consent';

/**
 * Retargeting / remarketing pixels — Meta Pixel + Google Ads.
 *
 * These do NOT fire until the visitor has accepted marketing cookies via
 * CookieConsent.tsx. Both are no-ops if their env var isn't set, so this is
 * safe to render even before you've created the ad accounts.
 *
 * ─── Setup (things you do, not code) ───
 *   Meta Pixel:
 *     1. Create a pixel at https://business.facebook.com/events_manager
 *     2. Copy the Pixel ID into NEXT_PUBLIC_META_PIXEL_ID in .env.local
 *
 *   Google Ads remarketing:
 *     1. Create a conversion/remarketing tag in your Google Ads account
 *        (Tools > Audience Manager > Audience sources)
 *     2. Copy the AW-XXXXXXXXX ID into NEXT_PUBLIC_GOOGLE_ADS_ID in .env.local
 */
export default function MarketingPixels() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasMarketingConsent());

    const handleConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<'accepted' | 'rejected'>).detail;
      setConsented(detail === 'accepted');
    };

    window.addEventListener(CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsentChange);
  }, []);

  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  if (!consented) return null;

  return (
    <>
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {googleAdsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAdsId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
