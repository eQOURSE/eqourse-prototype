import { useEffect, useRef, useState } from "react";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, CheckCircle2, CircleDot, Eye, FileScan, Focus, Layers3, ScanLine, ShieldCheck } from "lucide-react";
import FAQSection from "../../shared/FAQSection";
import SectionHeader from "../../shared/SectionHeader";
import {
  computerVisionFaqs,
  deliverableRows,
  engagementModels,
  engagementSteps,
  failureRows,
  metricRows,
  ocrRows,
  relatedServices,
  shiftRows,
  systemRows,
  testControls,
  vlmChecks,
} from "./ComputerVisionContent";

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), {
      rootMargin: "0px 0px -8%",
      threshold: 0.08,
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`cv-reveal min-w-0 ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
};

const DataTable = ({ headers, rows, minWidth = 760 }: { headers: readonly string[]; rows: readonly (readonly string[])[]; minWidth?: number }) => (
  <div className="max-w-full overflow-x-auto rounded-[1.6rem] border border-border bg-card shadow-sm" tabIndex={0} role="region" aria-label={`${headers[0]} table`}>
    <table className="w-full border-collapse text-left" style={{ minWidth }}>
      <thead className="bg-[#0d1c2c] text-white">
        <tr>{headers.map((header) => <th key={header} scope="col" className="border-r border-white/10 px-5 py-4 font-heading text-sm font-bold last:border-r-0">{header}</th>)}</tr>
      </thead>
      <tbody>{rows.map((row, i) => (
        <tr key={`${row[0]}-${i}`} className="border-t border-border transition-colors hover:bg-primary/[.035]">
          {row.map((cell, j) => <td key={j} className={`border-r border-border px-5 py-4 align-top text-sm leading-6 last:border-r-0 ${j === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{cell}</td>)}
        </tr>
      ))}</tbody>
    </table>
  </div>
);

export const ComputerVisionMotionStyles = () => <style>{`
  .cv-reveal{opacity:0;transform:translateY(22px);transition:opacity .65s ease,transform .65s ease}.cv-reveal.is-visible{opacity:1;transform:none}
  .cv-bar{transform-box:fill-box;transform-origin:left;animation:cvGrow 1.2s cubic-bezier(.2,.7,.2,1) both}.cv-scan{animation:cvScan 5.5s ease-in-out infinite}.cv-dash{stroke-dasharray:9 8;animation:cvDash 8s linear infinite}.cv-pulse{transform-box:fill-box;transform-origin:center;animation:cvPulse 2.6s ease-in-out infinite}
  @keyframes cvGrow{from{transform:scaleX(.05);opacity:.2}to{transform:scaleX(1);opacity:1}}@keyframes cvScan{0%,100%{transform:translateX(-20%);opacity:.08}50%{transform:translateX(105%);opacity:.35}}@keyframes cvDash{to{stroke-dashoffset:-170}}@keyframes cvPulse{50%{transform:scale(1.12);opacity:.72}}
  @media(prefers-reduced-motion:reduce){.cv-reveal{opacity:1;transform:none}.cv-bar,.cv-scan,.cv-dash,.cv-pulse{animation:none}}
`}</style>;

