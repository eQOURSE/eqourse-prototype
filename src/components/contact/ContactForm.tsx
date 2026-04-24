import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-primary animate-float" />
        </div>
        <h3 className="text-2xl font-bold font-heading text-foreground mb-2">Thank You! We've received your inquiry.</h3>
        <p className="text-muted-foreground mb-6">Our team will respond within 24 business hours.</p>
        <a href="/samples" className="text-primary font-bold hover:underline transition-all">
          While you wait, explore our samples →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5 glow-border rounded-lg">
          <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name <span className="text-destructive">*</span></label>
          <input
            id="fullName"
            required
            minLength={2}
            type="text"
            placeholder="Your Full Name"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
        <div className="space-y-1.5 glow-border rounded-lg">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address <span className="text-destructive">*</span></label>
          <input
            id="email"
            required
            type="email"
            placeholder="your@email.com"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5 rounded-lg">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number <span className="text-destructive">*</span></label>
          <div className="flex border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary/50 transition-shadow overflow-hidden bg-background">
            <select className="px-2 py-2 bg-muted border-r border-border focus:outline-none text-sm w-[80px] cursor-pointer">
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+65">+65</option>
              <option value="+971">+971</option>
              <option value="+86">+86</option>
            </select>
            <input
              id="phone"
              required
              type="tel"
              placeholder="XXXXX XXXXX"
              className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        <div className="space-y-1.5 rounded-lg">
          <label htmlFor="company" className="text-sm font-medium text-foreground">Company / Organisation Name <span className="text-destructive">*</span></label>
          <input
            id="company"
            required
            type="text"
            placeholder="Company / Organisation Name"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5 rounded-lg">
          <label htmlFor="designation" className="text-sm font-medium text-foreground">Designation <span className="text-destructive">*</span></label>
          <select
            id="designation"
            required
            defaultValue=""
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow cursor-pointer"
          >
            <option value="" disabled>Select Your Designation</option>
            <option value="CEO">CEO / Founder / CTO</option>
            <option value="VP Content">VP / Director of Content</option>
            <option value="VP AI">VP / Director of Data / AI / ML</option>
            <option value="Curriculum Head">Curriculum / Content Head</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Project Manager">Project Manager</option>
            <option value="ML Engineer">Data Science / ML Engineer</option>
            <option value="Instructional Designer">Instructional Designer</option>
            <option value="Educator">Teacher / Educator</option>
            <option value="Student">Student / Researcher</option>
            <option value="Procurement">Procurement / Vendor Manager</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5 rounded-lg">
          <label htmlFor="interest" className="text-sm font-medium text-foreground">I'm Interested In <span className="text-destructive">*</span></label>
          <select
            id="interest"
            required
            defaultValue=""
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow cursor-pointer"
          >
            <option value="" disabled>Select Service Category</option>
            <optgroup label="--- EdTech Solutions ---">
              <option value="Custom E-Learning">Custom E-Learning Content (K-12 / Higher Ed)</option>
              <option value="Curriculum">Curriculum Development & Design</option>
              <option value="Assessment">Assessment & Question Bank Development</option>
              <option value="Exam Prep">Exam Preparation Content (SAT, IELTS, TOEFL, JEE, NEET)</option>
              <option value="Video Solutions">E-Learning Video Solutions (2D/3D, Storyline, PPT)</option>
              <option value="Localization">Localization (Translation, Voice Over, Subtitling)</option>
              <option value="LMS">LMS Course Builds / White Label LMS</option>
              <option value="SME">Subject Matter Expert Services</option>
              <option value="Corporate Training">Corporate Training / Learning Solutions</option>
            </optgroup>
            <optgroup label="--- AI Data Services ---">
              <option value="Data Collection">AI Training Data Collection</option>
              <option value="NLP Annotation">Data Annotation & Labeling (NLP)</option>
              <option value="CV Annotation">Data Annotation & Labeling (Computer Vision)</option>
              <option value="Audio Annotation">Data Annotation & Labeling (Audio / Speech)</option>
              <option value="RLHF">RLHF Annotation for LLM Fine-Tuning</option>
              <option value="Data Cleaning">Data Cleaning & Validation</option>
              <option value="Model Testing">Real-World Model Testing (TuTrain Platform)</option>
            </optgroup>
            <optgroup label="--- Other ---">
              <option value="Partnership">Partnership / Reseller Inquiry</option>
              <option value="Careers">Careers / Job Inquiry</option>
              <option value="General">General Inquiry</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5 rounded-lg">
          <label htmlFor="date" className="text-sm font-medium text-foreground">Preferred Date for Call <span className="text-xs text-muted-foreground">(Optional)</span></label>
          <input
            id="date"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-foreground"
          />
        </div>
        <div className="space-y-1.5 rounded-lg relative">
          <label htmlFor="time" className="text-sm font-medium text-foreground">Preferred Time <span className="text-xs text-muted-foreground ml-1">(Optional, IST)</span></label>
          <select
            id="time"
            defaultValue=""
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow cursor-pointer"
          >
            <option value="" disabled>Select Time</option>
            {Array.from({ length: 48 }).map((_, i) => {
              const hour = Math.floor(i / 2);
              const min = i % 2 === 0 ? "00" : "30";
              const ampm = hour >= 12 ? "PM" : "AM";
              const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
              return <option key={i} value={`${hour}:${min}`}>{`${displayHour}:${min} ${ampm}`}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="space-y-1.5 rounded-lg">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Tell Us About Your Project <span className="text-xs text-muted-foreground">(Optional)</span></label>
        <textarea
          id="message"
          rows={5}
          maxLength={2000}
          placeholder="Describe your project requirements, timeline, volume, languages needed, and any specific details..."
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
        ></textarea>
      </div>

      <div className="space-y-1.5 rounded-lg">
        <label htmlFor="source" className="text-sm font-medium text-foreground">How Did You Hear About Us? <span className="text-xs text-muted-foreground">(Optional)</span></label>
        <select
          id="source"
          defaultValue=""
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow cursor-pointer"
        >
          <option value="" disabled>Select an option</option>
          <option value="Google">Google Search</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral from a colleague</option>
          <option value="Event">Industry event / conference</option>
          <option value="Blog">Blog / Article</option>
          <option value="Social">Social Media (Facebook, Instagram, Twitter/X)</option>
          <option value="Directory">Clutch / GoodFirms / Directory listing</option>
          <option value="YouTube">YouTube</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-soft hover:shadow-card transition-all"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
