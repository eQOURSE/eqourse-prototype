import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

const sitemapData = [
  {
    category: "Company & Resources",
    links: [
      { name: "Home", to: "/" },
      { name: "About Us", to: "/aboutus" },
      { name: "Careers", to: "/career" },
      { name: "FAQs", to: "/faq" },
      { name: "Case Studies", to: "/casestudy" },
      { name: "Client Testimonials", to: "/clients-testimonials" },
      { name: "Blog", to: "/blog" },
      { name: "Contact Us", to: "/contact" },
      { name: "Privacy Policy", to: "/privacy-policy" },
      { name: "Free Pilot", to: "/free-pilot" },
    ],
  },
  {
    category: "AI Data Services",
    links: [
      { name: "AI Services Overview", to: "/ai-data-services" },
      { name: "Data Collection", to: "/ai-data-services/data-collection" },
      { name: "Annotation & Labeling", to: "/ai-data-services/annotation-labeling" },
      { name: "Cleaning & Validation", to: "/ai-data-services/cleaning-validation" },
      { name: "Model Testing", to: "/ai-data-services/model-testing" },
      { name: "AI Data Samples", to: "/ai-data-samples" },
    ],
  },
  {
    category: "EdTech Solutions",
    links: [
      { name: "EdTech Overview", to: "/edtech-solutions" },
      { name: "Custom E-Learning Content", to: "/edtech-solutions/custom-e-learning-content" },
      { name: "Exam Preparation Content", to: "/edtech-solutions/exam-preparation-content" },
      { name: "Learning Solutions", to: "/edtech-solutions/learning-solutions" },
      { name: "E-Learning Video Solutions", to: "/edtech-solutions/elearning-video-solutions" },
      { name: "Localization Services", to: "/edtech-solutions/localization-services" },
      { name: "Technology Solutions", to: "/edtech-solutions/technology-solutions" },
      { name: "Subject Matter Experts", to: "/edtech-solutions/subject-matter-experts" },
    ],
  },
  {
    category: "EdTech Samples",
    links: [
      { name: "Text Content Samples", to: "/text-samples" },
      { name: "Video Content Samples", to: "/video-samples" },
      { name: "K12 Grade (KG-5)", to: "/kindergarten-to-k5-samples" },
      { name: "K12 Grade (6-12)", to: "/k6-to-k12-samples" },
      { name: "IIT JEE / NEET", to: "/iit-jee-neet-samples" },
      { name: "UPSC & State PSC", to: "/upsc-state-psc-samples" },
      { name: "STEM Content", to: "/stem-content-samples" },
      { name: "CBSE Content", to: "/curriculum-samples" },
      { name: "Localization", to: "/translation-and-localization-text-samples" },
      { name: "Test Prep & Assessments", to: "/test-prep-and-assessments" },
      { name: "Articulate Storyline", to: "/articulate-storyline-video-samples" },
      { name: "Pen Tab and PPT", to: "/pen-tab-and-ppt-samples" },
      { name: "AI Avatar Videos", to: "/ai-avatar-video-samples" },
      { name: "Flash to HTML", to: "/flash-to-html-samples" },
      { name: "2D 3D Animation", to: "/2d-3d-video-samples" },
      { name: "Promotional Video", to: "/promotional-video" },
      { name: "Immersive Simulation AR/VR", to: "/immersive-simulation-ar-vr-video" },
    ],
  },
  {
    category: "Our Brand Family",
    links: [
      { name: "TUTRAIN", to: "/tutrain" },
      { name: "Visit TUTRAIN.com →", to: "https://tutrain.com", external: true },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const Sitemap = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "Sitemap" }]}>
      <Helmet>
        <title>Sitemap │ eQOURSE — EdTech Solutions &amp; AI Data Services</title>
        <meta
          name="description"
          content="Navigate the eQOURSE website. Find quick links to our EdTech solutions, AI data services, company information, samples, and legal policies."
        />
        <meta
          name="keywords"
          content="eQOURSE sitemap, website navigation, EdTech solutions directory, AI data services directory, eQOURSE links"
        />
        <link rel="canonical" href="https://www.eqourse.com/sitemap" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Sitemap", item: "https://www.eqourse.com/sitemap" },
        ]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[50vh] flex items-center border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/12 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-14 right-12 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(170 82% 40%) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-slide-up">
                <Map className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-primary">Website Navigation</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white animate-slide-up-delayed">
                Site<span className="text-gradient">map</span>
              </h1>

              <p className="text-lg md:text-xl text-white/75 animate-slide-up-delayed-2 max-w-2xl">
                Explore our comprehensive suite of EdTech Solutions, AI Data Services, case studies, and extensive sample catalog.
              </p>
              
              <div className="pt-4 animate-slide-up-delayed-2">
                 <Link to="/contact">
                   <Button size="lg" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-[1.02] px-8">
                     Can't find what you're looking for?
                     <ArrowRight className="ml-2 w-5 h-5" />
                   </Button>
                 </Link>
              </div>
            </div>

            <div className="relative animate-slide-up-delayed">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-white/10 group">
                <img
                  src="/sitemap_hero.png"
                  alt="eQOURSE Sitemap Network"
                  width={800}
                  height={600}
                  className="w-full h-[320px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sitemap Content */}
      <section className="py-24 bg-foreground relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
          >
            {sitemapData.map((section, idx) => (
              <motion.div
                key={section.category}
                variants={itemVariants}
                className="bg-[#0f152a] border border-white/10 rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20 relative overflow-hidden group flex flex-col h-full"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h2 className="font-heading text-2xl font-bold text-white mb-6 relative z-10 border-b border-white/10 pb-4 flex items-center gap-3">
                  <div className="w-2 h-6 bg-primary rounded-full group-hover:h-8 transition-all duration-300" />
                  {section.category}
                </h2>
                
                <ul className="space-y-4 relative z-10 flex-grow">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#a4a8b8] hover:text-white transition-colors flex items-center gap-3 group/link font-medium"
                        >
                          <ArrowRight className="w-4 h-4 opacity-0 -ml-7 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all text-primary duration-300" />
                          <span className="group-hover/link:translate-x-1 transition-transform duration-300">{link.name}</span>
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-[#a4a8b8] hover:text-white transition-colors flex items-center gap-3 group/link font-medium"
                        >
                          <ArrowRight className="w-4 h-4 opacity-0 -ml-7 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all text-primary duration-300" />
                          <span className="group-hover/link:translate-x-1 transition-transform duration-300">{link.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Sitemap;
