import { useEffect } from 'react';
import { useRouter } from '../components/Router';
import { getSeoData } from '../lib/seo';
import { businessDetails } from '../data/business';

export interface UseSeoOptions {
  title?: string;
  description?: string;
  noindex?: boolean;
  ogType?: string;
  ogImage?: string;
  canonicalPath?: string;
}

export function useSEO(options: UseSeoOptions = {}) {
  const { path } = useRouter();

  // Get base SEO data from our preconfigured SEO system
  const seoData = getSeoData(path);

  // Determine final SEO values (explicit options take priority over path-based defaults)
  const title = options.title || seoData.title;
  const description = options.description || seoData.description;
  const isIndexable = options.noindex !== undefined ? !options.noindex : seoData.indexable;
  const ogType = options.ogType || 'website';
  
  // Default fallback image if none provided
  const defaultImage = 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?auto=format&fit=crop&q=80&w=800';
  const ogImage = options.ogImage || defaultImage;

  // Canonical URL construction using global business domain
  const domain = businessDetails.domain.startsWith('http') 
    ? businessDetails.domain 
    : `https://${businessDetails.domain}`;
  const cleanDomain = domain.replace(/\/+$/, '');
  const targetPath = options.canonicalPath || path;
  const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  const canonicalUrl = `${cleanDomain}${cleanPath}`;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Update document title
    document.title = title;

    // Helper to find or create a meta tag and update its attributes
    const setMetaTag = (attrName: string, attrValue: string, attributes: Record<string, string>) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, val]) => {
        element!.setAttribute(key, val);
      });
    };

    // Helper to find or create a link tag and update its attributes
    const setLinkTag = (rel: string, attributes: Record<string, string>) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, val]) => {
        element!.setAttribute(key, val);
      });
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', { content: description });
    setMetaTag('name', 'robots', { content: isIndexable ? 'index, follow' : 'noindex, follow' });

    // 3. OpenGraph Tags
    setMetaTag('property', 'og:title', { content: title });
    setMetaTag('property', 'og:description', { content: description });
    setMetaTag('property', 'og:type', { content: ogType });
    setMetaTag('property', 'og:url', { content: canonicalUrl });
    setMetaTag('property', 'og:image', { content: ogImage });
    setMetaTag('property', 'og:site_name', { content: businessDetails.name });

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', { content: 'summary_large_image' });
    setMetaTag('name', 'twitter:title', { content: title });
    setMetaTag('name', 'twitter:description', { content: description });
    setMetaTag('name', 'twitter:image', { content: ogImage });

    // 5. Canonical Link
    setLinkTag('canonical', { href: canonicalUrl });

  }, [title, description, isIndexable, ogType, ogImage, canonicalUrl]);
}
