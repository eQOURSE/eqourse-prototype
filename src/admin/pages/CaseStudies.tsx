import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageHeader from "../components/PageHeader";
import { PublishBadge } from "../components/StatusBadge";
import { adminApi } from "../lib/api";
import type { CaseStudy } from "../lib/types";
import { toast } from "sonner";

export default function CaseStudies() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<CaseStudy | null>(null);

  const refresh = async () => {
    setLoading(true);
    setItems(await adminApi.listCaseStudies());
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  const togglePublish = async (c: CaseStudy) => {
    const next = c.status === "published" ? "draft" : "published";
    await adminApi.setCaseStudyStatus(c.id, next);
    toast.success(next === "published" ? "Published" : "Moved to draft");
    refresh();
  };
  const handleDelete = async () => {
    if (!confirmDelete) return;
    await adminApi.deleteCaseStudy(confirmDelete.id);
    toast.success("Case study deleted");
    setConfirmDelete(null);
    refresh();
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Case Studies"
        description="Showcase client outcomes on the public site."
        actions={
          <Button onClick={() => navigate("/admin/case-studies/new")}>
            <Plus className="w-4 h-4 mr-2" /> New case study
          </Button>
        }
      />
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-32"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">Loading…</TableCell></TableRow>
            ) : items.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No case studies yet.</TableCell></TableRow>
            ) : (
              items.map((c) => (
                <TableRow key={c.id} className="hover:bg-muted/40">
                  <TableCell>
                    <div className="w-14 h-10 rounded-md bg-muted overflow-hidden">
                      {c.heroImageUrl && <img src={c.heroImageUrl} alt="" className="w-full h-full object-cover" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/case-studies/${c.id}`} className="font-medium hover:text-primary">{c.title}</Link>
                    <div className="text-xs text-muted-foreground">/{c.slug}</div>
                  </TableCell>
                  <TableCell className="text-sm">{c.client}</TableCell>
                  <TableCell className="text-sm">{c.industry}</TableCell>
                  <TableCell><PublishBadge status={c.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(c.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => togglePublish(c)}>
                        {c.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/case-studies/${c.id}`)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(c)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete case study?</AlertDialogTitle>
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
