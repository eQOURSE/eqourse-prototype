import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchEventPhotos } from '@/admin/lib/eventMediaApi';
import type { EventData } from './eventsData';
import { getEventBySlug } from './eventsData';
import type { TourPoint } from './pastTourContent';
import type { UpcomingTourContent } from './upcomingTourContent';
import EventResources from './EventResources';
import CountryEventGallery from './CountryEventGallery';

function Points({ items }: { items: TourPoint[] }) {
  return <div className="tour-story-points tour-story-services">{items.map((item, index) =>
    <article className="tour-story-point" key={item.title}>
      <span className="tour-story-index">0{index + 1}</span>
      <h3>{item.title}</h3><p>{item.description}</p>
      {item.href && <Link to={item.href}>Explore service <ArrowUpRight size={16}/></Link>}
    </article>)}</div>;
}

function TourImage({ tour }: { tour: EventData }) {
  const archived = tour.status === 'completed';
  const { data: photos = [] } = useQuery({
    queryKey: ['event-photos', tour.slug],
    queryFn: () => fetchEventPhotos(tour.slug),
    enabled: archived,
    staleTime: 30_000,
    retry: false,
  });
  const photo = photos[0];
  return <div className="upcoming-tour-photo">
    <img src={photo?.imageUrl || tour.coverImage} alt={photo?.imageAlt || tour.imageAlt} loading="lazy" decoding="async"/>
    <span>{photo ? `Published ${tour.title} photo` : archived ? `${tour.country} destination photo · event gallery on tour page` : `${tour.country} destination photo`}</span>
  </div>;
}

