const ContactQuery = require("../model/contact_us_queries");
const { sendContactNotification } = require("../utils/emailNotifier");
const logger = require("../utils/logger");
const { queueContactSync } = require("../utils/contactGoogleSheetSync");

/**
 * POST /api/contact
 * Public — Save a new contact form submission
 * Body: { name, email, phone, phone_code, company, designation, subject, message, source }
 */
const submitContactQuery = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      phone_code,
      company,
      designation,
      subject,
      message,
      source,
    } = req.body;

    // Basic validation for required fields
    if (!name || !email || !subject) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, subject",
      });
    }

    const query = new ContactQuery({
      name,
      email,
      phone: phone || "",
      phone_code: phone_code || "+91",
      company: company || "",
      designation: designation || "",
      subject,
      message: message || "",
      source: source || "",
    });

    await query.save();

    // Sync only newly submitted contact queries; admin updates do not append
    // another row to the reporting sheet.
    queueContactSync(query).catch((err) =>
      logger.error(`Contact Google Sheet sync failed for ${query._id}: ${err.message}`)
    );

    // Fire-and-forget email notification — never blocks the response
    sendContactNotification(query).catch((err) =>
      logger.error(`Contact email notification failed: ${err.message}`)
    );

    return res.status(201).json({
      success: true,
      message: "Contact query submitted successfully.",
      data: formatQuery(query),
    });
  } catch (error) {
    console.error("Error saving contact query:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

/**
 * GET /api/contact
 * Admin — Fetch all contact queries with optional filters
 * Query params: ?status=new&page=1&pageSize=25&q=searchterm&from=YYYY-MM-DD&to=YYYY-MM-DD
 */
const getAllContactQueries = async (req, res) => {
  try {
    const { status, q, from, to, page = 1, pageSize = 25 } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to + "T23:59:59Z");
    }
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { subject: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
      ];
    }

    const total = await ContactQuery.countDocuments(filter);
    const queries = await ContactQuery.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    return res.status(200).json({
      success: true,
      data: {
        items: queries.map(formatQuery),
        total,
        page: Number(page),
        pageSize: Number(pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching contact queries:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET /api/contact/:id
 * Admin — Get single contact query
 */
const getContactQuery = async (req, res) => {
  try {
    const query = await ContactQuery.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    return res.status(200).json({ success: true, data: formatQuery(query) });
  } catch (error) {
    console.error("Error fetching contact query:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * PATCH /api/contact/:id
 * Admin — Update contact query status and/or internal notes
 * Body: { status?, internalNotes? }
 */
const updateContactQuery = async (req, res) => {
  try {
    const { status, internalNotes } = req.body;
    const query = await ContactQuery.findById(req.params.id);

    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }

    if (status) query.status = status;
    if (internalNotes !== undefined) query.internal_notes = internalNotes;

    await query.save();
    return res.status(200).json({ success: true, data: formatQuery(query) });
  } catch (error) {
    console.error("Error updating contact query:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /api/contact/:id
 * Admin — Delete contact query
 */
const deleteContactQuery = async (req, res) => {
  try {
    const query = await ContactQuery.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    return res.status(200).json({ success: true, message: "Query deleted" });
  } catch (error) {
    console.error("Error deleting contact query:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Helper: shape DB doc → frontend-compatible object ───────────────────────
function formatQuery(doc) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    phone: doc.phone || undefined,
    company: doc.company || undefined,
    designation: doc.designation || undefined,
    subject: doc.subject,
    message: doc.message,
    source: doc.source || undefined,
    attachment: doc.attachment?.url ? doc.attachment : undefined,
    status: doc.status,
    internalNotes: doc.internal_notes || undefined,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

module.exports = {
  submitContactQuery,
  getAllContactQueries,
  getContactQuery,
  updateContactQuery,
  deleteContactQuery,
};
