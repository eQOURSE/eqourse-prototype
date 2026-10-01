const PilotQuery = require("../model/pilot");
const { sendPilotNotification } = require("../utils/emailNotifier");
const logger = require("../utils/logger");
const { queuePilotSync } = require("../utils/pilotGoogleSheetSync");

/**
 * POST /api/pilot
 * Public — Save a new free-pilot request submission
 * Body: { name, email, phone, company, role, serviceInterest, projectScope, timeline, languages, message, source }
 */
const submitPilotQuery = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      role,
      serviceInterest,
      projectScope,
      timeline,
      languages,
      message,
      source,
    } = req.body;

    // Basic validation
    if (!name || !email || !company || !serviceInterest || !projectScope) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, company, serviceInterest, projectScope",
      });
    }

    let attachment = null;
    if (req.file) {
      const path = require("path");
      const actualKind = path.basename(req.file.destination);
      attachment = {
        url: `/uploads/${actualKind}/${req.file.filename}`,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      };
    }

    const query = new PilotQuery({
      name,
      email,
      phone: phone || "",
      company,
      role: role || "",
      serviceInterest,
      projectScope,
      timeline: timeline || "",
      languages: languages || "",
      message: message || "",
      source: source || "",
      attachment: attachment || undefined,
    });

    await query.save();

    // Sync only newly submitted pilot queries. Updates/deletes do not trigger
    // a sheet write, and the sync remains asynchronous to MongoDB persistence.
    queuePilotSync(query).catch((err) =>
      logger.error(`Pilot Google Sheet sync failed for ${query._id}: ${err.message}`)
    );

    // Fire-and-forget email notification — never blocks the response
    sendPilotNotification(query).catch((err) =>
      logger.error(`Pilot email notification failed: ${err.message}`)
    );

    return res.status(201).json({
      success: true,
      message: "Pilot query submitted successfully.",
      data: formatQuery(query),
    });
  } catch (error) {
    console.error("Error saving pilot query:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

/**
 * GET /api/pilot
 * Admin — Fetch all pilot queries with optional filters
 * Query params: ?status=new&serviceInterest=ai-data&page=1&pageSize=25&q=search&from=YYYY-MM-DD&to=YYYY-MM-DD
 */
const getAllPilotQueries = async (req, res) => {
  try {
    const { status, serviceInterest, q, from, to, page = 1, pageSize = 25 } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (serviceInterest && serviceInterest !== "all") filter.serviceInterest = serviceInterest;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to + "T23:59:59Z");
    }
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { projectScope: { $regex: q, $options: "i" } },
      ];
    }

    const total = await PilotQuery.countDocuments(filter);
    const queries = await PilotQuery.find(filter)
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
    console.error("Error fetching pilot queries:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET /api/pilot/:id
 * Admin — Get single pilot query
 */
const getPilotQuery = async (req, res) => {
  try {
    const query = await PilotQuery.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    return res.status(200).json({ success: true, data: formatQuery(query) });
  } catch (error) {
    console.error("Error fetching pilot query:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * PATCH /api/pilot/:id
 * Admin — Update pilot query status and/or internal notes
 * Body: { status?, internalNotes? }
 */
const updatePilotQuery = async (req, res) => {
  try {
    const { status, internalNotes } = req.body;
    const query = await PilotQuery.findById(req.params.id);

    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }

    if (status) query.status = status;
    if (internalNotes !== undefined) query.internal_notes = internalNotes;

    await query.save();
    return res.status(200).json({ success: true, data: formatQuery(query) });
  } catch (error) {
    console.error("Error updating pilot query:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /api/pilot/:id
 * Admin — Delete pilot query
 */
const deletePilotQuery = async (req, res) => {
  try {
    const query = await PilotQuery.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    return res.status(200).json({ success: true, message: "Query deleted" });
  } catch (error) {
    console.error("Error deleting pilot query:", error);
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
    company: doc.company,
    role: doc.role || undefined,
    serviceInterest: doc.serviceInterest,
    projectScope: doc.projectScope,
    timeline: doc.timeline || undefined,
    languages: doc.languages || undefined,
    message: doc.message || undefined,
    source: doc.source || undefined,
    attachment: doc.attachment?.url ? doc.attachment : undefined,
    status: doc.status,
    internalNotes: doc.internal_notes || undefined,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

module.exports = {
  submitPilotQuery,
  getAllPilotQueries,
  getPilotQuery,
  updatePilotQuery,
  deletePilotQuery,
};
