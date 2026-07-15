import { businessDetails } from '../data/business';
import { pestsData } from '../data/pests';
import { servicesData } from '../data/services';
import { boroughsData } from '../data/boroughs';
import { areasData } from '../data/areas';
import { postcodePrefixesData, postcodeDistrictsData } from '../data/postcodes';
import { articlesData } from '../data/articles';

export function generateSitemapXml(): string {
  const domain = businessDetails.domain.startsWith('http') 
    ? businessDetails.domain 
    : `https://${businessDetails.domain}`;
  const baseUrl = domain.replace(/\/+$/, '');
  const urls: string[] = [];

  // 1. Static Pages
  const staticPaths = [
    '/',
    '/services/',
    '/pests/',
    '/areas/',
    '/about/',
    '/team/',
    '/faq/',
    '/reviews/',
    '/prices/',
    '/contact/',
    '/get-a-quote/',
    '/advice/',
    '/privacy-policy/',
    '/cookie-policy/',
    '/terms-and-conditions/',
    '/accessibility/'
  ];
  staticPaths.forEach((p) => urls.push(`${baseUrl}${p}`));

  // 2. Individual Services
  servicesData.forEach((s) => {
    urls.push(`${baseUrl}/services/${s.slug}/`);
  });

  // 3. Individual Pests
  pestsData.forEach((p) => {
    urls.push(`${baseUrl}/pests/${p.slug}/`);
  });

  // 4. Boroughs (Filter by qualityScore >= 80)
  boroughsData
    .filter((b) => b.qualityScore >= 80)
    .forEach((b) => {
      urls.push(`${baseUrl}/areas/${b.slug}/`);
    });

  // 5. Neighborhood Areas (Filter by qualityScore >= 80)
  areasData
    .filter((a) => a.qualityScore >= 80)
    .forEach((a) => {
      urls.push(`${baseUrl}/areas/${a.boroughSlug}/${a.slug}/`);
    });

  // 6. Postcode Prefixes (Filter by qualityScore >= 80)
  postcodePrefixesData
    .filter((p) => p.qualityScore >= 80)
    .forEach((p) => {
      urls.push(`${baseUrl}/postcodes/${p.prefix.toLowerCase()}/`);
    });

  // 7. Postcode Districts (Filter by qualityScore >= 80)
  postcodeDistrictsData
    .filter((d) => d.qualityScore >= 80)
    .forEach((d) => {
      urls.push(`${baseUrl}/postcodes/${d.district.toLowerCase()}/`);
    });

  // 8. Articles
  articlesData.forEach((art) => {
    urls.push(`${baseUrl}/advice/${art.slug}/`);
  });

  // Deduplicate and ensure no invalid trailing slash duplicates
  const uniqueUrls = Array.from(new Set(urls));

  // Compile XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  uniqueUrls.forEach((url) => {
    // Escape XML special characters
    const escapedUrl = url
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    xml += '  <url>\n';
    xml += `    <loc>${escapedUrl}</loc>\n`;
    
    // Check if it is an article and has lastReviewed or publishedDate
    if (url.includes('/advice/')) {
      const slug = url.split('/').filter(Boolean).pop();
      const article = articlesData.find(a => a.slug === slug);
      if (article) {
        const dateStr = article.lastReviewed || article.publishedDate;
        if (dateStr) {
          xml += `    <lastmod>${dateStr}</lastmod>\n`;
        }
      }
    }
    
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';
  return xml;
}
