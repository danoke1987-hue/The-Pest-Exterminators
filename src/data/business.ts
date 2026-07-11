import { BusinessDetails } from '../types';

export const businessDetails: BusinessDetails = {
  name: "The Pest Exterminators",
  domain: "www.thepestexterminators.co.uk",
  telephone: "020 7099 9269",
  email: "info@thepestexterminators.co.uk",
  address: "East Lane Business Park, Office 100, 15 Main Dr, Wembley, London HA9 7NA",
  operatingArea: "London and surrounds (inside and around the M25)",
  hours: "24/7 (Emergency Service Available)",
  emergency: true,
  googleBusinessProfileUrl: "https://www.google.com/search?q=The+Pest+Exterminators&stick=H4sIAAAAAAAA_-NgU1I1qLBIS7U0SUlJNLU0NUlJtDC2MqiwTE00TUxNSkm1NE6zMLRMW8QqFpKRqhCQWlyi4FpRklqUm5mXWJJfVAwAqwa_C0IAAAA&hl=en-GB&mat=CcbBRNQJr4BTElYBTVDHnnm2DN5Ew9XPnctbuizrFHGqPAO8KZ3BEdZkTZpcyTUAgTN4SFybgnUdpLHi42mj_OWIaOgLaZ535urn-iqpXLkAZh-9waht1RKFUXZvSnWpQw&authuser=0&sei=g_xEaoTGBrmFhbIP7oSokQQ&pli=1",
  bpcaMember: true,
  nptaMember: true,
  qualifications: [
    "RSPH Level 2 Award in Pest Management",
    "BPCA Certified Technicians",
    "SafeContractor Approved",
    "CEPA Certified (EN 16636)",
    "RAMS (Risk Assessment & Method Statements) Compliant"
  ],
  insuranceStatement: "Fully insured with £10 million Public Liability and Employers' Liability insurance specifically for professional pest management operations, underwritten by leading A-rated UK insurers.",
  guaranteeStatement: "100% Eradication Guarantee: We offer up to a 3-month guarantee on target insect and rodent treatments, incorporating free follow-up visits if re-infestation occurs within the guarantee window.",
  yearsOfExperience: 15, // Established in 2011, providing 15 years of expert experience
  brandColors: {
    primary: "#0f172a", // Deep slate blue
    secondary: "#1d4ed8" // Royal blue
  },
  preferredTone: "professional, calm, authoritative, local, discreet and straightforward",
  language: "British English",
  currency: "GBP"
};
