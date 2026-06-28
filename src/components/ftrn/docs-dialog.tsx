"use client";

import { motion } from "framer-motion";
import { Images, Camera, Play, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FTRN4_DOCS } from "@/lib/data";

export function DocsButton({
  children,
  variant = "outline",
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
            "h-11 rounded-full px-6 text-sm font-semibold " + (className ?? "")
          }
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl overflow-hidden rounded-3xl border-primary/15 bg-card p-0 sm:max-w-4xl">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-accent to-primary px-6 py-6 text-primary-foreground sm:px-8">
          <div className="absolute right-4 top-4 opacity-30">
            <Camera className="h-16 w-16" />
          </div>
          <DialogHeader className="relative">
            <DialogTitle className="flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              <Images className="h-6 w-6" />
              Dokumentasi FTRN #4
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/85">
              Sekilas potret festival tahun lalu — biar makin kebayang suasana
              panggungnya.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Gallery grid (placeholder visuals — replace with real photos later) */}
        <div className="max-h-[65vh] overflow-y-auto p-5 sm:p-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {FTRN4_DOCS.map((doc, i) => (
              <motion.figure
                key={doc.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/10"
              >
                {/* Placeholder gradient backdrop */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, hsl(${
                      130 + i * 12
                    } 35% ${28 + (i % 3) * 8}%) 0%, hsl(${100 + i * 10} 30% ${
                      40 + (i % 3) * 6
                    }%) 100%)`,
                  }}
                />
                {/* texture */}
                <div className="absolute inset-0 bg-grain opacity-40" />
                {/* play indicator */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                </div>
                {/* caption */}
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                  <Badge
                    variant="secondary"
                    className="mb-1.5 h-5 rounded-full bg-white/20 px-2 text-[10px] font-semibold text-white backdrop-blur-sm"
                  >
                    {doc.category}
                  </Badge>
                  <p className="text-sm font-bold leading-tight">{doc.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] font-light text-white/80">
                    FTRN #4
                    <ChevronRight className="h-3 w-3" />
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <p className="mt-5 rounded-2xl bg-primary/5 px-4 py-3 text-center text-xs font-light text-muted-foreground">
            <Camera className="mr-1 inline h-3.5 w-3.5 text-primary" />
            Foto dokumentasi akan diperbarui dengan dokumentasi asli FTRN #4.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
