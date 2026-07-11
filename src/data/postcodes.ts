import { PostcodePrefix, PostcodeDistrict } from '../types';

export const postcodePrefixesData: PostcodePrefix[] = [
  {
    prefix: "NW",
    name: "North West London",
    served: true,
    indexable: true,
    postcodeDistricts: ["NW1", "NW3", "NW5", "NW6", "NW8", "NW10", "NW11"],
    boroughs: ["Camden", "Westminster", "Brent", "Barnet", "Haringey"],
    localIntro: "Our North West London team has over 15 years of experience managing pest infestations in local residential areas. We provide 24/7 rapid, discreet pest eradication and proofing from Hampstead to Willesden.",
    metaTitle: "Pest Control North West London | 24/7 NW Postcodes",
    metaDescription: "Professional pest control services across North West London (NW1 to NW11). Same-day response for rats, mice, bed bugs, and wasps. Call 020 7099 9269.",
    qualityScore: 88
  },
  {
    prefix: "W",
    name: "West London",
    served: true,
    indexable: true,
    postcodeDistricts: ["W1", "W2", "W3", "W5", "W8", "W11", "W12", "W13", "W14"],
    boroughs: ["Westminster", "Ealing", "Hammersmith and Fulham", "Kensington and Chelsea", "Hounslow"],
    localIntro: "We provide professional pest control and structural proofing across all West London postcode districts, handling domestic terraced house pest issues, food business compliance, and emergency out-of-hours requests.",
    metaTitle: "Pest Control West London | 24/7 W Postcodes",
    metaDescription: "Guaranteed professional pest control services in West London. Fast 24/7 rapid response for residential and commercial spaces. Call 020 7099 9269.",
    qualityScore: 89
  },
  {
    prefix: "SW",
    name: "South West London",
    served: true,
    indexable: true,
    postcodeDistricts: ["SW1", "SW3", "SW7", "SW8", "SW11", "SW12", "SW15", "SW17", "SW18", "SW19"],
    boroughs: ["Westminster", "Wandsworth", "Kensington and Chelsea", "Lambeth", "Merton", "Richmond upon Thames"],
    localIntro: "Our South West London technical team delivers premier pest eradication, bird spikes, and moths control treatments for historic, terraced, and riverside properties from Battersea to Wimbledon.",
    metaTitle: "Pest Control South West London | 24/7 SW Postcodes",
    metaDescription: "BPCA-certified pest control services in South West London. 24/7 emergency response for mice, moths, bed bugs, and rats. Call 020 7099 9269.",
    qualityScore: 88
  },
  {
    prefix: "CR",
    name: "Croydon & Surrey Fringe",
    served: true,
    indexable: true,
    postcodeDistricts: ["CR0", "CR2", "CR4", "CR5", "CR7", "CR8"],
    boroughs: ["Croydon", "Sutton", "Merton"],
    localIntro: "We cover all Croydon and surrounding South London areas, providing prompt 24/7 response times for homes and industrial warehouses near the Purley Way.",
    metaTitle: "Pest Control Croydon CR Postcodes | 24/7 Professional",
    metaDescription: "Local professional pest control in Croydon and Surrey fringe postcode districts. Rapid response, certified technicians. Call 020 7099 9269.",
    qualityScore: 85
  },
  // Adding the other required prefixes with indexable: false or low qualityScore so they are served, but not indexable doorway pages
  ...[
    { prefix: "E", name: "East London" },
    { prefix: "EC", name: "Eastern Central London" },
    { prefix: "N", name: "North London" },
    { prefix: "SE", name: "South East London" },
    { prefix: "WC", name: "Western Central London" },
    { prefix: "BR", name: "Bromley Area" },
    { prefix: "DA", name: "Dartford Area" },
    { prefix: "EN", name: "Enfield Area" },
    { prefix: "HA", name: "Harrow Area" },
    { prefix: "IG", name: "Ilford Area" },
    { prefix: "KT", name: "Kingston Area" },
    { prefix: "RM", name: "Romford Area" },
    { prefix: "SM", name: "Sutton Area" },
    { prefix: "TW", name: "Twickenham Area" },
    { prefix: "UB", name: "Uxbridge Area" },
    { prefix: "WD", name: "Watford Area" }
  ].map(p => ({
    prefix: p.prefix,
    name: p.name,
    served: true,
    indexable: false, // Set to false to avoid mass-doorway indexation
    postcodeDistricts: [p.prefix + "1", p.prefix + "2"],
    boroughs: ["London"],
    localIntro: `We provide complete 24/7 professional pest control services across all postcodes in the ${p.name} sector, assisting both households and commercial businesses.`,
    metaTitle: `Pest Control ${p.name} | ${p.prefix} Postcodes | The Pest Exterminators`,
    metaDescription: `Certified pest control services in the ${p.name} (${p.prefix}) sector. Rapid 24/7 local response, safe and effective treatments. Call 020 7099 9269.`,
    qualityScore: 60
  }))
];

