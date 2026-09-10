const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    // ── Core content ────────────────────────────────────────────
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
      default: "",
    },
    body: {
      type: String,
      required: true,
    },
    bodyFormat: {
      type: String,
      enum: ["html", "markdown"],
      default: "html",
    },
    coverImageUrl: {
      type: String,
      default: "",
    },

    // ── Author ────────────────────────────────────────────────
    author: {
      name: {
        type: String,
        trim: true,
        default: "eQOURSE Team",
      },
      avatarUrl: {
        type: String,
        default: "",
      },
    },

    // ── Taxonomy ──────────────────────────────────────────────
    tags: {
      type: [String],
      default: [],
    },
    categories: {
      type: [{
        category: { type: String, trim: true },
        subcategories: {
          type: [{
            subcategory: { type: String, trim: true },
            subSubcategories: { type: [String], default: [] },
          }],
          default: [],
        },
      }],
      default: [],
    },
    grade: {
      type: String,
      enum: ["4", "5", "6", "7", "8", "9", "10", "11", "12", ""],
      default: "",
    },
    board_course: {
      type: String,
      default: "",
    },
    subject: {
      type: String,
      default: "",
    },

    // ── SEO ──────────────────────────────────────────────────
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      ogImageUrl: { type: String, default: "" },
      coverImageAlt: { type: String, default: "" },
      coverImageTitle: { type: String, default: "" },
    },

    // ── Publishing ───────────────────────────────────────────
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    readingMinutes: {
      type: Number,
      default: 0,
    },
    view_count: {
      type: Number,
      default: 0,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title if not provided
blogSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

module.exports = mongoose.model("Blog", blogSchema);
