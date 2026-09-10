import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, ArrowUp, ArrowDown, FileDown, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageHeader from "../components/PageHeader";
import { adminApi } from "../lib/api";
import { getSubCategory } from "../lib/sampleHierarchy";
import type { Sample } from "../lib/types";
import { toast } from "sonner";
import { downloadAttachment } from "../lib/excel";

export default function SampleTabFiles() {
  const { mainCategoryId, pageSlug } = useParams();
  const navigate = useNavigate();
  const match = getSubCategory(pageSlug ?? "");

  const [activeTab, setActiveTab] = useState(0);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Sample | null>(null);

  if (!match) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Sub-category not found. <Button variant="link" onClick={() => navigate("/admin/sample-categories")}>Go back</Button>
      </div>
    );
  }

  const { main, sub } = match;
  const currentTabName = sub.tabs[activeTab];

  const refresh = async () => {
    setLoading(true);
    try {
      const list = await adminApi.listSamplesByPage(sub.slug, currentTabName);
      setSamples(list);
    } catch {
      setSamples([]);
    }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { refresh(); }, [sub.slug, currentTabName]);

  const move = async (sample: Sample, dir: -1 | 1) => {
    const idx = samples.findIndex((s) => s.id === sample.id);
    const swap = samples[idx + dir];
    if (!swap) return;
    await Promise.all([
      adminApi.reorderSample(sample.id, swap.order),
      adminApi.reorderSample(swap.id, sample.order),
    ]);
    refresh();
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    await adminApi.deleteSample(confirmDelete.id);
    toast.success("File removed");
    setConfirmDelete(null);
    refresh();
  };

  const SubIcon = sub.icon;

  return (
    <div className="p-8">
      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/samples/${mainCategoryId}`)} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to {main.label}
      </Button>

      <PageHeader
        title={sub.label}
        description={`Manage sample files for each tab. Files uploaded here appear on the public /${sub.slug} page.`}
        actions={
          <Button onClick={() => navigate(`/admin/samples/${mainCategoryId}/${pageSlug}/${encodeURIComponent(currentTabName)}/new`)}>
            <Upload className="w-4 h-4 mr-2" /> Upload file
          </Button>
        }
      />

      {/* Tab pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sub.tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(i); }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              i === activeTab
                ? "text-white border-transparent shadow-sm"
                : "bg-card border-border/60 text-foreground/70 hover:border-foreground/30 hover:text-foreground"
            }`}
            style={i === activeTab ? { backgroundColor: main.accentColor } : undefined}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* File list */}
      {loading ? (
        <Card className="p-12 text-center text-muted-foreground">Loading…</Card>
      ) : samples.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center" style={{ backgroundColor: `${main.accentColor}15` }}>
            <SubIcon className="w-8 h-8" style={{ color: main.accentColor }} />
          </div>
          <p className="text-muted-foreground">No files uploaded for <strong>{currentTabName}</strong> yet.</p>
          <Button
            size="sm"
            onClick={() => navigate(`/admin/samples/${mainCategoryId}/${pageSlug}/${encodeURIComponent(currentTabName)}/new`)}
          >
            <Plus className="w-4 h-4 mr-1.5" /> Upload first file
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {samples.map((s, i) => (
            <Card key={s.id} className="p-4 flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="ghost" disabled={i === 0} onClick={() => move(s, -1)} className="h-7 w-7 p-0">
                  <ArrowUp className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="ghost" disabled={i === samples.length - 1} onClick={() => move(s, 1)} className="h-7 w-7 p-0">
                  <ArrowDown className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="w-20 h-14 bg-muted rounded overflow-hidden flex-shrink-0">
                {s.thumbnailUrl && <img src={s.thumbnailUrl} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${main.accentColor}15`, color: main.accentColor }}>
                    File {i + 1} of {samples.length}
                  </span>
                  {s.fileType && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{s.fileType}</span>
                  )}
                </div>
                <h4 className="font-medium mt-1 truncate">{s.title}</h4>
                {s.description && <p className="text-xs text-muted-foreground truncate">{s.description}</p>}
              </div>
              <div className="flex items-center gap-1">
                {s.fileUrl && (
                  <Button size="sm" variant="ghost" onClick={() => downloadAttachment(s.fileUrl, s.title)}>
                    <FileDown className="w-4 h-4" />
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/samples/${mainCategoryId}/${pageSlug}/${encodeURIComponent(currentTabName)}/${s.id}`)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(s)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove file?</AlertDialogTitle>
            <AlertDialogDescription>"{confirmDelete?.title}" will be permanently removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
