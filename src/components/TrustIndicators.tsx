import React from 'react';
import { Star, ShieldCheck, Award, Briefcase, FileCheck } from 'lucide-react';
import { reviewsData } from '../data/reviews';
import { businessDetails } from '../data/business';

export function TrustBar() {
  const credentials = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-sky" />,
      title: "BPCA & NPTA Members",
      text: "Fully certified members of the British Pest Control Association."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-sky" />,
      title: "RSPH Level 2 Certified",
      text: "All active field technicians hold qualified RSPH/BPCA Level 2 Awards."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-brand-sky" />,
      title: "15 Years Experience",
      text: "Established in 2011, resolving London infestations safely."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-brand-sky" />,
      title: "£10m Liability Insurance",
      text: "Fully insured for residential and commercial operations."
    }
  ];

  return (
    <section id="trust-bar" className="bg-brand-slate text-white py-12 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">Accreditations & Trust</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl mt-1">Our Certified Credentials</h2>
          <p className="text-slate-400 text-sm mt-2">
            Pest management requires deep regulatory expertise. We hold the highest operating memberships and insurance covers in the UK.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center">
              <div className="bg-slate-800 p-3 rounded-xl mb-4 flex items-center justify-center">
                {cred.icon}
              </div>
              <h3 className="font-display font-bold text-sm text-white">{cred.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cred.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewSection() {
  const averageRating = (reviewsData.reduce((acc, r) => acc + r.rating, 0) / reviewsData.length).toFixed(1);

  return (
    <section id="reviews-section" className="py-16 bg-slate-50 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left max-w-xl">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-accent">Client Feedback</p>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-slate mt-1">What Our Customers Say</h2>
            <p className="text-slate-500 text-sm mt-3">
              We take pride in solving stressful pest problems with speed, safety, and absolute discretion. See our verified local feedback.
            </p>
          </div>

          <div className="bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-xs text-center md:text-right shrink-0">
            <div className="flex items-center justify-center md:justify-end gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="font-display font-bold text-lg text-brand-slate">Average rating {averageRating} / 5</p>
            <p className="text-[10px] text-slate-400 font-medium">Verified Reviews from Google & Trustpilot</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsData.map((review) => (
            <div key={review.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex gap-0.5 mb-3.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed font-sans">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-[11px]">
                <div>
                  <p className="font-bold text-brand-slate">{review.author}</p>
                  <p className="text-slate-400 mt-0.5">{review.location}</p>
                </div>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-500 font-semibold rounded-full uppercase tracking-wider text-[9px]">
                  {review.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
