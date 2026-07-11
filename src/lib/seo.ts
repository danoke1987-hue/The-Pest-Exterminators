import { businessDetails } from '../data/business';
import { pestsBySlug } from '../data/pests';
import { servicesBySlug } from '../data/services';
import { boroughsBySlug } from '../data/boroughs';
import { areasBySlug } from '../data/areas';
import { postcodePrefixesByPrefix, postcodeDistrictsByDistrict } from '../data/postcodes';
import { articlesBySlug } from '../data/articles';

interface SeoData {
  title: string;
  description: string;
  indexable: boolean;
  schema?: object;
}

export function getSeoData(path: string): SeoData {
  const cleanPath = path.toLowerCase().replace(/\/+$/, ''); // Strip trailing slash for matching
  const segments = cleanPath.split('/').filter(Boolean);

  // Default SEO
  let title = "Professional 24/7 Pest Control London | The Pest Exterminators";
  let description = "Expert, fully BPCA certified pest control services in London. 24/7 emergency response for rodents, insects, and bird proofing. Guaranteed results.";
  let indexable = true;
  let schemaType = "LocalBusiness";

  // 1. HOMEPAGE
  if (segments.length === 0) {
    const mainSchema = {
      "@context": "https://schema.org",
      "@type": "PestControlService",
      "name": businessDetails.name,
      "url": businessDetails.domain,
      "logo": `${businessDetails.domain}/logo.png`,
      "image": "https://images.unsplash.com/photo-1587582423116-ec07293f0395?auto=format&fit=crop&q=80&w=800",
      "telephone": businessDetails.telephone,
      "email": businessDetails.email,
      "priceRange": "££",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "East Lane Business Park, Office 100, 15 Main Dr, Wembley",
        "addressLocality": "London",
        "postalCode": "HA9 7NA",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.5646,
        "longitude": -0.2858
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "London" }
      ]
    };

    return { title, description, indexable, schema: mainSchema };
  }

  // 2. SERVICES HUB & INDIVIDUAL SERVICES
  if (segments[0] === 'services') {
    if (segments.length === 1) {
      return {
        title: "Certified Pest Management Services London | The Pest Exterminators",
        description: "Explore our range of professional pest treatments. Including domestic removal, commercial audits, insect proofing, and emergency callouts.",
        indexable: true
      };
    } else {
      const slug = segments[1];
      const service = servicesBySlug[slug];
      if (service) {
        const serviceSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.name,
          "description": service.shortDescription,
          "provider": {
            "@type": "LocalBusiness",
            "name": businessDetails.name,
            "telephone": businessDetails.telephone
          }
        };
        return {
          title: `Professional ${service.name} London | The Pest Exterminators`,
          description: service.shortDescription,
          indexable: true,
          schema: serviceSchema
        };
      }
    }
  }

  // 3. PESTS HUB & INDIVIDUAL PESTS
  if (segments[0] === 'pests') {
    if (segments.length === 1) {
      return {
        title: "Pests We Eradicate & Prevent in London | The Pest Exterminators",
        description: "Detailed index of common London pest species. Read expert biology, signs of activity, treatment strategies, and pre-visit preparations.",
        indexable: true
      };
    } else {
      const slug = segments[1];
      const pest = pestsBySlug[slug];
      if (pest) {
        return {
          title: `${pest.name} Eradication & Treatment London | The Pest Exterminators`,
          description: pest.shortDescription,
          indexable: true
        };
      }
    }
  }

  // 4. COVERAGE AREAS HUB & BOROUGHS/NEIGHBORHOODS
  if (segments[0] === 'areas') {
    if (segments.length === 1) {
      return {
        title: "Our 24/7 London Service Coverage Areas | The Pest Exterminators",
        description: "View our active coverage map. Operating 24 hours a day inside all 32 London boroughs, including Westminster, Camden, Ealing, and Croydon.",
        indexable: true
      };
    } else {
      const boroughSlug = segments[1];
      const areaSlug = segments[2];

      if (boroughSlug && !areaSlug) {
        const borough = boroughsBySlug[boroughSlug];
        if (borough) {
          const isBoroughIndexable = borough.qualityScore >= 80;
          return {
            title: `Pest Control ${borough.name} Borough | Certified 24/7 Exterminators`,
            description: borough.serviceNotes,
            indexable: isBoroughIndexable
          };
        }
      } else if (boroughSlug && areaSlug) {
        const area = areasBySlug[areaSlug];
        if (area) {
          const isAreaIndexable = area.qualityScore >= 80;
          return {
            title: `Pest Control ${area.name} | Certified Local Exterminators`,
            description: `Professional, rapid pest control and proofing treatments inside ${area.name} (${area.postcodeDistricts.join(', ')}). 24/7 emergency dispatch.`,
            indexable: isAreaIndexable
          };
        }
      }
    }
  }

  // 5. POSTCODES HUBS
  if (segments[0] === 'postcodes') {
    if (segments.length === 1) {
      return {
        title: "Search Coverage by London Postcode | The Pest Exterminators",
        description: "Instantly check active certified technician availability for your specific London postcode sector.",
        indexable: true
      };
    } else {
      const segment = segments[1].toUpperCase();
      if (segment.length <= 2) {
        const prefix = postcodePrefixesByPrefix[segment];
        if (prefix) {
          return {
            title: `Pest Control in ${prefix.prefix} Postcode Sector | The Pest Exterminators`,
            description: prefix.localIntro,
            indexable: prefix.qualityScore >= 80
          };
        }
      } else {
        const district = postcodeDistrictsByDistrict[segment];
        if (district) {
          return {
            title: `Pest Control ${district.district} | Local 24/7 Exterminators`,
            description: district.localIntro,
            indexable: district.qualityScore >= 80
          };
        }
      }
    }
  }

  // 6. ADVICE HUB INDEX & ARTICLES
  if (segments[0] === 'advice') {
    if (segments.length === 1) {
      return {
        title: "Expert Pest Advice, Identification & Prevention Hub | London",
        description: "Professional technical guides, preparation checklists, and biological advice written and audited by senior qualified pest biologists.",
        indexable: true
      };
    } else {
      const slug = segments[1];
      const article = articlesBySlug[slug];
      if (article) {
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "image": article.image,
          "author": {
            "@type": "Person",
            "name": article.author
          },
          "publisher": {
            "@type": "Organization",
            "name": businessDetails.name
          },
          "datePublished": article.publishedDate
        };
        return {
          title: `${article.title} | Technical Advice Hub`,
          description: `Read our comprehensive guide regarding ${article.title}. Audited by certified biologists.`,
          indexable: true,
          schema: articleSchema
        };
      }
    }
  }

  // 7. OTHER CORPORATE PAGES
  if (segments[0] === 'about') {
    return {
      title: "About The Pest Exterminators | BPCA Certified London Specialists",
      description: "Learn about London's leading certified pest biologists. Read about our RSPH qualifications, Wembley HQ, and 24/7 operating model.",
      indexable: true
    };
  }

  if (segments[0] === 'team') {
    return {
      title: "Meet Our Technical Biologists & Technicians | The Pest Exterminators",
      description: "Vetted, highly qualified, and RSPH Level 2 certified field officers. Learn about our specialists resolving infestations across London.",
      indexable: true
    };
  }

  if (segments[0] === 'faq') {
    return {
      title: "Pest Eradication & Safety Frequently Asked Questions | FAQ",
      description: "Instant professional answers to questions regarding treatment safety for children/pets, eradication guarantees, and service charges.",
      indexable: true
    };
  }

  if (segments[0] === 'reviews') {
    return {
      title: "Verified Customer Reviews & Ratings | The Pest Exterminators",
      description: "Read 100% genuine local ratings and reviews of our residential and commercial exterminators in London.",
      indexable: true
    };
  }

  if (segments[0] === 'prices') {
    return {
      title: "Professional Pest Treatment & Proofing Pricing | Transparent Rates",
      description: "Explore our transparent indicator treatment rates. Free, honest, no-obligation verbal quotes over the phone. No hidden fees.",
      indexable: true
    };
  }

  if (segments[0] === 'contact') {
    return {
      title: "Contact Our 24/7 London Dispatch Office | The Pest Exterminators",
      description: "Get in touch. Call 020 7099 9269 for immediate emergency technician dispatch, or submit a request online.",
      indexable: true
    };
  }

  if (segments[0] === 'get-a-quote') {
    return {
      title: "Request a Free Verbal Quote | Online Form",
      description: "Submit our secure 3-step quote form. A senior technical officer will review your description or photo and call back in 15 minutes.",
      indexable: true
    };
  }

  if (segments[0] === 'privacy-policy') {
    return { title: "Privacy Policy | The Pest Exterminators", description: "Learn how we collect and secure customer coordinates for service booking.", indexable: true };
  }

  if (segments[0] === 'cookie-policy') {
    return { title: "Cookie Policy | The Pest Exterminators", description: "Details regarding essential and optional analytics cookies set on this site.", indexable: true };
  }

  if (segments[0] === 'terms-and-conditions') {
    return { title: "Terms & Conditions of Service | The Pest Exterminators", description: "Contractual terms governing treatment visits, guarantees, and on-site works.", indexable: true };
  }

  if (segments[0] === 'accessibility') {
    return { title: "Accessibility Statement | WCAG 2.2 Compliance", description: "Our commitment to WCAG 2.2 AA accessibility standards for all users.", indexable: true };
  }

  return { title, description, indexable };
}
