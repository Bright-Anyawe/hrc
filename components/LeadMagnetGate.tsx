'use client';

import { useState } from 'react';
import { Download, CheckCircle, Loader2, FileText, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface LeadMagnetGateProps {
  /** Title of the resource being gated */
  resourceTitle: string;
  /** Short description of what the user gets */
  resourceDescription: string;
  /** Icon to show above the form */
  icon?: React.ReactNode;
  /** The content to reveal after email capture */
  children: React.ReactNode;
}

export default function LeadMagnetGate({
  resourceTitle,
  resourceDescription,
  icon,
  children,
}: LeadMagnetGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
        }),
      });

      if (res.ok) {
        setStatus('success');
        trackEvent('lead_magnet_download', { resource: resourceTitle });

        // Fire-and-forget CRM sync — log but don't block the user
        fetch('/api/crm/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'lead-magnet',
            name: name.trim(),
            email: email.trim(),
            notes: `Downloaded: ${resourceTitle}`,
          }),
        }).catch((err) => console.warn('[LeadMagnetGate] CRM sync error:', err));
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  // ── Success state: reveal the content ──
  if (status === 'success') {
    return (
      <div>
        {/* Success banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 sm:p-8 text-white text-center mb-8 shadow-lg">
          <CheckCircle size={48} className="mx-auto mb-3" />
          <h3 className="text-xl sm:text-2xl font-bold mb-1">You&apos;re In!</h3>
          <p className="text-green-100 text-sm sm:text-base">
            Thank you, {name.split(' ')[0]}! Your resource is ready below.
          </p>
        </div>

        {/* The gated content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-hrc-blue to-hrc-blue/90 px-6 sm:px-8 py-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">{resourceTitle}</h2>
          </div>
          <div className="p-6 sm:p-8">{children}</div>
        </div>
      </div>
    );
  }

  // ── Idle / error state: show the gate ──
  return (
    <div className="bg-gradient-to-br from-hrc-blue to-hrc-blue/95 rounded-2xl shadow-xl overflow-hidden border border-white/10">
      <div className="p-6 sm:p-8 md:p-10 text-center text-white">
        {/* Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-hrc-red rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
          {icon || <FileText size={28} className="sm:w-9 sm:h-9" />}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
          {resourceTitle}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto">
          {resourceDescription}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 max-w-xs mx-auto">
          <span className="flex-1 h-px bg-white/20" />
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Get instant access
          </span>
          <span className="flex-1 h-px bg-white/20" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3 sm:space-y-4">
          <div className="text-left">
            <label htmlFor="lm-name" className="block text-xs font-medium text-gray-400 mb-1">
              Your Name *
            </label>
            <input
              id="lm-name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-hrc-red focus:border-transparent transition-all duration-200"
              disabled={status === 'loading'}
            />
          </div>

          <div className="text-left">
            <label htmlFor="lm-email" className="block text-xs font-medium text-gray-400 mb-1">
              Email Address *
            </label>
            <input
              id="lm-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-hrc-red focus:border-transparent transition-all duration-200"
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-hrc-red hover:bg-red-700 text-white px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download size={18} />
                Download Free Resource
              </>
            )}
          </button>

          {errorMsg && (
            <p className="text-red-300 text-xs mt-2">{errorMsg}</p>
          )}

          <p className="text-xs text-gray-500 mt-3">
            No spam. Unsubscribe anytime. By downloading, you agree to our privacy policy.
          </p>
        </form>
      </div>
    </div>
  );
}
