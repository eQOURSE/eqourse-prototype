/**
 * Event definitions for the /events page.
 *
 * Each event lives under a unique slug and references CDN-hosted assets
 * (brochures, presentation videos, cover images) served from cdn.eqourse.com.
 *
 * To add a new event, push a new entry into the `events` array below and
 * register the route's SEO metadata in src/seo/pageSeo.ts.
 */

export interface EventAsset {
  /** Full CDN URL to the file */
  url: string;
  /** Suggested download filename */
  filename: string;
  /** MIME type for the preview embed */
  mimeType: string;
  /** Human-friendly label shown in the UI */
  label: string;
}

export interface EventData {
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date string (YYYY-MM-DD) or a descriptive range */
  date: string;
  /** Human-readable date label */
  dateLabel: string;
  location: string;
  description: string;
  /** Longer rich-text description shown on the detail page */
  body: string;
  /** Cover/hero image URL (CDN) */
  coverImage: string;
  /** OG/social sharing image URL (CDN) */
  ogImage: string;
  brochure: EventAsset | null;
  video: EventAsset | null;
  /** Additional downloadable assets (supplementary docs, etc.) */
  extras: EventAsset[];
  /** Whether this event is currently featured/active */
  isFeatured: boolean;
  /** Status for display badges */
  status: "upcoming" | "ongoing" | "completed";
}

const CDN_BASE = "https://cdn.eqourse.com/events";

export const events: EventData[] = [
  {
    slug: "business-tour-2026",
    title: "eQOURSE Business Tour 2026",
    subtitle: "AI Data Services & Content Solutions — Asia",
    date: "2026-10-01",
    dateLabel: "October 2026",
    location: "Multiple locations across Asia",
    description:
      "Explore eQOURSE's comprehensive AI data services and content solutions during our 2026 Business Tour across Asia. Download our brochure and watch our presentation to learn how we help global enterprises scale their AI and learning content operations.",
    body: `
eQOURSE is embarking on a multi-city Business Tour across Asia in 2026, bringing our full suite of AI Data Services and Content Solutions directly to enterprises, publishers, and ed-tech companies across the region.

### What We're Showcasing

- **AI Data Services** — Data collection, annotation & labeling, cleaning & validation, and model testing for computer vision, NLP, speech, and generative AI workflows.
- **Content Services** — Custom e-learning content, exam preparation, editorial publishing, localization, video solutions, and technology platforms.
- **Robotics Training Data** — Human demonstrations, 3D spatial annotation, multimodal sensor data, and VLA evaluation.

### Who Should Attend

- CTOs, VPs of Engineering, and AI/ML team leads looking for high-quality training data partners.
- Publishers and ed-tech companies seeking scalable content development and localization.
- Enterprise learning & development teams evaluating custom e-learning solutions.

Download our brochure below for a complete overview of our capabilities, case studies, and partnership models.
    `.trim(),
    coverImage: `${CDN_BASE}/business-tour-2026/cover.webp`,
    ogImage: `${CDN_BASE}/business-tour-2026/og-cover.webp`,
    brochure: {
      url: `${CDN_BASE}/business-tour-2026/eQOURSE-Business-Tour-2026-Brochure.pdf`,
      filename: "eQOURSE-Business-Tour-2026-Brochure.pdf",
      mimeType: "application/pdf",
      label: "Business Tour 2026 Brochure",
    },
    video: null, // Video to be added later
    extras: [],
    isFeatured: true,
    status: "upcoming",
  },
];

/** Look up an event by its URL slug. */
export function getEventBySlug(slug: string): EventData | undefined {
  return events.find((e) => e.slug === slug);
}
