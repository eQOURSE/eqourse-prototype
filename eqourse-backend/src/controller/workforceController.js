const path = require("path");
const TalentProfile = require("../model/talentProfile");
const VendorRegistration = require("../model/vendorRegistration");
const logger = require("../utils/logger");
const { extractCandidateText } = require("../utils/chatResponse");
const {
  sendTalentPoolEmails,
  sendTalentStatusUpdate,
  sendVendorRegistrationEmails,
  sendVendorStatusUpdate,
} = require("../utils/emailNotifier");
const {
  sendStoredAttachment,
  removeStoredAttachments,
  removeUploadedFiles,
} = require("../utils/privateUploads");

const attachmentFromFile = (file) => file ? ({
  url: `/api/uploads/${path.basename(file.destination)}/${file.filename}`,
  originalName: file.originalname,
  size: file.size,
  mimeType: file.mimetype,
}) : undefined;

const csvList = (value) => String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pageValues = (query) => ({
  page: Math.max(1, Number.parseInt(query.page, 10) || 1),
  pageSize: Math.min(100, Math.max(1, Number.parseInt(query.pageSize, 10) || 20)),
});

const formatTalent = (doc) => ({
  id: doc._id,
  receiptId: doc.receiptId,
  fullName: doc.fullName,
  email: doc.email,
  phone: doc.phone,
  location: doc.location,
  preferredRoles: doc.preferredRoles || [],
  experience: doc.experience,
  currentRole: doc.currentRole,
  qualification: doc.qualification,
  skills: doc.skills || [],
  portfolioLink: doc.portfolioLink,
  message: doc.message,
  resumeFile: doc.resumeFile || null,
  status: doc.status,
  internalNotes: doc.internalNotes || "",
  notesUpdatedAt: doc.notesUpdatedAt,
  statusChangedAt: doc.statusChangedAt,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

const formatVendor = (doc) => ({
  id: doc._id,
  receiptId: doc.receiptId,
  companyName: doc.companyName,
  country: doc.country,
  registrationNumber: doc.registrationNumber,
  taxNumber: doc.taxNumber,
  website: doc.website,
  yearsInBusiness: doc.yearsInBusiness,
  teamSize: doc.teamSize,
  contactName: doc.contactName,
  contactRole: doc.contactRole,
  email: doc.email,
  phone: doc.phone,
  services: doc.services || [],
  capabilitySummary: doc.capabilitySummary,
  registrationDocument: doc.registrationDocument,
  taxReturns: doc.taxReturns || [],
  status: doc.status,
  internalNotes: doc.internalNotes || "",
  statusMessage: doc.statusMessage || "",
  notesUpdatedAt: doc.notesUpdatedAt,
  statusChangedAt: doc.statusChangedAt,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

const submitTalentProfile = async (req, res) => {
  try {
    const { fullName, email, phone, location, preferredRoles, experience, currentRole, qualification, skills, portfolioLink, message } = req.body;
    if (!fullName || !email || !qualification || !req.file) {
      await removeUploadedFiles([req.file]);
      return res.status(400).json({ success: false, message: "Name, email, qualification and resume are required." });
    }
    const existing = await TalentProfile.findOne({ email: String(email).toLowerCase() });
    if (existing) {
      await removeUploadedFiles([req.file]);
      return res.status(409).json({ success: false, message: "A talent-pool profile already exists for this email." });
    }

    const profile = await TalentProfile.create({
      fullName, email, phone, location,
      preferredRoles: csvList(preferredRoles),
      experience, currentRole, qualification,
      skills: csvList(skills), portfolioLink, message,
      resumeFile: attachmentFromFile(req.file),
    });
    sendTalentPoolEmails(profile).catch((error) => logger.error(`Talent email failed: ${error.message}`));
    return res.status(201).json({ success: true, data: { receiptId: profile.receiptId } });
  } catch (error) {
    await removeUploadedFiles([req.file]);
    logger.error("Talent-pool submission failed:", error);
    return res.status(500).json({ success: false, message: "Unable to save your profile right now." });
  }
};

const submitVendorRegistration = async (req, res) => {
  const uploadedFiles = Object.values(req.files || {}).flat();
  try {
    const files = req.files || {};
    const registrationDocument = attachmentFromFile(files.registrationDocument?.[0]);
    const taxReturns = (files.taxReturns || []).map(attachmentFromFile);
    const { companyName, country, registrationNumber, taxNumber, website, yearsInBusiness, teamSize, contactName, contactRole, email, phone, services, capabilitySummary } = req.body;
    if (!companyName || !country || !registrationNumber || !contactName || !email || !phone || !registrationDocument || taxReturns.length < 1) {
      await removeUploadedFiles(uploadedFiles);
      return res.status(400).json({ success: false, message: "Complete all required fields and upload registration plus recent tax documents." });
    }
    const duplicate = await VendorRegistration.findOne({ email: String(email).toLowerCase(), registrationNumber });
    if (duplicate) {
      await removeUploadedFiles(uploadedFiles);
      return res.status(409).json({ success: false, message: "This company registration has already been submitted." });
    }

    const vendor = await VendorRegistration.create({
      companyName, country, registrationNumber, taxNumber, website,
      yearsInBusiness: Number(yearsInBusiness) || 0, teamSize,
      contactName, contactRole, email, phone,
      services: csvList(services), capabilitySummary,
      registrationDocument, taxReturns,
    });
    sendVendorRegistrationEmails(vendor).catch((error) => logger.error(`Vendor email failed: ${error.message}`));
    return res.status(201).json({ success: true, data: { receiptId: vendor.receiptId } });
  } catch (error) {
    await removeUploadedFiles(uploadedFiles);
    logger.error("Vendor registration failed:", error);
    return res.status(500).json({ success: false, message: "Unable to register the company right now." });
  }
};

async function listRecords(Model, formatter, searchFields, req, res) {
  try {
    const { page, pageSize } = pageValues(req.query);
    const filter = {};
    if (req.query.status && req.query.status !== "all") filter.status = req.query.status;
    const term = typeof req.query.q === "string" ? escapeRegex(req.query.q.trim().slice(0, 200)) : "";
    if (term) filter.$or = searchFields.map((field) => ({ [field]: { $regex: term, $options: "i" } }));
    const [items, total, counts] = await Promise.all([
      Model.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).lean(),
      Model.countDocuments(filter),
      Model.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    ]);
    return res.json({ success: true, data: { items: items.map(formatter), total, page, pageSize, statusCounts: Object.fromEntries(counts.map((item) => [item._id, item.count])) } });
  } catch (error) {
    logger.error("Workforce record listing failed:", error);
    return res.status(500).json({ success: false, message: "Unable to load records." });
  }
}

const adminListTalent = (req, res) => listRecords(TalentProfile, formatTalent, ["fullName", "email", "phone", "location", "preferredRoles", "skills", "qualification"], req, res);
const adminListVendors = (req, res) => listRecords(VendorRegistration, formatVendor, ["companyName", "country", "registrationNumber", "email", "services", "capabilitySummary"], req, res);

async function updateRecord(Model, formatter, validStatuses, req, res, options = {}) {
  const { notify, requireHoldReason = false } = options;
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Record not found." });
    let statusChanged = false;
    if (req.body.status !== undefined) {
      if (!validStatuses.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid status." });
      if (requireHoldReason && req.body.status === "hold" && !String(req.body.statusMessage || "").trim()) {
        return res.status(400).json({ success: false, message: "A hold reason is required and will be emailed to the company." });
      }
      statusChanged = doc.status !== req.body.status;
      doc.status = req.body.status;
      if (Model.schema.path("statusMessage")) {
        doc.statusMessage = String(req.body.statusMessage || "").trim().slice(0, 3000);
      }
      if (statusChanged) doc.statusChangedAt = new Date();
    }
    if (req.body.internalNotes !== undefined) {
      doc.internalNotes = String(req.body.internalNotes).trim().slice(0, 5000);
      doc.notesUpdatedAt = new Date();
    }
    await doc.save();
    if (statusChanged && notify) {
      notify(doc, doc.status, doc.statusMessage).catch((error) => logger.error(`Status email failed: ${error.message}`));
    }
    return res.json({ success: true, data: formatter(doc) });
  } catch (error) {
    logger.error("Workforce record update failed:", error);
    return res.status(500).json({ success: false, message: "Unable to update record." });
  }
}

const adminUpdateTalent = (req, res) => updateRecord(TalentProfile, formatTalent, ["applied", "shortlisted", "rejected", "hired"], req, res, { notify: sendTalentStatusUpdate });
const adminUpdateVendor = (req, res) => updateRecord(VendorRegistration, formatVendor, ["registered", "approved", "hold", "rejected"], req, res, { notify: sendVendorStatusUpdate, requireHoldReason: true });

const adminDownloadTalentResume = async (req, res) => {
  try {
    const profile = await TalentProfile.findById(req.params.id).lean();
    if (!profile?.resumeFile) return res.status(404).json({ success: false, message: "Resume not found." });
    return sendStoredAttachment(res, profile.resumeFile, new Set(["resumes"]));
  } catch (error) {
    logger.error("Talent resume download failed:", error);
    return res.status(500).json({ success: false, message: "Unable to download resume." });
  }
};

const adminDownloadVendorDocument = async (req, res) => {
  try {
    const vendor = await VendorRegistration.findById(req.params.id).lean();
    if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found." });
    const { kind } = req.params;
    let attachment;
    let allowedFolders;
    if (kind === "registration") {
      attachment = vendor.registrationDocument;
      allowedFolders = new Set(["vendor-registration"]);
    } else if (kind === "tax") {
      const index = Number.parseInt(req.params.index, 10);
      if (!Number.isInteger(index) || index < 0) return res.status(400).json({ success: false, message: "Invalid document index." });
      attachment = vendor.taxReturns?.[index];
      allowedFolders = new Set(["vendor-tax"]);
    } else {
      return res.status(400).json({ success: false, message: "Invalid document type." });
    }
    if (!attachment) return res.status(404).json({ success: false, message: "Document not found." });
    return sendStoredAttachment(res, attachment, allowedFolders);
  } catch (error) {
    logger.error("Vendor document download failed:", error);
    return res.status(500).json({ success: false, message: "Unable to download document." });
  }
};

const adminDeleteVendor = async (req, res) => {
  try {
    const vendor = await VendorRegistration.findById(req.params.id);
    if (!vendor) return res.status(404).json({ success: false, message: "Record not found." });
    if (vendor.status !== "rejected") {
      return res.status(409).json({ success: false, message: "Only rejected registrations can be permanently deleted." });
    }
    const attachments = [vendor.registrationDocument, ...(vendor.taxReturns || [])];
    await vendor.deleteOne();
    await removeStoredAttachments(attachments);
    return res.json({ success: true });
  } catch (error) {
    logger.error("Vendor deletion failed:", error);
    return res.status(500).json({ success: false, message: "Unable to delete vendor registration." });
  }
};

async function smartFilter(Model, formatter, fields, req, res) {
  try {
    if (!String(req.body.query || "").trim()) return res.status(400).json({ success: false, message: "Query is required." });
    const records = await Model.find({}).lean();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ success: false, message: "Gemini API not configured." });
    const summaries = records.map((record, candidateIndex) => ({ candidateIndex, ...Object.fromEntries(fields.map((field) => [field, record[field]])) }));
    const model = process.env.GEMINI_ADMIN_MODEL || "gemini-3.7-flash";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `Records:\n${JSON.stringify(summaries)}\n\nRequest: ${String(req.body.query).slice(0, 1000)}` }] }],
        systemInstruction: { parts: [{ text: "Filter every supplied HR record against the request. Return only a JSON array of matching candidateIndex integers, ordered best match first." }] },
        generationConfig: { responseMimeType: "application/json", responseSchema: { type: "ARRAY", items: { type: "INTEGER" } }, maxOutputTokens: 4096 },
      }),
      signal: AbortSignal.timeout(45_000),
    });
    if (!response.ok) return res.status(502).json({ success: false, message: "Smart filter is temporarily unavailable." });
    const payload = await response.json();
    const indexes = JSON.parse(extractCandidateText(payload?.candidates?.[0]) || "[]");
    const valid = Array.isArray(indexes) ? [...new Set(indexes.filter((index) => Number.isInteger(index) && records[index]))] : [];
    return res.json({ success: true, data: { items: valid.map((index) => formatter(records[index])), total: valid.length } });
  } catch (error) {
    logger.error("Workforce smart filter failed:", error);
    return res.status(error?.name === "TimeoutError" ? 504 : 500).json({ success: false, message: error?.name === "TimeoutError" ? "Smart filter timed out. Please try a narrower request." : "Smart filter failed." });
  }
}

const adminSmartFilterTalent = (req, res) => smartFilter(TalentProfile, formatTalent, ["fullName", "location", "preferredRoles", "experience", "currentRole", "qualification", "skills", "message", "status", "internalNotes"], req, res);
const adminSmartFilterVendors = (req, res) => smartFilter(VendorRegistration, formatVendor, ["companyName", "country", "yearsInBusiness", "teamSize", "services", "capabilitySummary", "status", "internalNotes"], req, res);

module.exports = {
  submitTalentProfile,
  submitVendorRegistration,
  adminListTalent,
  adminListVendors,
  adminUpdateTalent,
  adminUpdateVendor,
  adminDownloadTalentResume,
  adminDownloadVendorDocument,
  adminDeleteVendor,
  adminSmartFilterTalent,
  adminSmartFilterVendors,
  _internal: { attachmentFromFile, csvList, formatTalent, formatVendor },
};
