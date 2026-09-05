/**
 * eQOURSE Email Notification System
 *
 * Sends beautifully formatted HTML email notifications to the team
 * whenever a new Contact Us or Free Pilot query is submitted.
 *
 * DESIGN PRINCIPLES:
 * - Fire-and-forget: email sending never blocks the user's response
 * - Graceful degradation: if SMTP is not configured, notifications are
 *   silently skipped (logged as a warning, never thrown)
 * - All query details are included directly in the email body so the
 *   recipient can act without visiting the admin panel
 */

const nodemailer = require("nodemailer");
const logger = require("./logger");

// ─── SMTP Transport ─────────────────────────────────────────────────────────

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Log what we see — critical for production debugging
  const missing = [];
  if (!host) missing.push("SMTP_HOST");
  if (!user) missing.push("SMTP_USER");
  if (!pass) missing.push("SMTP_PASS");

  if (missing.length > 0) {
    const msg = `❌ SMTP NOT CONFIGURED — missing env vars: ${missing.join(", ")}. Email notifications are DISABLED.`;
    console.error(msg);
    logger.error(msg);
    return null;
  }

  console.log(`✅ SMTP configured: host=${host}, port=${port}, user=${user}`);
  logger.info(`SMTP configured: host=${host}, port=${port}, user=${user}`);

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    family: 4, // Force IPv4 to prevent ENETUNREACH for IPv6
    connectionTimeout: 10000, // 10s connection timeout
    greetingTimeout: 10000,   // 10s greeting timeout
    socketTimeout: 15000,     // 15s socket timeout
  });

  return transporter;
}

/**
 * Health-check: call from an API route to verify SMTP is working.
 * Returns { ok: boolean, message: string, details: object }
 */
async function smtpHealthCheck() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const details = {
    SMTP_HOST: host || "NOT SET",
    SMTP_PORT: process.env.SMTP_PORT || "587 (default)",
    SMTP_USER: user || "NOT SET",
    SMTP_PASS: pass ? "***SET***" : "NOT SET",
    NOTIFY_EMAIL: process.env.NOTIFY_EMAIL || "som@eqourse.com (default)",
    NODE_ENV: process.env.NODE_ENV || "not set",
  };

  const t = getTransporter();
  if (!t) return { ok: false, message: "SMTP not configured — missing env vars", details };
  try {
    await t.verify();
    return { ok: true, message: "SMTP connection verified — emails WILL work", details };
  } catch (err) {
    // Reset transporter on verify failure so next call recreates it
    transporter = null;
    return { ok: false, message: `SMTP verify FAILED: ${err.message}`, details };
  }
}

/**
 * Send a real test email — call from an API route to confirm end-to-end delivery.
 */
async function sendTestEmail() {
  const t = getTransporter();
  if (!t) {
    return { ok: false, message: "SMTP not configured — cannot send test email" };
  }

  const user = process.env.SMTP_USER || "eqourse@gmail.com";
  const to = process.env.NOTIFY_EMAIL || "som@eqourse.com";
  const from = `eQOURSE Test <${user}>`;
  const timestamp = new Date().toISOString();

  try {
    // First verify connection
    await t.verify();
    console.log("✅ SMTP verify passed, now sending test email...");

    const info = await t.sendMail({
      from,
      to,
      subject: `✅ eQOURSE Email Test — ${timestamp}`,
      html: `<div style="font-family:sans-serif;padding:20px;">
        <h2 style="color:#0d9488;">✅ Email System Working!</h2>
        <p>This test email was sent at: <strong>${timestamp}</strong></p>
        <p>From: <code>${from}</code></p>
        <p>To: <code>${to}</code></p>
        <p>SMTP Host: <code>${process.env.SMTP_HOST}</code></p>
        <p>SMTP User: <code>${user}</code></p>
        <hr/>
        <p style="color:#666;font-size:12px;">If you received this, the email system is working correctly on production.</p>
      </div>`,
    });

    console.log(`✅ TEST EMAIL SENT! MessageId: ${info.messageId}, Response: ${info.response}`);
    return {
      ok: true,
      message: "Test email sent successfully!",
      messageId: info.messageId,
      response: info.response,
      sentTo: to,
      sentFrom: from,
    };
  } catch (err) {
    console.error(`❌ TEST EMAIL FAILED: ${err.message}`);
    console.error("Full error:", err);
    // Reset transporter on failure
    transporter = null;
    return {
      ok: false,
      message: `Email send FAILED: ${err.message}`,
      errorCode: err.code,
      errorCommand: err.command,
    };
  }
}

