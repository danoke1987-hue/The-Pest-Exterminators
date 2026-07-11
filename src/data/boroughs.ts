import { Borough } from '../types';

export const boroughsData: Borough[] = [
  {
    name: "Camden",
    slug: "camden",
    served: true,
    indexable: true,
    insideM25: true,
    serviceNotes: "24/7 coverage. Dedicated local team with rapid response for Hampstead, Kentish Town, Camden Town, and Holborn.",
    postcodePrefixes: ["NW", "N", "WC", "EC"],
    postcodeDistricts: ["NW1", "NW3", "NW5", "NW8", "N1", "N6", "N19", "WC1", "WC2", "EC1"],
    nearbyAreas: ["Hampstead", "Highgate", "Kentish Town", "Belsize Park", "Bloomsbury", "Primrose Hill"],
    neighbouringBoroughs: ["Westminster", "Islington", "Haringey", "Barnet", "Brent"],
    localIntro: "Camden is a vibrant, diverse London borough stretching from the bustly markets of Camden Town and historic streets of Bloomsbury to the exclusive residential leafiness of Hampstead and Highgate. The mixture of historical terraced townhouses, massive commercial hubs, busy food markets, and dense student accommodation creates a complex environment where pests can easily establish if not managed professionally.",
    propertyContext: "In Camden, housing spans from grand, multi-story Victorian and Georgian terraces in Hampstead and Bloomsbury to modern estates and subdivided tenement blocks. Older timber-framed floors and shared brickwork cavities in historic terraced properties provide ideal, unchecked highway systems for mice and bed bugs to travel between adjacent homes.",
    commercialContext: "Camden Town's world-famous food markets, alongside Bloomsbury's hotels, universities, and high-density office blocks, require constant vigilance. Food businesses face high rodent and cockroach risks, demanding compliant, preventative pest control management (PPM) that passes strict local health inspections.",
    commonPests: ["mice", "rats", "bed-bugs", "cockroaches", "wasps"],
    faqs: [
      {
        id: "camden-faq-1",
        question: "How quickly can a technician visit my Camden property?",
        answer: "Our local Camden team is operating 24/7. We typically arrange visits within 2 to 4 hours of your call, with exact, timed appointments so you do not have to wait around."
      },
      {
        id: "camden-faq-2",
        question: "Do you offer discreet pest control for Hampstead homes?",
        answer: "Yes. All our technicians in Hampstead and the wider Camden borough operate with absolute discretion, using unmarked vehicles and carrying equipment in plain, non-branded bags."
      },
      {
        id: "camden-faq-3",
        question: "Are your treatments safe for student accommodation in Bloomsbury?",
        answer: "Absolutely. All our rodent and insect control methods comply with COSHH regulations. We use targeted, safe treatments and work with landlords and student housing managers to ensure safety for all residents."
      }
    ],
    metaTitle: "Pest Control Camden | 24/7 Professional Eradication",
    metaDescription: "Guaranteed pest control services in Camden, Hampstead, and Bloomsbury. Fast, local 24/7 response for rats, mice, bed bugs, and wasps. Call 020 7099 9269.",
    qualityScore: 90,
    lastReviewed: "2026-07-01"
  },
  {
    name: "Westminster",
    slug: "westminster",
    served: true,
    indexable: true,
    insideM25: true,
    serviceNotes: "24/7 service. Emergency rapid-response team covering Soho, Mayfair, Victoria, Marylebone, and Paddington.",
    postcodePrefixes: ["W", "SW", "NW", "WC", "EC"],
    postcodeDistricts: ["W1", "W2", "W9", "SW1", "SW3", "SW7", "NW1", "NW8", "WC2"],
    nearbyAreas: ["Mayfair", "Soho", "Belgravia", "Pimlico", "Marylebone", "Paddington", "St James's"],
    neighbouringBoroughs: ["Kensington and Chelsea", "Camden", "Wandsworth", "Lambeth", "Brent"],
    localIntro: "As the political and commercial heart of the capital, the City of Westminster contains iconic commercial districts, luxury residences, royal parks, and some of London's oldest subterranean infrastructure. The sheer density of food establishments in Soho and Covent Garden, paired with the historic fabric of properties, makes Westminster a premium service area requiring highly expert pest management.",
    propertyContext: "Westminster housing ranges from grand historic townhouses in Mayfair and Belgravia to high-rise blocks in Pimlico and Paddington. Many buildings are Grade I or II listed, meaning structural proofing must be executed using highly professional, non-destructive techniques that do not damage the heritage fabric.",
    commercialContext: "With hundreds of restaurants, theatres, hotels, and government offices, the commercial pressure is massive. We provide audit-compliant, highly discreet PPM contracts that protect valuable reputations and pass strict EHO checks in Soho, Mayfair, and Covent Garden.",
    commonPests: ["mice", "rats", "cockroaches", "bed-bugs", "pigeons"],
    faqs: [
      {
        id: "westminster-faq-1",
        question: "Can you provide emergency night treatments for Soho restaurants?",
        answer: "Yes, our technicians operate 24/7. We provide out-of-hours commercial emergency services at night to ensure your pest problems are resolved without disturbing your customers or operations."
      },
      {
        id: "westminster-faq-2",
        question: "How do you treat mice in Westminster's listed properties?",
        answer: "We use specialist, non-destructive proofing methods, sealing gaps around old radiator pipes and floor voids using copper mesh and heritage-safe sealants, avoiding damage to listed structures."
      },
      {
        id: "westminster-faq-3",
        question: "Do you install pigeon proofing on commercial building ledges?",
        answer: "Yes, we are specialists in historic bird proofing. We design and install high-grade, low-visibility bird netting and stainless steel spikes to protect Westminster's classic stone facades from bird guano damage."
      }
    ],
    metaTitle: "Pest Control Westminster | 24/7 Local Service",
    metaDescription: "Professional pest control in Westminster, Soho, and Mayfair. 24/7 rapid response for restaurants, hotels, and luxury homes. Call 020 7099 9269.",
    qualityScore: 92,
    lastReviewed: "2026-07-02"
  },
  {
    name: "Croydon",
    slug: "croydon",
    served: true,
    indexable: true,
    insideM25: true,
    serviceNotes: "24/7 response. Serving Croydon town centre, Purley, Coulsdon, Shirley, and Norbury.",
    postcodePrefixes: ["CR", "SE"],
    postcodeDistricts: ["CR0", "CR2", "CR8", "CR5", "CR7", "SE19", "SE25"],
    nearbyAreas: ["Purley", "Coulsdon", "Norbury", "Shirley", "Thornton Heath", "Addiscombe"],
    neighbouringBoroughs: ["Sutton", "Merton", "Lambeth", "Southwark", "Lewisham", "Bromley"],
    localIntro: "Croydon is one of South London's largest commercial and residential hubs, undergoing massive urban redevelopment. The borough features a mix of a high-rise retail centre, dense suburban housing, and leafy outer-fringe areas. The ongoing construction and dense railway networks provide ideal travel corridors and nesting hubs for urban pests like rats, pigeons, and foxes.",
    propertyContext: "In Croydon, properties vary from extensive Edwardian and Victorian family homes in Purley and Coulsdon to modern high-density apartments and commercial tower blocks in the town centre. Substantial lofts in suburban Croydon homes are particularly vulnerable to squirrels and wasps nests.",
    commercialContext: "Croydon's busy high street, retail parks, and office towers require robust, proactive pest defense. Warehouse spaces in industrial areas near the Purley Way face constant rodent and stored-product insect risks, which we manage with preventative contracts.",
    commonPests: ["mice", "rats", "wasps", "squirrels", "bed-bugs"],
    faqs: [
      {
        id: "croydon-faq-1",
        question: "Do you handle rat infestations in suburban Croydon gardens?",
        answer: "Yes. Our local team provides garden rodent inspections, identifying external baiting sites and locating pathways around garden offices, decking, or compost bins."
      },
      {
        id: "croydon-faq-2",
        question: "Are your wasp nest treatments in Croydon guaranteed?",
        answer: "Yes. All our wasp treatments are 100% guaranteed. If there is still active wasp flight after 24 hours, our local South London team will return and re-treat the nest free of charge."
      },
      {
        id: "croydon-faq-3",
        question: "Do you provide emergency rodent proofing in Purley?",
        answer: "Absolutely. We provide immediate call-outs to identify rodent entry points in Purley homes and can execute complete structural proofing to seal out pests."
      }
    ],
    metaTitle: "Pest Control Croydon | 24/7 South London Team",
    metaDescription: "Guaranteed pest control in Croydon, Purley, and Norbury. Local 24/7 rapid response for rats, mice, bed bugs, and wasp nests. Call 020 7099 9269.",
    qualityScore: 88,
    lastReviewed: "2026-07-03"
  },
  {
    name: "Ealing",
    slug: "ealing",
    served: true,
    indexable: true,
    insideM25: true,
    serviceNotes: "24/7 service. Fast local response for Ealing Common, Acton, Greenford, Hanwell, and Northolt.",
    postcodePrefixes: ["W", "UB", "NW"],
    postcodeDistricts: ["W5", "W13", "W3", "UB1", "UB2", "UB5", "UB6", "NW10"],
    nearbyAreas: ["Acton", "Hanwell", "Greenford", "Northolt", "Perivale", "Ealing Common"],
    neighbouringBoroughs: ["Harrow", "Brent", "Hammersmith and Fulham", "Hounslow", "Hillingdon"],
    localIntro: "Known as the 'Queen of the Suburbs', Ealing in West London is a large, leafy residential borough with significant transport hubs and busy industrial zones. The extensive parklands, canal paths, and suburban gardens provide natural habits for wildlife, while the dense Victorian terraces and retail hubs in Acton and Ealing Broadway present urban rodent and insect challenges.",
    propertyContext: "Ealing features large Edwardian and Victorian terraced houses, many converted into multiple flats, alongside modern low-rise estates. Flat conversions often have shared underfloor voids and utility conduits, allowing mice to spread rapidly from one flat to another once an infestation starts.",
    commercialContext: "Industrial and business parks in Greenford and Park Royal—one of Europe's largest industrial estates—face constant pressure from rodents and insects. We provide large-scale preventative pest contracts, insect light trap (ILT) services, and comprehensive auditing support for warehouses and logistics hubs.",
    commonPests: ["mice", "rats", "bed-bugs", "wasps", "cockroaches"],
    faqs: [
      {
        id: "ealing-faq-1",
        question: "How do you handle mice in Acton flat conversions?",
        answer: "We carry out a flat-wide inspection, locate the shared service voids where pipes enter, and execute comprehensive rodent-proofing using steel wool and heavy-duty plates to stop mouse migration."
      },
      {
        id: "ealing-faq-2",
        question: "Are your technicians in West London fully qualified?",
        answer: "Yes, all our local Ealing and West London technicians hold BPCA/RSPH Level 2 qualifications in Pest Management, ensuring professional, safe, and regulated treatments."
      },
      {
        id: "ealing-faq-3",
        question: "Do you treat bed bugs in Ealing residential homes?",
        answer: "Yes. We offer both targeted chemical insecticidal sprays and chemical-free heat treatments, designed to eradicate bed bug infestations completely from Ealing properties."
      }
    ],
    metaTitle: "Pest Control Ealing | 24/7 West London Experts",
    metaDescription: "Professional local pest control in Ealing, Acton, and Hanwell. Fast 24/7 response for rats, mice, bed bugs, and crawling insects. Call 020 7099 9269.",
    qualityScore: 89,
    lastReviewed: "2026-07-04"
  },
  {
    name: "Hackney",
    slug: "hackney",
    served: true,
    indexable: true,
    insideM25: true,
    serviceNotes: "24/7 coverage. Serving Shoreditch, Dalston, Stoke Newington, Hackney Central, and Homerton.",
    postcodePrefixes: ["E", "N", "EC"],
    postcodeDistricts: ["E8", "E9", "E5", "E2", "E20", "N16", "N1", "EC2"],
    nearbyAreas: ["Stoke Newington", "Dalston", "Shoreditch", "Clapton", "Hackney Wick", "Haggerston"],
    neighbouringBoroughs: ["Islington", "Haringey", "Waltham Forest", "Newham", "Tower Hamlets"],
    localIntro: "Hackney is a highly dense, culturally rich North-East London borough combining trendy nightlife, busy commercial streets, and diverse residential zones. Shoreditch and Dalston's active food and entertainment scene, combined with historic warehouse conversions and extensive social housing estates, creates a dynamic landscape with varied pest pressures.",
    propertyContext: "Hackney contains a large concentration of high-density housing estates, Victorian street properties, and industrial canal-side loft conversions. Canal paths and older building brickwork present serious rodent access points, which require specialized structural proofing to protect.",
    commercialContext: "Shoreditch and Dalston's high concentration of bars, restaurants, cafes, and creative co-working spaces require discreet, high-frequency pest management. We provide EHO-ready contracts and rapid night services to keep hospitality venues clean and pest-free.",
    commonPests: ["mice", "rats", "cockroaches", "bed-bugs", "flies"],
    faqs: [
      {
        id: "hackney-faq-1",
        question: "What is the most common pest in Hackney?",
        answer: "Mice are highly common due to the dense, interconnected nature of Victorian terraces and high-density blocks. Cockroaches are also frequently reported in dense commercial and residential kitchen areas."
      },
      {
        id: "hackney-faq-2",
        question: "Do you offer preventative pest contracts for Shoreditch cafes?",
        answer: "Yes. We design custom preventative maintenance (PPM) service agreements, including regular monitoring visits, emergency call-outs, and a complete on-site compliance binder for EHO reviews."
      },
      {
        id: "hackney-faq-3",
        question: "Are your treatments safe for canal-side properties in Hackney Wick?",
        answer: "Yes, we are highly conscious of environmental safety. Near canals and waterways, we use secure, non-toxic monitoring options and highly target-specific baiting methods to prevent water pollution."
      }
    ],
    metaTitle: "Pest Control Hackney | 24/7 Professional Eradication",
    metaDescription: "Guaranteed pest control in Hackney, Shoreditch, and Stoke Newington. 24/7 rapid response for mouse, rat, cockroach, and bed bug infestations. Call 020 7099 9269.",
    qualityScore: 88,
    lastReviewed: "2026-07-05"
  },
  {
    name: "Wandsworth",
    slug: "wandsworth",
    served: true,
    indexable: true,
    insideM25: true,
    serviceNotes: "24/7 availability. Covering Battersea, Balham, Tooting, Putney, Clapham Junction, and Wandsworth Town.",
    postcodePrefixes: ["SW"],
    postcodeDistricts: ["SW11", "SW12", "SW17", "SW15", "SW18", "SW8", "SW19"],
    nearbyAreas: ["Battersea", "Balham", "Tooting", "Putney", "Clapham Junction", "Southfields"],
    neighbouringBoroughs: ["Richmond upon Thames", "Merton", "Lambeth", "Westminster", "Hammersmith and Fulham"],
    localIntro: "Wandsworth in South-West London is a highly popular, densely populated residential borough running along the River Thames. It blends massive riverside redevelopments in Battersea with traditional Edwardian and Victorian terraced shopping streets in Tooting and Putney. The combination of dense retail high streets, river access, and high-density residential properties results in frequent rodent and insect challenges.",
    propertyContext: "Wandsworth housing features beautiful, large Victorian and Edwardian terraced properties, often divided into flats, alongside massive new-build riverside apartment complexes. Shared lofts, basement voids, and plumbing pipes provide pathways for mice, rats, and moths.",
    commercialContext: "Tooting's bustling food markets and high-street restaurants, alongside Battersea Power Station's premium retail outlets, require premier, audit-ready pest prevention. We provide bespoke commercial services to protect food businesses and retail spaces.",
    commonPests: ["mice", "rats", "clothes-moths", "bed-bugs", "wasps"],
    faqs: [
      {
        id: "wandsworth-faq-1",
        question: "Do you specialize in clothes moth treatments in Putney?",
        answer: "Yes. Clothes moths are a major issue in Wandsworth's high-quality period homes. We provide comprehensive insecticidal spray and ULV fogging treatments to eliminate moths and protect carpets and fabrics."
      },
      {
        id: "wandsworth-faq-2",
        question: "How do you handle rat problems near the river in Battersea?",
        answer: "Riverside areas are naturally prone to rats. We conduct thorough external checks and drainage CCTV surveys, installing robust, heavy-duty stainless steel one-way valves to stop sewer rats entering."
      },
      {
        id: "wandsworth-faq-3",
        question: "Can I book a same-day appointment in Tooting?",
        answer: "Yes. Our local South-West London team operates 24/7 and we always prioritize urgent same-day bookings for Tooting residents and businesses."
      }
    ],
    metaTitle: "Pest Control Wandsworth | 24/7 South-West London Team",
    metaDescription: "Professional pest control in Wandsworth, Battersea, and Putney. Fast 24/7 rapid response for rats, mice, bed bugs, and clothes moths. Call 020 7099 9269.",
    qualityScore: 90,
    lastReviewed: "2026-07-06"
  },
  // The remaining 27 boroughs are initialized with served: true, qualityScore: 60 (to force NOINDEX until fully drafted)
  ...[
    { name: "Barking and Dagenham", slug: "barking-and-dagenham" },
    { name: "Barnet", slug: "barnet" },
    { name: "Bexley", slug: "bexley" },
    { name: "Brent", slug: "brent" },
    { name: "Bromley", slug: "bromley" },
    { name: "City of London", slug: "city-of-london" },
    { name: "Greenwich", slug: "greenwich" },
    { name: "Hammersmith and Fulham", slug: "hammersmith-and-fulham" },
    { name: "Haringey", slug: "haringey" },
    { name: "Harrow", slug: "harrow" },
    { name: "Havering", slug: "havering" },
    { name: "Hillingdon", slug: "hillingdon" },
    { name: "Hounslow", slug: "hounslow" },
    { name: "Islington", slug: "islington" },
    { name: "Kensington and Chelsea", slug: "kensington-and-chelsea" },
    { name: "Kingston upon Thames", slug: "kingston-upon-thames" },
    { name: "Lambeth", slug: "lambeth" },
    { name: "Lewisham", slug: "lewisham" },
    { name: "Merton", slug: "merton" },
    { name: "Newham", slug: "newham" },
    { name: "Redbridge", slug: "redbridge" },
    { name: "Richmond upon Thames", slug: "richmond-upon-thames" },
    { name: "Southwark", slug: "southwark" },
    { name: "Sutton", slug: "sutton" },
    { name: "Tower Hamlets", slug: "tower-hamlets" },
    { name: "Waltham Forest", slug: "waltham-forest" },
    { name: "Westminster", slug: "westminster-draft" } // Prevent duplicate slug just in case
  ].map(b => {
    // Avoid double adding Westminster
    if (b.slug === "westminster-draft") return null;
    return {
      name: b.name,
      slug: b.slug,
      served: true,
      indexable: false, // Forces NOINDEX as quality score is below 80
      insideM25: true,
      serviceNotes: `Standard 24/7 professional pest control services in the London Borough of ${b.name}.`,
      postcodePrefixes: ["London"],
      postcodeDistricts: [],
      nearbyAreas: [],
      neighbouringBoroughs: [],
      localIntro: `We provide comprehensive professional pest management services across ${b.name}, supporting both residential households and local businesses. Our certified technicians offer discreet, fast response times to resolve all target insect and rodent infestations safely and permanently.`,
      propertyContext: `Properties in ${b.name} include a mix of period brick terrace homes, multi-story apartment flats, and newer housing estates, each presenting unique structural access vulnerabilities which our technicians are trained to identify and secure.`,
      commercialContext: `Our commercial services in ${b.name} include preventative monitoring contracts and rapid response call-outs to ensure food businesses, offices, and logistics centres comply fully with UK hygiene standards and EHO inspections.`,
      commonPests: ["mice", "rats", "bed-bugs", "cockroaches"],
      faqs: [
        {
          id: `${b.slug}-faq-1`,
          question: `Do you provide 24/7 service in ${b.name}?`,
          answer: `Yes, our certified technicians are on call 24 hours a day, 7 days a week, including weekends and bank holidays, to handle urgent pest emergencies.`
        }
      ],
      metaTitle: `Pest Control ${b.name} | Professional London Service`,
      metaDescription: `Certified professional pest control services in the London Borough of ${b.name}. Rapid 24/7 response, safe treatments, and guaranteed results. Call 020 7099 9269.`,
      qualityScore: 60, // Exclude from index,follow and sitemaps until fully curated
      lastReviewed: "2026-07-01"
    };
  }).filter(Boolean) as Borough[]
];

export const boroughsBySlug = boroughsData.reduce((acc, b) => {
  acc[b.slug] = b;
  return acc;
}, {} as Record<string, Borough>);
