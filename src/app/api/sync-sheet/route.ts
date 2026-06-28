import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { forwardToGoogleSheet, GOOGLE_SHEET_WEBHOOK_URL } from "@/lib/google-sheet";
import { DIVISIONS, facultyName } from "@/lib/data";

export const dynamic = "force-dynamic";

function divisionName(id: string): string {
  return DIVISIONS.find((d) => d.id === id)?.name ?? id;
}

/* POST /api/sync-sheet — re-sync all local DB data to Google Sheet
   Use this if some registrations failed to forward to Google Sheet
   (e.g. due to server crash during fire-and-forget sync). */
export async function POST() {
  if (GOOGLE_SHEET_WEBHOOK_URL === "") {
    return NextResponse.json(
      { error: "GOOGLE_SHEET_WEBHOOK_URL belum dikonfigurasi" },
      { status: 400 }
    );
  }

  try {
    const rows = await db.registration.findMany({
      orderBy: { createdAt: "asc" },
    });

    let success = 0;
    let failed = 0;

    for (const r of rows) {
      const payload = {
        timestamp: r.createdAt.toISOString(),
        fullName: r.fullName,
        nim: r.nim,
        faculty: facultyName(r.faculty),
        prodi: r.prodi,
        angkatan: r.angkatan,
        phone: r.phone,
        instagram: r.instagram,
        bio: r.bio,
        firstChoiceDivision: divisionName(r.firstChoiceDivision),
        firstChoiceStatement: r.firstChoiceStatement,
        secondChoiceDivision: divisionName(r.secondChoiceDivision),
        secondChoiceStatement: r.secondChoiceStatement,
        skills: r.skills ?? "",
        experience: r.experience ?? "",
        portfolioLink: r.portfolioLink ?? "",
        motivation: r.motivation ?? "",
      };
      const result = await forwardToGoogleSheet(payload);
      if (result.forwarded) success++;
      else failed++;
    }

    return NextResponse.json({
      success: true,
      total: rows.length,
      synced: success,
      failed,
    });
  } catch (e) {
    console.error("[POST /api/sync-sheet] error:", e);
    return NextResponse.json(
      { error: "Gagal sync ke Google Sheet" },
      { status: 500 }
    );
  }
}
