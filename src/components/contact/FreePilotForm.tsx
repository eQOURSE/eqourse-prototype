import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, UploadCloud, X } from "lucide-react";

const FreePilotForm = () => {
  const [pilotType, setPilotType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      <div id="pilot-form" className="max-w-3xl mx-auto bg-card rounded-2xl p-12 shadow-card border border-border text-center reveal-up">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-primary animate-float" />
        </div>
        <h3 className="text-3xl font-bold font-heading text-foreground mb-4">Request Received!</h3>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you! Your pilot request has been successfully submitted. Our team will review your requirements and contact you within 24-48 hours to confirm the scope and timeline.
        </p>
      </div>
    );
  }

  return (
    <div id="pilot-form" className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-elevated border border-border/50 reveal-up relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-primary" />
      
      <div className="text-center mb-10">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Request Your Free Pilot</h3>
        <p className="text-muted-foreground mt-2">Fill out the details below to get started with your customized sample.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 rounded-lg">
            <label htmlFor="pfName" className="text-sm font-medium text-foreground">Full Name <span className="text-destructive">*</span></label>
            <input id="pfName" required type="text" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Your Full Name" />
          </div>
          <div className="space-y-2 rounded-lg">
            <label htmlFor="pfEmail" className="text-sm font-medium text-foreground">Work Email <span className="text-destructive">*</span></label>
            <input id="pfEmail" required type="email" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="your.name@company.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 rounded-lg">
            <label htmlFor="pfCompany" className="text-sm font-medium text-foreground">Company / Organisation <span className="text-destructive">*</span></label>
            <input id="pfCompany" required type="text" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Company Name" />
          </div>
          <div className="space-y-2 rounded-lg">
            <label htmlFor="pfDesignation" className="text-sm font-medium text-foreground">Designation <span className="text-destructive">*</span></label>
            <select id="pfDesignation" defaultValue="" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow cursor-pointer" required>
              <option value="" disabled>Select Your Designation</option>
              <option value="Executive">Executive (C-Level, VP, Director)</option>
              <option value="Manager">Manager / Head</option>
              <option value="Engineer">Engineer / Developer / Analyst</option>
              <option value="Educator">Educator / Instructional Designer</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Pilot Type Selection */}
        <div className="space-y-3 pt-4">
          <label className="text-sm font-medium text-foreground block">Pilot Type <span className="text-destructive">*</span></label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['EdTech Content Pilot', 'AI Data Services Pilot', 'Both (Content + Data)'].map((type) => (
              <label 
                key={type} 
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${pilotType === type ? 'border-primary bg-primary/5 shadow-soft ring-1 ring-primary' : 'border-border hover:border-primary/50 bg-background'}`}
              >
                <input 
                  type="radio" 
                  name="pilotType" 
                  value={type} 
                  onChange={(e) => setPilotType(e.target.value)} 
                  className="w-4 h-4 text-primary focus:ring-primary border-border"
                  required
                />
                <span className="ml-3 font-medium text-foreground text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditional Service Detail */}
        {pilotType && (
          <div className="space-y-2 rounded-lg animate-fade-in-up">
            <label htmlFor="serviceDetail" className="text-sm font-medium text-foreground">Service Detail <span className="text-destructive">*</span></label>
            <select id="serviceDetail" defaultValue="" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow cursor-pointer" required>
              <option value="" disabled>Select specific service...</option>
              {pilotType.includes('EdTech') || pilotType === 'Both (Content + Data)' ? (
                <optgroup label="EdTech Focus">
                  <option value="K-12">K-12 Content (specify grade & subject below)</option>
                  <option value="Curriculum">Curriculum Design</option>
                  <option value="Assessment">Assessment / Question Bank</option>
                  <option value="Exam Prep">Exam Prep (specify exam below)</option>
                  <option value="Video">Video Script / Storyboard</option>
                  <option value="Localization">Localization / Translation</option>
                  <option value="Other EdTech">Other EdTech</option>
                </optgroup>
              ) : null}
              {pilotType.includes('AI') || pilotType === 'Both (Content + Data)' ? (
                <optgroup label="AI Data Focus">
                  <option value="NLP">NLP Annotation (NER, Sentiment, Intent, etc.)</option>
                  <option value="CV">Computer Vision (Bounding Box, Segmentation, etc.)</option>
                  <option value="Audio">Audio / Speech (Transcription, Diarisation, etc.)</option>
                  <option value="RLHF">RLHF Annotation (Preference Ranking, Safety Labeling)</option>
                  <option value="Collection">Data Collection (Text, Audio, Image, Video)</option>
                  <option value="Cleaning">Data Cleaning & Validation</option>
                  <option value="Other AI">Other AI Data</option>
                </optgroup>
              ) : null}
            </select>
          </div>
        )}

        <div className="space-y-2 rounded-lg">
          <label htmlFor="languages" className="text-sm font-medium text-foreground">Language(s) Required</label>
          <input id="languages" type="text" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="e.g. Hindi, English, Tamil" />
        </div>

        <div className="space-y-2 rounded-lg">
          <label htmlFor="pfMessage" className="text-sm font-medium text-foreground">Brief Project Description <span className="text-destructive">*</span></label>
          <textarea id="pfMessage" rows={5} className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" placeholder="Describe your use case, data type, volume, and any specific requirements..." required></textarea>
        </div>

        {/* File Upload */}
        <div className="space-y-2 pt-2">
          <label className="text-sm font-medium text-foreground">Upload Reference File (Optional)</label>
          
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex items-center justify-between bg-card border border-border p-4 rounded-lg">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-primary/10 text-primary rounded">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button type="button" onClick={clearFile} className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1">Drag & drop a file here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">Accepted formats: .pdf, .docx, .csv, .json, .zip (Max: 10MB)</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.xlsx,.csv,.json,.txt,.zip"
                />
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="mt-2">
                  Browse Files
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 text-center">
          <Button type="submit" size="lg" className="w-full md:w-1/2 bg-primary hover:bg-primary/90 text-lg py-6 shadow-soft hover:shadow-card transition-all" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Submit Pilot Request"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FreePilotForm;
