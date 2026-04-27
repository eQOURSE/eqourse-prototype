/**
 * Admin API client.
 *
 * Currently backed by an in-browser localStorage mock so the dashboard
 * can be demoed end-to-end without a backend. To go live, swap each
 * function body for a fetch() call against the real API per
 * docs/BACKEND_INTEGRATION_GUIDE.md. Function signatures and return
 * types should NOT change — they are the source of truth the vendor
 * implements against.
 */
import type {
  AdminUser,
  AnalyticsSummary,
  BlogPost,
  CaseStudy,
  ContactQuery,
  PagedResponse,
  PilotQuery,
  PublishStatus,
  QueryListParams,
  QueryStatus,
  Sample,
  SampleCategory,
} from "./types";
import {
  seedBlogs,
  seedCaseStudies,
  seedContactQueries,
  seedPilotQueries,
  seedSampleCategories,
  seedSamples,
} from "./mockSeed";

// ============================================================
// Storage helpers
// ============================================================
const STORAGE_PREFIX = "eqourse_admin_";
const KEYS = {
  contact: STORAGE_PREFIX + "contact_queries",
  pilot: STORAGE_PREFIX + "pilot_queries",
  blogs: STORAGE_PREFIX + "blogs",
  caseStudies: STORAGE_PREFIX + "case_studies",
  sampleCategories: STORAGE_PREFIX + "sample_categories",
  samples: STORAGE_PREFIX + "samples",
  user: STORAGE_PREFIX + "user",
  token: STORAGE_PREFIX + "token",
} as const;

function load<T>(key: string, seed: () => T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      const seeded = seed();
      localStorage.setItem(key, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw) as T;
  } catch {
    return seed();
  }
}

