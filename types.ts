export type PortfolioGroup =
  | 'daily-use'
  | 'validation'
  | 'learning-systems'
  | 'infrastructure';

export interface Project {
  id: string;
  title: string;
  group: PortfolioGroup;
  status: 'Daily use' | 'In validation' | 'Stable' | 'Consolidating' | 'Infrastructure';
  oneLiner: string;
  audience: string;
  fullProblem: string;
  fullApproach: string;
  howItWorks?: { title: string; desc: string }[];
  techStack?: string[];
  trustNote?: string;
  demoLink?: string;
  repoLink?: string;
  primaryActionLabel?: string;
  themeColor: string;
  iconName: string;
  variant: 'blue' | 'yellow' | 'red';
  cardImage?: string;
  screenshots?: { caption: string; src: string }[];
}
