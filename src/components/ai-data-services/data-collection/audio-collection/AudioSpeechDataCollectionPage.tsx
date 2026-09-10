import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Link } from "react-router-dom";
import {
  Activity, ArrowRight, AudioLines, BadgeCheck, BriefcaseBusiness, Car, CheckCircle2,
  CircleDot, FileAudio, FileCheck2, Globe2, GraduationCap, Headphones,
  Languages, Laptop, MessageSquareText, Mic2, Radio, ShieldCheck, Smartphone,
  Sparkles, Users, Volume2, Waves,
} from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import SectionHeader from "../../shared/SectionHeader";
import FAQSection from "../../shared/FAQSection";
import ServiceCTA from "../../shared/ServiceCTA";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const canonical = "https://www.eqourse.com/ai-data-services/data-collection/audio-data-collection";

const datasetTypes = [
  { icon: FileAudio, title: "Scripted Speech", text: "Predetermined prompts, commands, phrases or sentences recorded under defined language and capture requirements.", use: "ASR, command recognition, wake words, pronunciation coverage" },
  { icon: Mic2, title: "Spontaneous Speech", text: "Natural speech around topics, scenarios or prompts without requiring participants to read a fixed script.", use: "Natural-language interfaces, spontaneous ASR, speech understanding" },
  { icon: MessageSquareText, title: "Conversational Speech", text: "Natural or guided conversations between two or more speakers with defined roles and project scenarios.", use: "Voice agents, call-centre models, dialogue understanding" },
  { icon: Radio, title: "Wake Words & Commands", text: "Short utterances and activation phrases captured across speakers, accents, distances and environments.", use: "Smart devices, automotive voice control, edge AI" },
  { icon: BriefcaseBusiness, title: "Domain-Specific Speech", text: "Speech built around domain-designed scenarios or contributors with relevant subject knowledge.", use: "Technical, financial, education and customer-support systems" },
  { icon: Waves, title: "Non-Speech Acoustic Events", text: "Selected environmental sounds or audio events captured under controlled project specifications.", use: "Audio event detection, safety systems, context-aware AI" },
];

const variables = [
  [Languages, "Language", "Target language and locale are defined independently."],
  [Globe2, "Accent & Dialect", "Regional pronunciation, dialect and code-switching where relevant."],
  [Users, "Speaker Profile", "Legally appropriate, project-specific speaker criteria."],
  [MessageSquareText, "Speaking Style", "Read, spontaneous, conversational, command or task-based speech."],
  [Headphones, "Device & Microphone", "Phone, headset, laptop, vehicle or specified recording hardware."],
  [Laptop, "Environment", "Quiet rooms, offices, homes, public spaces, vehicles or studios."],
  [CircleDot, "Distance & Position", "Near-field, far-field and device-relative placement."],
  [Volume2, "Noise Conditions", "Conversation, traffic, room noise and realistic acoustic interference."],
] as const;

const methods = [
  [Smartphone, "Remote Contributor Recording", "Controlled instructions and approved devices support geographically distributed speaker coverage."],
  [Mic2, "Moderated / Studio Collection", "Supervised sessions when room conditions, microphone quality, speaker behaviour or security need tighter control."],
  [Car, "In-Environment Collection", "Capture in vehicles, homes, workplaces or other deployment environments where acoustic context matters."],
  [FileCheck2, "Defined Client Workflow", "Contributors may work through an approved client or project workflow when technically and operationally supported."],
] as const;

const process = [
  ["01", "Define use case", "ASR, TTS, wake word, voice agent, command or acoustic application."],
  ["02", "Specify speech", "Locale, prompt, speaker, device, environment, format and acceptance rules."],
  ["03", "Source & calibrate", "Match contributors and calibrate recording instructions."],
  ["04", "Pilot recording", "Validate scripts, pronunciation, signal quality and metadata."],
  ["05", "Collect at scale", "Track language, speaker and environment coverage."],
  ["06", "Audio QA", "Check clipping, silence, noise, duplicates and specification compliance."],
  ["07", "Secure delivery", "Handoff recordings, manifests and agreed metadata."],
] as const;

