"use client";

import { Heart, Leaf, ArrowUp } from "lucide-react";
import { FTRN_INFO } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-primary/12 bg-secondary/30">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-foreground">
                FTRN #5 — Open Recruitment
              </div>
              <div className="text-xs font-light text-muted-foreground">
                {FTRN_INFO.organizer} · {FTRN_INFO.date}
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
            <a href="#tentang" className="transition-colors hover:text-primary">
              Tentang
            </a>
            <a href="#divisi" className="transition-colors hover:text-primary">
              Divisi
            </a>
            <a href="#daftar" className="transition-colors hover:text-primary">
              Daftar
            </a>
            <a href="#kontak" className="transition-colors hover:text-primary">
              Kontak
            </a>
            <a
              href={FTRN_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              Website
            </a>
          </nav>

          {/* Back to top */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-9 rounded-full border-primary/20"
          >
            <a href="#hero">
              <ArrowUp className="mr-1.5 h-3.5 w-3.5" />
              Ke Atas
            </a>
          </Button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-primary/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-light text-muted-foreground">
            © {new Date().getFullYear()} Festival Teater Rakyat Nasional #5.
            Hak cipta dilindungi.
          </p>
          <div className="flex flex-col items-center gap-1.5 sm:items-end">
            <p className="flex items-center gap-1.5 text-xs font-light text-muted-foreground">
              Dibuat dengan
              <Heart className="h-3.5 w-3.5 fill-destructive/80 text-destructive/80" />
              untuk panggung teater rakyat nusantara
            </p>
            <a
              href="/api/registrations/export"
              className="text-[11px] font-medium text-primary/70 underline-offset-2 transition-colors hover:text-primary hover:underline"
            >
              Panitia — Export Data (CSV → Google Sheets)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