// ─── Shared Styles ──────────────────────────────────────────────────────────

const BRAND_COLOR = "#0d9488";       // teal-600
const BRAND_DARK = "#0f766e";        // teal-700
const BG_DARK = "#1a1a2e";           // dark navy
const TEXT_LIGHT = "#f8fafc";
const TEXT_MUTED = "#94a3b8";
const CARD_BG = "#ffffff";
const BORDER = "#e2e8f0";

function baseTemplate({ title, emoji, headerSubtitle, bodyHtml, footerNote }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${BG_DARK};font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_DARK};padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          
          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND_COLOR},${BRAND_DARK});border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <div style="font-size:40px;margin-bottom:8px;">${emoji}</div>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:${TEXT_LIGHT};letter-spacing:-0.3px;">
                ${title}
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">
                ${headerSubtitle}
              </p>
            </td>
          </tr>
          
          <!-- BODY -->
          <tr>
            <td style="background:${CARD_BG};padding:32px 40px;">
              ${bodyHtml}
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td style="background:#f1f5f9;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:${TEXT_MUTED};">
                ${footerNote}
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#cbd5e1;">
                eQOURSE Admin • Powered by eQOURSE Platform
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Build a styled key-value row for the email body.
 */
function fieldRow(label, value, options = {}) {
  if (!value || value.toString().trim() === "") return "";
  
  const { highlight, badge } = options;
  
  let valueHtml = escapeHtml(value.toString());
  
  if (badge) {
    const badgeColor = badge === "chatbot" ? "#7c3aed" : BRAND_COLOR;
    valueHtml = `<span style="display:inline-block;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:600;color:#fff;background:${badgeColor};">${valueHtml}</span>`;
  } else if (highlight) {
    valueHtml = `<span style="font-weight:600;color:${BRAND_DARK};">${valueHtml}</span>`;
  }
  
  return `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:${TEXT_MUTED};font-weight:500;white-space:nowrap;vertical-align:top;border-bottom:1px solid ${BORDER};width:140px;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-bottom:1px solid ${BORDER};">
        ${valueHtml}
      </td>
    </tr>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

const SERVICE_LABELS = {
  "ai-data": "AI Data Services",
  "content-services": "Content Services",
  "edtech": "EdTech",
  "localization": "Localization",
  "other": "Other",
};

// ─── Contact Us Notification ────────────────────────────────────────────────

/**
 * Send an email notification for a new Contact Us query.
 * @param {Object} query — Mongoose document from the ContactQuery model
 */
async function sendContactNotification(query) {
  const mailer = getTransporter();
  if (!mailer) {
    console.error("❌ sendContactNotification SKIPPED — SMTP not configured");
    logger.error("sendContactNotification SKIPPED — SMTP transporter is null");
    return;
  }
  console.log(`📧 Attempting to send contact notification for ${query.email}...`);

  const to = process.env.NOTIFY_EMAIL || "som@eqourse.com";
  const smtpUser = process.env.SMTP_USER || "eqourse@gmail.com";
  const from = `eQOURSE Notifications <${smtpUser}>`;

  const sourceBadge = (query.source || "website").toLowerCase();

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      ${fieldRow("Name", query.name, { highlight: true })}
      ${fieldRow("Email", query.email)}
      ${fieldRow("Phone", query.phone_code && query.phone ? `${query.phone_code} ${query.phone}` : query.phone)}
      ${fieldRow("Company", query.company)}
      ${fieldRow("Designation", query.designation)}
      ${fieldRow("Subject", query.subject, { highlight: true })}
      ${fieldRow("Message", query.message)}
      ${fieldRow("Source", sourceBadge, { badge: sourceBadge })}
      ${fieldRow("Submitted At", formatDate(query.createdAt || new Date()))}
    </table>
    
    <div style="margin-top:24px;padding:16px;background:#f0fdfa;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:13px;color:${BRAND_DARK};font-weight:600;">
        💡 Quick Reply Tip
      </p>
      <p style="margin:6px 0 0;font-size:13px;color:#334155;">
        You can reply directly to this email — it will go to <strong>${escapeHtml(query.email)}</strong>
      </p>
    </div>`;

  const subject = `🔔 New Contact Inquiry — ${query.name}${query.subject ? ` • ${query.subject}` : ""}`;

  try {
    await mailer.sendMail({
      from,
      to,
      replyTo: query.email,
      subject,
      html: baseTemplate({
        title: "New Contact Us Inquiry",
        emoji: "📬",
        headerSubtitle: `Received on ${formatDate(query.createdAt || new Date())} via ${sourceBadge}`,
        bodyHtml,
        footerNote: "This is an automated notification from the eQOURSE website contact form.",
      }),
    });
    console.log(`✅ Contact notification sent to ${to} for query from ${query.email}`);
    logger.info(`📧 Contact notification sent to ${to} for query from ${query.email}`);
  } catch (err) {
    console.error(`❌ CONTACT EMAIL FAILED: ${err.message}`, err);
    logger.error(`Failed to send contact notification: ${err.message}`);
    // Reset transporter so next attempt recreates connection
    transporter = null;
  }
}

