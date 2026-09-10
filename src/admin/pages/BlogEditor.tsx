import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "../components/PageHeader";
import ImageUpload from "../components/ImageUpload";
import { PublishBadge } from "../components/StatusBadge";
import { adminApi, slugify } from "../lib/api";
import type { BlogCategorySelection, BlogPost, PublishStatus } from "../lib/types";
import { aiDataServicesCategories } from "@/components/ai-data-services/shared/aiDataServicesNavData";
import { contentServicesCategories } from "@/components/content-services/shared/contentServicesNavData";
import { toast } from "sonner";

const hrefValue = (href: string) => href.replace(/^\/+|\/+$/g, "").split("/").pop() ?? "";

const BLOG_TAXONOMY = [
  { label: "Content Services", value: "content-services", categories: contentServicesCategories },
  { label: "AI Data Services", value: "ai-data-services", categories: aiDataServicesCategories },
];

const empty: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  coverImageUrl: "",
  body: "",
  bodyFormat: "markdown",
  tags: [],
  categories: [],
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
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState("");

  useEffect(() => {
    if (isNew) return;
    adminApi.getBlog(id!).then((b) => {
      if (!b) {
        toast.error("Blog not found");
        navigate("/admin/blogs");
        return;
      }
      const categories = b.categories ?? [];
      setForm({ ...b, categories });
      setActiveCategory(categories[0]?.category ?? "");
      setActiveSubcategory(categories[0]?.subcategories[0]?.subcategory ?? "");
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

  const categorySelections = form.categories ?? [];
  const activeTopCategory = BLOG_TAXONOMY.find((category) => category.value === activeCategory);
  const categoryOptions = activeTopCategory?.categories ?? [];
  const activeSelection = categorySelections.find((selection) => selection.category === activeCategory);
  const subcategoryOptions = categoryOptions;
  const subSubcategoryOptions = categoryOptions.find((subcategory) => hrefValue(subcategory.href) === activeSubcategory)?.subServices ?? [];

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory("");
    if (!categorySelections.some((selection) => selection.category === category)) {
      setField("categories", [...categorySelections, { category, subcategories: [] }]);
    }
  };

  const selectSubcategory = (subcategory: string) => {
    setActiveSubcategory(subcategory);
    if (!activeCategory) return;
    const selection = activeSelection ?? { category: activeCategory, subcategories: [] };
    if (selection.subcategories.some((item) => item.subcategory === subcategory)) return;
    setField(
      "categories",
      categorySelections.map((selection) =>
        selection.category === activeCategory && !selection.subcategories.some((item) => item.subcategory === subcategory)
          ? { ...selection, subcategories: [...selection.subcategories, { subcategory, subSubcategories: [] }] }
          : selection,
      ),
    );
  };

  const addSubSubcategory = (subSubcategory: string) => {
    if (!activeCategory || !activeSubcategory) return;
    setField(
      "categories",
      categorySelections.map((selection) => selection.category !== activeCategory ? selection : {
        ...selection,
        subcategories: selection.subcategories.map((subcategory) =>
          subcategory.subcategory === activeSubcategory && !subcategory.subSubcategories.includes(subSubcategory)
            ? { ...subcategory, subSubcategories: [...subcategory.subSubcategories, subSubcategory] }
            : subcategory,
        ),
      }),
    );
  };

  const removeCategory = (category: string) => {
    setField("categories", categorySelections.filter((selection) => selection.category !== category));
    if (activeCategory === category) setActiveCategory("");
  };

  const removeSubcategory = (category: string, subcategory: string) => {
    setField(
      "categories",
      categorySelections.map((selection) =>
        selection.category === category
          ? { ...selection, subcategories: selection.subcategories.filter((item) => item.subcategory !== subcategory) }
          : selection,
      ),
    );
  };

  const removeSubSubcategory = (category: string, subcategory: string, subSubcategory: string) => {
    setField("categories", categorySelections.map((selection) => selection.category !== category ? selection : {
      ...selection,
      subcategories: selection.subcategories.map((item) => item.subcategory !== subcategory ? item : {
        ...item,
        subSubcategories: item.subSubcategories.filter((value) => value !== subSubcategory),
      }),
    }));
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
              imageTitle={form.seo.coverImageTitle || form.title || "Blog cover image"}
            />
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <Label>Tags</Label>
              <Input value={tagsText} onChange={(e) => setTagsText(e.target.value)}
                placeholder="content services, ai, content (comma-separated)" />
            </div>
            <div>
              <Label>Author name</Label>
              <Input value={form.author.name}
                onChange={(e) => setField("author", { ...form.author, name: e.target.value })} />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <Label>Categories</Label>
              <Select value={activeCategory} onValueChange={selectCategory}>
                <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  {BLOG_TAXONOMY.map((category) => (
                    <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subcategory</Label>
              <Select value={activeSubcategory} onValueChange={selectSubcategory} disabled={!activeCategory}>
                <SelectTrigger><SelectValue placeholder={activeCategory ? "Select a subcategory" : "Select a category first"} /></SelectTrigger>
                <SelectContent>
                  {subcategoryOptions.map((subcategory) => (
                    <SelectItem
                      key={hrefValue(subcategory.href)}
                      value={hrefValue(subcategory.href)}
                    >
                      {subcategory.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sub-subcategory</Label>
              <Select value="" onValueChange={addSubSubcategory} disabled={!activeSubcategory}>
                <SelectTrigger><SelectValue placeholder={activeSubcategory ? "Select a sub-subcategory" : "Select a subcategory first"} /></SelectTrigger>
                <SelectContent>
                  {subSubcategoryOptions.map((item) => (
                    <SelectItem
                      key={hrefValue(item.href)}
                      value={hrefValue(item.href)}
                      disabled={activeSelection?.subcategories.find((subcategory) => subcategory.subcategory === activeSubcategory)?.subSubcategories.includes(hrefValue(item.href))}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {categorySelections.length > 0 && (
              <div className="rounded-md border bg-muted/30 p-3 space-y-3">
                <p className="text-xs font-medium text-muted-foreground">Selected categories & subcategories</p>
                {categorySelections.map((selection: BlogCategorySelection) => (
                  <div key={selection.category} className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{BLOG_TAXONOMY.find((category) => category.value === selection.category)?.label ?? selection.category}</span>
                      <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeCategory(selection.category)} aria-label={`Remove ${selection.category}`}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="space-y-2 pl-2">
                      {selection.subcategories.length > 0 ? selection.subcategories.map((subcategory) => (
                        <div key={subcategory.subcategory}>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium">
                              {BLOG_TAXONOMY.find((category) => category.value === selection.category)?.categories.find((item) => hrefValue(item.href) === subcategory.subcategory)?.label ?? subcategory.subcategory}
                            </span>
                            <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeSubcategory(selection.category, subcategory.subcategory)} aria-label={`Remove ${subcategory.subcategory}`}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pl-2 pt-1">
                            {subcategory.subSubcategories.length > 0 ? subcategory.subSubcategories.map((subSubcategory) => (
                              <Badge key={subSubcategory} variant="secondary" className="gap-1 pr-1 text-[11px]">
                                {BLOG_TAXONOMY.find((category) => category.value === selection.category)?.categories.find((item) => hrefValue(item.href) === subcategory.subcategory)?.subServices.find((item) => hrefValue(item.href) === subSubcategory)?.label ?? subSubcategory}
                                <button type="button" onClick={() => removeSubSubcategory(selection.category, subcategory.subcategory, subSubcategory)} aria-label={`Remove ${subSubcategory}`}>
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            )) : <span className="text-xs text-muted-foreground">No sub-subcategory selected</span>}
                          </div>
                        </div>
                      )) : <span className="text-xs text-muted-foreground">No subcategory selected</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            <div>
              <Label>Cover image alt text</Label>
              <Input value={form.seo.coverImageAlt ?? ""}
                placeholder={form.title ? `${form.title} — eQOURSE blog cover image` : "Generated automatically from the blog title"}
                onChange={(e) => setField("seo", { ...form.seo, coverImageAlt: e.target.value })} />
            </div>
            <div>
              <Label>Cover image title</Label>
              <Input value={form.seo.coverImageTitle ?? ""}
                placeholder={form.title || "Generated automatically from the blog title"}
                onChange={(e) => setField("seo", { ...form.seo, coverImageTitle: e.target.value })} />
              <p className="text-xs text-muted-foreground mt-1">Leave blank to use the blog title automatically, including for existing posts.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
