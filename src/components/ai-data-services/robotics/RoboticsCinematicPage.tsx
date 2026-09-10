import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  Cable,
  Check,
  ChevronRight,
  Database,
  Factory,
  GitBranch,
  HeartPulse,
  Home,
  PackageCheck,
  ScanLine,
  ShieldCheck,
  Sprout,
  Tags,
  Video,
  Warehouse,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import CinematicHero from "../shared/CinematicHero";
import RoboticsMediaSlot from "./RoboticsMediaSlot";
import RoboticsLottie from "./RoboticsLottie";
import { trackRoboticsEvent } from "@/lib/roboticsAnalytics";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import "./robotics-cinematic.css";

const PAGE_PATH = "/robotics-training-data-services";
const CANONICAL = "https://www.eqourse.com/robotics-training-data-services";
const PILOT_LINK = "/free-pilot?service=robotics-training-data&source=robotics-training-data-services#pilot-form";
const CONTACT_LINK = "/contact-us?service=robotics-training-data&source=robotics-training-data-services#contact-form";
const ASSET_ROOT = "/assets/ai-data/robotics";

type RoboticsCapability = {
  icon: typeof Video;
  title: string;
  short: string;
  body: string;
  href?: string;
};

const capabilities: RoboticsCapability[] = [
  { icon: Video, title: "Human Demonstrations", short: "Teleoperation, egocentric and multi-view capture", body: "Complete task episodes with action-state correspondence, deliberate failure and recovery, and per-episode QA.", href: "/robotics-training-data-services/human-demonstrations" },
  { icon: Database, title: "Multimodal Sensor Data", short: "RGB, RGB-D, depth, audio, pose and metadata", body: "Time-aligned sensor streams prepared around the modalities, calibration information and metadata required by your model.", href: "/robotics-training-data-services/multimodal-sensor-data" },
  { icon: Tags, title: "3D & Spatial Annotation", short: "Objects, actions, contact, intent and outcomes", body: "Bounding boxes, masks, tracking, pose, task steps, grasp points, affordances, contact events and language-action alignment.", href: "/robotics-training-data-services/3d-spatial-annotation" },
  { icon: Activity, title: "VLA Evaluation", short: "Held-out tasks, edge cases and failure scenarios", body: "Controlled evaluation for task completion, instruction following, grounding, action sequence, robustness and recovery from failure.", href: "/robotics-training-data-services/vla-evaluation" },
  { icon: ShieldCheck, title: "Deployment Validation", short: "On-site evidence, acceptance criteria and quality review", body: "Structured validation of the complete robotic application in its target environment, with documented findings and traceable evidence.", href: "/robotics-training-data-services/deployment-validation" },
];

const storyBeats = [
  { number: "01", eyebrow: "OBSERVE", title: "Capture the task as it happens.", body: "Record the complete physical episode from egocentric, wrist, overhead and third-person views—not disconnected frames.", tags: ["RGB / RGB-D", "Audio", "Pose", "Robot state"] },
  { number: "02", eyebrow: "UNDERSTAND", title: "Connect perception to intent.", body: "Align objects, people, instructions, task steps and contact events so the model can read context before it acts.", tags: ["Object state", "Affordance", "Intent", "Task phase"] },
  { number: "03", eyebrow: "ACT", title: "Represent movement and outcome.", body: "Preserve trajectories, grasp points, interventions, success states, failures and recovery behaviour at episode level.", tags: ["Action", "Trajectory", "Contact", "Outcome"] },
  { number: "04", eyebrow: "LEARN", title: "Turn model weakness into better data.", body: "Feed evaluation findings back into collection, annotation and held-out test sets for a closed improvement loop.", tags: ["Evaluation", "Edge cases", "Error taxonomy", "Iteration"] },
];

const workflow = [
  { number: "01", title: "Scope & Define", body: "Define embodiment, task, environment, modalities, collection protocol, schema and acceptance criteria." },
  { number: "02", title: "Collect & Source", body: "Capture representative human, language, video and robot-interaction data through approved setups." },
  { number: "03", title: "Annotate & Label", body: "Apply object, pose, action, instruction, contact, state and outcome labels with calibrated guidelines." },
  { number: "04", title: "Clean & Validate", body: "Synchronise streams, remove invalid records, verify metadata and document quality exceptions." },
  { number: "05", title: "Deliver & Integrate", body: "Package versioned datasets with manifests, schemas, QA reports and secure client-defined delivery." },
  { number: "06", title: "Test & Iterate", body: "Evaluate behaviour, categorise errors and direct the next collection or annotation cycle." },
];

