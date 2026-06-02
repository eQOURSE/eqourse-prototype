import {
  BookOpen, Pencil, MonitorPlay, Globe, Laptop, Users,
  GraduationCap, ClipboardCheck, FileText, BookMarked, CalendarDays, FlaskConical, TabletSmartphone, Film, HelpCircle,
  Target, PenTool, Headphones, Calculator, BookOpenCheck,
  Presentation, Building2, Layout, Gamepad2, Brain, Network, Glasses, CircuitBoard, Lightbulb,
  Clapperboard, Video, MousePointerClick,
  Languages, Mic, Captions,
  HardDrive, Server,
  UserCheck, ShieldCheck,
  Edit, RefreshCw, Image, Tag, Palette, Printer, Settings, type LucideIcon
} from "lucide-react";

export interface SubServiceLink {
  label: string;
  href: string;
  icon?: LucideIcon;
  /** Short bullet-point highlights shown in the mega-menu preview panel */
  serviceHighlights?: string[];
}

export interface ContentServicesCategory {
  label: string;
  href: string;
  icon: LucideIcon;
  image?: string;
  imageAlt?: string;
  description?: string;
  subServices: SubServiceLink[];
}

export const contentServicesCategories: ContentServicesCategory[] = [
  {
    label: "Custom E-Learning Content",
    href: "/custom-e-learning-content",
    icon: BookOpen,
    image: "/assets/banners/content-services/main/custom-e-learning-content.png",
    imageAlt: "Custom e-learning content development services by eQOURSE - K-12 curriculum, assessments, workbooks, STEM content and interactive digital learning modules",
    description: "Tailor-made e-learning modules, K12 curriculum, and engaging digital workbooks.",
    subServices: [
      {
        label: "K12 & Higher Education", href: "/k12-and-higher-education", icon: GraduationCap,
        serviceHighlights: ["Curriculum Development", "Assessment Development", "Study Material Development", "Competitive Exam Preparation", "Interactive Workbooks", "Teacher Lesson Plans", "2D & 3D Educational Videos"],
      },
      {
        label: "K12 Curriculum Development", href: "/k12-curriculum-development-and-design-services", icon: Layout,
        serviceHighlights: ["Subject-Centered Curriculum Design", "Learner-Centered Curriculum Design", "Problem-Oriented Curriculum Design"],
      },
      {
        label: "Assessment Development", href: "/assessment-development-services", icon: ClipboardCheck,
        serviceHighlights: ["Formative Assessments", "Game-Based Assessments", "Adaptive Testing", "Quiz & Question Bank Development", "Assessment for Competitive Exams", "Subject-Integrated Assessments"],
      },
      {
        label: "Educational Content Development", href: "/educational-content-development", icon: FileText,
        serviceHighlights: ["Textbook Content Development", "Solution Manuals", "Question Banks", "Curriculum Development", "Lesson Plan Creation", "Study Guides & Notes"],
      },
      {
        label: "Workbook Development", href: "/workbook-development", icon: BookMarked,
        serviceHighlights: ["Chapter-Wise Workbooks", "Full-Syllabus Workbooks", "Topic-Based Workbooks", "Interactive Workbooks", "Assessment-Integrated Workbooks"],
      },
      {
        label: "Teacher Lesson Plan", href: "/teacher-lesson-plan", icon: CalendarDays,
        serviceHighlights: ["Daily Lesson Plans", "Weekly/Monthly Lesson Plans", "Subject-Specific Lesson Plans", "Differentiated Lesson Plans", "Technology-Enhanced Lesson Plans"],
      },
      {
        label: "STEM Curriculum Services", href: "/stem-curriculum-services", icon: FlaskConical,
        serviceHighlights: ["Integrated STEM Programs", "Project-Based STEM Learning", "STEM Lab Activities", "Coding & Robotics Curriculum", "STEM Assessment Tools"],
      },
      {
        label: "E-Book Creation", href: "/interactive-ebook-creation", icon: TabletSmartphone,
        serviceHighlights: ["Interactive Digital Textbooks", "EPUB & PDF E-Books", "Multimedia-Rich E-Books", "Curriculum-Aligned E-Books", "Accessible E-Books"],
      },
      {
        label: "2D & 3D Videos", href: "/2d-3d-videos", icon: Film,
        serviceHighlights: ["2D Animated Explainer Videos", "3D Animated Educational Videos", "Whiteboard Animation Videos", "Motion Graphics"],
      },
      {
        label: "Quiz & Question Bank", href: "/quiz-question-bank-development", icon: HelpCircle,
        serviceHighlights: ["MCQ Question Banks", "Short & Long Answer Questions", "Case-Based Questions", "Adaptive Question Pools", "Exam-Pattern Question Banks"],
      },
    ],
  },
  {
    label: "Exam Preparation Content",
    href: "/test-prep-content",
    icon: Pencil,
    image: "/assets/banners/content-services/main/exam-preparation-content.png",
    imageAlt: "Exam preparation content services by eQOURSE - SAT, TOEFL, IELTS, ACT, AP, PTE, TOEIC and CEFR test prep materials with practice tests and study guides",
    description: "Comprehensive adaptive test prep materials for global standardized tests.",
    subServices: [
      {
        label: "APTIS Prep", href: "/test-prep-content/aptis", icon: Target,
        serviceHighlights: ["Listening Practice", "Reading Practice", "Speaking Tasks", "Writing Tasks", "Grammar & Vocabulary"],
      },
      {
        label: "TOEIC Prep", href: "/test-prep-content/toeic", icon: Headphones,
        serviceHighlights: ["TOEIC Listening Practice", "TOEIC Reading Practice", "TOEIC Speaking Tasks", "TOEIC Writing Tasks"],
      },
      {
        label: "SAT Prep", href: "/test-prep-content/sat", icon: Calculator,
        serviceHighlights: ["SAT Math Practice", "SAT Reading Practice", "SAT Writing & Language", "Full-Length SAT Practice Tests"],
      },
      {
        label: "ACT Prep", href: "/test-prep-content/act", icon: PenTool,
        serviceHighlights: ["ACT English", "ACT Mathematics", "ACT Reading", "ACT Science"],
      },
      {
        label: "AP Exam Prep", href: "/test-prep-content/ap-exam", icon: BookOpenCheck,
        serviceHighlights: ["AP STEM Subjects", "AP Humanities", "AP Social Sciences", "AP FRQ Practice"],
      },
      {
        label: "IELTS Prep", href: "/test-prep-content/ielts", icon: Globe,
        serviceHighlights: ["IELTS Listening", "IELTS Reading", "IELTS Writing (Task 1 & 2)", "IELTS Speaking (Parts 1–3)"],
      },
      {
        label: "CEFR Placement", href: "/test-prep-content/cefr-placement-solutions", icon: Target,
        serviceHighlights: ["CEFR Placement Tests (A1–C2)", "Level-Specific Content", "Adaptive CEFR Testing"],
      },
      {
        label: "PTE Prep", href: "/test-prep-content/pte", icon: Mic,
        serviceHighlights: ["PTE Speaking & Writing", "PTE Reading", "PTE Listening"],
      },
      {
        label: "TOEFL Prep", href: "/test-prep-content/toefl", icon: FileText,
        serviceHighlights: ["TOEFL Reading", "TOEFL Listening", "TOEFL Speaking", "TOEFL Writing"],
      },
    ],
  },
  {
    label: "Learning Solutions",
    href: "/learning-solutions",
    icon: MonitorPlay,
    image: "/assets/banners/content-services/main/learning-solutions.jpeg",
    imageAlt: "Learning solutions by eQOURSE - instructor-led training, corporate e-learning, gamified learning, adaptive AI-powered modules and immersive AR/VR simulations",
    description: "Immersive AR/VR and AI-powered gamified learning environments.",
    subServices: [
      {
        label: "Instructor Led Training", href: "/ilt-solutions", icon: Presentation,
        serviceHighlights: ["Facilitator Guides", "Participant Workbooks", "Presentation Decks", "Activity & Exercise Sheets"],
      },
      {
        label: "Corporate E-learning", href: "/corporate-e-learning-solutions", icon: Building2,
        serviceHighlights: ["Onboarding Modules", "Compliance Training", "Skills Development", "Product Training"],
      },
      {
        label: "Training Modules", href: "/training-modules", icon: Layout,
        serviceHighlights: ["Microlearning Modules", "Scenario-Based Modules", "Assessment-Driven Modules"],
      },
      {
        label: "Gamified Learning", href: "/gamified-learning", icon: Gamepad2,
        serviceHighlights: ["Points & Rewards Systems", "Leaderboards & Badges", "Interactive Challenges", "Story-Based Gamification"],
      },
      {
        label: "Adaptive Learning", href: "/adaptive-learning", icon: Brain,
        serviceHighlights: ["Personalized Learning Paths", "Diagnostic Assessments", "Adaptive Content Delivery"],
      },
      {
        label: "Blended Learning", href: "/blended-learning", icon: Network,
        serviceHighlights: ["Flipped Classroom Content", "Hybrid Course Design", "Collaborative Digital Tools"],
      },
      {
        label: "AR/VR Simulations", href: "/immersive-simulation-ar-vr", icon: Glasses,
        serviceHighlights: ["Virtual Lab Simulations", "AR Overlay Learning", "360° Immersive Environments", "Interactive 3D Models"],
      },
      {
        label: "Instructional Design", href: "/instructional-design-services", icon: CircuitBoard,
        serviceHighlights: ["ADDIE Model Implementation", "Learning Needs Analysis", "Storyboarding & Scripting", "Learning Outcome Mapping"],
      },
      {
        label: "AI-Powered Learning", href: "/optimizing-aI-powered-learning", icon: Lightbulb,
        serviceHighlights: ["AI-Powered Personalization", "Intelligent Tutoring Systems", "Automated Content Generation", "Learning Analytics"],
      },
    ],
  },
  {
    label: "E-Learning Video Solutions",
    href: "/elearning-video-solutions",
    icon: Clapperboard,
    image: "/assets/banners/content-services/main/elearning-video-solutions.jpeg",
    imageAlt: "E-learning video solutions by eQOURSE - animated explainer videos, PPT-to-video conversion, Articulate Storyline interactive courses and motion graphics",
    description: "High-quality animated videos, kinetic typography, and PPT-to-video services.",
    subServices: [
      {
        label: "PPT Video Services", href: "/ppt-videos-services", icon: MonitorPlay,
        serviceHighlights: ["PPT to Video Conversion", "Voice-Over Integration", "Animation & Transitions", "Pen-Tab Video Lessons"],
      },
      {
        label: "Articulate Storyline", href: "/articulate-storyline-services", icon: MousePointerClick,
        serviceHighlights: ["Branching Scenarios", "Interactive Simulations", "Drag & Drop Activities", "SCORM/xAPI Packaging"],
      },
      {
        label: "Animated Video Services", href: "/animated-videos-services", icon: Video,
        serviceHighlights: ["Character Animation", "Explainer Videos", "Whiteboard Animations", "Motion Graphics"],
      },
    ],
  },
  {
    label: "Localization Services",
    href: "/localization-services",
    icon: Globe,
    image: "/assets/banners/content-services/main/localization-services.png",
    imageAlt: "Localization services by eQOURSE - professional translation, voice-over and subtitling in Hindi, English and 30+ languages for educational content",
    description: "Accurate translation, professional voiceovers, and subtitling for global reach.",
    subServices: [
      {
        label: "Translation Services", href: "/translation-services", icon: Languages,
        serviceHighlights: ["Curriculum Translation", "Assessment Translation", "E-Learning Module Translation", "Document Translation"],
      },
      {
        label: "Voice Over Services", href: "/voice-over-services", icon: Mic,
        serviceHighlights: ["Male & Female Voice Artists", "Studio-Quality Recording", "Script Timing & Sync", "Multiple Accent Options"],
      },
      {
        label: "Subtitling Services", href: "/subtitling-services", icon: Captions,
        serviceHighlights: ["SRT & VTT Subtitle Files", "Burned-In Subtitles", "Multilingual Subtitles", "Closed Captioning"],
      },
    ],
  },
  {
    label: "Technology Solutions",
    href: "/technology-solutions",
    icon: Laptop,
    image: "/assets/banners/content-services/main/technology-solutions.png",
    imageAlt: "Educational technology solutions by eQOURSE - LMS course builds, SCORM and xAPI packaging, white-label LMS setup on Open edX and AWS",
    description: "Robust Learning Management Systems (LMS) and cloud-based architecture.",
    subServices: [
      {
        label: "LMS Course Builds", href: "/lms-course-builds", icon: HardDrive,
        serviceHighlights: ["SCORM Course Packaging", "xAPI/Tin Can Integration", "Multi-LMS Testing", "Course Structure Design"],
      },
      {
        label: "White Label LMS", href: "/white-label-lms", icon: Server,
        serviceHighlights: ["Custom Branding", "User Management", "Content Integration", "Analytics & Reporting"],
      },
    ],
  },
  {
    label: "Subject Matter Experts",
    href: "/smes",
    icon: Users,
    image: "/assets/banners/content-services/main/subject-matter-experts.png",
    imageAlt: "Subject matter expert services by eQOURSE - SME recruitment, tutor training and certification, and live online tutoring across 200+ specialists",
    description: "Top-tier global subject matter experts for tutoring, recruiting, and mentoring.",
    subServices: [
      {
        label: "SME Recruitment", href: "/tutors-and-sme-recruitment", icon: UserCheck,
        serviceHighlights: ["Subject-Specific Recruitment", "Screening & Vetting", "Bulk Recruitment", "Freelancer & Full-Time Options"],
      },
      {
        label: "SME Training & Certification", href: "/tutors-and-sme-training", icon: BookOpenCheck,
        serviceHighlights: ["Content Standards Training", "Pedagogy Workshops", "Platform Tool Training", "Certification Programs"],
      },
      {
        label: "Live Online Tutors", href: "/live-online-tutor", icon: MonitorPlay,
        serviceHighlights: ["One-on-One Tutoring", "Group Tutoring Sessions", "Doubt Resolution", "Multi-Subject Support"],
      },
    ],
  },
  {
    label: "Accessibility",
    href: "/accessibility",
    icon: ShieldCheck,
    image: "/assets/banners/content-services/main/accessibility.png",
    imageAlt: "Digital accessibility services by eQOURSE - WCAG compliance, document remediation, accessible media, assessment accessibility and assistive technology testing",
    description: "Digital accessibility services including standards compliance, remediation, and audit support.",
    subServices: [
      { label: "Standards Compliance", href: "/standards-compliance", icon: ShieldCheck, serviceHighlights: ["WCAG Compliance", "Section 508", "EN 301 549", "EPUB 3 Accessibility"] },
      { label: "Document & eContent Remediation", href: "/document-content-remediation", icon: FileText, serviceHighlights: ["PDF Remediation", "eBook Accessibility", "LMS Course Remediation", "HTML & Word"] },
      { label: "Accessible Media & Enhancements", href: "/accessible-media-enhancements", icon: Video, serviceHighlights: ["Alt Text Authoring", "Captioning & Transcripts", "Audio Description", "Accessible STEM"] },
      { label: "Assessment Accessibility", href: "/assessment-accessibility", icon: ClipboardCheck, serviceHighlights: ["Accessible Item Design", "Keyboard Navigation", "Screen Reader Review", "Non-text Alternatives"] },
      { label: "Assistive Technology Compatibility", href: "/assistive-technology-compatibility", icon: MonitorPlay, serviceHighlights: ["Screen Reader Testing", "Keyboard Accessibility", "Usability Testing", "Focus Order Review"] },
      { label: "Audit & Compliance Support", href: "/audit-compliance-support", icon: ShieldCheck, serviceHighlights: ["Accessibility Audits", "Gap Analysis", "ACR Support", "VPAT Documentation"] },
    ],
  },
  {
    label: "Talent Assessment & Workforce Evaluation",
    href: "/talent-assessment-workforce-evaluation",
    icon: Users,
    image: "/assets/banners/content-services/main/talent-assessment-workforce-evaluation.png",
    imageAlt: "Talent assessment and workforce evaluation services by eQOURSE - psychometric assessments, skill testing, competency frameworks and organizational diagnostics",
    description: "Build validated, structured and professionally developed assessment solutions across workforce, education and certification contexts.",
    subServices: [
      {
        label: "Psychometric Assessments",
        href: "/psychometric-assessments",
        icon: Brain,
        serviceHighlights: ["Construct-to-Report Development", "Test Construction Support", "Scale Development Support", "Reliability & Validity Analysis", "Norming Study Support", "Test Equating Support"],
      },
      {
        label: "Skill Assessments",
        href: "/skill-assessments",
        icon: ClipboardCheck,
        serviceHighlights: ["Competency-Mapped Test Items", "Applied Skills Evaluation", "Practical Task Scenarios", "LMS & QTI Compatible Output", "Assessment Item Bank"],
      },
      {
        label: "Candidate Evaluation",
        href: "/candidate-evaluation",
        icon: UserCheck,
        serviceHighlights: ["Candidate Screening", "Pre-Hiring Assessments", "Behavioural Assessment Support", "Vetted Vetting Matrix", "GDPR & Selection Guidelines"],
      },
      {
        label: "Competency Frameworks",
        href: "/competency-frameworks",
        icon: Layout,
        serviceHighlights: ["Role-Based Evaluation", "Competency Dictionary Design", "Role Architecture Mapping", "SFIA & ESCO Alignment", "Assessment Specification Map"],
      },
      {
        label: "Learning Readiness",
        href: "/learning-readiness",
        icon: GraduationCap,
        serviceHighlights: ["Learning Readiness Assessments", "Pathway Entry Checks", "Skill Gap Analysis", "Baseline Diagnostics", "Progression Readiness"],
      },
      {
        label: "Organizational Diagnostics",
        href: "/organizational-diagnostics",
        icon: Brain,
        serviceHighlights: ["Workforce Capability Mapping", "Organisational Capability Assessment", "Workforce Skill Benchmarking", "Job Role Benchmarking", "Training Needs Analysis"],
      },
      {
        label: "Digital Assessment Infrastructure",
        href: "/digital-assessment-infrastructure",
        icon: Laptop,
        serviceHighlights: ["Platform Content Support", "Remote Proctoring Support", "Item-Bank Workflows", "Candidate Instruction Guides", "Scoring Keys & Metadata"],
      },
    ],
  },
  {
    label: "Editorial, Publishing & Designing Services",
    href: "/editorial-publishing-designing-services",
    icon: Edit,
    image: "/assets/content-services/Editorial, Publishing & Designing Services.png",
    imageAlt: "Editorial, Publishing and Designing Services by eQOURSE",
    description: "Editorial, publishing production, digital conversion, metadata, design, prepress and production support for global learning content.",
    subServices: [
      {
        label: "Editorial Services",
        href: "/editorial-services",
        icon: FileText,
        serviceHighlights: ["Copy Editing", "Proofreading", "Substantive Editing", "Developmental Editing", "Technical Editing", "Style Guide Application"],
      },
      {
        label: "Publishing Production",
        href: "/publishing-production",
        icon: BookOpen,
        serviceHighlights: ["Typesetting & Page Composition", "Template Design", "Indexing Services", "Proof Review Support", "Version Control", "Production Handover"],
      },
      {
        label: "Digital Conversion",
        href: "/digital-conversion",
        icon: RefreshCw,
        serviceHighlights: ["Digitisation & OCR", "XML Conversion", "HTML Conversion", "EPUB Conversion", "PDF to EPUB", "LaTeX Conversion", "MathML Conversion"],
      },
      {
        label: "Image Processing",
        href: "/image-processing",
        icon: Image,
        serviceHighlights: ["Image Restoration & Enhancement", "Image Cleanup & Optimisation", "Cropping & Resizing", "Alt Text Coordination", "Asset Folder Organisation"],
      },
      {
        label: "Metadata Services",
        href: "/metadata-services",
        icon: Tag,
        serviceHighlights: ["Metadata Tagging", "Content Structuring", "DOI Metadata Preparation", "ONIX Metadata Support", "MARC Records", "Crossref Metadata", "Accessibility Metadata"],
      },
      {
        label: "Design Services",
        href: "/design-services",
        icon: Palette,
        serviceHighlights: ["Cover Design", "Page Layout Design", "Workbook & Worksheet Design", "Journal Layout", "Infographic Design", "Brand-Aligned Layouts"],
      },
      {
        label: "Prepress Services",
        href: "/prepress-services",
        icon: Printer,
        serviceHighlights: ["Preflight Checks", "Colour Correction", "Bleed & Margin Review", "Print-Ready File Preparation", "Pagination Checks", "Font Consistency"],
      },
      {
        label: "Production Support",
        href: "/production-support",
        icon: Settings,
        serviceHighlights: ["Print Vendor Coordination", "Large-Volume Workflow Support", "Print Specification Sheets", "Change Management", "Asset Packaging", "Cross-Team Coordination"],
      },
    ],
  },
];



