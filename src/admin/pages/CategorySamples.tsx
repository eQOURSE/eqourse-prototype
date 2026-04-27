import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, ArrowUp, ArrowDown, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageHeader from "../components/PageHeader";
import { adminApi } from "../lib/api";
import type { Sample, SampleCategory } from "../lib/types";
import { toast } from "sonner";
import { downloadAttachment } from "../lib/excel";

export default function CategorySamples() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<SampleCategory | null>(null);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Sample | null>(null);

  const refresh = async () => {
    if (!categoryId) return;
    setLoading(true);
    const [cat, list] = await Promise.all([
      adminApi.getSampleCategory(categoryId),
      adminApi.listSamplesByCategory(categoryId),
    ]);
    if (!cat) { toast.error("Category not found"); navigate("/admin/sample-categories"); return; }
    setCategory(cat);
    setSamples(list);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, [categoryId]);

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
    toast.success("Sample removed");
    setConfirmDelete(null);
    refresh();
  };

  return (
    <div className="p-8">
      <Button variant="ghost" size="sm" onClick={() => navigate("/admin/sample-categories")} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to categories
      </Button>
      <PageHeader
        title={category ? `${category.name} — Samples` : "Samples"}
        description={
          category
            ? `Manage the samples shown on /samples/${category.slug}. Display labels (e.g. "Sample 2 of ${samples.length}") are derived from the order below.`
            : ""
        }
        actions={
          <Button onClick={() => navigate(`/admin/sample-categories/${categoryId}/samples/new`)}>
            <Plus className="w-4 h-4 mr-2" /> Add sample
          </Button>
        }
      />

      {loading ? (
        <Card className="p-12 text-center text-muted-foreground">Loading…</Card>
      ) : samples.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">
          No samples in this category yet. Add Course Books, Lesson Plans, Workbooks etc.
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
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    Sample {s.order} of {samples.length}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{s.type}</span>
                </div>
                <h4 className="font-medium mt-1 truncate">{s.title}</h4>
                {s.description && <p className="text-xs text-muted-foreground truncate">{s.description}</p>}
              </div>
              <div className="flex items-center gap-1">
                {s.fileUrl && (
                  <Button size="sm" variant="ghost" onClick={() => downloadAttachment(s.fileUrl, s.title + ".pdf")}>
                    <FileDown className="w-4 h-4" />
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/sample-categories/${categoryId}/samples/${s.id}`)}>
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
            <AlertDialogTitle>Remove sample?</AlertDialogTitle>
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
