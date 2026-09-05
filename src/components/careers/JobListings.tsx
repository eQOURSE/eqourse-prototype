import { useState, useEffect, useRef, useCallback } from "react";
import type { JobOpening, JobDepartment } from "../../admin/lib/types";
import { Briefcase, MapPin, Clock, Loader2, Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DEPARTMENTS: { value: JobDepartment | "all"; label: string }[] = [
  { value: "all", label: "All Departments" },
  { value: "ai-data", label: "AI Data Services" },
  { value: "content-services", label: "Content Services" },
  { value: "operations", label: "Operations" },
  { value: "marketing", label: "Marketing" },
  { value: "technology", label: "Technology" },
  { value: "hr", label: "HR" },
];

export default function JobListings({ onApplyClick, initialJobSlug }: { onApplyClick: (job: JobOpening) => void; initialJobSlug?: string }) {
  const [openings, setOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState<string>("all");
  const [locationSearch, setLocationSearch] = useState("");
  const openedSharedJob = useRef(false);
  const handledMissingSharedJob = useRef(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      // NOTE: Using the public endpoint path via the live client
      const qs = new URLSearchParams();
      if (department !== "all") qs.set("department", department);
      if (locationSearch) qs.set("location", locationSearch);
      qs.set("pageSize", "100");
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/api/careers?${qs}`);
      const data = await res.json();
      if (data.success) {
        setOpenings(data.data.items);
      }
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  }, [department, locationSearch]);

  useEffect(() => {
    const timer = setTimeout(fetchJobs, 400);
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  useEffect(() => {
    if (!initialJobSlug || openedSharedJob.current || openings.length === 0) return;
    const sharedJob = openings.find((job) => job.slug === initialJobSlug);
    if (sharedJob) {
      openedSharedJob.current = true;
      onApplyClick(sharedJob);
    }
  }, [initialJobSlug, onApplyClick, openings]);

  useEffect(() => {
    if (loading || !initialJobSlug || openedSharedJob.current || handledMissingSharedJob.current) return;
    handledMissingSharedJob.current = true;
    if (!openings.some((job) => job.slug === initialJobSlug)) {
      toast.error("This role is no longer open. View the current positions below.");
    }
  }, [initialJobSlug, loading, openings]);

  const copyJobLink = async (job: JobOpening) => {
    const url = new URL("/career", window.location.origin);
    url.searchParams.set("job", job.slug);
    url.hash = "open-positions";
    try {
      await navigator.clipboard.writeText(url.toString());
      toast.success("Shareable job link copied");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url.toString();
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      copied ? toast.success("Shareable job link copied") : toast.error("Could not copy the link");
    }
  };

  return (
    <div id="open-positions" className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          Open Positions
        </h2>
        <p className="text-lg text-slate-600">
          Join our team of experts and help shape the future of AI data and content services.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar gap-2">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.value}
              onClick={() => setDepartment(dept.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                department === dept.value
                  ? "bg-[#6BCB77] text-white shadow-md shadow-[#6BCB77]/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-[#6BCB77]/40 outline-none transition-all"
          />
        </div>
      </div>

      {/* Listings */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#6BCB77]" />
        </div>
      ) : openings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Openings Found</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            We don't have any open positions matching your criteria right now. Please check back later or try clearing your filters.
          </p>
          {(department !== "all" || locationSearch) && (
            <Button
              variant="outline"
              className="mt-6 border-slate-200"
              onClick={() => { setDepartment("all"); setLocationSearch(""); }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {openings.map((job) => (
            <div
              key={job.id}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#6BCB77]/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-[#6BCB77]/10 text-[#6BCB77] text-xs font-bold uppercase tracking-wider rounded-md">
                    {job.departmentLabel}
                  </span>
                  {job.experienceRange && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">
                      {job.experienceRange}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#6BCB77] transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {job.employmentType.replace("-", " ")}
                  </div>
                </div>
                <p className="mt-4 text-slate-600 text-sm line-clamp-2 md:max-w-2xl">
                  {job.description}
                </p>
              </div>

              <div className="flex shrink-0 flex-row gap-3 md:flex-col">
                <Button
                  onClick={() => onApplyClick(job)}
                  className="bg-[#6BCB77] hover:bg-[#5bb865] text-white shadow-md shadow-[#6BCB77]/20 flex-1 md:flex-none"
                >
                  Apply Now
                </Button>
                <Button variant="outline" onClick={() => copyJobLink(job)} aria-label={`Copy share link for ${job.title}`}>
                  <Share2 className="mr-2 h-4 w-4" /> Share role
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
