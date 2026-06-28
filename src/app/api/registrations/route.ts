import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrationSchema } from "@/lib/schema";
import { forwardToGoogleSheet, GOOGLE_SHEET_WEBHOOK_URL } from "@/lib/google-sheet";
import { DIVISIONS, facultyName } from "@/lib/data";

export const dynamic = "force-dynamic";

function divisionName(id: string): string {
  return DIVISIONS.find((d) => d.id === id)?.name ?? id;
}

/* POST /api/registrations — submit a new registration */
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

    // Normalize phone: store as +62XXXXXXXXXXX
    const phoneNormalized = `+62${data.phone.trim()}`;

    // 1) Save locally (fallback / backup)
    const reg = await db.registration.create({
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

    // 2) Forward to Google Spreadsheet (if configured)
    const sheetPayload = {
      timestamp: reg.createdAt.toISOString(),
      fullName: reg.fullName,
      nim: reg.nim,
      faculty: facultyName(reg.faculty),
      prodi: reg.prodi,
      angkatan: reg.angkatan,
      phone: reg.phone,
      instagram: reg.instagram,
      bio: reg.bio,
      firstChoiceDivision: divisionName(reg.firstChoiceDivision),
      firstChoiceStatement: reg.firstChoiceStatement,
      secondChoiceDivision: divisionName(reg.secondChoiceDivision),
      secondChoiceStatement: reg.secondChoiceStatement,
      skills: reg.skills ?? "",
      experience: reg.experience ?? "",
      portfolioLink: reg.portfolioLink ?? "",
      motivation: reg.motivation ?? "",
    };
    const sheetResult = await forwardToGoogleSheet(sheetPayload);

    return NextResponse.json(
      {
        success: true,
        id: reg.id,
        message: "Pendaftaran berhasil terkirim",
        googleSheet:
          GOOGLE_SHEET_WEBHOOK_URL !== ""
            ? sheetResult
            : { forwarded: false, reason: "not_configured" },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("[POST /api/registrations] error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

/* GET /api/registrations — list all registrations (spreadsheet-like) */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      Number(searchParams.get("limit") ?? "100"),
      500
    );

    const rows = await db.registration.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (e) {
    console.error("[GET /api/registrations] error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
