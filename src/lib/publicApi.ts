/**
 * Public API client - used by public-facing pages (not admin).
 *
 * Provides functions for:
 * - Fetching published blogs and case studies
 * - Submitting contact and free-pilot forms
 *
 * Falls back gracefully if the backend is unavailable (returns null),
 * so pages can fall back to static data.
 */

// ─── Base URL ───────────────────────────────────────────────
function getBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE_URL as string) ?? "";
}

function isApiAvailable(): boolean {
  return !!import.meta.env.VITE_API_BASE_URL;
}

// ─── Response parsing ───────────────────────────────────────

/**
 * Parse a backend response, unwrapping { success, data } envelope.
 * Returns null on any failure (network, 404, 500, etc.)
 * so callers can fall back to static data.
 */
async function safeParse<T>(res: Response): Promise<T | null> {
  if (!res.ok) return null;

  try {
    const body = await res.json();
    if (body && typeof body === "object" && "success" in body) {
      return body.success ? (body.data as T) ?? (body as T) : null;
    }
    return body as T;
  } catch {
    return null;
  }
}

// ─── Blog API ───────────────────────────────────────────────

export interface PublicBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  body: string;
  bodyFormat: "html" | "markdown";
  tags: string[];
  author: { name: string; avatarUrl?: string };
  categories: [
  {
    category: string;
    subcategories: [
      {
        subcategory: string;
        subSubcategories: string[];
      }
    ];
  }
  ];
  seo: {
    title?: string;
    description?: string;
    ogImageUrl?: string;
    coverImageAlt?: string;
    coverImageTitle?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  readingMinutes?: number;
}

/**
 * Fetch all published blog posts.
 * Returns null if API is unavailable (caller falls back to static data).
 */
export async function fetchPublishedBlogs(): Promise<PublicBlog[] | null> {
  if (!isApiAvailable()) return null;

  try {
    const res = await fetch(`${getBaseUrl()}/api/blogs?limit=100`);
    const data = await safeParse<{ items: PublicBlog[] }>(res);
    return data?.items ?? null;
  } catch {
    return null;
  }
}

/*
category
: 
"ai-data-services"
subSubcategory
: 
"image-data-collection"
subcategory
: 
"data-collection"
*/


export async function fetchBlogByFilterCategory(category: string, subcategory:string, subSubcategory :string): Promise<PublicBlog[] | null> {
  if (!isApiAvailable()) return null;
  try {
    console.log({category , subSubcategory , subcategory})
  const params = new URLSearchParams();
    if (category) {
      params.set("category", category);
    }

    if (subcategory) {
      params.set("sub_category", subcategory);
    }

    if (subSubcategory) {
      params.set("sub_sub_category", subSubcategory);
    }

    const res = await fetch(`${getBaseUrl()}/api/blogs?${params.toString()}`);
    const data = await safeParse<{ items: PublicBlog[] }>(res);
    console.log({data})
    return data?.items ?? null;
  } catch {
    return null;
  }
}


/**
 * Fetch a single published blog post by slug.
 * Returns null if not found or API unavailable.
 */
export async function fetchBlogBySlug(slug: string): Promise<PublicBlog | null> {
  if (!isApiAvailable()) return null;

  try {
    const res = await fetch(`${getBaseUrl()}/api/blogs/${slug}`);
    return safeParse<PublicBlog>(res);
  } catch {
    return null;
  }
}

// ─── Case Study API ─────────────────────────────────────────

export interface PublicCaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  heroImageUrl: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  relatedLinks?: { label: string; href: string }[];
  seo: {
    title?: string;
    description?: string;
    ogImageUrl?: string;
    heroImageAlt?: string;
    heroImageTitle?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
}

/**
 * Fetch all published case studies.
 * Returns null if API is unavailable.
 */
export async function fetchPublishedCaseStudies(): Promise<PublicCaseStudy[] | null> {
  if (!isApiAvailable()) return null;

  try {
    const res = await fetch(`${getBaseUrl()}/api/case-studies?limit=100`);
    const data = await safeParse<{ items: PublicCaseStudy[] }>(res);
    return data?.items ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch a single published case study by slug.
 * Returns null if not found or API unavailable.
 */
export async function fetchCaseStudyBySlug(slug: string): Promise<PublicCaseStudy | null> {
  if (!isApiAvailable()) return null;

  try {
    const res = await fetch(`${getBaseUrl()}/api/case-studies/${slug}`);
    return safeParse<PublicCaseStudy>(res);
  } catch {
    return null;
  }
}

// ─── Contact Form API ───────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  phone_code?: string;
  company?: string;
  designation?: string;
  subject: string;
  message?: string;
  source?: string;
  preferredDate?: string;
  preferredTime?: string;
}

/**
 * Submit a contact form inquiry.
 * Returns true on success, error message string on failure.
 */
export async function submitContactForm(data: ContactFormData): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isApiAvailable()) {
    // Graceful fallback: simulate success when no backend
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1500));
  }

  try {
    const res = await fetch(`${getBaseUrl()}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: (body as { message?: string }).message ?? "Submission failed. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}

// ─── Free Pilot Form API ───────────────────────────────────

export interface FreePilotFormData {
  name: string;
  email: string;
  phone?: string;
  phone_code?: string;
  company: string;
  role?: string;
  serviceInterest: string;
  projectScope: string;
  timeline?: string;
  languages?: string;
  message?: string;
  source?: string;
  file?: File;
}

/**
 * Submit a free pilot request.
 * Returns true on success, error message string on failure.
 */
export async function submitFreePilotForm(data: FreePilotFormData): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isApiAvailable()) {
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1500));
  }

  try {
    const formData = new FormData();
    // Append all text fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== "file") {
        formData.append(key, value as string);
      }
    });

    // Append file if it exists
    if (data.file) {
      formData.append("file", data.file);
      formData.append("kind", "pilot-queries"); // optional, for uploadDir categorization
    }

    const res = await fetch(`${getBaseUrl()}/api/free-pilot`, {
      method: "POST",
      // Do NOT set Content-Type header when using FormData; the browser sets it automatically with the boundary
      body: formData,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: (body as { message?: string }).message ?? "Submission failed. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
// ─── Samples API ─────────────────────────────────────────────

export interface PreviewFile {
  title: string;
  description: string;
  fileType: string;
  fileUrl: string;
  isExternal: boolean;
}

/**
 * Fetch sample files for a specific page slug and tab.
 * Returns null if API is unavailable or on failure, so UI can fall back to static.
 */
export async function fetchSampleFiles(pageSlug: string, tabName?: string): Promise<PreviewFile[] | null> {
  if (!isApiAvailable()) return null;

  try {
    let url = `${getBaseUrl()}/api/samples/files?pageSlug=${encodeURIComponent(pageSlug)}`;
    if (tabName) {
      url += `&tab=${encodeURIComponent(tabName)}`;
    }
    const res = await fetch(url);
    const data = await safeParse<{ files: PreviewFile[] }>(res);
    return data?.files ?? null;
  } catch {
    return null;
  }
}
