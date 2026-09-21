import { useState, useEffect } from "react";
import { Eye, ExternalLink, Info, type LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SampleViewer } from "./SampleViewer";
import { resolveSampleFormat, sampleIconFor } from "./sampleFormats";

export interface PreviewFile {
  title: string;
  description: string;
  /**
   * Display badge only. Admins can set this to any string via the "Custom…"
   * option in SampleFileEditor, so it is not safe for renderer dispatch.
   */
  fileType: string;
  /** Authoritative media type from upload. Empty for legacy rows and external links. */
  mimeType?: string;
  fileUrl: string;
  isExternal: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  files: PreviewFile[];
  tabName: string;
  accentHsl: string;
}

/**
 * Card affordance text. `isViewable` comes from the resolved format rather than
 * the `fileType` badge, so a card promises a preview only when one exists.
 */
const getCardAction = (file: PreviewFile): { label: string; icon: LucideIcon } => {
  const format = resolveSampleFormat(file);
  if (format.kind === "external") return { label: "Open link", icon: ExternalLink };
  if (format.isViewable) return { label: "View sample", icon: Eye };
  return { label: "Details", icon: Info };
};

export const PreviewFilesModal = ({ isOpen, onClose, files, tabName, accentHsl }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewerFile, setViewerFile] = useState<PreviewFile | null>(null);
  const accent = `hsl(${accentHsl})`;
  const itemsPerPage = 10;
  
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    } else {
      setViewerFile(null);
    }
  }, [isOpen]);

  const totalPages = Math.ceil(files.length / itemsPerPage);
  const paginatedFiles = files.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Samples are view-only. Selecting a card opens the inline viewer; it must
  // never build an <a download>, which is what this component used to do.
  const handleFileClick = (file: PreviewFile) => setViewerFile(file);

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
            <span style={{ color: accent }}>Preview Samples:</span> {tabName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            Explore related sample files and documents for this category. Select any card to preview
            it — samples are view-only and not available for download.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10 content-start">
          {files.length === 0 ? (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No preview files available for this category yet.
            </div>
          ) : (
            paginatedFiles.map((file, idx) => {
              const Icon = sampleIconFor(resolveSampleFormat(file));
              const action = getCardAction(file);

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
                      {action.label}
                    </span>
                    <action.icon className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Pagination Footer */}
        {files.length > 0 && (
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

      {/*
        Rendered inside this Dialog's tree so the grid stays mounted (and its
        pagination state intact) while a single sample is being previewed.
      */}
      <SampleViewer file={viewerFile} onClose={() => setViewerFile(null)} accentHsl={accentHsl} />
    </Dialog>
  );
};
