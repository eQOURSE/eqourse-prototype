import {
  Tags, ScanEye, AudioLines, ThumbsUp, Database, Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface SampleShowcase {
  title: string;
  description: string;
  format: string;
  languages: string;
}

export interface AiDataSample {
  slug: string;
  path: string;
  icon: LucideIcon;
  navLabel: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  preHeadline: string;
  headline: string;
  headlineAccent: string;
  subtext: string;
  ctaText: string;
  heroVisual: "ner" | "cv" | "audio" | "rlhf" | "collection" | "cleaning";
  shortDescription: string;
  showcases: SampleShowcase[];
  metrics: string[];
  serviceLink: string;
}

export const aiDataSamples: AiDataSample[] = [
  {
    slug: "nlp-annotation",
    path: "/ai-data-samples/nlp-annotation",
    icon: Tags,
    navLabel: "NLP Annotation Samples",
    title: "NLP Annotation Samples",
    seoTitle: "NLP Annotation Samples │ NER, Sentiment, Intent │ eQOURSE",
    seoDescription:
      "Explore eQOURSE NLP annotation samples: Named Entity Recognition, sentiment analysis, intent classification, relation extraction in English and 30+ languages. CoNLL & JSONL output. IAA ≥ 0.80.",
    keywords:
      "NLP annotation samples, NER samples, sentiment analysis samples, intent classification, relation extraction, coreference resolution, CoNLL, JSONL, Indic NLP",
    preHeadline: "AI Data Samples",
    headline: "NLP Annotation",
    headlineAccent: "Samples",
    subtext:
      "Browse our NLP annotation samples across NER, sentiment, intent, relation extraction, and coreference resolution. Produced by trained linguists with inter-annotator agreement ≥ 0.80 across English and 30+ Indic / international languages.",
    ctaText: "Request NLP Pilot Dataset",
    heroVisual: "ner",
    shortDescription:
      "NER, sentiment, intent, relation extraction and coreference resolution across English and Indic languages.",
    showcases: [
      {
        title: "Named Entity Recognition (NER)",
        description:
          "English and Hindi sentences with tagged entities (PERSON, ORG, LOC, DATE, AMOUNT, PRODUCT). Multi-annotator consensus, CoNLL output with confidence scores and code-mixed Hindi-English handling across script changes.",
        format: "CoNLL / JSONL",
        languages: "English, Hindi, Bengali, Tamil, Telugu",
      },
      {
        title: "Sentiment Analysis",
        description:
          "Product reviews and social-media posts annotated with fine-grained sentiment (positive, negative, neutral, mixed) at sentence and aspect level. Sarcasm and negation handled for Hindi and Hinglish.",
        format: "JSONL / CSV",
        languages: "English, Hindi, Hinglish",
      },
      {
        title: "Intent Classification",
        description:
          "Banking and e-commerce customer queries classified across 50+ intent categories. Primary intent, secondary intent, and confidence tags. Code-mixed and dialectal queries included.",
        format: "JSONL",
        languages: "English, Hindi, Tamil, Telugu",
      },
      {
        title: "Relation Extraction",
        description:
          "Biomedical text with annotated entity-entity relationships (drug-disease, gene-protein, symptom-condition). Relationship type, directionality, and evidence span per relation.",
        format: "JSONL / Custom JSON",
        languages: "English",
      },
      {
        title: "Coreference Resolution",
        description:
          "News articles and conversational text with coreference chains linking pronouns, noun phrases and named entities to their referent mentions.",
        format: "CoNLL / JSONL",
        languages: "English, Hindi",
      },
    ],
    metrics: [
      "IAA ≥ 0.80 (Krippendorff's Alpha) across all NLP tasks",
      "15–20% honeypot validation on every batch",
      "3-tier QA: annotator → peer review → senior linguist audit",
      "Native speakers for all language-specific annotation",
    ],
    serviceLink: "/ai-data-services/annotation-labeling",
  },
  {
    slug: "computer-vision",
    path: "/ai-data-samples/computer-vision",
    icon: ScanEye,
    navLabel: "Computer Vision Samples",
    title: "Computer Vision Annotation Samples",
    seoTitle:
      "Computer Vision Annotation Samples │ Bounding Box, Segmentation │ eQOURSE",
    seoDescription:
      "Explore eQOURSE computer vision annotation samples: bounding boxes, semantic segmentation, instance segmentation, polygon, keypoint, and 3D cuboid annotation. COCO JSON output. 98%+ accuracy.",
    keywords:
      "computer vision annotation, bounding box, semantic segmentation, instance segmentation, keypoint detection, 3D cuboid, COCO JSON, CV samples",
    preHeadline: "AI Data Samples",
    headline: "Computer Vision",
    headlineAccent: "Annotation Samples",
    subtext:
      "Browse our computer vision annotation samples including bounding boxes, semantic segmentation, instance segmentation, polygon tracing, keypoint annotation, and 3D cuboid labeling. Delivered in COCO JSON with 98%+ accuracy.",
    ctaText: "Request CV Pilot Dataset",
    heroVisual: "cv",
    shortDescription:
      "Bounding box, segmentation, polygon, keypoint and 3D cuboid annotation delivered in COCO JSON.",
    showcases: [
      {
        title: "Bounding Box Annotation",
        description:
          "Urban driving scenes with rectangular bounding boxes across 25+ object classes (cars, trucks, auto-rickshaws, pedestrians, cyclists, traffic signs). Occlusion and truncation flags included. India-specific vehicle classes.",
        format: "COCO JSON",
        languages: "N/A (visual)",
      },
      {
        title: "Semantic Segmentation",
        description:
          "Street scenes with pixel-level classification into 15+ categories (road, sidewalk, building, sky, vegetation, vehicle, person, pole). Colour-coded masks with class distribution stats.",
        format: "PNG masks + COCO JSON",
        languages: "N/A (visual)",
      },
      {
        title: "Instance Segmentation",
        description:
          "Retail shelf images with individual product instances segmented as polygon masks. Each instance has a unique ID, class label, and shelf-position metadata.",
        format: "COCO JSON",
        languages: "N/A (visual)",
      },
      {
        title: "Keypoint Detection",
        description:
          "Pedestrian images with 17-point body-pose estimation (COCO keypoint format). Visibility flags and bounding boxes included.",
        format: "COCO JSON",
        languages: "N/A (visual)",
      },
      {
        title: "3D Cuboid Annotation",
        description:
          "Driving data with depth-aware 3D bounding cuboids for vehicles and obstacles. Yaw, pitch, roll rotation and distance estimation per object.",
        format: "Custom JSON / KITTI",
        languages: "N/A (visual)",
      },
    ],
    metrics: [
      "98%+ annotation accuracy on all CV tasks",
      "Multi-annotator consensus for complex scenes",
      "Gold-standard validation with 20% honeypot images",
      "45+ object classes including India-specific vehicles",
    ],
    serviceLink: "/ai-data-services/annotation-labeling",
  },
  {
    slug: "audio-speech",
    path: "/ai-data-samples/audio-speech",
    icon: AudioLines,
    navLabel: "Audio & Speech Samples",
    title: "Audio & Speech Data Samples",
    seoTitle:
      "Audio & Speech Data Samples │ Transcription, Diarisation │ eQOURSE",
    seoDescription:
      "Explore eQOURSE audio and speech data samples: verbatim transcription, speaker diarisation, phoneme labeling, and emotion detection in 12+ languages. Metadata-tagged. Quality-verified.",
    keywords:
      "audio data samples, speech transcription, speaker diarisation, phoneme labeling, emotion detection, Indic speech, ASR samples",
    preHeadline: "AI Data Samples",
    headline: "Audio & Speech",
    headlineAccent: "Data Samples",
    subtext:
      "Browse our audio and speech data samples including verbatim transcription, speaker diarisation, phoneme labeling, and emotion / tone detection. Available across 12+ Indian and international languages with speaker metadata.",
    ctaText: "Request Audio Pilot Dataset",
    heroVisual: "audio",
    shortDescription:
      "Transcription, diarisation, phoneme labeling and emotion detection across 12+ Indian and international languages.",
    showcases: [
      {
        title: "Verbatim Transcription",
        description:
          "30-second audio clips in Hindi, Tamil, and English with verbatim transcripts including filler words, false starts, and code-switching. Speaker metadata attached (age, gender, region, noise condition).",
        format: "WAV + JSON (transcript + metadata)",
        languages: "Hindi, Tamil, Telugu, Bengali, English",
      },
      {
        title: "Speaker Diarisation",
        description:
          "Multi-speaker conversation recordings with identified speaker segments, timestamps, and overlap detection. 3-speaker meeting recordings in Hindi-English.",
        format: "RTTM / JSON",
        languages: "Hindi, English, Hinglish",
      },
      {
        title: "Phoneme & Prosody Labeling",
        description:
          "Clean speech recordings with phoneme-level annotation for TTS model training. Stress markers, intonation contours, and pause boundaries.",
        format: "TextGrid / JSON",
        languages: "Hindi, English",
      },
      {
        title: "Emotion & Tone Detection",
        description:
          "Customer service call recordings with emotion labels (neutral, frustrated, happy, angry, confused) at segment level. Arousal-valence scores included.",
        format: "JSON / CSV",
        languages: "Hindi, English, Tamil",
      },
    ],
    metrics: [
      "12+ languages with native-speaker transcription",
      "SNR-filtered: only recordings above quality threshold",
      "Speaker metadata: age, gender, region, dialect, noise",
      "IAA ≥ 0.80 on transcription accuracy",
    ],
    serviceLink: "/ai-data-services/annotation-labeling",
  },
  {
    slug: "rlhf",
    path: "/ai-data-samples/rlhf",
    icon: ThumbsUp,
    navLabel: "RLHF Annotation Samples",
    title: "RLHF Annotation Samples",
    seoTitle:
      "RLHF Annotation Samples │ Preference Ranking, Safety Labeling │ eQOURSE",
    seoDescription:
      "Explore eQOURSE RLHF annotation samples: preference ranking, response quality scoring, instruction-following evaluation, and safety labeling for LLM fine-tuning. JSONL output.",
    keywords:
      "RLHF annotation samples, preference ranking, response quality scoring, LLM alignment, safety labeling, red-teaming, instruction following",
    preHeadline: "AI Data Samples",
    headline: "RLHF Annotation",
    headlineAccent: "Samples",
    subtext:
      "Browse our RLHF annotation samples including preference ranking, response-quality scoring, instruction-following evaluation, and red-teaming / safety labeling. Annotated by trained domain experts — not crowdworkers.",
    ctaText: "Request RLHF Pilot",
    heroVisual: "rlhf",
    shortDescription:
      "Preference ranking, quality scoring, instruction-following and safety labeling for LLM alignment.",
    showcases: [
      {
        title: "Preference Ranking",
        description:
          "Prompt-response pairs where 3 model outputs are ranked best-to-worst by expert annotators. Includes ranking rationale, helpfulness score (1–5), and factual-accuracy assessment. Hindi and English prompts.",
        format: "JSONL",
        languages: "English, Hindi, Bengali, Tamil, Telugu, Marathi",
      },
      {
        title: "Response Quality Scoring",
        description:
          "Model responses scored on 4 dimensions: helpfulness, accuracy, harmlessness, and coherence (1–5 each). Multi-annotator consensus with Krippendorff's Alpha reported.",
        format: "JSONL",
        languages: "English, Hindi",
      },
      {
        title: "Instruction-Following Evaluation",
        description:
          "Complex multi-step instructions with binary assessment (followed / not followed) plus partial credit scoring. Error categorisation: format error, content error, omission, hallucination.",
        format: "JSONL",
        languages: "English, Hindi",
      },
      {
        title: "Safety & Red-Teaming Labels",
        description:
          "Model outputs labeled for safety violations: harmful content, bias/discrimination, PII leakage, misinformation, and policy violation. Severity rating (low / medium / high / critical).",
        format: "JSONL",
        languages: "English, Hindi, Tamil, Telugu",
      },
    ],
    metrics: [
      "Expert annotators with domain training (not crowdworkers)",
      "IAA ≥ 0.83 on preference ranking",
      "Multi-dimensional scoring: helpfulness + accuracy + harmlessness + coherence",
      "6 languages covered for multilingual LLM alignment",
    ],
    serviceLink: "/ai-data-services/annotation-labeling",
  },
  {
    slug: "data-collection",
    path: "/ai-data-samples/data-collection",
    icon: Database,
    navLabel: "Data Collection Samples",
    title: "Data Collection Portfolio & Samples",
    seoTitle:
      "AI Data Collection Samples │ Text, Audio, Image, Video │ eQOURSE",
    seoDescription:
      "Explore eQOURSE data collection portfolio: text, audio, image, and video dataset samples across 30+ languages. Crowdsourced, field-recorded, and web-collected. Consent-documented.",
    keywords:
      "AI data collection samples, text dataset, audio dataset, image dataset, video dataset, multilingual data, consent, metadata",
    preHeadline: "AI Data Samples",
    headline: "Data Collection",
    headlineAccent: "Portfolio",
    subtext:
      "Browse sample datasets from our data collection services across text, audio, image, and video. Each sample demonstrates our methodology, contributor diversity, metadata tagging, and consent documentation across 30+ languages.",
    ctaText: "Request Collection Pilot",
    heroVisual: "collection",
    shortDescription:
      "Text, audio, image and video collection samples across 30+ languages with documented consent and metadata.",
    showcases: [
      {
        title: "Text Collection Samples",
        description:
          "Conversational text corpus in Hindi-English code-mixed format. Crowdsourced from university students. Metadata: contributor age, education, region, and topic domain. 5,000-record sample in JSONL.",
        format: "JSONL / CSV",
        languages: "Hindi, Hinglish, English, Tamil, Telugu, Bengali",
      },
      {
        title: "Audio Collection Samples",
        description:
          "100 field-recorded speech clips (30–60 seconds each) in 4 Indian languages. Diverse speakers: urban / rural, male / female, 18–65 age range. SNR-scored, dialect-classified.",
        format: "WAV + JSON metadata",
        languages: "Hindi, Tamil, Telugu, Bengali",
      },
      {
        title: "Image Collection Samples",
        description:
          "500 handwritten document images (government forms, bank slips) in Devanagari, Tamil, and Telugu scripts. Diverse handwriting styles. EXIF stripped, consent logged.",
        format: "JPEG/PNG + JSON metadata",
        languages: "Devanagari, Tamil, Telugu scripts",
      },
      {
        title: "Video Collection Samples",
        description:
          "50 dashcam video clips (10–30 seconds each) from Indian urban and highway roads. Calibrated camera parameters. Scene metadata: weather, time of day, traffic density.",
        format: "MP4 + JSON metadata",
        languages: "N/A (visual)",
      },
    ],
    metrics: [
      "30+ languages with native contributors",
      "Consent documentation for all contributors",
      "Demographic metadata: age, gender, region, education",
      "QA-verified: format validation + human spot-check",
    ],
    serviceLink: "/ai-data-services/data-collection",
  },
  {
    slug: "cleaned-datasets",
    path: "/ai-data-samples/cleaned-datasets",
    icon: Sparkles,
    navLabel: "Cleaned Dataset Samples",
    title: "Cleaned & Validated Dataset Samples",
    seoTitle:
      "Cleaned & Validated Dataset Samples │ Before/After │ eQOURSE",
    seoDescription:
      "Explore eQOURSE data cleaning and validation samples: before/after comparisons showing deduplication, noise removal, PII redaction, and gold-standard QA. 98%+ accuracy. Audit trails included.",
    keywords:
      "data cleaning samples, deduplication, PII redaction, data validation, gold standard, audit trail, GDPR, dataset QA",
    preHeadline: "AI Data Samples",
    headline: "Cleaned & Validated",
    headlineAccent: "Dataset Samples",
    subtext:
      "See the difference quality cleaning makes. Browse before / after samples demonstrating our deduplication, noise removal, PII redaction, consistency standardisation, and gold-standard validation processes — each with audit-trail documentation.",
    ctaText: "Request Data Audit",
    heroVisual: "cleaning",
    shortDescription:
      "Before / after samples for deduplication, noise removal, PII redaction, and gold-standard validation with full audit trails.",
    showcases: [
      {
        title: "Text Deduplication: Before / After",
        description:
          "A 10,000-row text corpus with 18% duplicate and near-duplicate entries. Deduplicated corpus with log showing exact-match and fuzzy-match removals. Size reduces from 10,000 to 8,200 rows.",
        format: "CSV (before) + CSV (after) + JSON (dedup log)",
        languages: "English, Hindi",
      },
      {
        title: "PII Redaction: Before / After",
        description:
          "Customer feedback dataset with PII (names, phone numbers, emails, Aadhaar). Raw vs redacted data using standardised placeholders ([NAME], [PHONE], [EMAIL], [ID]). Redaction audit report included.",
        format: "JSONL (before/after) + PDF (audit report)",
        languages: "English, Hindi",
      },
      {
        title: "Audio Quality Filtering: Before / After",
        description:
          "100 audio recordings with SNR scores. Before: full set including 23 sub-threshold recordings. After: 77 passing recordings. Quarantine log shows why each rejection was made.",
        format: "WAV files + JSON (quality log)",
        languages: "Hindi, Tamil",
      },
      {
        title: "Gold-Standard Validation Report",
        description:
          "A validated annotation batch with precision / recall / F1 scores benchmarked against gold references. Annotator-level quality scores and honeypot breakdown included.",
        format: "PDF report + JSON (scores)",
        languages: "English",
      },
    ],
    metrics: [
      "98%+ accuracy guarantee on all cleaned datasets",
      "Full audit trail for every cleaning operation",
      "GDPR-ready PII redaction with consent tracking",
      "Gold-standard reference validation with P/R/F1 scoring",
    ],
    serviceLink: "/ai-data-services/cleaning-validation",
  },
];

export const getSampleBySlug = (slug: string) =>
  aiDataSamples.find((s) => s.slug === slug);
