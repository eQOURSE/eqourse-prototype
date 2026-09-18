// Post-build step: bakes the correct per-route <title>/meta tags directly into
// a static index.html for every route in src/seo/pageSeo.ts.
//
// Why this exists: this app is a pure client-rendered SPA (no SSR). The single
// dist/index.html Vite emits carries generic fallback tags, and react-helmet-async
// only swaps them to the correct per-page values AFTER JavaScript executes. Any
// tool or crawler that reads the raw HTML response (curl, most SEO auditors,
// Google's initial HTML pass) sees that generic "primary" title, then a
// different "secondary" title once JS runs — even though pageSeo.ts and
// SEOHead.tsx only ever produce ONE title per page.
//
// This script removes that gap at the HTML level: it writes dist/<route>/index.html
// per mapped route, each with its own correct title/description/canonical/OG/
// Twitter tags already present in the raw markup, so there's nothing left for
// react-helmet-async to "swap" — it renders the identical values on hydration.
//
// The host must serve dist/<route>/index.html for that exact path (standard
// static-file resolution on Netlify/Vercel/Apache/Nginx/IIS all do this before
// falling back to the SPA rewrite for unmapped routes) — confirm with whoever
// owns the deploy.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = process.env.SEO_DIST_DIR || join(root, "dist");
const distIndexPath = join(distDir, "index.html");
const pageSeoPath = join(root, "src", "seo", "pageSeo.ts");
const SITE_URL = "https://www.eqourse.com";
const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;
const configuredApiBase = process.env.CMS_SEO_SOURCE_URL || process.env.VITE_API_BASE_URL || SITE_URL;
const CMS_API_BASE = configuredApiBase.startsWith("http")
  ? configuredApiBase.replace(/\/+$/, "")
  : SITE_URL;