// ─── Free Pilot Notification ────────────────────────────────────────────────

/**
 * Send an email notification for a new Free Pilot request.
 * @param {Object} query — Mongoose document from the PilotQuery model
 */
async function sendPilotNotification(query) {
  const mailer = getTransporter();
  if (!mailer) {
    console.error("❌ sendPilotNotification SKIPPED — SMTP not configured");
    logger.error("sendPilotNotification SKIPPED — SMTP transporter is null");
    return;
  }
  console.log(`📧 Attempting to send pilot notification for ${query.email}...`);

  const to = process.env.NOTIFY_EMAIL || "som@eqourse.com";
  const smtpUser = process.env.SMTP_USER || "eqourse@gmail.com";
  const from = `eQOURSE Notifications <${smtpUser}>`;

  const sourceBadge = (query.source || "website").toLowerCase();
  const serviceLabel = SERVICE_LABELS[query.serviceInterest] || query.serviceInterest;

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      ${fieldRow("Name", query.name, { highlight: true })}
      ${fieldRow("Email", query.email)}
      ${fieldRow("Phone", query.phone)}
      ${fieldRow("Company", query.company, { highlight: true })}
      ${fieldRow("Role", query.role)}
      ${fieldRow("Service Interest", serviceLabel, { highlight: true })}
      ${fieldRow("Project Scope", query.projectScope)}
      ${fieldRow("Timeline", query.timeline)}
      ${fieldRow("Languages", query.languages)}
      ${fieldRow("Message", query.message)}
      ${fieldRow("Source", sourceBadge, { badge: sourceBadge })}
      ${fieldRow("Submitted At", formatDate(query.createdAt || new Date()))}
    </table>
    ${query.attachment && query.attachment.url ? `
    <div style="margin-top:16px;padding:12px 16px;background:#fef9c3;border-radius:8px;border-left:4px solid #eab308;">
      <p style="margin:0;font-size:13px;color:#854d0e;font-weight:600;">
        📎 Attachment Included
      </p>
      <p style="margin:4px 0 0;font-size:13px;color:#713f12;">
        ${escapeHtml(query.attachment.originalName || "File attached")} — view in admin panel
      </p>
    </div>` : ""}
    
    <div style="margin-top:16px;padding:16px;background:#f0fdfa;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:13px;color:${BRAND_DARK};font-weight:600;">
        💡 Quick Reply Tip
      </p>
      <p style="margin:6px 0 0;font-size:13px;color:#334155;">
        You can reply directly to this email — it will go to <strong>${escapeHtml(query.email)}</strong>
      </p>
    </div>`;

  const subject = `🚀 New Free Pilot Request — ${query.name}${query.company ? ` • ${query.company}` : ""}`;

  try {
    await mailer.sendMail({
      from,
      to,
      replyTo: query.email,
      subject,
      html: baseTemplate({
        title: "New Free Pilot Request",
        emoji: "🚀",
        headerSubtitle: `${serviceLabel} • Received on ${formatDate(query.createdAt || new Date())} via ${sourceBadge}`,
        bodyHtml,
        footerNote: "This is an automated notification from the eQOURSE Free Pilot request form.",
      }),
    });
    console.log(`✅ Pilot notification sent to ${to} for request from ${query.email}`);
    logger.info(`📧 Pilot notification sent to ${to} for request from ${query.email}`);
  } catch (err) {
    console.error(`❌ PILOT EMAIL FAILED: ${err.message}`, err);
    logger.error(`Failed to send pilot notification: ${err.message}`);
    // Reset transporter so next attempt recreates connection
    transporter = null;
  }
}

// (final module.exports is at end of file)

// ═══════════════════════════════════════════════════════════════════════════
// CAREER EMAIL SYSTEM (uses team@eqourse.com — separate SMTP transport)
// ═══════════════════════════════════════════════════════════════════════════

let careerTransporter = null;

function getCareerTransporter() {
  if (careerTransporter) return careerTransporter;

  const host = process.env.CAREERS_SMTP_HOST || process.env.SMTP_HOST;
  const port = parseInt(process.env.CAREERS_SMTP_PORT || process.env.SMTP_PORT || "587", 10);
  const user = process.env.CAREERS_SMTP_USER;
  const pass = process.env.CAREERS_SMTP_PASS;

  if (!user || !pass) {
    logger.warn("Career SMTP not configured — career email notifications disabled.");
    return null;
  }

  careerTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    family: 4, // Force IPv4 to prevent ENETUNREACH for IPv6
  });

  return careerTransporter;
}

const DEPT_LABELS_EMAIL = {
  "ai-data": "AI Data Services",
  "content-services": "Content Services",
  operations: "Operations & Admin",
  marketing: "Marketing & BD",
  technology: "Technology & Engineering",
  hr: "Human Resources",
  other: "Other",
};

/**
 * Notify HR (team@eqourse.com) when a new application is received.
 */
async function sendApplicationReceivedNotification(application, job) {
  const mailer = getCareerTransporter();
  if (!mailer) return;

  const to = process.env.CAREERS_NOTIFY_EMAIL || "team@eqourse.com";
  const smtpUser = process.env.CAREERS_SMTP_USER || "team@eqourse.com";
  const from = `eQOURSE Careers <${smtpUser}>`;
  const deptLabel = DEPT_LABELS_EMAIL[job.department] || job.department;

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      ${fieldRow("Receipt ID", application.receiptId, { highlight: true })}
      ${fieldRow("Position", job.title, { highlight: true })}
      ${fieldRow("Department", deptLabel)}
      ${fieldRow("Candidate", application.fullName, { highlight: true })}
      ${fieldRow("Email", application.email)}
      ${fieldRow("Phone", application.phone)}
      ${fieldRow("Experience", application.experience)}
      ${fieldRow("Current Role", application.currentRole)}
      ${fieldRow("Qualification", application.qualification)}
      ${fieldRow("Skills", (application.skills || []).join(", "))}
      ${fieldRow("Portfolio", application.portfolioLink)}
      ${fieldRow("Resume", application.resumeFile ? application.resumeFile.originalName : (application.resumeDriveLink || "—"))}
      ${fieldRow("Cover Letter", application.coverLetter)}
      ${(application.customAnswers || []).map(ans => fieldRow(ans.questionLabel, Array.isArray(ans.answerValue) ? ans.answerValue.join(", ") : String(ans.answerValue), { highlight: true })).join("\n")}
      ${fieldRow("Applied At", formatDate(application.createdAt || new Date()))}
    </table>`;

  try {
    await mailer.sendMail({
      from,
      to,
      replyTo: application.email,
      subject: `📋 New Application for ${job.title} — ${application.fullName} [${application.receiptId}]`,
      html: baseTemplate({
        title: `New Application for ${job.title}`,
        emoji: "📋",
        headerSubtitle: `${deptLabel} • ${job.location} • ${application.receiptId}`,
        bodyHtml,
        footerNote: "This is an automated notification from the eQOURSE Careers portal.",
      }),
    });
    logger.info(`📧 Career HR notification sent for ${application.email} → ${job.title}`);
  } catch (err) {
    logger.error(`Career HR notification failed: ${err.message}`);
  }
}

