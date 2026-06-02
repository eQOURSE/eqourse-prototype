
import { Link } from "react-router-dom";
import { BookOpen, Lightbulb, GraduationCap, Brain, ArrowRight, Database, Tag, ShieldCheck, FlaskConical, ClipboardCheck, Briefcase, Accessibility, Video, Globe, Cpu, Package, Users, FileEdit } from "lucide-react";

/* ── Decorative SVG illustrations for each card ── */
const CardIllustrations: Record<string, React.FC<{ className?: string }>> = {
  "Academic Content": ({ className }) => (
    <svg className={className} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stacked books */}
      <rect x="30" y="100" width="80" height="14" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="35" y="84" width="74" height="14" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="28" y="68" width="82" height="14" rx="2" fill="currentColor" opacity="0.35" />
      {/* Open book */}
      <path d="M120 60 Q140 50 160 55 L160 110 Q140 105 120 110 Z" fill="currentColor" opacity="0.3" />
      <path d="M120 60 Q100 50 80 55 L80 110 Q100 105 120 110 Z" fill="currentColor" opacity="0.25" />
      <line x1="120" y1="60" x2="120" y2="110" stroke="currentColor" opacity="0.3" strokeWidth="1" />
      {/* Floating page lines */}
      <rect x="90" y="70" width="22" height="2" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="92" y="78" width="18" height="2" rx="1" fill="currentColor" opacity="0.15" />
      <rect x="128" y="70" width="22" height="2" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="130" y="78" width="18" height="2" rx="1" fill="currentColor" opacity="0.15" />
      {/* Decorative dots */}
      <circle cx="170" cy="40" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="180" cy="50" r="2" fill="currentColor" opacity="0.1" />
      <circle cx="40" cy="50" r="2.5" fill="currentColor" opacity="0.12" />
      {/* Pencil */}
      <rect x="155" y="85" width="4" height="30" rx="1" fill="currentColor" opacity="0.2" transform="rotate(-20 155 85)" />
      <polygon points="153,115 157,115 155,122" fill="currentColor" opacity="0.25" transform="rotate(-20 155 85)" />
    </svg>
  ),
  "Instructional Design": ({ className }) => (
    <svg className={className} viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gear large */}
      <circle cx="70" cy="70" r="28" stroke="currentColor" opacity="0.25" strokeWidth="3" fill="none" />
      <circle cx="70" cy="70" r="12" fill="currentColor" opacity="0.15" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="67"
          y="38"
          width="6"
          height="10"
          rx="1.5"
          fill="currentColor"
          opacity="0.2"
          transform={`rotate(${angle} 70 70)`}
        />
      ))}
      {/* Small gear */}
      <circle cx="115" cy="95" r="16" stroke="currentColor" opacity="0.2" strokeWidth="2" fill="none" />
      <circle cx="115" cy="95" r="7" fill="currentColor" opacity="0.12" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <rect
          key={`s-${angle}`}
          x="113"
          y="76"
          width="4"
          height="7"
          rx="1"
          fill="currentColor"
          opacity="0.15"
          transform={`rotate(${angle} 115 95)`}
        />
      ))}
      {/* Flow arrows */}
      <path d="M20 110 L45 110 L40 106 M45 110 L40 114" stroke="currentColor" opacity="0.18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Checklist */}
      <rect x="15" y="30" width="20" height="2.5" rx="1" fill="currentColor" opacity="0.15" />
      <rect x="15" y="38" width="16" height="2.5" rx="1" fill="currentColor" opacity="0.12" />
      <rect x="15" y="46" width="18" height="2.5" rx="1" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  "Study Support": ({ className }) => (
    <svg className={className} viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Graduation cap */}
      <polygon points="80,30 130,55 80,70 30,55" fill="currentColor" opacity="0.2" />
      <polygon points="80,70 130,55 130,72 80,87" fill="currentColor" opacity="0.15" />
      <polygon points="80,70 30,55 30,72 80,87" fill="currentColor" opacity="0.18" />
      <line x1="130" y1="55" x2="130" y2="85" stroke="currentColor" opacity="0.2" strokeWidth="2" />
      <circle cx="130" cy="87" r="3" fill="currentColor" opacity="0.15" />
      {/* People silhouettes */}
      <circle cx="50" cy="105" r="6" fill="currentColor" opacity="0.12" />
      <path d="M38 125 Q50 115 62 125" fill="currentColor" opacity="0.1" />
      <circle cx="80" cy="100" r="7" fill="currentColor" opacity="0.15" />
      <path d="M66 125 Q80 113 94 125" fill="currentColor" opacity="0.12" />
      <circle cx="110" cy="105" r="6" fill="currentColor" opacity="0.12" />
      <path d="M98 125 Q110 115 122 125" fill="currentColor" opacity="0.1" />
      {/* Globe hint */}
      <circle cx="135" cy="35" r="10" stroke="currentColor" opacity="0.12" strokeWidth="1.5" fill="none" />
      <ellipse cx="135" cy="35" rx="5" ry="10" stroke="currentColor" opacity="0.1" strokeWidth="1" fill="none" />
      <line x1="125" y1="35" x2="145" y2="35" stroke="currentColor" opacity="0.08" strokeWidth="1" />
    </svg>
  ),
  "AI-Powered Learning": ({ className }) => (
    <svg className={className} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Brain outline */}
      <path d="M90 40 Q70 25 55 40 Q40 55 55 70 Q45 80 55 95 Q65 110 85 105 Q90 120 105 120 Q120 120 125 105 Q145 110 155 95 Q165 80 155 70 Q170 55 155 40 Q140 25 120 40 Q105 30 90 40Z" stroke="currentColor" opacity="0.2" strokeWidth="2" fill="none" />
      {/* Neural connections */}
      <circle cx="75" cy="55" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="95" cy="70" r="3" fill="currentColor" opacity="0.18" />
      <circle cx="115" cy="55" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="135" cy="70" r="3" fill="currentColor" opacity="0.18" />
      <circle cx="85" cy="90" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="125" cy="90" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="105" cy="50" r="3" fill="currentColor" opacity="0.22" />
      <line x1="75" y1="55" x2="95" y2="70" stroke="currentColor" opacity="0.12" strokeWidth="1" />
      <line x1="95" y1="70" x2="115" y2="55" stroke="currentColor" opacity="0.12" strokeWidth="1" />
      <line x1="115" y1="55" x2="135" y2="70" stroke="currentColor" opacity="0.12" strokeWidth="1" />
      <line x1="85" y1="90" x2="95" y2="70" stroke="currentColor" opacity="0.12" strokeWidth="1" />
      <line x1="125" y1="90" x2="135" y2="70" stroke="currentColor" opacity="0.12" strokeWidth="1" />
      <line x1="105" y1="50" x2="95" y2="70" stroke="currentColor" opacity="0.1" strokeWidth="1" />
      <line x1="105" y1="50" x2="115" y2="55" stroke="currentColor" opacity="0.1" strokeWidth="1" />
      {/* Circuit lines */}
      <path d="M30 130 L50 130 L50 120 L70 120" stroke="currentColor" opacity="0.1" strokeWidth="1.5" />
      <path d="M140 120 L160 120 L160 130 L180 130" stroke="currentColor" opacity="0.1" strokeWidth="1.5" />
      <circle cx="70" cy="120" r="2" fill="currentColor" opacity="0.12" />
      <circle cx="140" cy="120" r="2" fill="currentColor" opacity="0.12" />
    </svg>
  ),
  "Data Collection": ({ className }) => (
    <svg className={className} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Database cylinders */}
      <ellipse cx="80" cy="50" rx="35" ry="12" fill="currentColor" opacity="0.15" />
      <rect x="45" y="50" width="70" height="40" fill="currentColor" opacity="0.1" />
      <ellipse cx="80" cy="90" rx="35" ry="12" fill="currentColor" opacity="0.15" />
      <ellipse cx="80" cy="70" rx="35" ry="12" stroke="currentColor" opacity="0.1" strokeWidth="1" fill="none" />
      {/* Data streams */}
      <path d="M130 45 Q145 55 130 65 Q145 75 130 85" stroke="currentColor" opacity="0.15" strokeWidth="2" fill="none" />
      <circle cx="155" cy="50" r="4" fill="currentColor" opacity="0.12" />
      <circle cx="160" cy="65" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="155" cy="80" r="4" fill="currentColor" opacity="0.12" />
      {/* Binary-like dots */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={`bin-${i}`}>
          <circle cx={170 + (i % 3) * 8} cy={100 + Math.floor(i / 3) * 8} r="1.5" fill="currentColor" opacity="0.1" />
        </g>
      ))}
      {/* Arrow suggesting flow */}
      <path d="M30 110 L50 110" stroke="currentColor" opacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 120 L60 120" stroke="currentColor" opacity="0.1" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 130 L45 130" stroke="currentColor" opacity="0.08" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "Annotation & Labeling": ({ className }) => (
    <svg className={className} viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tag shapes */}
      <path d="M50 40 L90 40 L110 60 L90 80 L50 80 Z" fill="currentColor" opacity="0.12" />
      <circle cx="62" cy="60" r="5" fill="currentColor" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      {/* Bounding box */}
      <rect x="65" y="85" width="50" height="35" rx="3" stroke="currentColor" opacity="0.18" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      <rect x="63" y="83" width="6" height="6" fill="currentColor" opacity="0.2" rx="1" />
      <rect x="111" y="83" width="6" height="6" fill="currentColor" opacity="0.2" rx="1" />
      <rect x="63" y="116" width="6" height="6" fill="currentColor" opacity="0.2" rx="1" />
      <rect x="111" y="116" width="6" height="6" fill="currentColor" opacity="0.2" rx="1" />
      {/* Label lines */}
      <line x1="120" y1="95" x2="145" y2="88" stroke="currentColor" opacity="0.12" strokeWidth="1" />
      <rect x="130" y="82" width="22" height="8" rx="2" stroke="currentColor" opacity="0.15" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
      {/* Cursor pointer */}
      <path d="M30 60 L30 85 L38 78 L46 90 L50 88 L42 76 L50 76 Z" fill="currentColor" opacity="0.15" />
    </svg>
  ),
  "Data Cleaning & Validation": ({ className }) => (
    <svg className={className} viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield */}
      <path d="M80 25 L115 40 L115 80 Q115 105 80 120 Q45 105 45 80 L45 40 Z" stroke="currentColor" opacity="0.2" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
      {/* Checkmark */}
      <path d="M62 72 L75 85 L100 55" stroke="currentColor" opacity="0.25" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Sparkle/clean indicators */}
      <path d="M125 35 L128 42 L135 45 L128 48 L125 55 L122 48 L115 45 L122 42 Z" fill="currentColor" opacity="0.15" />
      <path d="M35 90 L37 94 L41 96 L37 98 L35 102 L33 98 L29 96 L33 94 Z" fill="currentColor" opacity="0.12" />
      {/* Filter funnel lines */}
      <path d="M130 70 L145 70 L140 80 L135 80 L130 70Z" fill="currentColor" opacity="0.1" />
      <line x1="137" y1="80" x2="137" y2="95" stroke="currentColor" opacity="0.1" strokeWidth="1.5" />
    </svg>
  ),
  "Model Testing": ({ className }) => (
    <svg className={className} viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flask */}
      <rect x="70" y="25" width="20" height="35" rx="2" fill="currentColor" opacity="0.12" />
      <path d="M65 60 L55 100 Q53 110 63 115 L97 115 Q107 110 105 100 L95 60Z" fill="currentColor" opacity="0.1" />
      <ellipse cx="80" cy="100" rx="18" ry="8" fill="currentColor" opacity="0.08" />
      {/* Bubbles */}
      <circle cx="75" cy="88" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="85" cy="82" r="2" fill="currentColor" opacity="0.12" />
      <circle cx="78" cy="76" r="2.5" fill="currentColor" opacity="0.1" />
      {/* Graph/chart hint */}
      <rect x="115" y="85" width="6" height="25" rx="1" fill="currentColor" opacity="0.12" />
      <rect x="125" y="75" width="6" height="35" rx="1" fill="currentColor" opacity="0.15" />
      <rect x="135" y="90" width="6" height="20" rx="1" fill="currentColor" opacity="0.1" />
      {/* Circling arrow (iteration) */}
      <path d="M30 50 Q30 30 50 30 Q70 30 70 50" stroke="currentColor" opacity="0.12" strokeWidth="1.5" fill="none" />
      <path d="M68 44 L72 50 L65 52" stroke="currentColor" opacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
};

