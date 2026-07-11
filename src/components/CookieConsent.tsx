import React, { useState, useEffect } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('pest_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pest_cookie_consent', accepted ? 'accepted' : 'declined');
      setIsVisible(false);
      
      // Dispatch an event so analytics triggers can listen for it
      const event = new CustomEvent('cookie_consent_updated', { detail: { accepted } });
      window.dispatchEvent(event);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-consent-banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-45 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xl flex flex-col gap-3.5 animate-slideUp font-sans"
    >
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
        <div>
          <p className="font-display font-bold text-sm text-brand-slate">UK Cookie Consent Notice</p>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            We use essential cookies to make our website work. We would also like to set optional Google Analytics cookies to help us measure and improve site performance. No cookies are set before consent.
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-end text-xs font-semibold">
        <button
          id="cookie-decline-btn"
          onClick={() => handleConsent(false)}
          className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition cursor-pointer"
        >
          Decline
        </button>
        <button
          id="cookie-accept-btn"
          onClick={() => handleConsent(true)}
          className="px-4 py-1.5 bg-brand-blue hover:bg-brand-accent text-white rounded-lg transition cursor-pointer"
        >
          Accept Analytics
        </button>
      </div>
    </div>
  );
}
