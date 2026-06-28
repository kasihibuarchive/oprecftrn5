"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
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
            "h-11 rounded-full px-6 text-sm font-semibold " + (className ?? "")
          }
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl border-primary/15 bg-card p-0 sm:max-w-lg">
        {/* Header */}
        <div className="border-b border-primary/10 px-6 py-5 sm:px-7">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Benefit Panitia FTRN #5
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Apa yang kamu dapet kalau gabung jadi panitia.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* List */}
        <div className="p-6 sm:p-7">
          <ul className="space-y-3.5">
            {BENEFITS.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium leading-relaxed text-foreground">
                  {b}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
