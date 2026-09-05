/**
 * Centralized HTTP client for the eQOURSE backend API.
 *
 * Handles:
 * - Base URL from `VITE_API_BASE_URL` env variable
 * - JWT auth header injection
 * - Response envelope unwrapping ({ success, data } → data)
 * - 401 → auto-logout + redirect to /admin/login
 * - Typed error handling
 *
 * Used exclusively by `apiLive.ts`. The mock implementation in
 * `apiMock.ts` does NOT use this client.
 */

// ─── Types ──────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Constants ──────────────────────────────────────────────
const TOKEN_KEY = "eqourse_admin_token";
const USER_KEY = "eqourse_admin_user";

function getBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE_URL as string) ?? "";
}

// ─── Helpers ────────────────────────────────────────────────
function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function buildHeaders(extra?: Record<string, string>): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extra,
  };
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Parse the backend response.
 *
 * The vendor's backend wraps every response in:
 *   { success: true, data: <actual payload> }
 *
 * On error:
 *   { success: false, message: "..." }
 *
 * This function unwraps the envelope and returns just the payload,
 * or throws an ApiError on failure.
 */
async function parseResponse<T>(res: Response): Promise<T> {
  // Handle no-content responses (e.g. 204 after delete)
  if (res.status === 204) {
    return { ok: true } as unknown as T;
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new ApiError("Failed to parse server response", res.status);
  }

  // Handle HTTP errors
  if (!res.ok) {
    const msg =
      (body as { message?: string })?.message ??
      `Request failed with status ${res.status}`;

    // 401 Unauthorized → clear auth and redirect to login
    if (res.status === 401) {
      clearAuth();
      // Only redirect if we're in a browser context (not SSR)
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }

    throw new ApiError(msg, res.status, undefined, body);
  }

  // Unwrap the { success, data } envelope if present
  if (body && typeof body === "object" && "success" in body) {
    const envelope = body as { success: boolean; data?: unknown; message?: string };
    if (!envelope.success) {
      throw new ApiError(
        envelope.message ?? "Unknown server error",
        res.status,
        undefined,
        body,
      );
    }
    // Some endpoints return { success: true, message: "..." } without data
    // (e.g. delete). Return the full body minus 'success' in that case.
    if ("data" in envelope && envelope.data !== undefined) {
      return envelope.data as T;
    }
    // Return the body itself if there's no .data property (e.g. login returns { success, _id, token })
    return body as T;
  }

  // No envelope - return raw body
  return body as T;
}

// ─── Public API ─────────────────────────────────────────────

/**
 * GET request
 */
export async function get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(path, getBaseUrl());
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") {
        url.searchParams.set(k, String(v));
      }
    });
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: buildHeaders(),
  });
  return parseResponse<T>(res);
}

/**
 * POST request
 */
export async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "POST",
    headers: buildHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseResponse<T>(res);
}

/**
 * PATCH request
 */
export async function patch<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "PATCH",
    headers: buildHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseResponse<T>(res);
}

/**
 * DELETE request
 */
export async function del<T = { ok: boolean }>(path: string): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "DELETE",
    headers: buildHeaders(),
  });
  return parseResponse<T>(res);
}

/** Download an authenticated private file without exposing its storage URL. */
export async function downloadFile(path: string, fallbackFilename: string): Promise<void> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "GET",
    headers: buildHeaders(),
  });
  if (!res.ok) await parseResponse<never>(res);

  const disposition = res.headers.get("Content-Disposition") || "";
  const utf8Name = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const plainName = disposition.match(/filename="?([^";]+)"?/i)?.[1];
  let filename = fallbackFilename;
  try { filename = decodeURIComponent(utf8Name || plainName || fallbackFilename); } catch { /* keep fallback */ }

  const objectUrl = URL.createObjectURL(await res.blob());
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

/**
 * Upload a file via multipart/form-data.
 * Does NOT set Content-Type header (browser sets it with boundary).
 */
export async function uploadFile<T>(path: string, file: File, fieldName = "file", extraFields?: Record<string, string>): Promise<T> {
  const formData = new FormData();
  if (extraFields) {
    Object.entries(extraFields).forEach(([k, v]) => formData.append(k, v));
  }
  formData.append(fieldName, file);

  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  // Do NOT set Content-Type - let the browser add multipart/form-data with boundary

  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });
  return parseResponse<T>(res);
}
