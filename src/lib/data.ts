import {
  HandCoins,
  Camera,
  PenTool,
  Droplets,
  BedDouble,
  Users,
  Lightbulb,
  Volume2,
  MapPin,
  ShieldCheck,
  Music4,
  PersonStanding,
  type LucideIcon,
} from "lucide-react";

export type Division = {
  id: string;
  name: string;
  short: string;
  icon: LucideIcon;
  desc: string;
  tasks: string[];
  accent: string; // tailwind color hint
};

export const DIVISIONS: Division[] = [
  {
    id: "dana-usaha-stand",
    name: "Dana Usaha & Stand",
    short: "Dana Usaha",
    icon: HandCoins,
    desc: "Mengurus perizinan dan penataan stand tenant, mengelola pendanaan dari sponsor & merchandise.",
    tasks: [
      "Mengurus perizinan stand tenant",
      "Mengelola sponsorship & merchandise",
      "Koordinasi dengan vendor eksternal",
    ],
    accent: "emerald",
  },
  {
    id: "dokumentasi",
    name: "Dokumentasi",
    short: "Dokumentasi",
    icon: Camera,
    desc: "Mengabadikan setiap momen FTRN #5 dalam bentuk foto & video, serta mengarsipkan dokumentasi acara.",
    tasks: [
      "Foto & video selama rangkaian acara",
      "Editing dokumentasi pasca-acara",
      "Arsip digital FTRN #5",
    ],
    accent: "teal",
  },
  {
    id: "konten-kreator",
    name: "Konten Kreator",
    short: "Konten",
    icon: PenTool,
    desc: "Menciptakan konten kreatif untuk media sosial FTRN — reels, poster, copywriting, dan strategi konten.",
    tasks: [
      "Konten Instagram & TikTok FTRN",
      "Copywriting caption & naskah",
      "Desain grafis feed & story",
    ],
    accent: "lime",
  },
  {
    id: "k3",
    name: "K3 (Kebersihan, Konsumsi, Kesehatan)",
    short: "K3",
    icon: Droplets,
    desc: "Memastikan kebersihan venue, konsumsi panitia & peserta, serta penanganan kesehatan dasar.",
    tasks: [
      "Kebersihan area acara",
      "Distribusi konsumsi",
      "Pertolongan pertama ringan",
    ],
    accent: "green",
  },
  {
    id: "akomodasi",
    name: "Akomodasi",
    short: "Akomodasi",
    icon: BedDouble,
    desc: "Mengurus penginapan, transportasi, dan kenyamanan peserta serta undangan selama acara.",
    tasks: [
      "Penginapan peserta & undangan",
      "Transportasi pick-up",
      "Logistik tempat tinggal",
    ],
    accent: "emerald",
  },
  {
    id: "lo-pengisi-acara",
    name: "LO Pengisi Acara",
    short: "LO Acara",
    icon: Users,
    desc: "Liaison officer untuk pengisi acara — mendampingi, mengkoordinir, dan memastikan kenyamanan mereka.",
    tasks: [
      "Mendampingi pengisi acara",
      "Koordinir jadwal pengisi",
      "Memastikan kebutuhan pengisi terpenuhi",
    ],
    accent: "teal",
  },
  {
    id: "tim-lighting",
    name: "Tim Lighting",
    short: "Lighting",
    icon: Lightbulb,
    desc: "Menangani seluruh pencahayaan panggung & ruang pertunjukan agar setiap aksi tampil maksimal.",
    tasks: [
      "Set & operasi lighting panggung",
      "Design cue pencahayaan per adegan",
      "Maintenance peralatan lighting",
    ],
    accent: "amber",
  },
  {
    id: "tim-sound",
    name: "Tim Sound",
    short: "Sound",
    icon: Volume2,
    desc: "Bertanggung jawab atas kualitas audio — mikrofon, musik, dan sistem tata suara pertunjukan.",
    tasks: [
      "Operasi sistem sound panggung",
      "Mixing audio pertunjukan",
      "Cek & maintenance perangkat audio",
    ],
    accent: "lime",
  },
  {
    id: "koordinator-lapangan",
    name: "Koordinator Lapangan",
    short: "Koor Lapangan",
    icon: MapPin,
    desc: "Memastikan jalannya acara di lapangan sesuai rundown, mengkoordinir antar divisi secara real-time.",
    tasks: [
      "Pengawasan jalannya acara",
      "Koordinasi antar divisi lapangan",
      "Penanganan situasi mendesak",
    ],
    accent: "green",
  },
  {
    id: "keamanan",
    name: "Keamanan",
    short: "Keamanan",
    icon: ShieldCheck,
    desc: "Menjaga ketertiban, keamanan, dan ketertiban pengunjung serta peserta selama acara berlangsung.",
    tasks: [
      "Pengendalian keramaian",
      "Penjagaan akses area",
      "Penanganan keadaan darurat",
    ],
    accent: "emerald",
  },
  {
    id: "komposer-jingle",
    name: "Komposer Jingle",
    short: "Komposer",
    icon: Music4,
    desc: "Menyusun & mengaransemen jingle FTRN #5 — identitas sonik festival yang ikonik.",
    tasks: [
      "Komposisi jingle FTRN #5",
      "Aransemen musik",
      "Kolaborasi dengan koreografer",
    ],
    accent: "teal",
  },
  {
    id: "koreografer-jingle",
    name: "Koreografer Jingle",
    short: "Koreografer",
    icon: PersonStanding,
    desc: "Merancang koreografi untuk penampilan jingle FTRN #5 — gerak yang memperkuat identitas festival.",
    tasks: [
      "Koreografi penampilan jingle",
      "Pelatihan gerak penampil",
      "Sinergi dengan komposer",
    ],
    accent: "lime",
  },
];

