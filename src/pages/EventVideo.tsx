import { Helmet } from 'react-helmet-async';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PlayCircle, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/shared/PageLayout';
import { events, getEventBySlug } from '@/components/events/eventsData';
import './events.css';
export default function EventVideo(){
 const {slug}=useParams();const event=slug?getEventBySlug(slug):events[0];
 if(!event)return <Navigate to="/events" replace/>;
 return <PageLayout breadcrumbs={[{label:'Events',href:'/events'},{label:'Company Presentation'}]}><Helmet><title>eQOURSE Company Presentation</title><meta name="description" content="Explore eQOURSE’s AI data services, multilingual expertise and learning solutions through our company presentation."/>{!event.video&&<meta name="robots" content="noindex,follow"/>}<link rel="canonical" href="https://www.eqourse.com/events/presentation"/></Helmet><main className="events-page"><section className="events-section events-shell"><p className="events-eyebrow">eQOURSE / COMPANY PRESENTATION</p><h1 className="text-4xl md:text-5xl font-semibold mb-6">Get to know eQOURSE.</h1>{event.video?<video controls playsInline preload="metadata" poster={event.coverImage} className="w-full rounded-xl mt-8"><source src={event.video.url} type={event.video.mimeType}/></video>:<div className="events-resource events-video max-w-3xl mt-8"><div className="video-orbits" aria-hidden="true"><span/><span/><PlayCircle size={56}/></div><h2>Presentation in development</h2><p>Our company presentation video is coming soon. Explore our brochure to learn about AI data services, multilingual expertise and learning at scale.</p><div className="events-cta-row mt-6"><Link to="/events/brochure" className="events-button">Open Brochure <ArrowRight size={17}/></Link><Link to="/events" className="events-button events-button-ghost">Explore Country Tours</Link></div></div>}</section></main></PageLayout>;
}
