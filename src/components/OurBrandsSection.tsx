import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const OurBrandsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30 border-y border-border/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4"
          >
            OUR BRANDS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 font-heading tracking-tight"
          >
            The eQOURSE <span className="text-transparent bg-clip-text bg-gradient-primary">Ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Two specialist platforms sit alongside our services. TUTRAIN delivers one-to-one and small-batch tutoring to students worldwide. eQOURSE+ is the talent platform we are building to verify specialists and vendor agencies and to staff the AI data and content projects we deliver — it is not open for registration yet.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* TUTRAIN Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative glass rounded-2xl p-8 lg:p-10 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elevated flex flex-col h-full"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
              {/* <GraduationCap className="w-7 h-7 text-primary" /> */}
              <img src="https://media.licdn.com/dms/image/v2/D560BAQEqYn6v_ecxbA/company-logo_200_200/B56ZfF3ah2HoAI-/0/1751371330198/tutrain_logo?e=2147483647&v=beta&t=F1W7vo0IA0dQKPqyeWfpSXLJhNgGsgNun9zx_lDgBns" alt="tutrain" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors font-heading">
              TUTRAIN
            </h3>
            
            <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
              Our direct-to-learner platform delivering personalized 1-on-1 and small-batch online tutoring. Built on eQOURSE's robust educational framework, TUTRAIN brings world-class teaching to K-12 students across global curricula including CBSE, IB, IGCSE, and Common Core.
            </p>
            
            <div className="pt-6 border-t border-border/50">
              <Button asChild variant="outline" className="w-full justify-between group/btn hover:bg-primary hover:text-primary-foreground border-primary/20 hover:border-primary transition-all duration-300 rounded-xl h-12">
                <Link to="/tutrain">
                  Explore TUTRAIN
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* eQOURSE+ Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative glass rounded-2xl p-8 lg:p-10 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elevated flex flex-col h-full"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
              {/* <Users className="w-7 h-7 text-primary" /> */}
              <img src="https://plus.eqourse.com/favicon.ico" alt="tutrain"/>
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors font-heading">
              eQOURSE+
            </h3>
            
            <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
              The upcoming central hub for our talent network. eQOURSE+ will serve as our proprietary platform to verify, onboard, and manage the specialised subject matter experts and vendor agencies who power our AI Data Services and Content Services operations worldwide.
            </p>
            
            <div className="pt-6 border-t border-border/50">
              <Button asChild variant="outline" className="w-full justify-between group/btn hover:bg-primary hover:text-primary-foreground border-primary/20 hover:border-primary transition-all duration-300 rounded-xl h-12">
                <a href="https://plus.eqourse.com" target="_blank" rel="noopener noreferrer">
                  Visit eQOURSE+
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurBrandsSection;
