import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "../components/PageHeader";
import ImageUpload from "../components/ImageUpload";
import FileUpload from "../components/FileUpload";
import { adminApi } from "../lib/api";
import type { Sample } from "../lib/types";
import { toast } from "sonner";

const TYPES = ["Course Book", "Lesson Plan", "Workbook", "Worksheet", "Activity Pack", "Assessment", "Other"];

const empty: Omit<Sample, "id" | "createdAt" | "updatedAt" | "order" | "categoryId"> = {
  title: "",
  type: "Course Book",
  description: "",
  thumbnailUrl: "",
  fileUrl: "",
  fileSize: undefined,
};

export default function SampleEditor() {
  const { categoryId, sampleId } = useParams();
  const navigate = useNavigate();
  const isNew = !sampleId || sampleId === "new";
  const [form, setForm] = useState(empty);
  const [customType, setCustomType] = useState(false);
  const [fileMeta, setFileMeta] = useState<{ originalName: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(isNew);

  useEffect(() => {
    if (isNew) return;
    adminApi.getSample(sampleId!).then((s) => {
      if (!s) { toast.error("Not found"); navigate(`/admin/sample-categories/${categoryId}/samples`); return; }
      setForm({
        title: s.title, type: s.type, description: s.description ?? "",
        thumbnailUrl: s.thumbnailUrl, fileUrl: s.fileUrl, fileSize: s.fileSize,
      });
      if (!TYPES.includes(s.type)) setCustomType(true);
      setFileMeta({ originalName: s.title + " (existing file)" });
      setLoaded(true);
    });
  }, [sampleId, categoryId, isNew, navigate]);

  const setField = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    if (!form.title) return toast.error("Title required");
    if (!form.thumbnailUrl) return toast.error("Thumbnail required");
    if (!form.fileUrl) return toast.error("File required");
    setSaving(true);
    try {
      if (isNew) {
        await adminApi.createSample({ ...form, categoryId: categoryId! });
        toast.success("Sample added");
      } else {
        await adminApi.updateSample(sampleId!, form);
        toast.success("Saved");
      }
      navigate(`/admin/sample-categories/${categoryId}/samples`);
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <div className="p-8 text-muted-foreground">Loading…</div>;

  return (
    <div className="p-8 max-w-3xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/sample-categories/${categoryId}/samples`)} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to samples
      </Button>
      <PageHeader
        title={isNew ? "New sample" : "Edit sample"}
        actions={<Button onClick={save} disabled={saving}><Save className="w-4 h-4 mr-2" /> Save</Button>}
      />

      <Card className="p-6 space-y-4">
        <div>
          <Label>Title *</Label>
          <Input value={form.title} onChange={(e) => setField("title", e.target.value)}
            placeholder="Math Course Book — Grade 2" />
        </div>
        <div>
          <Label>Type *</Label>
          <div className="flex gap-2">
            {!customType ? (
              <Select value={form.type} onValueChange={(v) => {
                if (v === "__custom") { setCustomType(true); setField("type", ""); } else setField("type", v);
              }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  <SelectItem value="__custom">Custom…</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <>
                <Input value={form.type} onChange={(e) => setField("type", e.target.value)} placeholder="Custom type name" />
                <Button variant="outline" onClick={() => { setCustomType(false); setField("type", "Course Book"); }}>
                  Use preset
                </Button>
              </>
            )}
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea rows={3} value={form.description ?? ""} onChange={(e) => setField("description", e.target.value)}
            placeholder="What does this sample contain?" />
        </div>

        <ImageUpload value={form.thumbnailUrl} onChange={(url) => setField("thumbnailUrl", url)}
          kind="sample-thumbnail" label="Thumbnail *" />

        <FileUpload
          value={form.fileUrl ? { url: form.fileUrl, originalName: fileMeta?.originalName ?? "Sample file", size: form.fileSize } : undefined}
          onChange={(f) => {
            if (!f) { setField("fileUrl", ""); setField("fileSize", undefined); setFileMeta(null); }
            else { setField("fileUrl", f.url); setField("fileSize", f.size); setFileMeta({ originalName: f.originalName }); }
          }}
          kind="sample-file"
          label="Sample file (PDF) *"
          accept=".pdf,.zip"
        />
      </Card>
    </div>
  );
}
