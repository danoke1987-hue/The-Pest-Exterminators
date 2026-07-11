import React, { useState } from 'react';
import { ShieldCheck, Phone, CheckCircle, ChevronRight, AlertTriangle, Eye, HelpCircle, FileText } from 'lucide-react';
import { Link } from '../components/Router';
import { pestsData } from '../data/pests';
import QuoteForm from '../components/forms/QuoteForm';
import { Breadcrumbs } from '../components/NavigationElements';
import { businessDetails } from '../data/business';

interface PestsProps {
  slug?: string;
}

export default function Pests({ slug }: PestsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'Rodents' | 'Insects' | 'Flying Insects' | 'Birds & Wildlife'>('all');

  // If slug is present, render the detailed individual pest landing page
  if (slug) {
    const pest = pestsData.find((p) => p.slug === slug);
    if (!pest) {
      return (
        <div id="pest-not-found-panel" className="max-w-3xl mx-auto py-16 px-4 text-center">
          <h2 className="font-display font-bold text-2xl text-slate-800">Species Profile Not Found</h2>
          <p className="text-slate-500 mt-2">The requested pest details are not registered in our technical database.</p>
          <Link href="/pests/" className="mt-6 inline-block px-5 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-semibold hover:bg-brand-accent transition">
            Back to Pests
          </Link>
        </div>
      );
    }

    const breadcrumbItems = [
      { label: 'Pests Eradicated', href: '/pests/' },
      { label: `${pest.name} Control` }
    ];

    return (
      <div id="individual-pest-page" className="animate-fadeIn">
        <Breadcrumbs items={breadcrumbItems} />

        {/* HERO BANNER */}
        <section className="bg-slate-900 text-white relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 bg-brand-blue/30 border border-brand-sky/20 rounded-full text-xs text-brand-sky font-semibold uppercase tracking-wider font-mono">
              🛡️ BPCA ERADICATION SCHEME
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Professional {pest.name} Control
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {pest.shortDescription}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="px-5 py-3 bg-brand-blue hover:bg-brand-accent text-white font-bold text-sm rounded-xl transition flex items-center gap-2">
                <Phone className="w-4.5 h-4.5" /> Call Emergency 24/7: {businessDetails.telephone}
              </a>
              <a href="#pest-quote-sidebar" className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 rounded-xl transition">
                Book Treatment
              </a>
            </div>
          </div>
        </section>

        {/* MAIN BODY GRID */}
        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Core Column */}
          <div className="lg:col-span-7 space-y-8 font-sans text-slate-600 text-sm leading-relaxed">
            
            {/* Direct Answer */}
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl md:text-2xl text-brand-slate">Direct Technical Assessment</h2>
              <p className="text-slate-600 font-sans leading-relaxed">{pest.fullIntroduction}</p>
              <div className="p-4 bg-blue-50/50 border border-blue-100/60 rounded-xl text-brand-blue text-xs font-semibold leading-relaxed">
                📢 <strong>Important Treatment Note:</strong> Treatment options and timings depend heavily on species confirmation, property layout, current UK safety regulations, and on-site technical inspection.
              </div>
            </div>

            {/* Signs of Infestation */}
            {pest.signsOfInfestation && pest.signsOfInfestation.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base md:text-lg text-brand-slate">Common Signs of Infestation</h3>
                <ul className="space-y-2.5 list-none">
                  {pest.signsOfInfestation.map((sign, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Eye className="w-4.5 h-4.5 text-brand-accent shrink-0 mt-0.5" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingress Causes & Risks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {pest.commonCauses && pest.commonCauses.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-slate">Common Causes</h3>
                  <ul className="space-y-2 list-disc pl-4 text-xs">
                    {pest.commonCauses.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pest.healthOrBusinessRisks && pest.healthOrBusinessRisks.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> Key Health & Asset Risks
                  </h3>
                  <ul className="space-y-2 list-disc pl-4 text-xs text-rose-900/90">
                    {pest.healthOrBusinessRisks.map((risk, i) => (
                      <li key={i}>{risk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Treatment Approach */}
            {pest.availableTreatmentApproaches && pest.availableTreatmentApproaches.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-display font-bold text-base md:text-lg text-brand-slate">Our Professional Eradication Method</h3>
                <div className="space-y-3">
                  {pest.availableTreatmentApproaches.map((appr, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700 leading-relaxed font-sans">{appr}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prep & Aftercare */}
            <div className="border-t border-slate-100 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pest.preparationGuidance && pest.preparationGuidance.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-slate">Pre-Treatment Preparation</h3>
                  <ul className="space-y-2 list-disc pl-4 text-xs">
                    {pest.preparationGuidance.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pest.aftercare && pest.aftercare.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-slate">Post-Treatment Guidelines</h3>
                  <ul className="space-y-2 list-disc pl-4 text-xs text-slate-500">
                    {pest.aftercare.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Local Context */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <h4 className="font-display font-bold text-sm text-brand-slate">London Location Context</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                {pest.LondonSpecificContext}
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                Profile reviewed by: <strong>{pest.reviewedBy}</strong> on {pest.lastReviewed}
              </p>
            </div>

            {/* Pest-Specific FAQs */}
            {pest.FAQs && pest.FAQs.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-display font-bold text-base md:text-lg text-brand-slate">Species FAQs</h3>
                <div className="space-y-3">
                  {pest.FAQs.map((faq, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl shadow-2xs">
                      <p className="font-display font-bold text-sm text-brand-slate flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-2 pl-6 leading-relaxed font-sans">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div id="pest-quote-sidebar" className="lg:col-span-5 space-y-6">
            <div className="bg-brand-slate text-white p-6 rounded-2xl border border-slate-800">
              <h3 className="font-display font-bold text-lg">Eradicate {pest.name} Now</h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                All targeted treatments include up to a 3-month eradication guarantee with free follow-up visits.
              </p>
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="mt-4 flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-accent text-white py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition">
                <Phone className="w-4 h-4" /> Call: {businessDetails.telephone}
              </a>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-display font-bold text-sm text-brand-slate text-center">Get Free Verbal Quote</h4>
              <QuoteForm defaultPest={pest.slug} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, render the general Pests Directory
  const breadcrumbItems = [{ label: 'Pests Eradicated' }];
  
  const filteredPests = pestsData.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <div id="pests-directory-page" className="animate-fadeIn">
      <Breadcrumbs items={breadcrumbItems} />

      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">BPCA Biological Database</p>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Pest Species We Eradicate
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Select a species group below to learn how we identify, inspect, treat, and proof against local infestations in London.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-8 px-4 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {(['all', 'Rodents', 'Insects', 'Flying Insects', 'Birds & Wildlife'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-brand-blue text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-500'
              }`}
            >
              {tab === 'all' ? 'All Species' : tab}
            </button>
          ))}
        </div>
      </section>

      {/* PESTS GRID */}
      <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPests.map((pest) => (
            <div
              key={pest.slug}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img
                    src={pest.image}
                    alt={pest.imageAlt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-brand-slate/95 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                    {pest.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-brand-slate">{pest.name} Control</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                    {pest.shortDescription}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] text-emerald-600 font-semibold">✓ 100% Guaranteed</span>
                <Link href={`/pests/${pest.slug}/`} className="text-xs font-bold text-brand-blue hover:text-brand-accent flex items-center gap-0.5">
                  View Profile <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
