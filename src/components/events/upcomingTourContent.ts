import type { TourPoint } from './pastTourContent';

export interface UpcomingTourContent {
  seoTitle: string;
  metaDescription: string;
  tagline: string;
  intro: string;
  journey: { heading: string; copy: string; chapters: { slug?: string; year: string; heading: string; points: string[] }[] };
  about: string;
  why: { heading: string; copy: string; points: TourPoint[] };
  services: TourPoint[];
  audience: TourPoint[];
  meet: string;
  discussion: string[];
  relatedSlugs: string[];
  finalHeading: string;
  finalCopy: string;
}

const whyPoints = (delivery = 'Global Delivery'): TourPoint[] => [
  { title: 'AI & Technology', description: 'Connecting with organisations developing AI-powered products, platforms and emerging technologies.' },
  { title: 'Education & EdTech', description: 'Exploring requirements around digital learning, assessments and educational content.' },
  { title: 'Multilingual AI', description: 'Discussing language-specific datasets, speech, voice and specialist human expertise.' },
  { title: delivery, description: 'Exploring scalable delivery models for complex AI data and learning-content programmes.' },
];
const services = (japan = false): TourPoint[] => [
  { title: 'AI Data Collection', description: 'Text, speech, image, video and multimodal datasets for AI development.', href: '/ai-data-services/data-collection' },
  { title: 'Annotation & Labelling', description: 'Human-reviewed annotation, classification and validation workflows.', href: '/ai-data-services/annotation-labeling' },
  { title: 'LLM & Human Feedback', description: 'SFT, RLHF, preference data and expert AI-response evaluation.', href: '/ai-data-services/annotation-labeling/llm-rlhf-annotation' },
  { title: japan ? 'Japanese & Multilingual AI Data' : 'Multilingual AI Data', description: japan ? 'Japanese and multilingual text, speech, voice and multimodal data for global AI systems.' : 'Text, speech, voice and multimodal datasets supporting global AI systems.', href: '/ai-data-services/data-collection' },
  { title: 'Speech & Voice Data', description: 'Speech collection, transcription, validation and multilingual voice datasets.', href: '/ai-data-services/data-collection' },
  { title: 'Learning & Content Solutions', description: 'Curriculum, assessments, question banks and scalable digital learning content.', href: '/learning-solutions' },
];
const audience: TourPoint[] = [
  { title: 'AI & Machine Learning Companies', description: 'Teams developing AI models, products and intelligent applications.' },
  { title: 'Technology Companies', description: 'Organisations exploring scalable data and specialist delivery.' },
  { title: 'EdTech Organisations', description: 'Companies developing digital learning platforms and education technology.' },
  { title: 'Research & Innovation Teams', description: 'Teams working on emerging AI, language and technology applications.' },
  { title: 'Learning Platforms & Publishers', description: 'Organisations requiring educational and digital content.' },
  { title: 'Enterprise AI Teams', description: 'Businesses developing or deploying AI solutions at scale.' },
];
const discussion = ['AI Data', 'LLM Evaluation', 'Multilingual Data', 'Speech & Voice', 'Learning Content', 'Global Delivery'];

