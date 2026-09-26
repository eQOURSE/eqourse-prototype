import { Helmet } from "react-helmet-async";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Share2, Download, PlayCircle } from "lucide-react";
import { getEventBySlug } from "@/components/events/eventsData";

/**
 * Standalone video player page — designed as a dedicated shareable link.
 * When someone clicks a link like eqourse.com/events/business-tour-2026/video,
 * they land directly on this full-screen video player.
 */
const EventVideo = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? getEventBySlug(slug) : undefined;

  if (!event || !event.video) return <Navigate to="/events" replace />;

  const pageUrl = `https://www.eqourse.com/events/${event.slug}/video`;
  const videoUrl = event.video.url;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${event.video!.label} — ${event.title}`,
        text: event.description,
        url: pageUrl,
      });
    } else {
      await navigator.clipboard.writeText(pageUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Helmet>
        <title>{`${event.video.label} | ${event.title} | eQOURSE`}</title>
        <meta name="description" content={`Watch the ${event.video.label}. ${event.description}`} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`${event.video.label} — ${event.title}`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="video.other" />
        <meta property="og:video" content={videoUrl} />
        <meta property="og:video:type" content={event.video.mimeType} />
        {event.ogImage && <meta property="og:image" content={event.ogImage} />}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={`${event.video.label} — ${event.title}`} />
        <meta name="twitter:description" content={event.description} />
        {/* VideoObject Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: event.video.label,
            description: event.description,
            contentUrl: videoUrl,
            thumbnailUrl: event.ogImage || event.coverImage,
            uploadDate: event.date,
            publisher: {
              "@type": "Organization",
              name: "eQOURSE",
              url: "https://www.eqourse.com",
            },
          })}
        </script>
      </Helmet>

      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Event</span>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-purple-400 shrink-0" />
              <h1 className="text-sm font-semibold text-white truncate">{event.video.label}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 text-white/70 hover:text-white transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <a
              href={videoUrl}
              download={event.video.filename}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 text-white/70 hover:text-white transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </div>
        </div>
      </header>

      {/* Video Player */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-contain bg-black"
              poster={event.coverImage}
            >
              <source src={videoUrl} type={event.video.mimeType} />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className="mt-6 px-2">
            <h2 className="text-xl font-bold text-white mb-2">{event.video.label}</h2>
            <p className="text-sm text-white/60">{event.title} — {event.dateLabel} · {event.location}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventVideo;
