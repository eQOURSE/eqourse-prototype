import { useState } from "react";
import { Download, Eye, FileText, Play, Sparkles, ChevronRight } from "lucide-react";
import type { EdtechSample } from "../edtechSamplesData";
import { PreviewFilesModal, type PreviewFile } from "../../shared/PreviewFilesModal";
import {
  CharacterAnimationThumb,
  ThreeDConceptThumb,
  MotionGraphicsThumb,
  WhiteboardAnimationThumb,
} from "./AnimatedThumbnails";
import { ARVRAnimatedThumbForTab } from "./ARVRAnimatedThumbnails";
import { ArticulateStorylineThumbForTab } from "./ArticulateStorylineThumbnails";
import { PenTabPPTThumbForTab } from "./PenTabPPTThumbnails";
import { FlashToHTMLThumbForTab } from "./FlashToHTMLThumbnails";
import { PromotionalVideoThumbForTab } from "./PromotionalVideoThumbnails";

interface Props {
  sample: EdtechSample;
}

const isVideoKind = (k: EdtechSample["kind"]) =>
  k === "video" || k === "video-landing";

const InteractiveSampleTabs = ({ sample }: Props) => {
  const [active, setActive] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const accent = `hsl(${sample.accentHsl})`;
  const accentSoft = `hsl(${sample.accentHsl} / 0.12)`;
  const accentBorder = `hsl(${sample.accentHsl} / 0.35)`;
  const isVideo = isVideoKind(sample.kind);

  const activeTabName = sample.tabs[active];
  let currentPreviewFiles = sample.previewFiles?.[activeTabName] || [];

  if (currentPreviewFiles.length === 0) {
    if (isVideo) {
      currentPreviewFiles = Array.from({ length: 25 }).map((_, i) => ({
        title: `${activeTabName} Demo Video ${i + 1}`,
        description: `A sample 1080p export demonstrating ${activeTabName.toLowerCase()} capabilities with full annotations.`,
        fileType: i % 3 === 0 ? "ZIP" : "MP4",
        fileUrl: "#",
        isExternal: false
      }));
    } else {
      currentPreviewFiles = Array.from({ length: 25 }).map((_, i) => ({
        title: `${activeTabName} - Sample Document ${i + 1}`,
        description: `Comprehensive sample for ${activeTabName.toLowerCase()} showcasing formatting and editorial standards.`,
        fileType: i % 2 === 0 ? "PDF" : "DOCX",
        fileUrl: "#",
        isExternal: i % 2 === 0
      }));
    }
  }

  return (
    <section id="samples" className="relative py-20 bg-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${accent} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: accentSoft, color: accent, border: `1px solid ${accentBorder}` }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Explore Sample Categories
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Choose a Category to Preview
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each tab opens a unique sample aligned to the {sample.navLabel.toLowerCase()} category.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {sample.tabs.map((tab, i) => {
            const isActive = i === active;
            return (
              <button
                key={tab}
                onClick={() => setActive(i)}
                className="px-4 md:px-5 py-2.5 rounded-full text-sm font-semibold transition-all border"
                style={{
                  backgroundColor: isActive ? accent : "hsl(var(--muted) / 0.5)",
                  color: isActive ? "white" : "hsl(var(--foreground))",
                  borderColor: isActive ? accent : "hsl(var(--border))",
                  boxShadow: isActive ? `0 8px 20px hsl(${sample.accentHsl} / 0.3)` : "none",
                  transform: isActive ? "translateY(-1px)" : "none",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Preview panel */}
        <div
          key={active}
          className="relative grid lg:grid-cols-5 gap-6 rounded-3xl border overflow-hidden shadow-elevated animate-slide-up"
          style={{
            background: `linear-gradient(135deg, ${accentSoft}, hsl(var(--card)))`,
            borderColor: accentBorder,
          }}
        >
          {/* Left: animated preview */}
          <div
            className="lg:col-span-3 relative min-h-[360px] flex items-center justify-center p-6 md:p-10"
            style={{
              background: `linear-gradient(135deg, hsl(${sample.accentHsl} / 0.22), hsl(222 47% 11% / 0.85))`,
            }}
          >
            {/* Scanning beam */}
            <div
              className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}22, transparent)`,
                animation: "dash-flow 4s linear infinite",
              }}
            />

            {sample.slug === "immersive-simulation-ar-vr-video" ? (
              <ARVRAnimatedThumbForTab tabIndex={active} accent={accent} />
            ) : sample.slug === "2d-3d-video-samples" ? (
              <AnimatedThumbForTab tabIndex={active} accent={accent} />
            ) : sample.slug === "ai-avatar-video-samples" ? (
              <AIAvatarVideoThumbForTab tabIndex={active} accent={accent} />
            ) : sample.slug === "articulate-storyline-video-samples" ? (
              <ArticulateStorylineThumbForTab tabIndex={active} accent={accent} />
            ) : sample.slug === "pen-tab-and-ppt-samples" ? (
              <PenTabPPTThumbForTab tabIndex={active} accent={accent} />
            ) : sample.slug === "flash-to-html-samples" ? (
              <FlashToHTMLThumbForTab tabIndex={active} accent={accent} />
            ) : sample.slug === "promotional-video" ? (
              <PromotionalVideoThumbForTab tabIndex={active} accent={accent} />
            ) : isVideo ? (
              <VideoPreview accent={accent} tab={sample.tabs[active]} />
            ) : (
              <PageFlipPreview accent={accent} tab={sample.tabs[active]} />
            )}
          </div>

          {/* Right: info */}
          <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-between bg-card">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: accentSoft, border: `1px solid ${accentBorder}` }}
                >
                  <sample.icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  Sample {active + 1} of {sample.tabs.length}
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                {sample.tabs[active]}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {sample.tabContent?.[sample.tabs[active]] ??
                  `Curated ${sample.tabs[active]} sample from our ${sample.navLabel.toLowerCase()} library — production-ready, curriculum-aligned, and ready to customize for your platform.`}
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "Curriculum-aligned content",
                  "Ready for LMS integration",
                  "Customizable to your brand",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <ChevronRight
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: accent }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowPreview(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ backgroundColor: accent }}
              >
                {isVideo ? <Play className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                Preview Sample
              </button>
              <a
                href="#consultation"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-muted"
                style={{ borderColor: accentBorder, color: accent }}
              >
                <Download className="w-4 h-4" />
                Request
              </a>
            </div>
          </div>
        </div>
      </div>

      <PreviewFilesModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        files={currentPreviewFiles}
        tabName={activeTabName}
        accentHsl={sample.accentHsl}
      />
    </section>
  );
};

const PageFlipPreview = ({ accent, tab }: { accent: string; tab: string }) => (
  <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1200px" }}>
    <div className="relative w-full max-w-[280px] aspect-[3/4]">
    {/* Stack of pages */}
    <div
      className="absolute inset-0 rounded-lg bg-white shadow-2xl border border-white/20"
      style={{ transform: "rotate(-4deg) translate(-8px,6px)", opacity: 0.7 }}
    />
    <div
      className="absolute inset-0 rounded-lg bg-white shadow-2xl border border-white/20"
      style={{ transform: "rotate(-2deg) translate(-4px,3px)", opacity: 0.85 }}
    />
    {/* Top page */}
    <div
      className="relative h-full rounded-lg bg-white shadow-2xl border border-white/30 p-5 overflow-hidden"
      style={{ animation: "slide-up 0.6s ease-out" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4" style={{ color: accent }} />
        <span
          className="text-[9px] font-bold uppercase tracking-widest"
          style={{ color: accent }}
        >
          Sample Document
        </span>
      </div>
      <div className="text-[11px] font-bold text-gray-800 mb-3 leading-tight">{tab}</div>
      {/* Mock lines */}
      {[95, 88, 92, 70, 96, 82, 90, 75].map((w, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full mb-2"
          style={{
            width: `${w}%`,
            backgroundColor: i % 4 === 0 ? accent : "#e5e7eb",
            opacity: i % 4 === 0 ? 0.4 : 1,
            animation: `slide-up 0.4s ease-out ${i * 0.06}s both`,
          }}
        />
      ))}
      {/* Mini chart */}
      <div
        className="mt-3 h-12 rounded"
        style={{
          background: `linear-gradient(90deg, ${accent}22, ${accent}11)`,
          border: `1px dashed ${accent}55`,
        }}
      />
    </div>
    </div>
  </div>
);

const VideoPreview = ({ accent, tab }: { accent: string; tab: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, hsl(222 47% 8%), hsl(222 47% 15%))`,
      }}
    />
    {/* Waveform */}
    <div className="absolute inset-0 flex items-end justify-around px-6 pb-16 opacity-40">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="w-1 rounded-full"
          style={{
            height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
            backgroundColor: accent,
            animation: `slide-up 0.6s ease-out ${i * 0.02}s both`,
          }}
        />
      ))}
    </div>
    {/* Play button */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer group"
        style={{ backgroundColor: accent }}
      >
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: accent, opacity: 0.3 }}
        />
        <Play className="w-8 h-8 text-white ml-1" fill="white" />
      </div>
    </div>
    {/* Progress bar */}
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
      <div className="flex items-center gap-2 text-[10px] text-white/70 mb-2">
        <span>0:14</span>
        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              backgroundColor: accent,
              width: "35%",
              animation: "chip-bar-fill 3s ease-in-out infinite",
            }}
          />
        </div>
        <span>2:45</span>
      </div>
    </div>
    {/* Title overlay */}
    <div className="absolute top-3 left-3 right-3">
      <div className="inline-block px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10">
        <span className="text-[10px] font-semibold text-white">{tab}</span>
      </div>
    </div>
  </div>
);

