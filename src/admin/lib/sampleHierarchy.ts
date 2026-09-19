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
      { slug: "educational-publishing-content-development-samples", label: "Educational Publishing Content Development", description: "Curriculum-aligned publishing samples for Indian and international education systems.", icon: BookOpen, tabs: ["CBSE", "ICSE", "IB", "UK Curriculum", "US Curriculum", "International"] },
      { slug: "assessment-question-bank-development-samples", label: "Assessment and Question Bank Development Services", description: "Assessment items, rubrics and answer keys aligned to global curricula.", icon: ClipboardList, tabs: ["CBSE", "ICSE", "IB", "UK Curriculum", "US Curriculum", "International"] },
      { slug: "international-test-prep-content-samples", label: "International Test Prep Content Development", description: "Exam-pattern content for international admissions and academic tests.", icon: Globe2, tabs: ["SAT", "ACT", "AP", "GMAT/GRE", "Others"] },
      { slug: "national-test-prep-content-samples", label: "National Test Prep Content Services", description: "Preparation content for leading Indian national and state examinations.", icon: Landmark, tabs: ["JEE/NEET/CUET", "UPSC/State PSC", "CAT/NMAT/SNAP", "GATE/IIT JAM", "CLAT/AILET", "Other Exams", "NDA/CDS", "SSC/Banking/RRB", "NET/CTET"] },
      { slug: "academic-content-quality-assurance-samples", label: "Academic Content Quality Assurance Services", description: "Expert validation, academic review and AI training solution checks.", icon: BookOpenCheck, tabs: ["Solutions", "AI Training Solutions", "Academic Quality Review", "Others"] },
      { slug: "esl-exam-content-development-samples", label: "ESL Exam Content Development", description: "Four-skill English proficiency test content for global exams.", icon: GraduationCap, tabs: ["IELTS", "TOEFL", "TOEIC", "PTE Academic", "APTIS", "JAE"] },
      { slug: "localization-services-samples", label: "Localization Services", description: "Educational text and video localization by language and subject specialists.", icon: Languages, tabs: ["Worksheet", "Solutions/Key", "Translation", "Video Translation"] },
    ],
  },
  {
    id: "video",
    label: "Video & Audio Samples",
    description: "Browse educational video, animation, immersive learning and audio samples.",
    icon: PlayCircle,
    accent: "blue",
    accentColor: "hsl(217 91% 60%)",
    subCategories: [
      { slug: "articulate-storyline-video-samples", label: "Articulate Storyline", description: "Interactive Storyline courses with branching and variables.", icon: Presentation, tabs: ["Interactive Modules", "Branching Scenarios", "Quizzes & Assessments"] },
      { slug: "pen-tab-and-ppt-samples", label: "Pen Tab and PPT", description: "Classroom-style whiteboard and narrated PPT walkthroughs.", icon: PenTool, tabs: ["Mathematics", "Science", "Language", "Educational Video", "Instructor Led Video", "Pen Tab Video"] },
      { slug: "ai-avatar-video-samples", label: "AI Videos", description: "AI-presenter videos with realistic avatars and localized voices.", icon: Bot, tabs: ["AI Presenter Videos", "Multilingual AI Avatar Videos"] },
      { slug: "audio-samples", label: "Audio Samples", description: "Multilingual, conversational and educational learning audio.", icon: AudioLines, tabs: ["Multilingual Audio", "Conversational Audio", "Educational Audio"] },
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
      { slug: "robotics-samples", label: "Robotics Datasets", description: "Demonstrations, synchronized sensors, 3D perception labels and recovery episodes.", icon: Bot, tabs: ["Demonstration Trajectories: Raw / Curated", "Multimodal Sensor Synchronization", "3D Perception Labels: Review & Validation", "Failure & Recovery Episode Set"] },
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
