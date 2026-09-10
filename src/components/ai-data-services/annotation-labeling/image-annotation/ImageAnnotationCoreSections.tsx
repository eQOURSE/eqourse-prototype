import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeCheck, Boxes, CheckCircle2, CircleDollarSign, Factory, FileJson2,
  Focus, Gauge, Hand, HeartPulse, Images, Layers3, Leaf, LockKeyhole, MapPinned,
  MousePointer2, ScanLine, ShieldCheck, ShoppingBag, Sparkles, Target, Tractor,
} from "lucide-react";
import SectionHeader from "../../shared/SectionHeader";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
};

const types = [
  [Focus, "Bounding Box Annotation", "Fast rectangular localization for object detection and counting where approximate position is sufficient.", "Detection · retail shelves · vehicles · PPE"],
  [Boxes, "Rotated & Oriented Boxes", "Tighter boxes that preserve an object's angle, useful when elongated objects overlap or direction matters.", "Aerial imagery · text regions · industrial parts"],
  [MousePointer2, "Polygon & Polyline", "Vertex-level outlines for irregular objects, open contours, boundaries, lanes and linear features.", "Shape analysis · roads · boundaries · defects"],
  [Layers3, "Semantic Segmentation", "Every pixel receives a class so models learn exact regions such as road, sky, crop or defect.", "Scene understanding · drivable space · land cover"],
  [ScanLine, "Instance Segmentation", "Pixel-accurate masks keep individual objects separate, even where objects of the same class touch.", "Counting · grasping · overlapping products"],
  [Images, "Panoptic Segmentation", "A unified scene map combining countable object instances with background semantic regions.", "Complete scene understanding · robotics · ADAS"],
  [Hand, "Keypoint & Landmark", "Consistent points mark joints, facial landmarks, object corners and pose-defining structures.", "Pose · gesture · ergonomics · object orientation"],
  [Target, "Classification & Multi-label", "Whole-image or region-level categories with multiple labels where one visual can belong to several classes.", "Catalogue tagging · scene classification · moderation"],
  [FileJson2, "Attribute & Metadata", "Enrich labels with colour, state, visibility, occlusion, truncation, confidence and custom attributes.", "Fine-grained recognition · filtering · analytics"],
  [MapPinned, "Text Region Labeling in Images", "Locate text regions inside natural images for detection pipelines without crossing into full-document OCR.", "Signage · packaging · storefronts · scene text"],
] as const;

const comparison = [
  ["Image classification", "Whole image", "Lowest", "Fastest", "You only need to know what is present"],
  ["Bounding box", "Approximate location", "Low", "Fast", "Detection and counting; shape does not matter"],
  ["Rotated box", "Location + angle", "Low–medium", "Fast", "Objects are angled, dense or elongated"],
  ["Polyline", "Open contour", "Medium", "Medium", "Lines, edges and lane markings"],
  ["Polygon", "Tight outline", "Medium", "Medium", "Shape matters, but pixel precision does not"],
  ["Semantic segmentation", "Pixel by class", "High", "Slow", "Exact area matters, not individual counts"],
  ["Instance segmentation", "Pixel by object", "Highest", "Slowest", "Exact shape and separate objects are required"],
  ["Panoptic segmentation", "Full scene", "Highest", "Slowest", "Objects and background regions need one scene map"],
  ["Keypoints", "Landmark points", "Medium", "Medium", "Structure, articulation or orientation matters"],
] as const;

const process = [
  ["01", "Sample review", "Review representative images, model objective and task fit."],
  ["02", "Guideline authoring", "Define classes, geometry, thresholds and edge-case rulings."],
  ["03", "Calibration", "Annotators qualify against expert-labeled ground truth."],
  ["04", "Pilot batch", "Confirm schema, quality threshold and guideline decisions."],
  ["05", "Production", "Scale throughput with versioned instructions and tracking."],
  ["06", "Multi-tier QA", "Validate geometry, review labels and adjudicate exceptions."],
  ["07", "Delivery & iteration", "Ship data, QA report and controlled correction rounds."],
] as const;

