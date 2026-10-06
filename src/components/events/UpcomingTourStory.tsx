import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchEventPhotos, type EventPhoto } from '@/admin/lib/eventMediaApi';
import type { EventData } from './eventsData';
import { getEventBySlug } from './eventsData';
import type { UpcomingTourContent } from './upcomingTourContent';
import EventResources from './EventResources';
import CountryEventGallery from './CountryEventGallery';

function TourImage({ tour, albumOnly = false, preferredPhoto }: { tour: EventData; albumOnly?: boolean; preferredPhoto?: (photo: EventPhoto) => boolean }) {
  const archived = tour.status === 'completed';
  const { data: photos = [], isLoading } = useQuery({
    queryKey: ['event-photos', tour.slug],
    queryFn: () => fetchEventPhotos(tour.slug),
    enabled: archived,
    staleTime: 30_000,
    retry: false,
  });
  const photo = (preferredPhoto && photos.find(preferredPhoto)) || photos[0];
  return <div className="upcoming-tour-photo">
    {photo || !albumOnly ? <img src={photo?.imageUrl || tour.coverImage} alt={photo?.imageAlt || tour.imageAlt} loading="lazy" decoding="async"/> : <div className="upcoming-tour-photo-placeholder" role="status">{isLoading ? 'Loading tour highlights…' : 'Explore the tour highlights'}</div>}
    {photo || !albumOnly ? <span>{photo ? `Published ${tour.title} photo` : archived ? `${tour.country} destination photo · event gallery on tour page` : `${tour.country} destination photo`}</span> : null}
  </div>;
}

export default function UpcomingTourStory({ event, story, meeting }: { event: EventData; story: UpcomingTourContent; meeting: string }) {
  const isChina2026 = event.slug === 'china-tour-2026';
  const { data: tourPhotos = [] } = useQuery({
    queryKey: ['event-photos', event.slug],
    queryFn: () => fetchEventPhotos(event.slug),
    enabled: true,
    staleTime: 30_000,
    refetchInterval: 30_000,
    retry: false,
  });
  const hasTourHighlights = tourPhotos.length > 0;
  const sectionNumbers = {
    highlights: '02',
    resources: hasTourHighlights ? '03' : '02',
    global: hasTourHighlights ? '04' : '03',
    final: hasTourHighlights ? '05' : '04',
  };
  const related = story.relatedSlugs.map(getEventBySlug).filter((tour): tour is EventData => Boolean(tour));
  return <>
    <section id="journey" className="events-section tour-story-section upcoming-journey"><div className="events-shell">
      <div className="tour-story-heading"><p className="events-eyebrow">01 / THE JOURNEY</p><h2>{story.journey.heading}</h2><p>{story.journey.copy}</p></div>
      <div className={`upcoming-chapters${story.journey.chapters.length === 1 ? ' upcoming-chapters-single' : ''}`}>{story.journey.chapters.map(chapter => {
        const previous = chapter.slug ? getEventBySlug(chapter.slug) : undefined;
        return <article className="upcoming-chapter" key={`${chapter.year}-${chapter.heading}`}>
          {previous ? <Link to={`/events/${previous.slug}`} aria-label={`Explore ${previous.title}`}><TourImage
            tour={previous}
            albumOnly={isChina2026}
            preferredPhoto={isChina2026 && previous.slug === 'china-tour-2024'
              ? photo => photo.title.toLowerCase().includes('business presentation during china tour 2024')
              : isChina2026 && previous.slug === 'china-tour-july-2026'
                ? photo => photo.description.toLowerCase().includes('participating in a professional meeting')
                : undefined}
          /></Link> : <div className="upcoming-chapter-current"><span>{event.country}</span><strong>{chapter.year}</strong></div>}
          <div className="upcoming-chapter-copy"><span className="tour-story-index">{chapter.year}</span><h3>{chapter.heading}</h3><ul>{chapter.points.map(point => <li key={point}>{point}</li>)}</ul>
            {previous ? <Link className="events-text-link" to={`/events/${previous.slug}`}>Explore {previous.title} <ArrowUpRight size={17}/></Link> : <span className="upcoming-current-label">{event.status === 'ongoing' ? 'Current tour' : 'Current planned tour'}</span>}
          </div>
        </article>;
      })}</div>
    </div></section>

    <CountryEventGallery event={event} eyebrow={`${sectionNumbers.highlights} / TOUR HIGHLIGHTS`} heading={`${event.title} Photos & Stories`} intro="Photos published by our team during the tour appear here, with individual stories, captions and search metadata." hideWhenEmpty/>

    <section className="events-section events-resources-section"><div className="events-shell"><div className="events-section-heading"><div><p className="events-eyebrow">{sectionNumbers.resources} / BROCHURE & PRESENTATION</p><h2>Explore eQOURSE Before We Meet</h2></div><p>Learn about our AI data, learning content and global delivery capabilities.</p></div><EventResources event={event}/></div></section>

    <section className="events-section tour-story-global-section"><div className="events-shell"><div className="tour-story-heading"><p className="events-eyebrow">{sectionNumbers.global} / GLOBAL BUSINESS JOURNEY</p><h2>Our Global Business Journey</h2><p>Explore earlier tour pages and our planned destinations across Asia.</p></div><div className="upcoming-related">{related.map(tour => <Link to={`/events/${tour.slug}`} key={tour.slug} className="upcoming-related-link"><TourImage tour={tour}/><span>{tour.status === 'completed' ? 'EARLIER TOUR' : 'PLANNED TOUR'} · {tour.country}</span><strong>{tour.title}</strong><span className="events-text-link">Explore Tour <ArrowUpRight size={16}/></span></Link>)}</div><Link to="/events" className="events-text-link upcoming-all-events">All Events & Business Tours <ArrowRight size={18}/></Link></div></section>

    <section className="events-section tour-story-final"><div className="events-shell"><p className="events-eyebrow">{sectionNumbers.final} / LET’S CONNECT</p><h2>{story.finalHeading}</h2><p>{story.finalCopy}</p><div className="events-cta-row"><Link to={meeting} className="events-button">Schedule a Meeting <ArrowUpRight size={18}/></Link><Link to="/contact-us" className="events-button events-button-ghost">Contact eQOURSE <ArrowRight size={18}/></Link></div></div></section>
  </>;
}
