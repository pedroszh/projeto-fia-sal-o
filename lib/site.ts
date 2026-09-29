/**
 * Configuração central do site — edite aqui contatos, endereço e horários.
 * Tudo que é exibido no site (CTAs, rodapé, links) lê deste arquivo.
 */
export const site = {
  name: "Fia",
  fullName: "Fia Salão de Beleza",
  tagline: "Beleza que valoriza você",

  whatsapp: {
    /** Somente dígitos, com DDI + DDD */
    number: "5561996493463",
    display: "(61) 99649-3463",
    message: "Olá! Vim pelo site e gostaria de agendar um horário no Fia Salão de Beleza.",
  },

  instagram: {
    handle: "@fia_salao",
    url: "https://www.instagram.com/fia_salao/",
  },
  facebook: {
    url: "https://www.facebook.com/people/Fia-Sal%C3%A3o/61563525936907/",
  },

  address: {
    line1: "St. D Norte QND 19, lote 02, loja 04",
    line2: "Taguatinga Norte · Brasília — DF",
    /** Texto usado para buscar o endereço no mapa */
    mapsQuery: "Fia Salão de Beleza, QND 19 Lote 02 Loja 04, Taguatinga Norte, Brasília - DF",
  },
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&output=embed`;
export const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(site.address.mapsQuery)}&navigate=yes`;

export function whatsappUrl(message: string = site.whatsapp.message) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
