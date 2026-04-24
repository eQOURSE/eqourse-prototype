import { useEffect, useRef } from "react";
import ContactFormSection from "./ContactFormSection";
import TrustSignalsBar from "./TrustSignalsBar";
import ServiceVerticalsCards from "./ServiceVerticalsCards";
import ContactTestimonials from "./ContactTestimonials";
import ContactStatsBar from "./ContactStatsBar";
import ContactNewsletter from "./ContactNewsletter";
import { useLocation } from "react-router-dom";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = ref.current?.querySelectorAll(".reveal-up, .reveal-scale");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

const ContactPage = () => {
  const revealRef = useScrollReveal();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#free-pilot' || hash === '#contact-form') {
      const element = document.getElementById(hash.substring(1)) || document.getElementById('contact-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [hash]);

  return (
    <div ref={revealRef} className="bg-background">
      {/* Section 1: Contact Form & Details */}
      <section id="contact-form" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="container mx-auto px-4 relative z-10">
          <ContactFormSection />
        </div>
      </section>

      {/* Section 2: Trust Signals */}
      <TrustSignalsBar />

      {/* Section 3: Service Verticals */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">Our Expertise</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2">
              Two Integrated <span className="text-gradient">Service Verticals</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We provide specialized services tailored for education platforms and artificial intelligence teams.
            </p>
          </div>
          <ServiceVerticalsCards />
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <ContactTestimonials />

      {/* Section 5: Stats Counter Bar */}
      <ContactStatsBar />

      {/* Section 6: Newsletter Signup */}
      <ContactNewsletter />
    </div>
  );
};

export default ContactPage;
