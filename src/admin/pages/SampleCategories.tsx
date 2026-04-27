import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageHeader from "../components/PageHeader";
import { adminApi } from "../lib/api";
import type { SampleCategory } from "../lib/types";
import { toast } from "sonner";

export default function SampleCategories() {
  const navigate = useNavigate();
  const [items, setItems] = useState<SampleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<SampleCategory | null>(null);

  const refresh = async () => {
    setLoading(true);
    setItems(await adminApi.listSampleCategories());
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  const handleDelete = async (force = false) => {
    if (!confirmDelete) return;
    try {
      await adminApi.deleteSampleCategory(confirmDelete.id, { force });
      toast.success("Category deleted");
      setConfirmDelete(null);
      refresh();
    } catch (e) {
      if (e instanceof Error && e.message === "category_not_empty") {
        const ok = confirm(
          `This category contains ${confirmDelete.sampleCount} sample(s). Delete the category and all its samples?`
        );
        if (ok) handleDelete(true);
      } else {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Sample Categories"
        description="Group samples into categories — e.g. Kindergarten to K5, Middle School. Each category gets its own page on the public site."
        actions={
          <Button onClick={() => navigate("/admin/sample-categories/new")}>
            <Plus className="w-4 h-4 mr-2" /> New category
          </Button>
        }
      />

      {loading ? (
        <Card className="p-12 text-center text-muted-foreground">Loading…</Card>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">
          No sample categories yet. Click "New category" to create one.
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => (
            <Card key={c.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted">
                {c.thumbnailUrl && <img src={c.thumbnailUrl} alt={c.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">/{c.slug}</p>
                </div>
                {c.description && <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>}
                <div className="text-xs text-muted-foreground">
                  {c.sampleCount ?? 0} {c.sampleCount === 1 ? "sample" : "samples"}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate(`/admin/sample-categories/${c.id}/samples`)}>
                    <FolderOpen className="w-4 h-4 mr-1.5" /> Manage samples
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/sample-categories/${c.id}`)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(c)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>"{confirmDelete?.name}" will be removed from the public site.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(false)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