const applications = [
  { icon: Bot, title: "Humanoid robots", body: "Bimanual manipulation, tool use and language-grounded task sequences." },
  { icon: Factory, title: "Industrial cobots", body: "Assembly, inspection, component handling and operator-assisted tasks." },
  { icon: Warehouse, title: "Warehouse robotics", body: "Object handling, parcel workflows, navigation context and exceptions." },
  { icon: Home, title: "Home & service", body: "Everyday object interaction and instructions across varied environments." },
  { icon: HeartPulse, title: "Assistive robotics", body: "Governed demonstrations under client-defined privacy and safety controls." },
  { icon: Sprout, title: "Field robotics", body: "Crop, terrain, tool and environment data for manipulation and inspection." },
  { icon: BrainCircuit, title: "VLA systems", body: "Diverse language-conditioned demonstrations and evaluation sets." },
];

const securityControls = [
  "Purpose-specific participant consent",
  "Client-controlled scope and retention",
  "PII detection and restricted handling",
  "Role-based access and secure transfer",
  "Dataset lineage and audit trails",
  "Versioned guidelines and QA reports",
];

const relatedServices = [
  { label: "AI Data Services", href: "/ai-data-services", meta: "Full pipeline" },
  { label: "Data Collection", href: "/ai-data-services/data-collection", meta: "Capture" },
  { label: "Annotation & Labeling", href: "/ai-data-services/annotation-labeling", meta: "Enrich" },
  { label: "3D Point Cloud & LiDAR", href: "/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation", meta: "Spatial geometry" },
  { label: "Cleaning & Validation", href: "/ai-data-services/cleaning-validation", meta: "Validate" },
  { label: "Model Testing", href: "/ai-data-services/model-testing", meta: "Evaluate" },
];

const faqs = [
  { question: "What types of robotics training data can eQOURSE provide?", answer: "We can support human demonstration data, egocentric and multi-view video, language-conditioned action data, robotics annotation, multimodal validation and model-evaluation datasets. Final modalities depend on the approved collection setup and client requirements." },
  { question: "Can you collect robot teleoperation data?", answer: "Yes, where the project uses client-provided robots, an approved collection environment or a qualified technology partner. Hardware access, safety procedures, operator training and required state or action logs are confirmed during scoping." },
  { question: "Do you support humanoid and Vision-Language-Action models?", answer: "We can design and enrich datasets for humanoid, manipulation and Vision-Language-Action use cases, including demonstrations, action segmentation, object interaction, language alignment and evaluation examples." },
  { question: "Which annotation types are available for robotics video?", answer: "Typical labels include object boxes and masks, tracking, hand and body pose, task steps, actions, grasp points, affordances, contact events, instructions, outcomes, failures and recovery behaviour." },
  { question: "How do you validate synchronised multimodal data?", answer: "Validation may include timestamp checks, missing-stream detection, calibration verification, duplicate and corruption checks, metadata review and alignment audits across video, audio, pose and robot logs." },
  { question: "Can you work with simulation or synthetic data?", answer: "We can curate, annotate, review and validate client-generated simulation or synthetic data. eQOURSE is not represented as the simulation-engine provider unless that capability has been separately confirmed." },
  { question: "How is sensitive visual data protected?", answer: "Projects can use informed consent, restricted access, PII review, face or environment redaction, secure transfer, retention controls and client-defined data-processing requirements." },
  { question: "Can we begin with a pilot?", answer: "Yes. A pilot can validate task instructions, capture quality, annotation guidelines, QA thresholds and delivery structure before the programme scales." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${CANONICAL}#service`,
      name: "Robotics & Physical AI Training Data Services",
      serviceType: "Robotics training data collection, annotation, validation and model evaluation",
      url: CANONICAL,
      provider: { "@id": "https://www.eqourse.com/#organization" },
      areaServed: "Worldwide",
      description: "Custom robotics training data for Physical AI, including egocentric video, multimodal annotation, validation and real-world model evaluation.",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "Robotics Training Data Services", item: CANONICAL },
      ],
    },
  ],
};

const MotionReveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 44 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const StoryBeat = ({ beat, index }: { beat: (typeof storyBeats)[number]; index: number }) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.58, margin: "-15% 0px -15% 0px" });
  return (
    <motion.article ref={ref} className={`rx-story-beat ${inView ? "is-active" : ""}`} animate={{ opacity: inView ? 1 : 0.42 }}>
      <div className="rx-story-beat__index">{beat.number}</div>
      <div>
        <span>{beat.eyebrow}</span>
        <h3>{beat.title}</h3>
        <p>{beat.body}</p>
        <div className="rx-story-beat__tags">
          {beat.tags.map((tag) => <em key={tag}>{tag}</em>)}
        </div>
      </div>
      <div className="rx-story-beat__signal" style={{ "--beat-delay": `${index * 0.3}s` } as CSSProperties} />
    </motion.article>
  );
};

const RoboticsCinematicPage = () => {
  const reduceMotion = useReducedMotion();
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [activeApplication, setActiveApplication] = useState(0);

  useEffect(() => {
    trackRoboticsEvent("robotics_page_view", {
      route: PAGE_PATH,
      device_category: window.innerWidth < 768 ? "mobile" : "desktop",
      referrer_group: document.referrer ? "referral" : "direct",
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActiveWorkflow((current) => (current + 1) % workflow.length), 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const trackLink = (destination: string, source: string) => () => trackRoboticsEvent("robotics_internal_link_click", {
    destination_slug: destination,
    source_section: source,
  });

  const activeApplicationData = applications[activeApplication];
  const ActiveApplicationIcon = activeApplicationData.icon;

  return (
    <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Robotics Training Data Services" }]}>
      <SEOHead
        title="Robotics Training Data Services for Physical AI | eQOURSE"
        description="Custom robotics training data for Physical AI, including egocentric video, multimodal annotation, validation and real-world model evaluation."
        canonical={CANONICAL}
        keywords="robotics training data services, Physical AI, Embodied AI, robot learning, human demonstrations, egocentric video, multimodal annotation, VLA models, robot manipulation, RGB-D, model evaluation"
        ogImage="https://www.eqourse.com/assets/ai-data/robotics/robotics-training-data-hero.webp"
      />
      <Helmet><script type="application/ld+json">{JSON.stringify(serviceSchema)}</script></Helmet>

      <main className="rx-page">
        <CinematicHero
          kicker="Physical AI data operations"
          headline="Robotics & Physical AI"
          headlineAccent="Training Data Services"
          subtext="Build learning-ready datasets that connect what a robot sees, understands and does in the physical world."
          ctaText="Start Free Pilot"
          ctaLink={PILOT_LINK}
          secondaryCtaText="Talk to a data specialist"
          secondaryCtaLink={CONTACT_LINK}
          onCtaClick={() => trackRoboticsEvent("robotics_primary_cta_click", { section: "hero", device_category: window.innerWidth < 768 ? "mobile" : "desktop" })}
          onSecondaryCtaClick={() => trackRoboticsEvent("robotics_secondary_cta_click", { section: "hero", device_category: window.innerWidth < 768 ? "mobile" : "desktop" })}
          imageSrc={`${ASSET_ROOT}/robotics-training-data-hero.webp`}
          imageAvifSrc={`${ASSET_ROOT}/robotics-training-data-hero.avif`}
          imageAlt="Engineer reviewing multimodal robotics training data beside a collaborative robot"
          imageWidth={1920}
          imageHeight={1072}
          stats={[
            { value: "500+", label: "specialists" },
            { value: "30+", label: "languages" },
            { value: "98%+", label: "validated accuracy" },
            { value: "ISO", label: "9001 · 27001" },
          ]}
          scrollTarget="#robotics-services"
          scrollLabel="Explore our robotics data services"
        />

        <section id="robotics-services" className="rx-capabilities">
          <div className="rx-capabilities__header">
            <span className="rx-section-index">01 / WHAT WE PROVIDE</span>
            <h2>Robotics training data services, <em>clearly defined.</em></h2>
            <p>Choose one service or combine them into a managed data programme built around your robot, task and model requirements.</p>
          </div>
          <div className="rx-capabilities__rail">
            {capabilities.map(({ icon: Icon, title, short, body, href }, index) => (
              <MotionReveal key={title} className="rx-capability" delay={index * 0.04}>
                <Link
                  to={href ?? PAGE_PATH}
                  className="rx-capability__link"
                  aria-label={`Explore ${title}`}
                  onClick={trackLink(href ?? PAGE_PATH, "robotics-services")}
                >
                  <span className="rx-capability__number">0{index + 1}</span>
                  <Icon />
                  <div><h3>{title}</h3><strong>{short}</strong><p>{body}</p><span className="rx-capability__explore">Explore service</span></div>
                  <ArrowRight className="rx-capability__arrow" />
                </Link>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="rx-capture">
          <MotionReveal className="rx-capture__media">
            <RoboticsMediaSlot
              id="human-demonstration"
              title="Human Demonstration Capture"
              caption="Egocentric and multi-view task recordings preserve hand-object interaction, sequence, context, failure and recovery behaviour for robot learning."
              webmSrc={`${ASSET_ROOT}/human-demonstration.webm`}
              mp4Src={`${ASSET_ROOT}/human-demonstration.mp4`}
              posterSrc={`${ASSET_ROOT}/human-demonstration-poster.webp`}
            />
          </MotionReveal>
          <MotionReveal className="rx-capture__copy" delay={0.1}>
            <span className="rx-section-index">02 / HUMAN DEMONSTRATION CAPTURE</span>
            <h2>Capture real-world <em>human demonstrations.</em></h2>
            <p>Record complete physical tasks from first-person and external views so robot-learning teams can connect instructions, hand-object interaction, task sequence and outcome.</p>
            <ul>
              <li><Check /> Egocentric and multi-view task recordings</li>
              <li><Check /> Natural tool use and object interaction</li>
              <li><Check /> Success, failure and recovery examples</li>
            </ul>
          </MotionReveal>
        </section>

        <section className="rx-story">
          <div className="rx-story__visual">
            <div className="rx-story__visual-sticky">
              <div className="rx-episode-map" aria-label="Example of an aligned robotics training episode">
                <div className="rx-episode-map__header">
                  <span>EPISODE / 0248</span>
                  <em><i /> ALIGNED</em>
                </div>
                <div className="rx-episode-map__flow">
                  {[
                    { number: "01", label: "Observation", detail: "RGB-D · pose · audio" },
                    { number: "02", label: "Instruction", detail: "language · task context" },
                    { number: "03", label: "Action", detail: "trajectory · contact" },
                    { number: "04", label: "Outcome", detail: "success · recovery" },
                  ].map((stage) => (
                    <div className="rx-episode-map__stage" key={stage.number}>
                      <span>{stage.number}</span>
                      <div><strong>{stage.label}</strong><small>{stage.detail}</small></div>
                    </div>
                  ))}
                </div>
                <div className="rx-episode-map__footer">
                  <span>00:00.000</span>
                  <div><i /><i /><i /><i /><i /><i /></div>
                  <span>00:07.250</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rx-story__beats">
            <div className="rx-story__intro">
              <span className="rx-section-index">03 / HOW THE DATA IS STRUCTURED</span>
              <h2>From observation to action.</h2>
              <p>We structure each episode so the model can connect what it saw, what it was asked to do, what action followed and whether it succeeded.</p>
            </div>
            {storyBeats.map((beat, index) => <StoryBeat key={beat.number} beat={beat} index={index} />)}
          </div>
        </section>

        <section className="rx-workflow">
          <MotionReveal className="rx-workflow__header">
            <div>
              <span className="rx-section-index">04 / DELIVERY PROCESS</span>
              <h2>How your robotics dataset <em>is built.</em></h2>
            </div>
            <div className="rx-workflow__summary">
              <p>Six controlled stages turn an approved task definition into a validated, versioned dataset ready for model teams.</p>
              <div className="rx-workflow__route" aria-hidden="true">
                {workflow.map((step, index) => <span key={step.number} className={activeWorkflow === index ? "is-active" : ""}>{step.number}</span>)}
              </div>
            </div>
          </MotionReveal>
          <div className="rx-workflow__console">
            <div className="rx-workflow__steps" role="tablist" aria-label="Robotics data workflow">
              {workflow.map((step, index) => (
                <button key={step.number} type="button" role="tab" aria-selected={activeWorkflow === index} className={activeWorkflow === index ? "is-active" : ""} onClick={() => setActiveWorkflow(index)}>
                  <span>{step.number}</span><strong>{step.title}</strong>
                </button>
              ))}
            </div>
            <motion.div key={activeWorkflow} className="rx-workflow__detail" initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}>
              <span>ACTIVE STAGE / {workflow[activeWorkflow].number}</span>
              <h3>{workflow[activeWorkflow].title}</h3>
              <p>{workflow[activeWorkflow].body}</p>
              <div className="rx-workflow__progress"><i style={{ width: `${((activeWorkflow + 1) / workflow.length) * 100}%` }} /></div>
            </motion.div>
          </div>
        </section>

        <section className="rx-lab">
          <MotionReveal className="rx-lab__copy">
            <span className="rx-section-index">05 / ANNOTATION OUTPUTS</span>
            <h2>What we can annotate.</h2>
            <p>Frame-level and episode-level labels preserve the relationship between perception, instruction and action. Validation criteria are agreed during scoping and reported by data type—not reduced to one generic score.</p>
            <div className="rx-lab__labels">
              {["task_step", "hand_pose", "contact_event", "object_state", "language_action", "outcome"].map((label) => <span key={label}><ScanLine /> {label}</span>)}
            </div>
          </MotionReveal>
          <MotionReveal className="rx-lab__media" delay={0.12}>
            <div className="rx-lab__scan-grid" aria-hidden="true" />
            <RoboticsMediaSlot id="annotation-validation" title="Enrich and Validate Every Episode" caption="Frame-level and episode-level labels connect perception, instruction and action while synchronisation and QA checks protect dataset integrity." webmSrc={`${ASSET_ROOT}/annotation-validation.webm`} mp4Src={`${ASSET_ROOT}/annotation-validation.mp4`} posterSrc={`${ASSET_ROOT}/annotation-validation-poster.webp`} />
          </MotionReveal>
        </section>

        <section className="rx-applications">
          <MotionReveal className="rx-applications__header">
            <span className="rx-section-index">06 / ROBOTICS USE CASES</span>
            <h2>Robotics programmes <em>we support.</em></h2>
            <p>Select a robotics application to see the typical data focus.</p>
          </MotionReveal>
          <div className="rx-applications__stage">
            <div className="rx-applications__ring rx-applications__ring--outer" />
            <div className="rx-applications__ring rx-applications__ring--inner" />
            {applications.map(({ icon: Icon, title }, index) => (
              <button key={title} type="button" className={`rx-application-node ${activeApplication === index ? "is-active" : ""}`} style={{ "--orbit-angle": `${(index / applications.length) * 360}deg` } as CSSProperties} onMouseEnter={() => setActiveApplication(index)} onFocus={() => setActiveApplication(index)} onClick={() => setActiveApplication(index)}>
                <Icon /><span>{title}</span>
              </button>
            ))}
            <div className="rx-applications__core">
              <RoboticsLottie src={`${ASSET_ROOT}/lottie/little-power-robot.lottie`} label="Animated small robot" className="rx-applications__robot" />
              <motion.div key={activeApplication} initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}>
                <ActiveApplicationIcon /><span>ACTIVE DOMAIN</span><h3>{activeApplicationData.title}</h3><p>{activeApplicationData.body}</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="rx-evaluation">
          <div className="rx-evaluation__loop" aria-hidden="true">
            <svg viewBox="0 0 900 360" preserveAspectRatio="none">
              <path d="M90 180 C210 20 350 20 450 180 C550 340 690 340 810 180" />
              <path d="M810 180 C690 20 550 20 450 180 C350 340 210 340 90 180" />
              <circle cx="90" cy="180" r="7" />
              <circle cx="450" cy="180" r="7" />
              <circle cx="810" cy="180" r="7" />
            </svg>
            {[
              { icon: Database, label: "DATASET", x: "10%", y: "50%" },
              { icon: BrainCircuit, label: "MODEL", x: "50%", y: "50%" },
              { icon: GitBranch, label: "FEEDBACK", x: "90%", y: "50%" },
            ].map(({ icon: Icon, label, x, y }) => <span key={label} style={{ left: x, top: y }}><Icon />{label}</span>)}
          </div>
          <MotionReveal className="rx-evaluation__copy">
            <span className="rx-section-index">07 / MODEL EVALUATION</span>
            <h2>Find model failures and <em>improve the next dataset.</em></h2>
            <p>Measure task completion, instruction following, object grounding, action sequence, environmental robustness and failure recovery. Structured error categories then guide the next collection batch and targeted validation set.</p>
          </MotionReveal>
          <MotionReveal className="rx-evaluation__media" delay={0.1}>
            <RoboticsMediaSlot id="model-evaluation" title="Test Behaviour and Feed Failures Back into the Data" caption="Structured evaluation identifies task failures, environmental gaps and recovery behaviour so the next dataset targets the model’s real weaknesses." webmSrc={`${ASSET_ROOT}/model-evaluation.webm`} mp4Src={`${ASSET_ROOT}/model-evaluation.mp4`} posterSrc={`${ASSET_ROOT}/model-evaluation-poster.webp`} />
          </MotionReveal>
        </section>

        <section className="rx-delivery">
          <div className="rx-delivery__visual">
            <RoboticsLottie src={`${ASSET_ROOT}/lottie/delivery-packaging.lottie`} label="Animated secure dataset packaging and delivery" className="rx-delivery__lottie" />
            <span className="rx-delivery__stamp"><PackageCheck /> VERSIONED<br />DELIVERY</span>
          </div>
          <MotionReveal className="rx-delivery__copy">
            <span className="rx-section-index">08 / DELIVERY & SECURITY</span>
            <h2>What you receive.</h2>
            <p>Datasets can be delivered in client-defined schemas with manifests, versioned guidelines, QA reports and secure cloud or client-controlled transfer.</p>
            <div className="rx-formats">{["JSON", "JSONL", "CSV", "PARQUET", "COCO", "CUSTOM"].map((format) => <span key={format}>{format}</span>)}</div>
            <ul>{securityControls.map((control) => <li key={control}><Check /> {control}</li>)}</ul>
            <p className="rx-delivery__note">RLDS, LeRobot or ROS bag conversion is offered only when capability is confirmed during technical scoping.</p>
          </MotionReveal>
        </section>

        <section className="rx-resources">
          <MotionReveal className="rx-resources__header">
            <span className="rx-section-index">09 / RELATED SERVICES</span>
            <h2>Related AI data services.</h2>
          </MotionReveal>
          <div className="rx-resources__columns rx-resources__columns--single">
            <div className="rx-link-list">
              <h3><Cable /> AI Data Services</h3>
              {relatedServices.map((item, index) => <Link key={item.href} to={item.href} onClick={trackLink(item.href, "related-services")}><span>0{index + 1}</span><strong>{item.label}</strong><em>{item.meta}</em><ArrowRight /></Link>)}
            </div>
          </div>
        </section>

        <RelatedBlogs />
        <section className="rx-faq">
          <div className="rx-faq__intro"><span className="rx-section-index">10 / FREQUENTLY ASKED QUESTIONS</span><h2>Robotics data questions, answered.</h2><p>Practical answers about scope, hardware, modalities, validation and governance.</p></div>
          <Accordion type="single" collapsible className="rx-faq__list" onValueChange={(value) => value && trackRoboticsEvent("robotics_faq_open", { question_id: value, device_category: window.innerWidth < 768 ? "mobile" : "desktop" })}>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`robotics-faq-${index + 1}`}>
                <AccordionTrigger><span>0{index + 1}</span>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="rx-cta">
          <picture><source srcSet={`${ASSET_ROOT}/robotics-training-data-hero-960.avif 960w, ${ASSET_ROOT}/robotics-training-data-hero.avif 1920w`} sizes="100vw" type="image/avif" /><source srcSet={`${ASSET_ROOT}/robotics-training-data-hero-960.webp 960w, ${ASSET_ROOT}/robotics-training-data-hero.webp 1920w`} sizes="100vw" type="image/webp" /><img src={`${ASSET_ROOT}/robotics-training-data-hero.webp`} alt="" width={1920} height={1072} loading="lazy" decoding="async" /></picture>
          <div className="rx-cta__grid" />
          <MotionReveal className="rx-cta__content">
            <span>YOUR ROBOT. YOUR TASK. YOUR DATA PROTOCOL.</span>
            <h2>Build the first episode before you scale the programme.</h2>
            <p>Scope a pilot around your embodiment, environment, modalities and acceptance criteria.</p>
            <div><Link to={PILOT_LINK} onClick={() => trackRoboticsEvent("robotics_primary_cta_click", { section: "final-cta", device_category: window.innerWidth < 768 ? "mobile" : "desktop" })}><Button size="lg">Start Free Pilot <ArrowRight /></Button></Link><Link to={CONTACT_LINK} onClick={() => trackRoboticsEvent("robotics_secondary_cta_click", { section: "final-cta", device_category: window.innerWidth < 768 ? "mobile" : "desktop" })}>Schedule a technical call <ChevronRight /></Link></div>
          </MotionReveal>
        </section>
      </main>
    </AIDataServicesLayout>
  );
};

export default RoboticsCinematicPage;
