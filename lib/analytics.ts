/**
 * Shared analytics utility — wraps Google Analytics 4 (gtag.js).
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('form_submitted', { service: 'training' });
 *
 * All calls are fire-and-forget and safely no-op when GA is not loaded.
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Push an event to Google Analytics 4 (via gtag).
 * Falls back to dataLayer.push when gtag is unavailable.
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  try {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', action, params);
    } else if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({ event: action, ...params });
    }
  } catch {
    // Squash tracking errors — never break the UI
  }
}

/**
 * Track a page view manually (usually auto-sent by gtag config, but useful
 * for single-page app transitions or virtual page views).
 */
export function trackPageView(path: string, title?: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
  });
}

/**
 * Pre-defined conversion events for HRC Ghana.
 */
export const Events = {
  /** Contact form successfully submitted */
  formSubmitted: (service?: string) =>
    trackEvent('form_submitted', { service_type: service ?? 'general' }),

  /** Newsletter signup completed */
  newsletterSignup: () => trackEvent('newsletter_signup'),

  /** WhatsApp button clicked */
  whatsAppClicked: (location: string) =>
    trackEvent('whatsapp_clicked', { location }),

  /** Phone number clicked/tapped */
  phoneClicked: (number: string, location: string) =>
    trackEvent('phone_clicked', { phone_number: number, location }),

  /** Booking process started */
  bookingStarted: (service: string) =>
    trackEvent('booking_started', { service }),

  /** Booking completed (Calendly event scheduled) */
  bookingCompleted: (service: string) =>
    trackEvent('booking_completed', { service }),

  /** Service selected in booking widget */
  serviceSelected: (service: string) =>
    trackEvent('service_selected', { service }),

  /** Email link clicked */
  emailClicked: (location: string) =>
    trackEvent('email_clicked', { location }),
};

/** Whether Google Analytics is configured on this build */
export const isAnalyticsConfigured = (): boolean => !!GA_MEASUREMENT_ID;
