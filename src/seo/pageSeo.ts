/**
 * Single source of truth for per-page <title> and <meta name="description">.
 *
 * Sourced from the Week 1 SEO report. Previously every route inherited the
 * static title/description baked into index.html, because a client-rendered SPA
 * serves the same HTML shell for every URL and react-helmet-async appends its
 * tags rather than replacing unowned ones. index.html's SEO tags now carry
 * `data-rh="true"` so Helmet takes ownership and swaps them, leaving exactly
 * one title and one description per page.
 *
 * Keyed by pathname with no trailing slash. Routes absent from this map keep
 * whatever their component passes to <SEOHead />.
 */
export interface PageSeo {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: "AI Data Services & Content Services Company | eQOURSE",
    description: "eQOURSE provides AI data services for data collection, annotation, cleaning, validation, model testing and robotics, plus scalable content services for global teams.",
  },
  "/2d-3d-video-samples": {
    title: "2D & 3D Video Animation Samples | Eqourse",
    description: "Explore 2D and 3D video samples created for education, training and visual storytelling. View eQOURSE work today.",
  },
  "/2d-3d-videos": {
    title: "2D & 3D Video Services – Custom Animation | Eqourse",
    description: "Explain complex ideas with engaging 2D and 3D educational videos. Explore animation services from eQOURSE today.",
  },
  "/aboutus": {
    title: "About eQOURSE | Global AI Data & Content Company",
    description: "eQOURSE is commercially headquartered in Singapore, with 500+ specialists delivering AI data and learning content from its Kota operations.",
  },
  "/accessibility": {
    title: "Web Accessibility Statement | Eqourse",
    description: "Make digital learning inclusive with accessibility audits, remediation and compliance support. Explore eQOURSE services.",
  },
  "/accessible-media-enhancements": {
    title: "Accessible Media Enhancements – WCAG Compliant | Eqourse",
    description: "Make media inclusive with captions, transcripts, audio descriptions and accessible enhancements. Explore eQOURSE.",
  },
  "/adaptive-learning": {
    title: "Adaptive Learning – Personalized E-Learning | Eqourse",
    description: "Personalize learning pathways with adaptive content that responds to learner skills and progress. Explore eQOURSE solutions.",
  },
  "/ai-data-samples": {
    title: "AI Data Samples – High-Quality Datasets | Eqourse",
    description: "Explore AI data samples for NLP, computer vision, speech, RLHF and data collection. Review eQOURSE capabilities today.",
  },
  "/ai-data-samples/audio-speech": {
    title: "Audio Speech AI Data Samples – High Quality | Eqourse",
    description: "Explore audio and speech data samples for transcription, classification and voice AI. Review eQOURSE capabilities.",
  },
  "/ai-data-samples/cleaned-datasets": {
    title: "Cleaned AI Datasets – Ready for ML | Eqourse",
    description: "Explore cleaned dataset samples prepared for accurate AI training and evaluation. Review eQOURSE data quality today.",
  },
  "/ai-data-samples/computer-vision": {
    title: "Computer Vision Datasets – AI Data Samples | Eqourse",
    description: "Explore computer vision annotation samples for images and video. Review eQOURSE labeling quality and capabilities.",
  },
  "/ai-data-samples/data-collection": {
    title: "AI Data Collection – Custom AI Datasets | Eqourse",
    description: "Explore AI data collection samples across text, image, audio and video. Review eQOURSE dataset capabilities today.",
  },
  "/ai-data-samples/nlp-annotation": {
    title: "NLP Annotation Samples – AI Training Data | Eqourse",
    description: "Explore NLP annotation samples for classification, entities, sentiment and language tasks. Review eQOURSE data quality.",
  },
  "/ai-data-samples/rlhf": {
    title: "RLHF AI Data Samples – High Quality | Eqourse",
    description: "Explore RLHF data samples for response ranking, evaluation and AI alignment. Review eQOURSE capabilities today.",
  },
  "/ai-data-services": {
    title: "AI Data Services – Scalable AI Solutions | Eqourse",
    description: "Scale AI development with expert data collection, annotation, validation and model testing services. Start your free pilot.",
  },
  "/ai-data-services/annotation-labeling": {
    title: "Data Annotation & Labeling Services | eQOURSE",
    description: "Expert data annotation for image, video, text, audio, documents and RLHF with SME reviewers, multi-tier QA, 30+ languages and ISO processes.",
    image: "/assets/ai-data/annotation-labeling/annotation-labeling-og.webp",
  },
  "/ai-data-services/annotation-labeling/llm-rlhf-annotation": {
    title: "RLHF & LLM Data Annotation Services | eQOURSE",
    description: "Expert RLHF preference data, SFT datasets, LLM evaluation, red teaming and factuality review across 30+ languages. Start a free pilot.",
    canonical: "https://www.eqourse.com/ai-data-services/annotation-labeling/llm-rlhf-annotation",
    image: "/assets/ai-data/annotation-labeling/llm-rlhf/llm-rlhf-annotation-og.webp",
  },
  "/ai-data-services/annotation-labeling/image-annotation": {
    title: "Image Annotation Services for Computer Vision | eQOURSE",
    description: "Bounding box, polygon, segmentation, keypoint and classification annotation with multi-tier QA and COCO, YOLO or Pascal VOC delivery. Start a free pilot.",
    canonical: "https://www.eqourse.com/ai-data-services/annotation-labeling/image-annotation",
    image: "/assets/ai-data/annotation-labeling/image-annotation/image-annotation-og.webp",
  },
  "/ai-data-services/annotation-labeling/video-annotation": {
    title: "Video Annotation Services for Computer Vision | eQOURSE",
    description: "Frame-accurate video annotation with persistent-ID tracking, action recognition, event segmentation and pose tracking. Track-level QA, MOT and COCO delivery.",
    canonical: "https://www.eqourse.com/ai-data-services/annotation-labeling/video-annotation",
    image: "/assets/ai-data/annotation-labeling/video-annotation/video-annotation-og.webp",
  },
  "/ai-data-services/annotation-labeling/document-ocr-annotation": {
    title: "Document & OCR Annotation Services for Document AI | eQOURSE",
    description: "Document AI training data for layout, key-value pairs, table structure, handwriting and forms. Per-field QA, 30+ languages and ISO-certified processes.",
    canonical: "https://www.eqourse.com/ai-data-services/annotation-labeling/document-ocr-annotation",
    image: "/assets/ai-data/annotation-labeling/document-ocr-annotation/document-ocr-annotation-og.webp",
  },
  "/ai-data-services/annotation-labeling/text-nlp-annotation": {
    title: "Text & NLP Annotation Services for Language AI | eQOURSE",
    description: "NER, sentiment, intent and relation annotation across 30+ languages, including Indic and code-mixed text, with native reviewers and measured agreement.",
    canonical: "https://www.eqourse.com/ai-data-services/annotation-labeling/text-nlp-annotation",
    image: "/assets/ai-data/annotation-labeling/text-nlp-annotation/text-nlp-annotation-og.webp",
  },
  "/ai-data-services/annotation-labeling/audio-speech-annotation": {
    title: "Audio & Speech Annotation Services for Voice AI | eQOURSE",
    description: "Speech annotation for ASR across 30+ global languages, with comprehensive Indian regional-language, accent, dialect and code-switching coverage.",
    canonical: "https://www.eqourse.com/ai-data-services/annotation-labeling/audio-speech-annotation",
    image: "/assets/ai-data/annotation-labeling/audio-speech-annotation/audio-speech-annotation-og.webp",
  },
  "/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation": {
    title: "3D Point Cloud & LiDAR Annotation Services | eQOURSE",
    description: "3D cuboids, point segmentation, multi-sweep tracking and camera-LiDAR fusion for autonomous systems and robotics. KITTI, nuScenes and custom formats.",
    canonical: "https://www.eqourse.com/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation",
    image: "/assets/ai-data/annotation-labeling/3d-point-cloud-lidar-annotation/3d-point-cloud-lidar-annotation-og.webp",
  },
  "/ai-data-services/annotation-labeling/content-moderation": {
    title: "Content Moderation & Trust and Safety Services | eQOURSE",
    description: "Human content moderation with severity-tiered enforcement, appeals review, multilingual context and moderator wellbeing safeguards across 30+ languages.",
    canonical: "https://www.eqourse.com/ai-data-services/annotation-labeling/content-moderation",
    image: "/assets/ai-data/annotation-labeling/content-moderation/content-moderation-og.webp",
  },
  "/ai-data-services/cleaning-validation": {
    title: "Data Cleaning & Validation Services for AI | eQOURSE",
    description: "Deduplication, PII redaction, noise removal, label auditing and AI dataset validation. Error rates reported by category. Get a free dataset audit.",
    canonical: "https://www.eqourse.com/ai-data-services/cleaning-validation",
    image: "/assets/ai-data/cleaning-validation/cleaning-validation-og.webp",
  },
  "/ai-data-services/cleaning-validation/dataset-qa-label-audit": {
    title: "Dataset QA & Label Audit Services | eQOURSE",
    description: "Independent labeled-dataset audits with per-class error rates, label correction and train/test leakage detection—including other vendors' work.",
    canonical: "https://www.eqourse.com/ai-data-services/cleaning-validation/dataset-qa-label-audit",
    image: "/assets/ai-data/cleaning-validation/dataset-qa-label-audit/dataset-qa-label-audit-og.webp",
  },
  "/ai-data-services/cleaning-validation/llm-data-curation": {
    title: "LLM Training Data Curation Services | eQOURSE",
    description: "LLM corpus deduplication, quality filtering and benchmark decontamination—with provenance review and human checks of filtered-out content.",
    canonical: "https://www.eqourse.com/ai-data-services/cleaning-validation/llm-data-curation",
    image: "/assets/ai-data/cleaning-validation/llm-data-curation/llm-data-curation-og.webp",
  },
  "/ai-data-services/cleaning-validation/data-cleaning-preparation": {
    title: "Data Cleaning & Preparation Services for AI | eQOURSE",
    description: "Deduplication, encoding repair, noise removal and data normalisation for AI—with reversible change logs and before-and-after distribution reporting.",
    canonical: "https://www.eqourse.com/ai-data-services/cleaning-validation/data-cleaning-preparation",
    image: "/assets/ai-data/cleaning-validation/data-cleaning-preparation/data-cleaning-preparation-og.webp",
  },
  "/ai-data-services/cleaning-validation/pii-detection-redaction": {
    title: "PII Detection & Redaction Services | eQOURSE",
    description: "PII detection and redaction across text, images, video, audio and documents—including quasi-identifiers, metadata and verified recall.",
    canonical: "https://www.eqourse.com/ai-data-services/cleaning-validation/pii-detection-redaction",
    image: "/assets/ai-data/cleaning-validation/pii-detection-redaction/pii-detection-redaction-og.webp",
  },
  "/ai-data-services/cleaning-validation/metadata-enrichment": {
    title: "Metadata Enrichment & Data Standardization | eQOURSE",
    description: "Language, domain, quality and provenance tagging, entity resolution and taxonomy mapping—so AI datasets stay filterable, reusable and auditable.",
    canonical: "https://www.eqourse.com/ai-data-services/cleaning-validation/metadata-enrichment",
    image: "/assets/ai-data/cleaning-validation/metadata-enrichment/metadata-enrichment-og.webp",
  },
  "/ai-data-services/cleaning-validation/data-validation-verification": {
    title: "Data Verification Services | Human-in-the-Loop | eQOURSE",
    description: "Verify records, attributes and claims against authoritative sources—with conflict adjudication, field-level status and honest coverage limits.",
    canonical: "https://www.eqourse.com/ai-data-services/cleaning-validation/data-validation-verification",
    image: "/assets/ai-data/cleaning-validation/data-validation-verification/data-validation-verification-og.webp",
  },
  "/ai-data-services/data-collection": {
    title: "AI Data Collection Services | Custom Training Datasets | eQOURSE",
    description: "Build custom image, audio, text and video training datasets with multilingual collection, quality controls, consent handling and secure delivery.",
  },
  "/ai-data-services/data-collection/image-data-collection": {
    title: "Image Data Collection Services for Computer Vision | eQOURSE",
    description: "Custom image data collection for computer vision and visual AI. Capture objects, documents, scenes and real-world image datasets across devices and conditions.",
    canonical: "https://www.eqourse.com/ai-data-services/data-collection/image-data-collection",
  },
  "/ai-data-services/data-collection/audio-data-collection": {
    title: "Audio & Speech Data Collection Services for Voice AI | eQOURSE",
    description: "Custom audio and speech data collection for ASR, TTS and voice AI across languages, accents, speakers, devices and real-world acoustic environments.",
    canonical: "https://www.eqourse.com/ai-data-services/data-collection/audio-data-collection",
  },
  "/ai-data-services/data-collection/text-data-collection": {
    title: "Text Data Collection Services for NLP & LLMs | eQOURSE",
    description: "Custom text data collection for NLP, LLMs and generative AI. Build multilingual, domain-specific, conversational and human-generated training datasets.",
    canonical: "https://www.eqourse.com/ai-data-services/data-collection/text-data-collection",
  },
  "/ai-data-services/data-collection/video-data-collection": {
    title: "Video Data Collection Services for Computer Vision | eQOURSE",
    description: "Custom video data collection for computer vision and multimodal AI. Capture actions, objects, environments and first-person scenarios to your specifications.",
    canonical: "https://www.eqourse.com/ai-data-services/data-collection/video-data-collection",
  },
  "/ai-data-services/model-testing": {
    title: "AI Model Testing & Evaluation Services | eQOURSE",
    description: "Test LLM, speech, vision and multimodal AI for safety, bias, accuracy and real-world performance with expert human evaluation and segment reporting.",
    canonical: "https://www.eqourse.com/ai-data-services/model-testing",
    image: "/assets/ai-data/model-testing/model-testing-og.webp",
  },
  "/ai-data-services/model-testing/bias-fairness-audit": {
    title: "AI Bias Audit & Fairness Testing Services | eQOURSE",
    description: "Independent AI bias audits across 30+ languages. Intersectional fairness testing, impact ratio analysis and demographically stratified human evaluation for LLM, ASR, vision and scoring models. ISO 27001 certified.",
    canonical: "https://www.eqourse.com/ai-data-services/model-testing/bias-fairness-audit",
    image: "/assets/ai-data/model-testing/bias-fairness/og-bias-fairness-audit.jpg",
  },
  "/ai-data-services/model-testing/ai-red-teaming": {
    title: "AI Red Teaming & Adversarial Testing Services | eQOURSE",
    description: "Human-led AI red teaming across 30+ languages. Adversarial testing for LLM and agentic systems against OWASP LLM and Agentic Top 10, with reproducible findings, severity ratings and native-speaker attack sets.",
    canonical: "https://www.eqourse.com/ai-data-services/model-testing/ai-red-teaming",
    image: "/assets/ai-data/model-testing/red-teaming/og-ai-red-teaming.jpg",
  },
  "/ai-data-services/model-testing/llm-evaluation": {
    title: "LLM Evaluation Services — Human & Judge Calibration | eQOURSE",
    description: "Human LLM evaluation across 30+ languages — hallucination, RAG groundedness, instruction following, multi-turn and agent trajectory testing, plus LLM-as-a-judge calibration against measured human agreement.",
    canonical: "https://www.eqourse.com/ai-data-services/model-testing/llm-evaluation",
    image: "/assets/ai-data/model-testing/llm-evaluation/og-llm-evaluation.jpg",
  },
  "/ai-data-services/model-testing/asr-speech-model-testing": {
    title: "ASR & Speech Model Testing Services | eQOURSE",
    description: "Speech recognition testing across 30+ languages and regional accents. Measure WER, CER, semantic and entity errors, diarization and noisy-condition performance with native-speaker test sets.",
    canonical: "https://www.eqourse.com/ai-data-services/model-testing/asr-speech-model-testing",
    image: "/assets/ai-data/model-testing/asr-speech/og-asr-speech-testing.jpg",
  },
  "/ai-data-services/model-testing/computer-vision-model-testing": {
    title: "Computer Vision Model Testing Services | eQOURSE",
    description: "Computer vision model testing with real-world test sets — object detection, segmentation, OCR, tracking and VLM evaluation, with slice-level failure analysis across conditions, devices and cohorts.",
    canonical: "https://www.eqourse.com/ai-data-services/model-testing/computer-vision-model-testing",
    image: "/assets/ai-data/model-testing/computer-vision/og-cv-model-testing.jpg",
  },
  "/ai-data-services/model-testing/human-evaluation-ab-testing": {
    title: "Human Evaluation & AI A/B Testing Services | eQOURSE",
    description: "Blind, counterbalanced human preference evaluation for AI model comparison, plus quality scoring during live experiments across 30+ languages with representative panels and measured agreement.",
    canonical: "https://www.eqourse.com/ai-data-services/model-testing/human-evaluation-ab-testing",
  },
  "/robotics-training-data-services": {
    title: "Robotics Training Data Services for Physical AI | eQOURSE",
    description: "Custom robotics training data for Physical AI, including egocentric video, multimodal annotation, validation and real-world model evaluation.",
    canonical: "https://www.eqourse.com/robotics-training-data-services",
  },
  "/robotics-training-data-services/human-demonstrations": {
    title: "Human Demonstration Data Collection for Robotics | eQOURSE",
    description: "Teleoperation and egocentric human demonstration data for robot learning with failure-recovery episodes, per-episode QA, LeRobot and RLDS delivery.",
    canonical: "https://www.eqourse.com/robotics-training-data-services/human-demonstrations",
    image: "/assets/ai-data/robotics/human-demonstrations/og-human-demonstrations.jpg",
  },
  "/robotics-training-data-services/multimodal-sensor-data": {
    title: "Multimodal Sensor Data for Robotics & Physical AI | eQOURSE",
    description: "Time-synchronised multimodal robot data—vision, depth, proprioception, force-torque, tactile, IMU and audio—with measured sync error, documented calibration and per-episode lineage.",
    canonical: "https://www.eqourse.com/robotics-training-data-services/multimodal-sensor-data",
    image: "/assets/ai-data/robotics/multimodal-sensor-data/multimodal-sensor-data-hero.webp",
  },
  "/robotics-training-data-services/3d-spatial-annotation": {
    title: "3D & Spatial Annotation for Robot Manipulation | eQOURSE",
    description: "Grasp poses, affordances, 6-DoF pose, part and articulation annotation for robot manipulation, plus automated-candidate verification and simulation-ready assets.",
    canonical: "https://www.eqourse.com/robotics-training-data-services/3d-spatial-annotation",
    image: "/assets/ai-data/robotics/3d-spatial-annotation/og-3d-spatial-annotation.jpg",
  },
  "/robotics-training-data-services/vla-evaluation": {
    title: "VLA Evaluation & Robot Policy Benchmarking | eQOURSE",
    description: "Real-robot VLA evaluation with controlled protocols, defensible trial counts, failure taxonomy, recovery rates, generalisation testing and same-fixture human baselines.",
    canonical: "https://www.eqourse.com/robotics-training-data-services/vla-evaluation",
    image: "/assets/ai-data/robotics/vla-evaluation/og-vla-evaluation.jpg",
  },
  "/robotics-training-data-services/deployment-validation": {
    title: "Robot Deployment Validation & Site Testing | eQOURSE",
    description: "Structured robot deployment validation in the target environment—acceptance testing, endurance observation, human-robot interaction study and incident logging for your evidence pack.",
    canonical: "https://www.eqourse.com/robotics-training-data-services/deployment-validation",
    image: "/assets/ai-data/robotics/deployment-validation/deployment-validation-hero.webp",
  },
  "/animated-videos-services": {
    title: "Animated Video Services – Custom 2D & 3D | Eqourse",
    description: "Create engaging animated videos that explain concepts, train teams and promote ideas. Explore eQOURSE services today.",
  },
  "/articulate-storyline-services": {
    title: "Articulate Storyline Services – Custom eLearning | Eqourse",
    description: "Build interactive e-learning courses with expert Articulate Storyline design and development. Explore eQOURSE services.",
  },
  "/articulate-storyline-video-samples": {
    title: "Articulate Storyline Video Samples – Best Examples | Eqourse",
    description: "Explore Articulate Storyline samples featuring interactive learning, animation and assessments. View eQOURSE work.",
  },
  "/assessment-accessibility": {
    title: "Accessibility Assessment – WCAG Compliance | Eqourse",
    description: "Create inclusive assessments with accessible formats, interactions and accommodations. Explore eQOURSE services today.",
  },
  "/assessment-development-services": {
    title: "Assessment Development Services – Custom Solutions | Eqourse",
    description: "Create valid, reliable assessments aligned with learning objectives and standards. Explore eQOURSE development services.",
  },
  "/assistive-technology-compatibility": {
    title: "Assistive Technology Compatibility | Eqourse",
    description: "Ensure digital content works effectively with screen readers and assistive technologies. Explore eQOURSE services.",
  },
  "/audit-compliance-support": {
    title: "Audit & Compliance Support | EQourse",
    description: "Identify accessibility gaps with expert audits, reporting and compliance support. Explore eQOURSE services today.",
  },
  "/blended-learning": {
    title: "Blended Learning Solutions – Flexible Training | Eqourse",
    description: "Combine digital and instructor-led learning into one effective blended program. Explore eQOURSE learning solutions today.",
  },
  "/blog": {
    title: "How to Upskill & Boost Your Career | Eqourse Blog",
    description: "Explore expert insights on AI data, e-learning, assessments and content development. Read the latest eQOURSE blog articles.",
  },
  "/candidate-evaluation": {
    title: "Candidate Evaluation – AI-Powered Hiring | Eqourse",
    description: "Improve hiring decisions with structured candidate evaluation and role-aligned assessments. Explore eQOURSE solutions.",
  },
  "/career": {
    title: "Career Programs – Upskill & Get Hired | Eqourse",
    description: "Join eQOURSE and build your career in Content Services & AI Data Services. Explore exciting opportunities and apply today.",
  },
  "/casestudy": {
    title: "How to Scale Online Courses: Real Success Case Studies",
    description: "Explore eQOURSE case studies in AI data and content services. See real solutions, measurable results and client success stories.",
  },
  "/clients-testimonials": {
    title: "Client Testimonials – Client Success Stories | EQourse",
    description: "Read client testimonials and discover why global organizations trust eQOURSE for Content Services & AI Data Services. Learn more.",
  },
  "/competency-frameworks": {
    title: "Competency Frameworks – Upskill Your Workforce | Eqourse",
    description: "Define role expectations with customized competency frameworks for hiring and development. Explore eQOURSE solutions.",
  },
  "/contact-us": {
    title: "Contact eQOURSE | Singapore HQ & India Delivery",
    description: "Contact eQOURSE for AI data and learning content services. Commercial engagements run through Singapore, with delivery operations in Kota, India.",
  },
  "/content-services": {
    title: "Content Creation Services | Eqourse",
    description: "Create engaging learning experiences with expert content development, assessments, localization and technology solutions.",
  },
  "/corporate-e-learning-solutions": {
    title: "Corporate E-Learning Solutions – Custom Training | Eqourse",
    description: "Build engaging corporate e-learning for onboarding, compliance and workforce development. Explore eQOURSE solutions.",
  },
  "/curriculum-samples": {
    title: "Curriculum Samples – Explore Course Designs | Eqourse",
    description: "Explore curriculum samples featuring structured learning paths, lessons and assessments. Review eQOURSE expertise today.",
  },
  "/custom-e-learning-content": {
    title: "Custom E-Learning Content – Tailored Solutions | Eqourse",
    description: "Create engaging custom e-learning content tailored to your learners, goals and platform. Partner with eQOURSE today.",
  },
  "/design-services": {
    title: "Course Design Services – Custom e-Learning | Eqourse",
    description: "Create engaging educational, publishing and digital designs tailored to your audience. Explore eQOURSE services today.",
  },
  "/digital-assessment-infrastructure": {
    title: "Digital Assessment Infrastructure – Scalable | Eqourse",
    description: "Build secure, scalable digital assessment infrastructure for hiring, education and training. Explore eQOURSE solutions.",
  },
  "/digital-conversion": {
    title: "Digital Conversion Course – Boost Sales | eQourse",
    description: "Convert print and legacy content into accessible, structured digital formats. Explore eQOURSE conversion services.",
  },
  "/document-content-remediation": {
    title: "Document Content Remediation Services | Eqourse",
    description: "Make documents and digital content accessible with expert remediation and quality checks. Explore eQOURSE services.",
  },
  "/editorial-publishing-designing-services": {
    title: "Editorial Publishing & Design Services | Eqourse",
    description: "Create polished publications with expert editorial, design, conversion and production services. Explore eQOURSE solutions.",
  },
  "/editorial-services": {
    title: "Professional Editorial Services | Eqourse",
    description: "Improve content quality with expert editing, proofreading and editorial review. Explore eQOURSE services today.",
  },
  "/educational-content-development": {
    title: "Educational Content Development Services | Eqourse",
    description: "Create accurate, engaging educational content for print, digital and blended learning. Explore eQOURSE services today.",
  },
  "/elearning-video-solutions": {
    title: "Custom eLearning Video Solutions | Eqourse",
    description: "Create engaging e-learning videos with animation, expert narration and instructional design. Explore eQOURSE video solutions.",
  },
  "/faq": {
    title: "Eqourse FAQs: Everything You Need to Know",
    description: "Find answers about Content Services, AI Data Services, free pilots, data annotation and project delivery. Visit our FAQ page.",
  },
  "/flash-to-htm-samples": {
    title: "Flash to HTML5 Conversion – View Samples | Eqourse",
    description: "Explore Flash-to-HTML conversion samples featuring modern, responsive and interactive learning content. View our work.",
  },
  "/free-pilot": {
    title: "Free eLearning Pilot – Custom Course Creation | Eqourse",
    description: "Try eQOURSE with a free pilot for Content Services or AI Data Services. Evaluate our quality before you commit. Apply today.",
  },
  "/gallery": {
    title: "Course Gallery – Explore Featured Works | Eqourse",
    description: "Explore the eQOURSE gallery showcasing our team, projects, events and milestones in Content Services & AI Data Services. View now.",
  },
  "/gamified-learning": {
    title: "Gamified Learning Solutions – Boost Engagement | Eqourse",
    description: "Boost learner motivation with gamified learning experiences featuring challenges, rewards and feedback. Explore eQOURSE.",
  },
  "/iit-jee-neet-samples": {
    title: "IIT JEE & NEET Samples – Free Study Material | Eqourse",
    description: "Explore IIT-JEE and NEET content samples with exam-focused questions, solutions and learning resources. View our work.",
  },
  "/ilt-solutions": {
    title: "ILT Solutions – Scalable Corporate Training | EQourse",
    description: "Create effective instructor-led training materials, facilitator guides and learner resources. Explore eQOURSE ILT solutions.",
  },
  "/image-processing": {
    title: "Image Processing Course – Learn Online | Eqourse",
    description: "Enhance, optimize and prepare images for print, digital and educational publishing. Explore eQOURSE services today.",
  },
  "/immersive-simulation-ar-vr": {
    title: "Immersive AR/VR Simulation – Smart Training | Eqourse",
    description: "Create immersive AR, VR and simulation-based learning experiences for safe, practical training. Explore eQOURSE solutions.",
  },
  "/immersive-simulation-ar-vr-video": {
    title: "AR/VR Immersive Simulation – Interactive Training | Eqourse",
    description: "Explore immersive simulation, AR and VR video samples designed for practical, engaging learning. View our work today.",
  },
  "/instructional-design-services": {
    title: "Instructional Design Services – Custom eLearning | EQourse",
    description: "Create effective learning experiences with expert instructional design, storyboards and assessments. Explore eQOURSE.",
  },
  "/interactive-ebook-creation": {
    title: "Interactive eBook Creation – Engage Readers | Eqourse",
    description: "Transform learning content into interactive e-books with multimedia, activities and responsive design. Explore eQOURSE.",
  },
  "/k12-and-higher-education": {
    title: "K-12 & Higher Ed Solutions – Custom eLearning | Eqourse",
    description: "Develop engaging K–12 and higher education content with expert curriculum, assessment and multimedia support. Explore eQOURSE.",
  },
  "/k12-curriculum-development-and-design-services": {
    title: "K-12 Curriculum Design & Development | EQourse",
    description: "Build standards-aligned K–12 curricula with expert instructional design, assessments and learning resources. Explore eQOURSE.",
  },
  "/k6-to-k12-samples": {
    title: "K-6 to K-12 eLearning Samples – Interactive | Eqourse",
    description: "Explore Grade 6–12 content samples across subjects, curricula and assessment formats. Review eQOURSE quality today.",
  },
  "/kindergarten-to-k5-samples": {
    title: "Explore Kindergarten to K5 Curriculum Samples | Eqourse",
    description: "Explore engaging Kindergarten to Grade 5 content samples, including lessons, activities and assessments. View our work.",
  },
  "/learning-readiness": {
    title: "Learning Readiness – Prepare Your Workforce | eQourse",
    description: "Assess learner readiness, knowledge and support needs before training begins. Explore eQOURSE assessment solutions.",
  },
  "/learning-solutions": {
    title: "Custom Learning Solutions – Scalable eLearning | Eqourse",
    description: "Deliver effective learning with custom courses, training modules, gamification and adaptive solutions. Explore eQOURSE.",
  },
  "/live-online-tutor": {
    title: "Live Online Tutoring – Expert 1-on-1 Tutors | Eqourse",
    description: "Access qualified live online tutors for personalized academic support across subjects and curricula. Explore eQOURSE.",
  },
  "/lms-course-builds": {
    title: "Custom LMS Course Builds – Done for You | Eqourse",
    description: "Convert learning content into engaging, LMS-ready courses with interactions and assessments. Explore eQOURSE services.",
  },
  "/localization-services": {
    title: "Professional Localization Services | Eqourse",
    description: "Adapt learning content for global audiences with expert translation, voice-over and subtitling services. Explore eQOURSE.",
  },
  "/metadata-services": {
    title: "Metadata Services – Enhance Visibility | Eqourse",
    description: "Improve content discovery with accurate, structured metadata for publishing and digital platforms. Explore eQOURSE.",
  },
  "/optimizing-ai-powered-learning": {
    title: "How to Optimize AI-Powered Learning | Eqourse",
    description: "Optimize AI-powered learning with personalized content, intelligent assessments and data-driven experiences. Learn more.",
  },
  "/organizational-diagnostics": {
    title: "Organizational Diagnostics – Drive Growth | Eqourse",
    description: "Identify workforce strengths, gaps and performance barriers with organizational diagnostics. Explore eQOURSE solutions.",
  },
  "/pen-tab-and-ppt-samples": {
    title: "Pen Tab & PPT Samples – Free Download | Eqourse",
    description: "Explore pen-tab and PowerPoint video samples created for clear, engaging instruction. Review eQOURSE work today.",
  },
  "/ppt-videos-services": {
    title: "Professional PPT Video Services | Eqourse",
    description: "Transform presentations into engaging learning videos with narration, animation and visual design. Explore eQOURSE services.",
  },
  "/prepress-services": {
    title: "Prepress Services – Professional Solutions | Eqourse",
    description: "Prepare error-free files for print with expert formatting, layout and prepress quality checks. Explore eQOURSE services.",
  },
  "/privacy_policy": {
    title: "Privacy Policy | Eqourse",
    description: "Read the eQOURSE Privacy Policy to learn how we collect, use, store and protect your personal information. Review it today.",
  },
  "/production-support": {
    title: "Production Support Services – 24/7 IT Support | Eqourse",
    description: "Keep content projects on track with expert production coordination, formatting and quality support. Explore eQOURSE.",
  },
  "/promotional-video": {
    title: "Promotional Video Production – Drive Sales | Eqourse",
    description: "Explore promotional video samples created to present products, services and brands with impact. View eQOURSE work.",
  },
  "/psychometric-assessments": {
    title: "Psychometric Assessments – Hire Top Talent | eQourse",
    description: "Measure aptitude, personality and potential with reliable psychometric assessments. Explore eQOURSE solutions today.",
  },
  "/publishing-production": {
    title: "Course Publishing & Production – Scale Online | Eqourse",
    description: "Streamline print and digital publishing with expert production, layout and quality support. Explore eQOURSE services.",
  },
  "/quiz-question-bank-development": {
    title: "Quiz Question Bank Development – Custom eLearning | Eqourse",
    description: "Build accurate quizzes and question banks aligned with curricula and learning goals. Explore eQOURSE services today.",
  },
  "/samples": {
    title: "E-Learning Course Samples – Interactive Demos | Eqourse",
    description: "Explore eQOURSE samples across AI data, educational content, assessments, localization and video production. View our work.",
  },
  "/sitemap": {
    title: "Online Courses Directory – Learn Top Skills | Eqourse",
    description: "Explore the eQOURSE sitemap to quickly find AI data, content, learning, accessibility and assessment service pages.",
  },
  "/skill-assessments": {
    title: "Skill Assessments – Evaluate Top Talent | Eqourse",
    description: "Measure technical, functional and workplace skills with customized assessments. Explore eQOURSE solutions today.",
  },
  "/smes": {
    title: "SME Training Courses – Upskill Your Team | Eqourse",
    description: "Access experienced subject matter experts for content development, assessments and academic projects. Partner with eQOURSE.",
  },
  "/standards-compliance": {
    title: "Standards Compliance – Online Training | Eqourse",
    description: "Align digital content with accessibility standards through expert reviews and remediation. Explore eQOURSE services.",
  },
  "/stem-content-samples": {
    title: "STEM Content Samples – Custom eLearning | Eqourse",
    description: "Explore STEM content samples featuring lessons, activities and assessments across science, technology and maths.",
  },
  "/stem-curriculum-services": {
    title: "STEM Curriculum Services – Custom K-12 | Eqourse",
    description: "Create engaging STEM curricula with hands-on activities, assessments and real-world learning. Explore eQOURSE services.",
  },
  "/subtitling-services": {
    title: "Professional Subtitling Services | Eqourse",
    description: "Make videos accessible to global audiences with accurate, synchronized multilingual subtitles. Explore eQOURSE services.",
  },
  "/talent-assessment-workforce-evaluation": {
    title: "Talent Assessment – Optimize Your Workforce | Eqourse",
    description: "Evaluate skills, competencies and workforce readiness with tailored talent assessment solutions. Explore eQOURSE services.",
  },
  "/teacher-lesson-plan": {
    title: "Teacher Lesson Plans – Easy Templates | Eqourse",
    description: "Develop practical teacher lesson plans with objectives, activities, assessments and resources. Explore eQOURSE services.",
  },
  "/technology-solutions": {
    title: "Technology Solutions & IT Services | Eqourse",
    description: "Deliver digital learning with LMS course builds, white-label platforms and technology solutions. Explore eQOURSE services.",
  },
  "/test-prep-and-assessments": {
    title: "Test Prep & Assessments – Ace Your Exams | EQourse",
    description: "Explore test prep and assessment samples with exam-aligned questions, solutions and practice materials. View our work.",
  },
  "/test-prep-content": {
    title: "Test Prep Content – Custom Solutions | Eqourse",
    description: "Develop accurate, exam-aligned test prep content, question banks and practice materials. Explore eQOURSE solutions today.",
  },
  "/test-prep-content/act": {
    title: "ACT Test Prep Content – Boost Your Score | Eqourse",
    description: "Create ACT test prep content with realistic questions, practice exams and clear explanations. Explore eQOURSE services.",
  },
  "/test-prep-content/ap-exam": {
    title: "AP Exam Prep – Ace Your AP Exams | Eqourse",
    description: "Develop AP exam prep content with subject-specific questions, practice tests and explanations. Explore eQOURSE services.",
  },
  "/test-prep-content/aptis": {
    title: "Aptis Test Prep – Ace Your Exam | Eqourse",
    description: "Develop APTIS test prep content with exam-aligned practice, questions and explanations. Partner with eQOURSE today.",
  },
  "/test-prep-content/cefr-placement-solutions": {
    title: "CEFR Placement Solutions – Custom Content | Eqourse",
    description: "Create CEFR-aligned placement tests that accurately evaluate language proficiency. Explore eQOURSE assessment solutions.",
  },
  "/test-prep-content/ielts": {
    title: "IELTS Test Prep – Online Course | Eqourse",
    description: "Create IELTS prep content for Listening, Reading, Writing and Speaking with realistic practice. Explore eQOURSE services.",
  },
  "/test-prep-content/pte": {
    title: "PTE Test Prep Content – Ace Your Exam | Eqourse",
    description: "Develop PTE test prep content with realistic tasks, practice tests and expert explanations. Explore eQOURSE services.",
  },
  "/test-prep-content/sat": {
    title: "SAT Test Prep – Boost Your Score | Eqourse",
    description: "Develop SAT prep content with exam-aligned questions, practice tests and detailed explanations. Explore eQOURSE services.",
  },
  "/test-prep-content/toefl": {
    title: "TOEFL Test Prep – Master Your Exam | Eqourse",
    description: "Create TOEFL prep content for Reading, Listening, Speaking and Writing with realistic practice. Explore eQOURSE services.",
  },
  "/test-prep-content/toeic": {
    title: "TOEIC Test Prep – Boost Your Score | Eqourse",
    description: "Create TOEIC test prep content with realistic practice questions, explanations and skill-building activities. Explore eQOURSE.",
  },
  "/text-samples": {
    title: "Text Samples – High-Converting Copy | Eqourse",
    description: "Explore educational and professional text samples created by eQOURSE content experts. Review our writing quality today.",
  },
  "/training-modules": {
    title: "Online Training Modules – Interactive E-Learning | Eqourse",
    description: "Create focused training modules with engaging content, activities and assessments. Explore eQOURSE development services.",
  },
  "/translation-and-localization-text-samples": {
    title: "Translation & Localization Text Samples | Eqourse",
    description: "Explore translation and localization samples across educational and professional content. Review eQOURSE quality today.",
  },
  "/translation-services": {
    title: "Professional Translation Services | Eqourse",
    description: "Translate educational, technical and business content accurately for global audiences. Explore eQOURSE services today.",
  },
  "/tutors-and-sme-recruitment": {
    title: "Tutor & SME Recruitment – Hire Experts | Eqourse",
    description: "Recruit qualified tutors and subject matter experts for education and content projects. Explore eQOURSE staffing services.",
  },
  "/tutors-and-sme-training": {
    title: "Tutor & SME Training – Custom Online Courses | Eqourse",
    description: "Prepare tutors and SMEs with structured training in pedagogy, content quality and digital delivery. Explore eQOURSE.",
  },
  "/tutrain": {
    title: "TuTrain – AI Corporate Training Platform | Eqourse",
    description: "Discover Tutrain online tutoring solutions from eQOURSE. Explore personalized learning support and help students succeed.",
  },
  "/upsc-state-psc-samples": {
    title: "UPSC & State PSC Samples – Free Notes | Eqourse",
    description: "Explore UPSC and State PSC content samples with exam-aligned questions, explanations and study materials. View our work.",
  },
  "/video-samples": {
    title: "Course Video Samples – See Our Work | Eqourse",
    description: "Explore eQOURSE video samples across animation, presentations, AI avatars and immersive learning. View our work today.",
  },
  "/voice-over-services": {
    title: "Voice Over Services – Professional Quality | Eqourse",
    description: "Add professional multilingual voice-overs to learning, training and promotional content. Explore eQOURSE services.",
  },
  "/white-label-lms": {
    title: "White Label LMS – Fully Customizable | Eqourse",
    description: "Launch a branded learning platform with a customizable white-label LMS. Explore flexible solutions from eQOURSE today.",
  },
  "/workbook-development": {
    title: "Custom Workbook Development – Interactive Design | Eqourse",
    description: "Create engaging student workbooks with structured lessons, practice activities and assessments. Explore eQOURSE services.",
  },
};

/** Normalises a pathname the same way the map keys are stored. */
export const normalisePath = (pathname: string): string =>
  (pathname || "/").split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";

/** Returns the mapped SEO entry for a pathname, or undefined when unmapped. */
export const getPageSeo = (pathname: string): PageSeo | undefined =>
  pageSeo[normalisePath(pathname)];
