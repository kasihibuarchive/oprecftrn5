/**
 * Google Sheets integration helper.
 *
 * Set `GOOGLE_SHEET_WEBHOOK_URL` in your .env file to a Google Apps Script
 * Web App URL that receives POST requests and appends a row to your
 * spreadsheet. Leave empty to only save locally (fallback).
 *
 * Example Apps Script (doGet/doPost) — deploy as Web App, "Anyone" access:
 *   function doPost(e) {
 *     const data = JSON.parse(e.postData.contents);
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     sheet.appendRow([
 *       new Date(),
 *       data.fullName, data.faculty, data.phone, data.instagram, data.bio,
 *       data.firstChoiceDivision, data.firstChoiceStatement,
 *       data.secondChoiceDivision, data.secondChoiceStatement,
 *       data.skills, data.experience, data.portfolioLink,
 *       data.motivation, data.availability
 *     ]);
 *     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 */

export const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim() || "";

export async function forwardToGoogleSheet(payload: Record<string, unknown>) {
  if (!GOOGLE_SHEET_WEBHOOK_URL) {
    return { forwarded: false, reason: "not_configured" as const };
  }
  try {
    const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Apps Script can be slow on cold start
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      return {
        forwarded: false,
        reason: "http_error" as const,
        status: res.status,
      };
    }
    return { forwarded: true };
  } catch (e) {
    return {
      forwarded: false,
      reason: "fetch_error" as const,
      error: e instanceof Error ? e.message : "unknown",
    };
  }
}
