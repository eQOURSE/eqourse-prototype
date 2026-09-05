const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getActiveJobOpenings,
  getJobOpeningBySlug,
  submitApplication,
} = require("../controller/careerController");
const {
  submitTalentProfile,
  submitVendorRegistration,
} = require("../controller/workforceController");

// ─── Multer config for resume uploads ────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, "../../uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === "resume"
      ? "resumes"
      : file.fieldname === "registrationDocument"
        ? "vendor-registration"
        : "vendor-tax";
    const target = path.join(UPLOAD_DIR, folder);
    if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
    cb(null, target);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Upload a PDF, Word document, JPG or PNG file."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ─── Public Routes ───────────────────────────────────────────────────────
router.get("/", getActiveJobOpenings);
router.post("/talent-pool/apply", upload.single("resume"), submitTalentProfile);
router.post("/vendors/register", upload.fields([
  { name: "registrationDocument", maxCount: 1 },
  { name: "taxReturns", maxCount: 3 },
]), submitVendorRegistration);
router.get("/:slug", getJobOpeningBySlug);
router.post("/:jobId/apply", upload.single("resume"), submitApplication);

module.exports = router;
