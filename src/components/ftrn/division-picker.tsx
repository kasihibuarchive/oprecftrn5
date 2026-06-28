"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { DIVISIONS } from "@/lib/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function DivisionPicker({
  value,
  onChange,
  error,
  label,
  excludeId,
}: {
  value: string;
  onChange: (id: string) => void;
  error?: string;
  label: string;
  excludeId?: string;
}) {
  const selected = DIVISIONS.find((d) => d.id === value);
  const available = DIVISIONS.filter((d) => d.id !== excludeId);

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "h-auto w-full justify-start rounded-2xl border-2 px-4 py-3.5 text-left font-normal transition-colors",
              error
                ? "border-destructive/50"
                : value
                ? "border-primary/40 bg-primary/5"
                : "border-primary/15 hover:border-primary/30"
            )}
          >
            {selected ? (
              <span className="flex w-full items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <selected.icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-foreground">
                    {selected.name}
                  </span>
                  <span className="block text-xs font-light text-muted-foreground">
                    {selected.short}
                  </span>
                </span>
                <Check className="h-4 w-4 text-primary" />
              </span>
            ) : (
              <span className="text-sm font-light text-muted-foreground">
                {label}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] min-w-[300px] rounded-2xl border-primary/15 p-0"
          align="start"
        >
          <div className="border-b border-primary/10 px-3 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pilih {label}
            </p>
          </div>
          <ScrollArea className="h-[280px]">
            <div className="p-1.5">
              {available.map((d) => {
                const isSelected = d.id === value;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => onChange(d.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/5"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isSelected
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      <d.icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold leading-tight">
                        {d.name}
                      </span>
                      <span
                        className={cn(
                          "block text-[11px] font-light leading-tight",
                          isSelected
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        )}
                      >
                        {d.short}
                      </span>
                    </span>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          <Check className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
