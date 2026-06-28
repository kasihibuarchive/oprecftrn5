"use client";

import { motion } from "framer-motion";
import { ArrowDown, CalendarDays, ExternalLink, Sparkles } from "lucide-react";
import { FTRN_INFO } from "@/lib/data";
import { NatureDecor, Leaf } from "./nature-decor";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-primary/8 via-background to-secondary/40"
    >
      <NatureDecor variant="hero" />

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-5 pt-24 pb-16 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Open Recruitment Panitia
        </motion.div>

        {/* Logo placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          className="mb-6 flex items-center justify-center"
        >
          <div className="relative grid h-20 w-20 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 sm:h-24 sm:w-24">
            <Leaf className="h-10 w-10 text-primary sm:h-12 sm:w-12" />
            <span className="absolute -bottom-2 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              Logo FTRN
            </span>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="text-balance text-5xl font-extrabold leading-[0.92] tracking-tight text-foreground sm:text-7xl md:text-8xl"
        >
          FTRN
          <span className="ml-2 bg-gradient-to-br from-primary to-accent bg-clip-text font-black text-transparent">
            #5
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-4 max-w-2xl text-pretty text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
        >
          Festival Teater Rakyat Nasional ke-5 — panggung terbesar teater rakyat
          oleh{" "}
          <span className="font-medium text-foreground">
            HMJ Teater ISI Yogyakarta
          </span>
          . Saatnya kamu jadi bagian dari sejarah.
        </motion.p>

        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.42 }}
          className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-card/80 px-5 py-2.5 shadow-sm backdrop-blur-sm"
        >
          <CalendarDays className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold tracking-wide text-foreground">
            {FTRN_INFO.date}
          </span>
          <span className="h-1 w-1 rounded-full bg-primary/40" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {FTRN_INFO.scale}
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-full px-7 text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <a href="#daftar">
              Daftar Jadi Panitia
              <ArrowDown className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-primary/30 bg-card/60 px-7 text-sm font-semibold backdrop-blur-sm hover:bg-primary/5"
          >
            <a href={FTRN_INFO.website} target="_blank" rel="noopener noreferrer">
              Website FTRN
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
          className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-4"
        >
          {[
            { n: "6", l: "Hari Festival" },
            { n: "12", l: "Pilihan Divisi" },
            { n: "Nasional", l: "Skala Acara" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-primary/12 bg-card/50 px-3 py-4 backdrop-blur-sm"
            >
              <div className="text-2xl font-extrabold text-primary sm:text-3xl">
                {s.n}
              </div>
              <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-y border-primary/12 bg-primary/5 py-2.5 backdrop-blur-sm">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap text-sm font-medium text-primary/80">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="uppercase tracking-[0.25em]">Open Recruitment</span>
              <Leaf className="h-4 w-4 text-accent" />
              <span className="uppercase tracking-[0.25em]">FTRN #5</span>
              <Leaf className="h-4 w-4 text-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
