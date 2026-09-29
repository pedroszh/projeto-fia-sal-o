# Fia Salão de Beleza — site

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion

```bash
npm install
npm run dev      # desenvolvimento: http://localhost:3000
npm run build    # gera o site estático na pasta out/
```

## Publicar na Hostinger

O site é 100% estático (`output: "export"`), funciona em qualquer plano.

1. `npm run build` → gera `out/` (inclui o `.htaccess` com HTTPS, cache e compressão)
2. Compacte o **conteúdo** de `out/` num .zip (ou use o `fia-site-hostinger.zip` já gerado na raiz do projeto)
3. hPanel → Gerenciador de Arquivos → `public_html` → apague o conteúdo padrão → envie o .zip → Extrair
4. Confirme que `index.html` e `.htaccess` ficaram direto dentro de `public_html` (não numa subpasta)
5. hPanel → Segurança → SSL: ative o certificado gratuito

## Onde editar

- **Contatos, WhatsApp, endereço** → `lib/site.ts` (todos os botões "Agendar" usam o WhatsApp daqui)
- **Serviços** → array no topo de `components/Services.tsx` (fotos em `public/images/`)
- **Depoimentos** → `components/Testimonials.tsx`
- **Cores e fontes** → `app/globals.css` (`@theme`) e `app/layout.tsx`

## Vídeos controlados pelo scroll

`components/ScrollVideo.tsx` recebe um progresso (0→1) e interpola `currentTime` via
requestAnimationFrame. Para o scrub ficar suave o vídeo precisa de keyframes densos.
Ao trocar um vídeo, recodifique assim:

```bash
ffmpeg -i entrada.mp4 -an -c:v libx264 -preset slower -crf 24 -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -pix_fmt yuv420p -movflags +faststart public/videos/hero-salao.mp4
```

`public/videos/hero-salao-mobile.mp4` é um recorte vertical (540×720) do mesmo vídeo, usado em telas em pé.
