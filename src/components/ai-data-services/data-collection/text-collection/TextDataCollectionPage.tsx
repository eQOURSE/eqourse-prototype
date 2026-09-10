import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeCheck, BookOpenText, Braces, BriefcaseBusiness, CheckCircle2,
  FileJson2, FileSearch, FileText, Fingerprint, Globe2, GraduationCap, Languages,
  LibraryBig, ListChecks, MessageSquareText, PenLine, Search, ShieldCheck,
  ShoppingBag, Sparkles, Tags, TextCursorInput, Users, Workflow,
} from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import SectionHeader from "../../shared/SectionHeader";
import FAQSection from "../../shared/FAQSection";
import ServiceCTA from "../../shared/ServiceCTA";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const canonical = "https://www.eqourse.com/ai-data-services/data-collection/text-data-collection";

const datasetTypes = [
  [LibraryBig, "Domain-Specific Corpora", "Purpose-built or appropriately sourced technical, education, financial, legal, scientific and specialist text.", "Domain adaptation, retrieval, classification and search"],
  [MessageSquareText, "Conversational & Dialogue Data", "Human-generated conversations shaped around defined user intents, roles, scenarios and conversational goals.", "Chatbots, voice-agent language layers and dialogue systems"],
  [Search, "Queries, Intents & Utterances", "Search queries, user requests, intent examples and natural variants designed around product interactions.", "Search, intent classification, assistants and routing"],
  [Sparkles, "Instructions & Responses", "Contributor- or expert-created task examples following project-defined instructions and quality rubrics where operationally supported.", "Supervised fine-tuning and domain adaptation"],
  [FileText, "Documents & Written Records", "Text from authorised documents, forms, manuals, educational materials and structured or unstructured sources.", "Document AI, retrieval, extraction and enterprise search"],
  [PenLine, "Handwritten Text Samples", "Purpose-collected handwriting across required scripts, styles and form factors.", "OCR, handwriting recognition and document digitisation"],
  [Languages, "Multilingual Text", "Native-language and locale-specific text reflecting real syntax, vocabulary, cultural usage and terminology.", "Multilingual NLP, cross-lingual search and assistants"],
] as const;

const methods = [
  [PenLine, "Human-Created Text", "Contributors create prompts, queries, dialogues, summaries, answers or domain content against project-specific instructions."],
  [Users, "Domain-Expert Creation", "Subject-matter experts generate or review language where correctness depends on specialist knowledge."],
  [LibraryBig, "Customer-Provided Corpora", "Client-owned documents, knowledge bases, logs or content enter a defined workflow subject to access and rights requirements."],
  [ShieldCheck, "Rights-Cleared Sources", "Appropriately licensed content can be incorporated when rights, provenance and intended use are clear."],
  [FileSearch, "Handwriting / Document Capture", "Contributors create or submit purpose-built written samples under defined scripts, formats and conditions."],
] as const;

const variables = [
  [BookOpenText, "Domain", "Technical vocabulary, professional terminology and required knowledge depth."],
  [TextCursorInput, "Intent", "Questions, searches, complaints, requests, comparisons and troubleshooting."],
  [PenLine, "Style & Register", "Formal, conversational, short-form, long-form, professional or instructional."],
  [Globe2, "Language & Locale", "Language variant, regional vocabulary, script and cultural usage."],
  [Fingerprint, "Difficulty & Edge Cases", "Ambiguity, incomplete queries, spelling variation and code-switching."],
  [BadgeCheck, "Contributor Expertise", "General contributors, language specialists or domain experts."],
] as const;

