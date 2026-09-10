const CaseStudy = require("../model/caseStudy");
const { syncCmsSeoPage, removeCmsSeoPage } = require("../utils/cmsSeoPublisher");

function normalizePagePath(value = "") {
  const clean = String(value).trim().split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}` : "";
}

function normalizePagePaths(values) {
  if (!Array.isArray(values)) return [];
  return [...new Set(values.map(normalizePagePath).filter(Boolean))];
}

// ─── Helper: format DB doc → frontend-compatible object ───────────────────────
function formatCaseStudy(doc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    client: doc.client,
    industry: doc.industry,
    heroImageUrl: doc.heroImageUrl || "",
    summary: doc.summary || "",
    challenge: doc.challenge || "",
    solution: doc.solution || "",
    results: doc.results || "",
    metrics: (doc.metrics || []).map((m) => ({ label: m.label, value: m.value })),
    tags: doc.tags || [],
    pagePaths: doc.pagePaths || [],
    relatedLinks: (doc.relatedLinks || []).map((rl) => ({ label: rl.label, href: rl.href })),
    bodyFormat: doc.bodyFormat || "markdown",
    seo: {
      title: doc.seo?.title || "",
      description: doc.seo?.description || "",
      ogImageUrl: doc.seo?.ogImageUrl || "",
      heroImageAlt: doc.seo?.heroImageAlt || `${doc.title} — ${doc.industry} case study by eQOURSE`,
      heroImageTitle: doc.seo?.heroImageTitle || doc.title,
    },
    status: doc.status,
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : undefined,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

// ─────────────────────────────────────────────
// PUBLIC OPERATIONS
// ─────────────────────────────────────────────

/**
 * GET /api/case-studies
 * Public — list all published case studies
 */
const listPublishedCaseStudies = async (req, res) => {
  try {
    const { limit = 100, page_path } = req.query;

    const filter = { status: "published" };
    if (page_path) {
      const pagePath = normalizePagePath(page_path);
      // relatedLinks.href is the legacy admin assignment used before pagePaths.
      filter.$or = [{ pagePaths: pagePath }, { "relatedLinks.href": pagePath }];
    }

    const caseStudies = await CaseStudy.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(Number(limit));

    return res.json({
      success: true,
      data: {
        items: caseStudies.map(formatCaseStudy),
        total: caseStudies.length,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/case-studies/:slug
 * Public — get a single published case study by slug
 */
const getPublishedCaseStudyBySlug = async (req, res) => {
  try {
    const cs = await CaseStudy.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!cs) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }

    return res.json({ success: true, data: formatCaseStudy(cs) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN OPERATIONS (CRUD)
// ─────────────────────────────────────────────

/**
 * GET /api/admin/case-studies
 * Admin — list all case studies (any status)
 */
const adminListCaseStudies = async (req, res) => {
  try {
    const { status, q, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { client: { $regex: q, $options: "i" } },
        { industry: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
      ];
    }

    const total = await CaseStudy.countDocuments(filter);
    const items = await CaseStudy.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json({
      success: true,
      data: { items: items.map(formatCaseStudy), total, page: Number(page), limit: Number(limit) },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/admin/case-studies/:id
 * Admin — get a single case study by ID
 */
const adminGetCaseStudyById = async (req, res) => {
  try {
    const cs = await CaseStudy.findById(req.params.id);
    if (!cs) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }
    return res.json({ success: true, data: formatCaseStudy(cs) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/admin/case-studies
 * Admin — create a new case study
 */
const createCaseStudy = async (req, res) => {
  try {
    const { title, slug, client, industry, heroImageUrl, summary, challenge, solution, results, metrics, tags, bodyFormat, seo, status, relatedLinks, pagePaths } = req.body;

    if (!title || !client) {
      return res.status(400).json({ success: false, message: "Title and client are required" });
    }

    let finalSlug = slug;
    if (finalSlug) {
      finalSlug = finalSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await CaseStudy.findOne({ slug: finalSlug });
      if (existing) {
        return res.status(400).json({ success: false, message: "Slug is already taken" });
      }
    }

    const csData = {
      title,
      slug: finalSlug,
      client,
      industry: industry || "",
      heroImageUrl: heroImageUrl || "",
      summary: summary || "",
      challenge: challenge || "",
      solution: solution || "",
      results: results || "",
      metrics: metrics || [],
      tags: tags || [],
      relatedLinks: relatedLinks || [],
      pagePaths: normalizePagePaths(pagePaths),
      bodyFormat: bodyFormat || "markdown",
      seo: seo || {},
      status: status || "draft",
    };

    if (status === "published") {
      csData.publishedAt = new Date();
    }

    const cs = await CaseStudy.create(csData);
    await syncCmsSeoPage("case-study", formatCaseStudy(cs));
    return res.status(201).json({ success: true, data: formatCaseStudy(cs) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/admin/case-studies/:id
 * Admin — update a case study
 */
const updateCaseStudy = async (req, res) => {
  try {
    const { slug, status } = req.body;

    if (Object.prototype.hasOwnProperty.call(req.body, "pagePaths")) {
      req.body.pagePaths = normalizePagePaths(req.body.pagePaths);
    }

    if (slug) {
      const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await CaseStudy.findOne({ slug: cleanSlug, _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Slug is already taken" });
      }
      req.body.slug = cleanSlug;
    }

    const current = await CaseStudy.findById(req.params.id);
    if (!current) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }

    if (status === "published" && current.status !== "published") {
      req.body.publishedAt = new Date();
    }

    const previousSlug = current.slug;
    const cs = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (previousSlug !== cs.slug) {
      await removeCmsSeoPage("case-study", previousSlug);
    }
    await syncCmsSeoPage("case-study", formatCaseStudy(cs));

    return res.json({ success: true, data: formatCaseStudy(cs) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/admin/case-studies/:id/status
 * Admin — change publish status
 */
const setCaseStudyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["draft", "published"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updateFields = { status };
    if (status === "published") {
      updateFields.publishedAt = new Date();
    }

    const cs = await CaseStudy.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!cs) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }

    await syncCmsSeoPage("case-study", formatCaseStudy(cs));

    return res.json({ success: true, data: formatCaseStudy(cs) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/admin/case-studies/:id
 * Admin — delete a case study
 */
const deleteCaseStudy = async (req, res) => {
  try {
    const cs = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!cs) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }
    await removeCmsSeoPage("case-study", cs.slug);
    return res.json({ success: true, message: "Case study deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  listPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
  adminListCaseStudies,
  adminGetCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  setCaseStudyStatus,
  deleteCaseStudy,
};
