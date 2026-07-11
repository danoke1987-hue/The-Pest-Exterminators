import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { pestsData } from '../../data/pests';

interface QuoteFormProps {
  defaultPest?: string;
  defaultServiceType?: 'residential' | 'commercial';
}

export default function QuoteForm({ defaultPest = '', defaultServiceType = 'residential' }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<'residential' | 'commercial'>(defaultServiceType);
  const [pest, setPest] = useState(defaultPest);
  const [urgency, setUrgency] = useState('Standard');
  const [propertyType, setPropertyType] = useState('Terraced House');
  const [description, setDescription] = useState('');
  const [contactTime, setContactTime] = useState('Anytime');
  const [appointmentDate, setAppointmentDate] = useState('');
  
  // Contact details
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [consent, setConsent] = useState(false);

  // File upload
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // File handlers
  const handleFileChange = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Only image files (JPEG, PNG, WEBP) are supported');
      return;
    }
    setError(null);
    setPhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('You must consent to being contacted to submit your request.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = {
      name,
      telephone,
      email,
      postcode,
      address,
      serviceType,
      pest,
      urgency,
      propertyType,
      description,
      contactTime,
      appointmentDate,
      photo: photoBase64,
      consent
    };

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Connection failed. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setError(null);
    if (step === 1) {
      if (!pest) {
        setError('Please select a pest type or choose "Other / Unsure" to continue.');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep(step - 1);
  };

  if (success) {
    return (
      <div id="quote-success-panel" className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-xl mx-auto text-center py-12 animate-fadeIn">
        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h3 className="font-display font-bold text-2xl text-brand-slate">Quote Request Submitted</h3>
        <p className="text-slate-600 mt-2 max-w-md mx-auto">
          Thank you for contacting The Pest Exterminators. A local senior technician has received your details and will call you back within <strong>15 minutes</strong>.
        </p>
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 text-left max-w-sm mx-auto">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">What happens next?</p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
            <li>We review your pest description and uploaded photo.</li>
            <li>Our local London expert calls to provide a free verbal quote.</li>
            <li>If happy, we schedule a 24/7 same-day technician dispatch.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div id="quote-form-container" className="bg-white rounded-2xl border border-slate-100 shadow-sm max-w-xl mx-auto overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <span className="text-xs font-mono font-medium text-slate-400">Step {step} of 3</span>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                step >= s ? 'bg-brand-blue' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        {error && (
          <div id="quote-error-alert" className="mb-6 flex items-start gap-2.5 bg-rose-50 border border-rose-100 p-4 rounded-xl text-rose-800 text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: SERVICE TYPE & PEST */}
        {step === 1 && (
          <div id="quote-step-1" className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-semibold text-brand-slate mb-3">Service Required</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceType('residential')}
                  className={`p-3.5 border rounded-xl font-medium text-sm transition text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    serviceType === 'residential'
                      ? 'border-brand-blue bg-blue-50/40 text-brand-blue font-semibold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  🏡 Residential
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('commercial')}
                  className={`p-3.5 border rounded-xl font-medium text-sm transition text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    serviceType === 'commercial'
                      ? 'border-brand-blue bg-blue-50/40 text-brand-blue font-semibold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  🏢 Commercial
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="quote-pest-select" className="block text-sm font-semibold text-brand-slate mb-2">Select Pest Type</label>
              <select
                id="quote-pest-select"
                value={pest}
                onChange={(e) => setPest(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
              >
                <option value="">-- Choose a pest --</option>
                <option value="rats">Rats (Rodents)</option>
                <option value="mice">Mice (Rodents)</option>
                <option value="bed-bugs">Bed Bugs (Biting Insects)</option>
                <option value="cockroaches">Cockroaches</option>
                <option value="wasps">Wasps / Hornets</option>
                <option value="pigeons">Pigeons / Birds</option>
                {pestsData
                  .filter((p) => !['rats', 'mice', 'bed-bugs', 'cockroaches', 'wasps', 'pigeons'].includes(p.slug))
                  .map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                <option value="unsure">Other / Unsure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-slate mb-3">How Urgent is Your Situation?</label>
              <div className="grid grid-cols-3 gap-2">
                {['Standard', 'Urgent', 'Emergency (24/7)'].map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUrgency(u)}
                    className={`py-2 px-3 border rounded-xl text-xs font-medium transition text-center cursor-pointer ${
                      urgency === u
                        ? 'border-brand-blue bg-blue-50/40 text-brand-blue font-semibold'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROPERTY & WORK DESCRIPTION */}
        {step === 2 && (
          <div id="quote-step-2" className="space-y-5 animate-fadeIn">
            <div>
              <label htmlFor="quote-property-select" className="block text-sm font-semibold text-brand-slate mb-2">Property Type</label>
              <select
                id="quote-property-select"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
              >
                <option value="Terraced House">Terraced House</option>
                <option value="Semi-Detached House">Semi-Detached House</option>
                <option value="Detached House">Detached House</option>
                <option value="Flat / Apartment">Flat / Apartment</option>
                <option value="Restaurant / Takeaway">Restaurant / Takeaway</option>
                <option value="Office Block">Office Block</option>
                <option value="Warehouse / Industrial">Warehouse / Industrial</option>
                <option value="Other Commercial">Other Commercial</option>
              </select>
            </div>

            <div>
              <label htmlFor="quote-desc-textarea" className="block text-sm font-semibold text-brand-slate mb-2">Briefly Describe the Problem</label>
              <textarea
                id="quote-desc-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Where is the activity located? How long has it been happening? (E.g. noises in loft, scratch marks behind dishwasher)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none resize-none"
              />
            </div>

            {/* Optional Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-brand-slate mb-2">Upload Optional Photo (Helps with identification)</label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                  isDragOver
                    ? 'border-brand-blue bg-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  accept="image/*"
                />
                <Upload className="w-8 h-8 text-slate-400" />
                {photo ? (
                  <div>
                    <p className="text-xs font-medium text-emerald-600">Selected file: {photo.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Click or drag again to replace</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold text-brand-slate">Drag & Drop file here, or click to browse</p>
                    <p className="text-[10px] text-slate-400 mt-1">Supports JPEG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-date-input" className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-2">Preferred Date</label>
                <input
                  id="quote-date-input"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
                />
              </div>
              <div>
                <label htmlFor="quote-time-select" className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-2">Preferred Time</label>
                <select
                  id="quote-time-select"
                  value={contactTime}
                  onChange={(e) => setContactTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
                >
                  <option value="Anytime">Anytime</option>
                  <option value="Morning (8 AM - 12 PM)">Morning (8-12)</option>
                  <option value="Afternoon (12 PM - 5 PM)">Afternoon (12-5)</option>
                  <option value="Evening (5 PM - 9 PM)">Evening (5-9)</option>
                  <option value="Night / Emergency">Night / Emergency</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT INFORMATION & SUBMIT */}
        {step === 3 && (
          <div id="quote-step-3" className="space-y-4 animate-fadeIn">
            <div>
              <label htmlFor="quote-name-input" className="block text-sm font-semibold text-brand-slate mb-1">Full Name *</label>
              <input
                id="quote-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g. Sarah Smith"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-phone-input" className="block text-sm font-semibold text-brand-slate mb-1">Telephone *</label>
                <input
                  id="quote-phone-input"
                  type="tel"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="E.g. 07700 900077"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
                />
              </div>
              <div>
                <label htmlFor="quote-email-input" className="block text-sm font-semibold text-brand-slate mb-1">Email *</label>
                <input
                  id="quote-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E.g. sarah@example.co.uk"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="quote-postcode-input" className="block text-sm font-semibold text-brand-slate mb-1">Postcode *</label>
                <input
                  id="quote-postcode-input"
                  type="text"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="E.g. NW3 2AQ"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none uppercase"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="quote-address-input" className="block text-sm font-semibold text-brand-slate mb-1">Full Address (Optional)</label>
                <input
                  id="quote-address-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="E.g. 15 High Street, Hampstead"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <label htmlFor="quote-consent-checkbox" className="flex items-start gap-2.5 text-xs text-slate-500 cursor-pointer select-none">
                <input
                  id="quote-consent-checkbox"
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-accent"
                />
                <span>
                  I consent to The Pest Exterminators collecting my contact details to arrange my free pest consultation and quote in accordance with the Privacy Policy.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* CONTROLS */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
          {step > 1 ? (
            <button
              id="quote-prev-btn"
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              id="quote-next-btn"
              type="button"
              onClick={nextStep}
              className="px-5 py-2.5 bg-brand-slate hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5 ml-auto"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="quote-submit-btn"
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-brand-blue hover:bg-brand-accent text-white text-sm font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5 ml-auto disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                'Request Free Quote'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
