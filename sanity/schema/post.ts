import { defineField, defineType } from 'sanity';
import { categories } from '../../src/config.mjs';

// Türkçe karakterleri URL'ye uygun hale getirir: "Yaz Modası" -> "yaz-modasi"
const turkishSlugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/i̇/g, 'i')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);

export const post = defineType({
  name: 'post',
  title: 'Yazı',
  type: 'document',
  groups: [
    { name: 'content', title: 'İçerik', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      group: 'content',
      validation: (r) => r.required().error('Başlık zorunlu.'),
    }),
    defineField({
      name: 'slug',
      title: 'Adres (URL)',
      description: 'Başlığın yanındaki "Generate" düğmesine basman yeterli.',
      type: 'slug',
      group: 'content',
      options: { source: 'title', slugify: turkishSlugify },
      validation: (r) => r.required().error('Adres zorunlu; "Generate" düğmesine bas.'),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'content',
      options: {
        list: categories.map((c) => ({ title: c.title, value: c.slug })),
        layout: 'radio',
      },
      validation: (r) => r.required().error('Bir kategori seç.'),
    }),
    defineField({
      name: 'sub',
      title: 'Alt bölüm',
      description: 'Seçtiğin kategorinin alt bölümü. Boş bırakılabilir.',
      type: 'string',
      group: 'content',
      options: {
        list: categories.flatMap((c) => c.subs.map((s) => ({ title: `${c.title} › ${s.title}`, value: `${c.slug}/${s.slug}` }))),
      },
      validation: (r) =>
        r.custom((value, ctx) => {
          if (!value) return true;
          const cat = (ctx.document as any)?.category;
          return value.startsWith(`${cat}/`) ? true : 'Alt bölüm, seçtiğin kategoriye ait olmalı.';
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kısa özet',
      description: 'Ana sayfada ve Google sonuçlarında görünen 1-2 cümle.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (r) => r.max(200).warning('160 karakterin altında kalması iyi olur.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Kapak görseli',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Görsel açıklaması',
          description: 'Görselde ne olduğunu kısaca yaz (SEO ve erişilebilirlik için).',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'string',
      group: 'content',
      initialValue: 'Luzest',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın tarihi',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Ana sayfada öne çıkar',
      description: 'Açıksa bu yazı ana sayfanın en üstünde büyük gösterilir.',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Yazı metni',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Ara başlık', value: 'h2' },
            { title: 'Küçük başlık', value: 'h3' },
            { title: 'Alıntı', value: 'blockquote' },
          ],
          lists: [
            { title: 'Madde', value: 'bullet' },
            { title: 'Numaralı', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Kalın', value: 'strong' },
              { title: 'İtalik', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Bağlantı',
                type: 'object',
                fields: [{ name: 'href', title: 'Adres', type: 'url', validation: (r: any) => r.uri({ scheme: ['http', 'https', 'mailto'] }) }],
              },
            ],
          },
        },
        {
          type: 'image',
          title: 'Görsel',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Görsel açıklaması', type: 'string' },
            { name: 'caption', title: 'Alt yazı', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO başlığı',
      description: 'Boş bırakırsan normal başlık kullanılır.',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO açıklaması',
      description: 'Boş bırakırsan kısa özet kullanılır.',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
  orderings: [
    { title: 'Yayın tarihi (yeni → eski)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'mainImage', date: 'publishedAt' },
    prepare({ title, category, media, date }) {
      const cat = categories.find((c) => c.slug === category)?.title ?? '';
      const d = date ? new Date(date).toLocaleDateString('tr-TR') : '';
      return { title, subtitle: [cat, d].filter(Boolean).join(' · '), media };
    },
  },
});
