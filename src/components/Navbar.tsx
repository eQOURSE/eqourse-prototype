import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { edtechCategories } from "@/components/edtech-solutions/shared/edtechNavData";

interface SubLink {
  label: string;
  to: string;
}

interface MainLink {
  label: string;
  to: string;
  dropdown?: SubLink[];
  megaMenu?: boolean;          // flag: use mega-menu instead of simple dropdown
}

const aiDataSubLinks: SubLink[] = [
  { label: "Data Collection", to: "/ai-data-services/data-collection" },
  { label: "Annotation & Labeling", to: "/ai-data-services/annotation-labeling" },
  { label: "Cleaning & Validation", to: "/ai-data-services/cleaning-validation" },
  { label: "Model Testing", to: "/ai-data-services/model-testing" },
];

const edtechSubLinks: SubLink[] = edtechCategories.map(c => ({
  label: c.label,
  to: c.href,
}));

const navLinks: MainLink[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/#about" },
  { label: "EdTech Solutions", to: "/edtech-solutions", dropdown: edtechSubLinks, megaMenu: true },
  { label: "AI Data Services", to: "/ai-data-services", dropdown: aiDataSubLinks },
  { label: "Samples", to: "/#services" },
  { label: "Case Studies", to: "/casestudy" },
  { label: "Blog", to: "/#blogs" },
  { label: "Contact Us", to: "/#contact" },
];

/* ─── EdTech Mega‑Menu (Desktop) ─── */
const EdTechMegaMenu = ({ onClose }: { onClose: () => void }) => {
  const [hoveredCat, setHoveredCat] = useState(0);
  const cat = edtechCategories[hoveredCat];
  const location = useLocation();

  return (
    <div
      className="absolute top-full -left-24 w-[780px] bg-card rounded-2xl border border-border/50 shadow-elevated animate-slide-up z-50 overflow-hidden"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="flex min-h-[370px]">
        {/* Left: Categories */}
        <div className="w-[260px] border-r border-border/40 py-3 bg-secondary/30 flex flex-col">
          <span className="px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">Services</span>
          {edtechCategories.map((c, i) => {
            const Icon = c.icon;
            const isActive = location.pathname.startsWith(c.href);
            return (
              <Link
                key={c.label}
                to={c.href}
                className={`flex items-center gap-3 px-5 py-2.5 text-left text-sm transition-all w-full group
                  ${hoveredCat === i ? "bg-primary/10 text-primary font-semibold" : isActive ? "text-primary/80" : "text-foreground/80 hover:text-primary hover:bg-primary/5"}`}
                onMouseEnter={() => setHoveredCat(i)}
                onClick={onClose}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 truncate">{c.label}</span>
                <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${hoveredCat === i ? "translate-x-0.5 text-primary" : "text-muted-foreground/40"}`} />
              </Link>
            );
          })}
          {/* View All link */}
          <Link
            to="/edtech-solutions"
            className="mt-auto mx-4 mb-3 flex items-center justify-center gap-2 text-xs font-semibold text-primary py-2 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors"
            onClick={onClose}
          >
            View All EdTech Solutions <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Right: Sub‑services of the hovered category */}
        <div className="flex-1 py-3 px-2">
          {/* Category title */}
          <Link
            to={cat.href}
            className="flex items-center gap-2 px-4 py-2 mb-1 text-sm font-bold text-foreground hover:text-primary transition-colors group"
            onClick={onClose}
          >
            <cat.icon className="w-4 h-4 text-primary" />
            {cat.label}
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </Link>

          <div className="grid grid-cols-2 gap-x-1">
            {cat.subServices.map((sub) => {
              const SubIcon = sub.icon;
              const isActive = location.pathname === sub.href;
              return (
                <Link
                  key={sub.href}
                  to={sub.href}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-sm transition-all group
                    ${isActive ? "bg-primary/10 text-primary font-medium" : "text-foreground/75 hover:bg-primary/5 hover:text-primary"}`}
                  onClick={onClose}
                >
                  {SubIcon && <SubIcon className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />}
                  <span className="truncate">{sub.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Mobile Accordion ─── */
const MobileEdTechAccordion = ({ onClose }: { onClose: () => void }) => {
  const [expandedCat, setExpandedCat] = useState<number | null>(null);
  const location = useLocation();

  return (
    <div className="pl-2 pb-2">
      {edtechCategories.map((cat, i) => {
        const Icon = cat.icon;
        const isExpanded = expandedCat === i;
        const isCatActive = location.pathname.startsWith(cat.href);
        return (
          <div key={cat.label}>
            <button
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-left transition-colors rounded-lg ${isCatActive ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"}`}
              onClick={() => setExpandedCat(isExpanded ? null : i)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{cat.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            {isExpanded && (
              <div className="pl-8 pb-1 animate-slide-up">
                <Link
                  to={cat.href}
                  className="block px-3 py-1.5 text-xs font-semibold text-primary hover:underline mb-1"
                  onClick={onClose}
                >
                  View All →
                </Link>
                {cat.subServices.map((sub) => {
                  const isActive = location.pathname === sub.href;
                  return (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${isActive ? "text-primary font-medium bg-primary/5" : "text-muted-foreground hover:text-primary"}`}
                      onClick={onClose}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── Navbar ─── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileEdTechOpen, setMobileEdTechOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(label);
  };

  const closeDropdownWithDelay = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="bg-gradient-primary py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-primary-foreground text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919214445870" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 - 92144 - 45870</span>
            </a>
            <a href="mailto:info@eqourse.com" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-3.5 h-3.5" />
              <span>info@eqourse.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            {["LinkedIn", "Instagram", "Facebook", "YouTube"].map((social) => (
              <a key={social} href="#" className="hover:opacity-80 transition-opacity text-xs font-medium">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-heading text-2xl font-extrabold text-gradient">
            eQOURSE
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => (link.dropdown || link.megaMenu) && openDropdown(link.label)}
                onMouseLeave={() => (link.dropdown || link.megaMenu) && closeDropdownWithDelay()}
              >
                <Link
                  to={link.to}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5 flex items-center gap-1"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Mega‑menu for EdTech */}
                {link.megaMenu && activeDropdown === link.label && (
                  <EdTechMegaMenu onClose={() => setActiveDropdown(null)} />
                )}

                {/* Simple dropdown for AI Data Services / others */}
                {link.dropdown && !link.megaMenu && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 w-60 bg-card rounded-xl border border-border/50 shadow-elevated p-2 animate-slide-up z-50">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/5">
              <Link to="/ai-data-services">Free Pilot</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-opacity">
              <Link to="/#contact">Get Started</Link>
            </Button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden glass border-t border-border/50 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.megaMenu ? (
                    /* EdTech accordion for mobile */
                    <>
                      <button
                        className="w-full px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-primary/5 flex items-center justify-between"
                        onClick={() => setMobileEdTechOpen(!mobileEdTechOpen)}
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileEdTechOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileEdTechOpen && <MobileEdTechAccordion onClose={() => setIsOpen(false)} />}
                    </>
                  ) : (
                    <>
                      <Link
                        to={link.to}
                        className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-primary/5 flex items-center justify-between"
                        onClick={() => !link.dropdown && setIsOpen(false)}
                      >
                        {link.label}
                        {link.dropdown && <ChevronDown className="w-4 h-4" />}
                      </Link>

                      {link.dropdown && (
                        <div className="pl-6 pb-1">
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.to}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <Button asChild className="mt-2 bg-gradient-primary border-0 text-primary-foreground">
                <Link to="/#contact" onClick={() => setIsOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
