import { motion } from "framer-motion";
import { BookOpen, Brain, GraduationCap, Network, Users, Award } from "lucide-react";

const edtechFeatures = [
  { text: "Custom E-Learning Content", icon: BookOpen },
  { text: "K-12 Curriculum Design", icon: GraduationCap },
  { text: "Localization in 30+ Languages", icon: Users },
];

const aiFeatures = [
  { text: "Custom Dataset Collection", icon: Network },
  { text: "Expert Annotation (NLP, CV, Audio)", icon: Brain },
  { text: "Real-world Model Testing (TuTrain)", icon: Award },
];

const AboutWhoWeAre = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Where Education Meets <span className="bg-gradient-primary bg-clip-text text-transparent">AI Data</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium"
          >
            An ISO 9001:2015 & ISO 27001:2022 certified education and AI data services organisation, eQOURSE is a recognised start-up by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India, with operations in India (Kota, Rajasthan) and Singapore (eQOURSE PTE LTD).
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* EdTech Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8 border border-primary/20 hover:border-primary/50 transition-colors duration-500 group relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all duration-700" />
            
            <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-soft">
              <GraduationCap className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-foreground">EdTech Solutions</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our EdTech division specialises in custom e-learning content development, exam preparation, video learning solutions, LMS integration, and subject matter expert services.
            </p>

            <ul className="space-y-3">
              {edtechFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <feat.icon className="w-3.5 h-3.5" />
                  </div>
                  {feat.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AI Data Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl p-8 border border-indigo-500/20 hover:border-indigo-500/50 transition-colors duration-500 group relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
            
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-soft">
              <Brain className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-foreground">AI Data Services</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our AI Data Services division delivers end-to-end AI training data pipelines — custom dataset collection, expert annotation, data cleaning, and real-world model testing.
            </p>

            <ul className="space-y-3">
              {aiFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                    <feat.icon className="w-3.5 h-3.5" />
                  </div>
                  {feat.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="text-muted-foreground text-lg">
            With 500+ specialists spanning STEM-educated content creators, trained data annotators, instructional designers, and domain experts, we serve 200+ clients across 15+ countries. Our vision is to be the trusted global partner where education expertise meets AI data excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWhoWeAre;
