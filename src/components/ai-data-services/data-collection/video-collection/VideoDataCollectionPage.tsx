import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Link } from "react-router-dom";
import {
  Activity, ArrowRight, BadgeCheck, Boxes, Camera, Car,
  CheckCircle2, Clock3, Eye, Film, Focus, Gauge, Glasses, Hand,
  Layers3, MapPin, MonitorPlay, Move3d, PackageCheck, Play, ScanLine,
  ShieldCheck, ShoppingBag, Smartphone, SunMedium, Users, Warehouse,
} from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import SectionHeader from "../../shared/SectionHeader";
import FAQSection from "../../shared/FAQSection";
import ServiceCTA from "../../shared/ServiceCTA";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const canonical = "https://www.eqourse.com/ai-data-services/data-collection/video-data-collection";

const datasetTypes = [
  [Users, "Human Actions & Activities", "Scripted or natural sequences of people performing defined movements, gestures or everyday tasks.", "Action recognition, activity understanding, fitness, safety and HCI"],
  [Boxes, "Object Movement & Interaction", "Objects being moved, handled, used, assembled or interacting with people and environments.", "Tracking, manipulation understanding, visual reasoning and physical AI"],
  [Layers3, "Environment & Scene Video", "Indoor, outdoor, retail, workplace, road and domain scenes captured across changing conditions.", "Scene understanding, autonomy, event analytics and multimodal AI"],
  [Car, "In-Vehicle & Mobility Video", "Where supported, cabin, road or mobility scenarios recorded through defined cameras and protocols.", "Driver monitoring, road perception, ADAS research and mobility AI"],
  [Camera, "Multi-Camera Capture", "The same action or scene captured from multiple viewpoints when cross-view consistency matters.", "3D understanding, pose analysis and complex scene understanding"],
  [Glasses, "Egocentric / First-Person Video", "Approved wearable or first-person capture of tasks, actions and object interactions.", "Embodied AI, activity understanding, task learning and assistants"],
] as const;

const variables = [
  [Play, "Action / Scenario", "Define the task, event or behaviour that must appear."],
  [Camera, "Camera Viewpoint", "Fixed, handheld, first-person, third-person, dashboard or overhead."],
  [Gauge, "Frame Rate & Resolution", "Match technical requirements to the downstream model pipeline."],
  [Clock3, "Duration", "Short clips, task sequences or longer context windows."],
  [SunMedium, "Lighting & Time", "Indoor, outdoor, day, night and other relevant conditions."],
  [MapPin, "Environment", "Home, workplace, store, vehicle, road or controlled studio."],
  [Users, "Participant / Object Coverage", "Legally appropriate variation defined around the use case."],
  [Activity, "Temporal Diversity", "Meaningful sequence variation, pace changes and edge cases."],
] as const;

const methods = [
  [Smartphone, "Remote Contributor Capture", "Contributors record defined scenarios using approved phones, cameras or wearable devices."],
  [Camera, "Moderated / Controlled Capture", "Supervised recording where framing, action, safety, lighting or security needs tighter control."],
  [MapPin, "Field Collection", "Real-world capture in roads, stores, workplaces, homes or other deployment environments."],
  [Move3d, "Device / Rig-Specific Capture", "Named cameras, mounts, wearables or multi-camera rigs where deployment depends on the capture system."],
  [Film, "Rights-Cleared Video", "Customer-provided or appropriately rights-cleared clips incorporated under defined ownership and permitted use."],
] as const;

const process = [
  ["01", "Define use case", "Set the model task, target actions, deployment context and failure cases."],
  ["02", "Specify capture", "Define scenario, camera, viewpoint, duration, frame rate, environment and metadata."],
  ["03", "Prepare setup", "Coordinate contributors, locations, devices and safety instructions."],
  ["04", "Pilot capture", "Validate framing, motion, scenario clarity, files and metadata."],
  ["05", "Capture at scale", "Monitor scenario, viewpoint and environment coverage."],
  ["06", "Validate quality", "Check integrity, blur, framing, duration, compliance and duplicates."],
  ["07", "Deliver securely", "Handoff video, manifests and source or consent metadata."],
] as const;

