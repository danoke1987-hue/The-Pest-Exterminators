import React from 'react';
import { useRouter, Link } from './components/Router';
import Header from './components/Header';
import Footer from './components/Footer';
import { StickyMobileActions } from './components/NavigationElements';
import CookieConsent from './components/CookieConsent';
import { ErrorBoundary } from './components/States';

// Page Components
import Home from './pages/Home';
import Services from './pages/Services';
import Pests from './pages/Pests';
import Locations from './pages/Locations';
import ContentHub from './pages/ContentHub';

export default function App() {
  const { path } = useRouter();

  // Helper to parse path segments
  const segments = path.toLowerCase().split('/').filter(Boolean);

  let content = null;

  if (segments.length === 0) {
    content = <Home />;
  } else if (segments[0] === 'services') {
    if (segments.length === 1) {
      content = <Services />;
    } else {
      content = <Services slug={segments[1]} />;
    }
  } else if (segments[0] === 'pests') {
    if (segments.length === 1) {
      content = <Pests />;
    } else {
      content = <Pests slug={segments[1]} />;
    }
  } else if (segments[0] === 'areas') {
    if (segments.length === 1) {
      content = <Locations />;
    } else if (segments.length === 2) {
      content = <Locations boroughSlug={segments[1]} />;
    } else {
      content = <Locations boroughSlug={segments[1]} areaSlug={segments[2]} />;
    }
  } else if (segments[0] === 'postcodes') {
    if (segments.length === 1) {
      content = <Locations />;
    } else {
      // Determine if it's a postcode prefix or district
      const segment = segments[1].toUpperCase();
      if (segment.length <= 2) {
        content = <Locations postcodePrefix={segments[1]} />;
      } else {
        content = <Locations postcodeDistrict={segments[1]} />;
      }
    }
  } else if (segments[0] === 'about') {
    content = <ContentHub pageType="about" />;
  } else if (segments[0] === 'team') {
    content = <ContentHub pageType="team" />;
  } else if (segments[0] === 'faq') {
    content = <ContentHub pageType="faq" />;
  } else if (segments[0] === 'reviews') {
    content = <ContentHub pageType="reviews" />;
  } else if (segments[0] === 'prices') {
    content = <ContentHub pageType="prices" />;
  } else if (segments[0] === 'contact') {
    content = <ContentHub pageType="contact" />;
  } else if (segments[0] === 'get-a-quote') {
    content = <ContentHub pageType="get-a-quote" />;
  } else if (segments[0] === 'advice') {
    if (segments.length === 1) {
      content = <ContentHub pageType="advice-index" />;
    } else {
      content = <ContentHub pageType="advice-article" articleSlug={segments[1]} />;
    }
  } else if (segments[0] === 'privacy-policy') {
    content = <ContentHub pageType="privacy" />;
  } else if (segments[0] === 'cookie-policy') {
    content = <ContentHub pageType="cookie" />;
  } else if (segments[0] === 'terms-and-conditions') {
    content = <ContentHub pageType="terms" />;
  } else if (segments[0] === 'accessibility') {
    content = <ContentHub pageType="accessibility" />;
  } else {
    // 404 Fallback page
    content = (
      <div id="not-found-page" className="max-w-3xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-display font-bold text-3xl text-brand-slate">Page Not Found</h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          The page you are looking for does not exist or has been moved. Use the header links to navigate back.
        </p>
        <Link href="/" className="inline-block px-5 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-semibold hover:bg-brand-accent transition">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {content}
        </main>
        
        <Footer />
        <StickyMobileActions />
        <CookieConsent />
      </div>
    </ErrorBoundary>
  );
}
