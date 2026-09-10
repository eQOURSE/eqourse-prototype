/**
 * Sample Hierarchy - Single source of truth for the 3-level sample structure.
 *
 * Main Category  →  Sub-Category (page)  →  Tabs (sub-sub-categories)
 *
 * Used by the admin panel for navigation AND by the frontend for data mapping.
 * No CRUD - these are hardcoded to match the public website structure.
 */

import {
  FileText,
  PlayCircle,
  Database,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Landmark,
  Atom,
  BookOpenCheck,
  Languages,
  ClipboardList,
  Presentation,
  PenTool,
  Bot,
  Code2,
  Film,
  Video,
  Glasses,
  Tags,
  Eye,
  AudioLines,
  ThumbsUp,
  FolderSearch,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface SubCategory {
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
  tabs: string[];
}

export interface MainCategory {
  id: "text" | "video" | "ai-data";
  label: string;
  description: string;
  icon: LucideIcon;
  accent: string;       // tailwind border/bg class suffix
  accentColor: string;  // for inline styles
  subCategories: SubCategory[];
}

export const SAMPLE_HIERARCHY: MainCategory[] = [
  {
    id: "text",
    label: "Text Content Samples",
    description: "K-12, competitive exams, STEM, curriculum, localization, and test-prep samples showcasing editorial and pedagogical craft.",
    icon: FileText,
    accent: "emerald",
    accentColor: "hsl(160 84% 39%)",
    subCategories: [
      { slug: "kindergarten-to-k5-samples", label: "K12 Grade (KG-5)", description: "Age-appropriate content for early learners with interactive activities.", icon: BookOpen, tabs: ["Course Book", "Lesson Plan", "Work Book"] },
      { slug: "k6-to-k12-samples", label: "K12 Grade (6-12)", description: "Rich curriculum content aligned to national standards and frameworks.", icon: GraduationCap, tabs: ["Course Book", "Lesson Plan", "Work Book"] },
      { slug: "iit-jee-neet-samples", label: "IIT JEE / NEET", description: "Competitive exam prep content with solved problems and conceptual depth.", icon: FlaskConical, tabs: ["Theory Content", "Question Banks", "Mock Test"] },
      { slug: "upsc-state-psc-samples", label: "UPSC & State PSC", description: "Civil-services exam material across polity, economy, and current affairs.", icon: Landmark, tabs: ["General Studies", "Current Affairs", "Previous Year Papers"] },
      { slug: "stem-content-samples", label: "STEM Content", description: "Concept-first STEM modules with simulations and worked examples.", icon: Atom, tabs: ["Science", "Technology", "Engineering", "Mathematics"] },
      { slug: "curriculum-samples", label: "Curriculum Content", description: "NCERT-aligned CBSE curriculum samples with assessments.", icon: BookOpenCheck, tabs: ["CBSE", "ICSE", "IB", "State Board"] },
      { slug: "translation-and-localization-text-samples", label: "Localization", description: "Text translated and culturally adapted across 30+ languages.", icon: Languages, tabs: ["Hindi", "Tamil", "Telugu", "Bengali", "Kannada", "Malayalam", "Other Languages"] },
      { slug: "test-prep-and-assessments", label: "Test Prep & Assessments", description: "Item-banked assessments and diagnostic test samples.", icon: ClipboardList, tabs: ["TOEIC", "APTIS", "SAT", "IELTS", "ACT", "AP", "TOEFL", "PTE", "CEFR"] },
    ],
  },
  {
    id: "video",
    label: "Video Content Samples",
    description: "From Articulate Storyline to AI avatar videos and AR/VR simulations - browse video production pipeline samples.",
    icon: PlayCircle,
    accent: "blue",
    accentColor: "hsl(217 91% 60%)",
    subCategories: [
      { slug: "articulate-storyline-video-samples", label: "Articulate Storyline", description: "Interactive Storyline courses with branching and variables.", icon: Presentation, tabs: ["Interactive Modules", "Branching Scenarios", "Quizzes & Assessments"] },
      { slug: "pen-tab-and-ppt-samples", label: "Pen Tab and PPT", description: "Classroom-style whiteboard and narrated PPT walkthroughs.", icon: PenTool, tabs: ["Mathematics", "Science", "Language"] },
      { slug: "ai-avatar-video-samples", label: "AI Videos", description: "AI-presenter videos with realistic avatars and localized voices.", icon: Bot, tabs: ["AI Presenter Videos", "Multilingual AI Avatar Videos"] },
      { slug: "flash-to-html-samples", label: "Flash to HTML", description: "Legacy Flash modules reborn as responsive HTML5 courses.", icon: Code2, tabs: ["Before/After Comparisons", "Interactive HTML5 Modules"] },
      { slug: "2d-3d-video-samples", label: "2D 3D Animation", description: "Animated explainers across science, math, and skills.", icon: Film, tabs: ["2D Character Animation", "3D Concept Videos", "Motion Graphics", "Whiteboard Animation"] },
      { slug: "promotional-video", label: "Promotional Video", description: "Brand and product promo videos for Content Services and enterprise.", icon: Video, tabs: ["Brand Videos", "Course Trailers", "Product Demos"] },
      { slug: "immersive-simulation-ar-vr-video", label: "Immersive Simulation AR/VR", description: "AR/VR simulations for immersive learning and training.", icon: Glasses, tabs: ["AR Overlay Demos", "VR Environment Tours", "360-degree Experiences", "Interactive 3D Models"] },
    ],
  },
  {
    id: "ai-data",
    label: "AI Data Samples",
    description: "Browse sample outputs from our AI data services pipeline across NLP, Computer Vision, Audio, RLHF, Data Collection, and Cleaned Datasets.",
    icon: Database,
    accent: "violet",
    accentColor: "hsl(263 70% 58%)",
    subCategories: [
      { slug: "nlp-annotation", label: "NLP Annotation", description: "Named entity recognition, sentiment parsing, and relationship extraction.", icon: Tags, tabs: ["Named Entity Recognition (NER)", "Sentiment Analysis", "Intent Classification", "Relation Extraction", "Coreference Resolution"] },
      { slug: "computer-vision", label: "Computer Vision", description: "Bounding box, semantic segmentation, and keypoint detection samples.", icon: Eye, tabs: ["Bounding Box Annotation", "Semantic Segmentation", "Instance Segmentation", "Keypoint Detection", "3D Cuboid Annotation"] },
      { slug: "audio-speech", label: "Audio & Speech", description: "Transcription, speaker diarisation, and prosody labeling samples.", icon: AudioLines, tabs: ["Verbatim Transcription", "Speaker Diarisation", "Phoneme & Prosody Labeling", "Emotion & Tone Detection"] },
      { slug: "rlhf", label: "RLHF", description: "Preference ranking, response quality scoring, and safety labels.", icon: ThumbsUp, tabs: ["Preference Ranking", "Response Quality Scoring", "Instruction-Following Evaluation", "Safety & Red-Teaming Labels"] },
      { slug: "data-collection", label: "Data Collection", description: "Text, audio, image, and video data collection samples.", icon: FolderSearch, tabs: ["Text Collection Samples", "Audio Collection Samples", "Image Collection Samples", "Video Collection Samples"] },
      { slug: "cleaned-datasets", label: "Cleaned Datasets", description: "Deduplication, PII redaction, filtering, and gold-standard reports.", icon: Sparkles, tabs: ["Text Deduplication: Before / After", "PII Redaction: Before / After", "Audio Quality Filtering: Before / After", "Gold-Standard Validation Report"] },
     {slug: "robotics-datasets",label: "Robotics Datasets",description: "Sensor data cleaning, trajectory validation, annotation quality, and simulation-to-real dataset reports.",icon: Bot,tabs: ["Sensor Data Cleaning: Before / After","Trajectory Validation: Before / After","Annotation Quality: Before / After","Simulation-to-Real Validation Report"]},
    ],
  },
];

/** Look up a main category by its id */
export const getMainCategory = (id: string): MainCategory | undefined =>
  SAMPLE_HIERARCHY.find((m) => m.id === id);

/** Look up a sub-category by its slug (across all main categories) */
export const getSubCategory = (slug: string): { main: MainCategory; sub: SubCategory } | undefined => {
  for (const main of SAMPLE_HIERARCHY) {
    const sub = main.subCategories.find((s) => s.slug === slug);
    if (sub) return { main, sub };
  }
  return undefined;
};
