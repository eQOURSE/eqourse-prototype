import { useState } from "react";
import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10";
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export default function CareerApplicationForm() {
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resume) return setError("Please attach your resume.");
    if (resume.size > MAX_RESUME_BYTES) return setError("Resume must be 5 MB or smaller.");
    setLoading(true);
    setError("");
    const form = event.currentTarget;
    const body = new FormData(form);
    body.set("resume", resume);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/api/careers/talent-pool/apply`, { method: "POST", body });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.message || "Submission failed.");
      setReceipt(payload.data.receiptId);
      form.reset();
      setResume(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to submit your profile.");
    } finally {
      setLoading(false);
    }
  };

  if (receipt) return (
    <div className="py-12 text-center" role="status">
      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-teal-600" />
      <h3 className="text-2xl font-bold text-slate-950">Your profile is saved</h3>
      <p className="mx-auto mt-3 max-w-lg text-slate-600">We will consider it for suitable future opportunities. A confirmation has been sent to your email.</p>
      <p className="mt-5 font-mono text-sm font-semibold text-teal-700">Reference: {receipt}</p>
      <Button type="button" variant="outline" className="mt-7" onClick={() => setReceipt("")}>Submit another profile</Button>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5" encType="multipart/form-data">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">Full name *<input className={`${inputClass} mt-2`} name="fullName" required /></label>
        <label className="text-sm font-semibold text-slate-700">Email *<input className={`${inputClass} mt-2`} name="email" type="email" required /></label>
        <label className="text-sm font-semibold text-slate-700">Phone<input className={`${inputClass} mt-2`} name="phone" type="tel" /></label>
        <label className="text-sm font-semibold text-slate-700">Location<input className={`${inputClass} mt-2`} name="location" placeholder="City, country" /></label>
        <label className="text-sm font-semibold text-slate-700">Highest qualification *<input className={`${inputClass} mt-2`} name="qualification" required /></label>
        <label className="text-sm font-semibold text-slate-700">Years of experience<input className={`${inputClass} mt-2`} name="experience" placeholder="e.g. 4 years" /></label>
        <label className="text-sm font-semibold text-slate-700">Current role<input className={`${inputClass} mt-2`} name="currentRole" /></label>
        <label className="text-sm font-semibold text-slate-700">Portfolio or LinkedIn<input className={`${inputClass} mt-2`} name="portfolioLink" type="url" placeholder="https://" /></label>
      </div>
      <label className="block text-sm font-semibold text-slate-700">Roles you are interested in<input className={`${inputClass} mt-2`} name="preferredRoles" placeholder="Data annotation, instructional design, project management" /></label>
      <label className="block text-sm font-semibold text-slate-700">Skills<input className={`${inputClass} mt-2`} name="skills" placeholder="Comma-separated skills" /></label>
      <label className="block text-sm font-semibold text-slate-700">Tell us where you could contribute<textarea className={`${inputClass} mt-2 min-h-28 resize-y`} name="message" /></label>
      <label className="flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-teal-300 bg-teal-50/60 px-5 text-center text-sm text-slate-700 transition hover:bg-teal-50">
        <UploadCloud className="h-6 w-6 text-teal-600" />
        <span>{resume ? resume.name : "Upload resume (PDF or Word, up to 5 MB) *"}</span>
        <input className="sr-only" name="resume" type="file" accept=".pdf,.doc,.docx" required onChange={(event) => { const file = event.target.files?.[0] || null; if (file && file.size > MAX_RESUME_BYTES) { setError("Resume must be 5 MB or smaller."); event.currentTarget.value = ""; setResume(null); return; } setError(""); setResume(file); }} />
      </label>
      {error && <p className="text-sm font-medium text-red-600" role="alert">{error}</p>}
      <Button disabled={loading} className="h-12 w-full bg-teal-600 text-white hover:bg-teal-700">
        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving profile…</> : "Join the talent pool"}
      </Button>
      <p className="text-xs leading-5 text-slate-500">By submitting, you allow eQOURSE to retain your profile for future recruitment. Submission does not guarantee employment.</p>
    </form>
  );
}
