import ContentServicesLayout from "../shared/ContentServicesLayout";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import ContentServicesServicesGrid from "./ContentServicesGrid";
import DeliveryProcess from "./DeliveryProcess";
import ContentServicesIndustries from "./ContentServicesIndustries";
import WhyChooseEqourse from "./WhyChooseEqourse";
import QualityCredentials from "./QualityCredentials";
import { BookOpen, Video, Globe2 } from "lucide-react";

const faqs = [
  {
    question: "What types of educational content does eQOURSE create?",
    answer: "eQOURSE creates K-12 study materials, curriculum-aligned lessons, assessments, workbooks, teacher lesson plans, STEM content, e-books, quiz and question banks, exam preparation content (SAT, IELTS, TOEFL, IIT-JEE, NEET, and more), corporate training modules, and interactive video lessons across 30+ languages."
  },
  {
    question: "How is eQOURSE different from other Content Services providers?",
    answer: "eQOURSE is a full-stack Content Services partner. We don't just create content - we handle curriculum design, assessment development, video production, localization, LMS integration, and SME recruitment under one roof. This integrated approach eliminates vendor fragmentation, reduces turnaround time, and ensures consistent quality across your entire content library."
  },
  {
    question: "What curriculum standards do you support?",
    answer: "We support CBSE, ICSE, IB (International Baccalaureate), State Board curricula across Indian states, Common Core (US), Cambridge (IGCSE/A-Level), and custom curriculum frameworks. Our team adapts to any national or institutional curriculum standard."
  },
  {
    question: "Can you scale content production quickly?",
    answer: "Yes. With 200+ active SMEs and a structured production workflow, we can scale from 50 content units per month to 5,000+ depending on complexity and format. We onboard additional specialists within 5–7 business days for large-volume projects."
  },
  {
    question: "How do I get started?",
    answer: "We offer a free pilot for qualifying education and Content Services clients. Fill out the pilot form with your content requirements, target audience, and curriculum framework, and our team will deliver a sample content package within the agreed timeframe - no commitment required."
  }
];

const ContentServicesOverviewPage = () => (
  <ContentServicesLayout breadcrumbs={[{ label: "Overview" }]}>
    <SEOHead
      title="End-to-End Content Service | eQOURSE"
      description="From custom K-12 content development to LMS integration, eQOURSE delivers production-ready educational content and technology solutions."
      canonical="https://www.eqourse.com/content-services"
      keywords="Content Services, custom e-learning content, k12 content development, exam preparation content, learning solutions, educational videos, curriculum design"
    />

    <ServiceHero
      preHeadline="Content Service - Trusted by 200+ Global Platforms"
      headline="End-to-End Content Service That"
      headlineAccent="Scale Learning Outcomes"
      subtext="From custom K-12 content and curriculum design to interactive video learning, localization in 30+ languages, and LMS integration."
      ctaText="Start Your Free Pilot"
      ctaLink="/free-pilot"
      imageSrc="/assets/features/Content service.webp"
      imageAlt="End-to-End Content Services for Education, including K-12, Curriculum Design, and Video Learning"
      rotatingBadges={[
        { icon: BookOpen, title: "Curriculum", subtitle: "K-12 & Higher Ed", color: "hsl(170 82% 55%)" },
        { icon: Video, title: "Interactive", subtitle: "Video & modules", color: "hsl(190 85% 68%)" },
        { icon: Globe2, title: "Localization", subtitle: "30+ languages", color: "hsl(165 75% 71%)" }
      ]}
      bottomBadge={{ iconText: "EDU", title: "Content Solutions", subtitle: "End-to-end learning" }}
    />

    <ServiceNarrativeSection
      label="Content Services Journey"
      title="What Are Content Services"
      gradientText="Solutions?"
      description="Content Services encompass the full range of services needed to create, deliver, and scale digital education."
      paragraphs={[
        "This includes designing curriculum-aligned content, developing interactive assessments, producing engaging video lessons, localizing materials for multilingual audiences, building LMS-ready course packages, and sourcing qualified subject matter experts — work the eQOURSE+ platform we are building will match to verified specialists.",
        "At eQOURSE, we combine deep expertise in K-12 and higher education with cutting-edge instructional design methodologies and AI-powered content tools. Our integrated approach means you get a single trusted partner for your entire educational content lifecycle."
      ]}
      bullets={[
        "Backed by ISO 9001 certification and a dedicated team of 200+ specialists",
        "Singapore commercial leadership with India-led delivery and quality operations",
        "Production-ready educational content that meets rigorous global standards"
      ]}
      stats={[
        { value: "200+", label: "Subject Experts" },
        { value: "30+", label: "Languages" },
        { value: "5000+", label: "Assets/Month" },
        { value: "ISO", label: "9001:2015" }
      ]}
      panelTitle="Content Services Maturity Scorecard"
      panelSubtitle="Key markers of successful digital education transformation."
      bars={[
        { label: "Curriculum Alignment", value: 98 },
        { label: "Instructional Design Quality", value: 95 },
        { label: "LMS Integration Readiness", value: 92 },
        { label: "Multilingual Expansion", value: 85 }
      ]}
    />

    <ContentServicesServicesGrid />
    <DeliveryProcess />
    <ContentServicesIndustries />
    <WhyChooseEqourse />
    <QualityCredentials />
    <RelatedBlogs />
    <FAQSection faqs={faqs} />
    <ServiceCTA 
      headline="Scale Your Educational Impact"
      subtext="Partner with eQOURSE for ISO-certified content development, localization, and technology solutions. Request a free pilot today."
      ctaText="Schedule a Call with Our Content Services Team"
    />
  </ContentServicesLayout>
);

export default ContentServicesOverviewPage;
