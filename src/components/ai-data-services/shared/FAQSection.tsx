import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "./SectionHeader";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  label?: string;
  title?: string;
}

const FAQSection = ({ faqs, label = "FAQs", title = "Frequently Asked Questions" }: FAQSectionProps) => (
  <section className="py-24 bg-background relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 40%) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

    <div className="container mx-auto px-4 relative z-10">
      <SectionHeader label={label} title={title} />
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="rounded-2xl border border-border/60 px-6 overflow-hidden bg-card/80 backdrop-blur-sm hover:border-primary/35 transition-colors shadow-card"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-foreground py-5 hover:no-underline hover:text-primary transition-colors text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
