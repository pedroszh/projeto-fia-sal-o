import { Fragment } from "react";

const defaultItems = ["Fia", "Beleza que valoriza você", "Fia", "Seu momento", "Seu cuidado", "Sua beleza", "Fia", "Salão de Beleza"];

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.45em] w-[0.45em] shrink-0" fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/**
 * Faixa inclinada com frases passando em loop (CSS puro, sem JS).
 * variant "rose": faixa rose gold com texto escuro · "blush": faixa clara com texto escuro.
 */
export default function Marquee({
  items = defaultItems,
  variant = "rose",
  reverse = false,
  tilt = -2,
}: {
  items?: string[];
  variant?: "rose" | "blush";
  reverse?: boolean;
  tilt?: number;
}) {
  const band =
    variant === "rose"
      ? "bg-[linear-gradient(100deg,#b97a6b,#e3ad9e_45%,#c98b7c)] text-ink"
      : "bg-blush text-ink";

  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {items.map((t, i) => (
        <Fragment key={i}>
          <span
            className={
              t === "Fia"
                ? "font-display text-[1.15em] italic leading-none"
                : "whitespace-nowrap font-display font-light leading-none"
            }
          >
            {t}
          </span>
          <Star />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div aria-hidden className="relative overflow-hidden py-8 md:py-12">
      <div
        className={`grain -mx-[5%] w-[110%] py-4 shadow-[0_20px_60px_rgb(0_0_0/0.45)] md:py-6 ${band}`}
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div
          className={`flex w-max text-[1.6rem] md:text-[2.6rem] motion-safe:animate-[marquee_45s_linear_infinite] ${
            reverse ? "[animation-direction:reverse]" : ""
          }`}
        >
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