const process = [
  ["01", "Define use case", "Clarify the NLP or LLM task, model stage and target users."],
  ["02", "Specify dataset", "Set type, language, domain, volume, style, rights and acceptance criteria."],
  ["03", "Set up contributors", "Match contributors or SMEs and calibrate against examples."],
  ["04", "Pilot batch", "Test instructions, edge cases, formats and the quality rubric."],
  ["05", "Collect at scale", "Create or source text while monitoring volume and coverage."],
  ["06", "Validate quality", "Review duplication, format, language, relevance, rights and policy rules."],
  ["07", "Deliver securely", "Handoff structured text, manifests and provenance metadata."],
] as const;

const useCases = [
  [LibraryBig, "Domain Adaptation", "Specialised corpora and expert-written examples aligned to a domain."],
  [Sparkles, "Supervised Fine-Tuning", "Instruction/response or task examples created against defined rubrics where supported."],
  [MessageSquareText, "Conversational AI", "Multi-turn conversations, user intents and response scenarios."],
  [Search, "Search & Retrieval", "Queries, document corpora and relevance-oriented text collections."],
  [Tags, "Classification & Routing", "Natural utterances covering the intents or classes a model must distinguish."],
  [ListChecks, "Evaluation Sets", "Purpose-built prompts and questions; actual scoring belongs to Model Testing."],
  [Workflow, "Multimodal Text", "Descriptions or text paired with image, video or audio in wider programmes."],
] as const;

const applications = ["Intent classification", "Search and query understanding", "Named-entity systems—labels added downstream", "Sentiment systems—labels added downstream", "Conversational AI", "Summarisation datasets", "Question answering", "Document understanding", "Multilingual language understanding", "RAG and retrieval corpus preparation"];
const quality = ["Duplicate and near-duplicate detection", "Language detection", "Formatting and field validation", "Length checks", "Relevance review", "Domain-expert review", "Grammar or style checks where required", "Project-policy content handling", "Rights and provenance documentation", "PII minimisation or redaction where required", "Sampling and human QA"];
const deliverables = ["JSON", "JSONL", "CSV", "TSV", "TXT", "XML where required", "Source-preserving document formats", "Prompt/response schema", "Conversation-turn schema", "Metadata manifests", "Language and locale fields", "Source and provenance fields"];
const industries = [
  [Workflow, "Technology & SaaS", "Support, product, search and assistant language."],
  [GraduationCap, "Education & EdTech", "Curriculum, assessment, tutoring and learner-language data."],
  [BriefcaseBusiness, "Financial Services", "Domain terminology, queries and authorised documents."],
  [ShieldCheck, "Healthcare & Life Sciences", "Approved specialist-language projects under stricter governance."],
  [ShoppingBag, "Retail & E-commerce", "Product queries, reviews, search language and service interactions."],
  [LibraryBig, "Enterprise Knowledge", "Manuals, knowledge bases and approved client-owned sources."],
] as const;
const customReasons = ["The required domain is underrepresented", "Target users use specialised vocabulary", "Defined intents or scenarios are required", "Low-resource languages matter", "Rights and provenance must be documented", "Real product-specific queries are needed", "Public data is noisy or mismatched", "Expert knowledge is required", "Controlled adaptation or evaluation sets are needed"];
const pricing = ["Target volume", "Human-created versus sourced text", "Language and locale", "Domain complexity", "Contributor expertise", "Text length or turn count", "Research requirements", "Rights or licensing requirements", "QA rubric and review depth", "Timeline"];

