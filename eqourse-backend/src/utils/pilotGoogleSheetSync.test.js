const test = require("node:test");
const assert = require("node:assert/strict");
const { PILOT_HEADERS, mapPilotQueryToSheetRow } = require("./pilotGoogleSheetSync");

test("Pilot Google Sheet row matches the documented headers", () => {
  const row = mapPilotQueryToSheetRow({
    _id: "abc123",
    name: "Test User",
    email: "test@example.com",
    attachment: { url: "/uploads/pilot/file.pdf", originalName: "file.pdf" },
    createdAt: new Date("2026-10-01T10:00:00.000Z"),
    updatedAt: new Date("2026-10-01T10:00:00.000Z"),
  });

  assert.equal(PILOT_HEADERS.length, 17);
  assert.equal(row.length, PILOT_HEADERS.length);
  assert.equal(row[0], "abc123");
  assert.equal(row[1], "Test User");
  assert.equal(row[12], JSON.stringify({ url: "/uploads/pilot/file.pdf", originalName: "file.pdf" }));
  assert.equal(row[15], "2026-10-01T10:00:00.000Z");
});
