/**
 * Legacy URL -> canonical route redirects.
 *
 * The site originally exposed deep, long-tail paths such as
 * `/content-services/custom-e-learning-content/quiz-question-bank`, while the
 * router only ever served the short canonical route
 * `/quiz-question-bank-development`. Every long-tail URL therefore fell through
 * to a soft-200 "Coming Soon" stub, which is bad for users and worse for SEO
 * (duplicate/thin pages, wasted crawl budget, orphaned canonical targets).
 *
 * Internal links now point straight at the canonical routes. These entries stay
 * so that URLs already indexed by search engines, or sitting in external
 * backlinks, still resolve to real content instead of a dead end.
 *
 * Used by the app router, development server, and generated hosting rules.
 */
export const legacyRedirects: Record<string, string> = {
  // Homepage and old PHP/static aliases reported by Search Console.
  "/index": "/",
  "/index.php": "/",
  "/index.html": "/",
  "/contact-us.html": "/contact-us",

  // Legacy primary-navigation and utility routes.
  "/career.html": "/career",
  "/free_pilot_signup": "/free-pilot",
  "/blog-detail.php": "/blog",
  "/blog/detail.php": "/blog",
  "/blog/detail": "/blog",
  "/blogs": "/blog",
  "/blogs/career": "/career",
  "/custom-elearning-solutions": "/custom-e-learning-content",
  // GSC reported the old AI-avatar sample URL as a soft 404. Consolidate both
  // historical variants directly into the substantial video samples hub.
  "/avatar-video-samples": "/video-samples",
  "/ai-avatar-video-samples": "/video-samples",

  // Old article URLs consolidated into substantial, current service pages.
  // Blog and case-study publishing remains controlled by the admin panel.
  "/blog/understanding-the-value-of-edtech-in-higher-education": "/blog",
  "/blogs/key-features-online-assessment-system": "/digital-assessment-infrastructure",
  "/blogs/five-key-indicators-adaptive-learning": "/adaptive-learning",
  "/blogs/immersive-simulation-ai": "/immersive-simulation-ar-vr",
  "/immersive-simulation-ai": "/immersive-simulation-ar-vr",

  // ── Category / overview pages ──
  "/content-services/custom-e-learning-content": "/custom-e-learning-content",
  "/content-services/exam-preparation-content": "/test-prep-content",
  "/content-services/learning-solutions": "/learning-solutions",
  "/content-services/elearning-video-solutions": "/elearning-video-solutions",
  "/content-services/localization-services": "/localization-services",
  "/content-services/technology-solutions": "/technology-solutions",
  "/content-services/subject-matter-experts": "/smes",
  "/content-services/accessibility": "/accessibility",

  // ── Custom E-Learning Content ──
  "/content-services/custom-e-learning-content/k12-and-higher-education": "/k12-and-higher-education",
  "/content-services/custom-e-learning-content/k12-curriculum-development": "/k12-curriculum-development-and-design-services",
  "/content-services/custom-e-learning-content/assessment-development": "/assessment-development-services",
  "/content-services/custom-e-learning-content/educational-content-development": "/educational-content-development",
  "/content-services/custom-e-learning-content/workbook-development": "/workbook-development",
  "/content-services/custom-e-learning-content/teacher-lesson-plan": "/teacher-lesson-plan",
  "/content-services/custom-e-learning-content/stem-curriculum": "/stem-curriculum-services",
  "/content-services/custom-e-learning-content/stem-curriculum-services": "/stem-curriculum-services",
  "/content-services/custom-e-learning-content/ebook-creation": "/interactive-ebook-creation",
  "/content-services/custom-e-learning-content/2d-3d-videos": "/2d-3d-videos",
  "/content-services/custom-e-learning-content/quiz-question-bank": "/quiz-question-bank-development",
  // Historical typo used `custom-elearning` (without the second hyphen).
  "/content-services/custom-elearning-content/quiz-question-bank": "/quiz-question-bank-development",

  // ── Exam Preparation Content ──
  "/content-services/exam-preparation-content/aptis": "/test-prep-content/aptis",
  "/content-services/exam-preparation-content/toeic": "/test-prep-content/toeic",
  "/content-services/exam-preparation-content/sat": "/test-prep-content/sat",
  "/content-services/exam-preparation-content/act": "/test-prep-content/act",
  "/content-services/exam-preparation-content/ap-exam": "/test-prep-content/ap-exam",
  "/content-services/exam-preparation-content/ielts": "/test-prep-content/ielts",
  "/content-services/exam-preparation-content/cefr": "/test-prep-content/cefr-placement-solutions",
  "/content-services/exam-preparation-content/cefr-placement-solutions": "/test-prep-content/cefr-placement-solutions",
  "/content-services/exam-preparation-content/pte": "/test-prep-content/pte",
  "/content-services/exam-preparation-content/toefl": "/test-prep-content/toefl",

  // ── Learning Solutions ──
  "/content-services/learning-solutions/ilt": "/ilt-solutions",
  "/content-services/learning-solutions/corporate-elearning": "/corporate-e-learning-solutions",
  "/content-services/learning-solutions/corporate-learning": "/corporate-e-learning-solutions",
  "/content-services/learning-solutions/training-modules": "/training-modules",
  "/content-services/learning-solutions/gamified-learning": "/gamified-learning",
  "/content-services/learning-solutions/adaptive-learning": "/adaptive-learning",
  "/content-services/learning-solutions/blended-learning": "/blended-learning",
  "/content-services/learning-solutions/ar-vr": "/immersive-simulation-ar-vr",
  "/content-services/learning-solutions/instructional-design": "/instructional-design-services",
  "/content-services/learning-solutions/ai-powered-learning": "/optimizing-ai-powered-learning",

  // ── E-Learning Video Solutions ──
  "/content-services/elearning-video-solutions/2d-3d-videos": "/2d-3d-videos",
  "/content-services/elearning-video-solutions/ppt-videos": "/ppt-videos-services",
  "/content-services/elearning-video-solutions/articulate-storyline": "/articulate-storyline-services",
  "/content-services/elearning-video-solutions/animated-videos": "/animated-videos-services",

  // ── Localization Services ──
  "/content-services/localization-services/translation": "/translation-services",
  "/content-services/localization-services/voice-over": "/voice-over-services",
  "/content-services/localization-services/subtitling": "/subtitling-services",

  // ── Technology Solutions ──
  "/content-services/technology-solutions/lms-course-builds": "/lms-course-builds",
  "/content-services/technology-solutions/white-label-lms": "/white-label-lms",

  // ── Subject Matter Experts ──
  "/content-services/subject-matter-experts/recruitment": "/tutors-and-sme-recruitment",
  "/content-services/subject-matter-experts/training": "/tutors-and-sme-training",
  "/content-services/subject-matter-experts/training-certification": "/tutors-and-sme-training",
  "/content-services/subject-matter-experts/live-tutors": "/live-online-tutor",
  "/content-services/subject-matter-experts/live-online-tutors": "/live-online-tutor",

  // ── Contact page: route was previously commented out, leaving /contact dead ──
  "/contact": "/contact-us",
};
