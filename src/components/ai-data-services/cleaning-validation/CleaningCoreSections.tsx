import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Braces,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  FileLock2,
  Fingerprint,
  GitCompareArrows,
  Languages,
  ListChecks,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cleaningFaqs } from "./CleaningContent";
import RelatedBlogs from "@/components/blog/RelatedBlogs";

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
};

const serviceCatalog = [
  {
    id: "data-cleaning-preparation",
    number: "01",
    category: "Prepare & repair",
    title: "Data Cleaning & Preparation",
    text: "Make raw or merged data structurally ready for AI without erasing useful variation.",
    bestFor: "Duplicates, broken encoding, noise, missing values, outliers and inconsistent formats.",
    includes: ["Deduplication & survivorship", "Encoding and Unicode repair", "Noise and boilerplate removal", "Schema and format normalisation"],
    outcome: "Cleaned data + reversible change log",
    href: "/ai-data-services/cleaning-validation/data-cleaning-preparation",
    pageReady: true,
    icon: GitCompareArrows,
  },
  {
    id: "dataset-qa-label-audit",
    number: "02",
    category: "Measure & correct",
    title: "Dataset QA & Label Audit",
    text: "Independently measure whether an existing labelled dataset is actually correct—including another vendor's work.",
    bestFor: "Unknown error rates, class confusion, guideline drift, label defects and split leakage.",
    includes: ["Stratified quality audit", "Per-class error reporting", "Label correction & adjudication", "Train/test leakage checks"],
    outcome: "Audit report + repair recommendation",
    href: "/ai-data-services/cleaning-validation/dataset-qa-label-audit",
    pageReady: true,
    icon: FileCheck2,
  },
  {
    id: "llm-data-curation",
    number: "03",
    category: "Curate for language models",
    title: "LLM Training Data Curation",
    text: "Turn a raw text corpus into traceable pre-training, fine-tuning or retrieval-ready data.",
    bestFor: "Duplicate-heavy corpora, low-quality text, benchmark contamination, unsafe content and unclear provenance.",
    includes: ["Corpus quality filtering", "Benchmark decontamination", "PII and safety review", "Licence, source & domain analysis"],
    outcome: "Curated corpus + inclusion/exclusion manifest",
    href: "/ai-data-services/cleaning-validation/llm-data-curation",
    pageReady: true,
    icon: Braces,
  },
  {
    id: "pii-detection-redaction",
    number: "04",
    category: "Protect sensitive data",
    title: "PII Detection & Redaction",
    text: "Find and protect personally identifiable information while preserving the structure your model or workflow still needs.",
    bestFor: "Names, contact details, identifiers, faces, number plates, spoken PII and sensitive document fields.",
    includes: ["Multimodal PII discovery", "Masking & pseudonymisation", "Policy-based redaction", "Human verification of uncertain cases"],
    outcome: "Protected dataset + redaction audit trail",
    href: "/ai-data-services/cleaning-validation/pii-detection-redaction",
    pageReady: true,
    icon: Fingerprint,
  },
  {
    id: "metadata-enrichment",
    number: "05",
    category: "Add context & lineage",
    title: "Metadata Enrichment",
    text: "Add the descriptive, operational and provenance fields required to search, govern and reuse datasets confidently.",
    bestFor: "Missing language, domain, source, licence, confidence, capture context or lineage information.",
    includes: ["Language & domain tagging", "Source and licence metadata", "Confidence and quality fields", "Provenance and lineage mapping"],
    outcome: "Enriched dataset + metadata specification",
    href: "/ai-data-services/cleaning-validation/metadata-enrichment",
    pageReady: true,
    icon: ListChecks,
  },
  {
    id: "data-validation-verification",
    number: "06",
    category: "Verify against sources",
    title: "Data Validation & Verification",
    text: "Use trained human reviewers to confirm whether records, attributes and claims agree with authoritative sources.",
    bestFor: "Records that look structurally valid but may contain incorrect, conflicting or unsupported information.",
    includes: ["Source-based record checks", "Attribute and claim verification", "Conflict and exception handling", "Evidence-linked reviewer decisions"],
    outcome: "Verified records + discrepancy report",
    href: "/ai-data-services/cleaning-validation/data-validation-verification",
    pageReady: true,
    icon: UserCheck,
  },
] as const;