const qualityGroups = [
  { icon: Film, title: "Technical checks", items: ["File integrity", "Codec and container", "Duration and orientation", "Resolution and frame rate", "Missing or corrupted frames where detectable"] },
  { icon: Eye, title: "Visual checks", items: ["Blur and exposure", "Camera obstruction", "Required framing", "Target action or object visibility"] },
  { icon: BadgeCheck, title: "Scenario checks", items: ["Correct task performed", "Required sequence captured", "Specified device and environment", "Start and end conditions"] },
  { icon: Layers3, title: "Coverage & duplication", items: ["Scenario distribution", "Viewpoint and environment coverage", "Participant or object variation", "Duplicate and near-identical clip review"] },
];

const applications = [
  [Play, "Action Recognition"], [Focus, "Object Tracking"],
  [Hand, "Gesture & Pose Understanding"], [ScanLine, "Scene / Event Understanding"],
  [Car, "Autonomous & Mobility Systems"], [ShieldCheck, "Safety & Monitoring Systems"],
  [MonitorPlay, "Multimodal Video-Language Models"], [Move3d, "Embodied / Physical AI Bridge"],
] as const;

const deliverables = ["MP4", "MOV", "WebM or required containers", "Agreed codec", "Agreed resolution and frame rate", "Clip and session IDs", "Scenario IDs", "Camera and device metadata", "Environment metadata", "Timestamps where appropriate", "Multi-camera synchronisation metadata", "Project manifest", "Consent and provenance documentation"];
const industries = [
  [Car, "Automotive & Mobility", "Road, cabin, driver and environment sequences."],
  [ShoppingBag, "Retail & Smart Spaces", "Appropriately designed interaction and store-environment scenarios."],
  [Warehouse, "Manufacturing & Workplace AI", "Task sequences, equipment interaction and workflow video."],
  [Smartphone, "Technology & Consumer Devices", "Gesture, camera and user-interaction scenarios."],
  [Activity, "Fitness & Activity", "Consented human movement and action sequences."],
  [Move3d, "Robotics & Physical AI", "A bridge to dedicated robotics demonstration and VLA programmes."],
] as const;
const customReasons = ["The required action sequence is unavailable", "A specific camera viewpoint is required", "Production uses a defined device or rig", "Rare scenarios or edge cases matter", "Time-of-day or environment variation is missing", "Consented participant footage is required", "The model needs a first-person perspective", "Licensing and provenance must be documented", "Generic clips lack temporal diversity"];
const pricing = ["Total video minutes or clips", "Scenario complexity", "Participant requirements", "Locations", "Camera, device or rig requirements", "Frame rate and resolution", "Multi-camera synchronisation", "Moderation and field operations", "Travel or controlled environments", "QA depth and timeline"];

const faqs = [
  { question: "What is video data collection for AI?", answer: "Video data collection records or sources video sequences for AI systems that need to understand motion, actions, objects, events and changing environments. Projects can define camera, viewpoint, scenario, duration, resolution, environment and participant requirements." },
  { question: "What types of video can eQOURSE collect?", answer: "Depending on the project, video can include human activities, gestures, object interactions, indoor and outdoor scenes, mobility scenarios, multi-camera capture and selected first-person tasks." },
  { question: "Can you collect egocentric or first-person video?", answer: "Where appropriate, approved wearable or first-person setups can capture task sequences and object interactions. Robotics demonstrations and VLA requirements should be scoped through Robotics Training Data Services." },
  { question: "Can you use specific cameras or devices?", answer: "Yes. Specifications can define phones, cameras, wearable rigs, mounts, viewpoints, resolution and frame-rate requirements where these affect the model." },
  { question: "How do you ensure video quality?", answer: "QA can include file integrity, duration, codec or container, resolution, frame rate, blur, exposure, framing, scenario compliance, duplicates and required metadata." },
  { question: "Can you collect multi-camera video?", answer: "Where operationally supported, projects can capture the same scene or activity from multiple viewpoints, with synchronisation requirements defined during scoping." },
  { question: "How is consent handled?", answer: "Participant consent, permitted use, location permissions, retention and access requirements should be defined before collection when people or private environments are involved." },
  { question: "Can you annotate collected video?", answer: "Yes. Collected clips can continue into eQOURSE's Annotation & Labeling service for frame-level, temporal, tracking, action, keypoint or other project-specific labels." },
  { question: "What formats can video be delivered in?", answer: "Common formats include MP4, MOV and other agreed containers or codecs. Resolution, frame rate, compression and metadata should follow the client's model pipeline." },
  { question: "How much does video data collection cost?", answer: "Cost depends on volume, scenarios, participants, locations, camera setup, resolution, frame rate, multi-camera requirements, moderation, QA depth and timeline." },
];

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
};

