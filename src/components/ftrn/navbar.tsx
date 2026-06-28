"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FTRN_INFO } from "@/lib/data";

const NAV = [
  { label: "Tentang", href: "#tentang" },
  { label: "Divisi", href: "#divisi" },
  { label: "Daftar", href: "#daftar" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-primary/10 bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-extrabold tracking-tight text-foreground">
              FTRN <span className="text-primary">#5</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Open Recruitment
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="h-9 rounded-full px-5 text-sm font-semibold shadow-md shadow-primary/20"
          >
            <a href="#daftar">Daftar Sekarang</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-primary/15 bg-card/60 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-primary/10 bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-primary/5"
                >
                  {n.label}
                </a>
              ))}
              <Button
                asChild
                className="mt-2 h-11 rounded-full text-sm font-semibold"
              >
                <a href="#daftar" onClick={() => setOpen(false)}>
                  Daftar Sekarang
                </a>
              </Button>
              <a
                href={FTRN_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-center text-xs font-light text-muted-foreground"
              >
                {FTRN_INFO.website.replace(/^https?:\/\//, "")}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