/**
 * Send a confirmation receipt email to the candidate after applying.
 */
async function sendCandidateConfirmation(application, job) {
  const mailer = getCareerTransporter();
  if (!mailer) return;

  const smtpUser = process.env.CAREERS_SMTP_USER || "team@eqourse.com";
  const from = `eQOURSE Careers <${smtpUser}>`;
  const deptLabel = DEPT_LABELS_EMAIL[job.department] || job.department;

  const bodyHtml = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,${BRAND_COLOR},${BRAND_DARK});text-align:center;line-height:64px;font-size:28px;">✅</div>
    </div>
    <h2 style="text-align:center;color:#1e293b;font-size:20px;margin:0 0 8px;">Application Received!</h2>
    <p style="text-align:center;color:${TEXT_MUTED};font-size:14px;margin:0 0 24px;">
      Thank you for applying, <strong>${escapeHtml(application.fullName)}</strong>. We're excited to review your profile!
    </p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      ${fieldRow("Position", job.title, { highlight: true })}
      ${fieldRow("Department", deptLabel)}
      ${fieldRow("Location", job.location)}
      ${fieldRow("Receipt ID", application.receiptId, { highlight: true })}
      ${fieldRow("Applied On", formatDate(application.createdAt || new Date()))}
    </table>
    
    <div style="margin-top:24px;padding:16px;background:#f0fdfa;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:13px;color:${BRAND_DARK};font-weight:600;">
        📌 What happens next?
      </p>
      <p style="margin:6px 0 0;font-size:13px;color:#334155;">
        Our HR team will review your application within <strong>5-7 business days</strong>. If your profile matches our requirements, we'll reach out to schedule the next steps. Please keep your receipt ID <strong>${escapeHtml(application.receiptId)}</strong> for your reference.
      </p>
    </div>`;

  try {
    await mailer.sendMail({
      from,
      to: application.email,
      subject: `✅ Application Received — ${job.title} at eQOURSE [${application.receiptId}]`,
      html: baseTemplate({
        title: "Application Confirmed",
        emoji: "✅",
        headerSubtitle: `${job.title} • ${deptLabel} • ${job.location}`,
        bodyHtml,
        footerNote: `You're receiving this because you applied for ${job.title} at eQOURSE. If you didn't apply, please ignore this email.`,
      }),
    });
    logger.info(`📧 Candidate confirmation sent to ${application.email} for ${job.title}`);
  } catch (err) {
    logger.error(`Candidate confirmation email failed: ${err.message}`);
  }
}

/**
 * Send status update email to candidate (shortlisted or rejected).
 */
async function sendCandidateStatusUpdate(application, job, status) {
  const mailer = getCareerTransporter();
  if (!mailer) return;

  const smtpUser = process.env.CAREERS_SMTP_USER || "team@eqourse.com";
  const from = `eQOURSE Careers <${smtpUser}>`;
  const jobTitle = job ? job.title : "the position";

  let bodyHtml;
  let subject;

  if (status === "shortlisted") {
    subject = `🎉 Congratulations! You've been shortlisted — ${jobTitle} at eQOURSE`;
    bodyHtml = `
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);text-align:center;line-height:64px;font-size:28px;">🎉</div>
      </div>
      <h2 style="text-align:center;color:#1e293b;font-size:20px;margin:0 0 8px;">You've Been Shortlisted!</h2>
      <p style="text-align:center;color:${TEXT_MUTED};font-size:14px;margin:0 0 24px;">
        Great news, <strong>${escapeHtml(application.fullName)}</strong>!
      </p>
      
      <div style="padding:20px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;margin-bottom:20px;">
        <p style="margin:0;font-size:15px;color:#166534;line-height:1.7;">
          We're thrilled to let you know that after carefully reviewing your application for 
          <strong>${escapeHtml(jobTitle)}</strong>, our team has decided to move forward with your candidacy. 
          Your skills and experience truly stood out! 🌟
        </p>
      </div>
      
      <div style="padding:16px;background:#f0fdfa;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
        <p style="margin:0;font-size:13px;color:${BRAND_DARK};font-weight:600;">
          📌 Next Steps
        </p>
        <p style="margin:6px 0 0;font-size:13px;color:#334155;">
          A member of our HR team will reach out to you shortly to discuss the next round of the selection process. 
          Please keep an eye on your inbox (and spam folder, just in case!).
        </p>
      </div>
      
      <p style="text-align:center;margin-top:24px;font-size:13px;color:${TEXT_MUTED};">
        Reference: <strong>${escapeHtml(application.receiptId)}</strong>
      </p>`;
  } else {
    subject = `Application Update — ${jobTitle} at eQOURSE`;
    bodyHtml = `
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#94a3b8,#64748b);text-align:center;line-height:64px;font-size:28px;">📝</div>
      </div>
      <h2 style="text-align:center;color:#1e293b;font-size:20px;margin:0 0 8px;">Thank You for Applying</h2>
      <p style="text-align:center;color:${TEXT_MUTED};font-size:14px;margin:0 0 24px;">
        Dear <strong>${escapeHtml(application.fullName)}</strong>,
      </p>
      
      <div style="padding:20px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:20px;">
        <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;">
          Thank you for your interest in the <strong>${escapeHtml(jobTitle)}</strong> position at eQOURSE 
          and for taking the time to apply. After careful consideration, we have decided to move forward 
          with other candidates whose profiles more closely align with our current requirements.
        </p>
        <p style="margin:12px 0 0;font-size:15px;color:#334155;line-height:1.7;">
          This decision does not diminish the value of your skills and experience. We encourage you to 
          keep an eye on our <a href="https://www.eqourse.com/career" style="color:${BRAND_COLOR};text-decoration:underline;">careers page</a> 
          for future opportunities that may be a better fit.
        </p>
      </div>
      
      <div style="padding:16px;background:#fefce8;border-radius:8px;border-left:4px solid #eab308;">
        <p style="margin:0;font-size:13px;color:#854d0e;font-weight:600;">
          💡 Stay Connected
        </p>
        <p style="margin:6px 0 0;font-size:13px;color:#713f12;">
          We genuinely appreciate your interest in eQOURSE. Your profile has been saved, and we may reach out 
          if a suitable role opens up in the future.
        </p>
      </div>
      
      <p style="text-align:center;margin-top:24px;font-size:12px;color:${TEXT_MUTED};">
        We wish you all the best in your career journey. 💚
      </p>`;
  }

  try {
    await mailer.sendMail({
      from,
      to: application.email,
      subject,
      html: baseTemplate({
        title: status === "shortlisted" ? "You're Shortlisted!" : "Application Update",
        emoji: status === "shortlisted" ? "🎉" : "📝",
        headerSubtitle: `${jobTitle} • eQOURSE Careers`,
        bodyHtml,
        footerNote: `This email was sent regarding your application (${application.receiptId}) for ${jobTitle} at eQOURSE.`,
      }),
    });
    logger.info(`📧 Status update (${status}) sent to ${application.email} for ${jobTitle}`);
  } catch (err) {
    logger.error(`Status update email failed: ${err.message}`);
  }
}

