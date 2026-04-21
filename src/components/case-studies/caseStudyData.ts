export type CaseStudyCategory = "EdTech Solutions" | "AI Data Services";

export interface CaseStudyMetric {
  label: string;
  value: string;
  icon?: any; // To be populated with lucide-react icons in components if needed
}

export interface CaseStudyInternalLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  id: string; // Used for URL hashes or keys
  title: string;
  category: CaseStudyCategory;
  industry: string;
  region: string;
  serviceTags: string[];
  problem: string;
  solution: string;
  impact: string;
  metrics: CaseStudyMetric[];
  cardSummary: string;
  visualDirection: {
    theme: "teal" | "navy-cyan";
    iconName?: string; 
  };
  relatedLinks: CaseStudyInternalLink[];
  image?: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "cs-1",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    title: "K-12 Worksheets & PPT Solutions for 2,000+ Schools",
    category: "EdTech Solutions",
    industry: "K-12 Education",
    region: "India (Pan-India, Multi-State Board)",
    serviceTags: ["Custom E-Learning Content", "Workbook Development", "K12 Content"],
    problem: "A company that has an association with 2000+ Schools in India and supplies study material in multiple languages to multiple state boards approached us to develop high level “Worksheets” and “PPT Based Solutions” for classes 1 to 10.",
    solution: "We created multiple high level worksheets each containing 30 questions that exceeded the NCERT+ level. Each question of the worksheet was designed to challenge the problem-solving ability of the student and help them grow. We also created detailed solution of complete exercises of their books in PPT format for different state boards.",
    impact: "The worksheets were very well taken by the schools. It helped the students in improving their performance. Now we are a trusted partner for them to supply quality worksheets. PPT based solutions were helpful for teachers and helped students in coping up with online classes as it saved a lot of time due to its crisp format.",
    metrics: [
      { label: "Schools Served", value: "2,000+" },
      { label: "Classes Covered", value: "1–10" },
      { label: "State Boards", value: "Multiple" },
      { label: "Content Level", value: "NCERT+" }
    ],
    cardSummary: "High-level worksheets and PPT solutions for 2,000+ schools across multiple state boards, classes 1–10.",
    visualDirection: { theme: "teal" },
    relatedLinks: [
      { label: "Workbook Development", href: "/edtech-solutions/custom-e-learning-content/workbook-development" }
    ]
  },
  {
    id: "cs-2",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
    title: "Multilingual Pen-Tab Videos & Worksheets in 6 Languages",
    category: "EdTech Solutions",
    industry: "NGO / EdTech",
    region: "India (Multi-State, 6 Languages)",
    serviceTags: ["E-Learning Video Solutions", "Localization Services", "Workbook Development"],
    problem: "An NGO based edtech startup wanted engaging “Pen-Tab Videos” and Worksheets for classes 5th to 9th in 6 different languages (Kannada, Telugu, Tamil, Marathi, Hindi and English).",
    solution: "We created engaging videos in all 6 languages by gathering 30+ subject matter experts from all over the country. The SMEs brainstormed on the content together to create content that is simple to understand, engaging and helps students retain what they have learnt.",
    impact: "We delivered the content before deadline to empower our client to execute their dissemination strategy without any hindrances at very low cost.",
    metrics: [
      { label: "Languages Delivered", value: "6" },
      { label: "SMEs Deployed", value: "30+" },
      { label: "Classes Covered", value: "5–9" },
      { label: "Delivery", value: "Early" }
    ],
    cardSummary: "Pen-tab videos and worksheets in 6 Indian languages for an NGO-backed edtech startup.",
    visualDirection: { theme: "teal" },
    relatedLinks: [
      { label: "E-Learning Video Solutions", href: "/edtech-solutions/elearning-video-solutions" },
      { label: "Localization Services", href: "/edtech-solutions/localization-services" }
    ]
  },
  {
    id: "cs-3",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    title: "Full Curriculum Content for African EdTech Startup",
    category: "EdTech Solutions",
    industry: "EdTech",
    region: "Africa",
    serviceTags: ["Custom E-Learning Content", "K12 Content", "Curriculum Development"],
    problem: "In 2020, an African EdTech Startup approached us to create content for Middle School (JSS1, JSS2, JSS3) and High School (SSS1, SSS2, SSS3). They wanted content for a given curriculum uploaded using their CMS with a deadline of 8 months.",
    solution: "We created the theory of every chapter for each standard. We used a team of 40+ subject matter experts and academic content creators to brainstorm and finalise drafts. We created highly challenging practice questions, delivering a complete solution for the client’s content needs.",
    impact: "The simple-to-understand theory and challenging practice questions were well received and helped the startup grow its customer base. We delivered the promised content within 6 months, giving the client enough time to prepare their dissemination strategy.",
    metrics: [
      { label: "SMEs Deployed", value: "40+" },
      { label: "Grade Levels", value: "6" },
      { label: "Early Delivery", value: "2 months" },
      { label: "Curriculum", value: "Full Suite" }
    ],
    cardSummary: "Complete middle and high school curriculum content for an African edtech startup, delivered 2 months early.",
    visualDirection: { theme: "teal" },
    relatedLinks: [
      { label: "K12 Content", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education" }
    ]
  },
  {
    id: "cs-4",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    title: "AI + Human QA: 10,000+ Fact-Checked Solutions Daily",
    category: "EdTech Solutions",
    industry: "EdTech / AI",
    region: "Global",
    serviceTags: ["Educational Content Development", "Subject Matter Experts", "AI-Powered Learning"],
    problem: "The widespread adoption of AI for generating educational responses raised concerns about authenticity and credibility. While AI can swiftly generate answers, there was a growing need to incorporate human expertise to ensure accuracy and mitigate plagiarism risks.",
    solution: "We developed a solution that integrates AI-generated responses with human expertise. Our approach involves producing responses using AI while infusing a human-like touch, with quality assurance through validation by 200+ SMEs. We consistently deliver more than 10,000 meticulously fact-checked solutions daily, catering to 10+ educational institutions.",
    impact: "By integrating human oversight within AI systems, we provide students with fact-checked answers, enhancing authenticity and credibility. This collaborative approach mitigates plagiarism risks and facilitates swift delivery of accurate information. The solution empowered our client’s AI-infused global platform to provide on-demand solutions to students worldwide.",
    metrics: [
      { label: "Solutions/Day", value: "10K+" },
      { label: "SMEs Involved", value: "200+" },
      { label: "Institutions", value: "10+" },
      { label: "Reach", value: "Global" }
    ],
    cardSummary: "AI + human QA pipeline delivering 10,000+ fact-checked educational solutions daily for a global AI platform.",
    visualDirection: { theme: "teal" },
    relatedLinks: [
      { label: "AI-Powered Learning", href: "/edtech-solutions/learning-solutions/ai-powered-learning" }
    ]
  },
  {
    id: "cs-5",
    image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=800",
    title: "On-Demand Video Solutions for US EdTech Company",
    category: "EdTech Solutions",
    industry: "Higher Education / EdTech",
    region: "USA",
    serviceTags: ["E-Learning Video Solutions", "Subject Matter Experts"],
    problem: "Undergraduate and postgraduate students struggled to grasp complex topics due to limitations in traditional teaching and challenges in accessing timely assistance outside classroom hours.",
    solution: "Our client, a leading US educational technology company, envisioned comprehensive video solutions across 15+ subjects. We harnessed 150+ SMEs who collaborated to produce video solutions within 2 hours of a student posting a query on the client’s platform.",
    impact: "Enhanced accessibility: on-demand video solutions significantly increased learning accessibility regardless of location or schedule. Higher academic performance: students were better equipped to excel, leading to improved grades.",
    metrics: [
      { label: "SMEs Deployed", value: "150+" },
      { label: "Subjects Covered", value: "15+" },
      { label: "Turnaround Time", value: "2 Hrs" },
      { label: "Education Level", value: "UG/PG" }
    ],
    cardSummary: "On-demand video solutions across 15+ subjects with 2-hour turnaround for a leading US edtech company.",
    visualDirection: { theme: "teal" },
    relatedLinks: [
      { label: "E-Learning Video Solutions", href: "/edtech-solutions/elearning-video-solutions" },
      { label: "Subject Matter Experts", href: "/edtech-solutions/subject-matter-experts" }
    ]
  },
  {
    id: "cs-6",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
    title: "Math Solutions QA: 10,000+ Monthly Reviews at 90%+ Accuracy",
    category: "EdTech Solutions",
    industry: "EdTech",
    region: "Global",
    serviceTags: ["Educational Content Development", "Assessment Development", "Quality Assurance"],
    problem: "A leading educational platform for mathematics (primary to graduation level) faced challenges maintaining accuracy and quality across 10,000+ monthly solutions contributed by worldwide contributors.",
    solution: "We curated a team of 25 mathematics experts. Solutions underwent rigorous multi-expert review with stringent quality metrics (minimum 90% accuracy rate). A feedback mechanism provided constructive feedback to contributors for continuous improvement.",
    impact: "10,000+ solutions quality-checked monthly. Accuracy rate consistently exceeded 90%, surpassing client expectations. Enhanced user satisfaction and trust led to increased engagement and retention.",
    metrics: [
      { label: "Reviews/Month", value: "10K+" },
      { label: "Accuracy", value: ">90%" },
      { label: "Math Experts", value: "25" },
      { label: "Difficulty Range", value: "Primary-UG" }
    ],
    cardSummary: "Quality assurance of 10,000+ monthly math solutions at 90%+ accuracy for a global education platform.",
    visualDirection: { theme: "teal" },
    relatedLinks: [
      { label: "Educational Content Development", href: "/edtech-solutions/custom-e-learning-content/educational-content-development" }
    ]
  },
  {
    id: "cs-7",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
    title: "400,000+ Bilingual Workbooks for Rural Chhattisgarh Students",
    category: "EdTech Solutions",
    industry: "Government / NGO / Education",
    region: "India (Chhattisgarh)",
    serviceTags: ["Workbook Development", "Localization Services", "Custom E-Learning Content"],
    problem: "In September 2022, a client sought to address educational challenges faced by rural students in Chhattisgarh for grades 6–10 across Mathematics, Science, English, and Social Studies. Resources were needed in both English and Hindi.",
    solution: "Our team of SMEs, curriculum specialists, bilingual writers, proofreaders, designers, and logistics professionals conducted a needs assessment, developed curriculum-aligned content, translated into English and Hindi, designed visually appealing layouts, printed 400,000+ copies per subject/language, and facilitated distribution with teacher training.",
    impact: "400,000+ students and teachers gained access to high-quality materials. Teachers reported enhanced teaching methodologies, student engagement, and academic performance. Solidified our position as a trusted education partner in Chhattisgarh.",
    metrics: [
      { label: "Copies Printed", value: "400K+" },
      { label: "Grades Covered", value: "6–10" },
      { label: "Subjects (Bilingual)", value: "4" },
      { label: "Extras", value: "Teacher Training" }
    ],
    cardSummary: "400,000+ bilingual workbooks printed and distributed across rural Chhattisgarh for grades 6–10.",
    visualDirection: { theme: "teal" },
    relatedLinks: [
      { label: "Localization Services", href: "/edtech-solutions/localization-services" },
      { label: "Workbook Development", href: "/edtech-solutions/custom-e-learning-content/workbook-development" }
    ]
  },
  {
    id: "cs-8",
    image: "https://images.unsplash.com/photo-1513258496099-481620d4ce8d?auto=format&fit=crop&q=80&w=800",
    title: "EmSAT & TOEIC Test Prep Content for UAE Institution",
    category: "EdTech Solutions",
    industry: "Higher Education / Testing",
    region: "UAE / Middle East",
    serviceTags: ["Exam Preparation Content", "Assessment Development"],
    problem: "A UAE-based educational institution needed high-quality EmSAT and TOEIC exam preparation content aligned with Emirates standardised testing requirements, with modular computer-based resources.",
    solution: "We developed comprehensive EmSAT-aligned curriculum content including study guides, assessment modules, practice tests, and structured preparation materials. For TOEIC, we created Listening & Reading and Speaking & Writing practice materials aligned to ETS standards.",
    impact: "The institution was able to offer structured, standards-aligned test preparation to students, improving pass rates and student confidence. The modular format allowed flexible deployment across their digital learning platform.",
    metrics: [
      { label: "Test Coverage", value: "EmSAT + TOEIC" },
      { label: "Format", value: "Modular CBT" },
      { label: "Curriculum", value: "UAE Aligned" },
      { label: "Outcome", value: "Higher Pass Rates" }
    ],
    cardSummary: "EmSAT and TOEIC exam preparation content for a UAE educational institution.",
    visualDirection: { theme: "teal" },
    relatedLinks: [
      { label: "Exam Preparation Content", href: "/edtech-solutions/exam-preparation-content" }
    ]
  },
  {
    id: "cs-9",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    title: "Multilingual ASR Training Data for Voice AI Startup",
    category: "AI Data Services",
    industry: "Voice AI / ASR",
    region: "Global (South Asian focus)",
    serviceTags: ["Data Collection", "Data Annotation & Labeling", "Real-World Model Testing", "Audio Annotation"],
    problem: "A Series B voice AI startup building an Automatic Speech Recognition (ASR) engine for South Asian markets was struggling with high Word Error Rates (WER) across regional dialects. Their existing training data was primarily sourced from studio-recorded standard Hindi and English, which performed poorly on real-world field audio containing regional accents, ambient noise, and code-switching between languages.",
    solution: "eQOURSE deployed a 4-phase pipeline: (1) Data Collection — Field-recorded and crowdsourced 50,000+ hours of speech data across 12 Indian languages from our contributor network. Each recording was metadata-tagged. (2) Annotation — Verbatim transcription, Speaker diarisation for multi-speaker recordings. Phoneme labeling. IAA maintained at ≥ 0.82. (3) Cleaning & Validation — SNR-based filtering, deduplication, PII redaction. Gold-standard validation. (4) Real-World Testing — The client’s retrained ASR model was deployed via TuTrain. We tested across 8 dialect groups.",
    impact: "The client achieved a 34% reduction in WER across regional dialects after two active learning cycles. The model’s accuracy on Tamil and Telugu dialects improved from 62% to 89%. The TuTrain-powered testing identified 3 critical failure modes that benchmark tests had never revealed. The client secured Series C funding.",
    metrics: [
      { label: "Speech Collected", value: "50K+ Hours" },
      { label: "Languages", value: "12" },
      { label: "WER Reduction", value: "34%" },
      { label: "Accuracy (Tamil/Telugu)", value: "62% → 89%" },
      { label: "Annotator Agreement", value: "≥ 0.82" },
      { label: "Outcome", value: "Series C Raised" }
    ],
    cardSummary: "50,000+ hours of multilingual speech data, annotation, and real-world ASR testing for a voice AI startup. 34% WER reduction achieved.",
    visualDirection: { theme: "navy-cyan" },
    relatedLinks: [
      { label: "Data Collection", href: "/ai-data-services/data-collection" },
      { label: "Annotation Labeling", href: "/ai-data-services/annotation-labeling" },
      { label: "Model Testing", href: "/ai-data-services/model-testing" }
    ]
  },
  {
    id: "cs-10",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    title: "Computer Vision Annotation for Autonomous Vehicle Company",
    category: "AI Data Services",
    industry: "Autonomous Vehicles / Computer Vision",
    region: "Global (APAC focus)",
    serviceTags: ["Data Collection", "Data Annotation & Labeling", "Data Cleaning & Validation"],
    problem: "An autonomous vehicle technology company needed high-precision annotated driving datasets from South Asian road environments, which differ significantly from Western datasets (Waymo, nuScenes) in terms of road markings, vehicle types (auto-rickshaws, two-wheelers, carts), pedestrian behaviour, and signage. Their existing models trained on US/EU data failed catastrophically on Indian road scenarios.",
    solution: "eQOURSE executed: (1) Data Collection — Dashcam and LiDAR-synced video collection across 15 Indian cities. 200,000+ frames collected. (2) Annotation — Bounding box annotation for 45 vehicle classes (including India-specific). Semantic segmentation and 3D cuboid annotation. Keypoint annotation for pedestrian pose estimation. (3) Cleaning & Validation — Removal of blurred frames. Label consistency checks. Gold-standard validation with 20% honeypot images.",
    impact: "The client’s perception model accuracy on Indian road scenarios improved from 54% to 91% mAP. The annotated dataset became the client’s primary training asset for their APAC market expansion. The India-specific vehicle class annotations filled a critical gap that no public dataset addressed.",
    metrics: [
      { label: "Frames Annotated", value: "200K+" },
      { label: "Cities Covered", value: "15" },
      { label: "Vehicle Classes", value: "45" },
      { label: "mAP Improvement", value: "54% → 91%" },
      { label: "Quality Checks", value: "20% Honeypot" },
      { label: "Annotation Accuracy", value: "98.2%" }
    ],
    cardSummary: "200,000+ frames of Indian driving data annotated for an autonomous vehicle company. mAP improved from 54% to 91%.",
    visualDirection: { theme: "navy-cyan" },
    relatedLinks: [
      { label: "Data Collection", href: "/ai-data-services/data-collection" },
      { label: "Annotation Labeling", href: "/ai-data-services/annotation-labeling" }
    ]
  },
  {
    id: "cs-11",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800",
    title: "RLHF Annotation for LLM Fine-Tuning — Global AI Lab",
    category: "AI Data Services",
    industry: "Large Language Models / Generative AI",
    region: "Global",
    serviceTags: ["Data Annotation & Labeling", "Data Cleaning & Validation", "RLHF Annotation"],
    problem: "A well-funded AI research lab building a multilingual large language model (LLM) needed high-quality RLHF (Reinforcement Learning from Human Feedback) annotation across English and 5 Indic languages (Hindi, Bengali, Tamil, Telugu, Marathi). Their existing RLHF data was English-only and US-centric, causing the model to produce culturally inappropriate or factually incorrect responses when queried in Indic languages.",
    solution: "eQOURSE provided: (1) RLHF Preference Ranking — 200+ trained annotators ranked model outputs. (2) Safety Labeling — Red-teaming and safety annotation identifying harmful, biased, or policy-violating outputs. (3) Instruction-Following Evaluation. (4) Data Cleaning — Deduplication of prompt-response pairs, PII redaction, format standardisation to JSONL. All delivered with Krippendorff’s Alpha ≥ 0.83.",
    impact: "The client’s LLM showed a 28% improvement in human preference scores on Indic language responses after RLHF fine-tuning with our data. Safety violation rates dropped from 4.2% to 0.6% across all languages. The model’s cultural appropriateness ratings improved significantly, enabling a successful product launch in India.",
    metrics: [
      { label: "RLHF Annotators", value: "200+" },
      { label: "Languages", value: "6" },
      { label: "Score Improvement", value: "28%" },
      { label: "Safety Violations", value: "4.2% → 0.6%" },
      { label: "Krippendorff's Alpha", value: "≥ 0.83" },
      { label: "Outcome", value: "Successful Launch" }
    ],
    cardSummary: "RLHF annotation in 6 languages for LLM fine-tuning. 28% preference score improvement, safety violations cut to 0.6%.",
    visualDirection: { theme: "navy-cyan" },
    relatedLinks: [
      { label: "Annotation Labeling", href: "/ai-data-services/annotation-labeling" },
      { label: "Cleaning Validation", href: "/ai-data-services/cleaning-validation" }
    ]
  },
  {
    id: "cs-12",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    title: "Medical Image Annotation for Healthcare AI Startup",
    category: "AI Data Services",
    industry: "Healthcare AI / Medical Imaging",
    region: "Global",
    serviceTags: ["Data Annotation & Labeling", "Data Cleaning & Validation", "PII Redaction"],
    problem: "A healthcare AI startup developing a diagnostic support tool for chest X-ray analysis needed pixel-level annotated datasets of pulmonary conditions (pneumonia, tuberculosis, pleural effusion, cardiomegaly). Public datasets lacked region-specific pathology variants common in South Asian populations and had inconsistent annotation quality.",
    solution: "eQOURSE assembled a team of 15 medical annotators with radiology backgrounds, supervised by 3 consulting radiologists. We performed: (1) Semantic segmentation of lung fields, cardiac silhouette, and pathological regions on 25,000 chest X-rays. (2) Instance segmentation for multi-lesion cases. (3) HIPAA-aware PII redaction. (4) Gold-standard validation where every 5th image was double-annotated.",
    impact: "The client’s diagnostic model achieved 94.7% sensitivity and 96.1% specificity on their internal test set after training on our annotated data — exceeding FDA submission thresholds. The South Asian pathology variants in our dataset improved the model’s generalisation to Indian hospital deployments.",
    metrics: [
      { label: "X-Rays Annotated", value: "25K" },
      { label: "Medical Annotators", value: "15" },
      { label: "Radiologists", value: "3" },
      { label: "Sensitivity", value: "94.7%" },
      { label: "Specificity", value: "96.1%" },
      { label: "Compliance", value: "HIPAA PII Redacted" }
    ],
    cardSummary: "25,000 chest X-rays annotated by radiology-trained specialists. Client exceeded FDA diagnostic accuracy thresholds.",
    visualDirection: { theme: "navy-cyan" },
    relatedLinks: [
      { label: "Annotation Labeling", href: "/ai-data-services/annotation-labeling" },
      { label: "Cleaning Validation", href: "/ai-data-services/cleaning-validation" }
    ]
  },
  {
    id: "cs-13",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    title: "Conversational AI Dataset for FinTech Chatbot",
    category: "AI Data Services",
    industry: "FinTech / Conversational AI",
    region: "India / Southeast Asia",
    serviceTags: ["Data Collection", "Data Annotation & Labeling", "Real-World Model Testing"],
    problem: "A FinTech company building a multilingual customer service chatbot for banking and insurance queries found that their NLU (Natural Language Understanding) model had high intent misclassification rates (22% error) on Hindi, Hinglish (Hindi-English code-mixed), and regional language queries. Benchmark test sets showed 91% accuracy, but real user interactions told a different story.",
    solution: "eQOURSE executed: (1) Data Collection — Crowdsourced 150,000 realistic banking query utterances in Hindi, Hinglish, English, Tamil, and Telugu from our contributor network. (2) Annotation — Intent classification across 85 intent categories. Named Entity Recognition (NER) for financial entities. Sentiment labeling. (3) Model Testing — After the client retrained their NLU, we deployed the chatbot to real users via TuTrain. We measured accuracy and user satisfaction.",
    impact: "Intent misclassification dropped from 22% to 4.8% after two active learning cycles. Hindi and Hinglish entity extraction F1 improved from 0.71 to 0.93. The client reported a 40% reduction in chatbot-to-human-agent escalation rate, saving significant operational costs.",
    metrics: [
      { label: "Utterances Collected", value: "150K" },
      { label: "Intent Categories", value: "85" },
      { label: "Languages Covered", value: "5" },
      { label: "Intent Error", value: "22% → 4.8%" },
      { label: "Entity F1 Score", value: "0.71 → 0.93" },
      { label: "Agent Escalation", value: "-40%" }
    ],
    cardSummary: "150,000 multilingual banking utterances for a FinTech chatbot. Intent error reduced from 22% to 4.8%.",
    visualDirection: { theme: "navy-cyan" },
    relatedLinks: [
      { label: "Data Collection", href: "/ai-data-services/data-collection" },
      { label: "Annotation Labeling", href: "/ai-data-services/annotation-labeling" },
      { label: "Model Testing", href: "/ai-data-services/model-testing" }
    ]
  },
  {
    id: "cs-14",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    title: "OCR Training Data for Document AI — Handwritten Indic Scripts",
    category: "AI Data Services",
    industry: "Document AI / OCR",
    region: "India / Global",
    serviceTags: ["Data Collection", "Data Annotation & Labeling", "Data Cleaning & Validation"],
    problem: "A Document AI company building an OCR engine for Indian government forms, bank cheques, and handwritten applications found that their model performed well on printed English/Hindi text (97% character accuracy) but failed on handwritten Devanagari, Tamil, and Telugu scripts (below 70% accuracy). No large-scale labelled dataset existed for handwritten Indic scripts in real-world document contexts.",
    solution: "eQOURSE executed: (1) Data Collection — Collected 100,000+ images of handwritten documents from our contributor network across India. Contributors represented diverse handwriting styles. (2) Annotation — Character-level bounding box annotation with UTF-8 text labels. Word-level and line-level segmentation. Document layout annotation. (3) Cleaning — Removal of illegible samples. Format standardisation to COCO JSON with custom schema.",
    impact: "The client’s OCR accuracy on handwritten Devanagari improved from 68% to 94% character accuracy. Tamil and Telugu handwritten accuracy reached 91% and 89% respectively. The dataset became the largest proprietary handwritten Indic script OCR training corpus, giving the client a defensible competitive advantage.",
    metrics: [
      { label: "Document Images", value: "100K+" },
      { label: "Indic Scripts", value: "3" },
      { label: "Devanagari OCR", value: "68% → 94%" },
      { label: "Tamil OCR Acc.", value: "91%" },
      { label: "Telugu OCR Acc.", value: "89%" },
      { label: "Delivery Format", value: "COCO JSON" }
    ],
    cardSummary: "100,000+ handwritten Indic script images for OCR training. Devanagari accuracy improved from 68% to 94%.",
    visualDirection: { theme: "navy-cyan" },
    relatedLinks: [
      { label: "Data Collection", href: "/ai-data-services/data-collection" },
      { label: "Annotation Labeling", href: "/ai-data-services/annotation-labeling" }
    ]
  }
];
