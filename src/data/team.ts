import { TeamMember } from '../types';

export const teamData: TeamMember[] = [
  {
    id: "team-1",
    name: "David Miller",
    role: "Senior Field Biologist & Technical Lead",
    qualifications: [
      "RSPH Level 2 Award in Pest Management",
      "BPCA Certified Advanced Field Biologist",
      "BSc (Hons) in Zoology & Environmental Biology",
      "SafeContractor Health & Safety Accredited"
    ],
    bio: "David has over 15 years of field experience in professional urban pest management across London. He specializes in large-scale commercial insect eradication, block-wide rodent proofing, and complex structural pest investigations.",
    yearsOfExperience: 15,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "team-2",
    name: "Marcus Thorne",
    role: "Senior Pest Control Specialist",
    qualifications: [
      "RSPH Level 2 Award in Pest Management",
      "NPTA Certified Pest Technician",
      "CCTV Drain Inspection Operator Certification",
      "PASMA & IPAF Certified (Rope & Platform Access)"
    ],
    bio: "Marcus is our specialist in bird control and rodent drainage investigations. With over a decade of practical experience, he is a leading expert in designing and installing high-grade bird netting, spike systems, and stainless steel sewer rat valves.",
    yearsOfExperience: 12,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop"
  }
];