export const upcomingTourContent: Record<string, UpcomingTourContent> = {
  'china-tour-2026': {
    seoTitle: 'China Business Tour 2026 | Meet eQOURSE in China',
    metaDescription: 'Connect with eQOURSE during our China Business Tour 2026. Explore our China journey and collaboration across AI data, multilingual solutions, human feedback and learning content.',
    tagline: 'Continuing our journey across China’s AI, technology and education ecosystem.',
    intro: 'eQOURSE is planning further engagement in China in 2026, building on previous visits and connecting with organisations across AI data, multilingual solutions, technology, education and digital content. Dates and meeting locations will be shared when confirmed.',
    journey: {
      heading: 'Our Journey in China',
      copy: 'Explore our documented China business tour pages and the next planned chapter. Earlier visits are linked below with their published galleries and stories.',
      chapters: [
        { slug: 'china-tour-2024', year: '2024', heading: 'Building Our Connections', points: ['Business engagement', 'Industry discussions', 'Market exploration', 'New connections'] },
        { slug: 'china-tour-july-2026', year: 'July 2026', heading: 'Continuing the Conversation', points: ['Business engagement', 'Regional understanding', 'Industry conversations', 'Future collaboration'] },
        { year: '2026', heading: 'Next Planned Engagement', points: ['New conversations', 'Project discussions', 'Multilingual AI', 'Global collaboration'] },
      ],
    },
    about: 'Building on our previous China engagement, this planned tour brings eQOURSE closer to organisations working across AI, technology, education and digital innovation. We aim to understand project requirements, quality expectations and delivery needs through direct conversations.',
    why: { heading: 'Strengthening Our Connections in China', copy: 'Our next China visit focuses on continued engagement and opportunities for meaningful collaboration.', points: whyPoints() },
    services: services(), audience,
    meet: 'Have an AI data, multilingual, human-feedback or learning-content requirement? Meet the eQOURSE team in China to discuss your project, quality expectations, delivery needs and potential collaboration.',
    discussion, relatedSlugs: ['china-tour-2024', 'china-tour-july-2026', 'taiwan-tour-2026', 'japan-tour-2026', 'singapore-tour-2026'],
    finalHeading: 'Let’s Meet in China',
    finalCopy: 'Connect with eQOURSE during our planned China Business Tour 2026 to explore opportunities across AI data, multilingual solutions, human feedback, technology and learning content.',
  },
  'singapore-tour-2026': {
    seoTitle: 'Singapore Business Tour 2026 | Meet eQOURSE in Singapore',
    metaDescription: 'Connect with eQOURSE during our Singapore Business Tour 2026 and explore opportunities across AI data, multilingual solutions, human feedback, learning content and scalable global delivery.',
    tagline: 'Continuing our journey across Singapore’s AI, technology, education and innovation ecosystem.',
    intro: 'eQOURSE is returning to Singapore in 2026 to continue building relationships, engage with organisations and industry professionals, and explore new opportunities across AI data, multilingual solutions, technology, education and digital content.',
    journey: { heading: 'Our Journey in Singapore', copy: 'From building connections in 2024 to returning in 2026, each visit is another step in strengthening relationships and exploring collaboration.', chapters: [
      { slug: 'singapore-tour-2024', year: '2024', heading: 'Building Our Connections', points: ['Business engagement', 'Industry discussions', 'Market exploration', 'New connections'] },
      { year: '2026', heading: 'Continuing Our Journey', points: ['Continued engagement', 'New conversations', 'Regional understanding', 'Collaboration opportunities'] },
    ] },
    about: 'Building on our previous engagement in Singapore, the 2026 business tour brings eQOURSE closer to organisations across AI, technology, education and digital innovation. Through direct conversations, our team aims to understand project requirements, quality expectations and delivery needs.',
    why: { heading: 'Strengthening Our Connections in Singapore', copy: 'Our 2026 visit focuses on continuing conversations, developing relationships and exploring opportunities across one of Asia’s key business and technology markets.', points: whyPoints('Regional & Global Delivery') },
    services: services(), audience,
    meet: 'Have an AI data, multilingual, human-feedback or learning-content requirement? Meet the eQOURSE team in Singapore to discuss your project, quality expectations, delivery requirements and potential areas of collaboration.',
    discussion, relatedSlugs: ['singapore-tour-2024', 'china-tour-2026', 'taiwan-tour-2026', 'japan-tour-2026', 'south-korea-tour-2026'],
    finalHeading: 'Let’s Meet in Singapore',
    finalCopy: 'Connect with eQOURSE during our Singapore Business Tour 2026 and explore opportunities across AI data, multilingual solutions, human feedback, technology and learning content.',
  },
  'japan-tour-2026': {
    seoTitle: 'Japan Business Tour 2026 | Meet eQOURSE in Tokyo',
    metaDescription: 'Connect with eQOURSE during our Japan Business Tour 2026 in Tokyo and explore opportunities across AI data, multilingual solutions, human feedback and learning content.',
    tagline: 'Connecting with Japan’s AI, technology, education and innovation ecosystem.',
    intro: 'eQOURSE is planning its 2026 Japan Business Tour in Tokyo to connect with businesses and industry professionals, understand emerging requirements and explore opportunities across AI data, multilingual solutions, technology, education and digital content.',
    journey: { heading: 'Our Journey in Japan', copy: 'The 2026 business tour is the beginning of our documented Japan journey, focused on meaningful connections and local requirements.', chapters: [
      { year: '2026', heading: 'Building Our Connections', points: ['Business engagement', 'Industry conversations', 'Market exploration', 'New connections'] },
    ] },
    about: 'Our planned Japan tour brings eQOURSE closer to organisations working across AI data, technology, education and digital content. Through direct conversations in Tokyo, our team aims to understand project requirements, quality expectations and delivery needs.',
    why: { heading: 'Connecting with Japan’s Innovation Ecosystem', copy: 'Our Japan tour focuses on conversations with organisations working across AI, technology, education and digital innovation.', points: whyPoints() },
    services: services(true), audience,
    meet: 'Have an AI data, multilingual, human-feedback or learning-content requirement? Meet the eQOURSE team in Tokyo to discuss your project, quality expectations, delivery requirements and potential areas of collaboration.',
    discussion: ['AI Data', 'LLM Evaluation', 'Japanese & Multilingual Data', 'Speech & Voice', 'Learning Content', 'Global Delivery'],
    relatedSlugs: ['china-tour-2026', 'taiwan-tour-2026', 'south-korea-tour-2026', 'singapore-tour-2026', 'singapore-tour-2024'],
    finalHeading: 'Let’s Meet in Tokyo',
    finalCopy: 'Connect with eQOURSE during our Japan Business Tour 2026 and explore opportunities across AI data, Japanese and multilingual solutions, human feedback, technology and learning content.',
  },
  'taiwan-tour-2026': {
    seoTitle: 'Taiwan Business Tour 2026 | Meet eQOURSE in Taiwan',
    metaDescription: 'Connect with eQOURSE during our Taiwan Business Tour 2026 and explore collaboration opportunities across AI data, multilingual solutions, human feedback, technology and learning content.',
    tagline: 'Connecting with Taiwan’s AI, technology, education and innovation ecosystem.',
    intro: 'eQOURSE is expanding its engagement across Taiwan in 2026, connecting with businesses and industry professionals to understand emerging requirements and explore opportunities across AI data, technology, education and digital solutions.',
    journey: { heading: 'Our Journey in Taiwan', copy: 'The 2026 tour begins our documented Taiwan journey, focused on building connections and understanding local and regional requirements.', chapters: [
      { year: '2026', heading: 'Building Our Connections', points: ['Business engagement', 'Industry conversations', 'Market exploration', 'New connections'] },
    ] },
    about: 'The Taiwan Business Tour 2026 brings eQOURSE closer to organisations operating across AI, technology, education and digital innovation. Through direct conversations and industry engagement, our team aims to understand project requirements and identify areas for potential collaboration.',
    why: { heading: 'Connecting with Taiwan’s Innovation Ecosystem', copy: 'Our Taiwan visit focuses on conversations with organisations working across AI, technology, digital innovation and education.', points: whyPoints() },
    services: services(), audience,
    meet: 'Have an AI data, multilingual, human-feedback or learning-content requirement? Meet the eQOURSE team during our Taiwan Business Tour 2026 to discuss your project, quality expectations, delivery requirements and potential collaboration.',
    discussion, relatedSlugs: ['china-tour-2026', 'japan-tour-2026', 'south-korea-tour-2026', 'singapore-tour-2026'],
    finalHeading: 'Let’s Meet in Taiwan',
    finalCopy: 'Connect with eQOURSE during our Taiwan Business Tour 2026 and explore opportunities across AI data, multilingual solutions, human feedback, technology and learning content.',
  },
};