const faqs = [
  { question: "What is text data collection?", answer: "Text data collection is the process of sourcing, creating or compiling written language data for NLP, LLM and other language-AI systems. It can include domain corpora, conversations, queries, instructions, responses, documents and multilingual text." },
  { question: "What is the difference between text collection and text annotation?", answer: "Collection creates or sources the text dataset. Annotation adds labels to text that already exists, such as intent labels, entities, sentiment categories or safety tags." },
  { question: "Can eQOURSE create text for LLM fine-tuning?", answer: "Where the project matches eQOURSE's operational capabilities, contributors or domain experts can create instruction/response, conversational or task-specific examples against defined rubrics. The workflow is confirmed during scoping." },
  { question: "Can you collect multilingual text?", answer: "Yes. eQOURSE supports multilingual programmes across 30+ languages, with language, locale, script, regional usage and domain requirements defined during scoping." },
  { question: "Can you collect domain-specific text?", answer: "Yes. Domain-focused programmes can use trained contributors or subject-matter experts where the task requires specialist terminology or factual knowledge." },
  { question: "How do you manage duplicate or low-quality text?", answer: "Quality workflows can include duplicate detection, language checks, format validation, relevance review, domain review and project-specific human QA." },
  { question: "Can you work with our existing documents or knowledge base?", answer: "Yes. Customer-owned or appropriately authorised sources can be incorporated subject to access, rights, confidentiality and data-handling requirements." },
  { question: "What formats can text datasets be delivered in?", answer: "Common formats include JSON, JSONL, CSV, TSV and client-defined text schemas. Conversation, prompt/response and metadata structures can be adapted to the target pipeline." },
  { question: "How do you handle PII or sensitive text?", answer: "The workflow can include project-specific minimisation, redaction, de-identification, access controls and retention rules. Requirements should be defined before processing begins." },
  { question: "How much does text data collection cost?", answer: "Cost depends on volume, language, domain complexity, whether text is created or sourced, contributor expertise, output length, rights requirements, QA depth and timeline." },
];

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
};

