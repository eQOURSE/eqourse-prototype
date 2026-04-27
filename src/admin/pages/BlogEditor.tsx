import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "../components/PageHeader";
import ImageUpload from "../components/ImageUpload";
import { PublishBadge } from "../components/StatusBadge";
import { adminApi, slugify } from "../lib/api";
import type { BlogPost, PublishStatus } from "../lib/types";
import { toast } from "sonner";

const empty: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  coverImageUrl: "",
  body: "",
  bodyFormat: "markdown",
  tags: [],
  author: { name: "eQourse Editorial" },
  seo: {},
  status: "draft",
};

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";
  const [form, setForm] = useState(empty);
  const [tagsText, setTagsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(isNew);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isNew) return;
    adminApi.getBlog(id!).then((b) => {
      if (!b) {
        toast.error("Blog not found");
        navigate("/admin/blogs");
        return;
      }
      setForm(b);
      setTagsText(b.tags.join(", "));
      setSlugTouched(true);
      setLoaded(true);
    });
  }, [id, isNew, navigate]);

  const setField = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleTitleChange = (v: string) => {
    setField("title", v);
    if (!slugTouched) setField("slug", slugify(v));
  };

  const save = async (publishOverride?: PublishStatus) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
        status: publishOverride ?? form.status,
        publishedAt: (publishOverride ?? form.status) === "published" ? (form.publishedAt ?? new Date().toISOString()) : undefined,
        readingMinutes: Math.max(1, Math.ceil(form.body.split(/\s+/).length / 200)),
      };
      if (!payload.title) { toast.error("Title is required"); return; }
      if (!payload.coverImageUrl) { toast.error("Cover image is required"); return; }

      if (isNew) {
        const created = await adminApi.createBlog(payload);
        toast.success("Blog created");
        navigate(`/admin/blogs/${created.id}`, { replace: true });
      } else {
        await adminApi.updateBlog(id!, payload);
        setForm((f) => ({ ...f, status: payload.status }));
        toast.success("Saved");
      }
    } catch (e) {
      toast.error(e instanceof Error && e.message === "slug_taken" ? "Slug already in use" : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <div className="p-8 text-muted-foreground">Loading…</div>;

  return (
    <div className="p-8 max-w-5xl">
      <Button variant="ghost" size="sm" onClick={() => navigate("/admin/blogs")} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to blogs
      </Button>
      <PageHeader
        title={isNew ? "New blog post" : "Edit blog post"}
        description={isNew ? "Draft a new article for the public site." : undefined}
        actions={
          <div className="flex items-center gap-2">
            <PublishBadge status={form.status} />
            {form.status === "published" ? (
              <Button variant="outline" onClick={() => save("draft")} disabled={saving}>
                <EyeOff className="w-4 h-4 mr-2" /> Unpublish
              </Button>
            ) : (
              <Button variant="outline" onClick={() => save("published")} disabled={saving || isNew}>
                <Eye className="w-4 h-4 mr-2" /> Publish
              </Button>
            )}
            <Button onClick={() => save()} disabled={saving}>
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div>
            <Label>Title *</Label>
            <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="A compelling headline" />
          </div>
          <div>
            <Label>Slug *</Label>
            <Input
              value={form.slug}
              onChange={(e) => { setSlugTouched(true); setField("slug", e.target.value); }}
              placeholder="my-blog-post"
            />
            <p className="text-xs text-muted-foreground mt-1">URL: /blog/{form.slug || "your-slug"}</p>
          </div>
          <div>
            <Label>Excerpt</Label>
            <Textarea value={form.excerpt} onChange={(e) => setField("excerpt", e.target.value)} rows={2}
              placeholder="Short summary shown in blog listings (≤300 chars)" maxLength={300} />
          </div>
          <div>
            <Label>Body (Markdown) *</Label>
            <Textarea
              value={form.body}
              onChange={(e) => setField("body", e.target.value)}
              rows={18}
              className="font-mono text-sm"
              placeholder="# Heading&#10;&#10;Write your article in markdown…"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Markdown is rendered on the public site. For a rich-text editor (TipTap), see the integration guide.
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <ImageUpload
              value={form.coverImageUrl}
              onChange={(url) => setField("coverImageUrl", url)}
              kind="blog-cover"
              label="Cover image *"
            />
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <Label>Tags</Label>
              <Input value={tagsText} onChange={(e) => setTagsText(e.target.value)}
                placeholder="edtech, ai, content (comma-separated)" />
            </div>
            <div>
              <Label>Author name</Label>
              <Input value={form.author.name}
                onChange={(e) => setField("author", { ...form.author, name: e.target.value })} />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h4 className="font-medium text-sm">SEO</h4>
            <div>
              <Label>Meta title</Label>
              <Input value={form.seo.title ?? ""}
                onChange={(e) => setField("seo", { ...form.seo, title: e.target.value })} />
            </div>
            <div>
              <Label>Meta description</Label>
              <Textarea rows={3} value={form.seo.description ?? ""}
                onChange={(e) => setField("seo", { ...form.seo, description: e.target.value })} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
