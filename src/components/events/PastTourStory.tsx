import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { EventData } from './eventsData';
import { getEventBySlug } from './eventsData';
import CountryEventGallery from './CountryEventGallery';
import type { PastTourContent, TourPoint } from './pastTourContent';

function Points({ items, className = '' }: { items: TourPoint[]; className?: string }) {
    return <div className={`tour-story-points ${className}`}>
        {items.map((item, index) => <article className="tour-story-point" key={item.title}>
            <span className="tour-story-index">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.href && <Link to={item.href} aria-label={`Explore ${item.title} services`}>Explore service <ArrowUpRight size={16}/></Link>}
        </article>)}
    </div>;
}

function StorySection({ id, eyebrow, heading, copy, children, tone = '' }: {
    id?: string; eyebrow: string; heading: string; copy: string; children: ReactNode; tone?: string;
}) {
    return <section id={id} className={`events-section tour-story-section ${tone}`}>
        <div className="events-shell">
            <div className="tour-story-heading"><p className="events-eyebrow">{eyebrow}</p><h2>{heading}</h2><p>{copy}</p></div>
            {children}
        </div>
    </section>;
}

export default function PastTourStory({ event, story }: { event: EventData; story: PastTourContent }) {
    const related = story.relatedSlugs.map(getEventBySlug).filter((tour): tour is EventData => Boolean(tour));
    return <>
        <StorySection id="journey" eyebrow="01 / THE JOURNEY" heading={story.journey.heading} copy={story.journey.copy}>
            <Points items={story.journey.highlights} className="tour-story-points-three"/>
        </StorySection>
        <StorySection eyebrow="02 / PURPOSE OF THE VISIT" heading={story.purpose.heading} copy={story.purpose.copy} tone="tour-story-soft">
            <Points items={story.purpose.points} className="tour-story-points-four"/>
        </StorySection>
        <StorySection eyebrow="03 / WHAT WE EXPLORED" heading="Exploring Opportunities Across AI, Data & Education" copy="Explore the eQOURSE capabilities connected to our global business conversations.">
            <Points items={story.services} className="tour-story-services"/>
        </StorySection>
        <CountryEventGallery event={event} heading={story.galleryHeading} intro={story.galleryIntro}/>
        <StorySection eyebrow="05 / PERSPECTIVE" heading={story.meaning.heading} copy={story.meaning.paragraphs.join(' ')} tone="tour-story-soft">
            <Points items={story.meaning.points} className="tour-story-points-three"/>
        </StorySection>
        <section className="events-section tour-story-timeline-section"><div className="events-shell">
            <div className="tour-story-heading"><p className="events-eyebrow">06 / CONTINUING THE JOURNEY</p><h2>{story.timeline.heading}</h2><p>{story.timeline.copy}</p></div>
            <div className="tour-story-timeline">
                {[story.timeline.first, story.timeline.second].filter((era): era is NonNullable<typeof era> => Boolean(era)).map((era, index) => <article key={era.year} className="tour-story-era"><span className="tour-story-era-year">{era.year}</span><div><p className="tour-story-era-label">CHAPTER 0{index + 1}</p><h3>{era.heading}</h3><ul>{era.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>)}
            </div>
            <Link to={story.timeline.cta.href} className="events-text-link tour-story-timeline-link">{story.timeline.cta.label} <ArrowUpRight size={18}/></Link>
        </div></section>
        <section className="events-section tour-story-global-section"><div className="events-shell">
            <div className="tour-story-heading"><p className="events-eyebrow">07 / GLOBAL JOURNEY</p><h2>Building Connections Beyond Borders</h2><p>{story.globalIntro}</p></div>
            <div className="tour-story-related">{related.map(tour => <Link to={`/events/${tour.slug}`} key={tour.slug} className="tour-story-related-link"><span>{tour.country} · {tour.dateLabel.match(/20\d{2}/)?.[0]}</span><strong>{tour.title}</strong><ArrowUpRight size={20}/></Link>)}</div>
            <Link to="/events" className="events-text-link">All Events & Business Tours <ArrowRight size={18}/></Link>
        </div></section>
        <section className="events-section tour-story-final"><div className="events-shell"><p className="events-eyebrow">08 / LET’S CONNECT</p><h2>{story.finalHeading}</h2><p>{story.finalCopy}</p><div className="events-cta-row"><Link to="/ai-data-services" className="events-button">Explore Our Services <ArrowUpRight size={18}/></Link><Link to="/contact-us" className="events-button events-button-ghost">Contact eQOURSE <ArrowRight size={18}/></Link></div></div></section>
    </>;
}
