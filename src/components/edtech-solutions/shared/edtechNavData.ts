import {
  BookOpen, Pencil, MonitorPlay, Globe, Laptop, Users,
  GraduationCap, ClipboardCheck, FileText, BookMarked, CalendarDays, FlaskConical, TabletSmartphone, Film, HelpCircle,
  Target, PenTool, Headphones, Calculator, BookOpenCheck,
  Presentation, Building2, Layout, Gamepad2, Brain, Network, Glasses, CircuitBoard, Lightbulb,
  Clapperboard, Video, MousePointerClick,
  Languages, Mic, Captions,
  HardDrive, Server,
  UserCheck, type LucideIcon
} from "lucide-react";

export interface SubServiceLink {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface EdTechCategory {
  label: string;
  href: string;
  icon: LucideIcon;
  image?: string;
  description?: string;
  subServices: SubServiceLink[];
}

export const edtechCategories: EdTechCategory[] = [
  {
    label: "Custom E-Learning Content",
    href: "/edtech-solutions/custom-e-learning-content",
    icon: BookOpen,
    image: "/assets/dropdown/custom_e_learning.png",
    description: "Tailor-made e-learning modules, K12 curriculum, and engaging digital workbooks.",
    subServices: [
      { label: "K12 & Higher Education", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education", icon: GraduationCap },
      { label: "K12 Curriculum Development", href: "/edtech-solutions/custom-e-learning-content/k12-curriculum-development", icon: Layout },
      { label: "Assessment Development", href: "/edtech-solutions/custom-e-learning-content/assessment-development", icon: ClipboardCheck },
      { label: "Educational Content Development", href: "/edtech-solutions/custom-e-learning-content/educational-content-development", icon: FileText },
      { label: "Workbook Development", href: "/edtech-solutions/custom-e-learning-content/workbook-development", icon: BookMarked },
      { label: "Teacher Lesson Plan", href: "/edtech-solutions/custom-e-learning-content/teacher-lesson-plan", icon: CalendarDays },
      { label: "STEM Curriculum Services", href: "/edtech-solutions/custom-e-learning-content/stem-curriculum-services", icon: FlaskConical },
      { label: "E-Book Creation", href: "/edtech-solutions/custom-e-learning-content/ebook-creation", icon: TabletSmartphone },
      { label: "2D & 3D Videos", href: "/edtech-solutions/custom-e-learning-content/2d-3d-videos", icon: Film },
      { label: "Quiz & Question Bank", href: "/edtech-solutions/custom-e-learning-content/quiz-question-bank", icon: HelpCircle },
    ],
  },
  {
    label: "Exam Preparation Content",
    href: "/edtech-solutions/exam-preparation-content",
    icon: Pencil,
    image: "/assets/dropdown/exam_prep.png",
    description: "Comprehensive adaptive test prep materials for global standardized tests.",
    subServices: [
      { label: "APTIS Prep", href: "/edtech-solutions/exam-preparation-content/aptis", icon: Target },
      { label: "TOEIC Prep", href: "/edtech-solutions/exam-preparation-content/toeic", icon: Headphones },
      { label: "SAT Prep", href: "/edtech-solutions/exam-preparation-content/sat", icon: Calculator },
      { label: "ACT Prep", href: "/edtech-solutions/exam-preparation-content/act", icon: PenTool },
      { label: "AP Exam Prep", href: "/edtech-solutions/exam-preparation-content/ap-exam", icon: BookOpenCheck },
      { label: "IELTS Prep", href: "/edtech-solutions/exam-preparation-content/ielts", icon: Globe },
      { label: "CEFR Placement", href: "/edtech-solutions/exam-preparation-content/cefr", icon: Target },
      { label: "PTE Prep", href: "/edtech-solutions/exam-preparation-content/pte", icon: Mic },
      { label: "TOEFL Prep", href: "/edtech-solutions/exam-preparation-content/toefl", icon: FileText },
    ],
  },
  {
    label: "Learning Solutions",
    href: "/edtech-solutions/learning-solutions",
    icon: MonitorPlay,
    image: "/assets/dropdown/learning_solutions.png",
    description: "Immersive AR/VR and AI-powered gamified learning environments.",
    subServices: [
      { label: "Instructor Led Training", href: "/edtech-solutions/learning-solutions/ilt", icon: Presentation },
      { label: "Corporate E-learning", href: "/edtech-solutions/learning-solutions/corporate-elearning", icon: Building2 },
      { label: "Training Modules", href: "/edtech-solutions/learning-solutions/training-modules", icon: Layout },
      { label: "Gamified Learning", href: "/edtech-solutions/learning-solutions/gamified-learning", icon: Gamepad2 },
      { label: "Adaptive Learning", href: "/edtech-solutions/learning-solutions/adaptive-learning", icon: Brain },
      { label: "Blended Learning", href: "/edtech-solutions/learning-solutions/blended-learning", icon: Network },
      { label: "AR/VR Simulations", href: "/edtech-solutions/learning-solutions/ar-vr", icon: Glasses },
      { label: "Instructional Design", href: "/edtech-solutions/learning-solutions/instructional-design", icon: CircuitBoard },
      { label: "AI-Powered Learning", href: "/edtech-solutions/learning-solutions/ai-powered-learning", icon: Lightbulb },
    ],
  },
  {
    label: "E-Learning Video Solutions",
    href: "/edtech-solutions/elearning-video-solutions",
    icon: Clapperboard,
    image: "/assets/dropdown/elearning_video.png",
    description: "High-quality animated videos, kinetic typography, and PPT-to-video services.",
    subServices: [
      { label: "PPT Video Services", href: "/edtech-solutions/elearning-video-solutions/ppt-videos", icon: MonitorPlay },
      { label: "Articulate Storyline", href: "/edtech-solutions/elearning-video-solutions/articulate-storyline", icon: MousePointerClick },
      { label: "Animated Video Services", href: "/edtech-solutions/elearning-video-solutions/animated-videos", icon: Video },
    ],
  },
  {
    label: "Localization Services",
    href: "/edtech-solutions/localization-services",
    icon: Globe,
    image: "/assets/dropdown/localization.png",
    description: "Accurate translation, professional voiceovers, and subtitling for global reach.",
    subServices: [
      { label: "Translation Services", href: "/edtech-solutions/localization-services/translation", icon: Languages },
      { label: "Voice Over Services", href: "/edtech-solutions/localization-services/voice-over", icon: Mic },
      { label: "Subtitling Services", href: "/edtech-solutions/localization-services/subtitling", icon: Captions },
    ],
  },
  {
    label: "Technology Solutions",
    href: "/edtech-solutions/technology-solutions",
    icon: Laptop,
    image: "/assets/dropdown/technology_solutions.png",
    description: "Robust Learning Management Systems (LMS) and cloud-based architecture.",
    subServices: [
      { label: "LMS Course Builds", href: "/edtech-solutions/technology-solutions/lms-course-builds", icon: HardDrive },
      { label: "White Label LMS", href: "/edtech-solutions/technology-solutions/white-label-lms", icon: Server },
    ],
  },
  {
    label: "Subject Matter Experts",
    href: "/edtech-solutions/subject-matter-experts",
    icon: Users,
    image: "/assets/dropdown/sme_recruitment.png",
    description: "Top-tier global subject matter experts for tutoring, recruiting, and mentoring.",
    subServices: [
      { label: "SME Recruitment", href: "/edtech-solutions/subject-matter-experts/recruitment", icon: UserCheck },
      { label: "SME Training & Certification", href: "/edtech-solutions/subject-matter-experts/training", icon: BookOpenCheck },
      { label: "Live Online Tutors", href: "/edtech-solutions/subject-matter-experts/live-online-tutors", icon: MonitorPlay },
    ],
  },
];
