const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const logger = require("./src/utils/logger");
const Blog = require("./src/model/blog");
const CaseStudy = require("./src/model/caseStudy");
const { syncCmsSeoPage, getCmsSeoTarget } = require("./src/utils/cmsSeoPublisher");


// ── Routers ──────────────────────────────────────────────────────────────────
// Public routers (no auth required)
const contactRouter = require("./src/router/contactRouter");
const pilotRouter = require("./src/router/pilotRouter");
const blogRouter = require("./src/router/blogRouter");
const caseStudyRouter = require("./src/router/caseStudyRouter");
const sampleRouter = require("./src/router/sampleRouter");
const chatRouter = require("./src/router/chatRouter");
const careerRouter = require("./src/router/careerRouter");

// Admin router (JWT auth on all sub-routes except /login)
const adminRouter = require("./src/router/adminRouter");

// Upload directory for static file serving
const { UPLOAD_DIR } = require("./src/controller/uploadController");
const { isPrivateUploadRequest, removeUploadedFiles } = require("./src/utils/privateUploads");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  exposedHeaders: ["Content-Disposition"],
  credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(logger.requestLogger);

// Public media remains static, but candidate resumes and vendor verification
// documents are only downloadable through authenticated admin endpoints.
const blockPrivateUploads = (req, res, next) => {
  if (isPrivateUploadRequest(req.path)) return res.status(404).end();
  return next();
};
app.use("/api/uploads", blockPrivateUploads, express.static(UPLOAD_DIR));
app.use("/uploads", blockPrivateUploads, express.static(UPLOAD_DIR));

// ── Public Routes ────────────────────────────────────────────────────────────
app.use("/api/contact", contactRouter);       // POST /api/contact (public submit)
app.use("/api/free-pilot", pilotRouter);       // POST /api/free-pilot (public submit)
app.use("/api/blogs", blogRouter);             // GET /api/blogs, GET /api/blogs/:slug
app.use("/api/case-studies", caseStudyRouter); // GET /api/case-studies, GET /api/case-studies/:slug
app.use("/api/sample-categories", sampleRouter); // GET /api/sample-categories
app.use("/api/samples", sampleRouter);           // GET /api/samples, GET /api/samples/files
app.use("/api/chat", chatRouter);                 // POST /api/chat (Gemini AI proxy)
app.use("/api/careers", careerRouter);               // GET /api/careers, POST /api/careers/:jobId/apply
app.use("/api/careers", async (error, req, res, next) => {
  await removeUploadedFiles(req.file ? [req.file] : req.files);
  if (res.headersSent) return next(error);
  logger.warn(`Career upload rejected: ${error.message}`);
  const message = error.code === "LIMIT_FILE_SIZE"
    ? "Each uploaded file must be 5 MB or smaller."
    : error.code === "LIMIT_UNEXPECTED_FILE"
      ? "Too many files or an unexpected upload field was provided."
      : error.message || "The uploaded document could not be accepted.";
  return res.status(400).json({ success: false, message });
});

// ── Admin Routes ─────────────────────────────────────────────────────────────
app.use("/api/admin", adminRouter);            // All admin routes under /api/admin/*

// ── Health check ─────────────────────────────────────────────────────────────
const { smtpHealthCheck, sendTestEmail } = require("./src/utils/emailNotifier");
app.get("/", (req, res) => res.json({ status: "eQOURSE backend is running", version: "2.0.0" }));
app.get("/api/health/smtp", async (req, res) => {
  const result = await smtpHealthCheck();
  res.status(result.ok ? 200 : 503).json(result);
});
// Actually sends a real test email — use to verify end-to-end delivery
app.get("/api/health/smtp/test", async (req, res) => {
  const result = await sendTestEmail();
  res.status(result.ok ? 200 : 503).json(result);
});

// ── DB + Start ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eqourse";

async function reconcilePublishedCmsSeo() {
  logger.info(`CMS SEO live document root: ${getCmsSeoTarget()}`);
  const [blogs, caseStudies] = await Promise.all([
    Blog.find({ status: "published" }).lean(),
    CaseStudy.find({ status: "published" }).lean(),
  ]);

  for (const blog of blogs) {
    await syncCmsSeoPage("blog", blog);
  }
  for (const caseStudy of caseStudies) {
    await syncCmsSeoPage("case-study", caseStudy);
  }

  logger.info(`CMS SEO reconciled: ${blogs.length} blog(s), ${caseStudies.length} case study/case studies`);
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    logger.info(`✅ MongoDB connected: ${MONGO_URI}`);
    try {
      await reconcilePublishedCmsSeo();
    } catch (error) {
      logger.error(`CMS SEO reconciliation failed: ${error.message}`);
      const syncRequired = process.env.CMS_SEO_SYNC_REQUIRED === "true" || process.env.NODE_ENV === "production";
      if (syncRequired) throw error;
    }
    app.listen(PORT, () => logger.info(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    logger.error(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  });