const TextDataCollectionPage = () => {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: "https://www.eqourse.com/ai-data-services/data-collection" },
    { "@type": "ListItem", position: 4, name: "Text Data Collection", item: canonical },
  ] };
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Text Data Collection Services for NLP, LLMs & Generative AI", serviceType: "Text Data Collection for AI", description: "Custom text data collection for NLP, LLMs and generative AI across multilingual, domain-specific, conversational and human-generated datasets.", provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" }, areaServed: "Worldwide", url: canonical };

  return <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Data Collection", href: "/ai-data-services/data-collection" }, { label: "Text Data Collection" }]}>
    <SEOHead title="Text Data Collection Services for NLP & LLMs | eQOURSE" description="Custom text data collection for NLP, LLMs and generative AI. Build multilingual, domain-specific, conversational and human-generated training datasets." canonical={canonical} keywords="text data collection services, NLP data collection, LLM training data collection, multilingual text data, custom text datasets" ogImage="https://www.eqourse.com/assets/ai-data/text-collection/text-data-collection-hero.webp" />
    <Helmet><script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script><script type="application/ld+json">{JSON.stringify(serviceSchema)}</script></Helmet>

    <ServiceHero tone="light" preHeadline="Text Data Collection" headline="Text Data Collection Services for" headlineAccent="NLP, LLMs & Generative AI" subtext="Build domain-specific, multilingual and conversational text datasets around the language patterns, tasks and knowledge your models need to understand." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Discuss Your Text Dataset" secondaryCtaLink="/contact-us" imageSrc="/assets/ai-data/text-collection/text-data-collection-hero.webp" imageAvifSrc="/assets/ai-data/text-collection/text-data-collection-hero.avif" imageAlt="Multilingual text data collection for NLP, LLM and generative AI training datasets" imageWidth={1448} imageHeight={1086} rotatingBadges={[{ icon: Languages, title: "Language coverage", subtitle: "Locale · Script · Register", color: "hsl(190 76% 42%)" }, { icon: BookOpenText, title: "Domain depth", subtitle: "Corpora · Queries · Dialogue", color: "hsl(170 82% 40%)" }, { icon: Braces, title: "Structured delivery", subtitle: "JSONL · CSV · Schemas", color: "hsl(28 90% 52%)" }]} bottomBadge={{ iconText: "TXT", title: "Purpose-built language", subtitle: "Human · Domain · Multilingual" }} trustStats={[{ value: "500+", label: "Specialists" }, { value: "30+", label: "Languages" }, { value: "ISO 9001", label: "Quality" }, { value: "ISO 27001", label: "Security" }]} />

    <section className="py-20 md:py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16"><SectionHeader label="The Foundation" title="What Is Text Data" gradientText="Collection for AI?" centered={false}/><div className="lg:pt-10"><p className="text-xl text-foreground/85 leading-relaxed">Text data collection is the process of sourcing, creating or compiling written language data for training, fine-tuning, validating or evaluating NLP, large language models and other text-driven AI systems.</p><p className="mt-5 text-muted-foreground leading-relaxed">Quantity alone is not enough. The dataset must represent the domains, user intents, writing styles, languages and difficult cases the system will encounter in production.</p><div className="mt-8 border-l-2 border-sky-500 pl-5"><p className="font-heading font-bold">Collection creates or sources the language dataset.</p><p className="text-sm text-muted-foreground mt-1">NER, sentiment, entities and intent labels belong to <Link className="text-primary hover:underline" to="/ai-data-services/annotation-labeling/text-nlp-annotation">text and NLP annotation services</Link>.</p></div></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Dataset Types" title="Custom Text Datasets for" gradientText="NLP and Language Models"/><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">{datasetTypes.map(([Icon,title,text,use],index)=><Reveal key={title} className={`h-full ${index===6 ? "lg:col-start-2" : ""}`}><article className="group h-full rounded-2xl border border-border/60 bg-card p-6 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-soft transition-all"><div className="flex justify-between items-start"><div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center"><Icon className="w-6 h-6 text-sky-600" aria-hidden="true"/></div><span className="text-xs text-muted-foreground">0{index+1}</span></div><h3 className="font-heading text-xl font-bold mt-8">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-3">{text}</p><p className="mt-5 pt-4 border-t border-border/60 text-xs text-foreground/65"><strong className="text-sky-700">Applications:</strong> {use}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Clear Service Boundary" title="Text Collection Creates the Language Data;" gradientText="Annotation Adds Structure"/><Reveal className="max-w-6xl mx-auto overflow-x-auto rounded-2xl border border-border/70"><table className="w-full min-w-[720px] text-left"><thead className="bg-foreground text-background"><tr><th className="p-5 font-heading">Project view</th><th className="p-5 font-heading">Text Collection</th><th className="p-5 font-heading">Text Annotation</th></tr></thead><tbody className="divide-y divide-border/70">{[["Main goal","Create or source the text dataset","Add labels to existing text"],["Example","Collect customer-intent utterances","Tag each utterance by intent"],["Example","Create domain Q&A pairs","Score or label answer quality"],["Example","Collect multilingual conversations","Tag entities, sentiment or safety categories"],["eQOURSE next step","This service page","Annotation & Labeling"]].map(row=><tr key={row.join("")} className="bg-card"><th className="p-5 text-sm font-semibold">{row[0]}</th><td className="p-5 text-sm text-muted-foreground">{row[1]}</td><td className="p-5 text-sm text-muted-foreground">{row[2]}</td></tr>)}</tbody></table></Reveal></div></section>

    <section className="py-24 bg-[linear-gradient(135deg,hsl(219_40%_18%),hsl(190_52%_14%))] relative overflow-hidden"><div className="absolute inset-0 opacity-[.04]" style={{backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",backgroundSize:"36px 36px"}}/><div className="container mx-auto px-4 relative"><SectionHeader light label="Collection Methods" title="How Text Data Is" gradientText="Collected"/><div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/10">{methods.map(([Icon,title,text],index)=><Reveal key={title} className="h-full"><article className="h-full bg-white/[.055] p-6"><span className="text-xs text-sky-300">0{index+1}</span><Icon className="w-7 h-7 text-sky-300 mt-8" aria-hidden="true"/><h3 className="font-heading font-bold text-white mt-5">{title}</h3><p className="text-sm text-white/65 leading-relaxed mt-3">{text}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background overflow-hidden"><div className="container mx-auto px-4"><SectionHeader label="Language Design" title="Control the Variables That" gradientText="Shape Model Behaviour"/><Reveal className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 border-y border-border/70">{variables.map(([Icon,title,text],index)=><article key={title} className="p-7 border-b md:border-r border-border/60 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0"><div className="flex items-center gap-3"><span className="text-xs font-bold text-sky-600">0{index+1}</span><Icon className="w-5 h-5 text-sky-600" aria-hidden="true"/></div><h3 className="font-heading font-bold mt-7">{title}</h3><p className="text-sm text-muted-foreground mt-2 leading-relaxed">{text}</p></article>)}</Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto rounded-[2rem] border border-sky-500/20 bg-card p-7 md:p-10"><div className="text-center"><span className="text-xs uppercase tracking-[.2em] font-bold text-sky-700">Dataset Architecture</span><h2 className="font-heading text-3xl md:text-4xl font-bold mt-4">From Language Requirements to a Structured Dataset</h2></div><div className="mt-10 grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-3">{[[BookOpenText,"Domain / Language / Intent / Style"],[Users,"Human or Source Collection"],[ListChecks,"Quality Validation"],[FileJson2,"Structured Dataset"]].map(([Icon,label],index)=><div key={String(label)} className="contents"><div className="group rounded-2xl bg-sky-50 border border-sky-100 p-6 text-center hover:-translate-y-1 transition-transform"><Icon className="w-7 h-7 text-sky-600 mx-auto" aria-hidden="true"/><h3 className="font-heading text-sm font-bold mt-4">{String(label)}</h3></div>{index<3&&<ArrowRight className="hidden lg:block self-center w-5 h-5 text-sky-400 motion-safe:animate-pulse" aria-hidden="true"/>}</div>)}</div></Reveal></div></section>

    <section className="py-24 bg-[linear-gradient(135deg,hsl(197_70%_18%),hsl(170_52%_14%))]"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_.9fr] gap-12 items-center"><div><span className="text-xs uppercase tracking-[.2em] font-bold text-sky-300">Multilingual & Indic Text</span><h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-5">Multilingual Text Collection Across <span className="text-sky-300">30+ Languages</span></h2><p className="text-white/70 mt-6 leading-relaxed">Strong language data reflects local vocabulary, grammar, register, user behaviour and terminology—not just translated English examples. eQOURSE brings particular depth to Indic-language programmes.</p></div><div className="grid grid-cols-2 gap-x-8">{["Language and locale","Script","Regional vocabulary","Code-switching","Formality and register","Domain","Contributor fluency","Review requirements"].map(item=><div key={item} className="flex gap-2 py-4 border-b border-white/10 text-sm text-white/75"><CheckCircle2 className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader label="From Brief to Handoff" title="Our Text Data" gradientText="Collection Process"/>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
          {process.map(([number,title,text])=>
          <Reveal key={number} className="h-full">
            <li className="h-full rounded-2xl border border-border/60 bg-card p-5 relative overflow-hidden group">
            <span className="text-xs font-bold text-sky-600">{number}</span>
            <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/5 rounded-bl-full group-hover:w-20 group-hover:h-20 transition-all"/>
            <h3 className="font-heading font-bold mt-8">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">{text}</p>
            </li>
            </Reveal>)}
          </ol>
        <p className="mt-9 text-center text-sm text-muted-foreground">Continue into <Link to="/ai-data-services/annotation-labeling/text-nlp-annotation" className="text-primary font-semibold hover:underline">Text &amp; NLP Annotation</Link> <ArrowRight className="inline w-3 h-3"/> <Link to="/ai-data-services/cleaning-validation/llm-data-curation" className="text-primary font-semibold hover:underline">LLM corpus curation</Link> <ArrowRight className="inline w-3 h-3"/> <Link to="/ai-data-services/model-testing" className="text-primary font-semibold hover:underline">Model Testing</Link></p></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Quality Rubrics" title="Text Quality Controls for" gradientText="NLP and LLM Data"/><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.7fr_1.3fr] gap-8"><div className="rounded-3xl bg-foreground text-background p-8"><ListChecks className="w-9 h-9 text-sky-300" aria-hidden="true"/><h3 className="font-heading text-2xl font-bold mt-7">Quality is project-specific</h3><p className="text-white/65 leading-relaxed mt-4">Subjective generative text needs defined rubrics and sampling criteria rather than a universal accuracy promise.</p></div><div className="grid sm:grid-cols-2 gap-x-8">{quality.map(item=><div key={item} className="flex gap-3 py-4 border-b border-border/70 text-sm text-foreground/75"><CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="LLM & Generative AI" title="Text Data for Training, Adaptation" gradientText="and Evaluation"/><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">{useCases.map(([Icon,title,text],index)=><Reveal key={title} className={index===6?"lg:col-start-2":""}><article className="group min-h-52 rounded-2xl border border-border/60 p-6 hover:border-sky-500/40 transition-colors"><Icon className="w-6 h-6 text-sky-600 group-hover:translate-x-1 transition-transform" aria-hidden="true"/><h3 className="font-heading text-lg font-bold mt-8">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-3">{text}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12"><div><span className="text-xs uppercase tracking-[.2em] font-bold text-sky-700">NLP Applications</span><h2 className="font-heading text-3xl md:text-4xl font-bold mt-5">Text Data for NLP Applications</h2><p className="text-muted-foreground mt-5 leading-relaxed">This service collects the underlying examples. Entity, sentiment, intent and safety labels are scoped under annotation.</p></div><div className="grid sm:grid-cols-2">{applications.map((item,index)=><div key={item} className="flex gap-3 py-4 border-b border-border/70 text-sm"><span className="text-xs font-bold text-sky-600">{String(index+1).padStart(2,"0")}</span>{item}</div>)}</div></Reveal></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden grid lg:grid-cols-[1.15fr_.85fr] bg-[linear-gradient(135deg,hsl(219_40%_18%),hsl(190_52%_14%))]"><div className="p-8 md:p-12"><span className="text-xs uppercase tracking-[.2em] font-bold text-sky-300">Rights, Provenance & Privacy</span><h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-5">Responsible Sourcing for Text Training Data</h2><p className="text-white/70 leading-relaxed mt-5">Text can carry copyright, privacy and confidentiality risk. Permitted sources, intended use, access, retention and governance are defined before collection begins.</p></div><div className="p-8 md:p-12 bg-white/[.06]"><ShieldCheck className="w-10 h-10 text-sky-300" aria-hidden="true"/><ul className="mt-7 grid gap-3">{["Customer-owned source handling","Rights-cleared source rules","Contributor-created content consent","Provenance metadata","PII minimisation or redaction","Secure access and retention rules","ISO 27001 and ISO 9001"].map(item=><li key={item} className="flex gap-3 text-sm text-white/80"><CheckCircle2 className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" aria-hidden="true"/>{item}</li>)}</ul></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Technical Handoff" title="Text Dataset Formats" gradientText="and Delivery"/><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.7fr_1.3fr] gap-8"><div className="rounded-3xl bg-sky-950 text-white p-8"><Braces className="w-9 h-9 text-sky-300" aria-hidden="true"/><h3 className="font-heading text-2xl font-bold mt-7">Use the target schema</h3><p className="text-white/65 mt-4 leading-relaxed">Delivery adapts to the client pipeline rather than hardcoding one universal format.</p></div><div className="grid sm:grid-cols-2 gap-x-8 border-y border-border/70">{deliverables.map(item=><div key={item} className="flex gap-3 py-4 border-b border-border/60 text-sm"><FileJson2 className="w-4 h-4 text-sky-600 shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Industries" title="Domain-Specific Text" gradientText="Data Collection"/><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">{industries.map(([Icon,title,text])=><Reveal key={title}><article className="flex gap-5 py-6 border-b border-border/70"><div className="w-11 h-11 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-sky-600" aria-hidden="true"/></div><div><h3 className="font-heading font-bold">{title}</h3><p className="text-sm text-muted-foreground mt-2">{text}</p></div></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8"><Reveal className="rounded-3xl border border-border/60 bg-card p-8"><span className="text-xs uppercase tracking-widest text-sky-700 font-bold">Buyer Fit</span><h2 className="font-heading text-3xl font-bold mt-4">When Generic Web Text Is Not Enough</h2><ul className="mt-7 space-y-4">{customReasons.map(item=><li key={item} className="flex gap-3 text-sm text-foreground/75"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true"/>{item}</li>)}</ul></Reveal><Reveal className="rounded-3xl bg-foreground text-background p-8"><span className="text-xs uppercase tracking-widest text-sky-300 font-bold">Project Scoping</span><h2 className="font-heading text-3xl font-bold mt-4">What Determines Text Data Collection Cost?</h2><ol className="mt-7 grid sm:grid-cols-2 gap-3">{pricing.map((item,index)=><li key={item} className="flex gap-3 text-sm text-white/70"><span className="text-sky-300 text-xs font-bold">{String(index+1).padStart(2,"0")}</span>{item}</li>)}</ol><Link to="/contact-us" className="inline-flex items-center gap-2 mt-8 text-sky-300 font-semibold hover:text-white">Discuss your requirements <ArrowRight className="w-4 h-4"/></Link></Reveal></div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 items-center"><div><SectionHeader label="Why eQOURSE" title="Language Expertise Across the" gradientText="Complete Data Lifecycle" centered={false}/><p className="text-muted-foreground mt-6 leading-relaxed">Coordinate custom collection, language-aware QA and downstream data operations through one delivery partner.</p><Link to="/ai-data-services/data-collection" className="inline-flex items-center gap-2 mt-7 text-primary font-semibold hover:underline">Explore all AI Data Collection Services <ArrowRight className="w-4 h-4"/></Link></div><div className="grid sm:grid-cols-2 gap-x-8">{["30+ language capability","Strong Indic-language depth","Multidisciplinary specialist base","Education, STEM and domain expertise","Human-generated custom workflows","Collection to testing lifecycle","ISO 9001 and ISO 27001","Project-specific quality rubrics"].map(item=><div key={item} className="flex gap-3 py-4 border-b border-border/70 text-sm"><CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-20 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Explore Other Data Modalities" title="Continue Building Your" gradientText="Multimodal Dataset"/><div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">{[["Image Data Collection","/ai-data-services/data-collection/image-data-collection","Purpose-built imagery for computer vision."],["Audio & Speech Data Collection","/ai-data-services/data-collection/audio-data-collection","Multilingual speech across devices and environments."],["Text & NLP Annotation","/ai-data-services/annotation-labeling/text-nlp-annotation","Add entities, intent, sentiment and relationships after collection."]].map(([title,href,text])=><Link key={title} to={href} className="group rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/40 hover:shadow-soft transition-all"><h3 className="font-heading text-lg font-bold">{title}</h3><p className="text-sm text-muted-foreground mt-3">{text}</p><ArrowRight className="w-5 h-5 text-primary mt-6 group-hover:translate-x-1 transition-transform"/></Link>)}</div></div></section>

    <RelatedBlogs />
    <FAQSection label="Text Collection FAQs" title="Frequently Asked Questions About Text Data Collection" faqs={faqs}/>
    <ServiceCTA headline="Build Language Data Around the Tasks Your Model Must Perform" subtext="Tell us the language, domain, text type, target volume, contributor expertise and downstream AI use case." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us"/>
  </AIDataServicesLayout>;
};

export default TextDataCollectionPage;
