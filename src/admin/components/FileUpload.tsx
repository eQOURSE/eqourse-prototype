import { useRef, useState } from "react";
import { Upload, FileIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminApi } from "../lib/api";
import { toast } from "sonner";

export default function FileUpload({
  value,
  onChange,
  kind,
  label = "File",
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.zip",
}: {
  value?: { url: string; originalName: string; size?: number };
  onChange: (file: { url: string; originalName: string; size: number } | null) => void;
  kind: string;
  label?: string;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handlePick = async (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File must be ≤ 50 MB");
      return;
    }
    setBusy(true);
    try {
      const res = await adminApi.uploadFile(file, kind);
      onChange({ url: res.url, originalName: res.originalName, size: res.size });
    } catch {
      toast.error("Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="text-sm font-medium mb-2">{label}</div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handlePick(f);
          e.target.value = "";
        }}
      />
      {value?.url ? (
        <div className="flex items-center justify-between gap-3 p-3 border border-border rounded-md bg-muted/30">
          <div className="flex items-center gap-3 min-w-0">
            <FileIcon className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{value.originalName}</div>
              {value.size != null && (
                <div className="text-xs text-muted-foreground">{(value.size / 1024).toFixed(0)} KB</div>
              )}
            </div>
          </div>
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="w-full p-4 border-2 border-dashed border-border rounded-md flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span className="text-sm">{busy ? "Uploading…" : "Upload file"}</span>
        </button>
      )}
    </div>
  );
}
