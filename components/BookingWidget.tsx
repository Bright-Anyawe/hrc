'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';
import {
  GraduationCap,
  Wrench,
  Settings,
  Search,
  ClipboardCheck,
  Users,
  Calendar,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
  Mail,
  Phone,
  User,
  Loader2,
  AlertCircle,
  Clock,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CrmSource } from '@/lib/crm';

/* ───────────────────────────────────────────
   Services matching the existing site content
   ─────────────────────────────────────────── */
const SERVICES = [
  { id: 'training', label: 'Training / Tutoring', icon: GraduationCap, description: 'Staff training, CPD, tutorial classes' },
  { id: 'skills', label: 'Skills Development', icon: Wrench, description: 'TVET, micro entrepreneurship, technical skills' },
  { id: 'admin', label: 'Administrative Support', icon: Settings, description: 'Planning, finance, HR, IT, marketing' },
  { id: 'research', label: 'Research Services', icon: Search, description: 'Academic research, industry analysis, technical writing' },
  { id: 'assessment', label: 'Assessment Services', icon: ClipboardCheck, description: 'Educational, career, business assessment' },
  { id: 'advisory', label: 'Advisory Services', icon: Users, description: 'Recruitment, business formation, project management' },
];

type BookingStep = 'service' | 'details' | 'schedule';

/* ───────────────────────────────────────────
   Step indicator — shows Service → Details → Schedule
   ─────────────────────────────────────────── */
