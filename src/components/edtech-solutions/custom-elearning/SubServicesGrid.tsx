import { BookOpen, Map, ClipboardCheck, LayoutTemplate, BookText, PersonStanding, FlaskConical, TabletSmartphone, MonitorPlay, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";

const subServices = [
  {
    icon: BookOpen,
    title: "K12 Higher Education / Academic Content",
    description: "Comprehensive and curriculum-aligned academic content for K12 and higher education, focusing on student outcomes.",
    link: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education"
  },
  {
    icon: Map,
    title: "K12 Curriculum Development",
    description: "Subject-centered, learner-centered, and problem-oriented curriculum design for CBSE, ICSE, IB, and State Board.",
    link: "/edtech-solutions/custom-e-learning-content/k12-curriculum-development"
  },
  {
    icon: ClipboardCheck,
    title: "Assessment Development Services",
    description: "Formative assessments, game-based, adaptive testing, competitive exam assessments, and subject-integrated assessments.",
    link: "/edtech-solutions/custom-e-learning-content/assessment-development"
  },
  {
    icon: LayoutTemplate,
    title: "Educational Content Development",
    description: "Wide range of educational content incorporating multimedia and interactive elements for engaging lessons.",
    link: "/edtech-solutions/custom-e-learning-content/educational-content-development"
  },
  {
    icon: BookText,
    title: "Workbook Development",
    description: "Workbooks aligned with curriculum objectives, providing hands-on practice and reinforcing key concepts.",
    link: "/edtech-solutions/custom-e-learning-content/workbook-development"
  },
  {
    icon: PersonStanding,
    title: "Teacher Lesson Plan",
    description: "Comprehensive lesson plans that guide teachers through structured, engaging classroom sessions.",
    link: "/edtech-solutions/custom-e-learning-content/teacher-lesson-plan"
  },
  {
    icon: FlaskConical,
    title: "STEM Curriculum Services",
    description: "Specialized STEM content integrating science, technology, engineering, and mathematics natively.",
    link: "/edtech-solutions/custom-e-learning-content/stem-curriculum"
  },
  {
    icon: TabletSmartphone,
    title: "E-Book Creation",
    description: "Interactive e-books with multimedia elements for compelling digital-first learning experiences.",
    link: "/edtech-solutions/custom-e-learning-content/ebook-creation"
  },
  {
    icon: MonitorPlay,
    title: "2D and 3D Videos",
    description: "Educational animated videos bringing complex concepts to life through professional visual storytelling.",
    link: "/edtech-solutions/custom-e-learning-content/2d-3d-videos"
  },
  {
    icon: HelpCircle,
    title: "Quiz and Question Bank Development",
    description: "Custom quizzes and question banks tailored to curriculum, providing tools for regular evaluation and practice.",
    link: "/edtech-solutions/custom-e-learning-content/quiz-question-bank"
  }
];

const SubServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="What We Create"
          title="Learning Solutions"
          gradientText="We Offer"
          subtitle="A complete suite of custom e-learning content services tailored to your educational and training needs."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-[1400px] mx-auto mt-12">
          {subServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group flex flex-col rounded-2xl bg-card border border-border/60 p-6 hover:shadow-card hover:border-primary/40 transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(i % 4) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-gradient-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                <span className="inline-flex items-center text-xs font-semibold text-primary gap-2 mt-auto group-hover:gap-3 transition-all uppercase tracking-wider">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubServicesGrid;
