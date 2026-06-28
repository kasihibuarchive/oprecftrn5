"use client";

import { motion } from "framer-motion";
import {
  Scroll,
  Users,
  Sparkle,
  BookOpen,
  Gift as GiftIcon,
  Heart,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BENEFITS } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  scroll: Scroll,
  users: Users,
  sparkles: Sparkle,
  "book-open": BookOpen,
  gift: GiftIcon,
  heart: Heart,
};

export function BenefitsButton({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className={
            "h-11 rounded-full px-6 text-sm font-semibold shadow-md shadow-accent/20 " +
            (className ?? "")
          }
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-hidden rounded-3xl border-primary/15 bg-card p-0 sm:max-w-3xl">
        {/* Header banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-accent px-6 py-7 text-primary-foreground sm:px-8">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/10" />
          <DialogHeader className="relative">
            <DialogTitle className="flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              <GiftIcon className="h-6 w-6" />
              Benefit Panitia FTRN #5
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/85">
              Lebih dari sekadar panitia — kamu dapat pengalaman, relasi, dan
              keluarga baru.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Benefit grid */}
        <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-7">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {BENEFITS.map((b, i) => {
              const Icon = ICONS[b.icon] ?? Sparkle;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group rounded-2xl border border-primary/10 bg-secondary/40 p-4 transition-all hover:border-primary/25 hover:bg-primary/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {b.title}
                      </h4>
                      <p className="mt-1 text-xs font-light leading-relaxed text-muted-foreground">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-5 rounded-2xl bg-primary/5 px-4 py-3 text-center text-xs font-light text-muted-foreground">
            <Sparkle className="mr-1 inline h-3.5 w-3.5 text-accent" />
            Catatan: daftar benefit bisa berkembang — nanti diperbarui seiring
            kebutuhan panitia.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