const edgeCases = [
  ["Occlusion", "When is a partly hidden object still labeled, and when does an occlusion attribute apply?"],
  ["Truncation", "Should geometry stop at the image boundary or estimate the object's true extent?"],
  ["Crowds & dense scenes", "Individual instances, crowd regions and count thresholds need explicit rules."],
  ["Small objects", "Minimum pixel size must reflect the model's actual input resolution."],
  ["Ambiguous classes", "Written examples settle car vs truck and other taxonomy boundaries."],
  ["Reflections & screens", "Define whether mirrored, printed and on-screen objects are valid instances."],
  ["Blur & exposure", "Decide whether to label, flag low confidence or exclude poor imagery."],
  ["Overlapping instances", "Boundary rules keep masks consistent where adjacent objects touch."],
] as const;

export const ImageAnnotationDefinition = () => (
  <section className="bg-background py-20 md:py-24">
    <div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
      <SectionHeader label="The Visual Ground Truth" title="What Is Image" gradientText="Annotation?" centered={false} />
      <div className="space-y-5 text-base leading-8 text-muted-foreground">
        <p>Image annotation adds machine-readable labels to still images so a computer vision model can learn what it is looking at. The output may be a box around every vehicle, the exact outline of a product, joint positions on a person, a class for every pixel, or tags describing the entire image.</p>
        <p>The annotation type determines what the model can learn. Boxes teach approximate location; segmentation masks teach exact shape; keypoints teach structure and orientation. Choosing correctly before production avoids the expensive mistake of re-annotating a finished dataset.</p>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          <div className="bg-card p-5"><h3 className="font-heading font-bold text-foreground">Annotation vs labeling</h3><p className="mt-2 text-sm leading-6">The terms overlap. Labeling often means a whole-image class, while annotation includes spatial boxes, polygons, masks and keypoints. We deliver both.</p></div>
          <div className="bg-card p-5"><h3 className="font-heading font-bold text-foreground">Annotation vs collection</h3><p className="mt-2 text-sm leading-6">Collection captures the images; annotation structures images you already have. Need new imagery? <Link to="/ai-data-services/data-collection/image-data-collection" className="font-semibold text-primary hover:underline">Explore image data collection</Link>.</p></div>
        </div>
      </div>
    </Reveal></div>
  </section>
);