/* ── Decorative wave/geometric pattern shared across all cards ── */
const CardWavePattern: React.FC<{ variant?: "large" | "small" }> = ({ variant = "small" }) => (
  <svg
    className={`absolute bottom-0 left-0 w-full pointer-events-none text-primary ${variant === "large" ? "h-32 opacity-[0.04]" : "h-20 opacity-[0.05]"
      }`}
    viewBox="0 0 400 100"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 60 Q50 40 100 60 T200 60 T300 60 T400 60 L400 100 L0 100Z"
      fill="currentColor"
      opacity="0.5"
    />
    <path
      d="M0 75 Q60 55 120 75 T240 75 T360 75 L400 75 L400 100 L0 100Z"
      fill="currentColor"
      opacity="0.3"
    />
  </svg>
);

/* ── Floating geometric accents for the featured card ── */
const FeaturedCardDecoration = () => (
  <>
    {/* Concentric circles bottom right */}
    <svg className="absolute bottom-8 right-8 w-40 h-40 text-primary opacity-[0.05] pointer-events-none" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="60" r="10" fill="currentColor" opacity="0.3" />
    </svg>
    {/* Diagonal dashes top right */}
    <svg className="absolute top-6 right-6 w-24 h-24 text-primary opacity-[0.04] pointer-events-none" viewBox="0 0 80 80" fill="none">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={20 + i * 15} y1="5" x2={5 + i * 15} y2="75" stroke="currentColor" strokeWidth="1.5" />
      ))}
    </svg>
  </>
);

