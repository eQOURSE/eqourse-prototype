import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, UploadCloud, X, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FreePilotFormSection = () => {
  const [pilotType, setPilotType] = useState<string>("");
  const [serviceDetail, setServiceDetail] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset service detail when pilot type changes
  useEffect(() => {
    setServiceDetail("");
  }, [pilotType]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (f.size <= 10 * 1024 * 1024) setFile(f);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      if (f.size <= 10 * 1024 * 1024) setFile(f);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const edtechServices = [
    "K-12 Content (specify grade & subject in message)",
    "Curriculum Design / Outline",
    "Assessment / Question Bank / Mock Test",
    "Exam Prep Content (specify exam in message)",
    "Video Script / Storyboard",
    "Workbook / Worksheet Section",
    "Teacher Lesson Plan",
    "Localization / Translation Sample",
    "Other EdTech Content",
  ];

  const aiDataServices = [
    "NLP Annotation (NER, Sentiment, Intent, Relation Extraction)",
    "Computer Vision Annotation (Bounding Box, Segmentation, Keypoint)",
    "Audio / Speech Annotation (Transcription, Diarisation, Emotion)",
    "RLHF Annotation (Preference Ranking, Safety Labeling)",
    "Data Collection (Text, Audio, Image, or Video corpus)",
    "Data Cleaning & Validation",
    "Other AI Data Service",
  ];

  const designations = [
    "CEO/Founder/CTO",
    "VP/Director Content",
    "VP/Director Data/AI/ML",
    "Curriculum Head",
    "Product Manager",
    "Project Manager",
    "Data Science/ML Engineer",
    "Instructional Designer",
    "Teacher/Educator",
    "Student/Researcher",
    "Procurement/Vendor Manager",
    "Other",
  ];

  if (isSuccess) {
    return (
      <section className="py-24 bg-white" id="pilot-form">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative inline-flex mb-8">
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
                <CheckCircle className="w-14 h-14 text-primary" />
              </div>
              {/* Success rings */}
              <div className="absolute inset-0 w-28 h-28 rounded-full border-2 border-primary/20 animate-[pulse-ring_2s_ease-out_infinite]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4 animate-fade-in-up">
              Thank you! Your pilot request has been received.
            </h3>
            <p className="text-muted-foreground text-lg mb-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              Our team will contact you within 24–48 hours to confirm scope and timeline.
            </p>
            <Link
              to="/casestudy"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              Explore our case studies while you wait →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const inputClasses =
    "w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground/60";
  const labelClasses = "text-sm font-medium text-foreground flex items-center gap-1";

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="pilot-form" ref={sectionRef}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1B9AAA]/3 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Get Started</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Request Your <span className="text-gradient">Free Pilot</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Fill in the details below. We'll contact you within 24–48 hours to confirm scope and timeline.
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`max-w-[780px] mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-elevated border border-border/30 relative overflow-hidden transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Top Gradient Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-[#1B9AAA] to-primary" />

          {/* Decorative Sparkle */}
          <div className="absolute top-6 right-6 opacity-10">
            <Sparkles className="w-20 h-20 text-primary" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fpName" className={labelClasses}>
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input id="fpName" required type="text" className={inputClasses} placeholder="Your Full Name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="fpEmail" className={labelClasses}>
                  Work Email <span className="text-destructive">*</span>
                </label>
                <input id="fpEmail" required type="email" className={inputClasses} placeholder="your@company.com" />
              </div>
            </div>

            {/* Row 2: Company + Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fpCompany" className={labelClasses}>
                  Company / Organisation <span className="text-destructive">*</span>
                </label>
                <input id="fpCompany" required type="text" className={inputClasses} placeholder="Your Company Name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="fpDesignation" className={labelClasses}>
                  Your Designation <span className="text-destructive">*</span>
                </label>
                <select id="fpDesignation" required defaultValue="" className={`${inputClasses} cursor-pointer`}>
                  <option value="" disabled>
                    Select Designation
                  </option>
                  {designations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pilot Type Radio Buttons */}
            <div className="space-y-3 pt-2">
              <label className={labelClasses}>
                What Type of Pilot Do You Need? <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "EdTech Content Pilot", label: "EdTech Content Pilot", color: "primary" },
                  { value: "AI Data Services Pilot", label: "AI Data Services Pilot", color: "[#1B9AAA]" },
                  { value: "Both (Content + Data)", label: "Both (Content + Data)", color: "primary" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      pilotType === option.value
                        ? "border-primary bg-primary/5 shadow-soft ring-1 ring-primary/40"
                        : "border-border hover:border-primary/40 bg-background"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pilotType"
                      value={option.value}
                      checked={pilotType === option.value}
                      onChange={(e) => setPilotType(e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-border accent-[#00B4A6]"
                      required
                    />
                    <span className="ml-3 font-medium text-foreground text-sm">{option.label}</span>
                    {pilotType === option.value && (
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional Service Detail Dropdown */}
            {pilotType && (
              <div className="space-y-2 animate-fade-in-up">
                <label htmlFor="fpService" className={labelClasses}>
                  Specific Service <span className="text-destructive">*</span>
                </label>
                <select
                  id="fpService"
                  required
                  value={serviceDetail}
                  onChange={(e) => setServiceDetail(e.target.value)}
                  className={`${inputClasses} cursor-pointer`}
                >
                  <option value="" disabled>
                    Select specific service...
                  </option>
                  {(pilotType.includes("EdTech") || pilotType.includes("Both")) && (
                    <optgroup label="— EdTech Content Services —">
                      {edtechServices.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {(pilotType.includes("AI") || pilotType.includes("Both")) && (
                    <optgroup label="— AI Data Services —">
                      {aiDataServices.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>
            )}

            {/* Language */}
            <div className="space-y-2">
              <label htmlFor="fpLanguages" className={labelClasses}>
                Language(s) Required
              </label>
              <input id="fpLanguages" type="text" className={inputClasses} placeholder="e.g. Hindi, English, Tamil, Telugu" />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <label htmlFor="fpDescription" className={labelClasses}>
                Describe Your Use Case
              </label>
              <textarea
                id="fpDescription"
                rows={5}
                maxLength={2000}
                className={`${inputClasses} resize-none`}
                placeholder="Tell us about your project: what do you need, how many units, what format, what timeline, and any specific requirements or guidelines..."
                onChange={(e) => setCharCount(e.target.value.length)}
              />
              <p className="text-xs text-muted-foreground text-right">
                {charCount} / 2000
              </p>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className={labelClasses}>Upload Reference File (Optional)</label>
              <p className="text-xs text-muted-foreground mb-2">
                Upload any reference documents, annotation guidelines, style guides, or sample data. Accepted: .pdf, .doc, .docx, .xlsx, .csv, .json, .txt, .zip, .png, .jpg (Max: 10MB)
              </p>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-background hover:border-primary/40"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex items-center justify-between bg-card border border-border p-4 rounded-lg animate-scale-in">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="p-2 hover:bg-destructive/10 rounded-full text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <UploadCloud className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium mb-1">Drag & drop a file here, or click to browse</p>
                      <p className="text-xs text-muted-foreground">Max file size: 10 MB</p>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xlsx,.csv,.json,.txt,.zip,.png,.jpg"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="mt-1">
                      Browse Files
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-border/40 text-center">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-[400px] bg-primary hover:bg-[#009688] text-white text-lg py-7 rounded-xl shadow-soft hover:shadow-card transition-all duration-300 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Pilot Request"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FreePilotFormSection;
