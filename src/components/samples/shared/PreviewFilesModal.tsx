import { useState, useEffect } from "react";
import {
  FileText,
  FileVideo,
  FileArchive,
  FileJson,
  FileMusic,
  FileCode,
  Download,
  ExternalLink,
  FileImage,
  Database,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import SampleMediaViewer from "./SampleMediaViewer";

export interface PreviewFile {
  title: string;
  description: string;
  fileType: string;
  fileUrl: string;
  isExternal: boolean;
  thumbnailUrl?: string;
  mimeType?: string;
  allowDownload?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  files: PreviewFile[];
  tabName: string;
  accentHsl: string;
}

const getFileIcon = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'xls', 'xlsx'].includes(type)) return FileText;
  if (['mp4', 'avi', 'mov', 'mkv', 'webm', 'scorm'].includes(type)) return FileVideo;
  if (['json', 'jsonl', 'csv'].includes(type)) return FileJson;
  if (['wav', 'mp3', 'rttm', 'textgrid'].includes(type)) return FileMusic;
  if (['zip', 'tar', 'gz'].includes(type)) return FileArchive;
  if (['png', 'jpg', 'jpeg', 'svg', 'kitti', 'coco json'].includes(type)) return FileImage;
  if (['xml', 'conll'].includes(type)) return FileCode;
  return Database;
};

const isHostedHtmlFile = (file: PreviewFile) => {
  const declaredType = (file.fileType || "").trim().toLowerCase();
  const mimeType = (file.mimeType || "").trim().toLowerCase();
  if (["html", "html5", "htm", "text/html", "application/xhtml+xml"].includes(declaredType) || mimeType === "text/html" || mimeType === "application/xhtml+xml") {
    return true;
  }
  try {
    return ["html", "htm"].includes(new URL(file.fileUrl, window.location.href).pathname.split(".").pop()?.toLowerCase() || "");
  } catch {
    return /\.(html?|xhtml)(?:[?#]|$)/i.test(file.fileUrl);
  }
};

export const PreviewFilesModal = ({ isOpen, onClose, files, tabName, accentHsl }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState<PreviewFile | null>(null);
  const accent = `hsl(${accentHsl})`;
  const itemsPerPage = 10;
  
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
      setSelectedFile(null);
    }
  }, [isOpen]);

  const totalPages = Math.ceil(files.length / itemsPerPage);
  const paginatedFiles = files.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const selectedIndex = selectedFile ? files.findIndex((file) => file === selectedFile) : -1;
  const previousFile = selectedIndex > 0 ? files[selectedIndex - 1] : null;
  const nextFile = selectedIndex >= 0 && selectedIndex < files.length - 1 ? files[selectedIndex + 1] : null;

  const handleFileClick = (file: PreviewFile) => {
    if (file.isExternal && !isHostedHtmlFile(file)) {
      window.open(file.fileUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setSelectedFile(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] lg:max-w-[850px] w-full aspect-square max-h-[90vh] bg-card border-border/60 shadow-2xl overflow-hidden flex flex-col p-0">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${accent} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        
        <DialogHeader className="p-6 border-b border-border/40 relative bg-background/50 backdrop-blur-md">
          <DialogTitle className="text-2xl font-heading text-foreground flex items-center gap-2">
            {selectedFile && (
              <button type="button" onClick={() => setSelectedFile(null)} className="mr-1 rounded-md p-1 hover:bg-muted" aria-label="Back to sample files">
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <span style={{ color: accent }}>{selectedFile ? "Preview:" : "Preview Samples:"}</span> {selectedFile?.title ?? tabName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            {selectedFile ? selectedFile.description || "Sample preview" : "Explore related sample files and documents for this category. Click to preview."}
          </DialogDescription>
        </DialogHeader>

        {selectedFile ? (
          <div className="relative z-10 flex flex-1 flex-col gap-4 overflow-y-auto p-5">
            <div className="flex min-h-[320px] flex-1 items-center justify-center rounded-xl border border-border/50 bg-background/70 p-3">
              <SampleMediaViewer file={selectedFile} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{selectedFile.fileType || "Sample"}</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" disabled={!previousFile} onClick={() => previousFile && setSelectedFile(previousFile)} className="rounded-md border px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                <button type="button" disabled={!nextFile} onClick={() => nextFile && setSelectedFile(nextFile)} className="rounded-md border px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40">Next</button>
              </div>
            </div>
          </div>
        ) : (
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10 content-start">
          {files.length === 0 ? (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No preview files available for this category yet.
            </div>
          ) : (
            paginatedFiles.map((file, idx) => {
              const Icon = getFileIcon(file.fileType);
              
              return (
                <button
                  key={idx}
                  onClick={() => handleFileClick(file)}
                  className="w-full text-left group bg-background/60 hover:bg-muted/30 border border-border/50 hover:border-border rounded-xl p-3.5 flex flex-col transition-all hover:shadow-md relative overflow-hidden h-full"
                  style={{ '--hover-accent': accent } as React.CSSProperties}
                >
                  {/* Decorative top border for PDF/documents to make it feel like a card */}
                  {file.fileType.toLowerCase() === 'pdf' && (
                     <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: accent, opacity: 0.8 }} />
                  )}

                  {/* Thumbnail or icon */}
                  {file.thumbnailUrl ? (
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-muted/30 border border-border/30">
                      <img
                        src={file.thumbnailUrl}
                        alt={file.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to icon if thumbnail fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          const iconEl = document.createElement('div');
                          iconEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 2 6 6v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><polyline points="14 2 14 8 20 8"/></svg>`;
                          iconEl.style.color = accent;
                          (e.target as HTMLImageElement).parentElement!.appendChild(iconEl);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors shadow-sm"
                        style={{ backgroundColor: `hsl(${accentHsl} / 0.1)`, color: accent, border: `1px solid hsl(${accentHsl} / 0.2)` }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div 
                        className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded shadow-sm flex-shrink-0"
                        style={{ backgroundColor: `hsl(${accentHsl} / 0.1)`, color: accent, border: `1px solid hsl(${accentHsl} / 0.2)` }}
                      >
                        {file.fileType}
                      </div>
                    </div>
                  )}

                  {/* File type badge (shown when thumbnail is present) */}
                  {file.thumbnailUrl && (
                    <div className="flex justify-end mb-2">
                      <div 
                        className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded shadow-sm"
                        style={{ backgroundColor: `hsl(${accentHsl} / 0.1)`, color: accent, border: `1px solid hsl(${accentHsl} / 0.2)` }}
                      >
                        {file.fileType}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1 flex flex-col mb-3">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-[var(--hover-accent)] transition-colors mb-1.5 line-clamp-2">
                      {file.title}
                    </h4>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {file.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between text-muted-foreground group-hover:text-foreground transition-colors">
                    <span className="text-[10px] font-medium uppercase tracking-wider">
                      {file.isExternal ? 'Open preview' : file.allowDownload ? 'Preview & download' : 'Preview file'}
                    </span>
                    {file.isExternal ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : file.allowDownload ? (
                      <Download className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
        )}

        {/* Pagination Footer */}
        {!selectedFile && files.length > 0 && (
          <div className="p-4 border-t border-border/40 flex items-center justify-between bg-background/50 backdrop-blur-md relative z-20">
            <div className="text-xs text-muted-foreground font-medium">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, files.length)} to {Math.min(currentPage * itemsPerPage, files.length)} of {files.length} files
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-md text-xs font-semibold border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 rounded-md text-xs font-semibold border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
