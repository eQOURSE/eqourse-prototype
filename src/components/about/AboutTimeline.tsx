import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineData = [
  {
    year: "2020",
    title: "Founded",
    description: "eQOURSE was founded by Somveer Tayal, bringing over 20 years of experience in transforming education. We began as an EdTech content services company, partnering with e-learning platforms to design and develop digital content, assessments, and tutoring support.",
  },
  {
    year: "2021–2023",
    title: "Scaled EdTech Operations",
    description: "We scaled to 200+ subject matter experts and served 150+ clients across India, the USA, the UK, the UAE, and Africa. We achieved ISO 9001:2015 certification for quality management and established ourselves as a trusted partner for K-12 content, exam preparation, localization, and video solutions.",
  },
  {
    year: "2024",
    title: "ISO 27001 Certification & AI Expansion",
    description: "We obtained ISO 27001:2022 certification for information security management. Recognising that our deep education expertise and large STEM-trained workforce were uniquely suited to AI data services, we began building our AI Data Services division — offering data collection, annotation, cleaning, and the concept of real-world model testing.",
  },
  {
    year: "2025",
    title: "Singapore Office & TuTrain Launch",
    description: "eQOURSE was officially registered as eQOURSE PTE LTD in Singapore to strengthen global operations across the Asia-Pacific region. We launched our proprietary TuTrain platform for real-world AI model testing, connecting AI models to demographically diverse test users across 30+ languages. Our team grew to 500+ specialists spanning EdTech content and AI data operations.",
  },
  {
    year: "2026",
    title: "Dual-Vertical Global Operations",
    description: "Today, eQOURSE operates as a dual-vertical company: EdTech Solutions and AI Data Services. We serve 200+ clients across 15+ countries, with offices in India (Kota) and Singapore. Our mission is to help organisations across education and AI build systems that work in the real world — powered by high-quality human expertise.",
  }
];

const AboutTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            From an EdTech startup to a dual-vertical global leader in Education and AI Data Services.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Central Line Background */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border/50 -translate-x-1/2" />
          
          {/* Animated Central Progress Line */}
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-primary via-indigo-500 to-primary -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(13,148,136,0.5)] origin-top"
            style={{ height: lineHeight }}
          />

          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={item.year} className="relative flex items-center mb-16 md:mb-24 group">
                
                {/* Timeline Dot */}
                <div className="absolute left-[20px] md:left-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary z-10 -translate-x-1/2 flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-indigo-500 shadow-glow">
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:bg-indigo-500 transition-colors" />
                </div>

                {/* Content Container */}
                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? "md:pr-16 md:text-right md:justify-self-end" : "md:ml-auto md:pl-16"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    className="glass p-6 md:p-8 rounded-2xl hover:bg-card/60 transition-colors border border-border/50 hover:border-primary/30"
                  >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 tracking-wide">
                      {item.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
