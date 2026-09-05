const test = require("node:test");
const assert = require("node:assert/strict");
const TalentProfile = require("./talentProfile");
const VendorRegistration = require("./vendorRegistration");
const { _internal } = require("../controller/workforceController");
const { isPrivateUploadRequest, resolveStoredAttachment } = require("../utils/privateUploads");

test("talent profiles require candidate identity", async () => {
  const profile = new TalentProfile({ fullName: "Ada Candidate", qualification: "Masters" });
  await assert.rejects(profile.validate(), /email/);
});

test("vendor verification requires registration evidence and 1–3 tax documents", async () => {
  const vendor = new VendorRegistration({
    companyName: "Verified Partner Ltd",
    country: "India",
    registrationNumber: "REG-001",
    contactName: "Sam",
    email: "sam@example.com",
    phone: "+91 9000000000",
    registrationDocument: { url: "/registration.pdf", originalName: "registration.pdf" },
    taxReturns: [],
  });
  await assert.rejects(vendor.validate(), /taxReturns/);
});

test("uploaded workforce files retain their physical server URL and original filename", () => {
  const attachment = _internal.attachmentFromFile({
    destination: "D:/uploads/resumes",
    filename: "stored.pdf",
    originalname: "Candidate Resume.pdf",
    size: 1024,
    mimetype: "application/pdf",
  });
  assert.equal(attachment.url, "/api/uploads/resumes/stored.pdf");
  assert.equal(attachment.originalName, "Candidate Resume.pdf");
});

test("candidate and vendor evidence folders are classified as private", () => {
  assert.equal(isPrivateUploadRequest("/resumes/stored.pdf"), true);
  assert.equal(isPrivateUploadRequest("/vendor-registration/company.pdf"), true);
  assert.equal(isPrivateUploadRequest("/vendor-tax/itr.pdf"), true);
  assert.equal(isPrivateUploadRequest("/blog/public-cover.webp"), false);
});

test("stored attachments resolve only inside explicitly allowed folders", () => {
  const resolved = resolveStoredAttachment(
    { url: "/api/uploads/resumes/stored.pdf" },
    new Set(["resumes"]),
  );
  assert.ok(resolved.endsWith(`${require("path").sep}uploads${require("path").sep}resumes${require("path").sep}stored.pdf`));
  assert.equal(resolveStoredAttachment({ url: "/api/uploads/vendor-tax/itr.pdf" }, new Set(["resumes"])), null);
  assert.equal(resolveStoredAttachment({ url: "/api/uploads/resumes/../secret.pdf" }, new Set(["resumes"])), null);
});
