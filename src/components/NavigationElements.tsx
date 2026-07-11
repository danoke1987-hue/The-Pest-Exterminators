import React from 'react';
import { ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { Link } from './Router';
import { businessDetails } from '../data/business';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" id="breadcrumbs-nav" className="py-3 px-4 bg-slate-50 border-b border-slate-100 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="hover:text-brand-accent transition">
          Home
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
              {isLast || !item.href ? (
                <span className="text-slate-800 font-medium truncate max-w-[200px]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-brand-accent transition">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

export function StickyMobileActions() {
  return (
    <div
      id="sticky-mobile-actions-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-45 bg-white border-t border-slate-100 shadow-xl px-4 py-3 flex gap-3 animate-slideUp"
    >
      <a
        href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`}
        className="flex-1 bg-brand-blue hover:bg-brand-accent text-white py-3 px-4 rounded-xl font-bold text-center text-sm flex items-center justify-center gap-2 shadow-xs transition"
      >
        <Phone className="w-4 h-4" />
        <span>Call Now</span>
      </a>
      <Link
        href="/get-a-quote/"
        className="flex-1 bg-brand-slate hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-bold text-center text-sm flex items-center justify-center gap-2 shadow-xs transition"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Get Quote</span>
      </Link>
    </div>
  );
}
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
export function TableOfContents({ headers }: { headers: { id: string; text: string }[] }) {
  if (headers.length === 0) return null;

  return (
    <div id="table-of-contents" className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
      <h4 className="font-display font-bold text-xs text-brand-slate uppercase tracking-wider mb-3">On This Page</h4>
      <nav className="space-y-2">
        {headers.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className="block text-xs font-medium text-slate-500 hover:text-brand-accent hover:underline leading-relaxed transition"
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
