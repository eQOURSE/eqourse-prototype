import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import StrategySection from "@/components/StrategySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import ClientsSection from "@/components/ClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

import LeadFormPopup from "@/components/LeadFormPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <JourneyTimeline />
      <StatsSection />
      <ServicesSection />
      <HowItWorksSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <StrategySection />
      <WhyChooseUs />
      <CTASection />
      <ClientsSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
      <Footer />

      <LeadFormPopup />
    </div>
  );
};

export default Index;
