import { mapsUrl, site, whatsappUrl } from "@/lib/site";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow text-[0.625rem] text-rose">{title}</h3>
      <div className="mt-5 space-y-2 text-sm leading-relaxed text-cream/70">{children}</div>
    </div>
  );
}

const linkCls = "transition-colors hover:text-rose";

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-line px-6 pb-8 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <img
              src="/images/fia-logo.png"
              alt={site.fullName}
              width={540}
              height={436}
              loading="lazy"
              className="h-auto w-44 md:w-52"
            />
            <p className="mt-8 max-w-xs font-display text-2xl font-light italic leading-snug text-cream/80">
              Seu momento. Seu cuidado. Sua beleza.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 md:col-span-6 md:col-start-7">
            <Col title="Endereço">
              <p>{site.address.line1}</p>
              <p>{site.address.line2}</p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-block pt-2 underline decoration-cream/30 underline-offset-4 ${linkCls}`}>
                Ver no mapa
              </a>
            </Col>
            <Col title="Contato">
              <p>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  WhatsApp {site.whatsapp.display}
                </a>
              </p>
              <p>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Instagram {site.instagram.handle}
                </a>
              </p>
              <p>
                <a href={site.facebook.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Facebook
                </a>
              </p>
            </Col>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8 md:pr-24">
          <p className="eyebrow text-[0.625rem] text-mist">
            © {new Date().getFullYear()} {site.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}