const qualityGroups = [
  { title: "Signal checks", icon: Activity, items: ["Clipping and distortion", "Missing or truncated audio", "Silence and signal-level rules", "Sample rate, channels and file integrity"] },
  { title: "Prompt compliance", icon: FileCheck2, items: ["Expected prompt or scenario", "No accidental substitution", "Correct language and locale", "Pronunciation rules where applicable"] },
  { title: "Acoustic compliance", icon: Headphones, items: ["Target environment", "Specified device or microphone", "Distance and position", "Required background-noise condition"] },
  { title: "Language & metadata", icon: Languages, items: ["Project-safe speaker/session IDs", "Required metadata only", "Language-qualified review where needed", "No unnecessary personal data"] },
];

const applications = [
  [AudioLines, "Automatic Speech Recognition (ASR)"], [Mic2, "Text-to-Speech Support Data"],
  [Sparkles, "Voice Assistants & Voice Agents"], [Radio, "Wake Word & Command Recognition"],
  [MessageSquareText, "Conversational AI"], [Users, "Speaker / Dialogue Understanding"],
  [Headphones, "Customer-Service AI"], [Waves, "Audio Event Detection"],
] as const;

const industries = [
  [Smartphone, "Technology & Consumer Devices", "Wake words, commands and assistant interactions."],
  [Car, "Automotive & Mobility", "In-vehicle speech, commands and noisy cabin conditions."],
  [Headphones, "Customer Experience", "Conversational speech and service scenarios for voice agents."],
  [BriefcaseBusiness, "Financial Services", "Approved domain-language speech scenarios."],
  [GraduationCap, "Education & EdTech", "Education-domain speech where appropriate and legally permitted."],
  [BadgeCheck, "Accessibility", "Ethically designed and appropriately consented speech-diversity scenarios."],
] as const;

const deliverables = ["WAV", "FLAC", "MP3 where appropriate", "Mono / stereo", "Agreed sample rate and bit depth", "Filename / prompt mapping", "Project-safe speaker and session IDs", "Language / locale metadata", "Device and environment metadata", "Recording-session manifests"];
const customReasons = ["Your target accent or dialect is underrepresented", "Deployment depends on a specific microphone or device", "Users speak in noisy environments", "Colloquial or domain language is missing", "New commands or wake words are required", "Specific conversational scenarios are needed", "Licensing or provenance requirements are strict", "Production failures reveal missing coverage"];
const pricing = ["Recorded hours or utterances", "Language and dialect requirements", "Speaker criteria", "Scripted versus conversational complexity", "Device and microphone requirements", "Environment and noise conditions", "Moderation or studio needs", "Domain expertise", "QA depth", "Timeline"];

const faqs = [
  { question: "What is speech data collection?", answer: "Speech data collection is the process of recording human speech or related audio for training, fine-tuning, validating or evaluating speech-enabled AI. Projects can specify languages, accents, speaker profiles, devices, microphones, environments and speaking styles." },
  { question: "What speech types can eQOURSE collect?", answer: "Depending on the project, collection can include scripted speech, spontaneous speech, guided or natural conversations, wake words, device commands, domain-specific speech and selected non-speech acoustic events." },
  { question: "Can you collect multilingual and accented speech?", answer: "Yes. eQOURSE supports multilingual programmes across 30+ languages. Accent, dialect, locale and speaker requirements should be defined during project scoping." },
  { question: "Can you record in noisy or real-world environments?", answer: "Yes. Projects can be designed around homes, offices, vehicles or other environments when the model needs to handle realistic acoustic conditions." },
  { question: "Can you collect audio using specific microphones or devices?", answer: "Yes. Device-specific requirements can be included when model performance depends on a particular microphone, phone, headset or recording setup." },
  { question: "What audio formats do you support?", answer: "Common formats include WAV, FLAC and other agreed formats. Sample rate, bit depth, channel configuration and metadata should follow the client's model pipeline." },
  { question: "How do you check audio quality?", answer: "Checks can include clipping, silence, truncation, file integrity, prompt compliance, sample-rate validation, language review, device and environment checks, and human QA where necessary." },
  { question: "How is voice-data consent handled?", answer: "Contributor consent and permitted use should be defined before recording. Retention, access and any de-identification requirements depend on the project and applicable legal requirements." },
  { question: "Can eQOURSE transcribe or annotate the audio after collection?", answer: "Yes. Collected audio can continue into downstream transcription, annotation, cleaning and validation workflows based on the project requirements." },
  { question: "How much does speech data collection cost?", answer: "Cost depends on language, dialect, speaker criteria, total hours or utterances, recording method, environment, device constraints, QA depth and timeline. A project-specific quote is more meaningful than a generic rate." },
];

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
};

