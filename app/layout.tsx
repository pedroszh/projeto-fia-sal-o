import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.fullName} — ${site.tagline}`,
  description:
    "Mechas, luzes, coloração, cortes, hidratação e maquiagem com atendimento acolhedor e personalizado em Taguatinga Norte, Brasília. Agende seu horário pelo WhatsApp.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: site.fullName,
    description: "Seu momento. Seu cuidado. Sua beleza.",
    images: ["/images/hero-poster.webp"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0909",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        {/* Só o hero (poster + vídeo certo para a tela) é pré-carregado; o resto carrega sob demanda */}
        <link rel="preload" as="image" href="/images/hero-poster.webp" media="(min-width: 768px) and (orientation: landscape), (min-width: 1025px)" />
        <link rel="preload" as="image" href="/images/hero-poster-mobile.webp" media="(max-width: 767px), (orientation: portrait) and (max-width: 1024px)" />
        <link
          rel="preload"
          as="fetch"
          crossOrigin="anonymous"
          href="/videos/hero-salao.mp4"
          media="(min-width: 768px) and (orientation: landscape), (min-width: 1025px)"
        />
        <link
          rel="preload"
          as="fetch"
          crossOrigin="anonymous"
          href="/videos/hero-salao-mobile.mp4"
          media="(max-width: 767px), (orientation: portrait) and (max-width: 1024px)"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
