import { MAX_SPREADSHEET_BYTES, MAX_TEXT_PREVIEW_BYTES } from "./sampleFormats";

/**
 * Fetch helpers for sample files.
 *
 * Sample bytes are served by the origin (or the CDN edge in front of it) at
 * `/api/uploads/sample-file/...`. The viewer needs some formats as text and
 * others as an ArrayBuffer, and both paths need a hard size ceiling: these are
 * parsed on the main thread, and an unbounded read is an easy way to hang a
 * visitor's tab on a file an admin uploaded without thinking.
 *
 * `Content-Length` is checked first so an oversized file is rejected before it
 * is transferred. Some responses omit it (chunked transfer), so the decoded
 * length is checked again afterwards.
 */

export class SampleTooLargeError extends Error {
  constructor(limitBytes: number) {
    super(`This sample is too large to preview in the browser (limit ${Math.round(limitBytes / 1024)} KB).`);
    this.name = "SampleTooLargeError";
  }
}

export class SampleFetchError extends Error {
  constructor(status?: number) {
    super(status ? `The sample could not be loaded (HTTP ${status}).` : "The sample could not be loaded.");
    this.name = "SampleFetchError";
  }
}

async function requestSample(url: string, limitBytes: number, signal?: AbortSignal): Promise<Response> {
  const response = await fetch(url, { signal, credentials: "same-origin" });
  if (!response.ok) throw new SampleFetchError(response.status);

  const declaredLength = Number(response.headers.get("content-length") ?? Number.NaN);
  if (Number.isFinite(declaredLength) && declaredLength > limitBytes) {
    throw new SampleTooLargeError(limitBytes);
  }
  return response;
}

export async function fetchSampleText(
  url: string,
  signal?: AbortSignal,
  limitBytes = MAX_TEXT_PREVIEW_BYTES,
): Promise<string> {
  const response = await requestSample(url, limitBytes, signal);
  const text = await response.text();
  if (text.length > limitBytes) throw new SampleTooLargeError(limitBytes);
  return text;
}

export async function fetchSampleBuffer(
  url: string,
  signal?: AbortSignal,
  limitBytes = MAX_SPREADSHEET_BYTES,
): Promise<ArrayBuffer> {
  const response = await requestSample(url, limitBytes, signal);
  const buffer = await response.arrayBuffer();
  if (buffer.byteLength > limitBytes) throw new SampleTooLargeError(limitBytes);
  return buffer;
}

/** Normalises any thrown value into something safe to show a visitor. */
export function sampleErrorMessage(error: unknown): string {
  if (error instanceof SampleTooLargeError || error instanceof SampleFetchError) return error.message;
  return "This sample could not be displayed. Please try again, or contact us for a walkthrough.";
}
