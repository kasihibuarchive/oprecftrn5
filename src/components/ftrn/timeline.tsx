"use client";

import { motion } from "framer-motion";
import { RECRUITMENT_TIMELINE } from "@/lib/data";

export function Timeline() {
  return (
    <div className="border-b border-primary/10 bg-secondary/20 px-6 py-4 sm:px-10">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Linimasa Recruitment
        </span>
      </div>

      <div className="relative">
        {/* Connector line */}
        <div className="absolute left-0 right-0 top-3 h-0.5 bg-primary/15" />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="absolute left-0 top-3 h-0.5 origin-left bg-gradient-to-r from-primary to-accent"
          style={{ width: "100%" }}
        />

        {/* Nodes */}
        <div className="relative grid grid-cols-3 gap-2">
          {RECRUITMENT_TIMELINE.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              {/* Node dot */}
              <div className="mb-2 grid h-6 w-6 place-items-center rounded-full border-2 border-primary bg-card shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>
              {/* Date */}
              <span className="text-xs font-bold text-foreground">
                {item.date}
              </span>
              {/* Label */}
              <span className="mt-0.5 text-[11px] font-medium leading-tight text-muted-foreground">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
