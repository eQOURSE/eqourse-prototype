import { useEffect, useState } from "react";
import { BrainCircuit, ChevronLeft, ChevronRight, Download, Loader2, Mail, MapPin, Save, Search, UserRoundSearch } from "lucide-react";
import { adminApi } from "../lib/api";
import type { ApplicationStatus, TalentProfile } from "../lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const statuses: ApplicationStatus[] = ["applied", "shortlisted", "rejected", "hired"];

export default function TalentPool() {
  const [items, setItems] = useState<TalentProfile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [smart, setSmart] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.listTalentProfiles({ status, q: search, page, pageSize: 20 });
      setItems(data.items); setTotal(data.total); setSmart(false);
    } catch { toast.error("Could not load talent profiles"); }
    finally { setLoading(false); }
  };

  useEffect(() => { const timer = setTimeout(load, 300); return () => clearTimeout(timer); }, [page, search, status]); // eslint-disable-line react-hooks/exhaustive-deps

  const runSmartFilter = async (event: React.FormEvent) => {
    event.preventDefault(); if (!query.trim()) return;
    setLoading(true);
    try { const data = await adminApi.smartFilterTalentProfiles(query); setItems(data.items); setTotal(data.total); setSmart(true); }
    catch { toast.error("AI filter could not complete"); }
    finally { setLoading(false); }
  };

  const update = async (record: TalentProfile, patch: { status?: ApplicationStatus; internalNotes?: string }) => {
    try {
      const saved = await adminApi.updateTalentProfile(record.id, patch);
      setItems((current) => current.map((item) => item.id === record.id ? saved : item));
      toast.success("Talent profile updated");
    } catch { toast.error("Could not update profile"); }
  };

  return <div className="space-y-6">
    <header><h1 className="flex items-center gap-2 text-2xl font-bold"><UserRoundSearch className="h-6 w-6 text-primary" />Interested candidates</h1><p className="mt-1 text-sm text-muted-foreground">{total} retained talent profiles with resumes and searchable hiring context.</p></header>
    <form onSubmit={runSmartFilter} className="flex gap-2 rounded-xl border bg-card p-3">
      <BrainCircuit className="mt-2.5 h-5 w-5 text-primary" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" placeholder="Ask AI: Find multilingual annotators in India with 3+ years’ experience" /><Button disabled={loading}>Smart filter</Button>
    </form>
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} className="w-full rounded-lg border bg-background py-2.5 pl-9 pr-3 text-sm" placeholder="Search name, skills, role, qualification…" /></label>
      <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border bg-background px-4 py-2 text-sm"><option value="all">All statuses</option>{statuses.map((value) => <option key={value}>{value}</option>)}</select>
      {smart && <Button variant="outline" onClick={load}>Clear AI filter</Button>}
    </div>
    {loading ? <Loader2 className="mx-auto my-20 h-8 w-8 animate-spin text-primary" /> : items.length === 0 ? <div className="rounded-xl border bg-card py-16 text-center text-muted-foreground">No matching talent profiles.</div> : <div className="space-y-4">{items.map((record) => <TalentCard key={record.id} record={record} onUpdate={update} />)}</div>}
    {!smart && total > 20 && <div className="flex items-center justify-end gap-3"><Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft className="h-4 w-4" />Previous</Button><span className="text-sm">Page {page} of {Math.ceil(total / 20)}</span><Button variant="outline" size="sm" disabled={page >= Math.ceil(total / 20)} onClick={() => setPage((value) => value + 1)}>Next<ChevronRight className="h-4 w-4" /></Button></div>}
  </div>;
}

function TalentCard({ record, onUpdate }: { record: TalentProfile; onUpdate: (record: TalentProfile, patch: { status?: ApplicationStatus; internalNotes?: string }) => void }) {
  const [notes, setNotes] = useState(record.internalNotes);
  const downloadResume = async () => {
    try { await adminApi.downloadTalentResume(record.id, record.resumeFile?.originalName || "resume"); }
    catch (cause) { toast.error(cause instanceof Error ? cause.message : "Could not download resume"); }
  };
  return <article className="rounded-xl border bg-card p-5 shadow-sm">
    <div className="flex flex-col justify-between gap-5 lg:flex-row">
      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-bold">{record.fullName}</h2><span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold capitalize text-primary">{record.status}</span><span className="font-mono text-xs text-muted-foreground">{record.receiptId}</span></div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"><a className="flex items-center gap-1 hover:text-primary" href={`mailto:${record.email}`}><Mail className="h-4 w-4" />{record.email}</a>{record.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{record.location}</span>}</div>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3"><Info label="Preferred roles" value={record.preferredRoles.join(", ")} /><Info label="Current role" value={record.currentRole} /><Info label="Experience" value={record.experience} /><Info label="Qualification" value={record.qualification} /><Info label="Skills" value={record.skills.join(", ")} /><Info label="Candidate note" value={record.message} /></dl>
      </div>
      <div className="w-full space-y-3 border-t pt-4 lg:w-72 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        {record.resumeFile && <button type="button" onClick={downloadResume} className="flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"><Download className="h-4 w-4" />{record.resumeFile.originalName || "Resume"}</button>}
        <select value={record.status} onChange={(event) => onUpdate(record, { status: event.target.value as ApplicationStatus })} className="w-full rounded-lg border bg-background px-3 py-2 text-sm">{statuses.map((value) => <option key={value}>{value}</option>)}</select>
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-24 w-full resize-y rounded-lg border bg-background p-3 text-sm" placeholder="Private HR remark" />
        <Button variant="outline" className="w-full" onClick={() => onUpdate(record, { internalNotes: notes })}><Save className="mr-2 h-4 w-4" />Save remark</Button>
      </div>
    </div>
  </article>;
}

function Info({ label, value }: { label: string; value?: string }) { return value ? <div><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt><dd className="mt-1 leading-6">{value}</dd></div> : null; }
