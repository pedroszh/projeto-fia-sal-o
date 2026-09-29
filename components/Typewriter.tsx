"use client";

import { useEffect, useState } from "react";

/**
 * Escreve uma palavra, espera, apaga e escreve a próxima — em loop.
 * Com prefers-reduced-motion, mostra só a primeira palavra.
 */
export default function Typewriter({
  words,
  typeMs = 85,
  deleteMs = 45,
  holdMs = 2200,
  className = "",
}: {
  words: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const word = words[index];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 300);
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteMs : typeMs,
      );
    }
    return () => clearTimeout(t);
  }, [enabled, text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return (
    <span className="whitespace-nowrap">
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden className={className}>
        {text}
      </span>
      <span
        aria-hidden
        className="ml-[0.04em] inline-block h-[0.8em] w-[2px] translate-y-[0.06em] animate-[caret_1s_steps(1)_infinite] bg-rose align-baseline"
      />
    </span>
  );
}
