import { useState } from "react";
import { Building2, CheckCircle2, FileCheck2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10";
const MAX_FILE_BYTES = 5 * 1024 * 1024;

export default function VendorRegistrationForm() {
  const [registrationDocument, setRegistrationDocument] = useState<File | null>(null);
  const [taxReturns, setTaxReturns] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!registrationDocument || taxReturns.length < 1) return setError("Registration and at least one recent tax document are required.");
    if (registrationDocument.size > MAX_FILE_BYTES || taxReturns.some((file) => file.size > MAX_FILE_BYTES)) return setError("Each uploaded document must be 5 MB or smaller.");
    const form = event.currentTarget;
    const body = new FormData(form);
    body.delete("taxReturns");
    body.set("registrationDocument", registrationDocument);
    taxReturns.forEach((file) => body.append("taxReturns", file));
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/api/careers/vendors/register`, { method: "POST", body });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.message || "Registration failed.");
      setReceipt(payload.data.receiptId);
      form.reset();
      setRegistrationDocument(null);
      setTaxReturns([]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to register the company.");
    } finally {
      setLoading(false);
    }
  };

  if (receipt) return (
    <div className="py-12 text-center" role="status">
      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-teal-600" />
      <h3 className="text-2xl font-bold text-slate-950">Registration received</h3>
      <p className="mx-auto mt-3 max-w-lg text-slate-600">Our team will verify the company and tax documents. Status updates will be sent by email.</p>
      <p className="mt-5 font-mono text-sm font-semibold text-teal-700">Reference: {receipt}</p>
      <Button type="button" variant="outline" className="mt-7" onClick={() => setReceipt("")}>Register another company</Button>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5" encType="multipart/form-data">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">Company name *<input className={`${inputClass} mt-2`} name="companyName" required /></label>
        <label className="text-sm font-semibold text-slate-700">Country of registration *<input className={`${inputClass} mt-2`} name="country" required /></label>
        <label className="text-sm font-semibold text-slate-700">Company registration number *<input className={`${inputClass} mt-2`} name="registrationNumber" required /></label>
        <label className="text-sm font-semibold text-slate-700">Tax/GST/VAT number<input className={`${inputClass} mt-2`} name="taxNumber" /></label>
        <label className="text-sm font-semibold text-slate-700">Website<input className={`${inputClass} mt-2`} name="website" type="url" placeholder="https://" /></label>
        <label className="text-sm font-semibold text-slate-700">Years in business<input className={`${inputClass} mt-2`} name="yearsInBusiness" type="number" min="0" /></label>
        <label className="text-sm font-semibold text-slate-700">Team size<input className={`${inputClass} mt-2`} name="teamSize" placeholder="e.g. 25–50" /></label>
        <label className="text-sm font-semibold text-slate-700">Primary contact name *<input className={`${inputClass} mt-2`} name="contactName" required /></label>
        <label className="text-sm font-semibold text-slate-700">Contact role<input className={`${inputClass} mt-2`} name="contactRole" /></label>
        <label className="text-sm font-semibold text-slate-700">Business email *<input className={`${inputClass} mt-2`} name="email" type="email" required /></label>
        <label className="text-sm font-semibold text-slate-700">Phone *<input className={`${inputClass} mt-2`} name="phone" type="tel" required /></label>
        <label className="text-sm font-semibold text-slate-700">Services offered *<input className={`${inputClass} mt-2`} name="services" required placeholder="Comma-separated capabilities" /></label>
      </div>
      <label className="block text-sm font-semibold text-slate-700">Capability summary *<textarea className={`${inputClass} mt-2 min-h-28 resize-y`} name="capabilitySummary" required placeholder="Delivery capacity, domains, languages, locations and relevant experience" /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-teal-300 bg-teal-50/60 p-4 text-center text-sm text-slate-700">
          <Building2 className="h-6 w-6 text-teal-600" /><span>{registrationDocument?.name || "Registration document *"}</span>
          <input className="sr-only" name="registrationDocument" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required onChange={(event) => { const file = event.target.files?.[0] || null; if (file && file.size > MAX_FILE_BYTES) { setError("Registration document must be 5 MB or smaller."); event.currentTarget.value = ""; setRegistrationDocument(null); return; } setError(""); setRegistrationDocument(file); }} />
        </label>
        <label className="flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-4 text-center text-sm text-slate-700">
          <FileCheck2 className="h-6 w-6 text-amber-600" /><span>{taxReturns.length ? `${taxReturns.length} tax document(s) selected` : "1–3 recent tax/ITR documents *"}</span>
          <input className="sr-only" name="taxReturns" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required onChange={(event) => { const files = Array.from(event.target.files || []); if (files.length > 3) { setError("Upload no more than three recent tax/ITR documents."); event.currentTarget.value = ""; setTaxReturns([]); return; } if (files.some((file) => file.size > MAX_FILE_BYTES)) { setError("Each tax/ITR document must be 5 MB or smaller."); event.currentTarget.value = ""; setTaxReturns([]); return; } setError(""); setTaxReturns(files); }} />
        </label>
      </div>
      {error && <p className="text-sm font-medium text-red-600" role="alert">{error}</p>}
      <Button disabled={loading} className="h-12 w-full bg-teal-600 text-white hover:bg-teal-700">
        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</> : "Submit company for verification"}
      </Button>
      <p className="text-xs leading-5 text-slate-500">Documents are collected for vendor due diligence. Registration does not create an agreement or guarantee project allocation.</p>
    </form>
  );
}
