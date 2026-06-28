"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Users, CalendarRange, Award } from "lucide-react";
import { FTRN_INFO } from "@/lib/data";
import { Button } from "@/components/ui/button";

const STATS = [
  {
    icon: CalendarRange,
    label: "Durasi Festival",
    value: "6 Hari",
    desc: "3–8 Agustus 2026",
  },
  {
    icon: Users,
    label: "Penyelenggara",
    value: "HMJ Teater",
    desc: "ISI Yogyakarta",
  },
  {
    icon: MapPin,
    label: "Skala Acara",
    value: "Nasional",
    desc: "Se-Indonesia",
  },
  {
    icon: Award,
    label: "Edisi",
    value: "Ke-5",
    desc: "Festival Teater Rakyat",
  },
];

export function About() {
  return (
    <section id="tentang" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Sekilas FTRN
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Festival teater rakyat{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-extrabold text-transparent">
                skala nasional
              </span>{" "}
              dari Yogyakarta.
            </h2>
            <p className="mt-5 text-pretty text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
              <strong className="font-semibold text-foreground">
                Festival Teater Rakyat Nasional (FTRN)
              </strong>{" "}
              adalah panggung besar yang dikelola langsung oleh Himpunan Mahasiswa
              Jurusan Teater ISI Yogyakarta. Menghadirkan kelompok teater rakyat
              dari berbagai daerah nusantara dalam satu festival selama enam hari
              penuh — pertunjukan, parade, workshop, hingga diskusi kebudayaan.
            </p>
            <p className="mt-4 text-pretty text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
              FTRN #5 hadir sebagai ruang bertemu seniman, mahasiswa, dan
              masyarakat luas. Dan kamu bisa jadi bagian dari tim yang menggerakkan
              semua ini.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="group h-11 rounded-full px-6 text-sm font-semibold shadow-md shadow-primary/20"
              >
                <a
                  href={FTRN_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kunjungi Website FTRN
                  <ExternalLink className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <span className="text-sm text-muted-foreground">
                {FTRN_INFO.website.replace(/^https?:\/\//, "")}
              </span>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-primary/12 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:p-6"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-foreground">
                    {s.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
