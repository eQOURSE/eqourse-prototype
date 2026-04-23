import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const departments = [
  "EdTech — Subject Matter Expert / Faculty",
  "EdTech — Content Writer / Developer",
  "EdTech — Instructional Designer",
  "EdTech — Video / Animation Producer",
  "AI Data — Data Annotator / Labeler",
  "AI Data — NLP / Linguistics Specialist",
  "AI Data — Computer Vision Annotator",
  "AI Data — Audio / Speech Data Specialist",
  "AI Data — Quality Assurance / Validator",
  "AI Data — Project Manager",
  "Operations / Admin",
  "Marketing / Business Development",
  "Technology / Engineering",
  "Other"
];

const CareerApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    experience: "",
    portfolioLink: "",
    coverLetter: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Application Submitted Successfully!");
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          fullName: "", email: "", phone: "", department: "", experience: "", portfolioLink: "", coverLetter: ""
        });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-24 bg-secondary/30 relative z-10" id="apply">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-[2rem] shadow-xl border border-border/50">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-3">Apply to eQOURSE</h2>
            <p className="text-muted-foreground">Select your vertical and join our journey today.</p>
          </div>

          {isSuccess ? (
            <div className="py-16 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                 <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
              <p className="text-muted-foreground">Our HR team will review your profile and get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                    placeholder="+91 90000 00000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department / Role <span className="text-red-500">*</span></label>
                  <select
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background focus:ring-2 focus:ring-primary/50 transition-all outline-none appearance-none"
                  >
                    <option value="" disabled>Select a department</option>
                    {departments.map((dept, i) => (
                      <option key={i} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    min="0"
                    step="0.5"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                    placeholder="e.g. 5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Portfolio / LinkedIn URL</label>
                  <input
                    type="url"
                    name="portfolioLink"
                    value={formData.portfolioLink}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                    placeholder="https://"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Letter / Note</label>
                <textarea
                  name="coverLetter"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background focus:ring-2 focus:ring-primary/50 transition-all outline-none resize-y"
                  placeholder="Tell us why you are a great fit..."
                ></textarea>
              </div>

              {/* Resume Upload - Visual Only */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Resume (PDF/Doc) <span className="text-red-500">*</span></label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors bg-background">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 text-primary mb-2 opacity-80" />
                    <p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                  </div>
                  <input type="file" required className="hidden" accept=".pdf,.doc,.docx" />
                </label>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:opacity-90 border-0 text-white shadow-soft rounded-xl py-6 text-lg"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerApplicationForm;
