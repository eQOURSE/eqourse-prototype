import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import ContentPlacementPicker from "../components/ContentPlacementPicker";
import { adminApi } from "../lib/api";
import type { Sample } from "../lib/types";
import { toast } from "sonner";

const TYPES = ["Course Book", "Lesson Plan", "Workbook", "Worksheet", "Activity Pack", "Assessment", "Other"];

interface PageOption {
  slug: string;
  label: string;
  tabs: string[];
}

const SAMPLE_PAGES: PageOption[] = [
  // Text Content Samples
  { slug: "kindergarten-to-k5-samples", label: "K12 Grade (KG-5)", tabs: ["Course Book", "Lesson Plan", "Work Book"] },
  { slug: "k6-to-k12-samples", label: "K12 Grade (6-12)", tabs: ["Course Book", "Lesson Plan", "Work Book"] },
  { slug: "iit-jee-neet-samples", label: "IIT JEE / NEET", tabs: ["Theory Content", "Question Banks", "Mock Test"] },
  { slug: "upsc-state-psc-samples", label: "UPSC & State PSC", tabs: ["General Studies", "Current Affairs", "Previous Year Papers"] },
  { slug: "stem-content-samples", label: "STEM Content", tabs: ["Science", "Technology", "Engineering", "Mathematics"] },
  { slug: "curriculum-samples", label: "Curriculum Content", tabs: ["CBSE", "ICSE", "IB", "State Board"] },
  { slug: "translation-and-localization-text-samples", label: "Localization (Text)", tabs: ["Hindi", "Tamil", "Telugu", "Bengali", "Kannada", "Malayalam", "Other Languages"] },
  { slug: "test-prep-and-assessments", label: "Test Prep & Assessments", tabs: ["TOEIC", "APTIS", "SAT", "IELTS", "ACT", "AP", "TOEFL", "PTE", "CEFR"] },
  // Video Content Samples
  { slug: "articulate-storyline-video-samples", label: "Articulate Storyline", tabs: ["Interactive Modules", "Branching Scenarios", "Quizzes & Assessments"] },
  { slug: "pen-tab-and-ppt-samples", label: "Pen Tab and PPT", tabs: ["Mathematics", "Science", "Language"] },
  { slug: "ai-avatar-video-samples", label: "AI Videos", tabs: ["AI Presenter Videos", "Multilingual AI Avatar Videos"] },
  { slug: "flash-to-html-samples", label: "Flash to HTML", tabs: ["Before/After Comparisons", "Interactive HTML5 Modules"] },
  { slug: "2d-3d-video-samples", label: "2D 3D Animation", tabs: ["2D Character Animation", "3D Concept Videos", "Motion Graphics", "Whiteboard Animation"] },
  { slug: "promotional-video", label: "Promotional Video", tabs: ["Brand Videos", "Course Trailers", "Product Demos"] },
  { slug: "immersive-simulation-ar-vr-video", label: "Immersive Simulation AR/VR", tabs: ["AR Overlay Demos", "VR Environment Tours", "360-degree Experiences", "Interactive 3D Models"] },
  // AI Data Samples
  { slug: "nlp-annotation", label: "NLP Annotation", tabs: ["Named Entity Recognition (NER)", "Sentiment Analysis", "Intent Classification", "Relation Extraction", "Coreference Resolution"] },
  { slug: "computer-vision", label: "Computer Vision", tabs: ["Bounding Box Annotation", "Semantic Segmentation", "Instance Segmentation", "Keypoint Detection", "3D Cuboid Annotation"] },
  { slug: "audio-speech", label: "Audio & Speech", tabs: ["Verbatim Transcription", "Speaker Diarisation", "Phoneme & Prosody Labeling", "Emotion & Tone Detection"] },
  { slug: "rlhf", label: "RLHF", tabs: ["Preference Ranking", "Response Quality Scoring", "Instruction-Following Evaluation", "Safety & Red-Teaming Labels"] },
  { slug: "data-collection", label: "Data Collection", tabs: ["Text Collection Samples", "Audio Collection Samples", "Image Collection Samples", "Video Collection Samples"] },
  { slug: "cleaned-datasets", label: "Cleaned Datasets", tabs: ["Text Deduplication: Before / After", "PII Redaction: Before / After", "Audio Quality Filtering: Before / After", "Gold-Standard Validation Report"] },
];

