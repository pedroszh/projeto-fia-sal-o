"use client";

import { mapsEmbedUrl, mapsUrl, site, wazeUrl } from "@/lib/site";
import { Eyebrow, Reveal, SplitHeading } from "./ui";

const linkBtn =
  "eyebrow inline-flex h-12 items-center gap-3 rounded-full border border-cream/30 px-6 text-cream transition-colors duration-500 hover:border-rose hover:bg-rose hover:text-ink";

export default function Location() {
  return (
    <section id="localizacao" aria-label="Localização" className="border-t border-line px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Eyebrow>Localização</Eyebrow>
          <SplitHeading
            as="h2"
            className="mt-8 font-display text-[clamp(2.6rem,4.8vw,5rem)] font-light leading-[0.98]"
            lines={[
              "Venha nos",
              <em key="v" className="text-rosegold pr-[0.05em]">
                visitar.
              </em>,
            ]}
          />

          <Reveal delay={0.15} className="mt-10">
            <address className="not-italic">
              <p className="font-display text-[1.7rem] font-light leading-snug text-cream">{site.address.line1}</p>
              <p className="mt-1 text-cream/60">{site.address.line2}</p>
            </address>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                Google Maps
              </a>
              <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                Waze
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] ring-1 ring-cream/10 md:aspect-[16/11]">
            <iframe
              title={`Mapa — ${site.fullName}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_sepia(0.25)_hue-rotate(-15deg)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
