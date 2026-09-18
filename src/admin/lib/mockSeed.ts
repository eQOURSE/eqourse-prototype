import type {
  BlogPost,
  CaseStudy,
  ContactQuery,
  PilotQuery,
  Sample,
  SampleCategory,
} from "./types";

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

const id = () => Math.random().toString(36).slice(2, 11);

export const seedContactQueries = (): ContactQuery[] => {
  const subjects = [
    "Need quote for e-learning content",
    "Partnership inquiry",
    "Demo request",
    "Pricing for data annotation",
    "Localization for Spanish course",
    "Question about exam prep",
    "Bulk content order",
    "Looking for SMEs in Math",
  ];
  const names = [
    "Aarav Sharma", "Priya Patel", "John Carter", "Mia Rodriguez", "Chen Wei",
    "Fatima Al-Hassan", "Liam O'Brien", "Sofia Rossi", "Daniel Kim", "Aisha Khan",
    "Marcus Johnson", "Yuki Tanaka",
  ];
  const statuses = ["new", "new", "in_progress", "contacted", "closed"] as const;
  return Array.from({ length: 24 }).map((_, i) => {
    const created = daysAgo(Math.floor(Math.random() * 28));
    const name = names[i % names.length];
    return {
      id: id(),
      name,
      email: name.toLowerCase().replace(/[^a-z]/g, ".") + "@example.com",
      phone: Math.random() > 0.5 ? "+1-555-01" + (10 + i) : undefined,
      company: Math.random() > 0.4 ? ["Acme Corp", "Globex", "Initech", "Umbrella", "Hooli"][i % 5] : undefined,
      subject: subjects[i % subjects.length],
      message: "Hello, we'd like to learn more about your services and pricing for our upcoming project. Please reach out to discuss further.",
      attachment: i % 4 === 0 ? {
        url: "#mock-attachment",
        originalName: "project-brief.pdf",
        size: 184320,
        mimeType: "application/pdf",
      } : undefined,
      status: statuses[i % statuses.length],
      source: ["organic", "linkedin", "google-ads", "referral"][i % 4],
      createdAt: created,
      updatedAt: created,
    };
  });
};

export const seedPilotQueries = (): PilotQuery[] => {
  const interests = ["ai-data", "content-services", "localization", "other"] as const;
  const names = [
    "Sarah Williams", "Raj Mehta", "Olivia Park", "Kenji Mori", "Diego Hernandez",
    "Emma Thompson", "Hassan Ali", "Lin Zhang", "Nora Schmidt",
  ];
  const statuses = ["new", "in_progress", "contacted", "closed"] as const;
  return Array.from({ length: 14 }).map((_, i) => {
    const created = daysAgo(Math.floor(Math.random() * 28));
    const name = names[i % names.length];
    return {
      id: id(),
      name,
      email: name.toLowerCase().replace(/[^a-z]/g, ".") + "@company.com",
      phone: "+1-555-02" + (10 + i),
      company: ["NorthEdu", "BrightPath", "Edify", "LearnLoop", "DataBridge", "Polyglot Inc"][i % 6],
      role: ["Director of Curriculum", "Head of Product", "VP Engineering", "Founder"][i % 4],
      serviceInterest: interests[i % interests.length],
      projectScope:
        "We are evaluating partners for a 12-week pilot to produce sample content and validate quality before scaling.",
      timeline: ["1-2 weeks", "1 month", "Q3 2026", "Flexible"][i % 4],
      attachment: i % 3 === 0 ? {
        url: "#mock-attachment",
        originalName: "RFP-2026.pdf",
        size: 423000,
        mimeType: "application/pdf",
      } : undefined,
      status: statuses[i % statuses.length],
      source: ["linkedin", "referral", "organic"][i % 3],
      createdAt: created,
      updatedAt: created,
    };
  });
};