export const ImageAnnotationTypes = () => (
  <section className="relative overflow-hidden bg-[#f4f8f7] py-20 md:py-24" id="image-annotation-types">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    <div className="container mx-auto px-4">
      <SectionHeader label="Annotation Types" title="Choose the Signal Your" gradientText="Model Actually Needs" subtitle="From fast whole-image labels to pixel-accurate scene maps, every method answers a different model question." />
      <Reveal className="mx-auto mt-12 grid max-w-7xl overflow-hidden rounded-[2rem] border border-[#d9e5e2] bg-white shadow-[0_24px_80px_rgba(15,35,45,.10)] lg:grid-cols-[1.35fr_.65fr]">
        <picture className="min-h-full"><source srcSet="/assets/ai-data/annotation-labeling/image-annotation/image-annotation-types-grid.avif" type="image/avif"/><img src="/assets/ai-data/annotation-labeling/image-annotation/image-annotation-types-grid.webp" alt="Same street scene shown with bounding boxes, rotated boxes, polygons, semantic masks, instance masks and keypoints" width="1200" height="800" loading="lazy" decoding="async" className="h-full min-h-[420px] w-full object-cover"/></picture>
{/* 
   <video
  width={1200}
  height={800}
  autoPlay
  muted
  loop
  playsInline
  className="h-full min-h-[420px] w-full object-cover"
>
  <source
    src="/assets/ai-data/annotation-labeling/image-annotation/Computer_vision_video_demonstration_202609041304.mp4"
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video> */}

        <div className="flex flex-col justify-between bg-[#142238] p-7 text-white md:p-10"><div><span className="font-mono text-xs font-bold uppercase tracking-[.16em] text-[#59e8c9]">One scene · six label geometries</span><h3 className="mt-5 font-heading text-3xl font-bold leading-tight">Match annotation precision to the model decision.</h3><p className="mt-4 text-sm leading-7 text-white/75">Use lightweight labels when location is enough and pixel geometry only when the task truly needs it.</p></div><div className="mt-8 grid grid-cols-2 gap-3">{["Boxes","Rotated boxes","Polygons","Semantic masks","Instances","Keypoints"].map((x,i)=><div key={x} className="border-t border-white/15 pt-3 text-xs font-semibold"><span className="mr-2 font-mono text-[#59e8c9]">0{i+1}</span>{x}</div>)}</div></div>
      </Reveal>
      <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-5">
        {types.map(([Icon,title,text,best],i)=><article key={title} className="group relative rounded-2xl border border-[#d9e5e2] bg-white p-6 shadow-[0_12px_35px_rgba(15,35,45,.055)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_45px_rgba(15,35,45,.10)]"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f8f3] text-[#087e68]"><Icon className="h-5 w-5 transition-transform group-hover:scale-110"/></span><span className="font-mono text-xs font-bold text-[#087e68]">{String(i+1).padStart(2,"0")}</span></div><h3 className="mt-6 font-heading text-lg font-bold text-[#142238]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#596679]">{text}</p><p className="mt-5 border-t border-[#e2ebe8] pt-4 text-[10px] font-bold uppercase leading-4 tracking-[.08em] text-[#087e68]">Best for: {best}</p></article>)}
      </div>
      <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-6 text-[#667386]">Full-document OCR and structured forms belong to our dedicated Document & OCR Annotation service page, which is being prepared separately.</p>
    </div>
  </section>
);

export const AnnotationComparison = () => (
  <section className="bg-background py-20 md:py-24">
    <div className="container mx-auto px-4"><SectionHeader label="Decision Guide" title="Which Image Annotation Type" gradientText="Do You Need?" subtitle="More precision is not automatically better. Choose the least expensive label that preserves the signal your model must learn." />
      <Reveal className="mx-auto mt-12 max-w-7xl overflow-hidden rounded-[2rem] border border-border shadow-soft">
        <table className="hidden w-full border-collapse text-left md:table"><thead className="bg-foreground text-white"><tr>{["Type","Precision","Relative cost","Typical speed","Use when"].map(h=><th key={h} className="px-5 py-4 text-xs uppercase tracking-[.1em]">{h}</th>)}</tr></thead><tbody>{comparison.map((row,i)=><tr key={row[0]} className={i%2?"bg-muted/35":"bg-card"}>{row.map((cell,j)=><td key={`${j}-${cell}`} className={`border-t border-border px-5 py-4 text-sm ${j===0?"font-bold text-foreground":"text-muted-foreground"}`}>{cell}</td>)}</tr>)}</tbody></table>
        <div className="divide-y divide-border md:hidden">{comparison.map(([type,precision,cost,speed,use])=><article key={type} className="bg-card p-5"><h3 className="font-heading font-bold text-foreground">{type}</h3><dl className="mt-4 grid grid-cols-3 gap-3 text-xs"><div><dt className="text-muted-foreground">Precision</dt><dd className="mt-1 font-semibold">{precision}</dd></div><div><dt className="text-muted-foreground">Cost</dt><dd className="mt-1 font-semibold">{cost}</dd></div><div><dt className="text-muted-foreground">Speed</dt><dd className="mt-1 font-semibold">{speed}</dd></div></dl><p className="mt-4 text-sm leading-6 text-muted-foreground">{use}</p></article>)}</div>
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2"><article className="bg-card p-7"><h3 className="font-heading text-xl font-bold">Bounding box or polygon?</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Use boxes for fast detection and counting. Use polygons when shape, overlap or background separation materially affects the model.</p></article><article className="bg-card p-7"><h3 className="font-heading text-xl font-bold">Semantic or instance segmentation?</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Semantic masks map area by class. Instance masks preserve each object separately, enabling object counts and overlap-aware analysis.</p></article></div>
    </div>
  </section>
);

export const ImageAnnotationProcess = () => (
  <section className="bg-muted/30 py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Controlled Production" title="Our Image Annotation" gradientText="Process" subtitle="The pilot is a quality gate, not a sales demo. It turns uncertainty into a documented production standard."/>
    <Reveal className="relative mx-auto mt-14 max-w-7xl"><svg viewBox="0 0 1200 90" className="absolute left-0 top-7 hidden w-full text-primary/30 lg:block" aria-hidden="true"><path d="M40 22 H1120 Q1180 22 1180 68 H555 Q520 68 520 45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 9" className="animate-pulse"/><path d="m514 51 6-7 7 6" fill="none" stroke="currentColor" strokeWidth="2"/></svg><ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-7">{process.map(([n,title,text],i)=><li key={title} className="group rounded-2xl border border-border bg-card p-5 shadow-soft"><span className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-primary/10 font-mono text-xs font-bold text-primary">{n}</span><h3 className="mt-5 font-heading font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>{i===6&&<span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">Iterate to pilot <ArrowRight className="h-3 w-3"/></span>}</li>)}</ol></Reveal>
  </div></section>
);

