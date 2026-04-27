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
import type { BlogPost } from "../lib/types";
import { toast } from "sonner";

export default function Blogs() {
  const navigate = useNavigate();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<BlogPost | null>(null);

  const refresh = async () => {
    setLoading(true);
    setItems(await adminApi.listBlogs());
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const togglePublish = async (b: BlogPost) => {
    const next = b.status === "published" ? "draft" : "published";
    await adminApi.setBlogStatus(b.id, next);
    toast.success(next === "published" ? "Published" : "Moved to draft");
    refresh();
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    await adminApi.deleteBlog(confirmDelete.id);
    toast.success("Blog deleted");
    setConfirmDelete(null);
    refresh();
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Blogs"
        description="Create and manage blog posts shown on the public site."
        actions={
          <Button onClick={() => navigate("/admin/blogs/new")}>
            <Plus className="w-4 h-4 mr-2" />
            New blog post
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-32"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Loading…</TableCell></TableRow>
            ) : items.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No blog posts yet. Click "New blog post" to create one.</TableCell></TableRow>
            ) : (
              items.map((b) => (
                <TableRow key={b.id} className="hover:bg-muted/40">
                  <TableCell>
                    <div className="w-14 h-10 rounded-md bg-muted overflow-hidden">
                      {b.coverImageUrl && <img src={b.coverImageUrl} alt="" className="w-full h-full object-cover" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/blogs/${b.id}`} className="font-medium hover:text-primary">{b.title}</Link>
                    <div className="text-xs text-muted-foreground">/{b.slug}</div>
                  </TableCell>
                  <TableCell><PublishBadge status={b.status} /></TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {b.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted">{t}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(b.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => togglePublish(b)} title={b.status === "published" ? "Unpublish" : "Publish"}>
                        {b.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/blogs/${b.id}`)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(b)}>
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
            <AlertDialogTitle>Delete blog post?</AlertDialogTitle>
            <AlertDialogDescription>
              "{confirmDelete?.title}" will be permanently removed.
            </AlertDialogDescription>
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
