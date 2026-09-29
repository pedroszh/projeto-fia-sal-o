"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./ui";

/** Para trocar/adicionar serviços, edite esta lista (fotos em public/images) */
const services = [
  { name: "Mechas", img: "/images/mechas.webp" },
  { name: "Coloração", img: "/images/coloracao.webp" },
  { name: "Luzes", img: "/images/luzes.webp" },
  { name: "Hidratação", img: "/images/hidratacao.webp" },
  { name: "Maquiagem", img: "/images/maquiagem.webp" },
  { name: "Corte Masculino", img: "/images/corte-masculino.webp" },
];

type Dims = { w: number; h: number; r: number; step: number; originX: number };

function measure(): Dims {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const mobile = vw < 768;
  const w = mobile ? Math.min(vw * 0.72, vh * 0.56 * 0.8) : Math.min(vh * 0.5, 460) * 0.8;
  const h = w / 0.8;
  const r = h * 2.3;
  const step = ((h * 1.08) / r) * (180 / Math.PI); // graus entre cards
  const centerX = mobile ? vw * 0.5 : vw * 0.64;
  return { w, h, r, step, originX: centerX - r };
}

const fallback: Dims = { w: 360, h: 450, r: 1035, step: 26.9, originX: 950 - 1035 };

function Card({
  index,
  dims,
  rotation,
}: {
  index: number;
  dims: Dims;
  rotation: MotionValue<number>;
}) {
  const s = services[index];
  const angle = index * dims.step;
  // Destaque do card que está no centro do arco
  const focus = useTransform(rotation, (r) => 1 - Math.min(Math.abs(angle + r) / (dims.step * 2), 1));
  const opacity = useTransform(focus, (f) => 0.35 + f * 0.65);
  const scale = useTransform(focus, (f) => 0.9 + f * 0.1);

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        width: dims.w,
        height: dims.h,
        transformOrigin: "0 0",
        transform: `rotate(${angle}deg) translateX(${dims.r}px) translate(-50%, -50%)`,
      }}
    >
      <motion.article
        style={{ opacity, scale }}
        className="group relative h-full w-full overflow-hidden rounded-[14px] bg-ink-soft ring-1 ring-cream/10"
      >
        <Image
          src={s.img}
          alt={s.name}
          fill
          sizes="(min-width: 768px) 30vw, 72vw"
          className="object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30" />
        <span className="eyebrow absolute left-5 top-5 text-cream/80">{String(index + 1).padStart(2, "0")}</span>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <h3 className="font-display text-[clamp(1.9rem,3vw,2.8rem)] font-light leading-none text-cream">{s.name}</h3>
          <span className="mb-1 h-px w-10 shrink-0 origin-right bg-rose transition-transform duration-700 ease-silk group-hover:scale-x-150" />
        </div>
      </motion.article>
    </div>
  );
}

/** Serviços em uma "roda" de cards que gira conforme o scroll */
export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [dims, setDims] = useState<Dims>(fallback);
  const dimsRef = useRef(dims);
  const [active, setActive] = useState(0);
  const n = services.length;

  useEffect(() => {
    const update = () => {
      const d = measure();
      dimsRef.current = d;
      setDims(d);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotation = useTransform(scrollYProgress, (p) => {
    const t = Math.min(Math.max((p - 0.04) / 0.9, 0), 1);
    return -t * (n - 1) * dimsRef.current.step;
  });

  useMotionValueEvent(rotation, "change", (r) => {
    const i = Math.min(Math.max(Math.round(-r / dimsRef.current.step), 0), n - 1);
    if (i !== active) setActive(i);
  });

  return (
    <section
      ref={ref}
      id="servicos"
      aria-label="Serviços"
      className="relative bg-ink"
      style={{ height: `${100 + (n - 1) * 42}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_55%_at_66%_50%,rgb(227_173_158/0.10),transparent_70%)] max-md:bg-[radial-gradient(ellipse_70%_45%_at_50%_58%,rgb(227_173_158/0.10),transparent_70%)]"
        />

        {/* Roda */}
        <motion.div
          className="absolute top-1/2 h-0 w-0 max-md:top-[58%]"
          style={{ left: dims.originX, rotate: rotation }}
        >
          {services.map((s, i) => (
            <Card key={s.name} index={i} dims={dims} rotation={rotation} />
          ))}
        </motion.div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[42svh] bg-gradient-to-b from-ink from-45% via-ink/90 to-transparent md:hidden" />

        {/* Texto */}
        <div className="pointer-events-none absolute inset-x-6 top-24 md:inset-x-auto md:left-[6vw] md:top-1/2 md:w-[28vw] md:-translate-y-1/2">
          <Eyebrow>Serviços</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.8rem)] font-light leading-[0.98] md:mt-8">
            Cuidado em <em className="text-rosegold pr-[0.05em]">cada detalhe.</em>
          </h2>
          <p className="eyebrow mt-8 hidden text-mist md:block">
            <span className="text-cream">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
