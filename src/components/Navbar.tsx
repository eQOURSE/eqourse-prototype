import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SubLink {
  label: string;
  to: string;
}

interface MainLink {
  label: string;
  to: string;
  dropdown?: SubLink[];
}

const aiDataSubLinks: SubLink[] = [
  { label: "Data Collection", to: "/ai-data-services/data-collection" },
  { label: "Annotation & Labeling", to: "/ai-data-services/annotation-labeling" },
  { label: "Cleaning & Validation", to: "/ai-data-services/cleaning-validation" },
  { label: "Model Testing", to: "/ai-data-services/model-testing" },
];

const navLinks: MainLink[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/#about" },
  { label: "EdTech Solutions", to: "/#services" },
  { label: "AI Data Services", to: "/ai-data-services", dropdown: aiDataSubLinks },
  { label: "Samples", to: "/#services" },
  { label: "Case Studies", to: "/#case-studies" },
  { label: "Blog", to: "/#blogs" },
  { label: "Contact Us", to: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
    }, 180);
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

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && openDropdown(link.label)}
                onMouseLeave={() => link.dropdown && closeDropdownWithDelay()}
              >
                <Link
                  to={link.to}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5 flex items-center gap-1"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {link.dropdown && activeDropdown === link.label && (
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

        {isOpen && (
          <div className="lg:hidden glass border-t border-border/50 animate-slide-up">
            <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.label}>
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
