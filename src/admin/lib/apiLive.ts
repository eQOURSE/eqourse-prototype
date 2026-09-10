/**
 * Live API implementation - real HTTP calls to the backend.
 *
 * Same function signatures as `apiMock.ts` so the rest of the admin
 * panel doesn't know or care which implementation it's using.
 *
 * All calls go through `apiClient.ts` which handles:
 *   - JWT auth headers
 *   - { success, data } envelope unwrapping
 *   - 401 → auto-redirect to /admin/login
 */

import * as client from "./apiClient";
import type {
  AdminUser,
  AnalyticsSummary,
  ApplicationStatus,
  BlogPost,
  CaseStudy,
  ContactQuery,
  JobApplication,
  JobOpening,
  PagedResponse,
  PilotQuery,
  PublishStatus,
  QueryListParams,
  Sample,
  SampleCategory,
  TalentProfile,
  VendorRegistration,
  VendorStatus,
} from "./types";
import type { LoginInput } from "./apiMock";

// ─── Constants ──────────────────────────────────────────────
const TOKEN_KEY = "eqourse_admin_token";
const USER_KEY = "eqourse_admin_user";

// ─── The live API object ────────────────────────────────────
export const liveApi = {
  // ═══════════════════════════════════════════════════════════
  // Auth
  // ═══════════════════════════════════════════════════════════
  async login(input: LoginInput): Promise<{ token: string; user: AdminUser }> {
    // Backend returns: { success: true, _id, username, email, token }
    // We need to transform to: { token, user: { id, email, name } }
    const raw = await client.post<{
      _id: string;
      username: string;
      email: string;
      token: string;
    }>("/api/admin/login", input);

    const user: AdminUser = {
      id: raw._id,
      email: raw.email,
      name: raw.username,
    };

    // Store credentials
    localStorage.setItem(TOKEN_KEY, raw.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { token: raw.token, user };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AdminUser) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // ═══════════════════════════════════════════════════════════
  // Analytics
  // ═══════════════════════════════════════════════════════════
  async getAnalytics(): Promise<AnalyticsSummary> {
    return client.get<AnalyticsSummary>("/api/admin/analytics/summary");
  },

  // ═══════════════════════════════════════════════════════════
  // Contact Queries
  // ═══════════════════════════════════════════════════════════
  async listContactQueries(params: QueryListParams = {}): Promise<PagedResponse<ContactQuery>> {
    return client.get<PagedResponse<ContactQuery>>("/api/admin/contact-queries", {
      status: params.status === "all" ? undefined : params.status,
      from: params.from,
      to: params.to,
      q: params.q,
      page: params.page,
      pageSize: params.pageSize,
    });
  },

  async getContactQuery(id: string): Promise<ContactQuery | null> {
    try {
      return await client.get<ContactQuery>(`/api/admin/contact-queries/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async updateContactQuery(id: string, patch: Partial<Pick<ContactQuery, "status" | "internalNotes">>) {
    return client.patch<ContactQuery>(`/api/admin/contact-queries/${id}`, patch);
  },

  async deleteContactQuery(id: string) {
    return client.del(`/api/admin/contact-queries/${id}`);
  },

  // ═══════════════════════════════════════════════════════════
  // Pilot Queries
  // ═══════════════════════════════════════════════════════════
  async listPilotQueries(params: QueryListParams = {}): Promise<PagedResponse<PilotQuery>> {
    return client.get<PagedResponse<PilotQuery>>("/api/admin/pilot-queries", {
      status: params.status === "all" ? undefined : params.status,
      from: params.from,
      to: params.to,
      q: params.q,
      page: params.page,
      pageSize: params.pageSize,
    });
  },

  async getPilotQuery(id: string): Promise<PilotQuery | null> {
    try {
      return await client.get<PilotQuery>(`/api/admin/pilot-queries/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async updatePilotQuery(id: string, patch: Partial<Pick<PilotQuery, "status" | "internalNotes">>) {
    return client.patch<PilotQuery>(`/api/admin/pilot-queries/${id}`, patch);
  },

  async deletePilotQuery(id: string) {
    return client.del(`/api/admin/pilot-queries/${id}`);
  },

  // ═══════════════════════════════════════════════════════════
  // Blogs
  // ═══════════════════════════════════════════════════════════
  async listBlogs(): Promise<BlogPost[]> {
    const res = await client.get<{ items: BlogPost[] }>("/api/admin/blogs");
    return res.items;
  },

  async getBlog(id: string): Promise<BlogPost | null> {
    try {
      return await client.get<BlogPost>(`/api/admin/blogs/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async createBlog(input: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "slug"> & { slug?: string }): Promise<BlogPost> {
    return client.post<BlogPost>("/api/admin/blogs", input);
  },

  async updateBlog(id: string, patch: Partial<BlogPost>): Promise<BlogPost> {
    return client.patch<BlogPost>(`/api/admin/blogs/${id}`, patch);
  },

  async deleteBlog(id: string) {
    return client.del(`/api/admin/blogs/${id}`);
  },

  async setBlogStatus(id: string, status: PublishStatus) {
    return client.patch<BlogPost>(`/api/admin/blogs/${id}/status`, { status });
  },

  // ═══════════════════════════════════════════════════════════
  // Case Studies
  // ═══════════════════════════════════════════════════════════
  async listCaseStudies(): Promise<CaseStudy[]> {
    const res = await client.get<{ items: CaseStudy[] }>("/api/admin/case-studies");
    return res.items;
  },

  async getCaseStudy(id: string): Promise<CaseStudy | null> {
    try {
      return await client.get<CaseStudy>(`/api/admin/case-studies/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async createCaseStudy(input: Omit<CaseStudy, "id" | "createdAt" | "updatedAt" | "slug"> & { slug?: string }): Promise<CaseStudy> {
    return client.post<CaseStudy>("/api/admin/case-studies", input);
  },

  async updateCaseStudy(id: string, patch: Partial<CaseStudy>): Promise<CaseStudy> {
    return client.patch<CaseStudy>(`/api/admin/case-studies/${id}`, patch);
  },

  async deleteCaseStudy(id: string) {
    return client.del(`/api/admin/case-studies/${id}`);
  },

  async setCaseStudyStatus(id: string, status: PublishStatus) {
    return client.patch<CaseStudy>(`/api/admin/case-studies/${id}/status`, { status });
  },

  // ═══════════════════════════════════════════════════════════
  // Sample Categories
  // ═══════════════════════════════════════════════════════════
  async listSampleCategories(): Promise<SampleCategory[]> {
    const res = await client.get<{ items: SampleCategory[] }>("/api/admin/sample-categories");
    return res.items;
  },

  async getSampleCategory(id: string): Promise<SampleCategory | null> {
    try {
      return await client.get<SampleCategory>(`/api/admin/sample-categories/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async createSampleCategory(input: Omit<SampleCategory, "id" | "createdAt" | "updatedAt" | "slug" | "sampleCount"> & { slug?: string }): Promise<SampleCategory> {
    return client.post<SampleCategory>("/api/admin/sample-categories", input);
  },

  async updateSampleCategory(id: string, patch: Partial<SampleCategory>): Promise<SampleCategory> {
    return client.patch<SampleCategory>(`/api/admin/sample-categories/${id}`, patch);
  },

  async deleteSampleCategory(id: string, opts: { force?: boolean } = {}) {
    const path = opts.force
      ? `/api/admin/sample-categories/${id}?force=true`
      : `/api/admin/sample-categories/${id}`;
    return client.del(path);
  },

  // ═══════════════════════════════════════════════════════════
  // Samples
  // ═══════════════════════════════════════════════════════════
  async listSamplesByCategory(categoryId: string): Promise<Sample[]> {
    const res = await client.get<{ items: Sample[] }>(`/api/admin/sample-categories/${categoryId}/samples`);
    return res.items;
  },

  /** List samples by public page slug and optionally tab name */
  async listSamplesByPage(pageSlug: string, tabName?: string): Promise<Sample[]> {
    const params: Record<string, string> = { pageSlug };
    if (tabName) params.tab = tabName;
    const res = await client.get<{ items: Sample[] }>("/api/admin/samples/by-page", params);
    return res.items;
  },

  async getSample(id: string): Promise<Sample | null> {
    try {
      return await client.get<Sample>(`/api/admin/samples/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async createSample(input: Omit<Sample, "id" | "createdAt" | "updatedAt" | "order"> & { order?: number }): Promise<Sample> {
    return client.post<Sample>(`/api/admin/sample-categories/${input.categoryId}/samples`, input);
  },

  /** Create a sample keyed by pageSlug + tabName (admin hierarchy flow) */
  async createSampleForPage(input: Omit<Sample, "id" | "createdAt" | "updatedAt" | "order" | "categoryId"> & { order?: number }): Promise<Sample> {
    return client.post<Sample>("/api/admin/samples", input);
  },

  async updateSample(id: string, patch: Partial<Sample>): Promise<Sample> {
    return client.patch<Sample>(`/api/admin/samples/${id}`, patch);
  },

  async deleteSample(id: string) {
    return client.del(`/api/admin/samples/${id}`);
  },

  async reorderSample(id: string, order: number) {
    return liveApi.updateSample(id, { order });
  },

  // ═══════════════════════════════════════════════════════════
  // Uploads
  // ═══════════════════════════════════════════════════════════
  async uploadFile(file: File, kind: string): Promise<{ url: string; originalName: string; size: number; mimeType: string }> {
    return client.uploadFile<{ url: string; originalName: string; size: number; mimeType: string }>(
      "/api/admin/uploads",
      file,
      "file",
      { kind },
    );
  },

  // ═══════════════════════════════════════════════════════════
  // Careers / Job Openings
  // ═══════════════════════════════════════════════════════════
  async listJobOpenings(params: { status?: string; department?: string; q?: string; page?: number; pageSize?: number } = {}): Promise<PagedResponse<JobOpening>> {
    const qs = new URLSearchParams();
    if (params.status) qs.set("status", params.status);
    if (params.department) qs.set("department", params.department);
    if (params.q) qs.set("q", params.q);
    if (params.page) qs.set("page", String(params.page));
    if (params.pageSize) qs.set("pageSize", String(params.pageSize));
    return client.get<PagedResponse<JobOpening>>(`/api/admin/careers?${qs}`);
  },

  async getJobOpening(id: string): Promise<JobOpening> {
    return client.get<JobOpening>(`/api/admin/careers/${id}`);
  },

  async createJobOpening(input: Partial<JobOpening>): Promise<JobOpening> {
    return client.post<JobOpening>("/api/admin/careers", input);
  },

  async updateJobOpening(id: string, patch: Partial<JobOpening>): Promise<JobOpening> {
    return client.patch<JobOpening>(`/api/admin/careers/${id}`, patch);
  },

  async deleteJobOpening(id: string) {
    return client.del(`/api/admin/careers/${id}`);
  },

  // ═══════════════════════════════════════════════════════════
  // Job Applications
  // ═══════════════════════════════════════════════════════════
  async listApplications(jobId: string, params: { status?: string; q?: string; page?: number; pageSize?: number } = {}): Promise<PagedResponse<JobApplication> & { statusCounts?: Record<string, number> }> {
    const qs = new URLSearchParams();
    if (params.status) qs.set("status", params.status);
    if (params.q) qs.set("q", params.q);
    if (params.page) qs.set("page", String(params.page));
    if (params.pageSize) qs.set("pageSize", String(params.pageSize));
    return client.get(`/api/admin/careers/${jobId}/applications?${qs}`);
  },

  async getApplication(id: string): Promise<JobApplication> {
    return client.get<JobApplication>(`/api/admin/applications/${id}`);
  },

  async updateApplicationStatus(id: string, status: ApplicationStatus, internalNotes?: string): Promise<JobApplication> {
    return client.patch<JobApplication>(`/api/admin/applications/${id}/status`, { status, internalNotes });
  },

  async updateApplicationNotes(id: string, internalNotes: string): Promise<JobApplication> {
    return client.patch<JobApplication>(`/api/admin/applications/${id}/notes`, { internalNotes });
  },

  async smartFilterApplications(jobId: string, query: string): Promise<{ items: JobApplication[]; total: number }> {
    return client.post(`/api/admin/careers/${jobId}/smart-filter`, { query });
  },

  async downloadApplicationResume(id: string, filename: string): Promise<void> {
    return client.downloadFile(`/api/admin/applications/${id}/resume`, filename);
  },

  async listTalentProfiles(params: { status?: string; q?: string; page?: number; pageSize?: number } = {}): Promise<PagedResponse<TalentProfile> & { statusCounts?: Record<string, number> }> {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => value !== undefined && qs.set(key, String(value)));
    return client.get(`/api/admin/talent-pool?${qs}`);
  },

  async updateTalentProfile(id: string, patch: { status?: ApplicationStatus; internalNotes?: string }): Promise<TalentProfile> {
    return client.patch<TalentProfile>(`/api/admin/talent-pool/${id}`, patch);
  },

  async downloadTalentResume(id: string, filename: string): Promise<void> {
    return client.downloadFile(`/api/admin/talent-pool/${id}/resume`, filename);
  },

  async smartFilterTalentProfiles(query: string): Promise<{ items: TalentProfile[]; total: number }> {
    return client.post("/api/admin/talent-pool/smart-filter", { query });
  },

  async listVendors(params: { status?: string; q?: string; page?: number; pageSize?: number } = {}): Promise<PagedResponse<VendorRegistration> & { statusCounts?: Record<string, number> }> {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => value !== undefined && qs.set(key, String(value)));
    return client.get(`/api/admin/vendors?${qs}`);
  },

  async updateVendor(id: string, patch: { status?: VendorStatus; internalNotes?: string; statusMessage?: string }): Promise<VendorRegistration> {
    return client.patch<VendorRegistration>(`/api/admin/vendors/${id}`, patch);
  },

  async deleteVendor(id: string): Promise<{ ok: boolean }> {
    return client.del(`/api/admin/vendors/${id}`);
  },

  async downloadVendorDocument(id: string, kind: "registration" | "tax", index: number | undefined, filename: string): Promise<void> {
    const suffix = kind === "tax" ? `/tax/${index ?? 0}` : "/registration";
    return client.downloadFile(`/api/admin/vendors/${id}/documents${suffix}`, filename);
  },

  async smartFilterVendors(query: string): Promise<{ items: VendorRegistration[]; total: number }> {
    return client.post("/api/admin/vendors/smart-filter", { query });
  },
};