export default function UpcomingTourStory({ event, story, meeting }: { event: EventData; story: UpcomingTourContent; meeting: string }) {
  const related = story.relatedSlugs.map(getEventBySlug).filter((tour): tour is EventData => Boolean(tour));
  return <>
    <section id="journey" className="events-section tour-story-section upcoming-journey"><div className="events-shell">
      <div className="tour-story-heading"><p className="events-eyebrow">01 / THE JOURNEY</p><h2>{story.journey.heading}</h2><p>{story.journey.copy}</p></div>
      <div className={`upcoming-chapters${story.journey.chapters.length === 1 ? ' upcoming-chapters-single' : ''}`}>{story.journey.chapters.map(chapter => {
        const previous = chapter.slug ? getEventBySlug(chapter.slug) : undefined;
        return <article className="upcoming-chapter" key={`${chapter.year}-${chapter.heading}`}>
          {previous ? <Link to={`/events/${previous.slug}`} aria-label={`Explore ${previous.title}`}><TourImage tour={previous}/></Link> : <div className="upcoming-chapter-current"><span>{event.country}</span><strong>{chapter.year}</strong></div>}
          <div className="upcoming-chapter-copy"><span className="tour-story-index">{chapter.year}</span><h3>{chapter.heading}</h3><ul>{chapter.points.map(point => <li key={point}>{point}</li>)}</ul>
            {previous ? <Link className="events-text-link" to={`/events/${previous.slug}`}>Explore {previous.title} <ArrowUpRight size={17}/></Link> : <span className="upcoming-current-label">{event.status === 'ongoing' ? 'Current tour' : 'Current planned tour'}</span>}
          </div>
        </article>;
      })}</div>
    </div></section>

    <section className="events-section tour-story-section tour-story-soft"><div className="events-shell">
      <div className="tour-story-heading"><p className="events-eyebrow">02 / ABOUT THE TOUR</p><h2>About the {event.title}</h2><p>{story.about}</p></div>
      <Points items={[
        { title: 'Face-to-Face Engagement', description: 'Connecting directly with organisations and industry professionals.' },
        { title: 'Project Discussions', description: 'Understanding project requirements, quality expectations and delivery needs.' },
        { title: 'Global Collaboration', description: 'Exploring where specialist expertise and scalable delivery can support international projects.' },
      ]}/>
    </div></section>

    <section className="events-section tour-story-section"><div className="events-shell"><div className="tour-story-heading"><p className="events-eyebrow">03 / WHY WE ARE VISITING</p><h2>{story.why.heading}</h2><p>{story.why.copy}</p></div><Points items={story.why.points}/></div></section>

    <section className="events-section tour-story-section tour-story-soft"><div className="events-shell"><div className="tour-story-heading"><p className="events-eyebrow">04 / WHAT WE ARE EXPLORING</p><h2>Areas of Collaboration</h2><p>Explore the eQOURSE services behind our business conversations.</p></div><Points items={story.services}/></div></section>

    <section className="events-section tour-story-section"><div className="events-shell"><div className="tour-story-heading"><p className="events-eyebrow">05 / WHO WE WOULD LIKE TO MEET</p><h2>Who We’re Looking to Connect With</h2><p>We welcome conversations with organisations looking for specialist expertise, high-quality data and scalable international delivery.</p></div><Points items={story.audience}/></div></section>

    <section className="events-section tour-story-section tour-story-soft"><div className="events-shell upcoming-info-grid"><div><p className="events-eyebrow">06 / TOUR INFORMATION</p><h2>{event.title}</h2><p>Tour dates, meeting locations and final itinerary details will be updated as they are confirmed.</p><Link to={meeting} className="events-button">Schedule a Meeting <ArrowUpRight size={18}/></Link></div><dl>
      <div><dt>Location</dt><dd>{event.location}</dd></div><div><dt>Year</dt><dd>2026</dd></div><div><dt>Dates</dt><dd>{event.date || 'To Be Announced'}</dd></div><div><dt>Venue</dt><dd>{event.venue}</dd></div><div><dt>Status</dt><dd>{event.status === 'ongoing' ? 'Ongoing' : 'Planned'}</dd></div>
    </dl></div></section>

    <section className="events-section tour-story-section"><div className="events-shell upcoming-meet"><p className="events-eyebrow">07 / MEET EQOURSE</p><h2>Meet Our Team During the {event.title}</h2><p>{story.meet}</p><p className="upcoming-discussion">{story.discussion.join(' · ')}</p><Link to={meeting} className="events-button">Schedule a Meeting <ArrowUpRight size={18}/></Link></div></section>

    <CountryEventGallery event={event} eyebrow="08 / TOUR HIGHLIGHTS" heading={`${event.title} Photos & Stories`} intro="Photos published by our team during the tour appear here, with individual stories, captions and search metadata."/>

    <section className="events-section events-resources-section"><div className="events-shell"><div className="events-section-heading"><div><p className="events-eyebrow">09 / BROCHURE & PRESENTATION</p><h2>Explore eQOURSE Before We Meet</h2></div><p>Learn about our AI data, learning content and global delivery capabilities.</p></div><EventResources event={event}/></div></section>

    <section className="events-section tour-story-global-section"><div className="events-shell"><div className="tour-story-heading"><p className="events-eyebrow">10 / GLOBAL BUSINESS JOURNEY</p><h2>Our Global Business Journey</h2><p>Explore earlier tour pages and our planned destinations across Asia.</p></div><div className="upcoming-related">{related.map(tour => <Link to={`/events/${tour.slug}`} key={tour.slug} className="upcoming-related-link"><TourImage tour={tour}/><span>{tour.status === 'completed' ? 'EARLIER TOUR' : 'PLANNED TOUR'} · {tour.country}</span><strong>{tour.title}</strong><span className="events-text-link">Explore Tour <ArrowUpRight size={16}/></span></Link>)}</div><Link to="/events" className="events-text-link upcoming-all-events">All Events & Business Tours <ArrowRight size={18}/></Link></div></section>

    <section className="events-section tour-story-final"><div className="events-shell"><p className="events-eyebrow">11 / LET’S CONNECT</p><h2>{story.finalHeading}</h2><p>{story.finalCopy}</p><div className="events-cta-row"><Link to={meeting} className="events-button">Schedule a Meeting <ArrowUpRight size={18}/></Link><Link to="/contact-us" className="events-button events-button-ghost">Contact eQOURSE <ArrowRight size={18}/></Link></div></div></section>
  </>;
}
