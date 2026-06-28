"use client";

import { motion } from "framer-motion";

/* ===== Leaf / organic SVG decorations ===== */

export function Leaf({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <path
        d="M12 2C7 2 3 6 3 13c0 5 4 9 9 9s9-4 9-9c0-7-4-11-9-11Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M12 3c-3.5 0-7 3.2-7 9 0 4.4 3.1 7.5 7 7.5s7-3.1 7-7.5c0-5.8-3.5-9-7-9Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M12 4.5C12 12 12 16 12 21M12 8c-2 0-3.5 1.5-4 3.5M12 8c2 0 3.5 1.5 4 3.5M12 13c-2.2 0-4 1.3-4.6 3.2M12 13c2.2 0 4 1.3 4.6 3.2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sprout({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <path
        d="M12 21V11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12 11C12 7 9 5 5 5c0 4 3 6 7 6Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 11C12 7 9 5 5 5M12 11c0-4 3-6 7-6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Fern({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 64 120"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <path
        d="M32 118V40"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {[...Array(7)].map((_, i) => {
        const y = 32 + i * 11;
        return (
          <g key={i}>
            <path
              d={`M32 ${y} C 18 ${y - 4}, 10 ${y + 2}, 4 ${y + 8}`}
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              opacity={0.8 - i * 0.06}
            />
            <path
              d={`M32 ${y} C 46 ${y - 4}, 54 ${y + 2}, 60 ${y + 8}`}
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              opacity={0.8 - i * 0.06}
            />
          </g>
        );
      })}
      <path
        d="M32 8C30 14 30 18 32 24C34 18 34 14 32 8Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export function Blob({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <path
        fill="currentColor"
        d="M44.7,-67.2C56.6,-58.9,63.9,-44.3,69.3,-29.1C74.7,-13.9,78.2,1.9,74.9,16.1C71.6,30.3,61.5,42.9,49.5,53.7C37.5,64.5,23.6,73.5,7.9,77.2C-7.8,80.9,-25.4,79.3,-39.8,71.7C-54.2,64.1,-65.4,50.5,-71.5,35.1C-77.6,19.7,-78.6,2.5,-74.4,-12.8C-70.2,-28.1,-60.8,-42,-48.3,-51.8C-35.8,-61.6,-20.2,-67.3,-3.4,-62.7C13.4,-58.1,32.8,-65.5,44.7,-67.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

/* ===== Animated decorative cluster (for hero / section backgrounds) ===== */
export function NatureDecor({
  variant = "hero",
}: {
  variant?: "hero" | "section";
}) {
  if (variant === "section") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-10 top-10 text-primary/15"
          animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Fern className="h-40 w-20" />
        </motion.div>
        <motion.div
          className="absolute right-4 bottom-8 text-accent/20"
          animate={{ y: [0, -10, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Fern className="h-32 w-16" />
        </motion.div>
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Big blob */}
      <motion.div
        className="absolute -left-32 -top-24 text-primary/8"
        animate={{ rotate: [0, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <Blob className="h-[34rem] w-[34rem]" />
      </motion.div>
      <motion.div
        className="absolute -right-40 top-1/3 text-accent/8"
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      >
        <Blob className="h-[40rem] w-[40rem]" />
      </motion.div>

      {/* Floating leaves */}
      <motion.div
        className="absolute left-[8%] top-[28%] text-primary/25"
        animate={{ y: [0, -22, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Leaf className="h-12 w-12" />
      </motion.div>
      <motion.div
        className="absolute right-[12%] top-[18%] text-accent/30"
        animate={{ y: [0, -16, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Leaf className="h-9 w-9" />
      </motion.div>
      <motion.div
        className="absolute right-[24%] bottom-[20%] text-primary/20"
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Sprout className="h-14 w-14" />
      </motion.div>
      <motion.div
        className="absolute left-[18%] bottom-[24%] text-accent/25"
        animate={{ y: [0, -14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Leaf className="h-10 w-10" />
      </motion.div>

      {/* Ferns at bottom */}
      <div className="absolute -bottom-2 left-0 text-primary/15">
        <Fern className="h-48 w-24 animate-sway" />
      </div>
      <div className="absolute -bottom-2 right-8 text-accent/20 scale-x-[-1]">
        <Fern
          className="h-56 w-28 animate-sway"
          // @ts-expect-error css var for delay
          style={{ animationDelay: "1.5s" }}
        />
      </div>
    </div>
  );
}