export const postcodeDistrictsData: PostcodeDistrict[] = [
  {
    district: "NW1",
    prefix: "NW",
    served: true,
    indexable: true,
    boroughName: "Camden",
    areas: ["Camden Town", "Regent's Park", "Somers Town"],
    localIntro: "NW1 covers central and north-western parts of London. Our local technicians resolve commercial kitchen cockroach issues and terrace flat mouse problems in NW1 within hours.",
    metaTitle: "Pest Control NW1 | Camden Town & Regent's Park",
    metaDescription: "Guaranteed local pest control in the NW1 postcode district. 24/7 same-day service for rats, mice, and crawling insects. Call 020 7099 9269.",
    qualityScore: 85
  },
  {
    district: "NW3",
    prefix: "NW",
    served: true,
    indexable: true,
    boroughName: "Camden",
    areas: ["Hampstead", "Belsize Park", "Swiss Cottage"],
    localIntro: "NW3 covers Hampstead and Swiss Cottage. We specialize in high-quality structural rodent-proofing and discreet treatments for period properties in NW3.",
    metaTitle: "Pest Control NW3 | Hampstead & Swiss Cottage",
    metaDescription: "Professional, discreet pest control services in NW3 (Hampstead, Belsize Park). Certified BPCA technicians, unmarked vehicles. Call 020 7099 9269.",
    qualityScore: 86
  },
  {
    district: "W1",
    prefix: "W",
    served: true,
    indexable: true,
    boroughName: "Westminster",
    areas: ["Soho", "Mayfair", "Fitzrovia", "Marylebone"],
    localIntro: "W1 is London's central commercial and culinary hub. Our Westminster-based team delivers out-of-hours cockroach and mouse control for food establishments across W1.",
    metaTitle: "Pest Control W1 | Soho, Mayfair & Marylebone",
    metaDescription: "Audit-ready commercial and domestic pest control in the W1 postcode district. Rapid response and 100% EHO-compliant contracts. Call 020 7099 9269.",
    qualityScore: 87
  },
  {
    district: "SW1",
    prefix: "SW",
    served: true,
    indexable: true,
    boroughName: "Westminster",
    areas: ["Belgravia", "Pimlico", "Westminster City"],
    localIntro: "SW1 is home to historic government buildings and high-end flats. We provide non-destructive rodent exclusion and bird proofing for luxury properties in SW1.",
    metaTitle: "Pest Control SW1 | Belgravia, Pimlico & Victoria",
    metaDescription: "Premium local pest control and pigeon proofing in SW1. Unmarked vehicles, professional technicians, and emergency 24/7 response. Call 020 7099 9269.",
    qualityScore: 85
  },
  {
    district: "CR0",
    prefix: "CR",
    served: true,
    indexable: true,
    boroughName: "Croydon",
    areas: ["Croydon Town Centre", "Addiscombe", "Shirley"],
    localIntro: "CR0 is South London's largest postcode district. Our Croydon team handles pest control for modern apartments, logistics hubs, and residential gardens 24/7.",
    metaTitle: "Pest Control CR0 | Croydon, Addiscombe & Shirley",
    metaDescription: "Local same-day pest control services in CR0. Complete eradication for mice, rats, bed bugs, and wasps. Fully guaranteed. Call 020 7099 9269.",
    qualityScore: 85
  }
];

export const postcodePrefixesByPrefix = postcodePrefixesData.reduce((acc, p) => {
  acc[p.prefix] = p;
  return acc;
}, {} as Record<string, PostcodePrefix>);

export const postcodeDistrictsByDistrict = postcodeDistrictsData.reduce((acc, d) => {
  acc[d.district] = d;
  return acc;
}, {} as Record<string, PostcodeDistrict>);
