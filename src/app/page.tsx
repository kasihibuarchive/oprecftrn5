import { Leaf } from "@/components/ftrn/nature-decor";
import { BenefitsButton } from "@/components/ftrn/benefits-dialog";
import { DocsButton } from "@/components/ftrn/docs-dialog";
import { SimpleForm } from "@/components/ftrn/simple-form";
import { FTRN_INFO } from "@/lib/data";
import {
  ExternalLink,
  Instagram,
  CalendarDays,
  Phone,
  Images,
} from "lucide-react";

export default function Home() {
  return (
    <div
      id="top"
      className="flex min-h-screen flex-col bg-gradient-to-b from-primary/5 via-background to-secondary/20"
    >
      {/* ===== Minimal top bar ===== */}
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Leaf className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-extrabold tracking-tight text-foreground">
              FTRN <span className="text-primary">#5</span>
            </span>
          </div>
          <a
            href={FTRN_INFO.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Website ↗
          </a>
        </div>
      </header>

      {/* ===== Form card ===== */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="overflow-hidden rounded-3xl border border-primary/12 bg-card shadow-xl shadow-primary/5">
          {/* Header banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary to-accent px-6 py-8 text-primary-foreground sm:px-10 sm:py-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute right-6 bottom-4 opacity-20">
              <Leaf className="h-20 w-20" />
            </div>
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                Open Recruitment Panitia
              </span>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                FTRN #5
              </h1>
              <p className="mt-1 text-sm font-medium text-primary-foreground/90 sm:text-base">
                {FTRN_INFO.name}
              </p>

              {/* meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-primary-foreground/90">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {FTRN_INFO.date}
                </span>
                <a
                  href={FTRN_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  {FTRN_INFO.instagram}
                </a>
                <a
                  href={FTRN_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Website FTRN
                </a>
              </div>
            </div>
          </div>

          {/* Quick links: benefit & docs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-primary/10 bg-secondary/30 px-6 py-3 sm:px-10">
            <span className="mr-1 text-xs font-medium text-muted-foreground">
              Lihat:
            </span>
            <BenefitsButton variant="outline" className="h-8 rounded-full px-3.5 text-xs">
              Benefit
            </BenefitsButton>
            <DocsButton variant="outline" className="h-8 rounded-full px-3.5 text-xs">
              <Images className="mr-1 h-3.5 w-3.5" />
              Dokumentasi FTRN #4
            </DocsButton>
          </div>

          {/* Form body */}
          <div className="px-6 py-7 sm:px-10 sm:py-9">
            <SimpleForm />
          </div>
        </div>

        {/* Contact line */}
        <p className="mt-6 text-center text-xs font-light text-muted-foreground">
          Ada pertanyaan? Hubungi{" "}
          <a
            href={`https://wa.me/${FTRN_INFO.contact.phoneLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline"
          >
            <Phone className="h-3 w-3" />
            {FTRN_INFO.contact.name}
          </a>{" "}
          · {FTRN_INFO.contact.role}
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 bg-secondary/20 py-5">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-light text-muted-foreground">
            © {new Date().getFullYear()} {FTRN_INFO.name} ·{" "}
            {FTRN_INFO.organizer}
          </p>
        </div>
      </footer>
    </div>
  );
}
