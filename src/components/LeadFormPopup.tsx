import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = ["SME", "Vendor", "CXO/Co-founder", "School/Institution", "AI Data Client"];

const LeadFormPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("leadFormDismissed");
      if (!dismissed) setIsOpen(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("leadFormDismissed", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-elevated border border-border/50 overflow-hidden animate-scale-in">
        {/* Header gradient */}
        <div className="bg-gradient-primary p-6 text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
          <h3 className="font-heading text-xl font-bold text-primary-foreground">Let's Connect</h3>
          <p className="text-primary-foreground/80 text-sm mt-1">Tell us about your project</p>
        </div>

        <div className="p-6 space-y-4">
          <Input placeholder="Your Name" className="bg-background border-border" />
          <Input type="email" placeholder="Email Address" className="bg-background border-border" />
          <Input type="tel" placeholder="Phone Number" className="bg-background border-border" />

          <Select>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role.toLowerCase().replace(/\//g, "-")}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea placeholder="Your message..." className="bg-background border-border min-h-[80px]" />

          <Button className="w-full bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all">
            Submit <Send className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadFormPopup;
