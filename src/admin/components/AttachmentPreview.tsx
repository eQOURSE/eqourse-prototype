import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SampleMediaViewer from "@/components/samples/shared/SampleMediaViewer";
import type { PreviewFile } from "@/lib/publicApi";
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
  const previewFile: PreviewFile = {
    title: attachment.originalName,
    description: "Lead attachment preview",
    fileType,
    fileUrl: resolvedUrl,
    mimeType: attachment.mimeType,
    isExternal: false,
    allowDownload: true,
  };

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
        className={compact ? "max-w-full min-w-0 justify-start" : "w-full justify-start"}
        title={`Preview ${attachment.originalName}`}
        onClick={openPreview}
      >
        {loading ? <Loader2 className={compact ? "mr-1 h-3.5 w-3.5 shrink-0 animate-spin" : "mr-2 h-4 w-4 shrink-0 animate-spin"} /> : <FileText className={compact ? "mr-1 h-3.5 w-3.5 shrink-0" : "mr-2 h-4 w-4 shrink-0"} />}
        <span className="truncate">{attachment.originalName}</span>
      </Button>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && setOpen(false)}>
        <DialogContent className="flex h-[85vh] w-[min(92vw,900px)] max-w-none flex-col overflow-hidden p-0">
          <DialogHeader className="shrink-0 border-b px-5 py-4 pr-12">
            <DialogTitle className="truncate text-base" title={attachment.originalName}>
              {attachment.originalName}
            </DialogTitle>
            <DialogDescription>Attachment preview</DialogDescription>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-auto p-4">
            <SampleMediaViewer file={previewFile} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
