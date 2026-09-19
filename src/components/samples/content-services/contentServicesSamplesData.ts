import {
  BookOpen, GraduationCap, Atom, Globe2, Calculator, FileText,
  Languages, ClipboardCheck, MousePointerClick, Pencil,
  RefreshCw, Film, Megaphone, Glasses, FileStack, PlayCircle,
  type LucideIcon,
} from "lucide-react";
import type { PreviewFile } from "../../shared/PreviewFilesModal";

export type SampleKind = "text" | "video" | "text-landing" | "video-landing";

export interface ContentServicesSample {
  slug: string;
  path: string;
  kind: SampleKind;
  icon: LucideIcon;
  accentHsl: string;          // secondary accent for per-page personality
  navLabel: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  preHeadline: string;
  headline: string;
  headlineAccent: string;
  subtext: string;
  heroImageAlt: string;
  visualImage?: string;
  visualImageAlt?: string;
  visualImageTitle?: string;
  tabs: string[];
  tabContent?: Record<string, string>;   // per-tab blurb
  previewFiles?: Record<string, PreviewFile[]>; // per-tab preview files
  bodySections?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
}

const commonFaqs = [
  {
    question: "Can I request a customized sample?",
    answer:
      "Yes. Share your curriculum framework, grade level, language, or specific topic and we'll create a tailored sample within 2-5 business days.",
  },
  {
    question: "What formats do you deliver in?",
    answer:
      "Text samples come as PDF or editable Word / InDesign. Video samples come as MP4 / SCORM-compliant packages, and interactive samples as HTML5 or LMS-ready packages.",
  },
  {
    question: "How long does a full project typically take?",
    answer:
      "Turnaround depends on scope. A single module takes 1-2 weeks, while full curriculum projects run 4-12 weeks with milestone-based delivery.",
  },
];

