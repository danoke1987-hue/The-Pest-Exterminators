import React, { useState } from 'react';
import { MapPin, Phone, CheckCircle, ChevronRight, HelpCircle, FileText, Compass, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from '../components/Router';
import { boroughsData, boroughsBySlug } from '../data/boroughs';
import { areasData, areasBySlug } from '../data/areas';
import { postcodePrefixesData, postcodePrefixesByPrefix, postcodeDistrictsData, postcodeDistrictsByDistrict } from '../data/postcodes';
import QuoteForm from '../components/forms/QuoteForm';
import { Breadcrumbs } from '../components/NavigationElements';
import { businessDetails } from '../data/business';

interface LocationsProps {
  boroughSlug?: string;
  areaSlug?: string;
  postcodePrefix?: string;
  postcodeDistrict?: string;
}

export default function Locations({ boroughSlug, areaSlug, postcodePrefix, postcodeDistrict }: LocationsProps) {
  
  // 1. NEIGHBOURHOOD AREA DETAIL (e.g., /areas/camden/hampstead/)
  if (boroughSlug && areaSlug) {
    const area = areasBySlug[areaSlug];
    if (!area || !area.served) {
      return <LocationNotFound />;
    }

    const breadcrumbs = [
      { label: 'Coverage Areas', href: '/areas/' },
      { label: area.boroughName, href: `/areas/${area.boroughSlug}/` },
      { label: area.name }
    ];

    return (
      <div id="neighborhood-area-page" className="animate-fadeIn">
        <Breadcrumbs items={breadcrumbs} />
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/30 border border-brand-sky/20 rounded-full text-xs text-brand-sky font-semibold tracking-wider font-mono">
              📍 SERVICE AREA: {area.name.toUpperCase()}
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Pest Control {area.name}
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Serving the {area.name} community with 24/7, high-discretion residential and commercial pest management.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6 text-slate-600 font-sans text-sm leading-relaxed">
            <h2 className="font-display font-bold text-xl text-brand-slate">Local Neighborhood Protection</h2>
            <p className="leading-relaxed font-sans">{area.localIntro}</p>
            
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
              <h4 className="font-display font-bold text-xs text-brand-slate uppercase tracking-wider">Geography & Coverage Vitals</h4>
              <p className="text-xs font-sans text-slate-500">
                Our technicians handle the {area.postcodeDistricts.join(', ')} postcode districts inside the {area.boroughName} Borough. We provide direct structural proofing and same-day emergency callouts.
              </p>
              <div className="pt-2 text-xs text-brand-slate font-bold flex flex-wrap gap-4">
                <span>📍 Borough: {area.boroughName}</span>
                <span>📪 Postcodes: {area.postcodeDistricts.join(', ')}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-display font-semibold text-sm text-brand-slate mb-3">Other Served Neighbourhoods in {area.boroughName}:</h3>
              <div className="flex flex-wrap gap-2">
                {areasData
                  .filter((a) => a.boroughSlug === area.boroughSlug && a.slug !== area.slug)
                  .map((a) => (
                    <Link
                      key={a.slug}
                      href={`/areas/${a.boroughSlug}/${a.slug}/`}
                      className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-600 hover:text-brand-accent hover:border-slate-200 shadow-2xs transition"
                    >
                      {a.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-slate text-white p-6 rounded-2xl">
              <h3 className="font-display font-bold text-base">Urgent {area.name} Dispatch</h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Need immediate pest control in {area.name}? Call our local London line for a 15-minute response.
              </p>
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="mt-4 flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-accent text-white py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition">
                <Phone className="w-4 h-4" /> Call: {businessDetails.telephone}
              </a>
            </div>
            <QuoteForm defaultServiceType="residential" />
          </div>
        </section>
      </div>
    );
  }

  // 2. BOROUGH DETAIL (e.g., /areas/camden/)
  if (boroughSlug && !areaSlug) {
    const borough = boroughsBySlug[boroughSlug];
    if (!borough || !borough.served) {
      return <LocationNotFound />;
    }

    const breadcrumbs = [
      { label: 'Coverage Areas', href: '/areas/' },
      { label: borough.name }
    ];

    // Get areas and postcodes belonging to this borough
    const associatedAreas = areasData.filter((a) => a.boroughSlug === borough.slug);

    return (
      <div id="borough-detail-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/30 border border-brand-sky/20 rounded-full text-xs text-brand-sky font-semibold tracking-wider font-mono">
              🛡️ BPCA CERTIFIED COVERAGE AREA
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Pest Control {borough.name} Borough
            </h1>
            <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              {borough.serviceNotes}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="px-5 py-3 bg-brand-blue hover:bg-brand-accent text-white font-bold text-sm rounded-xl transition flex items-center gap-2">
                <Phone className="w-4.5 h-4.5" /> Call 24/7: {businessDetails.telephone}
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main content body */}
          <div className="lg:col-span-7 space-y-8 font-sans text-slate-600 text-sm leading-relaxed">
            
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl md:text-2xl text-brand-slate">Local Borough Overview</h2>
              <p className="font-sans leading-relaxed">{borough.localIntro}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-semibold text-base md:text-lg text-brand-slate">Housing & Property Context</h3>
              <p className="font-sans leading-relaxed">{borough.propertyContext}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-semibold text-base md:text-lg text-brand-slate">Commercial & Business Operations</h3>
              <p className="font-sans leading-relaxed">{borough.commercialContext}</p>
            </div>

            {/* List of served neighborhood hubs */}
            {associatedAreas.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-display font-bold text-base text-brand-slate">Neighbourhoods Served in {borough.name}:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {associatedAreas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/areas/${borough.slug}/${area.slug}/`}
                      className="p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-200 hover:shadow-2xs transition text-center"
                    >
                      <span className="block text-xs font-bold text-brand-slate">{area.name}</span>
                      <span className="block text-[10px] text-slate-400 font-medium mt-0.5">{area.postcodeDistricts.join(', ')}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Local Borough Specific FAQs */}
            {borough.faqs && borough.faqs.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h3 className="font-display font-bold text-base md:text-lg text-brand-slate">Local FAQs for {borough.name}</h3>
                <div className="space-y-4">
                  {borough.faqs.map((faq, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl shadow-2xs">
                      <p className="font-display font-bold text-sm text-brand-slate flex items-start gap-2">
                        <HelpCircle className="w-4.5 h-4.5 text-brand-accent shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-2 pl-6.5 leading-relaxed font-sans">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-[10px] text-slate-400 font-mono pt-4">
              Borough data quality threshold: <strong>{borough.qualityScore}%</strong> | Page last reviewed: {borough.lastReviewed}
            </div>
          </div>

          {/* Right Sidebar Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-slate text-white p-6 rounded-2xl">
              <h3 className="font-display font-bold text-base">Borough Technician Contact</h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Our local {borough.name} team is ready to respond. Contact us for priority dispatch.
              </p>
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="mt-4 flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-accent text-white py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition">
                <Phone className="w-4 h-4" /> Call: {businessDetails.telephone}
              </a>
            </div>
            <QuoteForm defaultServiceType="residential" />
          </div>
        </section>
      </div>
    );
  }

  // 3. POSTCODE PREFIX HUB (e.g., /postcodes/nw/)
  if (postcodePrefix) {
    const cleanPrefix = postcodePrefix.toUpperCase();
    const prefix = postcodePrefixesByPrefix[cleanPrefix];
    if (!prefix || !prefix.served) {
      return <LocationNotFound />;
    }

    const breadcrumbs = [
      { label: 'Postcode Hub', href: '/areas/' },
      { label: `Prefix: ${prefix.prefix}` }
    ];

    // Find associated districts
    const associatedDistricts = postcodeDistrictsData.filter((d) => d.prefix === prefix.prefix);

    return (
      <div id="postcode-prefix-page" className="animate-fadeIn">
        <Breadcrumbs items={breadcrumbs} />
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/30 border border-brand-sky/20 rounded-full text-xs text-brand-sky font-semibold tracking-wider font-mono">
              📪 POSTCODE REGION: {prefix.prefix}
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Pest Control {prefix.name} ({prefix.prefix})
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {prefix.localIntro}
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6 text-slate-600 font-sans text-sm leading-relaxed">
            <h2 className="font-display font-bold text-xl text-brand-slate">Covered Districts in {prefix.prefix}</h2>
            <p className="font-sans leading-relaxed">
              Our professional BPCA pest biologists cover the following active postcode districts in {prefix.name}:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {associatedDistricts.map((d) => (
                <Link
                  key={d.district}
                  href={`/postcodes/${d.district.toLowerCase()}/`}
                  className="p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-200 shadow-2xs text-center transition"
                >
                  <span className="block font-bold text-brand-slate">{d.district}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">{d.boroughName}</span>
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h3 className="font-display font-semibold text-sm text-brand-slate">Associated London Boroughs:</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">{prefix.boroughs.join(', ')}</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-slate text-white p-6 rounded-2xl">
              <h3 className="font-display font-bold text-base">Immediate {prefix.prefix} Callout</h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Speak with our local operators covering {prefix.prefix} postcodes. 24/7 priority emergency dispatch.
              </p>
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="mt-4 flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-accent text-white py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition">
                <Phone className="w-4 h-4" /> Call: {businessDetails.telephone}
              </a>
            </div>
            <QuoteForm defaultServiceType="residential" />
          </div>
        </section>
      </div>
    );
  }

  // 4. POSTCODE DISTRICT DETAIL (e.g., /postcodes/nw1/)
  if (postcodeDistrict) {
    const cleanDistrict = postcodeDistrict.toUpperCase();
    const district = postcodeDistrictsByDistrict[cleanDistrict];
    if (!district || !district.served) {
      return <LocationNotFound />;
    }

    const breadcrumbs = [
      { label: 'Postcode Hub', href: '/areas/' },
      { label: `Prefix: ${district.prefix}`, href: `/postcodes/${district.prefix.toLowerCase()}/` },
      { label: district.district }
    ];

    return (
      <div id="postcode-district-page" className="animate-fadeIn">
        <Breadcrumbs items={breadcrumbs} />
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/30 border border-brand-sky/20 rounded-full text-xs text-brand-sky font-semibold tracking-wider font-mono">
              📪 POSTCODE DISTRICT: {district.district}
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Pest Control {district.district}
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Professional pest eradication and proofing in the {district.district} zone covering {district.areas.join(', ')}.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6 text-slate-600 font-sans text-sm leading-relaxed">
            <h2 className="font-display font-bold text-xl text-brand-slate">District Level Eradication</h2>
            <p className="font-sans leading-relaxed">{district.localIntro}</p>

            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
              <h4 className="font-display font-bold text-xs text-brand-slate uppercase tracking-wider mb-2">District Coverage Details</h4>
              <ul className="text-xs text-slate-500 space-y-1.5 font-sans">
                <li>📌 <strong>Primary Borough:</strong> {district.boroughName}</li>
                <li>🎯 <strong>Covered Neighborhoods:</strong> {district.areas.join(', ')}</li>
                <li>⚡ <strong>Response Level:</strong> 24/7 Same-Day Emergency Dispatch</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-slate text-white p-6 rounded-2xl">
              <h3 className="font-display font-bold text-base">Immediate {district.district} Call</h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Operating 24/7 inside the {district.district} postcode zone. Get an immediate call-out.
              </p>
              <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="mt-4 flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-accent text-white py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition">
                <Phone className="w-4 h-4" /> Call: {businessDetails.telephone}
              </a>
            </div>
            <QuoteForm defaultServiceType="residential" />
          </div>
        </section>
      </div>
    );
  }

  // 5. GENERAL AREAS DIRECTORY HUB (/areas/)
  const breadcrumbs = [{ label: 'Coverage Areas' }];
  const verifiedBoroughs = boroughsData.filter((b) => b.qualityScore >= 80);

  return (
    <div id="areas-hub-page" className="animate-fadeIn">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">Our Active Coverage footprint</p>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            London Boroughs & Areas Served
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We provide 24/7 rapid technician call-outs across all major London boroughs. Select your borough below to review local property risks and details.
          </p>
        </div>
      </section>

      {/* BOROUGH GRID SECTION */}
      <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-brand-slate">Verified Service Boroughs</h2>
          <p className="text-slate-500 text-sm mt-1">
            Our local teams operate with direct coverage inside these major London boroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedBoroughs.map((b) => {
            const boroughAreas = areasData.filter((a) => a.boroughSlug === b.slug);
            return (
              <div
                key={b.slug}
                className="bg-white border border-slate-100 p-6 rounded-2xl shadow-2xs hover:shadow-xs hover:border-slate-200 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="w-10 h-10 rounded-xl bg-blue-50/50 border border-blue-100 text-brand-accent flex items-center justify-center font-bold text-base">
                      📍
                    </span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 font-mono font-semibold px-2.5 py-0.5 rounded-full uppercase">
                      24/7 Live
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-slate">Pest Control {b.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-sans">
                    {b.serviceNotes}
                  </p>

                  {/* Tiny nested list of active neighborhood hubs to cross-link properly */}
                  {boroughAreas.length > 0 && (
                    <div className="pt-2 text-xs text-slate-500">
                      <strong>Key Areas:</strong> {boroughAreas.map((a) => a.name).join(', ')}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Postcodes: {b.postcodePrefixes.join(', ')}
                  </span>
                  <Link href={`/areas/${b.slug}/`} className="text-xs font-bold text-brand-blue hover:text-brand-accent flex items-center gap-0.5">
                    View Borough <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* POSTCODE PREFIX HUBS SECTION */}
      <section className="py-16 bg-slate-50 border-t border-slate-100 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-brand-slate">Search Coverage by Postcode Prefix</h2>
            <p className="text-slate-500 text-sm mt-1">Select your local postcode prefix sector to review verified technicians near you.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {postcodePrefixesData
              .filter((p) => p.qualityScore >= 80)
              .map((prefix) => (
                <Link
                  key={prefix.prefix}
                  href={`/postcodes/${prefix.prefix.toLowerCase()}/`}
                  className="p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 shadow-2xs text-center transition block"
                >
                  <span className="block font-display font-bold text-lg text-brand-slate">{prefix.prefix}</span>
                  <span className="block text-[10px] text-slate-400 font-sans mt-0.5">{prefix.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LocationNotFound() {
  return (
    <div id="location-not-found" className="max-w-2xl mx-auto py-24 px-4 text-center">
      <AlertTriangle className="w-14 h-14 text-amber-500 mx-auto mb-4" />
      <h2 className="font-display font-bold text-2xl text-slate-800">Location Not Serving Or Unverified</h2>
      <p className="text-slate-500 mt-2">
        This specific location is outside our core M25 operations or is currently unverified. Call us on <strong>020 7099 9269</strong> to verify coverage directly.
      </p>
      <Link href="/areas/" className="mt-6 inline-block px-5 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-semibold hover:bg-brand-accent transition">
        Back to Coverage Areas
      </Link>
    </div>
  );
}
