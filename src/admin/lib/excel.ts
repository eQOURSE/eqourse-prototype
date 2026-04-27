/**
 * Lightweight Excel/CSV export.
 *
 * Generates a UTF-8 CSV with BOM, which Excel opens natively as a spreadsheet.
 * For a true .xlsx, swap this for `xlsx` (SheetJS) — see the integration guide.
 */
export function exportToCSV<T extends Record<string, unknown>>(
  rows: T[],
  filename: string,
  columns?: { key: keyof T | string; label: string; format?: (row: T) => string }[]
): void {
  const cols =
    columns ??
    (rows[0]
      ? Object.keys(rows[0]).map((k) => ({ key: k, label: k }))
      : []);

  const header = cols.map((c) => escape(c.label)).join(",");
  const body = rows
    .map((row) =>
      cols
        .map((c) => {
          const raw = c.format
            ? c.format(row)
            : (row as Record<string, unknown>)[c.key as string];
          return escape(raw);
        })
        .join(",")
    )
    .join("\n");

  const csv = "﻿" + header + "\n" + body;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const finalName = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  a.href = url;
  a.download = finalName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function escape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str =
    typeof value === "object"
      ? JSON.stringify(value)
      : String(value);
  if (/[",\n\r]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export function downloadAttachment(url: string, filename: string) {
  // For real backend: this would hit /api/admin/.../attachment which 302-redirects
  // to a signed S3 URL. For mock, the url is a data: URL or "#mock".
  if (url.startsWith("#")) {
    alert(
      `Mock environment: attachment "${filename}" is not a real file.\n` +
        `In production this will download from the signed S3 URL returned by the backend.`
    );
    return;
  }
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
