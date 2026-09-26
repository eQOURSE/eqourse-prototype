import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  FileText,
  PlayCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";
import { pageSeo } from "@/seo/pageSeo";
import { events, type EventData } from "@/components/events/eventsData";

const PAGE_SEO = pageSeo["/events"];

const statusBadge: Record<EventData["status"], { label: string; className: string }> = {
  upcoming: { label: "Upcoming", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  ongoing: { label: "Live Now", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  completed: { label: "Completed", className: "bg-muted text-muted-foreground border-border" },
};

const EventCard = ({ event }: { event: EventData }) => {
  const badge = statusBadge[event.status];
  return (
    <Link
      to={`/events/${event.slug}`}
      id={`event-card-${event.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.parentElement!.classList.add("flex", "items-center", "justify-center");
            const fallback = document.createElement("div");
            fallback.className = "text-6xl font-bold text-primary/20";
            fallback.textContent = event.title.charAt(0);
            target.parentElement!.appendChild(fallback);
          }}
        />
        <div className="absolute top-4 left-4 z-20">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${badge.className}`}>
            {event.status === "ongoing" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
            {badge.label}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">{event.title}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <p className="text-sm text-muted-foreground font-medium">{event.subtitle}</p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            {event.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            {event.location}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {event.description}
        </p>

        {/* Asset indicators */}
        <div className="flex items-center gap-3 pt-2 border-t border-border/50">
          {event.brochure && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              <FileText className="w-3.5 h-3.5" />
              Brochure
            </span>
          )}
          {event.video && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              <PlayCircle className="w-3.5 h-3.5" />
              Video
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const Events = () => {
  const [filter, setFilter] = useState<"all" | EventData["status"]>("all");
  const filteredEvents = filter === "all" ? events : events.filter((e) => e.status === filter);

  return (
    <PageLayout breadcrumbs={[{ label: "Events" }]}>
      <Helmet>
        <title>{PAGE_SEO?.title ?? "Events | eQOURSE"}</title>
        <meta name="description" content={PAGE_SEO?.description ?? "Explore eQOURSE events, business tours, and presentations."} />
        <link rel="canonical" href="https://www.eqourse.com/events" />
        <meta property="og:title" content={PAGE_SEO?.title ?? "Events | eQOURSE"} />
        <meta property="og:description" content={PAGE_SEO?.description ?? "Explore eQOURSE events, business tours, and presentations."} />
        <meta property="og:url" content="https://www.eqourse.com/events" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-primary opacity-[0.03] z-0" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium border rounded-full border-primary/20 text-primary bg-primary/5 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            Business Tours & Presentations
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up">
            eQOURSE <span className="text-primary">Events</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-in-up">
            Explore our business tours, presentations, brochures, and videos. Download resources or watch presentations directly from any device.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-background border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            {(["all", "upcoming", "ongoing", "completed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all whitespace-nowrap ${
                  filter === status
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {status === "all" ? "All Events" : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No events found for the selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Events;
