import { Helmet } from "react-helmet-async";
import { useParams, Navigate, Link } from "react-router-dom";
import { Download, ArrowLeft, Share2, FileText } from "lucide-react";
import { getEventBySlug } from "@/components/events/eventsData";

/**
 * Standalone PDF preview page — designed as a dedicated shareable link.
 * When someone clicks a link like eqourse.com/events/business-tour-2026/brochure,
 * they land directly on this full-screen PDF viewer.
 */
const EventBrochure = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? getEventBySlug(slug) : undefined;

  if (!event || !event.brochure) return <Navigate to="/events" replace />;

  const pageUrl = `https://www.eqourse.com/events/${event.slug}/brochure`;
  const pdfUrl = event.brochure.url;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${event.brochure!.label} — ${event.title}`,
        text: event.description,
        url: pageUrl,
      });
    } else {
      await navigator.clipboard.writeText(pageUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`${event.brochure.label} | ${event.title} | eQOURSE`}</title>
        <meta name="description" content={`Download the ${event.brochure.label}. ${event.description}`} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`${event.brochure.label} — ${event.title}`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        {event.ogImage && <meta property="og:image" content={event.ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Event</span>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-500 shrink-0" />
              <h1 className="text-sm font-semibold text-foreground truncate">{event.brochure.label}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <a
              href={pdfUrl}
              download={event.brochure.filename}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </div>
        </div>
      </header>

      {/* PDF Preview */}
      <main className="flex-1 flex flex-col">
        {/* Primary: iframe embed */}
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
          title={event.brochure.label}
          className="flex-1 w-full border-0"
          style={{ minHeight: "calc(100vh - 60px)" }}
        />

        {/* Fallback for browsers that don't support PDF iframe */}
        <noscript>
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-20 px-4 text-center">
            <FileText className="w-16 h-16 text-muted-foreground" />
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">PDF Preview</h2>
              <p className="text-muted-foreground mb-6">
                Your browser doesn't support inline PDF viewing. Click below to download the file.
              </p>
              <a
                href={pdfUrl}
                download={event.brochure.filename}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>
        </noscript>
      </main>
    </div>
  );
};

export default EventBrochure;
