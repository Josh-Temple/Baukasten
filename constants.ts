import { PortfolioGroup, Project } from './types';

export const PORTFOLIO_GROUPS: { id: PortfolioGroup; title: string; description: string }[] = [
  { id: 'daily-use', title: 'Tools I use regularly', description: 'Tools built around recurring problems in my own learning practice.' },
  { id: 'validation', title: 'Currently validating', description: 'Products being tested with real users before major features are added.' },
  { id: 'learning-systems', title: 'Learning systems', description: 'Larger environments for understanding relationships, causes, and ideas.' },
  { id: 'infrastructure', title: 'Knowledge infrastructure', description: 'Systems for turning research into connected, reusable knowledge.' },
];

export const PROJECTS: Project[] = [
  {
    id: 'circuit', title: 'CIRCUIT', group: 'daily-use', status: 'Daily use',
    oneLiner: 'Train two-digit multiplication for speed and accuracy, with problem-level review of weak spots.',
    audience: 'For learners who want focused, measurable mental-math practice.',
    fullProblem: 'Repeating random calculations does not show which multiplication pairs are slow or unreliable.',
    fullApproach: 'CIRCUIT records accuracy and response time, then makes missed or weak problems easy to practise again.',
    howItWorks: [{ title: 'Practise', desc: 'Work through focused two-digit multiplication problems.' }, { title: 'Review', desc: 'See accuracy and response time at problem level.' }, { title: 'Repeat', desc: 'Return to missed or weak problems.' }],
    techStack: ['React', 'Dexie.js', 'Recharts', 'Tailwind CSS'], trustNote: 'Practice data is stored in the browser.',
    demoLink: 'https://circuit-gold.vercel.app/', repoLink: 'https://github.com/Josh-Temple/CIRCUIT',
    themeColor: '#BD5B5B', iconName: 'timer', variant: 'red', cardImage: '/screenshots/circuit/01_start.png',
    screenshots: [{ caption: 'Practice screen', src: '/screenshots/circuit/02_main.png' }, { caption: 'Problem results', src: '/screenshots/circuit/03_result.png' }, { caption: 'Practice statistics', src: '/screenshots/circuit/04_stats.png' }]
  },
  {
    id: 'engrave', title: 'Engrave', group: 'daily-use', status: 'Daily use',
    oneLiner: 'Memorize texts word for word by splitting them into recallable segments and combining them with readings, notes, and audio.',
    audience: 'For people memorizing poems, passages, speeches, quotations, or foreign-language texts.',
    fullProblem: 'Flashcards are often designed for short facts, not for reproducing an entire passage accurately.',
    fullApproach: 'Engrave divides a text into manageable segments and supports progressive recall, readings, notes, and audio.',
    demoLink: 'https://engrave-theta.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Engrave',
    themeColor: '#5B7A96', iconName: 'format_quote', variant: 'blue', cardImage: '/screenshots/engrave/01_home.png',
    screenshots: [{ caption: 'Library', src: '/screenshots/engrave/01_home.png' }]
  },
  {
    id: 'majoris', title: 'Majoris', group: 'daily-use', status: 'Daily use',
    oneLiner: 'Build fast 00–99 peg recall for the Major System in short, focused sessions.',
    audience: 'For memory-system practitioners who need reliable number-to-image recall.',
    fullProblem: 'Knowing a Major System peg list is not the same as recalling every peg quickly and automatically.',
    fullApproach: 'Majoris provides minimal, repeated retrieval practice with progress tracking and custom peg-list support.',
    demoLink: 'https://majoris.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Majoris',
    themeColor: '#DCA258', iconName: 'pin', variant: 'yellow', cardImage: '/screenshots/majoris/01_home.png',
    screenshots: [{ caption: 'Training home', src: '/screenshots/majoris/01_home.png' }]
  },
  {
    id: 'parla', title: 'Parla', group: 'validation', status: 'In validation',
    oneLiner: 'Practise small phrases, then carry them into a real conversation with an external AI.',
    audience: 'For English learners who can study phrases but struggle to use them during an actual conversation.',
    fullProblem: 'Learners often recognize useful expressions but cannot retrieve them when a conversation slows down or becomes difficult.',
    fullApproach: 'Parla combines focused phrase recall with prompts that help learners move into a real conversation using an external AI tool.',
    demoLink: 'https://parla-teal.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Parla',
    themeColor: '#BD5B5B', iconName: 'forum', variant: 'red', cardImage: '/screenshots/parla/01_home.png',
    screenshots: [{ caption: 'Practice home', src: '/screenshots/parla/01_home.png' }]
  },
  {
    id: 'world-history-lab', title: 'World History Lab', group: 'learning-systems', status: 'Consolidating',
    oneLiner: 'Learn world history through timelines, causality, comparison, sources, and argument—not isolated facts.',
    audience: 'For learners who want to understand how historical events connect rather than memorize disconnected dates.',
    fullProblem: 'World-history learning often separates chronology, causality, comparison, sources, and argument into disconnected exercises.',
    fullApproach: 'World History Lab brings multiple learning modes together around shared historical content and review data.',
    demoLink: 'https://world-history-lab.vercel.app/', repoLink: 'https://github.com/Josh-Temple/world-history-lab',
    themeColor: '#5B7A96', iconName: 'public', variant: 'blue', cardImage: '/screenshots/world-history-lab/01_home.png',
    screenshots: [{ caption: 'Learning dashboard', src: '/screenshots/world-history-lab/01_home.png' }]
  },
  {
    id: 'noema', title: 'Noema', group: 'learning-systems', status: 'Stable',
    oneLiner: 'Understand philosophy by comparing thinkers, concepts, and the differences between them.',
    audience: 'For learners who find isolated philosopher summaries difficult to connect.',
    fullProblem: 'Lists of philosophers and doctrines do not make disagreements, influences, and conceptual differences easy to understand.',
    fullApproach: 'Noema uses comparisons and thematic connections as the main route into philosophical ideas.',
    demoLink: 'https://noema-mu.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Noema',
    themeColor: '#DCA258', iconName: 'account_tree', variant: 'yellow', cardImage: '/screenshots/noema/01_home.png',
    screenshots: [{ caption: 'Home', src: '/screenshots/noema/01_home.png' }]
  },
  {
    id: 'lumen-commonplace', title: 'Lumen / Commonplace', group: 'infrastructure', status: 'Infrastructure',
    oneLiner: 'Turn research notes into a connected, source-aware knowledge base for reading and publishing.',
    audience: 'For researchers and writers who need to connect concepts, methods, rules, sources, and working notes.',
    fullProblem: 'Research results become difficult to reuse when notes, sources, concepts, and finished explanations remain separated.',
    fullApproach: 'Lumen organizes Markdown-based knowledge into linked concepts, methods, sources, indexes, and reader-facing pages.',
    demoLink: 'https://commonplace-sable.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Commonplace',
    themeColor: '#5B7A96', iconName: 'hub', variant: 'blue', cardImage: '/screenshots/lumen-commonplace/01_home.png',
    screenshots: [{ caption: 'Knowledge base home', src: '/screenshots/lumen-commonplace/01_home.png' }]
  }
];
