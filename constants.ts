import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'irogenix',
    title: 'Irogenix',
    problem: 'Manual palette creation is slow.',
    approach: 'AI-driven role generation.',
    status: 'v1.2 Live',
    updatedAt: 'Updated Oct 2024',
    themeColor: '#2D3436', // 深い木炭色
    iconName: 'grid_view',
    label: 'Engine',
    variant: 'blue',
    category: 'Tool',
    year: '2024',
    role: 'Solo Dev',
    tools: 'React, AI',
    timeline: '2 Weeks',
    
    oneLiner: 'Role-based UI palette synthesizer. Turning abstract text into functional tokens.',
    demoLink: '#',
    trustNote: 'Client-side processing. No data leaks.',
    
    fullProblem: 'Designing semantic color systems is usually a manual, error-prone process. Irogenix treats UI color as a logic problem, not just an aesthetic one.',
    fullApproach: 'Using constraint-based AI to map descriptive prompts to strict functional roles like bg-base, text-primary, and border-muted.',
    fullOutcome: 'Instant, accessible, and code-ready color systems for rapid prototyping.',
    
    howItWorks: [
      { title: 'Input', desc: 'Type a prompt or drop an image.' },
      { title: 'Process', desc: 'AI extracts dominant hues and maps them to semantic roles.' },
      { title: 'Export', desc: 'Copy CSS variables or Tailwind config.' }
    ],
    
    techStack: ['React 19', 'Vite', 'Gemini API', 'Tailwind CSS'],
    repoLink: '#',
    
    screenshots: [
      { caption: 'Palette Synthesizer' },
      { caption: 'Contrast Validation' },
      { caption: 'Code Export' }
    ]
  },
  {
    id: 'circuit',
    title: 'CIRCUIT',
    problem: 'Mental math practice lacks intensity.',
    approach: 'Motorsport-themed arithmetic trainer.',
    status: 'v1.0 Live',
    updatedAt: 'New Arrival',
    themeColor: '#BD5B5B', // マットな赤
    iconName: 'timer',
    label: 'Racer',
    variant: 'red',
    category: 'App',
    year: '2024',
    role: 'Lead Developer',
    tools: 'React, Dexie.js',
    timeline: '4 Weeks',
    
    oneLiner: 'High-performance arithmetic training for precision and speed.',
    demoLink: '#',
    trustNote: 'IndexedDB telemetry storage.',
    
    fullProblem: 'Learning mental math often feels static. CIRCUIT transforms calculation into a high-stakes, reactive telemetry experience.',
    fullApproach: 'Engineered with a custom Spaced Repetition System that targets weaknesses through EMA (Exponential Moving Average) speed tracking.',
    fullOutcome: 'Measurable improvement in mental calculation speed and accuracy through iterative racing cycles.',
    
    howItWorks: [
      { title: 'The Grid', desc: 'Choose your training circuit.' },
      { title: 'The Lap', desc: 'Solve rapid-fire problems with zero latency.' },
      { title: 'Telemetry', desc: 'Review performance charts and identify engine bottlenecks.' }
    ],
    
    techStack: ['React', 'Dexie.js', 'Recharts', 'Tailwind CSS'],
    repoLink: '#',
    
    screenshots: [
      { caption: 'Cockpit View' },
      { caption: 'Telemetry Dashboard' },
      { caption: 'Engine Mapping' }
    ]
  },
  {
    id: 'fragmenta',
    title: 'Fragmenta',
    problem: 'UI motion implementation is often inconsistent.',
    approach: 'Developer-centric library for engineered motion.',
    status: 'In Beta',
    updatedAt: 'Coming Soon',
    themeColor: '#CD853F', // オークル（黄土色）
    iconName: 'deployed_code',
    label: 'Motion',
    variant: 'yellow',
    category: 'Tool',
    year: '2024',
    role: 'Lead Developer',
    tools: 'React 19, Tailwind',
    timeline: 'Ongoing',
    
    oneLiner: 'Copy-ready UI micro-interactions with engineered motion physics.',
    demoLink: '#',
    trustNote: 'Motion-prefers-reduced support.',
    
    fullProblem: 'Good motion is hard to bridge from design to code. Fragmenta provides pre-tuned physics for consistent UI feedback.',
    fullApproach: 'A catalog of interactions focused on "ink-on-paper" tactility and high-performance CSS orchestration.',
    fullOutcome: 'Professional-grade interaction design for developers without motion fatigue.',
    
    howItWorks: [
      { title: 'Browse', desc: 'Select from categorized interaction patterns.' },
      { title: 'Tune', desc: 'Adjust physics parameters in real-time.' },
      { title: 'Export', desc: 'Copy optimized code blocks.' }
    ],
    
    techStack: ['React 19', 'Tailwind CSS', 'CSS Variables'],
    repoLink: '#',
    
    screenshots: [
      { caption: 'Motion Catalog' },
      { caption: 'Physics Playground' },
      { caption: 'Prompt Generator' }
    ]
  }
];