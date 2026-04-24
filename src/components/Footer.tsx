import { Phone, Mail, MapPin, Shield } from "lucide-react";
import { Link } from "react-router-dom";

/* ── Quick Links: key top-level pages for crawlability ── */
const quickLinks = [
  { label: "About Us", to: "/aboutus" },
  { label: "Case Studies", to: "/casestudy" },
  { label: "Samples", to: "/samples" },
  { label: "Blog", to: "/#blogs" },
  { label: "Testimonials", to: "/clients-testimonials" },
  { label: "Careers", to: "/career" },
  { label: "FAQs", to: "/faq" },
];

/* ── EdTech Solutions: 7 top-level service categories for SEO ── */
const edtechLinks = [
  { label: "EdTech Overview", to: "/edtech-solutions" },
  { label: "Custom E-Learning Content", to: "/edtech-solutions/custom-e-learning-content" },
  { label: "Exam Preparation Content", to: "/edtech-solutions/exam-preparation-content" },
  { label: "Learning Solutions", to: "/edtech-solutions/learning-solutions" },
  { label: "E-Learning Video Solutions", to: "/edtech-solutions/elearning-video-solutions" },
  { label: "Localization Services", to: "/edtech-solutions/localization-services" },
  { label: "Technology Solutions", to: "/edtech-solutions/technology-solutions" },
  { label: "Subject Matter Experts", to: "/edtech-solutions/subject-matter-experts" },
];

/* ── AI Data Services ── */
const aiServiceLinks = [
  { label: "AI Services Overview", to: "/ai-data-services" },
  { label: "Data Collection", to: "/ai-data-services/data-collection" },
  { label: "Annotation & Labeling", to: "/ai-data-services/annotation-labeling" },
  { label: "Cleaning & Validation", to: "/ai-data-services/cleaning-validation" },
  { label: "Model Testing", to: "/ai-data-services/model-testing" },
  { label: "Start Free Pilot", to: "/free-pilot" },
];

/* ── Legal ── */
const legalLinks = [
  { label: "Privacy Policy", to: "#" },
  { label: "Contact Us", to: "/contact" },
  { label: "Sitemap", to: "#" },
];

const Footer = () => {
  const linkClass = "block text-sm hover:text-primary transition-colors";
  const linkColor = { color: "hsl(242, 20%, 65%)" };
  const headingColor = { color: "hsl(0, 0%, 95%)" };

  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="font-heading text-2xl font-extrabold text-gradient">eQOURSE</Link>
            <p className="text-xs italic mb-1" style={{ color: "hsl(242, 20%, 55%)" }}>Delivering Operational Excellence</p>
            <p className="text-sm leading-relaxed" style={linkColor}>
              eQOURSE partners with education companies and AI builders worldwide. We design digital learning content, create production-grade AI training datasets, and test AI models in real-world environments — all powered by 500+ domain experts.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold" style={{ color: "hsl(170, 82%, 55%)" }}>ISO 9001</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold" style={{ color: "hsl(170, 82%, 55%)" }}>ISO 27001</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-[10px] font-bold" style={{ color: "hsl(165, 75%, 65%)" }}>#startupindia</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {[
                { label: "Li", name: "LinkedIn" },
                { label: "Fb", name: "Facebook" },
                { label: "In", name: "Instagram" },
                { label: "Yt", name: "YouTube" },
                { label: "X", name: "X" },
              ].map((social) => (
                <a key={social.name} href="#" aria-label={social.name} className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-gradient-primary hover:text-primary-foreground transition-all text-xs font-bold">
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={headingColor}>Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.to} className={linkClass} style={linkColor}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── EdTech Solutions ── */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={headingColor}>EdTech Solutions</h4>
            <div className="space-y-3">
              {edtechLinks.map((link) => (
                <Link key={link.label} to={link.to} className={linkClass} style={linkColor}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── AI Data Services + Legal ── */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={headingColor}>AI Data Services</h4>
            <div className="space-y-3">
              {aiServiceLinks.map((link) => (
                <Link key={link.label} to={link.to} className={linkClass} style={linkColor}>
                  {link.label}
                </Link>
              ))}
            </div>
            <h4 className="font-heading font-semibold mt-6 mb-3" style={headingColor}>Legal</h4>
            <div className="space-y-3">
              {legalLinks.map((link) => (
                <Link key={link.label} to={link.to} className={linkClass} style={linkColor}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={headingColor}>Contact</h4>
            <div className="space-y-4">
              <a href="tel:+919214445870" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" style={linkColor}>
                <Phone className="w-4 h-4 text-primary flex-shrink-0" /> +91 - 92144 - 45870
              </a>
              <a href="mailto:info@eqourse.com" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" style={linkColor}>
                <Mail className="w-4 h-4 text-primary flex-shrink-0" /> info@eqourse.com
              </a>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2 text-sm" style={linkColor}>
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block" style={{ color: "hsl(0, 0%, 85%)" }}>India Office</span>
                    C-29, Indra Vihar, Shiv Jyoti School Road, Kota, Rajasthan - 324005
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm" style={linkColor}>
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block" style={{ color: "hsl(0, 0%, 85%)" }}>Singapore Office</span>
                    760 Bedok Reservoir Road, #04-13, Waterfront Waves - 479245
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-12 pt-8 text-center text-sm" style={{ color: "hsl(242, 20%, 50%)" }}>
          &copy; {new Date().getFullYear()} eQOURSE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
