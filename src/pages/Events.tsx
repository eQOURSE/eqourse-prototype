import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Building2,
  Globe2,
  Database,
  BrainCircuit,
  Languages,
  Scan,
  BookOpen,
  Users,
  Plus,
} from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import { Helmet } from "react-helmet-async";
import {
  events,
  upcomingTours,
  eventYear,
  getEventBySlug,
  eventServices,
  eventFaqs,
  type EventData,
} from "@/components/events/eventsData";
import GlobalEventsMap from "@/components/events/GlobalEventsMap";
import "./events.css";
const icons = [Database, BrainCircuit, Languages, Scan, BookOpen, Users];
const meet = "/contact-us?interest=events#contact-form";
function TourCard({ event, index }: { event: EventData; index: number }) {
  return (
    <article className="events-tour-card" id={`event-card-${event.slug}`}>
      <Link
        to={`/events/${event.slug}`}
        className="tour-image-link"
        aria-label={`View ${event.title} details`}
      >
        <img
          src={event.coverImage}
          alt={event.imageAlt}
          title={event.imageAlt}
          loading="lazy"
          width="1200"
          height="800"
        />
        <span className="tour-badge">
          {event.status === "completed" ? "PAST" : "PLANNED"} /{" "}
          {eventYear(event)}
        </span>
        <span className="tour-number">0{index + 1}</span>
        <span className="tour-image-title">
          {event.slug.startsWith("uae-")
            ? "UAE"
            : event.slug.startsWith("ksa-")
              ? "KSA"
              : event.country}
        </span>
        <span className="tour-image-arrow">
          <ArrowUpRight />
        </span>
      </Link>
      <div className="tour-content">
        <p className="events-eyebrow">
          {event.category} · AI & Technology · EdTech
        </p>
        <h3>
          <Link to={`/events/${event.slug}`}>{event.title}</Link>
        </h3>
        <div className="tour-meta">
          <span>
            <CalendarDays size={16} />
            {event.dateLabel}
          </span>
          <span>
            <MapPin size={16} />
            {event.location}
          </span>
          <span>
            <Building2 size={16} />
            {event.venue}
          </span>
        </div>
        <p>{event.description}</p>
        <div className="tour-focus">
          <strong>eQOURSE Focus</strong>
          <span>
            AI Data Services · Multilingual Data
            <br />
            Learning Solutions · Content Services
          </span>
        </div>
        <div className="tour-actions">
          <Link to={`/events/${event.slug}`} className="events-text-link">
            View Event Details <ArrowUpRight size={17} />
          </Link>
          {event.status === "completed" ? (
            <Link
              to={`/events/${event.slug}#event-gallery`}
              className="tour-meet"
            >
              View Highlights
            </Link>
          ) : (
            <Link to={`${meet}&event=${event.slug}`} className="tour-meet">
              Meet eQOURSE
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
export default function Events() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState("All destinations");
  const shown =
    filter === "All destinations"
      ? upcomingTours
      : upcomingTours.filter((e) => e.country === filter);
  const past = events.filter((e) => e.status === "completed");
  const heroEvent = getEventBySlug("singapore-tour-2026")!;
  const reveal = {
    initial: { opacity: reduced ? 1 : 0, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 },
    transition: { duration: 0.55 },
  };
  return (
    <PageLayout breadcrumbs={[{ label: "Events" }]}>
      <main className="events-page">
        <SEOHead
          title="AI, EdTech & Technology Events | eQOURSE"
          description="Explore upcoming eQOURSE events, AI conferences, EdTech exhibitions and global business tours. Meet our team and discover our AI data and learning solutions."
          canonical="https://www.eqourse.com/events"
          ogImage={heroEvent.ogImage}
        />
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "eQOURSE Events, Conferences & Global Business Tours",
              url: "https://www.eqourse.com/events",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: events.map((e, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  url: `https://www.eqourse.com/events/${e.slug}`,
                  name: e.title,
                })),
              },
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.eqourse.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Events",
                  item: "https://www.eqourse.com/events",
                },
              ],
            })}
          </script>
        </Helmet>
        <section className="events-hero">
          <img
            className="events-hero-photo"
            src={heroEvent.coverImage}
            alt="Singapore skyline, a destination on eQOURSE’s planned global business tour"
            width="1200"
            height="800"
            {...{ fetchpriority: "high" }}
          />
          <div className="events-hero-shade" />
          <div className="hero-coordinate-grid" aria-hidden="true" />
          <div className="events-shell hero-inner">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.7 }}
              className="hero-copy"
            >
              <p className="events-eyebrow">
                <span className="events-live-dot" /> GLOBAL CONNECTIONS / 2026
              </p>
              <h1>
                <span>eQOURSE Events,</span> Conferences & <br />
                <em>Global Business Tours</em>
              </h1>
              <p className="hero-description">
                Meet eQOURSE at leading AI, technology, education and innovation
                events around the world. Discover where our team is connecting
                with global organisations.
              </p>
              <div className="events-cta-row">
                <Link to="/events/brochure" className="events-button">
                  Open Brochure <ArrowUpRight size={18} />
                </Link>
                <Link
                  to="/events/presentation"
                  className="events-button events-button-ghost"
                >
                  Open Presentation <ArrowRight size={18} />
                </Link>
                <a href="#upcoming" className="hero-tour-link">
                  Explore Upcoming Events ↗
                </a>
              </div>
            </motion.div>
            {/* <div className="hero-orbit" aria-hidden="true">
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="orbit-ring ring-three" />
              <Globe2 />
              <span className="orbit-dot dot-one" />
              <span className="orbit-dot dot-two" />
              <span className="orbit-label">IDEAS WITHOUT BORDERS</span>
            </div> */}
            <div className="hero-bottom">
              <span>LOCAL CONVERSATIONS. GLOBAL POSSIBILITIES.</span>
              <span>CHINA / TAIWAN / JAPAN / SOUTH KOREA / SINGAPORE</span>
            </div>
          </div>
        </section>
        <nav className="events-section-nav" aria-label="Events page sections">
          <div className="events-shell">
            <a href="#upcoming">Upcoming tours</a>
            <a href="#destinations">Global destinations</a>
            <a href="#past">Past tours</a>
            <a href="#resources">Resources</a>
            <a href="#gallery">Our world</a>
            <a href="#event-faq">FAQs</a>
            <Link to={meet}>
              Let’s meet <ArrowUpRight size={15} />
            </Link>
          </div>
        </nav>
        <section className="events-section events-shell events-past" id="past">
          <p className="events-eyebrow">01 / OUR JOURNEY SO FAR</p>
          <h2>Past Events & Global Engagements</h2>
          <p className="events-archive-intro">
            Explore individual 2024 tour archives and our July 2026 China tour.
            Verified photos and itinerary details will be added to each page.
          </p>
          {past.length ? (
            <div className="events-tours-grid">
              {past.map((e, i) => (
                <TourCard key={e.slug} event={e} index={i} />
              ))}
            </div>
          ) : (
            <div className="events-past-note">
              <Globe2 size={30} />
              <div>
                <h3>Every connection becomes part of our story.</h3>
                <p>
                  Tour highlights will be added here after each engagement. In
                  the meantime, get to know the people behind eQOURSE.
                </p>
              </div>
              <Link to="/gallery" className="events-text-link">
                Explore our gallery <ArrowUpRight size={18} />
              </Link>
            </div>
          )}
        </section>
        <section className="events-section events-shell" id="upcoming">
          <motion.div {...reveal}>
            <div className="events-section-heading">
              <div>
                <p className="events-eyebrow">02 / THE NEXT CHAPTER</p>
                <h2>
                  Upcoming Events &<br />
                  <span>Business Tours</span>
                </h2>
              </div>
              <p>
                Discover where eQOURSE will be next. Meet our team to discuss AI
                data services, learning solutions, multilingual data and
                scalable content operations.
              </p>
            </div>
            <div
              className="events-filters"
              aria-label="Filter tours by destination"
            >
              {["All destinations", ...upcomingTours.map((e) => e.country)].map(
                (f) => (
                  <button
                    key={f}
                    aria-pressed={filter === f}
                    className={filter === f ? "active" : ""}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ),
              )}
            </div>
            <div className="events-tours-grid">
              {shown.map((e) => (
                <TourCard
                  key={e.slug}
                  event={e}
                  index={upcomingTours.indexOf(e)}
                />
              ))}
            </div>
          </motion.div>
        </section>
        <section className="events-global events-section" id="destinations">
          <div className="events-shell">
            <motion.div {...reveal}>
              <div className="events-section-heading">
                <div>
                  <p className="events-eyebrow">03 / A WORLD OF OPPORTUNITY</p>
                  <h2>
                    Connecting Across Global
                    <br />
                    <span>AI & Education Markets</span>
                  </h2>
                </div>
                <p>
                  Connecting with organisations across key global markets
                  looking for scalable AI data and learning solutions. Explore
                  our planned destinations.
                </p>
              </div>
              <GlobalEventsMap />
            </motion.div>
          </div>
        </section>
        <section className="events-section events-shell">
          <motion.div {...reveal}>
            <div className="events-section-heading">
              <div>
                <p className="events-eyebrow">
                  04 / THE CONVERSATIONS THAT MATTER
                </p>
                <h2>
                  What We Bring
                  <br />
                  <span>to Global Events</span>
                </h2>
              </div>
              <p>
                From the first dataset to the next learning experience. Bring
                your challenge; we’ll bring the expertise.
              </p>
            </div>
            <div className="events-services">
              {eventServices.map((s, i) => {
                const Icon = icons[i];
                return (
                  <Link key={s.title} to={s.href} className="events-service">
                    <Icon size={27} />
                    <span className="service-index">0{i + 1}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <span className="events-text-link">
                      Explore service <ArrowUpRight size={17} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </section>
        <section className="events-gallery-section" id="gallery">
          <div className="events-shell">
            <div className="events-section-heading">
              <div>
                <p className="events-eyebrow">
                  05 / PEOPLE. IDEAS. CONNECTIONS.
                </p>
                <h2>eQOURSE Around the World</h2>
              </div>
              <Link to="/gallery" className="events-text-link">
                See the full gallery <ArrowUpRight size={18} />
              </Link>
            </div>
            <p className="events-gallery-intro">
              A look inside our team, working spaces and business engagements.
            </p>
            <div className="events-gallery">
              {[22, 23, 24, 10, 17, 16].map((n, i) => (
                <Link
                  to="/gallery"
                  key={n}
                  className={`gallery-frame gallery-frame-${i}`}
                >
                  <img
                    src={`/assets/about/gallery/${n}.webp`}
                    alt={
                      [
                        "eQOURSE team during an international technology visit",
                        "eQOURSE team at a collaborative business meeting",
                        "eQOURSE team at an innovation centre",
                        "eQOURSE office and team gallery",
                        "eQOURSE team at an industry networking engagement",
                        "eQOURSE partner meeting",
                      ][i]
                    }
                    loading="lazy"
                    width="800"
                    height="600"
                  />
                  <span>
                    {
                      [
                        "New perspectives",
                        "Shared ambition",
                        "Human expertise",
                        "Our everyday",
                        "Building connections",
                        "Growing together",
                      ][i]
                    }
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="events-section events-shell events-proof">
          <motion.div {...reveal}>
            <p className="events-eyebrow">
              06 / YOUR NEXT PROJECT STARTS WITH A CONVERSATION
            </p>
            <h2>
              Let’s Talk About Your Next
              <br />
              <span>AI or Learning Project</span>
            </h2>
            <p>
              Whether you’re building AI models, scaling multilingual datasets
              or developing digital learning programmes, meet our team to
              explore how our global expert network and delivery capabilities
              can support your project.
            </p>
            <div className="events-proof-grid">
              {[
                ["1,000+", "Verified Experts"],
                ["1M+", "AI Training Prompts"],
                ["Up to 4,000", "Learning Resources / Day"],
                ["Global", "Delivery Capabilities"],
              ].map(([v, l]) => (
                <div key={l}>
                  <strong>{v}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <div className="events-cta-row">
              <Link to={meet} className="events-button">
                Meet Our Team <ArrowUpRight size={18} />
              </Link>
              <Link to="/contact-us" className="events-text-link">
                Contact eQOURSE <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </section>
        <section className="events-faq-section events-section" id="event-faq">
          <div className="events-shell events-faq-layout">
            <div>
              <p className="events-eyebrow">07 / GOOD TO KNOW</p>
              <h2>
                Frequently
                <br />
                Asked Questions
              </h2>
              <p>
                Planning to connect with us?
                <br />
                Start here.
              </p>
            </div>
            <div>
              {eventFaqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <Plus size={20} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="events-final">
          <div className="events-shell">
            <p className="events-eyebrow">
              THE NEXT CONNECTION COULD CHANGE EVERYTHING.
            </p>
            <h2>
              Meet eQOURSE at
              <br />
              an Upcoming Event.
            </h2>
            <p>
              Looking to discuss AI data, multilingual datasets, learning
              solutions or scalable content operations? Connect with our team
              before the event and schedule a conversation.
            </p>
            <div className="events-cta-row">
              <a href="#upcoming" className="events-button events-button-light">
                View Upcoming Events <ArrowUpRight size={18} />
              </a>
              <Link to={meet} className="events-button events-button-ghost">
                Schedule a Meeting <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
