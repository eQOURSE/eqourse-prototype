import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Eye, EyeOff, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "../components/PageHeader";
import ImageUpload from "../components/ImageUpload";
import { PublishBadge } from "../components/StatusBadge";
import { adminApi, slugify } from "../lib/api";
import type { CaseStudy, PublishStatus } from "../lib/types";
import { toast } from "sonner";

const empty: Omit<CaseStudy, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  slug: "",
  client: "",
  industry: "",
  heroImageUrl: "",
  summary: "",
  challenge: "",
  solution: "",
  results: "",
  metrics: [],
  tags: [],
  bodyFormat: "markdown",
  seo: {},
  status: "draft",
};

export default function CaseStudyEditor() {
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
    adminApi.getCaseStudy(id!).then((c) => {
      if (!c) { toast.error("Not found"); navigate("/admin/case-studies"); return; }
      setForm(c);
      setTagsText(c.tags.join(", "));
      setSlugTouched(true);
      setLoaded(true);
    });
  }, [id, isNew, navigate]);

  const setField = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (v: string) => {
    setField("title", v);
    if (!slugTouched) setField("slug", slugify(v));
  };

  const addMetric = () => setField("metrics", [...form.metrics, { label: "", value: "" }]);
  const updateMetric = (i: number, patch: Partial<{ label: string; value: string }>) => {
    const next = form.metrics.map((m, idx) => (idx === i ? { ...m, ...patch } : m));
    setField("metrics", next);
  };
  const removeMetric = (i: number) => setField("metrics", form.metrics.filter((_, idx) => idx !== i));

  const save = async (publishOverride?: PublishStatus) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
        status: publishOverride ?? form.status,
        publishedAt: (publishOverride ?? form.status) === "published" ? (form.publishedAt ?? new Date().toISOString()) : undefined,
      };
      if (!payload.title) return toast.error("Title required");
      if (!payload.client) return toast.error("Client required");
      if (!payload.heroImageUrl) return toast.error("Hero image required");

      if (isNew) {
        const created = await adminApi.createCaseStudy(payload);
        toast.success("Case study created");
        navigate(`/admin/case-studies/${created.id}`, { replace: true });
      } else {
        await adminApi.updateCaseStudy(id!, payload);
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
      <Button variant="ghost" size="sm" onClick={() => navigate("/admin/case-studies")} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to case studies
      </Button>
      <PageHeader
        title={isNew ? "New case study" : "Edit case study"}
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
            <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
          </div>
          <div>
            <Label>Slug *</Label>
            <Input value={form.slug} onChange={(e) => { setSlugTouched(true); setField("slug", e.target.value); }} />
            <p className="text-xs text-muted-foreground mt-1">URL: /case-studies/{form.slug || "your-slug"}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Client *</Label>
              <Input value={form.client} onChange={(e) => setField("client", e.target.value)} placeholder="Confidential EdTech" />
            </div>
            <div>
              <Label>Industry</Label>
              <Input value={form.industry} onChange={(e) => setField("industry", e.target.value)} placeholder="EdTech, AI, Healthcare…" />
            </div>
          </div>
          <div>
            <Label>Summary</Label>
            <Textarea rows={2} value={form.summary} onChange={(e) => setField("summary", e.target.value)}
              placeholder="One-paragraph overview shown on the listing." />
          </div>
          <div>
            <Label>Challenge (Markdown)</Label>
            <Textarea rows={5} value={form.challenge} onChange={(e) => setField("challenge", e.target.value)}
              className="font-mono text-sm" placeholder="What problem did the client face?" />
          </div>
          <div>
            <Label>Solution (Markdown)</Label>
            <Textarea rows={5} value={form.solution} onChange={(e) => setField("solution", e.target.value)}
              className="font-mono text-sm" placeholder="How did we approach it?" />
          </div>
          <div>
            <Label>Results (Markdown)</Label>
            <Textarea rows={5} value={form.results} onChange={(e) => setField("results", e.target.value)}
              className="font-mono text-sm" placeholder="What outcomes did we deliver?" />
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <ImageUpload value={form.heroImageUrl} onChange={(url) => setField("heroImageUrl", url)}
              kind="case-study-hero" label="Hero image *" />
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label>Key metrics</Label>
              <Button type="button" size="sm" variant="ghost" onClick={addMetric}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Add
              </Button>
            </div>
            {form.metrics.length === 0 && <p className="text-xs text-muted-foreground">No metrics yet. Examples: "Cycle time → -30%".</p>}
            <div className="space-y-2">
              {form.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input placeholder="Label" value={m.label}
                    onChange={(e) => updateMetric(i, { label: e.target.value })} />
                  <Input placeholder="Value" value={m.value}
                    onChange={(e) => updateMetric(i, { value: e.target.value })} />
                  <Button type="button" size="sm" variant="ghost" onClick={() => removeMetric(i)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <Label>Tags</Label>
              <Input value={tagsText} onChange={(e) => setTagsText(e.target.value)}
                placeholder="ai, edtech (comma-separated)" />
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
