"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, User2, Headset } from "lucide-react";
import { FTRN_INFO } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { NatureDecor } from "./nature-decor";

export function Contact() {
  const waLink = `https://wa.me/${FTRN_INFO.contact.phoneLink}?text=${encodeURIComponent(
    `Halo ${FTRN_INFO.contact.name}, saya ingin bertanya tentang Open Recruitment Panitia FTRN #5.`
  )}`;

  return (
    <section id="kontak" className="relative overflow-hidden py-20 sm:py-28">
      <NatureDecor variant="section" />
      <div className="relative mx-auto max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary to-accent p-7 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-10"
        >
          {/* decorative */}
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/10" />

          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            {/* avatar */}
            <div className="relative shrink-0">
              <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15 text-primary-foreground backdrop-blur-sm sm:h-24 sm:w-24">
                <User2 className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <span className="absolute -bottom-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-md">
                <Headset className="h-4 w-4" />
              </span>
            </div>

            <div className="flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
                Hubungi Kami
              </span>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                Ada pertanyaan?
              </h2>
              <p className="mt-1.5 text-sm font-light text-primary-foreground/85 sm:text-base">
                Langsung hubungi Ketua Pelaksana FTRN #5 — siap bantu jawab semua
                hal seputar open recruitment.
              </p>

              <div className="mt-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/70">
                  Ketua Pelaksana
                </div>
                <div className="mt-0.5 text-lg font-bold">
                  {FTRN_INFO.contact.name}
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4" />
                  {FTRN_INFO.contact.phone}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-full bg-white px-6 text-sm font-bold text-primary shadow-md hover:bg-white/90"
                >
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1.5 h-4 w-4" />
                    Chat via WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full border-white/40 bg-transparent px-6 text-sm font-semibold text-primary-foreground hover:bg-white/10"
                >
                  <a href={`tel:${FTRN_INFO.contact.phoneLink}`}>
                    <Phone className="mr-1.5 h-4 w-4" />
                    Telepon
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
