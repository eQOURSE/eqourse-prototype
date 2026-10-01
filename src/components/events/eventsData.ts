import catalog from './eventsCatalog.json';
export interface EventAsset {
    url: string;
    filename: string;
    mimeType: string;
    label: string;
}
export interface EventData {
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    dateLabel: string;
    city: string;
    country: string;
    countryCode: string;
    location: string;
    venue: string;
    category: string;
    coordinates: number[] | null;
    description: string;
    body: string;
    coverImage: string;
    ogImage: string;
    imageAlt: string;
    brochure: EventAsset | null;
    video: EventAsset | null;
    extras: EventAsset[];
    isFeatured: boolean;
    status: 'upcoming' | 'ongoing' | 'completed';
    officialUrl: string | null;
}
export const events = catalog as EventData[];
export const countryTours = events.filter(event => event.coordinates);
export const upcomingTours = countryTours.filter(event => event.status !== 'completed');
export const eventYear = (event: EventData) => event.dateLabel.match(/20\d{2}/)?.[0] || '';
export const getEventBySlug = (slug: string) => events.find(event => event.slug === slug);
// Publish Event markup only once the actual start date and physical venue are confirmed.
export function getEventSchema(event: EventData) {
    if (!/^\d{4}-\d{2}-\d{2}/.test(event.date) || /announced|to be confirmed|to be added/i.test(event.venue) || !event.countryCode)
        return null;
    return { '@context': 'https://schema.org', '@type': 'Event', name: event.title,
        description: event.description, url: `https://www.eqourse.com/events/${event.slug}`,
        startDate: event.date, eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled', image: event.ogImage,
        location: { '@type': 'Place', name: event.venue, address: { '@type': 'PostalAddress', addressLocality: event.city, addressCountry: event.countryCode } },
        organizer: { '@type': 'Organization', name: 'eQOURSE', url: 'https://www.eqourse.com' } };
}
export const eventServices = [
    { title: 'AI Data Services', description: 'High-quality datasets for training, evaluation and deployment of AI systems.', href: '/ai-data-services', icon: 'database' },
    { title: 'LLM & Human Feedback', description: 'SFT, RLHF, preference data and expert AI response evaluation.', href: '/ai-data-services/annotation-labeling', icon: 'brain' },
    { title: 'Multilingual Data', description: 'Language-specific text, speech and multimodal datasets across global markets.', href: '/ai-data-services/data-collection', icon: 'languages' },
    { title: 'Computer Vision & Spatial Data', description: 'Image, video, LiDAR and spatial data solutions for real-world AI.', href: '/robotics-training-data-services/3d-spatial-annotation', icon: 'scan' },
    { title: 'Learning Solutions', description: 'Scalable digital learning and educational content development.', href: '/learning-solutions', icon: 'book' },
    { title: 'Expert Workforce', description: 'Domain specialists supporting AI, education and content projects.', href: '/smes', icon: 'users' },
];
export const eventFaqs = [
    ['Which AI and technology events does eQOURSE attend?', 'We explore AI, technology, education and innovation conferences alongside international business tours. Confirmed event names, dates and venues will appear on the relevant event page.'],
    ['Where can I meet the eQOURSE team?', 'Our planned 2026 destinations include China, Taiwan, Japan, South Korea and Singapore. Check each country page for verified itinerary updates and contact us to discuss a meeting.'],
    ['Can I schedule a meeting with eQOURSE during an event?', 'Yes. Use Meet eQOURSE or Schedule a Meeting to contact our team. Tell us your preferred destination, availability and project interests; our team will confirm the meeting arrangements.'],
    ['What services does eQOURSE showcase at industry events?', 'We discuss AI data collection, annotation and labelling, LLM SFT and human feedback, multilingual speech and text, computer vision, and learning and content solutions.'],
    ['Does eQOURSE participate in international business tours?', 'Yes. Explore our 2024 tour archives and planned 2026 destinations on their individual pages. Exact dates and venues are published only when verified.'],
    ['Where can I download eQOURSE event brochures and presentations?', 'The Event Presentations & Resources section and each tour detail page link to our Business Tour 2026 brochure. The presentation video is in development and will appear there when available.'],
];
