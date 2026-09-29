"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { silk } from "./ui";

// Avaliações reais do Google enviadas pelo salão
const reviews = [
  { name: "Mariana Machado", text: "Excelentes profissionais, ambiente incrível e acolhedor. Aqui sou sempre bem tratada." },
  { name: "Ravena Monteiro", text: "Atendimento excelente! Faço as unhas com a Néia e sempre saio satisfeita." },
  { name: "Raquel Carvalho", text: "As meninas são super educadas e profissionais. Minha manicure é maravilhosa!" },
];

/** Uma avaliação por vez, trocando sozinha */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % reviews.length), 6000);
    return () => clearInterval(id);
  }, []);

  const r = reviews[i];

  return (
    <section aria-label="Avaliações de clientes" className="border-t border-line px-6 py-16 text-center md:px-10 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow text-rose">★★★★★ &nbsp;Avaliações no Google</p>
        <div className="relative mt-12 grid min-h-[12rem] place-items-center md:min-h-[14rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -16 }}
              transition={{ duration: 0.9, ease: silk }}
            >
              <blockquote className="font-display text-[clamp(1.8rem,3.6vw,3.2rem)] font-light italic leading-[1.2] text-cream/90">
                “{r.text}”
              </blockquote>
              <figcaption className="eyebrow mt-8 text-[0.625rem] text-mist">{r.name}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {reviews.map((rv, n) => (
            <button
              key={rv.name}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Ver avaliação de ${rv.name}`}
              className="group py-4"
            >
              <span
                className={`block h-px w-10 transition-colors duration-500 ${n === i ? "bg-rose" : "bg-cream/20 group-hover:bg-cream/50"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
