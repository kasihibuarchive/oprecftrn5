"use client";

import { motion } from "framer-motion";
import { Layers, ArrowRight, Check } from "lucide-react";
import { DIVISIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Divisions() {
  return (
    <section id="divisi" className="relative py-20 sm:py-28">
      {/* Soft background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <Layers className="h-3.5 w-3.5" />
            Pilihan Divisi
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            12 divisi, satu{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-extrabold text-transparent">
              panggung raya
            </span>
          </h2>
          <p className="mt-4 text-pretty text-base font-light text-muted-foreground sm:text-lg">
            Pilih divisi yang paling sesuai dengan minat & kemampuanmu. Setiap
            divisi punya peran penting untuk membuat FTRN #5 berjalan mulus.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {DIVISIONS.map((d, i) => (
            <motion.article
              key={d.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-primary/12 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 sm:p-6"
            >
              {/* hover glow */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <d.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Divisi {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative mt-4 text-lg font-bold leading-tight text-foreground">
                {d.name}
              </h3>
              <p className="relative mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                {d.desc}
              </p>

              {/* tasks list */}
              <ul className="relative mt-4 space-y-1.5">
                {d.tasks.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 text-xs font-medium text-foreground/80"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>

              {/* CTA hint */}
              <a
                href="#daftar"
                className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                Pilih divisi ini
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/8 to-accent/8 p-7 text-center sm:flex-row sm:text-left"
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground sm:text-xl">
              Sudah nemu divisi favoritmu?
            </h3>
            <p className="mt-1 text-sm font-light text-muted-foreground">
              Gas daftar sekarang — siapkan juga pilihan divisi alternatif (2nd
              choice) ya.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-7 shadow-lg shadow-primary/20"
          >
            <a href="#daftar">
              Mulai Daftar
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