const FilmStrip = () => <div className="relative h-20 overflow-hidden rounded-2xl border-y-4 border-indigo-950 bg-indigo-950 p-2" aria-hidden="true"><div className="absolute inset-x-0 top-1 flex justify-around">{Array.from({length:18}).map((_,i)=><span key={i} className="w-3 h-2 rounded-sm bg-background/70"/>)}</div><div className="absolute inset-x-0 bottom-1 flex justify-around">{Array.from({length:18}).map((_,i)=><span key={i} className="w-3 h-2 rounded-sm bg-background/70"/>)}</div><div className="h-full flex gap-2 motion-safe:animate-pulse">{["bg-teal-400/35","bg-indigo-400/35","bg-sky-400/35","bg-amber-400/25","bg-teal-400/35"].map((color,i)=><span key={i} className={`flex-1 rounded ${color}`}/>)}</div></div>;

const VideoDataCollectionPage = () => {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: "https://www.eqourse.com/ai-data-services/data-collection" },
    { "@type": "ListItem", position: 4, name: "Video Data Collection", item: canonical },
  ] };
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Video Data Collection Services for Computer Vision & Multimodal AI", serviceType: "Video Data Collection for AI", description: "Custom video data collection for computer vision and multimodal AI across actions, objects, environments and first-person scenarios.", provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" }, areaServed: "Worldwide", url: canonical };

  return <AIDataServicesLayout breadcrumbs={[{label:"AI Data Services",href:"/ai-data-services"},{label:"Data Collection",href:"/ai-data-services/data-collection"},{label:"Video Data Collection"}]}>
    <SEOHead title="Video Data Collection Services for Computer Vision | eQOURSE" description="Custom video data collection for computer vision and multimodal AI. Capture actions, objects, environments and first-person scenarios to your specifications." canonical={canonical} keywords="video data collection services, video data collection for computer vision, AI video datasets, egocentric video data collection" ogImage="https://www.eqourse.com/assets/ai-data/video-collection/video-data-collection-hero.webp"/>
    <Helmet><script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script><script type="application/ld+json">{JSON.stringify(serviceSchema)}</script></Helmet>

    <ServiceHero tone="light" preHeadline="Video Data Collection" headline="Video Data Collection Services for" headlineAccent="Computer Vision & Multimodal AI" subtext="Capture real-world video around the actions, objects, camera perspectives, environments and temporal patterns your model must understand." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Discuss Your Video Dataset" secondaryCtaLink="/contact-us" imageSrc="/assets/ai-data/video-collection/video-data-collection-hero.webp" imageAvifSrc="/assets/ai-data/video-collection/video-data-collection-hero.avif" imageAlt="Video data collection for computer vision across actions, camera viewpoints and real-world environments" imageWidth={1448} imageHeight={1086} rotatingBadges={[{icon:Camera,title:"Multi-view capture",subtitle:"Fixed · Wearable · Mobile",color:"hsl(226 72% 54%)"},{icon:Clock3,title:"Temporal coverage",subtitle:"Sequence · Duration · Events",color:"hsl(170 82% 40%)"},{icon:ScanLine,title:"Video validation",subtitle:"Framing · Motion · Integrity",color:"hsl(28 90% 52%)"}]} bottomBadge={{iconText:"VID",title:"Dynamic real-world data",subtitle:"Actions · Objects · Environments"}} trustStats={[{value:"500+",label:"Specialists"},{value:"30+",label:"Languages"},{value:"ISO 9001",label:"Quality"},{value:"ISO 27001",label:"Security"}]}/>

    <section className="py-20 md:py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16"><SectionHeader label="The Time Dimension" title="What Is Video Data" gradientText="Collection for AI?" centered={false}/><div className="lg:pt-10"><p className="text-xl text-foreground/85 leading-relaxed">Video data collection records or sources sequences of visual data for AI systems that need to understand motion, actions, events, object behaviour and changing environments over time.</p><p className="mt-5 text-muted-foreground leading-relaxed">Time adds context that still images cannot. Collection can control camera type, viewpoint, frame rate, duration, activity, lighting, participants and scenario coverage so temporal blind spots are found before production.</p><div className="mt-8 border-l-2 border-indigo-500 pl-5"><p className="font-heading font-bold">Collection creates the raw video sequences.</p><p className="text-sm text-muted-foreground mt-1">Frame, tracking, action and temporal labels belong to <Link to="/ai-data-services/annotation-labeling/video-annotation" className="text-primary hover:underline">video annotation services</Link>.</p></div></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Dataset Types" title="Custom Video Datasets for" gradientText="Dynamic AI Systems"/><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">{datasetTypes.map(([Icon,title,text,use],i)=><Reveal key={title} className="h-full"><article className="group h-full rounded-2xl border border-border/60 bg-card p-6 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-soft transition-all"><div className="flex justify-between"><div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center"><Icon className="w-6 h-6 text-indigo-600" aria-hidden="true"/></div><span className="text-xs text-muted-foreground">0{i+1}</span></div><h3 className="font-heading text-xl font-bold mt-8">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-3">{text}</p><p className="mt-5 pt-4 border-t border-border/60 text-xs text-foreground/65"><strong className="text-indigo-700">Applications:</strong> {use}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background overflow-hidden"><div className="container mx-auto px-4"><SectionHeader label="Temporal Coverage" title="Capture the Visual and Temporal Variation" gradientText="Your Model Needs"/><Reveal className="max-w-6xl mx-auto"><FilmStrip/><div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-8 border-y border-border/70">{variables.map(([Icon,title,text],i)=><article key={title} className="p-6 border-b sm:border-r border-border/60 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(n+5)]:border-b-0"><div className="flex gap-3 items-center"><span className="text-xs font-bold text-indigo-600">0{i+1}</span><Icon className="w-5 h-5 text-indigo-600" aria-hidden="true"/></div><h3 className="font-heading font-bold mt-6">{title}</h3><p className="text-sm text-muted-foreground mt-2">{text}</p></article>)}</div></Reveal></div></section>

    <section className="py-24 bg-[linear-gradient(135deg,hsl(229_43%_17%),hsl(184_43%_13%))] relative overflow-hidden"><div className="absolute inset-0 opacity-[.04]" style={{backgroundImage:"repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 96px)"}}/><div className="container mx-auto px-4 relative"><SectionHeader light label="Capture Models" title="How We Collect" gradientText="Video Training Data"/><div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/10">{methods.map(([Icon,title,text],i)=><Reveal key={title} className="h-full"><article className="h-full bg-white/[.055] p-6"><span className="text-xs text-indigo-300">0{i+1}</span><Icon className="w-7 h-7 text-teal-300 mt-8" aria-hidden="true"/><h3 className="font-heading font-bold text-white mt-5">{title}</h3><p className="text-sm text-white/65 mt-3 leading-relaxed">{text}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Scenario to Delivery" title="Our Video Data" gradientText="Collection Process"/><Reveal className="max-w-6xl mx-auto"><div className="hidden lg:grid grid-cols-[repeat(7,1fr)] items-center mb-5">{process.map(([n])=><div key={n} className="flex items-center"><span className="w-9 h-9 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">{n}</span><span className="h-px flex-1 bg-gradient-to-r from-indigo-400 to-teal-300 last:hidden"/></div>)}</div><ol className="grid sm:grid-cols-2 lg:grid-cols-7 gap-4">{process.map(([n,title,text])=><li key={n} className="rounded-2xl border border-border/60 p-5 bg-card"><span className="lg:hidden text-xs font-bold text-indigo-600">{n}</span><h3 className="font-heading font-bold mt-3 lg:mt-0">{title}</h3><p className="text-xs text-muted-foreground mt-2 leading-relaxed">{text}</p></li>)}</ol></Reveal><p className="text-center text-sm text-muted-foreground mt-9">Next: <Link to="/ai-data-services/annotation-labeling/video-annotation" className="text-primary font-semibold hover:underline">Video Annotation Services</Link> <ArrowRight className="inline w-3 h-3"/> <Link to="/ai-data-services/cleaning-validation" className="text-primary font-semibold hover:underline">Cleaning &amp; Validation</Link> <ArrowRight className="inline w-3 h-3"/> <Link to="/ai-data-services/model-testing" className="text-primary font-semibold hover:underline">Model Testing</Link></p></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Video Validation" title="Quality Validation for" gradientText="Video Training Data"/><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">{qualityGroups.map(({icon:Icon,title,items})=><Reveal key={title} className="h-full"><article className="h-full border-t-2 border-indigo-500 bg-card p-6"><Icon className="w-6 h-6 text-indigo-600" aria-hidden="true"/><h3 className="font-heading text-lg font-bold mt-5">{title}</h3><ul className="mt-5 space-y-3">{items.map(item=><li key={item} className="flex gap-2 text-sm text-foreground/70"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true"/>{item}</li>)}</ul></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden grid lg:grid-cols-[1.15fr_.85fr] bg-[linear-gradient(135deg,hsl(229_44%_18%),hsl(184_48%_14%))]"><div className="p-8 md:p-12"><span className="text-xs uppercase tracking-[.2em] font-bold text-indigo-300">Egocentric & Physical-AI Bridge</span><h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-5">First-Person Video for Embodied and Physical AI</h2><p className="text-white/70 mt-5 leading-relaxed">Approved head-, chest- or wearable-camera setups can capture how tasks and environments look from the perspective of an acting person.</p></div><div className="p-8 md:p-12 bg-white/[.06] flex flex-col justify-center"><Glasses className="w-10 h-10 text-teal-300" aria-hidden="true"/><p className="text-sm text-white/70 mt-6">Need robot demonstrations, manipulation data, sensor fusion or VLA training datasets?</p><Link to="/robotics-training-data-services" className="inline-flex items-center gap-2 text-teal-300 font-semibold mt-5 hover:text-white">Explore Robotics Training Data Services <ArrowRight className="w-4 h-4"/></Link></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Applications" title="Video Data for Dynamic Computer Vision" gradientText="and Multimodal AI"/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">{applications.map(([Icon,title])=><Reveal key={title}><article className="group flex min-h-32 items-end gap-4 rounded-2xl border border-border/60 bg-card p-5 hover:border-indigo-500/40 transition-colors"><Icon className="w-6 h-6 text-indigo-600 group-hover:-translate-y-1 transition-transform shrink-0" aria-hidden="true"/><h3 className="font-heading font-semibold text-sm">{title}</h3></article></Reveal>)}</div><p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto mt-8">Video can later be paired with descriptions, transcripts, captions or aligned data through downstream annotation and multimodal workflows.</p></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden grid lg:grid-cols-[1.15fr_.85fr] bg-foreground"><div className="p-8 md:p-12"><span className="text-xs uppercase tracking-[.2em] font-bold text-indigo-300">Consent, Privacy & Governance</span><h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-5">Responsible Collection in Human and Real-World Environments</h2><p className="text-white/70 mt-5 leading-relaxed">Video can capture people, surroundings and events over time. Consent, location permissions, permitted use, access, retention and de-identification requirements are defined before capture begins.</p></div><div className="p-8 md:p-12 bg-white/[.06]"><ShieldCheck className="w-10 h-10 text-teal-300" aria-hidden="true"/><ul className="mt-7 grid gap-3">{["Participant consent where applicable","Location and property permissions","Collection provenance","Metadata minimisation","Secure transfer and controlled access","Downstream redaction where required","ISO 27001 and ISO 9001"].map(item=><li key={item} className="flex gap-3 text-sm text-white/80"><CheckCircle2 className="w-4 h-4 text-teal-300 mt-0.5 shrink-0" aria-hidden="true"/>{item}</li>)}</ul></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Technical Handoff" title="Video Formats, Metadata" gradientText="and Delivery"/><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.7fr_1.3fr] gap-8"><div className="rounded-3xl bg-indigo-950 text-white p-8"><Film className="w-9 h-9 text-indigo-300" aria-hidden="true"/><h3 className="font-heading text-2xl font-bold mt-7">Pipeline-specific delivery</h3><p className="text-white/65 mt-4">Container, codec, resolution, frame rate, synchronisation and metadata follow the target model pipeline.</p><p className="text-sm text-indigo-200 mt-7">Frame-level and temporal labels are scoped separately under annotation.</p></div><div className="grid sm:grid-cols-2 gap-x-8 border-y border-border/70">{deliverables.map(item=><div key={item} className="flex gap-3 py-4 border-b border-border/60 text-sm"><PackageCheck className="w-4 h-4 text-indigo-600 shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Industries" title="Video Data Collection Across" gradientText="Real-World Domains"/><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">{industries.map(([Icon,title,text])=><Reveal key={title}><article className="flex gap-5 py-6 border-b border-border/70"><div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-indigo-600" aria-hidden="true"/></div><div><h3 className="font-heading font-bold">{title}</h3><p className="text-sm text-muted-foreground mt-2">{text}</p></div></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8"><Reveal className="rounded-3xl border border-border/60 bg-card p-8"><span className="text-xs uppercase tracking-widest text-indigo-700 font-bold">Buyer Fit</span><h2 className="font-heading text-3xl font-bold mt-4">When Existing Video Libraries Do Not Match Deployment</h2><ul className="mt-7 space-y-4">{customReasons.map(item=><li key={item} className="flex gap-3 text-sm text-foreground/75"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true"/>{item}</li>)}</ul></Reveal><Reveal className="rounded-3xl bg-foreground text-background p-8"><span className="text-xs uppercase tracking-widest text-indigo-300 font-bold">Project Scoping</span><h2 className="font-heading text-3xl font-bold mt-4">What Determines Video Data Collection Cost?</h2><ol className="mt-7 grid sm:grid-cols-2 gap-3">{pricing.map((item,i)=><li key={item} className="flex gap-3 text-sm text-white/70"><span className="text-indigo-300 text-xs font-bold">{String(i+1).padStart(2,"0")}</span>{item}</li>)}</ol><Link to="/contact-us" className="inline-flex items-center gap-2 mt-8 text-indigo-300 font-semibold hover:text-white">Discuss your requirements <ArrowRight className="w-4 h-4"/></Link></Reveal></div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 items-center"><div><SectionHeader label="Why eQOURSE" title="Scenario-Designed Video Across the" gradientText="Complete Data Lifecycle" centered={false}/><p className="text-muted-foreground mt-6">Coordinate real-world capture, video QA and downstream data operations through one delivery partner.</p><Link to="/ai-data-services/data-collection" className="inline-flex items-center gap-2 mt-7 text-primary font-semibold hover:underline">Explore all AI Data Collection Services <ArrowRight className="w-4 h-4"/></Link></div><div className="grid sm:grid-cols-2 gap-x-8">{["Purpose-built scenario specifications","Remote, controlled and field models","Multi-region coordination","Collection to testing lifecycle","Clear robotics service bridge","ISO 9001 and ISO 27001","Domain specialists where required"].map(item=><div key={item} className="flex gap-3 py-4 border-b border-border/70 text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-20 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Explore Other Data Modalities" title="Continue Building Your" gradientText="Multimodal Dataset"/><div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">{[["Image Data Collection","/ai-data-services/data-collection/image-data-collection","Purpose-built imagery for computer vision."],["Audio & Speech Data Collection","/ai-data-services/data-collection/audio-data-collection","Speech across speakers, devices and environments."],["Text Data Collection","/ai-data-services/data-collection/text-data-collection","Language data for NLP, LLMs and generative AI."]].map(([title,href,text])=><Link key={title} to={href} className="group rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/40 hover:shadow-soft transition-all"><h3 className="font-heading text-lg font-bold">{title}</h3><p className="text-sm text-muted-foreground mt-3">{text}</p><ArrowRight className="w-5 h-5 text-primary mt-6 group-hover:translate-x-1 transition-transform"/></Link>)}</div></div></section>

    <RelatedBlogs />
    <FAQSection label="Video Collection FAQs" title="Frequently Asked Questions About Video Data Collection" faqs={faqs}/>
    <ServiceCTA headline="Capture the Video Scenarios Your Model Needs to Understand" subtext="Tell us the actions, environments, camera viewpoints, devices, target volume and downstream AI application." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us"/>
  </AIDataServicesLayout>;
};

export default VideoDataCollectionPage;
