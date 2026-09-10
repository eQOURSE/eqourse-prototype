const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  url: String,
  originalName: String,
  size: Number,
  mimeType: String,
}, { _id: false });

const talentProfileSchema = new mongoose.Schema({
  receiptId: { type: String, unique: true, index: true },
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  phone: { type: String, trim: true, default: "" },
  location: { type: String, trim: true, default: "" },
  preferredRoles: [{ type: String, trim: true }],
  experience: { type: String, trim: true, default: "" },
  currentRole: { type: String, trim: true, default: "" },
  qualification: { type: String, trim: true, default: "" },
  skills: [{ type: String, trim: true }],
  portfolioLink: { type: String, trim: true, default: "" },
  message: { type: String, trim: true, default: "" },
  resumeFile: attachmentSchema,
  status: {
    type: String,
    enum: ["applied", "shortlisted", "rejected", "hired"],
    default: "applied",
    index: true,
  },
  internalNotes: { type: String, trim: true, default: "" },
  notesUpdatedAt: Date,
  statusChangedAt: Date,
}, { timestamps: true });

talentProfileSchema.pre("save", async function () {
  if (!this.receiptId) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("TalentProfile").countDocuments();
    this.receiptId = `EQ-TAL-${year}-${String(count + 1).padStart(4, "0")}`;
  }
});

module.exports = mongoose.model("TalentProfile", talentProfileSchema);
