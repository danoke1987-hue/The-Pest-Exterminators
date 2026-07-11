import React from 'react';
import { ShieldCheck, Mail, MapPin, Phone, Clock, CalendarDays } from 'lucide-react';
import { Link } from './Router';
import { businessDetails } from '../data/business';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-brand-slate text-slate-300 border-t border-slate-800">
      {/* Top section: Accreditations & Operating Vitals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-10 h-10 text-brand-sky shrink-0" />
          <div>
            <h4 className="font-display font-bold text-base text-white">BPCA & NPTA Members</h4>
            <p className="text-xs text-slate-400 mt-1">
              Fully registered members of the British Pest Control Association & National Pest Technicians Association, ensuring premium UK operating standards.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-10 h-10 text-brand-sky shrink-0" />
          <div>
            <h4 className="font-display font-bold text-base text-white">24/7 Professional Response</h4>
            <p className="text-xs text-slate-400 mt-1">
              Emergency technician dispatch operating 24 hours a day, 365 days a year across all London boroughs inside the M25.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <CalendarDays className="w-10 h-10 text-brand-sky shrink-0" />
          <div>
            <h4 className="font-display font-bold text-base text-white">Guaranteed Eradication</h4>
            <p className="text-xs text-slate-400 mt-1">
              All targeted treatments are supported by our up to 3-month guarantee, incorporating complimentary follow-up checks.
            </p>
          </div>
        </div>
      </div>

      {/* Main navigation footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About & Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-brand-sky" />
            <span className="font-display font-bold text-lg text-white leading-none">THE PEST <br/><span className="text-xs text-brand-sky uppercase font-semibold tracking-wider font-sans">EXTERMINATORS</span></span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The leading, fully BPCA-certified local pest management specialists serving residential homes and commercial kitchens across London.
          </p>
          <div className="space-y-2 text-xs">
            <a href={`tel:${businessDetails.telephone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-4 h-4 text-brand-sky" />
              <span>{businessDetails.telephone}</span>
            </a>
            <a href={`mailto:${businessDetails.email}`} className="flex items-center gap-2 hover:text-white transition">
              <Mail className="w-4 h-4 text-brand-sky" />
              <span>{businessDetails.email}</span>
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
              <span className="text-slate-400 leading-normal">{businessDetails.address}</span>
            </div>
          </div>
        </div>

        {/* Priority Services */}
        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Our Services</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/services/residential-pest-control/" className="hover:text-white transition">Residential Pest Control</Link></li>
            <li><Link href="/services/commercial-pest-control/" className="hover:text-white transition">Commercial Pest Control</Link></li>
            <li><Link href="/services/emergency-pest-control/" className="hover:text-white transition">Emergency Pest Control</Link></li>
            <li><Link href="/services/pest-proofing/" className="hover:text-white transition">Rodent & Insect Proofing</Link></li>
            <li><Link href="/services/bird-control/" className="hover:text-white transition">Bird & Pigeon Control</Link></li>
            <li><Link href="/services/restaurant-pest-control/" className="hover:text-white transition">Restaurant & Takeaway Service</Link></li>
          </ul>
        </div>

        {/* Priority Pests */}
        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Pests Eradicated</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/pests/rats/" className="hover:text-white transition">Rat Control & Drains</Link></li>
            <li><Link href="/pests/mice/" className="hover:text-white transition">Mouse Infestations</Link></li>
            <li><Link href="/pests/bed-bugs/" className="hover:text-white transition">Bed Bug Heat Sprays</Link></li>
            <li><Link href="/pests/cockroaches/" className="hover:text-white transition">Cockroach Extermination</Link></li>
            <li><Link href="/pests/wasps/" className="hover:text-white transition">Wasp Nest Removal</Link></li>
            <li><Link href="/pests/pigeons/" className="hover:text-white transition">Pigeon Netting & Spikes</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Help & Info</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/about/" className="hover:text-white transition">About Our Business</Link></li>
            <li><Link href="/team/" className="hover:text-white transition">Meet Our Technical Team</Link></li>
            <li><Link href="/advice/" className="hover:text-white transition">Expert Advice Hub</Link></li>
            <li><Link href="/prices/" className="hover:text-white transition">Pest Treatment Pricing</Link></li>
            <li><Link href="/faq/" className="hover:text-white transition">Frequently Asked Questions</Link></li>
            <li>
              <a href={businessDetails.googleBusinessProfileUrl} target="_blank" rel="noreferrer" className="text-brand-sky hover:underline font-semibold flex items-center gap-1 mt-1">
                View Google Business Profile
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-footer containing copyright, terms, privacy, cookie policy, etc. */}
      <div className="bg-slate-950 text-xs py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500">
            &copy; {currentYear} The Pest Exterminators. All rights reserved. Registered Office: Wembley, London HA9 7NA.
          </p>
          <div className="flex flex-wrap gap-4 text-slate-500">
            <Link href="/privacy-policy/" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link href="/cookie-policy/" className="hover:text-slate-300 transition">Cookie Policy</Link>
            <Link href="/terms-and-conditions/" className="hover:text-slate-300 transition">Terms & Conditions</Link>
            <Link href="/accessibility/" className="hover:text-slate-300 transition">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
