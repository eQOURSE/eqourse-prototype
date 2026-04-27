import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminApi } from "../lib/api";
import { toast } from "sonner";

export default function ImageUpload({
  value,
  onChange,
  kind,
  label = "Image",
  className,
}: {
  value?: string;
  onChange: (url: string) => void;
  kind: string;
  label?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handlePick = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be ≤ 5 MB");
      return;
    }
    setBusy(true);
    try {
      const res = await adminApi.uploadFile(file, kind);
      onChange(res.url);
    } catch {
      toast.error("Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      <div className="text-sm font-medium mb-2">{label}</div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handlePick(f);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="relative w-full h-44 rounded-md overflow-hidden border border-border bg-muted">
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="absolute top-2 right-2"
            onClick={() => onChange("")}
          >
            <X className="w-3.5 h-3.5 mr-1" /> Remove
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="w-full h-44 border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Upload className="w-6 h-6" />
          <span className="text-sm">{busy ? "Uploading…" : "Click to upload"}</span>
          <span className="text-xs">PNG, JPG, WEBP up to 5 MB</span>
        </button>
      )}
    </div>
  );
}
