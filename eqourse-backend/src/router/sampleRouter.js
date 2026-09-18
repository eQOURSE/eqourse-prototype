/**
 * Public Sample Router
 *
 * GET /api/sample-categories                → list all categories
 * GET /api/sample-categories/:slug/samples  → list samples in a category
 *
 * Admin routes are in adminRouter.js under /api/admin/sample-categories/*
 */

const express = require("express");
const router = express.Router();
const { listCategories, listItemsByCategory, listFilesByPage, listTabSettings } = require("../controller/sampleController");

router.get("/", listCategories);
router.get("/files", listFilesByPage);
router.get("/tabs/:pageSlug", listTabSettings);
router.get("/:slug/samples", listItemsByCategory);

module.exports = router;
