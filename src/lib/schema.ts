import { z } from "zod";
import { FACULTIES, ANGKATAN } from "@/lib/data";

const validFacultyIds = FACULTIES.map((f) => f.id);
const validAngkatan = ANGKATAN.map(String);

export const registrationSchema = z
  .object({
    // Data Diri
    fullName: z
      .string()
      .min(3, { message: "Nama lengkap minimal 3 karakter" })
      .max(80, { message: "Nama terlalu panjang" }),
    nim: z
      .string()
      .min(6, { message: "NIM minimal 6 digit" })
      .max(20, { message: "NIM terlalu panjang" })
      .regex(/^[0-9]+$/, { message: "NIM hanya boleh angka" }),
    faculty: z
      .string()
      .min(1, { message: "Pilih fakultas" })
      .refine((v) => validFacultyIds.includes(v), {
        message: "Fakultas tidak valid",
      }),
    prodi: z
      .string()
      .min(1, { message: "Pilih program studi" }),
    angkatan: z
      .string()
      .min(1, { message: "Pilih angkatan" })
      .refine((v) => validAngkatan.includes(v), {
        message: "Angkatan tidak valid",
      }),
    phone: z
      .string()
      .min(8, { message: "Nomor WhatsApp minimal 8 digit" })
      .max(20, { message: "Nomor terlalu panjang" })
      .regex(/^[0-9+\-\s]+$/, { message: "Hanya angka, +, -, dan spasi" }),
    instagram: z
      .string()
      .min(3, { message: "Username Instagram wajib diisi" })
      .max(40, { message: "Terlalu panjang" })
      .refine((v) => !v.includes(" "), {
        message: "Username IG tidak boleh ada spasi",
      }),
    bio: z
      .string()
      .min(50, { message: "Biodata minimal 50 karakter — ceritakan dirimu!" })
      .max(800, { message: "Biodata maksimal 800 karakter" }),

    // Pilihan Divisi
    firstChoiceDivision: z.string().min(1, { message: "Pilih divisi utama" }),
    firstChoiceStatement: z
      .string()
      .min(100, { message: "Statement minimal 100 karakter" })
      .max(1000, { message: "Statement maksimal 1000 karakter" }),
    secondChoiceDivision: z
      .string()
      .min(1, { message: "Pilih divisi alternatif" }),
    secondChoiceStatement: z
      .string()
      .min(80, { message: "Statement minimal 80 karakter" })
      .max(1000, { message: "Statement maksimal 1000 karakter" }),

    // Tambahan (opsional)
    skills: z
      .string()
      .max(500, { message: "Maksimal 500 karakter" })
      .optional()
      .or(z.literal("")),
    experience: z
      .string()
      .max(800, { message: "Maksimal 800 karakter" })
      .optional()
      .or(z.literal("")),
    portfolioLink: z
      .string()
      .max(200, { message: "URL terlalu panjang" })
      .optional()
      .or(z.literal("")),
    motivation: z
      .string()
      .max(800, { message: "Maksimal 800 karakter" })
      .optional()
      .or(z.literal("")),
    availability: z.string().optional().or(z.literal("")),

    // Agreement
    agree: z.literal(true, {
      errorMap: () => ({ message: "Kamu harus menyetujui pernyataan di atas" }),
    }),
  })
  .refine(
    (data) => {
      const f = FACULTIES.find((x) => x.id === data.faculty);
      return f ? f.prodi.includes(data.prodi) : false;
    },
    {
      message: "Program studi tidak sesuai dengan fakultas yang dipilih",
      path: ["prodi"],
    }
  )
  .refine((data) => data.firstChoiceDivision !== data.secondChoiceDivision, {
    message: "Divisi utama & alternatif tidak boleh sama",
    path: ["secondChoiceDivision"],
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;
