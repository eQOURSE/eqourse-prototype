import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface StatItemProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

const NumberCounter = ({ end, suffix = "", label, duration = 2000 }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-foreground/80 font-semibold text-center text-sm md:text-base uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const AboutStats = () => {
  return (
    <section className="py-20 border-t border-border/50 bg-background relative z-10">
      <div className="container mx-auto px-4">
        {/* Counter Stats Container */}
        <div className="bg-card w-full max-w-6xl mx-auto rounded-3xl p-8 md:p-12 shadow-elevated border border-border/50 backdrop-blur-sm -mt-24 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <NumberCounter end={10} suffix="M+" label="Students Reached" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <NumberCounter end={50} suffix="K+" label="Solutions / Month" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <NumberCounter end={10} suffix="K+" label="Videos / Month" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <NumberCounter end={500} suffix="+" label="Specialists" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <NumberCounter end={30} suffix="+" label="Languages" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <NumberCounter end={15} suffix="+" label="Countries" />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          >
             <div className="flex items-center gap-3">
               <CheckCircle2 className="w-8 h-8 text-indigo-500" />
               <div className="text-left">
                 <div className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">98%+</div>
                 <div className="text-sm text-foreground/70 font-semibold uppercase tracking-wider">Annotation Accuracy</div>
               </div>
             </div>
             
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-gradient-to-br from-primary to-teal-500 rounded-xl flex items-center justify-center shadow-soft transform rotate-3">
                 <span className="text-white font-black text-sm">ISO</span>
               </div>
               <div className="text-left font-semibold text-foreground/80 leading-tight">
                 9001:2015 &amp; <br />
                 27001:2022 Certified
               </div>
             </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
