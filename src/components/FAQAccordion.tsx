import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQ } from '../types';

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  showSearch?: boolean;
}

export default function FAQAccordion({ faqs, title = "Frequently Asked Questions", showSearch = false }: FAQAccordionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="faq-accordion-container" className="w-full">
      {title && (
        <h2 className="font-display font-bold text-xl md:text-2xl text-brand-slate mb-6">
          {title}
        </h2>
      )}

      {showSearch && (
        <div id="faq-search-bar" className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <label htmlFor="faq-search-input" className="sr-only">Search Frequently Asked Questions</label>
          <input
            id="faq-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. guarantee, dogs, price)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
          />
        </div>
      )}

      {filteredFaqs.length === 0 ? (
        <div id="faq-empty-state" className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p className="text-sm text-slate-500">No matching questions found. Call us on <strong>020 7099 9269</strong> for immediate assistance.</p>
        </div>
      ) : (
        <div id="faq-accordion-list" className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  className="w-full px-5 py-4 text-left font-display font-semibold text-sm md:text-base text-brand-slate hover:text-brand-accent transition flex justify-between items-center gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-accent' : ''
                    }`}
                  />
                </button>

                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className={`transition-all duration-300 ${
                    isOpen ? 'max-h-[500px] border-t border-slate-50' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <div className="px-5 py-4 text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