const serviceDecisions = [
  ["My files contain duplicates, broken text or inconsistent fields", "Data Cleaning & Preparation", serviceCatalog[0].href],
  ["I need to know whether existing labels are correct", "Dataset QA & Label Audit", serviceCatalog[1].href],
  ["I am preparing a corpus for an LLM, RAG or fine-tuning", "LLM Training Data Curation", serviceCatalog[2].href],
  ["I need to detect or remove personal and sensitive information", "PII Detection & Redaction", serviceCatalog[3].href],
  ["My dataset is missing source, language or lineage context", "Metadata Enrichment", serviceCatalog[4].href],
  ["Records must be checked against authoritative sources", "Data Validation & Verification", serviceCatalog[5].href],
] as const;

const process = [
  ["01", "Sample audit", "Measure error rate by category before you commit to anything."],
  ["02", "Scope agreement", "Agree what gets fixed, flagged or intentionally left alone."],
  ["03", "Rule definition", "Define checks for schema, format, range, duplicates and encoding."],
  ["04", "Human review design", "Set decision criteria and escalation where rules stop."],
  ["05", "Pilot batch", "Validate criteria and acceptance thresholds on a controlled batch."],
  ["06", "Production processing", "Run automated checks and human review with category tracking."],
  ["07", "Quality delivery", "Return data, reports and reversible logs; feed findings back to rules."],
] as const;

export const CleaningMotionStyles = () => (
  <style>{`
    @keyframes cv-scan { 0% { transform: translateY(-120%); opacity: 0; } 12%, 78% { opacity: .7; } 100% { transform: translateY(560%); opacity: 0; } }
    @keyframes cv-dash { to { stroke-dashoffset: -42; } }
    @keyframes cv-resolve { 0%, 35% { background:#fff7e9; border-color:#efb55d; } 55%, 100% { background:#ecfbf6; border-color:#54c7aa; } }
    .cv-scan-line { animation: cv-scan 5.5s ease-in-out infinite; }
    .cv-loop-path { animation: cv-dash 5s linear infinite; }
    .cv-resolve { animation: cv-resolve 6s ease-in-out infinite alternate; }
    @media (prefers-reduced-motion: reduce) { .cv-scan-line,.cv-loop-path,.cv-resolve { animation:none !important; } }
  `}</style>
);

export const CleaningTrustStrip = () => (
  <section aria-label="Service assurances" className="border-y border-border/70 bg-white">
    <p className="border-b border-border/70 px-4 py-4 text-center text-sm font-medium text-foreground/75">Trusted by AI teams who found the problem after training—and do not intend to repeat it.</p>
    <div className="container mx-auto grid grid-cols-2 gap-px bg-border/70 px-4 sm:grid-cols-4">
      {[["Audit first", "Baseline before repair"], ["Human reviewed", "Ambiguous cases"], ["Change logged", "Traceable delivery"], ["ISO certified", "9001 + 27001"]].map(([title, text]) => (
        <div key={title} className="bg-white px-4 py-5 text-center"><div className="text-sm font-bold text-foreground">{title}</div><div className="mt-1 text-xs text-muted-foreground">{text}</div></div>
      ))}
    </div>
  </section>
);