const SliceBreakdownGraphic = () => {
  const slices = [
    ["daylight", 88, "#11a88f"],
    ["night", 54, "#ec9413"],
    ["rain", 43, "#ec9413"],
    ["small objects", 19, "#ef5b5b"],
    ["occluded", 38, "#ec9413"],
    ["class: rare", 27, "#ef5b5b"],
  ] as const;
  return (
    <div className="w-0 min-w-full max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label="Scrollable illustrative mAP slice chart">
      <svg viewBox="0 0 860 570" role="img" aria-labelledby="slice-title slice-desc" className="h-auto min-w-[680px] w-full">
        <title id="slice-title">Aggregate mAP compared with six deployment slices</title>
        <desc id="slice-desc">Illustrative values only. An aggregate mAP of 0.91 sits above six different slice values: daylight 0.88, night 0.54, rain 0.43, small objects 0.19, occluded 0.38 and rare class 0.27.</desc>
        <rect width="860" height="570" rx="28" fill="#fff" />
        <text x="54" y="58" fill="#0d1c2c" fontSize="22" fontWeight="700">One healthy average. Six different realities.</text>
        <text x="54" y="92" fill="#64748b" fontSize="13">ILLUSTRATIVE VALUES — NOT CLIENT MEASUREMENTS</text>
        <rect x="180" y="126" width="600" height="42" rx="12" fill="#dbe8e5" />
        <rect x="180" y="126" width="546" height="42" rx="12" fill="#0d1c2c" className="cv-bar" />
        <text x="54" y="153" fill="#0d1c2c" fontSize="17" fontWeight="700">mAP 0.91</text>
        <text x="737" y="153" fill="#0d1c2c" fontSize="14" fontWeight="700">0.91</text>
        {slices.map(([label, value, color], index) => {
          const y = 210 + index * 52;
          return <g key={label}>
            <text x="54" y={y + 20} fill="#334155" fontSize="14" fontWeight="600">{label}</text>
            <rect x="180" y={y} width="600" height="28" rx="8" fill="#edf2f1" />
            <rect x="180" y={y} width={value * 6} height="28" rx="8" fill={color} className="cv-bar" style={{ animationDelay: `${index * 110}ms` }} />
            <text x={Math.min(765, 190 + value * 6)} y={y + 20} fill="#0d1c2c" fontSize="13" fontWeight="700">{(value / 100).toFixed(2)}</text>
          </g>;
        })}
        <path d="M670 482 C730 475 770 455 790 420" fill="none" stroke="#ec9413" strokeWidth="3" className="cv-dash" />
        <text x="542" y="522" fill="#b86100" fontSize="16" fontWeight="700">all of this is inside that average</text>
      </svg>
    </div>
  );
};

const DistributionShiftGraphic = () => (
  <div className="w-0 min-w-full max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label="Scrollable distribution shift diagram">
    <svg viewBox="0 0 900 450" role="img" aria-labelledby="shift-title shift-desc" className="h-auto min-w-[720px] w-full">
      <title id="shift-title">Training distribution compared with deployment distribution</title>
      <desc id="shift-desc">Four arrows connect training and validation imagery to deployment imagery, showing capture, environment, semantic and population shifts.</desc>
      <rect width="900" height="450" rx="28" fill="#eef8f5" />
      <rect x="48" y="82" width="285" height="300" rx="24" fill="#fff" stroke="#b8d8d2" />
      <rect x="567" y="82" width="285" height="300" rx="24" fill="#0d1c2c" stroke="#264159" />
      <text x="190" y="52" textAnchor="middle" fill="#0d1c2c" fontSize="19" fontWeight="700">Training / validation</text>
      <text x="709" y="52" textAnchor="middle" fill="#0d1c2c" fontSize="19" fontWeight="700">Deployment</text>
      {[["one camera",125],["clean daylight",185],["curated classes",245],["familiar population",305]].map(([label,y]) => <g key={String(label)}><circle cx="90" cy={Number(y)} r="7" fill="#11a88f"/><text x="112" y={Number(y)+5} fill="#334155" fontSize="15">{String(label)}</text></g>)}
      {[["changed pixels",125],["mixed conditions",185],["world moved",245],["new region",305]].map(([label,y]) => <g key={String(label)}><circle cx="610" cy={Number(y)} r="7" fill="#ec9413"/><text x="632" y={Number(y)+5} fill="#fff" fontSize="15">{String(label)}</text></g>)}
      {shiftRows.map(([name], index) => { const y = 125 + index * 60; return <g key={name}><path d={`M350 ${y} C420 ${y-16} 480 ${y+16} 550 ${y}`} fill="none" stroke={index === 2 ? "#ec9413" : "#11a88f"} strokeWidth="3" markerEnd="url(#arrow)" className="cv-dash"/><rect x="388" y={y-19} width="125" height="29" rx="14" fill="#fff" stroke="#d6e5e1"/><text x="450" y={y+1} textAnchor="middle" fill="#0d1c2c" fontSize="12" fontWeight="700">{name.replace(" shift", "")}</text></g>})}
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#11a88f"/></marker></defs>
      <text x="450" y="420" textAnchor="middle" fill="#64748b" fontSize="14">The model may be unchanged. The question changed.</text>
    </svg>
  </div>
);

