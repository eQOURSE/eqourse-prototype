import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Boxes, Layers3, ScanLine } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import FAQSection from "../../shared/FAQSection";
import ServiceCTA from "../../shared/ServiceCTA";
import { AnnotationComparison, DeliveryIndustriesAndCommercial, ImageAnnotationDefinition, ImageAnnotationProcess, ImageAnnotationTypes, ImageQualityAndEdges, SecurityRelatedWhy } from "./ImageAnnotationCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/annotation-labeling/image-annotation";
const faqs = [
  ["What is image annotation?","Image annotation adds machine-readable labels—boxes, outlines, masks, keypoints or class tags—to still images so computer vision models can learn to recognise objects, shapes and scenes."],
  ["What types of image annotation does eQOURSE provide?","Bounding and rotated boxes, polygons and polylines, semantic, instance and panoptic segmentation, keypoints and landmarks, image classification, multi-label tagging, attributes and text-region labeling in natural images."],
  ["What is the difference between bounding box and polygon annotation?","A bounding box marks approximate object location and is fast and cost-efficient. A polygon traces the actual outline and is more precise. Use boxes when location is enough and polygons when shape matters."],
  ["What is the difference between semantic and instance segmentation?","Semantic segmentation assigns each pixel to a class without separating same-class objects. Instance segmentation gives every object its own mask, so overlapping objects remain distinct."],
  ["What is panoptic segmentation?","Panoptic segmentation combines instance masks for countable objects with semantic labels for background regions, producing a complete scene map."],
  ["How do you measure image annotation quality?","We use IoU scoring against expert ground truth, hidden gold sets, inter-annotator agreement, consensus and adjudication, second-pass review and automated geometry and schema validation. Acceptance thresholds are agreed in the pilot."],
  ["How do you handle occluded or partially visible objects?","The guideline defines occlusion and truncation thresholds before production, including whether objects remain labeled, whether boxes stop at the image edge and which attributes must be recorded."],
  ["What output formats do you deliver?","COCO JSON, YOLO, Pascal VOC, CVAT XML, binary and indexed PNG masks, RLE masks, JSON, JSONL, CSV, TFRecord, Parquet or a custom client schema."],
  ["Can you work in our annotation tool?","Yes. Projects can run inside your platform using your licences and access controls, or on tooling provided by eQOURSE."],
  ["Do you use AI to pre-label images?","Where a suitable model exists, it can pre-label a batch for human correction. Every pre-label is reviewed by a person and measured against the same ground truth as manual annotation."],
  ["How much does image annotation cost?","Cost depends on annotation type, objects per image, class count, precision, scene complexity, QA tier, volume, expertise, turnaround and security. Share 20–50 representative images for a scoped estimate."],
  ["How is our image data kept secure?","Work runs under ISO 27001 certified processes with NDAs, role-based access, audit trails, secure delivery and contract-defined retention and deletion. Restricted work can use a client-controlled environment."],
  ["Can you fix or re-annotate a dataset we already have?","Yes. We audit existing labels, quantify errors against a corrected guideline, and repair or re-label the affected images."],
  ["Do you annotate video as well?","Video tracking, interpolation and action recognition are a separate annotation service so temporal work stays outside this still-image workflow."],
  ["How do we start?","Start with a free pilot. Share a representative image sample, label schema and accuracy target, and we will return annotated output with a QA report."],
].map(([question,answer])=>({question,answer}));