function parsePageSeo(source) {
  const pattern = /"(\/[^"]*)":\s*\{\s*title:\s*"((?:[^"\\]|\\.)*)",\s*description:\s*"((?:[^"\\]|\\.)*)",(?:\s*canonical:\s*"((?:[^"\\]|\\.)*)",)?(?:\s*image:\s*"((?:[^"\\]|\\.)*)",)?/gs;
  const entries = [];
  let match;
  while ((match = pattern.exec(source)) !== null) {
    entries.push({
      path: match[1],
      title: match[2].replace(/\\"/g, '"'),
      description: match[3].replace(/\\"/g, '"'),
      canonical: match[4]?.replace(/\\"/g, '"'),
      image: match[5]?.replace(/\\"/g, '"'),
    });
  }
  return entries;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(str) {
  return escapeHtml(str).replace(/'/g, "&apos;");
}

function renderMarkdownForSeo(content) {
  if (!content?.trim()) return "";
  return renderToStaticMarkup(
    React.createElement(ReactMarkdown, {
      remarkPlugins: [remarkGfm],
      skipHtml: true,
      components: { h1: ({ children }) => React.createElement("h2", null, children) },
    }, content),
  );
}

function plainTextFromHtml(content) {
  return String(content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildDataCollectionFallback() {
  const faq = [
    ["What is AI data collection?", "AI data collection is the process of sourcing or capturing raw text, image, audio, video or multimodal data for training, fine-tuning and evaluating AI systems."],
    ["What types of data can eQOURSE collect?", "eQOURSE supports image, audio and speech, text, video and multimodal data collection designed around the use case, users, languages, devices and environments."],
    ["What is the difference between data collection and data annotation?", "Data collection creates or sources the raw dataset. Data annotation adds labels or structure to data that already exists."],
    ["Can you support multilingual data collection?", "Yes. eQOURSE supports data programmes across 30+ languages, including requirements for region, dialect, accent and contributor profile."],
    ["How do you manage data quality?", "Controls can include contributor screening, capture guidelines, pilot validation, automated file checks, human QA, format validation and duplication checks."],
    ["Can you collect data using specific devices or environments?", "Yes. Collection can be designed around defined cameras, microphones, devices, locations, lighting and acoustic conditions."],
    ["How is consent handled?", "For contributor-led programmes, consent and permitted use are defined as part of the collection workflow according to the project and applicable requirements."],
    ["How much does AI data collection cost?", "Cost depends on modality, volume, languages, contributor profile, devices, environments, timeline and QA requirements."],
    ["Can eQOURSE annotate the data after collection?", "Yes. Collected data can move into eQOURSE annotation and labeling, cleaning and validation, and model-testing workflows."],
    ["Can you support AI data collection for robotics?", "eQOURSE supports real-world visual, video and multimodal collection relevant to physical and embodied AI."],
  ];
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${SITE_URL}/ai-data-services/data-collection#service`, name: "AI Data Collection Services", serviceType: "AI Training Data Collection", description: "Custom image, audio, text, video and multimodal data collection for AI and machine learning.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: `${SITE_URL}/ai-data-services/data-collection` };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <span>Data Collection</span></nav>
      <h1>AI Data Collection Services for AI &amp; Machine Learning</h1>
      <p>Build purpose-fit training datasets around the users, languages, devices and real-world environments your model needs to understand. eQOURSE supports custom image, audio, text and video data collection with quality controls, consent handling and secure delivery.</p>
      <p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
      <section><h2>What Is AI Data Collection?</h2><p>AI data collection is the process of sourcing or capturing the raw text, images, audio, video and multimodal data required to train, fine-tune and evaluate AI systems.</p><h3>Data Collection vs. Data Annotation</h3><p>Collection creates the raw dataset. Annotation adds labels and structure to data that already exists.</p></section>
      <section><h2>Build Training Data Around Real Deployment Conditions</h2><p>Collection plans should represent the target population, environment, device profile, language mix and intended model behaviour.</p><ul><li>Coverage across participant profiles, demographics, regions and languages</li><li>Defined cameras, microphones, sensors and devices</li><li>Realistic lighting, acoustics, movement and background conditions</li><li>File, metadata, quality and delivery acceptance criteria</li></ul></section>
      <section><h2>Multi-Modal AI Data Collection</h2><article><h3>Image Data Collection</h3><p>Purpose-built visual datasets captured across defined objects, environments, devices, perspectives and lighting conditions.</p></article><article><h3>Audio &amp; Speech Data Collection</h3><p>Scripted and natural speech collected across languages, accents, speaker profiles, acoustic environments and devices.</p></article><article><h3>Text Data Collection</h3><p>Domain-specific, multilingual and conversational text datasets for NLP, LLM training, fine-tuning and evaluation.</p></article><article><h3>Video Data Collection</h3><p>Real-world video covering human activity, objects, environments and temporal behaviour for computer vision and physical AI.</p></article></section>
      <section><h2>How We Collect AI Training Data</h2><ul><li>Contributor-led collection</li><li>Controlled field and studio collection</li><li>Device-specific collection</li><li>Licensed or customer-provided sources</li></ul></section>
      <section><h2>Our AI Data Collection Process</h2><ol><li>Requirement definition</li><li>Collection specification</li><li>Source and vet</li><li>Pilot</li><li>Collect</li><li>Validate</li><li>Secure delivery</li></ol></section>
      <section><h2>Training Data for Modern AI Applications</h2><p>Computer vision, speech and voice AI, generative AI and LLMs, conversational AI, autonomous systems, robotics and physical AI.</p></section>
      <section><h2>Quality, Consent and Data Security Built Into Collection</h2><ul><li>Collection guidelines</li><li>Contributor screening</li><li>Consent handling</li><li>Provenance records</li><li>Quality validation</li><li>ISO 9001 and ISO 27001 certified processes</li></ul></section>
      <section><h2>Multilingual AI Data Collection Across 30+ Languages</h2><p>Programmes can define language, region, accent, dialect and contributor requirements before collection begins, with strong delivery depth across Indic languages.</p></section>
      <section><h2>One AI Data Workflow From Collection to Model Testing</h2><p><a href="/ai-data-services/data-collection">Collect</a> → <a href="/ai-data-services/annotation-labeling">Annotate</a> → <a href="/ai-data-services/cleaning-validation">Clean &amp; Validate</a> → <a href="/ai-data-services/model-testing">Test</a> → Improve</p></section>
      <section><h2>Data Collection for Physical and Embodied AI</h2><p>Purpose-built visual, video and multimodal collection programmes can support systems that perceive and operate in the physical world.</p><p><a href="/robotics-training-data-services">Explore Robotics Training Data Services</a></p></section>
      <section><h2>What Determines AI Data Collection Pricing?</h2><p>Pricing depends on modality, volume, language and geography, contributor profile, devices and environments, quality requirements and timeline.</p></section>
      <section><h2>Frequently Asked Questions About AI Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Ready to Build Your AI Training Dataset?</h2><p>Tell us the data type, target volume, languages, deployment environment and timeline.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildImageDataCollectionFallback() {
  const faq = [
    ["What is image data collection?", "Image data collection captures or sources purpose-built visual data to train, fine-tune, validate or evaluate computer vision and multimodal AI systems."],
    ["What types of images can eQOURSE collect?", "Projects can include objects, products, documents, scenes, gestures, human-centred images and device-specific captures, subject to consent and rights requirements."],
    ["Can you collect images using specific phones or cameras?", "Yes. Programmes can specify hardware, resolution, orientation, camera position and capture settings."],
    ["How do you ensure image diversity?", "The specification can define scene, angle, distance, lighting, geography, object condition, background and participant-profile variation."],
    ["Can you collect document images for OCR?", "Yes. Collections can include receipts, invoices, labels, forms, worksheets and other documents under varied real-world conditions."],
    ["How is consent handled when people appear in images?", "Consent, intended use, handling, retention and access requirements are defined for the project and applicable legal requirements."],
    ["Do you also annotate collected images?", "Yes. Collected images can continue into eQOURSE Annotation & Labeling for project-specific label types."],
    ["What image formats can you deliver?", "Common examples include JPEG, PNG, WebP and other formats agreed during scoping, plus manifests and capture metadata."],
    ["How much does image data collection cost?", "Cost depends on volume, capture complexity, participants, geography, devices, environments, QA depth and timeline."],
  ];
  const canonical = `${SITE_URL}/ai-data-services/data-collection/image-data-collection`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
    { "@type": "ListItem", position: 4, name: "Image Data Collection", item: canonical },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Image Data Collection Services for Computer Vision", serviceType: "Image Data Collection for AI", description: "Custom image data collection for computer vision and visual AI across objects, documents, scenes, devices and real-world conditions.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: canonical };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/data-collection">Data Collection</a> / <span>Image Data Collection</span></nav>
      <h1>Image Data Collection Services for Computer Vision &amp; Visual AI</h1>
      <p>Build purpose-fit image datasets around the objects, people, documents, environments, devices and visual conditions your model must understand.</p>
      <p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Discuss Your Image Dataset</a></p>
      <section><h2>What Is Image Data Collection for AI?</h2><p>Image data collection captures or sources visual data for training, fine-tuning, validating or evaluating computer vision and multimodal AI. Programmes can control object type, device, angle, distance, lighting, background, geography and environment.</p></section>
      <section><h2>Custom Image Datasets Built Around Your Computer Vision Use Case</h2><h3>Objects &amp; Products</h3><p>Objects captured across angles, distances, backgrounds and lighting.</p><h3>Documents &amp; Forms</h3><p>Receipts, invoices, forms, labels and packaging under realistic conditions.</p><h3>Human Actions &amp; Gestures</h3><p>Consented gestures and interaction scenarios.</p><h3>Human-Centred Visual Data</h3><p>Appropriately consented imagery under project-specific requirements.</p><h3>Scenes &amp; Environments</h3><p>Indoor, outdoor and domain-specific scenes.</p><h3>Device-Specific Capture</h3><p>Images recorded with defined cameras, phones, resolutions or optics.</p></section>
      <section><h2>Collect Images Under the Conditions Your Model Will Actually See</h2><ul><li>Lighting</li><li>Angle and perspective</li><li>Distance and scale</li><li>Background and occlusion</li><li>Device and resolution</li><li>Geography and participant profile</li></ul></section>
      <section><h2>How We Collect Image Training Data</h2><ul><li>Contributor-led capture</li><li>Controlled or on-site capture</li><li>Field collection</li><li>Customer-provided or rights-cleared sources</li></ul></section>
      <section><h2>Our Image Data Collection Process</h2><ol><li>Use-case definition</li><li>Capture specification</li><li>Contributor and environment setup</li><li>Pilot collection</li><li>Collection at scale</li><li>Quality validation</li><li>Secure delivery</li></ol><p><a href="/ai-data-services/annotation-labeling">Continue into Image Annotation &amp; Labeling</a></p></section>
      <section><h2>Image Quality Checks Before Dataset Delivery</h2><p>Checks may cover file integrity, resolution, orientation, formats, blur, exposure, required scenes, capture compliance, coverage and duplicate review.</p></section>
      <section><h2>Consent and Provenance for Human-Centred Image Data</h2><p>Consent, permitted use, provenance, retention, access, de-identification and secure-transfer requirements are defined for the project where applicable.</p></section>
      <section><h2>Image Data for Computer Vision and Multimodal AI</h2><p>Object detection, OCR, visual search, gestures, scene understanding, retail intelligence, mobility vision and vision-language models.</p></section>
      <section><h2>Image Collection Across Real-World Domains</h2><p>Retail, mobility, enterprise documents, governed healthcare workflows, consumer devices, education and EdTech.</p></section>
      <section><h2>Image Dataset Formats and Delivery</h2><p>Typical examples include JPEG, PNG, WebP, TIFF, directory structures, manifests, capture metadata and consent or provenance documentation.</p></section>
      <section><h2>When Do You Need Custom Image Data Collection?</h2><p>Custom capture helps when classes, devices, environments, geographies, licensing evidence or production edge cases are missing from existing datasets.</p></section>
      <section><h2>What Determines Image Data Collection Cost?</h2><p>Pricing depends on volume, complexity, participants, geography, devices, environments, repetitions, field operations, QA depth and timeline.</p></section>
      <section><h2>Why Choose eQOURSE for Image Data Collection?</h2><p>Custom specifications, multi-region coordination, specialist workflows, connected downstream services and ISO 9001 and ISO 27001 certified processes.</p><p><a href="/ai-data-services/data-collection">Explore all AI Data Collection Services</a></p></section>
      <section><h2>Frequently Asked Questions About Image Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Build the Image Dataset Your Model Actually Needs</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildAudioDataCollectionFallback() {
  const faq = [
    ["What is speech data collection?", "Speech data collection records human speech or related audio for training, fine-tuning, validating or evaluating speech-enabled AI."],
    ["What speech types can eQOURSE collect?", "Projects can include scripted speech, spontaneous speech, conversations, wake words, commands, domain-specific speech and selected acoustic events."],
    ["Can you collect multilingual and accented speech?", "Yes. eQOURSE supports programmes across 30+ languages, with accent, dialect, locale and speaker requirements defined during scoping."],
    ["Can you record in noisy or real-world environments?", "Yes. Projects can target homes, offices, vehicles or other environments when realistic acoustic conditions matter."],
    ["Can you collect audio using specific microphones or devices?", "Yes. A specification can include a particular microphone, phone, headset or recording setup."],
    ["What audio formats do you support?", "Common examples include WAV, FLAC and other agreed formats, with sample rate, bit depth, channels and metadata defined for the model pipeline."],
    ["How do you check audio quality?", "Checks can cover clipping, silence, truncation, integrity, prompt compliance, sample rate, language, device, environment and human review."],
    ["How is voice-data consent handled?", "Contributor consent and permitted use are defined before recording, alongside project-specific retention, access and de-identification requirements."],
    ["Can eQOURSE transcribe or annotate the audio after collection?", "Yes. Collected audio can continue into transcription, annotation, cleaning and validation workflows."],
    ["How much does speech data collection cost?", "Cost depends on languages, dialects, speaker criteria, volume, recording method, devices, environments, QA depth and timeline."],
  ];
  const canonical = `${SITE_URL}/ai-data-services/data-collection/audio-data-collection`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
    { "@type": "ListItem", position: 4, name: "Audio & Speech Data Collection", item: canonical },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Audio & Speech Data Collection Services for Voice AI", serviceType: "Audio and Speech Data Collection for AI", description: "Custom audio and speech data collection for ASR, TTS and voice AI across languages, accents, speakers, devices and real-world acoustic environments.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: canonical };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/data-collection">Data Collection</a> / <span>Audio &amp; Speech Data Collection</span></nav>
      <h1>Audio &amp; Speech Data Collection Services for Voice AI</h1>
      <p>Build speech and audio datasets around the languages, accents, speaker profiles, devices and acoustic environments your model will encounter in production.</p>
      <p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Discuss Your Speech Dataset</a></p>
      <section><h2>What Is Audio &amp; Speech Data Collection for AI?</h2><p>Audio data collection records or sources speech, voice and other sound data for training, fine-tuning, validating or evaluating AI systems. Programmes can control language, accent, dialect, speaker profile, speaking style, microphone, environment, noise and recording format.</p><h3>Collection vs. annotation</h3><p>Collection creates the raw audio dataset. Transcripts, speaker labels and structured tags are downstream annotation tasks.</p></section>
      <section><h2>Speech Data Collection for Real Voice AI Use Cases</h2><h3>Scripted Speech</h3><p>Predetermined prompts and commands.</p><h3>Spontaneous Speech</h3><p>Natural speech around topics or scenarios.</p><h3>Conversational Speech</h3><p>Natural or guided multi-speaker conversations.</p><h3>Wake Words &amp; Commands</h3><p>Activation phrases across speakers and environments.</p><h3>Domain-Specific Speech</h3><p>Speech built around specialised scenarios.</p><h3>Non-Speech &amp; Acoustic Events</h3><p>Selected environmental sounds under controlled specifications.</p></section>
      <section><h2>Capture the Language and Acoustic Variation Your Model Needs</h2><ul><li>Language and locale</li><li>Accent and dialect</li><li>Speaker profile</li><li>Speaking style</li><li>Device and microphone</li><li>Environment</li><li>Distance and position</li><li>Noise conditions</li></ul></section>
      <section><h2>Multilingual Speech Data Across 30+ Languages</h2><p>Programmes can define language, regional accent, dialect, speaker mix, code-switching, prompt style, device and acoustic environment, with strong delivery depth across Indic languages.</p></section>
      <section><h2>How We Collect Speech and Audio Training Data</h2><ul><li>Remote contributor recording</li><li>Moderated or studio collection</li><li>In-environment collection</li><li>Defined client workflow where supported</li></ul></section>
      <section><h2>Our Speech Data Collection Process</h2><ol><li>Use-case definition</li><li>Speech specification</li><li>Contributor sourcing and calibration</li><li>Pilot recording</li><li>Collection at scale</li><li>Audio QA</li><li>Secure delivery</li></ol><p><a href="/ai-data-services/annotation-labeling">Transcription and Annotation</a> → <a href="/ai-data-services/cleaning-validation">Cleaning and Validation</a> → <a href="/ai-data-services/model-testing">Model Testing</a></p></section>
      <section><h2>Audio Quality Controls Built Around the Project Specification</h2><p>Checks can cover signal integrity, prompt compliance, acoustic conditions, device and microphone requirements, project-safe identifiers and language-qualified human review.</p></section>
      <section><h2>Audio Training Data for Modern Speech AI</h2><p>ASR, TTS support data, voice assistants, wake words, conversational AI, dialogue understanding, customer-service AI and audio event detection.</p></section>
      <section><h2>Responsible Collection for Human Voice Data</h2><p>Permitted use, contributor consent, retention, access, de-identification and metadata minimisation are defined before collection. Controls can include ISO 9001, ISO 27001, controlled access, secure transfer and provenance records.</p></section>
      <section><h2>Audio Formats, Metadata and Delivery</h2><p>Examples include WAV, FLAC, MP3 where appropriate, mono or stereo, agreed sample rate and bit depth, project-safe identifiers, language, device and environment metadata, and session manifests.</p></section>
      <section><h2>Speech Data Collection Across Real-World Domains</h2><p>Consumer technology, automotive, customer experience, approved financial-services scenarios, education and ethically designed accessibility applications.</p></section>
      <section><h2>When Public Speech Datasets Are Not Enough</h2><p>Custom collection helps when accents, dialects, devices, noisy environments, domain language, commands, conversational scenarios or provenance requirements are missing.</p></section>
      <section><h2>What Determines Audio Data Collection Cost?</h2><p>Pricing depends on volume, language, dialect, speakers, recording complexity, devices, environments, moderation, domain expertise, QA and timeline.</p></section>
      <section><h2>Why Choose eQOURSE for Audio &amp; Speech Data Collection?</h2><p>Multilingual and Indic-language depth, remote and controlled collection models, language-aware QA, connected downstream services and ISO 9001 and ISO 27001.</p><p><a href="/ai-data-services/data-collection">Explore AI Data Collection Services</a> <a href="/ai-data-services/data-collection/image-data-collection">Explore Image Data Collection</a></p></section>
      <section><h2>Frequently Asked Questions About Audio &amp; Speech Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Build Speech Data Around the Voices Your AI Must Understand</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildTextDataCollectionFallback() {
  const faq = [
    ["What is text data collection?", "Text data collection sources, creates or compiles written language data for NLP, LLM and other language-AI systems."],
    ["What is the difference between text collection and text annotation?", "Collection creates or sources the dataset. Annotation adds labels such as intents, entities, sentiment categories or safety tags."],
    ["Can eQOURSE create text for LLM fine-tuning?", "Where operationally supported, contributors or domain experts can create instruction-response, conversational or task-specific examples against defined rubrics."],
    ["Can you collect multilingual text?", "Yes. eQOURSE supports programmes across 30+ languages, with locale, script, regional usage and domain requirements defined during scoping."],
    ["Can you collect domain-specific text?", "Yes. Programmes can use trained contributors or subject-matter experts when specialist terminology or factual knowledge is required."],
    ["How do you manage duplicate or low-quality text?", "Quality workflows can include duplicate detection, language checks, format validation, relevance review, domain review and human QA."],
    ["Can you work with our existing documents or knowledge base?", "Yes. Customer-owned or appropriately authorised sources can be incorporated subject to access, rights, confidentiality and handling requirements."],
    ["What formats can text datasets be delivered in?", "Common formats include JSON, JSONL, CSV, TSV and client-defined text schemas, including conversation and metadata structures."],
    ["How do you handle PII or sensitive text?", "Workflows can include project-specific minimisation, redaction, de-identification, access controls and retention rules."],
    ["How much does text data collection cost?", "Cost depends on volume, language, domain complexity, source method, expertise, output length, rights, QA depth and timeline."],
  ];
  const canonical = `${SITE_URL}/ai-data-services/data-collection/text-data-collection`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
    { "@type": "ListItem", position: 4, name: "Text Data Collection", item: canonical },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Text Data Collection Services for NLP, LLMs & Generative AI", serviceType: "Text Data Collection for AI", description: "Custom text data collection for NLP, LLMs and generative AI across multilingual, domain-specific, conversational and human-generated datasets.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: canonical };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/data-collection">Data Collection</a> / <span>Text Data Collection</span></nav>
      <h1>Text Data Collection Services for NLP, LLMs &amp; Generative AI</h1>
      <p>Build domain-specific, multilingual and conversational text datasets around the language patterns, tasks and knowledge your models need to understand.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Discuss Your Text Dataset</a></p>
      <section><h2>What Is Text Data Collection for AI?</h2><p>Text data collection sources, creates or compiles written language data for training, fine-tuning, validating or evaluating NLP, large language models and text-driven AI.</p><h3>Collection creates the dataset; annotation adds structure</h3><p>NER, sentiment, entity and intent labels belong to <a href="/ai-data-services/annotation-labeling/text-nlp-annotation">text and NLP annotation services</a>.</p></section>
      <section><h2>Custom Text Datasets for NLP and Language Models</h2><h3>Domain-Specific Corpora</h3><p>Specialist text for adaptation and retrieval.</p><h3>Conversational &amp; Dialogue Data</h3><p>Human-generated conversations around defined intents.</p><h3>Queries, Intents &amp; Utterances</h3><p>Natural language variants for real interactions.</p><h3>Instructions &amp; Responses</h3><p>Task examples created against defined rubrics where supported.</p><h3>Documents &amp; Written Records</h3><p>Authorised structured and unstructured sources.</p><h3>Handwritten Text Samples</h3><p>Purpose-collected handwriting.</p><h3>Multilingual Text</h3><p>Locale-specific language reflecting real syntax and usage.</p></section>
      <section><h2>Text Collection Creates the Language Data; Annotation Adds Structure</h2><p>Collection sources or creates examples. Annotation adds intent, entity, sentiment, safety or other labels to existing text.</p></section>
      <section><h2>Text Data Collection Methods</h2><ul><li>Human-created text</li><li>Domain-expert creation</li><li>Customer-provided corpora</li><li>Rights-cleared or licensed sources</li><li>Handwriting and document capture</li></ul></section>
      <section><h2>Control the Language Variables That Shape Model Behaviour</h2><ul><li>Domain</li><li>Intent</li><li>Style and register</li><li>Language and locale</li><li>Difficulty and edge cases</li><li>Contributor expertise</li></ul></section>
      <section><h2>Multilingual Text Collection Across 30+ Languages</h2><p>Programmes can define language, locale, script, regional vocabulary, code-switching, register, domain and review requirements, with strong Indic-language capability.</p></section>
      <section><h2>Our Text Data Collection Process</h2><ol><li>Use-case definition</li><li>Dataset specification</li><li>Contributor or expert setup</li><li>Pilot batch</li><li>Collection at scale</li><li>Quality validation</li><li>Secure delivery</li></ol><p><a href="/ai-data-services/annotation-labeling/text-nlp-annotation">Text &amp; NLP Annotation</a> → <a href="/ai-data-services/cleaning-validation">Validation</a> → <a href="/ai-data-services/model-testing">Model Testing</a></p></section>
      <section><h2>Text Quality Controls for NLP and LLM Data</h2><p>Controls can cover duplicates, language, formats, fields, relevance, domain review, project-policy content rules, provenance, PII minimisation and human QA.</p></section>
      <section><h2>Text Data for LLM Training, Adaptation and Evaluation</h2><p>Domain adaptation, supervised fine-tuning data, conversational AI, search and retrieval, classification, evaluation sets and multimodal text.</p></section>
      <section><h2>Text Data for NLP Applications</h2><p>Intent classification, query understanding, conversational AI, summarisation, question answering, document understanding, multilingual NLP and RAG corpus preparation.</p></section>
      <section><h2>Text Data Provenance and Responsible Sourcing</h2><p>Permitted sources, usage, access, retention and governance are defined before collection. Controls can include rights-cleared sourcing, consent, provenance metadata, PII minimisation, secure access, ISO 27001 and ISO 9001.</p></section>
      <section><h2>Text Dataset Formats and Delivery</h2><p>Examples include JSON, JSONL, CSV, TSV, TXT, XML, conversation schemas, prompt-response schemas, metadata manifests and provenance fields.</p></section>
      <section><h2>Domain-Specific Text Data Collection</h2><p>Technology, education, financial services, approved healthcare workflows, retail and enterprise knowledge.</p></section>
      <section><h2>When Generic Web Text Is Not Enough</h2><p>Custom collection helps when domains, vocabularies, intents, low-resource languages, provenance, product-specific queries or expert knowledge are missing.</p></section>
      <section><h2>What Determines Text Data Collection Cost?</h2><p>Pricing depends on volume, sourcing method, language, domain, expertise, length, research, rights, QA and timeline.</p></section>
      <section><h2>Why Choose eQOURSE for Text Data Collection?</h2><p>30+ languages, Indic-language depth, multidisciplinary specialists, domain expertise, connected downstream workflows and project-specific rubrics.</p><p><a href="/ai-data-services/data-collection">Explore AI Data Collection Services</a> <a href="/ai-data-services/data-collection/image-data-collection">Image Data Collection</a> <a href="/ai-data-services/data-collection/audio-data-collection">Audio &amp; Speech Data Collection</a></p></section>
      <section><h2>Frequently Asked Questions About Text Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Build Language Data Around the Tasks Your Model Must Perform</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildVideoDataCollectionFallback() {
  const faq = [
    ["What is video data collection for AI?", "Video data collection records or sources sequences for AI systems that need to understand motion, actions, objects, events and changing environments."],
    ["What types of video can eQOURSE collect?", "Projects can include human activities, gestures, object interactions, indoor and outdoor scenes, mobility scenarios, multi-camera capture and selected first-person tasks."],
    ["Can you collect egocentric or first-person video?", "Where appropriate, approved wearable or first-person setups can capture task sequences and object interactions. Robotics-specific requirements belong to Robotics Training Data Services."],
    ["Can you use specific cameras or devices?", "Yes. Specifications can define phones, cameras, wearable rigs, mounts, viewpoints, resolution and frame rate."],
    ["How do you ensure video quality?", "QA can include integrity, duration, codec, resolution, frame rate, blur, exposure, framing, scenario compliance, duplicates and metadata."],
    ["Can you collect multi-camera video?", "Where operationally supported, the same scene or activity can be captured from multiple viewpoints with synchronisation defined during scoping."],
    ["How is consent handled?", "Participant consent, permitted use, location permissions, retention and access requirements are defined before collection where applicable."],
    ["Can you annotate collected video?", "Yes. Clips can continue into Annotation & Labeling for frame-level, temporal, tracking, action, keypoint or project-specific labels."],
    ["What formats can video be delivered in?", "Common formats include MP4, MOV and other agreed containers or codecs, with technical parameters aligned to the model pipeline."],
    ["How much does video data collection cost?", "Cost depends on volume, scenarios, participants, locations, cameras, resolution, multi-camera requirements, moderation, QA and timeline."],
  ];
  const canonical = `${SITE_URL}/ai-data-services/data-collection/video-data-collection`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
    { "@type": "ListItem", position: 4, name: "Video Data Collection", item: canonical },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Video Data Collection Services for Computer Vision & Multimodal AI", serviceType: "Video Data Collection for AI", description: "Custom video data collection for computer vision and multimodal AI across actions, objects, environments and first-person scenarios.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: canonical };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/data-collection">Data Collection</a> / <span>Video Data Collection</span></nav>
      <h1>Video Data Collection Services for Computer Vision &amp; Multimodal AI</h1>
      <p>Capture real-world video around the actions, objects, camera perspectives, environments and temporal patterns your model must understand.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Discuss Your Video Dataset</a></p>
      <section><h2>What Is Video Data Collection for AI?</h2><p>Video data collection records or sources sequences for AI systems that understand motion, actions, events, object behaviour and changing environments over time. Projects can control camera, viewpoint, frame rate, duration, environment, activity and coverage.</p><h3>Collection creates the raw video</h3><p>Frame, tracking, action and temporal labels belong to <a href="/ai-data-services/annotation-labeling/video-annotation">video annotation services</a>.</p></section>
      <section><h2>Custom Video Datasets for Dynamic AI Systems</h2><h3>Human Actions &amp; Activities</h3><p>Scripted or natural action sequences.</p><h3>Object Movement &amp; Interaction</h3><p>Objects moved, handled or assembled.</p><h3>Environment &amp; Scene Video</h3><p>Scenes across time and operating conditions.</p><h3>In-Vehicle &amp; Mobility Video</h3><p>Approved cabin, road and mobility scenarios.</p><h3>Multi-Camera Capture</h3><p>Cross-view recordings of the same activity.</p><h3>Egocentric / First-Person Video</h3><p>Approved wearable capture of tasks and interactions.</p></section>
      <section><h2>Capture the Temporal and Visual Variation Your Model Needs</h2><ul><li>Action or scenario</li><li>Camera viewpoint</li><li>Frame rate and resolution</li><li>Duration</li><li>Lighting and time</li><li>Environment</li><li>Participant or object coverage</li><li>Temporal diversity</li></ul></section>
      <section><h2>How We Collect Video Training Data</h2><ul><li>Remote contributor capture</li><li>Moderated or controlled capture</li><li>Field collection</li><li>Device or rig-specific capture</li><li>Customer-provided or rights-cleared video</li></ul></section>
      <section><h2>Our Video Data Collection Process</h2><ol><li>Use-case definition</li><li>Scenario and capture specification</li><li>Contributor, location and device setup</li><li>Pilot capture</li><li>Collection at scale</li><li>Quality validation</li><li>Secure delivery</li></ol><p><a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation Services</a> → <a href="/ai-data-services/cleaning-validation">Cleaning and Validation</a> → <a href="/ai-data-services/model-testing">Model Testing</a></p></section>
      <section><h2>Quality Validation for Video Training Data</h2><p>Checks can cover integrity, codecs, duration, resolution, frame rate, orientation, blur, exposure, framing, action visibility, scenario compliance, coverage and duplicates.</p></section>
      <section><h2>First-Person Video for Embodied and Physical AI</h2><p>Approved wearable setups can capture everyday actions and object interactions. Deep robotics demonstrations, sensor fusion and VLA projects belong to <a href="/robotics-training-data-services">Robotics Training Data Services</a>.</p></section>
      <section><h2>Video Data for Dynamic Computer Vision and Multimodal AI</h2><p>Action recognition, tracking, gestures, scene understanding, mobility, safety, video-language models and selected physical-AI use cases.</p></section>
      <section><h2>Responsible Collection in Human and Real-World Environments</h2><p>Consent, location permissions, permitted use, access, retention, provenance, metadata minimisation, secure transfer and downstream de-identification are defined where applicable.</p></section>
      <section><h2>Video Formats, Metadata and Delivery</h2><p>Examples include MP4, MOV, WebM, agreed codecs, resolution, frame rate, clip and scenario IDs, device and environment metadata, timestamps, synchronisation metadata, manifests and provenance documents.</p></section>
      <section><h2>Video Data Collection Across Real-World Domains</h2><p>Automotive, retail, workplaces, consumer devices, fitness and a bridge to dedicated robotics programmes.</p></section>
      <section><h2>When Existing Video Libraries Do Not Match Deployment</h2><p>Custom capture helps when actions, viewpoints, devices, rare cases, environments, consented footage, first-person data, provenance or temporal diversity are missing.</p></section>
      <section><h2>What Determines Video Data Collection Cost?</h2><p>Pricing depends on volume, scenarios, participants, locations, cameras, frame rate, resolution, synchronisation, field operations, QA and timeline.</p></section>
      <section><h2>Why Choose eQOURSE for Video Data Collection?</h2><p>Scenario-led specifications, flexible capture models, multi-region coordination, connected downstream services, ISO 9001, ISO 27001 and domain specialists.</p><p><a href="/ai-data-services/data-collection">Explore AI Data Collection Services</a> <a href="/ai-data-services/data-collection/image-data-collection">Image Data Collection</a> <a href="/ai-data-services/data-collection/audio-data-collection">Audio Data Collection</a> <a href="/ai-data-services/data-collection/text-data-collection">Text Data Collection</a></p></section>
      <section><h2>Frequently Asked Questions About Video Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Capture the Video Scenarios Your Model Needs to Understand</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildAnnotationLabelingFallback() {
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
  const services = [
    ["Image Annotation", "Bounding boxes, semantic and instance segmentation, polygons, keypoints and image classification."],
    ["Video Annotation", "Persistent object tracking, frame interpolation, action recognition, event boundaries and multi-camera association."],
    ["Text and NLP Annotation", "Named entities, sentiment, text classification, relation extraction, intent and machine-translation review."],
    ["Audio and Speech Annotation", "Transcription, speaker diarization, emotion, acoustic events, phonetics and wake-word tagging."],
    ["LLM and RLHF Data", "Response ranking, instruction following, safety, factual verification, red teaming and grounding checks."],
    ["3D Point Cloud and LiDAR", "3D cuboids, point segmentation, sensor fusion, tracking and drivable-space labels."],
    ["Document and OCR Annotation", "Layout regions, form fields, table structure, handwriting, invoice parsing and KYC labels."],
    ["Content Moderation and Trust and Safety", "Policy violations, severity tiers, hate and harassment, NSFW, spam and fraud review."],
  ];
  const faq = [
    ["What is data annotation?", "Data annotation adds labels, tags, boundaries or structure to raw data so a machine learning model can learn from it."],
    ["What is the difference between data annotation and data labeling?", "The terms are often interchangeable. Labeling may assign a class to a whole item, while annotation can include richer regions, relationships and attributes."],
    ["What is the difference between data collection and data annotation?", "Collection sources or captures raw data. Annotation adds labels and structure to data that already exists."],
    ["What types of data can eQOURSE annotate?", "Images, video, text, audio and speech, documents, 3D point clouds and human-feedback data for large language models."],
    ["How do you ensure annotation quality?", "Written guidelines, qualification tests, gold sets, agreement measurement, consensus, senior adjudication, multi-pass review and automated validation."],
    ["Do you provide subject-matter experts?", "Yes. Qualified reviewers cover STEM, medical and life sciences, legal, linguistics and education."],
    ["Can you work in our annotation tool?", "Yes. Projects can run in your platform or on tooling provided by eQOURSE."],
    ["What output formats do you deliver?", "COCO, YOLO, Pascal VOC, CVAT XML, JSON, JSONL, CSV, CoNLL, BIO, SRT, VTT, RTTM, Parquet and custom schemas."],
    ["Do you support multilingual annotation?", "Yes. Native-speaker review is available across 30+ languages, including deep Indic-language coverage."],
    ["How much do data annotation services cost?", "Cost depends on task complexity, objects per item, volume, quality tier, language, expertise, turnaround and security."],
    ["How long does a project take?", "A pilot typically runs within the first week; production timing depends on volume, complexity and quality tier."],
    ["How is data kept secure?", "Work runs under ISO 27001 certified processes with NDAs, role-based access, audit trails and controlled retention."],
    ["Can you fix an existing labeled dataset?", "Yes. eQOURSE can audit, quantify errors, repair labels or relabel against a corrected guideline."],
    ["Can collection and annotation run together?", "Yes. Data can move through collection, annotation, cleaning, validation and testing in one workflow."],
    ["Do you support RLHF and LLM evaluation?", "Yes. Work includes preference ranking, instruction following, safety, factuality, citation checks, red teaming and agent trajectory review."],
  ];
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` },
  ]};
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SITE_URL + "/ai-data-services/annotation-labeling#service",
    name: "Data Annotation & Labeling Services",
    serviceType: "AI data annotation and labeling",
    provider: { "@type": "Organization", name: "eQOURSE", url: SITE_URL },
    areaServed: "Worldwide",
    url: SITE_URL + "/ai-data-services/annotation-labeling",
    description: "Managed image, video, text, audio, document, 3D and LLM data annotation with subject-matter experts and multi-tier quality assurance.",
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return `<main data-seo-prerender="true">
    <h1>Data Annotation &amp; Labeling Services for AI and Machine Learning</h1>
    <p>eQOURSE turns raw image, video, text, audio, document and LLM-feedback data into model-ready training data through written guidelines, trained annotators and multi-tier quality review.</p>
    <p>500+ annotation and QA specialists · 30+ languages · ISO 9001 and ISO 27001 certified processes</p>
    <p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is Data Annotation and Labeling?</h2><p>Data annotation adds labels, tags, boundaries or structure to raw data so a machine learning model can learn from it. The quality ceiling of a supervised model is set by its labels, so annotation is a specification problem before it is a labour problem.</p><h3>Data Annotation vs. Data Labeling</h3><p>Labeling often assigns a class to a whole item; annotation can also describe regions, relationships and attributes.</p><h3>Data Collection vs. Data Annotation</h3><p>Collection creates raw data. Annotation adds meaning to existing data.</p><a href="/ai-data-services/data-collection">Explore AI Data Collection Services</a></section>
    <section><h2>Data Annotation Services Across Every Data Type</h2>${services.map(([title, description]) => `<article><h3>${title}</h3><p>${description}</p></article>`).join("")}</section>
    <section><h2>Annotation Task Types We Support</h2><p>Computer vision: bounding boxes, polygons, segmentation, keypoints and cuboids. Video: tracking, interpolation, action and event boundaries. Language: NER, relations, intent, sentiment and relevance. Speech: transcription, diarization and acoustic events. Documents: layout, forms, tables and handwriting. Generative AI: preference ranking, rubric evaluation, factuality, citations and agent trajectories.</p><a href="/ai-data-samples">See annotation samples</a></section>
    <section><h2>Our Data Annotation Process</h2><ol><li>Scope and sample review</li><li>Guideline authoring</li><li>Annotator onboarding and calibration</li><li>Pilot batch</li><li>Production annotation</li><li>Multi-tier quality review</li><li>Delivery and iteration</li></ol></section>
    <section><h2>Multi-Tier QA Framework</h2><p>Gold-standard sets, inter-annotator agreement, consensus and adjudication, multi-pass review, automated validation, documented escalation paths and acceptance criteria agreed during the pilot.</p></section>
    <section><h2>Annotation Guidelines and Edge-Case Handling</h2><p>Guidelines are stress-tested against real samples. New rulings are versioned, dated, distributed to the full team and back-propagated where consistency requires relabeling.</p></section>
    <section><h2>Annotation by Subject-Matter Experts, Not Just Annotators</h2><p>STEM, medical, life-sciences, language, assessment and curriculum experts review tasks where domain judgement—not throughput—sets quality.</p></section>
    <section><h2>Multilingual Annotation Across 30+ Languages, With Deep Indic Coverage</h2><p>Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese and Urdu, including code-mixed and transliterated content.</p></section>
    <section><h2>Tools, Platforms and Output Formats</h2><p>COCO JSON, YOLO, Pascal VOC, CVAT XML, masks, JSONL, CSV, CoNLL, BIO, SRT, VTT, RTTM, Parquet and custom schemas.</p></section>
    <section><h2>Data Security, Privacy and Compliance</h2><p>ISO-certified processes, NDAs, role-based access, controlled environments, PII workflows, audit trails and contract-defined retention and deletion.</p></section>
    <section><h2>Engagement Models</h2><p>Managed projects, dedicated teams, overflow support, and QA or relabeling engagements.</p></section>
    <section><h2>In-House vs. Crowdsourced vs. Managed Annotation</h2><p>eQOURSE combines a retained trained team, expert reviewers, versioned guidelines, gold sets, agreement measurement and scalable delivery.</p></section>
    <section><h2>What Determines Data Annotation Pricing?</h2><p>Task complexity, objects per item, volume, quality tier, language and domain expertise, turnaround, security and guideline maturity.</p></section>
    <section><h2>Data Annotation for Every Industry</h2><p>Automotive, healthcare, retail, robotics, agriculture, finance, media and education.</p></section>
    <section><h2>One AI Data Workflow, From Collection to Model Testing</h2><p><a href="/ai-data-services/data-collection">Collect</a> → Annotate → <a href="/ai-data-services/cleaning-validation">Clean and Validate</a> → <a href="/ai-data-services/model-testing">Test</a> → Improve</p><a href="/robotics-training-data-services">Robotics Training Data Services</a></section>
    <section><h2>See the Work</h2><p><a href="/ai-data-samples">Annotation samples</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
    <section><h2>Why Choose eQOURSE for Data Annotation</h2><p>Subject-matter experts, complete AI data workflows, guideline-first delivery, Indic language depth, 500+ specialists, ISO-certified processes and a free pilot.</p></section>
    <section><h2>Frequently Asked Questions About Data Annotation</h2>${faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}</section>
    <section><h2>Turn Your Raw Data Into Model-Ready Training Data</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
    <script type="application/ld+json">${json(serviceSchema)}</script><script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(faqSchema)}</script>
  </main>`;
}

function buildLlmRlhfFallback() {
  const services = [
    ["Preference Ranking & RLHF Data", "Pairwise and list-wise model-output comparison with optional reviewer rationale."],
    ["SFT & Instruction Data Creation", "Human-authored prompts, gold responses, rewrites and task distributions."],
    ["Rubric-Based Response Evaluation", "Multi-dimensional scoring against anchored evaluation criteria."],
    ["Factuality & Hallucination Review", "Claim-level verification, source checks and fabrication detection."],
    ["RAG Grounding & Citation Verification", "Answer-context alignment, citation accuracy and retrieval relevance."],
    ["Safety, Toxicity & Policy Classification", "Policy taxonomy labels, harm categories and severity tiers."],
    ["Red Teaming & Adversarial Prompts", "Jailbreak, prompt-injection and refusal-boundary testing."],
    ["Agent Trajectory & Tool-Use Evaluation", "Step correctness, tool choice, recovery and end-to-end success."],
    ["Multi-Turn Conversation Evaluation", "Context retention, consistency, persona adherence and conversation success."],
    ["Model Comparison & Benchmarking", "Blind A/B evaluation, win rates and regression detection."],
    ["Domain-Expert Review", "Qualified reviewers for STEM, medical, legal, finance, education and code."],
    ["Multilingual LLM Evaluation", "Native-speaker evaluation across 30+ languages and code-mixed input."],
  ];
  const faqs = [
    ["What is RLHF?", "Reinforcement Learning from Human Feedback trains a language model on human preferences by learning from reviewers who compare or score model outputs."],
    ["What is the difference between SFT, RLHF and DPO?", "SFT teaches how to respond from curated examples. RLHF and DPO use human preference pairs to teach which response is better; DPO skips the separate reward model."],
    ["What LLM data services does eQOURSE provide?", "Preference ranking, SFT data, rubric evaluation, factuality and RAG review, safety classification, red teaming, agent evaluation, benchmarking and multilingual evaluation."],
    ["Do you provide subject-matter experts?", "Yes. Qualified reviewers cover STEM, education, medical and life sciences, legal, finance, software and linguistics."],
    ["How do you measure quality when there is no single right answer?", "Inter-rater reliability, blind duplicate sampling, expert gold sets, anchored rubrics, bias controls and senior adjudication."],
    ["What is agent trajectory evaluation?", "It reviews a multi-step agent run for tool selection, call structure, reasoning continuity, recovery and task success."],
    ["Can you help design our evaluation rubric?", "Yes. eQOURSE defines dimensions, scales, anchor examples and tie-break rules, then stress-tests them in calibration."],
    ["What formats do you deliver in?", "JSONL preference pairs, chat-format SFT data, rubric scores, conversations, agent traces, red-team result sets and custom schemas."],
    ["Do you support red teaming?", "Yes. Human-written jailbreaks, prompt injection, refusal probing and domain-specific attacks can be labeled by category and severity."],
    ["Which languages do you support?", "30+ languages with deep Indic coverage including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi and Urdu."],
    ["How much does RLHF data cost?", "Cost depends on reviewer qualification, complexity, response length, rubric maturity, agreement target, language and turnaround."],
    ["How do you keep our model outputs and prompts confidential?", "ISO 27001 processes, NDAs, named pools, role-based access, audit trails, controlled environments and contract-defined retention protect client data."],
    ["Can you evaluate our model against a competitor's?", "Yes. Blind side-by-side comparison uses randomized response order with win-rate and dimension-level reporting."],
    ["How do we start?", "Share a sample set and evaluation goal for a free pilot, rubric draft and inter-rater agreement report."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${SITE_URL}/ai-data-services/annotation-labeling/llm-rlhf-annotation#service`, name: "RLHF & LLM Data Annotation Services", serviceType: "RLHF and LLM Data Annotation", url: `${SITE_URL}/ai-data-services/annotation-labeling/llm-rlhf-annotation`, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "LLM and RLHF Data Services", itemListElement: services.map(([name]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "LLM & RLHF Data", item: `${SITE_URL}/ai-data-services/annotation-labeling/llm-rlhf-annotation` }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return `<main data-seo-prerender="true">
    <h1>RLHF &amp; LLM Data Annotation Services for Model Alignment</h1><p>eQOURSE builds preference rankings, SFT datasets, rubric evaluations, factuality checks, safety labels and red-team prompts with subject-matter experts across 30+ languages.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is RLHF and LLM Data Annotation?</h2><p>Reinforcement Learning from Human Feedback teaches a language model which responses people prefer. LLM annotation also creates instruction-response pairs, verifies factuality and citations, classifies safety and probes model failures.</p><h3>SFT, RLHF and DPO: What's the Difference?</h3><p>SFT teaches how to respond. RLHF and DPO teach which response is better using human preference pairs.</p><h3>Why Human Feedback Still Matters</h3><p>Qualified human reviewers catch specialist errors, cultural nuance and novel failures that synthetic feedback misses.</p></section>
    <section><h2>LLM Data Services We Deliver</h2>${services.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</section>
    <section><h2>Why Subject-Matter Experts Change the Result</h2><p>Technical fluency is not technical correctness. eQOURSE assigns trained annotators, senior reviewers or subject-matter experts according to the judgement required.</p></section>
    <section><h2>Expert Domains We Cover</h2><p>STEM and mathematics, education and pedagogy, medical and life sciences, legal and compliance, finance and business, software and code, linguistics and translation.</p></section>
    <section><h2>How an LLM Data Project Runs</h2><ol><li>Objective and task definition</li><li>Rubric design</li><li>Reviewer qualification</li><li>Calibration</li><li>Pilot batch</li><li>Production evaluation</li><li>Delivery and iteration</li></ol></section>
    <section><h2>Quality Control When There Is No Single Right Answer</h2><p>Inter-rater reliability, blind duplicates, gold sets, rubric anchors, adjudication, bias controls, rationale capture and agreement reporting.</p></section>
    <section><h2>Multilingual LLM Evaluation Across 30+ Languages</h2><p>Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese and Urdu, including romanised, transliterated and code-mixed input.</p></section>
    <section><h2>Data Formats and Delivery</h2><p>JSONL preference pairs, SFT chat arrays, rubric scores, conversation threads, agent traces, red-team results and custom schemas delivered securely.</p></section>
    <section><h2>Works With Your Evaluation Stack</h2><p>Projects can run in your platform, custom harness or client-controlled environment.</p></section>
    <section><h2>Security, IP and Confidentiality</h2><p>ISO-certified processes, NDAs, named reviewer pools, role-based access, audit trails, controlled retention and client IP assignment.</p></section>
    <section><h2>Engagement Models</h2><p>Managed evaluation, dedicated expert pools, continuous evaluation, surge capacity, and rubric and QA consulting.</p></section>
    <section><h2>What Determines RLHF and LLM Data Cost?</h2><p>Reviewer qualification, complexity, response length, rubric maturity, agreement target, language, turnaround and security tier.</p></section>
    <section><h2>Who We Build LLM Data For</h2><p>Foundation model teams, enterprise fine-tuning teams, RAG builders, AI agent teams, EdTech products and regulated industries.</p></section>
    <section><h2>Related AI Data Services</h2><p><a href="/ai-data-services/annotation-labeling/text-nlp-annotation">Text &amp; NLP Annotation</a> <a href="/ai-data-services/annotation-labeling/content-moderation">Content Moderation</a> <a href="/ai-data-services/data-collection/text-data-collection">Text Data Collection for LLMs</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-services/annotation-labeling">All Annotation Services</a></p></section>
    <section><h2>See the Work</h2><p><a href="/ai-data-samples/rlhf">RLHF samples</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
    <section><h2>Why Choose eQOURSE for RLHF and LLM Data</h2><p>Subject-matter experts, rubric-first delivery, agreement reporting, Indic-language depth, named pools, a full AI data pipeline and a free pilot.</p></section>
    <section><h2>Frequently Asked Questions About RLHF &amp; LLM Data</h2>${faqs.map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Align Your Model With Expert Human Feedback</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
  </main>`;
}

function buildImageAnnotationFallback() {
  const types = ["Bounding Box Annotation", "Rotated and Oriented Boxes", "Polygon and Polyline Annotation", "Semantic Segmentation", "Instance Segmentation", "Panoptic Segmentation", "Keypoint and Landmark Annotation", "Image Classification and Multi-label Tagging", "Attribute and Metadata Tagging", "Text Region Labeling in Images"];
  const faqs = [
    ["What is image annotation?", "Image annotation adds machine-readable boxes, outlines, masks, keypoints or class tags to still images so computer vision models can learn to recognise objects, shapes and scenes."],
    ["What is the difference between bounding box and polygon annotation?", "Bounding boxes mark approximate object location quickly. Polygons trace the actual outline and are used when shape matters."],
    ["What is the difference between semantic and instance segmentation?", "Semantic segmentation assigns pixels by class. Instance segmentation gives every object its own mask."],
    ["How do you measure image annotation quality?", "eQOURSE uses IoU scoring, gold sets, inter-annotator agreement, consensus, second-pass review and automated validation."],
    ["What output formats do you deliver?", "COCO JSON, YOLO, Pascal VOC, CVAT XML, PNG masks, RLE masks, JSON, CSV, TFRecord, Parquet and custom schemas."],
    ["How do we start?", "Share representative images, your label schema and accuracy target for a free pilot with a QA report."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${SITE_URL}/ai-data-services/annotation-labeling/image-annotation#service`, name: "Image Annotation Services", serviceType: "Computer Vision Image Annotation", url: `${SITE_URL}/ai-data-services/annotation-labeling/image-annotation`, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "Image Annotation Services", itemListElement: types.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "Image Annotation", item: `${SITE_URL}/ai-data-services/annotation-labeling/image-annotation` }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return `<main data-seo-prerender="true">
    <h1>Image Annotation Services for Computer Vision and Visual AI</h1><p>Pixel-accurate annotation for object detection, segmentation, pose estimation and classification with documented edge-case rules and multi-tier quality review.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is Image Annotation?</h2><p>Image annotation adds machine-readable labels to still images. Boxes teach approximate location, masks teach exact shape, keypoints teach structure and image labels teach scene-level categories.</p><h3>Image Annotation vs. Image Labeling</h3><p>Labeling commonly means a whole-image class; annotation includes spatial boxes, polygons, masks and keypoints.</p><h3>Image Annotation vs. Image Data Collection</h3><p>Collection captures new images. Annotation structures images you already have. <a href="/ai-data-services/data-collection/image-data-collection">Explore Image Data Collection</a>.</p></section>
    <section><h2>Image Annotation Types We Deliver</h2>${types.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Guideline-led visual labels delivered to the geometry, class and attribute rules agreed in the pilot.</p></article>`).join("")}</section>
    <section><h2>Which Image Annotation Type Do You Need?</h2><p>Choose classification for image-level categories, boxes for detection, polygons for tight outlines, semantic masks for class areas, instance masks for separate objects, panoptic masks for complete scenes, and keypoints for pose or structure.</p><h3>Bounding Box or Polygon?</h3><p>Use boxes when location is enough and polygons when shape matters.</p><h3>Semantic or Instance Segmentation?</h3><p>Semantic masks map area by class; instance masks preserve separate objects.</p></section>
    <section><h2>Our Image Annotation Process</h2><ol><li>Sample review</li><li>Guideline authoring</li><li>Annotator calibration</li><li>Pilot batch</li><li>Production</li><li>Multi-tier QA</li><li>Delivery and iteration</li></ol></section>
    <section><h2>How We Keep Image Annotation Accurate</h2><p>IoU monitoring, gold sets, inter-annotator agreement, consensus, adjudication, second-pass review, automated geometry validation, class-balance reporting and pilot-defined acceptance criteria.</p></section>
    <section><h2>Occlusion, Truncation and the Cases That Break Datasets</h2><p>Written rules cover occlusion, truncation, crowds, small objects, ambiguous classes, reflections, poor exposure and overlapping instances.</p></section>
    <section><h2>Tools, Platforms and Output Formats</h2><p>COCO JSON, YOLO, Pascal VOC, CVAT XML, PNG and RLE masks, JSON, CSV, TFRecord, Parquet and custom schemas, with a manifest, QA report and versioned guideline.</p></section>
    <section><h2>Image Annotation Across Industries</h2><p>Automotive, retail, manufacturing, agriculture, healthcare, construction, security and <a href="/robotics-training-data-services">robotics</a>.</p></section>
    <section><h2>Model-Assisted Pre-Labeling</h2><p>Human reviewers can correct model suggestions while quality is measured against the same expert ground truth as manual work.</p></section>
    <section><h2>Data Security and Compliance</h2><p>ISO-certified processes, NDAs, role-based access, audit trails, secure environments, PII redaction and contract-defined retention.</p></section>
    <section><h2>What Determines Image Annotation Cost?</h2><p>Annotation type, object count, taxonomy complexity, precision target, scene density, QA tier, volume, expertise, turnaround and security.</p></section>
    <section><h2>Related AI Data Services</h2><p><a href="/ai-data-services/data-collection/image-data-collection">Image Data Collection</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning and Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-services/annotation-labeling">All Annotation Services</a></p></section>
    <section><h2>Why Choose eQOURSE for Image Annotation?</h2><p>Guideline-first delivery, measured quality, full-pipeline support, 500+ specialists, ISO-certified processes and a free pilot.</p></section>
    <section><h2>Frequently Asked Questions About Image Annotation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Get Your Images Annotated for Production</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
  </main>`;
}

function buildVideoAnnotationFallback() {
  const services = ["Object Tracking with Persistent IDs", "Frame-by-Frame Bounding Boxes", "Keyframe Annotation with Interpolation", "Video Instance Segmentation", "Action and Activity Recognition", "Temporal Event Segmentation", "Trajectory Annotation", "Pose and Skeletal Tracking", "Multi-Camera Re-Identification", "Video Classification"];
  const faqs = [
    ["What is video annotation?", "Video annotation labels objects, actions and events across frames so a model learns how things move and change over time while each object keeps a consistent identity."],
    ["What is the difference between video annotation and image annotation?", "Video annotation adds identity persistence, temporal consistency and annotation-frequency decisions across a sequence."],
    ["Do you annotate every frame?", "Usually not. Keyframe interpolation with human review is the default for many projects; the pilot compares two frequencies."],
    ["How do you measure video annotation quality?", "ID switch rate, track fragmentation, temporal consistency, interpolation verification, keyframe IoU, completeness audits and full-sequence review."],
    ["What output formats do you deliver?", "MOT Challenge, COCO-Video, CVAT XML, YOLO, Pascal VOC, JSON, CSV, PNG masks, SRT, VTT and custom schemas."],
    ["How do we start?", "Share two to five representative minutes, the class list and accuracy target for a free pilot with track-level metrics."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${SITE_URL}/ai-data-services/annotation-labeling/video-annotation#service`, name: "Video Annotation Services", serviceType: "Video Annotation and Labeling", url: `${SITE_URL}/ai-data-services/annotation-labeling/video-annotation`, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "Video Annotation Services", itemListElement: services.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "Video Annotation", item: `${SITE_URL}/ai-data-services/annotation-labeling/video-annotation` }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return `<main data-seo-prerender="true"><h1>Video Annotation Services for Object Tracking and Video AI</h1><p>Frame-accurate tracking with persistent identities, precise action boundaries and a measured annotation frequency.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is Video Annotation?</h2><p>Video annotation labels objects, actions and events across a sequence while preserving identity through occlusion and re-entry.</p><h3>Video Annotation vs. Image Annotation</h3><p>Video adds identity persistence, temporal consistency and annotation frequency. <a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation Services</a> cover independent frames.</p><h3>Video Annotation vs. Video Data Collection</h3><p>Collection captures footage; annotation labels existing footage. <a href="/ai-data-services/data-collection/video-data-collection">Video Data Collection Services</a></p></section>
  <section><h2>Video Annotation Types We Deliver</h2>${services.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Guideline-led temporal labels delivered to the identity, geometry and boundary rules agreed in the pilot.</p></article>`).join("")}</section>
  <section><h2>How Many Frames Do You Actually Need Annotated?</h2><p>Every frame, every nth frame, keyframe plus interpolation, adaptive frequency and event-triggered labeling offer different cost and accuracy trade-offs.</p><h3>How We Recommend a Frequency</h3><p>We annotate one clip at two frequencies and measure the positional accuracy difference.</p></section>
  <section><h2>Our Video Annotation Process</h2><ol><li>Sample review</li><li>Guidelines</li><li>Frequency calibration</li><li>Annotator calibration</li><li>Pilot</li><li>Production with temporal QA</li><li>Delivery and iteration</li></ol></section>
  <section><h2>How We Measure Video Annotation Quality</h2><p>ID switch rate, fragmentation, temporal consistency, interpolation checks, keyframe IoU, completeness, gold clips, full-sequence review and automated validation.</p></section>
  <section><h2>The Hard Part: Keeping Identity Through Occlusion</h2><p>Versioned rules cover occlusion, re-entry, crowd ambiguity, camera cuts, fast motion, partial entry, drift and static objects.</p></section>
  <section><h2>Tools, Platforms and Output Formats</h2><p>MOT, COCO-Video, CVAT, YOLO, Pascal VOC, JSON, CSV, masks, SRT, VTT and custom schemas with track-level QA reports.</p></section>
  <section><h2>Video Annotation Across Industries</h2><p>Automotive, retail, sports, manufacturing, security, healthcare, <a href="/robotics-training-data-services">robotics</a> and agriculture.</p></section>
  <section><h2>Model-Assisted Tracking</h2><p>Pre-generated tracks receive human full-sequence correction and the same ground-truth measurement as manual work.</p></section>
  <section><h2>Data Security and Compliance</h2><p>ISO-certified processes, NDAs, controlled access, redaction, audit trails and contract-defined deletion.</p></section>
  <section><h2>What Determines Video Annotation Cost?</h2><p>Frequency, method, objects, frame rate, motion, occlusion, track duration, QA, turnaround and security.</p></section>
  <section><h2>Related AI Data Services</h2><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> <a href="/ai-data-services/data-collection/video-data-collection">Video Data Collection</a> <a href="/ai-data-services/cleaning-validation">Cleaning and Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a></p></section>
  <section><h2>Why Choose eQOURSE for Video Annotation?</h2><p>Track-level metrics, measured frequency, full-sequence review, guideline-first delivery, 500+ specialists and ISO-certified processes.</p></section>
  <section><h2>Frequently Asked Questions About Video Annotation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
  <section><h2>Get Your Video Annotated for Production</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></main>`;
}

function buildDocumentOcrAnnotationFallback() {
  const services = ["Document Layout and Region Annotation", "Key-Value Pair Extraction", "Table Structure Recognition", "Line-Item Extraction", "Form Field and Checkbox Annotation", "Handwriting Transcription", "Signature, Stamp and Seal Detection", "Document Classification and Multi-Page Splitting", "Reading Order Annotation", "Entity Extraction in Documents", "PII Identification and Redaction Marking", "OCR Ground-Truth Transcription"];
  const faqs = [
    ["What is document annotation?", "Document annotation labels document structure and meaning, including fields, tables, reading order and document boundaries."],
    ["What is the difference between OCR and document annotation?", "OCR converts pixels into characters. Document annotation adds field relationships, table structure and reading order."],
    ["How do you handle borderless tables?", "Rows, columns, headers, merged cells and spanning cells are represented explicitly and scored at cell level."],
    ["Can you handle handwritten documents?", "Yes. Handwriting is transcribed at line or word level with confidence flags for ambiguous or illegible content."],
    ["What output formats do you deliver?", "JSON, JSONL, hOCR, ALTO XML, PAGE XML, FUNSD, DocVQA, CoNLL, COCO regions, CSV, Excel, searchable PDF and custom schemas."],
    ["How do we start?", "Share representative documents and the extraction schema for a pilot with field-level quality reporting."],
  ];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/document-ocr-annotation`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: "Document & OCR Annotation Services", serviceType: "Document and OCR Annotation", url, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "Document and OCR Annotation Services", itemListElement: services.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "Document & OCR Annotation", item: url }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return `<main data-seo-prerender="true"><h1>Document &amp; OCR Annotation Services for Document AI and IDP</h1><p>Layout regions, key-value pairs, table structure, handwriting and form fields built on publishing and digital-conversion expertise.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is Document &amp; OCR Annotation?</h2><p>Document annotation teaches models what text says, where it sits and how it relates structurally. OCR ground truth measures character recognition; document annotation adds fields, tables and reading order.</p></section>
  <section><h2>Document Annotation Types We Deliver</h2>${services.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Position-aware labels produced to a versioned schema and field-level acceptance target.</p></article>`).join("")}</section>
  <section><h2>Document Types We Work With</h2><p>Invoices, receipts, KYC, claims, contracts, trade paperwork, medical forms, transcripts, mark sheets and archival records.</p></section>
  <section><h2>Document Structure Is Already Our Core Business</h2><p>Publishing production, <a href="/digital-conversion">Digital Conversion</a>, <a href="/image-processing">Image Processing</a>, <a href="/metadata-services">Metadata Services</a> and <a href="/editorial-publishing-designing-services">Editorial &amp; Publishing</a> establish eQOURSE's page-structure expertise.</p></section>
  <section><h2>Our Document Annotation Process</h2><ol><li>Sample and schema review</li><li>Guideline authoring</li><li>Template coverage mapping</li><li>Team calibration</li><li>Pilot batch</li><li>Production with field-level QA</li><li>Delivery and iteration</li></ol></section>
  <section><h2>How We Measure Document Annotation Quality</h2><p>Per-field accuracy, CER and WER, table-cell accuracy, normalisation checks, gold documents, double-entry and template audits.</p></section>
  <section><h2>Tables, Handwriting and the Problems That Break Document Pipelines</h2><p>Versioned rulings cover borderless tables, mixed handwriting, complex reading order and multi-page document boundaries.</p></section>
  <section><h2>Handling Sensitive Documents</h2><p>PII classification, masking, pseudonymisation, restricted environments, vetted teams, audit trails and contract-defined deletion.</p></section>
  <section><h2>Output Formats and Delivery</h2><p>JSON, hOCR, ALTO XML, PAGE XML, FUNSD, DocVQA, CoNLL, COCO regions, CSV, Excel, searchable PDF and custom schemas.</p></section>
  <section><h2>OCR-Assisted Annotation</h2><p>Human correction accelerates clean printed documents; manual transcription replaces pre-fill where it reduces accuracy. OCR ground truth remains independent.</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> <a href="/ai-data-services/cleaning-validation">Cleaning and Validation</a> <a href="/ai-data-samples">Annotation samples</a> <a href="/casestudy">Case studies</a></p></section>
  <section><h2>Frequently Asked Questions About Document &amp; OCR Annotation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
  <section><h2>Build the Training Data Behind Your Document AI</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></main>`;
}

function buildPointCloudLidarAnnotationFallback() {
  const services = ["3D Cuboid Annotation","Point-Level Semantic Segmentation","3D Instance Segmentation","Multi-Sweep Object Tracking","Camera-LiDAR Sensor Fusion","Radar and Multi-Sensor Fusion","3D Lane and Road Marking","Drivable and Free Space","Ground and Surface Classification","3D Keypoints and Pose","Occupancy Grid Labeling","Aerial and Survey Point Clouds"];
  const faqs = [
    ["What is 3D point cloud annotation?","3D point cloud annotation labels LiDAR or depth-sensor data through oriented cuboids, point classes, surfaces and persistent tracks."],
    ["What is the difference between a 3D cuboid and a 2D bounding box?","A 3D cuboid adds physical position, dimensions and yaw to the image-plane location represented by a 2D box."],
    ["Why does calibration matter for 3D annotation?","Incorrect extrinsic calibration makes correct geometry project incorrectly into a camera view. Calibration must be validated before production."],
    ["How do you measure 3D annotation quality?","We report 3D IoU plus translation, dimension and heading error separately, track consistency, fusion agreement and accuracy by distance band."],
    ["What formats do you support?","Inputs include PCD, LAS or LAZ, PLY, KITTI BIN, ROS bag and E57; outputs include KITTI, nuScenes, Waymo-style, SUSTechPOINTS and custom schemas."],
    ["How do we start?","Share 20 to 50 difficult frames, calibration files and your schema for a measured pilot."],
  ];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${url}#service`,name:"3D Point Cloud & LiDAR Annotation Services",serviceType:"3D Point Cloud and LiDAR Annotation",url,description:"3D point cloud and LiDAR annotation for autonomous systems and robotics with calibration validation and component-level geometric QA.",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:"Worldwide",hasOfferCatalog:{"@type":"OfferCatalog",name:"3D Point Cloud and LiDAR Annotation Services",itemListElement:services.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Annotation & Labeling",item:`${SITE_URL}/ai-data-services/annotation-labeling`},{"@type":"ListItem",position:4,name:"3D Point Cloud & LiDAR Annotation",item:url}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/annotation-labeling">Data Annotation &amp; Labeling</a> / <span>3D Point Cloud &amp; LiDAR</span></nav><h1>3D Point Cloud &amp; LiDAR Annotation Services for Autonomous Systems</h1><p>3D cuboids, point segmentation, multi-sweep tracking and camera-LiDAR fusion delivered with calibration validation and component-level geometric QA.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is 3D Point Cloud &amp; LiDAR Annotation?</h2><p>Annotation gives sparse sensor geometry meaning through objects, surfaces, drivable regions and tracks. A 3D cuboid records x, y and z position, physical dimensions and heading.</p><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> and <a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation</a> cover 2D-only work.</p></section>
  <section><h2>3D Annotation Types We Deliver</h2>${services.map(name=>`<article><h3>${escapeHtml(name)}</h3><p>Spatial labels delivered to a versioned coordinate and geometry specification.</p></article>`).join("")}</section>
  <section><h2>Fusion Is a Calibration Problem Before Annotation Begins</h2><p>We validate extrinsics, temporal synchronisation, ego-motion compensation, intrinsic distortion and long-capture drift before production. Projection agreement separates calibration error from annotation error.</p></section>
  <section><h2>Our 3D Annotation Process</h2><ol><li>Sensor review and calibration validation</li><li>Schema and guideline authoring</li><li>Annotator qualification</li><li>Pilot with geometric metrics</li><li>Production annotation</li><li>Multi-tier 3D and projection review</li><li>Delivery and iteration</li></ol></section>
  <section><h2>How We Measure 3D Annotation Quality</h2><p>3D IoU, translation error, dimensions, heading, ID switches, fragmentation, fusion projection agreement, point inclusion, ground-plane consistency and distance-band reporting.</p></section>
  <section><h2>What the Sensor Can and Cannot Tell You</h2><p>Minimum point thresholds, occlusion rules, weather artefacts, reflective surfaces, ground ambiguity, heading ambiguity and sensor-specific density are documented before scale. Unsupported geometry is flagged rather than invented.</p></section>
  <section><h2>Output Formats and Delivery</h2><p>PCD, LAS, LAZ, PLY, KITTI BIN, ROS bag and E57 inputs; KITTI, nuScenes, Waymo-style, SUSTechPOINTS, JSON, point-wise labels, CSV cuboids and custom outputs with coordinate conventions confirmed in the pilot.</p></section>
  <section><h2>Where 3D Annotation Is Used</h2><p>Autonomous vehicles, ADAS, warehouse robotics, drones, surveying, construction, mining, agriculture, smart cities and rail. Explore <a href="/robotics-training-data-services">Robotics Training Data Services</a>.</p></section>
  <section><h2>Model-Assisted Annotation, Security and Cost</h2><p>Pre-generation is measured by distance-band recall and avoided where it biases rare, far-field or benchmark data. Secure projects use vetted access, audit trails and defined retention. Cost depends on label type, objects, density, tracking, fusion, thresholds and scene difficulty.</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/data-collection">AI Data Collection</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-samples/computer-vision">Computer vision samples</a> <a href="/casestudy">Case studies</a></p></section>
  <section><h2>Frequently Asked Questions About 3D &amp; LiDAR Annotation</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Annotate Your Sensor Data for Production Perception</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildAudioSpeechAnnotationFallback() {
  const services = ["Verbatim Transcription", "Clean and Normalised Transcription", "Timestamping and Segmentation", "Forced Alignment", "Speaker Diarization", "Speaker Identification and Voice Matching", "Language and Dialect Identification", "Emotion and Tone Labeling", "Acoustic Event Classification", "Phonetic Transcription", "Wake Word and Keyword Spotting", "Voice Intent and Slot Labeling", "Audio Quality Rating", "TTS Data QC and Prosody Review"];
  const faqs = [
    ["What is audio annotation?", "Audio annotation turns recorded sound into structured data: what was said, who said it, when and how they said it, and which non-speech sounds were present."],
    ["What is the difference between verbatim and clean transcription?", "Verbatim preserves fillers, false starts and stutters. Clean transcription removes disfluencies and normalises numbers and dates."],
    ["What is speaker diarization?", "Speaker diarization determines who spoke when and maintains consistent speaker identities through overlap and interruption."],
    ["How do you measure speech annotation quality?", "We report WER, DER, timestamp accuracy, speaker consistency, style-guide conformance, hidden gold clips and second-pass listening review."],
    ["Do you handle Indian regional languages, accents and code-switched speech?", "Yes. Alongside global-language delivery, our India-wide coverage includes regional languages, regional Indian English, dialects, mixed-language speech, register and lower-resource varieties."],
    ["Which languages do you support?", "We support 30+ global languages, with comprehensive coverage across India's regional languages, accents, dialects and code-switched speech."],
    ["How do we start?", "Share 30 to 60 minutes of representative difficult audio and your style requirements for a measured pilot and throughput estimate."],
  ];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/audio-speech-annotation`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: "Audio & Speech Annotation Services", serviceType: "Audio and Speech Annotation", description: "Multilingual audio and speech annotation across 30+ global languages, with comprehensive Indian regional-language, accent and code-switching coverage.", url, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", availableLanguage: ["en","es","fr","de","pt","ar","zh","ja","ko","id","ms","th","vi","hi","bn","ta","te","mr","gu","kn","ml","pa","or","as","ur"], hasOfferCatalog: { "@type": "OfferCatalog", name: "Audio and Speech Annotation Services", itemListElement: services.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "Audio & Speech Annotation", item: url }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([q,a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ] };
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/annotation-labeling">Data Annotation &amp; Labeling</a> / <span>Audio &amp; Speech Annotation</span></nav><h1>Audio &amp; Speech Annotation Services for Voice AI and ASR</h1><p>Transcription, speaker diarization, timing, emotion, acoustic events and phonetic labeling across 30+ global languages, with comprehensive Indian regional-language coverage.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is Audio &amp; Speech Annotation?</h2><p>Audio annotation turns recorded sound into machine-readable data: what was said, who said it, when they said it, how they said it and what else was audible.</p><p><a href="/ai-data-services/data-collection/audio-data-collection">Audio Data Collection</a> creates the recording; <a href="/ai-data-services/annotation-labeling/text-nlp-annotation">Text &amp; NLP Annotation</a> adds meaning after transcription.</p></section>
  <section><h2>Audio &amp; Speech Annotation Types We Deliver</h2>${services.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Native-listener labels delivered to a versioned speech style guide.</p></article>`).join("")}</section>
  <section><h2>Choose Verbatim or Clean Before Annotation Starts</h2><p>Verbatim preserves fillers, false starts, repetitions and stutters for ASR. Clean transcription normalises spoken language for search, subtitles and readable archives.</p></section>
  <section><h2>Our Audio Annotation Process</h2><ol><li>Sample and use-case review</li><li>Style guide and schema</li><li>Native-listener calibration</li><li>Pilot and error analysis</li><li>Production annotation</li><li>Listening QA and adjudication</li><li>Secure delivery and iteration</li></ol></section>
  <section><h2>Speech Annotation Quality You Can Measure</h2><p>Raw and normalised word error rate, character error rate, diarization error rate, timestamp tolerance, speaker consistency, blind gold clips and second-pass listening review.</p></section>
  <section><h2>Global Language Coverage with India's Regional Depth</h2><p>We support 30+ global languages across European, Asian and Middle Eastern markets. Our specialist advantage is comprehensive coverage across India's regional languages, accents, dialects and code-switched speech.</p></section>
  <section><h2>Formats, Audio Handling and Use Cases</h2><p>JSON, JSONL, RTTM, CTM, TextGrid, SRT, VTT, Kaldi, Hugging Face, ELAN EAF, CSV, TSV and custom schemas for ASR, call analytics, TTS, healthcare, acoustic events and accessibility.</p><p><a href="/subtitling-services">Subtitling Services</a> <a href="/accessible-media-enhancements">Accessible Media Enhancements</a></p></section>
  <section><h2>ASR Assistance, Voice Security and Cost</h2><p>Machine transcription is used only where it improves throughput and every assisted batch receives listening review. Voice data uses controlled access, audit trails, PII controls and contract-defined retention.</p><h3>Real-time ratio planning ranges</h3><p>Clean single-speaker audio is commonly 2 to 4 times real time; structured multi-speaker audio 4 to 8 times; difficult overlap, accents and word timing may exceed 10 times. A pilot confirms the actual ratio.</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-samples/audio-speech">Audio samples</a> <a href="/casestudy">Case studies</a></p></section>
  <section><h2>Frequently Asked Questions About Audio &amp; Speech Annotation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
  <section><h2>Turn Your Audio Into Model-Ready Speech Data</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></main>`;
}

function buildContentModerationFallback() {
  const services = ["Text and Comment Moderation", "Image Moderation", "Video Moderation", "Audio Moderation", "Profile and Identity Review", "Marketplace and Listing Moderation", "Spam, Scam and Fraud Detection", "Brand Safety and Ad Review", "Appeals and Escalation Review", "Policy Taxonomy Design", "Multilingual Content Moderation"];
  const faqs = [
    ["What is content moderation?", "Content moderation reviews user-generated content against platform policy and decides whether to leave, restrict, remove or escalate it."],
    ["What types of content can eQOURSE moderate?", "Text, images, video, audio, profiles, listings, advertising creative, spam, scam and fraud across 30+ languages."],
    ["What is the difference between content moderation and building a moderation model?", "Training a classifier is a finite annotation project. Running a live policy queue is an ongoing operation with coverage, latency and escalation commitments."],
    ["Why are human moderators needed?", "People handle uncertain, context-dependent, novel and appealed cases while automation handles confident high-volume decisions."],
    ["How do you protect moderator wellbeing?", "Safeguards include exposure limits, queue rotation, proactive confidential clinical support, exposure-reducing tools, informed consent and the right to step away."],
    ["How is moderation quality measured?", "False positives and false negatives are separated, with per-category precision and recall, borderline agreement, appeal overturn rate, hidden gold cases and SLA latency."],
    ["What is a severity tier?", "Severity tiers distinguish intensity within a policy category and map each category-tier pair to a proportionate action."],
    ["Do you handle child sexual abuse material?", "No. eQOURSE does not accept CSAM review or classification work. Specialist legally structured organisations and relevant authorities must handle it."],
    ["Can you moderate in languages other than English?", "Yes. Native-language moderation is available across 30+ global languages with India-wide regional-language, dialect and code-mixed depth."],
    ["Can you provide 24/7 coverage?", "Yes. Coverage can be designed for business hours, extended hours or 24/7 operations with severity-based latency targets."],
    ["Can you help write a content policy?", "Yes. We design and stress-test categories, severity tiers, action mapping, context modifiers and worked examples."],
    ["How much does content moderation cost?", "Cost depends on volume, content type, complexity, severity, coverage, latency, languages, appeals, policy maturity and security."],
  ];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/content-moderation`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${url}#service`,name:"Content Moderation & Trust and Safety Services",serviceType:"Content Moderation and Trust and Safety",url,description:"Human content moderation with severity-tiered policy enforcement, appeals, multilingual context and moderator wellbeing safeguards.",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:"Worldwide",availableLanguage:["en","hi","bn","ta","te","mr","gu","kn","ml","pa","or","as","ur","es","fr","de","pt","ar","zh","ja","ko","id","th","vi"],hasOfferCatalog:{"@type":"OfferCatalog",name:"Content Moderation Services",itemListElement:services.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Annotation & Labeling",item:`${SITE_URL}/ai-data-services/annotation-labeling`},{"@type":"ListItem",position:4,name:"Content Moderation",item:url}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/annotation-labeling">Data Annotation &amp; Labeling</a> / <span>Content Moderation</span></nav><h1>Content Moderation &amp; Trust and Safety Services</h1><p>Human moderation across text, image, video and audio with severity-tiered policy enforcement, appeals and escalation in 30+ languages.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Trust &amp; Safety Specialist</a></p>
  <section><h2>What Is Content Moderation?</h2><p>Content moderation reviews user-generated content against written policy and applies proportionate action. Automation handles confident volume; people handle the uncertain middle, context, novel patterns and appeals.</p><p>For classifier data use <a href="/ai-data-services/annotation-labeling/text-nlp-annotation">Text &amp; NLP Annotation Services</a>. For model-output safety evaluation use <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM &amp; RLHF Annotation Services</a>.</p></section>
  <section><h2>Content Moderation Services We Deliver</h2>${services.map(name=>`<article><h3>${escapeHtml(name)}</h3><p>Policy-led decisions with severity, context and escalation recorded.</p></article>`).join("")}</section>
  <section><h2>Binary Safe or Unsafe Is Not a Policy</h2><p>A working taxonomy includes category definitions, severity tiers, action mapping, confidence handling, context modifiers, repeat-behaviour rules and jurisdictional annexes. It is stress-tested on real samples before launch.</p></section>
  <section><h2>How We Protect the People Doing This Work</h2><p>Exposure limits, queue rotation, proactive confidential clinical support, exposure-reducing tools, a right to step away, informed consent, peer debriefs and trained supervisors are built into the operation.</p></section>
  <section><h2>Where Humans Belong in a Moderation Stack</h2><p>People review the classifier decision boundary, context-dependent speech, novel harm patterns and appeals. Moderator decisions can improve automation over time.</p></section>
  <section><h2>How We Set Up a Moderation Operation</h2><ol><li>Policy and volume review</li><li>Taxonomy and action mapping</li><li>Safeguarded queue design</li><li>Moderator selection and training</li><li>Calibration and pilot</li><li>Production operation</li><li>Policy iteration</li></ol></section>
  <section><h2>How Moderation Quality Is Measured</h2><p>False positives and false negatives are separated, with per-category precision and recall, borderline agreement, appeal overturn rate, hidden gold cases, senior adjudication and severity-based SLA latency.</p></section>
  <section><h2>Moderation Needs Local Context, Not Just Translation</h2><p>Native reviewers cover 30+ global languages with comprehensive depth across Indian regional languages, code-mixed text, dialect and regional context.</p></section>
  <section><h2>Appeals and Escalation</h2><p>Independent second review, captured reasoning, named escalation paths, overturn analysis and transparency-ready records.</p></section>
  <section><h2>Work We Decline</h2><p>eQOURSE does not accept CSAM review or classification, extremist content review at scale, unsafe queue configurations, moderation without written policy or sole authority for legally consequential outcomes.</p></section>
  <section><h2>Integration, Security and Coverage</h2><p>Work runs in client or managed tooling with role-based access, audited decisions, ISO-certified processes and business-hours, extended-hours or 24/7 coverage.</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> <a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
  <section><h2>Frequently Asked Questions About Content Moderation</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Build a Moderation Operation That Holds Up</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Trust &amp; Safety Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildTextNlpAnnotationFallback() {
  const services = ["Named Entity Recognition", "Nested and Overlapping Entities", "Relation Extraction", "Coreference Resolution", "Text Classification", "Sentiment and Aspect Sentiment", "Intent and Slot Filling", "Part-of-Speech and Syntax", "Text Span Extraction", "Search Relevance", "Machine Translation Post-Editing", "Semantic Similarity and RAG Quality"];
  const faqs = [["What is text annotation?", "Text annotation adds structured meaning to written language so models can learn entities, sentiment, intent, relations and categories."], ["Do you support Indic and code-mixed text?", "Yes. Native reviewers handle Hinglish, romanised Indic, script switching, dialect and register across 30+ languages."], ["How do you measure quality?", "We report inter-annotator agreement, span F1, boundary agreement, blind duplicates and expert-adjudicated gold sets."], ["How do we start?", "Share a representative sample and taxonomy, or ask eQOURSE to design one, for a pilot and agreement report."]];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/text-nlp-annotation`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${url}#service`,name:"Text & NLP Annotation Services",serviceType:"Text and NLP Annotation",url,provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:"Worldwide",hasOfferCatalog:{"@type":"OfferCatalog",name:"Text and NLP Annotation Services",itemListElement:services.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Annotation & Labeling",item:`${SITE_URL}/ai-data-services/annotation-labeling`},{"@type":"ListItem",position:4,name:"Text & NLP Annotation",item:url}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><h1>Text &amp; NLP Annotation Services for Language AI</h1><p>Build NLP, search, chatbot and LLM training data across 30+ languages with native reviewers, Indic and code-mixed coverage, and measured agreement.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p><section><h2>What Is Text &amp; NLP Annotation?</h2><p>Text annotation adds structured meaning to written language. If position matters, use <a href="/ai-data-services/annotation-labeling/document-ocr-annotation">Document &amp; OCR Annotation</a>. To judge model output, use <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM &amp; RLHF Annotation</a>.</p></section><section><h2>Text Annotation Types We Deliver</h2>${services.map(x=>`<article><h3>${escapeHtml(x)}</h3><p>Taxonomy-tested labels delivered with measured quality.</p></article>`).join("")}</section><section><h2>The Label Set Matters More Than the Annotator Count</h2><p>We test mutual exclusivity, exhaustiveness, learnability, boundary rules, granularity and real-corpus grounding before scale.</p></section><section><h2>Our Text Annotation Process</h2><ol><li>Corpus review</li><li>Taxonomy stress-test</li><li>Guidelines</li><li>Calibration</li><li>Pilot</li><li>Production and QA</li><li>Delivery and iteration</li></ol></section><section><h2>Quality You Can Measure</h2><p>Cohen's kappa, Krippendorff's alpha, strict and relaxed span F1, boundary agreement, blind duplicates, gold sets and adjudication.</p></section><section><h2>Indic and Code-Mixed Language Annotation</h2><p>Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese and Urdu, plus 18 more languages.</p></section><section><h2>Related Services</h2><p><a href="/ai-data-services/data-collection/text-data-collection">Text Data Collection</a> <a href="/translation-services">Translation Services</a> <a href="/localization-services">Localization Services</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a></p></section><section><h2>Frequently Asked Questions</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildCleaningValidationFallback() {
  const url = `${SITE_URL}/ai-data-services/cleaning-validation`;
  const services = [
    ["Data Cleaning & Preparation", "Repair duplicates, broken encoding, noise, missing values, outliers and inconsistent formats, with a reversible change log.", "/ai-data-services/cleaning-validation/data-cleaning-preparation"],
    ["Dataset QA & Label Audit", "Independently measure label errors, class confusion, guideline drift and train/test leakage, including another vendor's work.", "/ai-data-services/cleaning-validation/dataset-qa-label-audit"],
    ["LLM Training Data Curation", "Prepare pre-training, fine-tuning and retrieval corpora through filtering, decontamination, privacy and provenance review.", "/ai-data-services/cleaning-validation/llm-data-curation"],
    ["PII Detection & Redaction", "Detect, mask, pseudonymise or redact personal and sensitive information across text, images, audio, video and documents.", "/ai-data-services/cleaning-validation/pii-detection-redaction"],
    ["Metadata Enrichment", "Add language, domain, source, licence, confidence, provenance and lineage fields so datasets remain governable and reusable.", "/ai-data-services/cleaning-validation/metadata-enrichment"],
    ["Data Validation & Verification", "Use trained human reviewers to verify records, attributes and claims against authoritative sources.", "/ai-data-services/cleaning-validation/data-validation-verification"],
  ];
  const faqs = [
    ["What is data cleaning and validation?", "Data cleaning fixes structural defects. Data validation checks whether the data, labels and records are correct."],
    ["What is the difference between data cleaning and data validation?", "Cleaning fixes shape; validation checks correctness. Most programmes need both."],
    ["What is the difference between data cleaning and data annotation?", "Annotation creates labels. Cleaning and validation check and repair labels and the underlying data."],
    ["Can you audit a dataset delivered by another vendor?", "Yes. eQOURSE can independently profile a completed or in-progress dataset, document defects and provide a repair plan."],
    ["What is train/test leakage and why does it matter?", "It occurs when identical or near-identical items appear in training and evaluation sets, inflating evaluation performance."],
    ["How do you measure data quality?", "Through error rate by defect category, class-confusion analysis, leakage detection and before-and-after reporting."],
    ["How does deduplication work?", "We combine exact and fuzzy matching, MinHash, semantic similarity and human review of uncertain pairs."],
    ["Do you use automation or humans?", "Both. Rules catch structural defects; people judge correctness, meaning and risk."],
    ["What is LLM data curation?", "Preparation of corpora through deduplication, filtering, decontamination, safety checks and provenance review."],
    ["Can you handle PII removal?", "Yes, across text, images, audio, video and documents, with masking, pseudonymisation and verification."],
    ["Do you modify our original data?", "Never silently. Every change is attributable, logged and reversible."],
    ["What formats do you work with?", "Tabular, JSON, annotation formats, text, media, documents and database exports."],
    ["Do you support non-English data?", "Yes, across 30+ global languages, with deep Indian regional and Indic coverage."],
    ["How do you price data cleaning and validation?", "Pricing depends on modality, volume, defect rate, complexity, privacy requirements, human-review depth, format and turnaround."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: "Data Cleaning & Validation Services", serviceType: "AI Data Cleaning and Validation", url, description: "Data cleaning and validation for AI training data including deduplication, PII redaction, label auditing, LLM data curation and human verification, with error rates by defect category.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "Data Cleaning and Validation Service Lines", itemListElement: services.map(([name, , serviceUrl]) => ({ "@type": "Offer", ...(serviceUrl ? { url: `${SITE_URL}${serviceUrl}` } : {}), itemOffered: { "@type": "Service", name, ...(serviceUrl ? { url: `${SITE_URL}${serviceUrl}` } : {}) } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Cleaning & Validation", item: url }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([q,a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ] };
  return `<main data-seo-prerender="true"><h1>Data Cleaning &amp; Validation Services for AI Training Data</h1><p>Deduplication, PII redaction, noise removal, label auditing and multi-tier validation, with error rates reported by defect category.</p><p><a href="/free-pilot">Get a Free Dataset Audit</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section id="cleaning-services"><h2>Choose the Data Quality Service You Actually Need</h2><p>Six specialised categories cover structural repair, independent auditing, corpus curation, privacy protection, metadata enrichment and source-based verification.</p>${services.map(([title,text,href],index) => `<article id="${["data-cleaning-preparation","dataset-qa-label-audit","llm-data-curation","pii-detection-redaction","metadata-enrichment","data-validation-verification"][index]}"><h3><a href="${href}">${escapeHtml(title)}</a></h3><p>${escapeHtml(text)}</p><p><a href="${href}">View dedicated service page</a></p></article>`).join("")}<h3>Quick service finder</h3><ul><li>Duplicates, broken text or inconsistent fields: <a href="${services[0][2]}">Data Cleaning &amp; Preparation</a></li><li>Unknown label quality or split leakage: <a href="${services[1][2]}">Dataset QA &amp; Label Audit</a></li><li>LLM, RAG or fine-tuning corpus preparation: <a href="${services[2][2]}">LLM Training Data Curation</a></li><li>Personal or sensitive information: <a href="${services[3][2]}">PII Detection &amp; Redaction</a></li><li>Missing source, language or lineage context: <a href="${services[4][2]}">Metadata Enrichment</a></li><li>Records that require source checks: <a href="${services[5][2]}">Data Validation &amp; Verification</a></li></ul></section>
    <section><h2>What Is Data Cleaning and Validation?</h2><p>Cleaning fixes structural defects. Validation checks whether labels and records are correct. A dataset can pass every structural check and still be mislabeled.</p><p>Annotation creates labels; cleaning and validation checks and repairs them. Explore <a href="/ai-data-services/annotation-labeling">Data Annotation &amp; Labeling Services</a>.</p></section>
    <section><h2>Why Early Dataset Audits Reduce Rework</h2><p>A defect found before annotation may require one source correction. After annotation, training or deployment it can require label repair, retraining, retesting and incident response.</p></section>
    <section><h2>Our Data Cleaning &amp; Validation Process</h2><ol><li>Sample and objective review</li><li>Error profiling</li><li>Rule design</li><li>Pilot repair</li><li>Production cleaning</li><li>Independent QA</li><li>Delivery and iteration</li></ol></section>
    <section><h2>What the Dataset Quality Report Contains</h2><p>Defect taxonomy and severity, before-and-after findings, rule inventory, exception and rejection lists, change and lineage logs, and validation results by split.</p></section>
    <section><h2>Automation and Human Review</h2><p>Automated rules handle schema, integrity, matching and pattern checks. Trained reviewers resolve semantic duplicates, ambiguous labels, contextual privacy decisions and valid outliers.</p></section>
    <section><h2>LLM Corpus Cleaning and Human-Feedback Validation</h2><p>Clean instruction data, retrieval corpora, preference pairs and evaluator output while preserving useful linguistic and domain variation.</p><p><a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">Explore LLM &amp; RLHF Annotation</a></p></section>
    <section><h2>Formats, Languages and Delivery</h2><p>JSON, JSONL, CSV, TSV, Parquet, COCO, YOLO, Pascal VOC, XML, SRT, VTT and custom schemas. Programmes support 30+ global languages with deep Indian regional and Indic coverage.</p></section>
    <section><h2>Connected AI Data Quality</h2><p><a href="/ai-data-services/data-collection">Data Collection</a> <a href="/ai-data-services/annotation-labeling">Data Annotation</a> <a href="/ai-data-services/model-testing">Model Testing</a> <a href="/ai-data-samples/cleaned-datasets">Cleaned Dataset Samples</a> <a href="/casestudy">Case Studies</a></p></section>
    <section><h2>Frequently Asked Questions About Data Cleaning &amp; Validation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Find Out What's Actually in Your Dataset</h2><p>Share a representative sample. We will return an error rate by category and a direct answer on whether cleaning is worth doing.</p><p><a href="/free-pilot">Get a Free Dataset Audit</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildDatasetAuditFallback() {
  const url = `${SITE_URL}/ai-data-services/cleaning-validation/dataset-qa-label-audit`;
  const faqs = [
    ["What is a dataset QA and label audit?", "A statistically designed review of existing labels that measures error rate, class-level quality and the cause of defects."],
    ["Can you audit another vendor's dataset?", "Yes. Findings are evidence-led, confidential and actionable by your current vendor, your team or eQOURSE."],
    ["How many items do you need to audit?", "Sample size depends on the precision required. Per-class rates require stratified coverage, especially for rare classes."],
    ["Why does dataset size have little effect on sample size?", "Sampling precision mainly depends on how many items are reviewed. A finite-population correction can reduce the requirement for smaller datasets."],
    ["How do you find label errors without reviewing everything?", "We combine stratified manual review, consensus re-labeling, adjudication, agreement recomputation and rule-based checks."],
    ["Can a model find label errors on its own?", "A model can prioritise likely problems, but a human reviewer confirms every error against the agreed guideline."],
    ["What is train/test leakage?", "It is overlap between training and evaluation data that makes evaluation measure memorisation rather than unseen performance."],
    ["How does split leakage happen?", "Common causes include deduplicating after splitting, separating augmented copies and putting related frames or source derivatives in different splits."],
    ["How do you distinguish an annotator problem from a guideline problem?", "Scattered errors often indicate attention pressure, repeated class confusion points to unclear rules and universal disagreement suggests taxonomy ambiguity."],
    ["Should we correct or re-label?", "Sparse errors may need selective correction, concentrated defects suit targeted repair, and high error density can make re-labeling more economical."],
    ["Which data types can you audit?", "Image, video, text and NLP, audio and speech, document and OCR, 3D point cloud and LiDAR, and LLM or RLHF evaluation data."],
    ["Will you tell us if the dataset is already in good shape?", "Yes. If the evidence does not justify more work, the recommendation can be to leave the dataset alone."],
    ["Are audit findings confidential?", "Engagements can use NDAs and controlled-access workflows, and findings are not used in marketing without written permission."],
    ["What does a label audit cost?", "Pricing depends on sample size, required precision, number of classes, modality, consensus depth, domain expertise and security requirements."],
    ["How do we start?", "Share a representative sample and the annotation guideline for a directional audit and recommendation."],
  ];
  const modalityLinks = [["Image","image-annotation"],["Video","video-annotation"],["Text and NLP","text-nlp-annotation"],["Audio and Speech","audio-speech-annotation"],["Document and OCR","document-ocr-annotation"],["3D Point Cloud and LiDAR","3d-point-cloud-lidar-annotation"],["LLM and RLHF","llm-rlhf-annotation"]];
  const schema={"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${url}#service`,name:"Dataset QA & Label Audit Services",serviceType:"Dataset Quality Assurance and Label Auditing",url,provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:"Worldwide",isPartOf:{"@type":"Service","@id":`${SITE_URL}/ai-data-services/cleaning-validation#service`,name:"Data Cleaning & Validation Services",url:`${SITE_URL}/ai-data-services/cleaning-validation`}}, {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Cleaning & Validation",item:`${SITE_URL}/ai-data-services/cleaning-validation`},{"@type":"ListItem",position:4,name:"Dataset QA & Label Audit",item:url}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><h1>Dataset QA &amp; Label Audit Services</h1><p>Independent labeled-dataset audits with per-class error rates, class confusion analysis and train/test leakage detection, including other vendors' work.</p><p><a href="/free-pilot">Get a Free Dataset Audit</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is a Dataset QA &amp; Label Audit?</h2><p>A statistically designed review measures actual error rate with confidence intervals and finds where errors concentrate. <a href="/ai-data-services/annotation-labeling">Annotation creates labels</a>; an audit checks existing labels.</p></section>
  <section><h2>Yes—Including Datasets Someone Else Delivered</h2><p>The review is independent of remediation. The evidence can be acted on by your vendor, your internal team or eQOURSE.</p></section>
  <section><h2>What an Audit Checks</h2><ul><li>Label correctness</li><li>Consistency and class confusion</li><li>Coverage and balance</li><li>Train/test split integrity</li><li>Guideline quality</li><li>Metadata and provenance</li></ul></section>
  <section><h2>How Big Does the Audit Sample Need to Be?</h2><table><thead><tr><th>Expected error</th><th>Precision</th><th>Approximate sample</th></tr></thead><tbody><tr><td>5%</td><td>±2%</td><td>460</td></tr><tr><td>5%</td><td>±1%</td><td>1,825</td></tr><tr><td>10%</td><td>±2%</td><td>865</td></tr><tr><td>10%</td><td>±1%</td><td>3,460</td></tr><tr><td>2%</td><td>±1%</td><td>750</td></tr></tbody></table><p>Per-class reporting requires stratified coverage and deliberate sampling of rare classes.</p></section>
  <section><h2>The Diagnostic That Determines the Fix</h2><p>Scattered errors, systematic class confusion, reviewer outliers, temporal drift and universal ambiguity each require a different response.</p></section>
  <section><h2>Is Your Evaluation Score Real?</h2><p>We check exact and near-duplicate overlap, shared-source derivatives, augmentation lineage and chronological split integrity.</p></section>
  <section><h2>How an Audit Runs</h2><ol><li>Scoping</li><li>Guideline review</li><li>Stratified sample design</li><li>Blind review</li><li>Adjudication</li><li>Analysis</li><li>Report and recommendation</li></ol></section>
  <section><h2>Modality-Specific Label Audits</h2><p>${modalityLinks.map(([a,b])=>`<a href="/ai-data-services/annotation-labeling/${b}">${a} Annotation Services</a>`).join(" ")}</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-samples/cleaned-datasets">Cleaned dataset samples</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
  <section><h2>Frequently Asked Questions</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildLlmCurationFallback() {
  const url = `${SITE_URL}/ai-data-services/cleaning-validation/llm-data-curation`;
  const capabilities = ["Deduplication", "Quality filtering", "Boilerplate removal", "Benchmark decontamination", "PII scrubbing", "Safety filtering", "Language identification", "Synthetic-content assessment", "Licence and provenance review", "Domain composition analysis"];
  const faqs = [
    ["What is LLM training data curation?", "Curation is everything between having a corpus and being able to train on it: deduplication, quality filtering, benchmark decontamination, PII scrubbing, licence and provenance review, and measuring corpus composition."],
    ["Why does curation matter more than corpus size?", "A well-curated smaller corpus can be more useful than a larger raw one because duplicated and low-quality content wastes compute and teaches unwanted patterns."],
    ["What is over-filtering and why is it dangerous?", "Over-filtering removes content you needed. It is hard to see because the final corpus only shows what survived, while specialist, multilingual and symbol-dense content may have disappeared."],
    ["How do you prevent over-filtering?", "We sample and human-review both retained and discarded sets at each calibrated stage, then report retention by domain, source and language so disproportionate removal becomes visible."],
    ["What is benchmark decontamination?", "It removes evaluation-benchmark content from the training corpus so benchmark results measure unseen capability rather than memorisation."],
    ["Is exact matching enough for decontamination?", "No. Benchmark items can be reformatted, translated, paraphrased or split. Exact matching should be combined with n-gram, fuzzy and question-only or answer-only checks."],
    ["Can you check private benchmarks?", "Private benchmarks can be checked under an agreed NDA and handling policy. They should not be retained after the contamination check when that is contractually required."],
    ["How do you handle deduplication?", "Typical workflows combine exact hashes, MinHash and LSH for near-duplicates, and similarity methods where appropriate. Thresholds must be tuned and reviewed on the actual corpus."],
    ["Can you detect AI-generated content in a corpus?", "We can flag likely synthetic text using multiple signals and human review, but detection remains uncertain. We report estimates and uncertainty rather than silently deleting content on a classifier verdict."],
    ["Do you review licensing and provenance?", "We can document source, licence, consent status, collection method, transformation lineage and exclusions so legal counsel has the facts needed for a decision. This is not legal advice."],
    ["Do you handle non-English corpora?", "Yes, across 30+ global languages with native reviewers and comprehensive Indian regional-language, code-mixed and romanised coverage."],
    ["Do you run the processing infrastructure?", "Processing can run in your environment or ours. The core value is pipeline design, threshold calibration and human review of what each stage keeps and removes."],
    ["Which formats do you support?", "Inputs include JSONL, Parquet, WARC-family files, text collections, cloud storage exports and Hugging Face datasets. Outputs can include JSONL, Parquet, sharded datasets and custom schemas with per-document metadata."],
    ["What determines curation cost?", "Corpus size, filtering stages, domain specificity, languages, benchmark scope, provenance depth, review intensity, processing environment and turnaround all affect cost."],
    ["How do we start?", "Start with a corpus audit: profiling, duplication rate, contamination check and composition report before any content is filtered."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: "LLM Training Data Curation Services", serviceType: "LLM Training Data Curation", url, description: "LLM corpus deduplication, quality filtering and benchmark decontamination with provenance review and human checks of filtered-out content.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "LLM Corpus Curation Capabilities", itemListElement: capabilities.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Cleaning & Validation", item: `${SITE_URL}/ai-data-services/cleaning-validation` }, { "@type": "ListItem", position: 4, name: "LLM Training Data Curation", item: url }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([q,a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ] };
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> / <span>LLM Training Data Curation</span></nav>
    <h1>LLM Training Data Curation Services</h1><p>Prepare LLM pre-training and fine-tuning corpora through deduplication, quality filtering, benchmark decontamination, privacy handling, provenance review and domain balancing.</p><p><a href="/free-pilot">Get a Free Corpus Audit</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is LLM Training Data Curation?</h2><p>Curation turns a raw corpus into a traceable, measurable training asset. It is distinct from <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM and RLHF annotation</a>, which creates alignment and evaluation signals after corpus preparation.</p></section>
    <section><h2>The LLM Curation Stack</h2>${capabilities.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Calibrated automation plus human review of retained and discarded content.</p></article>`).join("")}</section>
    <section><h2>Every Filter Removes Something You Wanted</h2><p>Over-filtering silently erases specialist, multilingual and symbol-dense material. eQOURSE reviews samples from both retained and discarded sets, then reports retention by domain, source and language.</p></section>
    <section><h2>Benchmark Decontamination</h2><p>Exact, n-gram and fuzzy matching checks public or private evaluation suites so results measure unseen capability instead of memorisation.</p></section>
    <section><h2>Licence, Provenance and Synthetic-Content Assessment</h2><p>Source, licence, consent, collection context, transformation lineage and exclusions are documented. Synthetic-text classifiers provide uncertain flags for human review, never an automatic deletion verdict. Licence documentation is not legal advice.</p></section>
    <section><h2>Our LLM Data Curation Process</h2><ol><li>Profile the corpus</li><li>Define the training objective</li><li>Design the pipeline and retention floors</li><li>Calibrate retained and discarded samples</li><li>Process at scale</li><li>Review composition and contamination</li><li>Deliver the corpus, manifest, exclusions and re-runnable configuration</li></ol></section>
    <section><h2>What You Get Back</h2><p>Retention by stage, domain and source; duplication and contamination reports; composition analysis; an exclusion register; provenance and lineage; PII verification samples; and reusable pipeline configuration.</p></section>
    <section><h2>Global Corpora with India-Wide Language Depth</h2><p>Programmes support 30+ global languages with native reviewers and comprehensive Indian regional-language, code-mixed and romanised coverage.</p></section>
    <section><h2>Security, Formats and Delivery</h2><p>JSONL, Parquet, WARC-family files, text collections, cloud exports, Hugging Face datasets and custom schemas, processed in your environment or ours under agreed access and retention controls.</p></section>
    <section><h2>Related AI Data Services</h2><p><a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-services/cleaning-validation/dataset-qa-label-audit">Dataset QA &amp; Label Audit</a> <a href="/ai-data-services/data-collection/text-data-collection">Text Data Collection</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-samples/cleaned-datasets">Cleaned dataset samples</a></p></section>
    <section><h2>Frequently Asked Questions About LLM Data Curation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Find Out What Is Actually in Your Corpus</h2><p><a href="/free-pilot">Get a Free Corpus Audit</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildDataCleaningPreparationFallback() {
  const url = `${SITE_URL}/ai-data-services/cleaning-validation/data-cleaning-preparation`;
  const offers = ["Deduplication", "Character Encoding Repair", "Unicode Normalisation", "Noise and Boilerplate Removal", "OCR Artefact Cleanup", "Consistency Normalization", "Missing Value Analysis and Treatment", "Outlier Detection and Adjudication", "Schema Conformance and Structural Repair", "Indic Script Encoding Repair"];
  const faqs = [
    ["What is data cleaning?", "Data cleaning makes a dataset structurally sound: records are well-formed, values use consistent formats, duplicates are resolved and character encoding is correct. It makes data well-formed, which is different from making it true."],
    ["What is the difference between data cleaning and data validation?", "Cleaning makes data well-formed. Validation checks whether it is correct. A record can be perfectly formatted, fully populated and correctly typed while being completely wrong."],
    ["How do you detect duplicates?", "We combine exact hashes, fuzzy and token similarity, MinHash and LSH, semantic similarity, perceptual hashes for images and composite keys for records."],
    ["How do you decide what counts as a duplicate?", "It is a use-case decision, not a universal fact. We agree the definition and tune thresholds on a reviewed sample before removing or merging anything."],
    ["Which record survives when duplicates are merged?", "Survivorship rules are defined before processing: most complete, most recent, most authoritative, or a merged record. Discarded versions remain in the change log."],
    ["How should missing values be handled?", "Treatment depends on why a value is missing. Completely random missingness may be safely dropped; observed-field missingness may support conditional imputation; missingness tied to the absent value itself often needs an explicit missing category."],
    ["Do you remove outliers?", "Not automatically. An outlier is unusual, not necessarily wrong. Statistical flags are reviewed against domain context; real rare values are retained and reported."],
    ["Can data cleaning introduce bias?", "Yes. Dropping incomplete records, removing outliers or imputing values can change class balance, variance and group representation. We report distribution impact before and after."],
    ["What is mojibake and can you fix it?", "Mojibake is text decoded with the wrong character encoding. It is often repairable when the original encoding can be identified."],
    ["What is Unicode normalisation and why does it matter?", "Visually identical characters can have different code-point sequences. Without consistent normalisation, matching, search and deduplication can treat them as different strings."],
    ["Do you handle Indic scripts?", "Yes. Script-aware rules preserve meaningful joiners, non-joiners, nukta and matra behaviour, and address legacy encodings, mixed scripts and transliteration variance with native-language review."],
    ["What happens with ambiguous dates such as 03/04/2026?", "We flag rather than guess. If the source convention cannot be established, choosing one creates a clean-looking but potentially incorrect dataset."],
    ["Do you modify our original data?", "Never silently and never in place. Originals are preserved, every change records the old value, new value and rule, and transformations can be reversed."],
    ["What formats do you work with?", "CSV, TSV, Excel, Parquet, JSON, JSONL, XML, text corpora, database exports, annotation formats and media collections with metadata."],
    ["How much does data cleaning cost?", "Cost depends on size, modality, sources, defect density, rule complexity, adjudication, language and script coverage, domain expertise, correction depth, security and turnaround."],
    ["How do we start?", "Start with a sample profiling pass for duplication rate, missingness, encoding integrity, format variance and outlier counts before anything is changed."],
  ];
  const schema = { "@context":"https://schema.org", "@graph":[
    { "@type":"Service", "@id":`${url}#service`, name:"Data Cleaning & Preparation Services", serviceType:"Data Cleaning and Preparation for AI", url, description:"Deduplication, encoding repair, noise removal and data normalisation for AI with reversible change logs and distribution-impact reporting.", provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}, areaServed:"Worldwide", hasOfferCatalog:{"@type":"OfferCatalog",name:"Data Cleaning and Preparation Services",itemListElement:offers.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},
    { "@type":"BreadcrumbList", itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Cleaning & Validation",item:`${SITE_URL}/ai-data-services/cleaning-validation`},{"@type":"ListItem",position:4,name:"Data Cleaning & Preparation",item:url}]},
    { "@type":"FAQPage", mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))},
  ]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> / <span>Data Cleaning &amp; Preparation</span></nav>
    <h1>Data Cleaning &amp; Preparation Services for AI Training Data</h1><p>Remove duplicates, repair encoding, strip noise and standardise inconsistent values with reversible change logs and before-and-after distribution reporting.</p><p><a href="/free-pilot">Get a Free Dataset Audit</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is Data Cleaning and Preparation?</h2><p>Cleaning makes data structurally sound. Validation checks whether it is correct. For label correctness use <a href="/ai-data-services/cleaning-validation/dataset-qa-label-audit">Dataset QA &amp; Label Audit</a>.</p></section>
    <section><h2>Deduplication</h2><p>Exact hashes, fuzzy and token matching, MinHash and LSH, semantic similarity, perceptual hashes and composite keys identify duplicates. The duplicate definition, threshold and surviving copy are agreed before removal.</p></section>
    <section><h2>Noise Removal</h2><p>Repair encoding, Unicode forms, HTML and XML, boilerplate, OCR artefacts, invisible controls, whitespace irregularity and corrupted records.</p></section>
    <section><h2>Consistency Normalization</h2><p>Dates, numbers, units, currency, casing, terminology, names, categories and null representations are standardised with originals preserved. Ambiguous dates are flagged rather than guessed.</p></section>
    <section><h2>Missing Values, Outliers and Structural Repair</h2><table><thead><tr><th>Missingness type</th><th>Meaning</th><th>Treatment</th></tr></thead><tbody><tr><td>Completely at random</td><td>Unrelated to fields</td><td>Dropping may be safe</td></tr><tr><td>At random</td><td>Explained by observed fields</td><td>Conditional imputation may be defensible</td></tr><tr><td>Not at random</td><td>Depends on the missing value</td><td>Dropping or naive imputation introduces bias</td></tr></tbody></table><p>Outliers are reviewed as possible real signal, not automatically removed. Structural repair reports failed coercion instead of silently creating nulls.</p></section>
    <section><h2>Every Cleaning Decision Changes Your Data</h2><p>Dropping incomplete records, removing outliers, merging near-duplicates and imputing values can change representation and variance. Every engagement reports class balance, key-field distributions and removed-versus-retained composition.</p></section>
    <section><h2>Sometimes the Right Answer Is to Leave It</h2><p>Real outliers, informative inconsistency, not-at-random missingness, deliberate augmentation pairs and historical conventions may carry signal that cleaning would erase.</p></section>
    <section><h2>The Encoding Problems That Silently Corrupt Non-English Data</h2><p>Script-aware repair covers mojibake, double-encoded UTF-8, Unicode forms, legacy Indic fonts, meaningful ZWJ and ZWNJ characters, nukta and matra sequences, mixed scripts and transliteration variance across global languages with Indian regional depth.</p></section>
    <section><h2>How a Cleaning Engagement Runs</h2><ol><li>Profiling baseline</li><li>Scope agreement</li><li>Rule definition</li><li>Pilot and removed-set review</li><li>Full processing</li><li>Distribution check with rule loop-back</li><li>Delivery</li></ol></section>
    <section><h2>What You Get Back, Beyond the Data</h2><p>Full reversible change log, per-rule counts, distribution report, duplicate report, missingness analysis, outlier register, unresolved-item list and reusable rules.</p></section>
    <section><h2>What's Automated and What Isn't</h2><p>Automation checks schema, duplicate candidates, encoding, formats, missingness and distribution. People decide thresholds, survivorship, outlier meaning, missingness treatment and whether a distribution shift is acceptable.</p></section>
    <section><h2>Formats, Security and Engagement Models</h2><p>CSV, Excel, Parquet, JSON, XML, text, databases, annotation formats and media metadata. Work can run in your environment under ISO 9001 and ISO 27001 certified processes, as profiling, a one-time project, continuous cleaning, rule handover or migration cleanup.</p></section>
    <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/cleaning-validation/dataset-qa-label-audit">Dataset QA &amp; Label Audit</a> <a href="/ai-data-services/cleaning-validation/llm-data-curation">LLM Training Data Curation</a> <a href="/ai-data-services/annotation-labeling">Data Annotation &amp; Labeling</a> <a href="/ai-data-samples/cleaned-datasets">Cleaned dataset samples</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
    <section><h2>Frequently Asked Questions About Data Cleaning</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Find Out What's Wrong With Your Data</h2><p><a href="/free-pilot">Get a Free Dataset Audit</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildPiiRedactionFallback() {
  const url = `${SITE_URL}/ai-data-services/cleaning-validation/pii-detection-redaction`;
  const offers = ["PII Discovery and Classification", "Text Redaction", "Face and Licence Plate Blurring", "Video Redaction with Frame Persistence", "Audio Identifier Redaction", "Document Redaction and Text Layer Removal", "Metadata Stripping", "Quasi-Identifier Risk Assessment", "Pseudonymisation", "Tokenisation", "Redaction Verification and Recall Measurement"];
  const faqs = [
    ["What is PII detection and redaction?", "It is finding personal data and removing, masking or replacing it so data can be used without exposing the individuals in it. Detection across unstructured content is the difficult half."],
    ["Can you remove 100% of personal data?", "No detection process finds every identifier in unstructured content. We measure recall against a human-verified reference, verify output independently and state residual risk."],
    ["What are quasi-identifiers?", "Values such as postcode, birth date, job title, employer or precise location that may identify people when combined even though they do not identify anyone alone."],
    ["How do you handle quasi-identifiers?", "We assess combination uniqueness, rare values, free-text leakage and cross-record linkage, then report the utility trade-offs of generalisation, suppression, aggregation or measured noise."],
    ["Why can redacted PDF text still appear?", "A visible black rectangle may leave selectable text underneath. True redaction removes the content and should be checked with a text-layer extraction test."],
    ["Do you handle image and file metadata?", "Yes. EXIF and document properties are checked and stripped under the agreed policy because visible redaction alone may leave location, device, author or revision details."],
    ["Can you redact faces in video?", "Yes. Identifiers are tracked across frames, occlusion and re-entry, and verification samples the sequence rather than only the initially processed frames."],
    ["Is redacting spoken names enough for audio?", "No. Voice can be biometric data, so removing spoken identifiers may still leave an identifying voiceprint."],
    ["What is masking, pseudonymisation and anonymisation?", "Masking uses placeholders. Pseudonymisation uses consistent surrogates and may be reversible. Pseudonymised data generally remains personal data. Anonymisation is a higher bar involving re-identification risk."],
    ["Do you handle Indian names and identifiers?", "Yes. We support Indian names, scripts, transliteration, address formats and identifier patterns with regional-language review, as part of wider global-language coverage."],
    ["How do you verify that redaction worked?", "Verification uses a human-verified reference, independent second-pass review, metadata sweeps, document text-layer tests, video sampling and an explicit residual-risk statement."],
    ["Will this make us GDPR or DPDP compliant?", "No single processing step makes an organisation compliant. We provide controlled processing and evidence; legal determinations remain with your counsel."],
    ["Can you work inside our environment?", "Yes. Sensitive processing can run inside a controlled client environment or over client VPN under agreed access and retention controls."],
    ["Who has access to our data?", "Named, vetted reviewers under NDA with role-based access and audit trails. A Data Processing Agreement is used where required by the engagement."],
    ["How much does PII redaction cost?", "Cost depends on modality, volume, density, quasi-identifier analysis, verification, language coverage, method, security tier and turnaround."],
  ];
  const schema = { "@context":"https://schema.org", "@graph":[
    { "@type":"Service", "@id":`${url}#service`, name:"PII Detection & Redaction Services", serviceType:"PII Detection, Redaction, Masking and Pseudonymisation", url, description:"Multimodal PII discovery and redaction with quasi-identifier analysis, verified recall and residual-risk reporting.", provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}, areaServed:"Worldwide", isPartOf:{"@type":"Service","@id":`${SITE_URL}/ai-data-services/cleaning-validation#service`,name:"Data Cleaning & Validation Services",url:`${SITE_URL}/ai-data-services/cleaning-validation`}, hasOfferCatalog:{"@type":"OfferCatalog",name:"PII Detection and Redaction Services",itemListElement:offers.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},
    { "@type":"BreadcrumbList", itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Cleaning & Validation",item:`${SITE_URL}/ai-data-services/cleaning-validation`},{"@type":"ListItem",position:4,name:"PII Detection & Redaction",item:url}]},
    { "@type":"FAQPage", mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))},
  ]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> / <span>PII Detection &amp; Redaction</span></nav>
    <h1>PII Detection &amp; Redaction Services</h1><p>Find and protect personal data across text, documents, images, video, audio and structured datasets—including quasi-identifiers and embedded metadata—with independent verification and explicit residual-risk reporting.</p><p><a href="/free-pilot">Get a Free PII Risk Assessment</a> <a href="/contact-us">Talk to a Privacy Data Specialist</a></p>
    <section><h2>What Is PII Detection and Redaction?</h2><p>Personal data appears in fields, narrative text, visual backgrounds, file metadata, voices and combinations of otherwise ordinary values. No detection process finds 100% of personal data in unstructured content; recall and residual risk must be measured and reported.</p></section>
    <section><h2>Direct Identifiers, Quasi-Identifiers and Sensitive Data</h2><p>Direct identifiers include names, contacts, account numbers, addresses and biometrics. Quasi-identifiers such as postcode, birth date, job title, precise location and rare conditions can identify people in combination. Sensitive categories require additional care. This page is not legal advice.</p></section>
    <section><h2>The Quasi-Identifier Problem</h2><p>Removing names alone is not anonymisation. We assess combination uniqueness, rarity, cross-record linkage and free-text leakage, then report the analytical cost of generalisation, suppression, aggregation or measured noise.</p></section>
    <section><h2>PII Across Every Data Type</h2><table><thead><tr><th>Modality</th><th>What is handled</th></tr></thead><tbody><tr><td>Text</td><td>Identifiers and quasi-identifiers in narrative</td></tr><tr><td>Images</td><td>Faces, plates, ID regions and EXIF</td></tr><tr><td>Video</td><td>Identifiers across occlusion and re-entry</td></tr><tr><td>Audio</td><td>Spoken identifiers and biometric voice</td></tr><tr><td>Documents</td><td>Visible and embedded text, signatures and properties</td></tr><tr><td>Structured data</td><td>Direct fields, free-text leakage and identifying combinations</td></tr><tr><td>Code and logs</td><td>Credentials, tokens and personal information in output</td></tr></tbody></table></section>
    <section><h2>Removal, Masking, Pseudonymisation and Tokenisation</h2><table><thead><tr><th>Method</th><th>What happens</th><th>Reversible</th></tr></thead><tbody><tr><td>Removal</td><td>Delete the value</td><td>No</td></tr><tr><td>Masking</td><td>Use a typed placeholder</td><td>No</td></tr><tr><td>Pseudonymisation</td><td>Use a consistent surrogate</td><td>With the mapping</td></tr><tr><td>Tokenisation</td><td>Store the original separately</td><td>With authorised access</td></tr></tbody></table><p>Pseudonymised data generally remains personal data where re-identification remains possible.</p></section>
    <section><h2>Failure Modes That Look Like Success</h2><p>Checks include selectable text under PDF black boxes, EXIF, document history, reflections and background faces, identifiers reappearing after video occlusion, biometric voice, free-text leakage, cross-field reconstruction and pre-redaction copies in logs or caches.</p></section>
    <section><h2>Verification Is the Product</h2><p>We verify against a human reference set, measure recall, run an independent second pass, sweep metadata, test document text layers, sample video sequences and state the remaining risk. Precision improves after recall is established because one missed identifier can be more consequential than an extra review flag.</p></section>
    <section><h2>Our PII Detection and Redaction Process</h2><ol><li>Scope and definition</li><li>Discovery scan</li><li>Quasi-identifier assessment</li><li>Method selection</li><li>Pilot batch</li><li>Full processing</li><li>Independent verification and residual-risk report</li></ol></section>
    <section><h2>Global Language Coverage with India-Wide Depth</h2><p>Programmes support 30+ global languages and comprehensive Indian regional-language, script, transliteration and code-mixed review, including Indian address and identifier patterns.</p></section>
    <section><h2>Compliance Boundary and Security</h2><p>Controlled processing can support a privacy programme but cannot make an organisation compliant by itself. Work can run in a client-controlled environment with named access, NDAs, audit trails, agreed retention and a Data Processing Agreement where required.</p></section>
    <section><h2>Related AI Data Services</h2><p><a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-services/cleaning-validation/llm-data-curation">LLM Training Data Curation</a> <a href="/ai-data-services/annotation-labeling/document-ocr-annotation">Document &amp; OCR Annotation</a> <a href="/ai-data-services/annotation-labeling/audio-speech-annotation">Audio &amp; Speech Annotation</a> <a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation</a> <a href="/ai-data-services/data-collection">AI Data Collection</a></p></section>
    <section><h2>Frequently Asked Questions About PII Redaction</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Know What Personal Data Is Actually in Your Dataset</h2><p><a href="/free-pilot">Get a Free PII Risk Assessment</a> <a href="/contact-us">Talk to a Privacy Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildMetadataEnrichmentFallback() {
  const url = `${SITE_URL}/ai-data-services/cleaning-validation/metadata-enrichment`;
  const offers = ["Language and Locale Tagging", "Domain and Topic Classification", "Quality Scoring and Tiering", "Source Provenance Capture", "Data Lineage Tracking", "Entity Resolution and Record Linkage", "Taxonomy Design", "Taxonomy Mapping and Migration", "Controlled Vocabulary Management", "Attribute Completion", "Geographic and Temporal Normalisation"];
  const faqs = [
    ["What is metadata enrichment?", "Adding structured, machine-readable information about each item in a dataset so the data can be found, filtered, weighted and audited."],
    ["What is the difference between metadata and annotation?", "Metadata describes the item; annotation labels the content for a model to learn from."],
    ["Why does metadata matter for training data?", "Tags enable domain weighting, quality-tiered training, curriculum ordering, filtered fine-tuning, ablation studies and selective source removal."],
    ["What is entity resolution and how is it different from deduplication?", "Deduplication removes copies. Entity resolution links different records that describe the same real-world entity while keeping every record."],
    ["How do you handle uncertain entity matches?", "We combine deterministic evidence, probabilistic matching, script-aware comparison and human adjudication, then report confidence for every link."],
    ["Can you design a taxonomy for us?", "Yes. Categories are grounded in real content, tested for consistent application and designed around the decisions the taxonomy must support."],
    ["Can you map between two existing taxonomies?", "Yes. The crosswalk records one-to-many mappings, merges, missing destinations, ambiguous cases and the rule applied."],
    ["What is data lineage?", "The record of every transformation, its order, applied rules, version history and the relationship between source and derived datasets."],
    ["Can you reconstruct provenance for an existing dataset?", "Partially and honestly. We recover what source systems and logs support and clearly state where the evidence ends."],
    ["Do you report how confident the metadata is?", "Yes, per field. Inferred, deterministic and human-verified values remain distinguishable."],
    ["Do you handle non-English content?", "Yes, across 30+ global languages with comprehensive Indian regional-language depth, including code-mixed, romanised and cross-script variants."],
    ["Can metadata create privacy risk?", "Yes. Precise location and timestamps can be quasi-identifiers, so granularity is set to the required risk posture."],
    ["How is metadata delivered?", "Embedded in JSON, JSONL or Parquet; as sidecars; in keyed tables or catalogues; through relevant standards; or in a custom schema."],
    ["How much does enrichment cost?", "Cost depends on field count, automation share, taxonomy complexity, entity-resolution volume, confidence threshold, languages, domain expertise and provenance depth."],
    ["How do we start?", "Start with a metadata assessment covering what exists, what is missing, what can be recovered and what the enriched fields would make possible."],
  ];
  const schema = { "@context":"https://schema.org", "@graph":[
    { "@type":"Service", "@id":`${url}#service`, name:"Metadata Enrichment & Data Standardization Services", serviceType:"AI Dataset Metadata Enrichment, Entity Resolution and Data Standardization", url, provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}, areaServed:"Worldwide", isPartOf:{"@type":"Service","@id":`${SITE_URL}/ai-data-services/cleaning-validation#service`,name:"Data Cleaning & Validation Services",url:`${SITE_URL}/ai-data-services/cleaning-validation`}, hasOfferCatalog:{"@type":"OfferCatalog",name:"Metadata Enrichment and Data Standardization Capabilities",itemListElement:offers.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},
    { "@type":"BreadcrumbList", itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Cleaning & Validation",item:`${SITE_URL}/ai-data-services/cleaning-validation`},{"@type":"ListItem",position:4,name:"Metadata Enrichment & Data Standardization",item:url}]},
    { "@type":"FAQPage", mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))},
  ]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> / <span>Metadata Enrichment &amp; Data Standardization</span></nav>
    <h1>Metadata Enrichment &amp; Data Standardization Services</h1><p>Add language, domain, quality, source, licence, lineage and entity context to every item, then standardize the schema so teams can find, filter, govern and reproduce the data they use.</p><p><a href="/free-pilot">Get a Free Metadata Assessment</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is Metadata Enrichment?</h2><p>Metadata adds machine-readable information about an item. It answers which language and domain an item belongs to, where it came from, how it changed, how reliable it is and whether it can be used.</p><h3>Metadata is not annotation</h3><p>Metadata describes the item. <a href="/ai-data-services/annotation-labeling">Data annotation</a> labels the content inside it for a model to learn.</p></section>
    <section><h2>The Metadata Layer</h2><ul><li>Language, locale and script</li><li>Domain, topic and taxonomy</li><li>Quality and confidence tier</li><li>Source, licence and consent status</li><li>Transformation lineage and versions</li><li>Technical properties and schema</li><li>Entity references</li><li>Normalised time and geography</li><li>Custom operational fields</li></ul></section>
    <section><h2>Metadata Keeps Datasets Usable</h2><table><thead><tr><th>Without metadata</th><th>With metadata</th></tr></thead><tbody><tr><td>Which version trained the model?</td><td>Version, date and lineage per record</td></tr><tr><td>Where did this item come from?</td><td>Source and licence per item</td></tr><tr><td>Was cleaning done before splitting?</td><td>Transformation order recorded</td></tr><tr><td>Can one source be excluded?</td><td>Yes, with a filter</td></tr></tbody></table><p>Tags support selective training, quality-tiered runs, domain weighting, language-targeted datasets, clean holdouts and source-level exclusion.</p></section>
    <section><h2>Entity Resolution Links Records Without Merging Them</h2><p><a href="/ai-data-services/cleaning-validation/data-cleaning-preparation">Deduplication</a> removes copied records. Entity resolution keeps legitimately different records and links them to one canonical entity with a confidence level.</p></section>
    <section><h2>Taxonomy Design, Mapping and Migration</h2><p>We design controlled vocabularies from real content, test the decision rules and document crosswalks where categories split, merge or do not map cleanly. Publishing teams can also use our <a href="/metadata-services">publishing metadata services</a>.</p></section>
    <section><h2>Provenance and Data Lineage</h2><p>Source, licence, collection method, transformations, removals, derived versions and exclusions remain traceable at the required level. Provenance documentation supplies evidence for counsel; it is not legal advice.</p></section>
    <section><h2>Our Metadata Enrichment Process</h2><ol><li>Current-state assessment</li><li>Schema design</li><li>Taxonomy design or mapping</li><li>Rules, models and confidence thresholds</li><li>Pilot batch and schema revision</li><li>Production enrichment and human review</li><li>Delivery of data, documentation and reusable rules</li></ol></section>
    <section><h2>What You Get Back</h2><p>An enriched dataset, schema documentation, taxonomy and examples, mapping crosswalk, per-field confidence, coverage report, entity-link report, provenance manifest and reusable rules.</p></section>
    <section><h2>Global Language and Script Coverage</h2><p>Programmes support 30+ global languages with comprehensive Indian regional-language depth, native review, code-mixed language identification, romanised content and cross-script entity matching.</p></section>
    <section><h2>Formats, Security and Privacy</h2><table><thead><tr><th>Pattern</th><th>Formats</th><th>Controls</th></tr></thead><tbody><tr><td>Embedded</td><td>JSON, JSONL, Parquet</td><td>Schema and permitted values</td></tr><tr><td>Sidecar</td><td>Paired files</td><td>Stable item IDs</td></tr><tr><td>Keyed table</td><td>CSV, database, catalogue</td><td>Record linkage</td></tr><tr><td>Standard or custom</td><td>Dublin Core, schema.org or target platform</td><td>Mapping and confidence</td></tr></tbody></table><p>Precise time and location can create quasi-identifier risk. Where required, enrichment connects to <a href="/ai-data-services/cleaning-validation/pii-detection-redaction">PII Detection &amp; Redaction</a>.</p></section>
    <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/cleaning-validation">All Cleaning &amp; Validation Services</a> <a href="/ai-data-services/cleaning-validation/llm-data-curation">LLM Training Data Curation</a> <a href="/ai-data-services/cleaning-validation/dataset-qa-label-audit">Dataset QA &amp; Label Audit</a> <a href="/ai-data-services/cleaning-validation/data-validation-verification">Data Validation &amp; Verification</a> <a href="/ai-data-samples/cleaned-datasets">Cleaned dataset samples</a> <a href="/casestudy">Case studies</a></p></section>
    <section><h2>Frequently Asked Questions About Metadata Enrichment</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Turn a Dataset into a System Your Team Can Reuse</h2><p><a href="/free-pilot">Get a Free Metadata Assessment</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildDataValidationVerificationFallback() {
  const url = `${SITE_URL}/ai-data-services/cleaning-validation/data-validation-verification`;
  const offers = ["Record Verification", "Attribute and Field Verification", "Business and Organisation Verification", "Contact and Address Verification", "Document-Backed Verification", "Claim and Fact Verification", "Cross-Reference and Multi-Source Matching", "Plausibility and Consistency Review", "Domain-Expert Verification", "Scheduled Re-Verification"];
  const faqs = [
    ["What is data verification?", "Data verification checks whether data is actually true by comparing it with an authoritative external source."],
    ["What is the difference between data validation and verification?", "Validation checks plausibility and rules. Verification checks external correctness against an agreed source."],
    ["What is a source of truth?", "The authoritative reference agreed for a specific field, including its currency, coverage and access limits."],
    ["What happens when sources disagree?", "The conflict is retained, a pre-agreed hierarchy is applied and unresolved cases receive senior adjudication."],
    ["Do you verify every record?", "Not always. Fields are triaged by consequence into thorough verification, statistical sampling or cleaning and validation only."],
    ["What does unverifiable mean?", "No available source could confirm or contradict the value. It is a separate status and does not mean wrong."],
    ["How long does verification last?", "Verification is time-stamped per field and a refresh cadence is recommended based on measured decay."],
    ["Do you support global languages?", "Yes, across 30+ global languages with comprehensive Indian regional-language depth and native-source review."],
  ];
  const schema = {"@context":"https://schema.org","@graph":[
    {"@type":"Service","@id":`${url}#service`,name:"Data Validation & Verification Services",serviceType:"Human-in-the-Loop Data Verification",url,description:"Human verification of records, attributes and claims against authoritative sources with conflict adjudication and six-state field-level reporting.",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:"Worldwide",isPartOf:{"@type":"Service","@id":`${SITE_URL}/ai-data-services/cleaning-validation#service`,name:"Data Cleaning & Validation Services",url:`${SITE_URL}/ai-data-services/cleaning-validation`},hasOfferCatalog:{"@type":"OfferCatalog",name:"Data Verification Services",itemListElement:offers.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Cleaning & Validation",item:`${SITE_URL}/ai-data-services/cleaning-validation`},{"@type":"ListItem",position:4,name:"Data Validation & Verification",item:url}]},
    {"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))},
  ]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> / <span>Data Validation &amp; Verification</span></nav>
    <h1>Data Validation &amp; Verification Services</h1><p>Verify records, attributes and claims against authoritative sources, with the source of truth agreed first, conflicts adjudicated and status reported per field.</p><p><a href="/free-pilot">Get a Free Verification Sample</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>Cleaning, Validation and Verification Ask Different Questions</h2><table><thead><tr><th>Layer</th><th>Question</th></tr></thead><tbody><tr><td>Cleaning</td><td>Is the record well-formed?</td></tr><tr><td>Validation</td><td>Is the record internally plausible?</td></tr><tr><td>Verification</td><td>Is the record actually true?</td></tr></tbody></table><p>See <a href="/ai-data-services/cleaning-validation/data-cleaning-preparation">Data Cleaning &amp; Preparation</a> and <a href="/ai-data-services/cleaning-validation/dataset-qa-label-audit">Dataset QA &amp; Label Audit</a>.</p></section>
    <section><h2>Every Project Turns on the Source of Truth</h2><p>Authority, currency, gaps, permitted access, source hierarchy and the meaning of unverifiable are agreed before production. Where no source of truth exists, the work is reported as plausibility review rather than verification.</p></section>
    <section><h2>What We Verify</h2><ul>${offers.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><p>Source documents can first be structured through <a href="/ai-data-services/annotation-labeling/document-ocr-annotation">Document &amp; OCR Annotation</a>.</p></section>
    <section><h2>When Authoritative Sources Disagree</h2><p>Disagreement is preserved rather than overwritten. A hierarchy handles expected cases, senior reviewers adjudicate exceptions, legitimate multiple values remain visible and conflict rate is reported by field.</p></section>
    <section><h2>Triage by Consequence</h2><p>High-consequence values receive thorough checks, analytical fields can be sampled to estimate a rate and low-consequence structural fields remain within cleaning and validation. Sampling estimates a rate but cannot guarantee one specific record.</p></section>
    <section><h2>Verification Has a Shelf Life</h2><p>Every verified value carries a source and date. Re-verification cadence is set per field type from measured decay rather than a universal industry rate.</p></section>
    <section><h2>How a Verification Engagement Runs</h2><ol><li>Consequence scoping</li><li>Source of truth definition</li><li>Conflict hierarchy</li><li>Pilot batch</li><li>Production verification</li><li>Senior adjudication</li><li>Evidence-led delivery</li></ol></section>
    <section><h2>What You Get Back</h2><p>Verified data with six distinct field states: verified, verified with conflict, contradicted, unverifiable, not attempted and plausibility-reviewed only. Delivery also includes field-level rates, source and date, a conflict register, correction log where scoped and refresh guidance.</p></section>
    <section><h2>Domain, Language and Security</h2><p>Qualified reviewers can support medical, legal, financial, engineering, education and scientific claims. Programmes support 30+ global languages with comprehensive Indian regional-language depth. ISO 9001 and ISO 27001 certified processes support named access, lawful source use and audit trails.</p><p><a href="/smes">Subject Matter Experts</a> <a href="/ai-data-services/cleaning-validation/pii-detection-redaction">PII Detection &amp; Redaction</a></p></section>
    <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/cleaning-validation/llm-data-curation">LLM Training Data Curation</a> <a href="/ai-data-services/cleaning-validation/metadata-enrichment">Metadata Enrichment</a> <a href="/ai-data-samples/cleaned-datasets">Cleaned dataset samples</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
    <section><h2>Frequently Asked Questions About Data Verification</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Find Out How Much of Your Data Is Actually True</h2><p><a href="/free-pilot">Get a Free Verification Sample</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildModelTestingFallback() {
  const canonical = `${SITE_URL}/ai-data-services/model-testing`;
  const faqs = [
    ["What is AI model testing?", "AI model testing evaluates a testable model against defined quality, safety and product requirements using realistic, adversarial and segmented inputs."],
    ["How is model testing different from RLHF?", "RLHF creates human-feedback data for alignment. Model testing produces an independent verdict on the resulting model behaviour."],
    ["Which models can eQOURSE test?", "LLMs, RAG and conversational agents, ASR, TTS, NLP classifiers, computer vision, video, multimodal and recommendation systems."],
    ["Do you test only accuracy?", "No. Testing can cover safety, fairness, robustness, factuality, groundedness, task success, latency, WER, CER, intent accuracy and user preference."],
    ["Can you test multilingual and accented models?", "Yes. Programmes support 30+ global languages with comprehensive Indian regional-language, accent, dialect, transliterated and code-mixed depth."],
    ["What does a testing report include?", "Overall and segment results, failure categories, severity, examples, confidence, agreement, pass or fail decisions and regression status."],
    ["How long does testing take?", "Timing depends on model access, scope, modalities, languages, evaluator qualifications, security and reporting depth."],
    ["What determines cost?", "Model type, scenarios, variants, languages, segments, evaluator expertise, repetitions, red-team depth, reporting and security."],
  ];
  const schema = { "@context":"https://schema.org", "@graph":[
    { "@type":"Service", "@id":`${canonical}#service`, name:"AI Model Testing & Evaluation Services", serviceType:"AI Model Testing and Evaluation", url:canonical, areaServed:"Worldwide", provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}, hasOfferCatalog:{"@type":"OfferCatalog",name:"AI Model Testing Service Lines",itemListElement:["AI Bias & Fairness Audit","AI Red Teaming & Safety Testing","LLM Evaluation","ASR & Speech Model Testing","Computer Vision Model Testing","Human Evaluation & A/B Testing"].map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))} },
    { "@type":"BreadcrumbList", itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"AI Model Testing",item:canonical}] },
    { "@type":"FAQPage", mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}})) },
  ]};
  return `<main data-seo-prerender="true">
    <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <span>AI Model Testing</span></nav>
    <h1>AI Model Testing &amp; Evaluation Services</h1><p>Test AI models the way they will actually be used—with real people, realistic inputs and conditions benchmarks miss. Evaluate LLM, speech, vision and multimodal systems for safety, bias, robustness and segment-level performance.</p><p><a href="/free-pilot">Get a Free Model Assessment</a> <a href="/contact-us">Talk to an Evaluation Specialist</a></p>
    <section><h2>What Is AI Model Testing?</h2><p>Model testing produces a decision-ready verdict on model behaviour. Training and RLHF create improvement data; testing shows what passed, what failed, who is affected and what must be re-tested.</p><p><a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">Explore LLM &amp; RLHF Data Annotation</a></p></section>
    <section><h2>How We Test AI Models</h2><h3><a href="/ai-data-services/model-testing/human-evaluation-ab-testing">Human Evaluation &amp; A/B Testing</a></h3><h3><a href="/ai-data-services/model-testing/asr-speech-model-testing">ASR &amp; Speech Model Testing</a></h3><h3><a href="/ai-data-services/model-testing/llm-evaluation">LLM Evaluation</a></h3><h3><a href="/ai-data-services/model-testing/ai-red-teaming">Edge Case Discovery &amp; Red Teaming</a></h3></section>
    <section><h2>Testing Services by Model Type</h2><p><a href="/ai-data-services/model-testing/llm-evaluation">LLM evaluation</a>, <a href="/ai-data-services/model-testing/bias-fairness-audit">AI bias and fairness audit</a>, <a href="/ai-data-services/model-testing/ai-red-teaming">AI red teaming and adversarial testing</a>, <a href="/ai-data-services/model-testing/asr-speech-model-testing">ASR and speech model testing</a>, <a href="/ai-data-services/model-testing/computer-vision-model-testing">computer vision model testing</a>, and human evaluation and A/B testing.</p></section>
    <section><h2>Your Model Scored 94%. On What?</h2><p>Benchmarks can hide contamination, unrealistic inputs and weak segments. <a href="/ai-data-services/cleaning-validation/llm-data-curation">LLM Training Data Curation</a> can check benchmark overlap and provenance.</p></section>
    <section><h2>Global Evaluators With India-Wide Language Depth</h2><p>500+ specialists support evaluation across 30+ global languages, with broad Indian regional-language, accent, dialect, code-mixed and romanised coverage.</p></section>
    <section><h2>Our AI Model Testing Process</h2><ol><li>Define the release decision</li><li>Map risks and segments</li><li>Build the test set</li><li>Calibrate evaluators</li><li>Run blinded evaluation</li><li>Analyse by segment</li><li>Decide and re-test</li></ol></section>
    <section><h2>One Number Is Not a Result</h2><p>Reports can include performance by segment, failure category and severity, examples, confidence intervals, inter-evaluator agreement, pass or fail decisions and regression status.</p></section>
    <section><h2>Test Set Construction</h2><p>Realistic, adversarial, edge, demographic, regression and expert-verified golden cases with documented coverage. <a href="/ai-data-services/annotation-labeling">Explore Data Annotation &amp; Labeling</a>.</p></section>
    <section><h2>Model Types We Test</h2><p>LLMs, ASR, TTS, NLP classifiers, computer vision, video, multimodal, recommendation and conversational-agent systems.</p></section>
    <section><h2>Security, Engagements and Cost</h2><p>ISO-certified processes support NDAs, controlled access, audit trails and defined retention. Engagements include pre-release, continuous, bias, red-team, test-set and second-opinion work. Cost depends on scope, segments, expertise, repetitions, reporting and security.</p></section>
    <section><h2>One AI Data Workflow</h2><p><a href="/ai-data-services/data-collection">Collect</a> → <a href="/ai-data-services/annotation-labeling">Annotate</a> → <a href="/ai-data-services/cleaning-validation">Clean and Validate</a> → Test → Improve.</p></section>
    <section><h2>Proof and Related Work</h2><p><a href="/ai-data-samples">AI data samples</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
    <section><h2>Frequently Asked Questions About AI Model Testing</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Find the Failure Before Your Users Do</h2><p><a href="/free-pilot">Get a Free Model Assessment</a> <a href="/contact-us">Talk to an Evaluation Specialist</a></p></section>
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildBiasFairnessFallback() {
  const canonical = `${SITE_URL}/ai-data-services/model-testing/bias-fairness-audit`;
  const faqs = [
    ["What is an AI bias audit?", "A structured measurement of whether an AI system produces materially different outcomes, or materially different quality of service, for different groups of people. It states which fairness definition was used, which groups were tested, what data the test ran on, and what disparities were found—with sample sizes and confidence intervals, so the finding can be checked."],
    ["Is a bias audit legally required for my system?", "It depends on jurisdiction and use case. Automated employment decision tools used in New York City require an annual independent bias audit. Colorado's SB 24-205 requires annual impact assessments for consequential employment decisions from 30 June 2026. Under the EU AI Act, transparency obligations came into force on 2 August 2026, while high-risk obligations were postponed to 2 December 2027 for stand-alone Annex III systems and 2 August 2028 for embedded Annex I systems. India's MeitY guidelines are voluntary but expect pre-deployment testing across gender, caste, religion and geography for credit, insurance, employment and service delivery. Confirm your specific obligations with counsel."],
    ["How long does an audit take?", "A baseline audit of one model in one or two languages typically takes 5–7 weeks, of which the first two are scoping and test-set construction. Re-audits against an existing baseline run 2–3 weeks."],
    ["We don't have demographic data on our users. Can you still audit?", "Usually yes, using counterfactual and matched-pair methods that construct the comparison rather than relying on labelled user attributes. This works particularly well for generative models. For outcome-disparity testing on historical decisions, some form of group attribution is needed."],
    ["Which fairness metric should we use?", "It depends on the decision. Equal opportunity is a common default for screening and eligibility decisions. Impact ratio is required where a regulation names it. Equalized odds suits high-stakes decisions where both false positives and false negatives carry real cost. The primary metric is agreed in writing before testing."],
    ["Can you audit an LLM, or only classification models?", "Both. LLMs use counterfactual prompt sets, name-conditioned probes, stereotype association batteries and demographically matched human raters rather than only confusion-matrix metrics."],
    ["Do you test for bias in Indian languages?", "Yes. We test in 12+ Indian languages including romanised and code-mixed input, with probe sets authored natively rather than machine-translated from English."],
    ["Will you certify our model as unbiased?", "No. Fairness is measured against defined groups, data and a point in time. We provide documented, repeatable measurement rather than a permanent certificate."],
    ["What happens if you find something serious?", "We report it with worked examples and quantified magnitude. Where the cause is data-side and identifiable, we state it. Remediation is a separate engineering decision."],
    ["Are you independent enough to satisfy NYC Local Law 144?", "We build no employment decision tools and sell no scoring models. Prior involvement is disclosed. Whether independence satisfies a statutory test is a question for counsel; we provide documentation of our role."],
  ];
  const schema = {"@context":"https://schema.org","@graph":[
    {"@type":"Service","@id":`${canonical}#service`,name:"AI Bias & Fairness Audit Services",serviceType:"AI bias audit and algorithmic fairness testing",description:"Independent AI bias and fairness audits across 30+ languages, covering outcome disparity, quality-of-service disparity and representational harm, with intersectional analysis and demographically stratified human evaluation panels.",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:["IN","SG","US","GB","AE","AU","EU"],isPartOf:{"@id":`${SITE_URL}/ai-data-services/model-testing#service`}},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"AI Model Testing",item:`${SITE_URL}/ai-data-services/model-testing`},{"@type":"ListItem",position:4,name:"Bias & Fairness Audit",item:canonical}]},
    {"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))},
  ]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/model-testing">AI Model Testing</a> / <span>Bias &amp; Fairness Audit</span></nav>
    <h1>AI Bias &amp; Fairness Audit Services</h1><p>Independent, evidence-based fairness testing for AI systems that influence decisions about people, across 30+ languages and market-relevant demographic dimensions.</p><p><a href="/contact-us">Request a Fairness Audit Scope</a> <a href="#report-contents">See What a Bias Audit Report Contains</a></p>
    <section><h2>What a Bias and Fairness Audit Actually Is</h2><p>An audit measures whether outcomes or quality of service differ between groups and reports distributions, metrics, samples and confidence. It is not red teaming, permanent certification or automatic mitigation. A useful audit is one that could have failed.</p></section>
    <section><h2>What Regulation Requires — and When</h2><p>As of August 2026: NYC Local Law 144 and Illinois AIVIA are in force; Colorado SB 24-205 is effective; EU AI Act Article 50 is in force while Annex III and Annex I high-risk obligations were postponed; India's MeitY framework is voluntary and the DPDP regime governs personal data. This is orientation, not legal advice. Last reviewed: August 2026.</p></section>
    <section><h2>The Three Kinds of Bias We Test For</h2><h3>Outcome disparity</h3><p>Different decisions or scores across groups.</p><h3>Quality-of-service disparity</h3><p>Different error rates, accuracy, WER or CER by group.</p><h3>Representational harm</h3><p>Stereotyping, erasure or name-conditioned output differences.</p></section>
    <section id="metric-conflict"><h2>Fairness Metrics — and How to Choose the Right One</h2><p>Impact ratio, demographic parity, equal opportunity, equalized odds, predictive parity, counterfactual fairness and per-group error rates answer different questions. Calibration and equalized odds cannot both hold when base rates differ. The primary metric is agreed before testing and others are reported alongside it.</p></section>
    <section><h2>Model Types We Audit</h2><p>LLMs and generative text, speech and ASR, computer vision and face, scoring and eligibility, recommenders and search, and document or OCR systems.</p></section>
    <section><h2>How We Run an Audit</h2><ol><li>Scope and metric selection</li><li>Data and attribute strategy</li><li>Test-set construction</li><li>Evaluator-panel assembly</li><li>Measurement and analysis</li><li>Reporting and walkthrough</li></ol></section>
    <section><h2>Bias Western Tooling Doesn't Look For</h2><p>Global protected classes matter. India and South Asia also require attention to caste, religion, geography, name signals, language, script, code-mixing, dialect, accent and proxy variables. Native context is part of the method.</p><p><a href="/ai-data-services/annotation-labeling/audio-speech-annotation">Audio &amp; Speech Annotation</a></p></section>
    <section><h2>Sample Sizes and Statistical Honesty</h2><p>Intersectional cells need adequate volume. Thin cells are labelled indicative rather than presented as defensible measured disparities.</p></section>
    <section id="report-contents"><h2>What You Get</h2><ul><li>Fairness audit report</li><li>Metric appendix</li><li>Method statement</li><li>Probe sets and test data</li><li>Intersectional breakdown</li><li>Remediation notes</li><li>Live walkthrough</li></ul><p>You keep the test sets.</p></section>
    <section><h2>Where Bias Audits Go Wrong</h2><p>Common failures include choosing metrics after results, marginal-only analysis, translated probes, unmatched pairs, unrepresentative panels, aggregate-only accuracy, one-time audits and biased ground truth.</p></section>
    <section><h2>What We Do Not Do</h2><p>We do not certify models as unbiased, provide legal advice, audit our own work, soften findings or choose a metric after seeing results.</p></section>
    <section><h2>How to Engage</h2><p>Baseline audit, multi-model or multilingual programme audit, and re-audit or monitoring cadence.</p></section>
    <section><h2>Related Services</h2><p><a href="/ai-data-services/model-testing/ai-red-teaming">AI Red Teaming &amp; Adversarial Testing</a>, <a href="/ai-data-services/model-testing/llm-evaluation">LLM Evaluation Services</a>, <a href="/ai-data-services/model-testing/asr-speech-model-testing">ASR &amp; Speech Model Testing</a> and <a href="/ai-data-services/model-testing/computer-vision-model-testing">Computer Vision Model Testing</a> are live. Other live links: <a href="/ai-data-services/cleaning-validation/dataset-qa-label-audit">Dataset QA &amp; Label Audit</a> and <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM &amp; RLHF Annotation</a>.</p></section>
    <section><h2>Frequently Asked Questions</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Find Out What Your Model Actually Does Across Groups</h2><p><a href="/contact-us">Request a Fairness Audit Scope</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildRedTeamingFallback() {
  const canonical = `${SITE_URL}/ai-data-services/model-testing/ai-red-teaming`;
  const faqs = [
    ["What is AI red teaming?", "Structured adversarial testing of an AI system by trained people who deliberately try to make it produce output it shouldn't, take actions it shouldn't, or reveal information it shouldn't. The deliverable is a set of reproducible attacks — each with exact reproduction steps, a severity rating and an impact assessment — not a score or a pass mark."],
    ["How is this different from a penetration test?", "A penetration test attacks infrastructure: networks, hosts, APIs, authentication and code execution. AI red teaming attacks model and system behaviour: guardrails, prompts, retrieval, memory and tool use. They are complementary and usually run by different teams. eQOURSE does not perform infrastructure penetration testing; where a behavioural finding opens onto an infrastructure issue, we report it and hand it over."],
    ["Can't we just use an automated red teaming tool?", "Use one — for regression coverage in your pipeline. But an automated scanner fires templates, and a template can only contain attacks somebody has already documented. It will not find a novel failure specific to your system, and it is weak at multi-turn attacks, which is where models most often break. The sensible programme runs scanners continuously and human red teams at milestones."],
    ["Which frameworks do you map findings to?", "OWASP Top 10 for LLM Applications (2025), OWASP Top 10 for Agentic Applications (2026), and the NIST AI Risk Management Framework functions. Where you are working toward ISO/IEC 42001, our method statement and evidence pack are structured to serve as measurement evidence for the management system."],
    ["Do you test agentic systems?", "Yes, and the method differs. Agentic systems add goal hijacking, tool misuse, memory and context poisoning, insecure inter-agent communication and cascading failure — none of which single-session chatbot testing reaches. We test across sessions deliberately, because a poisoned memory planted today can fire next week for a different user."],
    ["Why does language matter for red teaming?", "Safety training is not distributed evenly across languages, so an attack that fails in English can succeed in another language. Published 2026 research found that automated translated attack sets achieved a 59.8% mean jailbreak rate, rising to 75.8% when native-speaking human red teamers were involved — and concluded that translation quality is the critical determinant of success. In testing terms, that means a machine-translated attack set under-reports your risk. We author attack sets natively in every language in scope."],
    ["How long does an engagement take?", "A first engagement against a single system in two or three languages typically runs 6–7 weeks, including a week of scoping and threat modelling. Add roughly a week per additional language. Retests after remediation run 1–2 weeks."],
    ["Do you test in production?", "By default, no. We work in staging with production-like configuration. If production testing is genuinely necessary, it is scoped separately with written authorisation and explicit acceptance of the risk."],
    ["What happens if you find something critical?", "Critical findings are escalated within 24 hours of confirmation, through the escalation path agreed in the rules of engagement. They do not wait for the report."],
    ["Who owns the attack set afterwards?", "You do. It is delivered with the report so you can add it to your own regression suite and re-run it yourself. We retain nothing outside the restricted environment, and everything is destroyed on the agreed schedule."],
  ];
  const llm = [["LLM01","Prompt Injection"],["LLM02","Sensitive Information Disclosure"],["LLM03","Supply Chain"],["LLM04","Data & Model Poisoning"],["LLM05","Improper Output Handling"],["LLM06","Excessive Agency"],["LLM07","System Prompt Leakage"],["LLM08","Vector & Embedding Weaknesses"],["LLM09","Misinformation"],["LLM10","Unbounded Consumption"]];
  const agentic = [["ASI01","Agent Goal Hijack"],["ASI02","Tool Misuse & Exploitation"],["ASI03","Identity & Privilege Abuse"],["ASI04","Agentic Supply Chain"],["ASI05","Unexpected Code Execution"],["ASI06","Memory & Context Poisoning"],["ASI07","Insecure Inter-Agent Communication"],["ASI08","Cascading Failures"],["ASI09","Human-Agent Trust Exploitation"],["ASI10","Rogue Agents"]];
  const riskTable = (rows) => `<table><thead><tr><th scope="col">Code</th><th scope="col">Risk</th><th scope="col">How we test it</th></tr></thead><tbody>${rows.map(([code,risk])=>`<tr><th scope="row">${code}</th><td>${escapeHtml(risk)}</td><td>Human-led system-level adversarial probes with full transcripts, reproduction checks and severity mapping.</td></tr>`).join("")}</tbody></table>`;
  const schema = {"@context":"https://schema.org","@graph":[
    {"@type":"Service","@id":`${canonical}#service`,name:"AI Red Teaming & Adversarial Testing Services",serviceType:"AI red teaming and adversarial safety testing",description:"Human-led AI red teaming and adversarial testing for LLM, multimodal and agentic systems across 30+ languages, mapped to OWASP and NIST frameworks.",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:["IN","SG","US","GB","AE","AU","EU"],isPartOf:{"@id":`${SITE_URL}/ai-data-services/model-testing#service`}},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"AI Model Testing",item:`${SITE_URL}/ai-data-services/model-testing`},{"@type":"ListItem",position:4,name:"AI Red Teaming",item:canonical}]},
    {"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}
  ]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/model-testing">AI Model Testing</a> / <span>AI Red Teaming</span></nav>
    <h1>AI Red Teaming &amp; Adversarial Testing</h1><p>Trained human red teamers attack LLM and agentic systems across 30+ languages, then document every reproducible path with severity and impact.</p><p><a href="/contact-us">Scope a Red Team Engagement</a> <a href="#report-contents">See What a Red Team Report Contains</a></p>
    <section><h2>What AI Red Teaming Is — and What It Isn't</h2><p>Red teaming asks whether a system can be made to fail and produces successful, reproducible attacks. A <a href="/ai-data-services/model-testing/bias-fairness-audit">bias and fairness audit</a> asks whether it treats groups differently. <a href="/ai-data-services/model-testing/llm-evaluation">LLM evaluation</a> asks how well it does the job. Infrastructure penetration testing is not an eQOURSE service.</p></section>
    <section><h2>Frameworks We Test Against</h2><h3 id="owasp-llm-top-10">OWASP Top 10 for LLM Applications (2025)</h3>${riskTable(llm)}<p>Last reviewed: August 2026</p><h3 id="owasp-agentic-top-10">OWASP Top 10 for Agentic Applications (2026)</h3>${riskTable(agentic)}<p>Last reviewed: August 2026</p><h3 id="nist-ai-rmf-iso-42001">NIST AI RMF &amp; ISO/IEC 42001</h3><p>Findings map to Govern, Map, Measure and Manage, with method evidence suitable for an AI management system.</p></section>
    <section><h2>What We Actually Try</h2><p>Jailbreak and guardrail bypass; direct and indirect prompt injection; multi-turn drift; data and memory exfiltration; RAG and retrieval attacks; agentic tool misuse; harmful-content elicitation; misinformation; and availability or cost attacks.</p></section>
    <section><h2>The Multilingual Attack Surface</h2><p>Published 2026 research found a 59.8% mean jailbreak rate from automated translated attacks and 75.8% with native-speaking red teamers. The study covered Afrikaans, Kiswahili, isiXhosa and isiZulu; the percentages evidence the mechanism and are not measurements of Indian languages.</p><h3>What native speakers find that translation doesn't</h3><p>Register, honorifics, code-mixing, transliteration, culturally specific harm, idiom and indirection.</p><h3>Our language bench</h3><p>30+ global languages and 12+ Indian languages, including native-script, romanised and code-mixed variants. Attack sets are authored natively.</p></section>
    <section><h2>If Your System Takes Actions, the Surface Is Different</h2><p>Agentic systems add blast radius, persistent memory and chained failure. Human-in-the-loop is not a control until the confirmation step has been tested.</p></section>
    <section id="human-vs-automated"><h2>Human Red Teaming and Automated Scanning Do Different Jobs</h2><p>Scanners cover known templates continuously. Human red teams find novel, multi-turn failures at launch and capability changes. The sensible programme runs both.</p></section>
    <section><h2>How We Run an Engagement</h2><ol><li>Scope, authorisation and rules of engagement</li><li>Reconnaissance and threat modelling</li><li>Native attack-set construction</li><li>Logged multi-turn adversarial testing</li><li>Triage, severity and write-up</li><li>Report, walkthrough and optional retest</li></ol><p>A first engagement against one system in two or three languages typically runs 6–7 weeks.</p></section>
    <section><h2>How We Rate What We Find</h2><p>Critical, High, Medium, Low and Informational findings are rated by impact, effort and reproducibility. Critical confirmed findings are escalated within 24 hours.</p></section>
    <section><h2>Our Red Team Bench — and How We Look After It</h2><p>Controls include training, exposure limits, rotation, no-penalty opt-out, counselling access, supervised severe-category sessions and restricted handling. These safeguards also govern <a href="/ai-data-services/annotation-labeling/content-moderation">content moderation annotation</a>.</p></section>
    <section id="report-contents"><h2>What You Get</h2><ul><li>Findings report</li><li>Framework coverage matrix including gaps</li><li>Full attack transcripts</li><li>Client-owned attack set</li><li>Prioritised remediation notes</li><li>Executive summary</li><li>Live walkthrough</li><li>Optional retest</li></ul></section>
    <section><h2>Where Red Teaming Goes Wrong</h2><p>Single-turn testing, translated attack sets, missing reproduction checks, model-only scope, English-only coverage, absent severity, scanners presented as human teams, no wellbeing controls and reports that hide untested areas.</p></section>
    <section><h2>What We Do Not Do</h2><p>No infrastructure penetration testing, unauthorised systems, default production testing, CSAM generation or seeking, safety certification, publication or indefinite retention of findings. Absence of a finding is not evidence of safety.</p></section>
    <section><h2>How to Engage</h2><p>Pre-launch assurance, capability-change engagement or a continuous quarterly programme.</p></section>
    <section><h2>Related Services</h2><p><a href="/ai-data-services/model-testing/llm-evaluation">LLM Evaluation Services</a> <a href="/ai-data-services/model-testing/bias-fairness-audit">AI Bias &amp; Fairness Audit</a> <a href="/ai-data-services/model-testing/asr-speech-model-testing">ASR &amp; Speech Model Testing</a> <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM &amp; RLHF Annotation</a> <a href="/ai-data-services/annotation-labeling/content-moderation">Content Moderation Annotation</a> <a href="/ai-data-services/cleaning-validation/llm-data-curation">LLM Training Data Curation</a></p></section>
    <section><h2>Frequently Asked Questions</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Find Out How Your System Fails Before Someone Else Does</h2><p><a href="/contact-us">Scope a Red Team Engagement</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildLlmEvaluationFallback() {
  const canonical = `${SITE_URL}/ai-data-services/model-testing/llm-evaluation`;
  const faqs = [
    ["What is LLM evaluation?", "Structured measurement of how well a language model performs the task it was built for — factual accuracy, groundedness, instruction following, multi-turn coherence, domain correctness, safety behaviour and language quality — against a written rubric on a test set that reflects real usage. It differs from red teaming, which tries to break the model, and from A/B testing, which measures what users prefer in production."],
    ["We already use LLM-as-a-judge. Why would we need human evaluation?", "Because the judge needs a reference point. LLM judges reach over 80% agreement with humans on well-structured tasks, but they carry documented position, verbosity and self-preference biases, and a RAND study found no judge uniformly reliable across benchmarks. Industry guidance holds that divergence above 20–25% from human spot-checks means the judge needs recalibrating for your domain. Most teams have never measured their divergence. We baseline it, diagnose the bias pattern, recalibrate and monitor for drift — so you can keep evaluating at automated scale with numbers you can defend."],
    ["What is position bias in an LLM judge?", "A systematic preference for a response based on where it appears rather than how good it is. Research across roughly 150,000 evaluation instances and 15 judges found position bias varies significantly by judge and task and is not attributable to chance — some judges favour the first response, some the last. It matters most in pairwise comparison, which is how most model-versus-model evaluation is run. We randomise and counterbalance presentation order in human evaluation, and test for it explicitly when calibrating a judge."],
    ["How do you evaluate hallucination?", "We separate unsupported claims from contradicted ones, because they have different causes and different fixes. For RAG systems we check each claim against the retrieved context and verify that citations exist and actually support the claim attached to them. For open-domain generation, domain SMEs verify factual claims against authoritative sources. Fluent, confident, well-cited and wrong is the hardest case and the one that most needs a human who knows the field."],
    ["Do you evaluate RAG systems?", "Yes, and we measure retrieval and generation separately — context precision, context recall, faithfulness, answer relevance, citation accuracy and noise sensitivity. A blended quality score can't tell you whether retrieval missed the document or generation ignored it, and those need completely different fixes."],
    ["Can you evaluate agents that call tools?", "Yes. Agent evaluation covers task completion, tool selection, parameter accuracy, trajectory efficiency, error recovery, stopping behaviour and whether the agent's own report of what it did matches what it actually did. A correct final answer reached through a broken path passes end-state testing and fails in production."],
    ["Why can't we just use benchmark scores?", "Four reasons: benchmarks are published and may be in the training data; they measure benchmark-shaped questions rather than your users' messy real ones; a single headline number averages over exactly the slices you care about; and most are English-first, so strong benchmark performance says little about Tamil or Odia. Benchmarks are useful context. A golden set built from your own traffic is evidence."],
    ["Do you evaluate in Indian languages?", "Yes — 12+ Indian languages including romanised and code-mixed variants, with evaluation sets authored natively rather than translated from English. We report per language and never blend into a single multilingual score, because a strong English average routinely hides a weak result elsewhere."],
    ["How long does an evaluation take?", "A first engagement covering one or two languages typically runs 5–6 weeks, most of it in golden set construction and rubric calibration. Once those exist, subsequent cycles run 1–2 weeks. Judge calibration against an existing test set runs 2–3 weeks."],
    ["Who owns the golden set and rubrics?", "You do. They are built from your traffic, versioned, and delivered to you with the report — along with the calibrated judge configuration where that's in scope. The report describes one model at one moment; the golden set keeps working every release afterwards."],
  ];
  const capabilities = ["Factual accuracy and hallucination", "Groundedness and attribution", "Instruction following", "Multi-turn coherence", "Domain correctness", "Sentiment and intent accuracy", "Safety and policy compliance", "Agent trajectory", "Language and register quality"];
  const methods = [
    ["Reference-based scoring", "Known-correct reference answer", "Closed-form tasks, extraction and classification"],
    ["Rubric scoring", "Dimension-by-dimension human rating", "Open-ended generation"],
    ["Pairwise preference", "Counterbalanced comparison of two outputs", "Model and version comparison"],
    ["Rating with adjudication", "Senior review of disagreements", "High-stakes domain evaluation"],
    ["Error taxonomy annotation", "Product-specific failure labels", "Actionable improvement backlogs"],
    ["Golden set construction", "Curated, versioned reference cases", "Repeatable release evaluation"],
  ];
  const rag = [
    ["Context precision", "How much retrieved context was relevant?"], ["Context recall", "How much required evidence was retrieved?"], ["Faithfulness / groundedness", "Is every claim supported by context?"], ["Answer relevance", "Does it answer the actual question?"], ["Citation accuracy", "Do citations support their attached claims?"], ["Noise sensitivity", "Does irrelevant context change the answer?"]
  ];
  const failures = ["Uncalibrated judge trusted as ground truth", "Single-turn evaluation only", "Vague rubric", "Golden set built from clean questions", "Fluency mistaken for correctness", "Blended multilingual score", "Benchmarks used as product evidence", "Agent judged only on its final answer", "No agreement statistics", "Machine-translated evaluation sets"];
  const schema = {"@context":"https://schema.org","@graph":[
    {"@type":"Service","@id":`${canonical}#service`,name:"LLM Evaluation Services",serviceType:"Large language model evaluation and LLM-as-a-judge calibration",url:canonical,areaServed:"Worldwide",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},hasOfferCatalog:{"@type":"OfferCatalog",name:"LLM evaluation services",itemListElement:capabilities.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"AI Model Testing",item:`${SITE_URL}/ai-data-services/model-testing`},{"@type":"ListItem",position:4,name:"LLM Evaluation",item:canonical}]},
    {"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}
  ]};
  const table = (headers, rows) => `<table><thead><tr>${headers.map(h=>`<th scope="col">${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${escapeHtml(cell)}</th>`:`<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/model-testing">AI Model Testing</a> / <span>LLM Evaluation</span></nav>
    <h1>LLM Evaluation Services</h1><p>Human LLM evaluation across 30+ languages for hallucination, RAG groundedness, instruction following, multi-turn and agent trajectory testing, plus LLM-as-a-judge calibration against measured human agreement.</p><p><a href="/contact-us">Scope an Evaluation</a> <a href="#judge-calibration">Calibrate Your LLM Judge</a></p>
    <section><h2>What LLM Evaluation Actually Measures</h2><p>Evaluation asks whether the model is good at the job it was built for. <a href="/ai-data-services/model-testing/ai-red-teaming">Red teaming</a> asks whether it can be made to fail; <a href="/ai-data-services/model-testing/bias-fairness-audit">fairness auditing</a> asks whether it treats groups differently; and <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">RLHF annotation</a> creates training data.</p>${table(["Not the same as","Difference"],[["A/B testing","Measures user preference in production"],["Red teaming","Tries to make the system fail"],["RLHF annotation","Produces preference data that trains the model"],["Public benchmarks","Measure general capability on potentially contaminated data"]])}</section>
    <section><h2>LLM Evaluation Capabilities</h2><ul>${capabilities.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul></section>
    <section><h2>Human Evaluation Methods</h2>${table(["Method","How it works","Best for"],methods)}</section>
    <section id="judge-calibration"><h2>Calibrate the Judge Before You Trust the Score</h2><p>Human reference labels → automated judge on the same set → overall and per-slice divergence → diagnose position, verbosity and self-preference bias → recalibrate and monitor drift.</p><p>Published research reports over 80% agreement on well-structured tasks, position effects across roughly 150,000 instances and 15 judges, no judge uniformly reliable across benchmarks and frontier-model errors above 50% on difficult bias benchmarks. The 20–25% human-review divergence range shown here is directional industry guidance, not a standards-body threshold.</p></section>
    <section><h2>Evaluate RAG and Agents as Systems</h2>${table(["RAG dimension","Question"],rag)}<h3>Agent trajectory evaluation</h3><p>Review task completion, tool selection, parameter accuracy, path efficiency, error recovery, stopping behaviour, system-state changes and whether the agent's report matches what it actually did.</p></section>
    <section><h2>Golden Sets Beat Benchmark Theatre</h2><p>Public benchmarks can be contaminated, English-first and unlike real traffic. We build versioned evaluation sets from representative tasks, known failures, languages and difficulty slices. The client owns the golden set and rubrics.</p><p><a href="/ai-data-services/cleaning-validation/llm-data-curation">Explore LLM Training Data Curation</a>.</p></section>
    <section><h2>Multilingual LLM Evaluation</h2><p>Native evaluators support 30+ global languages and 12+ Indian languages, including native-script, romanised, transliterated and code-mixed inputs. Results are reported per language so an English average cannot hide regional failure.</p></section>
    <section><h2>How an LLM Evaluation Engagement Runs</h2><ol><li>Scope and success definition</li><li>Golden set construction</li><li>Rubric and rater calibration</li><li>Blinded evaluation</li><li>Failure analysis and taxonomy</li><li>Report and walkthrough</li></ol><p>Baseline evaluation is typically 5–6 weeks, judge calibration 2–3 weeks and recurring release-cycle evaluation 1–2 weeks per cycle, depending on scope.</p></section>
    <section><h2>What You Receive</h2><ul><li>Evaluation report and per-slice results</li><li>Versioned golden set</li><li>Rubric and anchor examples</li><li>Item-level scores and rationales</li><li>Inter-rater agreement report</li><li>Judge-calibration configuration where scoped</li><li>Failure taxonomy and reusable regression set</li><li>Live walkthrough with the ML team</li></ul></section>
    <section><h2>Where LLM Evaluation Goes Wrong</h2><ul>${failures.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul></section>
    <section><h2>What We Do Not Do</h2><p>We do not sell an evaluation platform, hide dimensions inside one unexplained score, treat an uncalibrated judge as ground truth, tune the client's model or reuse a client's golden set.</p></section>
    <section><h2>Related Services</h2><p><a href="/ai-data-services/model-testing/human-evaluation-ab-testing">Human Evaluation &amp; A/B Testing</a> <a href="/ai-data-services/model-testing/ai-red-teaming">AI Red Teaming</a> <a href="/ai-data-services/model-testing/bias-fairness-audit">AI Bias &amp; Fairness Audit</a> <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM &amp; RLHF Annotation</a> <a href="/ai-data-services/cleaning-validation/llm-data-curation">LLM Training Data Curation</a> <a href="/ai-data-services/cleaning-validation/dataset-qa-label-audit">Dataset QA &amp; Label Audit</a></p></section>
    <section><h2>LLM Evaluation Frequently Asked Questions</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Build Evaluation Evidence Your Team Can Defend</h2><p><a href="/contact-us">Scope an Evaluation</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildAsrSpeechTestingFallback() {
  const canonical = `${SITE_URL}/ai-data-services/model-testing/asr-speech-model-testing`;
  const faqs = [
    ["What is ASR testing?", "Structured measurement of a speech recognition system's accuracy and robustness — word and character error rates, plus semantic and entity-level error rates, diarization accuracy, formatting quality and latency — across the languages, accents, demographics and acoustic conditions your users actually present. The output is a per-stratum report and a typed error backlog, not a single accuracy figure."],
    ["Isn't WER enough?", "No. WER weights every error equally, can penalise a more accurate model when references miss valid speech, and scores formatting variants as errors. We report WER for comparability alongside metrics that reflect what the product depends on."],
    ["What is missed entity rate?", "The proportion of important terms — names, drug names, amounts, account IDs, phone numbers and addresses — that failed to survive transcription. Published comparisons reported 0% versus 8.3% on drug names and 19.6% versus 30.0% on phone numbers."],
    ["Why does regional accent matter so much in India?", "The Voice of India benchmark covered 15 languages and 139 regional clusters across 306,230 utterances. District WER ranged roughly 4%–44%; one model scored about 5% on Hindi, 20.9% on Bhojpuri and 24.8% on Maithili."],
    ["Do you test code-mixed speech?", "Yes. Hinglish, Tanglish, Benglish and mid-sentence switching are included as spontaneous speech, not only read prompts."],
    ["Can you test in noisy and telephone conditions?", "Yes. We test telephone bandwidth, codec chains, graded noise, reverberation, far-field capture and overlapping speech, preferably from the real production path. Published Voice of India results moved from 15.31% to 25.20% WER across audio-quality quartiles."],
    ["How do you make sure reference transcripts are accurate?", "We agree verbatim or clean standards, use native-variety transcribers, double-pass a sample, report inter-transcriber agreement, document normalisation and identify the human-reference ceiling."],
    ["What is ASR hallucination and do you test for it?", "Some end-to-end speech models produce fluent fabricated text for silence, noise or non-speech. We probe it explicitly because fabricated speech can become fabricated intent downstream."],
    ["How is this different from audio annotation?", "Audio and speech annotation produces transcripts and labelled audio used to train or fine-tune a model. ASR testing produces error rates and failure analysis used to decide whether a model is fit to ship."],
    ["How long does it take, and can we reuse the test set?", "A first programme covering two or three languages with regional strata typically runs 5–6 weeks. The versioned test set is delivered to you, so later model versions can run in 1–2 weeks."],
  ];
  const table = (headers, rows) => `<table><thead><tr>${headers.map(h=>`<th scope="col">${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${escapeHtml(cell)}</th>`:`<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const metrics = [["WER","Word insertions, deletions and substitutions","Baseline comparability"],["CER","Character-level error","Indic scripts and rich morphology"],["Semantic error rate","Whether meaning survived","Meaning-sensitive products"],["Missed entity rate","Whether critical terms survived","Names, drugs, amounts, IDs and phone numbers"],["Keyword / intent accuracy","Whether downstream words survived","Assistants, IVR and commands"],["Diarization error rate","Speaker attribution and overlap","Calls, meetings and consultations"],["Formatting accuracy","Casing, punctuation and numerals","Human or parser consumption"],["Latency / real-time factor","Speed under load","Streaming and agents"]];
  const regional = [["District-level WER range","~4% Nainital to ~44% Mannarakkat"],["Best overall model, Hindi","~5% WER"],["Same model, Bhojpuri","20.9% WER"],["Same model, Maithili","24.8% WER"],["Hindi-belt districts","Below 10%"],["Kerala, interior Karnataka","Substantially higher"],["Female vs male speakers","3.1–4.3 points better for female speakers"],["Speakers aged 18–22","Higher error rates"],["Audio-quality quartiles","15.31% → 25.20% WER"]];
  const acoustic = [["Telephone bandwidth","8 kHz, codecs and packet loss","Wideband-trained models degrade"],["Background noise","Traffic, crowd, home, office and machinery","Performance has a cliff"],["Reverberation & distance","Echo, far-field mic and speakerphone","Common in real deployment"],["Overlapping speech","Interruptions and multiple speakers","Diarization and transcription fail together"],["Compression & pipeline","Codec chains and resampling","Production differs from test audio"],["Disfluency & hesitation","False starts, fillers and correction","Absent from read prompts"]];
  const engagement = [["01","Scope & metric selection","Week 1","Metrics, languages and conditions"],["02","Test set design","Weeks 1–3","Matched, stratified test set"],["03","Reference transcription","Weeks 2–4","Native-variety references and agreement"],["04","Measurement","Weeks 4–5","Metrics per stratum"],["05","Failure analysis","Weeks 5–6","Typed error backlog"],["06","Report & walkthrough","Week 6","Findings and reusable assets"]];
  const deliverables = [["Accuracy report","Every agreed metric by language, region, demographic and condition"],["Missed entity analysis","Critical terms by category"],["Error taxonomy","Failures ranked by frequency and impact"],["Audio examples","Clip for every error class"],["Reference transcripts and test set","Versioned and reusable"],["Agreement statistics","Reference quality before findings"],["Condition curves","Where performance falls off"],["Live walkthrough","Engineering review"]];
  const failures = [["WER only","Critical errors averaged away","Use entity and semantic metrics"],["Single national number","4%–44% spread hidden","Report every stratum"],["Unmatched group difficulty","Condition gap mistaken for accent gap","Control content and condition"],["Studio audio only","Production path omitted","Reproduce the actual path"],["Standard-variety transcribers","Reference errors attributed to model","Use native-variety transcribers"],["No normalisation policy","Valid variants score as errors","Document rules first"],["Read prompts only","Natural speech absent","Include spontaneous conversation"],["Diarization ignored","Right words, wrong speaker","Measure DER"],["Hallucination untested","Fabricated transcript passes","Use silence and non-speech probes"],["Ceiling ignored","Reference limits look like model error","State measurement ceiling"]];
  const models = [["Baseline accuracy programme","Full matched baseline","5–6 weeks"],["Accent & dialect audit","Regional coverage","3–4 weeks"],["Release-cycle testing","Repeat regression test","1–2 weeks"],["Vendor comparison","Matched provider comparison","Scoped"]];
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${canonical}#service`,name:"ASR & Speech Model Testing",serviceType:"Speech recognition model testing and evaluation",url:canonical,areaServed:"Worldwide",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"AI Model Testing",item:`${SITE_URL}/ai-data-services/model-testing`},{"@type":"ListItem",position:4,name:"ASR & Speech Model Testing",item:canonical}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/model-testing">AI Model Testing</a> / <span>ASR &amp; Speech Model Testing</span></nav><h1>ASR &amp; Speech Model Testing</h1><p>Speech recognition testing across WER, CER, semantic and entity error rates, diarization and noisy-condition performance in 30+ languages and regional accents.</p>
    <section><h2>What We Test</h2><p>Transcription accuracy; accent, dialect and demographic coverage; acoustic robustness; speaker attribution and structure; and downstream usability.</p></section>
    <section id="beyond-wer"><h2>Why Word Error Rate Isn't Enough</h2><p>Every error weighs the same, better capture can be penalised, the human reference is not neutral and valid formatting variants can score as errors.</p>${table(["Metric","What it measures","When it matters"],metrics)}</section>
    <section><h2>Accent, Dialect and Regional Testing</h2><p>The external Voice of India benchmark evaluated 15 major Indian languages and 139 regional clusters—306,230 utterances, 536 hours and 36,691 speakers.</p>${table(["Finding","Published number"],regional)}<p>Source: Voice of India benchmark, 2026. External evidence, not eQOURSE measurement.</p></section>
    <section><h2>Testing Under Real Conditions</h2>${table(["Condition","What we test","Why it bites"],acoustic)}</section>
    <section><h2>Voice Agents and Conversational Systems</h2><p>Endpointing, barge-in, latency under load, error propagation, correction and recovery, plus ASR hallucination on silence, noise and non-speech.</p></section>
    <section><h2>The Reference Transcript Is Part of the Test</h2><p>Native-variety transcribers, double-pass agreement, documented normalisation and a stated measurement ceiling.</p><p><a href="/ai-data-services/annotation-labeling/audio-speech-annotation">Audio &amp; Speech Annotation</a></p></section>
    <section><h2>How an Engagement Runs</h2>${table(["Step","Activity","Window","Output"],engagement)}</section>
    <section><h2>What You Get</h2>${table(["Deliverable","Contents"],deliverables)}</section>
    <section><h2>Where ASR Testing Goes Wrong</h2>${table(["Failure","What happens","How we avoid it"],failures)}</section>
    <section><h2>What We Do Not Do</h2><p>We do not build or tune ASR models, report one blended number in isolation, accept unaudited sampling as representative or process voice data outside agreed controls.</p></section>
    <section><h2>How to Engage</h2>${table(["Programme","Best fit","Window"],models)}</section>
    <section><h2>Related Services</h2><p><a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-services/model-testing/human-evaluation-ab-testing">Human Evaluation &amp; A/B Testing</a> <a href="/ai-data-services/annotation-labeling/audio-speech-annotation">Audio &amp; Speech Annotation</a> <a href="/ai-data-services/model-testing/bias-fairness-audit">AI Bias &amp; Fairness Audit</a> <a href="/ai-data-services/model-testing/llm-evaluation">LLM Evaluation</a> <a href="/ai-data-services/data-collection">Data Collection</a> <a href="/ai-data-services/cleaning-validation/dataset-qa-label-audit">Dataset QA &amp; Label Audit</a></p></section>
    <section><h2>ASR &amp; Speech Model Testing FAQs</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Find Out What Your Accuracy Number Is Hiding</h2><p><a href="/contact-us">Scope an ASR Test Programme</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildComputerVisionTestingFallback() {
  const canonical = `${SITE_URL}/ai-data-services/model-testing/computer-vision-model-testing`;
  const faqs = [
    ["What is computer vision model testing?", "Structured measurement of how a vision model performs on imagery that reflects its deployment environment — reported per class, per condition, per device and per cohort rather than as a single aggregate figure."],
    ["Why isn't mAP enough?", "Because it is an average, and production vision failures concentrate rather than spread. We report per class and per slice, at the confidence threshold you actually deploy."],
    ["Our model scores well but fails in production. Why?", "Usually because the test set resembles the training data rather than the deployment environment. We examine capture, environmental, semantic and population shift."],
    ["Can you build the test images, or do we have to supply them?", "We can build them across regions, devices, lighting and conditions when deployment imagery is missing."],
    ["Do you test face recognition for bias?", "We test cohort × condition cells and appearance factors, including skin reflectance where it provides a more useful measurement than perceived skin tone. Formal fairness and regulatory mapping moves to our bias and fairness audit service."],
    ["Do you test OCR in Indian scripts?", "Yes — Devanagari, Bengali, Tamil, Telugu, Gujarati, Gurmukhi, Odia and Urdu, across print quality, handwriting, layout and capture method."],
    ["Can you evaluate vision-language models?", "Yes. We cover visual hallucination, grounding, spatial reasoning, counting, reading text in images, fine-grained distinction and abstention."],
    ["How good does our ground truth need to be?", "Better than training data: documented edge cases, adjudication and reported agreement are required for a defensible test."],
    ["How is this different from your annotation services?", "Annotation produces labelled training data. Computer vision testing produces error rates and failure analysis used to decide whether a model is fit to ship."],
    ["How long does it take, and is the test set reusable?", "A first programme typically runs 6–7 weeks, or 4–5 with suitable imagery. The versioned test set is delivered for reuse."],
  ];
  const table = (headers, rows) => `<table><thead><tr>${headers.map(h=>`<th scope="col">${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${escapeHtml(cell)}</th>`:`<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const systems = [["Object detection","Per-class precision, recall, localisation, FPPI and miss rate by size"],["Classification","Per-class accuracy, confusion and calibration"],["Segmentation","Per-class IoU, boundary accuracy and instance separation"],["Tracking & video","Identity switches, fragmentation and re-identification"],["OCR & document AI","Character and field accuracy by script, layout and capture"],["Face & person systems","Rates across cohorts, conditions and appearance factors"],["Vision-language models","Grounding, counting and hallucination"],["3D & point cloud","Accuracy by range, density, weather and sensor"]];
  const metrics = [["Per-class AP","Which classes work","Report instance counts"],["Precision / recall at operating threshold","Production trade-off","Avoid unused thresholds"],["FPPI","Operator burden","Absolute alerts matter"],["Miss rate by size / distance","Where detection falls off","Treat small objects separately"],["IoU distribution","Whether boxes are usable","A mean can hide a split"],["Per-slice breakdown","Condition and cohort failures","Where production failures live"],["Confidence calibration","Whether scores mean what logic assumes","Confident errors are costly"],["ID switches & fragmentation","Identity continuity","Tracking averages can hide failure"]];
  const ocr = [["Script","Latin and eight major Indian scripts","Conjuncts, diacritics and ligatures"],["Print quality","Digital to degraded or stamped-over","Copy loss has its own curve"],["Handwriting","Print, cursive and mixed","Field accuracy diverges"],["Layout","Tables, forms, rotation and skew","Structure errors differ"],["Capture","Scanner and phone imagery","Angle, glare, curl and shadow"],["Field extraction","Correct value in correct field","What workflows consume"]];
  const deliverables = [["Slice-level accuracy report","Metrics per class, condition, device, location and cohort"],["Failure atlas","Actual images grouped by cause and counted"],["Error taxonomy","Root causes ranked by frequency × cost"],["Operating-point analysis","Precision and recall at production thresholds"],["Versioned test set","Reusable imagery and reference annotations"],["Annotation agreement","Reference quality reported before findings"],["Class-definition findings","Ambiguities surfaced through review"],["Live walkthrough","Evidence reviewed with the vision team"]];
  const failures = [["Single mAP headline","A collapsing class disappears","Per-class and per-slice reporting"],["Training-like test set","Home-turf measurement","Deployment-led sourcing"],["Post-hoc slices","Flattering cuts","Pre-agreed slices"],["Noisy test annotation","Label error looks like model error","Reference-standard adjudication"],["Unused thresholds","Results do not describe production","Actual operating point"],["Small objects averaged in","Distance failures vanish","Size-band miss rate"],["Demographics alone","Condition effects stay hidden","Cohort × condition"],["Character accuracy only","Fields remain unusable","Workflow-level metrics"],["Fluent VLM descriptions","Hallucination scores well","Grounding and abstention"],["One-time evaluation","Drift goes unseen","Versioned re-testing"]];
  const programmes = [["Baseline vision evaluation","Full test-set and slice measurement","6–7 weeks"],["Test-set construction only","Sourcing and reference annotation","4–5 weeks"],["Release-cycle testing","Repeat against baseline","1–2 weeks"],["Deployment-site audit","Focused drift investigation","2–3 weeks"]];
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${canonical}#service`,name:"Computer Vision Model Testing Services",serviceType:"Independent computer vision model testing and evaluation",url:canonical,areaServed:"Worldwide",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"AI Model Testing",item:`${SITE_URL}/ai-data-services/model-testing`},{"@type":"ListItem",position:4,name:"Computer Vision Model Testing",item:canonical}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/model-testing">AI Model Testing</a> / <span>Computer Vision Model Testing</span></nav><h1>Computer Vision Model Testing Services</h1><p>Independent evaluation for object detection, classification, segmentation, tracking, OCR, face systems and vision-language models across real deployment conditions.</p>
    <section><h2>What We Test</h2>${table(["System","Measurement"],systems)}</section>
    <section id="beyond-map"><h2>Why mAP Is Not the Whole Story</h2><p>An illustrative aggregate mAP of 0.91 can still contain an unusable night-rain, small-object or rare-class slice. All values are illustrative.</p>${table(["Metric","Question answered","Interpretation"],metrics)}</section>
    <section><h2>Test Sets Built for Deployment</h2><p>We control device, lighting, weather, geography, scale, occlusion, rarity and temporal drift. <a href="/ai-data-services/data-collection/image-data-collection">Image data collection</a> can source missing evaluation imagery.</p><h3>Distribution shift</h3><ul><li>Capture shift</li><li>Environmental shift</li><li>Semantic drift</li><li>Population shift</li></ul></section>
    <section><h2>Face, Person and OCR Testing</h2><p>Face and person systems are evaluated across cohort × condition cells. We use skin reflectance where it provides a more useful measurement than perceived skin tone. Formal fairness framing belongs in the <a href="/ai-data-services/model-testing/bias-fairness-audit">AI Bias &amp; Fairness Audit</a>.</p>${table(["Dimension","Coverage","Why it matters"],ocr)}</section>
    <section><h2>Vision-Language Model Evaluation</h2><p>We test visual hallucination, grounding, spatial reasoning, counting, text-in-image reading, fine-grained distinction and uncertainty.</p><h3>Ground Truth Is Part of the Test</h3><p>Reference annotations use documented edge cases, adjudication and reported agreement. <a href="/ai-data-services/annotation-labeling/image-annotation">Image annotation</a> creates training labels; testing measures fitness to ship.</p></section>
    <section><h2>How an Engagement Runs</h2><ol><li>Scope and slice definition</li><li>Test-set design and sourcing</li><li>Reference annotation</li><li>Evaluation</li><li>Failure analysis</li><li>Report and walkthrough</li></ol><h3>What You Receive</h3>${table(["Deliverable","Contents"],deliverables)}</section>
    <section><h2>Where Vision Testing Goes Wrong</h2>${table(["Failure","Consequence","Control"],failures)}<h3>What We Do Not Do</h3><p>We do not tune the client's model, report one unexplained aggregate, treat unaudited labels as ground truth, or support unlawful biometric surveillance.</p><h3>How to Engage</h3>${table(["Programme","Best fit","Window"],programmes)}</section>
    <section><h2>Related Services</h2><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> <a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation</a> <a href="/ai-data-services/annotation-labeling/document-ocr-annotation">Document &amp; OCR Annotation</a> <a href="/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation">3D Point Cloud &amp; LiDAR Annotation</a> <a href="/ai-data-services/model-testing/bias-fairness-audit">AI Bias &amp; Fairness Audit</a> <a href="/ai-data-services/data-collection">Data Collection</a></p></section>
    <section><h2>Computer Vision Model Testing FAQs</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Find the Failure Slices Your Average Is Hiding</h2><p><a href="/contact-us">Scope a Computer Vision Test Programme</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildHumanEvaluationFallback() {
  const canonical = `${SITE_URL}/ai-data-services/model-testing/human-evaluation-ab-testing`;
  const faqs = [
    ["Do you run our A/B test?", "No. A live experiment runs on the client's infrastructure. eQOURSE supplies blind human quality and safety-floor scoring of sampled outputs, and separately runs the complete offline comparison study before production."],
    ["Why not just use thumbs up/down data?", "It is directionally useful at volume, but response is low and non-random and often correlates more with engagement than output quality."],
    ["What makes a preference comparison trustworthy?", "Blinding, counterbalanced order, a piloted rubric, graded preference with ties, reason codes, a representative panel and measured inter-rater agreement."],
    ["What is the peeking problem?", "Checking repeatedly before a planned endpoint can inflate false positives. We ask about monitoring cadence and recommend an appropriate statistical design, but do not run the client's statistics."],
    ["Our offline evals and our A/B test disagree. Which is right?", "Potentially both: offline evaluation measures a rubric, while live behaviour also reflects latency, length, formatting and friction. We investigate the outputs and explain the divergence."],
    ["How many comparisons do we need?", "It depends on effect size and pilot-observed variance. We size the human study from a pilot and state plainly when the sample cannot support the desired claim."],
    ["Can you compare models in Indian languages?", "Yes. Coverage includes 12+ Indian languages with native-speaker raters, native-script, romanised and code-mixed registers, within 30+ global languages."],
    ["What if the two models are equally good?", "We report a tie. The decision can then move to cost and latency instead of forcing a preference that does not exist."],
    ["How is this different from your RLHF annotation service?", "RLHF annotation creates preference data used to train a model. Human evaluation creates preference evidence used to choose between model candidates."],
    ["How is this different from your LLM evaluation service?", "LLM evaluation asks how good one model is against a rubric. Human evaluation compares candidates head to head and asks which one should ship."],
  ];
  const table = (headers, rows) => `<table><thead><tr>${headers.map(h=>`<th scope="col">${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${escapeHtml(cell)}</th>`:`<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const boundary = [["Own traffic, flags and rollout","Design and run the human judgement layer"],["Run the experiment and compute significance","Score sampled outputs blind, at the agreed cadence"],["Decide ship criteria","Report whether the quality signal supports the decision"],["Hold business metrics","Produce the quality metric those metrics cannot see"]];
  const signals = [["Thumbs up / down","Cheap, always-on directional signal","Low, non-random response and engagement bias"],["Outcome metrics","Retention, completion and conversion","Lagging, noisy and confounded"],["Behavioural proxies","Acceptance, regeneration, copy and edit","Useful but still proxies"],["Automated eval scores","Cheap regression measurement","Measures what the rubric or judge encodes"],["Safety floors","Hallucination, toxicity and PII constraints","Passing does not identify the better model"]];
  const failures = [["Unblinded raters","Expectation becomes preference","Strip labels and formatting tells"],["Fixed order","Position becomes quality","Randomise and counterbalance"],["Forced binary choice","Ties become coin flips","Use graded preference with tie"],["Wrong panel","Wrong population measured","Recruit to a documented user profile"],["Peeking","Noise can ship as a win","Agree check cadence; recommend sequential methods"],["Historical power only","Changed variance leaves the study underpowered","Size from pilot-observed variance"],["Single generation","One draw becomes a model property","Repeat where the call is close"],["Aggregate-only reporting","A harmed segment disappears","Report standard slices"],["Thumbs-up as quality","Engagement is mistaken for quality","Use rubric-anchored judgement"],["Binary winner framing","A costly narrow win reads as a mandate","Always report preference strength"],["No agreement statistics","Signal cannot be separated from noise","Report alpha or kappa first"]];
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${canonical}#service`,name:"Human Evaluation & A/B Testing Services",serviceType:"Human preference evaluation and AI model comparison",url:canonical,areaServed:"Worldwide",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"AI Model Testing",item:`${SITE_URL}/ai-data-services/model-testing`},{"@type":"ListItem",position:4,name:"Human Evaluation & A/B Testing",item:canonical}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/model-testing">AI Model Testing</a> / <span>Human Evaluation &amp; A/B Testing</span></nav>
    <h1>Human Evaluation &amp; A/B Testing</h1><p>Blind, order-randomised human comparison that tells you which model to ship, plus quality and safety-floor scoring of sampled production traffic while your experiment runs.</p><p><a href="/contact-us">Scope a Model Comparison</a> <a href="#live-experiments">Supporting a Live Experiment</a></p>
    <section><h2>Who Does What</h2><p>A live A/B test runs on the client's infrastructure. eQOURSE owns the blind comparison before production and the human quality signal sampled while the experiment runs.</p>${table(["Client owns","eQOURSE supplies"],boundary)}</section>
    <section><h2>Human Preference Evaluation</h2><p>Equivalent outputs are compared without labels or formatting tells. Order is randomised and counterbalanced, the rubric is piloted, ties are allowed, reasons are captured and agreement is measured.</p></section>
    <section><h2>Why Existing Metrics Cannot Decide</h2>${table(["Signal","Useful for","Why it cannot decide quality"],signals)}</section>
    <section id="live-experiments"><h2>Supporting a Live Experiment</h2><p>Stratified sampling, blind scoring on cadence, quality guardrails, safety-floor monitoring, segment breakdowns and offline-versus-online divergence diagnosis. The client runs the experiment and computes significance.</p></section>
    <section><h2>Getting the Statistics Right</h2><h3>Peeking</h3><p>Repeated checks before the planned endpoint can inflate false positives.</p><h3>Variance moved</h3><p>A model change can alter metric variance, so sample planning starts with a pilot.</p><h3>Non-determinism</h3><p>Close decisions use multiple generations rather than treating one draw as the whole model.</p></section>
    <section><h2>Representative People, Measured Agreement</h2><p>Panels are recruited by user profile, language, region and domain across 30+ global languages, including 12+ Indian languages and native-script, romanised and code-mixed use.</p></section>
    <section><h2>Quality Is Not the Only Axis</h2><p>Preference strength is read beside latency and cost. Any example values in the visual explanation are illustrative, not client results.</p></section>
    <section><h2>How an Engagement Runs</h2><ol><li>Scope and decision</li><li>Sample and rubric</li><li>Panel calibration</li><li>Blind comparison</li><li>Analysis</li><li>Report and walkthrough</li></ol><p>A first comparison is typically 4–5 weeks; later comparisons 1–2 weeks; live scoring batches 2–4 days. All are scope-dependent estimates.</p></section>
    <section><h2>What You Receive</h2><ul><li>Preference report with confidence intervals and slices</li><li>Strength distribution and tie rate</li><li>Reason-code analysis and worked examples</li><li>Agreement statistics and panel composition</li><li>Segment warnings</li><li>Reusable rubric and calibration set</li><li>Live quality scoring where scoped</li><li>Product and ML walkthrough</li></ul></section>
    <section><h2>Where Human Evaluation Goes Wrong</h2>${table(["Failure","Consequence","Control"],failures)}<h3>What We Do Not Do</h3><p>We do not run production A/B infrastructure, compute the client's significance, force a winner, substitute an unmatched crowd or reuse client prompts and rubrics.</p></section>
    <section><h2>Related Services</h2><p><a href="/ai-data-services/model-testing/llm-evaluation">LLM Evaluation</a> <a href="/ai-data-services/model-testing/bias-fairness-audit">AI Bias &amp; Fairness Audit</a> <a href="/ai-data-services/model-testing/ai-red-teaming">AI Red Teaming</a> <a href="/ai-data-services/model-testing/asr-speech-model-testing">ASR &amp; Speech Model Testing</a> <a href="/ai-data-services/model-testing/computer-vision-model-testing">Computer Vision Model Testing</a> <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM &amp; RLHF Annotation</a></p></section>
    <section><h2>Human Evaluation &amp; A/B Testing FAQs</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Make the Model Decision With Evidence</h2><p><a href="/contact-us">Scope a Model Comparison</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildHumanDemonstrationsFallback() {
  const canonical = `${SITE_URL}/robotics-training-data-services/human-demonstrations`;
  const table = (headers, rows) => `<table><thead><tr>${headers.map(h => `<th scope="col">${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const methods = [["Leader-follower teleoperation","High-fidelity arm and gripper trajectories","Action and state logs, synchronized video, success state"],["VR or handheld teleoperation","Spatial manipulation and mobile tasks","Controller pose, robot state, RGB or RGB-D, task events"],["Kinesthetic teaching","Direct physical guidance on suitable robots","Joint states, force or torque where available, keyframes"],["Egocentric human demonstrations","Human strategy and hand-object interaction","Head or chest video, task steps, object states, outcomes"],["Multi-view human demonstrations","Occlusion-aware task understanding","Overhead, side and close views aligned to one episode"]];
  const diversity = [["Object variation","Shape, size, weight, material and appearance"],["Layout","Position, orientation, clutter and distractors"],["Operator","Handedness, pace, reach and natural strategy"],["Environment","Lighting, background, surface and workspace"],["Instruction","Wording, language, ambiguity and order"],["Outcome","Success, partial completion, failure and recovery"],["Temporal","Speed, pauses, repetitions and long-horizon drift"]];
  const quality = [["Completeness","Required streams and task stages are present"],["Synchronization","Sensor, action and video timestamps align"],["Task validity","Episode follows the approved protocol"],["Outcome integrity","Success, failure and recovery are correctly marked"],["Calibration","Camera and sensor calibration metadata is present"],["Annotation consistency","Labels follow the agreed schema and definitions"],["Privacy and consent","Approved capture and participant controls are documented"],["Traceability","Episode provenance, version and QA status remain auditable"]];
  const failures = [["Only successful episodes","Models do not learn recovery","Capture deliberate failures and corrections"],["One operator","Strategy overfits to one person","Balance operators and natural approaches"],["Single camera","Occlusion hides critical actions","Use synchronized egocentric and external views"],["Unlogged interventions","Autonomy appears better than it is","Mark every operator takeover"],["Weak synchronization","State cannot be matched to perception","Validate timestamp drift per episode"],["Inconsistent task resets","Episodes are not comparable","Use a documented reset state"],["Uncontrolled object variation","Coverage cannot be measured","Plan a variation matrix"],["Missing calibration","Geometry becomes unreliable","Deliver calibration files and checks"],["Ambiguous success labels","Training targets conflict","Define observable completion criteria"],["No long-tail tasks","Production exceptions remain unseen","Reserve rare and difficult scenarios"],["Format-only handover","Dataset cannot be audited","Include manifests, schema and QA report"]];
  const formats = [["LeRobot","Episode-first robotics datasets and policy learning workflows"],["RLDS","Sequence-based reinforcement-learning datasets"],["HDF5","Custom synchronized multimodal arrays and metadata"],["ROS bag / MCAP","Robot and sensor message replay where scoped"],["Parquet / JSONL","Episode manifests, events, annotations and provenance"]];
  const faqs = [["What is human demonstration data for robotics?","It is a recorded example of a person completing a physical task, captured with the actions, observations, states, outcomes and context a robot-learning system needs."],["Which demonstration methods do you support?","We support leader-follower and VR teleoperation, kinesthetic teaching, egocentric human demonstrations and synchronized multi-view capture, subject to the robot and environment."],["Can you collect failure and recovery episodes?","Yes. We design deliberate mistakes, partial completion, blocked actions and recovery attempts so the dataset represents more than clean success paths."],["How many demonstrations do we need?","The right quantity depends on task complexity, variation and model stage. A directional starting point is often 500–1,000 episodes per task variant, then expanded from coverage and error analysis rather than treated as a guarantee."],["How do you ensure task diversity?","We plan coverage across objects, layout, operator, environment, instruction, outcome and temporal behaviour, then track the completed matrix during collection."],["What quality checks are performed?","Each episode can be checked for completeness, synchronization, task validity, outcome integrity, calibration, annotation consistency, privacy controls and traceability."],["Which formats can you deliver?","Depending on the programme, we can prepare LeRobot, RLDS, HDF5, ROS bag or MCAP, and Parquet or JSONL manifests with schemas and QA documentation."],["Can you work with our robot and task setup?","Yes. The programme begins with the embodiment, task, sensors, safety constraints, environment and acceptance criteria supplied or approved by the client."],["Do you provide robotics hardware or train the model?","Our core service is the data programme. Hardware procurement, robot operation and model training are included only when explicitly scoped with suitable partners or client infrastructure."],["Who owns the collected data?","Ownership and permitted use are defined in the project agreement. Client data is isolated, access-controlled and not reused to train unrelated models without written authorization."]];
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${canonical}#service`,name:"Human Demonstration Data Services for Robotics",serviceType:"Robotics human demonstration and teleoperation data collection",url:canonical,areaServed:"Worldwide",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"Robotics Training Data",item:`${SITE_URL}/robotics-training-data-services`},{"@type":"ListItem",position:3,name:"Human Demonstrations",item:canonical}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a]) => ({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/robotics-training-data-services">Robotics Training Data</a> / <span>Human Demonstrations</span></nav>
    <h1>Human Demonstration Data for Robotics</h1><p>Task demonstrations captured through teleoperation, egocentric and synchronized multi-view setups, with action-state alignment, deliberate failure and recovery, per-episode QA and training-ready handover.</p><p><a href="/free-pilot">Scope a Demonstration Pilot</a> <a href="/contact-us">Talk to a Robotics Data Specialist</a></p>
    <section><h2>Why Robot Learning Needs More Than Successful Video</h2><p>A useful episode preserves what the operator saw, did and achieved. It also records pauses, corrections, partial completion and recovery so perception can be aligned with action and outcome.</p></section>
    <section><h2>Human Demonstration Collection Methods</h2>${table(["Method","Best for","Typical signals"],methods)}</section>
    <section><h2>Designed Task Diversity</h2>${table(["Coverage axis","Variation planned"],diversity)}</section>
    <section><h2>Failure and Recovery Are Training Signals</h2><p>We capture complete episodes: initial state, attempted action, observable failure, intervention or correction, recovery path and final outcome.</p></section>
    <section><h2>Per-Episode Quality Control</h2>${table(["Quality dimension","Acceptance check"],quality)}</section>
    <section><h2>Training-Ready Formats and Handover</h2>${table(["Format","Use"],formats)}<p>Delivery can include episode manifests, schemas, calibration files, collection protocol, version history, exception log and QA report.</p></section>
    <section><h2>How a Human Demonstration Programme Runs</h2><ol><li>Embodiment and task scoping</li><li>Protocol and schema design</li><li>Pilot and operator calibration</li><li>Structured collection</li><li>Per-episode QA</li><li>Packaging and validation</li><li>Coverage review and iteration</li></ol></section>
    <section><h2>Where Demonstration Datasets Go Wrong</h2>${table(["Failure","Consequence","Control"],failures)}<h3>What We Do and Do Not Do</h3><p>We design, operate and validate the scoped data programme. We do not claim that episode count alone guarantees policy performance, hide operator interventions or reuse client data outside the agreed purpose.</p></section>
    <section><h2>Related Robotics Data Services</h2><p><a href="/robotics-training-data-services">Robotics Training Data Services</a> <a href="/ai-data-services/data-collection">AI Data Collection</a> <a href="/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation">3D Point Cloud &amp; LiDAR Annotation</a></p></section>
    <section><h2>Human Demonstration Data FAQs</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Build Demonstrations Around the Task Your Robot Must Perform</h2><p><a href="/free-pilot">Scope a Demonstration Pilot</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildMultimodalSensorDataFallback() {
  const canonical = `${SITE_URL}/robotics-training-data-services/multimodal-sensor-data`;
  const sensors = [["RGB video","Appearance and visual feedback","Tens of fps"],["Depth and point cloud","Metric geometry and surface structure","Tens of fps"],["Proprioception","Joint, pose and gripper state","Hundreds–thousands of Hz"],["Force and torque","Contact and insertion feedback","Hundreds–thousands of Hz"],["Tactile","Pressure, slip and deformation","Sensor-dependent"],["IMU","Acceleration and rotation","Hundreds–thousands of Hz"],["Audio","Contact and failure signatures","Audio rates"]];
  const rates = [["Nearest-neighbour","Closest high-rate sample","Can introduce half a frame of error"],["Zero-order hold","Carry last value forward","Wrong for fast continuous signals"],["Linear interpolation","Interpolate to frame time","Can erase transients"],["Aggregation","Min, max or mean in window","Loses event shape"],["Native rate","Keep the original stream","Requires a capable loader"]];
  const sync = [["Software timestamping","Tens of milliseconds, drifting"],["Network time protocol","Sub-millisecond with PTP"],["Hardware triggering","Best available alignment"]];
  const checks = [["Alignment verification","Cross-stream offset measured at start and end"],["Calibration residual","Reprojection and transform residual retained"],["Gap and dropout scan","Missing samples and resets logged"],["Cross-modal consistency","Visual and proprioceptive motion compared"],["Loadability test","Pilot loaded through the client pipeline"]];
  const failures = [["Synchronisation never measured","Policy learns lag","Measure per episode"],["Interpolation undocumented","Transients disappear","Record method per stream"],["Extrinsic inverted","Spatial fusion is wrong","State and verify direction"],["Force uncompensated","Gripper weight becomes contact","Gravity and CoM calibration"],["Calibration drift","Unknown affected range","Version and validity interval"]];
  const services = [["Human Demonstrations","We create the episodes"],["Multimodal Sensor Data","We capture and align the signals"],["3D & Spatial Annotation","We label the world"],["VLA Evaluation","We score the model"],["Deployment Validation","We verify it in place"]];
  const faqs = [["What is multimodal sensor data in robotics?","Synchronised streams captured during a robot episode with a common time reference and known spatial relationships. Several files from roughly the same session are not a multimodal dataset."],["How accurate does synchronisation need to be?","The tolerance depends on the task and is measured per episode."],["What is the difference between hardware triggering and software timestamps?","Software timestamps can drift; PTP disciplines clocks; a common hardware trigger gives the best available alignment."],["Why does the rate mismatch matter?","Video and high-rate force or state require a documented alignment decision that changes what the model learns."],["What is force-torque gravity compensation?","It separates gripper and payload weight from genuine contact force across robot orientations."],["Do we need tactile and force sensing?","Contact-rich tasks usually do; adding it later can require recollection."],["What metadata comes with the data?","Identifiers, checksums, clocks, offsets, drift, gaps, calibration residuals, versions, QA and withdrawal history."],["Can you audit an existing dataset?","Yes. We assess sync, calibration and metadata integrity and separate recoverable defects from required recollection."],["Which formats do you deliver?","LeRobot, RLDS, HDF5, ROS bag, MCAP or raw streams with a manifest."],["How is this different from human demonstration collection?","Human Demonstrations creates episodes; Multimodal Sensor Data aligns and documents the signals beside them."]];
  const table = (headers, rows) => `<table><thead><tr>${headers.map(h=>`<th scope="col">${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${escapeHtml(cell)}</th>`:`<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${canonical}#service`,name:"Multimodal Sensor Data Services for Robotics",serviceType:"Synchronized robotics sensor data collection and validation",url:canonical,provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"Robotics Training Data",item:`${SITE_URL}/robotics-training-data-services`},{"@type":"ListItem",position:3,name:"Multimodal Sensor Data",item:canonical}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/robotics-training-data-services">Robotics Training Data</a> / <span>Multimodal Sensor Data</span></nav>
    <h1>Multimodal Sensor Data for Robot Learning</h1><p>Vision, depth, proprioception, force-torque, tactile, IMU and audio aligned to a measured synchronisation error with documented calibration and per-episode lineage.</p><p><a href="/contact-us">Scope a Capture Programme</a> <a href="#synchronisation">How We Verify Synchronisation</a></p>
    <section><h2>Multimodal Does Not Mean Several Files from the Same Session</h2><p>A video folder, a state CSV and a force log recorded during roughly the same session are not verified multimodal evidence. The deliverable is proof that streams agree about time and space.</p></section>
    <section><h2>What We Capture</h2>${table(["Modality","Training signal","Typical rate"],sensors)}</section>
    <section><h2>The Rate Mismatch</h2>${table(["Approach","What it does","Cost"],rates)}</section>
    <section id="synchronisation"><h2>Synchronisation, Measured Rather Than Assumed</h2>${table(["Method","Realistic alignment"],sync)}</section>
    <section><h2>How We Verify Before Delivery</h2>${table(["Check","Evidence"],checks)}</section>
    <section><h2>Where Multimodal Capture Goes Wrong</h2>${table(["Failure","Consequence","Control"],failures)}</section>
    <section><h2>Robotics Service Map</h2>${table(["Page","Deliverable"],services)}</section>
    <section><h2>How a Programme Runs</h2><ol><li>Sensor scope and specification</li><li>Rig instrumentation</li><li>Calibration</li><li>Alignment verification</li><li>Pilot batch</li><li>Volume capture</li><li>Ongoing verification</li></ol></section>
    <section><h2>Formats and Delivery</h2><p>LeRobot, RLDS, HDF5, ROS bag, MCAP or raw synchronised streams with per-stream manifest, measured sync error, calibration package and lineage record.</p></section>
    <section><h2>Related Services</h2><p><a href="/robotics-training-data-services/human-demonstrations">Human Demonstrations</a> <a href="/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation">3D Point Cloud &amp; LiDAR Annotation</a> <a href="/ai-data-services/cleaning-validation/data-validation-verification">Data Validation &amp; Verification</a></p></section>
    <section><h2>Multimodal Sensor Data FAQs</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Find Out Whether Your Streams Actually Agree</h2><p><a href="/contact-us">Scope a Capture Programme</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildHomepageFallback() {
  return `<main data-seo-prerender="true">
      <h1>AI Data Services &amp; Content Solutions for Global Teams</h1>
      <p>eQOURSE delivers production-ready AI training data and scalable learning content through specialist-led, ISO-aligned global workflows.</p>
      <section>
        <h2>AI Data Services for Production-Ready AI</h2>
        <p>Build dependable models with <a href="/ai-data-services/data-collection">AI data collection</a>, <a href="/ai-data-services/annotation-labeling">data annotation and labeling</a>, <a href="/ai-data-services/cleaning-validation">data cleaning and validation</a>, <a href="/ai-data-services/model-testing">AI model testing</a>, and <a href="/robotics-training-data-services">robotics training data</a>.</p>
      </section>
      <section>
        <h2>Content Services for Education &amp; Learning Businesses</h2>
        <p>Scale curriculum, assessments, digital learning, video, localization, accessibility and publishing workflows through our <a href="/content-services">content services</a>.</p>
      </section>
      <section>
        <h2>How We Work</h2>
        <p>Every engagement follows a documented path from discovery and pilot design through specialist production, multi-stage quality assurance and scalable delivery.</p>
      </section>
      <section>
        <h2>AI Data &amp; Content Services Case Studies</h2>
        <p>Explore measurable outcomes across AI data operations, model quality, education content and multilingual delivery in our <a href="/case-studies">case studies</a>.</p>
      </section>
      <section>
        <h2>Why Global Teams Choose eQOURSE</h2>
        <p>More than 500 specialists support global programmes across 30+ languages with ISO 9001 and ISO 27001 aligned processes.</p>
      </section>
      <p><a href="/free-pilot">Start a Free Pilot</a> <a href="/contact-us">Contact eQOURSE</a></p>
    </main>`;
}

/* Legacy draft kept out of execution; the compact fallback below is authoritative.
function buildThreeDSpatialAnnotationFallback() {
  const canonical = `${SITE_URL}/robotics-training-data-services/3d-spatial-annotation`;
  const table = (headers, rows) => `<table><thead><tr>${headers.map(h => `<th scope="col">${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const annotations = [["6-DoF object pose","Position and orientation relative to a declared frame","Pose training and pick planning"],["Grasp pose sets","Approach vector, gripper configuration and width","Task-conditioned manipulation"],["Affordance regions","Graspable, pourable and pushable surfaces","Language grounding"],["3D part segmentation","Handle, lid, spout, button and hinge","Part-level instructions"],["Articulation","Joint axis, origin, limits and waypoints","Doors, drawers, tools and valves"],["Physical properties","Mass, friction and deformability class","Simulation-ready assets"]];
  const failures = [["One grasp per object","Brittle policy","Deliver grasp sets"],["No task conditioning","Grasp blocks the next action","Label permitted tasks"],["Symmetry ignored","Equivalent pose penalised","Declare symmetry classes"],["Simulation read as proof","Hardware failure hidden","Report hardware evidence separately"],["Inverted transform","Every fusion is wrong","State and verify direction"]];
  const faqPairs = [["What is 3D spatial annotation for robotics?","It labels how a robot can interact with objects through grasp sets, affordances, 6-DoF pose, functional parts and articulation."],["How is this different from LiDAR annotation?","LiDAR perception annotation labels what is where; spatial manipulation annotation labels how to interact with it."],["Why not one correct grasp?","There is no single correct grasp. Quality depends on coverage, exclusion, task conditioning and the end effector."],["Can you verify automated annotations?","Yes. We review feasibility, constraints, hard cases, coverage and systematic generator failure patterns."],["Is simulation enough?","Simulation is a filter, not proof. Hardware results are reported separately when access is in scope."],["How do you handle symmetry?","Equivalent rotations are declared per object and handled explicitly in annotation and evaluation."],["How is 6-DoF ground truth established?","Methods include markers, motion capture, CAD alignment, refinement and multi-view consistency."],["Can you prepare articulated assets?","Yes, including joints, parts, collision meshes, physical properties and actuated URDF or MJCF validation."],["How is quality measured?","Coverage overlap, exclusion agreement, task consistency, physical verification and geometric error where applicable."],["How quickly can you start?","Verification can reach first delivery in about two weeks; from-scratch work usually reaches a cleared pilot in about three weeks, subject to scope."]];
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service",name:"3D & Spatial Annotation for Robot Manipulation",url:canonical,provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}},{"@type":"BreadcrumbList",itemListElement":[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"Robotics Training Data",item:`${SITE_URL}/robotics-training-data-services`},{"@type":"ListItem",position:3,name:"3D & Spatial Annotation",item:canonical}]},{"@type":"FAQPage",mainEntity:faqPairs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/robotics-training-data-services">Robotics Training Data</a> / <span>3D &amp; Spatial Annotation</span></nav><h1>3D &amp; Spatial Annotation for Robot Manipulation</h1><p>Grasp poses, affordance regions, 6-DoF object pose, part structure and articulation—the annotations a robot needs to interact rather than merely detect.</p><section><h2>Perception Tells You What Is There. Manipulation Needs How.</h2><p>For perception cuboids and scene tracks, see <a href="/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation">3D point cloud &amp; LiDAR annotation</a>. If a gripper is involved, this is the right service.</p></section><section><h2>What We Annotate</h2>${table(["Annotation type","Contains","Used for"],annotations)}</section><section><h2>There Is No Single Correct Grasp</h2><p>A single canonical grasp is the wrong quality definition. We measure coverage, correct exclusion, task conditioning, gripper specificity and robustness.</p></section><section id="verifying-automation"><h2>Verifying Automated Annotation</h2><p>Published automatic-annotation research reported a 26.6% physics pass rate and 23.2% final retention on its own audited suite. We verify candidates and report systematic generator failure patterns.</p></section><section><h2>Physics Validation Is Not Real-World Validation</h2><p>Simulation is a filter. Hardware evidence is separately measured by object class when access is explicitly in scope.</p></section><section><h2>Establishing 6-DoF Pose Ground Truth</h2><p>Markers, motion capture, CAD alignment, refinement and multi-view consistency are selected by object class, with symmetry declared.</p></section><section><h2>How a Programme Runs</h2><ol><li>Scope and guideline</li><li>Asset preparation</li><li>Annotator calibration</li><li>Pilot batch</li><li>Production or verification</li><li>Physical verification</li><li>Guideline iteration</li></ol></section><section><h2>Where 3D Spatial Annotation Goes Wrong</h2>${table(["Failure","Consequence","Control"],failures)}</section><section><h2>Related Services</h2><p><a href="/robotics-training-data-services/human-demonstrations">Human Demonstrations</a> <a href="/robotics-training-data-services/multimodal-sensor-data">Multimodal Sensor Data</a> <a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a></p></section><section><h2>3D Spatial Annotation FAQs</h2>${faqPairs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Grasp Sets, Not Grasp Labels</h2><p><a href="/contact-us">Scope an Annotation Programme</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

*/
function buildThreeDSpatialAnnotationFallback() {
  const canonical = SITE_URL + "/robotics-training-data-services/3d-spatial-annotation";
  const faqPairs = [
    ["What is 3D spatial annotation for robotics?", "It labels how a robot can interact with objects through grasp sets, affordances, 6-DoF pose, functional parts and articulation."],
    ["How is this different from LiDAR annotation?", "LiDAR perception annotation labels what is where; spatial manipulation annotation labels how to interact with it."],
    ["Why not one correct grasp?", "There is no single correct grasp. Quality depends on coverage, exclusion, task conditioning and the end effector."],
    ["Can you verify automated annotations?", "Yes. We review feasibility, constraints, hard cases, coverage and systematic generator failure patterns."],
    ["Is simulation enough?", "Simulation is a filter, not proof. Hardware results are reported separately when access is in scope."],
    ["How do you handle symmetry?", "Equivalent rotations are declared per object and handled explicitly in annotation and evaluation."],
    ["How is 6-DoF ground truth established?", "Methods include markers, motion capture, CAD alignment, refinement and multi-view consistency."],
    ["Can you prepare articulated assets?", "Yes, including joints, parts, collision meshes, physical properties and actuated URDF or MJCF validation."],
    ["How is quality measured?", "Coverage overlap, exclusion agreement, task consistency, physical verification and geometric error where applicable."],
    ["How quickly can you start?", "Verification can reach first delivery in about two weeks; from-scratch work usually reaches a cleared pilot in about three weeks, subject to scope."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: "3D & Spatial Annotation for Robot Manipulation", url: canonical, provider: { "@type": "Organization", name: "eQOURSE", url: SITE_URL + "/" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" }, { "@type": "ListItem", position: 2, name: "Robotics Training Data", item: SITE_URL + "/robotics-training-data-services" }, { "@type": "ListItem", position: 3, name: "3D & Spatial Annotation", item: canonical }] },
    { "@type": "FAQPage", mainEntity: faqPairs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ] };
  const faqHtml = faqPairs.map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("");
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/robotics-training-data-services">Robotics Training Data</a> / <span>3D &amp; Spatial Annotation</span></nav><h1>3D &amp; Spatial Annotation for Robot Manipulation</h1><p>Grasp poses, affordance regions, 6-DoF object pose, part structure and articulation—the annotations a robot needs to interact rather than merely detect.</p><section><h2>Perception Tells You What Is There. Manipulation Needs How.</h2><p>For perception cuboids and scene tracks, see <a href="/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation">3D point cloud &amp; LiDAR annotation</a>.</p></section><section><h2>What We Annotate</h2><ul><li>6-DoF object pose</li><li>Task-conditioned grasp pose sets</li><li>Affordance regions</li><li>Functional part segmentation</li><li>Articulation and physical properties</li></ul></section><section><h2>There Is No Single Correct Grasp</h2><p>We measure coverage, correct exclusion, task conditioning, gripper specificity and robustness.</p></section><section id="verifying-automation"><h2>Verifying Automated Annotation</h2><p>Published automatic-annotation research reported 26.6% physics validation and 23.2% final retention on its own audited suite. We verify candidates and report generator failure patterns.</p></section><section><h2>Physics Validation Is Not Real-World Validation</h2><p>Simulation is a filter. Hardware evidence is separately measured when explicitly in scope.</p></section><section><h2>How a Programme Runs</h2><ol><li>Scope and guideline</li><li>Asset preparation</li><li>Annotator calibration</li><li>Pilot batch</li><li>Production or verification</li><li>Physical verification</li><li>Guideline iteration</li></ol></section><section><h2>Related Services</h2><p><a href="/robotics-training-data-services/human-demonstrations">Human Demonstrations</a> <a href="/robotics-training-data-services/multimodal-sensor-data">Multimodal Sensor Data</a> <a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a></p></section><section><h2>3D Spatial Annotation FAQs</h2>${faqHtml}</section><section><h2>Grasp Sets, Not Grasp Labels</h2><p><a href="/contact-us">Scope an Annotation Programme</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\u003c")}</script></main>`;
}

function buildVlaEvaluationFallback() {
  const canonical = `${SITE_URL}/robotics-training-data-services/vla-evaluation`;
  const faqs = [
    ["What is VLA evaluation?", "Controlled measurement of robot-policy capability, failure behaviour, recovery and generalisation using a documented protocol and a trial count that supports the claim."],
    ["How many rollouts do we need?", "There is no universal count. The count is derived from the decision, effect size and pilot-observed variance, with uncertainty stated beside every result."],
    ["Why do different labs report different numbers for the same model?", "Action representation, state source, preprocessing, control rate, reset procedure and success criteria can materially change the result when they are not documented consistently."],
    ["Why does recovery rate matter alongside success rate?", "Policies with similar success can behave very differently after failure. Recovery distinguishes retries, loops and genuine correction."],
    ["What failure modes do you classify?", "The taxonomy begins with grasp instability, repetition loops, state mismatch and precision misalignment, then extends to the client's tasks."],
    ["Can we just use benchmark leaderboard results?", "Leaderboards track the field, but they do not establish performance on the client's robot, fixture and operating assumptions."],
    ["Should we evaluate in simulation or on real hardware?", "Simulation supports regression and coverage; hardware supports physical performance claims. Where both run, the gap is reported by task class."],
    ["What is a human baseline and why would we want one?", "Trained operators run the identical fixture and protocol so policy performance has a practical scale and fixture constraints become visible."],
    ["Why does the choice of summary statistic matter?", "Different reasonable summaries can reverse a ranking when performance distributions cross, so the statistic is agreed before trials and alternatives are reported."],
    ["How is this different from deployment validation?", "VLA evaluation compares policy capability under controlled conditions; deployment validation checks a specific system in a specific operational place before go-live."],
  ];
  const table = (heads, rows) => `<table><thead><tr>${heads.map(h=>`<th>${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${escapeHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service",name:"VLA Evaluation & Robot Policy Benchmarking",url:canonical,provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"Robotics Training Data",item:`${SITE_URL}/robotics-training-data-services`},{"@type":"ListItem",position:3,name:"VLA Evaluation",item:canonical}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/robotics-training-data-services">Robotics Training Data</a> / <span>VLA Evaluation</span></nav><h1>VLA Evaluation &amp; Robot Policy Benchmarking</h1><p>Real-robot evaluation run at trial counts that can support a conclusion, with the protocol documented, failures classified, recovery measured and performance anchored to a human baseline on the same fixture.</p><section><h2>What VLA Evaluation Measures</h2>${table(["Question","Evidence"],[["How capable is it?","Success on trained tasks"],["How does it fail?","Failure taxonomy and recovery"],["How far does it generalise?","Novel objects, scenes, instructions and initial conditions"]])}</section><section><h2>Why Two Labs Get Different Numbers From the Same Model</h2><p>A number without its complete action, state, preprocessing, reset and fixture configuration is not a reproducible result.</p></section><section id="how-many-rollouts"><h2>How Many Rollouts You Actually Need</h2>${table(["Claim","Method"],[["Estimate one success rate","Choose a target confidence interval"],["Compare two policies","Power for the smallest useful difference"],["Choose an architecture","Use powered trials or a distributional protocol"]])}</section><section><h2>Success Rate Hides How a Policy Fails</h2><p>Recovery is reported beside success, with calibrated failure classes and per-trial evidence.</p></section><section><h2>The Summary Statistic Is a Methodological Commitment</h2><p>The statistic is agreed before the run and reasonable alternatives are reported.</p></section><section><h2>Testing Transfer, Not Memorisation</h2><p>Generalisation is separated across object, scene, instruction and initial-condition axes.</p></section><section><h2>Simulation and Hardware Answer Different Questions</h2><p>Simulation supports regression and coverage. Hardware supports claims about physical performance.</p></section><section><h2>Anchoring to a Human Baseline</h2><p><a href="/robotics-training-data-services/human-demonstrations">Human demonstration operators</a> run the same fixture and protocol.</p></section><section><h2>How an Evaluation Runs</h2><ol><li>Protocol design</li><li>Fixture and reset calibration</li><li>Operator calibration</li><li>Pilot cell</li><li>Trial execution</li><li>Human baseline</li><li>Analysis and report</li></ol></section><section><h2>Where VLA Evaluation Goes Wrong</h2><p>Underpowered trial counts, missing intervals, unrecorded configuration, post-hoc statistics and unstated success criteria are prevented at protocol lock.</p></section><section><h2>Related Robotics Services</h2><p><a href="/robotics-training-data-services/human-demonstrations">Human Demonstrations</a> <a href="/robotics-training-data-services/multimodal-sensor-data">Multimodal Sensor Data</a> <a href="/robotics-training-data-services/3d-spatial-annotation">3D &amp; Spatial Annotation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a></p></section><section><h2>VLA Evaluation FAQs</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Find Out What Your Evaluation Can Actually Establish</h2><p><a href="/contact-us?service=vla-evaluation">Scope an Evaluation</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildDeploymentValidationFallback() {
  const canonical = `${SITE_URL}/robotics-training-data-services/deployment-validation`;
  const faqs = [
    ["What is robot deployment validation?", "Structured observation of a robot application doing its real work in its target environment against acceptance criteria agreed before testing."],
    ["Do you certify robots as safe?", "No. eQOURSE is not a notified body, safety certifier or CE-marking consultancy. We produce operational evidence for the integrator and assessor."],
    ["Why is robot certification not enough?", "The application includes robot, task, tooling and environment. Certification of the robot does not describe the complete operating application."],
    ["How long does validation take?", "Typically four to eight weeks on site, driven by shifts and required cycle counts. Timing is scope-dependent."],
    ["What is habituation?", "People change how they behave around a familiar robot over time, so sustained observation can reveal a different operating risk profile from week one."],
    ["Do you record near-misses?", "Yes. Near-misses, stops and interventions are logged against a defined severity scale with time and environmental context."],
    ["How is this different from VLA evaluation?", "VLA evaluation compares policy capability under controlled trials; deployment validation checks a specific application in its real operational site."],
    ["What if you observe something serious?", "It is escalated immediately through the pre-agreed path, and eQOURSE will not continue observing a situation it considers unsafe."],
  ];
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service",name:"Robot Deployment Validation",url:canonical,provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"Robotics Training Data",item:`${SITE_URL}/robotics-training-data-services`},{"@type":"ListItem",position:3,name:"Deployment Validation",item:canonical}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/robotics-training-data-services">Robotics Training Data</a> / <span>Deployment Validation</span></nav><h1>Robot Deployment Validation</h1><p>Structured observation of the robot doing its actual job, in its actual place, over enough cycles to produce operational evidence for your integrator and assessor.</p><section><h2>You Cannot Validate a Robot. You Validate an Application.</h2><p>The application is robot, task, tooling and environment together. Change any one and it needs validating again.</p></section><section id="the-boundary"><h2>What We Do—and What We Do Not Sign</h2><p>eQOURSE is not a notified body, safety certifier or CE-marking consultancy. We do not issue conformity assessments, sign risk assessments or certify a system as safe. We produce the operational evidence; your integrator and assessor produce the safety case.</p></section><section><h2>Where the Standards Stand</h2><p>As of August 2026, ISO 10218-1:2025 and ISO 10218-2:2025 are in force; ISO/TS 15066 is no longer standalone; ISO 25785-1 remains in development. This is orientation, not conformity advice.</p></section><section><h2>What We Validate</h2><ul><li>Task success in situ</li><li>Sustained throughput</li><li>Environmental variation</li><li>Recovery and intervention</li><li>Human-robot interaction</li><li>Endurance and edge cases</li></ul></section><section><h2>Acceptance Criteria Before Anything Runs</h2><p>Success, throughput, intervention, recovery, conditions, duration, cycle counts, stop triggers and failure consequences are agreed before results exist.</p></section><section><h2>Incident and Near-Miss Logging</h2><p>Events are classified against a defined severity scale with timestamps, environmental context, observer agreement and immediate escalation.</p></section><section><h2>How Validation Runs</h2><ol><li>Scope and criteria</li><li>Site familiarisation</li><li>Observer calibration</li><li>Baseline observation</li><li>Structured observation</li><li>Endurance phase</li><li>Evidence pack</li></ol></section><section><h2>Related Robotics Services</h2><p><a href="/robotics-training-data-services/vla-evaluation">VLA Evaluation</a> <a href="/robotics-training-data-services/human-demonstrations">Human Demonstrations</a> <a href="/robotics-training-data-services/multimodal-sensor-data">Multimodal Sensor Data</a> <a href="/robotics-training-data-services/3d-spatial-annotation">3D &amp; Spatial Annotation</a></p></section><section><h2>Deployment Validation FAQs</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Find Out How It Behaves in Month Two</h2><p><a href="/contact-us?service=deployment-validation">Scope a Validation</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\u003c")}</script></main>`;
}

function buildCrawlFallback({ path, title, description, crawlHtml = "", source }) {
  if (path === "/") return buildHomepageFallback();
  if (path === "/ai-data-services/data-collection") return buildDataCollectionFallback();
  if (path === "/ai-data-services/data-collection/image-data-collection") return buildImageDataCollectionFallback();
  if (path === "/ai-data-services/data-collection/audio-data-collection") return buildAudioDataCollectionFallback();
  if (path === "/ai-data-services/data-collection/text-data-collection") return buildTextDataCollectionFallback();
  if (path === "/ai-data-services/data-collection/video-data-collection") return buildVideoDataCollectionFallback();
  if (path === "/ai-data-services/annotation-labeling") return buildAnnotationLabelingFallback();
  if (path === "/ai-data-services/annotation-labeling/llm-rlhf-annotation") return buildLlmRlhfFallback();
  if (path === "/ai-data-services/annotation-labeling/image-annotation") return buildImageAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/video-annotation") return buildVideoAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/document-ocr-annotation") return buildDocumentOcrAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/text-nlp-annotation") return buildTextNlpAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/audio-speech-annotation") return buildAudioSpeechAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation") return buildPointCloudLidarAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/content-moderation") return buildContentModerationFallback();
  if (path === "/ai-data-services/cleaning-validation") return buildCleaningValidationFallback();
  if (path === "/ai-data-services/cleaning-validation/dataset-qa-label-audit") return buildDatasetAuditFallback();
  if (path === "/ai-data-services/cleaning-validation/llm-data-curation") return buildLlmCurationFallback();
  if (path === "/ai-data-services/cleaning-validation/data-cleaning-preparation") return buildDataCleaningPreparationFallback();
  if (path === "/ai-data-services/cleaning-validation/pii-detection-redaction") return buildPiiRedactionFallback();
  if (path === "/ai-data-services/cleaning-validation/metadata-enrichment") return buildMetadataEnrichmentFallback();
  if (path === "/ai-data-services/cleaning-validation/data-validation-verification") return buildDataValidationVerificationFallback();
  if (path === "/ai-data-services/model-testing") return buildModelTestingFallback();
  if (path === "/ai-data-services/model-testing/bias-fairness-audit") return buildBiasFairnessFallback();
  if (path === "/ai-data-services/model-testing/ai-red-teaming") return buildRedTeamingFallback();
  if (path === "/ai-data-services/model-testing/llm-evaluation") return buildLlmEvaluationFallback();
  if (path === "/ai-data-services/model-testing/asr-speech-model-testing") return buildAsrSpeechTestingFallback();
  if (path === "/ai-data-services/model-testing/computer-vision-model-testing") return buildComputerVisionTestingFallback();
  if (path === "/ai-data-services/model-testing/human-evaluation-ab-testing") return buildHumanEvaluationFallback();
  if (path === "/robotics-training-data-services/human-demonstrations") return buildHumanDemonstrationsFallback();
  if (path === "/robotics-training-data-services/multimodal-sensor-data") return buildMultimodalSensorDataFallback();
  if (path === "/robotics-training-data-services/3d-spatial-annotation") return buildThreeDSpatialAnnotationFallback();
  if (path === "/robotics-training-data-services/vla-evaluation") return buildVlaEvaluationFallback();
  if (path === "/robotics-training-data-services/deployment-validation") return buildDeploymentValidationFallback();
  const heading = title.replace(/\s*(?:\||\u2013|\u2014)\s*eQOURSE.*$/i, "").trim();
  if (path === "/articulate-storyline-video-samples") {
    return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/samples">Samples</a> / <a href="/video-samples">Video Samples</a> / <span>Articulate Storyline</span></nav>
      <h1>Articulate Storyline Video Samples</h1>
      <p>${escapeHtml(description)}</p>
      <section><h2>Interactive Articulate Storyline Examples</h2><p>Review representative e-learning work across interactive modules, branching scenarios, quizzes and assessments. Samples demonstrate responsive presentation, learner interaction and LMS-ready delivery patterns.</p></section>
      <section><h2>What You Can Evaluate</h2><ul><li>Branching choices and scenario logic</li><li>Drag-and-drop, quiz and assessment interactions</li><li>Visual hierarchy, instructional flow and learner feedback</li><li>Responsive behaviour across desktop and mobile screens</li></ul></section>
      <section><h2>Request a Relevant Sample</h2><p>Available previews vary by subject, audience and confidentiality requirements. <a href="/contact-us">Contact eQOURSE</a> for a sample aligned with your learning programme.</p></section>
      <nav aria-label="Related pages"><a href="/articulate-storyline-services">Articulate Storyline Services</a> <a href="/video-samples">Video Samples</a> <a href="/content-services">Content Services</a></nav>
    </main>`;
  }
  if (path === "/kindergarten-to-k5-samples") {
    return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/samples">Samples</a> / <a href="/text-samples">Text Samples</a> / <span>Kindergarten to Grade 5</span></nav>
      <h1>Kindergarten to Grade 5 Content Samples</h1>
      <p>${escapeHtml(description)}</p>
      <section><h2>Foundational Learning Content Examples</h2><p>Explore curriculum-aligned course book, lesson plan and workbook examples designed for early and primary learners across mathematics, science, language arts and environmental studies.</p></section>
      <section><h2>What You Can Evaluate</h2><ul><li>Age-appropriate language and visual scaffolding</li><li>Clear learning objectives and lesson progression</li><li>Practice activities, formative checks and assessments</li><li>Adaptability for curricula, languages and delivery formats</li></ul></section>
      <section><h2>Request a Relevant Sample</h2><p>Sample availability varies by grade, subject and curriculum. <a href="/contact-us">Contact eQOURSE</a> for examples aligned with your programme.</p></section>
      <nav aria-label="Related pages"><a href="/k12-and-higher-education">K-12 and Higher Education Content</a> <a href="/text-samples">Text Samples</a> <a href="/content-services">Content Services</a></nav>
    </main>`;
  }
  const sharedLinks = path.startsWith("/ai-data") || path.startsWith("/robotics")
    ? [
        ["/ai-data-services", "AI Data Services"],
        ["/ai-data-services/data-collection", "AI Data Collection"],
        ["/ai-data-services/annotation-labeling", "Data Annotation and Labeling"],
        ["/robotics-training-data-services", "Robotics Training Data Services"],
      ]
    : path.includes("samples")
      ? [["/samples", "Samples"], ["/content-services", "Content Services"], ["/contact-us", "Contact eQOURSE"]]
      : [["/content-services", "Content Services"], ["/learning-solutions", "Learning Solutions"], ["/contact-us", "Contact eQOURSE"]];

  const links = [["/", "Home"], ...sharedLinks]
    .filter(([href]) => href !== path)
    .map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`)
    .join("\n        ");

  const article = crawlHtml
    ? `<article data-cms-source="${escapeHtml(source || "article")}">${crawlHtml}</article>`
    : "";

  return `<main data-seo-prerender="true">
      <h1>${escapeHtml(heading)}</h1>
      <p>${escapeHtml(description)}</p>
      ${article}
      <nav aria-label="Related pages">
        ${links}
      </nav>
    </main>`;
}

function toAbsoluteUrl(value) {
  if (!value) return OG_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function buildHead(template, entry) {
  const { path, title, description, canonical: canonicalOverride, ogType = "website", image = OG_IMAGE } = entry;
  const canonical = canonicalOverride || `${SITE_URL}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
  const t = escapeHtml(title);
  const d = escapeHtml(description);

  let html = template;

  // Strip any previously injected (or stale template) tags so re-runs stay
  // idempotent and no route ever ships more than one of these.
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>\s*/g, "");
  html = html.replace(/<meta[^>]*\bname="description"[^>]*>\s*/g, "");
  html = html.replace(/<meta[^>]*\bname="(?:robots|googlebot)"[^>]*>\s*/g, "");
  html = html.replace(/<link[^>]*\brel="canonical"[^>]*>\s*/g, "");
  html = html.replace(/<meta[^>]*\bproperty="og:[^"]*"[^>]*>\s*/g, "");
  html = html.replace(/<meta[^>]*\bname="twitter:[^"]*"[^>]*>\s*/g, "");

  // data-rh="true" on every tag here is load-bearing, not decorative:
  // react-helmet-async only ever reconciles (replaces/removes) tags that
  // already carry its own data-rh marker — anything without it is invisible
  // to Helmet, so on hydration Helmet would add its own correct tag ALONGSIDE
  // this raw one instead of recognizing it, producing a real duplicate for
  // every tag below (title is the one exception: Helmet sets document.title
  // as a property, not via tag reconciliation, so it's marked purely for
  // documentation parity with the old index.html convention this replaces).
  const block = [
    `<title data-rh="true">${t}</title>`,
    `<meta data-rh="true" name="description" content="${d}" />`,
    `<meta data-rh="true" name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />`,
    `<link data-rh="true" rel="canonical" href="${canonical}" />`,
    `<meta data-rh="true" property="og:type" content="${escapeHtml(ogType)}" />`,
    `<meta data-rh="true" property="og:site_name" content="eQOURSE" />`,
    `<meta data-rh="true" property="og:title" content="${t}" />`,
    `<meta data-rh="true" property="og:description" content="${d}" />`,
    `<meta data-rh="true" property="og:url" content="${canonical}" />`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(toAbsoluteUrl(image))}" />`,
    `<meta data-rh="true" property="og:image:width" content="1200" />`,
    `<meta data-rh="true" property="og:image:height" content="630" />`,
    `<meta data-rh="true" property="og:locale" content="en_US" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:site" content="@EQourse" />`,
    `<meta data-rh="true" name="twitter:title" content="${t}" />`,
    `<meta data-rh="true" name="twitter:description" content="${d}" />`,
    `<meta data-rh="true" name="twitter:image" content="${escapeHtml(toAbsoluteUrl(image))}" />`,
  ].join("\n    ");

  html = html.replace(/<meta charset="UTF-8" \/>/, (m) => `${m}\n    ${block}`);
  return html.replace(
    /<div id="root">(?:<main data-seo-prerender="true">[\s\S]*?<\/main>)?<\/div>/,
    `<div id="root">${buildCrawlFallback(entry)}</div>`,
  );
}

function buildCmsShell(template) {
  return template
    .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta[^>]*\bname="(?:description|keywords)"[^>]*>\s*/gi, "")
    .replace(/<link[^>]*\brel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]*\bproperty="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]*\bname="twitter:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"></div>');
}

function buildNotFoundPage(template) {
  let html = template
    .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta[^>]*\bname="(?:description|keywords|robots|googlebot)"[^>]*>\s*/gi, "")
    .replace(/<link[^>]*\brel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]*\bproperty="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]*\bname="twitter:[^"]*"[^>]*>\s*/gi, "");

  const tags = [
    '<title data-rh="true">Page Not Found | eQOURSE</title>',
    '<meta data-rh="true" name="description" content="The requested page could not be found. Explore eQOURSE Content Services and AI Data Services." />',
    '<meta data-rh="true" name="robots" content="noindex,nofollow" />',
  ].join("\n    ");

  html = html.replace(/<meta charset="UTF-8" \/>/i, (match) => `${match}\n    ${tags}`);
  return html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    '<div id="root"><main data-seo-prerender="true"><h1>Page not found</h1><p>The requested page does not exist or may have moved.</p><nav aria-label="Helpful pages"><a href="/">Home</a> <a href="/content-services">Content Services</a> <a href="/ai-data-services">AI Data Services</a> <a href="/contact-us">Contact eQOURSE</a></nav></main></div>',
  );
}

async function fetchCmsItems(resource) {
  const url = `${CMS_API_BASE}/api/${resource}?limit=1000`;
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(Number(process.env.CMS_SEO_TIMEOUT_MS) || 60000),
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  const body = await response.json();
  const items = body?.success ? body?.data?.items : body?.items;
  if (!Array.isArray(items)) {
    throw new Error(`${url} did not return an items array`);
  }
  return items;
}

async function loadCmsSeoEntries() {
  const [blogs, caseStudies] = await Promise.all([
    fetchCmsItems("blogs"),
    fetchCmsItems("case-studies"),
  ]);

  const blogEntries = blogs
    .filter((blog) => blog?.slug)
    .map((blog) => ({
      path: `/blog/${blog.slug}`,
      title: blog.seo?.title?.trim() || blog.title,
      description: blog.seo?.description?.trim() || blog.excerpt,
      ogType: "article",
      image: blog.seo?.ogImageUrl || blog.coverImageUrl || OG_IMAGE,
      lastmod: blog.updatedAt || blog.publishedAt,
      source: "blog",
      crawlHtml: blog.bodyFormat === "html"
        ? `<p>${escapeHtml(plainTextFromHtml(blog.body))}</p>`
        : renderMarkdownForSeo(blog.body),
    }));

  const caseStudyEntries = caseStudies
    .filter((study) => study?.slug)
    .map((study) => ({
      path: `/casestudy/${study.slug}`,
      title: study.seo?.title?.trim() || study.title,
      description: study.seo?.description?.trim() || study.summary || study.challenge?.slice(0, 160),
      ogType: "article",
      image: study.seo?.ogImageUrl || study.heroImageUrl || OG_IMAGE,
      lastmod: study.updatedAt || study.publishedAt,
      source: "case-study",
      crawlHtml: [
        ["Challenge", study.challenge],
        ["Solution", study.solution],
        ["Results", study.results],
      ].filter(([, content]) => content?.trim()).map(([heading, content]) => (
        `<section><h2>${heading}</h2>${renderMarkdownForSeo(content)}</section>`
      )).join(""),
    }));

  return [...blogEntries, ...caseStudyEntries].filter(
    (entry) => entry.title?.trim() && entry.description?.trim(),
  );
}

async function main() {
  if (!existsSync(distIndexPath)) {
    console.error("[prerender-seo] dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }

  const template = readFileSync(distIndexPath, "utf-8");
  const pageSeoSource = readFileSync(pageSeoPath, "utf-8");
  const staticEntries = parsePageSeo(pageSeoSource);

  if (staticEntries.length === 0) {
    console.error("[prerender-seo] No routes parsed from pageSeo.ts — aborting to avoid clobbering dist/index.html.");
    process.exit(1);
  }

  let cmsEntries;
  try {
    cmsEntries = await loadCmsSeoEntries();
  } catch (error) {
    console.error(`[prerender-seo] Unable to load CMS SEO data: ${error.message}`);
    console.error("[prerender-seo] Refusing to build a production bundle with incorrect blog/case-study fallback metadata.");
    console.error("[prerender-seo] Set CMS_SEO_OPTIONAL=true only for an intentionally offline development build.");
    if (process.env.CMS_SEO_OPTIONAL !== "true") process.exit(1);
    cmsEntries = [];
  }

  const entries = [...new Map(
    [...staticEntries, ...cmsEntries].map((entry) => [entry.path, entry]),
  ).values()];

  // Unknown/new CMS routes use a metadata-empty SPA shell rather than the
  // homepage's title, description and canonical. Known published routes below
  // still receive complete server-readable metadata and article content.
  writeFileSync(join(distDir, "cms-shell.html"), buildCmsShell(template), "utf-8");
  writeFileSync(join(distDir, "404.html"), buildNotFoundPage(template), "utf-8");

  let written = 0;
  for (const entry of entries) {
    const html = buildHead(template, entry);
    const outPath = entry.path === "/" ? distIndexPath : join(distDir, entry.path, "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
    written += 1;
  }

  writeFileSync(
    join(distDir, "seo-manifest.json"),
    JSON.stringify(entries.map(({ crawlHtml, ...entry }) => entry), null, 2),
    "utf-8",
  );

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => {
      const canonical = entry.canonical || `${SITE_URL}${entry.path === "/" ? "/" : entry.path.replace(/\/+$/, "")}`;
      const lastmod = entry.lastmod ? `<lastmod>${escapeXml(String(entry.lastmod).slice(0, 10))}</lastmod>` : "";
      return `  <url><loc>${escapeXml(canonical)}</loc>${lastmod}</url>`;
    }),
    '</urlset>',
    '',
  ].join("\n");
  writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf8");

  console.log(
    `[prerender-seo] Wrote ${written} route(s): ${staticEntries.length} static and ${cmsEntries.length} CMS detail route(s).`,
  );
}

await main();
