import { Link } from 'react-router-dom';
import { FileText, ArrowUpRight, PlayCircle, Download } from 'lucide-react';
import { events, type EventData } from './eventsData';
export default function EventResources({ event = events[0] }: {
    event?: EventData;
}) {
    return <div className="events-resources-grid">
    {event.brochure && <article className="events-resource events-brochure"><FileText size={32}/><span className="events-eyebrow">01 / BROCHURE</span><h3>One introduction.<br />A world of possibilities.</h3><p>The current eQOURSE company and services overview (2026 edition).</p><div className="events-resource-actions"><Link to="/events/brochure" className="events-text-link">Preview brochure <ArrowUpRight size={18}/></Link><a href={event.brochure.url} download={event.brochure.filename} className="events-text-link">Download PDF <Download size={16}/></a></div></article>}
    <article className="events-resource events-video"><div className="video-orbits" aria-hidden="true"><span /><span /><span /><PlayCircle size={52}/></div><span className="events-eyebrow">02 / PRESENTATION VIDEO</span><h3>Get to know eQOURSE.</h3><p>AI data. Human expertise. Learning at scale.</p>{event.video ? <Link to="/events/presentation" className="events-text-link">Watch presentation <ArrowUpRight size={18}/></Link> : <><div className="video-coming"><span className="events-live-dot"/> In development · Coming soon</div><Link to="/events/presentation" className="events-text-link" style={{ color: "#b9d4ff" }}>Presentation updates <ArrowUpRight size={17}/></Link></>}</article>
  </div>;
}
