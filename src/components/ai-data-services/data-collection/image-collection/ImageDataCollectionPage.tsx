import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Link } from "react-router-dom";
import {
  Aperture, ArrowRight, Boxes, BriefcaseBusiness, Building2, Camera, CheckCircle2,
  FileImage, FileScan, Focus, Gauge, Globe2, Hand, HeartPulse, Image, Layers3,
  Lightbulb, MapPin, MonitorSmartphone, PackageCheck, ScanLine, ShieldCheck,
  ShoppingBag, Smartphone, SunMedium, Users, View, Warehouse,
} from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import SectionHeader from "../../shared/SectionHeader";
import FAQSection from "../../shared/FAQSection";
import ServiceCTA from "../../shared/ServiceCTA";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const canonical = "https://www.eqourse.com/ai-data-services/data-collection/image-data-collection";

const datasetTypes = [
  { icon: Boxes, title: "Objects & Products", text: "Products, tools, equipment, packages and everyday objects captured across angles, distances, backgrounds and lighting.", use: "Detection, classification, visual search, retail AI" },
  { icon: FileScan, title: "Documents & Forms", text: "Receipts, invoices, forms, labels and packaging captured under realistic camera, background and lighting conditions.", use: "OCR, document AI, form understanding" },
  { icon: Hand, title: "Human Actions & Gestures", text: "Consented hand poses, gestures, body positions and interaction scenarios under defined participant and environment criteria.", use: "Gesture recognition, HCI, accessibility" },
  { icon: Users, title: "Human-Centred Visual Data", text: "Where appropriate, consented human imagery collected under project-specific demographic, angle, lighting and use requirements.", use: "Interaction, safety and visual perception research" },
  { icon: View, title: "Scenes & Environments", text: "Indoor, outdoor, workplace, retail, road, home and domain-specific scenes across changing visual conditions.", use: "Scene understanding, navigation, multimodal AI" },
  { icon: Smartphone, title: "Device-Specific Capture", text: "Images recorded with defined smartphones, cameras, resolutions or optics where production hardware affects behaviour.", use: "Mobile AI, camera pipelines, edge AI" },
];

const visualVariables = [
  { icon: SunMedium, title: "Lighting", text: "Daylight, low light, shadows, indoor sources and controlled light." },
  { icon: Aperture, title: "Angle & Perspective", text: "Front, side, top-down, oblique, close-range and use-case views." },
  { icon: Gauge, title: "Distance & Scale", text: "Near/far capture and object-scale variation across framing patterns." },
  { icon: Layers3, title: "Background & Occlusion", text: "Clean or cluttered scenes, partial occlusion and realistic interference." },
  { icon: MonitorSmartphone, title: "Device & Resolution", text: "Defined cameras, phones, resolutions, orientation and compression." },
  { icon: MapPin, title: "Geography & Profile", text: "Regional environments and participant criteria where representation matters." },
];

const methods = [
  [Users, "Contributor-Led Capture", "Screened contributors follow project-specific prompts using defined devices, environments and capture rules."],
  [Camera, "Controlled / On-Site Capture", "Moderated collection where camera placement, lighting, participant behaviour or security must be controlled."],
  [MapPin, "Field Collection", "Real-world capture in stores, roads, homes, workplaces or outdoor environments where natural context matters."],
  [FileImage, "Rights-Cleared Sources", "Customer-provided or appropriately rights-cleared assets incorporated under defined ownership and use conditions."],
];

const process = [
  ["01", "Use case", "Define the model task, visual classes, context and failure cases."],
  ["02", "Capture spec", "Set volume, device, resolution, angle, light and backgrounds."],
  ["03", "Setup", "Prepare contributors, locations, devices and instructions."],
  ["04", "Pilot", "Validate a representative sample before scaling."],
  ["05", "Collect", "Track capture against required scenarios and conditions."],
  ["06", "Validate", "Review integrity, blur, framing, duplicates and metadata."],
  ["07", "Deliver", "Handoff agreed files, structure and governance records."],
];

const qualityGroups = [
  { title: "Technical validity", items: ["Corrupted-file checks", "Resolution and orientation", "File-format validation", "Blur and exposure review where relevant"] },
  { title: "Capture compliance", items: ["Required object or scene", "Requested angle and distance", "Correct environment and device", "Prompt or scenario completion"] },
  { title: "Coverage & duplication", items: ["Planned category distribution", "Required visual conditions", "Duplicate / near-duplicate review", "Human QA based on project needs"] },
];

