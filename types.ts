export interface Project {
  id: string;
  title: string;
  problem: string;
  approach: string;
  status: string;
  
  // Visual properties
  themeColor: string; // Hex code or tailwind class
  iconName: string;   // Material Icon name
  label: string;      // Short label inside the card (e.g. "PALETTE")
  
  // For specific decoration rendering logic
  variant: 'blue' | 'yellow' | 'red';

  // Detail View properties
  category?: string;
  year?: string;
  role?: string;
  tools?: string;
  timeline?: string;
  
  // New App Detail Fields
  oneLiner?: string;
  updatedAt?: string;
  demoLink?: string;
  trustNote?: string;
  
  fullProblem?: string;
  fullApproach?: string; // Mapped to Mechanism
  fullOutcome?: string;  // Mapped to Proof
  
  howItWorks?: { title: string; desc: string }[];
  techStack?: string[];
  repoLink?: string;
  
  cardImage?: string;
  screenshots?: { caption: string; src?: string }[];
}
