import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, ArrowRight, CalendarDays, MapPin, Building2, Check } from 'lucide-react';
import PageLayout from '@/components/shared/PageLayout';
import SEOHead from '@/components/ai-data-services/shared/SEOHead';
import { countryTours, getEventBySlug, getEventSchema } from '@/components/events/eventsData';
import EventResources from '@/components/events/EventResources';
import CountryEventGallery from '@/components/events/CountryEventGallery';
import './events.css';
const topics = ['AI Data Collection', 'Data Annotation & Labelling', 'LLM SFT, RLHF & Human Feedback', 'Speech & Multilingual Data', 'Computer Vision & Spatial Data', 'Learning & Content Solutions'];
export default function EventDetail() {
    const { slug } = useParams();
    const event = slug ? getEventBySlug(slug) : undefined;
    if (!event)
        return <Navigate to="/events" replace/>;
    const url = `https://www.eqourse.com/events/${event.slug}`;
    const schema = getEventSchema(event);
    const meeting = `/contact-us?interest=events&event=${event.slug}`;
    const pageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: event.title, description: event.description, url };
    return <PageLayout breadcrumbs={[{ label: 'Events', href: '/events' }, { label: event.title }]}><main className="events-page">
    <SEOHead title={`${event.title} | eQOURSE Events`} description={event.description} canonical={url} ogImage={event.ogImage}/>
    <Helmet><script type="application/ld+json">{JSON.stringify(schema || pageSchema)}</script><script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eqourse.com/' }, { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://www.eqourse.com/events' }, { '@type': 'ListItem', position: 3, name: event.title, item: url }] })}</script></Helmet>
    <section className="events-hero events-detail-hero"><img className="events-hero-photo" src={event.coverImage} alt={event.imageAlt} width="1200" height="800" {...{ fetchpriority: "high" }}/><div className="events-hero-shade"/><div className="hero-coordinate-grid" aria-hidden="true"/><div className="events-shell hero-inner"><div className="hero-copy"><p className="events-eyebrow"><span className="events-live-dot"/> {event.status === 'completed' ? 'PAST ENGAGEMENT' : 'PLANNED BUSINESS TOUR'} / 2026</p><h1>{event.title}{event.coordinates && <><br /><em>{event.city === 'Cities to be announced' ? event.country : event.city}</em></>}</h1><div className="detail-meta"><span><CalendarDays size={17}/>{event.dateLabel}</span><span><MapPin size={17}/>{event.location}</span><span><Building2 size={17}/>{event.venue}</span></div><p className="hero-description">{event.description}</p><div className="events-cta-row"><Link to={meeting} className="events-button">Schedule a Meeting <ArrowUpRight size={18}/></Link><Link to="/events/brochure" className="events-button events-button-ghost">Open Brochure <ArrowRight size={18}/></Link><Link to="/events/presentation" className="hero-tour-link">Open Presentation ↗</Link></div></div></div></section>
    <section className="events-section events-resources-section" id="event-resources"><div className="events-shell"><div className="events-section-heading"><div><p className="events-eyebrow">TAKE A CLOSER LOOK</p><h2>Event Resources</h2></div><p>Explore our shared Asia business tour brochure and presentation updates.</p></div><EventResources event={event}/></div></section>
    <section className="events-section events-shell events-detail-copy"><div><p className="events-eyebrow">THE OPPORTUNITY</p><h2>About the Event</h2><p>{event.body}</p><h2>Why eQOURSE Is Attending</h2><p>We’re connecting with AI teams, education organisations, publishers and technology partners to understand their next challenges. Our conversations focus on reliable training data, multilingual expertise and scalable learning and content delivery.</p><h2>What We’re Exploring</h2><ul className="events-detail-topics">{topics.map(t => <li key={t}><Check size={17}/>{t}</li>)}</ul></div><aside><p className="events-eyebrow">LET’S CONNECT</p><h2>Meet eQOURSE at the Event</h2><p>Want to discuss an AI data, learning or content project with our team? Share your project interests and preferred meeting dates. We’ll confirm availability and arrangements with you.</p><Link to={meeting} className="events-button">Schedule a Meeting <ArrowUpRight size={17}/></Link><p className="text-xs mt-5">The itinerary is being developed. Dates and venues will be published once confirmed.</p>{event.officialUrl && <a className="events-text-link" href={event.officialUrl} target="_blank" rel="noopener noreferrer">Visit Official Event Website <ArrowUpRight size={16}/></a>}</aside></section>
    <CountryEventGallery event={event}/>
    <section className="events-section events-shell"><p className="events-eyebrow">CONTINUE THE JOURNEY</p><h2>Explore Our Other Destinations</h2><div className="events-detail-related">{countryTours.filter(e => e.slug !== event.slug).map(e => <Link key={e.slug} to={`/events/${e.slug}`}>{e.title} ↗</Link>)}</div><Link to="/events" className="events-text-link mt-6">All Events & Business Tours <ArrowRight size={18}/></Link></section>
  </main></PageLayout>;
}
