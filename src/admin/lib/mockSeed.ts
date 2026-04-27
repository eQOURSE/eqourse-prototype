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
  const interests = ["ai-data", "edtech", "localization", "other"] as const;
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
    tags: ["edtech", "ai", "content"].slice(0, (i % 3) + 1),
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
    { title: "Global EdTech Platform: 30% faster content production", client: "Confidential EdTech", industry: "EdTech" },
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
    tags: ["edtech", "case-study"],
    bodyFormat: "markdown" as const,
    seo: { title: c.title },
    status: "published",
    publishedAt: daysAgo(i * 14 + 3),
    createdAt: daysAgo(i * 14 + 10),
    updatedAt: daysAgo(i * 14 + 3),
  }));
};

export const seedSampleCategories = (): SampleCategory[] => [
  {
    id: "cat-k5",
    name: "Kindergarten to K5",
    slug: "kindergarden-to-k5-samples",
    description: "Foundational content for early learners — coursebooks, lesson plans, and workbooks.",
    thumbnailUrl: "/placeholder.svg",
    order: 1,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(20),
  },
  {
    id: "cat-middle",
    name: "Middle School (Grades 6-8)",
    slug: "middle-school-samples",
    description: "Subject-aligned content packs for middle school programs.",
    thumbnailUrl: "/placeholder.svg",
    order: 2,
    createdAt: daysAgo(55),
    updatedAt: daysAgo(15),
  },
];

export const seedSamples = (): Sample[] => [
  {
    id: "smp-1",
    categoryId: "cat-k5",
    title: "Math Course Book — Grade 2",
    type: "Course Book",
    description: "A full chapter of our K-5 mathematics coursebook.",
    thumbnailUrl: "/placeholder.svg",
    fileUrl: "#mock-file",
    fileSize: 1240000,
    order: 1,
    createdAt: daysAgo(40),
    updatedAt: daysAgo(40),
  },
  {
    id: "smp-2",
    categoryId: "cat-k5",
    title: "Reading Lesson Plan — Grade 1",
    type: "Lesson Plan",
    description: "A weekly lesson plan for early reading.",
    thumbnailUrl: "/placeholder.svg",
    fileUrl: "#mock-file",
    fileSize: 380000,
    order: 2,
    createdAt: daysAgo(38),
    updatedAt: daysAgo(38),
  },
  {
    id: "smp-3",
    categoryId: "cat-k5",
    title: "Science Workbook — Grade 3",
    type: "Workbook",
    description: "Hands-on activities and exercises in physical science.",
    thumbnailUrl: "/placeholder.svg",
    fileUrl: "#mock-file",
    fileSize: 920000,
    order: 3,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30),
  },
  {
    id: "smp-4",
    categoryId: "cat-middle",
    title: "Algebra Workbook — Grade 7",
    type: "Workbook",
    description: "Practice exercises with answer keys.",
    thumbnailUrl: "/placeholder.svg",
    fileUrl: "#mock-file",
    fileSize: 1100000,
    order: 1,
    createdAt: daysAgo(25),
    updatedAt: daysAgo(25),
  },
];