export const seedBlogs = (): BlogPost[] => {
  const titles = [
    "How AI is Reshaping K-12 Curriculum Design",
    "5 Pitfalls in Data Annotation (and how to avoid them)",
    "Localization at scale: lessons from 12 languages",
    "The economics of high-quality e-learning video",
  ];
  return titles.map((t, i) => ({
    id: id(),
    title: t,
    slug: t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    excerpt: "A practical look at the trends and tactics shaping modern educational content delivery.",
    coverImageUrl: "/placeholder.svg",
    body: `# ${t}\n\nWrite your content here. This is a sample blog body in markdown.\n\n## Section\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    bodyFormat: "markdown" as const,
    tags: ["content-services", "ai", "content"].slice(0, (i % 3) + 1),
    author: { name: "eQourse Editorial" },
    seo: { title: t, description: "Insights from the eQourse team." },
    status: i === 0 ? "draft" : "published",
    publishedAt: i === 0 ? undefined : daysAgo(i * 5),
    readingMinutes: 4 + i,
    createdAt: daysAgo(i * 7),
    updatedAt: daysAgo(i * 5),
  }));
};

export const seedCaseStudies = (): CaseStudy[] => {
  const items = [
    { title: "Global Content Services platform: 30% faster content production", client: "Confidential Content Services", industry: "Content Services" },
    { title: "Annotating 2M images for an autonomous-vehicle startup", client: "Confidential AV", industry: "AI / Autonomous" },
    { title: "Localizing test prep into 8 languages in 90 days", client: "Major Test Prep Co.", industry: "Test Prep" },
  ];
  return items.map((c, i) => ({
    id: id(),
    title: c.title,
    slug: c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    client: c.client,
    industry: c.industry,
    heroImageUrl: "/placeholder.svg",
    summary: "An at-a-glance summary of the engagement and outcomes.",
    challenge: "The client needed to scale content output without sacrificing quality across multiple regions.",
    solution: "We deployed a hybrid team of SMEs and reviewers, with automated QA in the pipeline.",
    results: "Cycle time dropped 30% and rework was cut in half.",
    metrics: [
      { label: "Cycle time", value: "-30%" },
      { label: "Quality score", value: "98.7%" },
      { label: "Languages", value: "8" },
    ],
    tags: ["content-services", "case-study"],
    bodyFormat: "markdown" as const,
    seo: { title: c.title },
    status: "published",
    publishedAt: daysAgo(i * 14 + 3),
    createdAt: daysAgo(i * 14 + 10),
    updatedAt: daysAgo(i * 14 + 3),
  }));
};

export const seedSampleCategories = (): SampleCategory[] => [
  // ─── Text Content Samples (order 1xx) ───
  {
    id: "cat-kg5",
    name: "K12 Grade (KG-5)",
    slug: "kindergarten-to-k5-samples",
    description: "Age-appropriate content for early learners with interactive activities.",
    thumbnailUrl: "",
    order: 101,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(20),
  },
  {
    id: "cat-k612",
    name: "K12 Grade (6-12)",
    slug: "k6-to-k12-samples",
    description: "Rich curriculum content aligned to national standards and frameworks.",
    thumbnailUrl: "",
    order: 102,
    createdAt: daysAgo(58),
    updatedAt: daysAgo(18),
  },
  {
    id: "cat-iitjee",
    name: "IIT JEE / NEET",
    slug: "iit-jee-neet-samples",
    description: "Competitive exam prep content with solved problems and conceptual depth.",
    thumbnailUrl: "",
    order: 103,
    createdAt: daysAgo(56),
    updatedAt: daysAgo(16),
  },
  {
    id: "cat-upsc",
    name: "UPSC & State PSC",
    slug: "upsc-state-psc-samples",
    description: "Civil-services exam material across polity, economy, and current affairs.",
    thumbnailUrl: "",
    order: 104,
    createdAt: daysAgo(54),
    updatedAt: daysAgo(14),
  },
  {
    id: "cat-stem",
    name: "STEM Content",
    slug: "stem-content-samples",
    description: "Concept-first STEM modules with simulations and worked examples.",
    thumbnailUrl: "",
    order: 105,
    createdAt: daysAgo(52),
    updatedAt: daysAgo(12),
  },
  {
    id: "cat-cbse",
    name: "Curriculum Content",
    slug: "curriculum-samples",
    description: "NCERT-aligned CBSE curriculum samples with assessments.",
    thumbnailUrl: "",
    order: 106,
    createdAt: daysAgo(50),
    updatedAt: daysAgo(10),
  },
  {
    id: "cat-localization",
    name: "Localization (Text)",
    slug: "translation-and-localization-text-samples",
    description: "Text translated and culturally adapted across 30+ languages.",
    thumbnailUrl: "",
    order: 107,
    createdAt: daysAgo(48),
    updatedAt: daysAgo(8),
  },
  {
    id: "cat-testprep",
    name: "Test Prep & Assessments",
    slug: "test-prep-and-assessments",
    description: "Item-banked assessments and diagnostic test samples.",
    thumbnailUrl: "",
    order: 108,
    createdAt: daysAgo(46),
    updatedAt: daysAgo(6),
  },
  // ─── Video Content Samples (order 2xx) ───
  {
    id: "cat-articulate",
    name: "Articulate Storyline",
    slug: "articulate-storyline-video-samples",
    description: "Interactive Storyline courses with branching and variables.",
    thumbnailUrl: "",
    order: 201,
    createdAt: daysAgo(44),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-pentab",
    name: "Pen Tab and PPT",
    slug: "pen-tab-and-ppt-samples",
    description: "Classroom-style whiteboard and narrated PPT walkthroughs.",
    thumbnailUrl: "",
    order: 202,
    createdAt: daysAgo(42),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-aivideos",
    name: "AI Videos",
    slug: "ai-avatar-video-samples",
    description: "AI-presenter videos with realistic avatars and localized voices.",
    thumbnailUrl: "",
    order: 203,
    createdAt: daysAgo(40),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-flashhtml",
    name: "Audio Samples",
    slug: "audio-samples",
    description: "Multilingual, conversational and educational learning audio.",
    thumbnailUrl: "",
    order: 204,
    createdAt: daysAgo(38),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-2d3d",
    name: "2D 3D Animation",
    slug: "2d-3d-video-samples",
    description: "Animated explainers across science, math, and skills.",
    thumbnailUrl: "",
    order: 205,
    createdAt: daysAgo(36),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-promo",
    name: "Promotional Video",
    slug: "promotional-video",
    description: "Brand and product promo videos for Content Services and enterprise.",
    thumbnailUrl: "",
    order: 206,
    createdAt: daysAgo(34),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-arvr",
    name: "Immersive Simulation AR/VR",
    slug: "immersive-simulation-ar-vr-video",
    description: "AR/VR simulations for immersive learning and training.",
    thumbnailUrl: "",
    order: 207,
    createdAt: daysAgo(32),
    updatedAt: daysAgo(5),
  },
  // ─── AI Data Samples (order 3xx) ───
  {
    id: "cat-nlp",
    name: "NLP Annotation",
    slug: "nlp-annotation",
    description: "Named entity recognition, sentiment parsing, and relationship extraction.",
    thumbnailUrl: "",
    order: 301,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-cv",
    name: "Computer Vision",
    slug: "computer-vision",
    description: "Bounding box, semantic segmentation, and keypoint detection samples.",
    thumbnailUrl: "",
    order: 302,
    createdAt: daysAgo(28),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-audio",
    name: "Audio & Speech",
    slug: "audio-speech",
    description: "Transcription, speaker diarisation, and prosody labeling samples.",
    thumbnailUrl: "",
    order: 303,
    createdAt: daysAgo(26),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-rlhf",
    name: "RLHF",
    slug: "rlhf",
    description: "Preference ranking, response quality scoring, and safety labels.",
    thumbnailUrl: "",
    order: 304,
    createdAt: daysAgo(24),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-datacollection",
    name: "Data Collection",
    slug: "data-collection",
    description: "Text, audio, image, and video data collection samples.",
    thumbnailUrl: "",
    order: 305,
    createdAt: daysAgo(22),
    updatedAt: daysAgo(5),
  },
  {
    id: "cat-cleaneddata",
    name: "Cleaned Datasets",
    slug: "cleaned-datasets",
    description: "Deduplication, PII redaction, filtering, and gold-standard reports.",
    thumbnailUrl: "",
    order: 306,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(5),
  },
];

/** Start with zero samples - admin uploads real files via the editor. */
export const seedSamples = (): Sample[] => [];