const offers=["Bounding Box Annotation","Rotated Box Annotation","Polygon and Polyline Annotation","Semantic Segmentation","Instance Segmentation","Panoptic Segmentation","Keypoint and Landmark Annotation","Image Classification","Attribute and Metadata Tagging","Text Region Labeling"];
const imageTrustStats=[
  {value:"Multi-tier QA",label:"Gold sets, IoU checks & second-pass review"},
  {value:"Flexible delivery",label:"COCO · YOLO · Pascal VOC · custom"},
  {value:"ISO certified",label:"9001 quality · 27001 security"},
];
const schema={"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${canonical}#service`,name:"Image Annotation Services",serviceType:"Computer Vision Image Annotation",url:canonical,description:"Pixel-accurate image annotation for object detection, segmentation, pose estimation and classification models, delivered with multi-tier quality control in COCO, YOLO, Pascal VOC and custom formats.",provider:{"@type":"Organization",name:"eQOURSE",url:"https://www.eqourse.com/"},areaServed:"Worldwide",isPartOf:{"@type":"Service","@id":"https://www.eqourse.com/ai-data-services/annotation-labeling#service"},hasOfferCatalog:{"@type":"OfferCatalog",name:"Image Annotation Services",itemListElement:offers.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://www.eqourse.com/"},{"@type":"ListItem",position:2,name:"AI Data Services",item:"https://www.eqourse.com/ai-data-services"},{"@type":"ListItem",position:3,name:"Data Annotation & Labeling",item:"https://www.eqourse.com/ai-data-services/annotation-labeling"},{"@type":"ListItem",position:4,name:"Image Annotation",item:canonical}]},{"@type":"FAQPage",mainEntity:faqs.map(({question,answer})=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}))}]};

const ImageAnnotationPage=()=> <AIDataServicesLayout breadcrumbs={[{label:"AI Data Services",href:"/ai-data-services"},{label:"Data Annotation & Labeling",href:"/ai-data-services/annotation-labeling"},{label:"Image Annotation"}]}>
  <SEOHead title="Image Annotation Services for Computer Vision | eQOURSE" description="Bounding box, polygon, segmentation, keypoint and classification annotation with multi-tier QA and COCO, YOLO or Pascal VOC delivery. Start a free pilot." canonical={canonical} keywords="image annotation services, image labeling services, computer vision annotation services, bounding box annotation services, image segmentation annotation, semantic segmentation services, instance segmentation annotation, polygon annotation services, keypoint annotation" ogImage="https://www.eqourse.com/assets/ai-data/annotation-labeling/image-annotation/image-annotation-og.webp"/>
  <Helmet><link rel="preload" as="image" href="/assets/ai-data/annotation-labeling/image-annotation/image-annotation-services-hero.avif" type="image/avif" fetchPriority="high"/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
  <ServiceHero tone="dark" preHeadline="Pixel-Accurate Ground Truth for Visual AI" headline="Image Annotation Services for Computer Vision and" headlineAccent="Visual AI" subtext="Pixel-accurate labels for object detection, segmentation, pose estimation and classification—with trained annotators, written edge-case rules and multi-tier quality review." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" imageSrc="/assets/ai-data/annotation-labeling/image-annotation/image-annotation-services-hero.webp" imageAvifSrc="/assets/ai-data/annotation-labeling/image-annotation/image-annotation-services-hero.avif" imageAlt="Computer vision specialists annotating urban street images with bounding boxes, polygons and segmentation masks" imageWidth={1200} imageHeight={800} trustStats={imageTrustStats} rotatingBadges={[{icon:Boxes,title:"Object detection",subtitle:"Boxes · Classes · Attributes",color:"hsl(170 82% 55%)"},{icon:Layers3,title:"Pixel precision",subtitle:"Semantic · Instance · Panoptic",color:"hsl(190 80% 58%)"},{icon:ScanLine,title:"Edge cases ruled",subtitle:"Occlusion · Truncation · Crowds",color:"hsl(35 92% 58%)"}]} bottomBadge={{iconText:"IoU",title:"Measured geometry quality",subtitle:"Ground truth · Gold sets · QA"}}/>
  <ImageAnnotationDefinition/><ImageAnnotationTypes/><AnnotationComparison/><ImageAnnotationProcess/><ImageQualityAndEdges/><DeliveryIndustriesAndCommercial/><SecurityRelatedWhy/>
  <RelatedBlogs />
  <FAQSection faqs={faqs} label="Image Annotation FAQs" title="Frequently Asked Questions About Image Annotation"/>
  <ServiceCTA headline="Get Your Images Annotated for Production" subtext="Tell us the annotation type, volume, class list, accuracy target and timeline—we'll scope a pilot on your own images." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" note="Pilot output includes a QA report"/>
</AIDataServicesLayout>;
export default ImageAnnotationPage;
