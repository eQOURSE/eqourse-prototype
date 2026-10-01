const test = require("node:test");
const assert = require("node:assert/strict");
const { CONTACT_HEADERS, mapContactQueryToSheetRow } = require("./contactGoogleSheetSync");

test("Contact Google Sheet row matches the Contact Query schema", () => {
  const row = mapContactQueryToSheetRow({
    _id: "contact123",
    name: "Test User",
    email: "test@example.com",
    phone_code: "+91",
    subject: "Need help",
    attachment: { originalName: "brief.pdf" },
    createdAt: new Date("2026-10-01T10:00:00.000Z"),
    updatedAt: new Date("2026-10-01T10:00:00.000Z"),
  });

  assert.equal(CONTACT_HEADERS.length, 15);
  assert.equal(row.length, CONTACT_HEADERS.length);
  assert.equal(row[0], "contact123");
  assert.equal(row[4], "+91");
  assert.equal(row[10], JSON.stringify({ originalName: "brief.pdf" }));
  assert.equal(row[13], "2026-10-01T10:00:00.000Z");
});
