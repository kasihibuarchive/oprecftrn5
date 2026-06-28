/**
 * Google Sheets integration helper.
 *
 * Set `GOOGLE_SHEET_WEBHOOK_URL` in your .env file to a Google Apps Script
 * Web App URL that receives POST requests and appends a row to your
 * spreadsheet. Leave empty to only save locally (fallback).
 *
 * NOTE: Google Apps Script edge blocks POST bodies that look like raw JSON
 * (bodies starting with `{`). We send data as `application/x-www-form-urlencoded`
 * fields instead, which is reliably delivered to doPost(e.parameter).
 *
 * Apps Script (doPost) — deploy as Web App, "Anyone" access:
 *
 *   function doPost(e) {
 *     const p = e.parameter;
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     if (sheet.getLastRow() === 0) {
 *       sheet.appendRow([
 *         "Timestamp", "Nama Lengkap", "Fakultas/Jurusan", "No. WhatsApp",
 *         "Instagram", "Biodata", "1st Choice Divisi", "Statement 1st Choice",
 *         "2nd Choice Divisi", "Statement 2nd Choice", "Keahlian",
 *         "Pengalaman", "Portfolio Link", "Motivasi", "Ketersediaan Waktu"
 *       ]);
 *     }
 *     sheet.appendRow([
 *       p.timestamp, p.fullName, p.faculty, p.phone, p.instagram, p.bio,
 *       p.firstChoiceDivision, p.firstChoiceStatement,
 *       p.secondChoiceDivision, p.secondChoiceStatement,
 *       p.skills, p.experience, p.portfolioLink, p.motivation, p.availability
 *     ]);
 *     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 */

export const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim() || "";

export async function forwardToGoogleSheet(payload: Record<string, string>) {
  if (!GOOGLE_SHEET_WEBHOOK_URL) {
    return { forwarded: false, reason: "not_configured" as const };
  }
  try {
    // Send as application/x-www-form-urlencoded — Google Apps Script edge
    // reliably delivers this to doPost(e.parameter). Raw JSON bodies are
    // blocked at the edge (HTTP 405).
    const body = new URLSearchParams(payload).toString();
    const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
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
