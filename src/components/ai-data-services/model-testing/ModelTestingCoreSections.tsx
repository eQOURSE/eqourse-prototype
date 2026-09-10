import type { ReactNode } from "react";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CircleDollarSign,
  FileCheck2,
  GitCompareArrows,
  Globe2,
  Languages,
  LockKeyhole,
  MessageSquareText,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Volume2,
} from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import FAQSection from "../shared/FAQSection";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { modelTestingFaqs, modelTypes, modelTypeServices, processSteps, testingMethods } from "./ModelTestingContent";

const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"} ${className}`}>{children}</div>;
};

export const ModelTestingMotionStyles = () => (
  <style>{`
    @keyframes mt-scan { 0% { transform: translateY(-120%); opacity: 0; } 15%,75% { opacity: .7; } 100% { transform: translateY(720%); opacity: 0; } }
    @keyframes mt-pulse-bar { 0%,100% { transform: scaleX(.72); opacity:.55; } 50% { transform: scaleX(1); opacity:1; } }
    @keyframes mt-orbit { to { transform: rotate(360deg); } }
    .mt-scan { animation: mt-scan 5.5s ease-in-out infinite; }
    .mt-pulse-bar { transform-origin:left; animation: mt-pulse-bar 3.4s ease-in-out infinite; }
    .mt-orbit { animation: mt-orbit 18s linear infinite; }
    @media (prefers-reduced-motion: reduce) { .mt-scan,.mt-pulse-bar,.mt-orbit { animation:none !important; } }
  `}</style>
);

export const TestingTrustStrip = () => (
  <section className="border-y border-border bg-white py-5">
    <div className="container mx-auto px-4 text-center text-sm font-semibold text-foreground/75">
      Trusted by teams who found the failure in production—and would rather find the next one first.
    </div>
  </section>
);

