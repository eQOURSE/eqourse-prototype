import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Eye, EyeOff, Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  relatedLinks: [],
  bodyFormat: "markdown",
  seo: {},
  status: "draft",
};

const PREDEFINED_SERVICES = [
  {
    group: "AI Data Services",
    items: [
      { label: "AI Data Services Overview", href: "/ai-data-services" },
      { label: "AI Data Collection", href: "/ai-data-services/data-collection" },
      { label: "Data Annotation & Labeling", href: "/ai-data-services/annotation-labeling" },
      { label: "Data Cleaning & Validation", href: "/ai-data-services/cleaning-validation" },
      { label: "AI Model Testing", href: "/ai-data-services/model-testing" },
    ],
  },
  {
    group: "Content Services",
    items: [
      { label: "Content Services Overview", href: "/content-services" },
      { label: "Custom E-Learning Content", href: "/custom-e-learning-content" },
      { label: "Exam Preparation Content", href: "/test-prep-content" },
      { label: "Learning Solutions", href: "/learning-solutions" },
      { label: "E-Learning Video Solutions", href: "/elearning-video-solutions" },
      { label: "Localization Services", href: "/localization-services" },
      { label: "Technology Solutions", href: "/technology-solutions" },
      { label: "Subject Matter Experts", href: "/smes" },
      { label: "Accessibility Services", href: "/accessibility" },
      { label: "Talent Assessment & Workforce Evaluation", href: "/talent-assessment-workforce-evaluation" },
    ],
  },
];

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
      setForm({
        ...c,
        relatedLinks: c.relatedLinks || [],
      });
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

  const togglePredefinedService = (label: string, href: string) => {
    const links = form.relatedLinks || [];
    const exists = links.some((l) => l.href === href);
    if (exists) {
      setField("relatedLinks", links.filter((l) => l.href !== href));
    } else {
      setField("relatedLinks", [...links, { label, href }]);
    }
  };

  const isPredefined = (href: string) =>
    PREDEFINED_SERVICES.some((group) => group.items.some((item) => item.href === href));

  const addCustomLink = () => {
    const links = form.relatedLinks || [];
    setField("relatedLinks", [...links, { label: "", href: "" }]);
  };

  const updateCustomLink = (indexInCustoms: number, patch: Partial<{ label: string; href: string }>) => {
    const links = form.relatedLinks || [];
    let customCount = 0;
    const nextLinks = links.map((link) => {
      if (!isPredefined(link.href)) {
        if (customCount === indexInCustoms) {
          const updated = { ...link, ...patch };
          customCount++;
          return updated;
        }
        customCount++;
      }
      return link;
    });
    setField("relatedLinks", nextLinks);
  };

  const removeCustomLink = (indexInCustoms: number) => {
    const links = form.relatedLinks || [];
    let customCount = 0;
    const nextLinks = links.filter((link) => {
      if (!isPredefined(link.href)) {
        if (customCount === indexInCustoms) {
          customCount++;
          return false;
        }
        customCount++;
      }
      return true;
    });
    setField("relatedLinks", nextLinks);
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
              <Input value={form.client} onChange={(e) => setField("client", e.target.value)} placeholder="Confidential Content Services" />
            </div>
            <div>
              <Label>Industry</Label>
              <Input value={form.industry} onChange={(e) => setField("industry", e.target.value)} placeholder="Content Services, AI, Healthcare…" />
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
                placeholder="ai, content services (comma-separated)" />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h4 className="font-medium text-sm">Services Used (Internal SEO Links)</h4>
            
            {PREDEFINED_SERVICES.map((group) => (
              <div key={group.group} className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                  {group.group}
                </div>
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const checked = (form.relatedLinks || []).some((l) => l.href === item.href);
                    return (
                      <div key={item.href} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${item.href}`}
                          checked={checked}
                          onCheckedChange={() => togglePredefinedService(item.label, item.href)}
                        />
                        <label
                          htmlFor={`service-${item.href}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {item.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium text-xs text-muted-foreground">Custom Related Links</Label>
                <Button type="button" size="sm" variant="ghost" onClick={addCustomLink}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-2">
                {(() => {
                  const customs = (form.relatedLinks || []).filter((l) => !isPredefined(l.href));
                  if (customs.length === 0) {
                    return (
                      <p className="text-xs text-muted-foreground">
                        No custom links yet.
                      </p>
                    );
                  }
                  return customs.map((link, idx) => (
                    <div key={idx} className="space-y-1 p-2 border rounded-md relative bg-secondary/20">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                          Custom Link #{idx + 1}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeCustomLink(idx)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <Input
                          placeholder="Label (e.g., About Us)"
                          value={link.label}
                          onChange={(e) => updateCustomLink(idx, { label: e.target.value })}
                          className="h-8 text-xs"
                        />
                        <Input
                          placeholder="URL / Path (e.g., /aboutus)"
                          value={link.href}
                          onChange={(e) => updateCustomLink(idx, { href: e.target.value })}
                          className="h-8 text-xs font-mono"
                        />
                      </div>
                    </div>
                  ));
                })()}
              </div>
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
