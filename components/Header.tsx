"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { BookingButton, silk } from "./ui";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  // Estado só muda quando cruza limiares → poucos renders
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextHidden = y > prev && y > 160;
    if (nextHidden !== hidden) setHidden(nextHidden);
    const nextSolid = y > window.innerHeight * 2.2;
    if (nextSolid !== solid) setSolid(nextSolid);
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? "-100%" : 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: silk }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
        solid ? "bg-ink/75 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-24 md:px-10">
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="eyebrow relative text-cream/80 transition-colors hover:text-cream after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-rose after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#topo"
          aria-label="Fia Salão de Beleza — início"
          className="col-start-1 justify-self-start md:col-start-2 md:justify-self-center"
        >
          <img
            src="/images/fia-logo-redondo.png"
            alt="Fia Salão de Beleza"
            width={320}
            height={320}
            className="h-12 w-12 md:h-16 md:w-16"
          />
        </a>

        <div className="col-start-3 justify-self-end">
          <BookingButton className="!h-10 !px-5 md:!h-11 md:!px-6">
            <span className="md:hidden">Agendar</span>
            <span className="hidden md:inline">Agendar horário</span>
          </BookingButton>
        </div>
      </div>
    </motion.header>
  );
}
