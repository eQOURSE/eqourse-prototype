import { Mail, Linkedin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const socials = [
  { icon: Mail, href: "mailto:info@eqourse.com", label: "Email", color: "hover:bg-primary hover:text-primary-foreground" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-[#0077B5] hover:text-white" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-[#E4405F] hover:text-white" },
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-[#1877F2] hover:text-white" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-[#FF0000] hover:text-white" },
  { icon: Twitter, href: "#", label: "X (Twitter)", color: "hover:bg-foreground hover:text-background" },
];

const FloatingSocialBar = () => {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-0.5">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className={`w-10 h-10 flex items-center justify-center bg-card border border-border/50 text-muted-foreground transition-all duration-300 first:rounded-tr-lg last:rounded-br-lg shadow-card ${s.color}`}
        >
          <s.icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};

export default FloatingSocialBar;
