const JobOpening = require("../model/jobOpening");
const JobApplication = require("../model/jobApplication");
const logger = require("../utils/logger");
const { extractCandidateText } = require("../utils/chatResponse");
const path = require("path");
const { sendStoredAttachment, removeUploadedFiles } = require("../utils/privateUploads");
const {
  sendApplicationReceivedNotification,
  sendCandidateConfirmation,
  sendCandidateStatusUpdate,
} = require("../utils/emailNotifier");

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Generate a URL-friendly slug from a title */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Human-readable department labels */
const DEPT_LABELS = {
  "ai-data": "AI Data Services",
  "content-services": "Content Services",
  operations: "Operations & Admin",
  marketing: "Marketing & BD",
  technology: "Technology & Engineering",
  hr: "Human Resources",
  other: "Other",
};

/** Format a job opening for API response */
function formatOpening(doc) {
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    department: doc.department,
    departmentLabel: DEPT_LABELS[doc.department] || doc.department,
    location: doc.location,
    employmentType: doc.employmentType,
    experienceRange: doc.experienceRange,
    description: doc.description,
    responsibilities: doc.responsibilities || [],
    requirements: doc.requirements || [],
    niceToHave: doc.niceToHave || [],
    customQuestions: doc.customQuestions || [],
    salaryRange: doc.salaryRange,
    salaryCurrency: doc.salaryCurrency || "INR",
    status: doc.status,
    applicationCount: doc.applicationCount || 0,
    postedAt: doc.postedAt,
    closingDate: doc.closingDate,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

/** Format an application for API response */
function formatApplication(doc) {
  return {
    id: doc._id,
    jobId: doc.jobId,
    receiptId: doc.receiptId,
    fullName: doc.fullName,
    email: doc.email,
    phone: doc.phone,
    experience: doc.experience,
    currentRole: doc.currentRole,
    qualification: doc.qualification,
    portfolioLink: doc.portfolioLink,
    resumeDriveLink: doc.resumeDriveLink,
    resumeFile: doc.resumeFile || null,
    coverLetter: doc.coverLetter,
    skills: doc.skills || [],
    customAnswers: doc.customAnswers || [],
    status: doc.status,
    internalNotes: doc.internalNotes || "",
    notesUpdatedAt: doc.notesUpdatedAt,
    statusChangedAt: doc.statusChangedAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/careers
 * Public — list active job openings
 * Query: ?department=ai-data&location=Pune&page=1&pageSize=20
 */
const getActiveJobOpenings = async (req, res) => {
  try {
    const { department, location, employmentType, page = 1, pageSize = 20 } = req.query;

    const filter = { status: "active" };
    if (department && department !== "all") filter.department = department;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (employmentType && employmentType !== "all") filter.employmentType = employmentType;

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const [items, total] = await Promise.all([
      JobOpening.find(filter)
        .sort({ postedAt: -1 })
        .skip(skip)
        .limit(parseInt(pageSize))
        .lean(),
      JobOpening.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: {
        items: items.map(formatOpening),
        total,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    });
  } catch (error) {
    logger.error("Error fetching job openings:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET /api/careers/:slug
 * Public — get a single job opening by slug
 */
const getJobOpeningBySlug = async (req, res) => {
  try {
    const doc = await JobOpening.findOne({
      slug: req.params.slug,
      status: { $in: ["active", "paused"] },
    }).lean();

    if (!doc) {
      return res.status(404).json({ success: false, message: "Job opening not found." });
    }

    return res.json({ success: true, data: formatOpening(doc) });
  } catch (error) {
    logger.error("Error fetching job opening:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * POST /api/careers/:jobId/apply
 * Public — submit a job application
 * Supports multipart/form-data for resume upload
 */
const submitApplication = async (req, res) => {
  let applicationSaved = false;
  try {
    const { jobId } = req.params;
    const {
      fullName,
      email,
      phone,
      experience,
      currentRole,
      qualification,
      portfolioLink,
      resumeDriveLink,
      coverLetter,
      skills,
      customAnswers,
    } = req.body;

    // Defensive array casting if FormData sends multiple of the same key
    const safeResumeDriveLink = Array.isArray(resumeDriveLink) ? resumeDriveLink[0] : resumeDriveLink;

    // Validate required fields
    if (!fullName || !email || !qualification) {
      await removeUploadedFiles([req.file]);
      return res.status(400).json({
        success: false,
        message: "Missing required fields: fullName, email, qualification",
      });
    }

    // Check job exists and is active
    const job = await JobOpening.findById(jobId);
    if (!job || job.status !== "active") {
      await removeUploadedFiles([req.file]);
      return res.status(404).json({
        success: false,
        message: "This position is no longer accepting applications.",
      });
    }

    // Check for duplicate application
    const existing = await JobApplication.findOne({ jobId, email: email.toLowerCase() });
    if (existing) {
      await removeUploadedFiles([req.file]);
      return res.status(409).json({
        success: false,
        message: "You have already applied for this position. Our team will review your application and get back to you.",
      });
    }

    // Handle resume file upload
    let resumeFile = null;
    if (req.file) {
      const actualKind = path.basename(req.file.destination);
      resumeFile = {
        url: `/api/uploads/${actualKind}/${req.file.filename}`,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      };
    }

    // Validate at least one resume source
    if (!resumeFile && !safeResumeDriveLink) {
      await removeUploadedFiles([req.file]);
      return res.status(400).json({
        success: false,
        message: "Please upload your resume or provide a Google Drive link.",
      });
    }

    // Parse customAnswers if it's a JSON string from FormData
    let parsedCustomAnswers = [];
    if (customAnswers) {
      try {
        parsedCustomAnswers = typeof customAnswers === "string" ? JSON.parse(customAnswers) : customAnswers;
      } catch (err) {
        logger.warn("Could not parse customAnswers JSON");
      }
    }

    // Parse skills
    const skillsArray = skills
      ? (typeof skills === "string" ? skills.split(",") : skills).map((s) => s.trim()).filter(Boolean)
      : [];

    const application = new JobApplication({
      jobId,
      fullName,
      email: email.toLowerCase(),
      phone: phone || "",
      experience: experience || "",
      currentRole: currentRole || "",
      qualification,
      portfolioLink: portfolioLink || "",
      resumeDriveLink: safeResumeDriveLink || "",
      resumeFile: resumeFile || undefined,
      coverLetter: coverLetter || "",
      skills: skillsArray,
      customAnswers: parsedCustomAnswers,
    });

    await application.save();
    applicationSaved = true;

    // Increment application count on the job opening
    await JobOpening.findByIdAndUpdate(jobId, { $inc: { applicationCount: 1 } });

    // Fire-and-forget emails
    sendApplicationReceivedNotification(application, job).catch((err) =>
      logger.error(`Career HR notification failed: ${err.message}`)
    );
    sendCandidateConfirmation(application, job).catch((err) =>
      logger.error(`Candidate confirmation email failed: ${err.message}`)
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: {
        receiptId: application.receiptId,
        fullName: application.fullName,
        email: application.email,
        jobTitle: job.title,
      },
    });
  } catch (error) {
    if (!applicationSaved) await removeUploadedFiles([req.file]);
    // Handle MongoDB duplicate key error (race condition on the unique index)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this position.",
      });
    }
    logger.error("Error submitting application:", error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

/** GET /api/admin/applications/:id/resume — authenticated private download. */
const adminDownloadApplicationResume = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id).lean();
    if (!application?.resumeFile) {
      return res.status(404).json({ success: false, message: "Resume not found." });
    }
    return sendStoredAttachment(res, application.resumeFile, new Set(["resumes"]));
  } catch (error) {
    logger.error("Application resume download failed:", error);
    return res.status(500).json({ success: false, message: "Unable to download resume." });
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/admin/careers
 * Admin — list all job openings
 */
const adminListJobOpenings = async (req, res) => {
  try {
    const { status, department, q, page = 1, pageSize = 25 } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (department && department !== "all") filter.department = department;
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const [items, total] = await Promise.all([
      JobOpening.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(pageSize)).lean(),
      JobOpening.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: {
        items: items.map(formatOpening),
        total,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    });
  } catch (error) {
    logger.error("Error listing job openings (admin):", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET /api/admin/careers/:id
 * Admin — get single job opening
 */
const adminGetJobOpening = async (req, res) => {
  try {
    const doc = await JobOpening.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    return res.json({ success: true, data: formatOpening(doc) });
  } catch (error) {
    logger.error("Error getting job opening (admin):", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * POST /api/admin/careers
 * Admin — create a new job opening
 */
const adminCreateJobOpening = async (req, res) => {
  try {
    const {
      title, department, location, employmentType, experienceRange,
      description, responsibilities, requirements, niceToHave,
      salaryRange, closingDate, status, customQuestions,
    } = req.body;

    if (!title || !department || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, department, location, description",
      });
    }

    // Generate unique slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await JobOpening.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const opening = new JobOpening({
      title,
      slug,
      department,
      location,
      employmentType: employmentType || "full-time",
      experienceRange: experienceRange || "",
      description,
      responsibilities: responsibilities || [],
      requirements: requirements || [],
      niceToHave: niceToHave || [],
      salaryRange: salaryRange || "",
      status: status || "active",
      closingDate: closingDate || undefined,
      customQuestions: customQuestions || [],
      postedAt: new Date(),
    });

    await opening.save();

    return res.status(201).json({
      success: true,
      message: "Job opening created successfully.",
      data: formatOpening(opening),
    });
  } catch (error) {
    logger.error("Error creating job opening:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * PATCH /api/admin/careers/:id
 * Admin — update a job opening
 */
const adminUpdateJobOpening = async (req, res) => {
  try {
    const doc = await JobOpening.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });

    const allowedFields = [
      "title", "department", "location", "employmentType", "experienceRange",
      "description", "responsibilities", "requirements", "niceToHave",
      "salaryRange", "status", "closingDate", "customQuestions"
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        doc[field] = req.body[field];
      }
    }

    // Regenerate slug if title changed
    if (req.body.title) {
      let baseSlug = slugify(req.body.title);
      let slug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await JobOpening.findOne({ slug, _id: { $ne: doc._id } });
        if (!existing) break;
        slug = `${baseSlug}-${counter++}`;
      }
      doc.slug = slug;
    }

    await doc.save();

    return res.json({ success: true, data: formatOpening(doc) });
  } catch (error) {
    logger.error("Error updating job opening:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * DELETE /api/admin/careers/:id
 * Admin — delete a job opening (only if zero applications)
 */
const adminDeleteJobOpening = async (req, res) => {
  try {
    const doc = await JobOpening.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });

    const appCount = await JobApplication.countDocuments({ jobId: doc._id });
    if (appCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete — ${appCount} application(s) exist. Close the opening instead.`,
      });
    }

    await JobOpening.findByIdAndDelete(doc._id);
    return res.json({ success: true, message: "Job opening deleted." });
  } catch (error) {
    logger.error("Error deleting job opening:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET /api/admin/careers/:jobId/applications
 * Admin — list applications for a specific job
 * Query: ?status=applied&q=searchterm&page=1&pageSize=25
 */
const adminListApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status, q, page = 1, pageSize = 25 } = req.query;

    const parsedPage = Math.max(1, Number.parseInt(page, 10) || 1);
    const parsedPageSize = Math.min(100, Math.max(1, Number.parseInt(pageSize, 10) || 25));

    const filter = { jobId };
    if (status && status !== "all") filter.status = status;
    const searchTerm = typeof q === "string" ? escapeRegex(q.trim().slice(0, 200)) : "";
    if (searchTerm) {
      filter.$or = [
        { fullName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
        { currentRole: { $regex: searchTerm, $options: "i" } },
        { qualification: { $regex: searchTerm, $options: "i" } },
        { skills: { $regex: searchTerm, $options: "i" } },
        { "customAnswers.questionLabel": { $regex: searchTerm, $options: "i" } },
        { "customAnswers.answerValue": { $regex: searchTerm, $options: "i" } },
      ];
    }

    const skip = (parsedPage - 1) * parsedPageSize;
    const [items, total] = await Promise.all([
      JobApplication.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parsedPageSize).lean(),
      JobApplication.countDocuments(filter),
    ]);

    // Also get status counts for the filter bar
    const statusCounts = await JobApplication.aggregate([
      { $match: { jobId: require("mongoose").Types.ObjectId.createFromHexString(jobId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    return res.json({
      success: true,
      data: {
        items: items.map(formatApplication),
        total,
        page: parsedPage,
        pageSize: parsedPageSize,
        statusCounts: statusCounts.reduce((acc, s) => {
          acc[s._id] = s.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    logger.error("Error listing applications:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * PATCH /api/admin/applications/:id/notes
 * Admin — save an HR remark without changing the application status
 * Body: { internalNotes: string }
 */
const adminUpdateApplicationNotes = async (req, res) => {
  try {
    if (typeof req.body?.internalNotes !== "string") {
      return res.status(400).json({ success: false, message: "Remark must be text." });
    }

    const internalNotes = req.body.internalNotes.trim().slice(0, 5000);
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { internalNotes, notesUpdatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!application) return res.status(404).json({ success: false, message: "Not found." });

    return res.json({
      success: true,
      message: "HR remark saved.",
      data: formatApplication(application),
    });
  } catch (error) {
    logger.error("Error saving application remark:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET /api/admin/applications/:id
 * Admin — get a single application detail
 */
const adminGetApplication = async (req, res) => {
  try {
    const doc = await JobApplication.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    return res.json({ success: true, data: formatApplication(doc) });
  } catch (error) {
    logger.error("Error getting application:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * PATCH /api/admin/applications/:id/status
 * Admin — change application status (shortlisted / rejected / hired)
 * Body: { status: "shortlisted" | "rejected" | "hired", internalNotes?: string }
 */
const adminUpdateApplicationStatus = async (req, res) => {
  try {
    const { status, internalNotes } = req.body;
    const validStatuses = ["applied", "shortlisted", "rejected", "hired"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be: ${validStatuses.join(", ")}` });
    }

    const application = await JobApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: "Not found." });

    const previousStatus = application.status;
    application.status = status;
    application.statusChangedAt = new Date();
    if (internalNotes !== undefined) {
      application.internalNotes = internalNotes;
      application.notesUpdatedAt = new Date();
    }
    await application.save();

    // Fetch the job opening for the email
    const job = await JobOpening.findById(application.jobId).lean();

    // Send status update email if status actually changed and is a decision
    if (previousStatus !== status && (status === "shortlisted" || status === "rejected")) {
      sendCandidateStatusUpdate(application, job, status).catch((err) =>
        logger.error(`Status update email failed: ${err.message}`)
      );
    }

    return res.json({
      success: true,
      message: `Application ${status === "shortlisted" ? "shortlisted" : status === "rejected" ? "rejected" : "updated"} successfully.`,
      data: formatApplication(application),
    });
  } catch (error) {
    logger.error("Error updating application status:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * POST /api/admin/careers/:jobId/smart-filter
 * Admin — Gemini-powered smart filtering
 * Body: { query: "show me candidates with 3+ years Python experience" }
 */
const adminSmartFilter = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, message: "Query is required." });
    }

    // Fetch all applications for this job
    const applications = await JobApplication.find({ jobId }).lean();
    if (applications.length === 0) {
      return res.json({ success: true, data: { items: [], total: 0 } });
    }

    // Build a prompt for Gemini
    const candidateSummaries = applications.map((app, index) => ({
      candidateIndex: index,
      name: app.fullName,
      experience: app.experience,
      qualification: app.qualification,
      currentRole: app.currentRole,
      skills: (app.skills || []).join(", "),
      status: app.status,
      hasResume: Boolean(app.resumeFile?.url || app.resumeDriveLink),
      resumeFileName: app.resumeFile?.originalName || "",
      hasPortfolio: Boolean(app.portfolioLink),
      coverLetter: String(app.coverLetter || "").slice(0, 600),
      applicationAnswers: (app.customAnswers || []).map((answer) => ({
        question: answer.questionLabel,
        answer: Array.isArray(answer.answerValue)
          ? answer.answerValue.join(", ")
          : String(answer.answerValue || "").slice(0, 500),
      })),
      hrRemark: String(app.internalNotes || "").slice(0, 500),
    }));

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: "Gemini API not configured." });
    }

    const model = process.env.GEMINI_ADMIN_MODEL || "gemini-3.7-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const systemPrompt = `You are an HR assistant helping a non-technical HR manager filter job applicants. Given candidate profiles and a plain-language request, return a JSON array of candidateIndex integers that match, ordered by best match first.

Rules:
- If no candidates match, return an empty array []
- Evaluate every supplied candidate before answering; never stop after the first few matches
- Use the application answers, cover letter and HR remark when they are relevant
- Be smart about interpreting experience ranges (e.g., "3+ years" means 3 or more)
- Match skills intelligently (e.g., "Python" should match "python", "Python3", etc.)
- Consider qualification levels (e.g., "highest qualification" = PhD > Masters > Bachelors)
- Return only integer indexes that exist in the supplied list`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);
    let response;

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `Candidates:\n${JSON.stringify(candidateSummaries)}\n\nHR request: "${String(query).slice(0, 1000)}"\n\nReturn matching candidateIndex values as a JSON array.` }],
            },
          ],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            thinkingConfig: { thinkingLevel: "LOW" },
            responseMimeType: "application/json",
            responseSchema: { type: "ARRAY", items: { type: "INTEGER" } },
            maxOutputTokens: 4096,
          },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`Gemini smart-filter error (${response.status}): ${errorText}`);
      return res.status(502).json({ success: false, message: "Smart filter service is temporarily unavailable." });
    }

    const geminiResponse = await response.json();
    const responseText = extractCandidateText(geminiResponse?.candidates?.[0]) || "[]";
    const parsedIndexes = JSON.parse(responseText);
    const matchedIndexes = Array.isArray(parsedIndexes)
      ? [...new Set(parsedIndexes.filter((index) => Number.isInteger(index) && index >= 0 && index < applications.length))]
      : [];

    // Indexes are shorter and more reliable than asking the model to repeat Mongo IDs.
    const filtered = matchedIndexes.map((index) => applications[index]);

    return res.json({
      success: true,
      data: {
        items: filtered.map(formatApplication),
        total: filtered.length,
        query,
      },
    });
  } catch (error) {
    logger.error("Smart filter error:", error);
    return res.status(500).json({ success: false, message: "Smart filter failed. Try a simpler query." });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT APPLICATIONS AS CSV (Excel-compatible)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/admin/careers/:jobId/applications/export
 * Admin — Download all applications for a job as CSV (Excel-compatible)
 */
const exportApplicationsCSV = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await JobOpening.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const applications = await JobApplication.find({ jobId })
      .sort({ createdAt: -1 })
      .lean();

    // CSV helper — escape values with commas, quotes, newlines
    const esc = (val) => {
      if (val === null || val === undefined) return "";
      const s = String(val).replace(/"/g, '""');
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s;
    };

    // Build custom question headers
    const customQLabels = (job.customQuestions || []).map(q => q.label);

    // CSV Headers
    const headers = [
      "Receipt ID",
      "Full Name",
      "Email",
      "Phone",
      "Experience",
      "Current Role",
      "Qualification",
      "Skills",
      "Portfolio Link",
      "Resume (Drive Link)",
      "Cover Letter",
      "HR Remark",
      "Status",
      ...customQLabels,
      "Applied At",
    ];

    const rows = applications.map(app => {
      const customValues = customQLabels.map((label) => {
        const answer = (app.customAnswers || []).find(a => a.questionLabel === label);
        if (!answer) return "";
        return Array.isArray(answer.answerValue)
          ? answer.answerValue.join("; ")
          : String(answer.answerValue || "");
      });

      return [
        app.receiptId,
        app.fullName,
        app.email,
        app.phone || "",
        app.experience || "",
        app.currentRole || "",
        app.qualification || "",
        (app.skills || []).join(", "),
        app.portfolioLink || "",
        app.resumeDriveLink || "",
        app.coverLetter || "",
        app.internalNotes || "",
        app.status,
        ...customValues,
        app.createdAt ? new Date(app.createdAt).toISOString() : "",
      ];
    });

    // Build CSV string with BOM for Excel UTF-8 compatibility
    const BOM = "\uFEFF";
    const csv = BOM + [
      headers.map(esc).join(","),
      ...rows.map(row => row.map(esc).join(","))
    ].join("\n");

    const sanitizedTitle = job.title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
    const filename = `${sanitizedTitle}_Applicants_${new Date().toISOString().split("T")[0]}.csv`;

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (err) {
    logger.error(`Export CSV failed: ${err.message}`);
    res.status(500).json({ success: false, message: "Export failed" });
  }
};

module.exports = {
  // Public
  getActiveJobOpenings,
  getJobOpeningBySlug,
  submitApplication,
  // Admin
  adminListJobOpenings,
  adminGetJobOpening,
  adminCreateJobOpening,
  adminUpdateJobOpening,
  adminDeleteJobOpening,
  adminListApplications,
  adminGetApplication,
  adminDownloadApplicationResume,
  adminUpdateApplicationStatus,
  adminUpdateApplicationNotes,
  adminSmartFilter,
  exportApplicationsCSV,
};
