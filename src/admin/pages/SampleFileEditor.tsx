import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import PageHeader from "../components/PageHeader";
import ImageUpload from "../components/ImageUpload";
import FileUpload from "../components/FileUpload";
import { adminApi } from "../lib/api";
import { getSubCategory } from "../lib/sampleHierarchy";
import type { Sample } from "../lib/types";
import { toast } from "sonner";

const FILE_TYPES = ["PDF", "DOCX", "ZIP", "MP4", "HTML5", "JSON", "CSV", "MP3", "WAV", "PNG", "JPG", "SCORM", "Other"];

export default function SampleFileEditor() {
  const { mainCategoryId, pageSlug, tabName, sampleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const match = getSubCategory(pageSlug ?? "");

  const isNew = !sampleId || sampleId === "new";
  const tabFromUrl = searchParams.get("tab") ?? tabName ?? "";

  const [form, setForm] = useState({
    title: "",
    type: tabFromUrl,       // sub-sub-category name
    description: "",
    thumbnailUrl: "",
    fileUrl: "",
    fileSize: undefined as number | undefined,
    fileType: "PDF",
    isExternal: false,
    tabName: tabFromUrl,
    pageSlug: pageSlug ?? "",
  });
  const [customFileType, setCustomFileType] = useState(false);
  const [fileMeta, setFileMeta] = useState<{ originalName: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(isNew);

  useEffect(() => {
    if (isNew || !sampleId) return;
    adminApi.getSample(sampleId).then((s) => {
      if (!s) {
        toast.error("Not found");
        navigate(`/admin/samples/${mainCategoryId}/${pageSlug}`);
        return;
      }
      setForm({
        title: s.title,
        type: s.type,
        description: s.description ?? "",
        thumbnailUrl: s.thumbnailUrl,
        fileUrl: s.fileUrl,
        fileSize: s.fileSize,
        fileType: s.fileType ?? "PDF",
        isExternal: s.isExternal ?? false,
        tabName: s.tabName ?? "",
        pageSlug: s.pageSlug ?? pageSlug ?? "",
      });
      if (s.fileType && !FILE_TYPES.includes(s.fileType)) setCustomFileType(true);
      setFileMeta({ originalName: s.title + " (existing file)" });
      setLoaded(true);
    });
  }, [sampleId, isNew, navigate, mainCategoryId, pageSlug]);

  const setField = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const detectFileType = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toUpperCase() || "";
    if (["PDF"].includes(ext)) return "PDF";
    if (["DOC", "DOCX"].includes(ext)) return "DOCX";
    if (["ZIP", "TAR", "GZ", "RAR", "7Z"].includes(ext)) return "ZIP";
    if (["MP4", "AVI", "MOV", "WEBM", "MKV"].includes(ext)) return "MP4";
    if (["JSON", "JSONL"].includes(ext)) return "JSON";
    if (["CSV"].includes(ext)) return "CSV";
    if (["MP3"].includes(ext)) return "MP3";
    if (["WAV", "OGG"].includes(ext)) return "WAV";
    if (["PNG"].includes(ext)) return "PNG";
    if (["JPG", "JPEG"].includes(ext)) return "JPG";
    return "Other";
  };

  const save = async () => {
    if (!form.title) return toast.error("Title required");
    if (!form.fileUrl) return toast.error("File or URL required");

    setSaving(true);
    try {
      if (isNew) {
        await adminApi.createSampleForPage({
          title: form.title,
          type: form.type || form.tabName,
          description: form.description,
          thumbnailUrl: form.thumbnailUrl,
          fileUrl: form.fileUrl,
          fileSize: form.fileSize,
          fileType: form.fileType,
          isExternal: form.isExternal,
          tabName: form.tabName,
          pageSlug: form.pageSlug,
        });
        toast.success("File uploaded");
      } else {
        await adminApi.updateSample(sampleId!, {
          title: form.title,
          type: form.type || form.tabName,
          description: form.description,
          thumbnailUrl: form.thumbnailUrl,
          fileUrl: form.fileUrl,
          fileSize: form.fileSize,
          fileType: form.fileType,
          isExternal: form.isExternal,
        });
        toast.success("Saved");
      }
      navigate(`/admin/samples/${mainCategoryId}/${pageSlug}`);
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!match) {
    return <div className="p-8 text-muted-foreground">Sub-category not found.</div>;
  }

  if (!loaded) return <div className="p-8 text-muted-foreground">Loading…</div>;

  const { sub } = match;

  return (
    <div className="p-8 max-w-3xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/samples/${mainCategoryId}/${pageSlug}`)} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to {sub.label}
      </Button>
      <PageHeader
        title={isNew ? `Upload to "${form.tabName}"` : "Edit file"}
        description={`${sub.label} → ${form.tabName || "-"}`}
        actions={<Button onClick={save} disabled={saving}><Save className="w-4 h-4 mr-2" /> Save</Button>}
      />

      <Card className="p-6 space-y-6">
        {/* Title */}
        <div>
          <Label>Title *</Label>
          <Input value={form.title} onChange={(e) => setField("title", e.target.value)}
            placeholder={`e.g. Math Course Book - Grade 2`} />
        </div>

        {/* Context info (read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Sub-category</Label>
            <Input value={sub.label} disabled className="bg-muted" />
          </div>
          <div>
            <Label className="text-muted-foreground">Tab / Section</Label>
            <Input value={form.tabName} disabled className="bg-muted" />
          </div>
        </div>

        {/* File type */}
        <div>
          <Label>File Type Badge *</Label>
          <div className="flex gap-2">
            {!customFileType ? (
              <Select value={form.fileType} onValueChange={(v) => {
                if (v === "__custom") { setCustomFileType(true); setField("fileType", ""); } else setField("fileType", v);
              }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FILE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  <SelectItem value="__custom">Custom…</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <>
                <Input value={form.fileType} onChange={(e) => setField("fileType", e.target.value.toUpperCase())} placeholder="e.g. XLSX, SCORM" />
                <Button variant="outline" onClick={() => { setCustomFileType(false); setField("fileType", "PDF"); }}>
                  Use preset
                </Button>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Displayed as a badge on the file card in the preview modal.</p>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea rows={3} value={form.description ?? ""} onChange={(e) => setField("description", e.target.value)}
            placeholder="What does this file contain? Max 2 lines for best layout." />
        </div>

        {/* Thumbnail */}
        <ImageUpload value={form.thumbnailUrl} onChange={(url) => setField("thumbnailUrl", url)}
          kind="sample-thumbnail" label="Card Thumbnail Image (optional)" />

        {/* File upload / external URL */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Is External URL?</Label>
              <p className="text-xs text-muted-foreground">Toggle to paste an external link instead of uploading.</p>
            </div>
            <Switch
              checked={form.isExternal}
              onCheckedChange={(checked) => {
                setField("isExternal", checked);
                if (checked) setField("fileSize", undefined);
              }}
            />
          </div>

          {form.isExternal ? (
            <div>
              <Label>External URL *</Label>
              <Input
                value={form.fileUrl}
                onChange={(e) => setField("fileUrl", e.target.value)}
                placeholder="https://example.com/resource"
              />
            </div>
          ) : (
            <FileUpload
              value={form.fileUrl ? { url: form.fileUrl, originalName: fileMeta?.originalName ?? "Sample file", size: form.fileSize } : undefined}
              onChange={(f) => {
                if (!f) {
                  setField("fileUrl", "");
                  setField("fileSize", undefined);
                  setFileMeta(null);
                } else {
                  setField("fileUrl", f.url);
                  setField("fileSize", f.size);
                  setFileMeta({ originalName: f.originalName });
                  const detected = detectFileType(f.originalName);
                  if (detected !== "Other") {
                    setField("fileType", detected);
                    setCustomFileType(false);
                  }
                }
              }}
              kind="sample-file"
              label="Sample file *"
              accept="*/*"
            />
          )}
        </div>
      </Card>
    </div>
  );
}
