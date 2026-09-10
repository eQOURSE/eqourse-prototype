import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { FileCheck2, Languages, Table2 } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import FAQSection from "../../shared/FAQSection";
import ServiceCTA from "../../shared/ServiceCTA";
import {
  DeliveryAndCommercial, DocumentAnnotationTypes, DocumentChallenges,
  DocumentCoverage, DocumentDefinition, DocumentProcess, DocumentQuality,
  DocumentSecurity, PublishingExpertise, RelatedAndWhy,
} from "./DocumentOCRCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/annotation-labeling/document-ocr-annotation";

const faqs = [
  ["What is document annotation?", "Document annotation labels the structure and meaning of a document so a model can understand which text is which field, how tables are structured, where documents begin and end, and in what order a person would read the page."],
  ["What is the difference between OCR and document annotation?", "OCR converts pixels into characters. Document annotation adds structure and meaning by linking values to labels, representing table rows and columns, and recording reading order. eQOURSE delivers both OCR ground truth and structural annotation."],
  ["What is the difference between document annotation and text annotation?", "The dividing line is whether position matters. If a label depends on where text sits on the page, it is document annotation. If the text is already clean digital data and only its meaning matters, it is text and NLP annotation."],
  ["What document annotation types does eQOURSE provide?", "Layout and region annotation, key-value extraction, table structure recognition, line items, form fields, handwriting, signature and stamp detection, classification, multi-page splitting, reading order, entity extraction, PII marking and OCR ground-truth transcription."],
  ["What types of documents do you work with?", "Invoices, receipts, purchase orders, statements, KYC documents, insurance claims, contracts, trade paperwork, medical forms, academic transcripts, mark sheets and archival records."],
  ["Can you handle handwritten documents?", "Yes. Handwriting is transcribed at line or word level with confidence flags for ambiguous strokes, including printed forms completed by hand. Genuinely illegible content is flagged rather than guessed."],
  ["How do you handle tables, especially borderless ones?", "Tables are annotated structurally with rows, columns, headers, merged and spanning cells, nested tables and rules for borderless or multi-page tables. Quality is scored at cell level."],
  ["How do you measure document annotation quality?", "We report per-field accuracy, character and word error rates, cell-level table accuracy, normalisation conformance, region validation, hidden gold documents, double-entry on critical fields and template coverage."],
  ["What output formats do you deliver?", "JSON, JSONL, hOCR, ALTO XML, PAGE XML, FUNSD-style layout, DocVQA structures, CoNLL with coordinates, COCO-style regions, CSV, Excel field tables, searchable PDF or a custom schema."],
  ["Do you use OCR to speed up annotation?", "Yes, when pre-fill improves throughput without reducing field accuracy. We switch to manual work wherever it introduces errors. OCR pre-fill is never used for OCR ground-truth datasets, which must be independent."],
  ["Can you handle documents in Indic or non-Latin scripts?", "Yes. eQOURSE works across 30+ languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi and Urdu, including degraded scans."],
  ["How do you handle documents containing personal data?", "Through PII classification, redaction and pseudonymisation workflows, vetted teams under NDA, role-based access, audit trails, defined retention and deletion, and restricted environments where required."],
  ["How much does document annotation cost?", "Cost depends on fields per document, table complexity, template variety, scan quality, handwriting, language, accuracy tier, domain expertise, security and volume. Share 20–50 representative documents for a scoped estimate."],
  ["Can you split scanned batches into separate documents?", "Yes. We use cover pages, continuation markers, page numbering restarts and document-type changes to divide scanned batches into correctly bounded individual documents."],
  ["How do we start?", "Share representative documents covering your template variety and the target extraction schema. We will return a pilot batch, field-level QA report and scoped production estimate."],
].map(([question, answer]) => ({ question, answer }));

const offers = [
  "Document Layout and Region Annotation", "Key-Value Pair Extraction", "Table Structure Recognition",
  "Line-Item Extraction", "Form Field and Checkbox Annotation", "Handwriting Transcription",
  "Signature, Stamp and Seal Detection", "Document Classification and Multi-Page Splitting",
  "Reading Order Annotation", "Entity Extraction in Documents", "PII Identification and Redaction Marking",
  "OCR Ground-Truth Transcription",
];