/* ─── Animated thumbnail selector for 2D/3D page ─── */
const AnimatedThumbForTab = ({ tabIndex, accent }: { tabIndex: number; accent: string }) => {
  switch (tabIndex) {
    case 0: return <CharacterAnimationThumb accent={accent} />;
    case 1: return <ThreeDConceptThumb accent={accent} />;
    case 2: return <MotionGraphicsThumb accent={accent} />;
    case 3: return <WhiteboardAnimationThumb accent={accent} />;
    default: return <CharacterAnimationThumb accent={accent} />;
  }
};

/* ─── Real video thumbnail for AI Avatar page ─── */
const AI_AVATAR_VIDEOS: Record<number, { src: string; label: string }> = {
  0: { src: "/ai-generated-new.mp4", label: "AI Presenter Videos" },
  1: { src: "/aiavtar-new.mp4", label: "Multilingual AI Avatar Videos" },
};

const AIAvatarVideoThumbForTab = ({ tabIndex, accent }: { tabIndex: number; accent: string }) => {
  const entry = AI_AVATAR_VIDEOS[tabIndex] ?? AI_AVATAR_VIDEOS[0];

  return (
    <div className="ai-avatar-thumb-wrapper">
      <video
        key={entry.src}
        className="ai-avatar-thumb-video"
        src={entry.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      {/* Gradient overlay */}
      <div
        className="ai-avatar-thumb-overlay"
        style={{
          background: `linear-gradient(0deg, ${accent}55 0%, transparent 40%, transparent 60%, ${accent}22 100%)`,
        }}
      />
      {/* Tab label badge */}
      <div className="ai-avatar-thumb-badge">
        <span>{entry.label}</span>
      </div>
    </div>
  );
};

export default InteractiveSampleTabs;