async function sendCareerMail({ to, replyTo, subject, title, emoji, subtitle, bodyHtml, footerNote }) {
  const mailer = getCareerTransporter();
  if (!mailer) return;
  const smtpUser = process.env.CAREERS_SMTP_USER || "team@eqourse.com";
  await mailer.sendMail({
    from: `eQOURSE Careers <${smtpUser}>`,
    to,
    replyTo,
    subject,
    html: baseTemplate({ title, emoji, headerSubtitle: subtitle, bodyHtml, footerNote }),
  });
}

/** Confirmation to the candidate and notification to HR for evergreen talent profiles. */
async function sendTalentPoolEmails(profile) {
  const hr = process.env.CAREERS_NOTIFY_EMAIL || "team@eqourse.com";
  const details = `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
    ${fieldRow("Reference", profile.receiptId, { highlight: true })}
    ${fieldRow("Candidate", profile.fullName, { highlight: true })}
    ${fieldRow("Email", profile.email)}${fieldRow("Phone", profile.phone)}
    ${fieldRow("Location", profile.location)}${fieldRow("Preferred roles", (profile.preferredRoles || []).join(", "))}
    ${fieldRow("Experience", profile.experience)}${fieldRow("Qualification", profile.qualification)}
    ${fieldRow("Skills", (profile.skills || []).join(", "))}${fieldRow("Resume", profile.resumeFile?.originalName)}
  </table>`;
  await Promise.all([
    sendCareerMail({ to: hr, replyTo: profile.email, subject: `🌱 New talent-pool profile — ${profile.fullName}`, title: "New Talent-Pool Profile", emoji: "🌱", subtitle: profile.receiptId, bodyHtml: details, footerNote: "Review and search this profile in the eQOURSE admin talent pool." }),
    sendCareerMail({ to: profile.email, subject: `Profile received by eQOURSE — ${profile.receiptId}`, title: "Your profile is in our talent pool", emoji: "✅", subtitle: profile.receiptId, bodyHtml: `<p style="font-size:15px;line-height:1.7;color:#334155;">Thank you, <strong>${escapeHtml(profile.fullName)}</strong>. We have securely received your profile and resume. Our hiring team may contact you when a suitable opportunity matches your experience.</p><div style="padding:16px;background:#f0fdfa;border-left:4px solid ${BRAND_COLOR};border-radius:8px;">Keep this reference: <strong>${escapeHtml(profile.receiptId)}</strong></div>`, footerNote: "Submitting a profile does not guarantee placement or employment." }),
  ]);
}

