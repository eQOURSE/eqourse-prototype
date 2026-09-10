const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    client: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    heroImageUrl: { type: String, default: "" },
    summary: { type: String, default: "" },
    challenge: { type: String, default: "" },
    solution: { type: String, default: "" },
    results: { type: String, default: "" },
    metrics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        _id: false,
      },
    ],
    tags: [{ type: String, trim: true }],
    // Exact public service-page paths selected in the admin panel.
    pagePaths: { type: [String], default: [], index: true },
    relatedLinks: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
        _id: false,
      },
    ],
    bodyFormat: { type: String, enum: ["html", "markdown"], default: "markdown" },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      ogImageUrl: { type: String, default: "" },
      heroImageAlt: { type: String, default: "" },
      heroImageTitle: { type: String, default: "" },
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Index for public queries (published only, sorted by date)
caseStudySchema.index({ status: 1, publishedAt: -1 });

module.exports = mongoose.model("CaseStudy", caseStudySchema);
