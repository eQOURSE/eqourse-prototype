import { motion } from "framer-motion";
import { Compass, Globe2, ShieldCheck, MapPin } from "lucide-react";

const reasons = [
  {
    title: "Two Verticals, Infinite Opportunities",
    description: "Whether you’re passionate about education or fascinated by AI, eQOURSE offers career paths across both domains. Our EdTech team creates learning content that reaches 10M+ students. Our AI Data team trains models that serve millions of users. You can grow within either vertical or across both.",
    icon: Compass,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-500/10"
  },
  {
    title: "Work from India’s STEM Capital",
    description: "Our headquarters in Kota, Rajasthan — one of the world’s largest concentrations of STEM-educated professionals — gives you access to a vibrant community of educators, engineers, and data specialists.",
    icon: MapPin,
    color: "from-teal-400 to-teal-600",
    bgLight: "bg-teal-500/10"
  },
  {
    title: "Global Impact",
    description: "With clients in 15+ countries and a Singapore office, your work at eQOURSE reaches learners and AI systems worldwide.",
    icon: Globe2,
    color: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-500/10"
  },
  {
    title: "ISO-Certified Quality Culture",
    description: "We’re ISO 9001 & 27001 certified. Quality isn’t just a metric — it’s our culture. You’ll work in a structured, professional environment that values accuracy and continuous improvement.",
    icon: ShieldCheck,
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-orange-500/10"
  }
];

const CareersWhyWork = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Why Work With Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Join a culture driven by operational excellence, shaping global education and training the next generation of artificial intelligence.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass p-8 rounded-[2rem] border border-border/50 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2 shadow-soft hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl ${reason.bgLight} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <div className={`bg-gradient-to-br ${reason.color} w-full h-full rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <reason.icon className="w-7 h-7" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersWhyWork;
