const Blog = require("../model/blog");
const { syncCmsSeoPage, removeCmsSeoPage } = require("../utils/cmsSeoPublisher");

// Progressive taxonomy filter: category -> sub_category -> sub_sub_category.
// Missing levels are valid and simply make the filter broader.
function buildCategoryFilter({ category, sub_category, sub_sub_category }) {
  const categoryMatch = {};
  const subcategoryMatch = {};

  if (category) categoryMatch.category = category;
  if (sub_category) subcategoryMatch.subcategory = sub_category;
  if (sub_sub_category) subcategoryMatch.subSubcategories = sub_sub_category;

  if (Object.keys(subcategoryMatch).length > 0) {
    categoryMatch.subcategories = { $elemMatch: subcategoryMatch };
  }

  return Object.keys(categoryMatch).length > 0
    ? { categories: { $elemMatch: categoryMatch } }
    : {};
}

/**
 * GET /api/blogs
 * Public — list published blog posts with optional filters (tags, grade, board_course, subject)
 */
const listPublishedBlogs = async (req, res) => {
  try {
    const {
      tags,
      grade,
      board_course,
      subject,
      category,
      sub_category,
      sub_sub_category,
      q,
      is_featured,
      limit = 10,
      page = 1
    } = req.query;

    const filter = { status: "published" };

    if (tags) {
      filter.tags = { $in: tags.split(",") };
    }
    if (grade) {
      filter.grade = grade;
    }
    if (board_course) {
      filter.board_course = board_course;
    }
    if (subject) {
      filter.subject = subject;
    }
    Object.assign(filter, buildCategoryFilter({ category, sub_category, sub_sub_category }));
    if (is_featured !== undefined) {
      filter.is_featured = is_featured === "true";
    }
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { excerpt: { $regex: q, $options: "i" } },
        { body: { $regex: q, $options: "i" } }
      ];
    }

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json({
      success: true,
      data: {
        items: blogs.map(formatBlog),
        total,
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/blogs/:slug
 * Public — get a single published blog post by slug and increment view count
 */
const getPublishedBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: "published" },
      { $inc: { view_count: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    return res.json({ success: true, data: formatBlog(blog) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN OPERATIONS (CRUD & Publish Status)
// ─────────────────────────────────────────────

/**
 * GET /api/admin/blogs
 * Admin — list all blog posts (any status)
 */
const adminListBlogs = async (req, res) => {
  try {
    const { status, category, sub_category, sub_sub_category, q, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (status && status !== "all") {
      filter.status = status;
    }
    Object.assign(filter, buildCategoryFilter({ category, sub_category, sub_sub_category }));
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { excerpt: { $regex: q, $options: "i" } },
        { body: { $regex: q, $options: "i" } }
      ];
    }

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json({
      success: true,
      data: {
        items: blogs.map(formatBlog),
        total,
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/admin/blogs/:id
 * Admin — get a single blog post by ID
 */
const adminGetBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    return res.json({ success: true, data: formatBlog(blog) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/admin/blogs
 * Admin — create a new blog post
 */
const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      body,
      bodyFormat,
      coverImageUrl,
      author,
      tags,
      categories,
      grade,
      board_course,
      subject,
      seo,
      status,
      is_featured
    } = req.body;

    if (!title || !body) {
      return res.status(400).json({ success: false, message: "Title and body content are required" });
    }

    // Prepare slug if provided
    let finalSlug = slug;
    if (finalSlug) {
      finalSlug = finalSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await Blog.findOne({ slug: finalSlug });
      if (existing) {
        return res.status(400).json({ success: false, message: "Slug is already taken" });
      }
    }

    const blogData = {
      title,
      slug: finalSlug,
      excerpt: excerpt || "",
      body,
      bodyFormat: bodyFormat || "html",
      coverImageUrl: coverImageUrl || "",
      author: author || {},
      tags: tags || [],
      categories: categories || [],
      grade: grade || "",
      board_course: board_course || "",
      subject: subject || "",
      seo: seo || {},
      status: status || "draft",
      is_featured: !!is_featured
    };

    if (status === "published") {
      blogData.publishedAt = new Date();
    }

    const blog = await Blog.create(blogData);
    await syncCmsSeoPage("blog", formatBlog(blog));
    return res.status(201).json({ success: true, data: formatBlog(blog) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/admin/blogs/:id
 * Admin — update a blog post
 */
const updateBlog = async (req, res) => {
  try {
    const { slug, status } = req.body;

    if (slug) {
      const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await Blog.findOne({ slug: cleanSlug, _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Slug is already taken" });
      }
      req.body.slug = cleanSlug;
    }

    const currentBlog = await Blog.findById(req.params.id);
    if (!currentBlog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    // Set publishedAt if transitioning to published
    if (status === "published" && currentBlog.status !== "published") {
      req.body.publishedAt = new Date();
    }

    const previousSlug = currentBlog.slug;
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (previousSlug !== blog.slug) {
      await removeCmsSeoPage("blog", previousSlug);
    }
    await syncCmsSeoPage("blog", formatBlog(blog));

    return res.json({ success: true, data: formatBlog(blog) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/admin/blogs/:id/status
 * Admin — change publish status
 */
const setBlogStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["draft", "published"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updateFields = { status };
    if (status === "published") {
      updateFields.publishedAt = new Date();
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    await syncCmsSeoPage("blog", formatBlog(blog));

    return res.json({ success: true, data: formatBlog(blog) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/admin/blogs/:id
 * Admin — delete a blog post
 */
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    await removeCmsSeoPage("blog", blog.slug);
    return res.json({ success: true, message: "Blog post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Helper: format DB doc → frontend-compatible object ───────────────────────
function formatBlog(doc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt || "",
    body: doc.body,
    bodyFormat: doc.bodyFormat,
    coverImageUrl: doc.coverImageUrl || "",
    author: {
      name: doc.author?.name || "eQOURSE Team",
      avatarUrl: doc.author?.avatarUrl || ""
    },
    tags: doc.tags || [],
    categories: doc.categories || [],
    grade: doc.grade || "",
    board_course: doc.board_course || "",
    subject: doc.subject || "",
    seo: {
      title: doc.seo?.title || "",
      description: doc.seo?.description || "",
      ogImageUrl: doc.seo?.ogImageUrl || "",
      coverImageAlt: doc.seo?.coverImageAlt || `${doc.title} — eQOURSE blog cover image`,
      coverImageTitle: doc.seo?.coverImageTitle || doc.title
    },
    status: doc.status,
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : undefined,
    readingMinutes: doc.readingMinutes || 0,
    viewCount: doc.view_count || 0,
    isFeatured: doc.is_featured || false,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString()
  };
}

module.exports = {
  listPublishedBlogs,
  getPublishedBlogBySlug,
  adminListBlogs,
  adminGetBlogById,
  createBlog,
  updateBlog,
  setBlogStatus,
  deleteBlog
};