/** Notify an evergreen talent-pool candidate when HR changes their status. */
async function sendTalentStatusUpdate(profile, status) {
  const copy = {
    shortlisted: {
      title: "Your profile has been shortlisted",
      subject: "Talent-pool update from eQOURSE",
      emoji: "🎉",
      message: "Your profile has been shortlisted for further review. Our hiring team will contact you if a suitable opportunity progresses.",
    },
    hired: {
      title: "Talent-pool status updated",
      subject: "Career update from eQOURSE",
      emoji: "✅",
      message: "Our hiring team has updated your talent-pool profile following a successful engagement. Your eQOURSE contact will share any next steps directly.",
    },
    rejected: {
      title: "Talent-pool profile update",
      subject: "Talent-pool update from eQOURSE",
      emoji: "📝",
      message: "Thank you for sharing your experience with eQOURSE. We are not progressing your profile at this time, but we appreciate your interest in working with us.",
    },
    applied: {
      title: "Your profile remains in our talent pool",
      subject: "Talent-pool update from eQOURSE",
      emoji: "🌱",
      message: "Your profile is active in our talent pool and may be considered when a suitable opportunity becomes available.",
    },
  }[status];
  if (!copy) return;
  await sendCareerMail({
    to: profile.email,
    subject: `${copy.subject} — ${profile.receiptId}`,
    title: copy.title,
    emoji: copy.emoji,
    subtitle: `${profile.fullName} • ${profile.receiptId}`,
    bodyHtml: `<div style="padding:20px;background:#f8fafc;border-left:4px solid ${BRAND_COLOR};border-radius:8px;"><p style="margin:0;font-size:15px;line-height:1.7;color:#334155;">${escapeHtml(copy.message)}</p></div>`,
    footerNote: "This message relates to the profile you submitted to the eQOURSE talent pool.",
  });
}

