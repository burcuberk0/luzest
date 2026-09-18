// Sanity — category şemasına eklenecek alan
// Dosya: sanity/schemas/category.ts (mevcut fields dizisine ekle)

import {defineField} from 'sanity'

export const sponsorField = defineField({
  name: 'sponsor',
  title: 'Kategori sponsoru',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({name: 'name', title: 'Marka adı', type: 'string'}),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Şeffaf PNG veya SVG, yükseklik ~28px görünür. Alt metni marka adıdır.',
    }),
    defineField({
      name: 'url',
      title: 'Marka linki',
      type: 'url',
      validation: (r) => r.uri({scheme: ['http', 'https']}),
    }),
    defineField({name: 'startDate', title: 'Başlangıç', type: 'date'}),
    defineField({name: 'endDate', title: 'Bitiş', type: 'date'}),
  ],
})

// GROQ — mevcut kategori sorgusuna eklenecek projeksiyon
// "Sponsor sadece tarih aralığındaysa döner; alan boşsa null."
export const categoryNavQuery = `
*[_type == "category"] | order(order asc) {
  title,
  "slug": slug.current,
  "sponsor": select(
    defined(sponsor.logo)
      && (!defined(sponsor.startDate) || sponsor.startDate <= now())
      && (!defined(sponsor.endDate) || sponsor.endDate >= now())
    => {
      "name": sponsor.name,
      "url": sponsor.url,
      "logo": sponsor.logo.asset->url
    },
    null
  )
}`
