"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";

type Props = {
  /** Progresso 0 → 1 (normalmente vindo de useScroll/useTransform) */
  progress: MotionValue<number>;
  src: string;
  poster: string;
  /** Versão recortada para telas verticais (opcional) */
  mobileSrc?: string;
  mobilePoster?: string;
  /** Suavização da interpolação: menor = mais "cinematográfico", maior = mais responsivo */
  smoothing?: number;
  className?: string;
  label?: string;
};

const MOBILE_QUERY = "(max-width: 767px), (orientation: portrait) and (max-width: 1024px)";

/**
 * Vídeo controlado pelo scroll.
 *
 * - O arquivo é baixado inteiro como Blob → seeks instantâneos e confiáveis (inclusive iOS).
 * - Um loop de requestAnimationFrame interpola currentTime em direção ao alvo do scroll,
 *   então o vídeo "desliza" até o frame certo em vez de pular.
 * - Nunca enfileira seeks: só pede um novo frame quando o anterior terminou de decodificar.
 * - O loop só roda enquanto o vídeo está visível.
 * - Não há re-render do React durante o scroll: tudo acontece fora do ciclo de render.
 */
export default function ScrollVideo({
  progress,
  src,
  poster,
  mobileSrc,
  mobilePoster,
  smoothing = 0.12,
  className = "",
  label,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mq.matches);
    // Só troca de fonte se o formato mudar (ex.: girar o tablet)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const ready = isMobile !== null;
  const activeSrc = isMobile && mobileSrc ? mobileSrc : src;

  // Carrega o vídeo como Blob
  useEffect(() => {
    if (!ready) return;
    const video = videoRef.current;
    if (!video) return;

    let objectUrl: string | null = null;
    const controller = new AbortController();

    fetch(activeSrc, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.blob();
      })
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.warn("ScrollVideo: fallback para streaming", err);
        video.src = activeSrc;
      });

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [activeSrc, ready]);

  // Loop de interpolação scroll → currentTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduced ? 1 : smoothing;

    let raf = 0;
    let visible = false;
    let current = 0;
    let primed = false;

    const prime = () => {
      // Alguns navegadores móveis só pintam frames após um play() inicial
      if (primed) return;
      primed = true;
      const p = video.play();
      if (p) p.then(() => video.pause()).catch(() => {});
    };

    const tick = () => {
      raf = 0;
      if (!visible) return;
      const duration = video.duration;
      if (duration && Number.isFinite(duration) && video.readyState >= 1) {
        const p = Math.min(Math.max(progress.get(), 0), 1);
        // Evita o último frame preto/idêntico de alguns encoders
        const target = p * (duration - 0.05);
        current += (target - current) * ease;
        if (Math.abs(target - current) < 0.001) current = target;

        if (!video.seeking && Math.abs(video.currentTime - current) > 0.008) {
          video.currentTime = current;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLoaded = () => {
      prime();
      current = Math.min(Math.max(progress.get(), 0), 1) * video.duration;
      video.currentTime = current;
      start();
    };

    video.addEventListener("loadedmetadata", onLoaded);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: "100px" },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      video.removeEventListener("loadedmetadata", onLoaded);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [progress, smoothing]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Poster responsivo: aparece instantaneamente, antes do vídeo carregar */}
      <picture>
        {mobilePoster && <source media={MOBILE_QUERY} srcSet={mobilePoster} />}
        <img
          src={poster}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      tabIndex={-1}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      />
    </div>
  );
}
