"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRange } from "@/lib/motion";
import ScrollVideo from "./ScrollVideo";
import { silk } from "./ui";

const phrases = ["Seu momento.", "Seu cuidado.", "Sua beleza."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // O vídeo chega a 100% um pouco antes do fim da seção → um respiro antes de liberar a página
  const videoProgress = useRange(scrollYProgress, [0, 0.92], [0, 1]);

  // Fase 1 — assinatura da marca
  const introOpacity = useRange(scrollYProgress, [0, 0.16], [1, 0]);
  const introY = useRange(scrollYProgress, [0, 0.16], [0, reduced ? 0 : -60]);
  const introPointer = useTransform(introOpacity, (v) => (v < 0.15 ? "none" : "auto"));
  const cueOpacity = useRange(scrollYProgress, [0, 0.05], [1, 0]);

  // Fase 2 — frases aparecem uma a uma
  const p0 = useRange(scrollYProgress, [0.26, 0.34, 0.7, 0.78], [0, 1, 1, 0]);
  const p1 = useRange(scrollYProgress, [0.36, 0.44, 0.7, 0.78], [0, 1, 1, 0]);
  const p2 = useRange(scrollYProgress, [0.46, 0.54, 0.7, 0.78], [0, 1, 1, 0]);
  const phraseOpacity = [p0, p1, p2];
  const phraseY = useRange(scrollYProgress, [0.26, 0.78], [reduced ? 0 : 40, reduced ? 0 : -40]);

  const rail = useRange(scrollYProgress, [0, 0.92], [0, 1]);

  return (
    <section ref={ref} id="topo" aria-label="Fia Salão de Beleza" className="relative h-[280vh] md:h-[300vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <ScrollVideo
          progress={videoProgress}
          src="/videos/hero-salao.mp4"
          mobileSrc="/videos/hero-salao-mobile.mp4"
          poster="/images/hero-poster.webp"
          mobilePoster="/images/hero-poster-mobile.webp"
          smoothing={0.22}
        />

        {/* Overlays muito sutis, só para leitura */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/70 to-transparent md:h-[38%] md:from-ink/60 md:via-ink/25" />
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_45%_45%_at_78%_30%,rgb(11_9_9/0.45),transparent_70%)] md:block" />

        {/* Fase 1 */}
        <motion.div
          style={{ opacity: introOpacity, y: introY, pointerEvents: introPointer }}
          className="absolute inset-x-0 bottom-[max(7.5rem,16svh)] px-6 md:bottom-auto md:left-auto md:right-[6vw] md:top-[17%] md:w-[min(42rem,44vw)] md:px-0 md:text-right"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: silk, delay: 0.3 }}
            className="eyebrow mb-5 text-cream/75 md:mb-7"
          >
            Fia · Salão de Beleza
          </motion.p>
          <h1 className="font-display text-[clamp(2.6rem,10.5vw,6.6rem)] md:text-[clamp(3rem,5.6vw,6.8rem)] font-light leading-[0.92] tracking-[-0.01em] text-cream">
            {["Beleza que", "valoriza você"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="block"
                  initial={{ y: reduced ? 0 : "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.5, ease: silk, delay: 0.45 + i * 0.12 }}
                >
                  {i === 1 ? (
                    <>
                      valoriza <em className="text-rosegold pr-[0.06em] font-normal">você</em>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Fase 2 */}
        <motion.div
          style={{ y: phraseY }}
          className="pointer-events-none absolute inset-x-0 bottom-[max(6rem,14svh)] px-6 md:bottom-auto md:left-auto md:right-[6vw] md:top-[17%] md:px-0 md:text-right"
          aria-hidden
        >
          {phrases.map((t, i) => (
            <motion.p
              key={t}
              style={{ opacity: phraseOpacity[i] }}
              className={`font-display text-[clamp(2.4rem,8.5vw,5.4rem)] font-light italic leading-[1.02] ${
                i === 2 ? "text-rosegold" : "text-cream"
              }`}
            >
              {t}
            </motion.p>
          ))}
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-8"
        >
          <span className="eyebrow text-[0.625rem] text-cream/70">Role para entrar</span>
          <span className="relative h-12 w-px overflow-hidden bg-cream/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-cream" />
          </span>
        </motion.div>

        {/* Trilho de progresso */}
        <div aria-hidden className="absolute right-5 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-cream/15 md:right-8 md:block">
          <motion.span style={{ scaleY: rail }} className="absolute inset-0 origin-top bg-rose" />
        </div>
      </div>
    </section>
  );
}