export const ImageQualityAndEdges = () => {
  const quality = ["IoU-scored qualification & monitoring","Hidden gold-standard sets","Inter-annotator agreement","Consensus and senior adjudication","Dedicated second-pass review","Automated geometry & schema validation","Class-balance reporting","Pilot-defined acceptance criteria"];
  return <>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center"><div><span className="text-xs font-bold uppercase tracking-[.18em] text-primary">Measured Quality</span><h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">Accuracy You Can <span className="text-gradient">Inspect and Reproduce</span></h2><p className="mt-5 leading-7 text-muted-foreground">Quality is measured against expert ground truth and acceptance thresholds agreed during the pilot. Every delivery includes the evidence behind the claim.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{quality.map(x=><div key={x} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary"/><span>{x}</span></div>)}</div></div><picture className="overflow-hidden rounded-[2rem] border border-border shadow-elevated"><source srcSet="/assets/ai-data/annotation-labeling/image-annotation/image-annotation-quality-review.avif" type="image/avif"/><img src="/assets/ai-data/annotation-labeling/image-annotation/image-annotation-quality-review.webp" alt="Senior reviewer comparing image annotations against expert ground truth during quality assurance" width="1000" height="600" loading="lazy" decoding="async" className="aspect-[5/3] w-full object-cover"/></picture></Reveal></div></section>
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#142238,#20304a)] py-20 text-white md:py-24"><div className="absolute inset-0 opacity-35" style={{backgroundImage:"radial-gradient(circle at 15% 20%, hsl(170 82% 55% / .32), transparent 24%), radial-gradient(circle at 88% 78%, hsl(35 92% 58% / .18), transparent 20%)"}}/><div className="container relative mx-auto px-4"><SectionHeader label="Edge-case Protocol" title="Occlusion, Truncation and the Cases" gradientText="That Break Datasets" subtitle="Clean examples are easy. Production quality is determined by whether every difficult case receives one documented, repeatable ruling." dark/><div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">{edgeCases.map(([title,text],i)=><article key={title} className="group rounded-2xl border border-white/15 bg-white/[.075] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#59e8c9]/45 hover:bg-white/[.11]"><div className="flex items-center justify-between"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#35dfbb]/15 font-mono text-xs font-bold text-[#59e8c9]">0{i+1}</span><span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,.8)]"/></div><h3 className="mt-7 font-heading text-lg font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/75">{text}</p></article>)}</div></div></section>
  </>;
};

export const DeliveryIndustriesAndCommercial = () => {
  const formats=["COCO JSON","YOLO TXT","Pascal VOC XML","CVAT XML","PNG masks","RLE masks","JSON / JSONL","CSV","TFRecord","Parquet","Custom schema"];
  const industries=[[Tractor,"Automotive & ADAS","Vehicles, pedestrians, signs, lanes and drivable space"],[ShoppingBag,"Retail & E-commerce","Products, shelves, planograms and catalogue attributes"],[Factory,"Manufacturing","Defects, components and assembly verification"],[Leaf,"Agriculture","Crops, weeds, disease, drone and satellite imagery"],[HeartPulse,"Healthcare","Regions, cells and landmarks with qualified reviewers"],[ShieldCheck,"Construction & Safety","PPE, equipment and site hazards"],[LockKeyhole,"Security","People, vehicles, zones and left-behind objects"],[Hand,"Robotics","Grasp points, pose, workspace and navigable space"]] as const;
  const costs=["Annotation type","Objects per image","Class and taxonomy complexity","Precision / IoU target","Scene density and image quality","QA tier","Volume and duration","Domain expertise","Turnaround and security"];
  return <>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Interoperable Delivery" title="Tools, Platforms and" gradientText="Output Formats" subtitle="Work can run in your platform or ours. The final package is designed to remain usable after the annotation project ends."/><div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_.8fr]"><Reveal className="rounded-[2rem] border border-border bg-card p-7 md:p-9"><div className="flex flex-wrap gap-2">{formats.map(x=><span key={x} className="rounded-full border border-primary/15 bg-primary/[.06] px-4 py-2 text-sm font-semibold text-foreground">{x}</span>)}</div><div className="mt-8 border-t border-border pt-7"><h3 className="font-heading text-xl font-bold">Every delivery includes</h3><p className="mt-3 leading-7 text-muted-foreground">A manifest, per-batch QA report, class distribution summary and versioned annotation guideline—so your team can reproduce or extend the work later.</p></div></Reveal><Reveal className="rounded-[2rem] bg-foreground p-7 text-white md:p-9"><Sparkles className="h-7 w-7 text-primary"/><h3 className="mt-7 font-heading text-2xl font-bold">Model-assisted pre-labeling</h3><p className="mt-4 text-sm leading-7 text-white/65">Where a usable detector already exists, annotators can correct pre-labels instead of drawing from scratch. Every suggestion still receives human review and is measured against the same ground truth as manual work.</p><p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">Best for mature, high-volume detection and classification</p></Reveal></div></div></section>
    <section className="bg-muted/30 py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Applied Computer Vision" title="Image Annotation" gradientText="Across Industries"/><div className="mx-auto mt-12 grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{industries.map(([Icon,title,text])=><article key={title} className="bg-card p-6"><Icon className="h-6 w-6 text-primary"/><h3 className="mt-6 font-heading font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>{title==="Robotics"&&<Link to="/robotics-training-data-services" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary">Explore robotics data <ArrowRight className="h-3 w-3"/></Link>}</article>)}</div></div></section>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2"><Reveal className="rounded-[2rem] border border-border p-8"><span className="text-xs font-bold uppercase tracking-[.16em] text-primary">Engagement models</span><h2 className="mt-4 font-heading text-3xl font-bold">A Team Shape That Fits the Programme</h2><div className="mt-8 space-y-5">{[["Managed project","We run guidelines, staffing, QA and delivery."],["Dedicated team","A named team retains programme knowledge across batches."],["Overflow support","Absorb volume spikes without disturbing your core team."],["QA & re-labeling","Audit, quantify and correct an existing labeled dataset."]].map(([a,b])=><div key={a} className="border-t border-border pt-5"><h3 className="font-bold">{a}</h3><p className="mt-1 text-sm text-muted-foreground">{b}</p></div>)}</div></Reveal><Reveal className="rounded-[2rem] bg-foreground p-8 text-white"><CircleDollarSign className="h-7 w-7 text-primary"/><h2 className="mt-5 font-heading text-3xl font-bold">What Determines Image Annotation Cost?</h2><p className="mt-4 text-sm leading-7 text-white/60">Pricing is normally per image or object. The same photograph can cost very differently depending on what must be identified and how quality is proven.</p><div className="mt-7 grid grid-cols-2 gap-3">{costs.map(x=><div key={x} className="rounded-xl border border-white/10 px-3 py-3 text-xs text-white/75">{x}</div>)}</div></Reveal></div></div></section>
  </>;
};

export const SecurityRelatedWhy = () => {
  const reasons=["Guideline-first delivery with documented edge-case rulings","IoU, gold sets and agreement metrics—not unmeasured claims","The right annotation type, not automatically the most expensive","Collection, annotation, cleaning and testing under one contract","500+ specialists supporting global delivery","ISO 9001 and ISO 27001 certified processes"];
  return <>
    <section className="bg-foreground py-20 text-white md:py-24"><div className="container mx-auto px-4"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><span className="text-xs font-bold uppercase tracking-[.16em] text-primary">Security & compliance</span><h2 className="mt-4 font-heading text-4xl font-bold">Your Images Stay Inside a Controlled Workflow</h2><p className="mt-5 leading-7 text-white/60">ISO-aligned processes support NDAs, role-based access, audit trails, secure delivery, client-controlled environments, PII redaction and contract-defined retention and deletion.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">{["ISO 9001 & 27001","Named access & NDAs","Annotation-review audit trail","Client VPN / on-premise options","Face & PII redaction","Contractual deletion"].map(x=><div key={x} className="flex items-center gap-3 bg-foreground p-5 text-sm"><BadgeCheck className="h-4 w-4 text-primary"/>{x}</div>)}</div></div></div></section>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Connected Services" title="Continue Through the" gradientText="AI Data Pipeline"/><div className="mx-auto mt-12 grid max-w-6xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{[["Video Annotation","/ai-data-services/annotation-labeling/video-annotation"],["3D Point Cloud & LiDAR","/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation"],["3D Spatial Annotation for Manipulation","/robotics-training-data-services/3d-spatial-annotation"],["Document & OCR Annotation","/ai-data-services/annotation-labeling/document-ocr-annotation"],["Image Data Collection","/ai-data-services/data-collection/image-data-collection"],["Data Cleaning & Validation","/ai-data-services/cleaning-validation"],["Computer Vision Model Testing","/ai-data-services/model-testing/computer-vision-model-testing"],["All Annotation Services","/ai-data-services/annotation-labeling"],["Computer Vision Samples","/ai-data-samples/computer-vision"]].map(([label,href])=><Link key={label} to={href} className="group flex items-center justify-between bg-card p-6 font-heading font-bold hover:bg-primary/[.05]">{label}<ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1"/></Link>)}</div><p className="mx-auto mt-7 max-w-4xl text-center text-sm leading-6 text-muted-foreground">Producing labelled imagery to train a model is this page. Measuring how a trained model performs on real deployment conditions is <Link to="/ai-data-services/model-testing/computer-vision-model-testing" className="font-semibold text-primary hover:underline">computer vision model testing</Link>. When the target is robot interaction rather than visual perception, use <Link to="/robotics-training-data-services/3d-spatial-annotation" className="font-semibold text-primary hover:underline">3D spatial annotation for manipulation</Link>.</p></div></section>
    <section className="bg-muted/30 py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Why eQOURSE" title="Built for Production" gradientText="Visual AI"/><div className="mx-auto mt-12 grid max-w-6xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-2">{reasons.map((x,i)=><div key={x} className="flex gap-4 bg-card p-6"><span className="font-mono text-xs text-primary">0{i+1}</span><p className="font-semibold leading-6">{x}</p></div>)}</div><div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-3">{[[Gauge,"Computer vision samples","/ai-data-samples/computer-vision"],[FileJson2,"Case studies","/casestudy"],[BadgeCheck,"Client testimonials","/clients-testimonials"]].map(([Icon,label,href])=><Link key={String(label)} to={String(href)} className="group rounded-2xl border border-border bg-card p-6 shadow-soft"><Icon className="h-5 w-5 text-primary"/><div className="mt-5 flex items-center justify-between font-heading font-bold">{String(label)}<ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1"/></div></Link>)}</div></div></section>
  </>;
};
