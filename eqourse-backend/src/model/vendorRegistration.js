const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  url: String,
  originalName: String,
  size: Number,
  mimeType: String,
}, { _id: false });

const vendorRegistrationSchema = new mongoose.Schema({
  receiptId: { type: String, unique: true, index: true },
  companyName: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  registrationNumber: { type: String, required: true, trim: true },
  taxNumber: { type: String, trim: true, default: "" },
  website: { type: String, trim: true, default: "" },
  yearsInBusiness: { type: Number, min: 0, default: 0 },
  teamSize: { type: String, trim: true, default: "" },
  contactName: { type: String, required: true, trim: true },
  contactRole: { type: String, trim: true, default: "" },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  services: [{ type: String, trim: true }],
  capabilitySummary: { type: String, trim: true, default: "" },
  registrationDocument: { type: attachmentSchema, required: true },
  taxReturns: { type: [attachmentSchema], validate: [(value) => value.length >= 1 && value.length <= 3, "Upload 1–3 recent tax-return documents."] },
  status: {
    type: String,
    enum: ["registered", "approved", "hold", "rejected"],
    default: "registered",
    index: true,
  },
  internalNotes: { type: String, trim: true, default: "" },
  statusMessage: { type: String, trim: true, default: "" },
  notesUpdatedAt: Date,
  statusChangedAt: Date,
}, { timestamps: true });

vendorRegistrationSchema.index({ companyName: 1, country: 1 });
vendorRegistrationSchema.index({ email: 1, registrationNumber: 1 }, { unique: true });

vendorRegistrationSchema.pre("save", async function () {
  if (!this.receiptId) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("VendorRegistration").countDocuments();
    this.receiptId = `EQ-VEN-${year}-${String(count + 1).padStart(4, "0")}`;
  }
});

module.exports = mongoose.model("VendorRegistration", vendorRegistrationSchema);
