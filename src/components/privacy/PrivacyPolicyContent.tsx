import { useState, useEffect, useRef } from "react";
import { privacySections, LAST_UPDATED } from "./privacyData";
import { Shield, ShieldCheck, Lock, Globe, FileText, Eye, Database, Cookie, Clock, UserCheck, Plane, Baby, AlertTriangle, ExternalLink, RefreshCw, Phone, ChevronDown, Printer } from "lucide-react";
import { Link } from "react-router-dom";

const sectionIcons: Record<string, React.ElementType> = {
  introduction: FileText,
  definitions: Database,
  "information-we-collect": Eye,
  "how-we-use-information": Globe,
  "lawful-basis": ShieldCheck,
  "information-sharing": Lock,
  "data-security": Shield,
  cookies: Cookie,
  "data-retention": Clock,
  "your-rights": UserCheck,
  "international-transfers": Plane,
  "childrens-privacy": Baby,
  "data-breach": AlertTriangle,
  "third-party-links": ExternalLink,
  changes: RefreshCw,
  "contact-us": Phone,
};

/* Simple markdown-like bold parser */
const renderText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

const PrivacyPolicyContent = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [tocOpen, setTocOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 }
    );

    privacySections.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background print:py-8">
      <div className="container mx-auto px-4">
        {/* Print & last-updated bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">ISO 27001 Certified</span>
            </div>
            <span className="text-sm text-muted-foreground">Last Updated: {LAST_UPDATED}</span>
          </div>
          <button
            onClick={() => window.print()}
            className="print:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-all"
          >
            <Printer className="w-4 h-4" />
            Print this page
          </button>
        </div>

        <div className="flex gap-10 max-w-[1200px] mx-auto">
          {/* Desktop Sidebar TOC */}
          <aside className="hidden lg:block w-72 flex-shrink-0 print:hidden">
            <div className="sticky top-28">
              <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-1 max-h-[65vh] overflow-y-auto overlay-scrollbar pr-1">
                  {privacySections.map((s) => {
                    const Icon = sectionIcons[s.id] || FileText;
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                        <span className="truncate">
                          {s.number}. {s.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Mobile TOC Dropdown */}
          <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50 print:hidden">
            <div className={`rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-elevated transition-all duration-300 ${tocOpen ? "max-h-[70vh]" : "max-h-14"} overflow-hidden`}>
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-foreground"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Table of Contents
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              </button>
              {tocOpen && (
                <nav className="px-3 pb-4 space-y-0.5 max-h-[55vh] overflow-y-auto">
                  {privacySections.map((s) => {
                    const Icon = sectionIcons[s.id] || FileText;
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{s.number}. {s.title}</span>
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="max-w-[800px] space-y-12">
              {privacySections.map((section) => {
                const Icon = sectionIcons[section.id] || FileText;
                return (
                  <article
                    key={section.id}
                    id={section.id}
                    ref={(el) => { sectionRefs.current[section.id] = el; }}
                    className="scroll-mt-32 group"
                  >
                    {/* Section heading */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                        {section.number}. {section.title}
                      </h2>
                    </div>

                    {/* Section body */}
                    <div className="space-y-4 pl-0 md:pl-[52px]">
                      {section.content.map((para, i) => {
                        if (para.startsWith("### ")) {
                          return (
                            <h3
                              key={i}
                              className="font-heading text-lg font-semibold text-foreground mt-8 mb-3 first:mt-0"
                            >
                              {para.slice(4)}
                            </h3>
                          );
                        }
                        if (para.startsWith("• ")) {
                          return (
                            <div key={i} className="flex items-start gap-3 py-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                              <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed">
                                {renderText(para.slice(2))}
                              </p>
                            </div>
                          );
                        }
                        return (
                          <p key={i} className="text-[15px] md:text-base text-muted-foreground leading-[1.75]">
                            {renderText(para)}
                          </p>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <div className="mt-10 border-b border-border/40" />
                  </article>
                );
              })}

              {/* Bottom CTA */}
              <div className="rounded-2xl bg-gradient-hero p-8 md:p-10 text-center print:hidden">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
                  Have Questions About Your Data?
                </h3>
                <p className="text-white/70 mb-6 max-w-lg mx-auto">
                  We're committed to transparency and protecting your privacy. Reach out to our team for any data-related inquiries.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-[1.02] shadow-soft"
                  >
                    Contact Us
                    <Phone className="w-4 h-4" />
                  </Link>
                  <a
                    href="mailto:info@eqourse.com"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                  >
                    info@eqourse.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;
