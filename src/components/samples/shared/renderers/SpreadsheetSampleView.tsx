import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchSampleBuffer, fetchSampleText, sampleErrorMessage } from "../sampleAsset";

/**
 * Excel and delimited-data renderer for the sample viewer.
 *
 * Two parsers, chosen by extension:
 *   .xlsx        → read-excel-file (browser build). Note that SheetJS/`xlsx` was
 *                  rejected here: its last npm release is 0.18.5 from 2022 and
 *                  carries a prototype-pollution advisory, with current versions
 *                  published only outside npm.
 *   .csv / .tsv  → papaparse.
 *
 * Legacy binary .xls and .ods have no dependable browser parser, so
 * sampleFormats.resolveSampleFormat marks them not viewable before we get here.
 *
 * Output is a plain read-only table. Rows are capped because everything is
 * rendered into the DOM at once.
 *
 * Imported lazily by SampleViewer so neither parser loads until needed.
 */

const MAX_ROWS = 500;
const MAX_COLUMNS = 40;

type Cell = string | number | boolean | Date | null;

function toDisplayValue(value: Cell): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toLocaleDateString();
  return String(value);
}

export default function SpreadsheetSampleView({
  url,
  title,
  extension,
}: {
  url: string;
  title: string;
  extension: string;
}) {
  const [rows, setRows] = useState<Cell[][]>([]);
  const [truncated, setTruncated] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        let parsed: Cell[][];

        if (extension === "csv" || extension === "tsv") {
          const text = await fetchSampleText(url, controller.signal);
          const { default: Papa } = await import("papaparse");
          const result = Papa.parse<string[]>(text, {
            skipEmptyLines: "greedy",
            delimiter: extension === "tsv" ? "\t" : undefined,
          });
          parsed = result.data;
        } else {
          const buffer = await fetchSampleBuffer(url, controller.signal);
          const { default: readXlsxFile } = await import("read-excel-file/browser");
          // A Blob is the browser build's accepted input.
          parsed = (await readXlsxFile(new Blob([buffer]))) as Cell[][];
        }

        if (cancelled) return;

        const limited = parsed
          .slice(0, MAX_ROWS)
          .map((row) => (Array.isArray(row) ? row.slice(0, MAX_COLUMNS) : [row]));
        setTruncated(parsed.length > MAX_ROWS);
        setRows(limited);
        setStatus("ready");
      } catch (error) {
        if (cancelled || controller.signal.aborted) return;
        setErrorMessage(sampleErrorMessage(error));
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url, extension]);

  if (status === "loading") {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        <span className="ml-2 text-sm">Loading data…</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
        {errorMessage}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
        This file has no rows to display.
      </div>
    );
  }

  // Treat the first row as headers — true for essentially every sample sheet.
  const [headerRow, ...bodyRows] = rows;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto bg-background">
        <table
          className="w-full border-collapse text-xs select-none"
          onContextMenu={(event) => event.preventDefault()}
          aria-label={title}
        >
          <thead className="sticky top-0 z-10 bg-muted">
            <tr>
              {headerRow.map((cell, index) => (
                <th
                  key={index}
                  scope="col"
                  className="border border-border/60 px-3 py-2 text-left font-semibold whitespace-nowrap"
                >
                  {toDisplayValue(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-muted/30">
                {headerRow.map((_, columnIndex) => (
                  <td key={columnIndex} className="border border-border/60 px-3 py-1.5 align-top">
                    {toDisplayValue(row[columnIndex] ?? null)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {truncated && (
        <p className="border-t border-border/40 bg-background/60 p-2 text-center text-[11px] text-muted-foreground">
          Showing the first {MAX_ROWS} rows of this sample.
        </p>
      )}
    </div>
  );
}
