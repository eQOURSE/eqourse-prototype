import ContentServicesLayout from "../shared/ContentServicesLayout";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import TechServicesGrid from "./TechServicesGrid";
import { Server, LayoutDashboard, CloudCog } from "lucide-react";

const faqs = [
  {
    question: "Do you provide hosting for your White Label LMS?",
    answer: "Yes, our white-label LMS solutions, primarily built on Open edX, are fully hosted on highly scalable and reliable AWS infrastructure, ensuring 99.9% uptime and zero maintenance burden for your team."
  },
  {
    question: "Do you develop standardized tracked content?",
    answer: "Absolutely. We are experts in implementing leading educational technology tracking standards including SCORM 1.2, SCORM 2004, xAPI (Tin Can), and cmi5 to ensure comprehensive reporting on learner engagement."
  }
];

const TechSolutionsPage = () => (
  <ContentServicesLayout breadcrumbs={[{ label: "Content Services", href: "/content-services" }, { label: "Technology Solutions" }]}>
    <SEOHead
      title="Content Services Technology Solutions & LMS Platforms | eQOURSE"
      description="Scalable Technology Solutions including standard-compliant LMS course builds (SCORM, xAPI) and white-label Open edX platform deployments."
      canonical="https://www.eqourse.com/technology-solutions"
      keywords="lms course build, scorm compliant courses, white label lms, open edx hosting, content services technology solutions, xapi compatible"
    />

    <ServiceHero
      preHeadline="Scalable Technology Infrastructure Supporting Educational Outcomes"
      headline="Educational Technology"
      headlineAccent="Solutions"
      subtext="Comprehensive technological integrations linking robust pedagogical content flawlessly with modern, reliable Learning Management Systems."
      ctaText="Discuss Your LMS Project"
      ctaLink="/contact-us"
      imageSrc="/assets/banners/content-services/main/technology-solutions.webp"
      imageAlt="Educational technology solutions by eQOURSE - LMS course builds with SCORM and xAPI packaging, white-label LMS setup on Open edX and AWS cloud infrastructure"
      rotatingBadges={[
        { icon: Server, title: "LMS", subtitle: "SCORM & xAPI", color: "hsl(170 82% 55%)" },
        { icon: LayoutDashboard, title: "White-label", subtitle: "Custom branding", color: "hsl(190 85% 68%)" },
        { icon: CloudCog, title: "Hosting", subtitle: "AWS infrastructure", color: "hsl(165 75% 71%)" }
      ]}
      bottomBadge={{ iconText: "TEC", title: "Technology", subtitle: "Scalable solutions" }}
    />

    <ServiceNarrativeSection
      label="Reliable Infrastructure"
      title="Technology that"
      gradientText="Works In The Background"
      description="The best educational technology goes unnoticed, allowing uninterrupted focus solely on the learning experience."
      paragraphs={[
        "We offer complete end-to-end integration mapping between custom content modules and your enterprise platforms.",
        "Whether you require high-volume standardized course packaging using SCORM and xAPI, or you are looking to deploy an entirely new white-label LMS powered by Open edX and AWS, our engineering teams ensure seamless delivery."
      ]}
      bullets={[
        "Enterprise-grade hosting architecture built primarily on Amazon Web Services",
        "Expert handling of nuanced xAPI statements for highly granular student tracking",
        "Open edX customization matching your brand identity completely"
      ]}
      stats={[
        { value: "99.9%", label: "Uptime guarantee" },
        { value: "Open", label: "edX Architecture" },
        { value: "xAPI", label: "Integration" },
        { value: "SSO", label: "Capabilities" }
      ]}
      panelTitle="LMS Deployment Metrics"
      panelSubtitle="Key performance indicators for our platform builds."
      bars={[
        { label: "Architecture Scalability", value: 98 },
        { label: "Data Reporting Depth", value: 95 },
        { label: "API Integration Breadth", value: 93 },
        { label: "User Experience Score", value: 96 }
      ]}
      dark
    />

    <TechServicesGrid />
    <RelatedBlogs />
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Upgrade Your Technical Backbone"
      subtext="Ensure smooth content delivery with our advanced standard-compliant LMS builds and white-label AWS platform infrastructure."
      ctaText="Connect with our Technical Engineers"
    />
  </ContentServicesLayout>
);

export default TechSolutionsPage;
