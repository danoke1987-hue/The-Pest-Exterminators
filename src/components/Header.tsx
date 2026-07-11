import React, { useState } from 'react';
import { Menu, X, Phone, ShieldCheck, HelpCircle, FileText, Users, MapPin } from 'lucide-react';
import { Link, useRouter } from './Router';
import { businessDetails } from '../data/business';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path } = useRouter();

  const navLinks = [
    { label: 'Services', href: '/services/' },
    { label: 'Pests We Eradicate', href: '/pests/' },
    { label: 'Coverage Areas', href: '/areas/' },
    { label: 'Advice Hub', href: '/advice/' },
    { label: 'Team', href: '/team/' },
    { label: 'FAQs', href: '/faq/' },
    { label: 'Contact', href: '/contact/' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (href: string) => {
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      {/* Top Announcement Bar */}
      <div id="top-announcement-bar" className="bg-brand-slate text-white px-4 py-2 text-xs flex flex-col sm:flex-row justify-between items-center gap-1.5 font-sans font-medium">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0" />
          <span>LONDON EMERGENCY PEST SERVICES AVAILABLE 24/7</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="hover:text-brand-sky transition flex items-center gap-1">
            <Phone className="w-3 h-3" /> Emergency Call: {businessDetails.telephone}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <ShieldCheck className="w-8 h-8 text-brand-accent transition group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-tight tracking-tight text-brand-slate">
              THE PEST
            </span>
            <span className="font-sans font-semibold text-xs tracking-wider text-brand-accent uppercase leading-none">
              EXTERMINATORS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                isActive(link.href)
                  ? 'bg-slate-50 text-brand-accent font-semibold'
                  : 'text-slate-600 hover:text-brand-slate hover:bg-slate-50/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Call-To-Action buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 text-brand-slate font-semibold text-sm hover:text-brand-accent transition"
          >
            <Phone className="w-4 h-4 text-brand-accent" />
            <span>{businessDetails.telephone}</span>
          </a>
          <Link
            href="/get-a-quote/"
            className="px-4 py-2 bg-brand-blue hover:bg-brand-accent text-white font-semibold text-sm rounded-xl transition shadow-xs cursor-pointer"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          id="mobile-nav-toggle-btn"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          className="lg:hidden p-2 text-slate-500 hover:text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-lg"
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-slate-100 shadow-lg animate-fadeIn py-4 px-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition ${
                  isActive(link.href)
                    ? 'bg-blue-50/50 text-brand-accent font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-slate'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 text-brand-slate font-bold text-base rounded-xl transition"
            >
              <Phone className="w-5 h-5 text-brand-accent" />
              <span>Call Us: {businessDetails.telephone}</span>
            </a>
            <Link
              href="/get-a-quote/"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 bg-brand-blue hover:bg-brand-accent text-white font-bold text-center text-base rounded-xl transition"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
