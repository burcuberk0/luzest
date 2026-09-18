import {defineField, defineType} from 'sanity'
// Bu satırı post.ts'in en üstündeki categories import satırıyla birebir aynı yap.
import {categories} from '../../src/config.mjs'

export default defineType({
  name: 'categorySponsor',
  title: 'Kategori sponsoru',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: categories.map((c: {title: string; slug: string}) => ({title: c.title, value: c.slug})),
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({name: 'name', title: 'Marka adı', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Şeffaf SVG veya PNG. Nav içinde ~20px yükseklikte görünür.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      title: 'Marka linki',
      type: 'url',
      description: 'Boş bırakılırsa logo tıklanmaz.',
      validation: (r) => r.uri({scheme: ['http', 'https']}),
    }),
    defineField({name: 'startDate', title: 'Başlangıç', type: 'date'}),
    defineField({name: 'endDate', title: 'Bitiş', type: 'date'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'category', media: 'logo'},
  },
})
