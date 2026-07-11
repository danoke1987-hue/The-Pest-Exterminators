import React from 'react';
import { ShieldCheck, Phone, CheckCircle, ChevronRight, AlertTriangle, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from '../components/Router';
import PostcodeChecker from '../components/forms/PostcodeChecker';
import QuoteForm from '../components/forms/QuoteForm';
import { TrustBar, ReviewSection } from '../components/TrustIndicators';
import { businessDetails } from '../data/business';
import { pestsData } from '../data/pests';
import { servicesData } from '../data/services';

export default function Home() {
  const featuredPests = pestsData.filter(p => ['rats', 'mice', 'bed-bugs', 'cockroaches', 'wasps', 'pigeons'].includes(p.slug));
  const coreServices = servicesData.slice(0, 4);

  return (
    <div id="homepage" className="animate-fadeIn pb-16">
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 opacity-90" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/30 border border-brand-sky/20 rounded-full text-xs text-brand-sky font-semibold font-mono tracking-wider">
              🛡️ BPCA & NPTA REGISTERED
            </div>
            
            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              Professional 24/7 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-sky">Pest Control London</span>
            </h1>
            
            <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Safe, rapid, and fully discreet pest eradication for London homes and commercial premises. Guaranteed results backed by £10m liability cover and BPCA-certified technicians.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto px-6 py-4 bg-brand-blue hover:bg-brand-accent text-white font-bold text-center rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-5 h-5 animate-pulse" />
                <span>Call Emergency: {businessDetails.telephone}</span>
              </a>
              <Link
                href="/get-a-quote/"
                className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center rounded-xl transition border border-slate-700 flex items-center justify-center gap-1.5"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-xs text-slate-400 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-sky" /> 100% Eradication Guarantee</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-sky" /> Unmarked Vehicles Available</span>
            </div>
          </div>

          {/* Hero Right Widget */}
          <div className="lg:col-span-5 flex justify-center">
            <PostcodeChecker />
          </div>
        </div>
      </section>

      {/* CORE CREDENTIALS TRUST BAR */}
      <TrustBar />

      {/* PRIORITY PESTS GRID */}
      <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-accent">Pest Species We Treat</p>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-slate mt-1">Common London Pest Problems</h2>
          <p className="text-slate-500 text-sm mt-3">
            Select a pest below to view detailed signs of infestation, immediate risks, technical treatment approaches, and specific preparation guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPests.map((pest) => (
            <div key={pest.slug} className="bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-xs transition overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={pest.image}
                    alt={pest.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-102 transition"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-brand-slate/90 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                    {pest.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-brand-slate">{pest.name} Control</h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {pest.shortDescription}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {pest.signsOfInfestation.slice(0, 2).map((sign, i) => (
                      <span key={i} className="text-[10px] text-slate-600 bg-slate-50 border border-slate-100/80 px-2 py-0.5 rounded-md font-medium truncate max-w-full">
                        🔍 {sign}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  ✓ Guaranteed Treatments
                </span>
                <Link
                  href={`/pests/${pest.slug}/`}
                  className="text-xs font-bold text-brand-blue hover:text-brand-accent flex items-center gap-0.5"
                >
                  View Details <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/pests/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-slate hover:text-brand-accent"
          >
            Explore all pests we treat <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CORE SERVICES OVERVIEW */}
      <section className="py-16 bg-white border-y border-slate-100 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-accent">What We Offer</p>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-slate tracking-tight">
                Complete Professional Pest Solutions
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                We design and deliver custom pest control interventions tailored specifically to London buildings. From individual houses and apartments to busy high-street hospitality kitchens, warehouses, and structural locations.
              </p>
              
              <div className="space-y-3.5 text-left text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Residential:</strong> Quick, polite and discreet support inside your home.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Commercial:</strong> Planned maintenance agreements with audit-compliant folders.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Proofing:</strong> Blocking entry lanes with stainless mesh and concrete mortars.</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/services/"
                  className="px-5 py-3 bg-brand-slate hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition inline-flex items-center gap-1.5"
                >
                  Explore All Services <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreServices.map((service) => (
                <div key={service.slug} className="p-6 border border-slate-100 bg-slate-50/40 rounded-2xl flex flex-col justify-between hover:border-slate-200 transition">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-base text-brand-slate">{service.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="text-xs font-bold text-brand-blue hover:text-brand-accent mt-4 flex items-center gap-0.5"
                  >
                    Read more <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED CUSTOMER REVIEWS */}
      <ReviewSection />

      {/* DETAILED LEAD INTAKE AND BOOKING FORM */}
      <section id="homepage-quote-form" className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-accent">Rapid Response booking</p>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-slate mt-1">Get Your Free Professional Quote</h2>
            <p className="text-slate-500 text-sm mt-2">
              Fill out our simple secure form. A senior London technician will analyze your query and contact you within <strong>15 minutes</strong>.
            </p>
          </div>

          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
