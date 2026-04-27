import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "../components/PageHeader";
import ImageUpload from "../components/ImageUpload";
import { adminApi, slugify } from "../lib/api";
import type { SampleCategory } from "../lib/types";
import { toast } from "sonner";

const empty: Omit<SampleCategory, "id" | "createdAt" | "updatedAt" | "sampleCount"> = {
  name: "",
  slug: "",
  description: "",
  thumbnailUrl: "",
  order: 99,
};

export default function SampleCategoryEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(isNew);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isNew) return;
    adminApi.getSampleCategory(id!).then((c) => {
      if (!c) { toast.error("Not found"); navigate("/admin/sample-categories"); return; }
      setForm(c);
      setSlugTouched(true);
      setLoaded(true);
    });
  }, [id, isNew, navigate]);

  const setField = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleNameChange = (v: string) => {
    setField("name", v);
    if (!slugTouched) setField("slug", slugify(v));
  };

  const save = async () => {
    if (!form.name) return toast.error("Name required");
    setSaving(true);
    try {
      const payload = { ...form, slug: form.slug || slugify(form.name) };
      if (isNew) {
        const c = await adminApi.createSampleCategory(payload);
        toast.success("Category created");
        navigate(`/admin/sample-categories/${c.id}/samples`, { replace: true });
      } else {
        await adminApi.updateSampleCategory(id!, payload);
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
    <div className="p-8 max-w-3xl">
      <Button variant="ghost" size="sm" onClick={() => navigate("/admin/sample-categories")} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to categories
      </Button>
      <PageHeader
        title={isNew ? "New sample category" : "Edit category"}
        description="A category groups related samples — e.g. all K-5 content."
        actions={
          <Button onClick={save} disabled={saving}>
            <Save className="w-4 h-4 mr-2" /> Save
          </Button>
        }
      />

      <Card className="p-6 space-y-4">
        <div>
          <Label>Name *</Label>
          <Input value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Kindergarten to K5" />
        </div>
        <div>
          <Label>Slug *</Label>
          <Input value={form.slug} onChange={(e) => { setSlugTouched(true); setField("slug", e.target.value); }}
            placeholder="kindergarden-to-k5-samples" />
          <p className="text-xs text-muted-foreground mt-1">URL on public site: /samples/{form.slug || "your-slug"}</p>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={form.description ?? ""} onChange={(e) => setField("description", e.target.value)} rows={3}
            placeholder="Short description shown on the category landing page." />
        </div>
        <div>
          <Label>Display order</Label>
          <Input type="number" value={form.order} onChange={(e) => setField("order", Number(e.target.value))} className="w-32" />
          <p className="text-xs text-muted-foreground mt-1">Lower numbers appear first.</p>
        </div>
        <ImageUpload value={form.thumbnailUrl} onChange={(url) => setField("thumbnailUrl", url)}
          kind="category-thumbnail" label="Category thumbnail" />
      </Card>
    </div>
  );
}
