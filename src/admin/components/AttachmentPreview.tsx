import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreviewFilesModal } from "@/components/samples/shared/PreviewFilesModal";
import type { Attachment } from "../lib/types";
import { useEffect, useState } from "react";
import { fetchFileBlobUrl } from "../lib/apiClient";
import { toast } from "sonner";

function extensionOf(name: string, mimeType: string) {
  const extension = name.split(".").pop()?.trim().toLowerCase();
  if (extension && extension !== name.toLowerCase()) return extension;
  return mimeType.split("/").pop()?.toLowerCase() || "file";
}

export default function AttachmentPreview({ attachment, compact = false, previewPath }: { attachment: Attachment; compact?: boolean; previewPath?: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState(attachment.url);
  const fileType = extensionOf(attachment.originalName, attachment.mimeType);
  const securePath = previewPath && import.meta.env.VITE_API_BASE_URL ? previewPath : undefined;

  useEffect(() => () => {
    if (resolvedUrl.startsWith("blob:")) URL.revokeObjectURL(resolvedUrl);
  }, [resolvedUrl]);

  const openPreview = async () => {
    if (!securePath) {
      setOpen(true);
      return;
    }
    setLoading(true);
    try {
      setResolvedUrl(await fetchFileBlobUrl(securePath));
      setOpen(true);
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Could not load this document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={compact ? "ghost" : "outline"}
        size={compact ? "sm" : "default"}
        className={compact ? "max-w-[220px] justify-start" : "w-full justify-start"}
        title={`Preview ${attachment.originalName}`}
        onClick={openPreview}
      >
        {loading ? <Loader2 className={compact ? "mr-1 h-3.5 w-3.5 shrink-0 animate-spin" : "mr-2 h-4 w-4 shrink-0 animate-spin"} /> : <FileText className={compact ? "mr-1 h-3.5 w-3.5 shrink-0" : "mr-2 h-4 w-4 shrink-0"} />}
        <span className="truncate">{attachment.originalName}</span>
      </Button>
      <PreviewFilesModal
        isOpen={open}
        onClose={() => setOpen(false)}
        files={[{
          title: attachment.originalName,
          description: "Lead attachment preview",
          fileType,
          fileUrl: resolvedUrl,
          mimeType: attachment.mimeType,
          isExternal: false,
          allowDownload: true,
        }]}
        tabName={attachment.originalName}
        accentHsl="221 83% 53%"
      />
    </>
  );
}