const applications = [
  [Focus, "Object Detection & Classification"], [FileScan, "OCR & Document AI"],
  [ShoppingBag, "Visual Search & Product Recognition"], [Hand, "Gesture & Human Interaction"],
  [View, "Scene Understanding"], [Warehouse, "Retail & Shelf Intelligence"],
  [MapPin, "Autonomous / Mobility Vision"], [Layers3, "Vision-Language & Multimodal Models"],
];

const industries = [
  [ShoppingBag, "Retail & E-commerce", "Product, package, shelf and environment imagery."],
  [MapPin, "Automotive & Mobility", "Road, cabin, signage and environment imagery."],
  [BriefcaseBusiness, "Document & Enterprise AI", "Forms, receipts and labels in real-world conditions."],
  [HeartPulse, "Healthcare & Life Sciences", "Approved and appropriately governed specialist workflows."],
  [MonitorSmartphone, "Technology & Devices", "Camera- and device-specific imagery for on-device AI."],
  [Building2, "Education & EdTech", "Handwriting, worksheets and education-domain documents."],
];

const deliverables = ["JPG / JPEG", "PNG", "WebP", "TIFF when required", "Folder / class structure", "Project manifest", "Capture metadata", "Device metadata", "Permitted location or timestamp metadata", "Consent / provenance documentation"];
const customReasons = ["Required classes are missing from public datasets", "Performance depends on a particular device or camera", "Target environments are under-represented", "Specific geographies or user profiles are required", "Licensing and provenance must be documented", "Production edge cases are absent from existing data"];
const pricing = ["Required image volume", "Object or scene complexity", "Participant criteria", "Geography", "Device requirements", "Lighting and environment constraints", "Capture repetition and angles", "Moderation or field operations", "QA depth", "Timeline"];

const faqs = [
  { question: "What is image data collection?", answer: "Image data collection is the process of capturing or sourcing visual data to train, fine-tune, validate or evaluate computer vision and multimodal AI systems. Projects can specify the objects, environments, devices, lighting, camera perspectives, participant profiles and metadata required." },
  { question: "What types of images can eQOURSE collect?", answer: "Projects can include objects, products, documents, scenes, gestures, human-centred images, device-specific captures and other purpose-built visual data, subject to project requirements and applicable consent or rights rules." },
  { question: "Can you collect images using specific phones or cameras?", answer: "Yes. Device-specific collection can be designed around named hardware, resolution, orientation, camera position or capture settings where those factors affect deployment behaviour." },
  { question: "How do you ensure image diversity?", answer: "The collection specification can define required variation in scene, angle, distance, lighting, geography, object condition, background and participant profile. Progress is tracked against those requirements during collection." },
  { question: "Can you collect document images for OCR?", answer: "Yes. Document collections can include receipts, invoices, labels, forms, worksheets and other document types under different camera angles, backgrounds, lighting conditions and levels of wear." },
  { question: "How is consent handled when people appear in images?", answer: "For contributor-led collections involving identifiable people, consent and intended use are defined as part of the collection workflow. Handling, retention and access requirements depend on the project and applicable legal requirements." },
  { question: "Do you also annotate collected images?", answer: "Yes. Image collection can move into eQOURSE's Annotation & Labeling service for classification, bounding boxes, polygons, segmentation, keypoints or other project-specific label types." },
  { question: "What image formats can you deliver?", answer: "Common formats include JPEG/JPG, PNG, WebP and other formats agreed during scoping. Delivery can also include manifests and capture metadata required by the project." },
  { question: "How much does image data collection cost?", answer: "Cost depends on image volume, capture complexity, participant requirements, geography, device and environment constraints, QA depth and timeline. eQOURSE provides a project-specific quote rather than a generic rate." },
];

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
};