export const TestingDefinition = () => (
  <section className="bg-background py-20 md:py-24">
    <div className="container mx-auto px-4">
      <Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-[.2em] text-primary">Production evidence</span>
          <h2 className="mt-5 font-heading text-3xl font-bold leading-tight md:text-5xl">What Is <span className="text-gradient">AI Model Testing?</span></h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">AI model testing is the structured evaluation of a testable model against real product, safety and user requirements. It reveals how behaviour changes across people, languages, environments and edge cases—not only whether a benchmark answer was correct.</p>
          <p className="mt-4 leading-7 text-muted-foreground">The output is a decision-ready report: what passed, what failed, who is affected, how severe the failure is and what should be tested again.</p>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-border bg-[#101a2c] p-7 text-white shadow-elevated">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            <div className="bg-[#101a2c] p-6"><BrainCircuit className="h-6 w-6 text-teal-300"/><h3 className="mt-6 font-heading text-lg font-bold">Training creates capability</h3><p className="mt-2 text-sm leading-6 text-white/60">Collection, annotation, curation and RLHF produce the data used to train or align a model.</p></div>
            <div className="bg-[#101a2c] p-6"><FileCheck2 className="h-6 w-6 text-amber-300"/><h3 className="mt-6 font-heading text-lg font-bold">Testing produces a verdict</h3><p className="mt-2 text-sm leading-6 text-white/60">Independent evidence shows whether the resulting behaviour is fit for release.</p></div>
          </div>
          <p className="mt-6 text-sm leading-6 text-white/70">Building alignment data from human judgement belongs to <Link to="/ai-data-services/annotation-labeling/llm-rlhf-annotation" className="font-semibold text-teal-300 hover:underline">LLM &amp; RLHF Data Annotation</Link>. Assessing whether a model is fit to ship happens here.</p>
        </div>
      </Reveal>
    </div>
  </section>
);

export const TestingMethods = () => {
  const icons = [GitCompareArrows, Languages, Volume2, MessageSquareText];
  return <section className="bg-muted/35 py-20 md:py-24">
    <div className="container mx-auto px-4">
      <SectionHeader label="Beyond a benchmark" title="How We Test" gradientText="AI Models" subtitle="Five testing methodologies applied across language, speech, vision and multimodal systems."/>
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-4">
    {testingMethods.map(([title,text,href],i)=>
    {const Icon=icons[i];
      const content=<article className="h-full p-6 transition-colors hover:bg-primary/[.045]">
        <div className="flex items-center justify-between">
          <Icon className="h-5 w-5 text-primary"/>
          <span className="font-mono text-[15px] text-primary">0{i+1}</span>
          </div>
          <h3 className="mt-8 font-heading text-lg font-bold">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
          <p className="mt-7 flex items-center gap-2 border-t border-border pt-4 text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">{href?<>Explore method <ArrowRight className="h-3 w-3"/></>:"Method available now"}</p></article>;return <Reveal key={title} className="bg-card">{href?<Link to={href} className="block h-full">{content}</Link>:content}</Reveal>})}</div></div></section>;
};

export const TestingByModelType = () => {
  const icons=[BrainCircuit,ShieldCheck,ShieldAlert,Target,ScanSearch,MessageSquareText];
  return <section className="overflow-hidden bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Evaluation coverage" title="Testing Services by" gradientText="Model Type" subtitle="Choose the evidence your product decision needs. Dedicated sub-service pages will be added as each practice expands."/><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><Reveal><picture><source srcSet="/assets/ai-data/model-testing/model-testing-by-type.avif" type="image/avif"/><img src="/assets/ai-data/model-testing/model-testing-by-type.webp" alt="Four connected diagnostic panels representing language, speech, computer vision and multimodal AI model evaluation" width="1200" height="800" loading="lazy" decoding="async" className="w-full rounded-[2rem] border border-border shadow-soft"/></picture></Reveal><div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2">{modelTypeServices.map(([title,text,href],i)=>{const Icon=icons[i] || BrainCircuit;const content=<><Icon className="h-6 w-6 text-primary"/><h3 className="mt-6 font-heading text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-primary">{href?<>Explore audit <ArrowRight className="h-3 w-3"/></>:"Service available · page coming soon"}</span></>;return href?<Link key={title} to={href} className="group bg-card p-6 transition-colors hover:bg-primary/[.045]">{content}</Link>:<article key={title} className="bg-card p-6">{content}</article>})}</div></div></div></section>;
};

export const BenchmarkAndEvaluator = () => (
  <>
    <section className="relative overflow-hidden bg-[#0d1728] py-20 text-white md:py-24"><div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle, hsl(170 82% 46% / .6) 1px, transparent 1px)",backgroundSize:"34px 34px"}}/><div className="container relative mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><span className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal-300">Benchmark gap</span><h2 className="mt-5 font-heading text-4xl font-bold">Your Model Scored <span className="text-teal-300">94%.</span> On What?</h2><p className="mt-5 leading-7 text-white/65">An average can hide the segment that fails, the test set that leaked, or the prompts that do not resemble production.</p><Link to="/ai-data-services/cleaning-validation/llm-data-curation" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-teal-300 hover:underline">Check benchmark contamination <ArrowRight className="h-4 w-4"/></Link></div><div className="rounded-[2rem] border border-white/10 bg-white/[.04] p-7"><div className="flex items-end justify-between border-b border-white/10 pb-6"><div><p className="text-xs uppercase tracking-widest text-white/45">Headline benchmark</p><strong className="mt-2 block text-5xl">94%</strong></div><div className="text-right"><p className="text-xs uppercase tracking-widest text-white/45">Lowest segment</p><strong className="mt-2 block text-5xl text-amber-300">61%</strong></div></div><div className="mt-7 space-y-5">{[["Standard English",94],["Code-mixed input",76],["Regional accent",68],["Noisy mobile audio",61]].map(([label,value],i)=><div key={String(label)}><div className="mb-2 flex justify-between text-xs"><span>{label}</span><span>{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${i>1?'bg-amber-300':'bg-teal-300'} mt-pulse-bar`} style={{width:`${value}%`,animationDelay:`${i*.35}s`}}/></div></div>)}</div></div></Reveal></div></section>
    <section className="bg-[#edf8f5] py-20 md:py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center"><div><Globe2 className="h-8 w-8 text-primary"/><h2 className="mt-6 font-heading text-3xl font-bold md:text-5xl">You Cannot Test for Bias With a <span className="text-primary">Homogeneous Evaluator Pool</span></h2><p className="mt-5 leading-7 text-muted-foreground">eQOURSE can assemble native and domain-qualified evaluation groups across 30+ global languages, with comprehensive Indian regional-language depth as a particular strength.</p></div><div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">{[["500+","Specialists in our India-led delivery network"],["30+","Global languages"],["India-wide","Regional language coverage"],["Native context","Accent, dialect, code-mixed and romanised input"]].map(([value,label])=><div key={value} className="bg-white p-6"><strong className="text-3xl text-primary">{value}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{label}</p></div>)}</div></Reveal></div></section>
  </>
);

export const TestingProcess = () => (
  <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Repeatable evidence" title="Our AI Model Testing" gradientText="Process" subtitle="A release decision is only useful when the test can be repeated after the model changes."/><div className="mx-auto max-w-7xl"><svg viewBox="0 0 1000 90" role="img" aria-label="Testing loop returns from re-test to test-set construction" className="mb-5 hidden w-full md:block"><path d="M65 45H935" stroke="currentColor" className="text-border" strokeWidth="2"/><path d="M935 45C935 8 378 8 378 38" fill="none" stroke="currentColor" className="text-primary/40" strokeWidth="2" strokeDasharray="6 8"/><path d="m369 30 9 8 9-8" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2"/>{processSteps.map((_,i)=><circle key={i} cx={65+i*145} cy="45" r={i===0?13:8} className={i===0?"fill-primary":"fill-white stroke-primary"} strokeWidth="2"/>)}</svg><ol className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-7">{processSteps.map(([n,title,text],i)=><li key={n} className={`p-5 ${i===0?'bg-[#0d1728] text-white':'bg-card'}`}><span className={`font-mono text-xs ${i===0?'text-teal-300':'text-primary'}`}>{n}</span><h3 className="mt-5 font-heading font-bold">{title}</h3><p className={`mt-2 text-xs leading-5 ${i===0?'text-white/60':'text-muted-foreground'}`}>{text}</p></li>)}</ol></div></div></section>
);

export const SegmentReporting = () => (
  <section className="bg-muted/35 py-20 md:py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><span className="font-mono text-xs font-bold uppercase tracking-[.2em] text-primary">Decision-ready reporting</span><h2 className="mt-5 font-heading text-3xl font-bold md:text-5xl">One Number Is <span className="text-gradient">Not a Result</span></h2><p className="mt-5 leading-7 text-muted-foreground">We report the average and the distribution: language, locale, device, environment, demographic or scenario segments; failure category and severity; representative examples; confidence; inter-evaluator agreement; release thresholds and regression status.</p><div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white"><table className="min-w-[620px] w-full text-left text-sm"><caption className="sr-only">Example model testing results by segment</caption><thead className="bg-[#0d1728] text-white"><tr><th className="p-4">Segment</th><th className="p-4">Score</th><th className="p-4">Severity</th><th className="p-4">Decision</th></tr></thead><tbody>{[["Standard set","94%","Low","Pass"],["Code-mixed","76%","Medium","Review"],["Regional accent","68%","High","Fix"],["Noisy mobile","61%","High","Fix"]].map((row,i)=><tr key={row[0]} className="border-t border-border">{row.map((cell,j)=><td key={cell} className={`p-4 ${j===3?i===0?'font-bold text-emerald-700':'font-bold text-amber-700':''}`}>{cell}</td>)}</tr>)}</tbody></table></div></div><picture><source srcSet="/assets/ai-data/model-testing/segment-report-review.avif" type="image/avif"/><img src="/assets/ai-data/model-testing/segment-report-review.webp" alt="AI quality reviewer examining model performance charts by geography and user segment" width="1000" height="600" loading="lazy" decoding="async" className="w-full rounded-[2rem] border border-border shadow-elevated"/></picture></Reveal></div></section>
);

export const TestSetAndModels = () => (
  <>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="The test is a product" title="Test Set" gradientText="Construction" subtitle="A trustworthy evaluation set is documented, versioned and designed around deployment risk."/><div className="mx-auto grid max-w-6xl gap-x-10 border-y border-border md:grid-cols-2 lg:grid-cols-3">{["Realistic production inputs","Adversarial and misuse cases","Rare and boundary conditions","Demographic and language coverage","Regression cases from known failures","Expert-verified golden examples"].map((item,i)=><div key={item} className="flex gap-4 border-b border-border py-6"><span className="font-mono text-xs text-primary">0{i+1}</span><p className="font-semibold">{item}</p></div>)}</div><p className="mt-8 text-center text-sm text-muted-foreground">Need expert ground truth for the set? <Link to="/ai-data-services/annotation-labeling" className="font-bold text-primary hover:underline">Explore Data Annotation &amp; Labeling</Link>.</p></div></section>
    <section className="bg-[#0d1728] py-20 text-white md:py-24"><div className="container mx-auto px-4"><SectionHeader light label="Modality coverage" title="Model Types" gradientText="We Test"/><div className="mx-auto overflow-x-auto rounded-[2rem] border border-white/10"><table className="min-w-[760px] w-full text-left"><caption className="sr-only">AI model types and evaluation focus</caption><thead className="bg-white/10"><tr><th className="p-5">Model type</th><th className="p-5">Evaluation focus</th></tr></thead><tbody>{modelTypes.map(([type,focus])=><tr key={type} className="border-t border-white/10"><th scope="row" className="p-5 font-heading font-bold text-teal-300">{type}</th><td className="p-5 text-sm text-white/65">{focus}</td></tr>)}</tbody></table></div></div></section>
  </>
);

export const SecurityCommercial = () => (
  <>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><LockKeyhole className="h-8 w-8 text-primary"/><h2 className="mt-6 font-heading text-4xl font-bold">Model Access and Findings Stay Controlled</h2><p className="mt-5 leading-7 text-muted-foreground">ISO 9001 and ISO 27001 certified processes support NDAs, least-privilege access, audit trails, client-hosted options and contract-defined retention. Findings are not disclosed.</p></div><div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">{["Named access and NDAs","Client-hosted workflows where agreed","Endpoint and credential controls","Audit trail for evaluation activity","Contract-defined retention and deletion","No public disclosure of findings"].map(item=><div key={item} className="flex gap-3 bg-card p-5 text-sm"><ShieldCheck className="h-5 w-5 shrink-0 text-primary"/>{item}</div>)}</div></Reveal></div></section>
    <section className="bg-muted/35 py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Flexible scope" title="Model Testing" gradientText="Engagements"/><div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{[["Pre-release assessment","A documented go, conditional-go or no-go decision."],["Continuous evaluation","Track releases, regressions and segment drift over time."],["Bias & fairness audit","Compare outcomes across relevant user groups."],["Red-team programme","Probe safety controls and high-severity misuse."],["Test-set construction","Receive a reusable, versioned evaluation asset."],["Independent second opinion","Audit an existing result, vendor or internal benchmark."]].map(([title,text],i)=><article key={title} className="bg-card p-6"><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-5 font-heading font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"><div><CircleDollarSign className="h-7 w-7 text-primary"/><h2 className="mt-5 font-heading text-4xl font-bold">What Determines Testing Cost?</h2><p className="mt-4 leading-7 text-muted-foreground">A pilot converts risk and coverage requirements into a defensible evaluation plan. We do not price a model by endpoint count alone.</p><Link to="/contact-us" className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:underline">Request a scoped estimate <ArrowRight className="h-4 w-4"/></Link></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">{["Model and modality","Scenarios and variants","Language and segments","Evaluator expertise","Repetitions and confidence","Red-team depth","Reporting requirements","Security environment"].map((item,i)=><div key={item} className="bg-card p-5"><span className="font-mono text-[10px] text-primary">0{i+1}</span><p className="mt-2 text-sm font-semibold">{item}</p></div>)}</div></Reveal></div></section>
  </>
);

export const PipelineProofWhy = () => (
  <>
    <section className="bg-[#0d1728] py-20 text-white md:py-24"><div className="container mx-auto px-4"><SectionHeader light label="Connected AI data" title="One Evidence Thread, From Collection" gradientText="to Improvement"/><nav aria-label="AI data workflow" className="mx-auto flex max-w-6xl flex-col items-stretch justify-center gap-3 md:flex-row md:items-center">{[["Collect","/ai-data-services/data-collection"],["Annotate","/ai-data-services/annotation-labeling"],["Clean & Validate","/ai-data-services/cleaning-validation"],["Test",""] ,["Improve",""]].map(([label,href],i)=><div key={label} className="contents">{href?<Link to={href} className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white/70 hover:border-primary hover:text-teal-300">{label}</Link>:<span aria-current={label==="Test"?"step":undefined} className={`rounded-full px-5 py-3 text-center text-sm font-bold ${label==="Test"?"bg-primary text-primary-foreground":"border border-dashed border-white/15 text-white/40"}`}>{label}</span>}{i<4&&<ArrowRight className="mx-auto h-4 w-4 rotate-90 text-white/25 md:rotate-0"/>}</div>)}</nav></div></section>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Proof before promises" title="See the" gradientText="Work"/><div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">{[["AI data samples","Inspect representative data and annotation outputs.","/ai-data-samples"],["Case studies","See how programmes performed in practice.","/casestudy"],["Client testimonials","Hear from organisations we support.","/clients-testimonials"]].map(([title,text,href])=><Link key={title} to={href} className="group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"><Sparkles className="h-6 w-6 text-primary"/><h3 className="mt-6 font-heading text-xl font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p><ArrowRight className="mt-8 h-5 w-5 text-primary transition-transform group-hover:translate-x-1"/></Link>)}</div></div></section>
    <section className="bg-[#edf8f5] py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Why eQOURSE" title="Evaluation Built for" gradientText="Release Decisions"/><div className="mx-auto grid max-w-6xl gap-x-8 border-y border-border md:grid-cols-2">{["Real users and production-shaped inputs","Results reported by segment and severity","Global language support with India-wide depth","Native and domain-qualified evaluator pools","Rubric calibration, agreement and adjudication","Connected data remediation and re-testing","ISO-certified quality and security processes","A free pilot before programme scale"].map((item,i)=><div key={item} className="flex gap-4 border-b border-border py-5 text-sm"><span className="font-mono text-xs text-primary">0{i+1}</span><span className="font-semibold">{item}</span></div>)}</div></div></section>
  </>
);

<RelatedBlogs />
export const TestingFAQ = () => <FAQSection faqs={modelTestingFaqs.map(([question,answer])=>({question,answer}))} label="Model testing FAQ" title="Questions Before You Test"/>;
