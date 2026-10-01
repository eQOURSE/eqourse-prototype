export interface TourPoint {
    title: string;
    description: string;
    href?: string;
}

export interface PastTourContent {
    seoTitle: string;
    metaDescription: string;
    tagline: string;
    intro: string;
    journey: { heading: string; copy: string; highlights: TourPoint[] };
    purpose: { heading: string; copy: string; points: TourPoint[] };
    services: TourPoint[];
    galleryHeading: string;
    galleryIntro: string;
    meaning: { heading: string; paragraphs: string[]; points: TourPoint[] };
    timeline: {
        heading: string;
        copy: string;
        first: { year: string; heading: string; points: string[] };
        second?: { year: string; heading: string; points: string[] };
        cta: { label: string; href: string };
    };
    globalIntro: string;
    relatedSlugs: string[];
    finalHeading: string;
    finalCopy: string;
}

const aiData = '/ai-data-services';
const humanFeedback = '/ai-data-services/annotation-labeling/llm-rlhf-annotation';
const multilingual = '/ai-data-services/data-collection';
const learning = '/learning-solutions';
const experts = '/smes';

const sharedServices: TourPoint[] = [
    { title: 'AI Data Services', description: 'Exploring requirements across data collection, annotation, validation and AI model development.', href: aiData },
    { title: 'LLM & Human Feedback', description: 'Discussing opportunities around expert AI evaluation, human feedback and data supporting generative AI development.', href: humanFeedback },
    { title: 'Multilingual AI Data', description: 'Exploring requirements for multilingual text, speech, voice and multimodal datasets supporting global AI applications.', href: multilingual },
    { title: 'Learning & Content Solutions', description: 'Discussing scalable educational content, assessments, question banks and digital learning requirements.', href: learning },
    { title: 'Expert-Led Delivery', description: 'Exploring opportunities where specialist expertise and scalable global delivery models can support complex international projects.', href: experts },
];

const connectionMeaning = (place: string): PastTourContent['meaning'] => ({
    heading: 'Connecting Ideas, Expertise & Opportunities',
    paragraphs: [
        `The ${place} Business Tour provided eQOURSE with an opportunity to engage directly with the region’s business and innovation ecosystem, understand local perspectives and explore how global expertise and scalable delivery could support evolving requirements.`,
        'These interactions contributed to a stronger understanding of the market while creating a foundation for continued international engagement and future collaboration.',
    ],
    points: [
        { title: 'Connect', description: 'Build meaningful relationships through direct business interactions.' },
        { title: 'Understand', description: 'Gain deeper insight into regional requirements, priorities and opportunities.' },
        { title: 'Explore', description: 'Identify areas where eQOURSE’s expertise and delivery capabilities can support future collaboration.' },
    ],
});

const regionalPurpose = (place: string): PastTourContent['purpose'] => ({
    heading: `Building Connections in ${place}`,
    copy: `Our 2024 ${place === 'the UAE' ? 'UAE' : place} visit focused on understanding the market, engaging with industry professionals and exploring areas where eQOURSE’s capabilities could support organisations across AI, data, education and technology.`,
    points: [
        { title: 'Business Networking', description: 'Building professional relationships through direct conversations and face-to-face engagement.' },
        { title: 'Industry Discussions', description: 'Exchanging perspectives around AI, technology, digital learning and evolving business requirements.' },
        { title: 'Market Exploration', description: `Understanding opportunities and emerging requirements across ${place}’s technology and education sectors.` },
        { title: 'Future Collaboration', description: 'Exploring areas for potential international projects and long-term cooperation.' },
    ],
});

const regionalJourney = (place: string, region: string): PastTourContent['journey'] => ({
    heading: `Building Our Connections in ${place}`,
    copy: `The ${place} Business Tour 2024 represented an important step in eQOURSE’s international engagement across ${region}. Through face-to-face interactions and industry discussions, our team connected with organisations and professionals, explored regional requirements and developed relationships for future collaboration.`,
    highlights: [
        { title: 'Business Engagement', description: `Connecting directly with businesses, industry professionals and organisations across ${place}’s technology and education ecosystem.` },
        { title: 'Regional Understanding', description: `Developing a deeper understanding of business requirements, emerging opportunities and expectations within ${place} and the wider ${region}.` },
        { title: 'Global Connections', description: 'Expanding eQOURSE’s international network and creating opportunities for future cross-border collaboration.' },
    ],
});

