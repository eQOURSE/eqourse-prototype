/**
 * Consolidated Admin Router
 *
 * All admin routes live under /api/admin/* and require JWT auth.
 * This matches the API contract in docs/BACKEND_INTEGRATION_GUIDE.md.
 */

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

// ── Controllers ──────────────────────────────────────────────
const { loginAdmin } = require("../controller/authController");
const blogCtrl = require("../controller/blogController");
const contactCtrl = require("../controller/contactController");
const pilotCtrl = require("../controller/pilotController");
const sampleCtrl = require("../controller/sampleController");
const caseStudyCtrl = require("../controller/caseStudyController");
const analyticsCtrl = require("../controller/analyticsController");
const uploadCtrl = require("../controller/uploadController");
const careerCtrl = require("../controller/careerController");
const workforceCtrl = require("../controller/workforceController");

// ═══════════════════════════════════════════════════════════════
// AUTH (no middleware)
// ═══════════════════════════════════════════════════════════════
router.post("/login", loginAdmin);

// ═══════════════════════════════════════════════════════════════
// All routes below require JWT auth
// ═══════════════════════════════════════════════════════════════
router.use(verifyToken);

// ── Analytics ────────────────────────────────────────────────
router.get("/analytics/summary", analyticsCtrl.getAnalyticsSummary);

// ── Blogs ────────────────────────────────────────────────────
router.get("/blogs", blogCtrl.adminListBlogs);
router.get("/blogs/:id", blogCtrl.adminGetBlogById);
router.post("/blogs", blogCtrl.createBlog);
router.patch("/blogs/:id", blogCtrl.updateBlog);
router.patch("/blogs/:id/status", blogCtrl.setBlogStatus);
router.delete("/blogs/:id", blogCtrl.deleteBlog);

// ── Case Studies ─────────────────────────────────────────────
router.get("/case-studies", caseStudyCtrl.adminListCaseStudies);
router.get("/case-studies/:id", caseStudyCtrl.adminGetCaseStudyById);
router.post("/case-studies", caseStudyCtrl.createCaseStudy);
router.patch("/case-studies/:id", caseStudyCtrl.updateCaseStudy);
router.patch("/case-studies/:id/status", caseStudyCtrl.setCaseStudyStatus);
router.delete("/case-studies/:id", caseStudyCtrl.deleteCaseStudy);

// ── Contact Queries ──────────────────────────────────────────
router.get("/contact-queries", contactCtrl.getAllContactQueries);
router.get("/contact-queries/:id", contactCtrl.getContactQuery);
router.patch("/contact-queries/:id", contactCtrl.updateContactQuery);
router.delete("/contact-queries/:id", contactCtrl.deleteContactQuery);

// ── Pilot Queries ────────────────────────────────────────────
router.get("/pilot-queries", pilotCtrl.getAllPilotQueries);
router.get("/pilot-queries/:id", pilotCtrl.getPilotQuery);
router.patch("/pilot-queries/:id", pilotCtrl.updatePilotQuery);
router.delete("/pilot-queries/:id", pilotCtrl.deletePilotQuery);

// ── Sample Categories ────────────────────────────────────────
router.get("/sample-categories", sampleCtrl.adminListCategories);
router.get("/sample-categories/:id", sampleCtrl.adminGetCategory);
router.post("/sample-categories", sampleCtrl.createCategory);
router.patch("/sample-categories/:id", sampleCtrl.updateCategory);
router.delete("/sample-categories/:id", sampleCtrl.deleteCategory);

// ── Samples (within categories) ──────────────────────────────
router.get("/sample-categories/:categoryId/samples", sampleCtrl.adminListItemsByCategory);
router.get("/samples/by-page", sampleCtrl.adminListItemsByPage);
router.post("/samples", sampleCtrl.createItemForPage);
router.get("/samples/:id", sampleCtrl.adminGetItem);
router.post("/sample-categories/:categoryId/samples", sampleCtrl.createItem);
router.patch("/samples/:id", sampleCtrl.updateItem);
router.delete("/samples/:id", sampleCtrl.deleteItem);

// ── File Uploads ─────────────────────────────────────────────
router.post("/uploads", uploadCtrl.uploadFile);

// ── Careers / Job Openings ───────────────────────────────────
router.get("/careers", careerCtrl.adminListJobOpenings);
router.get("/careers/:id", careerCtrl.adminGetJobOpening);
router.post("/careers", careerCtrl.adminCreateJobOpening);
router.patch("/careers/:id", careerCtrl.adminUpdateJobOpening);
router.delete("/careers/:id", careerCtrl.adminDeleteJobOpening);

// ── Job Applications ─────────────────────────────────────────
router.get("/careers/:jobId/applications", careerCtrl.adminListApplications);
router.get("/applications/:id", careerCtrl.adminGetApplication);
router.get("/applications/:id/resume", careerCtrl.adminDownloadApplicationResume);
router.patch("/applications/:id/status", careerCtrl.adminUpdateApplicationStatus);
router.patch("/applications/:id/notes", careerCtrl.adminUpdateApplicationNotes);
router.post("/careers/:jobId/smart-filter", careerCtrl.adminSmartFilter);
router.get("/careers/:jobId/applications/export", careerCtrl.exportApplicationsCSV);

// ── Talent Pool ─────────────────────────────────────────────
router.get("/talent-pool", workforceCtrl.adminListTalent);
router.get("/talent-pool/:id/resume", workforceCtrl.adminDownloadTalentResume);
router.patch("/talent-pool/:id", workforceCtrl.adminUpdateTalent);
router.post("/talent-pool/smart-filter", workforceCtrl.adminSmartFilterTalent);

// ── Vendor Registration & Verification ─────────────────────
router.get("/vendors", workforceCtrl.adminListVendors);
router.get("/vendors/:id/documents/:kind/:index?", workforceCtrl.adminDownloadVendorDocument);
router.patch("/vendors/:id", workforceCtrl.adminUpdateVendor);
router.delete("/vendors/:id", workforceCtrl.adminDeleteVendor);
router.post("/vendors/smart-filter", workforceCtrl.adminSmartFilterVendors);

module.exports = router;
