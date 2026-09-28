import { getEventBySlug } from "@/components/events/eventsData";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Loader2, CheckCircle, AlertCircle, ChevronsUpDown, Check, Globe2 } from "lucide-react";
import { submitContactForm } from "@/lib/publicApi";
import { trackRoboticsEvent } from "@/lib/roboticsAnalytics";
import { countryDialCodes, countryFlag } from "@/data/countryDialCodes";
import { cn } from "@/lib/utils";

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const isEventReferral = searchParams.get("interest") === "events";
  const referredEvent = getEventBySlug(searchParams.get("event") || "");
  const isRoboticsReferral = searchParams.get("service") === "robotics-training-data";
  const formStartTracked = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [selectedCountryIso, setSelectedCountryIso] = useState("IN");
  const [useCustomDialCode, setUseCustomDialCode] = useState(false);
  const [customDialCode, setCustomDialCode] = useState("");

  const selectedCountry = countryDialCodes.find((country) => country.iso2 === selectedCountryIso);
  const phoneCode = useCustomDialCode ? `+${customDialCode}` : selectedCountry?.dialCode ?? "+91";

  const handleFormStart = () => {
    if (!isRoboticsReferral || formStartTracked.current) return;
    formStartTracked.current = true;
    trackRoboticsEvent("robotics_form_start", {
      form_type: "contact",
      source_page: "robotics-training-data-services",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const get = (id: string) => (form.querySelector(`#${id}`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? "";

    const result = await submitContactForm({
      name: get("fullName"),
      email: get("email"),
      phone: get("phone"),
      phone_code: phoneCode,
      company: get("company"),
      designation: get("designation"),
      subject: get("interest"),
      message: get("message"),
      source: get("source"),
      preferredDate: get("date"),
      preferredTime: get("time"),
    });

    setIsSubmitting(false);
    if (result.ok) {
      setIsSuccess(true);
    } else {
      setError(result.error);
    }
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
    <form onSubmit={handleSubmit} onFocusCapture={handleFormStart} className="space-y-5 animate-fade-in-up">
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
          <div className="flex min-w-0 border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary/50 transition-shadow bg-background">
            <Popover open={countryPickerOpen} onOpenChange={setCountryPickerOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  role="combobox"
                  aria-expanded={countryPickerOpen}
                  aria-label="Select country calling code"
                  className="flex h-10 w-[118px] shrink-0 items-center gap-1.5 rounded-l-lg border-r border-border bg-muted px-2.5 text-sm transition-colors hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/40"
                >
                  {useCustomDialCode ? (
                    <Globe2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  ) : (
                    <span className="text-base leading-none" aria-hidden="true">
                      {selectedCountry ? countryFlag(selectedCountry.iso2) : "🌐"}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate text-left font-medium">
                    {useCustomDialCode ? "Other" : selectedCountry?.dialCode}
                  </span>
                  <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[min(340px,calc(100vw-2rem))] p-0">
                <Command>
                  <CommandInput placeholder="Search country or calling code…" />
                  <CommandList>
                    <CommandEmpty>No matching country found. Choose “Other” below.</CommandEmpty>
                    <CommandGroup heading="Countries and territories">
                      {countryDialCodes.map((country) => (
                        <CommandItem
                          key={country.iso2}
                          value={`${country.name} ${country.dialCode} ${country.iso2}`}
                          onSelect={() => {
                            setSelectedCountryIso(country.iso2);
                            setUseCustomDialCode(false);
                            setCountryPickerOpen(false);
                          }}
                          className="gap-2 py-2"
                        >
                          <span className="w-6 text-base" aria-hidden="true">{countryFlag(country.iso2)}</span>
                          <span className="min-w-0 flex-1 truncate">{country.name}</span>
                          <span className="text-xs font-semibold text-muted-foreground">{country.dialCode}</span>
                          <Check
                            className={cn(
                              "h-4 w-4 text-primary",
                              !useCustomDialCode && selectedCountryIso === country.iso2 ? "opacity-100" : "opacity-0",
                            )}
                            aria-hidden="true"
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Can’t find your code?">
                      <CommandItem
                        value="Other custom manual calling code"
                        onSelect={() => {
                          setUseCustomDialCode(true);
                          setCountryPickerOpen(false);
                        }}
                        className="gap-2 py-2"
                      >
                        <Globe2 className="h-4 w-4 text-primary" aria-hidden="true" />
                        <span className="flex-1">Other — enter code manually</span>
                        <Check className={cn("h-4 w-4 text-primary", useCustomDialCode ? "opacity-100" : "opacity-0")} aria-hidden="true" />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {useCustomDialCode && (
              <div className="flex h-10 w-[92px] shrink-0 items-center border-r border-border bg-muted/40 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/40">
                <span className="pl-2 text-sm font-semibold text-muted-foreground" aria-hidden="true">+</span>
                <input
                  id="customDialCode"
                  required
                  type="text"
                  inputMode="numeric"
                  value={customDialCode}
                  onChange={(event) => setCustomDialCode(event.target.value.replace(/\D/g, "").slice(0, 5))}
                  pattern="[0-9]{1,5}"
                  title="Enter the digits in your international calling code, for example 358"
                  placeholder="Code"
                  aria-label="Custom country calling code"
                  className="h-full min-w-0 flex-1 bg-transparent px-1 text-sm font-medium focus:outline-none"
                />
              </div>
            )}
            <input
              id="phone"
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="Phone number"
              className="h-10 min-w-0 flex-1 rounded-r-lg bg-transparent px-3 focus:outline-none"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {useCustomDialCode
              ? "Enter your international calling code, then your local phone number."
              : `${selectedCountry?.name ?? "India"} calling code selected. Search to choose another country.`}
          </p>
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
            defaultValue={isEventReferral ? "Event Meeting" : isRoboticsReferral ? "Robotics / Physical AI Data" : ""}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow cursor-pointer"
          >
            <option value="" disabled>Select Service Category</option>
            <optgroup label="--- Content Services ---">
              <option value="Custom E-Learning">Custom E-Learning Content (K-12 / Higher Ed)</option>
              <option value="Curriculum">Curriculum Development & Lesson Planning</option>
              <option value="Assessment">Assessment & Question Bank Development</option>
              <option value="Exam Prep">Exam Preparation Content (SAT, IELTS, TOEFL, CEFR, etc.)</option>
              <option value="Video Solutions">E-Learning Video Solutions (2D/3D, Storyline, PPT)</option>
              <option value="Localization">Localization & Translation Services</option>
              <option value="LMS">LMS Course Builds & Technology Solutions</option>
              <option value="SME">Subject Matter Expert (SME) Services</option>
              <option value="Accessibility">Accessibility Services (Remediation & Compliance)</option>
              <option value="Talent Assessment">Talent Assessment & Workforce Evaluation</option>
            </optgroup>
            <optgroup label="--- AI Data Services ---">
              <option value="Robotics / Physical AI Data">Robotics & Physical AI Training Data</option>
              <option value="Data Collection">AI Training Data Collection</option>
              <option value="NLP Annotation">Data Annotation & Labeling (NLP)</option>
              <option value="CV Annotation">Data Annotation & Labeling (Computer Vision)</option>
              <option value="Audio Annotation">Data Annotation & Labeling (Audio / Speech)</option>
              <option value="RLHF">RLHF Annotation for LLM Fine-Tuning</option>
              <option value="Data Cleaning">Data Cleaning & Validation</option>
              <option value="Model Testing">Real-World Model Testing (TuTrain Platform)</option>
            </optgroup>
            <optgroup label="--- Other ---">
              <option value="Event Meeting">Event / Business Tour Meeting</option>
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
          defaultValue={isEventReferral ? `I would like to meet eQOURSE${referredEvent ? ` during the ${referredEvent.title}` : " at an upcoming event"}. My preferred dates and project interests are: ` : ""}
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

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-fade-in-up">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

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
