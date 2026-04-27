import { useEffect, useMemo, useState } from "react";
import { Download, Search, FileDown, Trash2, Eye } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageHeader from "../components/PageHeader";
import { QueryStatusBadge } from "../components/StatusBadge";
import { adminApi } from "../lib/api";
import type { ContactQuery, QueryStatus } from "../lib/types";
import { exportToCSV, downloadAttachment } from "../lib/excel";
import { toast } from "sonner";

export default function ContactQueries() {
  const [items, setItems] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QueryStatus | "all">("all");
  const [selected, setSelected] = useState<ContactQuery | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ContactQuery | null>(null);

  const refresh = async () => {
    setLoading(true);
    const res = await adminApi.listContactQueries({ pageSize: 1000 });
    setItems(res.items);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    return items
      .filter((i) => statusFilter === "all" || i.status === statusFilter)
      .filter((i) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          i.name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.subject.toLowerCase().includes(q) ||
          (i.company ?? "").toLowerCase().includes(q)
        );
      });
  }, [items, search, statusFilter]);

  const handleExport = () => {
    exportToCSV(
      filtered,
      `contact-queries-${new Date().toISOString().slice(0, 10)}`,
      [
        { key: "createdAt", label: "Date", format: (r) => new Date(r.createdAt).toLocaleString() },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "company", label: "Company" },
        { key: "subject", label: "Subject" },
        { key: "message", label: "Message" },
        { key: "status", label: "Status" },
        { key: "source", label: "Source" },
        { key: "attachment", label: "Attachment", format: (r) => r.attachment?.originalName ?? "" },
        { key: "internalNotes", label: "Internal Notes" },
      ]
    );
    toast.success(`Exported ${filtered.length} rows`);
  };

  const handleStatus = async (id: string, status: QueryStatus) => {
    await adminApi.updateContactQuery(id, { status });
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  const handleNotes = async (id: string, internalNotes: string) => {
    await adminApi.updateContactQuery(id, { internalNotes });
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, internalNotes } : i)));
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    await adminApi.deleteContactQuery(confirmDelete.id);
    setItems((arr) => arr.filter((i) => i.id !== confirmDelete.id));
    setConfirmDelete(null);
    toast.success("Query deleted");
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Contact Queries"
        description="All submissions from the public contact form."
        actions={
          <Button onClick={handleExport} disabled={!filtered.length}>
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </Button>
        }
      />

      {/* Filters */}
      <Card className="p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, email, subject, company…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as QueryStatus | "all")}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          Showing {filtered.length} of {items.length}
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Attachment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  No queries match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((q) => (
                <TableRow key={q.id} className="hover:bg-muted/40">
                  <TableCell className="text-sm whitespace-nowrap">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{q.name}</TableCell>
                  <TableCell className="text-sm">{q.email}</TableCell>
                  <TableCell className="text-sm max-w-[260px] truncate">{q.subject}</TableCell>
                  <TableCell className="text-sm">{q.company ?? "—"}</TableCell>
                  <TableCell>
                    {q.attachment ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadAttachment(q.attachment!.url, q.attachment!.originalName);
                        }}
                      >
                        <FileDown className="w-3.5 h-3.5 mr-1" />
                        {q.attachment.originalName.slice(0, 18)}
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <QueryStatusBadge status={q.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setSelected(q)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(q)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Detail drawer */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.subject}</SheetTitle>
                <SheetDescription>
                  Submitted {new Date(selected.createdAt).toLocaleString()}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Name" value={selected.name} />
                  <Field label="Email" value={selected.email} />
                  <Field label="Phone" value={selected.phone ?? "—"} />
                  <Field label="Company" value={selected.company ?? "—"} />
                  <Field label="Source" value={selected.source ?? "—"} />
                </div>

                <div>
                  <Label>Message</Label>
                  <div className="mt-1 p-3 rounded-md bg-muted/40 text-sm whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>

                {selected.attachment && (
                  <div>
                    <Label>Attachment</Label>
                    <Button
                      variant="outline"
                      className="w-full mt-1 justify-start"
                      onClick={() =>
                        downloadAttachment(selected.attachment!.url, selected.attachment!.originalName)
                      }
                    >
                      <FileDown className="w-4 h-4 mr-2" />
                      {selected.attachment.originalName} (
                      {(selected.attachment.size / 1024).toFixed(0)} KB)
                    </Button>
                  </div>
                )}

                <div>
                  <Label>Status</Label>
                  <Select
                    value={selected.status}
                    onValueChange={(v) => handleStatus(selected.id, v as QueryStatus)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Internal notes</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    defaultValue={selected.internalNotes ?? ""}
                    onBlur={(e) => handleNotes(selected.id, e.target.value)}
                    placeholder="Notes only visible to your team…"
                    className="mt-1"
                  />
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete query?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the query from {confirmDelete?.name}. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="text-sm font-medium mt-0.5 break-all">{value}</div>
    </div>
  );
}
