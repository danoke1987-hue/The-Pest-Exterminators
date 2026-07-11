import React, { useState } from 'react';
import { Check, AlertTriangle, Loader2 } from 'lucide-react';
import { postcodePrefixesByPrefix } from '../../data/postcodes';

export default function PostcodeChecker() {
  const [postcode, setPostcode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'served' | 'not_served' | 'invalid'>('idle');
  const [matchedArea, setMatchedArea] = useState('');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;

    setStatus('checking');

    // Simulate rapid check
    setTimeout(() => {
      const cleanPostcode = postcode.trim().toUpperCase();
      
      // Extract prefix (letters at the start of the postcode, up to 2 letters, e.g. NW, SW, W, CR)
      const prefixMatch = cleanPostcode.match(/^[A-Z]{1,2}/);
      if (!prefixMatch) {
        setStatus('invalid');
        return;
      }

      const prefix = prefixMatch[0];
      const matched = postcodePrefixesByPrefix[prefix];

      if (matched && matched.served) {
        setStatus('served');
        setMatchedArea(matched.name);
      } else {
        setStatus('not_served');
      }
    }, 400);
  };

  return (
    <div id="postcode-checker-container" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full">
      <h3 className="font-display font-bold text-lg text-brand-slate mb-2">Check London Coverage</h3>
      <p className="text-sm text-slate-500 mb-4">
        Enter your postcode prefix (e.g., NW3, SW11) to verify active 24/7 technician availability.
      </p>

      <form onSubmit={handleCheck} className="flex gap-2">
        <label htmlFor="postcode-checker-input" className="sr-only">Postcode Prefix</label>
        <input
          id="postcode-checker-input"
          type="text"
          value={postcode}
          onChange={(e) => {
            setPostcode(e.target.value);
            setStatus('idle');
          }}
          placeholder="E.g. NW3"
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none uppercase"
          maxLength={8}
          required
        />
        <button
          id="postcode-checker-submit-btn"
          type="submit"
          disabled={status === 'checking'}
          className="px-5 py-2.5 bg-brand-blue hover:bg-brand-accent text-white text-sm font-medium rounded-xl transition cursor-pointer flex items-center justify-center min-w-[80px]"
        >
          {status === 'checking' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check'}
        </button>
      </form>

      {status === 'served' && (
        <div id="postcode-served-alert" className="mt-4 flex items-start gap-3 bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl text-emerald-800 animate-fadeIn">
          <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Active Coverage Verified</p>
            <p className="text-xs text-emerald-700/90 mt-0.5">
              We have 24/7 technicians operating in <strong>{matchedArea}</strong>. Same-day emergency booking is available.
            </p>
          </div>
        </div>
      )}

      {status === 'not_served' && (
        <div id="postcode-not-served-alert" className="mt-4 flex items-start gap-3 bg-amber-50 border border-amber-100 p-3.5 rounded-xl text-amber-800 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Fringe / Unverified Area</p>
            <p className="text-xs text-amber-700/90 mt-0.5">
              This postcode is outside our core London zone or requires special travel coordination. Call <strong className="whitespace-nowrap">020 7099 9269</strong> to check technician availability.
            </p>
          </div>
        </div>
      )}

      {status === 'invalid' && (
        <div id="postcode-invalid-alert" className="mt-4 flex items-start gap-3 bg-rose-50 border border-rose-100 p-3.5 rounded-xl text-rose-800 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Invalid Postcode Format</p>
            <p className="text-xs text-rose-700/90 mt-0.5">
              Please enter a valid UK postcode starting with letters (e.g., W5, SW1A, NW3).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
