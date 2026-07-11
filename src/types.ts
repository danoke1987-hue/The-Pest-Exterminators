export interface BusinessDetails {
  name: string;
  domain: string;
  telephone: string;
  email: string;
  address: string;
  operatingArea: string;
  hours: string;
  emergency: boolean;
  googleBusinessProfileUrl: string;
  bpcaMember: boolean;
  nptaMember: boolean;
  qualifications: string[];
  insuranceStatement: string;
  guaranteeStatement: string;
  yearsOfExperience: number;
  brandColors: {
    primary: string;
    secondary: string;
  };
  preferredTone: string;
  language: string;
  currency: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google' | 'Trustpilot' | 'Direct';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualifications: string[];
  bio: string;
  yearsOfExperience: number;
  image: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  process: string[];
  residentialInfo?: string;
  commercialInfo?: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Pest {
  name: string;
  slug: string;
  category: 'Rodents' | 'Insects' | 'Flying Insects' | 'Birds & Wildlife' | 'Specialist';
  shortDescription: string;
  fullIntroduction: string;
  signsOfInfestation: string[];
  commonCauses: string[];
  propertyRisks: string[];
  healthOrBusinessRisks: string[];
  inspectionProcess: string[];
  availableTreatmentApproaches: string[];
  preparationGuidance: string[];
  aftercare: string[];
  preventionAndProofing: string[];
  residentialInformation: string;
  commercialInformation: string;
  seasonalInformation: string;
  LondonSpecificContext: string;
  relatedPests: string[]; // Slugs of other pests
  relevantServices: string[]; // Slugs of services
  FAQs: FAQ[];
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  indexable: boolean;
  lastReviewed: string;
  reviewedBy: string;
}

export interface Borough {
  name: string;
  slug: string;
  served: boolean;
  indexable: boolean;
  insideM25: boolean;
  serviceNotes: string;
  postcodePrefixes: string[];
  postcodeDistricts: string[];
  nearbyAreas: string[];
  neighbouringBoroughs: string[];
  localIntro: string;
  propertyContext: string;
  commercialContext: string;
  commonPests: string[];
  faqs: FAQ[];
  metaTitle: string;
  metaDescription: string;
  qualityScore: number;
  lastReviewed: string;
}

export interface Area {
  name: string;
  slug: string;
  boroughSlug: string;
  boroughName: string;
  postcodeDistricts: string[];
  served: boolean;
  indexable: boolean;
  localIntro: string;
  metaTitle: string;
  metaDescription: string;
  qualityScore: number;
}

export interface PostcodePrefix {
  prefix: string; // E.g., 'NW'
  name: string; // E.g., 'North West London'
  served: boolean;
  indexable: boolean;
  postcodeDistricts: string[];
  boroughs: string[];
  localIntro: string;
  metaTitle: string;
  metaDescription: string;
  qualityScore: number;
}

export interface PostcodeDistrict {
  district: string; // E.g., 'NW1'
  prefix: string; // E.g., 'NW'
  served: boolean;
  indexable: boolean;
  boroughName: string;
  areas: string[];
  localIntro: string;
  metaTitle: string;
  metaDescription: string;
  qualityScore: number;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string; // Markdown or rich HTML
  author: string;
  reviewer: string;
  publishedDate: string;
  lastReviewed: string;
  image: string;
  imageAlt: string;
  relatedPests: string[];
  relatedServices: string[];
  metaTitle: string;
  metaDescription: string;
}
