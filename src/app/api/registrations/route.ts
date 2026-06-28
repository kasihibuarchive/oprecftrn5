import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrationSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

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
    const reg = await db.registration.create({
      data: {
        fullName: data.fullName.trim(),
        faculty: data.faculty.trim(),
        phone: data.phone.trim(),
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
        availability: data.availability?.trim() || null,
        agree: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: reg.id,
        message: "Pendaftaran berhasil terkirim",
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
