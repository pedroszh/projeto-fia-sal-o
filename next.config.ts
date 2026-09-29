import type { NextConfig } from "next";

/**
 * Exportação estática: `npm run build` gera a pasta `out/`,
 * que pode ser enviada para qualquer hospedagem comum (ex.: public_html da Hostinger).
 * Cache e compressão ficam no `public/.htaccess`.
 */
const nextConfig: NextConfig = {
  output: "export",
  // As imagens já estão otimizadas em .webp; a otimização automática do Next exige servidor.
  images: { unoptimized: true },
};

export default nextConfig;