export const CleaningDefinition = () => (
  <section className="bg-background py-24">
    <div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[.82fr_1.18fr]">
      <div><span className="font-mono text-xs font-bold uppercase tracking-[.2em] text-primary">Data quality, defined</span><h2 className="mt-5 font-heading text-3xl font-bold leading-tight md:text-5xl">What Is Data Cleaning <span className="text-primary">and Validation?</span></h2><p className="mt-6 leading-relaxed text-muted-foreground">It is the work of making a dataset trustworthy before a model learns from it—removing what should not be there, correcting what is wrong, verifying what is claimed and documenting what remains uncertain.</p><p className="mt-4 leading-relaxed text-muted-foreground">Datasets are merged, re-split, augmented and labeled by different people over time. Each step introduces defects that are hard to see in a spreadsheet and expensive to diagnose after training.</p></div>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
        <article className="bg-card p-7"><GitCompareArrows className="h-7 w-7 text-primary"/><h3 className="mt-6 font-heading text-xl font-bold">Cleaning fixes shape</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Duplicates, malformed records, inconsistent formats, impossible values, encoding errors and missing fields. This layer is largely rule-based and automatable.</p></article>
        <article className="bg-card p-7"><FileCheck2 className="h-7 w-7 text-primary"/><h3 className="mt-6 font-heading text-xl font-bold">Validation checks correctness</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Whether a label matches its content, a record matches its source and an example represents the real world. This usually requires human judgement.</p></article>
        <div className="bg-muted/45 p-7 sm:col-span-2"><p className="text-sm leading-7 text-foreground/75">A dataset can pass every structural check and still be mislabeled. Annotation creates labels; cleaning and validation check and repair them. Explore <Link to="/ai-data-services/annotation-labeling" className="font-semibold text-primary hover:underline">Data Annotation &amp; Labeling Services</Link>.</p></div>
      </div>
    </Reveal></div>
  </section>
);

