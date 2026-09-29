"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/site";

export const silk = [0.22, 1, 0.36, 1] as const;

/** Fade + translate ao entrar na viewport */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "span" | "li" | "h2" | "h3";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: silk, delay }}
    >
      {children}
    </Tag>
  );
}

const lineParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const lineChild: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.2, ease: silk } },
};

/** Título que sobe linha a linha, com máscara (efeito editorial) */
export function SplitHeading({
  lines,
  className,
  as = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={lineParent}
      initial={reduced ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={lineChild}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-4 text-rose">
      {index && <span className="text-mist">{index}</span>}
      <span className="h-px w-8 bg-rose/60" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** CTA de agendamento — sempre aponta para o WhatsApp configurado em lib/site.ts */
export function BookingButton({
  variant = "ghost",
  size = "md",
  className = "",
  children = "Agendar horário",
}: {
  variant?: "ghost" | "solid" | "dark";
  size?: "md" | "lg";
  className?: string;
  children?: ReactNode;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full eyebrow transition-colors duration-500 ease-silk";
  const sizes = {
    md: "h-12 px-7",
    lg: "h-16 px-10 md:h-20 md:px-14 text-[0.75rem] md:text-[0.8125rem]",
  };
  const variants = {
    ghost: "border border-cream/35 text-cream backdrop-blur-sm hover:border-rose hover:text-ink",
    solid: "bg-rose text-ink hover:text-cream",
    dark: "bg-ink text-cream hover:text-ink",
  };
  const fill = {
    ghost: "bg-rose",
    solid: "bg-ink",
    dark: "bg-cream",
  };
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-700 ease-silk group-hover:scale-y-100 ${fill[variant]}`}
      />
      <span className="relative">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="relative h-3.5 w-3.5 transition-transform duration-500 ease-silk group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
