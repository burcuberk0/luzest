// ARS panel reklam yükleyicisi.
// Sayfadaki [data-ars-slot] alanlarını toplar, panelden yayındaki reklamları tek istekte alır ve yerleştirir.
// Gösterim: reklam sayfaya yerleşti. Görünür: en az %50'si 1 sn ekranda kaldı. Tıklama: panel üzerinden yönlendirme.
import { ads } from '../config.mjs';

type Ad = {
  key: string; j: number; tip: 'gorsel' | 'html'; boyut: string;
  gorsel: string; gorsel_mobil: string; baslik: string; metin: string; marka: string; html: string; click: string | null;
};

const PREVIEW = 'ars_onizleme';
const okUrl = (u: string | null | undefined) => !!u && /^https?:\/\//i.test(u);

function previewId(): string | null {
  const p = new URLSearchParams(location.search).get(PREVIEW);
  try {
    if (p === 'kapat') { sessionStorage.removeItem(PREVIEW); return null; }
    if (p && /^ARS-\d{8}-[0-9A-F]{6}$/.test(p)) sessionStorage.setItem(PREVIEW, p);
    return sessionStorage.getItem(PREVIEW);
  } catch { return p; }
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

function link(ad: Ad, cls: string) {
  const a = el('a', cls);
  a.href = ad.click!;
  a.target = '_blank';
  a.rel = 'sponsored noopener';
  return a;
}

function picture(ad: Ad, alt: string) {
  const pic = el('picture');
  if (okUrl(ad.gorsel_mobil)) {
    const src = el('source');
    src.media = '(max-width: 640px)';
    src.srcset = ad.gorsel_mobil;
    pic.append(src);
  }
  const img = el('img');
  img.src = ad.gorsel;
  img.alt = alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  pic.append(img);
  return pic;
}

function label(text = 'Reklam') { return el('span', 'ars-label', text); }

function htmlTag(ad: Ad) {
  const [w, h] = (ad.boyut.match(/^(\d+)x(\d+)$/) || []).slice(1).map(Number);
  const box = el('div', 'ars-frame');
  const f = el('iframe');
  // Üçüncü taraf tag'i sitenin kendi kökenine erişemez (allow-same-origin yok)
  f.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation');
  f.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body>${ad.html}</body></html>`;
  f.width = String(w || 300); f.height = String(h || 250);
  f.title = `${ad.marka} reklamı`;
  f.setAttribute('scrolling', 'no');
  f.loading = 'lazy';
  box.style.setProperty('--w', String(w || 300));
  box.style.setProperty('--h', String(h || 250));
  box.append(f);
  return box;
}

function render(slot: HTMLElement, type: string, ad: Ad) {
  const brand = ad.marka || 'Sponsor';
  if (ad.tip === 'html') {
    if (!ad.html) return false;
    slot.append(label(`Reklam · ${brand}`), htmlTag(ad));
    return true;
  }
  if (!okUrl(ad.gorsel) || !okUrl(ad.click)) return false;

  if (type === 'native') {
    const card = link(ad, 'ars-card');
    const media = el('span', 'ars-media');
    media.append(picture(ad, ''));
    const text = el('span', 'ars-text');
    text.append(el('span', 'ars-chip', 'Sponsorlu'));
    text.append(el('span', 'ars-title', ad.baslik || brand));
    if (ad.metin) text.append(el('span', 'ars-excerpt', ad.metin));
    text.append(el('span', 'ars-meta', brand));
    card.append(media, text);
    slot.append(card);
    return true;
  }
  if (type === 'sponsor') {
    const a = link(ad, 'ars-sponsor-link');
    a.append(el('span', 'ars-sponsor-k', 'Sponsor'), picture(ad, brand));
    if (ad.baslik || ad.metin) a.append(el('span', 'ars-sponsor-t', ad.baslik || ad.metin));
    slot.append(a);
    return true;
  }
  const a = link(ad, 'ars-banner-link');
  a.append(picture(ad, `${brand} reklamı`));
  slot.append(label(`Reklam · ${brand}`), a);
  if (type === 'sticky') {
    const x = el('button', 'ars-close', '×');
    x.type = 'button';
    x.setAttribute('aria-label', 'Reklamı kapat');
    x.onclick = () => { slot.remove(); try { sessionStorage.setItem('ars_sticky_kapali', '1'); } catch { /* yok */ } };
    slot.append(x);
  }
  return true;
}

function placeInline(slot: HTMLElement) {
  const n = Number(slot.dataset.arsAfter);
  if (!n) return true;
  const body = document.querySelector('.article-body');
  const paras = body ? [...body.children].filter((c) => c.tagName === 'P') : [];
  // Yazının sonuna çok yakınsa yerleştirme (en az 2 paragraf daha olmalı)
  if (paras.length < n + 2) return false;
  paras[n - 1].after(slot);
  return true;
}

function main() {
  const preview = previewId();
  const mobile = matchMedia('(max-width: 760px)').matches;
  let stickyClosed = false;
  try { stickyClosed = sessionStorage.getItem('ars_sticky_kapali') === '1'; } catch { /* yok */ }

  const slots = [...document.querySelectorAll<HTMLElement>('[data-ars-slot]')].filter((s) => {
    const ok = s.dataset.arsType === 'sticky' ? mobile && !stickyClosed : placeInline(s);
    if (!ok) s.remove();
    return ok;
  });
  if (!slots.length) return;

  const q = new URLSearchParams({ s: ads.site, slots: [...new Set(slots.map((s) => s.dataset.arsSlot!))].join(',') });
  const b = document.body.dataset;
  if (b.arsSayfa) q.set('sayfa', b.arsSayfa);
  if (b.arsBolum) q.set('bolum', b.arsBolum);
  if (preview) q.set('preview', preview);

  fetch(`${ads.server}/api/ad/serve?${q}`, { credentials: 'omit' })
    .then((r) => (r.ok ? r.json() : null))
    .then((data: { slots: Record<string, Ad[]> } | null) => {
      if (preview) showPreviewBadge(preview);
      if (!data?.slots) return;
      const events: [string, 'i' | 'v'][] = [];
      const seen = new Set<string>();
      const io = 'IntersectionObserver' in window ? new IntersectionObserver(onView, { threshold: 0.5 }) : null;
      const timers = new Map<Element, number>();

      function onView(entries: IntersectionObserverEntry[]) {
        for (const e of entries) {
          const t = e.target as HTMLElement;
          if (e.isIntersecting) {
            timers.set(t, window.setTimeout(() => {
              io!.unobserve(t);
              queue([[t.dataset.arsKey!, 'v']]);
            }, 1000));
          } else clearTimeout(timers.get(t));
        }
      }

      for (const slot of slots) {
        const list = data.slots[slot.dataset.arsSlot!];
        if (!list?.length) { slot.remove(); continue; }
        // Aynı reklam sayfada iki kez çıkmasın; mümkünse farklı aday seç
        const fresh = list.filter((a) => !seen.has(`${a.key}:${a.j}`));
        const pool = fresh.length ? fresh : list;
        const ad = pool[Math.floor(Math.random() * pool.length)];
        if (!render(slot, slot.dataset.arsType || 'banner', ad)) { slot.remove(); continue; }
        seen.add(`${ad.key}:${ad.j}`);
        slot.dataset.arsKey = ad.key;
        slot.hidden = false;
        events.push([ad.key, 'i']);
        io?.observe(slot);
      }
      queue(events, true);
    })
    .catch(() => slots.forEach((s) => s.remove()));

  // Sayım: önizlemede gönderilmez. Görünür gösterimler kısa aralıklarla, sayfa kapanırken de gönderilir.
  let pending: [string, 'i' | 'v'][] = [];
  let timer = 0;
  function queue(ev: [string, 'i' | 'v'][], now = false) {
    if (preview || !ev.length) return;
    pending.push(...ev);
    clearTimeout(timer);
    if (now) flush();
    else timer = window.setTimeout(flush, 1500);
  }
  function flush() {
    if (!pending.length) return;
    const body = JSON.stringify({ s: ads.site, e: pending.splice(0, 40) });
    const url = `${ads.server}/api/ad/e`;
    if (!navigator.sendBeacon?.(url, new Blob([body], { type: 'text/plain' }))) {
      fetch(url, { method: 'POST', body, keepalive: true, credentials: 'omit', headers: { 'content-type': 'text/plain' } }).catch(() => {});
    }
    if (pending.length) flush();
  }
  addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && flush());
}

function showPreviewBadge(id: string) {
  const b = el('div', 'ars-preview');
  b.append(el('span', '', `Reklam önizlemesi · ${id}`));
  const a = el('a', '', 'Kapat');
  const u = new URL(location.href);
  u.searchParams.set(PREVIEW, 'kapat');
  a.href = u.toString();
  b.append(a);
  document.body.append(b);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', main);
else main();