const ImageDataCollectionPage = () => {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: "https://www.eqourse.com/ai-data-services/data-collection" },
    { "@type": "ListItem", position: 4, name: "Image Data Collection", item: canonical },
  ] };
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Image Data Collection Services for Computer Vision", serviceType: "Image Data Collection for AI", description: "Custom image data collection for computer vision and visual AI across objects, documents, scenes, devices and real-world conditions.", provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" }, areaServed: "Worldwide", url: canonical };

  return <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Data Collection", href: "/ai-data-services/data-collection" }, { label: "Image Data Collection" }]}>
    <SEOHead title="Image Data Collection Services for Computer Vision | eQOURSE" description="Custom image data collection for computer vision and visual AI. Capture objects, documents, scenes and real-world image datasets across devices and conditions." canonical={canonical} keywords="image data collection services, computer vision data collection, image datasets for AI, custom image dataset" ogImage="https://www.eqourse.com/assets/ai-data/image-collection/image-data-collection-hero.webp" />
    <Helmet><script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script><script type="application/ld+json">{JSON.stringify(serviceSchema)}</script></Helmet>

    <ServiceHero
      tone="light"
      preHeadline="Image Data Collection"
      headline="Image Data Collection Services for"
      headlineAccent="Computer Vision & Visual AI"
      subtext="Build purpose-fit image datasets around the objects, people, documents, environments, devices and visual conditions your model must understand."
      ctaText="Start Free Pilot"
      ctaLink="/free-pilot"
      secondaryCtaText="Discuss Your Image Dataset"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/image-collection/image-data-collection-hero.webp" imageAvifSrc="/assets/ai-data/image-collection/image-data-collection-hero.avif"
      imageAlt="Custom image data collection for computer vision across objects, documents, devices and real-world environments"
      imageWidth={1448}
      imageHeight={1086}
      rotatingBadges={[
        { icon: Camera, title: "Capture conditions", subtitle: "Angle, light, distance", color: "hsl(170 82% 40%)" },
        { icon: Smartphone, title: "Device-specific", subtitle: "Cameras & smartphones", color: "hsl(190 75% 42%)" },
        { icon: ScanLine, title: "Quality checks", subtitle: "Integrity & compliance", color: "hsl(28 90% 52%)" },
      ]}
      bottomBadge={{ iconText: "CV", title: "Purpose-built imagery", subtitle: "Objects · Documents · Scenes" }}
      trustStats={[{ value: "500+", label: "Specialists" }, { value: "30+", label: "Languages" }, { value: "ISO 9001", label: "Quality" }, { value: "ISO 27001", label: "Security" }]}
    />

    <section className="py-20 md:py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16"><SectionHeader label="The Foundation" title="What Is Image Data" gradientText="Collection for AI?" centered={false} /><div className="lg:pt-10"><p className="text-xl text-foreground/85 leading-relaxed">Image data collection is the process of capturing or sourcing visual data specifically for training, fine-tuning, validating or evaluating computer vision and multimodal AI systems.</p><p className="mt-5 text-muted-foreground leading-relaxed">A programme can control object type, participant profile, device, angle, distance, lighting, background, geography and environment so the dataset reflects real deployment conditions—not just ideal library imagery.</p><div className="mt-8 border-l-2 border-primary pl-5"><p className="font-heading font-bold">Collection creates the raw visual dataset.</p><p className="text-sm text-muted-foreground mt-1">Labels and structured metadata belong to the downstream <Link className="text-primary hover:underline" to="/ai-data-services/annotation-labeling">Annotation &amp; Labeling service</Link>.</p></div></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Dataset Types" title="Custom Image Datasets Built Around Your" gradientText="Computer Vision Use Case" subtitle="Each collection specification starts with the model task and the visual variation it needs to recognise." /><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">{datasetTypes.map(({icon:Icon,...item},i)=><Reveal key={item.title} className="h-full"><article className="group h-full rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/35 hover:shadow-soft transition-all"><div className="flex justify-between items-start"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Icon className="w-6 h-6 text-primary" aria-hidden="true" /></div><span className="text-xs text-muted-foreground">0{i+1}</span></div><h3 className="font-heading text-xl font-bold mt-8">{item.title}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-3">{item.text}</p><p className="mt-5 pt-4 border-t border-border/60 text-xs text-foreground/65"><strong className="text-primary">Applications:</strong> {item.use}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background overflow-hidden"><div className="container mx-auto px-4"><SectionHeader label="Real-World Variation" title="Collect Images Under the Conditions Your" gradientText="Model Will Actually See" /><Reveal className="max-w-6xl mx-auto"><div className="relative grid md:grid-cols-2 lg:grid-cols-3 border-y border-border/70">{visualVariables.map(({icon:Icon,...item},i)=><article key={item.title} className="p-6 md:p-8 border-b md:border-r border-border/60 last:border-b-0 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0"><div className="flex items-center gap-3"><span className="text-xs font-semibold text-primary">0{i+1}</span><Icon className="w-5 h-5 text-primary" aria-hidden="true" /></div><h3 className="font-heading font-bold mt-8">{item.title}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-2">{item.text}</p></article>)}</div></Reveal></div></section>

    <section className="py-24 bg-gradient-hero relative overflow-hidden"><div className="absolute inset-0 opacity-[.035]" style={{backgroundImage:"radial-gradient(circle,hsl(170 82% 50%) 1px,transparent 1px)",backgroundSize:"28px 28px"}}/><div className="container mx-auto px-4 relative"><SectionHeader light label="Capture Models" title="How We Collect" gradientText="Image Training Data" subtitle="The method follows the deployment context, rights requirements and level of environmental control." /><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">{methods.map(([Icon,title,text],i)=><Reveal key={String(title)} className="h-full"><article className="glass-dark h-full rounded-2xl p-6"><span className="text-xs text-primary">0{i+1}</span>{typeof Icon!=="string"&&<Icon className="w-7 h-7 text-primary mt-9" aria-hidden="true"/>}<h3 className="font-heading font-bold text-white mt-5">{String(title)}</h3><p className="text-sm text-white/65 leading-relaxed mt-3">{String(text)}</p></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader label="From Brief to Handoff" title="Our Image Data" gradientText="Collection Process" />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
          {process.map(([n,t,d],i)=>
          <Reveal key={n} className="h-full">
            <li className="h-full rounded-2xl border border-border/60 bg-card p-5 relative overflow-hidden group">
              <span className="text-sm font-bold text-primary">{n}</span>
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full group-hover:w-20 group-hover:h-20 transition-all"/>
              <h3 className="font-heading font-bold mt-8">{t}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground mt-2">{d}</p>
            </li>
          </Reveal>)}
        </ol>
      <p className="mt-9 text-center text-sm text-muted-foreground">Next stage: <Link className="text-primary font-semibold hover:underline" to="/ai-data-services/annotation-labeling">Continue into Image Annotation &amp; Labeling <ArrowRight className="inline w-4 h-4"/></Link></p></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Dataset Validation" title="Image Quality Checks Before" gradientText="Dataset Delivery" /><div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">{qualityGroups.map((group,i)=><Reveal key={group.title} className="h-full"><article className="h-full rounded-2xl border border-border/60 bg-card p-7"><div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center"><PackageCheck className="w-5 h-5 text-primary" aria-hidden="true"/></div><h3 className="font-heading text-xl font-bold mt-6">{group.title}</h3><ul className="mt-5 space-y-3">{group.items.map(item=><li key={item} className="flex gap-3 text-sm text-foreground/75"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true"/>{item}</li>)}</ul></article></Reveal>)}</div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto rounded-3xl bg-[linear-gradient(135deg,hsl(174_52%_18%),hsl(183_43%_12%))] p-7 md:p-12 overflow-hidden relative"><div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border border-primary/20"/><div className="relative grid lg:grid-cols-[1fr_.9fr] gap-10"><div><span className="text-xs font-semibold uppercase tracking-wider text-accent">Visual Data Governance</span><h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4">Consent and Provenance for Human-Centred Image Data</h2><p className="text-white/70 leading-relaxed mt-5">When images contain identifiable people, consent and permitted use should be defined before collection. Workflows can support project-specific metadata, retention, access, de-identification or redaction requirements where applicable.</p></div><ul className="grid sm:grid-cols-2 gap-3 self-center">{["Contributor consent where applicable","Project-specific permitted use","Provenance and collection metadata","Role-based access controls","Secure transfer","ISO 9001 & ISO 27001 processes"].map(item=><li key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex gap-3 text-sm text-white/75"><ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true"/>{item}</li>)}</ul></div></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Applications" title="Image Data for Computer Vision and" gradientText="Multimodal AI" subtitle="Image collections can later be paired with captions, text descriptions or task-specific metadata through downstream eQOURSE data services." /><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border max-w-6xl mx-auto border border-border">{applications.map(([Icon,title])=><article key={String(title)} className="bg-card p-6 flex gap-4 items-start hover:bg-primary/[.04] transition-colors">{typeof Icon!=="string"&&<Icon className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true"/>}<h3 className="font-heading text-sm font-bold">{String(title)}</h3></article>)}</div></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Industry Context" title="Image Collection Across" gradientText="Real-World Domains" /><div className="max-w-6xl mx-auto grid md:grid-cols-2 border-t border-border/70">{industries.map(([Icon,title,text])=><article key={String(title)} className="py-7 md:px-6 border-b border-border/70 flex gap-5">{typeof Icon!=="string"&&<Icon className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true"/>}<div><h3 className="font-heading font-bold">{String(title)}</h3><p className="text-sm text-muted-foreground mt-2">{String(text)}</p></div></article>)}</div></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-[.85fr_1.15fr] gap-10 items-center"><div><SectionHeader label="Delivery" title="Image Dataset Formats and" gradientText="Handoff" centered={false}/><p className="text-muted-foreground leading-relaxed -mt-8">Typical deliverables are agreed during scoping. Annotation labels remain a separate downstream deliverable unless annotation is included.</p></div><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{deliverables.map(item=><div key={item} className="rounded-xl border border-border/60 bg-card px-4 py-3 flex gap-2 text-sm text-foreground/75"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true"/>{item}</div>)}</div></Reveal></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><Reveal className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12"><div><span className="text-xs font-semibold uppercase tracking-wider text-primary">Buyer Fit</span><h2 className="font-heading text-3xl md:text-4xl font-bold mt-4">When Do You Need Custom Image Data Collection?</h2><p className="text-muted-foreground leading-relaxed mt-5">Custom capture is useful when generic libraries cannot represent the deployment conditions, rights requirements or edge cases your model depends on.</p><Link to="/contact-us" className="inline-flex items-center gap-2 mt-7 font-semibold text-primary hover:underline">Discuss Your Image Dataset Requirements <ArrowRight className="w-4 h-4"/></Link></div><ul className="space-y-3">{customReasons.map(item=><li key={item} className="rounded-xl border border-border/60 bg-muted/30 p-4 flex gap-3 text-sm text-foreground/75"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true"/>{item}</li>)}</ul></Reveal></div></section>

    <section className="py-24 bg-muted/30"><div className="container mx-auto px-4"><SectionHeader label="Project Scoping" title="What Determines Image Data" gradientText="Collection Cost?" subtitle="Pricing follows the capture specification; eQOURSE provides a project-specific quote rather than fabricated per-image rates."/><ol className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-border/70">{pricing.map((item,i)=><li key={item} className="min-h-32 border-r border-b border-border/70 bg-card p-5"><span className="text-xs font-bold text-primary">{String(i+1).padStart(2,"0")}</span><p className="font-heading font-semibold text-sm mt-7">{item}</p></li>)}</ol></div></section>

    <section className="py-24 bg-background"><div className="container mx-auto px-4"><SectionHeader label="Why eQOURSE" title="Why Choose eQOURSE for" gradientText="Image Data Collection?"/><div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">{[[Focus,"Custom capture specifications"],[Globe2,"Multilingual and multi-region coordination"],[Users,"Domain-specialist workforce where required"],[Layers3,"Collection to annotation, validation and testing"],[ShieldCheck,"ISO 9001 and ISO 27001 processes"],[Camera,"Contributor, controlled and field capture"]].map(([Icon,title])=><article key={String(title)} className="border-t-2 border-primary pt-6">{typeof Icon!=="string"&&<Icon className="w-6 h-6 text-primary mb-8" aria-hidden="true"/>}<h3 className="font-heading font-bold">{String(title)}</h3></article>)}</div><div className="mt-12 text-center"><Link className="text-primary font-semibold hover:underline" to="/ai-data-services/data-collection">Explore all AI Data Collection Services</Link></div></div></section>


    <RelatedBlogs />
    <FAQSection faqs={faqs} label="Image Data Collection FAQs" title="Frequently Asked Questions About Image Data Collection" />

    <section className="py-14 bg-muted/30 border-y border-border/60"><div className="container mx-auto px-4"><div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"><div><p className="text-xs uppercase tracking-wider font-semibold text-primary">Related AI Data Services</p><h2 className="font-heading text-2xl font-bold mt-2">Continue from collection to model readiness</h2></div><div className="flex flex-wrap gap-3 justify-center">{[["Annotation & Labeling","/ai-data-services/annotation-labeling"],["Cleaning & Validation","/ai-data-services/cleaning-validation"],["Model Testing","/ai-data-services/model-testing"],["Robotics Training Data","/robotics-training-data-services"]].map(([label,to])=><Link key={to} to={to} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors">{label}</Link>)}</div></div></div></section>

    <ServiceCTA headline="Build the Image Dataset Your Model Actually Needs" subtext="Tell us the target objects or scenarios, required image volume, devices, environments, geographies and downstream model use case." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" note="Pilot setup in 48 hours" />
  </AIDataServicesLayout>;
};

export default ImageDataCollectionPage;
