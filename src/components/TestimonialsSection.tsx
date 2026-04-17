import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "eQOURSE is a one-stop shop for all your solution needs. The breadth and variety of solutions provided are unique and extensive. The benefit is to have everything done under one roof.",
    name: "Shakti Jhala",
    role: "Curriculum Head",
    company: "SPI",
  },
  {
    quote: "eQOURSE offers guaranteed quality and quantity. Our content quality has improved post working with eQOURSE. Will definitely recommend it to others because the output is trustworthy.",
    name: "Kola Xu",
    role: "Product Manager",
    company: "Data-Driven Interactive Technology",
  },
  {
    quote: "I worked with the eQOURSE team for a content project related to the CUET exam. They delivered very high-quality content with a great focus on students learning.",
    name: "Viraj Panwar",
    role: "Content Manager",
    company: "ExamFactor (ABP Learning)",
  },
  {
    quote: "eQOURSE has been a game-changer for our content creation needs. Their team brings creativity, precision, and deep expertise to the table, consistently delivering high-quality content.",
    name: "Mira Sood",
    role: "Managing Director",
    company: "ContentWize",
  },
  {
    quote: "It has always been a pleasure to collaborate with eQOURSE. The company consistently delivers services that excel in comfort, clarity, and reliability.",
    name: "Khyati Srinivas",
    role: "Head Program Designer",
    company: "eVidyaloka Trust",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Testimonials</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Trusted by <span className="text-gradient">200+ Clients</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-elevated border border-border/50 relative overflow-hidden">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/10" />
            
            <div key={current} className="animate-slide-up">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 relative z-10">
                "{testimonials[current].quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonials[current].name[0]}
                </div>
                <div>
                  <div className="font-heading font-semibold text-foreground">{testimonials[current].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[current].role}, {testimonials[current].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-card border border-border shadow-card flex items-center justify-center hover:bg-primary/5 transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8" : "bg-border hover:bg-primary/30"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full bg-card border border-border shadow-card flex items-center justify-center hover:bg-primary/5 transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
