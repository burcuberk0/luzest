import {defineField, defineType} from 'sanity'

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
        list: [
          {title: 'Moda', value: 'moda'},
          {title: 'Güzellik', value: 'guzellik'},
          {title: 'Seyahat', value: 'seyahat'},
          {title: 'Aşk ve İlişkiler', value: 'ask-ve-iliskiler'},
          {title: 'Yemek', value: 'yemek'},
          {title: 'Astroloji', value: 'astroloji'},
          {title: 'Yaşam', value: 'yasam'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({name: 'name', title: 'Marka adı', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Şeffaf SVG veya PNG. Nav içinde ~28px yükseklikte görünür.',
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