export const TestingScope = () => (
  <section className="bg-background py-20 md:py-24">
    <div className="container mx-auto px-4">
      <SectionHeader label="From pixels to product decisions" title="What We" gradientText="Test" subtitle="One evaluation programme can cover classic computer vision, document systems, tracking, 3D perception and vision-language behaviour." />
      <Reveal className="mx-auto max-w-7xl"><DataTable headers={["System type", "What we measure"]} rows={systemRows} minWidth={780} /></Reveal>
      <Reveal className="mx-auto mt-10 grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {[Camera, Focus, Layers3, FileScan].map((Icon, index) => {
          const items = [
            ["Scene reality", "Devices, lighting, weather and geography"],
            ["Operating point", "The threshold your product actually deploys"],
            ["Slice evidence", "Class × condition × cohort, never one blend"],
            ["Reference quality", "Ground truth with measured agreement"],
          ][index];
          return <article key={items[0]} className="bg-card p-7"><Icon className="h-6 w-6 text-primary"/><h3 className="mt-6 font-heading text-lg font-bold">{items[0]}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{items[1]}</p></article>;
        })}
      </Reveal>
    </div>
  </section>
);

export const BeyondMap = () => (
  <section id="beyond-map" className="scroll-mt-32 bg-[#0d1c2c] py-20 text-white md:py-24">
    <div className="container mx-auto px-4">
      <SectionHeader label="The distribution behind the headline" title="Why mAP" gradientText="Isn't Enough" dark subtitle="Production failures concentrate in a small number of slices. An aggregate score is where those failures go to disappear." />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <Reveal>
          <p className="font-heading text-2xl font-bold leading-9"><code className="rounded bg-white/10 px-2 py-1 text-[#51e2c2]">mAP@0.5 = 0.91</code> is a summary of a distribution you were never shown.</p>
          <p className="mt-5 leading-8 text-white/68">It averages classes, conditions, cohorts and the whole test set. Night rain, small objects at distance, one packaging variant or handwriting on one regional form can collapse while the headline barely moves.</p>
          <div className="mt-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white p-3 text-[#0d1c2c]"><SliceBreakdownGraphic /></div>
          <p className="mt-3 text-xs leading-5 text-white/50">Illustrative values only, shown to explain how slice failures can remain hidden inside an aggregate result. They are not eQOURSE or client measurements.</p>
        </Reveal>
        <Reveal><DataTable headers={["Metric", "What it tells you", "The trap"]} rows={metricRows} minWidth={720} /></Reveal>
      </div>
      <Reveal className="mx-auto mt-9 max-w-5xl rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6 text-center">
        <p className="font-heading text-xl font-bold text-amber-200">We agree the slices before we test, not after.</p>
        <p className="mt-2 text-sm leading-7 text-white/70">Conditions, devices, locations, times and object categories receive their own report line by written agreement at scoping.</p>
      </Reveal>
    </div>
  </section>
);

