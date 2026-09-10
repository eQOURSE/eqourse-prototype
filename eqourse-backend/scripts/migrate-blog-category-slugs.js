require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("../src/model/blog");

const slugify = (value) => String(value || "")
  .trim()
  .toLowerCase()
  .replace(/&/g, "and")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const CATEGORY_ALIASES = {
  "Content Services": "content-services",
  "Content Service": "content-services",
  "AI Data": "ai-data-services",
  "AI Data Services": "ai-data-services",
};

// These labels have hrefs that do not exactly match a normal label slug.
const HREF_ALIASES = {
  "E-Learning Video Solutions": "elearning-video-solutions",
  "3D & LiDAR Annotation": "3d-point-cloud-lidar-annotation",
  "RLHF & LLM Evaluation": "llm-rlhf-annotation",
  "Document & OCR": "document-ocr-annotation",
  "NLP Annotation": "text-nlp-annotation",
  "Audio Annotation": "audio-speech-annotation",
  "ASR & Speech Model Testing": "asr-speech-model-testing",
  "asr-and-speech-model-testing": "asr-speech-model-testing",
  "Human Evaluation & A/B Testing": "human-evaluation-ab-testing",
  "human-evaluation-and-a-b-testing": "human-evaluation-ab-testing",
  "AI Bias & Fairness Audit": "bias-fairness-audit",
  "ai-bias-and-fairness-audit": "bias-fairness-audit",
  "K12 & Higher Education": "k12-and-higher-education",
  "APTIS Prep": "aptis",
  "TOEIC Prep": "toeic",
  "SAT Prep": "sat",
  "ACT Prep": "act",
  "AP Exam Prep": "ap-exam",
  "IELTS Prep": "ielts",
  "PTE Prep": "pte",
  "TOEFL Prep": "toefl",
};

const hrefValue = (value) => {
  const cleanValue = String(value || "").replace(/^\/+|\/+$/g, "");
  return cleanValue.includes("/") ? cleanValue.split("/").pop() : cleanValue;
};

const toValue = (value, aliases = {}) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.startsWith("/")) return hrefValue(raw);
  return aliases[raw] || HREF_ALIASES[raw] || slugify(raw);
};

function migrateCategories(categories) {
  if (!Array.isArray(categories)) return [];

  return categories
    .map((categoryEntry) => {
      // Supports the temporary old shape where subcategories were strings.
      const category = typeof categoryEntry === "string" ? categoryEntry : categoryEntry?.category;
      const rawSubcategories = typeof categoryEntry === "string" ? [] : categoryEntry?.subcategories;
      const subcategories = Array.isArray(rawSubcategories)
        ? rawSubcategories
            .map((subcategoryEntry) => {
              const subcategory = typeof subcategoryEntry === "string" ? subcategoryEntry : subcategoryEntry?.subcategory;
              const rawSubSubcategories = typeof subcategoryEntry === "string" ? [] : subcategoryEntry?.subSubcategories;
              return {
                subcategory: toValue(subcategory),
                subSubcategories: Array.isArray(rawSubSubcategories)
                  ? [...new Set(rawSubSubcategories.map((item) => toValue(item)).filter(Boolean))]
                  : [],
              };
            })
            .filter((item) => item.subcategory)
        : [];

      return {
        category: toValue(category, CATEGORY_ALIASES),
        subcategories,
      };
    })
    .filter((item) => item.category);
}

function withoutMongooseIds(categories) {
  return (Array.isArray(categories) ? categories : []).map((category) => ({
    category: category.category,
    subcategories: (Array.isArray(category.subcategories) ? category.subcategories : []).map((subcategory) => ({
      subcategory: subcategory.subcategory,
      subSubcategories: Array.isArray(subcategory.subSubcategories) ? subcategory.subSubcategories : [],
    })),
  }));
}

async function main() {
  const apply = process.argv.includes("--apply");
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/eqourse";

  await mongoose.connect(mongoUri);
  const blogs = await Blog.find({ categories: { $exists: true, $ne: [] } }).select("_id title categories").lean();
  let changed = 0;

  for (const blog of blogs) {
    const migrated = migrateCategories(blog.categories);
    if (JSON.stringify(migrated) === JSON.stringify(withoutMongooseIds(blog.categories))) continue;
    changed += 1;

    if (apply) {
      await Blog.updateOne(
        { _id: blog._id },
        { $set: { categories: migrated, updatedAt: new Date() } },
      );
    }

    console.log(`${apply ? "Updated" : "Would update"}: ${blog.title} (${blog._id})`);
    console.log(JSON.stringify(migrated));
  }

  console.log(`${apply ? "Migration complete" : "Dry run complete"}: ${changed} blog(s) ${apply ? "updated" : "would be updated"}.`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("Blog category migration failed:", error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
