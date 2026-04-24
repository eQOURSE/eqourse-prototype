import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I worked with eQOURSE team for content project related to CUET exam. They delivered very high quality content with great focus on students learning. The team was very professional in conduct and setting up the process flow. I will definitely work with them in future and will recommend to others.",
    name: "Viraj Panwar",
    title: "Content Manager",
    company: "ExamFactor (ABP Learning)",
    image: "/assets/dropdown/who_we_are.png", // Using existing asset as fallback
    tag: "EdTech"
  },
  {
    quote: "eQOURSE has been a game-changer for our content creation needs. Their team brings creativity, precision, and deep expertise to the table, consistently delivering high-quality content that aligns perfectly with our educational goals.",
    name: "Mira Sood",
    title: "Managing Director",
    company: "ContentWize",
    image: "/assets/dropdown/who_we_are.png",
    tag: "EdTech"
  },
  {
    quote: "It has always been a pleasure to collaborate with eQOURSE. The company consistently delivers services that excel in comfort, clarity, and reliability, meeting the highest possible standards of client requirements.",
    name: "Khyati Srinivas",
    title: "Head Program Designer",
    company: "eVidyaloka Trust",
    image: "/assets/dropdown/who_we_are.png",
    tag: "EdTech"
  },
  {
    quote: "eQOURSE is a one stop shop for all your solution needs. The breadth and variety of solutions provided are unique and extensive. Benefit is to have everything done under one roof.",
    name: "Shakti Jhala",
    title: "Curriculum Head",
    company: "SPI",
    image: "/assets/dropdown/who_we_are.png",
    tag: "EdTech"
  },
  {
    quote: "eQOURSE offers guaranteed quality and quantity. Our Content quality has improved post working with eQOURSE. Will definitely recommend to others because the output of eQOURSE is trustworthy.",
    name: "Kola Xu",
    title: "Product Manager",
    company: "Data Driven Interactive Technology",
    image: "/assets/dropdown/who_we_are.png",
    tag: "EdTech"
  }
];

const ContactTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Determine cards per view based on typical screen sizes
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, cardsPerView, maxIndex]);

  return (
    <section className="py-20 bg-muted/30 overflow-hidden relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="container mx-auto px-4 reveal-up">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hear From Our Clients
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what industry leaders are saying about our EdTech and AI Data solutions.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:text-primary transition-colors z-10 hover:scale-105"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:text-primary transition-colors z-10 hover:scale-105"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden px-2 pb-8 pt-2" ref={scrollContainerRef}>
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
            >
              {testimonials.map((t, index) => {
                const isAI = t.tag === "AI Data";
                return (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-4" 
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <div className={`h-full bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow relative ${isAI ? 'border-t-4 border-t-navy' : 'border-t-4 border-t-primary'}`}>
                      <Quote className={`absolute top-6 right-6 w-12 h-12 opacity-10 ${isAI ? 'text-navy' : 'text-primary'}`} />
                      
                      <p className="text-muted-foreground text-sm italic leading-relaxed mb-8 min-h-[120px]">
                        "{t.quote}"
                      </p>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-14 h-14 rounded-full bg-muted overflow-hidden shrink-0 border border-border/50">
                          {t.image ? (
                            <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale opacity-70" />
                          ) : (
                            <div className="w-full h-full bg-secondary/50" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-base leading-tight">{t.name}</h4>
                          <p className="text-sm text-muted-foreground">{t.title}</p>
                          <p className="text-xs font-medium text-foreground/70">{t.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === i ? 'bg-primary w-6' : 'bg-border hover:bg-primary/50'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTestimonials;