const StepIndicator = ({ current, steps }: { current: BookingStep; steps: { key: BookingStep; label: string }[] }) => {
  const currentIdx = steps.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10">
      {steps.map((s, i) => {
        const isActive = i === currentIdx;
        const isComplete = i < currentIdx;
        return (
          <div key={s.key} className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? 'bg-hrc-red text-white shadow-md'
                  : isComplete
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isComplete ? <CheckCircle size={12} /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight size={12} className={isComplete ? 'text-green-500' : 'text-gray-300'} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ───────────────────────────────────────────
   Fallback UI when Calendly fails to load
   ─────────────────────────────────────────── */
const FallbackContact = () => (
  <div className="text-center py-12 sm:py-16 bg-amber-50 rounded-2xl border border-amber-200 px-6">
    <AlertCircle className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500 mx-auto mb-4" />
    <h4 className="text-lg sm:text-xl font-bold text-amber-800 mb-2">Scheduler Temporarily Unavailable</h4>
    <p className="text-amber-700 mb-6 max-w-md mx-auto text-sm sm:text-base">
      Our online booking system is momentarily unavailable. Please reach out directly — we are ready to help.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href="tel:0302907115"
        className="bg-hrc-red text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 text-sm"
      >
        <Phone size={16} /> Call 0302907115
      </a>
      <a
        href="mailto:info@hrcghana.com"
        className="border-2 border-hrc-blue text-hrc-blue px-6 py-2.5 rounded-lg font-semibold hover:bg-hrc-blue hover:text-white transition-colors inline-flex items-center justify-center gap-2 text-sm"
      >
        <Mail size={16} /> Email Us
      </a>
    </div>
  </div>
);

/* ───────────────────────────────────────────
   Loading skeleton for Calendly
   ─────────────────────────────────────────── */
const CalendlySkeleton = () => (
  <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-gray-50 rounded-xl animate-pulse">
    <div className="w-12 h-12 rounded-full bg-gray-200 mb-4" />
    <div className="h-4 w-48 bg-gray-200 rounded mb-2" />
    <div className="h-3 w-32 bg-gray-100 rounded" />
  </div>
);

/* ───────────────────────────────────────────
   Confirmation screen
   ─────────────────────────────────────────── */
const ConfirmationScreen = () => (
  <div className="text-center py-12 sm:py-16 px-4">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
    </div>
    <h3 className="text-2xl sm:text-3xl font-bold text-hrc-blue mb-3">Appointment Confirmed!</h3>
    <p className="text-gray-600 max-w-lg mx-auto mb-6 text-sm sm:text-base">
      Thank you! Your consultation has been scheduled. You will receive a confirmation email with calendar
      invites and a link to join/reschedule if needed.
    </p>
    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 max-w-sm mx-auto mb-6">
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
        <Clock size={16} className="text-hrc-red" />
        <span>Check your inbox for calendar details</span>
      </div>
    </div>
    <Button
      onClick={() => (window.location.href = '/')}
      className="bg-hrc-blue hover:bg-hrc-blue/90 text-white px-8"
    >
      Back to Home
    </Button>
  </div>
);

/* ───────────────────────────────────────────
   Main Booking Widget
   ─────────────────────────────────────────── */
export default function BookingWidget() {
  const [step, setStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<string>('');
  const [confirmation, setConfirmation] = useState(false);
  const [contactDetails, setContactDetails] = useState({ name: '', email: '', phone: '', notes: '' });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [calendlyInitialized, setCalendlyInitialized] = useState(false);
  const calendlyContainerRef = useRef<HTMLDivElement>(null);

  const CALENDLY_URL =
    process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/hrcghana/educational-psychology-course';

  /* ── CRM sync helper ── */
  const syncToCRM = useCallback(
    async (data: {
      source: CrmSource;
      name: string;
      email: string;
      phone?: string;
      service?: string;
      notes?: string;
      meta?: Record<string, string | undefined>;
    }) => {
      try {
        await fetch('/api/crm/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch {
        // Fire-and-forget — never block the user flow
        console.warn('[BookingWidget] CRM sync failed (non-blocking)');
      }
    },
    [],
  );

  /* ── Analytics helper ── */
  const track = useCallback((action: string, data?: Record<string, string>) => {
    try {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', action, data);
      }
      if (Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({ event: action, ...data });
      }
    } catch {
      /* squash tracking errors */
    }
  }, []);

  /* ── Initialise Calendly inline widget ── */
  const initCalendly = useCallback(() => {
    const container = calendlyContainerRef.current;
    const Cal = (window as any).Calendly;
    if (!container || !Cal?.initInlineWidget || calendlyInitialized) return;

    try {
      Cal.initInlineWidget({
        url: `${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1`,
        parentElement: container,
        prefill: {
          name: contactDetails.name,
          email: contactDetails.email,
          ...(contactDetails.phone ? { phoneNumber: contactDetails.phone } : {}),
          customAnswers: {
            a1: SERVICES.find((s) => s.id === selectedService)?.label || selectedService,
            ...(contactDetails.notes ? { a2: contactDetails.notes } : {}),
          },
        },
        utm: {
          utmSource: 'hrcghana-website',
          utmMedium: 'booking-page',
          utmCampaign: 'direct-booking',
        },
        resize: true,
      });
      setCalendlyInitialized(true);
      track('calendly_loaded', { service: selectedService });
    } catch {
      setScriptError(true);
    }
  }, [CALENDLY_URL, contactDetails, selectedService, calendlyInitialized, track]);

  /* ── Watch for Calendly booking completion ── */
  useEffect(() => {
    const Cal = (window as any).Calendly;
    if (!scriptLoaded || scriptError || !Cal?.on) return;

    const handler = (e: any) => {
      track('booking_completed', {
        service: selectedService,
        event_uri: e?.data?.event?.uri || '',
      });

      // Fire-and-forget CRM sync
      syncToCRM({
        source: 'booking-confirmed',
        name: contactDetails.name,
        email: contactDetails.email,
        phone: contactDetails.phone || undefined,
        service: SERVICES.find((s) => s.id === selectedService)?.label || selectedService,
        notes: contactDetails.notes || undefined,
        meta: { event_uri: e?.data?.event?.uri || '' },
      });

      setConfirmation(true);
    };

    Cal.on('event_scheduled', handler);
    return () => {
      try {
        Cal.off('event_scheduled', handler);
      } catch {
        /* cleanup */
      }
    };
  }, [scriptLoaded, scriptError, selectedService, track]);

  /* ── Auto-init Calendly when schedule step is entered ── */
  useEffect(() => {
    if (step === 'schedule' && scriptLoaded && !calendlyInitialized) {
      const t = setTimeout(initCalendly, 300);
      return () => clearTimeout(t);
    }
  }, [step, scriptLoaded, calendlyInitialized, initCalendly]);

  /* ── Force Calendly injected elements to fill container ── */
  useEffect(() => {
    if (!calendlyInitialized) return;
    const container = calendlyContainerRef.current;
    if (!container) return;

    const forceFullSize = () => {
      const widget = container.querySelector('.calendly-inline-widget') as HTMLElement | null;
      if (widget) {
        widget.style.minHeight = '700px';
        widget.style.height = 'auto';
        widget.style.overflow = 'visible';
      }
      const iframe = container.querySelector('iframe') as HTMLElement | null;
      if (iframe) {
        iframe.style.minHeight = '700px';
        iframe.style.height = '100%';
        iframe.style.overflow = 'visible';
      }
    };

    forceFullSize();
    const t = setTimeout(forceFullSize, 500);
    return () => clearTimeout(t);
  }, [calendlyInitialized]);

  /* ── Handlers ── */
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    track('service_selected', { service: serviceId });
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track('details_submitted', { service: selectedService });

    // Fire-and-forget CRM sync
    syncToCRM({
      source: 'booking-details',
      name: contactDetails.name,
      email: contactDetails.email,
      phone: contactDetails.phone || undefined,
      service: SERVICES.find((s) => s.id === selectedService)?.label || selectedService,
      notes: contactDetails.notes || undefined,
    });

    setStep('schedule');
  };

  const handleBack = () => {
    if (step === 'details') {
      setSelectedService('');
      setStep('service');
    } else if (step === 'schedule') {
      setCalendlyInitialized(false);
      setStep('details');
    }
  };

  /* ── Steps ── */
  const stepDefs: { key: BookingStep; label: string }[] = [
    { key: 'service', label: 'Service' },
    { key: 'details', label: 'Details' },
    { key: 'schedule', label: 'Schedule' },
  ];

  if (confirmation) {
    return <ConfirmationScreen />;
  }

  return (
    <>
      {/* Calendly script — always loaded so next/script manages it */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
        onError={() => setScriptError(true)}
      />

      <div className="max-w-5xl mx-auto">
        <StepIndicator current={step} steps={stepDefs} />

        {/* ── Step 1: Service Selection ── */}
        {step === 'service' && (
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">Choose a Service</h3>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
              Select the service you would like to book a consultation for.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service.id)}
                    className={`group relative text-left p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      isSelected
                        ? 'border-hrc-red bg-red-50 shadow-md ring-2 ring-hrc-red/20'
                        : 'border-gray-200 bg-white hover:border-hrc-red/40'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 ${
                        isSelected
                          ? 'bg-hrc-red text-white shadow-md'
                          : 'bg-gray-100 text-hrc-blue group-hover:bg-hrc-red group-hover:text-white'
                      }`}
                    >
                      <Icon size={22} className="sm:hidden" />
                      <Icon size={24} className="hidden sm:block" />
                    </div>
                    <h4 className="font-bold text-hrc-blue text-sm sm:text-base mb-1 group-hover:text-hrc-red transition-colors">
                      {service.label}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{service.description}</p>

                    {/* Selected badge */}
                    {isSelected && (
                      <span className="absolute top-3 right-3 bg-hrc-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 2: Contact Details ── */}
        {step === 'details' && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">Your Details</h3>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
              Please share your contact information so we can prepare for our meeting.
            </p>
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div>
                <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-hrc-red">*</span>
                </label>
                <Input
                  id="booking-name"
                  required
                  value={contactDetails.name}
                  onChange={(e) => setContactDetails((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address <span className="text-hrc-red">*</span>
                </label>
                <Input
                  id="booking-email"
                  type="email"
                  required
                  value={contactDetails.email}
                  onChange={(e) => setContactDetails((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <Input
                  id="booking-phone"
                  type="tel"
                  value={contactDetails.phone}
                  onChange={(e) => setContactDetails((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="booking-notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Reason for Visit / Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  value={contactDetails.notes}
                  onChange={(e) => setContactDetails((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Briefly describe what you would like to discuss..."
                  rows={3}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-hrc-red focus:border-transparent transition-all resize-none text-sm"
                />
              </div>

              {/* Honeypot — invisible to users, catches bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button type="button" variant="outline" onClick={handleBack} className="px-6 order-2 sm:order-1">
                  <ChevronLeft className="mr-1.5 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-hrc-red hover:bg-red-700 text-white px-8 order-1 sm:order-2 flex-1 sm:flex-none"
                >
                  Continue to Scheduling
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ── Step 3: Schedule (Calendly) ── */}
        {step === 'schedule' && (
          <div className="overflow-visible">
            <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">Select Date &amp; Time</h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Pick a convenient time for your {SERVICES.find((s) => s.id === selectedService)?.label || 'consultation'} consultation.
            </p>

            {!scriptLoaded && !scriptError && <CalendlySkeleton />}
            {scriptError && <FallbackContact />}

            <div
              ref={calendlyContainerRef}
              className={`booking-calendly ${
                !scriptLoaded || scriptError ? 'hidden' : ''
              } ${!calendlyInitialized ? 'opacity-0 pointer-events-none' : ''}`}
            />

            {scriptLoaded && !scriptError && !calendlyInitialized && <CalendlySkeleton />}

            <div className="flex justify-start mt-6">
              <Button type="button" variant="outline" onClick={handleBack} className="text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