/** Confirmation to the company and notification to the vendor-review team. */
async function sendVendorRegistrationEmails(vendor) {
  const hr = process.env.CAREERS_NOTIFY_EMAIL || "team@eqourse.com";
  const details = `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
    ${fieldRow("Reference", vendor.receiptId, { highlight: true })}${fieldRow("Company", vendor.companyName, { highlight: true })}
    ${fieldRow("Country", vendor.country)}${fieldRow("Registration no.", vendor.registrationNumber)}
    ${fieldRow("Contact", vendor.contactName)}${fieldRow("Email", vendor.email)}${fieldRow("Phone", vendor.phone)}
    ${fieldRow("Services", (vendor.services || []).join(", "))}${fieldRow("Registration file", vendor.registrationDocument?.originalName)}
    ${fieldRow("Tax documents", (vendor.taxReturns || []).map((file) => file.originalName).join(", "))}
  </table>`;
  await Promise.all([
    sendCareerMail({ to: hr, replyTo: vendor.email, subject: `🏢 New vendor registration — ${vendor.companyName}`, title: "Vendor Registration Received", emoji: "🏢", subtitle: vendor.receiptId, bodyHtml: details, footerNote: "Verify the company and uploaded documents in the eQOURSE admin vendor workspace." }),
    sendCareerMail({ to: vendor.email, subject: `Vendor registration received — ${vendor.receiptId}`, title: "Registration received", emoji: "✅", subtitle: vendor.companyName, bodyHtml: `<p style="font-size:15px;line-height:1.7;color:#334155;">Thank you for registering <strong>${escapeHtml(vendor.companyName)}</strong> with eQOURSE. Our team will verify the submitted company and tax documents before making a decision.</p><div style="padding:16px;background:#f0fdfa;border-left:4px solid ${BRAND_COLOR};border-radius:8px;">Reference: <strong>${escapeHtml(vendor.receiptId)}</strong></div>`, footerNote: "Registration does not create a supplier agreement or guarantee project allocation." }),
  ]);
}

