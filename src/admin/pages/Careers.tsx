import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminApi } from "../lib/api";
import type { JobOpening, JobStatus, JobDepartment } from "../lib/types";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Briefcase,
  MapPin,
  Users,
  Clock,
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Pause,
  Play,
  XCircle,
  Building2,
  UserRoundSearch,
} from "lucide-react";
import { toast } from "sonner";

const DEPT_LABELS: Record<JobDepartment, string> = {
  "ai-data": "AI Data",
  "content-services": "Content Services",
  operations: "Operations",
  marketing: "Marketing & BD",
  technology: "Technology",
  hr: "HR",
  other: "Other",
};

const STATUS_STYLES: Record<JobStatus, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Active" },
  paused: { bg: "bg-amber-100", text: "text-amber-700", label: "Paused" },
  closed: { bg: "bg-slate-100", text: "text-slate-500", label: "Closed" },
};

export default function AdminCareers() {
  const navigate = useNavigate();
  const [openings, setOpenings] = useState<JobOpening[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deptFilter, setDeptFilter] = useState<string>("all");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchOpenings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.listJobOpenings({
        status: statusFilter !== "all" ? statusFilter : undefined,
        department: deptFilter !== "all" ? deptFilter : undefined,
        q: search || undefined,
      });
      setOpenings(res.items);
      setTotal(res.total);
    } catch (err) {
      toast.error("Failed to load job openings");
    } finally {
      setLoading(false);
    }
  }, [deptFilter, search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchOpenings, 400);
    return () => clearTimeout(timer);
  }, [fetchOpenings]);

  const handleStatusChange = async (id: string, newStatus: JobStatus) => {
    try {
      await adminApi.updateJobOpening(id, { status: newStatus });
      toast.success(`Opening ${newStatus === "active" ? "activated" : newStatus === "paused" ? "paused" : "closed"}`);
      fetchOpenings();
    } catch {
      toast.error("Failed to update status");
    }
    setActiveMenu(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await adminApi.deleteJobOpening(id);
      toast.success("Opening deleted");
      fetchOpenings();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Cannot delete — has applications");
    }
    setActiveMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            Career Openings
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {total} {total === 1 ? "opening" : "openings"} total
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/talent-pool")}><UserRoundSearch className="mr-2 h-4 w-4" />Talent Pool</Button>
          <Button variant="outline" onClick={() => navigate("/admin/vendors")}><Building2 className="mr-2 h-4 w-4" />Vendors</Button>
          <Button onClick={() => navigate("/admin/careers/new")} className="bg-primary text-white"><Plus className="mr-2 h-4 w-4" />Create Opening</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search openings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-primary/40 outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
        >
          <option value="all">All Departments</option>
          {Object.entries(DEPT_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Openings Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : openings.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-1">No Openings Found</h3>
          <p className="text-muted-foreground text-sm mb-4">Create your first job opening to start hiring.</p>
          <Button onClick={() => navigate("/admin/careers/new")} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Create Opening
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {openings.map((job) => {
            const s = STATUS_STYLES[job.status];
            return (
              <div
                key={job.id}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow relative group"
              >
                {/* Status badge */}
                <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
                  {s.label}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold pr-16 mb-2 line-clamp-2">{job.title}</h3>

                {/* Meta */}
                <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    {job.departmentLabel}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {job.employmentType.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    {job.experienceRange ? ` • ${job.experienceRange}` : ""}
                  </div>
                </div>

                {/* Application count */}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">{job.applicationCount}</span>
                  <span className="text-muted-foreground">applicant{job.applicationCount !== 1 ? "s" : ""}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => navigate(`/admin/careers/${job.id}/applicants`)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> View Applicants
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigate(`/admin/careers/${job.id}`)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>

                  {/* More menu */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => setActiveMenu(activeMenu === job.id ? null : job.id)}
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </Button>
                    {activeMenu === job.id && (
                      <div className="absolute right-0 bottom-10 bg-card border border-border rounded-lg shadow-lg py-1 z-20 w-44">
                        {job.status !== "active" && (
                          <button
                            className="w-full px-3 py-2 text-left text-xs hover:bg-muted flex items-center gap-2"
                            onClick={() => handleStatusChange(job.id, "active")}
                          >
                            <Play className="w-3.5 h-3.5 text-emerald-600" /> Activate
                          </button>
                        )}
                        {job.status === "active" && (
                          <button
                            className="w-full px-3 py-2 text-left text-xs hover:bg-muted flex items-center gap-2"
                            onClick={() => handleStatusChange(job.id, "paused")}
                          >
                            <Pause className="w-3.5 h-3.5 text-amber-600" /> Pause
                          </button>
                        )}
                        {job.status !== "closed" && (
                          <button
                            className="w-full px-3 py-2 text-left text-xs hover:bg-muted flex items-center gap-2"
                            onClick={() => handleStatusChange(job.id, "closed")}
                          >
                            <XCircle className="w-3.5 h-3.5 text-slate-500" /> Close
                          </button>
                        )}
                        <button
                          className="w-full px-3 py-2 text-left text-xs hover:bg-red-50 text-red-600 flex items-center gap-2"
                          onClick={() => handleDelete(job.id, job.title)}
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