const ServiceCatalogCard = ({ service }: { service: (typeof serviceCatalog)[number] }) => {
  const Icon = service.icon;
  const body = <>
    <div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="h-6 w-6"/></span><span className="font-mono text-xs font-bold text-primary/70">SERVICE {service.number}</span></div>
    <p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-primary">{service.category}</p><h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-foreground">{service.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{service.text}</p>
    <div className="mt-6 border-l-2 border-amber-400 pl-4"><span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Use this when</span><p className="mt-1 text-sm leading-6 text-foreground/75">{service.bestFor}</p></div>
    <ul className="mt-6 space-y-2.5" aria-label={`Included in ${service.title}`}>{service.includes.map((item)=><li key={item} className="flex gap-2.5 text-sm text-foreground/75"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary"/><span>{item}</span></li>)}</ul>
    <div className="mt-auto pt-7"><div className="border-t border-border pt-5"><span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Typical outcome</span><p className="mt-1 text-sm font-semibold text-foreground">{service.outcome}</p></div>{service.pageReady ? <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">View dedicated service page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5"/></span> : <Link to="/contact-us" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Discuss this service <ArrowRight className="h-4 w-4"/></Link>}</div>
  </>;
  const classes = "group flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-border bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,118,110,.65)] transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_65px_-36px_rgba(15,118,110,.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 md:p-7";
  return service.pageReady
    ? <Link id={service.id} to={service.href} className={classes}>{body}</Link>
    : <article id={service.id} className={classes}>{body}</article>;
};

export const CleaningServices = () => (
  <section id="cleaning-services" className="scroll-mt-32 bg-[#f5faf8] py-20 md:py-24">
    <div className="container mx-auto px-4">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grid items-end gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_.72fr]">
          <div><span className="font-mono text-xs font-bold uppercase tracking-[.2em] text-primary">Six specialised service categories</span><h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight md:text-5xl">Choose the Data Quality Service <span className="text-primary">You Actually Need</span></h2></div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">Cleaning repairs structure. Auditing measures labels. Curation prepares corpora. Privacy, metadata and verification handle distinct governance needs. Choose by the problem—not by technical terminology.</p>
        </div>
      </Reveal>

      <div aria-label="Data cleaning and validation services" className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">{serviceCatalog.map((service)=><Reveal key={service.title} className="h-full"><ServiceCatalogCard service={service}/></Reveal>)}</div>

      <Reveal className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-[1.75rem] border border-border bg-white">
        <div className="grid lg:grid-cols-[.72fr_1.28fr]"><div className="bg-foreground p-7 text-white md:p-9"><span className="font-mono text-xs font-bold uppercase tracking-[.18em] text-teal-300">Quick service finder</span><h3 className="mt-4 font-heading text-2xl font-bold md:text-3xl">Start with the problem you can see.</h3><p className="mt-4 text-sm leading-7 text-white/65">If more than one applies, begin with a dataset audit. It establishes the evidence before repair work is scoped.</p><Link to="/free-pilot" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">Get a Free Dataset Audit <ArrowRight className="h-4 w-4"/></Link></div>
          <div className="divide-y divide-border">{serviceDecisions.map(([problem, service, href])=>href.startsWith("#")?<a key={problem} href={href} className="group grid gap-2 p-5 transition-colors hover:bg-primary/[.045] sm:grid-cols-[1fr_auto] sm:items-center md:px-7"><span className="text-sm font-medium leading-6 text-foreground/80">{problem}</span><span className="inline-flex items-center gap-2 text-sm font-bold text-primary">{service}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></span></a>:<Link key={problem} to={href} className="group grid gap-2 p-5 transition-colors hover:bg-primary/[.045] sm:grid-cols-[1fr_auto] sm:items-center md:px-7"><span className="text-sm font-medium leading-6 text-foreground/80">{problem}</span><span className="inline-flex items-center gap-2 text-sm font-bold text-primary">{service}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></span></Link>)}</div></div>
      </Reveal>
    </div>
  </section>
);

export const LateErrorCost = () => {
  const rows = [["Before training", "Minutes of review and a corrected record"], ["During training", "A wasted compute cycle and a re-run"], ["At evaluation", "A confusing result, days of debugging and retraining"], ["In production", "A wrong output in front of a user—plus everything above"], ["Never", "A model that underperforms for reasons nobody can locate"]];
  return <section className="bg-foreground py-24 text-white"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><span className="text-xs font-bold uppercase tracking-[.2em] text-teal-300">Cost compounds downstream</span><h2 className="mt-6 font-heading text-3xl font-bold md:text-5xl">Every Data Error Has a Price. <span className="text-teal-300">It Rises Sharply.</span></h2><p className="mt-6 leading-relaxed text-white/65">A model trained on a small percentage of mislabeled data rarely fails loudly. It quietly performs worse while the team tunes architecture to recover accuracy a dataset audit could have returned.</p></div><div className="overflow-hidden rounded-2xl border border-white/10"><div className="grid grid-cols-[.8fr_1.7fr] bg-white/[.07] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white/50"><span>Caught at</span><span>What it costs</span></div>{rows.map(([stage, impact], i)=><div key={stage} className="grid grid-cols-[.8fr_1.7fr] gap-3 border-t border-white/10 px-5 py-5 text-sm"><strong className={i > 2 ? "text-amber-300" : "text-white"}>{stage}</strong><span className="text-white/65">{impact}</span></div>)}</div></Reveal></div></section>;
};

export const DefectAtlas = () => (
  <section className="overflow-hidden bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Real defect atlas" title="What We" gradientText="Actually Find" subtitle="Label defects, leakage, coverage gaps, malformed records, unsafe content and missing provenance recur across modalities. If they have not been measured, assume some are present."/>
    <Reveal className="mx-auto max-w-6xl"><p className="mb-3 text-center text-xs text-muted-foreground md:hidden">Swipe horizontally to inspect the sample values</p><div className="overflow-x-auto rounded-[2rem] border border-border bg-[#f8faf9] shadow-soft"><div className="relative min-w-[820px]"><img src="/assets/ai-data/cleaning-validation/data-quality-defect-types.webp" alt="Readable synthetic dataset examples showing duplicate records, a sentiment label correction, train-test leakage and missing required values" width="1200" height="800" loading="lazy" decoding="async" className="w-full"/><div aria-hidden="true" className="cv-scan-line pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent"/></div></div>
      <div className="mt-0 grid gap-px overflow-hidden rounded-b-3xl border-x border-b border-border bg-border md:grid-cols-4">{[["Label defects", "Mislabels, class confusion and guideline drift"], ["Duplicates & leakage", "Near copies, split overlap and contamination"], ["Coverage defects", "Imbalance, missing edge cases and sourcing skew"], ["Structure & provenance", "Broken schema, encoding and unknown source"]].map(([t,d],i)=><div key={t} className={`bg-card p-5 ${i===1 ? "cv-resolve border border-amber-300" : ""}`}><span className="font-mono text-[10px] text-primary">0{i+1}</span><h3 className="mt-3 font-heading font-bold">{t}</h3><p className="mt-1 text-xs text-muted-foreground">{d}</p></div>)}</div>
    </Reveal></div></section>
);

export const CleaningProcess = () => (
  <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><SectionHeader label="Controlled remediation" title="Our Data Cleaning & Validation" gradientText="Process" subtitle="A seven-step workflow with a deliberate feedback loop: every new defect updates the rule set before the next batch."/>
    <Reveal className="mx-auto max-w-7xl"><div className="relative hidden h-24 lg:block" aria-hidden="true"><svg viewBox="0 0 1200 95" className="h-full w-full" preserveAspectRatio="none"><path d="M55 35 H1140 C1172 35 1172 79 1138 79 H476 C446 79 446 54 476 54 H650" fill="none" stroke="hsl(var(--primary))" strokeOpacity=".48" strokeWidth="2" strokeDasharray="8 8" className="cv-loop-path"/></svg><div className="absolute inset-x-0 top-3 grid grid-cols-7 gap-3">{process.map(([n],i)=><div key={n} className="flex justify-center"><span className={`grid h-12 w-12 place-items-center rounded-full border-2 font-mono text-xs font-bold ${i===0 ? "border-primary bg-primary text-primary-foreground shadow-soft" : "border-primary bg-background text-primary"}`}>{n}</span></div>)}</div></div>
      <ol className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-7">{process.map(([n,t,d],i)=><li key={n} className={`bg-card p-5 ${i===0 ? "lg:border-t-4 lg:border-primary" : ""}`}><span className="font-mono text-xs font-bold text-primary lg:hidden">{n}</span><h3 className="mt-5 font-heading text-sm font-bold lg:mt-1">{t}</h3><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{d}</p></li>)}</ol>
    </Reveal></div></section>
);

export const QualityReport = () => (
  <section className="bg-background py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><span className="font-mono text-xs font-bold uppercase tracking-[.2em] text-primary">Evidence at delivery</span><h2 className="mt-5 font-heading text-3xl font-bold md:text-5xl">What You Get Back, <span className="text-primary">Beyond the Data</span></h2></div><div><p className="leading-relaxed text-muted-foreground">A cleaned dataset with no report is an unverifiable claim. Every engagement makes the decisions, unresolved cases and measured improvement reviewable.</p><div className="mt-6 grid gap-x-8 sm:grid-cols-2">{["Error rate by defect category", "Class confusion analysis", "Duplicate and leakage report", "Class distribution before and after", "Full reversible change log", "Flagged-but-unresolved list", "Root-cause notes"].map(item=><div key={item} className="flex gap-3 border-b border-border py-3 text-sm"><ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{item}</div>)}</div></div></div><p className="mb-3 mt-12 text-center text-xs text-muted-foreground md:hidden">Swipe horizontally to inspect the report values</p><div className="overflow-x-auto rounded-3xl border border-border bg-muted/30 shadow-elevated"><img src="/assets/ai-data/cleaning-validation/dataset-quality-report-review.webp" alt="Readable synthetic dataset quality report with before-and-after defect counts, decisions and a change log" width="1000" height="600" loading="lazy" decoding="async" className="min-w-[760px] w-full"/></div></Reveal></div></section>
);

export const HumanAutomation = () => (
  <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><SectionHeader label="Right tool, right decision" title="What Machines Should Check," gradientText="and What They Can't" subtitle="Rules catch everything unambiguous. Human judgement begins exactly where structural checks run out—and the report tells you which layer caught what."/><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2"><article className="bg-card p-8"><Bot className="h-8 w-8 text-primary"/><h3 className="mt-6 font-heading text-2xl font-bold">Automated handles</h3><ul className="mt-6 space-y-3 text-sm text-muted-foreground">{["Schema and format conformance", "Range, type and null checks", "Exact and near-duplicate detection", "Encoding and character validation", "Statistical outlier flagging", "Class distribution analysis"].map(x=><li key={x} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary"/>{x}</li>)}</ul></article><article className="bg-card p-8"><UserCheck className="h-8 w-8 text-amber-600"/><h3 className="mt-6 font-heading text-2xl font-bold">Humans decide</h3><ul className="mt-6 space-y-3 text-sm text-muted-foreground">{["Whether a label is actually correct", "Whether two records describe the same entity", "Whether an outlier is genuine or an error", "Whether content is fit for training", "Whether a redaction is safe", "Whether a flagged anomaly matters"].map(x=><li key={x} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-amber-600"/>{x}</li>)}</ul></article></div></div></section>
);

export const LlmPrivacyDelivery = () => (
  <>
    <section className="bg-[linear-gradient(135deg,hsl(223_48%_14%),hsl(174_45%_12%))] py-24 text-white"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"><div><Braces className="h-8 w-8 text-teal-300"/><h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl">Curation for LLM Pre-Training and Fine-Tuning</h2><p className="mt-5 leading-relaxed text-white/70">We design and tune the filtering rules, then human-review samples at every stage to verify what the filters are actually removing. Aggressive filters often discard exactly the specialist content that makes a domain model valuable.</p><Link to="/ai-data-services/annotation-labeling/llm-rlhf-annotation" className="mt-7 inline-flex items-center gap-2 font-semibold text-teal-300 hover:underline">Explore LLM &amp; RLHF Annotation <ArrowRight className="h-4 w-4"/></Link></div><div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">{["Near-duplicate removal", "Quality filtering", "Benchmark decontamination", "Toxicity and safety filtering", "PII scrubbing at corpus scale", "Licence and provenance review", "Synthetic-content detection", "Domain-balance measurement"].map(x=><div key={x} className="bg-white/[.045] p-5 text-sm text-white/75">{x}</div>)}</div></Reveal></div></section>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><FileLock2 className="h-9 w-9 text-primary"/><h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl">PII, Privacy and Compliance</h2><p className="mt-5 leading-relaxed text-muted-foreground">GDPR-aligned processing under ISO 27001 certified controls, with DPAs, restricted-environment options, named reviewers, role-based access and full audit trails. Requirements are agreed at scoping so controls are designed in.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">{[[Fingerprint,"Discover","Classify sensitive content across text, image, audio, video and documents"],[ShieldCheck,"Protect","Redact, mask or pseudonymise while retaining useful structure"],[UserCheck,"Verify","Check faces, plates, spoken identifiers and high-risk uncertain cases"],[FileCheck2,"Document","Log every change, exception and delivery decision"]].map(([Icon,t,d])=>{const C=Icon as typeof Fingerprint;return <article key={t as string} className="bg-card p-6"><C className="h-6 w-6 text-primary"/><h3 className="mt-5 font-heading font-bold">{t as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{d as string}</p></article>})}</div></Reveal></div></section>
  </>
);

export const DeliveryCommercial = () => {
  const languages = ["Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia", "Assamese", "Urdu"];
  return <>
    <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"><div><Languages className="h-8 w-8 text-primary"/><h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl">Data Quality Across 30+ Global Languages</h2><p className="mt-5 leading-relaxed text-muted-foreground">Native-speaker review covers global and Indian regional languages, with our deepest expertise across Indic scripts, dialects, transliteration, code-mixed and romanised text. This catches encoding corruption and English-first filtering errors that generic pipelines miss.</p><div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">{languages.map(x=><span key={x} className="bg-card p-3 text-sm font-semibold">{x}</span>)}</div></div><div><h3 className="font-heading text-2xl font-bold">Formats and delivery</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Your original or target schema, with the change log, quality report and rule definitions so your team can re-run the checks on future batches.</p><div className="mt-6 flex flex-wrap gap-2">{["CSV / TSV", "Excel", "Parquet", "JSON / JSONL", "COCO", "YOLO", "Pascal VOC", "CoNLL", "RTTM", "Text corpora", "Media collections", "Database exports"].map(x=><span key={x} className="rounded-full border border-border bg-card px-3 py-2 text-xs text-foreground/75">{x}</span>)}</div><h3 className="mt-10 font-heading text-2xl font-bold">Engagement models</h3><div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{["Dataset audit", "One-time cleaning project", "Continuous quality assurance", "Pipeline design and handover", "Second-opinion vendor review"].map(x=><span key={x} className="bg-card p-4 text-sm font-semibold">{x}</span>)}</div></div></Reveal></div></section>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><CircleDollarSign className="h-9 w-9 text-primary"/><h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl">What Determines Data Cleaning &amp; Validation Pricing?</h2><p className="mt-5 text-muted-foreground">Share a representative sample for a scoped estimate based on the defects that actually exist.</p></div><div className="grid gap-x-10 sm:grid-cols-2">{["Data modality and volume", "Current defect rate", "Duplicate and leakage complexity", "Human-review depth", "Language and domain expertise", "PII and security requirements", "Output and reporting format", "Turnaround and batch cadence"].map(x=><div key={x} className="flex gap-3 border-b border-border py-4 text-sm font-medium"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{x}</div>)}</div></Reveal></div></section>
  </>;
};

export const PipelineProofWhy = () => (
  <>
    <section className="bg-foreground py-24 text-white"><div className="container mx-auto px-4"><SectionHeader light label="Connected AI data" title="One Quality Thread, From Collection" gradientText="to Model Testing" subtitle="Keep definitions, exceptions and audit findings connected across the complete data lifecycle."/><nav aria-label="AI data workflow" className="mx-auto flex max-w-6xl flex-col items-stretch justify-center gap-3 md:flex-row md:items-center">{[["Collect","/ai-data-services/data-collection"],["Annotate","/ai-data-services/annotation-labeling"],["Clean & Validate",""] ,["Test","/ai-data-services/model-testing"],["Improve",""]].map(([label,href],i)=><div key={label} className="contents">{href?<Link to={href} className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white/70 hover:border-primary hover:text-teal-300">{label}</Link>:<span aria-current={label==="Clean & Validate"?"step":undefined} className={`rounded-full px-5 py-3 text-center text-sm font-bold ${label==="Clean & Validate"?"bg-primary text-primary-foreground":"border border-dashed border-white/15 text-white/40"}`}>{label}</span>}{i<4&&<ArrowRight className="mx-auto h-4 w-4 rotate-90 text-white/25 md:rotate-0"/>}</div>)}</nav></div></section>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Proof, not promises" title="Inspect the Work" gradientText="Around the Dataset"/><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">{[["Cleaned dataset samples","Review production-style AI data samples and delivery structures.","/ai-data-samples/cleaned-datasets"],["Case studies","See how managed data programmes solve operational quality problems.","/casestudy"],["Client testimonials","Hear how teams evaluate delivery, responsiveness and partnership.","/clients-testimonials"]].map(([t,d,h],i)=><Link key={t} to={h} className="group bg-card p-7 hover:bg-primary/[.045] transition-all duration-300 hover:-translate-y-0.5"><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-8 font-heading text-xl font-bold">{t}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{d}</p><ArrowRight className="mt-8 h-5 w-5 text-primary transition-transform group-hover:translate-x-1"/></Link>)}</div></div></section>
    <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><Sparkles className="h-9 w-9 text-primary"/><h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl">Why eQOURSE for Data Quality</h2><p className="mt-5 text-muted-foreground">Human-led quality operations, built to preserve signal and expose uncertainty.</p></div><div className="grid gap-x-10 sm:grid-cols-2">{["Independent audits of third-party datasets", "Modality and domain-aware human review", "Collection, annotation, validation and testing connected", "30+ global languages and deep Indic coverage", "Versioned rules and traceable change logs", "ISO 9001 and ISO 27001 certified processes", "Pilot against agreed acceptance criteria", "Flexible customer-managed environments"].map(x=><div key={x} className="flex gap-3 border-b border-border py-4 text-sm"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{x}</div>)}</div></Reveal></div></section>
  </>
);

export const CleaningFAQ = () => (
  <><RelatedBlogs/><section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Questions answered" title="Data Cleaning & Validation" gradientText="FAQ"/><div className="mx-auto max-w-4xl divide-y divide-border border-y border-border">{cleaningFaqs.map(([q,a],i)=><details key={q} className="group py-1"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-heading font-bold"><span><span className="mr-4 font-mono text-xs text-primary">{String(i+1).padStart(2,"0")}</span>{q}</span><span className="text-2xl font-light text-primary transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-6 pl-10 text-sm leading-7 text-muted-foreground">{a}</p></details>)}</div></div></section></>
);
