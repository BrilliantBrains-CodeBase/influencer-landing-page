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
const DOWNLOAD_LINK_COL  = 13;  // column M — Zoho download link
const AGREEMENT_DATE_COL = 14;  // column N — Agreement date from Zoho
const MAIL_LINK_COL = 15;  // column O — clickable mailto link for reviewer

const NDA_BASE     = "https://brilliantbrains.digital/nda";
const ZOHO_WEBHOOK = "https://writer.zoho.in/writer/api/v1/documents/9tx48bdd0e7ccbea74153bbfe4956e1500cfe/incomingwebhook/mergewithpresets?auth_type=apikeyauth&encapiKey=PHtE6L0MQOnqj2R99BUI4f%2B%2FFc6tYIom%2FOtuKVFC5d4WCfEKTU1R%2Fo15wT%2Bwq00qAPNKQqaSm4w557KasOzWdzvrM2ZICGqyqK3sx%2FVYSPOZufHsiyhJ7l5APiuEDtm6NQ%3D%3D";

// ─────────────────────────────────────────────
// Web App entry point
// ─────────────────────────────────────────────
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.action === "submit")       return handleFormSubmit(payload);
    if (payload.action === "complete_nda") return handleNDAComplete(payload);
    if (payload.action === "request_nda")  return handleNDARequest(payload);

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
      sheet.getRange(rowNum, DOWNLOAD_LINK_COL).setValue(data.signatureName || "");
      sheet.getRange(rowNum, AGREEMENT_DATE_COL).setValue(data.signedAt || new Date().toISOString());
      return jsonResponse({ ok: true });
    }
  }

  return jsonResponse({ ok: false, error: "Token mismatch or lead not found" });
}

// ─────────────────────────────────────────────
// Handle info-collection form submit → call Zoho webhook
// ─────────────────────────────────────────────
function handleNDARequest(data) {
  const mergePayload = {
    merge_data: {
      data: [{
        AgreementDate: data.agreementDate || "",
        Name:          data.name          || "",
        SocialHandle:  data.handle        || "",
        Pages:         data.address       || "",
        Phone:         data.phone         || "",
        email:         data.email         || "",
        "PAN Card":    data.panCard       || "",
      }]
    }
  };

  const response   = UrlFetchApp.fetch(ZOHO_WEBHOOK, {
    method:             "post",
    contentType:        "application/json",
    payload:            JSON.stringify(mergePayload),
    muteHttpExceptions: true,
  });

  const zohoResult    = JSON.parse(response.getContentText());
  const record        = zohoResult.records && zohoResult.records[0];
  const downloadLink  = record ? (record.download_link || "") : "";
  const agreementDate = record ? (record.AgreementDate || "").trim() : "";

  // Update sheet row
  const sheet = getSheet();
  const rows  = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === data.email && rows[i][TOKEN_COL - 1] === data.token) {
      const rowNum = i + 1;
      sheet.getRange(rowNum, STATUS_COL).setValue("Registered");
      sheet.getRange(rowNum, DOWNLOAD_LINK_COL).setValue(downloadLink);
      sheet.getRange(rowNum, AGREEMENT_DATE_COL).setValue(agreementDate);
      break;
    }
  }

  return jsonResponse({ ok: true });
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

    const name   = sheet.getRange(row, 1).getValue(); // col A
    const email  = sheet.getRange(row, 2).getValue(); // col B
    const phone  = sheet.getRange(row, 3).getValue(); // col C — WhatsApp
    const handle = sheet.getRange(row, 4).getValue(); // col D — Instagram
    const token  = sheet.getRange(row, TOKEN_COL).getValue();

    if (!email || !token) {
      Logger.log("onEdit: missing email or token for row " + row);
      return;
    }

    writeMailtoLink(sheet, row, email, name, token, phone, handle);
    Logger.log("mailto link written for " + email);
  } catch (err) {
    Logger.log("onEdit error: " + err.toString());
  }
}

// ─────────────────────────────────────────────
// Write a clickable mailto: hyperlink into column O
// No email-send permissions required — only spreadsheet write access
// ─────────────────────────────────────────────
function writeMailtoLink(sheet, row, email, name, token, phone, handle) {
  const ndaLink = NDA_BASE
    + "?email="  + encodeURIComponent(email)
    + "&token="  + encodeURIComponent(token)
    + "&name="   + encodeURIComponent(name   || "")
    + "&phone="  + encodeURIComponent(phone  || "")
    + "&handle=" + encodeURIComponent(handle || "");

  const subject = "Action Required: Complete Your Details for NDA Agreement – Brilliant Brains";
  const body = [
    "Hi " + (name || "Creator") + ",",
    "",
    "You've been approved to join the Brilliant Brains Influencer Network!",
    "",
    "To initiate your NDA Agreement, we need a few additional details.",
    "Please click the link below and fill in your Address and PAN Card number:",
    "",
    ndaLink,
    "",
    "This takes less than a minute. Once submitted, your NDA Agreement will be",
    "sent to your email for review and signing.",
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
    "Status", "Token", "Download Link", "Agreement Date", "Send NDA Email",
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
