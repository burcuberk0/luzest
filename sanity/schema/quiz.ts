import { defineArrayMember, defineField, defineType } from 'sanity';
import { categories } from '../../src/config.mjs';

// Türkçe karakterleri URL'ye uygun hale getirir (post.ts ile aynı).
const turkishSlugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/i̇/g, 'i')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);

const hex = (r: any) =>
  r.regex(/^#([0-9a-fA-F]{6})$/, { name: 'renk kodu' }).error('#RRGGBB biçiminde yaz, ör. #f3d9e1');

// Her şık bir sonuca puan verir. En çok puan toplayan sonuç gösterilir.
const option = defineArrayMember({
  type: 'object',
  name: 'quizOption',
  title: 'Şık',
  fields: [
    defineField({ name: 'emoji', title: 'Emoji', type: 'string', validation: (r) => r.max(4) }),
    defineField({ name: 'text', title: 'Şık metni', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'result',
      title: 'Hangi sonuca puan verir?',
      description: 'Aşağıdaki "Sonuçlar" bölümündeki anahtarlardan biri (ör. dogal).',
      type: 'string',
      validation: (r) =>
        r.required().custom((value, ctx) => {
          const keys = ((ctx.document as any)?.results ?? []).map((x: any) => x?.key);
          return !value || keys.includes(value) ? true : `Bu anahtar sonuçlarda yok. Seçenekler: ${keys.join(', ')}`;
        }),
    }),
  ],
  preview: { select: { title: 'text', emoji: 'emoji', result: 'result' }, prepare: ({ title, emoji, result }) => ({ title: `${emoji ?? ''} ${title ?? ''}`, subtitle: `→ ${result ?? '?'}` }) },
});

export const quiz = defineType({
  name: 'quiz',
  title: 'Test',
  type: 'document',
  groups: [
    { name: 'content', title: 'İçerik', default: true },
    { name: 'results', title: 'Sonuçlar' },
    { name: 'sponsor', title: 'Sponsor' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Başlık', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Adres (URL)',
      description: 'luzest.com/test/… — "Generate" düğmesine bas.',
      type: 'slug',
      group: 'content',
      options: { source: 'title', slugify: turkishSlugify },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'content',
      options: { list: categories.map((c: { title: string; slug: string }) => ({ title: c.title, value: c.slug })) },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'intro', title: 'Giriş metni', type: 'text', rows: 3, group: 'content', validation: (r) => r.required().max(220) }),
    defineField({ name: 'emoji', title: 'Kapak emojisi', type: 'string', group: 'content', description: 'Giriş ekranında büyük görünür. 1–2 emoji.' }),
    defineField({
      name: 'colorFrom', title: 'Renk 1', type: 'string', group: 'content', initialValue: '#fbe0d0',
      description: 'Giriş ekranı ve paylaşım görseli gradyanı.', validation: hex,
    }),
    defineField({ name: 'colorTo', title: 'Renk 2', type: 'string', group: 'content', initialValue: '#f3d9e1', validation: hex }),
    defineField({ name: 'publishedAt', title: 'Yayın tarihi', type: 'datetime', group: 'content', initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({
      name: 'questions',
      title: 'Sorular',
      type: 'array',
      group: 'content',
      validation: (r) => r.required().min(3).max(15),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quizQuestion',
          title: 'Soru',
          fields: [
            defineField({ name: 'question', title: 'Soru', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'options', title: 'Şıklar', type: 'array', of: [option], validation: (r) => r.required().min(2).max(6) }),
          ],
          preview: { select: { title: 'question', options: 'options' }, prepare: ({ title, options }) => ({ title, subtitle: `${options?.length ?? 0} şık` }) },
        }),
      ],
    }),
    defineField({
      name: 'results',
      title: 'Sonuçlar',
      type: 'array',
      group: 'results',
      validation: (r) => r.required().min(2).max(8),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quizResult',
          title: 'Sonuç',
          fields: [
            defineField({
              name: 'key', title: 'Anahtar', type: 'string',
              description: 'Kısa, Türkçe karaktersiz (ör. dogal). Şıklar bu anahtara puan verir; GA4 raporunda da bu görünür.',
              validation: (r) => r.required().regex(/^[a-z0-9-]+$/, { name: 'anahtar' }),
            }),
            defineField({ name: 'title', title: 'Sonuç başlığı', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
            defineField({ name: 'motto', title: 'Motto', type: 'string', description: 'Paylaşım görselinde görünen kısa cümle.' }),
            defineField({ name: 'body', title: 'Açıklama', type: 'text', rows: 5, description: 'Paragrafları boş satırla ayır.' }),
            defineField({ name: 'traits', title: 'Özellikler', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
            defineField({ name: 'colorFrom', title: 'Renk 1', type: 'string', validation: hex }),
            defineField({ name: 'colorTo', title: 'Renk 2', type: 'string', validation: hex }),
            defineField({
              name: 'recommendation',
              title: 'Sonuca özel öneri',
              description: 'Sponsorlu testte marka ürünü; sponsorsuz testte Luzest yazısına link olabilir.',
              type: 'object',
              options: { collapsible: true, collapsed: true },
              fields: [
                defineField({ name: 'headline', title: 'Başlık', type: 'string' }),
                defineField({ name: 'text', title: 'Metin', type: 'text', rows: 3 }),
                defineField({ name: 'ctaText', title: 'Buton metni', type: 'string' }),
                defineField({ name: 'url', title: 'Link', type: 'url', validation: (r) => r.uri({ scheme: ['http', 'https'], allowRelative: true }) }),
              ],
            }),
          ],
          preview: { select: { title: 'title', key: 'key', emoji: 'emoji' }, prepare: ({ title, key, emoji }) => ({ title: `${emoji ?? ''} ${title ?? ''}`, subtitle: key }) },
        }),
      ],
    }),
    defineField({
      name: 'sponsor',
      title: 'Sponsor',
      type: 'object',
      group: 'sponsor',
      description: 'Doldurulursa testte "Reklam · Marka sunar" etiketi çıkar ve öneri linklerine UTM eklenir.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'name', title: 'Marka adı', type: 'string' }),
        defineField({ name: 'logo', title: 'Logo', type: 'image', description: 'Şeffaf PNG/SVG, ~24px yükseklikte görünür.' }),
        defineField({ name: 'url', title: 'Marka linki', type: 'url' }),
        defineField({ name: 'label', title: 'Etiket', type: 'string', initialValue: 'Reklam', options: { list: ['Reklam', 'İş birliği', 'Sponsorlu'] } }),
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO başlığı', type: 'string', group: 'seo', validation: (r) => r.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO açıklaması', type: 'text', rows: 2, group: 'seo', validation: (r) => r.max(160) }),
  ],
  preview: {
    select: { title: 'title', sponsor: 'sponsor.name', emoji: 'emoji' },
    prepare: ({ title, sponsor, emoji }) => ({ title: `${emoji ?? ''} ${title ?? ''}`, subtitle: sponsor ? `Sponsor: ${sponsor}` : 'Sponsorsuz' }),
  },
});
