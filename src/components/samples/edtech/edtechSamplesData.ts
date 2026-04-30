import {
  BookOpen, GraduationCap, Atom, Globe2, Calculator, FileText,
  Languages, ClipboardCheck, MousePointerClick, Pencil, Bot,
  RefreshCw, Film, Megaphone, Glasses, FileStack, PlayCircle,
  type LucideIcon,
} from "lucide-react";
import type { PreviewFile } from "../../shared/PreviewFilesModal";

export type SampleKind = "text" | "video" | "text-landing" | "video-landing";

export interface EdtechSample {
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

export const edtechSamples: EdtechSample[] = [
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
      "K12 Grade (KG-5)",
      "K12 Grade (6-12)",
      "IIT JEE / NEET",
      "UPSC & State PSC",
      "STEM Content",
      "CBSE Content",
      "Localization",
      "Test Prep & Assessments",
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
    navLabel: "Video Content Samples",
    title: "Cutting-edge Video Samples for Immersive Learning",
    seoTitle: "Video Samples for Engaging E-learning | eQOURSE",
    seoDescription:
      "Explore eQOURSE video samples: Articulate Storyline interactive modules, Pen Tab and PPT lessons, AR/VR simulations, Flash to HTML conversions, 2D/3D animations, and promotional videos.",
    keywords:
      "eQOURSE video samples, articulate storyline, pen tab PPT, AR VR learning, flash to HTML, 2D 3D animation, promotional videos, AI avatar videos",
    preHeadline: "Innovative Video Solutions for E-Learning Platforms",
    headline: "Cutting-edge Video Samples for",
    headlineAccent: "Immersive Learning",
    subtext:
      "We create dynamic, interactive video content customized to modern e-learning needs. Our video solutions enhance engagement, improve learning outcomes, and bring educational content to life through immersive technologies and creative tools.",
    heroImageAlt:
      "Featuring Articulate Storyline, Pen Tab, PPT, AR & VR, Flash to HTML, and E-learning Videos for Interactive Learning Solutions.",
    tabs: [
      "Articulate Storyline",
      "Pen Tab and PPT",
      "AI Avatar Videos",
      "Flash to HTML",
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
        title: "Flash to HTML",
        description:
          "Modernize legacy Flash courses into responsive HTML5 while preserving interactivity, animations, and assessments.",
      },
    ],
    faqs: commonFaqs,
  },

  // T1-T8: Text Sub-Pages
  {
    slug: "kindergarten-to-k5-samples",
    path: "/kindergarten-to-k5-samples",
    kind: "text",
    icon: BookOpen,
    accentHsl: "42 95% 60%",
    navLabel: "K12 Grade (KG-5)",
    title: "Text Samples for K-12 Grade (KG-5): See Our Expertise in Action",
    seoTitle: "KG to 5th Class Text Samples - eQOURSE",
    seoDescription:
      "Explore eQOURSE text samples for Kindergarten to 5th Class: Maths, Science, Language Arts, Environmental Studies. Curriculum-aligned lesson plans, reading materials, assessments, and multilingual content.",
    keywords:
      "KG-5 text samples, primary school content, early education, lesson plans, reading materials, multilingual children's content",
    preHeadline: "Text Samples for Kindergarten to 5th Class",
    headline: "Foundational Learning Samples for",
    headlineAccent: "KG-Grade 5",
    subtext:
      "Expertly crafted text samples designed for Kindergarten to 5th Class - Maths, Science, Language Arts and Environmental Studies. Easy-to-follow lesson plans, engaging reading, structured assessments, and multilingual content.",
    heroImageAlt:
      "K12 Grade text samples for KG-5, providing study guides and lesson plans for early education, customized for EdTech platforms.",
    tabs: ["Course Book", "Lesson Plan", "Work Book"],
    faqs: commonFaqs,
  },
  {
    slug: "k6-to-k12-samples",
    path: "/k6-to-k12-samples",
    kind: "text",
    icon: GraduationCap,
    accentHsl: "200 85% 55%",
    navLabel: "K12 Grade (6-12)",
    title: "Text Samples for K-6 to K-12: Explore and Choose Your Solution",
    seoTitle: "Explore K6 to K12 Text Samples - eQOURSE",
    seoDescription:
      "Explore eQOURSE text samples for K-6 to K-12: Maths, Science, Language Arts. Curriculum-aligned content for classroom teaching and independent learning.",
    keywords:
      "K6-K12 text samples, secondary school content, Maths Science samples, classroom teaching, curriculum aligned",
    preHeadline: "Engaging & Aligned Learning for Grades 6-12",
    headline: "Secondary School Text Samples for",
    headlineAccent: "Grades 6-12",
    subtext:
      "Engaging, curriculum-aligned content covering Maths, Science, and Language Arts - helping students understand better and think critically across classroom teaching and independent learning.",
    heroImageAlt:
      "K12 Grade text samples for classes 6-12, offering study guides and assessments for EdTech platforms seeking content solutions.",
    tabs: ["Course Book", "Lesson Plan", "Work Book"],
    faqs: commonFaqs,
  },
  {
    slug: "iit-jee-neet-samples",
    path: "/iit-jee-neet-samples",
    kind: "text",
    icon: Atom,
    accentHsl: "0 75% 60%",
    navLabel: "IIT JEE / NEET",
    title: "IIT-JEE, NEET, and UPSC Exam Prep Text Samples: Explore Now",
    seoTitle: "Explore IIT/JEE/NEET Text Samples - eQOURSE",
    seoDescription:
      "IIT-JEE and NEET exam preparation text samples by eQOURSE. Study guides, test papers, theory content, question banks, and mock tests following NTA patterns.",
    keywords:
      "IIT JEE samples, NEET preparation, theory content, question banks, mock test, NTA pattern, competitive exam content",
    preHeadline: "Expert-Driven IIT-JEE & NEET Prep Content",
    headline: "Competitive Exam Text Samples for",
    headlineAccent: "IIT-JEE & NEET",
    subtext:
      "Customized content for IIT-JEE and NEET - study guides, test papers and video lessons designed to NTA patterns. Each sample builds strong problem-solving skills and aligns with the latest exam requirements.",
    heroImageAlt:
      "IIT/JEE/NEET text samples featuring exam prep materials, study guides, and solutions for competitive entrance exams.",
    tabs: ["Theory Content", "Question Banks", "Mock Test"],
    faqs: commonFaqs,
  },
  {
    slug: "upsc-state-psc-samples",
    path: "/upsc-state-psc-samples",
    kind: "text",
    icon: Globe2,
    accentHsl: "30 80% 55%",
    navLabel: "UPSC & State PSC",
    title: "UPSC & State PSC Exam Prep Text Samples",
    seoTitle: "UPSC & State PSC Text Samples - eQOURSE",
    seoDescription:
      "UPSC and State PSC exam preparation text samples by eQOURSE. Current affairs, general studies, and exam-specific content for civil services preparation.",
    keywords:
      "UPSC samples, State PSC content, current affairs, general studies, civil services prep, Indian polity samples",
    preHeadline: "Comprehensive UPSC & State PSC Preparation Content",
    headline: "Civil-Services Text Samples for",
    headlineAccent: "UPSC & State PSC",
    subtext:
      "Current affairs, general studies, Indian polity, geography, history and economics samples - structured, fact-checked, and aligned to the UPSC / State PSC examination patterns.",
    heroImageAlt:
      "UPSC and State PSC exam preparation text samples covering general studies and current affairs.",
    tabs: ["General Studies", "Current Affairs", "Previous Year Papers"],
    faqs: commonFaqs,
  },
  {
    slug: "stem-content-samples",
    path: "/stem-content-samples",
    kind: "text",
    icon: Calculator,
    accentHsl: "265 65% 65%",
    navLabel: "STEM Content",
    title: "STEM Content Text Samples",
    seoTitle: "STEM Content Samples - eQOURSE",
    seoDescription:
      "STEM content text samples by eQOURSE. Science, Technology, Engineering, and Mathematics learning materials with real-world applications for K-12 and higher education.",
    keywords:
      "STEM content samples, science samples, technology, engineering, mathematics samples, K-12 STEM, higher education STEM",
    preHeadline: "Practical STEM Learning with Real-World Applications",
    headline: "STEM Samples for",
    headlineAccent: "Critical Thinkers",
    subtext:
      "Science, Technology, Engineering and Mathematics integrated with real-world applications - samples designed to promote critical thinking, problem-solving, and hands-on learning across K-12 and higher education.",
    heroImageAlt:
      "STEM content text samples covering science, technology, engineering, and mathematics subjects.",
    tabs: ["Science", "Technology", "Engineering", "Mathematics"],
    faqs: commonFaqs,
  },
  {
    slug: "curriculum-samples",
    path: "/curriculum-samples",
    kind: "text",
    icon: FileStack,
    accentHsl: "170 82% 45%",
    navLabel: "CBSE Content",
    title: "Curriculum Content Samples (CBSE, ICSE, IB, State Boards)",
    seoTitle: "CBSE Curriculum Content Samples - eQOURSE",
    seoDescription:
      "CBSE, ICSE, IB, IGCSE, and Indian State Board curriculum samples by eQOURSE. Custom content aligned with national and international academic standards.",
    keywords:
      "CBSE samples, ICSE content, IB curriculum, IGCSE samples, state board content, curriculum-aligned",
    preHeadline: "Custom Content Aligned with CBSE, ICSE, IB, IGCSE & State Boards",
    headline: "Curriculum Content Samples for",
    headlineAccent: "Every Board",
    subtext:
      "Custom content aligned with CBSE, ICSE, IB, IGCSE, and Indian State Board standards - structured, grade-appropriate, and examination-aligned educational content for every curriculum framework.",
    heroImageAlt:
      "Curriculum content samples aligned with CBSE, ICSE, IB, and State Board standards.",
    tabs: ["CBSE", "ICSE", "IB", "State Board"],
    faqs: commonFaqs,
  },
  {
    slug: "translation-and-localization-text-samples",
    path: "/translation-and-localization-text-samples",
    kind: "text",
    icon: Languages,
    accentHsl: "320 70% 60%",
    navLabel: "Localization",
    title: "Translation & Localization Text Samples",
    seoTitle: "Translation & Localization Text Samples - eQOURSE",
    seoDescription:
      "Translation and localization text samples by eQOURSE. Multilingual educational content in Hindi, Tamil, Telugu, Bengali, Kannada, Malayalam, Marathi, Punjabi, and more.",
    keywords:
      "translation samples, localization samples, Hindi content, Tamil samples, Telugu, Bengali, Kannada, Malayalam, Indic languages",
    preHeadline: "Multilingual Content Ensuring Regional Accessibility",
    headline: "Translation & Localization",
    headlineAccent: "Text Samples",
    subtext:
      "Accurate, culturally relevant translations in Hindi, Tamil, Telugu, Bengali, Kannada, Malayalam, Marathi, Punjabi, Assamese, Odia and more - adapting educational content for every learner.",
    heroImageAlt:
      "Translation and localization text samples in multiple Indian regional languages.",
    tabs: ["Hindi", "Tamil", "Telugu", "Bengali", "Kannada", "Malayalam", "Other Languages"],
    faqs: commonFaqs,
  },
  {
    slug: "test-prep-and-assessments",
    path: "/test-prep-and-assessments",
    kind: "text",
    icon: ClipboardCheck,
    accentHsl: "220 85% 55%",
    navLabel: "Test Prep & Assessments",
    title: "Test Prep & Assessment Samples",
    seoTitle: "Test Prep & Assessment Samples - eQOURSE",
    seoDescription:
      "Test prep and assessment samples by eQOURSE. Expert-designed content for TOEIC, APTIS, SAT, IELTS, ACT, AP, TOEFL, PTE, and CEFR placement tests.",
    keywords:
      "TOEIC samples, APTIS, SAT prep, IELTS, ACT, AP exam, TOEFL, PTE, CEFR placement test",
    preHeadline: "Expert-Designed Content for Standardized Exams",
    headline: "Test Prep & Assessment",
    headlineAccent: "Samples",
    subtext:
      "Exam-pattern-aligned content across TOEIC, APTIS, SAT, IELTS, ACT, AP, TOEFL, PTE and CEFR placement tests - practice tests, study guides, and interactive assessment materials.",
    heroImageAlt: "Test prep and assessment samples for TOEIC, APTIS, SAT, IELTS, ACT, and more.",
    tabs: ["TOEIC", "APTIS", "SAT", "IELTS", "ACT", "AP", "TOEFL", "PTE", "CEFR"],
    faqs: commonFaqs,
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
    tabs: ["Mathematics", "Science", "Language"],
    faqs: commonFaqs,
  },
  {
    slug: "ai-avatar-video-samples",
    path: "/ai-avatar-video-samples",
    kind: "video",
    icon: Bot,
    accentHsl: "265 65% 65%",
    navLabel: "AI Avatar Videos",
    title: "AI Avatar Video Samples",
    seoTitle: "AI Avatar Video Samples - eQOURSE",
    seoDescription:
      "AI avatar educational video samples by eQOURSE. AI-generated presenter videos for e-learning, training, and educational content delivery.",
    keywords:
      "AI avatar videos, AI presenter samples, multilingual AI videos, scalable e-learning, synthetic video",
    preHeadline: "AI-Powered Avatar Videos for Modern E-Learning",
    headline: "AI Avatar",
    headlineAccent: "Video Samples",
    subtext:
      "AI-generated presenters delivering educational content - scalable, cost-effective video lessons for K-12 content, corporate training, and multilingual e-learning delivery.",
    heroImageAlt: "AI avatar educational video samples featuring AI-generated presenters for e-learning.",
    tabs: ["AI Presenter Videos", "Multilingual AI Avatar Videos"],
    faqs: commonFaqs,
  },
  {
    slug: "flash-to-html-samples",
    path: "/flash-to-html-samples",
    kind: "video",
    icon: RefreshCw,
    accentHsl: "30 80% 55%",
    navLabel: "Flash to HTML",
    title: "Flash to HTML Conversion Samples",
    seoTitle: "Flash to HTML Conversion Samples - eQOURSE",
    seoDescription:
      "Flash to HTML5 conversion samples by eQOURSE. Modernize legacy Flash e-learning content to mobile-friendly HTML5 while retaining interactivity and accessibility.",
    keywords:
      "flash to HTML5, legacy conversion, responsive e-learning, HTML5 modules, before after conversion",
    preHeadline: "Modernize Legacy Flash Content to HTML5",
    headline: "Flash to HTML",
    headlineAccent: "Conversion Samples",
    subtext:
      "Modernize legacy Flash-based e-learning content into mobile-friendly HTML5. Seamless transitions that retain all original interactivity, animations, and assessments across devices.",
    heroImageAlt:
      "Flash to HTML5 conversion samples showing legacy content modernized for modern browsers.",
    tabs: ["Before/After Comparisons", "Interactive HTML5 Modules"],
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
      "Promotional video samples by eQOURSE for educational institutions, EdTech platforms, and corporate training. Brand videos, product demos, and marketing content.",
    keywords:
      "promotional video samples, brand video, course trailer, product demo, marketing content, EdTech videos",
    preHeadline: "Professional Promotional Videos for Education & Training",
    headline: "Promotional",
    headlineAccent: "Video Samples",
    subtext:
      "Brand videos, product demos, course trailers and marketing content for educational institutions, EdTech platforms, and corporate training - designed to attract learners and communicate value effectively.",
    heroImageAlt: "Promotional video samples for educational institutions and EdTech platforms.",
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

export const getEdtechSampleBySlug = (slug: string) =>
  edtechSamples.find((s) => s.slug === slug);

export const getEdtechSampleByPath = (path: string) =>
  edtechSamples.find((s) => s.path === path);

export const textSubSamples = edtechSamples.filter((s) => s.kind === "text");
export const videoSubSamples = edtechSamples.filter((s) => s.kind === "video");