const FILE_TYPES = ["PDF", "DOCX", "ZIP", "MP4", "HTML5", "JSON", "CSV", "MP3", "WAV", "Other"];

const empty: Omit<Sample, "id" | "createdAt" | "updatedAt" | "order" | "categoryId"> = {
  title: "",
  type: "Course Book",
  description: "",
  thumbnailUrl: "",
  fileUrl: "",
  fileSize: undefined,
  pageSlug: "",
  tabName: "",
  fileType: "PDF",
  isExternal: false,
  pagePaths: [],
};

export default function SampleEditor() {
  const { categorySlug, pageSlug: routePageSlug, tabName: routeTabName, sampleId } = useParams();
  const navigate = useNavigate();
  const isNew = !sampleId || sampleId === "new";
  const [form, setForm] = useState(() => ({
    ...empty,
    pageSlug: routePageSlug ?? "",
    tabName: routeTabName ?? "",
  }));
  const [customType, setCustomType] = useState(false);
  const [customFileType, setCustomFileType] = useState(false);
  const [fileMeta, setFileMeta] = useState<{ originalName: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(isNew);

  useEffect(() => {
    if (isNew) return;
    adminApi.getSample(sampleId!).then((s) => {
      if (!s) {
        toast.error("Not found");
        navigate(`/admin/samples/${categorySlug}/${routePageSlug}`);
        return;
      }
      setForm({
        title: s.title,
        type: s.type,
        description: s.description ?? "",
        thumbnailUrl: s.thumbnailUrl,
        fileUrl: s.fileUrl,
        fileSize: s.fileSize,
        pageSlug: s.pageSlug ?? "",
        tabName: s.tabName ?? "",
        fileType: s.fileType ?? "PDF",
        isExternal: s.isExternal ?? false,
        pagePaths: s.pagePaths ?? [],
      });
      if (!TYPES.includes(s.type)) setCustomType(true);
      if (s.fileType && !FILE_TYPES.includes(s.fileType)) setCustomFileType(true);
      setFileMeta({ originalName: s.title + " (existing file)" });
      setLoaded(true);
    });
  }, [sampleId, categorySlug, routePageSlug, isNew, navigate]);

  const setField = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const detectFileType = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toUpperCase() || "";
    if (["PDF"].includes(ext)) return "PDF";
    if (["DOC", "DOCX"].includes(ext)) return "DOCX";
    if (["ZIP", "TAR", "GZ", "SCORM"].includes(ext)) return "ZIP";
    if (["MP4", "AVI", "MOV", "WEBM"].includes(ext)) return "MP4";
    if (["JSON", "JSONL"].includes(ext)) return "JSON";
    if (["CSV"].includes(ext)) return "CSV";
    if (["MP3", "WAV", "OGG"].includes(ext)) return ext;
    return "Other";
  };

  const handlePageChange = (slug: string) => {
    setField("pageSlug", slug);
    const selectedPage = SAMPLE_PAGES.find((p) => p.slug === slug);
    if (selectedPage && selectedPage.tabs.length > 0) {
      setField("tabName", selectedPage.tabs[0]);
    } else {
      setField("tabName", "");
    }
  };

  const save = async () => {
    if (!form.title) return toast.error("Title required");
    if (!form.thumbnailUrl) return toast.error("Thumbnail required");
    if (!form.fileUrl) return toast.error("File URL or upload is required");
    if (!form.pageSlug) return toast.error("Public Sample Page mapping is required");
    if (!form.tabName) return toast.error("Page Tab mapping is required");
    
    setSaving(true);
    try {
      if (isNew) {
        await adminApi.createSampleForPage(form);
        toast.success("Sample added");
      } else {
        await adminApi.updateSample(sampleId!, form);
        toast.success("Saved");
      }
      navigate(`/admin/samples/${categorySlug}/${form.pageSlug}`);
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <div className="p-8 text-muted-foreground">Loading…</div>;

  const currentPage = SAMPLE_PAGES.find((p) => p.slug === form.pageSlug);
  const tabOptions = currentPage ? currentPage.tabs : [];

  return (
    <div className="p-8 max-w-3xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/samples/${categorySlug}/${form.pageSlug || routePageSlug}`)} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to samples
      </Button>
      <PageHeader
        title={isNew ? "New sample" : "Edit sample"}
        actions={<Button onClick={save} disabled={saving}><Save className="w-4 h-4 mr-2" /> Save</Button>}
      />

      <Card className="p-6 space-y-6">
        <div>
          <Label>Title *</Label>
          <Input value={form.title} onChange={(e) => setField("title", e.target.value)}
            placeholder="Math Course Book - Grade 2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Public Sample Page *</Label>
            <Select value={form.pageSlug || undefined} onValueChange={handlePageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select target public page" />
              </SelectTrigger>
              <SelectContent>
                {SAMPLE_PAGES.map((page) => (
                  <SelectItem key={page.slug} value={page.slug}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">This file will appear in the modal on this public page.</p>
          </div>

          <div>
            <Label>Page Tab / Section *</Label>
            <Select value={form.tabName || undefined} onValueChange={(v) => setField("tabName", v)} disabled={!form.pageSlug}>
              <SelectTrigger>
                <SelectValue placeholder={form.pageSlug ? "Select tab/category" : "Select a page first"} />
              </SelectTrigger>
              <SelectContent>
                {tabOptions.map((tab) => (
                  <SelectItem key={tab} value={tab}>
                    {tab}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Which tab within the preview modal this belongs to.</p>
          </div>
        </div>

        <div className="space-y-3 border-t border-border/40 pt-5">
          <div>
            <h4 className="font-medium text-sm">Show this sample on service pages</h4>
            <p className="mt-1 text-xs text-muted-foreground">This is separate from its sample-gallery page. Select all service pages where it should appear above FAQs.</p>
          </div>
          <ContentPlacementPicker
            contentLabel="sample"
            value={form.pagePaths}
            onChange={(pagePaths) => setField("pagePaths", pagePaths)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Sample Category / Group Type</Label>
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
                  <Input value={form.fileType} onChange={(e) => setField("fileType", e.target.value.toUpperCase())} placeholder="e.g. SCORM, PDF, XLSX" />
                  <Button variant="outline" onClick={() => { setCustomFileType(false); setField("fileType", "PDF"); }}>
                    Use preset
                  </Button>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Displayed as a badge on the file card.</p>
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea rows={3} value={form.description ?? ""} onChange={(e) => setField("description", e.target.value)}
            placeholder="What does this sample contain? Max 2 lines for best layout." />
        </div>

        <ImageUpload value={form.thumbnailUrl} onChange={(url) => setField("thumbnailUrl", url)}
          kind="sample-thumbnail" label="Card Thumbnail Image *" />

        <div className="space-y-4 pt-2 border-t border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Is External URL?</Label>
              <p className="text-xs text-muted-foreground">Toggle to paste an external link instead of uploading a file.</p>
            </div>
            <Switch
              checked={form.isExternal}
              onCheckedChange={(checked) => {
                setField("isExternal", checked);
                if (checked) {
                  setField("fileSize", undefined);
                }
              }}
            />
          </div>

          {form.isExternal ? (
            <div>
              <Label>External URL *</Label>
              <Input
                value={form.fileUrl}
                onChange={(e) => setField("fileUrl", e.target.value)}
                placeholder="https://example.com/external-resource"
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
                  // Auto detect file type
                  const detected = detectFileType(f.originalName);
                  if (detected !== "Other") {
                    setField("fileType", detected);
                    setCustomFileType(false);
                  }
                }
              }}
              kind="sample-file"
              label="Sample file *"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.json,.txt,.zip,.png,.jpg,.mp4,.mov,.webm,.wav,.mp3,.scorm"
            />
          )}
        </div>
      </Card>
    </div>
  );
}