const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "Service", "@id": `${canonical}#service`, name: "Document & OCR Annotation Services", serviceType: "Document and OCR Annotation", url: canonical, description: "Document annotation and OCR ground-truth services for document AI and intelligent document processing, including layout, key-value pairs, table structure, handwriting, reading order and PII marking with per-field accuracy reporting.", provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/", address: [{ "@type": "PostalAddress", addressCountry: "IN" }, { "@type": "PostalAddress", addressCountry: "SG" }] }, areaServed: "Worldwide", availableLanguage: "en", isPartOf: { "@type": "Service", "@id": "https://www.eqourse.com/ai-data-services/annotation-labeling#service", name: "Data Annotation & Labeling Services", url: "https://www.eqourse.com/ai-data-services/annotation-labeling" }, hasOfferCatalog: { "@type": "OfferCatalog", name: "Document and OCR Annotation Services", itemListElement: offers.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
  { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: "https://www.eqourse.com/ai-data-services/annotation-labeling" }, { "@type": "ListItem", position: 4, name: "Document & OCR Annotation", item: canonical }] },
  { "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
] };

const DocumentOCRAnnotationPage = () => <AIDataServicesLayout breadcrumbs={[
  { label: "AI Data Services", href: "/ai-data-services" },
  { label: "Data Annotation & Labeling", href: "/ai-data-services/annotation-labeling" },
  { label: "Document & OCR Annotation" },
]}>
  <SEOHead title="Document & OCR Annotation Services for Document AI | eQOURSE" description="Document AI training data for layout, key-value pairs, table structure, handwriting and forms. Per-field QA, 30+ languages and ISO-certified processes." canonical={canonical} keywords="document annotation services, OCR annotation services, document AI training data, intelligent document processing training data, IDP annotation services, invoice extraction annotation, KYC document annotation, form annotation services, table structure recognition annotation, OCR ground truth dataset" ogImage="https://www.eqourse.com/assets/ai-data/annotation-labeling/document-ocr-annotation/document-ocr-annotation-og.webp"/>
  <Helmet><link rel="preload" as="image" href="/assets/ai-data/annotation-labeling/document-ocr-annotation/document-ocr-annotation-services-hero.avif" type="image/avif" fetchPriority="high"/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
  <ServiceHero tone="dark" preHeadline="Structure-Aware Ground Truth for Document AI" headline="Document & OCR Annotation Services for" headlineAccent="Document AI and IDP" subtext="Layout regions, key-value pairs, table structure, handwriting and form fields—built on two decades of publishing production and digital conversion expertise." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" imageSrc="/assets/ai-data/annotation-labeling/document-ocr-annotation/document-ocr-annotation-services-hero.webp" imageAvifSrc="/assets/ai-data/annotation-labeling/document-ocr-annotation/document-ocr-annotation-services-hero.avif" imageAlt="Specialist annotating fields and table structure on a synthetic scanned invoice in a document annotation interface" imageWidth={1200} imageHeight={800} trustStats={[{ value: "Publishing-grade", label: "Document structure expertise" }, { value: "30+ languages", label: "Including Indic scripts" }, { value: "ISO certified", label: "9001 quality · 27001 security" }]} rotatingBadges={[{ icon: Table2, title: "Table-aware", subtitle: "Rows · Columns · Merged cells", color: "hsl(170 82% 55%)" }, { icon: Languages, title: "Script-aware", subtitle: "Printed · Handwritten · Indic", color: "hsl(190 80% 58%)" }, { icon: FileCheck2, title: "Field-level QA", subtitle: "Accuracy · CER · Coverage", color: "hsl(35 92% 58%)" }]} bottomBadge={{ iconText: "IDP", title: "Position carries meaning", subtitle: "Text · Layout · Relationships" }}/>
  <DocumentDefinition/><DocumentAnnotationTypes/><DocumentCoverage/><PublishingExpertise/><DocumentProcess/><DocumentQuality/><DocumentChallenges/><DocumentSecurity/><DeliveryAndCommercial/><RelatedAndWhy/>
  <RelatedBlogs />
  <FAQSection faqs={faqs} label="Document Annotation FAQs" title="Frequently Asked Questions About Document & OCR Annotation"/>
  <ServiceCTA headline="Build the Training Data Behind Your Document AI" subtext="Send a representative document set and extraction schema—we'll map template variety, scope a per-document estimate and run a pilot." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" note="Pilot includes a per-field accuracy report"/>
</AIDataServicesLayout>;

export default DocumentOCRAnnotationPage;