export const TestSetAndShift = () => (
  <>
    <section className="bg-[#edf8f5] py-20 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader label="Evaluation begins before scoring" title="The Test Set Is" gradientText="the Whole Ballgame" subtitle="Real deployment imagery is not a finishing detail. It determines whether every metric that follows is useful." />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="leading-8 text-muted-foreground">Most computer vision evaluations fail upstream: the test images share the same camera, curation, geography and conditions as the training data. The evaluation measures a model operating on home turf, while production is somewhere else.</p>
            <div className="mt-8 divide-y divide-border border-y border-border">{testControls.map(([title, text], index) => <article key={title} className="grid gap-3 py-4 sm:grid-cols-[36px_1fr]"><span className="font-mono text-xs font-bold text-primary">0{index + 1}</span><div><h3 className="font-heading font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></article>)}</div>
            <p className="mt-6 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">We can build the imagery, not just evaluate yours.</strong> Our <Link to="/ai-data-services/data-collection" className="font-semibold text-primary hover:underline">data collection network</Link> can source or commission missing conditions across regions, devices and environments.</p>
          </Reveal>
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-soft">
            <picture><source srcSet="/assets/ai-data/model-testing/computer-vision/deployment-street-condition.avif" type="image/avif"/><img src="/assets/ai-data/model-testing/computer-vision/deployment-street-condition.webp" alt="Mixed-traffic street scene at dusk—the kind of deployment condition where object-detection accuracy typically falls off" width="1200" height="675" loading="lazy" decoding="async" className="aspect-video w-full object-cover"/></picture>
            <div className="cv-scan absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-teal-300/30 to-transparent" />
            <div className="grid gap-px border-t border-border bg-border sm:grid-cols-3">{[["mixed light","dusk + practical"],["scale spread","near + distant"],["occlusion","dense traffic"]].map(([a,b]) => <div key={a} className="bg-white p-4"><p className="font-mono text-[10px] font-bold uppercase tracking-[.12em] text-primary">{a}</p><p className="mt-1 text-sm font-semibold">{b}</p></div>)}</div>
          </Reveal>
        </div>
      </div>
    </section>
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader label="Post-deployment decay" title="Why Models That Passed" gradientText="Still Fail" subtitle="The model may be intact. The distribution around it may have changed." />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <Reveal className="overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-soft"><DistributionShiftGraphic /></Reveal>
          <Reveal className="divide-y divide-border border-y border-border">{shiftRows.map(([title, cause, result], index) => <article key={title} className="grid gap-3 py-5 sm:grid-cols-[42px_1fr]"><span className="font-mono text-xs font-bold text-primary">0{index + 1}</span><div><h3 className="font-heading text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{cause}. <strong className="text-foreground">{result}.</strong></p></div></article>)}</Reveal>
        </div>
        <Reveal className="mx-auto mt-9 max-w-5xl border-l-4 border-primary bg-primary/5 p-6"><p className="font-heading text-xl font-bold">The most common finding is not a wrong model. It is a right model measured on the wrong images.</p><p className="mt-2 text-sm leading-7 text-muted-foreground">When that is the case, the fix is a better evaluation set—not a retrain.</p></Reveal>
      </div>
    </section>
  </>
);

export const FaceAndOCR = () => (
  <>
    <section className="bg-[#f4f1ff] py-20 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader label="Cohort × condition, never category alone" title="Face, Person and" gradientText="Demographic Performance" subtitle="The accurate question is not whether face recognition is generally biased. It is how this system performs on this population under these conditions." />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.82fr_1.18fr]">
          <Reveal className="rounded-[2rem] bg-[#18243a] p-8 text-white md:p-10">
            <Eye className="h-8 w-8 text-[#51e2c2]"/><h3 className="mt-7 font-heading text-2xl font-bold">The failure lives in a cell.</h3>
            <div className="mt-7 grid grid-cols-2 gap-2 text-xs">{["appearance factor","lighting","camera","distance"].map((label, index) => <div key={label} className={`rounded-xl border p-4 ${index === 3 ? "border-amber-300/40 bg-amber-300/10 text-amber-100" : "border-white/10 bg-white/5 text-white/75"}`}><CircleDot className="mb-3 h-4 w-4"/>{label}</div>)}</div>
            <p className="mt-7 text-sm leading-7 text-white/65">A system can be even-handed across skin tone in good light and diverge sharply under low illumination. We test the intersections.</p>
          </Reveal>
          <Reveal>
            <div className="space-y-5 text-[15px] leading-8 text-muted-foreground">
              <p>Demographic differentials are real and long documented. But the best current systems show very low differentials, so the useful claim is system-specific and condition-specific.</p>
              <p>Recent analysis points to <strong className="text-foreground">non-demographic but demographically correlated appearance factors</strong>—facial hair, hairstyle, headwear and makeup—as potentially explaining more of the differential than demographic categories alone.</p>
              <p>There is no settled consensus that perceived skin tone is the primary driver. <strong className="text-foreground">Skin reflectance</strong> is the more useful analytical variable because lower reflectance changes image contrast under poor lighting. That reframes part of the issue as an imaging problem with practical fixes in exposure, illumination, placement and dynamic range.</p>
              <p>Culturally patterned appearance cannot be reconstructed from generic metadata. The test set needs people who understand what the deployed population actually looks like.</p>
            </div>
            <p className="mt-7 rounded-2xl border border-primary/20 bg-white p-5 text-sm leading-7">Formal impact ratios, intersectional analysis and regulatory mapping belong in our <Link to="/ai-data-services/model-testing/bias-fairness-audit" className="font-semibold text-primary hover:underline">AI bias &amp; fairness audit</Link>.</p>
          </Reveal>
        </div>
      </div>
    </section>
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader label="The workflow consumes fields, not pages" title="OCR and Document" gradientText="Model Testing" subtitle="Character accuracy, field accuracy and structural extraction are different measurements. Only one may describe your product." />
        <Reveal className="mx-auto max-w-7xl"><DataTable headers={["Axis", "What we test", "Typical finding"]} rows={ocrRows} minWidth={940} /></Reveal>
        <Reveal className="mx-auto mt-8 max-w-5xl rounded-[1.5rem] border-l-4 border-amber-500 bg-amber-50 p-6"><p className="font-heading text-xl font-bold">98% character accuracy can still mean 70% field accuracy.</p><p className="mt-2 text-sm leading-7 text-slate-700">If errors cluster on digits in an amount or characters in an ID, the general score looks healthy while the workflow fails. We measure at the level the workflow consumes.</p></Reveal>
        <p className="mx-auto mt-7 max-w-4xl text-center text-sm leading-7 text-muted-foreground">Reference transcription connects to our <Link to="/ai-data-services/annotation-labeling/document-ocr-annotation" className="font-semibold text-primary hover:underline">document &amp; OCR annotation</Link>, <Link to="/digital-conversion" className="font-semibold text-primary hover:underline">digital conversion</Link> and <Link to="/metadata-services" className="font-semibold text-primary hover:underline">metadata services</Link> operations.</p>
      </div>
    </section>
  </>
);

export const VLMAndGroundTruth = () => (
  <>
    <section className="bg-[#0d1c2c] py-20 text-white md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader label="The failure is in the join" title="Testing Vision-Language" gradientText="Models" dark subtitle="VLMs need evidence about grounding, spatial reasoning and uncertainty—not only fluent descriptions." />
        <Reveal className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{vlmChecks.map(([title, text], index) => <article key={title} className={`bg-[#0d1c2c] p-7 ${index === 6 ? "lg:col-span-2" : ""}`}><span className="font-mono text-xs font-bold text-[#51e2c2]">0{index + 1}</span><h3 className="mt-5 font-heading text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{text}</p></article>)}</Reveal>
        <Reveal className="mx-auto mt-9 max-w-5xl rounded-2xl border border-amber-300/25 bg-amber-300/10 p-6 text-center"><p className="font-heading text-xl font-bold text-amber-200">A VLM that guesses confidently is worse than one that abstains.</p><p className="mt-2 text-sm leading-7 text-white/70">An uncertain result can route to a human. A confident fabrication enters the workflow as fact.</p></Reveal>
      </div>
    </section>
    <section className="bg-[#edf8f5] py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-primary">Reference quality is the measurement floor</p>
            <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight md:text-5xl">Ground Truth Is <span className="text-gradient">Part of the Instrument</span></h2>
            <p className="mt-5 leading-8 text-muted-foreground">Every vision metric measures agreement with an annotation. If the annotation is wrong, the metric is wrong—and the error is charged to the model.</p>
            <div className="mt-7 divide-y divide-border border-y border-border">{[
              ["Reference-grade, not production-grade", "Tighter geometry, stricter edge cases and full adjudication."],
              ["Measured agreement", "Double-passed sampling establishes reliability before findings."],
              ["Written edge-case policy", "Occlusion, reflection, truncation and ambiguous instances are decided consistently."],
              ["Domain review where needed", "Medical, industrial, agricultural and document-legal work uses qualified review."],
              ["Disagreement becomes evidence", "Genuine disagreement surfaces ambiguous class definitions instead of being silently erased."],
            ].map(([title, text]) => <div key={title} className="flex gap-3 py-4"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary"/><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}</div>
          </Reveal>
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-8 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">{[
              ["MODEL OUTPUT", "prediction boxes", "#0d1c2c"],
              ["REFERENCE", "adjudicated labels", "#11a88f"],
              ["DISAGREEMENT", "review required", "#ec9413"],
              ["MEASUREMENT", "error classified", "#7358bb"],
            ].map(([label, detail, color], index) => <div key={label} className="relative min-h-36 overflow-hidden rounded-2xl border border-border bg-slate-50 p-5"><ScanLine className="h-6 w-6" style={{ color }}/><p className="mt-8 font-mono text-[10px] font-bold tracking-[.14em]" style={{ color }}>{label}</p><p className="mt-2 font-heading text-lg font-bold">{detail}</p>{index < 3 && <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-muted-foreground"/>}</div>)}</div>
            <div className="cv-scan pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-teal-300/25 to-transparent" />
            <p className="mt-6 text-center text-sm font-semibold text-muted-foreground">Annotation error and model error are indistinguishable in the final number.</p>
          </Reveal>
        </div>
      </div>
    </section>
  </>
);

const EngagementDiagram = () => (
  <div>
    <div className="mb-7 hidden overflow-hidden rounded-[1.5rem] border border-border bg-[#0d1c2c] p-3 lg:block">
      <svg viewBox="0 0 1100 170" role="img" aria-labelledby="engagement-title engagement-desc" className="h-auto w-full">
        <title id="engagement-title">Six-step computer vision testing engagement</title>
        <desc id="engagement-desc">A connected timeline moves from scope and slice definition through test-set sourcing, reference annotation, evaluation, failure analysis and final reporting.</desc>
        <path d="M90 76 H1010" fill="none" stroke="#315064" strokeWidth="5" strokeLinecap="round" />
        <path d="M90 76 H1010" fill="none" stroke="#20c9a7" strokeWidth="3" strokeLinecap="round" className="cv-dash" />
        {engagementSteps.map(([number, title], index) => { const x = 90 + index * 184; return <g key={number}><circle cx={x} cy="76" r="24" fill={index === 5 ? "#ec9413" : "#11a88f"} className="cv-pulse"/><text x={x} y="82" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">{number}</text><text x={x} y="130" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{title.length > 22 ? `${title.slice(0, 21)}…` : title}</text></g>})}
      </svg>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Computer vision model testing engagement steps">{engagementSteps.map(([number, title, week, text], index) => <article key={number} role="listitem" className="relative min-h-52 overflow-hidden rounded-2xl border border-border bg-white p-6 group"><div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-primary/5 group-hover:w-20 group-hover:h-20 transition-all" /><span className="font-mono text-2xl font-bold text-primary">{number}</span><p className="mt-4 text-xs font-bold uppercase tracking-[.14em] text-amber-600">{week}</p><h3 className="mt-2 font-heading text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>{index < 5 && <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-primary/40"/>}</article>)}</div>
  </div>
);

export const EngagementAndEvidence = () => (
  <>
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader label="Reusable evaluation infrastructure" title="How an Engagement" gradientText="Runs" subtitle="The first programme builds the evidence system. Every later model version becomes faster to compare." />
        <Reveal className="mx-auto max-w-7xl"><EngagementDiagram/><div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Typical first programme: 6–7 weeks.</strong> With suitable imagery: 4–5 weeks. Later versions: 1–2 weeks.</div></Reveal>
      </div>
    </section>
    <section className="bg-[#edf8f5] py-20 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader label="Evidence you can reuse" title="What You" gradientText="Get" subtitle="Not a score deck: a versioned test asset, a failure atlas and an actionable operating-point decision." />
        <Reveal className="mx-auto max-w-7xl"><DataTable headers={["Deliverable", "What it contains"]} rows={deliverableRows} minWidth={760}/></Reveal>
      </div>
    </section>
  </>
);

export const FailuresBoundariesRelated = () => (
  <>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="The traps are upstream" title="Where Computer Vision Testing" gradientText="Goes Wrong" subtitle="A clean metric cannot rescue a mismatched test set, weak ground truth or a reporting cut chosen after the result."/><Reveal className="mx-auto max-w-7xl"><DataTable headers={["Failure", "What happens", "How we avoid it"]} rows={failureRows} minWidth={980}/></Reveal></div></section>
    <section className="bg-[#0d1c2c] py-20 text-white md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Clear scope, safer decisions" title="What We" gradientText="Do Not Do" dark subtitle="Boundaries are part of a trustworthy evaluation programme."/><Reveal className="mx-auto max-w-6xl divide-y divide-white/10 border-y border-white/10">{[
      ["We do not build or train vision models.", "We measure them and classify their failures. Model architecture, training and tuning remain with the client."],
      ["We do not report one headline number in isolation.", "If a stakeholder requires one, it appears beside the spread and worst-performing slice."],
      ["We do not evaluate an unaudited test set.", "Existing imagery is assessed for coverage before we agree what it can support."],
      ["We do not accept undefined biometric surveillance work.", "Face and person testing requires a defined lawful basis, documented purpose, consent position and agreed handling. We decline work where those cannot be established."],
      ["We do not retain client imagery indefinitely.", "Restricted data is handled under ISO 27001 controls, delivered and destroyed on the agreed schedule."],
    ].map(([title,text],index)=><article key={title} className="grid gap-4 py-6 sm:grid-cols-[44px_1fr]"><ShieldCheck className={`h-6 w-6 ${index===3?"text-amber-300":"text-[#51e2c2]"}`}/><div><h3 className="font-heading text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-7 text-white/65">{text}</p></div></article>)}</Reveal></div></section>
    <section className="bg-[#edf8f5] py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Choose the evidence depth" title="How to" gradientText="Engage" subtitle="Start with a baseline, build only the test set, establish release-cycle evidence or investigate one deployment site."/><Reveal className="mx-auto max-w-7xl"><DataTable headers={["Engagement model", "Best for", "Typical timing"]} rows={engagementModels} minWidth={820}/></Reveal><Reveal className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-primary">Why eQOURSE</p><h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight">We Build the Images <span className="text-gradient">the Metric Depends On</span></h2><p className="mt-5 leading-8 text-muted-foreground">Real deployment conditions, reference-grade annotation, multi-script OCR depth and slice-level reporting—supported by regional collection and review operations.</p></div><div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2">{[
      "Real-world imagery across regions, devices and environments",
      "Indian and South Asian roads, retail, documents, scripts and lighting",
      "Reference-quality image, video, document and 3D annotation",
      "Devanagari, Bengali, Tamil, Telugu, Gujarati, Gurmukhi, Odia and Urdu OCR depth",
      "Slice-level reporting as standard",
      "ISO 9001 and ISO 27001 certified processes",
    ].map((text)=><div key={text} className="flex gap-3 bg-white p-6"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary"/><p className="text-sm font-semibold leading-6">{text}</p></div>)}</div></Reveal></div></section>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="One data-to-evidence loop" title="Related" gradientText="Services" subtitle="Move from real-world collection to reference labels, independent testing and formal fairness analysis."/><Reveal className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{relatedServices.map(([title,path])=><Link key={title} to={path} className="group flex items-center justify-between bg-white p-6 transition-colors hover:bg-primary/5"><span className="font-heading font-bold">{title}</span><ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1"/></Link>)}</Reveal></div></section>
    <RelatedBlogs />
    <FAQSection title="Computer Vision Model Testing FAQs" faqs={computerVisionFaqs.map(([question, answer]) => ({ question, answer }))}/>
  </>
);
