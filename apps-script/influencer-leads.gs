// ============================================================
// Brilliant Brains — Influencer Lead Pipeline
// Paste this entire file into your Google Apps Script editor.
//
// SETUP STEPS:
//  1. Paste into script.google.com (tied to your Google Sheet)
//  2. Run setupSheet() once to create headers + dropdown
//  3. Deploy > New Deployment > Web App
//       Execute as: Me
//       Who has access: Anyone
//  4. Copy the Web App URL → paste into .env as VITE_INFLUENCER_SCRIPT_URL
//  5. Add an installable trigger:
//       Triggers → + Add Trigger → onEdit
//       Event source: From spreadsheet
//       Event type: On edit
// ============================================================

const SHEET_NAME   = "Influencer Leads";
const STATUS_COL   = 11;   // column K — Status
const TOKEN_COL    = 12;   // column L — UUID token (hidden)
const SIG_NAME_COL = 13;   // column M — Signature name after NDA
const SIG_AT_COL   = 14;   // column N — Signed timestamp
const MAIL_LINK_COL = 15;  // column O — clickable mailto link for reviewer

const NDA_BASE = "https://brilliantbrains.digital/nda";

// ─────────────────────────────────────────────
// Web App entry point
// ─────────────────────────────────────────────
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.action === "submit")       return handleFormSubmit(payload);
    if (payload.action === "complete_nda") return handleNDAComplete(payload);

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.toString() });
  }
}

// ─────────────────────────────────────────────
// Handle new form submission
// ─────────────────────────────────────────────
function handleFormSubmit(data) {
  const sheet = getSheet();
  const token = Utilities.getUuid();

  sheet.appendRow([
    data.fullName        || "",
    data.email           || "",
    data.whatsapp        || "",
    data.instagramHandle || "",
    data.city            || "",
    data.creatorType     || "",
    data.collabPreference || "",
    data.niches          || "",
    data.followerRange   || "",
    data.submittedAt     || new Date().toISOString(),
    "Pending",              // Status
    token,                  // Token (hidden col)
    "",                     // Signature Name (filled on NDA completion)
    "",                     // Signed At
  ]);

  return jsonResponse({ ok: true });
}

// ─────────────────────────────────────────────
// Handle NDA completion from React app
// ─────────────────────────────────────────────
function handleNDAComplete(data) {
  const sheet = getSheet();
  const rows  = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const rowEmail = rows[i][1];  // col B — Email
    const rowToken = rows[i][TOKEN_COL - 1]; // col L — Token (0-indexed)

    if (rowEmail === data.email && rowToken === data.token) {
      const rowNum = i + 1; // convert to 1-indexed
      sheet.getRange(rowNum, STATUS_COL).setValue("Registered");
      sheet.getRange(rowNum, SIG_NAME_COL).setValue(data.signatureName || "");
      sheet.getRange(rowNum, SIG_AT_COL).setValue(data.signedAt || new Date().toISOString());
      return jsonResponse({ ok: true });
    }
  }

  return jsonResponse({ ok: false, error: "Token mismatch or lead not found" });
}

// ─────────────────────────────────────────────
// Installable trigger — fires when sheet is edited
// ─────────────────────────────────────────────
function onEdit(e) {
  try {
    const sheet = e.source.getActiveSheet();
    if (sheet.getName() !== SHEET_NAME) return;
    if (e.range.getColumn() !== STATUS_COL) return;
    if (e.value !== "Approved") return;

    const row = e.range.getRow();
    if (row <= 1) return; // skip header row

    const name  = sheet.getRange(row, 1).getValue(); // col A
    const email = sheet.getRange(row, 2).getValue(); // col B
    const token = sheet.getRange(row, TOKEN_COL).getValue();

    if (!email || !token) {
      Logger.log("onEdit: missing email or token for row " + row);
      return;
    }

    writeMailtoLink(sheet, row, email, name, token);
    Logger.log("mailto link written for " + email);
  } catch (err) {
    Logger.log("onEdit error: " + err.toString());
  }
}

// ─────────────────────────────────────────────
// Write a clickable mailto: hyperlink into column O
// No email-send permissions required — only spreadsheet write access
// ─────────────────────────────────────────────
function writeMailtoLink(sheet, row, email, name, token) {
  const ndaLink = NDA_BASE
    + "?email=" + encodeURIComponent(email)
    + "&token=" + encodeURIComponent(token)
    + "&name="  + encodeURIComponent(name || "");

  const subject = "You're Approved! Sign Your Agreement – Brilliant Brains";
  const body = [
    "Hi " + (name || "Creator") + ",",
    "",
    "Congratulations! You've been approved to join the Brilliant Brains Influencer Network.",
    "",
    "Please sign your Non-Disclosure & Influencer Agreement to complete your registration:",
    "",
    ndaLink,
    "",
    "What happens next:",
    "✓ Sign the agreement (takes 2 minutes)",
    "✓ Our POC will reach out on WhatsApp within 24 hours",
    "✓ Start receiving brand campaigns matched to your niche",
    "",
    "Best,",
    "Brilliant Brains Team",
    "social@brilliantbrains.digital",
  ].join("\n");

  const mailtoUrl = "https://mail.google.com/mail/?view=cm&fs=1"
    + "&to="   + encodeURIComponent(email)
    + "&su="   + encodeURIComponent(subject)
    + "&body=" + encodeURIComponent(body);

  const richText = SpreadsheetApp.newRichTextValue()
    .setText("📧 Send NDA Email")
    .setLinkUrl(mailtoUrl)
    .build();

  sheet.getRange(row, MAIL_LINK_COL).setRichTextValue(richText);
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─────────────────────────────────────────────
// Run once after pasting: sets up headers + dropdown
// ─────────────────────────────────────────────
function setupSheet() {
  const sheet = getSheet();

  const headers = [
    "Full Name", "Email", "WhatsApp", "Instagram Handle",
    "City", "Creator Type", "Collab Preference", "Niches",
    "Follower Range", "Submitted At",
    "Status", "Token", "Signature Name", "Signed At", "Send NDA Email",
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#1a1a1a").setFontColor("#ffffff");
  sheet.setFrozenRows(1);

  // Dropdown validation on entire Status column (K), rows 2 onward
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Pending", "Approved", "Rejected", "Registered"], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, STATUS_COL, 1000, 1).setDataValidation(rule);

  // Hide the token column from casual view
  sheet.hideColumns(TOKEN_COL);

  // Auto-resize columns for readability
  sheet.autoResizeColumns(1, headers.length);

  Logger.log("Sheet setup complete — headers, dropdown, and token column hidden.");
}
