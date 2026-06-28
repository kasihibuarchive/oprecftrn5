import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DIVISIONS } from "@/lib/data";

export const dynamic = "force-dynamic";

function escapeCsv(value: unknown): string {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function divisionName(id: string): string {
  return DIVISIONS.find((d) => d.id === id)?.name ?? id;
}

/* GET /api/registrations/export — download CSV (Google Sheets ready) */
export async function GET() {
  try {
    const rows = await db.registration.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Timestamp",
      "Nama Lengkap",
      "Fakultas/Jurusan",
      "No. WhatsApp",
      "Instagram",
      "Biodata",
      "1st Choice Divisi",
      "Statement 1st Choice",
      "2nd Choice Divisi",
      "Statement 2nd Choice",
      "Keahlian",
      "Pengalaman",
      "Portfolio Link",
      "Motivasi",
      "Ketersediaan Waktu",
    ];

    const lines = [headers.join(",")];

    for (const r of rows) {
      lines.push(
        [
          r.createdAt.toISOString(),
          r.fullName,
          r.faculty,
          r.phone,
          r.instagram,
          r.bio,
          divisionName(r.firstChoiceDivision),
          r.firstChoiceStatement,
          divisionName(r.secondChoiceDivision),
          r.secondChoiceStatement,
          r.skills ?? "",
          r.experience ?? "",
          r.portfolioLink ?? "",
          r.motivation ?? "",
          r.availability ?? "",
        ]
          .map(escapeCsv)
          .join(",")
      );
    }

    const csv = "\uFEFF" + lines.join("\r\n"); // BOM for Excel/Sheets UTF-8

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="pendaftaran-ftrn5-${new Date()
          .toISOString()
          .slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[GET /api/registrations/export] error:", e);
    return NextResponse.json(
      { error: "Gagal mengekspor data" },
      { status: 500 }
    );
  }
}
