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

export type ServiceInterest = "ai-data" | "content-services" | "localization" | "other";

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
  seo: {
    title?: string;
    description?: string;
    ogImageUrl?: string;
    coverImageAlt?: string;
    coverImageTitle?: string;
  };
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
  relatedLinks?: { label: string; href: string }[];
  bodyFormat: "html" | "markdown";
  seo: {
    title?: string;
    description?: string;
    ogImageUrl?: string;
    heroImageAlt?: string;
    heroImageTitle?: string;
  };
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
  pageSlug?: string;
  tabName?: string;
  fileType?: string;
  isExternal?: boolean;
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

// ─── Career / Hiring Management ──────────────────────────────

export type JobDepartment = "ai-data" | "content-services" | "operations" | "marketing" | "technology" | "hr" | "other";
export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";
export type JobStatus = "active" | "paused" | "closed";
export type ApplicationStatus = "applied" | "shortlisted" | "rejected" | "hired";

export type CustomQuestionType = "text" | "textarea" | "select" | "checkbox" | "radio" | "url";

export interface CustomQuestion {
  _id?: string;
  label: string;
  type: CustomQuestionType;
  required: boolean;
  options: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  slug: string;
  department: JobDepartment;
  departmentLabel: string;
  location: string;
  employmentType: EmploymentType;
  experienceRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  salaryRange: string;
  salaryCurrency: "INR" | "USD" | "EUR" | "GBP" | "SGD";
  status: JobStatus;
  applicationCount: number;
  postedAt: string;
  closingDate?: string;
  customQuestions?: CustomQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomAnswer {
  questionLabel: string;
  answerValue: string | string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  receiptId: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  currentRole: string;
  qualification: string;
  portfolioLink: string;
  resumeDriveLink: string;
  resumeFile: Attachment | null;
  coverLetter: string;
  skills: string[];
  status: ApplicationStatus;
  internalNotes: string;
  notesUpdatedAt?: string;
  customAnswers?: CustomAnswer[];
  statusChangedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TalentProfile {
  id: string;
  receiptId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  preferredRoles: string[];
  experience: string;
  currentRole: string;
  qualification: string;
  skills: string[];
  portfolioLink: string;
  message: string;
  resumeFile: Attachment | null;
  status: ApplicationStatus;
  internalNotes: string;
  notesUpdatedAt?: string;
  statusChangedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type VendorStatus = "registered" | "approved" | "hold" | "rejected";

export interface VendorRegistration {
  id: string;
  receiptId: string;
  companyName: string;
  country: string;
  registrationNumber: string;
  taxNumber: string;
  website: string;
  yearsInBusiness: number;
  teamSize: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  services: string[];
  capabilitySummary: string;
  registrationDocument: Attachment;
  taxReturns: Attachment[];
  status: VendorStatus;
  internalNotes: string;
  statusMessage: string;
  notesUpdatedAt?: string;
  statusChangedAt?: string;
  createdAt: string;
  updatedAt: string;
}
