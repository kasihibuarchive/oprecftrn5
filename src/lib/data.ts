import {
  HandCoins,
  Camera,
  PenTool,
  Sparkles,
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
    icon: Sparkles,
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

export const BENEFITS = [
  {
    title: "Sertifikat Resmi",
    desc: "Pengakuan sebagai panitia Festival Teater Rakyat Nasional #5 oleh HMJ Teater ISI Yogyakarta.",
    icon: "scroll",
  },
  {
    title: "Relasi Nasional",
    desc: "Berjejalan dengan seniman, teaternese, dan komunitas teater dari berbagai daerah se-Indonesia.",
    icon: "users",
  },
  {
    title: "Pengalaman Panggung Besar",
    desc: "Belajar langsung menggelola event teater skala nasional selama 3–8 Agustus 2026.",
    icon: "sparkles",
  },
  {
    title: "Knowledge & Skill Transfer",
    desc: "Workshop internal, briefing teknis, dan mentoring dari divisi profesional.",
    icon: "book-open",
  },
  {
    title: "Merchandise Eksklusif",
    desc: "Merch FTRN #5 khusus panitia — desain limited yang nggak dijual bebas.",
    icon: "gift",
  },
  {
    title: "Kenangan & Keluarga Baru",
    desc: "Menjadi bagian dari keluarga besar FTRN — ikatan yang terus hidup setelah panggung usai.",
    icon: "heart",
  },
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
