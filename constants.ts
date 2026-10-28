import { PortfolioGroup, Project } from './types';

export const PORTFOLIO_GROUPS: { id: PortfolioGroup; title: string; description: string }[] = [
  { id: 'recall', title: 'Practise recall', description: 'Work on mental maths, memorise a passage, or practise number associations.' },
  { id: 'conversation', title: 'Use English in conversation', description: 'Rehearse useful phrases, then take them into a conversation with an external AI.' },
  { id: 'exploration', title: 'Explore history and philosophy', description: 'Connect events and compare ideas through guided practice and reading.' },
  { id: 'reading', title: 'Read connected research', description: 'Follow concepts, methods, and related notes through a published knowledge base.' },
];

export const PROJECT_STATUSES: Record<Project['status'], string> = {
  'Daily use': 'Part of the creator’s recurring personal practice.',
  'In validation': 'The learning workflow is being evaluated before major expansion.',
  'Stable': 'Usable in its current form, without active expansion.',
  'Consolidating': 'Existing material and learning flows are being simplified or connected.',
  'Infrastructure': 'A reference collection or system that supports other work.',
};

export const PROJECTS: Project[] = [
  {
    id: 'circuit', title: 'CIRCUIT', group: 'recall', status: 'Daily use',
    oneLiner: 'Practise two-digit multiplication and revisit the problems you miss.',
    audience: 'For learners who want focused, measurable mental-math practice.',
    fullProblem: 'Repeating random calculations does not show which multiplication pairs are slow or unreliable.',
    fullApproach: 'CIRCUIT records accuracy and response time, then makes missed or weak problems easy to practise again.',
    firstTask: 'Complete a short practice session. Check which answers were wrong or slow, then repeat the missed problems.',
    howItWorks: [{ title: 'Practise', desc: 'Choose a session and answer two-digit multiplication problems.' }, { title: 'Review', desc: 'See accuracy and response time for each problem.' }, { title: 'Repeat', desc: 'Start a review of the problems you missed.' }],
    techStack: ['React', 'Dexie.js', 'Recharts', 'Tailwind CSS'], trustNote: 'Practice history is stored in this browser. Clearing site data removes it.',
    primaryActionLabel: 'Practise multiplication',
    demoLink: 'https://circuit-gold.vercel.app/', repoLink: 'https://github.com/Josh-Temple/CIRCUIT',
    themeColor: '#BD5B5B', iconName: 'timer', variant: 'red', cardImage: '/screenshots/circuit/01_start.png',
    screenshots: [{ caption: 'Practice screen', src: '/screenshots/circuit/02_main.png' }, { caption: 'Problem results', src: '/screenshots/circuit/03_result.png' }, { caption: 'Practice statistics', src: '/screenshots/circuit/04_stats.png' }]
  },
  {
    id: 'engrave', title: 'Engrave', group: 'recall', status: 'Daily use',
    oneLiner: 'Recall passages with hidden-text practice, pronunciation guides, and optional audio.',
    audience: 'For people memorizing poems, passages, speeches, quotations, or foreign-language texts.',
    fullProblem: 'Flashcards are often designed for short facts, not for reproducing an entire passage accurately.',
    fullApproach: 'Engrave divides a text into manageable segments and supports progressive recall, readings, notes, and audio.',
    firstTask: 'Add a short passage you want to remember. Practise recalling its hidden parts, then reveal the text and rate your answer.',
    howItWorks: [{ title: 'Add a passage', desc: 'Use Quick Add to split text into segments. Add readings, notes, or audio when useful.' }, { title: 'Recall the text', desc: 'Work with progressively hidden text, then reveal it to check your answer.' }, { title: 'Review', desc: 'Rate the recall attempt and return to cards scheduled for review.' }],
    trustNote: 'Cards and review history stay in this browser. Use Settings → Download backup before changing devices or clearing site data.',
    primaryActionLabel: 'Practise a passage',
    demoLink: 'https://engrave-theta.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Engrave',
    themeColor: '#5B7A96', iconName: 'format_quote', variant: 'blue', cardImage: '/screenshots/engrave/00_card.png',
    screenshots: [{ caption: 'Library', src: '/screenshots/engrave/01_home.png' }]
  },
  {
    id: 'majoris', title: 'Majoris', group: 'recall', status: 'Daily use',
    oneLiner: 'Practise the word or image associated with each number in your 00–99 memory list.',
    audience: 'For learners using the Major System, which turns numbers into consonant sounds and then memorable words or images.',
    fullProblem: 'Having a list of number associations does not mean you can retrieve each one when you need it.',
    fullApproach: 'Majoris repeats number-recall prompts and tracks mastery, with support for custom word lists.',
    firstTask: 'Check the number-to-word list, then try a short session. Review the numbers whose words or images were slow to recall.',
    howItWorks: [{ title: 'Prepare your list', desc: 'Review the number-to-word associations or import a custom list.' }, { title: 'Practise recall', desc: 'Choose a session length or use endless mode to keep practising.' }, { title: 'Review progress', desc: 'Use mastery statistics to check which associations need more practice.' }],
    trustNote: 'Your number list and progress are stored in this browser. Use import/export to back them up or move them to another device.',
    primaryActionLabel: 'Practise number recall',
    demoLink: 'https://majoris.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Majoris',
    themeColor: '#DCA258', iconName: 'pin', variant: 'yellow', cardImage: '/screenshots/majoris/00_card.png',
    screenshots: [{ caption: 'Training home', src: '/screenshots/majoris/01_home.png' }]
  },
  {
    id: 'parla', title: 'Parla', group: 'conversation', status: 'In validation',
    oneLiner: 'Rehearse English phrases for asking an AI to explain, simplify, or correct what it says.',
    audience: 'For English learners who can study phrases but struggle to use them during an actual conversation.',
    fullProblem: 'Learners often recognize useful expressions but cannot retrieve them when a conversation slows down or becomes difficult.',
    fullApproach: 'Parla combines focused phrase recall with prompts that help learners move into a real conversation using an external AI tool.',
    firstTask: 'Choose a Practice Set, rehearse its phrases, then copy a prompt from Use with AI into your preferred AI app. Try using one phrase in that conversation.',
    howItWorks: [{ title: 'Rehearse a phrase', desc: 'Read the prompt, recall the English phrase, reveal it, and rate your answer.' }, { title: 'Use it with AI', desc: 'Copy a practice prompt into an external AI app and try the phrases in conversation.' }, { title: 'Return to review', desc: 'Revisit phrases that were hard to recall or use.' }],
    trustNote: 'Conversation takes place in a separate AI app. Parla provides phrase practice and copyable prompts.',
    primaryActionLabel: 'Practise English phrases',
    demoLink: 'https://parla-teal.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Parla',
    themeColor: '#BD5B5B', iconName: 'forum', variant: 'red', cardImage: '/screenshots/parla/00_card.png',
    screenshots: [{ caption: 'Practice home', src: '/screenshots/parla/01_home.png' }]
  },
  {
    id: 'world-history-lab', title: 'World History Lab', group: 'exploration', status: 'Consolidating',
    oneLiner: 'Connect historical events through timelines, causal sequences, and comparison.',
    audience: 'For learners who want to understand how historical events connect rather than memorize disconnected dates.',
    fullProblem: 'World-history learning often separates chronology, causality, comparison, sources, and argument into disconnected exercises.',
    fullApproach: 'World History Lab brings multiple learning modes together around shared historical content and review data.',
    firstTask: 'Choose a unit and start a guided session. After practising, revisit one event relationship you found difficult.',
    howItWorks: [{ title: 'Choose a unit', desc: 'Start with a topic and its core material.' }, { title: 'Follow a guided session', desc: 'Practise chronology, sequences, causes, and comparison where the unit supports them.' }, { title: 'Explore a connection', desc: 'Return to an event or switch practice modes to examine it from another angle.' }],
    trustNote: 'Available practice modes depend on the material in each unit. Content and learning flows are still being consolidated.',
    primaryActionLabel: 'Explore world history',
    demoLink: 'https://world-history-lab.vercel.app/', repoLink: 'https://github.com/Josh-Temple/world-history-lab',
    themeColor: '#5B7A96', iconName: 'public', variant: 'blue', cardImage: '/screenshots/world-history-lab/00_card.png',
    screenshots: [{ caption: 'Learning dashboard', src: '/screenshots/world-history-lab/01_home.png' }]
  },
  {
    id: 'noema', title: 'Noema', group: 'exploration', status: 'Stable',
    oneLiner: 'Explore philosophical questions by comparing thinkers and following themed reading paths.',
    audience: 'For learners who find isolated philosopher summaries difficult to connect.',
    fullProblem: 'Lists of philosophers and doctrines do not make disagreements, influences, and conceptual differences easy to understand.',
    fullApproach: 'Noema uses comparisons and thematic connections as the main route into philosophical ideas.',
    firstTask: 'Open a comparison about freedom or human nature. Read both positions, then describe one disagreement in your own words.',
    howItWorks: [{ title: 'Choose a question', desc: 'Start from a theme, recommended comparison, or search.' }, { title: 'Compare two positions', desc: 'Read the thinkers side by side and use the optional understanding check.' }, { title: 'Keep a reading path', desc: 'Follow related thinkers or save an item to revisit from your study shelf.' }],
    trustNote: 'Saved items and recent reading are kept in this browser.',
    primaryActionLabel: 'Compare philosophical ideas',
    demoLink: 'https://noema-mu.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Noema',
    themeColor: '#DCA258', iconName: 'account_tree', variant: 'yellow', cardImage: '/screenshots/noema/00_card.png',
    screenshots: [{ caption: 'Home', src: '/screenshots/noema/01_home.png' }]
  },
  {
    id: 'lumen-commonplace', title: 'Lumen', group: 'reading', status: 'Infrastructure',
    oneLiner: 'Read connected research notes, concepts, and methods in a searchable knowledge base.',
    audience: 'For readers who want to follow an idea across explanations, methods, and related notes.',
    fullProblem: 'An isolated note can explain one idea while leaving its links to related concepts and methods hard to follow.',
    fullApproach: 'Lumen presents a published collection of linked pages, with topic indexes, search, and adjustable reading text.',
    firstTask: 'Open a topic index, choose one concept, and follow a related-page link to see how it connects to another idea.',
    howItWorks: [{ title: 'Find a topic', desc: 'Browse theme indexes or search page titles, summaries, and tags.' }, { title: 'Read a page', desc: 'Read an explanation or method and adjust the text size when needed.' }, { title: 'Follow the links', desc: 'Move between related concepts and notes using links within the collection.' }],
    trustNote: 'This is a published reading collection. Adding your own notes requires a separate setup.',
    primaryActionLabel: 'Read the knowledge base',
    demoLink: 'https://commonplace-sable.vercel.app/', repoLink: 'https://github.com/Josh-Temple/Commonplace',
    themeColor: '#5B7A96', iconName: 'hub', variant: 'blue', cardImage: '/screenshots/lumen-commonplace/00_card.png',
    screenshots: [{ caption: 'Knowledge base home', src: '/screenshots/lumen-commonplace/01_home.png' }]
  }
];