/** Email the company on approval, hold, or rejection. Hold messages include HR's reason. */
async function sendVendorStatusUpdate(vendor, status, message) {
  const labels = { registered: "Registered for review", approved: "Approved", hold: "Placed on hold", rejected: "Registration update" };
  const colours = { registered: BRAND_COLOR, approved: "#059669", hold: "#d97706", rejected: "#64748b" };
  const explanation = status === "registered"
    ? "Your registration is active and awaiting verification by our review team. We will email you when its status changes."
    : status === "approved"
    ? "Your company verification has been approved. Our team may contact you when a suitable engagement becomes available."
    : status === "hold"
      ? `Your registration is currently on hold. Reason from our review team: <strong>${escapeHtml(message)}</strong>`
      : "Thank you for your interest. We are unable to approve the registration at this time.";
  await sendCareerMail({
    to: vendor.email,
    subject: `${labels[status] || "Vendor status updated"} — eQOURSE [${vendor.receiptId}]`,
    title: labels[status] || "Vendor status updated",
    emoji: status === "approved" ? "✅" : status === "hold" ? "⏸️" : status === "registered" ? "🏢" : "📝",
    subtitle: `${vendor.companyName} • ${vendor.receiptId}`,
    bodyHtml: `<div style="padding:20px;border-radius:12px;border-left:4px solid ${colours[status] || BRAND_COLOR};background:#f8fafc;"><p style="margin:0;font-size:15px;line-height:1.7;color:#334155;">${explanation}</p></div>`,
    footerNote: "This message relates to your eQOURSE vendor registration.",
  });
}

module.exports = {
  sendContactNotification,
  sendPilotNotification,
  sendApplicationReceivedNotification,
  sendCandidateConfirmation,
  sendCandidateStatusUpdate,
  sendTalentPoolEmails,
  sendTalentStatusUpdate,
  sendVendorRegistrationEmails,
  sendVendorStatusUpdate,
  smtpHealthCheck,
  sendTestEmail,
};
