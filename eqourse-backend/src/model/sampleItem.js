const mongoose = require("mongoose");

const sampleItemSchema = new mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SampleCategory", required: true, index: true },
    title: { type: String, required: true, trim: true },
    type: { type: String, default: "" },
    description: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    fileUrl: { type: String, default: "" },
    fileSize: { type: Number },
    order: { type: Number, default: 0 },

    // ── Phase 8: Sample file → public page mapping ──────────────────
    // Which sample page this file appears on (e.g. "kindergarten-to-k5-samples")
    pageSlug: { type: String, trim: true, default: "", index: true },
    // Which tab within that page (e.g. "Course Book", "Lesson Plan")
    tabName: { type: String, trim: true, default: "" },
    // File extension badge shown in the preview modal (e.g. "PDF", "DOCX", "MP4", "ZIP")
    fileType: { type: String, trim: true, default: "" },
    // Whether this is an external link or a downloadable file
    isExternal: { type: Boolean, default: false },
    // Service pages where this sample is promoted above the FAQ section.
    pagePaths: { type: [String], default: [], index: true },
  },
  { timestamps: true }
);

sampleItemSchema.index({ categoryId: 1, order: 1 });
sampleItemSchema.index({ pageSlug: 1, tabName: 1 });

module.exports = mongoose.model("SampleItem", sampleItemSchema);
