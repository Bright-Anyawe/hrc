/**
 * Cookie / marketing consent state.
 *
 * We only load third-party marketing tags (Meta Pixel, Google Ads
 * remarketing) after the visitor has explicitly opted in here. This is a
 * legal requirement in most jurisdictions (Ghana's Data Protection Act,
 * GDPR for EU visitors, etc.) and it's the honest thing to do — visitors
 * should know before anything is tracking them for ad retargeting.
 *
 * Analytics (GA4 pageviews via GoogleAnalytics.tsx) is treated separately
 * and is not gated here — swap that in too if you want a stricter policy.
 */

export type ConsentChoice = 'accepted' | 'rejected';

const STORAGE_KEY = 'hrc-marketing-consent';
export const CONSENT_EVENT = 'hrc-consent-change';

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
  } catch {
    // Squash storage errors (e.g. private browsing) — consent banner will
    // simply reappear next visit, which is an acceptable fallback.
  }
}

export function hasMarketingConsent(): boolean {
  return getStoredConsent() === 'accepted';
}