const educationServices = [
  {
    icon: BookOpen,
    title: "Institutional Learning Solutions",
    description: "Standards-aligned K–12 and higher education curriculum, instructional design, lesson plans, assessments, STEAM modules, digital learning assets, multilingual content, and scalable academic program development across global curriculum frameworks and learning ecosystems.",
    link: "/custom-e-learning-content",
    accent: "from-primary/20 to-accent/10",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment, Testing & Evaluation Solutions",
    description: "Large-scale assessment development, question banks, psychometric evaluation support, certification testing frameworks, adaptive assessments, benchmark testing, workforce readiness measurement, and global test-preparation content across academic, professional, and competitive examination programs.",
    link: "/content-services/exam-preparation-content",
    accent: "from-accent/20 to-primary/10",
  },
  {
    icon: Briefcase,
    title: "Corporate Learning Solutions",
    description: "Workforce training content, compliance learning modules, role-based learning pathways, microlearning programs, simulation-based training, competency frameworks, SOP documentation, certification preparation content, and enterprise learning solutions supporting organizational capability development and performance readiness.",
    link: "/content-services/learning-solutions/corporate-elearning",
    accent: "from-primary/15 to-accent/15",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description: "WCAG, Section 508, ADA, EN 301 549 compliance support, accessible PDFs, EPUB remediation, LMS course accessibility, MathML support, captioning, audio descriptions, assistive technology compatibility, accessibility audits, VPAT documentation, and inclusive learning environments.",
    link: "/content-services",
    accent: "from-accent/15 to-primary/20",
  },
  {
    icon: Video,
    title: "Learning Video Production Services",
    description: "2D animation, 3D visualization, explainer videos, simulation-based learning videos, instructor-led training recordings, microlearning modules, technical walkthroughs, multilingual learning videos, compliance training visuals, and curriculum-aligned instructional media for digital learning environments.",
    link: "/content-services/elearning-video-solutions",
    accent: "from-primary/20 to-accent/15",
  },
  {
    icon: Globe,
    title: "Localization Services",
    description: "Multilingual translation services, curriculum localization, assessment localization, LMS localization, software and platform localization, subtitling, dubbing, cultural adaptation, linguistic QA testing, terminology management, and global content readiness across education and enterprise ecosystems.",
    link: "/content-services/localization-services",
    accent: "from-accent/10 to-primary/20",
  },
  {
    icon: Cpu,
    title: "Technology Solutions",
    description: "SCORM, xAPI, AICC, cmi5-compliant LMS course packaging, LMS deployment support, LTI integrations, virtual classroom integrations, AR/VR simulations, adaptive learning environments, analytics dashboards, LRS infrastructure support, and enterprise learning platform compatibility.",
    link: "/content-services/technology-solutions",
    accent: "from-primary/15 to-accent/20",
  },
  {
    icon: Package,
    title: "White-Label Solutions",
    description: "Confidential content production partnerships, scalable learning development pipelines, branded curriculum delivery frameworks, publishing support services, assessment development support, multilingual learning assets, and enterprise-grade backend production capacity for Content Services platforms and publishers.",
    link: "/contact",
    accent: "from-accent/20 to-primary/15",
  },
  {
    icon: Users,
    title: "Domain Expert Services",
    description: "SME sourcing, curriculum alignment expertise, assessment authoring panels, psychometric validation support, research manuscript review, taxonomy development, ontology structuring, annotation validation workflows, technical verification support, and subject-matter expertise across academic and professional domains.",
    link: "/content-services/subject-matter-experts",
    accent: "from-primary/20 to-accent/10",
  },
  {
    icon: FileEdit,
    title: "Editorial & Publishing Services",
    description: "Copy editing, proofreading, XML-first publishing workflows, EPUB conversion, metadata structuring, ONIX and CrossRef metadata support, typesetting, textbook layout design, accessibility layout remediation, print-ready production support, and large-scale publishing workflow optimization.",
    link: "/editorial-publishing-designing-services",
    accent: "from-accent/15 to-primary/20",
  },
];

