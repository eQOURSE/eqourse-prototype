/**
 * Sample Controller — RESTRUCTURED for flat model
 *
 * Uses two Mongoose models:
 *   - SampleCategory (src/model/sampleCategory.js)
 *   - SampleItem (src/model/sampleItem.js)
 *
 * Matches the frontend's TypeScript types in src/admin/lib/types.ts.
 */

const SampleCategory = require("../model/sampleCategory");
const SampleItem = require("../model/sampleItem");

function normalizePagePath(value = "") {
  const clean = String(value).trim().split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}` : "";
}

function normalizePagePaths(values) {
  if (!Array.isArray(values)) return [];
  return [...new Set(values.map(normalizePagePath).filter(Boolean))];
}

// ─── Formatters ──────────────────────────────────────────────
function formatCategory(doc, sampleCount = 0) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    description: doc.description || undefined,
    thumbnailUrl: doc.thumbnailUrl || undefined,
    order: doc.order,
    sampleCount,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

function formatItem(doc) {
  return {
    id: doc._id.toString(),
    categoryId: doc.categoryId.toString(),
    title: doc.title,
    type: doc.type || "",
    description: doc.description || undefined,
    thumbnailUrl: doc.thumbnailUrl || "",
    fileUrl: doc.fileUrl || "",
    fileSize: doc.fileSize || undefined,
    order: doc.order,
    pageSlug: doc.pageSlug || "",
    tabName: doc.tabName || "",
    fileType: doc.fileType || "",
    isExternal: doc.isExternal || false,
    pagePaths: doc.pagePaths || [],
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

// ═══════════════════════════════════════════════════════════════
// PUBLIC ROUTES
// ═══════════════════════════════════════════════════════════════

const listCategories = async (req, res) => {
  try {
    const categories = await SampleCategory.find().sort({ order: 1 });
    const counts = await SampleItem.aggregate([
      { $group: { _id: "$categoryId", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));
    const result = categories.map((cat) =>
      formatCategory(cat, countMap.get(cat._id.toString()) || 0)
    );
    return res.json({ success: true, data: { items: result } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const listItemsByCategory = async (req, res) => {
  try {
    const category = await SampleCategory.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    const items = await SampleItem.find({ categoryId: category._id }).sort({ order: 1 });
    return res.json({
      success: true,
      data: { items: items.map(formatItem), category: formatCategory(category, items.length) },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/samples/files?pageSlug=kindergarten-to-k5-samples&tab=Course+Book
 * Returns preview files for a specific sample page (and optional tab).
 * Used by the public PreviewFilesModal.
 */
const listFilesByPage = async (req, res) => {
  try {
    const { pageSlug, tab, page_path } = req.query;
    if (!pageSlug && !page_path) {
      return res.status(400).json({ success: false, message: "pageSlug or page_path query param is required" });
    }
    const filter = page_path ? { pagePaths: normalizePagePath(page_path) } : { pageSlug };
    if (tab) filter.tabName = tab;
    const items = await SampleItem.find(filter).sort({ order: 1 });
    // Return in the PreviewFile shape expected by the frontend modal
    const files = items.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description || "",
      thumbnailUrl: doc.thumbnailUrl || "",
      fileType: doc.fileType || "",
      fileUrl: doc.fileUrl || "",
      isExternal: doc.isExternal || false,
    }));
    return res.json({ success: true, data: { files } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ═══════════════════════════════════════════════════════════════
// ADMIN CATEGORY ROUTES
// ═══════════════════════════════════════════════════════════════

const adminListCategories = async (req, res) => {
  try {
    const categories = await SampleCategory.find().sort({ order: 1 });
    const counts = await SampleItem.aggregate([
      { $group: { _id: "$categoryId", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));
    const result = categories.map((cat) =>
      formatCategory(cat, countMap.get(cat._id.toString()) || 0)
    );
    return res.json({ success: true, data: { items: result } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const adminGetCategory = async (req, res) => {
  try {
    const cat = await SampleCategory.findById(req.params.id);
    if (!cat) return res.status(404).json({ success: false, message: "Category not found" });
    const count = await SampleItem.countDocuments({ categoryId: cat._id });
    return res.json({ success: true, data: formatCategory(cat, count) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug, description, thumbnailUrl, order } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });
    const finalSlug = (slug || name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const existing = await SampleCategory.findOne({ slug: finalSlug });
    if (existing) return res.status(400).json({ success: false, message: "Slug is already taken" });
    const cat = await SampleCategory.create({
      name, slug: finalSlug,
      description: description || "", thumbnailUrl: thumbnailUrl || "",
      order: order ?? (await SampleCategory.countDocuments()),
    });
    return res.status(201).json({ success: true, data: formatCategory(cat) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { slug } = req.body;
    if (slug) {
      const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await SampleCategory.findOne({ slug: cleanSlug, _id: { $ne: req.params.id } });
      if (existing) return res.status(400).json({ success: false, message: "Slug is already taken" });
      req.body.slug = cleanSlug;
    }
    const cat = await SampleCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cat) return res.status(404).json({ success: false, message: "Category not found" });
    const count = await SampleItem.countDocuments({ categoryId: cat._id });
    return res.json({ success: true, data: formatCategory(cat, count) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const sampleCount = await SampleItem.countDocuments({ categoryId: req.params.id });
    if (sampleCount > 0 && req.query.force !== "true") {
      return res.status(400).json({
        success: false, message: `Category has ${sampleCount} samples. Use ?force=true to delete all.`,
      });
    }
    if (req.query.force === "true") {
      await SampleItem.deleteMany({ categoryId: req.params.id });
    }
    const cat = await SampleCategory.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ success: false, message: "Category not found" });
    return res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ═══════════════════════════════════════════════════════════════
// ADMIN SAMPLE ITEM ROUTES
// ═══════════════════════════════════════════════════════════════

const adminListItemsByCategory = async (req, res) => {
  try {
    const items = await SampleItem.find({ categoryId: req.params.categoryId }).sort({ order: 1 });
    return res.json({ success: true, data: { items: items.map(formatItem) } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const adminGetItem = async (req, res) => {
  try {
    const item = await SampleItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Sample not found" });
    return res.json({ success: true, data: formatItem(item) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { title, type, description, thumbnailUrl, fileUrl, fileSize, order,
            pageSlug, tabName, fileType, isExternal, pagePaths } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });
    const existing = await SampleItem.find({ categoryId: req.params.categoryId });
    const item = await SampleItem.create({
      categoryId: req.params.categoryId, title,
      type: type || "", description: description || "",
      thumbnailUrl: thumbnailUrl || "", fileUrl: fileUrl || "",
      fileSize: fileSize || undefined, order: order ?? existing.length + 1,
      pageSlug: pageSlug || "", tabName: tabName || "",
      fileType: fileType || "", isExternal: isExternal || false,
      pagePaths: normalizePagePaths(pagePaths),
    });
    return res.status(201).json({ success: true, data: formatItem(item) });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    if (Object.prototype.hasOwnProperty.call(req.body, "pagePaths")) {
      req.body.pagePaths = normalizePagePaths(req.body.pagePaths);
    }
    const item = await SampleItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: "Sample not found" });
    return res.json({ success: true, data: formatItem(item) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await SampleItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Sample not found" });
    return res.json({ success: true, message: "Sample deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const adminListItemsByPage = async (req, res) => {
  try {
    const { pageSlug, tab } = req.query;
    if (!pageSlug) {
      return res.status(400).json({ success: false, message: "pageSlug query param is required" });
    }
    const filter = { pageSlug };
    if (tab) filter.tabName = tab;
    const items = await SampleItem.find(filter).sort({ order: 1 });
    return res.json({ success: true, data: { items: items.map(formatItem) } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createItemForPage = async (req, res) => {
  try {
    const { title, type, description, thumbnailUrl, fileUrl, fileSize, order,
            pageSlug, tabName, fileType, isExternal, pagePaths } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });
    if (!pageSlug) return res.status(400).json({ success: false, message: "pageSlug is required" });
    
    // Auto-generate a dummy categoryId since we are flat (required by model)
    // We'll create or find a dummy category for this pageSlug
    let category = await SampleCategory.findOne({ slug: pageSlug });
    if (!category) {
      category = await SampleCategory.create({
        name: pageSlug,
        slug: pageSlug,
        description: "Auto-generated category",
        order: 999
      });
    }

    const existing = await SampleItem.find({ pageSlug, tabName });
    const item = await SampleItem.create({
      categoryId: category._id,
      title,
      type: type || tabName || "", 
      description: description || "",
      thumbnailUrl: thumbnailUrl || "", 
      fileUrl: fileUrl || "",
      fileSize: fileSize || undefined, 
      order: order ?? existing.length + 1,
      pageSlug: pageSlug || "", 
      tabName: tabName || "",
      fileType: fileType || "", 
      isExternal: isExternal || false,
      pagePaths: normalizePagePaths(pagePaths),
    });
    return res.status(201).json({ success: true, data: formatItem(item) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  listCategories, listItemsByCategory, listFilesByPage,
  adminListCategories, adminGetCategory, createCategory, updateCategory, deleteCategory,
  adminListItemsByCategory, adminGetItem, createItem, updateItem, deleteItem,
  adminListItemsByPage, createItemForPage
};