/* ===== Struktur Fakultas ISI Yogyakarta ===== */
export type Faculty = {
  id: string;
  name: string;
  short: string;
  prodi: string[];
};

export const FACULTIES: Faculty[] = [
  {
    id: "fsmr",
    name: "Fakultas Seni Media Rekam",
    short: "FSMR",
    prodi: [
      "Film & Televisi",
      "Fotografi",
      "Animasi",
      "Produksi Film & Televisi",
    ],
  },
  {
    id: "fsp",
    name: "Fakultas Seni Pertunjukan",
    short: "FSP",
    prodi: [
      "Teater",
      "Teater Musikal",
      "Etnomusikologi",
      "Tari",
      "Musik",
      "Penciptaan Musik",
      "Penyajian Musik",
      "Pendidikan Musik",
      "Pendidikan Seni Pertunjukan",
      "Pedalangan",
      "Karawitan",
    ],
  },
  {
    id: "fsrd",
    name: "Fakultas Seni Rupa dan Desain",
    short: "FSRD",
    prodi: [
      "Desain Komunikasi Visual",
      "Seni Murni",
      "Desain Interior",
      "Kriya",
      "Desain Produk",
      "Tata Kelola Seni",
      "Konservasi Seni",
      "Desain Mode Kriya Batik",
      "Desain Media",
    ],
  },
];

export const ANGKATAN: number[] = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

export function facultyName(id: string): string {
  return FACULTIES.find((f) => f.id === id)?.name ?? id;
}

export function getProdiList(facultyId: string): string[] {
  return FACULTIES.find((f) => f.id === facultyId)?.prodi ?? [];
}

export const BENEFITS = [
  "E-Certificate",
  "Networking dengan seniman & peserta dari seluruh Indonesia",
  "Pengalaman mengelola festival teater tingkat nasional",
  "Menambah portofolio & pengalaman organisasi",
  "Dokumentasi Behind the Scene Festival Teater",
] as const;

export const FTRN_INFO = {
  name: "Festival Teater Remaja Nusantara",
  shortName: "FTRN",
  edition: "#5",
  date: "3–8 Agustus 2026",
  dateShort: "3–8 AUG 2026",
  organizer: "HMJ Teater ISI Yogyakarta",
  scale: "Skala Nasional",
  website: "https://ftrnv.vercel.app",
  instagram: "@ftrn.isijogja",
  instagramUrl: "https://instagram.com/ftrn.isijogja",
  contact: {
    name: "Dinda Aprilia Hentari",
    role: "Ketua Pelaksana FTRN #5",
    phone: "+62 882 1244 7588",
    phoneLink: "6288212447588",
  },
};

// Dokumentasi FTRN #4 (placeholder — nanti diganti foto asli)
export const FTRN4_DOCS = [
  { id: 1, title: "Panggung Utama", category: "Pertunjukan" },
  { id: 2, title: "Workshop Teater", category: "Education" },
  { id: 3, title: "Parade Rakyat", category: "Carnival" },
  { id: 4, title: "Behind The Scene", category: "Candid" },
  { id: 5, title: "Penutupan", category: "Closing" },
  { id: 6, title: "Suasana Penonton", category: "Audience" },
];
