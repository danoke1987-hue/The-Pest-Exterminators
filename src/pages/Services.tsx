import React from 'react';
import { ShieldCheck, Phone, CheckCircle, ChevronRight, Briefcase, FileCheck, Award, MessageSquare } from 'lucide-react';
import { Link } from '../components/Router';
import { servicesData, servicesBySlug } from '../data/services';
import QuoteForm from '../components/forms/QuoteForm';
import { Breadcrumbs } from '../components/NavigationElements';
import { businessDetails } from '../data/business';

interface ServicesProps {
  slug?: string;
}

export default function Services({ slug }: ServicesProps) {
  // If a slug is supplied, render the individual service details page
  if (slug) {
    const service = servicesBySlug[slug];
    if (!service) {
      return (
        <div id="service-not-found-panel" className="max-w-3xl mx-auto py-16 px-4 text-center">
          <h2 className="font-display font-bold text-2xl text-slate-800">Service Not Found</h2>
          <p className="text-slate-500 mt-2">The requested pest control service does not exist or has been archived.</p>
          <Link href="/services/" className="mt-6 inline-block px-5 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-semibold hover:bg-brand-accent transition">
            Back to Services
          </Link>
        </div>
      );
    }

    const breadcrumbItems = [
      { label: 'Services', href: '/services/' },
      { label: itemLabel(service.name) }
    ];

    return (
      <div id="individual-service-page" className="animate-fadeIn">
        <Breadcrumbs items={breadcrumbItems} />

        <section className="bg-slate-900 text-white relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 bg-brand-blue/30 border border-brand-sky/20 rounded-full text-xs text-brand-sky font-semibold uppercase tracking-wider font-mono">
              🛡️ BPCA APPROVED TREATMENT
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              {service.name}
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {service.shortDescription}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="px-5 py-3 bg-brand-blue hover:bg-brand-accent text-white font-bold text-sm rounded-xl transition flex items-center gap-2">
                <Phone className="w-4.5 h-4.5" /> Call Us 24/7: {businessDetails.telephone}
              </a>
              <a href="#service-booking-form" className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 rounded-xl transition">
                Book Treatment
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 font-sans text-slate-600 text-sm leading-relaxed">
              <h2 className="font-display font-bold text-xl md:text-2xl text-brand-slate">Service Overview & Methodology</h2>
              <p className="text-slate-600 leading-relaxed font-sans">{service.fullDescription}</p>
            </div>

            {service.keyFeatures && service.keyFeatures.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base md:text-lg text-brand-slate">Why Choose Our Specialist Team?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex gap-2.5 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-brand-slate">{feat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.process && service.process.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base md:text-lg text-brand-slate">Our Core Treatment Process</h3>
                <div className="space-y-3">
                  {service.process.map((pStep, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-2xs">
                      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-mono font-bold text-xs text-brand-blue shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans mt-1.5">
                        {pStep}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3.5">
              <h4 className="font-display font-bold text-sm text-brand-slate uppercase tracking-wider">Discreet London Service Areas</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Our technicians provide comprehensive, 24/7 service visits for {service.name} across all 32 London Boroughs. We use unmarked commercial vehicles to ensure complete discretion for your home or business premises. All technicians carry RSPH Level 2 qualifications.
              </p>
              <div className="flex gap-4 pt-1.5 text-xs text-slate-600 font-semibold">
                <span>⚡ Same-Day Service</span>
                <span>🛡️ RSPH Level 2 Certified</span>
                <span>📍 Inside M25 Coverage</span>
              </div>
            </div>
          </div>

          {/* Booking Widget Sidebar */}
          <div id="service-booking-form" className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl">
              <h3 className="font-display font-bold text-lg">Arrange urgent service</h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Speak directly with a local certified biologist to get an immediate, honest quote and book a same-day treatment visit.
              </p>
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="mt-4 flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-accent text-white py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition">
                <Phone className="w-4 h-4" /> Call: {businessDetails.telephone}
              </a>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-display font-bold text-sm text-brand-slate text-center">Or Request Online Quote</h4>
              <QuoteForm defaultServiceType={slug.includes('commercial') || slug.includes('restaurant') || slug.includes('office') || slug.includes('warehouse') || slug.includes('hotel') ? 'commercial' : 'residential'} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, render the general Services Directory hub
  const breadcrumbItems = [{ label: 'Services' }];
  const domesticServices = servicesData.filter(s => ['residential-pest-control', 'pest-inspections', 'pest-proofing', 'landlord-pest-control', 'bird-control'].includes(s.slug));
  const commercialServices = servicesData.filter(s => ['commercial-pest-control', 'restaurant-pest-control', 'hotel-pest-control', 'property-management-pest-control', 'office-pest-control', 'warehouse-pest-control'].includes(s.slug));

  return (
    <div id="services-directory-page" className="animate-fadeIn">
      <Breadcrumbs items={breadcrumbItems} />

      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">BPCA Certified Operations</p>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Our Professional Pest Services
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We provide specialized rodent, insect, and wildlife management programs for homes, estates, and commercial establishments across London.
          </p>
        </div>
      </section>

      {/* DOMESTIC SERVICES DIRECTORY */}
      <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-brand-slate">Residential & Specialty Protection</h2>
          <p className="text-slate-500 text-sm mt-1">Discreet and permanent pest exclusion, inspections, and proofing for residential homes and properties.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domesticServices.map((service) => (
            <div key={service.slug} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-brand-accent flex items-center justify-center font-bold text-lg">
                  🏡
                </div>
                <h3 className="font-display font-bold text-base text-brand-slate">{service.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-sans">
                  {service.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] text-emerald-600 font-semibold">✓ Fully Insured</span>
                <Link href={`/services/${service.slug}/`} className="text-xs font-bold text-brand-blue hover:text-brand-accent flex items-center gap-0.5">
                  View Service <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMERCIAL SERVICES DIRECTORY */}
      <section className="py-16 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-brand-slate">Commercial & Compliance Services</h2>
            <p className="text-slate-500 text-sm mt-1">EHO-ready pest management contracts, routine inspections, and preventative digital protection systems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialServices.map((service) => (
              <div key={service.slug} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-brand-slate flex items-center justify-center font-bold text-lg">
                    🏢
                  </div>
                  <h3 className="font-display font-bold text-base text-brand-slate">{service.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-sans">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] text-brand-accent font-semibold">✓ EHO Compliant</span>
                  <Link href={`/services/${service.slug}/`} className="text-xs font-bold text-brand-blue hover:text-brand-accent flex items-center gap-0.5">
                    View Service <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function itemLabel(name: string) {
  // Return readable title case
  return name;
}
