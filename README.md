# Luzest

Astro + Sanity ile hazırlanmış lifestyle dergisi. Netlify'da yayınlanır.

## Nasıl çalışır
- Yazılar Sanity yönetim panelinden girilir: **siteadresi/admin**
- Panelde "Publish" dediğinde Sanity webhook'u Netlify'ı tetikler, site 1-2 dakikada yenilenir.
- Site ayarları (ad, e-posta, sosyal medya, kategoriler): `src/config.mjs`
- Renkler ve yazı tipleri: `src/styles/global.css`
- Sayfalar: `src/pages/` (hakkımızda, iletişim, gizlilik, çerez)

## Netlify ayarları
- Build command: `npm run build`
- Publish directory: `dist`
- Node: 22 (netlify.toml'da tanımlı)
- İletişim formu için: Netlify > Forms > "Enable form detection" açık olmalı.

## Sanity ayarları
- Project ID ve dataset `src/config.mjs` içinde.
- sanity.io/manage > API > CORS origins: site adresi eklenmeli (Allow credentials işaretli).
- sanity.io/manage > API > Webhooks: Netlify build hook adresi eklenmeli.