const aiServices = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Custom text, audio, image, video datasets. 30+ languages with domain-specific sourcing.",
    link: "/ai-data-services/data-collection",
    accent: "from-primary/20 to-accent/10",
  },
  {
    icon: Tag,
    title: "Annotation & Labeling",
    description: "NLP, Computer Vision, Audio, RLHF. Inter-annotator agreement ≥ 0.80.",
    link: "/ai-data-services/annotation-labeling",
    accent: "from-accent/20 to-primary/10",
  },
  {
    icon: ShieldCheck,
    title: "Data Cleaning & Validation",
    description: "Deduplication, PII redaction, 98%+ accuracy. GDPR-ready processes.",
    link: "/ai-data-services/cleaning-validation",
    accent: "from-primary/15 to-accent/15",
  },
  {
    icon: FlaskConical,
    title: "Model Testing",
    description: <>Closed-loop pipeline. Real users via <Link to="/tutrain" className="text-primary hover:underline">TUTRAIN</Link>. 20–40% faster model improvement.</>,
    link: "/ai-data-services/model-testing",
    accent: "from-accent/15 to-primary/20",
  },
];

interface ServicesSectionProps {
  activeTab?: "education" | "ai";
  onTabChange?: (tab: "education" | "ai") => void;
}

const ServicesSection = ({ activeTab = "education", onTabChange }: ServicesSectionProps) => {
  const services = activeTab === "education" ? educationServices : aiServices;
  const setActiveTab = (tab: "education" | "ai") => onTabChange?.(tab);

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">What We Do</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Our Services & <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive suite of educational technology and AI data services tailored to diverse needs.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex bg-muted rounded-xl p-1.5 gap-1">
            <button
              onClick={() => setActiveTab("education")}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === "education"
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              📚 Content Services
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === "ai"
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              🤖 AI Data Services
            </button>
          </div>
        </div>

        {/* Equal Grid Layout */}
        <div id={activeTab === "ai" ? "ai-services" : undefined} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const ServiceIcon = service.icon;
            const Illustration = CardIllustrations[service.title];
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden neon-card border border-border/50"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-30`} />
                {/* Wave decoration at bottom */}
                <CardWavePattern variant="small" />
                {/* Themed illustration */}
                {Illustration && (
                  <Illustration className="absolute bottom-4 right-4 w-28 h-24 text-primary opacity-[0.06] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-500" />
                )}
                <div className="relative z-10 p-5 sm:p-8 flex flex-col justify-between h-full min-h-[180px] sm:min-h-[200px]">
                  <div>
                    <div className="flex items-start justify-between mb-3 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                        <ServiceIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/50">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <Link to={service.link} className="inline-flex items-center text-sm font-semibold text-primary hover:gap-3 gap-2 transition-all mt-4 sm:mt-6 group/link">
                    Learn More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
