const CDN_BASE_URL = String(
  process.env.UPLOAD_CDN_BASE_URL || process.env.EVENT_CDN_BASE_URL || "",
).replace(/\/+$/, "");

function toPublicAssetUrl(value = "") {
  const assetUrl = String(value || "").trim();
  if (!assetUrl || !CDN_BASE_URL || /^https?:\/\//i.test(assetUrl)) return assetUrl;

  const normalized = assetUrl.startsWith("/") ? assetUrl : `/${assetUrl}`;
  if (!normalized.startsWith("/uploads/") && !normalized.startsWith("/api/uploads/")) {
    return assetUrl;
  }

  return `${CDN_BASE_URL}${normalized.replace(/^\/api(?=\/uploads\/)/, "")}`;
}

module.exports = { toPublicAssetUrl };
