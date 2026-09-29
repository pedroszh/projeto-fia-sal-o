"use client";

import { site } from "@/lib/site";
import { BookingButton, Reveal, SplitHeading } from "./ui";

export default function Booking() {
  return (
    <section id="agendar" className="grain bg-blush px-6 py-20 text-center text-ink md:px-10 md:py-28">
      <div className="mx-auto max-w-[1300px]">
        <SplitHeading
          className="font-display text-[clamp(2.4rem,5.4vw,6.2rem)] font-light leading-[1] tracking-[-0.015em]"
          lines={[
            <span key="c" className="text-balance">
              Seu melhor momento começa quando você decide <em>se cuidar.</em>
            </span>,
          ]}
        />
        <Reveal delay={0.2} className="mt-14 flex flex-col items-center gap-6">
          <BookingButton variant="dark" size="lg" />
          <span className="eyebrow text-[0.625rem] text-ink/60">WhatsApp · {site.whatsapp.display}</span>
        </Reveal>
      </div>
    </section>
  );
}