export const contentServicesSamples: ContentServicesSample[] = [
  // L1: Text Landing
  {
    slug: "text-samples",
    path: "/text-samples",
    kind: "text-landing",
    icon: FileText,
    accentHsl: "170 82% 45%",
    navLabel: "Text Content Samples",
    title: "Comprehensive Text Samples for Educational Institutions",
    seoTitle: "Text Samples for Educational Content | eQOURSE",
    seoDescription:
      "Explore eQOURSE text samples for educational content: curriculum development, instructional materials, localized translations, solution manuals, question banks, and e-books for K-12 and higher education.",
    keywords:
      "eQOURSE text samples, curriculum development samples, instructional materials, question banks, solution manuals, e-book samples, localization samples",
    preHeadline: "Diverse Text Samples for Educational Excellence",
    headline: "Comprehensive Text Samples for",
    headlineAccent: "Educational Institutions",
    subtext:
      "At eQOURSE, we provide a wide range of text samples to showcase our expertise in educational content development - curriculum writing, instructional materials, translations, solution manuals, question banks and e-books for K-12 and higher education.",
    heroImageAlt:
      "K12 and higher education text content samples, offering study guides, lesson plans, curriculum development, and more.",
    tabs: [
      "Educational Publishing Content Development",
      "Assessment and Question Bank Development Services",
      "International Test Prep Content Development",
      "National Test Prep Content Services",
      "Academic Content Quality Assurance Services",
      "ESL Exam Content Development",
      "Localization Services",
    ],
    bodySections: [
      {
        title: "Curriculum Development Samples",
        description:
          "Curriculum that aligns with academic standards and builds engagement - structured courses, lessons, and assessments across every subject.",
      },
      {
        title: "Instructional Content Samples",
        description:
          "Clear, concise learning materials that simplify complex concepts and guide students through them step by step.",
      },
      {
        title: "Localized & Translated Samples",
        description:
          "Malayalam, Tamil, Assamese, Punjabi and 10+ more - culturally relevant, accurately adapted content for diverse learners.",
      },
      {
        title: "Solution Manuals & Question Banks",
        description:
          "Comprehensive assessment and answer materials aligned to examination patterns from KG through competitive exams.",
      },
      {
        title: "E-book Development Samples",
        description:
          "Well-structured, engaging e-books for both self-paced and guided learning, optimized for mobile, tablet, and desktop.",
      },
    ],
    faqs: [
      {
        question: "What types of text samples can I request?",
        answer:
          "Curriculum development, instructional content, localized translations, solution manuals, question banks, e-books and test prep material.",
      },
      {
        question: "Are the text samples customizable?",
        answer:
          "Yes - every sample can be tailored to your institution's curriculum framework, grade level, or localization requirements.",
      },
      {
        question: "How do you ensure quality of translated samples?",
        answer:
          "Our translators are experts in both language and educational content, ensuring translations are accurate, culturally relevant, and engaging.",
      },
      {
        question: "Do you provide higher-education samples?",
        answer:
          "Yes. eQOURSE covers both K-12 and higher education, with content aligned to academic standards at every level.",
      },
      {
        question: "How quickly can I receive text samples?",
        answer:
          "Ready samples are shared immediately. Customized samples typically take 2-5 business days depending on scope.",
      },
    ],
  },

  // ── L2: Video Landing ─────────────────────────────────────────────
  {
    slug: "video-samples",
    path: "/video-samples",
    kind: "video-landing",
    icon: PlayCircle,
    accentHsl: "190 85% 55%",
    navLabel: "Video & Audio Samples",
    title: "Video & Audio Samples for Immersive Learning",
    seoTitle: "Video & Audio Samples for E-learning | eQOURSE",
    seoDescription:
      "Explore eQOURSE video and audio samples: educational videos, pen tab lessons, multilingual and conversational audio, animations, AI videos, and immersive learning.",
    keywords:
      "eQOURSE video and audio samples, educational video, pen tab PPT, multilingual audio, conversational audio, educational audio, animation",
    preHeadline: "Innovative Video Solutions for E-Learning Platforms",
    headline: "Video & Audio Samples for",
    headlineAccent: "Immersive Learning",
    subtext:
      "Explore educational video and audio work, from instructor-led and pen tab lessons to multilingual narration and conversational learning experiences.",
    heroImageAlt:
      "Video and audio samples including pen tab, instructor-led video, multilingual audio and conversational audio.",
    tabs: [
      "Articulate Storyline",
      "Pen Tab and PPT",
      "AI Videos",
      "Audio Samples",
      "2D 3D Animation",
      "Promotional Video",
      "Immersive Simulation AR/VR",
    ],
    bodySections: [
      {
        title: "Articulate Storyline",
        description:
          "Interactive e-learning modules with quizzes, drag-and-drop activities, and immersive scenarios for every subject.",
      },
      {
        title: "Pen Tab and PPT",
        description:
          "Step-by-step visuals with real-time annotations - the clarity of a whiteboard lesson with the structure of a professional deck.",
      },
      {
        title: "AR & VR",
        description:
          "Virtual environments and 3D models that turn abstract ideas into explorable, memorable visual lessons.",
      },
      {
        title: "Audio Samples",
        description:
          "Listen to multilingual narration, conversational audio, and educational audio created for learning experiences.",
      },
    ],
    faqs: commonFaqs,
  },

  // T1-T7: Text Sub-Pages
  {
    slug: "educational-publishing-content-development-samples", path: "/educational-publishing-content-development-samples", kind: "text", icon: BookOpen, accentHsl: "170 82% 38%",
    navLabel: "Educational Publishing Content Development", title: "Educational Publishing Content Development Samples",
    seoTitle: "Educational Publishing Content Development Samples | eQOURSE",
    seoDescription: "Explore educational publishing content development samples for CBSE, ICSE, IB, UK, US and international curricula, including textbooks, workbooks and digital learning content.",
    keywords: "educational publishing content development samples, CBSE content, ICSE content, IB curriculum content, UK curriculum, US curriculum, textbook development",
    preHeadline: "Curriculum-ready publishing for global education markets", headline: "Educational Publishing", headlineAccent: "Content Samples",
    subtext: "Review curriculum-aligned textbook, workbook and digital learning content created for Indian and international education publishers.",
    heroImageAlt: "Educational publishing content development samples for Indian and international curricula.",
    visualImage: "/assets/samples/text-categories/educational-publishing-content-development.webp",
    visualImageAlt: "Open textbooks, workbooks and digital curriculum materials representing educational publishing content development.",
    visualImageTitle: "Educational Publishing Content Development Samples",
    tabs: ["CBSE", "ICSE", "IB", "UK Curriculum", "US Curriculum", "International"],
    tabContent: { CBSE: "CBSE-aligned content mapped to grade-level learning outcomes.", ICSE: "Concept-rich learning materials developed for ICSE classrooms.", IB: "Inquiry-led, internationally minded content for IB programmes.", "UK Curriculum": "Content aligned with UK curriculum stages and learner progression.", "US Curriculum": "Standards-aware content for US school programmes.", International: "Adaptable publishing content for international curricula." }, faqs: commonFaqs,
  },
  {
    slug: "assessment-question-bank-development-samples", path: "/assessment-question-bank-development-samples", kind: "text", icon: ClipboardCheck, accentHsl: "42 95% 52%",
    navLabel: "Assessment and Question Bank Development Services", title: "Assessment and Question Bank Development Samples",
    seoTitle: "Assessment & Question Bank Development Samples | eQOURSE",
    seoDescription: "Explore assessment and question bank development samples for CBSE, ICSE, IB, UK, US and international curricula, including item writing, rubrics and answer keys.",
    keywords: "assessment development samples, question bank development, test item writing, answer key development, curriculum assessment content",
    preHeadline: "Valid, balanced assessments built to curriculum standards", headline: "Assessment & Question Bank", headlineAccent: "Development Samples",
    subtext: "Preview curriculum-aligned questions, assessment blueprints, rubrics, answer keys and quality-reviewed item banks for multiple education systems.",
    heroImageAlt: "Assessment and question bank development samples with test items, rubrics and answer keys.",
    visualImage: "/assets/samples/text-categories/assessment-question-bank-development.webp",
    visualImageAlt: "Exam sheets, question cards, rubrics and verified answer checks representing assessment development.", visualImageTitle: "Assessment and Question Bank Development Samples",
    tabs: ["CBSE", "ICSE", "IB", "UK Curriculum", "US Curriculum", "International"],
    tabContent: { CBSE: "CBSE questions mapped to outcomes, cognitive levels and marking schemes.", ICSE: "ICSE items designed for conceptual depth and clear evaluation.", IB: "Inquiry-based, criterion-referenced assessment content for IB.", "UK Curriculum": "Assessment materials aligned with UK curriculum stages.", "US Curriculum": "Standards-aware question banks for US programmes.", International: "Adaptable assessment frameworks for international curricula." }, faqs: commonFaqs,
  },
  {
    slug: "international-test-prep-content-samples", path: "/international-test-prep-content-samples", kind: "text", icon: Globe2, accentHsl: "217 91% 58%",
    navLabel: "International Test Prep Content Development", title: "International Test Prep Content Development Samples",
    seoTitle: "International Test Prep Content Samples | eQOURSE",
    seoDescription: "Explore international test prep content samples for SAT, ACT, AP, GMAT and GRE, including practice questions, study guides, mock tests and worked solutions.",
    keywords: "international test prep content samples, SAT content development, ACT practice content, AP exam samples, GMAT GRE question development",
    preHeadline: "Exam-pattern content for global admissions tests", headline: "International Test Prep", headlineAccent: "Content Samples",
    subtext: "Explore exam-aligned practice questions, study guides, mock tests and worked solutions created for international admissions and academic tests.",
    heroImageAlt: "International test preparation content samples for SAT, ACT, AP, GMAT and GRE exams.",
    visualImage: "/assets/samples/text-categories/international-test-prep-content.webp",
    visualImageAlt: "Test booklet, study planner, timer and score charts representing international exam preparation.", visualImageTitle: "International Test Prep Content Development Samples",
    tabs: ["SAT", "ACT", "AP", "GMAT/GRE", "Others"],
    tabContent: { SAT: "SAT-style reading, writing and mathematics practice with answer rationales.", ACT: "ACT practice sets, timed assessments and skill-building content.", AP: "Subject-specific AP content designed around course frameworks.", "GMAT/GRE": "Quantitative, verbal and analytical reasoning test content.", Others: "Content tailored to additional international exam patterns." }, faqs: commonFaqs,
  },
  {
    slug: "national-test-prep-content-samples", path: "/national-test-prep-content-samples", kind: "text", icon: Atom, accentHsl: "24 92% 54%",
    navLabel: "National Test Prep Content Services", title: "National Test Prep Content Services Samples",
    seoTitle: "National Test Prep Content Samples | eQOURSE",
    seoDescription: "Explore national test prep samples for JEE, NEET, CUET, UPSC, State PSC, CAT, GATE, CLAT, NDA, SSC, Banking, RRB, NET, CTET and other Indian exams.",
    keywords: "national test prep content samples, JEE NEET CUET, UPSC State PSC, CAT NMAT SNAP, GATE IIT JAM, CLAT AILET, SSC Banking RRB",
    preHeadline: "Rigorous preparation content for Indian competitive exams", headline: "National Test Prep", headlineAccent: "Content Samples",
    subtext: "Review syllabus-aligned theory, question banks, mock tests, current affairs and worked solutions for leading national and state competitive exams.",
    heroImageAlt: "National competitive exam preparation samples for engineering, medical, civil services and aptitude exams.",
    visualImage: "/assets/samples/text-categories/national-test-prep-content.webp",
    visualImageAlt: "Competitive exam guides, solved questions and progress charts representing national test preparation.", visualImageTitle: "National Test Prep Content Services Samples",
    tabs: ["JEE/NEET/CUET", "UPSC/State PSC", "CAT/NMAT/SNAP", "GATE/IIT JAM", "CLAT/AILET", "Other Exams", "NDA/CDS", "SSC/Banking/RRB", "NET/CTET"],
    tabContent: { "JEE/NEET/CUET": "Concept notes, exam-level questions and mock assessments.", "UPSC/State PSC": "General studies, current affairs and civil services content.", "CAT/NMAT/SNAP": "Aptitude, reasoning, language and data interpretation content.", "GATE/IIT JAM": "Technical and science content with detailed problem solving.", "CLAT/AILET": "Legal reasoning, current affairs, language and aptitude practice.", "Other Exams": "Custom content for additional national and state examinations.", "NDA/CDS": "Mathematics, general ability and current affairs materials.", "SSC/Banking/RRB": "Aptitude, reasoning, language and general awareness practice.", "NET/CTET": "Teaching and research aptitude content aligned with exam patterns." }, faqs: commonFaqs,
  },
  {
    slug: "academic-content-quality-assurance-samples", path: "/academic-content-quality-assurance-samples", kind: "text", icon: FileText, accentHsl: "263 70% 58%",
    navLabel: "Academic Content Quality Assurance Services", title: "Academic Content Quality Assurance Samples",
    seoTitle: "Academic Content Quality Assurance Samples | eQOURSE",
    seoDescription: "Explore academic content quality assurance samples covering solution validation, AI training solutions, academic review, editorial checks and accuracy verification.",
    keywords: "academic content quality assurance samples, solution validation, academic review, AI training solutions, editorial quality check, content accuracy",
    preHeadline: "Expert review for accurate, consistent academic content", headline: "Academic Content", headlineAccent: "Quality Assurance Samples",
    subtext: "See how our subject experts validate solutions, review academic accuracy, improve AI training content and document every quality check.",
    heroImageAlt: "Academic content quality assurance samples showing solution validation and expert review.",
    visualImage: "/assets/samples/text-categories/academic-content-quality-assurance.webp",
    visualImageAlt: "Reviewed manuscript pages, checklist and verification tools representing academic content quality assurance.", visualImageTitle: "Academic Content Quality Assurance Samples",
    tabs: ["Solutions", "AI Training Solutions", "Academic Quality Review", "Others"],
    tabContent: { Solutions: "Step-by-step solution validation for correctness and clarity.", "AI Training Solutions": "Expert-reviewed academic responses for model training and evaluation.", "Academic Quality Review": "Fact checking, alignment, language and pedagogical review.", Others: "Additional editorial and subject-matter quality assurance." }, faqs: commonFaqs,
  },
  {
    slug: "esl-exam-content-development-samples", path: "/esl-exam-content-development-samples", kind: "text", icon: GraduationCap, accentHsl: "190 85% 46%",
    navLabel: "ESL Exam Content Development", title: "ESL Exam Content Development Samples",
    seoTitle: "ESL Exam Content Development Samples | eQOURSE",
    seoDescription: "Explore ESL exam content development samples for IELTS, TOEFL, TOEIC, PTE Academic, APTIS and JAE, including reading, writing, listening and speaking tasks.",
    keywords: "ESL exam content samples, IELTS content development, TOEFL questions, TOEIC practice, PTE Academic content, APTIS exam content",
    preHeadline: "Four-skill English assessment content for global learners", headline: "ESL Exam Content", headlineAccent: "Development Samples",
    subtext: "Preview test specifications, practice tasks, rubrics and answer rationales for English proficiency exams across reading, writing, listening and speaking.",
    heroImageAlt: "ESL exam content samples for IELTS, TOEFL, TOEIC, PTE Academic, APTIS and JAE.",
    visualImage: "/assets/samples/text-categories/esl-exam-content-development.webp",
    visualImageAlt: "Headphones, microphone, reading cards and language progress charts representing ESL exam content.", visualImageTitle: "ESL Exam Content Development Samples",
    tabs: ["IELTS", "TOEFL", "TOEIC", "PTE Academic", "APTIS", "JAE"],
    tabContent: { IELTS: "IELTS reading, writing, listening and speaking content with scoring guidance.", TOEFL: "Integrated and independent English language tasks for TOEFL.", TOEIC: "Workplace English listening and reading practice.", "PTE Academic": "Computer-based speaking, writing, reading and listening tasks.", APTIS: "Grammar, vocabulary and four-skill APTIS preparation content.", JAE: "English assessment content tailored to JAE requirements." }, faqs: commonFaqs,
  },
  {
    slug: "localization-services-samples", path: "/localization-services-samples", kind: "text", icon: Languages, accentHsl: "320 70% 56%",
    navLabel: "Localization Services", title: "Educational Localization Services Samples",
    seoTitle: "Educational Localization Services Samples | eQOURSE",
    seoDescription: "Explore educational localization samples for worksheets, solutions, answer keys, translation and video translation across Indian and international languages.",
    keywords: "educational localization samples, worksheet localization, solution translation, answer key localization, video translation, multilingual educational content",
    preHeadline: "Accurate, culturally relevant learning content in every language", headline: "Educational Localization", headlineAccent: "Services Samples",
    subtext: "Review localized worksheets, solutions, answer keys, translated learning content and video translation prepared by language and subject specialists.",
    heroImageAlt: "Educational localization samples for worksheets, answer keys, translation and video translation.",
    visualImage: "/assets/samples/text-categories/localization-services.webp",
    visualImageAlt: "Source and localized documents, subtitle timeline and globe representing educational localization services.", visualImageTitle: "Educational Localization Services Samples",
    tabs: ["Worksheet", "Solutions/Key", "Translation", "Video Translation"],
    tabContent: { Worksheet: "Localized worksheets that preserve meaning, layout and learner suitability.", "Solutions/Key": "Translated solutions and answer keys checked for accuracy.", Translation: "Culturally adapted educational text from language and subject specialists.", "Video Translation": "Scripts, subtitles and localized narration for educational video." }, faqs: commonFaqs,
  },
  // V1-V7: Video Sub-Pages
  {
    slug: "articulate-storyline-video-samples",
    path: "/articulate-storyline-video-samples",
    kind: "video",
    icon: MousePointerClick,
    accentHsl: "190 85% 55%",
    navLabel: "Articulate Storyline",
    title: "Articulate Storyline Video Samples",
    seoTitle: "Articulate Storyline Video Samples - eQOURSE",
    seoDescription:
      "Articulate Storyline interactive e-learning video samples by eQOURSE. Branching scenarios, quizzes, drag-and-drop activities, and immersive learning modules.",
    keywords:
      "articulate storyline samples, interactive e-learning, branching scenarios, drag and drop, SCORM modules",
    preHeadline: "Interactive E-Learning Modules with Articulate Storyline",
    headline: "Articulate Storyline",
    headlineAccent: "Video Samples",
    subtext:
      "Interactive e-learning modules with branching scenarios, quizzes, drag-and-drop activities, and immersive simulations. Engaging, self-paced experiences that work across devices and LMS platforms.",
    heroImageAlt:
      "Articulate Storyline interactive e-learning video samples with branching scenarios and quizzes.",
    tabs: ["Interactive Modules", "Branching Scenarios", "Quizzes & Assessments"],
    faqs: commonFaqs,
  },
  {
    slug: "pen-tab-and-ppt-samples",
    path: "/pen-tab-and-ppt-samples",
    kind: "video",
    icon: Pencil,
    accentHsl: "42 95% 60%",
    navLabel: "Pen Tab and PPT",
    title: "Pen Tab and PPT Video Samples",
    seoTitle: "Pen Tab & PPT Video Samples - eQOURSE",
    seoDescription:
      "Pen Tab and PPT-based educational video samples by eQOURSE. Step-by-step concept explanations with handwritten annotations and PowerPoint-based lessons.",
    keywords:
      "pen tab samples, PPT video lessons, handwritten annotations, step-by-step videos, math explainer videos",
    preHeadline: "Step-by-Step Concept Videos with Pen Tab & PPT",
    headline: "Pen Tab & PPT",
    headlineAccent: "Video Samples",
    subtext:
      "Step-by-step concept explanations with handwritten annotations overlaid on presentation slides - math, science, and language lessons that combine the clarity of handwriting with the structure of a professional deck.",
    heroImageAlt:
      "Pen Tab and PPT educational video samples with handwritten annotations and step-by-step explanations.",
    tabs: ["Mathematics", "Science", "Language", "Educational Video", "Instructor Led Video", "Pen Tab Video"],
    faqs: commonFaqs,
  },
  {
    slug: "ai-avatar-video-samples",
    path: "/ai-videos-samples",
    kind: "video",
    icon: PlayCircle,
    accentHsl: "190 85% 55%",
    navLabel: "AI Videos",
    title: "AI Video Samples",
    seoTitle: "AI Video Samples | AI Presenter & Multilingual Avatars | eQOURSE",
    seoDescription: "Explore eQOURSE AI presenter videos and multilingual AI avatar video samples for education and training.",
    keywords: "AI video samples, AI presenter videos, multilingual AI avatar videos, educational video",
    preHeadline: "AI-Powered Video Production",
    headline: "AI Video",
    headlineAccent: "Samples",
    subtext: "Preview AI presenter and multilingual avatar videos created for scalable educational content.",
    heroImageAlt: "AI presenter and multilingual avatar video samples for learning.",
    tabs: ["AI Presenter Videos", "Multilingual AI Avatar Videos"],
    faqs: commonFaqs,
  },
  {
    slug: "audio-samples",
    path: "/audio-samples",
    kind: "video",
    icon: RefreshCw,
    accentHsl: "30 80% 55%",
    navLabel: "Audio Samples",
    title: "Multilingual, Conversational & Educational Audio Samples",
    seoTitle: "Audio Samples | Multilingual & Educational Audio | eQOURSE",
    seoDescription:
      "Listen to eQOURSE multilingual audio, conversational audio and educational audio samples created for digital learning and training.",
    keywords:
      "audio samples, multilingual audio, conversational audio, educational audio, e-learning narration",
    preHeadline: "Audio for Learning in Every Language",
    headline: "Audio",
    headlineAccent: "Samples",
    subtext:
      "Hear how clear narration, natural conversations and thoughtfully produced educational audio make learning more accessible and engaging.",
    heroImageAlt:
      "Audio sample visualization for multilingual, conversational and educational learning content.",
    tabs: ["Multilingual Audio", "Conversational Audio", "Educational Audio"],
    tabContent: {
      "Multilingual Audio": "Listen to localized narration and voice content made for learners across languages and regions.",
      "Conversational Audio": "Explore natural dialogue with clear speaker turns, pacing and expressive delivery.",
      "Educational Audio": "Preview narrated lessons and learning audio designed to explain concepts with clarity.",
    },
    faqs: commonFaqs,
  },
  {
    slug: "2d-3d-video-samples",
    path: "/2d-3d-video-samples",
    kind: "video",
    icon: Film,
    accentHsl: "320 70% 60%",
    navLabel: "2D 3D Animation",
    title: "2D & 3D Animation Video Samples",
    seoTitle: "2D & 3D Animation Video Samples - eQOURSE",
    seoDescription:
      "2D and 3D educational animation video samples by eQOURSE. Character-driven animations, explainer videos, motion graphics, and 3D concept visualisations for K-12 and corporate training.",
    keywords:
      "2D animation samples, 3D educational videos, motion graphics, whiteboard animation, character animation",
    preHeadline: "Engaging 2D & 3D Animated Educational Videos",
    headline: "2D & 3D Animation",
    headlineAccent: "Video Samples",
    subtext:
      "Character-driven educational animations, concept explainer videos, motion graphics, and 3D scientific visualisations - transforming complex concepts into visually engaging, memorable learning experiences.",
    heroImageAlt:
      "2D and 3D educational animation video samples showing character animations and concept visualisations.",
    tabs: ["2D Character Animation", "3D Concept Videos", "Motion Graphics", "Whiteboard Animation"],
    faqs: commonFaqs,
  },
  {
    slug: "promotional-video",
    path: "/promotional-video",
    kind: "video",
    icon: Megaphone,
    accentHsl: "0 75% 60%",
    navLabel: "Promotional Video",
    title: "Promotional Video Samples",
    seoTitle: "Promotional Video Samples - eQOURSE",
    seoDescription:
      "Promotional video samples by eQOURSE for educational institutions, content services platforms, and corporate training. Brand videos, product demos, and marketing content.",
    keywords:
      "promotional video samples, brand video, course trailer, product demo, marketing content, Content Services videos",
    preHeadline: "Professional Promotional Videos for Education & Training",
    headline: "Promotional",
    headlineAccent: "Video Samples",
    subtext:
      "Brand videos, product demos, course trailers and marketing content for educational institutions, content services platforms, and corporate training - designed to attract learners and communicate value effectively.",
    heroImageAlt: "Promotional video samples for educational institutions and content services platforms.",
    tabs: ["Brand Videos", "Course Trailers", "Product Demos"],
    faqs: commonFaqs,
  },
  {
    slug: "immersive-simulation-ar-vr-video",
    path: "/immersive-simulation-ar-vr-video",
    kind: "video",
    icon: Glasses,
    accentHsl: "220 85% 55%",
    navLabel: "Immersive Simulation AR/VR",
    title: "Immersive Simulation AR/VR Video Samples",
    seoTitle: "AR/VR Immersive Simulation Video Samples - eQOURSE",
    seoDescription:
      "AR and VR immersive simulation video samples by eQOURSE. Augmented reality overlays, virtual reality environments, and 360-degree learning experiences for education and training.",
    keywords:
      "AR VR samples, immersive simulation, 360 video, virtual reality learning, augmented reality, interactive 3D models",
    preHeadline: "Augmented & Virtual Reality Learning Experiences",
    headline: "Immersive AR/VR",
    headlineAccent: "Simulation Samples",
    subtext:
      "AR overlays, VR environments, 360-degree learning experiences, and interactive 3D models - safe, repeatable, hands-on learning for science labs, medical procedures, engineering systems and safety training.",
    heroImageAlt: "AR and VR immersive simulation video samples for interactive educational experiences.",
    tabs: ["AR Overlay Demos", "VR Environment Tours", "360-degree Experiences", "Interactive 3D Models"],
    faqs: commonFaqs,
  },
];

export const getContentServicesSampleBySlug = (slug: string) =>
  contentServicesSamples.find((s) => s.slug === slug);

export const getContentServicesSampleByPath = (path: string) => {
  const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  return contentServicesSamples.find((s) => s.path === normalizedPath);
};

export const textSubSamples = contentServicesSamples.filter((s) => s.kind === "text");
export const videoSubSamples = contentServicesSamples.filter((s) => s.kind === "video");
