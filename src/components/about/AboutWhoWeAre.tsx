import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Brain,
  GraduationCap,
  Network,
  Users,
  Award,
  Bot,
} from "lucide-react";
import { Link } from "react-router-dom";
import "@/pages/events.css";


import EventResources from "@/components/events/EventResources";
const contentServicesFeatures = [
  { text: "Custom E-Learning Content", icon: BookOpen },
  { text: "K-12 Curriculum Design", icon: GraduationCap },
  { text: "Localization in 30+ Languages", icon: Users },
];

const aiFeatures = [
  { text: "Custom Dataset Collection", icon: Network },
  { text: "Expert Annotation (NLP, CV, Audio)", icon: Brain },
  { text: "Real-world Model Testing (TuTrain)", icon: Award },
  { text: "Robotics & Physical AI Training Data", icon: Bot },
];

const AboutWhoWeAre = () => {
  const reduced = useReducedMotion();
  const reveal = {
    initial: { opacity: reduced ? 1 : 0, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 },
    transition: { duration: 0.55 },
  };
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
            Where Education Meets{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Data
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium"
          >
            eQOURSE is a global learning content and AI data solutions provider,
            commercially headquartered in Singapore as eQOURSE PTE. LTD., with
            its operational headquarters and primary delivery centre in Kota,
            Rajasthan, India. We specialise in end-to-end digital curriculum
            development, pedagogical localization across 30+ languages and
            high-accuracy training data services—built on ISO 9001:2015 and ISO
            27001:2022 certified processes.
          </motion.p>
        </div>
        <section
          className="events-resources-section events-section !py-12 md:!py-16 rounded-[2rem]"
          id="resources"
        >
          <div className="events-shell px-2 md:px-4">
            <motion.div {...reveal}>
              <div className="events-section-heading">
                <div>
                  <p className="events-eyebrow">
                    READY TO SHARE / READY TO PRESENT
                  </p>
                  <h2>
                    Brochure <span>&amp; Presentation</span>
                  </h2>
                </div>
                <p>
                  Access eQOURSE materials from our conferences, business tours
                  and industry engagements.
                </p>
              </div>
              <EventResources />
            </motion.div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Content Services Side */}
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

            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Content Service
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our Content Services division specialises in custom e-learning
              content development, exam preparation, video learning solutions,
              LMS integration, and subject matter expert services.
            </p>

            <ul className="space-y-3">
              {contentServicesFeatures.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-foreground/80"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <feat.icon className="w-3.5 h-3.5" />
                  </div>
                  {feat.text}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                to="/content-services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Explore Content Services
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
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

            <h3 className="text-2xl font-bold mb-4 text-foreground">
              AI Data Services
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our AI Data Services division delivers end-to-end AI training data
              pipelines—custom dataset collection, expert annotation, data
              cleaning, real-world model testing, and multimodal training data
              for Robotics and Physical AI.
            </p>

            <ul className="space-y-3">
              {aiFeatures.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-foreground/80"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                    <feat.icon className="w-3.5 h-3.5" />
                  </div>
                  {feat.text}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                to="/ai-data-services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
              >
                Explore AI Data Services
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/robotics-training-data-services"
                className="ml-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Explore Robotics Data
              </Link>
            </div>
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
            A scalable network of 500+ subject matter experts, data specialists,
            instructional designers and quality professionals powers our work.
            International client engagements and MSAs run through Singapore,
            while 24/7 delivery execution is led from India. Our consumer
            tutoring brand{" "}
            <Link to="/tutrain" className="text-primary hover:underline">
              TUTRAIN
            </Link>{" "}
            brings this expertise directly to families.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWhoWeAre;