const Waveform = ({ light = false }: { light?: boolean }) => (
  <div className="flex h-12 items-center justify-center gap-1" aria-hidden="true">
    {[18, 32, 44, 26, 38, 48, 30, 20, 36, 46, 24, 34, 18].map((height, index) => (
      <span key={`${height}-${index}`} className={`w-1 rounded-full motion-safe:animate-pulse ${light ? "bg-white/65" : "bg-primary/65"}`} style={{ height, animationDelay: `${index * 90}ms` }} />
    ))}
  </div>
);

const AudioSpeechDataCollectionPage = () => {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: "https://www.eqourse.com/ai-data-services/data-collection" },
    { "@type": "ListItem", position: 4, name: "Audio & Speech Data Collection", item: canonical },
  ] };
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Audio & Speech Data Collection Services for Voice AI", serviceType: "Audio and Speech Data Collection for AI", description: "Custom audio and speech data collection for ASR, TTS and voice AI across languages, accents, speakers, devices and real-world acoustic environments.", provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" }, areaServed: "Worldwide", url: canonical };

  return <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Data Collection", href: "/ai-data-services/data-collection" }, { label: "Audio & Speech Data Collection" }]}>
    <SEOHead title="Audio & Speech Data Collection Services for Voice AI | eQOURSE" description="Custom audio and speech data collection for ASR, TTS and voice AI across languages, accents, speakers, devices and real-world acoustic environments." canonical={canonical} keywords="audio data collection services, speech data collection services, voice data collection, ASR training data, multilingual speech datasets" ogImage="https://www.eqourse.com/assets/ai-data/audio-collection/audio-speech-data-collection-hero.webp" />
    <Helmet><script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script><script type="application/ld+json">{JSON.stringify(serviceSchema)}</script></Helmet>

    <ServiceHero tone="light" preHeadline="Audio & Speech Data Collection" headline="Audio & Speech Data Collection Services for" headlineAccent="Voice AI" subtext="Build speech datasets around the languages, accents, speaker profiles, devices and acoustic environments your model will encounter in production." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Discuss Your Speech Dataset" secondaryCtaLink="/contact-us" imageSrc="/assets/ai-data/audio-collection/audio-speech-data-collection-hero.webp" imageAvifSrc="/assets/ai-data/audio-collection/audio-speech-data-collection-hero.avif" imageAlt="Multilingual speech data collection for voice AI across speakers, devices and acoustic environments" imageWidth={1448} imageHeight={1086} rotatingBadges={[{ icon: Languages, title: "Linguistic coverage", subtitle: "Language · Accent · Dialect", color: "hsl(190 76% 42%)" }, { icon: Headphones, title: "Acoustic variation", subtitle: "Device · Distance · Noise", color: "hsl(170 82% 40%)" }, { icon: Activity, title: "Signal validation", subtitle: "Format · Clipping · Integrity", color: "hsl(28 90% 52%)" }]} bottomBadge={{ iconText: "VO", title: "Production-fit voices", subtitle: "Scripted · Natural · Conversational" }} trustStats={[{ value: "500+", label: "Specialists" }, { value: "30+", label: "Languages" }, { value: "ISO 9001", label: "Quality" }, { value: "ISO 27001", label: "Security" }]} />

    <section className="py-20 md:py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16"><SectionHeader label="The Foundation" title="What Is Audio & Speech Data" gradientText="Collection for AI?" centered={false} /><div className="lg:pt-10"><p className="text-xl text-foreground/85 leading-relaxed">Audio data collection is the process of recording or sourcing speech, voice and other sound data for training, fine-tuning, validating or evaluating AI systems.</p><p className="mt-5 text-muted-foreground leading-relaxed">A collection programme can control language, accent, speaker profile, speaking style, microphone, environment, background noise and recording format so the dataset reflects real operating conditions—not only clean studio audio.</p><div className="mt-8 border-l-2 border-cyan-500 pl-5"><p className="font-heading font-bold">Collection creates the raw speech or acoustic dataset.</p><p className="text-sm text-muted-foreground mt-1">Transcripts, speaker turns, timestamps and acoustic labels belong to <Link className="text-primary hover:underline" to="/ai-data-services/annotation-labeling/audio-speech-annotation">audio and speech annotation services</Link>.</p></div></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Speech Types" title="Speech Data Collection for" gradientText="Real Voice AI Use Cases" subtitle="The recording design starts with how people will actually speak to, around or through the target system." /><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">{datasetTypes.map(({icon:Icon,...item}, index) => <Reveal key={item.title} className="h-full"><article className="group h-full rounded-2xl border border-border/60 bg-card p-6 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-soft transition-all"><div className="flex items-start justify-between"><div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center"><Icon className="w-6 h-6 text-cyan-600" aria-hidden="true" /></div><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="font-heading text-xl font-bold mt-8">{item.title}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-3">{item.text}</p><p className="mt-5 pt-4 border-t border-border/60 text-xs text-foreground/65"><strong className="text-cyan-700">Applications:</strong> {item.use}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background overflow-hidden"><div className="container mx-auto px-4"><SectionHeader label="Speech Variability Matrix" title="Capture the Language and Acoustic Variation" gradientText="Your Model Needs" /><Reveal className="max-w-6xl mx-auto"><div className="rounded-[2rem] border border-cyan-500/20 bg-[linear-gradient(145deg,hsl(190_55%_98%),white)] p-5 md:p-9 shadow-soft"><Waveform /><div className="my-7 h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent"/><div className="grid sm:grid-cols-2 lg:grid-cols-4">{variables.map(([Icon,title,text], index) => <article key={title} className="p-5 md:p-6 border-b border-border/60 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(n+5)]:border-b-0"><div className="flex items-center gap-3"><span className="text-[10px] font-bold text-cyan-600">0{index + 1}</span><Icon className="w-5 h-5 text-cyan-600" aria-hidden="true" /></div><h3 className="font-heading font-bold mt-5">{title}</h3><p className="text-sm text-muted-foreground mt-2 leading-relaxed">{text}</p></article>)}</div><p className="mt-7 text-center text-xs md:text-sm font-semibold tracking-wide text-cyan-800">Language × Accent × Speaker × Device × Environment × Speaking Style</p></div></Reveal></div></section>

    <section className="py-24 bg-[linear-gradient(135deg,hsl(190_55%_17%),hsl(174_48%_12%))] relative overflow-hidden"><div className="absolute inset-0 opacity-[.05]" style={{backgroundImage:"repeating-linear-gradient(90deg,transparent 0,transparent 24px,white 25px,transparent 26px)",backgroundSize:"160px 100%"}}/><div className="container mx-auto px-4 relative"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_.9fr] gap-12 items-center"><div><span className="text-xs uppercase tracking-[.2em] font-bold text-cyan-300">Multilingual & Indic Speech</span><h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-5">Multilingual Speech Data Across <span className="text-cyan-300">30+ Languages</span></h2><p className="text-white/70 leading-relaxed mt-6 max-w-2xl">Voice AI quality depends on authentic speakers, pronunciation, accent patterns, colloquial phrasing and recording conditions—not simply translated prompts. eQOURSE supports multilingual programmes with strong delivery depth in Indic languages.</p></div><div className="rounded-3xl border border-white/10 bg-white/[.06] p-7 backdrop-blur-sm"><Waveform light /><div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">{["Target language", "Regional accent", "Dialect", "Speaker mix", "Code-switching", "Prompt style", "Recording device", "Acoustic environment"].map(item => <div key={item} className="flex gap-2 text-sm text-white/75"><CheckCircle2 className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" aria-hidden="true"/>{item}</div>)}</div></div></Reveal></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Collection Models" title="How We Collect Speech and" gradientText="Audio Training Data" /><div className="grid md:grid-cols-2 gap-px bg-border/70 max-w-6xl mx-auto border border-border/70 rounded-3xl overflow-hidden">{methods.map(([Icon,title,text], index) => <Reveal key={title} className="h-full"><article className="h-full bg-card p-7 md:p-9 group"><div className="flex items-center justify-between"><Icon className="w-7 h-7 text-cyan-600 group-hover:scale-110 transition-transform" aria-hidden="true"/><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="font-heading text-xl font-bold mt-8">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-3">{text}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="From Brief to Handoff" title="Our Speech Data" gradientText="Collection Process" /><ol className="max-w-5xl mx-auto relative before:absolute before:left-[22px] md:before:left-1/2 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-cyan-500 before:via-primary/30 before:to-transparent">{process.map(([number,title,text], index) => <Reveal key={number}><li className={`relative mb-6 md:w-1/2 ${index % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}><span className={`absolute z-10 top-5 w-11 h-11 rounded-full bg-background border-2 border-cyan-500 text-cyan-700 text-xs font-bold flex items-center justify-center ${index % 2 ? "left-0 -translate-x-1/2 md:left-0" : "left-0 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2"}`}>{number}</span><article className="ml-12 md:ml-0 rounded-2xl border border-border/60 bg-card p-6"><h3 className="font-heading font-bold">{title}</h3><p className="text-sm text-muted-foreground mt-2">{text}</p></article></li></Reveal>)}</ol><p className="mt-10 text-center text-sm text-muted-foreground">Downstream path: <Link className="font-semibold text-primary hover:underline" to="/ai-data-services/annotation-labeling/audio-speech-annotation">Audio &amp; Speech Annotation</Link> <ArrowRight className="inline w-3 h-3"/> <Link className="font-semibold text-primary hover:underline" to="/ai-data-services/cleaning-validation">Cleaning &amp; Validation</Link> <ArrowRight className="inline w-3 h-3"/> <Link className="font-semibold text-primary hover:underline" to="/ai-data-services/model-testing">Model Testing</Link></p></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Audio Validation" title="Quality Controls Built Around the" gradientText="Project Specification" /><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">{qualityGroups.map(({title,icon:Icon,items}) => <Reveal key={title} className="h-full"><article className="h-full border-t-2 border-cyan-500 bg-muted/25 p-6"><Icon className="w-6 h-6 text-cyan-600" aria-hidden="true"/><h3 className="font-heading text-lg font-bold mt-5">{title}</h3><ul className="mt-5 space-y-3">{items.map(item => <li key={item} className="flex gap-2 text-sm text-foreground/70"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true"/>{item}</li>)}</ul></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Applications" title="Audio Training Data for" gradientText="Modern Speech AI" /><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">{applications.map(([Icon,title]) => <Reveal key={title}><article className="group flex min-h-32 items-end gap-4 rounded-2xl bg-card border border-border/60 p-5 hover:border-cyan-500/40 transition-colors"><Icon className="w-6 h-6 text-cyan-600 group-hover:-translate-y-1 transition-transform shrink-0" aria-hidden="true"/><h3 className="font-heading font-semibold text-sm">{title}</h3></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden grid lg:grid-cols-[1.2fr_.8fr] bg-[linear-gradient(135deg,hsl(219_40%_18%),hsl(190_52%_14%))]"><div className="p-8 md:p-12"><span className="text-xs uppercase tracking-[.2em] font-bold text-cyan-300">Consent, Privacy & Voice Data</span><h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-5">Responsible Collection for Human Voice Data</h2><p className="text-white/70 leading-relaxed mt-5">Voice recordings can contain personal information and may be sensitive in some contexts. Scoping defines permitted use, contributor consent, retention, access, required de-identification and metadata minimisation before collection begins.</p></div><div className="p-8 md:p-12 bg-white/[.06]"><ShieldCheck className="w-10 h-10 text-cyan-300" aria-hidden="true"/><ul className="mt-7 grid gap-3">{["ISO 27001", "ISO 9001", "Controlled access", "Secure transfer", "Project-specific consent", "Provenance and collection metadata"].map(item => <li key={item} className="flex gap-3 text-sm text-white/80"><CheckCircle2 className="w-4 h-4 text-cyan-300 mt-0.5" aria-hidden="true"/>{item}</li>)}</ul></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Technical Handoff" title="Audio Formats, Metadata" gradientText="and Delivery" /><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.75fr_1.25fr] gap-8 items-start"><div className="rounded-3xl bg-cyan-950 text-white p-8"><FileAudio className="w-9 h-9 text-cyan-300" aria-hidden="true"/><h3 className="font-heading text-2xl font-bold mt-7">Built for the model pipeline</h3><p className="text-white/65 mt-4 leading-relaxed">Sample rate, bit depth, channels, identifiers and metadata are agreed around the project rather than imposed as a universal standard.</p><p className="text-sm text-cyan-200 mt-7">When transcription is included, transcript files are delivered separately under the downstream specification.</p></div><div className="grid sm:grid-cols-2 gap-x-8 gap-y-0 border-y border-border/70">{deliverables.map(item => <div key={item} className="flex items-center gap-3 py-4 border-b border-border/60 text-sm"><FileCheck2 className="w-4 h-4 text-cyan-600 shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Industries" title="Speech Data Collection Across" gradientText="Real-World Domains" /><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">{industries.map(([Icon,title,text]) => <Reveal key={title}><article className="flex gap-5 py-6 border-b border-border/70"><div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-cyan-600" aria-hidden="true"/></div><div><h3 className="font-heading font-bold">{title}</h3><p className="text-sm text-muted-foreground mt-2">{text}</p></div></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8"><Reveal className="rounded-3xl border border-border/60 bg-card p-7 md:p-9"><span className="text-xs uppercase tracking-widest text-cyan-700 font-bold">Buyer Fit</span><h2 className="font-heading text-3xl font-bold mt-4">When Public Speech Datasets Are Not Enough</h2><ul className="mt-7 space-y-4">{customReasons.map(item => <li key={item} className="flex gap-3 text-sm text-foreground/75"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true"/>{item}</li>)}</ul></Reveal><Reveal className="rounded-3xl bg-foreground text-background p-7 md:p-9"><span className="text-xs uppercase tracking-widest text-cyan-300 font-bold">Project Scoping</span><h2 className="font-heading text-3xl font-bold mt-4">What Determines Audio Data Collection Cost?</h2><ol className="mt-7 grid sm:grid-cols-2 gap-3">{pricing.map((item,index) => <li key={item} className="flex gap-3 text-sm text-white/70"><span className="text-cyan-300 text-xs font-bold">{String(index + 1).padStart(2,"0")}</span>{item}</li>)}</ol><Link to="/contact-us" className="inline-flex items-center gap-2 mt-8 text-cyan-300 font-semibold hover:text-white transition-colors">Discuss your requirements <ArrowRight className="w-4 h-4"/></Link></Reveal></div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 items-center"><div><SectionHeader label="Why eQOURSE" title="Language-Aware Collection From" gradientText="Recording to Model Testing" centered={false} /><p className="text-muted-foreground leading-relaxed mt-6">Coordinate multilingual collection, acoustic QA and the next stages of your data workflow through one delivery partner.</p><Link to="/ai-data-services/data-collection" className="inline-flex items-center gap-2 mt-7 text-primary font-semibold hover:underline">Explore all AI Data Collection Services <ArrowRight className="w-4 h-4"/></Link></div><div className="grid sm:grid-cols-2 gap-x-8">{["Multilingual programmes across 30+ languages", "Strong Indic-language delivery capability", "Remote, controlled and real-environment collection", "Language-aware quality review", "Connected annotation, validation and testing", "ISO 9001 and ISO 27001", "Domain specialists where required"].map(item => <div key={item} className="flex gap-3 py-4 border-b border-border/70 text-sm"><CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-20 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Explore Other Data Modalities" title="Continue Building Your" gradientText="Multimodal Dataset" /><div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5"><Link to="/ai-data-services/data-collection/image-data-collection" className="group rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/40 hover:shadow-soft transition-all"><span className="text-xs uppercase tracking-wider text-primary font-bold">Live service page</span><h3 className="font-heading text-xl font-bold mt-3">Image Data Collection</h3><p className="text-sm text-muted-foreground mt-2">Purpose-built imagery for computer vision and multimodal AI.</p><ArrowRight className="w-5 h-5 text-primary mt-6 group-hover:translate-x-1 transition-transform"/></Link><Link to="/ai-data-services/annotation-labeling/audio-speech-annotation" className="group rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/40 hover:shadow-soft transition-all"><span className="text-xs uppercase tracking-wider text-primary font-bold">Downstream workflow</span><h3 className="font-heading text-xl font-bold mt-3">Audio &amp; Speech Annotation</h3><p className="text-sm text-muted-foreground mt-2">Add transcripts, speaker labels, timings and acoustic events after collection.</p><ArrowRight className="w-5 h-5 text-primary mt-6 group-hover:translate-x-1 transition-transform"/></Link></div></div></section>
   
    <RelatedBlogs />
    <FAQSection label="Audio Collection FAQs" title="Frequently Asked Questions About Audio & Speech Data Collection" faqs={faqs} />
    <ServiceCTA headline="Build Speech Data Around the Voices Your AI Must Understand" subtext="Tell us the target languages, accents, speaker profile, recording environment, device requirements, volume and AI use case." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" />
  </AIDataServicesLayout>;
};

export default AudioSpeechDataCollectionPage;
