import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FileJson, Globe2, Check, Download, Eye, ChevronDown } from "lucide-react";
import type { SampleShowcase } from "./aiDataSamplesData";
import { PreviewFilesModal, type PreviewFile } from "../../shared/PreviewFilesModal";
import { NlpInteractiveThumbnail } from "./NlpInteractiveThumbnails";
import { AudioInteractiveThumbnail } from "./AudioInteractiveThumbnails";
import { RlhfInteractiveThumbnail } from "./RlhfInteractiveThumbnails";
import { DataCollectionInteractiveThumbnail } from "./DataCollectionInteractiveThumbnails";
import { CleanedDatasetsInteractiveThumbnail } from "./CleanedDatasetsInteractiveThumbnails";
import { ComputerVisionInteractiveThumbnail } from "./ComputerVisionInteractiveThumbnails";
import { fetchSampleFiles, fetchSampleTabSettings } from "@/lib/publicApi";

interface Props {
  showcases: SampleShowcase[];
  categorySlug?: string;
  heading?: string;
  subtext?: string;
}

const SampleShowcaseGrid = ({
  showcases,
  categorySlug = "nlp-annotation",
  heading = "Sample Showcase",
  subtext = "Representative outputs across every task we support - each delivered with full metadata, QA logs, and the output format your pipeline needs.",
}: Props) => {
  const [active, setActive] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [apiFiles, setApiFiles] = useState<PreviewFile[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const visibleShowcases = showcases.filter((item) => visibility[item.title] !== false);

  useEffect(() => {
    let mounted = true;
    const refresh = () => fetchSampleTabSettings(categorySlug).then((settings) => {
      if (mounted) {
        setVisibility(settings);
        setActive(0);
      }
    });
    refresh();
    window.addEventListener("sample-tab-settings-changed", refresh);
    return () => {
      mounted = false;
      window.removeEventListener("sample-tab-settings-changed", refresh);
    };
  }, [categorySlug]);

  useEffect(() => {
    if (showPreview) return;
    const t = setInterval(() => {
      if (visibleShowcases.length > 1) setActive((p) => (p + 1) % visibleShowcases.length);
    }, 4200);
    return () => clearInterval(t);
  }, [visibleShowcases.length, showPreview]);

  const current = visibleShowcases[active];

  useEffect(() => {
    if (!current) return;
    let activeRequest = true;
    setLoading(true);
    fetchSampleFiles(categorySlug, current.title).then((res) => {
      if (!activeRequest) return;
      setApiFiles(res);
      setLoading(false);
    });
    return () => {
      activeRequest = false;
    };
  }, [categorySlug, current]);

  if (!current) return null;

  const currentPreviewFiles = apiFiles && apiFiles.length > 0 ? apiFiles : (current.previewFiles || []);

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="absolute top-10 right-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Live Sample Preview
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {subtext}
          </p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Left: Task list */}
          <div ref={listRef} className="flex flex-col gap-2">
            {visibleShowcases.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className={`group text-left p-4 md:p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                      : "bg-card border-border/60 hover:border-primary/40 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary group-hover:bg-primary/20"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm md:text-base leading-tight ${isActive ? "text-white" : "text-foreground"}`}>
                        {s.title}
                      </div>
                      <div className={`text-xs mt-0.5 truncate ${isActive ? "text-white/75" : "text-muted-foreground"}`}>
                        {s.format}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/40">
                      <div className="h-full bg-white animate-[chipBarFill_4.2s_linear_forwards]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Detail panel */}
          <div
            key={active}
            className="relative rounded-3xl border border-border/60 bg-card p-6 md:p-8 shadow-card animate-slide-up min-h-[360px] overflow-hidden flex flex-col"
          >
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-primary mb-3">
                    <span className="w-6 h-px bg-primary" /> Sample {active + 1} of {visibleShowcases.length}
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-2 leading-tight">
                    {current.title}
                  </h3>
                  {current.teaser && (
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {current.teaser}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 flex-shrink-0 sm:items-end">
                  <div className="inline-flex items-center gap-2 text-[11px] md:text-xs font-medium text-foreground bg-primary/5 border border-primary/15 px-3 py-1.5 rounded-full">
                    <FileJson className="w-3.5 h-3.5 text-primary" /> {current.format}
                  </div>
                  <div className="inline-flex items-center gap-2 text-[11px] md:text-xs font-medium text-foreground bg-accent/5 border border-accent/15 px-3 py-1.5 rounded-full">
                    <Globe2 className="w-3.5 h-3.5 text-accent-foreground" /> {current.languages}
                  </div>
                </div>
              </div>

              <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] bg-gradient-to-b from-[#0d1325] to-[#070b18] rounded-2xl overflow-hidden shadow-[0_18px_40px_-20px_rgba(10,15,30,0.5),inset_0_0_0_1px_rgba(255,255,255,0.04)] mb-6 flex-shrink-0">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-400/10 bg-gradient-to-b from-white/5 to-transparent">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-[11px] text-slate-400/70 font-mono tracking-wide">
                    {current.id ? `interactive · ${current.id}.live` : 'preview · sample.json'}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-widest font-bold">
                    {current.id ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
                        <span className="text-emerald-400">LIVE</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-primary">DATA</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Animated stage */}
                <div className="relative h-[calc(100%-41px)] w-full flex items-center justify-center p-4">
                  {current.id ? (
                    <div className="absolute inset-0">
                      {categorySlug === "nlp-annotation" && <NlpInteractiveThumbnail sampleId={current.id} active={true} />}
                      {categorySlug === "audio-speech" && <AudioInteractiveThumbnail sampleId={current.id} active={true} />}
                      {categorySlug === "rlhf" && <RlhfInteractiveThumbnail sampleId={current.id} active={true} />}
                      {categorySlug === "data-collection" && <DataCollectionInteractiveThumbnail sampleId={current.id} active={true} />}
                      {categorySlug === "cleaned-datasets" && <CleanedDatasetsInteractiveThumbnail sampleId={current.id} active={true} />}
                      {categorySlug === "computer-vision" && <ComputerVisionInteractiveThumbnail sampleId={current.id!} active={true} />}
                    </div>
                  ) : (
                    <div className="w-full max-w-lg rounded-xl border border-white/10 bg-white/5 p-5 md:p-6 font-mono text-[11px] md:text-sm text-white/80 shadow-2xl backdrop-blur-md animate-slide-up">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-white font-medium">Format Validated</span>
                          <span className="text-white/40 hidden sm:inline">- schema compliant</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-white font-medium">Quality Checked</span>
                          <span className="text-white/40 hidden sm:inline">- gold-standard IAA</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-white font-medium">Audit Trail</span>
                          <span className="text-white/40 hidden sm:inline">- full provenance</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] bg-primary shadow-soft"
                >
                  <Eye className="w-4 h-4" />
                  Preview Files
                </button>
                {/* AI data sample pages render no #consultation section, so link to the contact page. */}
                <Link
                  to="/contact-us"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-all hover:bg-muted border-border text-foreground"
                >
                  <Download className="w-4 h-4" />
                  Request Full Set
                </Link>
              </div>

              {current.qa && (
                <div className="flex flex-wrap gap-x-4 gap-y-3 mt-5 pt-5 border-t border-dashed border-border/60">
                  {current.qa.map((q, i) => (
                    <span key={i} className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[9px]">
                        ✓
                      </span>
                      <span className="text-foreground font-semibold">{q.label}</span>
                      <span>- {q.detail}</span>
                    </span>
                  ))}
                </div>
              )}

              <details className="mt-5 group/details cursor-pointer">
                <summary className="text-sm font-bold text-primary flex items-center gap-1.5 select-none list-none outline-none">
                  More about this sample
                  <ChevronDown className="w-4 h-4 transition-transform group-open/details:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {current.description}
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
      
      <PreviewFilesModal 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        files={currentPreviewFiles}
        tabName={current.title}
        accentHsl="220 85% 55%" // Default accent
      />
    </section>
  );
};

export default SampleShowcaseGrid;
