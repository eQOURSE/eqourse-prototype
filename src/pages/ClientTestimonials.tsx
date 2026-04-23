import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import TestimonialsGrid from "@/components/testimonials/TestimonialsGrid";

const ClientTestimonials = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "About Us", href: "/aboutus" }, { label: "Client Testimonials" }]}>
      <Helmet>
        <title>Client Testimonials │ EdTech & AI Data Services Reviews │ eQOURSE</title>
        <meta
          name="description"
          content="Read what 200+ clients say about eQOURSE. Testimonials from education companies, EdTech platforms, AI teams, and enterprise clients on our e-learning content, data annotation, and model testing services."
        />
        <meta
          name="keywords"
          content="eQOURSE testimonials, client reviews, EdTech testimonials, AI data services reviews, e-learning client feedback, data annotation reviews, education content testimonials"
        />
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "About Us", item: "https://www.eqourse.com/aboutus" },
          { name: "Client Testimonials", item: "https://www.eqourse.com/clients-testimonials" }
        ]}
      />

      <ServiceHero
        preHeadline="eQOURSE Testimonials"
        headline="What Our Clients Are"
        headlineAccent="Saying"
        subtext="At eQOURSE, we are proud to have worked with 200+ clients across EdTech and AI sectors, delivering scalable e-learning solutions and production-grade AI training data. From K-12 content and SAT preparation to multilingual data annotation and real-world model testing — our clients consistently share positive feedback about their experience with us."
        ctaText="View Reviews"
        ctaLink="#reviews"
      />
      
      <TestimonialsGrid />
    </PageLayout>
  );
};

export default ClientTestimonials;
