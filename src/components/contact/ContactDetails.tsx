import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin as MapPinIcon, Mail as MailIcon, Phone as PhoneIcon, Clock as ClockIcon } from "lucide-react";

// Social Icons SVGs to avoid extra dependencies
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
)


const ContactDetails = () => {
  return (
    <div className="space-y-8">
      {/* Office Locations */}
      <div className="space-y-6">
        <h3 className="font-heading text-xl font-bold text-foreground border-b border-border pb-2">Office Locations</h3>
        
        {/* India Office */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-3 items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MapPinIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">India Office (Headquarters)</h4>
              <p className="text-sm text-muted-foreground mt-1">C-29, Indra Vihar, Shiv Jyoti School Road, Kota, Rajasthan, INDIA - 324005</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden h-[200px] bg-muted relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.8399583727283!2d75.86249561498305!3d25.1805309838936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9b1b4b5b4b5b%3A0x8b5b4b5b4b5b4b5b!2sC-29%2C%20Indra%20Vihar%2C%20Talwandi%2C%20Kota%2C%20Rajasthan%20324005!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-10"
              title="India Office Map"
            ></iframe>
            {/* Skeleton state underneath */}
            <div className="absolute inset-0 bg-gradient-to-r from-muted via-border to-muted animate-pulse z-0" />
          </div>
        </div>

        {/* Singapore Office */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-3 items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MapPinIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Singapore Office (Asia-Pacific)</h4>
              <p className="text-sm text-muted-foreground mt-1">760 Bedok Reservoir Road, #04-13, Waterfront Waves, Singapore - 479245</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden h-[200px] bg-muted relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.751351147754!2d103.92683051498877!3d1.3367123990426188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3d5b4b5b4b5b%3A0x8b5b4b5b4b5b4b5b!2s760%20Bedok%20Reservoir%20Rd%2C%20Singapore%20479245!5e0!3m2!1sen!2ssg!4v1620000000000!5m2!1sen!2ssg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-10"
              title="Singapore Office Map"
            ></iframe>
             <div className="absolute inset-0 bg-gradient-to-r from-muted via-border to-muted animate-pulse z-0" />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-foreground border-b border-border pb-2">Contact Information</h3>
        
        <div className="flex flex-col gap-4">
          <a href="mailto:info@eqourse.com" className="flex items-center gap-4 group p-2 -ml-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <MailIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Email Us</p>
              <p className="text-muted-foreground group-hover:text-primary transition-colors">info@eqourse.com</p>
            </div>
          </a>

          <div className="flex items-center gap-4 group p-2 -ml-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Call Us / WhatsApp</p>
              <div className="flex items-center gap-3 mt-1">
                <a href="tel:+919214445870" className="text-muted-foreground hover:text-primary transition-colors">+91 92144 - 45870</a>
                <a href="https://wa.me/919214445870" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-110 transition-transform">
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2 -ml-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <ClockIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Business Hours</p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="block"><strong className="text-foreground/80">India:</strong> Mon - Sat, 9:00 AM - 7:00 PM IST</span>
                <span className="block mt-0.5"><strong className="text-foreground/80">Singapore:</strong> Mon - Fri, 9:00 AM - 6:00 PM SGT</span>
              </p>
              <p className="text-xs text-primary mt-2 font-medium bg-primary/10 inline-block px-2 py-1 rounded">We typically respond within 24 business hours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-foreground border-b border-border pb-2">Connect With Us</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: linkedIn3D, name: "LinkedIn", href: "https://www.linkedin.com/company/eqourse" },
            { icon: facebook3D, name: "Facebook", href: "https://www.facebook.com/eQOURSE-102057078229490" },
            { icon: instagram3D, name: "Instagram", href: "https://www.instagram.com/eqourse/" },
            { icon: youtube3D, name: "YouTube", href: "https://www.youtube.com/@eqourse" },
            { icon: xTwitter3D, name: "X", href: "https://twitter.com/EQourse" },
          ].map((social) => (
            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="w-12 h-12 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-border/50 bg-white flex items-center justify-center group relative shadow-soft">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black/5 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
              <img src={social.icon} alt={social.name} className="w-[120%] h-[120%] object-cover scale-110 group-hover:scale-125 transition-transform duration-500" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }} />
            </a>
          ))}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="pt-6 flex flex-col gap-3">
        <Link to="/free-pilot" className="block w-full">
          <Button size="lg" className="w-full bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-[1.01]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 w-5 h-5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            Start Free Pilot
          </Button>
        </Link>
        <Link to="/samples" className="block w-full">
          <Button size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 transition-all hover:scale-[1.01]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 w-5 h-5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            View Our Samples
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetails;
