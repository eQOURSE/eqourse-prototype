import ContentServicesLayout from "../shared/ContentServicesLayout";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import SMEServicesGrid from "./SMEServicesGrid";
import { Users, GraduationCap, Video } from "lucide-react";

const faqs = [
  {
    question: "Do you supply SMEs for specialized higher ed subjects?",
    answer: "Absolutely. Through our rigorously maintained talent pool, we actively recruit and vet SMEs across diverse and specialized domains including advanced STEM fields, humanities, languages, accounting, and professional certifications."
  },
  {
    question: "How are your SMEs vetted?",
    answer: "Our vetting pipeline involves multi-stage evaluation encompassing academic credential verification, deep-dive subject matter proficiency tests, pedagogy assessments, and recorded mock sessions to evaluate communication capability."
  },
  {
    question: "Can you provide live online tutors?",
    answer: "Yes, we source, train, and deploy live online tutors who are specifically trained to engage students dynamically through digital interfaces using standard Content Services platform suites."
  }
];

const SMEPage = () => (
  <ContentServicesLayout breadcrumbs={[{ label: "Content Services", href: "/content-services" }, { label: "Subject Matter Experts" }]}>
    <SEOHead
      title="Subject Matter Experts & Live Online Tutors | eQOURSE"
      description="Access top-tier Subject Matter Experts (SMEs). We offer SME recruitment, training, certification, and live online tutors for Content Services companies."
      canonical="https://www.eqourse.com/smes"
      keywords="subject matter experts, SME recruitment, content services tutors, live online tutors, SME training, academic experts"
    />

    <ServiceHero
      preHeadline="Expertise Sourcing for Content Services & Delivery"
      headline="Subject Matter Experts & "
      headlineAccent="Live Tutors"
      subtext="Elevate your curriculum and live classroom deployments by leveraging our strictly vetted pool of 200+ trained academic professionals."
      ctaText="Request SME Profiles"
      ctaLink="/contact-us"
      imageSrc="/assets/banners/content-services/main/subject-matter-experts.webp"
      imageAlt="Subject matter expert services by eQOURSE - SME recruitment, tutor training and certification, and live online tutoring with 200+ vetted academic professionals"
      rotatingBadges={[
        { icon: Users, title: "SME Network", subtitle: "200+ experts", color: "hsl(170 82% 55%)" },
        { icon: GraduationCap, title: "Academic", subtitle: "Vetted professionals", color: "hsl(190 85% 68%)" },
        { icon: Video, title: "Live Tutors", subtitle: "Online engagement", color: "hsl(165 75% 71%)" }
      ]}
      bottomBadge={{ iconText: "SME", title: "Expertise", subtitle: "High-quality pedagogy" }}
    />

    <ServiceNarrativeSection
      label="Curated Talent"
      title="The Human Core of"
      gradientText="Quality Education"
      description="The pedagogical efficacy of educational content is ultimately determined by the domain expertise behind it."
      paragraphs={[
        "At eQOURSE, we maintain an active, rigorously evaluated network of over 200 subject matter experts spanning global K-12 subjects, standardized test preparation domains, and niche higher education technical fields.",
        "Our specialized talent acquisition services handle the burdensome intricacies of SME recruitment, rigorous onboarding, pedagogical training, and deployment. Whether you require SMEs for intricate asynchronous content creation or highly energetic live online tutors for real-time delivery, our network scales instantly."
      ]}
      bullets={[
        "Multi-stage rigorous academic and communicative proficiency vetting",
        "Ongoing pedagogical training and quality standardization programs",
        "Flexible deployment models for short-term reviews or permanent course leads"
      ]}
      stats={[
        { value: "200+", label: "Active SMEs" },
        { value: "98%", label: "Retention" },
        { value: "40+", label: "Subject Domains" },
        { value: "7 Days", label: "Avg Ramp-Up" }
      ]}
      panelTitle="SME Vetting Matrix"
      panelSubtitle="The strict criteria every eQOURSE expert must clear."
      bars={[
        { label: "Academic Credential Validation", value: 100 },
        { label: "Subject Proficiency Testing", value: 95 },
        { label: "Instructional Communication", value: 94 },
        { label: "Platform Tool Proficiency", value: 92 }
      ]}
    />

    <SMEServicesGrid />
    <RelatedBlogs />
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Need Immediate Project Support?"
      subtext="Access pre-vetted educational professionals instantly. Tell us the subjects and volume you need, and we will mobilize our SME network."
      ctaText="Speak with our Talent Team"
    />
  </ContentServicesLayout>
);

export default SMEPage;
