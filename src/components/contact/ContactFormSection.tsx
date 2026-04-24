import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";

const ContactFormSection = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left Column: Form */}
      <div className="reveal-up">
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 relative overflow-hidden group hover:shadow-elevated transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          
          <div className="mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Fill Up the Consultation Form</h2>
            <p className="text-muted-foreground mt-2">
              Tell us about your project. We'll respond within 24 business hours with a tailored proposal.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>

      {/* Right Column: Contact Details */}
      <div className="reveal-scale" style={{ transitionDelay: '200ms' }}>
        <ContactDetails />
      </div>
    </div>
  );
};

export default ContactFormSection;
