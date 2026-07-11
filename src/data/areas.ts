import { Area } from '../types';

export const areasData: Area[] = [
  // Camden Areas
  {
    name: "Hampstead",
    slug: "hampstead",
    boroughSlug: "camden",
    boroughName: "Camden",
    postcodeDistricts: ["NW3"],
    served: true,
    indexable: true,
    localIntro: "Hampstead is an affluent, historic village in North-West London. Known for its massive heath, tree-lined residential streets, and fine period villas. Our Hampstead team provides highly discreet, premium pest proofing and pest control treatments designed to protect high-value properties without affecting their period aesthetics.",
    metaTitle: "Professional Pest Control Hampstead NW3 | The Pest Exterminators",
    metaDescription: "Guaranteed, highly discreet pest control and proofing services in Hampstead, NW3. 24/7 emergency response for period properties and homes. Call 020 7099 9269.",
    qualityScore: 90
  },
  {
    name: "Bloomsbury",
    slug: "bloomsbury",
    boroughSlug: "camden",
    boroughName: "Camden",
    postcodeDistricts: ["WC1"],
    served: true,
    indexable: true,
    localIntro: "Bloomsbury is a historic academic and literary hub in central London, containing the British Museum, major universities, and numerous hotels. Our Bloomsbury team specializes in multi-occupancy building pest control, bed bug heat treatments, and proactive commercial contracts.",
    metaTitle: "Pest Control Bloomsbury WC1 | Central London Specialist",
    metaDescription: "Professional pest control and bed bug eradication in Bloomsbury, WC1. Certified BPCA technicians serving hotels, student lets, and offices. Call 020 7099 9269.",
    qualityScore: 88
  },
  // Westminster Areas
  {
    name: "Soho",
    slug: "soho",
    boroughSlug: "westminster",
    boroughName: "Westminster",
    postcodeDistricts: ["W1D", "W1F", "W1"],
    served: true,
    indexable: true,
    localIntro: "Soho is central London's busiest entertainment and culinary district. The extremely high density of kitchens, bars, and clubs makes it highly vulnerable to rodent and cockroach activities. We provide urgent out-of-hours commercial baiting and gel-baiting treatments to maintain 100% compliance for Soho venues.",
    metaTitle: "Commercial Pest Control Soho W1 | Restaurant Specialists",
    metaDescription: "Audit-ready commercial pest control for restaurants, clubs, and bars in Soho. 24/7 rapid response, EHO compliance, and discreet support. Call 020 7099 9269.",
    qualityScore: 91
  },
  {
    name: "Mayfair",
    slug: "mayfair",
    boroughSlug: "westminster",
    boroughName: "Westminster",
    postcodeDistricts: ["W1J", "W1K", "W1"],
    served: true,
    indexable: true,
    localIntro: "Mayfair represents one of the world's most prestigious commercial and residential districts, featuring fine galleries, luxury hotels, and embassies. Our Mayfair technicians operate with total discretion, using unmarked vehicles and custom-fitted, silent, and highly aesthetic physical pest proofing systems.",
    metaTitle: "Discreet Pest Control Mayfair W1 | Premium Service",
    metaDescription: "Elite, discreet pest control in Mayfair, W1. Unmarked vehicles, highly qualified technicians, and non-destructive proofing for historic properties. Call 020 7099 9269.",
    qualityScore: 90
  },
  // Croydon Areas
  {
    name: "Purley",
    slug: "purley",
    boroughSlug: "croydon",
    boroughName: "Croydon",
    postcodeDistricts: ["CR8"],
    served: true,
    indexable: true,
    localIntro: "Purley is a leafy residential suburb in South London, featuring large detached properties and expansive gardens. Our Purley team frequently handles loft-based squirrel and wasp infestations, as well as providing extensive rodent exclusion and garden proofing.",
    metaTitle: "Pest Control Purley CR8 | Professional Local Eradication",
    metaDescription: "Local rodent, wasp, and squirrel control in Purley, CR8. Same-day emergency response and complete home proofing with a 100% guarantee. Call 020 7099 9269.",
    qualityScore: 88
  },
  // Ealing Areas
  {
    name: "Acton",
    slug: "acton",
    boroughSlug: "ealing",
    boroughName: "Ealing",
    postcodeDistricts: ["W3"],
    served: true,
    indexable: true,
    localIntro: "Acton in West London is a bustling, diverse residential area with significant transport routes and multi-occupancy flat conversions. We specialize in flat-to-flat mouse proofing and fast insect eradication, ensuring safe conditions for tenants and landlords.",
    metaTitle: "Pest Control Acton W3 | Flat & Home Rodent Proofing",
    metaDescription: "Professional pest control and rodent exclusion in Acton, W3. Safe treatments for mice, bed bugs, and cockroaches. Landlord & tenant support. Call 020 7099 9269.",
    qualityScore: 88
  },
  // Hackney Areas
  {
    name: "Shoreditch",
    slug: "shoreditch",
    boroughSlug: "hackney",
    boroughName: "Hackney",
    postcodeDistricts: ["EC2", "E2", "E1"],
    served: true,
    indexable: true,
    localIntro: "Shoreditch is a world-class creative hub, tech district, and nightlife capital. The close proximity of historic warehouses, offices, and dynamic street food markets creates high pressure for pests. We provide modern, proactive digital pest monitoring and rapid response programs.",
    metaTitle: "Pest Control Shoreditch EC2 | Tech & Creative Venues",
    metaDescription: "Certified, modern commercial pest management in Shoreditch. Rapid response for bars, restaurants, and creative offices. Audit-ready EHO records. Call 020 7099 9269.",
    qualityScore: 89
  },
  // Wandsworth Areas
  {
    name: "Battersea",
    slug: "battersea",
    boroughSlug: "wandsworth",
    boroughName: "Wandsworth",
    postcodeDistricts: ["SW11"],
    served: true,
    indexable: true,
    localIntro: "Battersea blends historic Thameside industrial heritage with high-profile modern developments like Battersea Power Station. Due to proximity to the river, rodent pressures can be high. We install premium, heavy-duty stainless steel one-way drainage valves and provide complete block-wide protection.",
    metaTitle: "Pest Control Battersea SW11 | 24/7 River & Block Specialists",
    metaDescription: "Professional pest control in Battersea, SW11. River rat investigations, drainage valves, and complete block pest management. Same-day service. Call 020 7099 9269.",
    qualityScore: 90
  }
];

export const areasBySlug = areasData.reduce((acc, area) => {
  acc[area.slug] = area;
  return acc;
}, {} as Record<string, Area>);
