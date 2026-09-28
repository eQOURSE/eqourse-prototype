import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  FileText,
  PlayCircle,
  Download,
  ExternalLink,
  Share2,
  ChevronRight,
} from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";
import { getEventBySlug } from "@/components/events/eventsData";

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? getEventBySlug(slug) : undefined;

  if (!event) return <Navigate to="/events" replace />;

  const shareUrl = `https://www.eqourse.com/events/${event.slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: event.title, text: event.description, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <PageLayout breadcrumbs={[{ label: "Events", href: "/events" }, { label: event.title }]}>
      <Helmet>
        <title>{`${event.title} | eQOURSE Events`}</title>
        <meta name="description" content={event.description} />
        <link rel="canonical" href={shareUrl} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        {event.ogImage && <meta property="og:image" content={event.ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.title} />
        <meta name="twitter:description" content={event.description} />
        {event.ogImage && <meta name="twitter:image" content={event.ogImage} />}
        {/* Event Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            description: event.description,
            startDate: event.date,
            eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
            eventStatus: event.status === "completed"
              ? "https://schema.org/EventPostponed"
              : "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: event.location,
            },
            organizer: {
              "@type": "Organization",
              name: "eQOURSE",
              url: "https://www.eqourse.com",
            },
            image: event.ogImage || event.coverImage,
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-primary opacity-[0.03] z-0" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl">
            {/* Status Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${
                event.status === "upcoming"
                  ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                  : event.status === "ongoing"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : "bg-muted text-muted-foreground border-border"
              }`}>
                {event.status === "ongoing" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              {event.title}
            </h1>
            <p className="text-lg text-primary font-medium mb-6">{event.subtitle}</p>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {event.dateLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {event.location}
              </span>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
              {event.description}
            </p>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share Event
            </button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">Event Resources</h2>
          <p className="text-muted-foreground mb-10">Download brochures, watch presentations, and explore event materials.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Brochure Card */}
            {event.brochure && (
              <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{event.brochure.label}</h3>
                    <p className="text-sm text-muted-foreground">View the complete brochure with our service capabilities, case studies, and partnership details.</p>
                  </div>
                  <div className="flex items-center gap-3 mt-auto pt-4">
                    <Link
                      to={`/events/${event.slug}/brochure`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Preview
                    </Link>
                    <a
                      href={event.brochure.url}
                      download={event.brochure.filename}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Video Card */}
            {event.video ? (
              <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{event.video.label}</h3>
                    <p className="text-sm text-muted-foreground">Watch our full presentation video showcasing eQOURSE's AI data and content capabilities.</p>
                  </div>
                  <div className="flex items-center gap-3 mt-auto pt-4">
                    <Link
                      to={`/events/${event.slug}/video`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Watch Now
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-border/80 bg-card/50 shadow-sm">
                <div className="p-6 flex flex-col gap-4 flex-1 items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-muted-foreground mb-1">Presentation Video</h3>
                    <p className="text-sm text-muted-foreground">Coming soon — stay tuned for our presentation video.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Extra Assets */}
          {event.extras.length > 0 && (
            <div className="mt-10 max-w-4xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Additional Resources</h3>
              <div className="space-y-3">
                {event.extras.map((asset, i) => (
                  <a
                    key={i}
                    href={asset.url}
                    download={asset.filename}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-sm transition-all group"
                  >
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{asset.label}</span>
                    <Download className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Body Content */}
      {event.body && (
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
              {event.body.split("\n").map((line, i) => {
                if (line.startsWith("### ")) return <h3 key={i}>{line.replace("### ", "")}</h3>;
                if (line.startsWith("- **")) {
                  const match = line.match(/^- \*\*(.+?)\*\* — (.+)$/);
                  if (match) return <li key={i}><strong>{match[1]}</strong> — {match[2]}</li>;
                  return <li key={i}>{line.replace(/^- /, "")}</li>;
                }
                if (line.startsWith("- ")) return <li key={i}>{line.replace(/^- /, "")}</li>;
                if (line.trim() === "") return null;
                return <p key={i}>{line}</p>;
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Interested in Learning More?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get in touch with our team to discuss partnership opportunities or schedule a personalized presentation.
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
          >
            Contact Us
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default EventDetail;
