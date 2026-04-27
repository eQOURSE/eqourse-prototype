export type QueryStatus = "new" | "in_progress" | "contacted" | "closed";

export interface Attachment {
  url: string;
  originalName: string;
  size: number;
  mimeType: string;
}

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  attachment?: Attachment;
  status: QueryStatus;
  internalNotes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceInterest = "ai-data" | "edtech" | "localization" | "other";

export interface PilotQuery {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  role?: string;
  serviceInterest: ServiceInterest;
  projectScope: string;
  timeline?: string;
  attachment?: Attachment;
  status: QueryStatus;
  internalNotes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export type PublishStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  body: string;
  bodyFormat: "html" | "markdown";
  tags: string[];
  author: { name: string; avatarUrl?: string };
  seo: { title?: string; description?: string; ogImageUrl?: string };
  status: PublishStatus;
  publishedAt?: string;
  readingMinutes?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
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
  bodyFormat: "html" | "markdown";
  seo: { title?: string; description?: string; ogImageUrl?: string };
  status: PublishStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SampleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  order: number;
  sampleCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sample {
  id: string;
  categoryId: string;
  title: string;
  type: string; // Course Book / Lesson Plan / Workbook / custom
  description?: string;
  thumbnailUrl: string;
  fileUrl: string;
  fileSize?: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface AnalyticsSummary {
  totals: {
    contactQueries: number;
    pilotQueries: number;
    blogs: number;
    caseStudies: number;
    samples: number;
  };
  deltas: {
    contactQueries: number;
    pilotQueries: number;
  };
  queriesOverTime: { date: string; contact: number; pilot: number }[];
  serviceInterestBreakdown: { label: string; count: number }[];
  statusFunnel: { status: QueryStatus; count: number }[];
}

export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QueryListParams {
  status?: QueryStatus | "all";
  from?: string;
  to?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}
