import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import FAQsAccordion from "@/components/faqs/FAQsAccordion";

const FAQs = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "About Us", href: "/aboutus" }, { label: "FAQs" }]}>
      <Helmet>
        <title>FAQs │ EdTech Solutions & AI Data Services │ eQOURSE</title>
        <meta
          name="description"
          content="Frequently asked questions about eQOURSE's EdTech solutions and AI data services. Learn about K-12 content development, data annotation, AI training data, LMS integration, multilingual localization, and more."
        />
        <meta
          name="keywords"
          content="eQOURSE FAQ, EdTech FAQ, AI data services FAQ, e-learning questions, data annotation questions, K12 content FAQ, LMS integration FAQ, AI training data FAQ"
        />
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "About Us", item: "https://www.eqourse.com/aboutus" },
          { name: "FAQs", item: "https://www.eqourse.com/faq" }
        ]}
      />

      <ServiceHero
        preHeadline="Got Questions?"
        headline="Frequently Asked"
        headlineAccent="Questions"
        subtext="Find answers to common questions about our EdTech solutions, AI data services, content development process, data annotation quality, scaling options, and more. Whether you're an education company, EdTech platform, or AI team, we aim to provide comprehensive support tailored to your needs."
        ctaText="View FAQs"
        ctaLink="#faq-accordion"
      />
      
      <div id="faq-accordion">
        <FAQsAccordion />
      </div>
    </PageLayout>
  );
};

export default FAQs;
