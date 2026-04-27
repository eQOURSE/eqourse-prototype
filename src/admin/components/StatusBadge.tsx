import { cn } from "@/lib/utils";
import type { QueryStatus, PublishStatus } from "../lib/types";

const queryColors: Record<QueryStatus, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  in_progress: "bg-amber-100 text-amber-700 border-amber-200",
  contacted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

const queryLabels: Record<QueryStatus, string> = {
  new: "New",
  in_progress: "In Progress",
  contacted: "Contacted",
  closed: "Closed",
};

export function QueryStatusBadge({ status }: { status: QueryStatus }) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 text-xs font-medium border rounded-full", queryColors[status])}>
      {queryLabels[status]}
    </span>
  );
}

export function PublishBadge({ status }: { status: PublishStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium border rounded-full",
        status === "published"
          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
          : "bg-zinc-100 text-zinc-600 border-zinc-200"
      )}
    >
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}
