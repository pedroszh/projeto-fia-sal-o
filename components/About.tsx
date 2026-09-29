"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Typewriter from "./Typewriter";
import { Reveal, SplitHeading, silk } from "./ui";

/** Palavras que se alternam em "Um espaço pensado para ___" */
const words = ["você.", "cuidar.", "relaxar.", "brilhar.", "encantar."];

export default function About() {
  const reduced = useReducedMotion();
  return (
    <section id="sobre" className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 md:grid-cols-12 md:gap-10">
        <motion.div
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(12% 0% 12% 0% round 14px)", opacity: 0 }}
          whileInView={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 14px)", opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.4, ease: silk }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[14px] md:col-span-5"
        >
          <Image
            src="/images/dona.webp"
            alt="Proprietária do Fia Salão de Beleza"
            fill
            sizes="(min-width: 768px) 420px, 90vw"
            className="object-cover"
          />
        </motion.div>

        <div className="text-center md:col-span-6 md:col-start-7 md:text-left">
          <SplitHeading
            className="font-display text-[clamp(2.8rem,5.4vw,5.6rem)] font-light leading-[0.98] tracking-[-0.015em]"
            lines={[
              "Um espaço pensado",
              <span key="v">
                para{" "}
                {/* Mobile: palavra centralizada na própria linha. Desktop: largura fixa para a frase branca não se mexer */}
                <em className="block text-center md:inline-block md:min-w-[4.3em] md:text-left">
                  <Typewriter words={words} className="text-rosegold pr-[0.05em]" />
                </em>
              </span>,
            ]}
          />
          <Reveal delay={0.2} className="mx-auto mt-8 max-w-md text-[1rem] leading-relaxed text-cream/65 md:mx-0">
            Atendimento acolhedor, sem pressa e feito sob medida — para você sair ainda mais confiante.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
