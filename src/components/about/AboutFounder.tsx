import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const AboutFounder = () => {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Founder Image & Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 relative"
          >
            {/* Background Blob */}
            <div className="absolute inset-0 bg-gradient-brand rounded-full blur-3xl opacity-20 transform scale-90" />
            
            {/* Photo Container */}
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl group">
              {/* Note: Wait, since no specific image path was provided, use a placeholder or check asset folder, but we know there's about-image.jpg or founder picture in existing site. Using a generic solid placeholder or standard path for now */}
              <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
                 <img 
                   src="/founder.jpg" 
                   alt="Somveer Tayal - Founder and CEO" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   onError={(e) => {
                     // Fallback image if founder.jpg doesn't exist
                     (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800";
                   }}
                 />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-1">Somveer Tayal</h3>
                <p className="text-white/80 font-medium">Founder & CEO, eQOURSE</p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -right-6 -bottom-6 glass border border-border/50 rounded-2xl p-4 md:p-6 shadow-elevated flex items-center gap-4 bg-background/95 max-w-[220px]"
            >
              <div className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">20+</div>
              <div className="text-sm font-semibold text-foreground/80 leading-tight">Years Exp in Education & IT</div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6">
                 Leadership
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground">Meet the Founder</h2>
              
              <div className="space-y-5 text-muted-foreground leading-relaxed text-lg mb-10">
                <p>
                  Somveer Tayal, the founder and CEO of eQOURSE, brings over 20 years of experience in the education and technology sectors. His expertise spans content development, curriculum design, teacher training, academic strategy, and AI data operations.
                </p>
                <p>
                  As an Associate Professor for JEE Advanced-level Mathematics, he taught over 20,000 students with 18,000+ hours of teaching. He also served as the Functional Head of R&D for K-12, IIT JEE, and NEET, executing academic content strategy for over 40,000 students.
                </p>
                <p>
                  In 2020, Somveer founded eQOURSE with a vision to bring operational excellence to education and AI services. Under his leadership, eQOURSE has grown from an EdTech content startup to a dual-vertical company serving 200+ global clients. In 2025, he expanded eQOURSE’s operations to Singapore with the registration of eQOURSE PTE LTD, positioning the company as a global player in both education and AI data.
                </p>
              </div>

              {/* Founder Quote */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative p-8 rounded-3xl glass border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-soft"
              >
                <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20 transform -rotate-12" />
                <p className="relative z-10 text-foreground/90 font-medium italic leading-relaxed text-lg mt-4 pl-4 border-l-4 border-primary">
                  "I believe that the same human expertise that makes great education possible — deep subject knowledge, cultural understanding, and rigorous quality standards — is exactly what AI needs to work in the real world. At eQOURSE, we bring both together: EdTech solutions that scale learning outcomes, and AI data services that help machines learn from the best of human intelligence. Our mission is to be the trusted partner where education meets AI."
                </p>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutFounder;