const middleEastTimeline = (place: string): PastTourContent['timeline'] => ({
    heading: 'Growing Our Presence Across the Middle East',
    copy: `Our 2024 ${place} visit strengthened eQOURSE’s understanding of the region and created opportunities to connect with organisations across technology, AI and education. It forms part of our broader commitment to building meaningful relationships across international markets.`,
    first: { year: '2024', heading: 'Building Our Connections', points: ['Business Engagement', 'Industry Discussions', 'Regional Market Exploration', 'New Connections'] },
    cta: { label: 'Explore Our Global Business Tours', href: '/events' },
});

const evergreenFinal = {
    finalHeading: 'Continue the Conversation with eQOURSE',
    finalCopy: 'Looking for a global partner across AI data, multilingual solutions, human feedback or learning content? Connect with eQOURSE to discuss your requirements and explore opportunities for collaboration.',
};

export const pastTourContent: Record<string, PastTourContent> = {
    'china-tour-2024': {
        seoTitle: 'China Business Tour 2024 | eQOURSE Global Journey',
        metaDescription: "Explore eQOURSE's China Business Tour 2024 and discover our business engagements, industry discussions and growing connections across China's technology and education ecosystem.",
        tagline: 'Building connections across China’s technology, education and business ecosystem.',
        intro: 'In 2024, eQOURSE visited China to connect with businesses and industry professionals, understand market opportunities and explore potential collaboration across technology, education and digital solutions.',
        journey: {
            heading: 'Our China Journey in 2024',
            copy: 'The China Business Tour 2024 marked an important chapter in eQOURSE’s growing international presence. Through face-to-face interactions and industry discussions, our team explored the market, exchanged ideas and developed connections with organisations and professionals across China.',
            highlights: [
                { title: 'Business Engagement', description: 'Building connections through direct conversations with businesses and industry professionals.' },
                { title: 'Market Understanding', description: 'Learning more about evolving requirements, opportunities and business expectations within the market.' },
                { title: 'Global Connections', description: 'Expanding eQOURSE’s international network and creating opportunities for future collaboration.' },
            ],
        },
        purpose: {
            heading: 'Building Connections in China',
            copy: 'Our 2024 visit focused on understanding the market, meeting industry professionals and exploring areas where eQOURSE’s capabilities could support organisations operating across technology and education.',
            points: [
                { title: 'Business Networking', description: 'Developing meaningful professional and business connections.' },
                { title: 'Industry Discussions', description: 'Exchanging perspectives on technology, education and digital transformation.' },
                { title: 'Market Exploration', description: 'Understanding emerging requirements and opportunities in China.' },
                { title: 'Future Collaboration', description: 'Exploring potential areas for long-term international cooperation.' },
            ],
        },
        services: [
            { title: 'AI Data Services', description: 'Exploring requirements around data collection, annotation, validation and AI model development.', href: aiData },
            { title: 'Multilingual AI Data', description: 'Discussing opportunities involving multilingual text, speech and multimodal datasets.', href: multilingual },
            { title: 'Learning Content', description: 'Exploring requirements for curriculum-aligned content, assessments and digital learning resources.', href: learning },
            { title: 'Expert-Led Delivery', description: 'Understanding opportunities where specialist expertise and scalable delivery models can support international projects.', href: experts },
        ],
        galleryHeading: 'Highlights from China 2024',
        galleryIntro: 'A glimpse into eQOURSE’s 2024 journey across China, capturing business interactions, industry conversations and moments that shaped our growing international connections.',
        meaning: {
            heading: 'More Than a Business Visit',
            paragraphs: [
                'The China Business Tour was an opportunity to understand local perspectives, build face-to-face relationships and identify areas where international expertise and local innovation could come together.',
                'These interactions helped shape eQOURSE’s understanding of the market and laid the foundation for continued engagement.',
            ],
            points: [
                { title: 'Listen', description: 'Understand market requirements and perspectives.' },
                { title: 'Connect', description: 'Build relationships through direct interaction.' },
                { title: 'Explore', description: 'Identify opportunities for meaningful collaboration.' },
            ],
        },
        timeline: {
            heading: 'Continuing Our China Journey',
            copy: 'Our 2024 visit marked the beginning of an important chapter in eQOURSE’s China journey. In 2026, we returned to continue conversations, establish new connections and explore further opportunities across AI, technology and education.',
            first: { year: '2024', heading: 'Building Our Connections', points: ['Business Engagement', 'Industry Discussions', 'Market Exploration', 'New Connections'] },
            second: { year: '2026', heading: 'Continuing the Journey', points: ['Continued Engagement', 'New Conversations', 'New Connections', 'Collaboration Opportunities'] },
            cta: { label: 'Explore China Business Tour 2026', href: '/events/china-tour-2026' },
        },
        globalIntro: 'eQOURSE continues to engage with organisations across international markets, connecting expertise, technology and scalable delivery capabilities with evolving global requirements.',
        relatedSlugs: ['china-tour-2026', 'china-tour-july-2026', 'singapore-tour-2024', 'singapore-tour-2026'],
        finalHeading: 'Let’s Build What Comes Next',
        finalCopy: 'Looking for a global partner across AI data, multilingual solutions or learning content? Connect with eQOURSE to discuss your requirements and explore opportunities for collaboration.',
    },
    'china-tour-july-2026': {
        seoTitle: 'China Business Tour July 2026 | eQOURSE Global Journey',
        metaDescription: "Explore eQOURSE's China Business Tour in July 2026, featuring business engagements, industry discussions and connections across AI, technology, education and digital solutions.",
        tagline: 'Strengthening connections across China’s AI, technology and education ecosystem.',
        intro: 'In July 2026, eQOURSE returned to China to continue building relationships, engage with businesses and industry professionals, and explore new opportunities across AI data, technology, education and digital solutions.',
        journey: {
            heading: 'Returning to China in 2026',
            copy: 'Building on our previous engagement in China, the July 2026 business tour represented the next stage of eQOURSE’s journey in the market. Through face-to-face interactions and industry discussions, our team continued existing conversations, developed new connections and explored opportunities for collaboration.',
            highlights: [
                { title: 'Continued Engagement', description: 'Strengthening relationships and continuing conversations developed through earlier market engagement.' },
                { title: 'New Connections', description: 'Meeting businesses and industry professionals to understand new requirements and opportunities.' },
                { title: 'Growing Global Presence', description: 'Expanding eQOURSE’s international engagement across AI, technology, education and digital solutions.' },
            ],
        },
        purpose: {
            heading: 'Strengthening Our Connections in China',
            copy: 'Our July 2026 visit focused on deepening market engagement, connecting with organisations and exploring how eQOURSE’s capabilities could support evolving requirements across AI, data, education and technology.',
            points: [
                { title: 'Relationship Building', description: 'Strengthening existing connections and developing new professional relationships.' },
                { title: 'Industry Discussions', description: 'Exchanging perspectives around AI, data, education and emerging technology requirements.' },
                { title: 'Market Engagement', description: 'Building a deeper understanding of evolving requirements and opportunities across the Chinese market.' },
                { title: 'Collaboration Opportunities', description: 'Exploring potential areas for international projects and long-term cooperation.' },
            ],
        },
        services: [
            { title: 'AI Data Services', description: 'Exploring requirements across data collection, annotation, validation and AI model development.', href: aiData },
            { title: 'LLM & Human Feedback', description: 'Discussing opportunities involving SFT, RLHF, preference data and expert AI evaluation.', href: humanFeedback },
            { title: 'Multilingual AI Data', description: 'Exploring multilingual text, speech, voice and multimodal data requirements.', href: multilingual },
            { title: 'Learning & Content Solutions', description: 'Discussing scalable educational content, assessments, question banks and digital learning requirements.', href: learning },
            { title: 'Expert-Led Delivery', description: 'Exploring opportunities where specialist expertise and scalable global delivery can support complex projects.', href: experts },
        ],
        galleryHeading: 'Highlights from China — July 2026',
        galleryIntro: 'A glimpse into eQOURSE’s July 2026 journey across China, capturing business interactions, industry discussions and moments from our continued engagement in the market.',
        meaning: {
            heading: 'Continuing Conversations, Creating Opportunities',
            paragraphs: [
                'Returning to China provided eQOURSE with an opportunity to build on previous market engagement while developing new relationships and understanding evolving industry requirements.',
                'Through direct conversations and face-to-face interactions, the July 2026 visit strengthened our understanding of the market and created new opportunities for continued engagement across AI, technology and education.',
            ],
            points: [
                { title: 'Reconnect', description: 'Continue conversations and strengthen existing relationships.' },
                { title: 'Discover', description: 'Understand new market requirements and emerging opportunities.' },
                { title: 'Collaborate', description: 'Explore areas where expertise, technology and scalable delivery can come together.' },
            ],
        },
        timeline: {
            heading: 'Building Relationships Over Time',
            copy: 'Our China journey continues to evolve. From establishing connections in 2024 to returning in July 2026, each visit has provided opportunities to deepen market understanding, strengthen relationships and explore new areas of collaboration.',
            first: { year: '2024', heading: 'Building Our Connections', points: ['Business Engagement', 'Industry Discussions', 'Market Exploration', 'New Connections'] },
            second: { year: 'July 2026', heading: 'Strengthening Our Connections', points: ['Continued Engagement', 'New Conversations', 'Deeper Market Understanding', 'Collaboration Opportunities'] },
            cta: { label: 'Explore China Business Tour 2024', href: '/events/china-tour-2024' },
        },
        globalIntro: 'eQOURSE continues to engage with organisations across international markets, connecting specialist expertise, technology and scalable delivery capabilities with evolving global requirements.',
        relatedSlugs: ['china-tour-2024', 'singapore-tour-2024', 'singapore-tour-2026'],
        ...evergreenFinal,
    },
    'singapore-tour-2024': {
        seoTitle: 'Singapore Business Tour 2024 | eQOURSE Global Journey',
        metaDescription: "Explore eQOURSE's Singapore Business Tour 2024, featuring business engagements, industry discussions and connections across AI, technology, education and digital solutions.",
        tagline: 'Building meaningful connections across Singapore’s technology, education and innovation ecosystem.',
        intro: 'In 2024, eQOURSE visited Singapore to connect with businesses and industry professionals, understand regional opportunities and explore potential collaboration across AI, technology, education and digital solutions.',
        journey: {
            ...regionalJourney('Singapore', 'the Asia-Pacific region'),
            copy: 'The Singapore Business Tour 2024 marked an important step in eQOURSE’s international engagement across the Asia-Pacific region. Through face-to-face interactions and industry discussions, our team connected with organisations and professionals, explored market requirements and developed relationships for future collaboration.',
            highlights: [
                { title: 'Business Engagement', description: 'Connecting directly with businesses, industry professionals and organisations operating across Singapore’s technology and education ecosystem.' },
                { title: 'Regional Understanding', description: 'Developing a deeper understanding of business requirements, emerging opportunities and expectations within Singapore and the wider APAC market.' },
                { title: 'Global Connections', description: 'Expanding eQOURSE’s international network and creating opportunities for future cross-border collaboration.' },
            ],
        },
        purpose: regionalPurpose('Singapore'),
        services: sharedServices,
        galleryHeading: 'Highlights from Singapore — 2024',
        galleryIntro: 'A glimpse into eQOURSE’s 2024 Singapore journey, capturing business interactions, industry conversations and moments that contributed to our growing presence and connections across the region.',
        meaning: {
            ...connectionMeaning('Singapore'),
            paragraphs: [
                'The Singapore Business Tour provided eQOURSE with an opportunity to engage directly with the region’s business and innovation ecosystem, understand local perspectives and explore how global expertise could support evolving requirements.',
                'These interactions contributed to a stronger understanding of the market while creating a foundation for continued engagement and future collaboration.',
            ],
        },
        timeline: {
            heading: 'Building Relationships Over Time',
            copy: 'Our Singapore journey continues to evolve. From establishing connections in 2024 to a planned 2026 engagement, we aim to strengthen relationships, understand regional requirements and explore opportunities across AI, technology and education.',
            first: { year: '2024', heading: 'Building Our Connections', points: ['Business Engagement', 'Industry Discussions', 'Market Exploration', 'New Connections'] },
            second: { year: '2026', heading: 'Continuing Our Singapore Journey', points: ['Continued Engagement', 'New Conversations', 'Deeper Regional Understanding', 'Collaboration Opportunities'] },
            cta: { label: 'Explore Singapore Business Tour 2026', href: '/events/singapore-tour-2026' },
        },
        globalIntro: 'eQOURSE continues to engage with organisations across international markets, connecting specialist expertise, technology and scalable delivery capabilities with evolving global requirements.',
        relatedSlugs: ['singapore-tour-2026', 'china-tour-2024', 'china-tour-july-2026'],
        ...evergreenFinal,
    },
    'uae-tour-2024': {
        seoTitle: 'UAE Business Tour 2024 | eQOURSE Global Journey',
        metaDescription: "Explore eQOURSE's UAE Business Tour 2024, featuring business engagements, industry discussions and connections across AI, technology, education and digital solutions.",
        tagline: 'Building meaningful connections across the UAE’s technology, education and innovation ecosystem.',
        intro: 'In 2024, eQOURSE visited the UAE to connect with businesses and industry professionals, understand regional opportunities and explore potential collaboration across AI, technology, education and digital solutions.',
        journey: {
            ...regionalJourney('UAE', 'the Middle East'),
            heading: 'Building Our Connections in the UAE',
            copy: 'The UAE Business Tour 2024 represented an important step in eQOURSE’s international engagement across the Middle East. Through face-to-face interactions and industry discussions, our team connected with organisations and professionals, explored regional requirements and developed relationships for future collaboration.',
            highlights: [
                { title: 'Business Engagement', description: 'Connecting directly with businesses, industry professionals and organisations operating across the UAE’s technology and education ecosystem.' },
                { title: 'Regional Understanding', description: 'Developing a deeper understanding of business requirements, emerging opportunities and expectations within the UAE and the wider Middle East.' },
                { title: 'Global Connections', description: 'Expanding eQOURSE’s international network and creating opportunities for future cross-border collaboration.' },
            ],
        },
        purpose: regionalPurpose('the UAE'),
        services: sharedServices,
        galleryHeading: 'Highlights from the UAE — 2024',
        galleryIntro: 'A glimpse into eQOURSE’s 2024 UAE journey, capturing business interactions, industry conversations and moments that contributed to our growing connections across the region.',
        meaning: connectionMeaning('UAE'),
        timeline: middleEastTimeline('UAE'),
        globalIntro: 'From Asia to the Middle East, eQOURSE continues to engage with organisations across international markets, connecting specialist expertise, technology and scalable delivery capabilities with evolving global requirements.',
        relatedSlugs: ['china-tour-2024', 'singapore-tour-2024', 'china-tour-july-2026', 'singapore-tour-2026'],
        ...evergreenFinal,
    },
    'ksa-tour-2024': {
        seoTitle: 'Saudi Arabia Business Tour 2024 | eQOURSE Global Journey',
        metaDescription: "Explore eQOURSE's Saudi Arabia Business Tour 2024, featuring business engagements and connections across AI, technology, education and digital solutions.",
        tagline: 'Building meaningful connections across Saudi Arabia’s technology, education and innovation ecosystem.',
        intro: 'In 2024, eQOURSE visited Saudi Arabia to connect with businesses and industry professionals, understand regional opportunities and explore potential collaboration across AI, technology, education and digital solutions.',
        journey: regionalJourney('Saudi Arabia', 'the Middle East'),
        purpose: regionalPurpose('Saudi Arabia'),
        services: sharedServices,
        galleryHeading: 'Highlights from Saudi Arabia — 2024',
        galleryIntro: 'A glimpse into eQOURSE’s 2024 Saudi Arabia journey, capturing business interactions, industry conversations and moments that contributed to our growing connections across the region.',
        meaning: connectionMeaning('Saudi Arabia'),
        timeline: middleEastTimeline('Saudi Arabia'),
        globalIntro: 'From Asia to the Middle East, eQOURSE continues to engage with organisations across international markets, connecting specialist expertise, technology and scalable delivery capabilities with evolving global requirements.',
        relatedSlugs: ['uae-tour-2024', 'singapore-tour-2024', 'china-tour-2024', 'china-tour-july-2026', 'singapore-tour-2026'],
        ...evergreenFinal,
    },
};
