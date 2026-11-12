// Sonucu Instagram hikâyesi boyutunda (1080x1920) bir görsel olarak paylaşır.
// Destekleyen cihazlarda paylaşım menüsünü açar, desteklemeyenlerde PNG olarak indirir.

export interface ShareCardOptions {
  eyebrow: string; // üstteki küçük başlık (ör. "Şans kurabiyem")
  title: string; // büyük metin
  text?: string; // altındaki açıklama
  extra?: string; // en altta küçük satır (ör. "Şans sayın: 7")
  from: string; // arka plan gradyan başlangıç rengi
  to: string; // arka plan gradyan bitiş rengi
  ink?: string; // yazı rengi
  url: string; // paylaşılacak sayfa adresi
  filename: string;
}

const wrap = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
};

export async function renderCard(o: ShareCardOptions): Promise<Blob | null> {
  try { await document.fonts.ready; } catch {}
  const W = 1080, H = 1920;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  const ink = o.ink ?? '#2a1f2d';

  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, o.from);
  g.addColorStop(1, o.to);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // yumuşak ışık lekeleri
  const glow = (x: number, y: number, r: number, a: number) => {
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `rgba(255,255,255,${a})`);
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);
  };
  glow(W * 0.2, H * 0.18, 520, 0.35);
  glow(W * 0.85, H * 0.8, 600, 0.25);

  // iç kart
  const pad = 90, top = 420, cardH = 1080;
  ctx.fillStyle = 'rgba(255,255,255,0.82)';
  const r = 48;
  ctx.beginPath();
  ctx.moveTo(pad + r, top);
  ctx.arcTo(W - pad, top, W - pad, top + cardH, r);
  ctx.arcTo(W - pad, top + cardH, pad, top + cardH, r);
  ctx.arcTo(pad, top + cardH, pad, top, r);
  ctx.arcTo(pad, top, W - pad, top, r);
  ctx.closePath();
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = ink;
  ctx.font = '600 40px Figtree, system-ui, sans-serif';
  ctx.fillText(o.eyebrow.toLocaleUpperCase('tr-TR'), W / 2, top + 130);

  ctx.fillStyle = '#9a7b3f';
  ctx.font = '60px Fraunces, Georgia, serif';
  ctx.fillText('✦', W / 2, top + 230);

  ctx.fillStyle = ink;
  let size = 84;
  let lines: string[] = [];
  do {
    ctx.font = `500 ${size}px Fraunces, Georgia, serif`;
    lines = wrap(ctx, o.title, W - pad * 2 - 140);
    size -= 4;
  } while (lines.length * size * 1.2 > 480 && size > 44);
  const lh = (size + 4) * 1.22;
  let y = top + 360;
  for (const l of lines) { ctx.fillText(l, W / 2, y); y += lh; }

  if (o.text) {
    ctx.font = '400 40px Figtree, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(42,31,45,0.78)';
    y += 30;
    for (const l of wrap(ctx, o.text, W - pad * 2 - 160).slice(0, 5)) { ctx.fillText(l, W / 2, y); y += 56; }
  }
  if (o.extra) {
    ctx.font = '600 38px Figtree, system-ui, sans-serif';
    ctx.fillStyle = ink;
    ctx.fillText(o.extra, W / 2, top + cardH - 90);
  }

  ctx.fillStyle = ink;
  ctx.font = '500 96px Fraunces, Georgia, serif';
  ctx.fillText('luzest', W / 2, 260);
  ctx.font = '600 40px Figtree, system-ui, sans-serif';
  ctx.fillText(o.url.replace(/^https?:\/\//, '').replace(/\/$/, ''), W / 2, H - 170);

  return await new Promise((res) => c.toBlob((b) => res(b), 'image/png'));
}

export async function shareCard(o: ShareCardOptions): Promise<'shared' | 'downloaded' | 'failed'> {
  const blob = await renderCard(o);
  if (!blob) return 'failed';
  const file = new File([blob], o.filename, { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: o.eyebrow, text: `${o.title} — ${o.url}` });
      return 'shared';
    } catch (e) {
      if ((e as Error).name === 'AbortError') return 'shared';
    }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = o.filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  return 'downloaded';
}