function save<T>(key: string, value: T): T {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

const nowISO = () => new Date().toISOString();
const newId = () => Math.random().toString(36).slice(2, 11) + Date.now().toString(36);

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const delay = <T>(value: T, ms = 250): Promise<T> =>
  new Promise((res) => setTimeout(() => res(value), ms));

// ============================================================
// Auth
// ============================================================
export interface LoginInput { email: string; password: string }

export const adminApi = {
  // ----- Auth -----
  async login(input: LoginInput): Promise<{ token: string; user: AdminUser }> {
    // Mock: accept any non-empty email + password >= 4 chars
    if (!input.email || input.password.length < 4) {
      throw new Error("Invalid email or password");
    }
    const user: AdminUser = {
      id: "admin-1",
      email: input.email,
      name: input.email.split("@")[0].replace(/\./g, " "),
    };
    const token = "mock-jwt-" + newId();
    localStorage.setItem(KEYS.token, token);
    localStorage.setItem(KEYS.user, JSON.stringify(user));
    return delay({ token, user }, 400);
  },

  async logout(): Promise<void> {
    localStorage.removeItem(KEYS.token);
    localStorage.removeItem(KEYS.user);
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(KEYS.user);
      return raw ? (JSON.parse(raw) as AdminUser) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(KEYS.token);
  },

  // ----- Analytics -----
  async getAnalytics(): Promise<AnalyticsSummary> {
    const contact = load(KEYS.contact, seedContactQueries);
    const pilot = load(KEYS.pilot, seedPilotQueries);
    const blogs = load(KEYS.blogs, seedBlogs);
    const cases = load(KEYS.caseStudies, seedCaseStudies);
    const samples = load(KEYS.samples, seedSamples);

    // Build last-30-days time series
    const days: { date: string; contact: number; pilot: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const date = d.toISOString().slice(0, 10);
      days.push({
        date,
        contact: contact.filter((q) => q.createdAt.slice(0, 10) === date).length,
        pilot: pilot.filter((q) => q.createdAt.slice(0, 10) === date).length,
      });
    }

    const interestCounts = new Map<string, number>();
    pilot.forEach((p) => interestCounts.set(p.serviceInterest, (interestCounts.get(p.serviceInterest) ?? 0) + 1));

    const statusCounts = new Map<QueryStatus, number>();
    [...contact, ...pilot].forEach((q) => {
      statusCounts.set(q.status, (statusCounts.get(q.status) ?? 0) + 1);
    });

    return delay({
      totals: {
        contactQueries: contact.length,
        pilotQueries: pilot.length,
        blogs: blogs.length,
        caseStudies: cases.length,
        samples: samples.length,
      },
      deltas: { contactQueries: 12.5, pilotQueries: -3.2 },
      queriesOverTime: days,
      serviceInterestBreakdown: Array.from(interestCounts.entries()).map(([label, count]) => ({ label, count })),
      statusFunnel: (["new", "in_progress", "contacted", "closed"] as QueryStatus[]).map((status) => ({
        status,
        count: statusCounts.get(status) ?? 0,
      })),
    });
  },

  // ----- Contact Queries -----
  async listContactQueries(params: QueryListParams = {}): Promise<PagedResponse<ContactQuery>> {
    const all = load(KEYS.contact, seedContactQueries);
    const filtered = filterQueries(all, params);
    return delay(paginate(filtered, params));
  },
  async getContactQuery(id: string): Promise<ContactQuery | null> {
    return delay(load(KEYS.contact, seedContactQueries).find((q) => q.id === id) ?? null);
  },
  async updateContactQuery(id: string, patch: Partial<Pick<ContactQuery, "status" | "internalNotes">>) {
    const all = load(KEYS.contact, seedContactQueries);
    const next = all.map((q) => (q.id === id ? { ...q, ...patch, updatedAt: nowISO() } : q));
    save(KEYS.contact, next);
    return delay(next.find((q) => q.id === id)!);
  },
  async deleteContactQuery(id: string) {
    const all = load(KEYS.contact, seedContactQueries);
    save(KEYS.contact, all.filter((q) => q.id !== id));
    return delay({ ok: true });
  },

  // ----- Pilot Queries -----
  async listPilotQueries(params: QueryListParams = {}): Promise<PagedResponse<PilotQuery>> {
    const all = load(KEYS.pilot, seedPilotQueries);
    const filtered = filterQueries(all, params);
    return delay(paginate(filtered, params));
  },
  async getPilotQuery(id: string): Promise<PilotQuery | null> {
    return delay(load(KEYS.pilot, seedPilotQueries).find((q) => q.id === id) ?? null);
  },
  async updatePilotQuery(id: string, patch: Partial<Pick<PilotQuery, "status" | "internalNotes">>) {
    const all = load(KEYS.pilot, seedPilotQueries);
    const next = all.map((q) => (q.id === id ? { ...q, ...patch, updatedAt: nowISO() } : q));
    save(KEYS.pilot, next);
    return delay(next.find((q) => q.id === id)!);
  },
  async deletePilotQuery(id: string) {
    const all = load(KEYS.pilot, seedPilotQueries);
    save(KEYS.pilot, all.filter((q) => q.id !== id));
    return delay({ ok: true });
  },

  // ----- Blogs -----
  async listBlogs(): Promise<BlogPost[]> {
    return delay(load(KEYS.blogs, seedBlogs).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
  },
  async getBlog(id: string): Promise<BlogPost | null> {
    return delay(load(KEYS.blogs, seedBlogs).find((b) => b.id === id) ?? null);
  },
  async createBlog(input: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "slug"> & { slug?: string }): Promise<BlogPost> {
    const all = load(KEYS.blogs, seedBlogs);
    const slug = input.slug?.trim() || slugify(input.title);
    if (all.some((b) => b.slug === slug)) throw new Error("slug_taken");
    const blog: BlogPost = {
      ...input,
      id: newId(),
      slug,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    save(KEYS.blogs, [blog, ...all]);
    return delay(blog);
  },
  async updateBlog(id: string, patch: Partial<BlogPost>): Promise<BlogPost> {
    const all = load(KEYS.blogs, seedBlogs);
    if (patch.slug && all.some((b) => b.slug === patch.slug && b.id !== id)) {
      throw new Error("slug_taken");
    }
    const next = all.map((b) => (b.id === id ? { ...b, ...patch, updatedAt: nowISO() } : b));
    save(KEYS.blogs, next);
    return delay(next.find((b) => b.id === id)!);
  },
  async deleteBlog(id: string) {
    const all = load(KEYS.blogs, seedBlogs);
    save(KEYS.blogs, all.filter((b) => b.id !== id));
    return delay({ ok: true });
  },
  async setBlogStatus(id: string, status: PublishStatus) {
    return adminApi.updateBlog(id, {
      status,
      publishedAt: status === "published" ? nowISO() : undefined,
    });
  },

  // ----- Case Studies -----
  async listCaseStudies(): Promise<CaseStudy[]> {
    return delay(load(KEYS.caseStudies, seedCaseStudies).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
  },
  async getCaseStudy(id: string): Promise<CaseStudy | null> {
    return delay(load(KEYS.caseStudies, seedCaseStudies).find((c) => c.id === id) ?? null);
  },
  async createCaseStudy(input: Omit<CaseStudy, "id" | "createdAt" | "updatedAt" | "slug"> & { slug?: string }): Promise<CaseStudy> {
    const all = load(KEYS.caseStudies, seedCaseStudies);
    const slug = input.slug?.trim() || slugify(input.title);
    if (all.some((c) => c.slug === slug)) throw new Error("slug_taken");
    const cs: CaseStudy = {
      ...input,
      id: newId(),
      slug,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    save(KEYS.caseStudies, [cs, ...all]);
    return delay(cs);
  },
  async updateCaseStudy(id: string, patch: Partial<CaseStudy>): Promise<CaseStudy> {
    const all = load(KEYS.caseStudies, seedCaseStudies);
    if (patch.slug && all.some((c) => c.slug === patch.slug && c.id !== id)) {
      throw new Error("slug_taken");
    }
    const next = all.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: nowISO() } : c));
    save(KEYS.caseStudies, next);
    return delay(next.find((c) => c.id === id)!);
  },
  async deleteCaseStudy(id: string) {
    const all = load(KEYS.caseStudies, seedCaseStudies);
    save(KEYS.caseStudies, all.filter((c) => c.id !== id));
    return delay({ ok: true });
  },
  async setCaseStudyStatus(id: string, status: PublishStatus) {
    return adminApi.updateCaseStudy(id, {
      status,
      publishedAt: status === "published" ? nowISO() : undefined,
    });
  },

  // ----- Sample Categories -----
  async listSampleCategories(): Promise<SampleCategory[]> {
    const cats = load(KEYS.sampleCategories, seedSampleCategories);
    const samples = load(KEYS.samples, seedSamples);
    const withCounts = cats
      .map((c) => ({ ...c, sampleCount: samples.filter((s) => s.categoryId === c.id).length }))
      .sort((a, b) => a.order - b.order);
    return delay(withCounts);
  },
  async getSampleCategory(id: string): Promise<SampleCategory | null> {
    return delay(load(KEYS.sampleCategories, seedSampleCategories).find((c) => c.id === id) ?? null);
  },
  async createSampleCategory(input: Omit<SampleCategory, "id" | "createdAt" | "updatedAt" | "slug" | "sampleCount"> & { slug?: string }): Promise<SampleCategory> {
    const all = load(KEYS.sampleCategories, seedSampleCategories);
    const slug = input.slug?.trim() || slugify(input.name);
    if (all.some((c) => c.slug === slug)) throw new Error("slug_taken");
    const cat: SampleCategory = {
      ...input,
      id: newId(),
      slug,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    save(KEYS.sampleCategories, [...all, cat]);
    return delay(cat);
  },
  async updateSampleCategory(id: string, patch: Partial<SampleCategory>): Promise<SampleCategory> {
    const all = load(KEYS.sampleCategories, seedSampleCategories);
    if (patch.slug && all.some((c) => c.slug === patch.slug && c.id !== id)) {
      throw new Error("slug_taken");
    }
    const next = all.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: nowISO() } : c));
    save(KEYS.sampleCategories, next);
    return delay(next.find((c) => c.id === id)!);
  },
  async deleteSampleCategory(id: string, opts: { force?: boolean } = {}) {
    const samples = load(KEYS.samples, seedSamples);
    const hasSamples = samples.some((s) => s.categoryId === id);
    if (hasSamples && !opts.force) throw new Error("category_not_empty");
    if (opts.force) save(KEYS.samples, samples.filter((s) => s.categoryId !== id));
    save(
      KEYS.sampleCategories,
      load(KEYS.sampleCategories, seedSampleCategories).filter((c) => c.id !== id)
    );
    return delay({ ok: true });
  },

  // ----- Samples -----
  async listSamplesByCategory(categoryId: string): Promise<Sample[]> {
    return delay(
      load(KEYS.samples, seedSamples)
        .filter((s) => s.categoryId === categoryId)
        .sort((a, b) => a.order - b.order)
    );
  },
  async getSample(id: string): Promise<Sample | null> {
    return delay(load(KEYS.samples, seedSamples).find((s) => s.id === id) ?? null);
  },
  async createSample(input: Omit<Sample, "id" | "createdAt" | "updatedAt" | "order"> & { order?: number }): Promise<Sample> {
    const all = load(KEYS.samples, seedSamples);
    const inCat = all.filter((s) => s.categoryId === input.categoryId);
    const order = input.order ?? inCat.length + 1;
    const sample: Sample = {
      ...input,
      id: newId(),
      order,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    save(KEYS.samples, [...all, sample]);
    return delay(sample);
  },
  async updateSample(id: string, patch: Partial<Sample>): Promise<Sample> {
    const all = load(KEYS.samples, seedSamples);
    const next = all.map((s) => (s.id === id ? { ...s, ...patch, updatedAt: nowISO() } : s));
    save(KEYS.samples, next);
    return delay(next.find((s) => s.id === id)!);
  },
  async deleteSample(id: string) {
    const all = load(KEYS.samples, seedSamples);
    save(KEYS.samples, all.filter((s) => s.id !== id));
    return delay({ ok: true });
  },
  async reorderSample(id: string, order: number) {
    return adminApi.updateSample(id, { order });
  },

  // ----- Uploads -----
  /**
   * Mock upload: reads the file as a data URL and returns it as the URL.
   * In production, this should POST to `/api/admin/uploads` and return the
   * server-issued URL. See section 4.7 in the integration guide.
   */
  async uploadFile(file: File, _kind: string): Promise<{ url: string; originalName: string; size: number; mimeType: string }> {
    const url = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    return delay({ url, originalName: file.name, size: file.size, mimeType: file.type });
  },
};

// ============================================================
// Helpers
// ============================================================
function filterQueries<T extends ContactQuery | PilotQuery>(rows: T[], params: QueryListParams): T[] {
  return rows
    .filter((r) => !params.status || params.status === "all" || r.status === params.status)
    .filter((r) => !params.from || r.createdAt >= params.from)
    .filter((r) => !params.to || r.createdAt <= params.to + "T23:59:59Z")
    .filter((r) => {
      if (!params.q) return true;
      const q = params.q.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        ("subject" in r && (r as ContactQuery).subject.toLowerCase().includes(q)) ||
        ("company" in r && (r.company ?? "").toLowerCase().includes(q))
      );
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function paginate<T>(rows: T[], params: QueryListParams): PagedResponse<T> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 25;
  const start = (page - 1) * pageSize;
  return { items: rows.slice(start, start + pageSize), total: rows.length, page, pageSize };
}

export { slugify };
