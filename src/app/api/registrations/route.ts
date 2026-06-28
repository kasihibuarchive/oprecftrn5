import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrationSchema } from "@/lib/schema";
import {
  forwardToGoogleSheet,
  GOOGLE_SHEET_WEBHOOK_URL,
} from "@/lib/google-sheet";
import { DIVISIONS, facultyName } from "@/lib/data";

export const dynamic = "force-dynamic";

function divisionName(id: string): string {
  return DIVISIONS.find((d) => d.id === id)?.name ?? id;
}

/* POST /api/registrations — submit a new registration
 *
 * Architecture:
 *   1. Validate input (zod)
 *   2. Forward to Google Sheet (PRIMARY, awaited) — this is the real data store
 *   3. Save to local DB (BEST-EFFORT, try/catch) — backup only
 *   4. Return 201 if Google Sheet succeeded
 *
 * On Vercel/serverless, DB (SQLite) may be read-only or unavailable.
 * That's fine — Google Sheet is the source of truth.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Body request tidak valid" },
        { status: 400 }
      );
    }

    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Data tidak valid",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const phoneNormalized = `+62${data.phone.trim()}`;

    const sheetPayload = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName.trim(),
      nim: data.nim.trim(),
      faculty: facultyName(data.faculty),
      prodi: data.prodi,
      angkatan: data.angkatan,
      phone: phoneNormalized,
      instagram: data.instagram.trim().replace(/^@/, ""),
      bio: data.bio.trim(),
      firstChoiceDivision: divisionName(data.firstChoiceDivision),
      firstChoiceStatement: data.firstChoiceStatement.trim(),
      secondChoiceDivision: divisionName(data.secondChoiceDivision),
      secondChoiceStatement: data.secondChoiceStatement.trim(),
      skills: data.skills?.trim() ?? "",
      experience: data.experience?.trim() ?? "",
      portfolioLink: data.portfolioLink?.trim() ?? "",
      motivation: data.motivation?.trim() ?? "",
    };

    // 1) PRIMARY: forward to Google Sheet (await)
    const sheetResult =
      GOOGLE_SHEET_WEBHOOK_URL !== ""
        ? await forwardToGoogleSheet(sheetPayload)
        : { forwarded: false, reason: "not_configured" as const };

    // 2) BEST-EFFORT: save to local DB (backup, ignore errors)
    //    On Vercel serverless, this may fail (read-only fs) — that's OK.
    let dbSaved = false;
    if (db) {
      try {
        await db.registration.create({
          data: {
            fullName: data.fullName.trim(),
            nim: data.nim.trim(),
            faculty: data.faculty,
            prodi: data.prodi,
            angkatan: data.angkatan,
            phone: phoneNormalized,
            instagram: data.instagram.trim().replace(/^@/, ""),
            bio: data.bio.trim(),
            firstChoiceDivision: data.firstChoiceDivision,
            firstChoiceStatement: data.firstChoiceStatement.trim(),
            secondChoiceDivision: data.secondChoiceDivision,
            secondChoiceStatement: data.secondChoiceStatement.trim(),
            skills: data.skills?.trim() || null,
            experience: data.experience?.trim() || null,
            portfolioLink: data.portfolioLink?.trim() || null,
            motivation: data.motivation?.trim() || null,
            agree: true,
          },
        });
        dbSaved = true;
      } catch (dbErr) {
        // DB unavailable (read-only fs, connection error, etc.) — not fatal
        console.warn("[POST /api/registrations] DB save skipped:", dbErr);
      }
    }

    // Success if Google Sheet forwarded OR DB saved (at least one worked)
    if (sheetResult.forwarded || dbSaved) {
      return NextResponse.json(
        {
          success: true,
          message: "Pendaftaran berhasil terkirim",
          googleSheet: sheetResult,
          dbSaved,
        },
        { status: 201 }
      );
    }

    // Both failed
    return NextResponse.json(
      {
        error: "Gagal menyimpan pendaftaran. Coba lagi sebentar.",
        googleSheet: sheetResult,
      },
      { status: 502 }
    );
  } catch (e) {
    console.error("[POST /api/registrations] error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

/* GET /api/registrations — list all registrations from DB (if available) */
export async function GET() {
  if (!db) {
    return NextResponse.json(
      { success: false, error: "Database tidak tersedia di environment ini" },
      { status: 503 }
    );
  }
  try {
    const rows = await db.registration.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return NextResponse.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (e) {
    console.error("[GET /api/registrations] error:", e);
    return NextResponse.json(
      { success: false, error: "Database tidak tersedia" },
      { status: 503 }
    );
  }
}
