import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, User, Check, ShieldCheck, HelpCircle, ArrowLeft, Star, MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from '../components/Router';
import { articlesData, articlesBySlug } from '../data/articles';
import { faqsData } from '../data/faqs';
import { reviewsData } from '../data/reviews';
import { teamData } from '../data/team';
import { businessDetails } from '../data/business';
import QuoteForm from '../components/forms/QuoteForm';
import FAQAccordion from '../components/FAQAccordion';
import { Breadcrumbs } from '../components/NavigationElements';

interface ContentHubProps {
  pageType: 'about' | 'team' | 'faq' | 'reviews' | 'prices' | 'how-it-works' | 'contact' | 'get-a-quote' | 'thank-you' | 'advice-index' | 'advice-article' | 'privacy' | 'cookie' | 'terms' | 'accessibility';
  articleSlug?: string;
}

export default function ContentHub({ pageType, articleSlug }: ContentHubProps) {
  
  // 1. ADVICE INDIVIDUAL ARTICLE PAGE
  if (pageType === 'advice-article' && articleSlug) {
    const article = articlesBySlug[articleSlug];
    if (!article) {
      return (
        <div className="max-w-3xl mx-auto py-16 px-4 text-center">
          <h2 className="font-display font-bold text-2xl text-slate-800">Article Not Found</h2>
          <p className="text-slate-500 mt-2">The requested pest control advice guide does not exist or has been moved.</p>
          <Link href="/advice/" className="mt-6 inline-block px-5 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-semibold hover:bg-brand-accent transition">
            Back to Advice Hub
          </Link>
        </div>
      );
    }

    const breadcrumbs = [
      { label: 'Advice Hub', href: '/advice/' },
      { label: article.title }
    ];

    return (
      <div id="advice-article-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <Link href="/advice/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-accent mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Advice Hub
          </Link>

          <article className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-3xs space-y-8 font-sans">
            {/* Header info */}
            <div className="space-y-4">
              <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 font-mono text-[10px] font-bold uppercase rounded-md tracking-wider">
                {article.category}
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-brand-slate tracking-tight leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1"><User className="w-4 h-4 text-slate-400" /> By {article.author} (Technical Biologist)</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-slate-400" /> Published: {article.publishedDate}</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-slate-400" /> Biologist Reviewed: {article.lastReviewed}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* HTML Body Render */}
            <div
              className="prose prose-slate prose-sm sm:prose-base max-w-none text-slate-600 font-sans leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Technical Sign-Off Block */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
              <div className="w-10 h-10 rounded-full bg-brand-slate border border-slate-200 flex items-center justify-center font-bold text-white shrink-0">
                BP
              </div>
              <div>
                <p className="font-bold text-brand-slate">Content Reviewed & Audited By: {article.reviewer}</p>
                <p className="text-slate-400 mt-0.5">Senior Certified Biologist | BPCA Qualified Technical Officer | The Pest Exterminators</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // 2. ADVICE INDEX PAGE (ALL ARTICLES)
  if (pageType === 'advice-index') {
    const breadcrumbs = [{ label: 'Advice Hub' }];
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCat, setActiveCat] = useState('All');

    const categories = ['All', 'Rodents', 'Insects', 'Bed Bugs', 'Legislation', 'Proofing'];

    const filteredArticles = articlesData.filter((art) => {
      const matchSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || art.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCat === 'All' || art.category === activeCat;
      return matchSearch && matchCat;
    });

    return (
      <div id="advice-index-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">BPCA Biologist Knowledgebase</p>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Expert Pest Advice Hub
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Explore our technical guides, prep checklists, and prevention strategies audited by senior local pest biologists.
            </p>
          </div>
        </section>

        {/* SEARCH AND CATEGORIES */}
        <section className="py-8 bg-white border-b border-slate-100 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-sm">
              <label htmlFor="advice-search-input" className="sr-only">Search Advice Guides</label>
              <input
                id="advice-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search advice guides..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition cursor-pointer ${
                    activeCat === cat
                      ? 'bg-brand-blue text-white'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl max-w-md mx-auto">
              <p className="text-sm text-slate-500">No guides matching your query. Call us on <strong>020 7099 9269</strong> for direct professional advice.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <div key={art.slug} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
                  <div>
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 space-y-2.5">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand-accent bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/50">
                        {art.category}
                      </span>
                      <h3 className="font-display font-bold text-base text-brand-slate leading-snug line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        Published: {art.publishedDate} | By {art.author}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-emerald-600 font-semibold">✓ Audited Guide</span>
                    <Link href={`/advice/${art.slug}/`} className="font-bold text-brand-blue hover:text-brand-accent flex items-center gap-0.5">
                      Read Guide <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  // 3. ABOUT PAGE
  if (pageType === 'about') {
    const breadcrumbs = [{ label: 'About' }];
    return (
      <div id="about-us-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">UK Certified Operations</p>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              About The Pest Exterminators
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Established in 2011, we are London's premier, fully accredited structural pest management and exclusion specialists.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-8 font-sans text-slate-600 text-sm leading-relaxed">
          <h2 className="font-display font-bold text-2xl text-brand-slate">Our Founding Vision</h2>
          <p>
            We founded <strong>The Pest Exterminators</strong> on a straightforward premise: resolving stressful, sanitary pest issues with absolute speed, professional discretion, and rigorous biological science. We are not a simple "spray-and-leave" operation. We diagnose the systemic, environmental, and structural causes of ingress to ensure pests never return.
          </p>
          <p>
            Our office is located inside the <strong>East Lane Business Park in Wembley</strong>, positioning our dedicated mobile technician fleet to cover all 32 London boroughs inside the M25 boundary, day and night.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-brand-accent shrink-0" />
              <div>
                <h3 className="font-display font-bold text-sm text-brand-slate">BPCA Membership</h3>
                <p className="text-xs text-slate-500 mt-1">We operate under audited compliance with British Pest Control Association criteria.</p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3">
              <Check className="w-6 h-6 text-brand-accent shrink-0" />
              <div>
                <h3 className="font-display font-bold text-sm text-brand-slate">RSPH Qualifications</h3>
                <p className="text-xs text-slate-500 mt-1">Every active field technician holds full RSPH / BPCA Level 2 qualification certification.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 4. TEAM PAGE
  if (pageType === 'team') {
    const breadcrumbs = [{ label: 'Our Team' }];
    return (
      <div id="technical-team-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">Accredited Experts</p>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Our Certified Biologists & Officers
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Meet our vetted, highly trained team of structural pest biologists and technical field supervisors operating across London.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member) => (
              <div key={member.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition text-center">
                <div className="h-56 bg-slate-100 flex items-center justify-center">
                  {/* Since team images might not be real URLs, we can show a styled avatar or initials with nice typography */}
                  <div className="w-24 h-24 rounded-full bg-slate-900 text-white font-display font-bold text-2xl flex items-center justify-center">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-display font-bold text-base text-brand-slate">{member.name}</h3>
                  <p className="text-xs text-brand-accent font-semibold">{member.role}</p>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">{member.qualifications.join(' | ')}</p>
                  <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // 5. FAQ GENERAL PAGE
  if (pageType === 'faq') {
    const breadcrumbs = [{ label: 'FAQs' }];
    return (
      <div id="faq-general-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">Instant Help Desk</p>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Find instant, straightforward answers regarding treatment preparations, guarantees, pricing, safety for pets, and commercial audits.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-3xl mx-auto sm:px-6 lg:px-8">
          <FAQAccordion faqs={faqsData} showSearch={true} title="" />
        </section>
      </div>
    );
  }

  // 6. CONTACT PAGE
  if (pageType === 'contact') {
    const breadcrumbs = [{ label: 'Contact Us' }];
    return (
      <div id="contact-us-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">Available 24/7</p>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Contact Our London Team
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Have an urgent pest emergency or want to coordinate a commercial EHO compliance contract? Reach us directly below.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact coordinates left */}
          <div className="lg:col-span-5 space-y-6 font-sans text-slate-600 text-sm leading-relaxed">
            <h2 className="font-display font-bold text-xl text-brand-slate">Office & Hub Coordinates</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-slate">Primary Telephone</p>
                  <p className="text-base font-semibold text-brand-accent mt-0.5">{businessDetails.telephone}</p>
                  <p className="text-xs text-slate-400">Emergency lines active 24 hours, 7 days a week.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-slate">Email Inquiries</p>
                  <p className="mt-0.5">{businessDetails.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-slate">Wembley Headquarters</p>
                  <p className="mt-0.5 text-slate-500 leading-normal">{businessDetails.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-slate">Operating Vitals</p>
                  <p className="mt-0.5">Hours: 24 Hours, 7 Days a week</p>
                  <p className="text-xs text-slate-400">Including Christmas, Bank Holidays, and Night dispatches.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form right */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </section>
      </div>
    );
  }

  // 7. GET A QUOTE PAGE
  if (pageType === 'get-a-quote') {
    const breadcrumbs = [{ label: 'Get a Quote' }];
    return (
      <div id="get-a-quote-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Request Online Quote
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Complete our secure 3-step form below to get an accurate verbal quote from our senior technical biologists.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-2xl mx-auto">
          <QuoteForm />
        </section>
      </div>
    );
  }

  // 8. PRICES PAGE
  if (pageType === 'prices') {
    const breadcrumbs = [{ label: 'Pricing Guide' }];
    return (
      <div id="pricing-guide-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-sky">Honest & Fair Pricing</p>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Pest Treatment Pricing
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              We offer highly competitive, fully transparent rates with zero hidden fees. See our indicative price table.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-8 font-sans text-slate-600 text-sm leading-relaxed">
          <h2 className="font-display font-bold text-2xl text-brand-slate text-center">Indicative Treatment Rates</h2>
          <p className="text-center text-slate-500 max-w-xl mx-auto">
            Please note that final treatment costs depend heavily on the severity of the infestation, property layout, and specific proofing requirements.
          </p>

          <div className="overflow-hidden border border-slate-150 rounded-2xl bg-white shadow-3xs mt-8">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                  <th className="p-4">Pest / Service Type</th>
                  <th className="p-4">Indicative Price (From)</th>
                  <th className="p-4">Guarantee Period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-4 font-semibold text-brand-slate">Wasp Nest Eradication</td>
                  <td className="p-4">£75.00 + VAT</td>
                  <td className="p-4">Eradication Guaranteed</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-brand-slate">Mice Infestation (3 Visits)</td>
                  <td className="p-4">£180.00 + VAT</td>
                  <td className="p-4">3 Months Guarantee</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-brand-slate">Rat Infestation & Drains (3 Visits)</td>
                  <td className="p-4">£220.00 + VAT</td>
                  <td className="p-4">3 Months Guarantee</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-brand-slate">Bed Bug Thermal sprays (2 visits)</td>
                  <td className="p-4">£280.00 + VAT</td>
                  <td className="p-4">3 Months Guarantee</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-brand-slate">Cockroach Treatments</td>
                  <td className="p-4">£190.00 + VAT</td>
                  <td className="p-4">Eradication Guaranteed</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-brand-slate">Professional Proofing (Mesh/Mortar)</td>
                  <td className="p-4">By Survey Quote</td>
                  <td className="p-4">12 Months Materials Guarantee</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <p className="font-semibold text-brand-blue">Need an exact quote for your property?</p>
              <p className="text-xs text-slate-500">Our senior field biologists provide free, no-obligation verbal quotes over the phone.</p>
            </div>
            <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="px-5 py-2.5 bg-brand-blue hover:bg-brand-accent text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0">
              Call: {businessDetails.telephone}
            </a>
          </div>
        </section>
      </div>
    );
  }

  // 9. REVIEWS PAGE
  if (pageType === 'reviews') {
    const breadcrumbs = [{ label: 'Verified Reviews' }];
    return (
      <div id="reviews-hub-page" className="animate-fadeIn pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-900 to-slate-900 opacity-90" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Customer Feedback
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Read 100% verified customer experiences and ratings of our local London pest technicians.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsData.map((rev) => (
            <div key={rev.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-2xs flex flex-col justify-between font-sans">
              <div>
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">"{rev.text}"</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-brand-slate">{rev.author}</p>
                  <p className="text-slate-400 mt-0.5">{rev.location}</p>
                </div>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-500 font-bold uppercase rounded-full tracking-wider text-[9px]">
                  {rev.source}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  // 10. POLICY PAGES & ACCESSIBILITY STATEMENTS
  const policyTitles: Record<string, string> = {
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
    terms: 'Terms & Conditions',
    accessibility: 'Accessibility Statement'
  };

  const currentPolicyTitle = policyTitles[pageType] || 'Information Policy';
  const breadcrumbsLegal = [{ label: currentPolicyTitle }];

  return (
    <div id="legal-policy-page" className="animate-fadeIn pb-16">
      <Breadcrumbs items={breadcrumbsLegal} />

      <section className="py-16 px-4 max-w-3xl mx-auto sm:px-6 lg:px-8 font-sans text-slate-600 text-sm leading-relaxed space-y-6">
        <h1 className="font-display font-bold text-3xl text-brand-slate">{currentPolicyTitle}</h1>
        <p className="text-xs text-slate-400">Effective Date: July 11, 2026 | Last Updated: July 11, 2026</p>
        
        {pageType === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-brand-slate mt-6">1. Data Collection & Purpose</h2>
            <p>We collect essential contact coordinates (Name, Email, Telephone, Postcode) through our custom forms specifically to coordinate professional verbal quotes and book treatments. No data is sold or passed to third parties for marketing purposes.</p>
            <h2 className="font-display font-bold text-lg text-brand-slate mt-6">2. Security</h2>
            <p>Our database operates under strict security encryption, ensuring absolute privacy for client files and records.</p>
          </div>
        )}

        {pageType === 'cookie' && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-brand-slate mt-6">1. Essential Cookies</h2>
            <p>These cookies are strictly required to operate the user interface, routing systems, and secure quote form submissions.</p>
            <h2 className="font-display font-bold text-lg text-brand-slate mt-6">2. Analytics Cookies</h2>
            <p>With user permission, we configure Google Analytics cookies to track web vitals and overall page performance.</p>
          </div>
        )}

        {pageType === 'terms' && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-brand-slate mt-6">1. Services Contract</h2>
            <p>All service visits, follow-up inspections, and eradication guarantees are subject to written work orders signed by the on-site technical biologist.</p>
            <h2 className="font-display font-bold text-lg text-brand-slate mt-6">2. Guarantees</h2>
            <p>Eradication guarantees (up to 3 months) are void if preparation or structural proofing advice is not implemented by the client.</p>
          </div>
        )}

        {pageType === 'accessibility' && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-brand-slate mt-6">1. Accessibility Compliance</h2>
            <p>We aim for complete conformity with the WCAG 2.2 Level AA guidelines, ensuring clean semantic headings, strict color-contrast levels, and full keyboard-accessibility for screen readers.</p>
          </div>
        )}
      </section>
    </div>
  );
}
